// Auto-generates an 8+ page illustrated PDF book from an approved story.
// Used by server.js when the teacher approves a work.
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const ART = path.join(__dirname, "public", "book-art");
const FONTS = path.join(__dirname, "public", "fonts");

const FONT_FOR = {
  Malayalam: "NotoSansMalayalam-Regular.ttf",
  Arabic: "NotoNaskhArabic-Regular.ttf",
  Urdu: "NotoNaskhArabic-Regular.ttf", // Naskh renders Urdu correctly
  Kannada: "NotoSansKannada-Regular.ttf",
  English: "NotoSans-Regular.ttf",
};

function registerFonts(doc) {
  for (const f of Object.values(FONT_FOR)) {
    const p = path.join(FONTS, f);
    if (fs.existsSync(p)) {
      const name = f.replace("-Regular.ttf", "");
      try { doc.registerFont(name, p); } catch (e) { /* skip */ }
    }
  }
}
function fontName(lang) {
  const f = FONT_FOR[lang] || FONT_FOR.English;
  const p = path.join(FONTS, f);
  return fs.existsSync(p) ? f.replace("-Regular.ttf", "") : "Helvetica";
}
function art(name) {
  const p = path.join(ART, name + ".jpg");
  return fs.existsSync(p) ? p : null;
}

// Split text into chunks that fit nicely on pages.
function paginate(text, maxChars) {
  const paras = String(text || "").split(/\n+/).map(s => s.trim()).filter(Boolean);
  const pages = [];
  let cur = "";
  for (const pa of paras) {
    if ((cur + "\n\n" + pa).length > maxChars && cur) { pages.push(cur.trim()); cur = pa; }
    else cur = cur ? cur + "\n\n" + pa : pa;
  }
  if (cur.trim()) pages.push(cur.trim());
  return pages.length ? pages : [""];
}

function generateBookPDF(work, student) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A5", margins: { top: 48, bottom: 48, left: 48, right: 48 } });
      registerFonts(doc);
      const font = fontName(work.language);
      const chunks = [];
      doc.on("data", c => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const W = doc.page.width, H = doc.page.height, M = 48;
      const cx = W / 2;
      const isRTL = work.language === "Arabic" || work.language === "Urdu";
      const align = isRTL ? "right" : "center";

      const deco = (y, color) => {
        doc.save().strokeColor(color).lineWidth(2);
        doc.moveTo(M, y).lineTo(W - M, y).stroke().restore();
      };

      // ── Page 1: COVER ──────────────────────────────────
      if (art("magic")) doc.image(art("magic"), M, 70, { width: W - M * 2, height: 190 });
      doc.fillColor("#b45309").font(font).fontSize(11).text("LITTLE HANDS, BIG STORIES", cx - 200, 285, { width: 400, align: "center" });
      deco(308, "#f59e0b");
      doc.fillColor("#1f2937").fontSize(26).text(work.title || "Untitled", M, 322, { width: W - M * 2, align: "center" });
      doc.moveDown(1.2);
      doc.fillColor("#4b5563").fontSize(14).text("Written by", { align: "center" });
      doc.fillColor("#111827").fontSize(20).text(student.display_name || "", { align: "center" });
      doc.fillColor("#6b7280").fontSize(12).text("Admission No: " + (student.ad_no || "—"), { align: "center" });
      doc.moveDown(2);
      doc.fillColor("#9ca3af").fontSize(10).text("Noorul Huda Islamic Academy · S1 — 12th Batch", { align: "center" });

      // ── Page 2: about this story ────────────────────────
      doc.addPage();
      doc.fillColor("#b45309").fontSize(18).text("About This Story", { align });
      deco(doc.y + 8, "#fcd34d"); doc.moveDown(1.5);
      const info = [
        ["Title", work.title || "Untitled"],
        ["Written by", student.display_name || ""],
        ["Admission No", student.ad_no || "—"],
        ["Type", work.type || ""],
        ["Language", work.language || ""],
      ];
      doc.fillColor("#374151").fontSize(13);
      for (const [k, v] of info) {
        doc.fillColor("#92400e").text(k + ": ", { continued: true, align: isRTL ? "right" : "left" });
        doc.fillColor("#1f2937").text(String(v), { align: isRTL ? "right" : "left" });
        doc.moveDown(0.5);
      }
      if (art("journey")) { doc.moveDown(1); doc.image(art("journey"), M, doc.y, { width: W - M * 2, height: 170 }); }

      // ── Pages 3+: story text ───────────────────────────
      const storyPages = paginate(work.content, 900);
      const artNames = ["create", "journey", "magic"];
      let artIdx = 0;
      storyPages.forEach((pg, i) => {
        doc.addPage();
        doc.fillColor("#b45309").fontSize(13).text("Page " + (i + 1), { align });
        doc.moveDown(0.6);
        doc.fillColor("#1f2937").fontSize(14).text(pg, { align: isRTL ? "right" : "justify", lineGap: 6 });
        // illustration every other story page
        if (i % 2 === 1 && art(artNames[artIdx % artNames.length])) {
          doc.moveDown(1);
          const img = art(artNames[artIdx % artNames.length]); artIdx++;
          const maxY = H - M - 130;
          if (doc.y < maxY) doc.image(img, M, doc.y, { width: W - M * 2, height: 120 });
        }
      });

      // ── About the Author ───────────────────────────────
      doc.addPage();
      doc.fillColor("#b45309").fontSize(18).text("About the Author", { align });
      deco(doc.y + 8, "#fcd34d"); doc.moveDown(1.5);
      doc.fillColor("#111827").fontSize(20).text(student.display_name || "", { align });
      doc.moveDown(0.5);
      doc.fillColor("#4b5563").fontSize(13).text("Admission No: " + (student.ad_no || "—"), { align });
      if (student.bio) { doc.moveDown(0.8); doc.fillColor("#374151").fontSize(13).text(student.bio, { align: isRTL ? "right" : "left" }); }
      doc.moveDown(1.2);
      doc.fillColor("#6b7280").fontSize(12).text("A young author of Little Hands, Big Stories — Noorul Huda Islamic Academy, S1, 12th Batch.", { align });

      // ── The End ────────────────────────────────────────
      doc.addPage();
      if (art("ending")) doc.image(art("ending"), M, 90, { width: W - M * 2, height: 200 });
      doc.fillColor("#b45309").fontSize(28).text("The End", M, 320, { width: W - M * 2, align: "center" });
      doc.moveDown(1);
      doc.fillColor("#6b7280").fontSize(11).text("Thank you for reading!", { align: "center" });

      // ── Pad to minimum 8 pages ─────────────────────────
      // (cover=1, about-story=1, story>=1, author=1, end=1 → pad if fewer than 8)
      let pageCount = 4 + storyPages.length; // cover, about-story, author, end + story pages
      while (pageCount < 8) {
        doc.addPage();
        doc.fillColor("#fcd34d").fontSize(16).text("✦ ✦ ✦", { align: "center" });
        doc.moveDown(2);
        doc.fillColor("#6b7280").fontSize(12).text("Draw your favourite scene from this story here!", M, doc.y, { width: W - M * 2, align: "center" });
        doc.rect(M, doc.y + 20, W - M * 2, 260).stroke("#fcd34d");
        pageCount++;
      }

      doc.end();
    } catch (e) { reject(e); }
  });
}

module.exports = { generateBookPDF };
