// ─────────────────────────────────────────────────────────────
// Little Hands, Big Stories — portable server
// Node.js + Express + libSQL (Turso). No build step.
// Run: npm install && node server.js
// Set TURSO_URL and TURSO_AUTH_TOKEN in production.
// ─────────────────────────────────────────────────────────────
const express = require("express");
const crypto = require("crypto");
const path = require("path");
const { createClient } = require("@libsql/client");
const STUDENTS = require("./students");

const PORT = process.env.PORT || 3000;
const db = createClient({
  url: process.env.TURSO_URL || "file:./data/lhbs-local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// ── Schema (async init; libsql runs one statement per execute) ──
async function initDb() {
  await db.execute(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  role TEXT NOT NULL CHECK(role IN ('teacher','student','guest','parent')),
  display_name TEXT NOT NULL,
  ad_no TEXT,
  photo TEXT,
  bio TEXT,
  pin TEXT,
  parent_of INTEGER REFERENCES users(id) ON DELETE CASCADE,
  dob TEXT,
  class_name TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  impersonated_from TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS works (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  language TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
  stars INTEGER NOT NULL DEFAULT 0,
  points_awarded INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  weekly_task_id INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  reviewed_at TEXT
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS reads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_id INTEGER NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(work_id, student_id)
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_id INTEGER NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(work_id, student_id)
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS points_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  ref_type TEXT,
  ref_id INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT,
  ref_type TEXT,
  ref_id INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS learning_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  details TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS learning_task_done (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES learning_tasks(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  done_at TEXT DEFAULT (datetime('now')),
  UNIQUE(task_id, student_id)
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS student_marks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  exam TEXT NOT NULL DEFAULT '',
  marks REAL NOT NULL,
  max_marks REAL NOT NULL DEFAULT 100,
  grade TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(student_id, subject, exam)
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS student_badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_key TEXT NOT NULL,
  awarded_at TEXT DEFAULT (datetime('now')),
  UNIQUE(student_id, badge_key)
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS weekly_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('story_start','theme','quiz')),
  prompt TEXT NOT NULL DEFAULT '',
  points INTEGER NOT NULL DEFAULT 5,
  start_date TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES weekly_tasks(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES weekly_tasks(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  points_awarded INTEGER NOT NULL DEFAULT 0,
  answers_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(task_id, student_id)
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS mysteries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  solution TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 3,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS mystery_solves (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mystery_id INTEGER NOT NULL REFERENCES mysteries(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(mystery_id, student_id)
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 4,
  deadline TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS challenge_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id INTEGER NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','done')),
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS writer_of_week (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS point_settings (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL
);`);
  await db.execute(`
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_id INTEGER REFERENCES works(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  pdf_data TEXT NOT NULL,
  pages INTEGER NOT NULL DEFAULT 8,
  created_at TEXT DEFAULT (datetime('now'))
);`);
  // Seed point settings defaults
  for (const [k, v] of Object.entries(DEFAULT_POINTS))
    await db.execute({ sql: "INSERT OR IGNORE INTO point_settings (key, value) VALUES (?,?)", args: [k, v] });
  // Seed students on first run
  const n = (await db.execute("SELECT COUNT(*) AS c FROM users WHERE role='student'")).rows[0].c;
  if (n === 0) {
    for (const s of STUDENTS)
      await db.execute({ sql: "INSERT INTO users (username, role, display_name, ad_no) VALUES (?,?,?,?)",
        args: [makeUsername(s.name, s.ad_no), "student", s.name, s.ad_no] });
    console.log(`Seeded ${STUDENTS.length} students.`);
  }
  // Seed one parent login per student
  await seedParentUsers();
}

// ── Point settings defaults ───────────────────────────────────
const DEFAULT_POINTS = {
  story: 5, diary: 2, letter: 3, poem: 3, manifesto: 4, review: 4, anything: 2,
  per_star: 1, read: 1, like_received: 1,
  mystery: 3, challenge: 4, quiz_correct: 1, featured: 5,
};
const getSetting = async (k) => {
  const row = (await db.execute({ sql: "SELECT value FROM point_settings WHERE key=?", args: [k] })).rows[0];
  return row ? row.value : (DEFAULT_POINTS[k] ?? 0);
};

// ── Seed students ─────────────────────────────────────────────
function makeUsername(name, ad_no) {
  const first = name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  return (first || "student") + ad_no;
}

// ── Password hashing (scrypt, stdlib only) ────────────────────
function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  const h = crypto.scryptSync(pw, salt, 64).toString("hex");
  return `scrypt$${salt}$${h}`;
}
function verifyPassword(pw, stored) {
  if (!stored) return false;
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const h = crypto.scryptSync(pw, parts[1], 64);
  const want = Buffer.from(parts[2], "hex");
  return h.length === want.length && crypto.timingSafeEqual(h, want);
}
function randomPassword(len = 8) {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[crypto.randomInt(chars.length)];
  return s;
}
// Simple 4-digit PINs for young students — easy to type on a phone.
function randomPin() {
  return String(crypto.randomInt(1000, 10000));
}
// ── Seed one parent login per student (4-digit PIN, teacher-visible) ──
// Runs on every startup and after every DB restore; skips students that
// already have a parent user, so PINs stay stable across restarts, wipes
// and restores, and new admissions get one automatically.
async function seedParentUsers() {
  const mkParent = async (s) => {
    const uname = ("parent-" + s.username).toLowerCase();
    if ((await db.execute({ sql: "SELECT id FROM users WHERE username=?", args: [uname] })).rows[0]) return;
    if ((await db.execute({ sql: "SELECT id FROM users WHERE role='parent' AND parent_of=?", args: [s.id] })).rows[0]) return;
    const pin = randomPin();
    await db.execute({ sql: "INSERT INTO users (username, password_hash, role, display_name, pin, parent_of) VALUES (?,?,?,?,?,?)", args: [uname, hashPassword(pin), "parent", "Parent of " + s.display_name, pin, s.id] });
  };
  try {
    for (const s of (await db.execute({ sql: "SELECT id, username, display_name FROM users WHERE role='student'", args: [] })).rows) await mkParent(s);
  } catch (e) { console.log("Parent seeding:", e.message); }
}
// (seedParentUsers is called from initDb)

// ── Points & badges ───────────────────────────────────────────
const BADGES = [
  { key: "best_story", name: "Best Story", icon: "🏆", desc: "Awarded by the teacher for the best story." },
  { key: "rising_author", name: "Rising Author", icon: "🌟", desc: "Reached 50 points." },
  { key: "story_champion", name: "Story Champion", icon: "👑", desc: "Reached #1 on the points board." },
];
async function totalPoints(student_id) {
  const r = (await db.execute({ sql: "SELECT COALESCE(SUM(points),0) AS t FROM points_log WHERE student_id=?", args: [student_id] })).rows[0];
  return r.t;
}
async function studentStats(student_id) {
  const approved = (await db.execute({ sql: "SELECT COUNT(*) c FROM works WHERE student_id=? AND status='approved'", args: [student_id] })).rows[0].c;
  const reads = (await db.execute({ sql: "SELECT COUNT(*) c FROM reads WHERE student_id=?", args: [student_id] })).rows[0].c;
  const solves = (await db.execute({ sql: "SELECT COUNT(*) c FROM mystery_solves WHERE student_id=?", args: [student_id] })).rows[0].c;
  const chall = (await db.execute({ sql: "SELECT COUNT(*) c FROM challenge_entries WHERE student_id=? AND status='done'", args: [student_id] })).rows[0].c;
  const stars = (await db.execute({ sql: "SELECT COALESCE(SUM(stars),0) s FROM works WHERE student_id=? AND status='approved'", args: [student_id] })).rows[0].s;
  return { approved, reads, solves, chall, stars, points: await totalPoints(student_id) };
}
async function checkBadges(student_id) {
  // Auto-awarded badges only: Rising Author (50 points) and Story Champion (#1).
  // The Best Story badge is awarded manually by the teacher via /api/teacher/badge.
  const st = await studentStats(student_id);
  const have = new Set((await db.execute({ sql: "SELECT badge_key FROM student_badges WHERE student_id=?", args: [student_id] })).rows.map(r => r.badge_key));
  const earn = [];
  if (st.points >= 50) earn.push("rising_author");
  const top = (await db.execute({ sql: `
    SELECT u.id FROM users u
    LEFT JOIN points_log p ON p.student_id = u.id
    WHERE u.role='student'
    GROUP BY u.id ORDER BY COALESCE(SUM(p.points),0) DESC LIMIT 1`, args: [] })).rows[0];
  if (top && top.id === student_id) earn.push("story_champion");
  const ins_sql = "INSERT OR IGNORE INTO student_badges (student_id, badge_key) VALUES (?,?)";
  for (const k of earn) if (!have.has(k)) await db.execute({ sql: ins_sql, args: [student_id, k] });
}
async function awardPoints(student_id, points, reason, ref_type = null, ref_id = null) {
  if (!points || points <= 0) return;
  await db.execute({ sql: "INSERT INTO points_log (student_id, points, reason, ref_type, ref_id) VALUES (?,?,?,?,?)", args: [student_id, points, reason, ref_type, ref_id] });
  await checkBadges(student_id);
}
async function removePoints(student_id, points, reason) {
  if (!points || points <= 0) return;
  await db.execute({ sql: "INSERT INTO points_log (student_id, points, reason) VALUES (?,?,?)", args: [student_id, -points, reason] });
}
// Who-did-what log (logins, mentor/teacher ticks) — shown in the admin Activity tab.
async function logActivity(user_id, role, action, detail, ref_type, ref_id) {
  try {
    await db.execute({ sql: "INSERT INTO activity_log (user_id, role, action, detail, ref_type, ref_id) VALUES (?,?,?,?,?,?)", args: [user_id, role, action, detail || null, ref_type || null, ref_id || null] });
  } catch (e) { console.log("activity log:", e.message); }
}

// ── App & session middleware ──────────────────────────────────
const app = express();
app.use(express.json({ limit: "50mb" }));

async function getSessionUser(req) {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (!m) return null;
  const s = (await db.execute({ sql: "SELECT user_id, impersonated_from FROM sessions WHERE token=?", args: [m[1]] })).rows[0];
  if (!s) return null;
  const u = (await db.execute({ sql: "SELECT id, username, role, display_name, ad_no, photo, bio FROM users WHERE id=?", args: [s.user_id] })).rows[0];
  if (!u) return null;
  if (s.impersonated_from) u.impersonating = true;
  return u;
}
app.use(async (req, res, next) => { req.user = await getSessionUser(req); next(); });

const requireLogin = (req, res, next) => req.user ? next() : res.status(401).json({ error: "Please log in." });
const requireTeacher = (req, res, next) =>
  req.user && req.user.role === "teacher" ? next() : res.status(403).json({ error: "Teacher only." });
const requireStudent = (req, res, next) =>
  req.user && req.user.role === "student" ? next() : res.status(403).json({ error: "Students only." });
const requireGuest = (req, res, next) =>
  req.user && req.user.role === "guest" ? next() : res.status(403).json({ error: "Guest only." });
const requireParent = (req, res, next) =>
  req.user && req.user.role === "parent" ? next() : res.status(403).json({ error: "Parents only." });
const requireTeacherOrGuest = (req, res, next) =>
  req.user && (req.user.role === "teacher" || req.user.role === "guest") ? next() : res.status(403).json({ error: "Teacher or guest only." });

// ── Auth ──────────────────────────────────────────────────────
app.post("/api/setup", async (req, res) => {
  const existing = (await db.execute({ sql: "SELECT COUNT(*) c FROM users WHERE role='teacher'", args: [] })).rows[0].c;
  if (existing > 0) return res.status(400).json({ error: "A teacher account already exists." });
  const { username, password, name } = req.body || {};
  if (!username || !password || password.length < 4)
    return res.status(400).json({ error: "Username and a password of 4+ characters are required." });
  await db.execute({ sql: "INSERT INTO users (username, password_hash, role, display_name) VALUES (?,?,?,?)", args: [username.trim(), hashPassword(password), "teacher", (name || "Teacher").trim()] });
  res.json({ ok: true });
});

app.post("/api/login", async (req, res) => {
  const { username, student_id, password } = req.body || {};
  let user = null;
  if (student_id) user = (await db.execute({ sql: "SELECT * FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  else if (username) user = (await db.execute({ sql: "SELECT * FROM users WHERE username=?", args: [String(username).trim().toLowerCase()] })).rows[0];
  if (!user) return res.status(401).json({ error: "Account not found." });
  if (!user.password_hash) return res.status(401).json({ error: "No password set yet — please ask your teacher." });
  if (!verifyPassword(password || "", user.password_hash)) return res.status(401).json({ error: "Wrong password." });
  const token = crypto.randomBytes(32).toString("hex");
  await db.execute({ sql: "INSERT INTO sessions (token, user_id) VALUES (?,?)", args: [token, user.id] });
  await logActivity(user.id, user.role, "login", null, null, null);
  res.setHeader("Set-Cookie", `lhbs_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${30 * 86400}`);
  res.json({ ok: true, role: user.role });
});

async function doLogout(req, res) {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (m) await db.execute({ sql: "DELETE FROM sessions WHERE token=?", args: [m[1]] });
  res.setHeader("Set-Cookie", "lhbs_session=; HttpOnly; Path=/; Max-Age=0");
}
app.post("/api/logout", async (req, res) => { await doLogout(req, res); res.json({ ok: true }); });
// Plain GET logout: a simple link that always works, even if JS fails.
app.get("/api/logout", async (req, res) => { await doLogout(req, res); res.redirect("/index.html"); });

app.get("/api/me", (req, res) => res.json({ user: req.user }));
// Mentor's own profile (photo, full name, DOB, class, ad no).
app.get("/api/mentor/profile", requireGuest, async (req, res) => {
  const p = (await db.execute({ sql: "SELECT display_name, ad_no, photo, dob, class_name, bio FROM users WHERE id=?", args: [req.user.id] })).rows[0];
  res.json({ profile: p || {} });
});
// Teacher: update a mentor's profile.
app.post("/api/teacher/guest/:id/profile", requireTeacher, async (req, res) => {
  const { display_name, ad_no, dob, class_name, photo, bio } = req.body || {};
  await db.execute({ sql: "UPDATE users SET display_name=COALESCE(?,display_name), ad_no=?, dob=?, class_name=?, photo=?, bio=? WHERE id=? AND role='guest'", args: [display_name || null, ad_no || null, dob || null, class_name || null, photo || null, bio || null, req.params.id] });
  res.json({ ok: true });
});

// ── Parents (view-only) ─────────────────────────────────────────
// A parent sees: their own child's full progress (points, works, books,
// weekly-task completion) + every child's public scoreboard, books and
// published writings. They never see other children's task progress,
// and cannot write, submit, like or edit anything (all write endpoints
// require the student role).
app.get("/api/parent/child", requireParent, async (req, res) => {
  const me = (await db.execute({ sql: "SELECT parent_of FROM users WHERE id=?", args: [req.user.id] })).rows[0];
  if (!me || !me.parent_of) return res.status(404).json({ error: "No linked student." });
  const sid = me.parent_of;
  const s = (await db.execute({ sql: "SELECT id, display_name, ad_no, photo FROM users WHERE id=? AND role='student'", args: [sid] })).rows[0];
  if (!s) return res.status(404).json({ error: "Linked student not found." });
  const points = (await db.execute({ sql: "SELECT COALESCE(SUM(points),0) AS t FROM points_log WHERE student_id=?", args: [sid] })).rows[0].t;
  const stars = (await db.execute({ sql: "SELECT COALESCE(SUM(stars),0) AS s FROM works WHERE student_id=? AND status='approved'", args: [sid] })).rows[0].s;
  const badgeCount = (await db.execute({ sql: "SELECT COUNT(*) AS c FROM student_badges WHERE student_id=?", args: [sid] })).rows[0].c;
  const works = (await db.execute({ sql: `SELECT id, type, title, language, stars, featured, created_at
    FROM works WHERE student_id=? AND status='approved' ORDER BY created_at DESC`, args: [sid] })).rows;
  const books = (await db.execute({ sql: `SELECT b.id, b.title, b.pages, b.created_at FROM books b
    JOIN works w ON w.id=b.work_id WHERE w.student_id=? ORDER BY b.created_at DESC`, args: [sid] })).rows;
  const tasks = (await db.execute({ sql: "SELECT id, title, kind, points, start_date FROM weekly_tasks ORDER BY start_date DESC", args: [] })).rows;
  const doneTaskIds = new Set((await db.execute({ sql: "SELECT weekly_task_id AS t FROM works WHERE student_id=? AND status='approved' AND weekly_task_id IS NOT NULL", args: [sid] })).rows.map(r => r.t));
  const doneQuizIds = new Set((await db.execute({ sql: "SELECT task_id AS t FROM quiz_attempts WHERE student_id=?", args: [sid] })).rows.map(r => r.t));
  const taskProgress = tasks.map(t => ({
    id: t.id, title: t.title, kind: t.kind, points: t.points, start_date: t.start_date,
    done: t.kind === "quiz" ? doneQuizIds.has(t.id) : doneTaskIds.has(t.id),
  }));
  // Learning tasks progress (own child only) — percentage + per-category summary
  const lp = await learningProgress(sid);
  const catRows = (await db.execute({ sql: `SELECT lt.category AS c, COUNT(*) AS total,
      SUM(CASE WHEN ltd.student_id IS NOT NULL THEN 1 ELSE 0 END) AS done
    FROM learning_tasks lt LEFT JOIN learning_task_done ltd
      ON ltd.task_id = lt.id AND ltd.student_id = ?
    GROUP BY lt.category`, args: [sid] })).rows;
  const learnCats = catRows.map(r => ({
    category: r.c, label: (LEARN_CATS[r.c] || r.c),
    done: r.done, total: r.total,
    pct: r.total ? Math.round(r.done / r.total * 100) : 0,
  }));
  res.json({ student: s, points, stars, badgeCount,
    worksCount: works.length, books, works, taskProgress,
    learning: { ...lp, cats: learnCats } });
});

// Teacher: list parent logins (PINs visible to teacher only).
app.get("/api/teacher/parents", requireTeacher, async (req, res) => {
  const rows = (await db.execute({ sql: `SELECT u.id AS student_id, u.display_name, u.ad_no,
      p.username AS parent_username, p.pin AS parent_pin
    FROM users u LEFT JOIN users p ON p.parent_of = u.id AND p.role='parent'
    WHERE u.role='student' ORDER BY u.display_name`, args: [] })).rows;
  res.json({ parents: rows });
});
// Teacher: regenerate a parent's 4-digit PIN.
app.post("/api/teacher/parent/:student_id/regenerate-pin", requireTeacher, async (req, res) => {
  const p = (await db.execute({ sql: "SELECT id FROM users WHERE role='parent' AND parent_of=?", args: [req.params.student_id] })).rows[0];
  if (!p) return res.status(404).json({ error: "No parent account for this student." });
  const pin = randomPin();
  await db.execute({ sql: "UPDATE users SET password_hash=?, pin=? WHERE id=?", args: [hashPassword(pin), pin, p.id] });
  res.json({ ok: true, pin });
});

// Teacher "login as student": pick the boy, no PIN needed (teacher is already authenticated).
app.post("/api/teacher/impersonate", requireTeacher, async (req, res) => {
  const { student_id } = req.body || {};
  const s = (await db.execute({ sql: "SELECT id, display_name FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Student not found." });
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (!m) return res.status(401).json({ error: "Teacher session lost — log in again." });
  const token = crypto.randomBytes(32).toString("hex");
  await db.execute({ sql: "INSERT INTO sessions (token, user_id, impersonated_from) VALUES (?,?,?)", args: [token, s.id, m[1]] });
  res.setHeader("Set-Cookie", `lhbs_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${30 * 86400}`);
  res.json({ ok: true });
});
// Back to teacher: restore the saved teacher session.
app.post("/api/impersonate/exit", requireLogin, async (req, res) => {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (!m) return res.status(401).json({ error: "No session." });
  const s = (await db.execute({ sql: "SELECT impersonated_from FROM sessions WHERE token=?", args: [m[1]] })).rows[0];
  if (!s || !s.impersonated_from) return res.status(400).json({ error: "Not an impersonated session." });
  const back = (await db.execute({ sql: "SELECT user_id FROM sessions WHERE token=?", args: [s.impersonated_from] })).rows[0];
  await db.execute({ sql: "DELETE FROM sessions WHERE token=?", args: [m[1]] });
  if (!back) return res.status(401).json({ error: "Teacher session expired — please log in again." });
  res.setHeader("Set-Cookie", `lhbs_session=${s.impersonated_from}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${30 * 86400}`);
  res.json({ ok: true });
});

// Name grid for the tap-to-login screen (names + photos only — no secrets).
app.get("/api/taplist", async (req, res) => {
  const rows = (await db.execute({ sql: "SELECT id, username, display_name, photo FROM users WHERE role='student' ORDER BY display_name", args: [] })).rows;
  res.json({ students: rows });
});

// ── Student: dashboard ────────────────────────────────────────
app.get("/api/dashboard", requireLogin, async (req, res) => {
  if (req.user.role !== "student") return res.json({ role: req.user.role });
  const st = await studentStats(req.user.id);
  const badges = (await db.execute({ sql: "SELECT badge_key FROM student_badges WHERE student_id=?", args: [req.user.id] })).rows.map(r => r.badge_key);
  // rank (all-time)
  const board = (await db.execute({ sql: `
    SELECT u.id, COALESCE(SUM(p.points),0) AS pts FROM users u
    LEFT JOIN points_log p ON p.student_id=u.id WHERE u.role='student'
    GROUP BY u.id ORDER BY pts DESC`, args: [] })).rows;
  const rank = board.findIndex(r => r.id === req.user.id) + 1;
  // points broken down by source (for the "where my points came from" graph)
  const byType = (await db.execute({ sql: `SELECT COALESCE(ref_type,'other') AS t, COALESCE(SUM(points),0) AS pts
    FROM points_log WHERE student_id=? GROUP BY t ORDER BY pts DESC`, args: [req.user.id] })).rows;
  // weekly-task completion (approved work linked to a task, or a quiz attempt)
  const weeklyTotal = (await db.execute({ sql: "SELECT COUNT(*) AS c FROM weekly_tasks", args: [] })).rows[0].c;
  const weeklyDone = (await db.execute({ sql: `SELECT COUNT(DISTINCT tid) AS c FROM (
      SELECT weekly_task_id AS tid FROM works WHERE student_id=? AND status='approved' AND weekly_task_id IS NOT NULL
      UNION SELECT task_id AS tid FROM quiz_attempts WHERE student_id=?
    )`, args: [req.user.id, req.user.id] })).rows[0].c;
  res.json({ points: st.points, rank, approved: st.approved, stars: st.stars, badges, stats: st,
    byType, weekly: { done: weeklyDone, total: weeklyTotal } });
});

// ── Student: works ────────────────────────────────────────────
const WORK_TYPES = ["story", "diary", "letter", "poem", "manifesto", "review", "anything"];
const LANGUAGES = ["English", "Malayalam", "Manglish", "Arabic", "Urdu", "Kannada"];

app.post("/api/works", requireStudent, async (req, res) => {
  const { type, language, title, content, weekly_task_id } = req.body || {};
  if (!WORK_TYPES.includes(type)) return res.status(400).json({ error: "Invalid writing type." });
  if (!LANGUAGES.includes(language)) return res.status(400).json({ error: "Invalid language." });
  if (!title || !title.trim() || !content || !content.trim())
    return res.status(400).json({ error: "Title and content are required." });
  let taskId = null;
  if (weekly_task_id) {
    const t = (await db.execute({ sql: "SELECT id, kind FROM weekly_tasks WHERE id=?", args: [weekly_task_id] })).rows[0];
    if (t && t.kind !== "quiz") taskId = t.id;
  }
  const r = await db.execute({ sql: `INSERT INTO works (student_id, type, language, title, content, weekly_task_id)
    VALUES (?,?,?,?,?,?)`, args: [req.user.id, type, language, title.trim(), content.trim(), taskId] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});

// Mentor (guest) writes a work in a student's name → goes to the teacher's approval queue as that student's work
app.post("/api/guest/works", requireGuest, async (req, res) => {
  const { student_id, type, language, title, content } = req.body || {};
  if (!WORK_TYPES.includes(type)) return res.status(400).json({ error: "Invalid writing type." });
  if (!LANGUAGES.includes(language)) return res.status(400).json({ error: "Invalid language." });
  if (!title || !title.trim() || !content || !content.trim())
    return res.status(400).json({ error: "Title and content are required." });
  const stu = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  if (!stu) return res.status(400).json({ error: "Please choose a student." });
  const r = await db.execute({ sql: `INSERT INTO works (student_id, type, language, title, content, weekly_task_id)
    VALUES (?,?,?,?,?,NULL)`, args: [stu.id, type, language, title.trim(), content.trim()] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});

// ── Temporary download files (certificate / poster images & PDFs) ──
// iPhone/iPad cannot save files from in-page downloads, so the client uploads the
// generated file here and opens a real page where it can be saved to Photos/Files.
const dlStore = new Map(); // id -> { buf, type, name, exp }
function dlClean() {
  const now = Date.now();
  for (const [k, v] of dlStore) if (v.exp < now) dlStore.delete(k);
  while (dlStore.size > 20) dlStore.delete(dlStore.keys().next().value);
}
app.post("/api/save-file", requireLogin, express.raw({ type: ["image/png", "application/pdf"], limit: "30mb" }), (req, res) => {
  if (!req.body || !req.body.length) return res.status(400).json({ error: "Empty file." });
  dlClean();
  const id = require("crypto").randomBytes(12).toString("hex");
  const type = req.headers["content-type"] === "application/pdf" ? "application/pdf" : "image/png";
  const name = String(req.headers["x-filename"] || (type === "application/pdf" ? "file.pdf" : "image.png")).replace(/[^\w.\- ]+/g, "").slice(0, 80) || "file";
  dlStore.set(id, { buf: req.body, type, name, exp: Date.now() + 30 * 60 * 1000 });
  res.json({ ok: true, url: "/api/save-file/" + id });
});
app.get("/api/save-file/:id", (req, res) => {
  dlClean();
  const f = dlStore.get(req.params.id);
  if (!f) return res.status(404).send("This file has expired. Please go back and tap the download button again.");
  if (f.type === "application/pdf") {
    return res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${f.name}</title></head>
<body style="font-family:sans-serif;text-align:center;padding:30px;background:#f2f5f7">
<h2>📄 Your PDF is ready</h2>
<p><a href="/api/save-file/${req.params.id}/raw?dl=1" style="display:inline-block;background:#0e7c8c;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:1.1rem">⬇️ Download PDF</a></p>
<p><button onclick="history.back()" style="padding:10px 22px;border-radius:10px;border:2px solid #94a3b8;background:#fff;font-weight:700">⬅️ Back</button></p>
</body></html>`);
  }
  res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${f.name}</title></head>
<body style="font-family:sans-serif;text-align:center;padding:16px;background:#f2f5f7;margin:0">
<h3 style="margin:8px 0">📥 Your image is ready</h3>
<p style="color:#475569;margin:4px 0 12px">Press &amp; hold the image, then tap <b>“Save to Photos”</b></p>
<img src="/api/save-file/${req.params.id}/raw" style="max-width:96vw;height:auto;border-radius:8px;background:#fff;box-shadow:0 4px 18px rgba(0,0,0,.15)">
<p style="margin-top:14px"><a href="/api/save-file/${req.params.id}/raw?dl=1" style="display:inline-block;background:#0e7c8c;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:700">⬇️ Download Image</a>
&nbsp;<button onclick="history.back()" style="padding:12px 22px;border-radius:10px;border:2px solid #94a3b8;background:#fff;font-weight:700">⬅️ Back</button></p>
</body></html>`);
});
app.get("/api/save-file/:id/raw", (req, res) => {
  dlClean();
  const f = dlStore.get(req.params.id);
  if (!f) return res.status(404).send("Expired.");
  res.setHeader("Content-Type", f.type);
  if (req.query.dl) res.setHeader("Content-Disposition", `attachment; filename="${f.name}"`);
  res.send(f.buf);
});

app.get("/api/works", requireLogin, async (req, res) => {
  const { q, type, language, author, featured } = req.query;
  let sql = `SELECT w.id, w.type, w.language, w.title, w.stars, w.featured, w.created_at,
      u.display_name AS author, u.id AS author_id,
      (SELECT COUNT(*) FROM likes l WHERE l.work_id=w.id) AS likes,
      (SELECT COUNT(*) FROM reads r WHERE r.work_id=w.id) AS reads
    FROM works w JOIN users u ON u.id=w.student_id
    WHERE w.status='approved'`;
  const args = [];
  if (q) { sql += " AND (w.title LIKE ? OR w.content LIKE ? OR u.display_name LIKE ?)"; args.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  if (type && WORK_TYPES.includes(type)) { sql += " AND w.type=?"; args.push(type); }
  if (language && LANGUAGES.includes(language)) { sql += " AND w.language=?"; args.push(language); }
  if (author) { sql += " AND u.display_name LIKE ?"; args.push(`%${author}%`); }
  if (featured) { sql += " AND w.featured=1"; }
  sql += " ORDER BY w.featured DESC, w.created_at DESC LIMIT 200";
  res.json({ works: (await db.execute({ sql: sql, args: args })).rows });
});

app.get("/api/work/:id", requireLogin, async (req, res) => {
  const w = (await db.execute({ sql: `SELECT w.*, u.display_name AS author, u.photo AS author_photo
    FROM works w JOIN users u ON u.id=w.student_id WHERE w.id=?`, args: [req.params.id] })).rows[0];
  if (!w) return res.status(404).json({ error: "Not found." });
  const isOwner = req.user.id === w.student_id;
  const isTeacher = req.user.role === "teacher";
  if (w.status !== "approved" && !isOwner && !isTeacher)
    return res.status(403).json({ error: "This piece is waiting for the teacher's approval." });
  let liked = false, justRead = false;
  if (req.user.role === "student" && !isOwner && w.status === "approved") {
    liked = !!(await db.execute({ sql: "SELECT 1 FROM likes WHERE work_id=? AND student_id=?", args: [w.id, req.user.id] })).rows[0];
    const r = await db.execute({ sql: "INSERT OR IGNORE INTO reads (work_id, student_id) VALUES (?,?)", args: [w.id, req.user.id] });
    if (r.changes > 0) { justRead = true; await awardPoints(req.user.id, await getSetting("read"), `Read "${w.title}"`, "read", w.id); }
  }
  const likes = (await db.execute({ sql: "SELECT COUNT(*) c FROM likes WHERE work_id=?", args: [w.id] })).rows[0].c;
  const reads = (await db.execute({ sql: "SELECT COUNT(*) c FROM reads WHERE work_id=?", args: [w.id] })).rows[0].c;
  res.json({ work: { ...w, content: w.content }, likes, reads, liked, isOwner });
});

app.post("/api/work/:id/like", requireStudent, async (req, res) => {
  const w = (await db.execute({ sql: "SELECT * FROM works WHERE id=? AND status='approved'", args: [req.params.id] })).rows[0];
  if (!w) return res.status(404).json({ error: "Not found." });
  if (w.student_id === req.user.id) return res.status(400).json({ error: "You cannot like your own work." });
  const ex = (await db.execute({ sql: "SELECT id FROM likes WHERE work_id=? AND student_id=?", args: [w.id, req.user.id] })).rows[0];
  if (ex) { await db.execute({ sql: "DELETE FROM likes WHERE id=?", args: [ex.id] }); return res.json({ ok: true, liked: false }); }
  await db.execute({ sql: "INSERT INTO likes (work_id, student_id) VALUES (?,?)", args: [w.id, req.user.id] });
  await awardPoints(w.student_id, await getSetting("like_received"), `Received a like on "${w.title}"`, "like", w.id);
  res.json({ ok: true, liked: true });
});

app.get("/api/my/works", requireStudent, async (req, res) => {
  const rows = (await db.execute({ sql: "SELECT id, type, language, title, status, stars, points_awarded, created_at FROM works WHERE student_id=? ORDER BY created_at DESC", args: [req.user.id] })).rows;
  res.json({ works: rows });
});

// ── Weekly tasks & quizzes ────────────────────────────────────
function taskDeadline(start_date) {
  // Pure calendar math in UTC so the deadline is exact in every timezone.
  const parts = String(start_date).split("-").map(Number);
  const dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + 7));
  return dt.toISOString().slice(0, 10);
}
function withDeadline(t) {
  if (!t) return null;
  const dl = taskDeadline(t.start_date);
  const daysLeft = Math.max(0, Math.ceil((new Date(dl) - new Date()) / 86400000));
  return { ...t, deadline: dl, daysLeft };
}
app.get("/api/weekly-tasks", requireLogin, async (req, res) => {
  const tasks = (await db.execute({ sql: "SELECT * FROM weekly_tasks ORDER BY start_date DESC", args: [] })).rows;
  const current = tasks.length ? withDeadline(tasks[0]) : null;
  const archive = tasks.slice(1).map(withDeadline);
  if (current && current.kind === "quiz")
    current.questionCount = (await db.execute({ sql: "SELECT COUNT(*) c FROM quiz_questions WHERE task_id=?", args: [current.id] })).rows[0].c;
  res.json({ current, archive });
});
app.get("/api/quiz/:id/questions", requireLogin, async (req, res) => {
  const t = (await db.execute({ sql: "SELECT * FROM weekly_tasks WHERE id=? AND kind='quiz'", args: [req.params.id] })).rows[0];
  if (!t) return res.status(404).json({ error: "Quiz not found." });
  const qs = (await db.execute({ sql: "SELECT id, question FROM quiz_questions WHERE task_id=? ORDER BY sort_order", args: [t.id] })).rows;
  const mine = req.user.role === "student"
    ? (await db.execute({ sql: "SELECT score, total, points_awarded FROM quiz_attempts WHERE task_id=? AND student_id=?", args: [t.id, req.user.id] })).rows[0]
    : null;
  res.json({ task: withDeadline(t), questions: qs, myAttempt: mine });
});
const norm = s => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
app.post("/api/quiz/:id/attempt", requireStudent, async (req, res) => {
  const t = (await db.execute({ sql: "SELECT * FROM weekly_tasks WHERE id=? AND kind='quiz'", args: [req.params.id] })).rows[0];
  if (!t) return res.status(404).json({ error: "Quiz not found." });
  const ex = (await db.execute({ sql: "SELECT * FROM quiz_attempts WHERE task_id=? AND student_id=?", args: [t.id, req.user.id] })).rows[0];
  if (ex) return res.json({ ok: true, already: true, score: ex.score, total: ex.total, points: ex.points_awarded });
  const qs = (await db.execute({ sql: "SELECT * FROM quiz_questions WHERE task_id=? ORDER BY sort_order", args: [t.id] })).rows;
  const answers = (req.body && req.body.answers) || [];
  let score = 0;
  const detail = qs.map((q, i) => {
    const ok = norm(answers[i]) === norm(q.answer) && norm(answers[i]) !== "";
    if (ok) score++;
    return { question: q.question, given: answers[i] || "", correct: ok, answer: q.answer };
  });
  const perCorrect = t.points || await getSetting("quiz_correct");
  const pts = score * perCorrect;
  await db.execute({ sql: "INSERT INTO quiz_attempts (task_id, student_id, score, total, points_awarded, answers_json) VALUES (?,?,?,?,?,?)", args: [t.id, req.user.id, score, qs.length, pts, JSON.stringify(detail)] });
  await awardPoints(req.user.id, pts, `Quiz: ${t.title} (${score}/${qs.length})`, "quiz", t.id);
  res.json({ ok: true, score, total: qs.length, points: pts, detail });
});

// ── Mystery room ──────────────────────────────────────────────
app.get("/api/mysteries", requireLogin, async (req, res) => {
  const rows = (await db.execute({ sql: "SELECT id, title, description, points, created_at FROM mysteries ORDER BY created_at DESC", args: [] })).rows;
  const solved = req.user.role === "student"
    ? new Set((await db.execute({ sql: "SELECT mystery_id FROM mystery_solves WHERE student_id=?", args: [req.user.id] })).rows.map(r => r.mystery_id))
    : new Set();
  res.json({ mysteries: rows.map(m => ({ ...m, solved: solved.has(m.id) })) });
});
app.post("/api/mystery/:id/solve", requireStudent, async (req, res) => {
  const m = (await db.execute({ sql: "SELECT * FROM mysteries WHERE id=?", args: [req.params.id] })).rows[0];
  if (!m) return res.status(404).json({ error: "Not found." });
  const dup = (await db.execute({ sql: "SELECT 1 FROM mystery_solves WHERE mystery_id=? AND student_id=?", args: [m.id, req.user.id] })).rows[0];
  if (dup) return res.json({ ok: true, correct: true, already: true });
  if (norm(req.body && req.body.answer) === norm(m.solution) && norm(m.solution) !== "") {
    await db.execute({ sql: "INSERT INTO mystery_solves (mystery_id, student_id) VALUES (?,?)", args: [m.id, req.user.id] });
    await awardPoints(req.user.id, m.points, `Solved mystery: ${m.title}`, "mystery", m.id);
    return res.json({ ok: true, correct: true, points: m.points });
  }
  res.json({ ok: true, correct: false });
});

// ── Challenges ────────────────────────────────────────────────
app.get("/api/challenges", requireLogin, async (req, res) => {
  const rows = (await db.execute({ sql: "SELECT * FROM challenges ORDER BY created_at DESC", args: [] })).rows;
  let mine = [];
  if (req.user.role === "student")
    mine = (await db.execute({ sql: "SELECT challenge_id, status FROM challenge_entries WHERE student_id=?", args: [req.user.id] })).rows;
  res.json({ challenges: rows, myEntries: mine });
});
app.post("/api/challenge/:id/enter", requireStudent, async (req, res) => {
  const c = (await db.execute({ sql: "SELECT * FROM challenges WHERE id=?", args: [req.params.id] })).rows[0];
  if (!c) return res.status(404).json({ error: "Not found." });
  const content = (req.body && req.body.content || "").trim();
  if (!content) return res.status(400).json({ error: "Please write your entry." });
  const r = await db.execute({ sql: "INSERT INTO challenge_entries (challenge_id, student_id, content) VALUES (?,?,?)", args: [c.id, req.user.id, content] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});

// ── Points board, authors, writer of week, badges ─────────────
app.get("/api/points-board", requireLogin, async (req, res) => {
  const period = req.query.period === "month" ? "month" : "all";
  const dateFilter = period === "month" ? "AND p.created_at >= date('now','-30 days')" : "";
  const rows = (await db.execute({ sql: `
    SELECT u.id, u.display_name, u.photo,
      COALESCE(SUM(p.points),0) AS points,
      COALESCE((SELECT SUM(w.stars) FROM works w WHERE w.student_id=u.id AND w.status='approved'),0) AS stars,
      (SELECT COUNT(*) FROM works w WHERE w.student_id=u.id AND w.status='approved') AS works
    FROM users u LEFT JOIN points_log p ON p.student_id=u.id ${dateFilter}
    WHERE u.role='student'
    GROUP BY u.id ORDER BY points DESC, u.display_name`, args: [] })).rows;
  res.json({ period, board: rows });
});
app.get("/api/authors", requireLogin, async (req, res) => {
  const rows = (await db.execute({ sql: `
    SELECT u.id, u.display_name, u.photo, u.bio,
      COALESCE((SELECT SUM(p.points) FROM points_log p WHERE p.student_id=u.id),0) AS points,
      (SELECT COUNT(*) FROM works w WHERE w.student_id=u.id AND w.status='approved') AS works
    FROM users u WHERE u.role='student' ORDER BY u.display_name`, args: [] })).rows;
  res.json({ authors: rows });
});
app.get("/api/author/:id", requireLogin, async (req, res) => {
  const a = (await db.execute({ sql: "SELECT id, display_name, photo, bio FROM users WHERE id=? AND role='student'", args: [req.params.id] })).rows[0];
  if (!a) return res.status(404).json({ error: "Not found." });
  const st = await studentStats(a.id);
  const badges = (await db.execute({ sql: "SELECT badge_key FROM student_badges WHERE student_id=?", args: [a.id] })).rows.map(r => r.badge_key);
  const works = (await db.execute({ sql: "SELECT id, type, language, title, stars, featured, created_at FROM works WHERE student_id=? AND status='approved' ORDER BY created_at DESC", args: [a.id] })).rows;
  res.json({ author: a, stats: st, badges, works });
});
app.get("/api/writer-of-week", requireLogin, async (req, res) => {
  const w = (await db.execute({ sql: `SELECT w.note, w.created_at, u.display_name, u.photo, u.id AS student_id
    FROM writer_of_week w JOIN users u ON u.id=w.student_id ORDER BY w.id DESC LIMIT 1`, args: [] })).rows[0];
  res.json({ writer: w || null });
});
// Teacher-only: award or revoke the Best Story badge.
app.post("/api/teacher/badge", requireTeacher, async (req, res) => {
  const { student_id, award } = req.body || {};
  const s = (await db.execute({ sql: "SELECT id, display_name FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Student not found." });
  if (award) await db.execute({ sql: "INSERT OR IGNORE INTO student_badges (student_id, badge_key) VALUES (?, 'best_story')", args: [s.id] });
  else await db.execute({ sql: "DELETE FROM student_badges WHERE student_id=? AND badge_key='best_story'", args: [s.id] });
  await logActivity(req.user.id, req.user.role, award ? "badge" : "unbadge",
    `${award ? "Awarded" : "Removed"} Best Story badge ${award ? "to" : "from"} ${s.display_name}`, "badge", s.id);
  res.json({ ok: true });
});
app.get("/api/badges", requireLogin, (req, res) => res.json({ badges: BADGES }));
app.get("/api/my/badges", requireStudent, async (req, res) => {
  const mine = (await db.execute({ sql: "SELECT badge_key, awarded_at FROM student_badges WHERE student_id=?", args: [req.user.id] })).rows;
  res.json({ badges: BADGES, mine });
});

// ── Teacher panel ─────────────────────────────────────────────
app.get("/api/teacher/overview", requireTeacher, async (req, res) => {
  const pending = (await db.execute({ sql: "SELECT COUNT(*) c FROM works WHERE status='pending'", args: [] })).rows[0].c;
  const students = (await db.execute({ sql: "SELECT COUNT(*) c FROM users WHERE role='student'", args: [] })).rows[0].c;
  const published = (await db.execute({ sql: "SELECT COUNT(*) c FROM works WHERE status='approved'", args: [] })).rows[0].c;
  const noPw = (await db.execute({ sql: "SELECT COUNT(*) c FROM users WHERE role='student' AND password_hash IS NULL", args: [] })).rows[0].c;
  res.json({ pending, students, published, noPw });
});

app.get("/api/teacher/pending", requireTeacher, async (req, res) => {
  const rows = (await db.execute({ sql: `SELECT w.*, u.display_name AS author FROM works w
    JOIN users u ON u.id=w.student_id WHERE w.status='pending' ORDER BY w.created_at`, args: [] })).rows;
  for (const r of rows) r.base_points = await getSetting(r.type);
  res.json({ works: rows });
});

app.post("/api/teacher/work/:id/review", requireTeacher, async (req, res) => {
  const w = (await db.execute({ sql: "SELECT * FROM works WHERE id=?", args: [req.params.id] })).rows[0];
  if (!w) return res.status(404).json({ error: "Not found." });
  const { decision, stars, points } = req.body || {};
  if (!["approve", "reject"].includes(decision)) return res.status(400).json({ error: "Invalid decision." });
  const st = Math.max(0, Math.min(5, parseInt(stars) || 0));
  const was = w.status;
  await db.execute({ sql: "UPDATE works SET status=?, stars=?, reviewed_at=datetime('now') WHERE id=?", args: [decision === "approve" ? "approved" : "rejected", decision === "approve" ? st : 0, w.id] });
  if (decision === "approve" && was !== "approved") {
    // Teacher can override the points at approval time; default = type points + stars.
    const defaultPts = await getSetting(w.type) + st * await getSetting("per_star");
    const pts = (points !== undefined && points !== null && points !== "")
      ? Math.max(0, parseInt(points) || 0) : defaultPts;
    await db.execute({ sql: "UPDATE works SET points_awarded=? WHERE id=?", args: [pts, w.id] });
    await awardPoints(w.student_id, pts, `Approved ${w.type} "${w.title}"`, "work", w.id);
    if (w.weekly_task_id) {
      const t = (await db.execute({ sql: "SELECT * FROM weekly_tasks WHERE id=?", args: [w.weekly_task_id] })).rows[0];
      if (t && t.kind !== "quiz") await awardPoints(w.student_id, t.points, `Weekly task: ${t.title}`, "task", t.id);
    }
    // Auto-generate an illustrated 8+ page book for approved stories (async, non-blocking).
    if (w.type === "story") {
      setImmediate(async () => {
        try {
          const { generateBookPDF } = require("./bookgen");
          const student = (await db.execute({ sql: "SELECT display_name, ad_no, bio FROM users WHERE id=?", args: [w.student_id] })).rows[0];
          const pdf = await generateBookPDF(w, student || {});
          const pages = 8; // minimum guaranteed by generator
          await db.execute({ sql: "INSERT INTO books (title, author_name, work_id, pdf_data, pages) VALUES (?,?,?,?,?)", args: [w.title, student ? student.display_name : "", w.id, pdf.toString("base64"), pages] });
          console.log(`Auto-book created for work ${w.id}`);
        } catch (e) { console.error("Auto-book failed for work " + w.id + ":", e.message); }
      });
    }
  }
  res.json({ ok: true });
});

app.post("/api/teacher/work/:id/feature", requireTeacher, async (req, res) => {
  const w = (await db.execute({ sql: "SELECT * FROM works WHERE id=?", args: [req.params.id] })).rows[0];
  if (!w) return res.status(404).json({ error: "Not found." });
  const featured = req.body && req.body.featured ? 1 : 0;
  await db.execute({ sql: "UPDATE works SET featured=? WHERE id=?", args: [featured, w.id] });
  res.json({ ok: true });
});

app.post("/api/teacher/work/:id/delete", requireTeacher, async (req, res) => {
  // Complete removal: the work, its points, its auto-book, reads and likes —
  // nothing about it stays anywhere on the site.
  const id = req.params.id;
  const w = (await db.execute({ sql: "SELECT title, student_id FROM works WHERE id=?", args: [id] })).rows[0];
  await db.execute({ sql: "DELETE FROM points_log WHERE ref_type='work' AND ref_id=?", args: [id] });
  await db.execute({ sql: "DELETE FROM books WHERE work_id=?", args: [id] });
  await db.execute({ sql: "DELETE FROM reads WHERE work_id=?", args: [id] });
  await db.execute({ sql: "DELETE FROM likes WHERE work_id=?", args: [id] });
  await db.execute({ sql: "DELETE FROM works WHERE id=?", args: [id] });
  if (w) await logActivity(req.user.id, req.user.role, "delete",
    `Deleted work \"${w.title}\" completely (points, book, reads, likes removed)`, "work", Number(id));
  res.json({ ok: true });
});

// Students & accounts — passwords only ever go to the teacher.
app.get("/api/teacher/students", requireTeacher, async (req, res) => {
  const rows = (await db.execute({ sql: `SELECT id, username, display_name, ad_no, photo, bio, pin,
    CASE WHEN password_hash IS NULL THEN 0 ELSE 1 END AS has_password
    FROM users WHERE role='student' ORDER BY display_name`, args: [] })).rows;
  res.json({ students: rows });
});
app.post("/api/teacher/generate-passwords", requireTeacher, async (req, res) => {
  const list = (await db.execute({ sql: "SELECT id, username, display_name FROM users WHERE role='student' AND password_hash IS NULL", args: [] })).rows;
  const upd_sql = "UPDATE users SET password_hash=?, pin=? WHERE id=?";
  const out = [];
  for (const s of list) {
    const pw = randomPin();
    await db.execute({ sql: upd_sql, args: [hashPassword(pw), pw, s.id] });
    out.push({ id: s.id, display_name: s.display_name, username: s.username, password: pw });
  }
  res.json({ generated: out });
});
app.post("/api/teacher/student/:id/reset-password", requireTeacher, async (req, res) => {
  const s = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='student'", args: [req.params.id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Not found." });
  const pw = randomPin();
  await db.execute({ sql: "UPDATE users SET password_hash=?, pin=? WHERE id=?", args: [hashPassword(pw), pw, s.id] });
  res.json({ ok: true, password: pw });
});
// Teacher sets an exact 4-digit PIN for a student (e.g. re-issuing a printed PIN)
app.post("/api/teacher/student/:id/set-pin", requireTeacher, async (req, res) => {
  const s = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='student'", args: [req.params.id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Not found." });
  const pin = String(((req.body || {}).pin) || "").trim();
  if (!/^\d{4}$/.test(pin)) return res.status(400).json({ error: "PIN must be exactly 4 digits." });
  await db.execute({ sql: "UPDATE users SET password_hash=?, pin=? WHERE id=?", args: [hashPassword(pin), pin, s.id] });
  res.json({ ok: true });
});
// Teacher changes their own username and/or password
app.post("/api/teacher/profile", requireTeacher, async (req, res) => {
  const { username, password } = req.body || {};
  const changes = [];
  if (username !== undefined && String(username).trim() !== "") {
    const u = String(username).trim().toLowerCase();
    if (!/^[a-z0-9]{3,30}$/.test(u)) return res.status(400).json({ error: "Username: 3-30 letters or digits." });
    const taken = (await db.execute({ sql: "SELECT id FROM users WHERE username=? AND id!=?", args: [u, req.user.id] })).rows[0];
    if (taken) return res.status(400).json({ error: "That username is taken." });
    changes.push(["username", u]);
  }
  if (password !== undefined && String(password) !== "") {
    if (String(password).length < 4) return res.status(400).json({ error: "Password must be at least 4 characters." });
    changes.push(["password_hash", hashPassword(String(password))]);
  }
  if (!changes.length) return res.status(400).json({ error: "Nothing to change." });
  for (const [col, val] of changes) await db.execute({ sql: `UPDATE users SET ${col}=? WHERE id=?`, args: [val, req.user.id] });
  const me = (await db.execute({ sql: "SELECT username FROM users WHERE id=?", args: [req.user.id] })).rows[0];
  res.json({ ok: true, username: me.username });
});
// Teacher downloads a backup as JSON (works reliably on ephemeral disks;
// restore it via POST /api/teacher/restore).
app.get("/api/teacher/backup", requireTeacher, async (req, res) => {
  const dump = {};
  for (const t of RESTORE_TABLES) {
    try { dump[t] = (await db.execute({ sql: `SELECT * FROM ${t}`, args: [] })).rows; }
    catch (e) { dump[t] = []; }
  }
  res.setHeader("Content-Disposition", 'attachment; filename="lhbs-backup.json"');
  res.json({ backup: dump, exported_at: new Date().toISOString() });
});
// Teacher restores the database from a JSON dump (used by the auto-watchdog
// after the hosting wipes the disk). Replaces all content tables atomically.
const RESTORE_TABLES = ["users","sessions","works","reads","likes","points_log","activity_log","student_badges",
  "weekly_tasks","quiz_questions","quiz_attempts","mysteries","mystery_solves",
  "challenges","challenge_entries","writer_of_week","point_settings","books","student_marks"];
app.post("/api/teacher/restore", requireTeacher, async (req, res) => {
  const dump = (req.body || {}).backup;
  if (!dump || typeof dump !== "object" || Array.isArray(dump))
    return res.status(400).json({ error: "No backup data." });
  try {
    // Live column names per table: ignore backup columns that don't exist
    // (schema drift between the backup and the deployed code must never
    // fail a restore — a failed restore is what loses the children's PINs).
    const liveCols = {};
    const skipped = {};
    for (const t of RESTORE_TABLES) {
      try { liveCols[t] = new Set((await db.execute({ sql: `PRAGMA table_info(${t})`, args: [] })).rows.map(c => c.name)); }
      catch (_) { liveCols[t] = null; }
    }
    for (const t of RESTORE_TABLES) {
      const rows = dump[t];
      if (!Array.isArray(rows)) continue;
      const cols0 = liveCols[t];
      await db.execute({ sql: `DELETE FROM ${t}`, args: [] });
      for (const row of rows) {
        const allCols = Object.keys(row);
        const cols = cols0 ? allCols.filter(c => cols0.has(c)) : allCols;
        const dropped = allCols.filter(c => !cols.includes(c));
        if (dropped.length) (skipped[t] = skipped[t] || new Set()).add(dropped.join(","));
        if (!cols.length) continue;
        await db.execute({ sql: `INSERT INTO ${t} (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`, args: [...cols.map(c => row[c])] });
      }
    }
    await seedParentUsers(); // a stale backup may predate parent logins — re-create any missing ones
    const skippedObj = {};
    for (const [t, s] of Object.entries(skipped)) skippedObj[t] = [...s].join(",");
    res.json({ ok: true, skippedColumns: skippedObj });
  } catch (e) {
    res.status(500).json({ error: "Restore failed." });
  }
});
// ── Illustrated books ─────────────────────────────────────────
// Teacher uploads an illustrated book PDF (generated by Muse from a story).
// The PDF is stored in the DB so backups capture it automatically.
app.post("/api/teacher/books", requireTeacher, async (req, res) => {
  const { title, author_name, work_id, pdf_base64, pages } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "Title required." });
  if (!author_name || !author_name.trim()) return res.status(400).json({ error: "Author name required." });
  if (!pdf_base64) return res.status(400).json({ error: "No PDF data." });
  const buf = Buffer.from(pdf_base64, "base64");
  if (buf.length < 1000 || buf.slice(0, 5).toString() !== "%PDF-")
    return res.status(400).json({ error: "Not a valid PDF." });
  if (buf.length > 40 * 1024 * 1024) return res.status(400).json({ error: "PDF too large (max 40MB)." });
  let author_id = null;
  if (work_id) {
    const w = (await db.execute({ sql: "SELECT student_id FROM works WHERE id=?", args: [work_id] })).rows[0];
    if (w) author_id = w.student_id;
  }
  const r = await db.execute({ sql: "INSERT INTO books (work_id, title, author_name, author_id, pdf_data, pages) VALUES (?,?,?,?,?,?)", args: [work_id || null, title.trim(), author_name.trim(), author_id, pdf_base64, parseInt(pages) || 8] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});
app.get("/api/books", requireLogin, async (req, res) => {
  const books = (await db.execute({ sql: "SELECT id, title, author_name, pages, created_at FROM books ORDER BY created_at DESC", args: [] })).rows;
  res.json({ books });
});
// Teacher preview: get any student's dashboard data (read-only, teacher stays logged in)
app.get("/api/teacher/student/:id/preview", requireTeacher, async (req, res) => {
  const s = (await db.execute({ sql: "SELECT id, display_name, username, photo, bio FROM users WHERE id=? AND role='student'", args: [req.params.id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Not found." });
  const st = await studentStats(s.id);
  const badges = (await db.execute({ sql: "SELECT badge_key FROM student_badges WHERE student_id=?", args: [s.id] })).rows.map(r => r.badge_key);
  const board = (await db.execute({ sql: `
    SELECT u.id, COALESCE(SUM(p.points),0) AS pts FROM users u
    LEFT JOIN points_log p ON p.student_id=u.id WHERE u.role='student'
    GROUP BY u.id ORDER BY pts DESC`, args: [] })).rows;
  const rank = board.findIndex(r => r.id === s.id) + 1;
  const works = (await db.execute({ sql: "SELECT id, type, language, title, stars, status, created_at FROM works WHERE student_id=? ORDER BY created_at DESC", args: [s.id] })).rows;
  res.json({ student: s, points: st.points, rank, approved: st.approved, stars: st.stars, badges, stats: st, works });
});
app.get("/api/books/:id/file", requireLogin, async (req, res) => {
  const b = (await db.execute({ sql: "SELECT title, pdf_data FROM books WHERE id=?", args: [req.params.id] })).rows[0];
  if (!b || !b.pdf_data) return res.status(404).json({ error: "Not found." });
  const buf = Buffer.from(b.pdf_data, "base64");
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${b.title.replace(/"/g, "")}.pdf"`);
  res.send(buf);
});
app.delete("/api/teacher/books/:id", requireTeacher, async (req, res) => {
  const r = await db.execute({ sql: "DELETE FROM books WHERE id=?", args: [req.params.id] });
  if (!r.changes) return res.status(404).json({ error: "Not found." });
  res.json({ ok: true });
});
app.post("/api/teacher/student/:id", requireTeacher, async (req, res) => {
  const s = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='student'", args: [req.params.id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Not found." });
  const { display_name, bio, photo } = req.body || {};
  if (photo && photo.length > 700000) return res.status(400).json({ error: "Photo is too large (max ~500KB)." });
  await db.execute({ sql: "UPDATE users SET display_name=COALESCE(?,display_name), bio=?, photo=? WHERE id=?", args: [display_name && display_name.trim() ? display_name.trim() : null, bio || null, photo || null, s.id] });
  res.json({ ok: true });
});
// Puzzle game score: students earn points for solving word puzzles.
app.post("/api/puzzle/score", requireStudent, async (req, res) => {
  const p = Math.min(Math.max(parseInt(req.body.points) || 0, 0), 10);
  if (p > 0) await awardPoints(req.user.id, p, "Word puzzle solved 🧩", "puzzle", null);
  res.json({ ok: true, total: await totalPoints(req.user.id) });
});
app.post("/api/teacher/adjust-points", requireTeacher, async (req, res) => {
  const { student_id, points, reason } = req.body || {};
  const s = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Student not found." });
  const p = parseInt(points) || 0;
  if (p === 0) return res.status(400).json({ error: "Points cannot be zero." });
  if (p > 0) await awardPoints(s.id, p, reason || "Points awarded by teacher");
  else await removePoints(s.id, -p, reason || "Points removed by teacher");
  res.json({ ok: true, total: await totalPoints(s.id) });
});
// Set a boy's total points to an exact number (edit/reset).
app.post("/api/teacher/set-points", requireTeacher, async (req, res) => {
  const { student_id, points, reason } = req.body || {};
  const s = (await db.execute({ sql: "SELECT id, display_name FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Student not found." });
  const target = Math.max(0, parseInt(points) || 0);
  const current = await totalPoints(s.id);
  const diff = target - current;
  if (diff === 0) return res.json({ ok: true, total: current, note: "No change needed." });
  if (diff > 0) await awardPoints(s.id, diff, reason || `Points set to ${target} by teacher`);
  else await removePoints(s.id, -diff, reason || `Points set to ${target} by teacher`);
  res.json({ ok: true, total: await totalPoints(s.id) });
});
// Get a student's full points history (for editing individual entries).
app.get("/api/teacher/student/:id/points-log", requireTeacher, async (req, res) => {
  const s = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='student'", args: [req.params.id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Student not found." });
  const log = (await db.execute({ sql: "SELECT id, points, reason, ref_type, ref_id, created_at FROM points_log WHERE student_id=? ORDER BY id DESC", args: [s.id] })).rows;
  res.json({ log, total: await totalPoints(s.id) });
});
// Edit a single points entry.
app.post("/api/teacher/points-log/:id", requireTeacher, async (req, res) => {
  const e = (await db.execute({ sql: "SELECT * FROM points_log WHERE id=?", args: [req.params.id] })).rows[0];
  if (!e) return res.status(404).json({ error: "Entry not found." });
  const { points, reason } = req.body || {};
  const p = parseInt(points);
  if (!Number.isInteger(p)) return res.status(400).json({ error: "Points must be a whole number." });
  await db.execute({ sql: "UPDATE points_log SET points=?, reason=? WHERE id=?", args: [p, (reason || e.reason).trim() || e.reason, e.id] });
  res.json({ ok: true, total: await totalPoints(e.student_id) });
});
// Delete a single points entry.
app.delete("/api/teacher/points-log/:id", requireTeacher, async (req, res) => {
  const e = (await db.execute({ sql: "SELECT * FROM points_log WHERE id=?", args: [req.params.id] })).rows[0];
  if (!e) return res.status(404).json({ error: "Entry not found." });
  await db.execute({ sql: "DELETE FROM points_log WHERE id=?", args: [e.id] });
  res.json({ ok: true, total: await totalPoints(e.student_id) });
});

// ── Learning Tasks (mandatory memorization checklist) ──
const LEARN_CATS = { dua5: "🕌 5 Daily Duas", dua: "🤲 General Dua", quran: "📖 Quran Hifz", speech: "🎤 Speech", other: "📌 Other" };
// List all learning tasks (teacher + students + guests).
app.get("/api/learning-tasks", requireLogin, async (req, res) => {
  const tasks = (await db.execute({ sql: "SELECT * FROM learning_tasks ORDER BY sort_order, id", args: [] })).rows;
  res.json({ tasks, categories: LEARN_CATS });
});
// Create a learning task (teacher).
app.post("/api/teacher/learning-task", requireTeacher, async (req, res) => {
  const { title, category, details } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
  const cat = LEARN_CATS[category] ? category : "other";
  const maxOrder = (await db.execute({ sql: "SELECT COALESCE(MAX(sort_order),0) m FROM learning_tasks", args: [] })).rows[0].m;
  const r = await db.execute({ sql: "INSERT INTO learning_tasks (title, category, details, sort_order) VALUES (?,?,?,?)", args: [title.trim(), cat, (details || "").trim(), maxOrder + 1] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});
// Delete a learning task (teacher).
app.delete("/api/teacher/learning-task/:id", requireTeacher, async (req, res) => {
  await db.execute({ sql: "DELETE FROM learning_tasks WHERE id=?", args: [req.params.id] });
  res.json({ ok: true });
});
// ---- Student Marks (teacher manages; student/parent see only their own) ----
app.get("/api/teacher/marks", requireTeacher, async (req, res) => {
  const rows = (await db.execute(`SELECT m.*, u.display_name as student_name, u.ad_no
    FROM student_marks m JOIN users u ON u.id=m.student_id
    ORDER BY u.display_name, m.subject`)).rows;
  res.json({ marks: rows });
});
app.post("/api/teacher/marks", requireTeacher, async (req, res) => {
  const { student_id, subject, exam, marks, max_marks, grade } = req.body || {};
  if (!student_id || !subject || marks === undefined)
    return res.status(400).json({ error: "student_id, subject and marks required." });
  await db.execute({ sql: `INSERT INTO student_marks (student_id, subject, exam, marks, max_marks, grade)
    VALUES (?,?,?,?,?,?)
    ON CONFLICT(student_id, subject, exam) DO UPDATE SET marks=excluded.marks, max_marks=excluded.max_marks, grade=excluded.grade`,
    args: [student_id, subject, exam || '', Number(marks), Number(max_marks) || 100, grade || ''] });
  const s = (await db.execute({ sql: "SELECT display_name FROM users WHERE id=?", args: [student_id] })).rows[0];
  await logActivity(req.user.id, req.user.role, "marks",
    `Updated marks for ${s ? s.display_name : student_id}: ${subject} = ${marks}`, "marks", student_id);
  res.json({ ok: true });
});
app.delete("/api/teacher/marks/:id", requireTeacher, async (req, res) => {
  await db.execute({ sql: "DELETE FROM student_marks WHERE id=?", args: [req.params.id] });
  res.json({ ok: true });
});
// Student sees ONLY their own marks.
app.get("/api/my/marks", requireStudent, async (req, res) => {
  const rows = (await db.execute({ sql: "SELECT subject, exam, marks, max_marks, grade FROM student_marks WHERE student_id=? ORDER BY subject",
    args: [req.user.id] })).rows;
  res.json({ marks: rows });
});
// Parent sees ONLY their own child's marks.
app.get("/api/parent/marks", requireParent, async (req, res) => {
  const child = (await db.execute({ sql: "SELECT id FROM users WHERE id=?", args: [req.user.parent_of] })).rows[0];
  if (!child) return res.json({ marks: [] });
  const rows = (await db.execute({ sql: "SELECT subject, exam, marks, max_marks, grade FROM student_marks WHERE student_id=? ORDER BY subject",
    args: [req.user.parent_of] })).rows;
  res.json({ marks: rows });
});
// Tick / untick a task for a student (teacher or guest).
app.post("/api/teacher/learning-tick", requireTeacherOrGuest, async (req, res) => {
  const { task_id, student_id, done } = req.body || {};
  const t = (await db.execute({ sql: "SELECT id, title FROM learning_tasks WHERE id=?", args: [task_id] })).rows[0];
  const s = (await db.execute({ sql: "SELECT id, display_name FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  if (!t || !s) return res.status(404).json({ error: "Not found." });
  if (done) await db.execute({ sql: "INSERT OR IGNORE INTO learning_task_done (task_id, student_id) VALUES (?,?)", args: [t.id, s.id] });
  else await db.execute({ sql: "DELETE FROM learning_task_done WHERE task_id=? AND student_id=?", args: [t.id, s.id] });
  await logActivity(req.user.id, req.user.role, done ? "tick" : "untick",
    `${done ? "Ticked" : "Unticked"} "${t.title}" for ${s.display_name}`, "learning_task", t.id);
  res.json({ ok: true, progress: await learningProgress(s.id) });
});
// Completion % for one student.
async function learningProgress(student_id) {
  const total = (await db.execute({ sql: "SELECT COUNT(*) c FROM learning_tasks", args: [] })).rows[0].c;
  if (!total) return { done: 0, total: 0, pct: 0 };
  const done = (await db.execute({ sql: "SELECT COUNT(*) c FROM learning_task_done WHERE student_id=?", args: [student_id] })).rows[0].c;
  return { done, total, pct: Math.round(done / total * 100) };
}
// All students' progress (teacher or guest — for graphs).
app.get("/api/teacher/learning-progress", requireTeacherOrGuest, async (req, res) => {
  const students = (await db.execute({ sql: "SELECT id, display_name FROM users WHERE role='student' ORDER BY display_name", args: [] })).rows;
  const total = (await db.execute({ sql: "SELECT COUNT(*) c FROM learning_tasks", args: [] })).rows[0].c;
  const doneRows = (await db.execute({ sql: "SELECT student_id, task_id FROM learning_task_done", args: [] })).rows;
  const doneMap = {};
  doneRows.forEach(r => { (doneMap[r.student_id] = doneMap[r.student_id] || new Set()).add(r.task_id); });
  const list = students.map(s => {
    const done = doneMap[s.id] ? doneMap[s.id].size : 0;
    return { id: s.id, display_name: s.display_name, done, total, pct: total ? Math.round(done / total * 100) : 0 };
  });
  res.json({ students: list, total });
});
// Detailed summary: per-student per-category completion (teacher or guest).
app.get("/api/teacher/learning-summary", requireTeacherOrGuest, async (req, res) => {
  const students = (await db.execute({ sql: "SELECT id, display_name, ad_no FROM users WHERE role='student' ORDER BY display_name", args: [] })).rows;
  const tasks = (await db.execute({ sql: "SELECT id, category FROM learning_tasks", args: [] })).rows;
  const catTotals = {};
  tasks.forEach(t => { catTotals[t.category] = (catTotals[t.category] || 0) + 1; });
  const taskCat = {};
  tasks.forEach(t => { taskCat[t.id] = t.category; });
  const doneRows = (await db.execute({ sql: "SELECT student_id, task_id FROM learning_task_done", args: [] })).rows;
  const summary = students.map(s => {
    const cats = {};
    Object.keys(catTotals).forEach(c => { cats[c] = 0; });
    let totalDone = 0;
    doneRows.forEach(r => {
      if (r.student_id === s.id && taskCat[r.task_id]) {
        cats[taskCat[r.task_id]]++;
        totalDone++;
      }
    });
    const total = tasks.length;
    return {
      id: s.id, display_name: s.display_name, ad_no: s.ad_no,
      cats, totalDone, total,
      pct: total ? Math.round(totalDone / total * 100) : 0
    };
  });
  // Sort by completion % descending
  summary.sort((a, b) => b.pct - a.pct || b.totalDone - a.totalDone);
  res.json({ summary, catTotals, categories: LEARN_CATS, total: tasks.length });
});
// One student's ticked tasks (teacher or guest view for the grid).
app.get("/api/teacher/learning-ticks/:id", requireTeacherOrGuest, async (req, res) => {
  const rows = (await db.execute({ sql: "SELECT task_id FROM learning_task_done WHERE student_id=?", args: [req.params.id] })).rows;
  res.json({ done: rows.map(r => r.task_id), progress: await learningProgress(req.params.id) });
});
// Student's own progress + checklist.
app.get("/api/my/learning-progress", requireStudent, async (req, res) => {
  const tasks = (await db.execute({ sql: "SELECT * FROM learning_tasks ORDER BY sort_order, id", args: [] })).rows;
  const doneRows = (await db.execute({ sql: "SELECT task_id FROM learning_task_done WHERE student_id=?", args: [req.user.id] })).rows;
  const doneSet = new Set(doneRows.map(r => r.task_id));
  res.json({
    tasks: tasks.map(t => ({ ...t, done: doneSet.has(t.id) })),
    progress: await learningProgress(req.user.id),
    categories: LEARN_CATS
  });
});

// One-time migration endpoint (teacher only) — not needed on Turso (fresh schema).
app.post("/api/teacher/migrate-guest", requireTeacher, async (req, res) => {
  res.json({ ok: true, migrated: false, note: "Not needed on Turso." });
});

// ── Guest accounts (limited: only tick learning tasks + view graphs) ──
app.get("/api/teacher/guests", requireTeacher, async (req, res) => {
  const guests = (await db.execute({ sql: "SELECT id, username, display_name, created_at FROM users WHERE role='guest' ORDER BY id", args: [] })).rows;
  res.json({ guests });
});
app.post("/api/teacher/guest", requireTeacher, async (req, res) => {
  const { username, display_name, password } = req.body || {};
  const uname = String(username || "").trim().toLowerCase();
  if (!uname || !password || String(password).length < 4)
    return res.status(400).json({ error: "Username and password (min 4 chars) are required." });
  if ((await db.execute({ sql: "SELECT id FROM users WHERE username=?", args: [uname] })).rows[0])
    return res.status(400).json({ error: "Username already taken." });
  const r = await db.execute({ sql: "INSERT INTO users (username, password_hash, role, display_name) VALUES (?,?,?,?)", args: [uname, hashPassword(String(password)), "guest", String(display_name || uname).trim() || uname] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});
app.post("/api/teacher/guest/:id/password", requireTeacher, async (req, res) => {
  const g = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='guest'", args: [req.params.id] })).rows[0];
  if (!g) return res.status(404).json({ error: "Guest not found." });
  const { password } = req.body || {};
  if (!password || String(password).length < 4)
    return res.status(400).json({ error: "Password must be at least 4 characters." });
  await db.execute({ sql: "UPDATE users SET password_hash=? WHERE id=?", args: [hashPassword(String(password)), g.id] });
  res.json({ ok: true });
});
app.delete("/api/teacher/guest/:id", requireTeacher, async (req, res) => {
  await db.execute({ sql: "DELETE FROM users WHERE id=? AND role='guest'", args: [req.params.id] });
  res.json({ ok: true });
});

// Weekly tasks
app.post("/api/teacher/weekly-task", requireTeacher, async (req, res) => {
  const { title, kind, prompt, points, start_date, questions } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
  if (!["story_start", "theme", "quiz"].includes(kind)) return res.status(400).json({ error: "Invalid kind." });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date || "")) return res.status(400).json({ error: "Start date (YYYY-MM-DD) is required." });
  const r = await db.execute({ sql: "INSERT INTO weekly_tasks (title, kind, prompt, points, start_date) VALUES (?,?,?,?,?)", args: [title.trim(), kind, (prompt || "").trim(), Math.max(0, parseInt(points) || 0), start_date] });
  const taskId = Number(r.lastInsertRowid);
  if (kind === "quiz" && Array.isArray(questions)) {
    const ins_sql = "INSERT INTO quiz_questions (task_id, question, answer, sort_order) VALUES (?,?,?,?)";
    for (const [i, q] of questions.slice(0, 30).entries()) {
      if (q && q.question && q.answer) await db.execute({ sql: ins_sql, args: [taskId, String(q.question).trim(), String(q.answer).trim(), i] });
    }
  }
  res.json({ ok: true, id: taskId, deadline: taskDeadline(start_date) });
});
app.post("/api/teacher/weekly-task/:id/delete", requireTeacher, async (req, res) => {
  await db.execute({ sql: "DELETE FROM quiz_questions WHERE task_id=?", args: [req.params.id] });
  await db.execute({ sql: "DELETE FROM quiz_attempts WHERE task_id=?", args: [req.params.id] });
  await db.execute({ sql: "DELETE FROM weekly_tasks WHERE id=?", args: [req.params.id] });
  res.json({ ok: true });
});
app.get("/api/teacher/quiz/:id/attempts", requireTeacher, async (req, res) => {
  const rows = (await db.execute({ sql: `SELECT a.*, u.display_name FROM quiz_attempts a
    JOIN users u ON u.id=a.student_id WHERE a.task_id=? ORDER BY a.score DESC`, args: [req.params.id] })).rows;
  res.json({ attempts: rows.map(a => ({ ...a, answers: JSON.parse(a.answers_json || "[]") })) });
});

// Mysteries
app.post("/api/teacher/mystery", requireTeacher, async (req, res) => {
  const { title, description, solution, points } = req.body || {};
  if (!title || !title.trim() || !solution || !solution.trim())
    return res.status(400).json({ error: "Title and solution are required." });
  const r = await db.execute({ sql: "INSERT INTO mysteries (title, description, solution, points) VALUES (?,?,?,?)", args: [title.trim(), (description || "").trim(), solution.trim(), Math.max(0, parseInt(points) || await getSetting("mystery"))] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});
app.post("/api/teacher/mystery/:id/delete", requireTeacher, async (req, res) => {
  await db.execute({ sql: "DELETE FROM mystery_solves WHERE mystery_id=?", args: [req.params.id] });
  await db.execute({ sql: "DELETE FROM mysteries WHERE id=?", args: [req.params.id] });
  res.json({ ok: true });
});

// Challenges
app.post("/api/teacher/challenge", requireTeacher, async (req, res) => {
  const { title, description, points, deadline } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
  const r = await db.execute({ sql: "INSERT INTO challenges (title, description, points, deadline) VALUES (?,?,?,?)", args: [title.trim(), (description || "").trim(), Math.max(0, parseInt(points) || await getSetting("challenge")), deadline || null] });
  res.json({ ok: true, id: Number(r.lastInsertRowid) });
});
app.get("/api/teacher/challenge/:id/entries", requireTeacher, async (req, res) => {
  const rows = (await db.execute({ sql: `SELECT e.*, u.display_name FROM challenge_entries e
    JOIN users u ON u.id=e.student_id WHERE e.challenge_id=? ORDER BY e.created_at`, args: [req.params.id] })).rows;
  res.json({ entries: rows });
});
app.post("/api/teacher/challenge-entry/:id/complete", requireTeacher, async (req, res) => {
  const e = (await db.execute({ sql: "SELECT * FROM challenge_entries WHERE id=?", args: [req.params.id] })).rows[0];
  if (!e) return res.status(404).json({ error: "Not found." });
  if (e.status === "done") return res.json({ ok: true });
  const c = (await db.execute({ sql: "SELECT * FROM challenges WHERE id=?", args: [e.challenge_id] })).rows[0];
  await db.execute({ sql: "UPDATE challenge_entries SET status='done' WHERE id=?", args: [e.id] });
  await awardPoints(e.student_id, c.points, `Challenge completed: ${c.title}`, "challenge", c.id);
  res.json({ ok: true });
});
app.post("/api/teacher/challenge/:id/delete", requireTeacher, async (req, res) => {
  await db.execute({ sql: "DELETE FROM challenge_entries WHERE challenge_id=?", args: [req.params.id] });
  await db.execute({ sql: "DELETE FROM challenges WHERE id=?", args: [req.params.id] });
  res.json({ ok: true });
});

// Writer of the week
app.post("/api/teacher/writer-of-week", requireTeacher, async (req, res) => {
  const { student_id, note } = req.body || {};
  const s = (await db.execute({ sql: "SELECT id FROM users WHERE id=? AND role='student'", args: [student_id] })).rows[0];
  if (!s) return res.status(404).json({ error: "Student not found." });
  await db.execute({ sql: "INSERT INTO writer_of_week (student_id, note) VALUES (?,?)", args: [s.id, (note || "").trim()] });
  res.json({ ok: true });
});

// Point settings
app.get("/api/teacher/point-settings", requireTeacher, async (req, res) => {
  const rows = (await db.execute({ sql: "SELECT key, value FROM point_settings", args: [] })).rows;
  res.json({ settings: Object.fromEntries(rows.map(r => [r.key, r.value])) });
});
app.post("/api/teacher/point-settings", requireTeacher, async (req, res) => {
  const upd_sql = "INSERT INTO point_settings (key, value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value";
  for (const [k, v] of Object.entries(req.body || {})) {
    if (k in DEFAULT_POINTS) await db.execute({ sql: upd_sql, args: [k, Math.max(0, parseInt(v) || 0)] });
  }
  res.json({ ok: true });
});

// Activity feed
app.get("/api/teacher/activity", requireTeacher, async (req, res) => {
  // Unified feed: student points + submissions, and the who-did-what log
  // (logins for all roles; task ticks/unticks by teachers and mentors).
  const pts = (await db.execute({ sql: `SELECT p.created_at AS at, 'points' AS kind, u.display_name AS actor, 'student' AS actor_role,
      p.reason AS text, p.points AS points
    FROM points_log p JOIN users u ON u.id=p.student_id ORDER BY p.id DESC LIMIT 60`, args: [] })).rows;
  const log = (await db.execute({ sql: `SELECT a.created_at AS at, a.action AS kind, u.display_name AS actor, a.role AS actor_role,
      COALESCE(a.detail, '') AS text, NULL AS points
    FROM activity_log a LEFT JOIN users u ON u.id=a.user_id ORDER BY a.id DESC LIMIT 60`, args: [] })).rows;
  const subs = (await db.execute({ sql: `SELECT w.created_at AS at, 'submit' AS kind, u.display_name AS actor, 'student' AS actor_role,
      ('Submitted "' || w.title || '" (' || w.status || ')') AS text, NULL AS points
    FROM works w JOIN users u ON u.id=w.student_id ORDER BY w.id DESC LIMIT 40`, args: [] })).rows;
  const feed = [...pts, ...log, ...subs]
    .sort((a, b) => String(b.at || "").localeCompare(String(a.at || ""))).slice(0, 100);
  res.json({ feed });
});

// ── Static site ───────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Not found." });
  next();
});

initDb().then(() => {
  app.listen(PORT, () => console.log(`Little Hands, Big Stories running at http://localhost:${PORT}`));
}).catch(e => { console.error("DB init failed:", e); process.exit(1); });
