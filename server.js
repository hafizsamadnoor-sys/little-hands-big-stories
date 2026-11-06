// ─────────────────────────────────────────────────────────────
// Little Hands, Big Stories — portable server
// Node.js + Express + node:sqlite. No build step.
// Run: npm install && node server.js
// ─────────────────────────────────────────────────────────────
const express = require("express");
process.on("unhandledRejection", (e) => { console.error("Unhandled rejection (kept alive):", e && e.message); });
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");
const STUDENTS = require("./students");

const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, "lhbs.db"));

// ── Schema ────────────────────────────────────────────────────
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  role TEXT NOT NULL CHECK(role IN ('teacher','student','guest','parent','principal','vice_principal','section_head')),
  display_name TEXT NOT NULL,
  ad_no TEXT,
  photo TEXT,
  bio TEXT,
  pin TEXT,
  parent_of INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now'))
);`);
// Teacher-visible 4-digit PIN (students only). Stored alongside the scrypt hash
// so the teacher can re-issue or read a boy's PIN from Students & Accounts.
// Never exposed on any student-facing endpoint.
try { db.exec("ALTER TABLE users ADD COLUMN pin TEXT"); } catch (e) { /* already there */ }
// Mentor profile fields (DOB, class) — shown on the mentor's own profile card.
try { db.exec("ALTER TABLE users ADD COLUMN dob TEXT"); } catch (e) { /* already there */ }
try { db.exec("ALTER TABLE users ADD COLUMN class_name TEXT"); } catch (e) { /* already there */ }
// Notice author name — shows who posted the notice (teacher or admin name).
try { db.exec("ALTER TABLE notices ADD COLUMN author_name TEXT DEFAULT ''"); } catch (e) { /* already there */ }
db.exec(`
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now'))
);
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
  reviewed_at TEXT,
  edited_by TEXT DEFAULT '',
  edited_by_class TEXT DEFAULT '',
  content_original TEXT,
  proofread_at TEXT,
  reject_reason TEXT
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  read_at TEXT,
  media_data TEXT,
  media_type TEXT
);
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  media_data TEXT,
  media_type TEXT,
  author_name TEXT DEFAULT ''
);
CREATE TABLE IF NOT EXISTS notice_reads (
  notice_id INTEGER NOT NULL REFERENCES notices(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (notice_id, student_id)
);
CREATE TABLE IF NOT EXISTS finance_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'Other',
  amount REAL NOT NULL,
  direction TEXT NOT NULL CHECK(direction IN ('red','green')),
  note TEXT,
  paid_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS general_expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  per_child REAL NOT NULL,
  surplus REAL NOT NULL,
  category TEXT NOT NULL DEFAULT 'Other',
  note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS reads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_id INTEGER NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(work_id, student_id)
);
CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_id INTEGER NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(work_id, student_id)
);
CREATE TABLE IF NOT EXISTS points_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  ref_type TEXT,
  ref_id INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT,
  ref_type TEXT,
  ref_id INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS learning_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  details TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS learning_task_done (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES learning_tasks(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  done_at TEXT DEFAULT (datetime('now')),
  UNIQUE(task_id, student_id)
);
CREATE TABLE IF NOT EXISTS completion_certs (
  student_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  issued_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS completion_exams (
  student_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  passed_at TEXT NOT NULL DEFAULT (datetime('now'))
);
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
);
`);
try { db.exec("ALTER TABLE works ADD COLUMN edited_by TEXT DEFAULT ''"); } catch (e) { /* already there */ }
try { db.exec("ALTER TABLE works ADD COLUMN edited_by_class TEXT DEFAULT ''"); } catch (e) { /* already there */ }
try { db.exec("ALTER TABLE works ADD COLUMN content_original TEXT"); } catch (e) { /* already there */ }
try { db.exec("ALTER TABLE works ADD COLUMN proofread_at TEXT"); } catch (e) { /* already there */ }
try { db.exec("ALTER TABLE works ADD COLUMN reject_reason TEXT"); } catch (e) { /* already there */ }
// Migration: allow 'guest' role in users table (for DBs created before the guest feature).
try {
  var urow = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'").get();
  var usql = urow && urow.sql ? urow.sql : "";
  if (usql && usql.indexOf("'guest'") < 0) {
    db.exec("PRAGMA foreign_keys=OFF;");
    db.exec("CREATE TABLE users_new (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "username TEXT UNIQUE NOT NULL," +
      "password_hash TEXT," +
      "role TEXT NOT NULL CHECK(role IN ('teacher','student','guest','principal','vice_principal','section_head'))," +
      "display_name TEXT NOT NULL," +
      "ad_no TEXT," +
      "photo TEXT," +
      "bio TEXT," +
      "pin TEXT," +
      "created_at TEXT DEFAULT (datetime('now'))" +
      ");" +
      "INSERT INTO users_new (id, username, password_hash, role, display_name, ad_no, photo, bio, pin, created_at)" +
      " SELECT id, username, password_hash, role, display_name, ad_no, photo, bio, pin, created_at FROM users;" +
      "DROP TABLE users;" +
      "ALTER TABLE users_new RENAME TO users;" +
      "PRAGMA foreign_keys=ON;");
    console.log("Migrated users table to allow guest role.");
  }
} catch (e) { console.log("User table migration:", e.message); try { db.exec("PRAGMA foreign_keys=ON;"); } catch(_){} }
// Migration: allow 'parent' role + parent_of link (for DBs created before the parents feature).
try {
  var prow = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'").get();
  var psql = prow && prow.sql ? prow.sql : "";
  if (psql && psql.indexOf("'parent'") < 0) {
    db.exec("PRAGMA foreign_keys=OFF;");
    db.exec("CREATE TABLE users_new (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "username TEXT UNIQUE NOT NULL," +
      "password_hash TEXT," +
      "role TEXT NOT NULL CHECK(role IN ('teacher','student','guest','parent','principal','vice_principal','section_head'))," +
      "display_name TEXT NOT NULL," +
      "ad_no TEXT," +
      "photo TEXT," +
      "bio TEXT," +
      "pin TEXT," +
      "parent_of INTEGER REFERENCES users(id) ON DELETE CASCADE," +
      "created_at TEXT DEFAULT (datetime('now'))" +
      ");" +
      "INSERT INTO users_new (id, username, password_hash, role, display_name, ad_no, photo, bio, pin, created_at)" +
      " SELECT id, username, password_hash, role, display_name, ad_no, photo, bio, pin, created_at FROM users;" +
      "DROP TABLE users;" +
      "ALTER TABLE users_new RENAME TO users;" +
      "PRAGMA foreign_keys=ON;");
    console.log("Migrated users table to allow parent role.");
  }
} catch (e) { console.log("Parent table migration:", e.message); try { db.exec("PRAGMA foreign_keys=ON;"); } catch(_){} }
// Defensive: parent_of column for any DB that missed the rebuild.
try { db.exec("ALTER TABLE users ADD COLUMN parent_of INTEGER"); } catch (e) { /* already there */ }
db.exec(`
CREATE TABLE IF NOT EXISTS student_badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_key TEXT NOT NULL,
  awarded_at TEXT DEFAULT (datetime('now')),
  UNIQUE(student_id, badge_key)
);
CREATE TABLE IF NOT EXISTS weekly_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('story_start','theme','quiz')),
  prompt TEXT NOT NULL DEFAULT '',
  points INTEGER NOT NULL DEFAULT 5,
  start_date TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL REFERENCES weekly_tasks(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
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
);
CREATE TABLE IF NOT EXISTS mysteries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  solution TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 3,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS mystery_solves (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mystery_id INTEGER NOT NULL REFERENCES mysteries(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(mystery_id, student_id)
);
CREATE TABLE IF NOT EXISTS challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 4,
  deadline TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS challenge_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id INTEGER NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','done')),
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS writer_of_week (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS point_settings (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_id INTEGER REFERENCES works(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  pdf_data TEXT NOT NULL,
  pages INTEGER NOT NULL DEFAULT 8,
  created_at TEXT DEFAULT (datetime('now'))
);
`);
try { db.exec("ALTER TABLE student_badges ADD COLUMN celebrated_at TEXT"); } catch (e) { /* already there */ }

// Which teacher session an impersonated student session came from (for "back to teacher").
try { db.exec("ALTER TABLE sessions ADD COLUMN impersonated_from TEXT"); } catch (e) { /* already there */ }

// ── Point settings defaults ───────────────────────────────────
// No fixed per-type points since 2026-10-30 (teacher enters points at approval).
const DEFAULT_POINTS = {
  per_star: 1, read: 0, like_received: 0,
  challenge: 4, quiz_correct: 1, featured: 5,
};
const getSetting = (k) => {
  const row = db.prepare("SELECT value FROM point_settings WHERE key=?").get(k);
  return row ? row.value : (DEFAULT_POINTS[k] ?? 0);
};
{
  const ins = db.prepare("INSERT OR IGNORE INTO point_settings (key, value) VALUES (?,?)");
  for (const [k, v] of Object.entries(DEFAULT_POINTS)) ins.run(k, v);
}

// ── Seed students ─────────────────────────────────────────────
function makeUsername(name, ad_no) {
  const first = name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  return (first || "student") + ad_no;
}
{
  const n = db.prepare("SELECT COUNT(*) AS c FROM users WHERE role='student'").get().c;
  if (n === 0) {
    const ins = db.prepare("INSERT INTO users (username, role, display_name, ad_no) VALUES (?,?,?,?)");
    for (const s of STUDENTS) ins.run(makeUsername(s.name, s.ad_no), "student", s.name, s.ad_no);
    console.log(`Seeded ${STUDENTS.length} students.`);
  }
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
function seedParentUsers() {
  const mkParent = (s) => {
    const uname = ("parent-" + s.username).toLowerCase();
    if (db.prepare("SELECT id FROM users WHERE username=?").get(uname)) return;
    if (db.prepare("SELECT id FROM users WHERE role='parent' AND parent_of=?").get(s.id)) return;
    const pin = randomPin();
    db.prepare("INSERT INTO users (username, password_hash, role, display_name, pin, parent_of) VALUES (?,?,?,?,?,?)")
      .run(uname, hashPassword(pin), "parent", "Parent of " + s.display_name, pin, s.id);
  };
  try {
    for (const s of db.prepare("SELECT id, username, display_name FROM users WHERE role='student'").all()) mkParent(s);
  } catch (e) { console.log("Parent seeding:", e.message); }
}
seedParentUsers();

// ── Points & badges ───────────────────────────────────────────
const BADGES = [
  { key: "best_story", name: "Best Story", icon: "🏆", desc: "Awarded by the teacher for the best story." },
  { key: "rising_author", name: "Rising Author", icon: "🌟", desc: "Reached 50 points." },
  { key: "story_champion", name: "Story Champion", icon: "👑", desc: "Reached #1 on the points board." },
  { key: "club_100", name: "100 Points Club", icon: "⭐", desc: "Reached 100 points — Rising Star." },
  { key: "club_200", name: "200 Points Club", icon: "🌟", desc: "Reached 200 points — Super Star." },
  { key: "club_500", name: "500 Points Club", icon: "💎", desc: "Reached 500 points — Diamond Star." },
  { key: "club_1000", name: "1000 Points Club", icon: "👑", desc: "Reached 1000 points — Legend." },
];
// Points Clubs — auto-awarded tiers (highest first).
const CLUBS = [
  { key: "club_1000", points: 1000, icon: "👑", name: "1000 Points Club", title: "Legend" },
  { key: "club_500", points: 500, icon: "💎", name: "500 Points Club", title: "Diamond Star" },
  { key: "club_200", points: 200, icon: "🌟", name: "200 Points Club", title: "Super Star" },
  { key: "club_100", points: 100, icon: "⭐", name: "100 Points Club", title: "Rising Star" },
];
function totalPoints(student_id) {
  const r = db.prepare("SELECT COALESCE(SUM(points),0) AS t FROM points_log WHERE student_id=?").get(student_id);
  return r.t;
}
function studentStats(student_id) {
  const approved = db.prepare("SELECT COUNT(*) c FROM works WHERE student_id=? AND status='approved'").get(student_id).c;
  const reads = db.prepare("SELECT COUNT(*) c FROM reads WHERE student_id=?").get(student_id).c;
  const chall = db.prepare("SELECT COUNT(*) c FROM challenge_entries WHERE student_id=? AND status='done'").get(student_id).c;
  const stars = db.prepare("SELECT COALESCE(SUM(stars),0) s FROM works WHERE student_id=? AND status='approved'").get(student_id).s;
  return { approved, reads, chall, stars, points: totalPoints(student_id) };
}
function checkBadges(student_id) {
  // Auto-awarded badges only: Rising Author (50 points) and Story Champion (#1).
  // The Best Story badge is awarded manually by the teacher via /api/teacher/badge.
  const st = studentStats(student_id);
  const have = new Set(db.prepare("SELECT badge_key FROM student_badges WHERE student_id=?").all(student_id).map(r => r.badge_key));
  const earn = [];
  if (st.points >= 50) earn.push("rising_author");
  for (const c of CLUBS) if (st.points >= c.points) earn.push(c.key);
  const top = db.prepare(`
    SELECT u.id FROM users u
    LEFT JOIN points_log p ON p.student_id = u.id
    WHERE u.role='student'
    GROUP BY u.id ORDER BY COALESCE(SUM(p.points),0) DESC LIMIT 1`).get();
  if (top && top.id === student_id) earn.push("story_champion");
  const ins = db.prepare("INSERT OR IGNORE INTO student_badges (student_id, badge_key) VALUES (?,?)");
  for (const k of earn) if (!have.has(k)) ins.run(student_id, k);
}
function awardPoints(student_id, points, reason, ref_type = null, ref_id = null) {
  if (!points || points <= 0) return;
  db.prepare("INSERT INTO points_log (student_id, points, reason, ref_type, ref_id) VALUES (?,?,?,?,?)")
    .run(student_id, points, reason, ref_type, ref_id);
  checkBadges(student_id);
}
function removePoints(student_id, points, reason) {
  if (!points || points <= 0) return;
  db.prepare("INSERT INTO points_log (student_id, points, reason) VALUES (?,?,?)").run(student_id, -points, reason);
}
// Who-did-what log (logins, mentor/teacher ticks) — shown in the admin Activity tab.
function logActivity(user_id, role, action, detail, ref_type, ref_id) {
  try {
    db.prepare("INSERT INTO activity_log (user_id, role, action, detail, ref_type, ref_id) VALUES (?,?,?,?,?,?)")
      .run(user_id, role, action, detail || null, ref_type || null, ref_id || null);
  } catch (e) { console.log("activity log:", e.message); }
}

// ── App & session middleware ──────────────────────────────────
const app = express();
app.use(express.json({ limit: "50mb" }));

function getSessionUser(req) {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (!m) return null;
  const s = db.prepare("SELECT user_id, impersonated_from FROM sessions WHERE token=?").get(m[1]);
  if (!s) return null;
  const u = db.prepare("SELECT id, username, role, display_name, ad_no, photo, bio FROM users WHERE id=?").get(s.user_id);
  if (!u) return null;
  if (s.impersonated_from) u.impersonating = true;
  return u;
}
app.use((req, res, next) => { req.user = getSessionUser(req); next(); });

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
const ADMIN_ROLES = ["principal", "vice_principal", "section_head"];
const isAdminRole = r => ADMIN_ROLES.includes(r);
const requireAdmin = (req, res, next) =>
  req.user && isAdminRole(req.user.role) ? next() : res.status(403).json({ error: "Admin only." });
// Admins (principal/vice principal/section head) are view-only, except posting notices.
// They can see everything the teacher sees except finance and private messages.
const requireTeacherOrAdmin = (req, res, next) =>
  req.user && (req.user.role === "teacher" || isAdminRole(req.user.role)) ? next() : res.status(403).json({ error: "Teacher or admin only." });

// ── Auth ──────────────────────────────────────────────────────
app.post("/api/setup", (req, res) => {
  const existing = db.prepare("SELECT COUNT(*) c FROM users WHERE role='teacher'").get().c;
  if (existing > 0) return res.status(400).json({ error: "A teacher account already exists." });
  const { username, password, name } = req.body || {};
  if (!username || !password || password.length < 4)
    return res.status(400).json({ error: "Username and a password of 4+ characters are required." });
  db.prepare("INSERT INTO users (username, password_hash, role, display_name) VALUES (?,?,?,?)")
    .run(username.trim(), hashPassword(password), "teacher", (name || "Teacher").trim());
  res.json({ ok: true });
});

app.post("/api/login", (req, res) => {
  const { username, student_id, password } = req.body || {};
  let user = null;
  if (student_id) user = db.prepare("SELECT * FROM users WHERE id=? AND role='student'").get(student_id);
  else if (username) user = db.prepare("SELECT * FROM users WHERE username=?").get(String(username).trim().toLowerCase());
  if (!user) return res.status(401).json({ error: "Account not found." });
  if (!user.password_hash) return res.status(401).json({ error: "No password set yet — please ask your teacher." });
  if (!verifyPassword(password || "", user.password_hash)) return res.status(401).json({ error: "Wrong password." });
  const token = crypto.randomBytes(32).toString("hex");
  db.prepare("INSERT INTO sessions (token, user_id) VALUES (?,?)").run(token, user.id);
  logActivity(user.id, user.role, "login", null, null, null);
  res.setHeader("Set-Cookie", `lhbs_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${30 * 86400}`);
  res.json({ ok: true, role: user.role });
});

function doLogout(req, res) {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (m) db.prepare("DELETE FROM sessions WHERE token=?").run(m[1]);
  res.setHeader("Set-Cookie", "lhbs_session=; HttpOnly; Path=/; Max-Age=0");
}
app.post("/api/logout", (req, res) => { doLogout(req, res); res.json({ ok: true }); });
// Plain GET logout: a simple link that always works, even if JS fails.
app.get("/api/logout", (req, res) => { doLogout(req, res); res.redirect("/index.html"); });

app.get("/api/me", (req, res) => res.json({ user: req.user }));
// Mentor's own profile (photo, full name, DOB, class, ad no).
app.get("/api/mentor/profile", requireGuest, (req, res) => {
  const p = db.prepare("SELECT display_name, ad_no, photo, dob, class_name, bio FROM users WHERE id=?").get(req.user.id);
  res.json({ profile: p || {} });
});
// Teacher: update a mentor's profile.
app.post("/api/teacher/guest/:id/profile", requireTeacher, (req, res) => {
  // Ensure profile columns exist (in case DB was restored from old backup)
  try { db.exec("ALTER TABLE users ADD COLUMN dob TEXT"); } catch (e) {}
  try { db.exec("ALTER TABLE users ADD COLUMN class_name TEXT"); } catch (e) {}
  const { display_name, ad_no, dob, class_name, photo, bio } = req.body || {};
  db.prepare("UPDATE users SET display_name=COALESCE(?,display_name), ad_no=?, dob=?, class_name=?, photo=?, bio=? WHERE id=? AND role='guest'")
    .run(display_name || null, ad_no || null, dob || null, class_name || null, photo || null, bio || null, req.params.id);
  res.json({ ok: true });
});

// ── Parents (view-only) ─────────────────────────────────────────
// A parent sees: their own child's full progress (points, works, books,
// weekly-task completion) + every child's public scoreboard, books and
// published writings. They never see other children's task progress,
// and cannot write, submit, like or edit anything (all write endpoints
// require the student role).
app.get("/api/parent/child", requireParent, (req, res) => {
  const me = db.prepare("SELECT parent_of FROM users WHERE id=?").get(req.user.id);
  if (!me || !me.parent_of) return res.status(404).json({ error: "No linked student." });
  const sid = me.parent_of;
  const s = db.prepare("SELECT id, display_name, ad_no, photo FROM users WHERE id=? AND role='student'").get(sid);
  if (!s) return res.status(404).json({ error: "Linked student not found." });
  const points = db.prepare("SELECT COALESCE(SUM(points),0) AS t FROM points_log WHERE student_id=?").get(sid).t;
  const stars = db.prepare("SELECT COALESCE(SUM(stars),0) AS s FROM works WHERE student_id=? AND status='approved'").get(sid).s;
  const badgeCount = db.prepare("SELECT COUNT(*) AS c FROM student_badges WHERE student_id=?").get(sid).c;
  const works = db.prepare(`SELECT id, type, title, language, stars, featured, created_at
    FROM works WHERE student_id=? AND status='approved' ORDER BY created_at DESC`).all(sid);
  const books = db.prepare(`SELECT b.id, b.title, b.pages, b.created_at FROM books b
    JOIN works w ON w.id=b.work_id WHERE w.student_id=? ORDER BY b.created_at DESC`).all(sid);
  const tasks = db.prepare("SELECT id, title, kind, points, start_date FROM weekly_tasks ORDER BY start_date DESC").all();
  const doneTaskIds = new Set(db.prepare(
    "SELECT weekly_task_id AS t FROM works WHERE student_id=? AND status='approved' AND weekly_task_id IS NOT NULL")
    .all(sid).map(r => r.t));
  const doneQuizIds = new Set(db.prepare(
    "SELECT task_id AS t FROM quiz_attempts WHERE student_id=?").all(sid).map(r => r.t));
  const taskProgress = tasks.map(t => ({
    id: t.id, title: t.title, kind: t.kind, points: t.points, start_date: t.start_date,
    done: t.kind === "quiz" ? doneQuizIds.has(t.id) : doneTaskIds.has(t.id),
  }));
  // Learning tasks progress (own child only) — percentage + per-category summary
  const lp = learningProgress(sid);
  const catRows = db.prepare(`SELECT lt.category AS c, COUNT(*) AS total,
      SUM(CASE WHEN ltd.student_id IS NOT NULL THEN 1 ELSE 0 END) AS done
    FROM learning_tasks lt LEFT JOIN learning_task_done ltd
      ON ltd.task_id = lt.id AND ltd.student_id = ?
    GROUP BY lt.category`).all(sid);
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
// Teacher: parent visit history — every parent login is recorded in
// activity_log, so this list updates by itself whenever a parent enters.
app.get("/api/teacher/parent-visits", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT u.id AS student_id, u.display_name, u.ad_no,
      COUNT(a.id) AS visits, MIN(a.created_at) AS first_login, MAX(a.created_at) AS last_login
    FROM users u
    JOIN users p ON p.parent_of = u.id AND p.role='parent'
    LEFT JOIN activity_log a ON a.user_id = p.id AND a.role='parent' AND a.action='login'
    WHERE u.role='student'
    GROUP BY u.id
    ORDER BY (last_login IS NULL), last_login DESC, u.display_name`).all();
  res.json({ visits: rows });
});
app.get("/api/teacher/parents", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT u.id AS student_id, u.display_name, u.ad_no,
      p.username AS parent_username, p.pin AS parent_pin
    FROM users u LEFT JOIN users p ON p.parent_of = u.id AND p.role='parent'
    WHERE u.role='student' ORDER BY u.display_name`).all();
  res.json({ parents: rows });
});
// Teacher: regenerate a parent's 4-digit PIN.
app.post("/api/teacher/parent/:student_id/regenerate-pin", requireTeacher, (req, res) => {
  const p = db.prepare("SELECT id FROM users WHERE role='parent' AND parent_of=?").get(req.params.student_id);
  if (!p) return res.status(404).json({ error: "No parent account for this student." });
  const pin = randomPin();
  db.prepare("UPDATE users SET password_hash=?, pin=? WHERE id=?").run(hashPassword(pin), pin, p.id);
  res.json({ ok: true, pin });
});
app.post("/api/teacher/parent/:student_id/set-pin", requireTeacher, (req, res) => {
  const p = db.prepare("SELECT id FROM users WHERE role='parent' AND parent_of=?").get(req.params.student_id);
  if (!p) return res.status(404).json({ error: "No parent account for this student." });
  const pin = ((req.body || {}).pin || "").toString().trim();
  if (!/^\d{4}$/.test(pin)) return res.status(400).json({ error: "PIN must be 4 digits." });
  db.prepare("UPDATE users SET password_hash=?, pin=? WHERE id=?").run(hashPassword(pin), pin, p.id);
  res.json({ ok: true });
});
// Teacher creates admin accounts (principal/vice_principal/section_head).
app.post("/api/teacher/admin-account", requireTeacher, (req, res) => {
  const { username, password, role, display_name } = req.body || {};
  if (!username || !password || password.length < 6)
    return res.status(400).json({ error: "Username and a password of 6+ characters are required." });
  if (!["principal", "vice_principal", "section_head"].includes(role))
    return res.status(400).json({ error: "Role must be principal, vice_principal, or section_head." });
  if (!display_name) return res.status(400).json({ error: "Display name is required." });
  try {
    const r = db.prepare("INSERT INTO users (username, password_hash, role, display_name) VALUES (?,?,?,?)")
      .run(username.toLowerCase().trim(), hashPassword(password), role, display_name.trim());
    logActivity(req.user.id, "teacher", `created ${role} account`, username, "user", r.lastInsertRowid);
    res.json({ ok: true, id: r.lastInsertRowid });
  } catch (e) {
    return res.status(400).json({ error: "Username already exists." });
  }
});
app.post("/api/teacher/admin-name", requireTeacher, (req, res) => {
  const { username, display_name } = req.body || {};
  if (!username || !display_name) return res.status(400).json({ error: "Username and display name required." });
  const u = db.prepare("SELECT id FROM users WHERE username=? AND role IN ('principal','vice_principal','section_head')").get(username.toLowerCase().trim());
  if (!u) return res.status(404).json({ error: "Admin not found." });
  db.prepare("UPDATE users SET display_name=? WHERE id=?").run(display_name.trim(), u.id);
  logActivity(req.user.id, "teacher", "updated admin name", display_name, "user", u.id);
  res.json({ ok: true });
});

// Teacher "login as student": pick the boy, no PIN needed (teacher is already authenticated).
app.post("/api/teacher/impersonate", requireTeacher, (req, res) => {
  const { student_id } = req.body || {};
  const s = db.prepare("SELECT id, display_name FROM users WHERE id=? AND role='student'").get(student_id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (!m) return res.status(401).json({ error: "Teacher session lost — log in again." });
  const token = crypto.randomBytes(32).toString("hex");
  db.prepare("INSERT INTO sessions (token, user_id, impersonated_from) VALUES (?,?,?)").run(token, s.id, m[1]);
  res.setHeader("Set-Cookie", `lhbs_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${30 * 86400}`);
  res.json({ ok: true });
});
// Back to teacher: restore the saved teacher session.
app.post("/api/impersonate/exit", requireLogin, (req, res) => {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)lhbs_session=([^;]+)/);
  if (!m) return res.status(401).json({ error: "No session." });
  const s = db.prepare("SELECT impersonated_from FROM sessions WHERE token=?").get(m[1]);
  if (!s || !s.impersonated_from) return res.status(400).json({ error: "Not an impersonated session." });
  const back = db.prepare("SELECT user_id FROM sessions WHERE token=?").get(s.impersonated_from);
  db.prepare("DELETE FROM sessions WHERE token=?").run(m[1]);
  if (!back) return res.status(401).json({ error: "Teacher session expired — please log in again." });
  res.setHeader("Set-Cookie", `lhbs_session=${s.impersonated_from}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${30 * 86400}`);
  res.json({ ok: true });
});

// Name grid for the tap-to-login screen (names + photos only — no secrets).
app.get("/api/taplist", (req, res) => {
  const rows = db.prepare("SELECT id, username, display_name, photo FROM users WHERE role='student' ORDER BY display_name").all();
  res.json({ students: rows });
});

// ── Student: dashboard ────────────────────────────────────────
app.get("/api/dashboard", requireLogin, (req, res) => {
  if (req.user.role !== "student") return res.json({ role: req.user.role });
  const st = studentStats(req.user.id);
  const badges = db.prepare("SELECT badge_key FROM student_badges WHERE student_id=?").all(req.user.id).map(r => r.badge_key);
  // rank (all-time)
  const board = db.prepare(`
    SELECT u.id, COALESCE(SUM(p.points),0) AS pts FROM users u
    LEFT JOIN points_log p ON p.student_id=u.id WHERE u.role='student'
    GROUP BY u.id ORDER BY pts DESC`).all();
  const rank = board.findIndex(r => r.id === req.user.id) + 1;
  // points broken down by source (for the "where my points came from" graph)
  const byType = db.prepare(`SELECT COALESCE(ref_type,'other') AS t, COALESCE(SUM(points),0) AS pts
    FROM points_log WHERE student_id=? GROUP BY t ORDER BY pts DESC`).all(req.user.id);
  // weekly-task completion (approved work linked to a task, or a quiz attempt)
  const weeklyTotal = db.prepare("SELECT COUNT(*) AS c FROM weekly_tasks").get().c;
  const weeklyDone = db.prepare(`SELECT COUNT(DISTINCT tid) AS c FROM (
      SELECT weekly_task_id AS tid FROM works WHERE student_id=? AND status='approved' AND weekly_task_id IS NOT NULL
      UNION SELECT task_id AS tid FROM quiz_attempts WHERE student_id=?
    )`).get(req.user.id, req.user.id).c;
  res.json({ points: st.points, rank, approved: st.approved, stars: st.stars, badges, stats: st,
    byType, weekly: { done: weeklyDone, total: weeklyTotal } });
});

// ── Student: works ────────────────────────────────────────────
const WORK_TYPES = ["story", "diary", "letter", "poem", "manifesto", "review", "anything"];
const LANGUAGES = ["English", "Malayalam", "Manglish", "Arabic", "Urdu", "Kannada"];

app.post("/api/works", requireStudent, (req, res) => {
  const { type, language, title, content, weekly_task_id, edited_by, edited_by_class } = req.body || {};
  if (!WORK_TYPES.includes(type)) return res.status(400).json({ error: "Invalid writing type." });
  if (!LANGUAGES.includes(language)) return res.status(400).json({ error: "Invalid language." });
  if (!title || !title.trim() || !content || !content.trim())
    return res.status(400).json({ error: "Title and content are required." });
  let taskId = null;
  if (weekly_task_id) {
    const t = db.prepare("SELECT id, kind FROM weekly_tasks WHERE id=?").get(weekly_task_id);
    if (t && t.kind !== "quiz") taskId = t.id;
  }
  const eb = (edited_by || "").toString().trim().slice(0, 120);
  const ebc = ["SS1","SS2","D1","D2","D3","Teacher"].includes(edited_by_class) ? edited_by_class : "";
  // Weekly-task writings (teacher-given) need no "Edited by" — only require it for free writings.
  if (!taskId && (!eb || !ebc)) return res.status(400).json({ error: "Please tell us who edited this work — name and class are required." });
  const r = db.prepare(`INSERT INTO works (student_id, type, language, title, content, weekly_task_id, edited_by, edited_by_class)
    VALUES (?,?,?,?,?,?,?,?)`).run(req.user.id, type, language, title.trim(), content.trim(), taskId, eb, ebc);
  res.json({ ok: true, id: r.lastInsertRowid });
});

// Mentor (guest) writes a work in a student's name → goes to the teacher's approval queue as that student's work
app.post("/api/guest/works", requireGuest, (req, res) => {
  const { student_id, type, language, title, content, edited_by, edited_by_class } = req.body || {};
  if (!WORK_TYPES.includes(type)) return res.status(400).json({ error: "Invalid writing type." });
  if (!LANGUAGES.includes(language)) return res.status(400).json({ error: "Invalid language." });
  if (!title || !title.trim() || !content || !content.trim())
    return res.status(400).json({ error: "Title and content are required." });
  const stu = db.prepare("SELECT id FROM users WHERE id=? AND role='student'").get(student_id);
  if (!stu) return res.status(400).json({ error: "Please choose a student." });
  const eb = (edited_by || "").toString().trim().slice(0, 120);
  const ebc = ["SS1","SS2","D1","D2","D3","Teacher"].includes(edited_by_class) ? edited_by_class : "";
  if (!eb || !ebc) return res.status(400).json({ error: "Please tell us who edited this work — name and class are required." });
  const r = db.prepare(`INSERT INTO works (student_id, type, language, title, content, weekly_task_id, edited_by, edited_by_class)
    VALUES (?,?,?,?,?,NULL,?,?)`).run(stu.id, type, language, title.trim(), content.trim(), eb, ebc);
  res.json({ ok: true, id: r.lastInsertRowid });
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

app.get("/api/works", requireLogin, (req, res) => {
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
  res.json({ works: db.prepare(sql).all(...args) });
});

app.get("/api/work/:id", requireLogin, (req, res) => {
  const w = db.prepare(`SELECT w.*, u.display_name AS author, u.photo AS author_photo
    FROM works w JOIN users u ON u.id=w.student_id WHERE w.id=?`).get(req.params.id);
  if (!w) return res.status(404).json({ error: "Not found." });
  const isOwner = req.user.id === w.student_id;
  const isTeacher = req.user.role === "teacher";
  if (w.status !== "approved" && !isOwner && !isTeacher)
    return res.status(403).json({ error: "This piece is waiting for the teacher's approval." });
  let liked = false, justRead = false;
  if (req.user.role === "student" && !isOwner && w.status === "approved") {
    liked = !!db.prepare("SELECT 1 FROM likes WHERE work_id=? AND student_id=?").get(w.id, req.user.id);
    const r = db.prepare("INSERT OR IGNORE INTO reads (work_id, student_id) VALUES (?,?)").run(w.id, req.user.id);
    // Reads give NO points (Samad's rule 2026-10-30, enforced at write-time 2026-11-06):
    // only teacher-given points (stars + typed points at approval) count.
    if (r.changes > 0) { justRead = true; }
  }
  const likes = db.prepare("SELECT COUNT(*) c FROM likes WHERE work_id=?").get(w.id).c;
  const reads = db.prepare("SELECT COUNT(*) c FROM reads WHERE work_id=?").get(w.id).c;
  res.json({ work: { ...w, content: w.content }, likes, reads, liked, isOwner });
});

app.post("/api/work/:id/like", requireStudent, (req, res) => {
  const w = db.prepare("SELECT * FROM works WHERE id=? AND status='approved'").get(req.params.id);
  if (!w) return res.status(404).json({ error: "Not found." });
  if (w.student_id === req.user.id) return res.status(400).json({ error: "You cannot like your own work." });
  const ex = db.prepare("SELECT id FROM likes WHERE work_id=? AND student_id=?").get(w.id, req.user.id);
  if (ex) { db.prepare("DELETE FROM likes WHERE id=?").run(ex.id); return res.json({ ok: true, liked: false }); }
  db.prepare("INSERT INTO likes (work_id, student_id) VALUES (?,?)").run(w.id, req.user.id);
  // Likes give NO points (Samad's rule 2026-10-30, enforced at write-time 2026-11-06):
  // only teacher-given points (stars + typed points at approval) count.
  res.json({ ok: true, liked: true });
});

app.get("/api/my/works", requireStudent, (req, res) => {
  const rows = db.prepare("SELECT id, type, language, title, status, stars, points_awarded, created_at, reject_reason FROM works WHERE student_id=? ORDER BY created_at DESC").all(req.user.id);
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
app.get("/api/weekly-tasks", requireLogin, (req, res) => {
  const tasks = db.prepare("SELECT * FROM weekly_tasks ORDER BY start_date DESC").all();
  const current = tasks.length ? withDeadline(tasks[0]) : null;
  const archive = tasks.slice(1).map(withDeadline);
  if (current && current.kind === "quiz")
    current.questionCount = db.prepare("SELECT COUNT(*) c FROM quiz_questions WHERE task_id=?").get(current.id).c;
  res.json({ current, archive });
});
app.get("/api/quiz/:id/questions", requireLogin, (req, res) => {
  const t = db.prepare("SELECT * FROM weekly_tasks WHERE id=? AND kind='quiz'").get(req.params.id);
  if (!t) return res.status(404).json({ error: "Quiz not found." });
  const qs = db.prepare("SELECT id, question FROM quiz_questions WHERE task_id=? ORDER BY sort_order").all(t.id);
  const mine = req.user.role === "student"
    ? db.prepare("SELECT score, total, points_awarded FROM quiz_attempts WHERE task_id=? AND student_id=?").get(t.id, req.user.id)
    : null;
  res.json({ task: withDeadline(t), questions: qs, myAttempt: mine });
});
const norm = s => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
app.post("/api/quiz/:id/attempt", requireStudent, (req, res) => {
  const t = db.prepare("SELECT * FROM weekly_tasks WHERE id=? AND kind='quiz'").get(req.params.id);
  if (!t) return res.status(404).json({ error: "Quiz not found." });
  const ex = db.prepare("SELECT * FROM quiz_attempts WHERE task_id=? AND student_id=?").get(t.id, req.user.id);
  if (ex) return res.json({ ok: true, already: true, score: ex.score, total: ex.total, points: ex.points_awarded });
  const qs = db.prepare("SELECT * FROM quiz_questions WHERE task_id=? ORDER BY sort_order").all(t.id);
  const answers = (req.body && req.body.answers) || [];
  let score = 0;
  const detail = qs.map((q, i) => {
    const ok = norm(answers[i]) === norm(q.answer) && norm(answers[i]) !== "";
    if (ok) score++;
    return { question: q.question, given: answers[i] || "", correct: ok, answer: q.answer };
  });
  const perCorrect = t.points || getSetting("quiz_correct");
  const pts = score * perCorrect;
  db.prepare("INSERT INTO quiz_attempts (task_id, student_id, score, total, points_awarded, answers_json) VALUES (?,?,?,?,?,?)")
    .run(t.id, req.user.id, score, qs.length, pts, JSON.stringify(detail));
  awardPoints(req.user.id, pts, `Quiz: ${t.title} (${score}/${qs.length})`, "quiz", t.id);
  res.json({ ok: true, score, total: qs.length, points: pts, detail });
});

// ── Mystery room ──────────────────────────────────────────────

// ── Challenges ────────────────────────────────────────────────
app.get("/api/challenges", requireLogin, (req, res) => {
  const rows = db.prepare("SELECT * FROM challenges ORDER BY created_at DESC").all();
  let mine = [];
  if (req.user.role === "student")
    mine = db.prepare("SELECT challenge_id, status FROM challenge_entries WHERE student_id=?").all(req.user.id);
  res.json({ challenges: rows, myEntries: mine });
});
app.post("/api/challenge/:id/enter", requireStudent, (req, res) => {
  const c = db.prepare("SELECT * FROM challenges WHERE id=?").get(req.params.id);
  if (!c) return res.status(404).json({ error: "Not found." });
  const content = (req.body && req.body.content || "").trim();
  if (!content) return res.status(400).json({ error: "Please write your entry." });
  const r = db.prepare("INSERT INTO challenge_entries (challenge_id, student_id, content) VALUES (?,?,?)").run(c.id, req.user.id, content);
  res.json({ ok: true, id: r.lastInsertRowid });
});

// ── Points board, authors, writer of week, badges ─────────────
app.get("/api/points-board", requireLogin, (req, res) => {
  const period = req.query.period === "month" ? "month" : "all";
  const dateFilter = period === "month" ? "AND p.created_at >= date('now','-30 days')" : "";
  const rows = db.prepare(`
    SELECT u.id, u.display_name, u.photo,
      COALESCE(SUM(p.points),0) AS points,
      COALESCE((SELECT SUM(w.stars) FROM works w WHERE w.student_id=u.id AND w.status='approved'),0) AS stars,
      (SELECT COUNT(*) FROM works w WHERE w.student_id=u.id AND w.status='approved') AS works
    FROM users u LEFT JOIN points_log p ON p.student_id=u.id ${dateFilter}
    WHERE u.role='student'
    GROUP BY u.id ORDER BY points DESC, u.display_name`).all();
  res.json({ period, board: rows });
});
// Points Clubs — members per tier (all logged-in users).
app.get("/api/clubs", requireLogin, (req, res) => {
  const rows = db.prepare(`
    SELECT u.id, u.display_name, u.photo, COALESCE(SUM(p.points),0) AS points
    FROM users u LEFT JOIN points_log p ON p.student_id=u.id
    WHERE u.role='student' GROUP BY u.id`).all();
  const tiers = CLUBS.map(c => ({
    ...c,
    members: rows.filter(r => r.points >= c.points).sort((a, b) => b.points - a.points || a.display_name.localeCompare(b.display_name)),
  }));
  res.json({ tiers });
});
app.get("/api/authors", requireLogin, (req, res) => {
  const rows = db.prepare(`
    SELECT u.id, u.display_name, u.photo, u.bio,
      COALESCE((SELECT SUM(p.points) FROM points_log p WHERE p.student_id=u.id),0) AS points,
      (SELECT COUNT(*) FROM works w WHERE w.student_id=u.id AND w.status='approved') AS works
    FROM users u WHERE u.role='student' ORDER BY u.display_name`).all();
  res.json({ authors: rows });
});
app.get("/api/author/:id", requireLogin, (req, res) => {
  const a = db.prepare("SELECT id, display_name, photo, bio FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!a) return res.status(404).json({ error: "Not found." });
  const st = studentStats(a.id);
  const badges = db.prepare("SELECT badge_key FROM student_badges WHERE student_id=?").all(a.id).map(r => r.badge_key);
  const works = db.prepare("SELECT id, type, language, title, stars, featured, created_at FROM works WHERE student_id=? AND status='approved' ORDER BY created_at DESC").all(a.id);
  res.json({ author: a, stats: st, badges, works });
});
app.get("/api/writer-of-week", requireLogin, (req, res) => {
  const w = db.prepare(`SELECT w.note, w.created_at, u.display_name, u.photo, u.id AS student_id
    FROM writer_of_week w JOIN users u ON u.id=w.student_id ORDER BY w.id DESC LIMIT 1`).get();
  res.json({ writer: w || null });
});
// Teacher-only: award or revoke the Best Story badge.
app.post("/api/teacher/badge", requireTeacher, (req, res) => {
  const { student_id, award } = req.body || {};
  const s = db.prepare("SELECT id, display_name FROM users WHERE id=? AND role='student'").get(student_id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  if (award) db.prepare("INSERT OR IGNORE INTO student_badges (student_id, badge_key) VALUES (?, 'best_story')").run(s.id);
  else db.prepare("DELETE FROM student_badges WHERE student_id=? AND badge_key='best_story'").run(s.id);
  logActivity(req.user.id, req.user.role, award ? "badge" : "unbadge",
    `${award ? "Awarded" : "Removed"} Best Story badge ${award ? "to" : "from"} ${s.display_name}`, "badge", s.id);
  res.json({ ok: true });
});
app.get("/api/badges", requireLogin, (req, res) => res.json({ badges: BADGES }));
app.get("/api/my/badges", requireStudent, (req, res) => {
  const mine = db.prepare("SELECT badge_key, awarded_at FROM student_badges WHERE student_id=?").all(req.user.id);
  res.json({ badges: BADGES, mine });
});
// Club entry celebrations — uncelebrated club badges for this student.
app.get("/api/my/club-celebrations", requireStudent, (req, res) => {
  const rows = db.prepare("SELECT badge_key, awarded_at FROM student_badges WHERE student_id=? AND celebrated_at IS NULL AND badge_key LIKE 'club_%'").all(req.user.id);
  const out = rows.map(r => CLUBS.find(c => c.key === r.badge_key)).filter(Boolean);
  res.json({ clubs: out });
});
app.post("/api/my/club-celebrated", requireStudent, (req, res) => {
  const { key } = req.body || {};
  if (!CLUBS.some(c => c.key === key)) return res.status(400).json({ error: "Invalid club." });
  db.prepare("UPDATE student_badges SET celebrated_at=datetime('now') WHERE student_id=? AND badge_key=?").run(req.user.id, key);
  res.json({ ok: true });
});

// ── Teacher panel ─────────────────────────────────────────────
app.get("/api/teacher/overview", requireTeacher, (req, res) => {
  const pending = db.prepare("SELECT COUNT(*) c FROM works WHERE status='pending'").get().c;
  const students = db.prepare("SELECT COUNT(*) c FROM users WHERE role='student'").get().c;
  const published = db.prepare("SELECT COUNT(*) c FROM works WHERE status='approved'").get().c;
  const noPw = db.prepare("SELECT COUNT(*) c FROM users WHERE role='student' AND password_hash IS NULL").get().c;
  res.json({ pending, students, published, noPw });
});

// ── Admin (principal/vice principal/section head) view-only endpoints ──
// They can see everything except finance and private messages.
// Notice posting is via POST /api/admin/notice (with their name).
app.get("/api/admin/overview", requireAdmin, (req, res) => {
  const pending = db.prepare("SELECT COUNT(*) c FROM works WHERE status='pending'").get().c;
  const students = db.prepare("SELECT COUNT(*) c FROM users WHERE role='student'").get().c;
  const published = db.prepare("SELECT COUNT(*) c FROM works WHERE status='approved'").get().c;
  res.json({ pending, students, published });
});
app.get("/api/admin/students", requireAdmin, (req, res) => {
  const rows = db.prepare(`SELECT id, display_name, ad_no, username FROM users WHERE role='student' ORDER BY display_name`).all();
  res.json({ students: rows });
});
app.get("/api/admin/works", requireAdmin, (req, res) => {
  const rows = db.prepare(`SELECT w.id, w.title, w.type, w.language, w.status, w.stars, w.content, w.created_at,
    u.display_name AS author, b.id AS book_id FROM works w JOIN users u ON w.student_id=u.id
    LEFT JOIN books b ON b.work_id=w.id
    ORDER BY w.created_at DESC LIMIT 200`).all();
  res.json({ works: rows });
});
app.get("/api/admin/activity", requireAdmin, (req, res) => {
  const rows = db.prepare(`SELECT action, detail, created_at FROM activity_log ORDER BY created_at DESC LIMIT 100`).all();
  res.json({ activity: rows });
});
app.get("/api/admin/learning-progress", requireAdmin, (req, res) => {
  const students = db.prepare("SELECT id, display_name FROM users WHERE role='student' ORDER BY display_name").all();
  const total = db.prepare("SELECT COUNT(*) c FROM learning_tasks").get().c;
  const doneRows = db.prepare("SELECT student_id, task_id FROM learning_task_done").all();
  const doneMap = {};
  doneRows.forEach(r => { (doneMap[r.student_id] = doneMap[r.student_id] || new Set()).add(r.task_id); });
  const list = students.map(s => {
    const done = doneMap[s.id] ? doneMap[s.id].size : 0;
    return { id: s.id, display_name: s.display_name, done, total, pct: total ? Math.round(done / total * 100) : 0 };
  });
  res.json({ progress: list, total });
});

app.get("/api/teacher/pending", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT w.*, u.display_name AS author FROM works w
    JOIN users u ON u.id=w.student_id WHERE w.status='pending' ORDER BY w.created_at`).all();
  res.json({ works: rows });
});

// ── Teacher → student private messages ──
// Teacher sends a message to one, several, or all students. Each student sees ONLY their own.
app.post("/api/teacher/message", requireTeacher, (req, res) => {
  const { student_ids, text, all } = req.body || {};
  const msg = (text || "").toString().trim().slice(0, 1000);
  const media = ((req.body || {}).media_data || "").toString().slice(0, 1500000);
  const mtype = ((req.body || {}).media_type || "").toString().slice(0, 20);
  if (!msg && !media) return res.status(400).json({ error: "Message text or photo is required." });
  let ids = [];
  if (all) {
    ids = db.prepare("SELECT id FROM users WHERE role='student'").all().map(u => u.id);
  } else if (Array.isArray(student_ids)) {
    const valid = db.prepare("SELECT id FROM users WHERE role='student'").all().map(u => u.id);
    ids = student_ids.map(Number).filter(id => valid.includes(id));
  }
  if (!ids.length) return res.status(400).json({ error: "Choose at least one student." });
  const ins = db.prepare("INSERT INTO messages (student_id, text, media_data, media_type) VALUES (?,?,?,?)");
  for (const id of ids) ins.run(id, msg, media || null, mtype || null);
  logActivity(req.user.id, "teacher", "sent message", `${ids.length} student(s)`, "message", null);
  res.json({ ok: true, sent: ids.length });
});
app.get("/api/teacher/messages", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT m.id, m.text, m.created_at, m.read_at, u.display_name AS student
    FROM messages m JOIN users u ON u.id=m.student_id ORDER BY m.created_at DESC LIMIT 100`).all();
  res.json({ messages: rows });
});
app.post("/api/teacher/message/:id/delete", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM messages WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});
// Student: only their own messages
app.get("/api/my/messages", requireStudent, (req, res) => {
  const rows = db.prepare("SELECT id, text, created_at, read_at, media_data, media_type FROM messages WHERE student_id=? ORDER BY created_at DESC LIMIT 50").all(req.user.id);
  res.json({ messages: rows });
});
app.post("/api/my/messages/:id/read", requireStudent, (req, res) => {
  db.prepare("UPDATE messages SET read_at=datetime('now') WHERE id=? AND student_id=?").run(req.params.id, req.user.id);
  res.json({ ok: true });
});

// ── Notice board ──
// Teacher posts notices; every student can read (and listen to) them.
app.post("/api/teacher/notice", requireTeacher, (req, res) => {
  const title = ((req.body || {}).title || "").toString().trim().slice(0, 120);
  const text = ((req.body || {}).text || "").toString().trim().slice(0, 2000);
  const media = ((req.body || {}).media_data || "").toString().slice(0, 1500000);
  const mtype = ((req.body || {}).media_type || "").toString().slice(0, 20);
  if (!text && !media) return res.status(400).json({ error: "Notice text or photo is required." });
  const author = req.user.display_name || "Teacher";
  const r = db.prepare("INSERT INTO notices (title, text, media_data, media_type, author_name) VALUES (?,?,?,?,?)").run(title, text, media || null, mtype || null, author);
  logActivity(req.user.id, "teacher", "posted notice", title || text.slice(0, 60), "notice", r.lastInsertRowid);
  res.json({ ok: true, id: r.lastInsertRowid });
});
// Admin (principal/vice principal/section head) can post notices with their name.
app.post("/api/admin/notice", requireAdmin, (req, res) => {
  const title = ((req.body || {}).title || "").toString().trim().slice(0, 120);
  const text = ((req.body || {}).text || "").toString().trim().slice(0, 2000);
  const media = ((req.body || {}).media_data || "").toString().slice(0, 1500000);
  const mtype = ((req.body || {}).media_type || "").toString().slice(0, 20);
  if (!text && !media) return res.status(400).json({ error: "Notice text or photo is required." });
  const author = req.user.display_name || req.user.username;
  const r = db.prepare("INSERT INTO notices (title, text, media_data, media_type, author_name) VALUES (?,?,?,?,?)").run(title, text, media || null, mtype || null, author);
  logActivity(req.user.id, req.user.role, "posted notice", title || text.slice(0, 60), "notice", r.lastInsertRowid);
  res.json({ ok: true, id: r.lastInsertRowid });
});
app.get("/api/notices", requireLogin, (req, res) => {
  const rows = db.prepare("SELECT id, title, text, created_at, media_data, media_type, author_name FROM notices ORDER BY created_at DESC LIMIT 30").all();
  res.json({ notices: rows });
});
app.get("/api/my/unread", requireStudent, (req, res) => {
  const m = db.prepare("SELECT COUNT(*) c FROM messages WHERE student_id=? AND read_at IS NULL").get(req.user.id).c;
  const n = db.prepare(`SELECT COUNT(*) c FROM notices WHERE id NOT IN
    (SELECT notice_id FROM notice_reads WHERE student_id=?)`).get(req.user.id).c;
  res.json({ messages: m, notices: n });
});
app.post("/api/my/notices/:id/read", requireStudent, (req, res) => {
  db.prepare("INSERT OR IGNORE INTO notice_reads (notice_id, student_id) VALUES (?,?)").run(req.params.id, req.user.id);
  res.json({ ok: true });
});
app.post("/api/teacher/notice/:id/delete", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM notices WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});

// ── Finance ──
// Per-student money ledger. direction: 'red' = parent owes teacher, 'green' = teacher owes/holds for parent.
// Parents see ONLY their own child's ledger (view-only).
const FIN_CATS = ["Store", "Medical", "Bus cash", "Book", "Trip", "General", "Other"];
app.post("/api/teacher/finance", requireTeacher, (req, res) => {
  const { student_id, category, amount, direction, note } = req.body || {};
  const s = db.prepare("SELECT id, display_name FROM users WHERE id=? AND role='student'").get(student_id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  const amt = Math.abs(parseFloat(amount) || 0);
  if (!amt || amt > 1000000) return res.status(400).json({ error: "Enter a valid amount." });
  if (!["red", "green"].includes(direction)) return res.status(400).json({ error: "Invalid direction." });
  const cat = FIN_CATS.includes(category) ? category : "Other";
  const nt = (note || "").toString().trim().slice(0, 200);
  const r = db.prepare("INSERT INTO finance_entries (student_id, category, amount, direction, note) VALUES (?,?,?,?,?)")
    .run(s.id, cat, amt, direction, nt || null);
  logActivity(req.user.id, "teacher", "finance entry", `${cat} ₹${amt} (${direction}) for ${s.display_name}${nt ? ": " + nt : ""}`, "finance", r.lastInsertRowid);
  res.json({ ok: true, id: r.lastInsertRowid });
});
app.get("/api/teacher/finance", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT f.id, f.student_id, f.category, f.amount, f.direction, f.note, f.paid_at, f.created_at,
    u.display_name AS student FROM finance_entries f JOIN users u ON u.id=f.student_id
    ORDER BY f.created_at DESC LIMIT 500`).all();
  res.json({ entries: rows, categories: FIN_CATS });
});
app.post("/api/teacher/finance/:id/paid", requireTeacher, (req, res) => {
  const e = db.prepare("SELECT * FROM finance_entries WHERE id=?").get(req.params.id);
  if (!e) return res.status(404).json({ error: "Not found." });
  const paid = e.paid_at ? null : "datetime('now')";
  db.prepare(`UPDATE finance_entries SET paid_at=${paid} WHERE id=?`).run(req.params.id);
  const s = db.prepare("SELECT display_name FROM users WHERE id=?").get(e.student_id);
  logActivity(req.user.id, "teacher", e.paid_at ? "finance unpaid" : "finance paid", `${e.category} ₹${e.amount} for ${s.display_name}`, "finance", e.id);
  res.json({ ok: true, paid: !e.paid_at });
});
app.post("/api/teacher/finance/:id/delete", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM finance_entries WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});
// ── General Expense ──
// Teacher spends for the whole class (e.g. ₹170 for class fund). The amount is
// split equally among ALL students, rounded UP to the nearest rupee per child.
// The surplus (per_child × count − amount) goes to the class General Fund
// (stored in app_settings key 'general_fund'). Each child's share lands in
// their own finance ledger as a "General" entry (red = parent owes teacher).
app.post("/api/teacher/general-expense", requireTeacher, (req, res) => {
  const { amount, category, note } = req.body || {};
  const amt = Math.abs(parseFloat(amount) || 0);
  if (!amt || amt > 1000000) return res.status(400).json({ error: "Enter a valid amount." });
  const students = db.prepare("SELECT id, display_name FROM users WHERE role='student' ORDER BY id").all();
  if (!students.length) return res.status(400).json({ error: "No students found." });
  const cat = FIN_CATS.includes(category) ? category : "Other";
  const nt = (note || "").toString().trim().slice(0, 200);
  const perChild = Math.ceil(amt / students.length);
  const total = perChild * students.length;
  const surplus = Math.round((total - amt) * 100) / 100;
  const entryNote = `General: ${nt || cat} (₹${amt} ÷ ${students.length})`;
  const ins = db.prepare("INSERT INTO finance_entries (student_id, category, amount, direction, note) VALUES (?,?,?,?,?)");
  let fund;
  try {
    db.exec("BEGIN IMMEDIATE");
    for (const s of students) ins.run(s.id, "General", perChild, "red", entryNote);
    db.prepare("INSERT INTO general_expenses (amount, per_child, surplus, category, note) VALUES (?,?,?,?,?)")
      .run(amt, perChild, surplus, cat, nt || null);
    const cur = db.prepare("SELECT value FROM app_settings WHERE key='general_fund'").get();
    fund = (parseFloat((cur && cur.value) || "0") || 0) + surplus;
    db.prepare("INSERT INTO app_settings (key, value) VALUES ('general_fund', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value")
      .run(String(Math.round(fund * 100) / 100));
    db.exec("COMMIT");
  } catch (e) {
    try { db.exec("ROLLBACK"); } catch (_) {}
    return res.status(500).json({ error: "Could not save the split. Nothing was changed." });
  }
  logActivity(req.user.id, "teacher", "general expense", `General expense ₹${amt} (${cat}) split ₹${perChild} × ${students.length} students; ₹${surplus} to General Fund${nt ? ": " + nt : ""}`, "finance", null);
  res.json({ ok: true, per_child: perChild, total, surplus, fund_balance: Math.round(fund * 100) / 100, count: students.length });
});
app.get("/api/teacher/general-expenses", requireTeacher, (req, res) => {
  const rows = db.prepare("SELECT * FROM general_expenses ORDER BY created_at DESC LIMIT 100").all();
  const cur = db.prepare("SELECT value FROM app_settings WHERE key='general_fund'").get();
  res.json({ expenses: rows, fund_balance: parseFloat((cur && cur.value) || "0") || 0 });
});
// Undo a general expense: removes the expense row, all 38 child entries it
// created, and takes its surplus back out of the General Fund.
app.post("/api/teacher/general-expense/:id/delete", requireTeacher, (req, res) => {
  const g = db.prepare("SELECT * FROM general_expenses WHERE id=?").get(req.params.id);
  if (!g) return res.status(404).json({ error: "Not found." });
  const entryNote = `General: ${g.note || g.category} (₹${g.amount} ÷ 38)`;
  try {
    db.exec("BEGIN IMMEDIATE");
    db.prepare("DELETE FROM finance_entries WHERE category='General' AND amount=? AND note=?").run(g.per_child, entryNote);
    db.prepare("DELETE FROM general_expenses WHERE id=?").run(g.id);
    const cur = db.prepare("SELECT value FROM app_settings WHERE key='general_fund'").get();
    const fund = Math.max(0, (parseFloat((cur && cur.value) || "0") || 0) - g.surplus);
    db.prepare("INSERT INTO app_settings (key, value) VALUES ('general_fund', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value")
      .run(String(Math.round(fund * 100) / 100));
    db.exec("COMMIT");
    logActivity(req.user.id, "teacher", "general expense deleted", `Undid general expense ₹${g.amount} (${g.category}); ₹${g.surplus} back out of General Fund`, "finance", null);
    res.json({ ok: true, fund_balance: Math.round(fund * 100) / 100 });
  } catch (e) {
    try { db.exec("ROLLBACK"); } catch (_) {}
    return res.status(500).json({ error: "Could not undo. Nothing was changed." });
  }
});
// Teacher's UPI settings (text settings table)
app.get("/api/teacher/finance-settings", requireTeacher, (req, res) => {
  const rows = db.prepare("SELECT key, value FROM app_settings WHERE key IN ('upi_id','upi_qr')").all();
  res.json({ settings: Object.fromEntries(rows.map(r => [r.key, r.value])) });
});
app.post("/api/teacher/finance-settings", requireTeacher, (req, res) => {
  const upiId = ((req.body || {}).upi_id || "").toString().trim().slice(0, 100);
  const upiQr = ((req.body || {}).upi_qr || "").toString().slice(0, 500000);
  const upd = db.prepare("INSERT INTO app_settings (key, value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
  upd.run("upi_id", upiId);
  if (upiQr) upd.run("upi_qr", upiQr);
  logActivity(req.user.id, "teacher", "finance settings", "Updated UPI payment details", "finance", null);
  res.json({ ok: true });
});
// Parent: own child's ledger + teacher's UPI details (view-only)
app.get("/api/parent/finance", requireParent, (req, res) => {
  const me = db.prepare("SELECT parent_of FROM users WHERE id=?").get(req.user.id);
  if (!me || !me.parent_of) return res.status(404).json({ error: "No linked student." });
  const sid = me.parent_of;
  const entries = db.prepare("SELECT id, category, amount, direction, note, paid_at, created_at FROM finance_entries WHERE student_id=? ORDER BY created_at DESC").all(sid);
  const upi = db.prepare("SELECT key, value FROM app_settings WHERE key IN ('upi_id','upi_qr')").all();
  res.json({ entries, upi: Object.fromEntries(upi.map(r => [r.key, r.value])) });
});

app.post("/api/teacher/work/:id/review", requireTeacher, (req, res) => {
  const w = db.prepare("SELECT * FROM works WHERE id=?").get(req.params.id);
  if (!w) return res.status(404).json({ error: "Not found." });
  const { decision, stars, points, reason } = req.body || {};
  if (!["approve", "reject"].includes(decision)) return res.status(400).json({ error: "Invalid decision." });
  const st = Math.max(0, Math.min(5, parseInt(stars) || 0));
  const was = w.status;
  const rejReason = decision === "reject" ? (reason || "").toString().trim().slice(0, 500) : null;
  db.prepare("UPDATE works SET status=?, stars=?, reviewed_at=datetime('now'), reject_reason=? WHERE id=?")
    .run(decision === "approve" ? "approved" : "rejected", decision === "approve" ? st : 0, rejReason, w.id);
  if (decision === "approve" && was !== "approved") {
    // No fixed per-type points (2026-10-30): total = teacher-entered points + star points.
    const entered = (points !== undefined && points !== null && points !== "")
      ? Math.max(0, parseInt(points) || 0) : 0;
    const pts = entered + st * getSetting("per_star");
    db.prepare("UPDATE works SET points_awarded=? WHERE id=?").run(pts, w.id);
    awardPoints(w.student_id, pts, `Approved ${w.type} "${w.title}"`, "work", w.id);
    if (w.weekly_task_id) {
      const t = db.prepare("SELECT * FROM weekly_tasks WHERE id=?").get(w.weekly_task_id);
      if (t && t.kind !== "quiz") awardPoints(w.student_id, t.points, `Weekly task: ${t.title}`, "task", t.id);
    }
    // Auto-generate an illustrated exactly 8-page book (cover + 7 story pages, no blank pages) for approved stories (async, non-blocking).
    if (w.type === "story") {
      setImmediate(async () => {
        try {
          const { generateBookPDF } = require("./bookgen");
          const student = db.prepare("SELECT display_name, ad_no, bio FROM users WHERE id=?").get(w.student_id);
          const pdf = await generateBookPDF(w, student || {});
          const pages = 8; // exactly 8 pages, per new format
          db.prepare("INSERT INTO books (title, author_name, work_id, pdf_data, pages) VALUES (?,?,?,?,?)")
            .run(w.title, student ? student.display_name : "", w.id, pdf.toString("base64"), pages);
          console.log(`Auto-book created for work ${w.id}`);
        } catch (e) { console.error("Auto-book failed for work " + w.id + ":", e.message); }
      });
    }
  }
  // Every approval/rejection decision is logged (2026-10-31): the decision itself must never be losable.
  const author = db.prepare("SELECT display_name FROM users WHERE id=?").get(w.student_id);
  logActivity(req.user.id, "teacher", decision === "approve" ? "approved work" : "rejected work",
    `"${w.title}" by ${author ? author.display_name : "?"}${decision === "approve" ? ` (${st} stars)` : ""}`, "work", w.id);
  res.json({ ok: true });
});

app.post("/api/teacher/work/:id/feature", requireTeacher, (req, res) => {
  const w = db.prepare("SELECT * FROM works WHERE id=?").get(req.params.id);
  if (!w) return res.status(404).json({ error: "Not found." });
  const featured = req.body && req.body.featured ? 1 : 0;
  db.prepare("UPDATE works SET featured=? WHERE id=?").run(featured, w.id);
  res.json({ ok: true });
});

// Teacher applies proofread corrections (spelling/grammar only) to an approved work.
// Keeps the boy's original text in content_original; sets proofread_at.
app.post("/api/teacher/work/:id/title", requireTeacher, (req, res) => {
  const title = ((req.body || {}).title || "").toString().trim().slice(0, 200);
  if (!title) return res.status(400).json({ error: "Title is required." });
  db.prepare("UPDATE works SET title=? WHERE id=?").run(title, req.params.id);
  logActivity(req.user.id, "teacher", "edited title", title, "work", req.params.id);
  res.json({ ok: true });
});
app.post("/api/teacher/work/:id/proofread", requireTeacher, (req, res) => {
  const w = db.prepare("SELECT * FROM works WHERE id=?").get(req.params.id);
  if (!w) return res.status(404).json({ error: "Not found." });
  if (w.status !== "approved") return res.status(400).json({ error: "Only approved works can be proofread." });
  const { content, fixes } = req.body || {};
  if (!content || !content.trim()) return res.status(400).json({ error: "Corrected text is required." });
  db.prepare("UPDATE works SET content_original=COALESCE(content_original, content), content=?, proofread_at=datetime('now') WHERE id=?")
    .run(content.trim(), w.id);
  logActivity(req.user.id, "teacher", `Proofread "${w.title}"` + (fixes ? ` (${fixes})` : ""));
  res.json({ ok: true });
});
app.post("/api/teacher/work/:id/delete", requireTeacher, (req, res) => {
  // Complete removal: the work, its points, its auto-book, reads and likes —
  // nothing about it stays anywhere on the site.
  const id = req.params.id;
  const w = db.prepare("SELECT title, student_id FROM works WHERE id=?").get(id);
  db.prepare("DELETE FROM points_log WHERE ref_type='work' AND ref_id=?").run(id);
  db.prepare("DELETE FROM books WHERE work_id=?").run(id);
  db.prepare("DELETE FROM reads WHERE work_id=?").run(id);
  db.prepare("DELETE FROM likes WHERE work_id=?").run(id);
  db.prepare("DELETE FROM works WHERE id=?").run(id);
  if (w) logActivity(req.user.id, req.user.role, "delete",
    `Deleted work \"${w.title}\" completely (points, book, reads, likes removed)`, "work", Number(id));
  res.json({ ok: true });
});

// Students & accounts — passwords only ever go to the teacher.
app.get("/api/teacher/students", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT id, username, display_name, ad_no, photo, bio, pin,
    CASE WHEN password_hash IS NULL THEN 0 ELSE 1 END AS has_password
    FROM users WHERE role='student' ORDER BY display_name`).all();
  res.json({ students: rows });
});
app.post("/api/teacher/generate-passwords", requireTeacher, (req, res) => {
  const list = db.prepare("SELECT id, username, display_name FROM users WHERE role='student' AND password_hash IS NULL").all();
  const upd = db.prepare("UPDATE users SET password_hash=?, pin=? WHERE id=?");
  const out = list.map(s => {
    const pw = randomPin();
    upd.run(hashPassword(pw), pw, s.id);
    return { id: s.id, display_name: s.display_name, username: s.username, password: pw };
  });
  res.json({ generated: out });
});
app.post("/api/teacher/student/:id/reset-password", requireTeacher, (req, res) => {
  const s = db.prepare("SELECT id FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found." });
  const pw = randomPin();
  db.prepare("UPDATE users SET password_hash=?, pin=? WHERE id=?").run(hashPassword(pw), pw, s.id);
  res.json({ ok: true, password: pw });
});
// Teacher sets an exact 4-digit PIN for a student (e.g. re-issuing a printed PIN)
app.post("/api/teacher/student/:id/set-pin", requireTeacher, (req, res) => {
  const s = db.prepare("SELECT id FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found." });
  const pin = String(((req.body || {}).pin) || "").trim();
  if (!/^\d{4}$/.test(pin)) return res.status(400).json({ error: "PIN must be exactly 4 digits." });
  db.prepare("UPDATE users SET password_hash=?, pin=? WHERE id=?").run(hashPassword(pin), pin, s.id);
  res.json({ ok: true });
});
// Teacher changes their own username and/or password
app.post("/api/teacher/profile", requireTeacher, (req, res) => {
  const { username, password } = req.body || {};
  const changes = [];
  if (username !== undefined && String(username).trim() !== "") {
    const u = String(username).trim().toLowerCase();
    if (!/^[a-z0-9]{3,30}$/.test(u)) return res.status(400).json({ error: "Username: 3-30 letters or digits." });
    const taken = db.prepare("SELECT id FROM users WHERE username=? AND id!=?").get(u, req.user.id);
    if (taken) return res.status(400).json({ error: "That username is taken." });
    changes.push(["username", u]);
  }
  if (password !== undefined && String(password) !== "") {
    if (String(password).length < 4) return res.status(400).json({ error: "Password must be at least 4 characters." });
    changes.push(["password_hash", hashPassword(String(password))]);
  }
  if (!changes.length) return res.status(400).json({ error: "Nothing to change." });
  for (const [col, val] of changes) db.prepare(`UPDATE users SET ${col}=? WHERE id=?`).run(val, req.user.id);
  const me = db.prepare("SELECT username FROM users WHERE id=?").get(req.user.id);
  res.json({ ok: true, username: me.username });
});
// Teacher downloads a backup as JSON (works reliably on ephemeral disks;
// restore it via POST /api/teacher/restore).
app.get("/api/teacher/backup", requireTeacher, (req, res) => {
  const dump = {};
  const noPdf = req.query.nopdf === "1"; // watchdog: skip heavy book PDFs, fetch them per-book
  for (const t of RESTORE_TABLES) {
    try { dump[t] = db.prepare(`SELECT * FROM ${t}`).all(); }
    catch (e) { dump[t] = []; }
  }
  if (noPdf && Array.isArray(dump.books)) {
    dump.books = dump.books.map(b => ({ ...b, pdf_bytes: (b.pdf_data || "").length, pdf_data: null }));
  }
  res.setHeader("Content-Disposition", 'attachment; filename="lhbs-backup.json"');
  res.json({ backup: dump, exported_at: new Date().toISOString() });
});
// Teacher restores the database from a JSON dump (used by the auto-watchdog
// after the hosting wipes the disk). Replaces all content tables atomically.
const RESTORE_TABLES = ["users","sessions","works","reads","likes","points_log","activity_log","student_badges",
  "weekly_tasks","quiz_questions","quiz_attempts","mysteries","mystery_solves",
  "challenges","challenge_entries","writer_of_week","point_settings","books",
  "learning_tasks","learning_task_done","completion_certs","completion_exams","student_marks",
  "messages","notices","notice_reads","finance_entries","general_expenses","app_settings"];
app.post("/api/teacher/restore", requireTeacher, (req, res) => {
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
      try { liveCols[t] = new Set(db.prepare(`PRAGMA table_info(${t})`).all().map(c => c.name)); }
      catch (_) { liveCols[t] = null; }
    }
    db.exec("BEGIN");
    for (const t of RESTORE_TABLES) {
      const rows = dump[t];
      if (!Array.isArray(rows)) continue;
      const cols0 = liveCols[t];
      db.prepare(`DELETE FROM ${t}`).run();
      for (const row of rows) {
        const allCols = Object.keys(row);
        const cols = cols0 ? allCols.filter(c => cols0.has(c)) : allCols;
        const dropped = allCols.filter(c => !cols.includes(c));
        if (dropped.length) (skipped[t] = skipped[t] || new Set()).add(dropped.join(","));
        if (!cols.length) continue;
        db.prepare(`INSERT INTO ${t} (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`)
          .run(...cols.map(c => row[c]));
      }
    }
    db.exec("COMMIT");
    seedParentUsers(); // a stale backup may predate parent logins — re-create any missing ones
    const skippedObj = {};
    for (const [t, s] of Object.entries(skipped)) skippedObj[t] = [...s].join(",");
    res.json({ ok: true, skippedColumns: skippedObj });
  } catch (e) {
    try { db.exec("ROLLBACK"); } catch (_) {}
    res.status(500).json({ error: "Restore failed." });
  }
});
// ── Illustrated books ─────────────────────────────────────────
// Teacher uploads an illustrated book PDF (generated by Muse from a story).
// The PDF is stored in the DB so backups capture it automatically.
app.post("/api/teacher/books", requireTeacher, (req, res) => {
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
    const w = db.prepare("SELECT student_id FROM works WHERE id=?").get(work_id);
    if (w) author_id = w.student_id;
  }
  const r = db.prepare("INSERT INTO books (work_id, title, author_name, author_id, pdf_data, pages) VALUES (?,?,?,?,?,?)")
    .run(work_id || null, title.trim(), author_name.trim(), author_id, pdf_base64, parseInt(pages) || 8);
  res.json({ ok: true, id: r.lastInsertRowid });
});
app.get("/api/books", requireLogin, (req, res) => {
  const books = db.prepare("SELECT id, work_id, title, author_name, pages, created_at FROM books ORDER BY created_at DESC").all();
  res.json({ books });
});
// Teacher preview: get any student's dashboard data (read-only, teacher stays logged in)
app.get("/api/teacher/student/:id/preview", requireTeacher, (req, res) => {
  const s = db.prepare("SELECT id, display_name, username, photo, bio FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found." });
  const st = studentStats(s.id);
  const badges = db.prepare("SELECT badge_key FROM student_badges WHERE student_id=?").all(s.id).map(r => r.badge_key);
  const board = db.prepare(`
    SELECT u.id, COALESCE(SUM(p.points),0) AS pts FROM users u
    LEFT JOIN points_log p ON p.student_id=u.id WHERE u.role='student'
    GROUP BY u.id ORDER BY pts DESC`).all();
  const rank = board.findIndex(r => r.id === s.id) + 1;
  const works = db.prepare("SELECT id, type, language, title, stars, status, created_at FROM works WHERE student_id=? ORDER BY created_at DESC").all(s.id);
  res.json({ student: s, points: st.points, rank, approved: st.approved, stars: st.stars, badges, stats: st, works });
});
app.get("/api/books/:id/file", requireLogin, (req, res) => {
  const b = db.prepare("SELECT title, pdf_data FROM books WHERE id=?").get(req.params.id);
  if (!b || !b.pdf_data) return res.status(404).json({ error: "Not found." });
  const buf = Buffer.from(b.pdf_data, "base64");
  res.setHeader("Content-Type", "application/pdf");
  // 2026-11-02: ASCII-safe filename — non-Latin titles (Kannada) made Node throw ERR_INVALID_CHAR (500 on download); book id is always ASCII.
  res.setHeader("Content-Disposition", `inline; filename="book-${parseInt(req.params.id, 10)}.pdf"`);
  res.send(buf);
});
app.delete("/api/teacher/books/:id", requireTeacher, (req, res) => {
  const r = db.prepare("DELETE FROM books WHERE id=?").run(req.params.id);
  if (!r.changes) return res.status(404).json({ error: "Not found." });
  res.json({ ok: true });
});
app.post("/api/teacher/student/:id", requireTeacher, (req, res) => {
  const s = db.prepare("SELECT id FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found." });
  const { display_name, bio, photo } = req.body || {};
  if (photo && photo.length > 700000) return res.status(400).json({ error: "Photo is too large (max ~500KB)." });
  db.prepare("UPDATE users SET display_name=COALESCE(?,display_name), bio=?, photo=? WHERE id=?")
    .run(display_name && display_name.trim() ? display_name.trim() : null, bio || null, photo || null, s.id);
  res.json({ ok: true });
});
// Likes/reads points REMOVED 2026-10-30 per Samad — only works earn points hereafter.
// One-time teacher cleanup: delete every like/read point and re-check auto badges.
app.post("/api/teacher/purge-like-read", requireTeacher, (req, res) => {
  const del = db.prepare("DELETE FROM points_log WHERE ref_type IN ('like','read')").run();
  db.prepare("DELETE FROM student_badges WHERE badge_key IN ('rising_author','story_champion','club_100','club_200','club_500','club_1000')").run();
  const students = db.prepare("SELECT id FROM users WHERE role='student'").all();
  students.forEach(s => checkBadges(s.id));
  res.json({ ok: true, deleted_entries: del.changes });
});
// Puzzle game REMOVED 2026-10-29 per Samad — no puzzles on the site hereafter.
// One-time teacher cleanup: delete every puzzle point and re-check auto badges.
app.post("/api/teacher/purge-puzzle", requireTeacher, (req, res) => {
  const del = db.prepare("DELETE FROM points_log WHERE ref_type='puzzle'").run();
  db.prepare("DELETE FROM student_badges WHERE badge_key IN ('rising_author','story_champion','club_100','club_200','club_500','club_1000')").run();
  const students = db.prepare("SELECT id FROM users WHERE role='student'").all();
  students.forEach(s => checkBadges(s.id));
  res.json({ ok: true, deleted_puzzle_entries: del.changes });
});
// Mysteries REMOVED 2026-10-30 per Samad — no mysteries on the site hereafter.
// One-time teacher cleanup: delete every mystery point and re-check auto badges.
app.post("/api/teacher/purge-mystery", requireTeacher, (req, res) => {
  const del = db.prepare("DELETE FROM points_log WHERE ref_type='mystery'").run();
  db.prepare("DELETE FROM student_badges WHERE badge_key IN ('rising_author','story_champion','club_100','club_200','club_500','club_1000')").run();
  const students = db.prepare("SELECT id FROM users WHERE role='student'").all();
  students.forEach(s => checkBadges(s.id));
  res.json({ ok: true, deleted_mystery_entries: del.changes });
});
app.post("/api/teacher/adjust-points", requireTeacher, (req, res) => {
  const { student_id, points, reason } = req.body || {};
  const s = db.prepare("SELECT id FROM users WHERE id=? AND role='student'").get(student_id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  const p = parseInt(points) || 0;
  if (p === 0) return res.status(400).json({ error: "Points cannot be zero." });
  if (p > 0) awardPoints(s.id, p, reason || "Points awarded by teacher");
  else removePoints(s.id, -p, reason || "Points removed by teacher");
  res.json({ ok: true, total: totalPoints(s.id) });
});
// Set a boy's total points to an exact number (edit/reset).
app.post("/api/teacher/set-points", requireTeacher, (req, res) => {
  const { student_id, points, reason } = req.body || {};
  const s = db.prepare("SELECT id, display_name FROM users WHERE id=? AND role='student'").get(student_id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  const target = Math.max(0, parseInt(points) || 0);
  const current = totalPoints(s.id);
  const diff = target - current;
  if (diff === 0) return res.json({ ok: true, total: current, note: "No change needed." });
  if (diff > 0) awardPoints(s.id, diff, reason || `Points set to ${target} by teacher`);
  else removePoints(s.id, -diff, reason || `Points set to ${target} by teacher`);
  res.json({ ok: true, total: totalPoints(s.id) });
});
// Get a student's full points history (for editing individual entries).
app.get("/api/teacher/student/:id/points-log", requireTeacher, (req, res) => {
  const s = db.prepare("SELECT id FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  const log = db.prepare("SELECT id, points, reason, ref_type, ref_id, created_at FROM points_log WHERE student_id=? ORDER BY id DESC").all(s.id);
  res.json({ log, total: totalPoints(s.id) });
});
// Edit a single points entry.
app.post("/api/teacher/points-log/:id", requireTeacher, (req, res) => {
  const e = db.prepare("SELECT * FROM points_log WHERE id=?").get(req.params.id);
  if (!e) return res.status(404).json({ error: "Entry not found." });
  const { points, reason } = req.body || {};
  const p = parseInt(points);
  if (!Number.isInteger(p)) return res.status(400).json({ error: "Points must be a whole number." });
  db.prepare("UPDATE points_log SET points=?, reason=? WHERE id=?").run(p, (reason || e.reason).trim() || e.reason, e.id);
  res.json({ ok: true, total: totalPoints(e.student_id) });
});
// Delete a single points entry.
app.delete("/api/teacher/points-log/:id", requireTeacher, (req, res) => {
  const e = db.prepare("SELECT * FROM points_log WHERE id=?").get(req.params.id);
  if (!e) return res.status(404).json({ error: "Entry not found." });
  db.prepare("DELETE FROM points_log WHERE id=?").run(e.id);
  res.json({ ok: true, total: totalPoints(e.student_id) });
});

// ── Learning Tasks (mandatory memorization checklist) ──
const LEARN_CATS = { dua5: "🕌 5 Daily Duas", dua: "🤲 General Dua", quran: "📖 Quran Hifz", speech: "🎤 Speech", other: "📌 Other" };
// List all learning tasks (teacher + students + guests).
app.get("/api/learning-tasks", requireLogin, (req, res) => {
  const tasks = db.prepare("SELECT * FROM learning_tasks ORDER BY sort_order, id").all();
  res.json({ tasks, categories: LEARN_CATS });
});
// Create a learning task (teacher).
app.post("/api/teacher/learning-task", requireTeacher, (req, res) => {
  const { title, category, details } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
  const cat = LEARN_CATS[category] ? category : "other";
  const maxOrder = db.prepare("SELECT COALESCE(MAX(sort_order),0) m FROM learning_tasks").get().m;
  const r = db.prepare("INSERT INTO learning_tasks (title, category, details, sort_order) VALUES (?,?,?,?)")
    .run(title.trim(), cat, (details || "").trim(), maxOrder + 1);
  res.json({ ok: true, id: r.lastInsertRowid });
});
// Delete a learning task (teacher).
app.delete("/api/teacher/learning-task/:id", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM learning_tasks WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});
// ---- Student Marks (teacher manages; student/parent see only their own) ----
app.get("/api/teacher/marks", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT m.*, u.display_name as student_name, u.ad_no
    FROM student_marks m JOIN users u ON u.id=m.student_id
    ORDER BY u.display_name, m.subject`).all();
  res.json({ marks: rows });
});
app.post("/api/teacher/marks", requireTeacher, (req, res) => {
  const { student_id, subject, exam, marks, max_marks, grade } = req.body || {};
  if (!student_id || !subject || marks === undefined)
    return res.status(400).json({ error: "student_id, subject and marks required." });
  db.prepare(`INSERT INTO student_marks (student_id, subject, exam, marks, max_marks, grade)
    VALUES (?,?,?,?,?,?)
    ON CONFLICT(student_id, subject, exam) DO UPDATE SET marks=excluded.marks, max_marks=excluded.max_marks, grade=excluded.grade`)
    .run(student_id, subject, exam || '', Number(marks), Number(max_marks) || 100, grade || '');
  const s = db.prepare("SELECT display_name FROM users WHERE id=?").get(student_id);
  logActivity(req.user.id, req.user.role, "marks",
    `Updated marks for ${s ? s.display_name : student_id}: ${subject} = ${marks}`, "marks", student_id);
  res.json({ ok: true });
});
app.delete("/api/teacher/marks/:id", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM student_marks WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});
// Student sees ONLY their own marks.
app.get("/api/my/marks", requireStudent, (req, res) => {
  const rows = db.prepare("SELECT subject, exam, marks, max_marks, grade FROM student_marks WHERE student_id=? ORDER BY subject")
    .all(req.user.id);
  res.json({ marks: rows });
});
// Parent sees ONLY their own child's marks.
app.get("/api/parent/marks", requireParent, (req, res) => {
  const me = db.prepare("SELECT parent_of FROM users WHERE id=?").get(req.user.id);
  if (!me || !me.parent_of) return res.json({ marks: [] });
  const rows = db.prepare("SELECT subject, exam, marks, max_marks, grade FROM student_marks WHERE student_id=? ORDER BY subject")
    .all(me.parent_of);
  res.json({ marks: rows });
});
// Tick / untick a task for a student (teacher or guest).
app.post("/api/teacher/learning-tick", requireTeacherOrGuest, (req, res) => {
  const { task_id, student_id, done } = req.body || {};
  const t = db.prepare("SELECT id, title FROM learning_tasks WHERE id=?").get(task_id);
  const s = db.prepare("SELECT id, display_name FROM users WHERE id=? AND role='student'").get(student_id);
  if (!t || !s) return res.status(404).json({ error: "Not found." });
  if (done) db.prepare("INSERT OR IGNORE INTO learning_task_done (task_id, student_id) VALUES (?,?)").run(t.id, s.id);
  else db.prepare("DELETE FROM learning_task_done WHERE task_id=? AND student_id=?").run(t.id, s.id);
  logActivity(req.user.id, req.user.role, done ? "tick" : "untick",
    `${done ? "Ticked" : "Unticked"} "${t.title}" for ${s.display_name}`, "learning_task", t.id);
  res.json({ ok: true, progress: learningProgress(s.id) });
});
// Completion % for one student.
function learningProgress(student_id) {
  const total = db.prepare("SELECT COUNT(*) c FROM learning_tasks").get().c;
  if (!total) return { done: 0, total: 0, pct: 0 };
  const done = db.prepare("SELECT COUNT(*) c FROM learning_task_done WHERE student_id=?").get(student_id).c;
  return { done, total, pct: Math.round(done / total * 100) };
}
// All students' progress (teacher or guest — for graphs).
app.get("/api/teacher/learning-progress", requireTeacherOrGuest, (req, res) => {
  const students = db.prepare("SELECT id, display_name FROM users WHERE role='student' ORDER BY display_name").all();
  const total = db.prepare("SELECT COUNT(*) c FROM learning_tasks").get().c;
  const doneRows = db.prepare("SELECT student_id, task_id FROM learning_task_done").all();
  const doneMap = {};
  doneRows.forEach(r => { (doneMap[r.student_id] = doneMap[r.student_id] || new Set()).add(r.task_id); });
  const list = students.map(s => {
    const done = doneMap[s.id] ? doneMap[s.id].size : 0;
    return { id: s.id, display_name: s.display_name, done, total, pct: total ? Math.round(done / total * 100) : 0 };
  });
  res.json({ students: list, total });
});
// Detailed summary: per-student per-category completion (teacher or guest).
app.get("/api/teacher/learning-summary", requireTeacherOrGuest, (req, res) => {
  const students = db.prepare("SELECT id, display_name, ad_no FROM users WHERE role='student' ORDER BY display_name").all();
  const tasks = db.prepare("SELECT id, category FROM learning_tasks").all();
  const catTotals = {};
  tasks.forEach(t => { catTotals[t.category] = (catTotals[t.category] || 0) + 1; });
  const taskCat = {};
  tasks.forEach(t => { taskCat[t.id] = t.category; });
  const doneRows = db.prepare("SELECT student_id, task_id FROM learning_task_done").all();
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
// Top 10 boys by Learning Tasks completion % (all logged-in users — a public ranking like the points board).
app.get("/api/learning-top10", requireLogin, (req, res) => {
  const students = db.prepare("SELECT id, display_name, ad_no, photo FROM users WHERE role='student'").all();
  const total = db.prepare("SELECT COUNT(*) c FROM learning_tasks").get().c;
  const taskIds = new Set(db.prepare("SELECT id FROM learning_tasks").all().map(r => r.id));
  const doneRows = db.prepare("SELECT student_id, task_id FROM learning_task_done").all();
  const doneMap = {};
  doneRows.forEach(r => { (doneMap[r.student_id] = doneMap[r.student_id] || new Set()).add(r.task_id); });
  // Who completed first? Replay tick/untick activity in chronological order,
  // tracking each student's ticked set; completed_at = first moment it hit total.
  const nameToId = {};
  students.forEach(s => { nameToId[s.display_name] = s.id; });
  const events = db.prepare("SELECT id, action, detail, ref_id, created_at FROM activity_log WHERE action IN ('tick','untick') AND ref_type='learning_task' ORDER BY created_at, id").all();
  const ticked = {};
  const completedAt = {};
  events.forEach(e => {
    if (!taskIds.has(e.ref_id)) return;
    const m = /" for (.+)$/.exec(e.detail || "");
    if (!m) return;
    const sid = nameToId[m[1]];
    if (!sid) return;
    const s = ticked[sid] || (ticked[sid] = new Set());
    if (e.action === "tick") s.add(e.ref_id); else s.delete(e.ref_id);
    if (total > 0 && s.size === total && !completedAt[sid]) completedAt[sid] = e.created_at;
  });
  const list = students.map(st => {
    const done = doneMap[st.id] ? doneMap[st.id].size : 0;
    return { id: st.id, display_name: st.display_name, ad_no: st.ad_no, photo: st.photo,
      done, total, pct: total ? Math.round(done / total * 100) : 0,
      completed_at: completedAt[st.id] || null };
  });
  list.sort((a, b) => {
    const aFull = total > 0 && a.done === total, bFull = total > 0 && b.done === total;
    if (aFull !== bFull) return aFull ? -1 : 1;
    if (aFull && bFull) {
      if (a.completed_at && b.completed_at)
        return a.completed_at < b.completed_at ? -1 : a.completed_at > b.completed_at ? 1 : a.display_name.localeCompare(b.display_name);
      if (a.completed_at) return -1;
      if (b.completed_at) return 1;
      return a.display_name.localeCompare(b.display_name);
    }
    return b.pct - a.pct || b.done - a.done || a.display_name.localeCompare(b.display_name);
  });
  res.json({ top: list.slice(0, 10), total });
});
// One student's ticked tasks (teacher or guest view for the grid).
app.get("/api/teacher/learning-ticks/:id", requireTeacherOrGuest, (req, res) => {
  const rows = db.prepare("SELECT task_id FROM learning_task_done WHERE student_id=?").all(req.params.id);
  res.json({ done: rows.map(r => r.task_id), progress: learningProgress(req.params.id) });
});
// ── Completion Certificates (100% of Learning Tasks) ──
// Boys at 100% completion, with issued status (teacher only).
app.get("/api/teacher/completion-eligible", requireTeacher, (req, res) => {
  const students = db.prepare("SELECT id, display_name, ad_no, photo FROM users WHERE role='student' ORDER BY display_name").all();
  const issuedAt = Object.fromEntries(db.prepare("SELECT student_id, issued_at FROM completion_certs").all().map(r => [r.student_id, r.issued_at]));
  const examAt = Object.fromEntries(db.prepare("SELECT student_id, passed_at FROM completion_exams").all().map(r => [r.student_id, r.passed_at]));
  const list = students.map(s => ({ ...s, ...learningProgress(s.id),
    issued: !!issuedAt[s.id], issued_at: issuedAt[s.id] || null,
    exam_passed: !!examAt[s.id], exam_at: examAt[s.id] || null }));
  res.json({ students: list.filter(s => s.pct === 100) });
});
// Mark the completion exam as passed (teacher only; only at 100%). The exam itself is conducted in class.
app.post("/api/teacher/completion-exam/:id/pass", requireTeacher, (req, res) => {
  const s = db.prepare("SELECT id, display_name FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  if (learningProgress(s.id).pct !== 100) return res.status(400).json({ error: "Not at 100% yet." });
  db.prepare("INSERT OR IGNORE INTO completion_exams (student_id) VALUES (?)").run(s.id);
  logActivity(req.user.id, req.user.role, "completion_exam",
    `Marked completion exam passed for ${s.display_name}`, "completion_exam", s.id);
  res.json({ ok: true });
});
// Unmark the completion exam (teacher only; not allowed once the certificate is issued).
app.post("/api/teacher/completion-exam/:id/unpass", requireTeacher, (req, res) => {
  const c = db.prepare("SELECT student_id FROM completion_certs WHERE student_id=?").get(req.params.id);
  if (c) return res.status(400).json({ error: "Certificate already issued — revoke it first." });
  db.prepare("DELETE FROM completion_exams WHERE student_id=?").run(req.params.id);
  res.json({ ok: true });
});
// Issue a completion certificate (teacher only; only at 100% AND exam passed).
app.post("/api/teacher/completion-cert/:id/issue", requireTeacher, (req, res) => {
  const s = db.prepare("SELECT id, display_name FROM users WHERE id=? AND role='student'").get(req.params.id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  if (learningProgress(s.id).pct !== 100) return res.status(400).json({ error: "Not at 100% yet." });
  const ex = db.prepare("SELECT passed_at FROM completion_exams WHERE student_id=?").get(s.id);
  if (!ex) return res.status(400).json({ error: "Exam not passed yet." });
  db.prepare("INSERT OR IGNORE INTO completion_certs (student_id) VALUES (?)").run(s.id);
  logActivity(req.user.id, req.user.role, "completion_cert",
    `Issued completion certificate to ${s.display_name}`, "completion_cert", s.id);
  res.json({ ok: true });
});
// Revoke a completion certificate (teacher only).
app.post("/api/teacher/completion-cert/:id/revoke", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM completion_certs WHERE student_id=?").run(req.params.id);
  res.json({ ok: true });
});
// Student's own completion certificate status.
app.get("/api/my/completion-cert", requireStudent, (req, res) => {
  const c = db.prepare("SELECT issued_at FROM completion_certs WHERE student_id=?").get(req.user.id);
  const ex = db.prepare("SELECT passed_at FROM completion_exams WHERE student_id=?").get(req.user.id);
  const out = { issued: !!c, issued_at: c ? c.issued_at : null,
    exam_passed: !!ex, exam_at: ex ? ex.passed_at : null };
  if (!c) out.progress = learningProgress(req.user.id);
  res.json(out);
});
// Parent's view: own child's completion certificate status + child info.
app.get("/api/parent/completion-cert", requireParent, (req, res) => {
  const me = db.prepare("SELECT parent_of FROM users WHERE id=?").get(req.user.id);
  if (!me || !me.parent_of) return res.status(404).json({ error: "No linked student." });
  const s = db.prepare("SELECT id, display_name, ad_no, photo FROM users WHERE id=? AND role='student'").get(me.parent_of);
  if (!s) return res.status(404).json({ error: "Linked student not found." });
  const c = db.prepare("SELECT issued_at FROM completion_certs WHERE student_id=?").get(s.id);
  const ex = db.prepare("SELECT passed_at FROM completion_exams WHERE student_id=?").get(s.id);
  res.json({ student: s, issued: !!c, issued_at: c ? c.issued_at : null,
    exam_passed: !!ex, exam_at: ex ? ex.passed_at : null });
});
// Student's own progress + checklist.
app.get("/api/my/learning-progress", requireStudent, (req, res) => {
  const tasks = db.prepare("SELECT * FROM learning_tasks ORDER BY sort_order, id").all();
  const doneRows = db.prepare("SELECT task_id FROM learning_task_done WHERE student_id=?").all(req.user.id);
  const doneSet = new Set(doneRows.map(r => r.task_id));
  res.json({
    tasks: tasks.map(t => ({ ...t, done: doneSet.has(t.id) })),
    progress: learningProgress(req.user.id),
    categories: LEARN_CATS
  });
});

// One-time migration endpoint (teacher only) — fixes users table for guest role.
app.post("/api/teacher/migrate-guest", requireTeacher, (req, res) => {
  try {
    var urow = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'").get();
    var usql = urow && urow.sql ? urow.sql : "";
    if (usql && usql.indexOf("'guest'") < 0) {
      db.exec("PRAGMA foreign_keys=OFF;");
      db.exec("CREATE TABLE users_new (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "username TEXT UNIQUE NOT NULL," +
        "password_hash TEXT," +
        "role TEXT NOT NULL CHECK(role IN ('teacher','student','guest','principal','vice_principal','section_head'))," +
        "display_name TEXT NOT NULL," +
        "ad_no TEXT," +
        "photo TEXT," +
        "bio TEXT," +
        "pin TEXT," +
        "created_at TEXT DEFAULT (datetime('now'))" +
        ");" +
        "INSERT INTO users_new (id, username, password_hash, role, display_name, ad_no, photo, bio, pin, created_at)" +
        " SELECT id, username, password_hash, role, display_name, ad_no, photo, bio, pin, created_at FROM users;" +
        "DROP TABLE users;" +
        "ALTER TABLE users_new RENAME TO users;" +
        "PRAGMA foreign_keys=ON;");
      return res.json({ ok: true, migrated: true });
    }
    res.json({ ok: true, migrated: false, note: "Already has guest role." });
  } catch (e) {
    try { db.exec("PRAGMA foreign_keys=ON;"); } catch(_){}
    res.status(500).json({ error: e.message });
  }
});

// ── Guest accounts (limited: only tick learning tasks + view graphs) ──
app.get("/api/teacher/guests", requireTeacher, (req, res) => {
  const guests = db.prepare("SELECT id, username, display_name, created_at FROM users WHERE role='guest' ORDER BY id").all();
  res.json({ guests });
});
app.post("/api/teacher/guest", requireTeacher, (req, res) => {
  const { username, display_name, password } = req.body || {};
  const uname = String(username || "").trim().toLowerCase();
  if (!uname || !password || String(password).length < 4)
    return res.status(400).json({ error: "Username and password (min 4 chars) are required." });
  if (db.prepare("SELECT id FROM users WHERE username=?").get(uname))
    return res.status(400).json({ error: "Username already taken." });
  const r = db.prepare("INSERT INTO users (username, password_hash, role, display_name) VALUES (?,?,?,?)")
    .run(uname, hashPassword(String(password)), "guest", String(display_name || uname).trim() || uname);
  res.json({ ok: true, id: r.lastInsertRowid });
});
app.post("/api/teacher/guest/:id/password", requireTeacher, (req, res) => {
  const g = db.prepare("SELECT id FROM users WHERE id=? AND role='guest'").get(req.params.id);
  if (!g) return res.status(404).json({ error: "Guest not found." });
  const { password } = req.body || {};
  if (!password || String(password).length < 4)
    return res.status(400).json({ error: "Password must be at least 4 characters." });
  db.prepare("UPDATE users SET password_hash=? WHERE id=?").run(hashPassword(String(password)), g.id);
  res.json({ ok: true });
});
app.delete("/api/teacher/guest/:id", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM users WHERE id=? AND role='guest'").run(req.params.id);
  res.json({ ok: true });
});

// Weekly tasks
app.post("/api/teacher/weekly-task", requireTeacher, (req, res) => {
  const { title, kind, prompt, points, start_date, questions } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
  if (!["story_start", "theme", "quiz"].includes(kind)) return res.status(400).json({ error: "Invalid kind." });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date || "")) return res.status(400).json({ error: "Start date (YYYY-MM-DD) is required." });
  const r = db.prepare("INSERT INTO weekly_tasks (title, kind, prompt, points, start_date) VALUES (?,?,?,?,?)")
    .run(title.trim(), kind, (prompt || "").trim(), Math.max(0, parseInt(points) || 0), start_date);
  const taskId = r.lastInsertRowid;
  if (kind === "quiz" && Array.isArray(questions)) {
    const ins = db.prepare("INSERT INTO quiz_questions (task_id, question, answer, sort_order) VALUES (?,?,?,?)");
    questions.slice(0, 30).forEach((q, i) => {
      if (q && q.question && q.answer) ins.run(taskId, String(q.question).trim(), String(q.answer).trim(), i);
    });
  }
  res.json({ ok: true, id: taskId, deadline: taskDeadline(start_date) });
});
app.post("/api/teacher/weekly-task/:id/delete", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM quiz_questions WHERE task_id=?").run(req.params.id);
  db.prepare("DELETE FROM quiz_attempts WHERE task_id=?").run(req.params.id);
  db.prepare("DELETE FROM weekly_tasks WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});
app.get("/api/teacher/quiz/:id/attempts", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT a.*, u.display_name FROM quiz_attempts a
    JOIN users u ON u.id=a.student_id WHERE a.task_id=? ORDER BY a.score DESC`).all(req.params.id);
  res.json({ attempts: rows.map(a => ({ ...a, answers: JSON.parse(a.answers_json || "[]") })) });
});


// Challenges
app.post("/api/teacher/challenge", requireTeacher, (req, res) => {
  const { title, description, points, deadline } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
  const r = db.prepare("INSERT INTO challenges (title, description, points, deadline) VALUES (?,?,?,?)")
    .run(title.trim(), (description || "").trim(), Math.max(0, parseInt(points) || getSetting("challenge")), deadline || null);
  res.json({ ok: true, id: r.lastInsertRowid });
});
app.get("/api/teacher/challenge/:id/entries", requireTeacher, (req, res) => {
  const rows = db.prepare(`SELECT e.*, u.display_name FROM challenge_entries e
    JOIN users u ON u.id=e.student_id WHERE e.challenge_id=? ORDER BY e.created_at`).all(req.params.id);
  res.json({ entries: rows });
});
app.post("/api/teacher/challenge-entry/:id/complete", requireTeacher, (req, res) => {
  const e = db.prepare("SELECT * FROM challenge_entries WHERE id=?").get(req.params.id);
  if (!e) return res.status(404).json({ error: "Not found." });
  if (e.status === "done") return res.json({ ok: true });
  const c = db.prepare("SELECT * FROM challenges WHERE id=?").get(e.challenge_id);
  db.prepare("UPDATE challenge_entries SET status='done' WHERE id=?").run(e.id);
  awardPoints(e.student_id, c.points, `Challenge completed: ${c.title}`, "challenge", c.id);
  res.json({ ok: true });
});
app.post("/api/teacher/challenge/:id/delete", requireTeacher, (req, res) => {
  db.prepare("DELETE FROM challenge_entries WHERE challenge_id=?").run(req.params.id);
  db.prepare("DELETE FROM challenges WHERE id=?").run(req.params.id);
  res.json({ ok: true });
});

// Writer of the week
app.post("/api/teacher/writer-of-week", requireTeacher, (req, res) => {
  const { student_id, note } = req.body || {};
  const s = db.prepare("SELECT id FROM users WHERE id=? AND role='student'").get(student_id);
  if (!s) return res.status(404).json({ error: "Student not found." });
  db.prepare("INSERT INTO writer_of_week (student_id, note) VALUES (?,?)").run(s.id, (note || "").trim());
  res.json({ ok: true });
});

// Point settings
app.get("/api/teacher/point-settings", requireTeacher, (req, res) => {
  const rows = db.prepare("SELECT key, value FROM point_settings").all();
  res.json({ settings: Object.fromEntries(rows.map(r => [r.key, r.value])) });
});
app.post("/api/teacher/point-settings", requireTeacher, (req, res) => {
  const upd = db.prepare("INSERT INTO point_settings (key, value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
  for (const [k, v] of Object.entries(req.body || {})) {
    if (k in DEFAULT_POINTS) upd.run(k, Math.max(0, parseInt(v) || 0));
  }
  res.json({ ok: true });
});

// Activity feed
app.get("/api/teacher/activity", requireTeacher, (req, res) => {
  // Unified feed: student points + submissions, and the who-did-what log
  // (logins for all roles; task ticks/unticks by teachers and mentors).
  const pts = db.prepare(`SELECT p.created_at AS at, 'points' AS kind, u.display_name AS actor, 'student' AS actor_role,
      p.reason AS text, p.points AS points
    FROM points_log p JOIN users u ON u.id=p.student_id ORDER BY p.id DESC LIMIT 60`).all();
  const log = db.prepare(`SELECT a.created_at AS at, a.action AS kind, u.display_name AS actor, a.role AS actor_role,
      COALESCE(a.detail, '') AS text, NULL AS points
    FROM activity_log a LEFT JOIN users u ON u.id=a.user_id ORDER BY a.id DESC LIMIT 60`).all();
  const subs = db.prepare(`SELECT w.created_at AS at, 'submit' AS kind, u.display_name AS actor, 'student' AS actor_role,
      ('Submitted "' || w.title || '" (' || w.status || ')') AS text, NULL AS points
    FROM works w JOIN users u ON u.id=w.student_id ORDER BY w.id DESC LIMIT 40`).all();
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

app.listen(PORT, () => console.log(`Little Hands, Big Stories running at http://localhost:${PORT}`));
