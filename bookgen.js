// Auto-generates an exactly 8-page illustrated PDF book from an approved story.
// Format (settled 2026-10-28, Samad's rule): cover + 7 story pages, a picture on
// every page, NO blank "draw your favourite scene" pages, NO separate About /
// Author / End pages (author info is on the cover, "The End" closes page 8).
// The story itself is split across pages 2-8, so a short story still fills 8 pages
// and a long story is never padded with blanks.
// NOTE: the server cannot paint new characters per story. The pictures here are
// the app's generic watercolour set, rotated across the 7 story pages. A
// story-specific picture set (made by Muse, as for "CLEAVER GOAT") replaces the
// auto-book via the teacher book upload, which is how unique art reaches a book.
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

// Split a story into exactly `n` chunks, distributing sentences as evenly as
// possible by character count. If there are fewer sentences than pages, fall
// back to splitting by words so no story page is ever empty.
function splitInto(text, n) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) return Array(n).fill("");
  const sentences = clean.match(/[^.!?]+[.!?]+["')\]]*\s*/g) || [clean];
  const parts = sentences.map(s => s.trim()).filter(Boolean);
  if (parts.length >= n) {
    const total = parts.reduce((a, s) => a + s.length, 0);
    const target = total / n;
    const chunks = [];
    let cur = "";
    for (let i = 0; i < parts.length; i++) {
      const isLastPage = chunks.length === n - 1;
      if (!isLastPage && cur && cur.length + 1 + parts[i].length > target && chunks.length < n - 1) {
        chunks.push(cur.trim());
        cur = parts[i];
      } else {
        cur = cur ? cur + " " + parts[i] : parts[i];
      }
      if (i === parts.length - 1) chunks.push(cur.trim());
    }
    while (chunks.length < n) chunks.push("");
    return chunks.slice(0, n);
  }
  const words = clean.split(" ");
  const per = Math.ceil(words.length / n);
  const chunks = [];
  for (let i = 0; i < n; i++) chunks.push(words.slice(i * per, (i + 1) * per).join(" "));
  return chunks;
}

function generateBookPDF(work, student) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A5", margins: { top: 36, bottom: 24, left: 36, right: 36 } });
      registerFonts(doc);
      const font = fontName(work.language);
      const chunks = [];
      doc.on("data", c => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
      const W = doc.page.width, H = doc.page.height, M = 36;
      const CW = W - M * 2;
      const cx = W / 2;
      const isRTL = work.language === "Arabic" || work.language === "Urdu";
      const align = isRTL ? "right" : "center";
      const footer = (n) => {
        doc.fillColor("#9ca3af").font(font).fontSize(9).text(`Page ${n} of 8`, M, H - 40, { width: CW, align: "center" });
      };

      // Page 1: COVER
      if (art("magic")) doc.image(art("magic"), M, 36, { width: CW, height: 210 });
      doc.fillColor("#b45309").font(font).fontSize(10).text("LITTLE HANDS, BIG STORIES", M, 262, { width: CW, align: "center" });
      doc.fillColor("#1f2937").fontSize(26).text(work.title || "Untitled", M, 282, { width: CW, align: "center" });
      doc.moveDown(0.6);
      doc.fillColor("#4b5563").fontSize(13).text("Written by", { align: "center" });
      doc.fillColor("#111827").fontSize(19).text(student.display_name || "", { align: "center" });
      doc.fillColor("#6b7280").fontSize(12).text("Admission No: " + (student.ad_no || "—"), { align: "center" });
      doc.moveDown(1);
      doc.fillColor("#9ca3af").fontSize(10).text("Noorul Huda Centre for Excellence · S1 — 12th Batch", { align: "center" });
      footer(1);

      // Pages 2-8: story split across 7 pages, picture on every page
      const storyPages = splitInto(work.content, 7);
      const artNames = ["journey", "create", "magic", "ending", "journey", "create", "magic"];
      storyPages.forEach((pg, i) => {
        doc.addPage();
        const pageNo = i + 2;
        const img = art(artNames[i]);
        const imgH = pg.length > 500 ? 175 : 205;
        if (img) doc.image(img, M, 36, { width: CW, height: imgH });
        doc.fillColor("#1f2937").font(font).fontSize(pg.length > 500 ? 12 : 13.5)
          .text(pg, M, 36 + imgH + 18, { width: CW, align: isRTL ? "right" : "justify", lineGap: 5 });
        if (pageNo === 8) {
          doc.moveDown(1);
          doc.fillColor("#b45309").font(font).fontSize(20).text("The End", { align: "center" });
        }
        footer(pageNo);
      });

      doc.end();
    } catch (e) { reject(e); }
  });
}

module.exports = { generateBookPDF, splitInto };
