// Word Fight E2E — runs against a local test server (BASE env).
// Uses the PRE-GK backup PINs (read from the backup file, never printed).
const fs = require("fs");
const BASE = process.env.BASE || "http://localhost:3210";
const backup = JSON.parse(fs.readFileSync("/home/hatch/workspace/lhbs-backup-PRE-GK-2026-11-12.json", "utf8"));
const users = backup.backup.users;
const pinOf = (ad) => { const u = users.find(x => x.ad_no === ad); if (!u || !u.pin) throw new Error("no PIN for Ad " + ad); return u.pin; };
const thalhaId = users.find(x => x.ad_no === "503").id;
const faazId = users.find(x => x.ad_no === "494").id;

let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log("  PASS", name, extra === undefined ? "" : extra); }
  else { fail++; console.log("  FAIL", name, extra === undefined ? "" : extra); }
}
async function api(method, url, body, jar) {
  const r = await fetch(BASE + url, {
    method, headers: { "Content-Type": "application/json", ...(jar.cookie ? { Cookie: jar.cookie } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const set = r.headers.get("set-cookie");
  if (set) { const m = set.match(/lhbs_session=[^;]+/); if (m) jar.cookie = m[0]; }
  const text = await r.text();
  let data; try { data = JSON.parse(text); } catch (_) { data = { _raw: text.slice(0, 200) }; }
  return { status: r.status, data, text };
}
async function loginStudent(ad, jar) {
  // tap-login: POST /api/login { student_id, password: PIN }
  const r = await api("POST", "/api/login", { student_id: ad === "503" ? thalhaId : faazId, password: pinOf(ad) }, jar);
  if (r.status !== 200) throw new Error("student login Ad " + ad + " -> " + r.status + " " + JSON.stringify(r.data));
  return r;
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log("E2E against", BASE);
  // ── counts before (teacher backup) ──
  const teacher = { cookie: "" };
  let r = await api("POST", "/api/login", { username: "nhia030", password: "pass1234" }, teacher);
  ok("teacher login", r.status === 200);
  r = await api("GET", "/api/teacher/backup", null, teacher);
  const b0 = r.data.backup;
  const counts0 = { students: b0.users.filter(u => u.role === "student").length, works: b0.works.length, books: b0.books.length, points_log: b0.points_log.length };
  console.log("  counts before:", JSON.stringify(counts0));
  ok("counts before are 38/28/23/164", counts0.students === 38 && counts0.works === 28 && counts0.books === 23 && counts0.points_log === 164);

  // ── 1. non-player gets 403 / isPlayer false ──
  const faaz = { cookie: "" };
  await loginStudent("494", faaz);
  r = await api("GET", "/api/my/wf-game", null, faaz);
  ok("Faaz /api/my/wf-game isPlayer=false", r.status === 200 && r.data.isPlayer === false, JSON.stringify(r.data));
  r = await api("GET", "/api/wf-game/phases", null, faaz);
  ok("Faaz /api/wf-game/phases -> 403", r.status === 403, JSON.stringify(r.data));

  // ── 2. Thalha enrolled, phases + timers ──
  const thalha = { cookie: "" };
  await loginStudent("503", thalha);
  r = await api("GET", "/api/my/wf-game", null, thalha);
  ok("Thalha isPlayer=true", r.data.isPlayer === true);
  ok("6 phases, maxTotal 108", r.data.phases.length === 6 && r.data.maxTotal === 108);
  const timers = r.data.phases.map(p => p.timer);
  ok("timers [null,20,15,15,10,10]", JSON.stringify(timers) === JSON.stringify([null, 20, 15, 15, 10, 10]), JSON.stringify(timers));
  ok("phase maxes [6,6,6,30,30,30]", JSON.stringify(r.data.phases.map(p => p.max)) === JSON.stringify([6, 6, 6, 30, 30, 30]));

  // ── 3. bank ──
  r = await api("GET", "/api/wf-game/bank", null, thalha);
  const bank = r.data;
  ok("bank verbs 117 / nouns 95 / adjs 82", bank.verbs.length === 117 && bank.nouns.length === 95 && bank.adjectives.length === 82,
    `${bank.verbs.length}/${bank.nouns.length}/${bank.adjectives.length}`);
  ok("bank MCQ pools 20 each", bank.synonyms.length === 20 && bank.antonyms.length === 20 && bank.phrasal.length === 20);
  const bankFor = (cat) => cat === "verbs" ? bank.verbs : cat === "nouns" ? bank.nouns : bank.adjectives;

  // ── 4. match start ──
  r = await api("POST", "/api/wf-game/match/start", {}, thalha);
  ok("match start", r.status === 200 && r.data.match_id, JSON.stringify({ match_id: r.data.match_id }));
  const matchId = r.data.match_id;
  const startLetters = r.data.startLetters;
  const MATCH_AI = r.data.ai;
  ok("9 AI players", r.data.ai.length === 9);
  const seats = ["you", ...r.data.ai.map(a => a.name)];

  // ── WP helper: simulate a full 30-turn round, child follows a plan ──
  function simulateWP(phase, childPlan) {
    // childPlan: array of 3 functions (ctx) => word to submit on child's turn n (0..2), ctx = {need, used}
    const words = bankFor(phase.cat);
    let need = startLetters[phase.id];
    const used = [];
    const turns = [];
    let childTurn = 0;
    const resetNeed = () => {
      if (words.some(w => w[0] === need && !used.includes(w))) return;
      const avail = ["s", "b", "t", "c", "p", "r", "e", "l", "h", "w", "a", "g", "m", "n", "d"].filter(L => words.some(w => w[0] === L && !used.includes(w)));
      if (avail.length) need = avail[0]; // deterministic, same as server + client
    };
    for (let i = 0; i < 30; i++) {
      resetNeed();
      const player = seats[i % 10];
      let word = "";
      if (player === "you") {
        word = childPlan[childTurn]({ need, used: [...used] });
        childTurn++;
        // mirror server scoring for the child's word (for the expected total)
        if (word && !used.includes(word) && word[0] === need && words.includes(word)) { used.push(word); need = word.slice(-1); }
      } else {
        const level = MATCH_AI.find(a => a.name === player).level;
        const failRate = level === "strong" ? 0.05 : level === "medium" ? 0.20 : 0.40;
        const cand = words.filter(w => w[0] === need && !used.includes(w));
        if (cand.length && Math.random() >= failRate) {
          word = cand[Math.floor(Math.random() * cand.length)];
          used.push(word); need = word.slice(-1);
        } else if (used.length && Math.random() < 0.6) {
          word = used[Math.floor(Math.random() * used.length)]; // repeat
        } else word = "";
      }
      turns.push({ player, word });
    }
    return turns;
  }
  // child plan helpers (need the phase cat — closure per phase)
  function correctWord(cat) {
    return ({ need, used }) => bankFor(cat).find(w => w[0] === need && !used.includes(w)) || "";
  }
  function repeatWord() {
    return ({ need, used }) => used[0] || "";
  }
  function wrongLetterWord(cat) {
    return ({ need, used }) => bankFor(cat).find(w => w[0] !== need && !used.includes(w)) || "";
  }

  // WP1 verbs: 3 correct => +6
  let turns = simulateWP({ id: "WP1", cat: "verbs" }, [correctWord("verbs"), correctWord("verbs"), correctWord("verbs")]);
  r = await api("POST", "/api/wf-game/phase/WP1/word-attempt", { match_id: matchId, turns }, thalha);
  ok("WP1 verbs score 6/6", r.status === 200 && r.data.score === 6, JSON.stringify({ status: r.status, score: r.data.score, err: r.data.error }));
  // WP1 again in same match must fail
  const rDup = await api("POST", "/api/wf-game/phase/WP1/word-attempt", { match_id: matchId, turns }, thalha);
  ok("WP1 replay in same match rejected", rDup.status === 400);

  // WP2 nouns: correct, REPEAT, correct => +2-2+2 = +2
  turns = simulateWP({ id: "WP2", cat: "nouns" }, [correctWord("nouns"), repeatWord(), correctWord("nouns")]);
  r = await api("POST", "/api/wf-game/phase/WP2/word-attempt", { match_id: matchId, turns }, thalha);
  ok("WP2 nouns score 2/6 (repeat -2)", r.status === 200 && r.data.score === 2, JSON.stringify({ status: r.status, score: r.data.score, err: r.data.error }));
  const wp2Detail = (r.data.detail || []).filter(d => d.player === "you");
  ok("WP2 child detail has a -2 repeat", wp2Detail.some(d => d.points === -2 && d.outcome === "repeat"), JSON.stringify(wp2Detail.map(d => [d.word, d.points, d.outcome])));

  // WP3 adjectives: correct, wrong-letter, correct => +2+0+2 = +4
  turns = simulateWP({ id: "WP3", cat: "adjectives" }, [correctWord("adjectives"), wrongLetterWord("adjectives"), correctWord("adjectives")]);
  r = await api("POST", "/api/wf-game/phase/WP3/word-attempt", { match_id: matchId, turns }, thalha);
  ok("WP3 adjectives score 4/6 (wrong letter 0)", r.status === 200 && r.data.score === 4, JSON.stringify({ status: r.status, score: r.data.score, err: r.data.error }));

  // ── 5. MCQ phases ──
  // Need the bank answers — the play draw must NOT send them; get answers from the study bank endpoint.
  const answerOf = {};
  for (const q of bank.synonyms) answerOf[q.key] = q;
  for (const q of bank.antonyms) answerOf[q.key] = q;
  for (const q of bank.phrasal) answerOf[q.key] = q;
  const aiMcq = () => r.data.ai ? null : null;
  async function playMCQ(phaseId, wrongCount) {
    r = await api("GET", `/api/wf-game/phase/${phaseId}/questions`, null, thalha);
    ok(`${phaseId} draw returns 10 questions, no answers`, r.status === 200 && r.data.questions.length === 10 && !("answer" in r.data.questions[0]), JSON.stringify({ status: r.status, n: (r.data.questions || []).length, keys: r.data.questions[0] ? Object.keys(r.data.questions[0]) : [] }));
    const qs = r.data.questions;
    const answers = qs.map((q, i) => {
      const correct = answerOf[q.key].answer;
      if (i < wrongCount) {
        const wrong = q.options.find(o => o !== correct);
        return { key: q.key, given: wrong };
      }
      return { key: q.key, given: correct };
    });
    const aiScores = (await api("GET", "/api/my/wf-game", null, thalha), null); // noop
    // AI scores: simulate 7/10, 8/10, 6/10 correct by level groups
    const aiList = [{ name: "AI-Arif", score: 21 }, { name: "AI-Bilal", score: 24 }, { name: "AI-Danish", score: 18 },
      { name: "AI-Eshan", score: 21 }, { name: "AI-Farhan", score: 15 }, { name: "AI-Gita", score: 18 },
      { name: "AI-Hamza", score: 12 }, { name: "AI-Imran", score: 15 }, { name: "AI-Junaid", score: 9 }];
    r = await api("POST", `/api/wf-game/phase/${phaseId}/attempt`, { match_id: matchId, answers, aiScores }, thalha);
    const expected = (10 - wrongCount) * 3;
    ok(`${phaseId} score ${expected}/30 (${wrongCount} wrong)`, r.status === 200 && r.data.score === expected, JSON.stringify({ status: r.status, score: r.data.score, err: r.data.error }));
    return r;
  }
  await playMCQ("SYN", 2); // 24
  await playMCQ("ANT", 1); // 27
  await playMCQ("PHR", 0); // 30

  // out-of-order / wrong-phase guards
  r = await api("POST", "/api/wf-game/phase/SYN/attempt", { match_id: matchId, answers: [], aiScores: [] }, thalha);
  ok("SYN replay in same match rejected", r.status === 400);

  // ── 6. finish: WP 12 + MCQ 81 = 93 ──
  r = await api("POST", `/api/wf-game/match/${matchId}/finish`, {}, thalha);
  ok("finish total 93/108", r.status === 200 && r.data.total === 93 && r.data.max === 108, JSON.stringify({ status: r.status, total: r.data.total, rank: r.data.rank }));
  ok("leaderboard has 10 players", r.data.leaderboard && r.data.leaderboard.length === 10, JSON.stringify((r.data.leaderboard || []).map(x => x.name + ":" + x.score)));
  console.log("  leaderboard:", JSON.stringify((r.data.leaderboard || []).map(x => `#${x.rank} ${x.name} ${x.score}`)));
  const myRank = r.data.rank;
  ok("rank is 1..10", myRank >= 1 && myRank <= 10, "rank=" + myRank);

  // ── 7. teacher overview / summary / revision / PDF ──
  r = await api("GET", "/api/teacher/wf-game/overview", null, teacher);
  const ov = (r.data.players || [])[0];
  ok("teacher overview: Thalha best 93", ov && ov.totals.best === 93, JSON.stringify(ov && ov.totals));
  ok("teacher overview per-phase bests [6,2,4,24,27,30]", ov && JSON.stringify(ov.perPhase.map(p => p.best)) === JSON.stringify([6, 2, 4, 24, 27, 30]), JSON.stringify(ov && ov.perPhase.map(p => p.best)));
  ok("teacher overview revision count 4 (3 MCQ + 1 repeat)", ov && ov.revision.count === 4, JSON.stringify(ov && ov.revision));
  r = await api("GET", `/api/teacher/wf-game/summary/${thalhaId}`, null, teacher);
  ok("teacher summary totals: repeats 1, wpCorrect 7/9", r.data.totals.repeats === 1 && r.data.totals.wpCorrect === 7 && r.data.totals.wpTurns === 9,
    JSON.stringify(r.data.totals));
  r = await api("GET", `/api/teacher/wf-game/revision-queue/${thalhaId}`, null, teacher);
  ok("teacher revision queue: 3 MCQ + 1 repeat", r.data.mcqCount === 3 && r.data.repeatCount === 1, JSON.stringify({ mcq: r.data.mcqCount, rep: r.data.repeatCount }));
  // wrong-answers PDF
  const pdfRes = await fetch(BASE + `/api/teacher/wf-game/summary/${thalhaId}/wrong-answers.pdf`, { headers: { Cookie: teacher.cookie } });
  const pdfBuf = Buffer.from(await pdfRes.arrayBuffer());
  ok("wrong-answers PDF 200 + %PDF", pdfRes.status === 200 && pdfBuf.slice(0, 5).toString() === "%PDF-", pdfRes.status + " " + pdfBuf.length + " bytes");
  console.log("  PDF bytes:", pdfBuf.length);

  // ── 8. revision game: fix all 3 MCQ wrongs + the repeated word ──
  r = await api("GET", "/api/wf-game/revision", null, thalha);
  ok("student revision queue 4 items", r.data.count === 4 && r.data.mcq.length === 3 && r.data.repeats.length === 1, JSON.stringify({ count: r.data.count, mcq: r.data.mcq.length, rep: r.data.repeats.length }));
  const revAnswers = r.data.mcq.map(q => ({ key: q.key, given: answerOf[q.key].answer }));
  const rep = r.data.repeats[0];
  // new word: same category, same first letter, not the repeated word
  const repBank = bankFor(rep.category);
  const newWord = repBank.find(w => w[0] === rep.needLetter && w !== rep.word);
  r = await api("POST", "/api/wf-game/revision/attempt", { answers: revAnswers, words: [{ key: rep.key, givenWord: newWord }] }, thalha);
  ok("revision attempt: 3/3 MCQ + 1/1 word fixed", r.status === 200 && r.data.mcqScore === 3 && r.data.wordScore === 1, JSON.stringify({ status: r.status, mcq: r.data.mcqScore, word: r.data.wordScore, err: r.data.error }));
  r = await api("GET", "/api/wf-game/revision", null, thalha);
  ok("revision queue now 0", r.data.count === 0, JSON.stringify({ count: r.data.count }));

  // ── 9. points_log untouched by the game ──
  r = await api("GET", "/api/teacher/backup", null, teacher);
  const b1 = r.data.backup;
  const counts1 = { students: b1.users.filter(u => u.role === "student").length, works: b1.works.length, books: b1.books.length, points_log: b1.points_log.length };
  console.log("  counts after:", JSON.stringify(counts1));
  ok("counts after match are 38/28/23/164", counts1.students === 38 && counts1.works === 28 && counts1.books === 23 && counts1.points_log === 164);
  ok("points_log rows identical", JSON.stringify(b0.points_log) === JSON.stringify(b1.points_log));

  // ── 10. restore from pre-WF backup re-enrols Thalha ──
  const preWf = JSON.parse(fs.readFileSync("/home/hatch/workspace/lhbs-backup-PRE-WORDFIGHT-2026-11-12.json", "utf8"));
  r = await api("POST", "/api/teacher/restore", { backup: preWf.backup }, teacher);
  ok("restore pre-WF backup ok", r.status === 200 && r.data.ok === true, JSON.stringify(r.data));
  // teacher session may be lost after restore (users replaced) — log in again
  await api("POST", "/api/login", { username: "nhia030", password: "pass1234" }, teacher);
  r = await api("GET", "/api/teacher/wf-game/players", null, teacher);
  const thalhaEnabled = (r.data.students || []).find(s => s.ad_no === "503");
  ok("after restore, Thalha still a WF player (re-seeded)", thalhaEnabled && thalhaEnabled.enabled === true, JSON.stringify(thalhaEnabled));
  r = await api("GET", "/api/teacher/wf-game/overview", null, teacher);
  ok("after restore, overview has 1 player and no matches", (r.data.players || []).length === 1 && (r.data.players[0].totals.finished === 0), JSON.stringify(r.data.players && r.data.players[0].totals));
  // counts after restore = pre-WF counts
  r = await api("GET", "/api/teacher/backup", null, teacher);
  const b2 = r.data.backup;
  ok("counts after restore are 38/28/23/164", b2.users.filter(u => u.role === "student").length === 38 && b2.works.length === 28 && b2.books.length === 23 && b2.points_log.length === 164);

  console.log(`\nE2E done: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error("E2E CRASH:", e); process.exit(2); });
