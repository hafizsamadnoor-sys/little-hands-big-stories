#!/usr/bin/env python3
"""End-to-end local test for the Memory Test game (BNO14).
Runs against a local server at BASE. Uses curl (no urllib).
Prints PASS/FAIL per check and exits non-zero on any failure.
"""
import json, subprocess, sys, os

BASE = os.environ.get("MT_BASE", "http://127.0.0.1:3456")
JAR_T = "/tmp/mt-test-teacher.jar"
JAR_MT = "/tmp/mt-test-afee.jar"
fails = []

def http_code(method, path):
    out = subprocess.run(["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", "-X", method, BASE + path],
                         capture_output=True, text=True, timeout=30)
    return int(out.stdout.strip())

def curl(method, path, jar=None, data=None, save_jar=None, extra=None):
    cmd = ["curl", "-s", "-w", "\n%{http_code}", "-X", method, BASE + path]
    if jar: cmd += ["-b", jar]
    if save_jar: cmd += ["-c", save_jar]
    if data is not None:
        cmd += ["-H", "Content-Type: application/json", "--data", json.dumps(data)]
    if extra: cmd += extra
    out = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    body, _, code = out.stdout.rpartition("\n")
    try:
        return int(code), json.loads(body) if body.strip() else {}
    except Exception:
        return int(code), {"_raw": body[:500]}

def check(name, cond, detail=""):
    print(("PASS " if cond else "FAIL ") + name + ((" — " + str(detail)) if detail else ""))
    if not cond:
        fails.append(name)

# ── 0. Pages load ──────────────────────────────────────────────
code, _ = curl("GET", "/memory-test.html")
check("game page loads (200)", code == 200, code)
code = http_code("GET", "/mt-scenes/level-1.png")
check("scene image loads (200)", code == 200, code)
code, _ = curl("GET", "/teacher.html")
check("teacher page loads (200)", code == 200, code)

# ── 1. Setup + teacher login ───────────────────────────────────
code, r = curl("POST", "/api/setup", data={"username": "teacher1", "password": "testpass123", "name": "Test Teacher"})
check("setup teacher (200)", code == 200, r)
code, r = curl("POST", "/api/login", data={"username": "teacher1", "password": "testpass123"}, save_jar=JAR_T)
check("teacher login (200)", code == 200 and r.get("role") == "teacher", r)

# ── 2. Schema: 63 tables, mt tables present ────────────────────
import sqlite3
db = sqlite3.connect("/tmp/lhbs-mt-test2/lhbs.db")
tables = [r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence' ORDER BY name")]
mt_tables = [t for t in tables if t.startswith("mt_game_")]
check("table count is 63", len(tables) == 63, f"got {len(tables)}")
check("mt_game tables present", set(mt_tables) == {"mt_game_players", "mt_game_sessions", "mt_game_attempts", "mt_game_answers", "mt_game_progress"}, mt_tables)
check("points_log empty", db.execute("SELECT COUNT(*) FROM points_log").fetchone()[0] == 0)
check("users = 77 (38 students + 38 parents + teacher)", db.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 77,
      db.execute("SELECT COUNT(*) FROM users").fetchone()[0])
check("no Afeef among users", db.execute("SELECT COUNT(*) FROM users WHERE display_name LIKE '%AFEEF%'").fetchone()[0] == 0)
check("works/books empty", db.execute("SELECT COUNT(*) FROM works").fetchone()[0] == 0
      and db.execute("SELECT COUNT(*) FROM books").fetchone()[0] == 0)

# ── 3. Afeef seeded ────────────────────────────────────────────
row = db.execute("SELECT id, name FROM mt_game_players").fetchone()
check("Afeef seeded id=1", row == (1, "MUHAMMAD AFEEF"), row)

# ── 4. Wrong PIN / no session ──────────────────────────────────
code, r = curl("POST", "/api/mt-game/login", data={"pin": "9999"})
check("wrong PIN rejected (401)", code == 401, code)
code, r = curl("GET", "/api/mt-game/levels")
check("levels without login rejected (401)", code == 401, code)

# ── 5. Afeef login ─────────────────────────────────────────────
code, r = curl("POST", "/api/mt-game/login", data={"pin": "1234"}, save_jar=JAR_MT)
check("Afeef login PIN 1234 (200)", code == 200 and r.get("player", {}).get("name") == "MUHAMMAD AFEEF", r)
code, r = curl("GET", "/api/mt-game/me", jar=JAR_MT)
check("me returns Afeef", code == 200 and r.get("player", {}).get("id") == 1, r)

# ── 6. Levels: only L1 unlocked ────────────────────────────────
code, r = curl("GET", "/api/mt-game/levels", jar=JAR_MT)
check("levels: L1 unlocked, L2 locked", code == 200 and r["levels"][0]["unlocked"] and not r["levels"][1]["unlocked"], r.get("levels", [{}])[1])
check("pass mark 36/45", r.get("passMark") == 36 and r.get("total") == 45, r)

# ── 7. Lock check: L3 study blocked ────────────────────────────
code, r = curl("GET", "/api/mt-game/level/3/round/1/study", jar=JAR_MT)
check("L3 study blocked (403)", code == 403, code)

# ── 8. Study endpoints: no answers leak ────────────────────────
code, r1 = curl("GET", "/api/mt-game/level/1/round/1/study", jar=JAR_MT)
check("R1 study returns 15 words", code == 200 and len(r1.get("words", [])) == 15, len(r1.get("words", [])))
code, r2 = curl("GET", "/api/mt-game/level/1/round/2/study", jar=JAR_MT)
check("R2 study returns 10 numbers", code == 200 and len(r2.get("numbers", [])) == 10, len(r2.get("numbers", [])))
code, r3 = curl("GET", "/api/mt-game/level/1/round/3/study", jar=JAR_MT)
check("R3 study returns scene + 10 items + image", code == 200 and len(r3.get("items", [])) == 10
      and r3.get("image") == "/mt-scenes/level-1.png", r3.get("image"))
code, r4 = curl("GET", "/api/mt-game/level/1/round/4/study", jar=JAR_MT)
check("R4 study returns story only (no questions)", code == 200 and "story" in r4 and "questions" not in r4, list(r4.keys()))
code, q4 = curl("GET", "/api/mt-game/level/1/round/4/questions", jar=JAR_MT)
check("R4 questions endpoint returns 10 questions, no keywords", code == 200 and len(q4.get("questions", [])) == 10
      and "keywords" not in json.dumps(q4), len(q4.get("questions", [])))

# ── 9. Attempt 1 — L1, one deliberate slip + one deliberate wrong ─
# "catt" for "cat" (3 letters -> exact only, must be WRONG); "lion" replaced by "tiger" (wrong).
r1_ans = ["catt"] + r1["words"][1:]          # cat misspelled (short word: no tolerance)
r1_ans[14] = "tiger"                          # lion -> tiger (wrong)
r2_ans = [str(x) for x in r2["numbers"]]      # all correct, in order
r3_ans = list(r3["items"])                    # all correct
r4_ans = ["Wednesday", "10", "Kochi", "key", "Nabeel", "one hour", "red bus", "school gate", "three toffees", "blue"]
code, att1 = curl("POST", "/api/mt-game/level/1/attempt", jar=JAR_MT,
                  data={"answers": {"r1": r1_ans, "r2": r2_ans, "r3": r3_ans, "r4": r4_ans}})
check("attempt 1 submitted (200)", code == 200, att1)
if code == 200:
    check("R1 = 13 (catt wrong, tiger wrong)", att1.get("r1") == 13, att1.get("r1"))
    check("R2 = 10", att1.get("r2") == 10, att1.get("r2"))
    check("R3 = 10", att1.get("r3") == 10, att1.get("r3"))
    check("R4 = 10 (all story answers right)", att1.get("r4") == 10, att1.get("r4"))
    check("total >= 36 -> passed", att1.get("passed") is True, att1.get("score"))
    check("unlocked becomes 2", att1.get("unlocked") == 2, att1.get("unlocked"))
    check("detail rows = 45 + 2 extra", len(att1.get("detail", [])) == 47, len(att1.get("detail", [])))
    wrong_rows = [d for d in att1.get("detail", []) if not d["ok"]]
    check("wrong rows include catt + tiger as extras", any(d["given"] == "catt" for d in wrong_rows)
          and any(d["given"] == "tiger" for d in wrong_rows)
          and any(d["correct"] == "fish" and d["given"] == "" for d in wrong_rows), wrong_rows)
    ATT1_ID = att1.get("attempt_id")
else:
    ATT1_ID = None

# ── 10. Levels now: L2 unlocked ────────────────────────────────
code, r = curl("GET", "/api/mt-game/levels", jar=JAR_MT)
check("L2 unlocked after pass, L3 still locked", r["levels"][1]["unlocked"] and not r["levels"][2]["unlocked"], "")

# Story answers: use the first keyword of each question, read from the data file via node (the data file is JS).
def first_keywords(level_n):
    out = subprocess.run(["node", "-e",
        f"const {{MT_GAME_LEVELS}} = require('/home/hatch/workspace/lhbs-memory/memory-test-data.js');"
        f"const l = MT_GAME_LEVELS.find(x=>x.n==={level_n});"
        "console.log(JSON.stringify(l.questions.map(q=>q.keywords[0])));"],
        capture_output=True, text=True, timeout=30)
    return json.loads(out.stdout.strip())
# ── 11. Attempt 2 — L2 perfect (45/45) ────────────────────────
code, s1 = curl("GET", "/api/mt-game/level/2/round/1/study", jar=JAR_MT)
code, s2 = curl("GET", "/api/mt-game/level/2/round/2/study", jar=JAR_MT)
code, s3 = curl("GET", "/api/mt-game/level/2/round/3/study", jar=JAR_MT)
code, att2 = curl("POST", "/api/mt-game/level/2/attempt", jar=JAR_MT,
                  data={"answers": {"r1": s1["words"], "r2": [str(x) for x in s2["numbers"]], "r3": s3["items"],
                                  "r4": first_keywords(2)}})
check("attempt 2 (L2) perfect 45/45, passed", code == 200 and att2.get("score") == 45 and att2.get("passed") is True, att2.get("score"))
check("unlocked becomes 3", att2.get("unlocked") == 3, att2.get("unlocked"))

# ── 12. Attempt 3 — L3 with a 1-letter slip on a 5+ letter word ──
# L3 words are 5-6 letters. Change ONE letter of the first 5+ letter word — it must still count (Levenshtein <= 1).
code, u1 = curl("GET", "/api/mt-game/level/3/round/1/study", jar=JAR_MT)
code, u2 = curl("GET", "/api/mt-game/level/3/round/2/study", jar=JAR_MT)
code, u3 = curl("GET", "/api/mt-game/level/3/round/3/study", jar=JAR_MT)
words3 = u1["words"]
slip_idx = next(i for i, w in enumerate(words3) if len(w) >= 5)
orig = words3[slip_idx]
slipped = orig[:-1] + ("x" if orig[-1] != "x" else "z")
assert slipped not in [w.lower() for w in words3], "slip collided with another word"
r1c = list(words3); r1c[slip_idx] = slipped
code, att3 = curl("POST", "/api/mt-game/level/3/attempt", jar=JAR_MT,
                  data={"answers": {"r1": r1c, "r2": [str(x) for x in u2["numbers"]], "r3": u3["items"],
                                  "r4": first_keywords(3)}})
check("attempt 3 submitted (200)", code == 200, att3)
if code == 200:
    check(f"R1 = 15 (slip '{slipped}' for '{orig}' ACCEPTED)", att3.get("r1") == 15, att3.get("r1"))
    check("total 45/45, passed", att3.get("score") == 45 and att3.get("passed") is True, att3.get("score"))
    check("unlocked becomes 4", att3.get("unlocked") == 4, att3.get("unlocked"))

# ── 13. Attempt 4 — L4 FAILING attempt (low score must NOT unlock L5) ─
code, v1 = curl("GET", "/api/mt-game/level/4/round/1/study", jar=JAR_MT)
code, v2 = curl("GET", "/api/mt-game/level/4/round/2/study", jar=JAR_MT)
code, v3 = curl("GET", "/api/mt-game/level/4/round/3/study", jar=JAR_MT)
fail = {"answers": {"r1": v1["words"][:5] + [""] * 10, "r2": [str(x) for x in v2["numbers"][:3]] + [""] * 7,
                    "r3": v3["items"][:2] + [""] * 8, "r4": [""] * 10}}
code, att4 = curl("POST", "/api/mt-game/level/4/attempt", jar=JAR_MT, data=fail)
check("failing attempt 4 submitted (200)", code == 200, att4)
if code == 200:
    check("score 10/45, NOT passed", att4.get("score") == 10 and att4.get("passed") is False, att4.get("score"))
    check("unlocked stays 4 (L5 locked)", att4.get("unlocked") == 4, att4.get("unlocked"))
code, r = curl("GET", "/api/mt-game/levels", jar=JAR_MT)
check("L5 still locked after fail", not r["levels"][4]["unlocked"], "")

# ── 14. Attempt 5 — retry L4, perfect, unlocks L5 (retry works) ─
code, att5 = curl("POST", "/api/mt-game/level/4/attempt", jar=JAR_MT,
                  data={"answers": {"r1": v1["words"], "r2": [str(x) for x in v2["numbers"]], "r3": v3["items"],
                                  "r4": first_keywords(4)}})
check("retry attempt 5 submitted, passed 45/45", code == 200 and att5.get("score") == 45 and att5.get("passed") is True, att5.get("score"))
check("unlocked becomes 5 after retry", att5.get("unlocked") == 5, att5.get("unlocked"))

# ── 15. Teacher endpoints ──────────────────────────────────────
code, ov = curl("GET", "/api/teacher/mt-game/overview", jar=JAR_T)
check("teacher overview (200)", code == 200 and ov.get("player", {}).get("name") == "MUHAMMAD AFEEF", ov)
check("overview totals: 5 attempts, 4 levels passed", ov.get("totals", {}).get("attempts") == 5
      and ov.get("totals", {}).get("levelsPassed") == 4, ov.get("totals"))
code, sm = curl("GET", "/api/teacher/mt-game/summary/1", jar=JAR_T)
check("teacher summary (200)", code == 200 and len(sm.get("attempts", [])) == 5, len(sm.get("attempts", [])))
wrong = sm.get("wrongAnswers", [])
check("summary wrong answers include catt + tiger", any(w.get("given_answer") == "catt" for w in wrong)
      and any(w.get("given_answer") == "tiger" for w in wrong), len(wrong))
code, at = curl("GET", f"/api/teacher/mt-game/attempt/{ATT1_ID}", jar=JAR_T)
check("teacher attempt detail (200, 47 rows)", code == 200 and len(at.get("answers", [])) == 47, len(at.get("answers", [])))
check("attempt detail has r1/r2/r3/r4 split", at.get("attempt", {}).get("r1") == 13 and at.get("attempt", {}).get("r2") == 10
      and at.get("attempt", {}).get("r3") == 10, at.get("attempt"))
code, sess = curl("POST", "/api/teacher/mt-game/session", jar=JAR_T, data={})
check("teacher play-as-Afeef session (200)", code == 200 and sess.get("ok") is True, sess)

# ── 16. PIN change + old PIN stops working ─────────────────────
code, pin = curl("POST", "/api/teacher/mt-game/pin", jar=JAR_T, data={"pin": "4321"})
check("teacher PIN change (200)", code == 200 and pin.get("ok") is True, pin)
code, r = curl("POST", "/api/mt-game/login", data={"pin": "1234"})
check("old PIN 1234 now rejected", code == 401, code)
code, r = curl("POST", "/api/mt-game/login", data={"pin": "4321"}, save_jar="/tmp/mt-test-afee2.jar")
check("new PIN 4321 works", code == 200, code)
# restore the test PIN to 1234 for the report
code, pin = curl("POST", "/api/teacher/mt-game/pin", jar=JAR_T, data={"pin": "1234"})
check("PIN restored to 1234", code == 200, code)

# ── 17. Counts untouched by the game ───────────────────────────
db2 = sqlite3.connect("/tmp/lhbs-mt-test2/lhbs.db")
check("points_log STILL empty after 4 attempts", db2.execute("SELECT COUNT(*) FROM points_log").fetchone()[0] == 0)
check("users still 77", db2.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 77)
check("works/books still 0", db2.execute("SELECT COUNT(*) FROM works").fetchone()[0] == 0
      and db2.execute("SELECT COUNT(*) FROM books").fetchone()[0] == 0)
check("mt_game_attempts = 5", db2.execute("SELECT COUNT(*) FROM mt_game_attempts").fetchone()[0] == 5)
check("mt_game_answers = 47+45+45+45+45 = 227", db2.execute("SELECT COUNT(*) FROM mt_game_answers").fetchone()[0] == 227,
      db2.execute("SELECT COUNT(*) FROM mt_game_answers").fetchone()[0])
check("progress highest_unlocked = 5", db2.execute("SELECT highest_unlocked FROM mt_game_progress WHERE player_id=1").fetchone()[0] == 5)
tables2 = [r[0] for r in db2.execute("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")]
check("table count still 63", len(tables2) == 63, len(tables2))

print()
print("FAILURES:", fails if fails else "none — all checks passed")
sys.exit(1 if fails else 0)
