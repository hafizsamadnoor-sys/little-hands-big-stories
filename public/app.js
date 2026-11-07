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
// Today in IST (same +5:30 shift the server uses) + a TODAY / YESTERDAY /
// TOMORROW tag for a YYYY-MM-DD date, so the teacher and parents can tell
// which checklist day is which when two days are open at once (Samad 2026-11-08).
const istTodayStr = () => new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10);
const dayTagHtml = (iso) => {
  const t = istTodayStr();
  const d = new Date(t + "T00:00:00Z");
  const y = new Date(d); y.setUTCDate(y.getUTCDate() - 1);
  const tm = new Date(d); tm.setUTCDate(tm.getUTCDate() + 1);
  const tag = iso === t ? ["📅 TODAY", "#0b6e5d", "#d9f2e2"]
    : iso === y.toISOString().slice(0, 10) ? ["YESTERDAY", "#555", "#e8eef0"]
    : iso === tm.toISOString().slice(0, 10) ? ["TOMORROW", "#1d4ed8", "#dbeafe"] : null;
  return tag ? `<span style="background:${tag[2]};color:${tag[1]};border-radius:999px;padding:2px 9px;font-weight:700;font-size:.78rem">${tag[0]}</span>` : "";
};
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
    <div class="brand-logo"><img src="/icons/flower-192.png" alt="Little Hands" style="width:100%;height:100%;border-radius:0;object-fit:cover;display:block"></div><div class="brand">Little Hands, Big Stories<div class="inst">Noorul Huda Centre for Excellence</div><small>Leading forward · S1 12th Batch</small></div>
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
    <div class="brand-logo"><img src="/icons/flower-192.png" alt="Little Hands" style="width:100%;height:100%;border-radius:0;object-fit:cover;display:block"></div><div class="brand">Little Hands, Big Stories<div class="inst">Noorul Huda Centre for Excellence</div><small>Leading forward · S1 12th Batch</small></div>
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
// Teacher bell — red badge = things waiting for the teacher: unread student
// messages + pending diary approvals + pending works approvals (2026-11-07).
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
    const [m, hd, pw] = await Promise.allSettled([
      api("GET", "/api/teacher/messages"),
      api("GET", "/api/teacher/holiday-diary"),
      api("GET", "/api/teacher/pending"),
    ]);
    const seen = +(localStorage.getItem("lhbs_teacher_seen_msg") || 0);
    const fresh = m.status === "fulfilled" ? (m.value.messages || []).filter(x => x.sender_role === "student" && x.id > seen).length : 0;
    const diaryPend = hd.status === "fulfilled" ? (hd.value.tasks || []).reduce((a, t) => a + ((t.entries || []).filter(e => e.status === "pending").length), 0) : 0;
    const worksPend = pw.status === "fulfilled" ? (pw.value.works || []).length : 0;
    const total = fresh + diaryPend + worksPend;
    const badge = document.getElementById("teacherbellbadge");
    if (badge) {
      if (total > 0) { badge.textContent = total > 9 ? "9+" : String(total); badge.style.display = ""; }
      else { badge.style.display = "none"; }
    }
    // Keep the Messages tile's red dot in sync with the bell: it clears
    // when the teacher opens a boy's chat thread (markTeacherMsgsSeen).
    const mdot = document.getElementById("dot-messages");
    if (mdot) mdot.hidden = !(fresh > 0);
  } catch (e) { bell.style.display = "none"; }
}
function markTeacherMsgsSeen() {
  api("GET", "/api/teacher/messages").then(d => {
    const ids = (d.messages || []).filter(m => m.sender_role === "student").map(m => m.id);
    if (ids.length) localStorage.setItem("lhbs_teacher_seen_msg", String(Math.max(...ids)));
    updateTeacherBell(); // recompute — diary/works pendings still show
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
    <div style="display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e3ebe8;background:#fff;align-items:center">
      <input id="chattext" placeholder="Message your teacher..." style="flex:1;border:1.5px solid #cfe0da;border-radius:20px;padding:9px 13px;font-size:14px;min-width:0">
      <input type="file" id="chatphoto" accept="image/*" style="display:none">
      <button id="chatphotobtn" title="Send a photo" style="background:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:17px;cursor:pointer;flex-shrink:0">📷</button>
      <button id="chatvoicebtn" title="Voice message" style="background:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:17px;cursor:pointer;flex-shrink:0">🎤</button>
      <button id="chatsend" style="background:#0b6e5d;color:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:16px;cursor:pointer;flex-shrink:0">➤</button>
    </div></div>`;
  document.body.appendChild(ov);
  ov.querySelector("#chatback").onclick = closeChat;
  ov.querySelector("#chatclose").onclick = closeChat;
  ov.onclick = (e) => { if (e.target === ov) closeChat(); };
  ov.querySelector("#chatsend").onclick = sendChatMsg;
  ov.querySelector("#chattext").addEventListener("keydown", (e) => { if (e.key === "Enter") sendChatMsg(); });
  ov.querySelector("#chatphotobtn").onclick = () => document.getElementById("chatphoto").click();
  ov.querySelector("#chatphoto").addEventListener("change", async (e) => {
    const f = e.target.files[0]; e.target.value = "";
    if (!f) return;
    try {
      const c = await compressPhoto(f);
      await postChatMedia(c.data, c.type);
      await loadChatThread();
    } catch (err) { alert(err.message); }
  });
  ov.querySelector("#chatvoicebtn").onclick = (e) => {
    voiceNoteToggle(e.currentTarget, async (url, err) => {
      if (err) { alert(err); return; }
      if (!url) return;
      try {
        await api("POST", "/api/my/message-teacher", { text: "", media_data: url, media_type: "audio" });
        await loadChatThread();
      } catch (e2) { alert(e2.message); }
    });
  };
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
      const label = m.text ? `<b>${mine ? "You" : "Teacher"}:</b> ${esc(m.text)}` : "";
      return `<div style="border-radius:10px;padding:9px 11px;font-size:14px;line-height:1.5;margin-bottom:8px;${mine ? "background:#e3ecf7;margin-left:24px" : "background:#e8f5f1"}">
        ${label}${msgMediaHtml(m)}<span style="display:block;font-size:11px;color:#8aa39c;margin-top:3px">${fmtDateTime(m.created_at)}</span></div>`;
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
// Send a photo message. If the 30-second anti-spam blocks the 2nd photo in
// a row (a boy sends the closed-letter photo, then the giving photo), wait
// it out and retry once automatically instead of making him tap again.
async function postChatMedia(data, type) {
  try {
    return await api("POST", "/api/my/message-teacher", { text: "", media_data: data, media_type: type });
  } catch (e) {
    if (/wait a few seconds/i.test(e.message || "")) {
      toast("First photo sent — sending the next one in a few seconds…");
      await new Promise(r => setTimeout(r, 31000));
      return await api("POST", "/api/my/message-teacher", { text: "", media_data: data, media_type: type });
    }
    throw e;
  }
}
// Compress a photo client-side (max 1280px, JPEG) → {data, type}
function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const max = 1280;
        let w = img.width, h = img.height;
        if (w > max || h > max) { const r = max / Math.max(w, h); w = Math.round(w * r); h = Math.round(h * r); }
        const c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve({ data: c.toDataURL("image/jpeg", 0.82), type: "image" });
      } catch (e) {
        reject(new Error("That photo is too big to send. Please take a new photo and try again."));
        return;
      }
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Could not read that photo. Please take a new photo with the camera and try again."));
    img.src = URL.createObjectURL(file);
  });
}
// Render a message's photo / voice note (WhatsApp-style chat bubbles).
function msgMediaHtml(m) {
  if (m.media_data && m.media_type === "image") return `<img src="${m.media_data}" style="max-width:100%;border-radius:8px;margin:4px 0;display:block">`;
  if (m.media_data && m.media_type === "audio") return `<audio controls preload="metadata" src="${m.media_data}" style="width:100%;max-width:230px;height:36px;display:block;margin:4px 0"></audio>`;
  return "";
}
// Writer of the Week card (shared by the student / parent pages).
// writer: {display_name, photo, work_title, work_type, note, created_at};
// history: earlier picks [{display_name, work_title, created_at}].
window.wowWeekLabel = function (iso) {
  if (!iso) return "";
  const d = new Date(iso.slice(0, 10) + "T00:00:00Z");
  if (isNaN(d)) return "";
  const day = (d.getUTCDay() + 6) % 7; // Monday = 0
  const mon = new Date(d); mon.setUTCDate(d.getUTCDate() - day);
  const sun = new Date(mon); sun.setUTCDate(mon.getUTCDate() + 6);
  const f = x => x.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return `${f(mon)} – ${f(sun)}`;
};
window.wowCardHtml = function (writer, history, next) {
  if (!writer)
    return `<p class="muted">No Writer of the Week picked yet — the teacher will pick one soon. 🌟</p>` + window.nextUpWowHtml(next);
  const workBit = writer.work_title
    ? `for <b>“${esc(writer.work_title)}”</b>${writer.work_type ? " — " + esc(writer.work_type) : ""}`
    : "";
  const past = (history || []).map(h => {
    const d = h.created_at ? new Date(h.created_at + "Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
    return `<div class="wow-past"><div class="wow-av">🌟</div><div><b>${esc(h.display_name)}</b><span>${h.work_title ? "“" + esc(h.work_title) + "” · " : ""}${d}</span></div></div>`;
  }).join("");
  return `<div class="wow-card">
    <div class="wow-medal">🌟</div>
    <div class="wow-week">Writer of the Week · ${esc(window.wowWeekLabel(writer.created_at))}</div>
    <div class="wow-name">${esc(writer.display_name)}</div>
    ${workBit ? `<div class="wow-work">${workBit}</div>` : ""}
    ${writer.note ? `<div class="wow-note">“${esc(writer.note)}”<br><span>— Teacher</span></div>` : ""}
    <div style="margin-top:10px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <a class="btn small gold" href="/wow-cert.html" target="_blank">📜 View Certificate</a>
      ${writer.work_id ? `<a class="btn small ghost" href="/work.html?id=${writer.work_id}">📕 Read the ${esc(writer.work_type || "work")}</a>` : ""}
    </div>
  </div>${window.nextUpWowHtml(next)}${past ? `<h3 style="margin:14px 0 4px">🕰️ Past writers</h3>${past}` : ""}`;
};
// "Next in Line" under the Writer of the Week — the 3 boys right behind
// him on the Points Board. next: rows from /api/next-up (wow_next).
window.nextUpWowHtml = function (next) {
  if (!next || !next.length) return "";
  return `<h3 style="margin:14px 0 4px">🥈 Next in Line</h3>` + next.map((n, i) =>
    `<div class="next-row"><div class="next-rank">${i + 1}</div><div class="next-nm"><b>${esc(n.display_name)}</b><span>${n.works} work${n.works === 1 ? "" : "s"} · ${n.stars} star${n.stars === 1 ? "" : "s"}</span></div><div class="next-pts">${n.points} pts</div></div>`).join("");
};
// champions: [{display_name, ad_no, completed_at, exam_passed, cert_issued}].
// showAd: the teacher sees Ad numbers; students and parents see names only.
// "Your Approved Works" card (shared by the student dashboard + parent page).
// works: rows from /api/my/works or /api/parent/works — already own-child
// only. Shows the latest 5 approved works, newest approval first; the newest
// approval (within 7 days) gets a 🎉 NEW badge. opts: {seeAll, writeLink,
// emptyHint}.
window.myWorksCardHtml = function (works, opts) {
  opts = opts || {};
  const approved = ((works || []).filter(w => w.status === "approved")).slice()
    .sort((a, b) => String(b.reviewed_at || b.created_at || "").localeCompare(String(a.reviewed_at || a.created_at || "")));
  if (!approved.length)
    return `<p class="muted">${esc(opts.emptyHint || "No approved works yet — write your first story, and when your teacher approves it, it will appear here with its stars and points.")}</p>${opts.writeLink ? `<a class="btn" href="/write.html" style="display:block;text-align:center">✍️ Write now</a>` : ""}`;
  const stars = approved.reduce((a, w) => a + (w.stars || 0), 0);
  const points = approved.reduce((a, w) => a + (w.points_awarded || 0), 0);
  const typeIcon = { story: "📖", poem: "📝", diary: "📔", letter: "✉️", manifesto: "📜", anything: "✨", review: "⭐" };
  const fmtDate = iso => {
    if (!iso) return "";
    const d = new Date(iso + "Z");
    return isNaN(d) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };
  const rows = approved.slice(0, 5).map((w, i) => {
    const isNew = i === 0 && w.reviewed_at && (Date.now() - new Date(w.reviewed_at + "Z").getTime()) < 7 * 86400000;
    const typeLabel = w.type ? w.type.charAt(0).toUpperCase() + w.type.slice(1) : "Work";
    const s = w.stars || 0;
    return `<div class="work-row"><div class="work-ic">${typeIcon[w.type] || "📖"}</div><div class="work-main"><b>${esc(w.title)}</b>${isNew ? `<span class="new-badge">🎉 NEW</span>` : ""}<span>${typeLabel} · Approved ${fmtDate(w.reviewed_at || w.created_at)}</span><span class="stars">${"★".repeat(s)}${"☆".repeat(Math.max(0, 5 - s))}</span><span>${w.points_awarded || 0} points${w.book_id ? " · 📖 Book ready!" : ""}</span><div class="work-links"><a class="btn small" href="/work.html?id=${w.id}">📕 Read</a>${w.book_id ? `<a class="btn small ghost" href="/api/books/${w.book_id}/file" target="_blank">📖 Read as Book</a>` : ""}</div></div></div>`;
  }).join("");
  return `<p class="muted">${approved.length} approved ${approved.length === 1 ? "work" : "works"} · ${stars} stars · ${points} points</p>${rows}${opts.seeAll ? `<a class="btn ghost" href="${opts.seeAll}" style="display:block;text-align:center">See all my works →</a>` : ""}`;
};

window.championsListHtml = function (champions, showAd, next) {
  const nextHtml = window.nextUpChampHtml(next);
  if (!champions || !champions.length)
    return `<p class="muted">No boy has completed 100% yet — the first champions will appear here. 🎓</p>` + nextHtml;
  return champions.map(c => {
    const d = c.completed_at ? new Date(c.completed_at + "Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
    return `<div class="champ-row"><div class="champ-medal">🏅</div><div class="champ-nm"><b>${esc(c.display_name)}</b><span>${showAd && c.ad_no ? "Ad " + esc(c.ad_no) + " · " : ""}Completed ${d || "—"}</span></div><div class="champ-pills"><span class="champ-pill ${c.exam_passed ? "ok" : "wait"}">${c.exam_passed ? "✓ Exam" : "⏳ Exam"}</span><span class="champ-pill ${c.cert_issued ? "ok" : "wait"}">${c.cert_issued ? "✓ Cert" : "⏳ Cert"}</span></div></div>`;
  }).join("") + nextHtml;
};
// "Next 5 — Almost There!" under the Champions — the 5 boys closest to
// completing all Learning Tasks. next: rows from /api/next-up
// (completion_next: {display_name, done, total, pct}).
window.nextUpChampHtml = function (next) {
  if (!next || !next.length) return "";
  return `<h3 style="margin:14px 0 4px">⏳ Next 5 — Almost There!</h3>` + next.map((n, i) =>
    `<div class="next-row"><div class="next-rank green">${i + 1}</div><div class="next-nm"><b>${esc(n.display_name)}</b><div class="next-bar"><i style="width:${n.pct}%"></i></div></div><div class="next-pts">${n.done} / ${n.total}</div></div>`).join("");
};
// Voice notes: tap 🎤 to start recording, tap ⏹ to stop and send. Max 60 seconds
// (keeps the recording under the 1.5MB message size limit).
let __voice = null; // {rec, btn, onDone, timer}
async function voiceNoteToggle(btn, onDone) {
  if (__voice) { // stop now and send
    const v = __voice; __voice = null;
    clearTimeout(v.timer);
    v.btn.textContent = "🎤"; v.btn.classList.remove("rec");
    if (v.rec.state !== "inactive") v.rec.stop();
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === "undefined") {
    onDone(null, "Voice messages are not supported on this device.");
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    const chunks = [];
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
      if (!blob.size) return onDone(null, "No audio recorded — try again.");
      const rd = new FileReader();
      rd.onload = () => {
        const url = String(rd.result);
        if (url.length > 1500000) onDone(null, "Voice note is too long — please keep it under a minute.");
        else onDone(url);
      };
      rd.onerror = () => onDone(null, "Could not read the recording.");
      rd.readAsDataURL(blob);
    };
    rec.start();
    __voice = { rec, btn, timer: setTimeout(() => voiceNoteToggle(btn, onDone), 60000) };
    btn.textContent = "⏹"; btn.classList.add("rec");
  } catch (e) { onDone(null, "Microphone is not available. Please allow microphone access and try again."); }
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
