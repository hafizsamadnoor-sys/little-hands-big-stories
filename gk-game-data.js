// ─────────────────────────────────────────────────────────────
// GK Kids — SIBAQ 2026 GK Quiz game (Bidaya & Uoola).
// SOURCE OF TRUTH: Ajmal Ujire NHIA WhatsApp chat export (16 Oct–12 Nov 2026)
// + Mock Test PDFs 1-3 + Test 4 photos. Every question and answer below
// comes from that pack — nothing invented. Full pack (with study bank):
// SIBAQ26_GK_Quiz_Pack_Ajmal_Mock_Tests.pdf (28 pp).
// Samad's plan (12 Nov 2026): ALL questions REMOVED from the app — the
// 154 Ajmal questions live only in the pack PDF + the demo now. New
// questions will be discussed with Samad and added here afterwards.
// (The 4 test shells below stay, so the game structure is ready.)
// The game is for S Abdul Khadirul Faaz (N1322) first; other boys can be
// added later via the gk_game_players table — the bank is not tied to a boy.
// How it plays (like the Map Study game): 4 tests in order, Test N+1
// unlocks only after Test N is passed (8/10 in one round). Each round
// draws 10 questions — UNSEEN first, then past mistakes, then review —
// so repeated plays cover new ground instead of the same 10.
// A question:
//   key     stable id, e.g. "t1-q1"
//   q       the question (exactly as Ajmal gave it)
//   options exactly 4; answer must be one of them, word for word
//   point   the fact to learn (the correct answer)
//   img     Test 4 photo questions only: /gk-photos/<file>.jpg
// FLAGS (from the pack — confirm with Ajmal before testing on them):
//   * 19 Oct 'Education Minister Prahlad Joshi' was WRONG in the chat —
//     correct is Dharmendra Pradhan (fixed here).
//   * 29 Oct current affairs unverified (Cyclone Arnab, Ballon d'Or 2026).
//   * Test 3 Q19 answer missing in chat — filled as Caliph Al-Mutawakkil.
//   * Test 4 Q21 connect (rhino+elephant+tiger) — suggested Kaziranga.
// ─────────────────────────────────────────────────────────────
const GK_GAME_PLAY_COUNT = 10;
const GK_GAME_PASS_MARK = 8;
const GK_GAME_TESTS = [
  {
    "id": "T1",
    "n": 1,
    "key": "mock-test-1",
    "icon": "🧠",
    "title": "Mock Test 1 — GK Quiz",
    "desc": "51 questions · 9 Nov 2026 · Ajmal Ujire",
    "total": 51
  },
  {
    "id": "T2",
    "n": 2,
    "key": "mock-test-2",
    "icon": "🗺️",
    "title": "Mock Test 2 — Map Study",
    "desc": "59 questions · 10 Nov 2026 · Ajmal Ujire",
    "total": 59
  },
  {
    "id": "T3",
    "n": 3,
    "key": "mock-test-3",
    "icon": "🧠",
    "title": "Mock Test 3 — GK Quiz",
    "desc": "20 questions · 11 Nov 2026 · Ajmal Ujire",
    "total": 20
  },
  {
    "id": "T4",
    "n": 4,
    "key": "mock-test-4",
    "icon": "🖼️",
    "title": "Mock Test 4 — GK Quiz (Day-4)",
    "desc": "24 questions · 12 Nov 2026 · photos + written + connect",
    "total": 24
  }
];

const GK_GAME_QUESTIONS = { "T1": [], "T2": [], "T3": [], "T4": [] };

module.exports = { GK_GAME_TESTS, GK_GAME_QUESTIONS, GK_GAME_PASS_MARK, GK_GAME_PLAY_COUNT };
