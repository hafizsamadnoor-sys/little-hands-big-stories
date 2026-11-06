// Shared helpers for all pages.
async function api(method, url, body) {
  const r = await fetch(url, {
    method, headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || ("Request failed (" + r.status + ")"));
  return data;
}
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = (d) => { try { return new Date(d).toLocaleDateString(); } catch (e) { return d || ""; } };
// Points Clubs (highest first) — mirrors the server CLUBS list.
const CLUBS = [
  { points: 1000, icon: "👑", name: "1000 Points Club", title: "Legend" },
  { points: 500, icon: "💎", name: "500 Points Club", title: "Diamond Star" },
  { points: 200, icon: "🌟", name: "200 Points Club", title: "Super Star" },
  { points: 100, icon: "⭐", name: "100 Points Club", title: "Rising Star" },
];
const clubFor = (pts) => CLUBS.find(c => (pts || 0) >= c.points) || null;
const fmtDateTime = (d) => { try { const t = new Date(d); return t.toLocaleDateString() + " " + t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); } catch (e) { return d || ""; } };
const avatar = (name, photo) =>
  photo ? `<img src="${esc(photo)}" alt="">` : esc((name || "?").trim()[0] || "?");

async function currentUser() {
  try { const d = await api("GET", "/api/me"); return d.user; }
  catch (e) { return null; }
}
async function guard(role) {
  const user = await currentUser();
  if (!user) { location.href = "/index.html"; return null; }
  const roles = Array.isArray(role) ? role : (role ? [role] : null);
  if (roles && !roles.includes(user.role)) {
    location.href = user.role === "teacher" ? "/teacher.html" : user.role === "guest" ? "/guest.html" : user.role === "parent" ? "/parent.html" : (["principal","vice_principal","section_head"].includes(user.role) ? "/admin.html" : "/dashboard.html");
    return null;
  }
  // Guests can only use the guest page — keep them out of student/teacher pages
  if (!role && user.role === "guest" && !location.pathname.endsWith("/guest.html")) {
    location.href = "/guest.html"; return null;
  }
  // Parents are viewers only — keep them on the parent page (certificate page also allowed,
  // so a parent can view and download their own child's certificate)
  if (!role && user.role === "parent" && !location.pathname.endsWith("/parent.html") && !location.pathname.endsWith("/certificate.html")) {
    location.href = "/parent.html"; return null;
  }
  // Admins (principal/vice principal/section head) — keep them on the admin page
  if (!role && ["principal","vice_principal","section_head"].includes(user.role) && !location.pathname.endsWith("/admin.html")) {
    location.href = "/admin.html"; return null;
  }
  return user;
}
function studentNav(active) {
  const links = [
    ["dashboard.html", "🏠 Home"], ["write.html", "✍️ Write"], ["works.html", "📖 Stories"],
    ["tasks.html", "📅 Tasks"], ["challenges.html", "🎯 Challenges"],
    ["board.html", "🏆 Board"], ["certificate.html", "🏅 Certificate"], ["books.html", "📚 Books"], ["authors.html", "👥 Authors"], ["about.html", "ℹ️ About"],
  ];
  return navHtml(links, active);
}
function teacherNav(active) {
  const links = [
    ["teacher.html", "🧑‍🏫 Teacher Panel"], ["works.html", "📖 Stories"],
    ["board.html", "🏆 Board"], ["certificate.html", "🏅 Certificate"], ["books.html", "📚 Books"], ["authors.html", "👥 Authors"], ["about.html", "ℹ️ About"],
  ];
  return `<header class="top"><div class="top-in">
    <div class="brand-logo"><img src="/icons/flower-192.png" alt="Little Hands" style="width:100%;height:100%;border-radius:12px;object-fit:cover;display:block"></div><div class="brand">Little Hands, Big Stories<div class="inst">Noorul Huda Centre for Excellence</div><small>Leading forward · S1 12th Batch</small></div>
    <div style="flex:1"></div>
    <button id="teacherbell" class="bell-btn" title="Messages from students" style="display:none">🔔<span class="bell-badge" id="teacherbellbadge" style="display:none"></span></button>
    <button class="btn small ghost" id="stulogin" style="margin:0 6px 0 0">🧑‍🎓 Student Login</button>
    <a href="/api/logout" class="btn small ghost" style="margin:0">Logout</a>
  </div><nav class="main">${links.map(([h, t]) =>
    `<a href="/${h}" class="${active === h ? "on" : ""}">${t}</a>`).join("")}</nav></header>
  <div id="stuloginmodal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;align-items:center;justify-content:center">
    <div class="card" style="max-width:360px;width:calc(100% - 40px)">
      <h3>🧑‍🎓 Log in as a student</h3>
      <label>Student</label><select id="sl_student"></select>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn" id="sl_go">Login →</button>
        <button class="btn ghost" id="sl_cancel">Cancel</button>
      </div>
    </div>
  </div>`;
}
function navHtml(links, active) {
  return `<header class="top"><div class="top-in">
    <div class="brand-logo"><img src="/icons/flower-192.png" alt="Little Hands" style="width:100%;height:100%;border-radius:12px;object-fit:cover;display:block"></div><div class="brand">Little Hands, Big Stories<div class="inst">Noorul Huda Centre for Excellence</div><small>Leading forward · S1 12th Batch</small></div>
    <div style="flex:1"></div>
    <div style="position:relative;flex:none">
      <button id="notifbell" class="bell-btn" title="Notifications" style="display:none;margin-right:8px">🔔<span class="bell-badge" id="bellbadge" style="display:none"></span></button>
      <button id="chatbtn" class="bell-btn" title="Chat with your teacher" style="display:none;margin-right:8px">💬<span class="bell-badge" id="chatbadge" style="display:none"></span></button>
      <div id="belldrop" class="bell-drop" style="display:none"></div>
    </div>
    <a href="/api/logout" class="btn small ghost" style="margin:0">Logout</a>
  </div><nav class="main">${links.map(([h, t]) =>
    `<a href="/${h}" class="${active === h ? "on" : ""}">${t}</a>`).join("")}</nav></header>`;
}
function toast(msg, ok) {
  const d = document.createElement("div");
  d.className = ok === false ? "alert" : "ok";
  d.textContent = msg;
  document.querySelector(".wrap").prepend(d);
  setTimeout(() => d.remove(), 4000);
  window.scrollTo(0, 0);
}
// Refresh button helper — spin animation then reload
function doRefresh(btn) {
  if (btn) { btn.classList.add("spinning"); }
  setTimeout(() => location.reload(), 350);
}
document.addEventListener("click", (e) => {
  const rb = e.target.closest(".btn-refresh");
  if (rb) { doRefresh(rb); }
});
// Notification bell — student only; red badge = unread messages + notices.
// Retries because page scripts inject the nav asynchronously (after /api/me).
async function updateNotifBell(retries) {
  if (retries === undefined) retries = 12;
  const bell = document.getElementById("notifbell");
  if (!bell) {
    if (retries > 0) setTimeout(() => updateNotifBell(retries - 1), 300);
    return;
  }
  try {
    const user = await currentUser();
    if (!user || user.role !== "student") { bell.style.display = "none"; const cb0 = document.getElementById("chatbtn"); if (cb0) cb0.style.display = "none"; return; }
    bell.style.display = "";
    const chatBtn = document.getElementById("chatbtn");
    if (chatBtn) chatBtn.style.display = "";
    const u = await api("GET", "/api/my/unread");
    const total = (u.messages || 0) + (u.notices || 0);
    const badge = document.getElementById("bellbadge");
    if (badge) {
      if (total > 0) { badge.textContent = total > 9 ? "9+" : String(total); badge.style.display = ""; }
      else { badge.style.display = "none"; }
    }
    // Chat button dot = unread messages from the teacher only.
    const cbadge = document.getElementById("chatbadge");
    if (cbadge) {
      const mc = u.messages || 0;
      if (mc > 0) { cbadge.textContent = mc > 9 ? "9+" : String(mc); cbadge.style.display = ""; }
      else { cbadge.style.display = "none"; }
    }
  } catch (e) { bell.style.display = "none"; const cb0 = document.getElementById("chatbtn"); if (cb0) cb0.style.display = "none"; }
}
// Teacher bell — red badge = student messages not yet seen (seen tracked on
// this device only; there is no teacher-side mark-read endpoint).
async function updateTeacherBell(retries) {
  if (retries === undefined) retries = 12;
  const bell = document.getElementById("teacherbell");
  if (!bell) {
    if (retries > 0) setTimeout(() => updateTeacherBell(retries - 1), 300);
    return;
  }
  try {
    const user = await currentUser();
    if (!user || user.role !== "teacher") { bell.style.display = "none"; return; }
    bell.style.display = "";
    const d = await api("GET", "/api/teacher/messages");
    const seen = +(localStorage.getItem("lhbs_teacher_seen_msg") || 0);
    const fresh = (d.messages || []).filter(m => m.sender_role === "student" && m.id > seen);
    const badge = document.getElementById("teacherbellbadge");
    if (badge) {
      if (fresh.length > 0) { badge.textContent = fresh.length > 9 ? "9+" : String(fresh.length); badge.style.display = ""; }
      else { badge.style.display = "none"; }
    }
  } catch (e) { bell.style.display = "none"; }
}
function markTeacherMsgsSeen() {
  api("GET", "/api/teacher/messages").then(d => {
    const ids = (d.messages || []).filter(m => m.sender_role === "student").map(m => m.id);
    if (ids.length) localStorage.setItem("lhbs_teacher_seen_msg", String(Math.max(...ids)));
    const b = document.getElementById("teacherbellbadge");
    if (b) b.style.display = "none";
  }).catch(() => {});
}
// Bell dropdown — tap the bell to see messages + notices.
async function toggleBellDrop() {
  const drop = document.getElementById("belldrop");
  if (!drop) return;
  if (drop.style.display !== "none") { drop.style.display = "none"; return; }
  drop.innerHTML = '<div class="bell-loading">Loading…</div>';
  drop.style.display = "";
  try {
    const [m, n] = await Promise.all([
      api("GET", "/api/my/messages").catch(() => ({ messages: [] })),
      api("GET", "/api/notices").catch(() => ({ notices: [] })),
    ]);
    const msgs = (m.messages || []).filter(x => x.sender_role !== "student").slice(0, 5);
    const nts = (n.notices || []).slice(0, 5);
    let h = "";
    if (!msgs.length && !nts.length) h = '<div class="bell-empty">No messages or notices yet.</div>';
    msgs.forEach(x => {
      h += `<div class="bell-item${x.read_at ? "" : " unread"}" data-mid="${x.id}">
        <div class="bell-item-t">💬 ${esc((x.text || "").slice(0, 80))}${(x.text || "").length > 80 ? "…" : ""}</div>
        <div class="bell-item-d">${fmtDateTime(x.created_at)}</div></div>`;
    });
    nts.forEach(x => {
      h += `<div class="bell-item" data-nid="${x.id}">
        <div class="bell-item-t">📢 ${esc(x.title || (x.text || "").slice(0, 60))}</div>
        <div class="bell-item-d">${fmtDateTime(x.created_at)}</div></div>`;
    });
    h += `<a class="bell-all" href="/dashboard.html">See all on dashboard →</a>`;
    drop.innerHTML = h;
  } catch (e) {
    drop.innerHTML = '<div class="bell-empty">Could not load.</div>';
  }
}
document.addEventListener("click", (e) => {
  const chatBtn = e.target.closest("#chatbtn");
  if (chatBtn) { e.preventDefault(); openChat(); return; }
  const tbell = e.target.closest("#teacherbell");
  if (tbell) {
    e.preventDefault();
    if (typeof window.openTeacherMessages === "function" && location.pathname.endsWith("/teacher.html")) { window.openTeacherMessages(); }
    else { location.href = "/teacher.html#messages"; }
    return;
  }
  const bell = e.target.closest("#notifbell");
  const drop = document.getElementById("belldrop");
  if (bell) { e.preventDefault(); toggleBellDrop(); return; }
  const it = e.target.closest(".bell-item");
  if (it && drop) {
    const mid = it.getAttribute("data-mid"), nid = it.getAttribute("data-nid");
    if (mid) api("POST", "/api/my/messages/" + mid + "/read").catch(() => {});
    if (nid) api("POST", "/api/my/notices/" + nid + "/read").catch(() => {});
    drop.style.display = "none";
    location.href = "/dashboard.html";
    return;
  }
  if (drop && drop.style.display !== "none" && !e.target.closest("#belldrop")) {
    drop.style.display = "none";
  }
});
// ── Chat with Teacher (student only) ──
// The 💬 button in the top bar opens the Mail chat: the full thread with
// the teacher + a compose box. Student messages go to the teacher only.
function chatOverlayEl() {
  let ov = document.getElementById("chatoverlay");
  if (ov) return ov;
  ov = document.createElement("div");
  ov.id = "chatoverlay";
  ov.style.cssText = "position:fixed;inset:0;background:rgba(2,20,26,.55);z-index:1000;display:none";
  ov.innerHTML = `<div style="position:absolute;top:0;right:0;bottom:0;width:min(430px,100%);background:#fff;display:flex;flex-direction:column;box-shadow:-8px 0 30px rgba(0,0,0,.25)">
    <div style="background:#0b6e5d;color:#fff;padding:12px 14px;display:flex;align-items:center;gap:10px">
      <button id="chatback" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer">←</button>
      <div><b style="font-size:15px">💬 Teacher</b><div style="font-size:11px;opacity:.85">Only you and your teacher can see this</div></div>
      <div style="flex:1"></div>
      <button id="chatclose" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer">✕</button>
    </div>
    <div id="chatbody" style="flex:1;padding:14px;overflow-y:auto;background:#f4f8f6"></div>
    <div style="display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e3ebe8;background:#fff">
      <input id="chattext" placeholder="Message your teacher..." style="flex:1;border:1.5px solid #cfe0da;border-radius:20px;padding:9px 13px;font-size:14px;min-width:0">
      <button id="chatsend" style="background:#0b6e5d;color:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:16px;cursor:pointer;flex-shrink:0">➤</button>
    </div></div>`;
  document.body.appendChild(ov);
  ov.querySelector("#chatback").onclick = closeChat;
  ov.querySelector("#chatclose").onclick = closeChat;
  ov.onclick = (e) => { if (e.target === ov) closeChat(); };
  ov.querySelector("#chatsend").onclick = sendChatMsg;
  ov.querySelector("#chattext").addEventListener("keydown", (e) => { if (e.key === "Enter") sendChatMsg(); });
  return ov;
}
async function openChat() {
  const ov = chatOverlayEl();
  ov.style.display = "";
  await loadChatThread();
  const inp = document.getElementById("chattext");
  if (inp) inp.focus();
}
function closeChat() {
  const ov = document.getElementById("chatoverlay");
  if (ov) ov.style.display = "none";
  updateNotifBell();
}
async function loadChatThread() {
  const body = document.getElementById("chatbody");
  if (!body) return;
  body.innerHTML = '<p class="muted">Loading…</p>';
  try {
    const d = await api("GET", "/api/my/messages");
    const msgs = (d.messages || []).slice().reverse();
    body.innerHTML = msgs.length ? msgs.map(m => {
      const mine = m.sender_role === "student";
      return `<div style="border-radius:10px;padding:9px 11px;font-size:14px;line-height:1.5;margin-bottom:8px;${mine ? "background:#e3ecf7;margin-left:24px" : "background:#e8f5f1"}">
        <b>${mine ? "You" : "Teacher"}:</b> ${esc(m.text)}<span style="display:block;font-size:11px;color:#8aa39c;margin-top:3px">${fmtDateTime(m.created_at)}</span></div>`;
    }).join("") : `<p class="muted">No messages yet — say hi to your teacher! 💬</p>`;
    body.scrollTop = body.scrollHeight;
    for (const m of (d.messages || []).filter(x => x.sender_role !== "student" && !x.read_at)) {
      try { await api("POST", `/api/my/messages/${m.id}/read`); } catch (e) {}
    }
    updateNotifBell();
  } catch (e) { body.innerHTML = '<p class="muted">Could not load messages.</p>'; }
}
async function sendChatMsg() {
  const inp = document.getElementById("chattext");
  if (!inp || !inp.value.trim()) return;
  const btn = document.getElementById("chatsend");
  btn.disabled = true;
  try {
    await api("POST", "/api/my/message-teacher", { text: inp.value });
    inp.value = "";
    await loadChatThread();
  } catch (e) { alert(e.message); }
  btn.disabled = false;
}
// Floating refresh button on all pages
document.addEventListener("DOMContentLoaded", () => {
  updateNotifBell();
  updateTeacherBell();
  if (!document.querySelector(".fab-refresh")) {
    const fab = document.createElement("button");
    fab.className = "fab-refresh btn-refresh no-print";
    fab.innerHTML = '<span class="ric">🔄</span>';
    fab.title = "Refresh";
    fab.setAttribute("aria-label", "Refresh page");
    document.body.appendChild(fab);
  }
});
// Teacher "🧑‍🎓 Student Login" nav button (delegated — nav is injected by page scripts).
document.addEventListener("click", async (e) => {
  const t = e.target;
  if (t.id === "stulogin") {
    const m = document.getElementById("stuloginmodal");
    const sel = document.getElementById("sl_student");
    if (!sel.options.length) {
      try {
        const d = await api("GET", "/api/teacher/students");
        sel.innerHTML = d.students.map(s => `<option value="${s.id}">${esc(s.display_name)}</option>`).join("");
      } catch (err) { alert(err.message); return; }
    }
    m.style.display = "flex";
  } else if (t.id === "sl_cancel") {
    document.getElementById("stuloginmodal").style.display = "none";
  } else if (t.id === "sl_go") {
    const sid = document.getElementById("sl_student").value;
    try {
      await api("POST", "/api/teacher/impersonate", { student_id: sid });
      location.href = "/dashboard.html";
    } catch (err) { alert(err.message); }
  } else if (t.id === "stuloginmodal") {
    t.style.display = "none";
  }
});
// If the teacher is logged in as a student, show a "back" bar on every page.
(async () => {
  try {
    const d = await api("GET", "/api/me");
    const u = d.user;
    if (u && u.impersonating) {
      const bar = document.createElement("div");
      bar.style.cssText = "position:sticky;top:0;z-index:100;background:#fffbeb;border-bottom:2px solid #f59e0b;padding:8px 12px;text-align:center;font-size:.95rem";
      bar.innerHTML = `👁️ <b>Teacher:</b> you are logged in as <b>${esc(u.display_name)}</b> &nbsp;<button class="btn small" id="backteacher">🔙 Back to Teacher</button>`;
      document.body.prepend(bar);
      document.getElementById("backteacher").onclick = async () => {
        try { await api("POST", "/api/impersonate/exit"); location.href = "/teacher.html"; }
        catch (e) { alert(e.message); }
      };
    }
  } catch (e) { /* not logged in */ }
})();
