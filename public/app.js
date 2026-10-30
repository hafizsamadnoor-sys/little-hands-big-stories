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
const avatar = (name, photo) =>
  photo ? `<img src="${esc(photo)}" alt="">` : esc((name || "?").trim()[0] || "?");

async function currentUser() {
  try { const d = await api("GET", "/api/me"); return d.user; }
  catch (e) { return null; }
}
async function guard(role) {
  const user = await currentUser();
  if (!user) { location.href = "/index.html"; return null; }
  if (role && user.role !== role) {
    location.href = user.role === "teacher" ? "/teacher.html" : user.role === "guest" ? "/guest.html" : user.role === "parent" ? "/parent.html" : "/dashboard.html";
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
// Floating refresh button on all pages
document.addEventListener("DOMContentLoaded", () => {
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
