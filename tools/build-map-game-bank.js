// ─────────────────────────────────────────────────────────────
// Build the expanded Map Study question bank (concept-based 100%).
// Run:  node tools/build-map-game-bank.js
// Reads the current map-game-data.js, KEEPS the original 80 questions
// verbatim (adding only `typed` / `accept` for Round 2), generates the
// rest of the pool from the verified fact lists below (all facts come
// from SIBAQ26_Bidaya_Map_Study_Full_Pack.pdf + Tasks 1-2), validates
// every question, and writes the new map-game-data.js.
// Deterministic: same seed -> same file, so the bank is auditable.
// ─────────────────────────────────────────────────────────────
"use strict";
const fs = require("fs");
const path = require("path");
// ORIGINAL 80 questions live in map-game-data.v1-80q.js (kept untouched).
// The generator ALWAYS reads the originals from there — never from
// map-game-data.js, which is the generated output.
const OLD = require("../map-game-data.v1-80q.js");

const OUT = path.join(__dirname, "..", "map-game-data.js");

// Seeded RNG (mulberry32) — deterministic option shuffling.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20261112);
function shuffle(arr, r) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickN(pool, answer, n, r) {
  const c = shuffle(pool.filter((x) => x !== answer), r);
  if (c.length < n) throw new Error("Not enough distractors for " + answer + " in pool of " + pool.length);
  return c.slice(0, n);
}
// Typed (Round 2) canonical answer: strip footnotes like " *".
function cleanTyped(a) { return String(a).replace(/\s*\*\s*$/, "").trim(); }
// Server-side normalisation lives in server.js (mapGameNorm); the alias
// table below is keyed by the NORMALISED typed answer.
const ACCEPT_ALIASES = {
  "washington dc": ["washington"],
  "dem rep of congo": ["democratic republic of congo", "congo", "drc"],
  "united states": ["usa", "us", "america"],
  "united kingdom": ["uk", "britain"],
  "east into the bay of bengal": ["east"],
  "a triangle pointing down": ["triangle", "triangle pointing down"],
  "europe and asia": ["europe asia"],
  "0 degrees": ["0", "zero degrees"],
  "east west": ["east-west"],
  "north south": ["north-south"],
  "srinagar": ["jammu"],
  "8849 m": ["8849"],
  "8586 m": ["8586"],
  "6650 km": ["6650"],
  "the himalayas": ["himalayas"],
  "the andes": ["andes"],
  "its title and key legend": ["title and key", "the title and key"],
  "the directions": ["directions"],
  "the compass rose shows the directions": ["compass rose", "directions"],
};

const normKey = (s) => String(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");

// ── Verified data lists (all from the Full Pack / Tasks 1-2) ──
const CONTINENT_OF = {
  "United Kingdom": "Europe", "France": "Europe", "Germany": "Europe", "Italy": "Europe",
  "Spain": "Europe", "Portugal": "Europe", "Norway": "Europe", "Sweden": "Europe",
  "Greece": "Europe", "Ukraine": "Europe",
  "Egypt": "Africa", "South Africa": "Africa", "Nigeria": "Africa", "Kenya": "Africa",
  "Ethiopia": "Africa", "Algeria": "Africa", "Morocco": "Africa",
  "Dem. Rep. of Congo": "Africa", "Ghana": "Africa", "Tanzania": "Africa",
  "India": "Asia", "China": "Asia", "Japan": "Asia", "Russia": "Europe and Asia",
  "Pakistan": "Asia", "Bangladesh": "Asia", "Nepal": "Asia", "Saudi Arabia": "Asia",
  "Indonesia": "Asia", "South Korea": "Asia",
  "United States": "North America", "Canada": "North America", "Mexico": "North America",
  "Cuba": "North America", "Jamaica": "North America",
  "Brazil": "South America", "Argentina": "South America", "Chile": "South America",
  "Peru": "South America", "Colombia": "South America", "Venezuela": "South America",
  "Ecuador": "South America",
  "Australia": "Oceania", "New Zealand": "Oceania", "Papua New Guinea": "Oceania",
  "UAE": "Asia", "Qatar": "Asia", "Kuwait": "Asia", "Oman": "Asia", "Yemen": "Asia",
  "Jordan": "Asia", "Lebanon": "Asia", "Syria": "Asia", "Iraq": "Asia", "Iran": "Asia",
  "Turkey": "Asia", "Afghanistan": "Asia", "Bhutan": "Asia", "Myanmar": "Asia",
  "Sri Lanka": "Asia", "Maldives": "Asia", "Thailand": "Asia", "Malaysia": "Asia",
  "Singapore": "Asia", "Vietnam": "Asia",
};
const CAPITALS = OLD.MAP_GAME_ALL_CAPITALS.map(([c, cap]) => ({ country: c, capital: cleanTyped(cap) }));
if (CAPITALS.length !== 65) throw new Error("Expected 65 capitals, got " + CAPITALS.length);
const CAP_BY_CONTINENT = {};
for (const { country, capital } of CAPITALS) {
  const cont = CONTINENT_OF[country];
  (CAP_BY_CONTINENT[cont] = CAP_BY_CONTINENT[cont] || []).push(capital);
}
const COUNTRY_BY_CONTINENT = {};
for (const { country } of CAPITALS) {
  const cont = CONTINENT_OF[country];
  (COUNTRY_BY_CONTINENT[cont] = COUNTRY_BY_CONTINENT[cont] || []).push(country);
}
// Short map notes (pack-based) for the most-asked countries; the rest
// get a plain "In {continent}." note — always true, never invented.
const COUNTRY_NOTE = {
  "India": "In South Asia — the triangle pointing down into the Indian Ocean.",
  "Pakistan": "In South Asia, west of India.",
  "Bangladesh": "In South Asia, east of India.",
  "Nepal": "North of India, in the Himalayas — Mount Everest is here.",
  "Sri Lanka": "A small teardrop island just below India, in the Indian Ocean.",
  "China": "The big country north-east of India, across the Himalayas.",
  "Japan": "Islands to the east of China, in the Pacific Ocean.",
  "Saudi Arabia": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf.",
  "Egypt": "In north-east Africa, on the river Nile.",
  "Turkey": "Between Europe and Asia, north of Syria and Iraq.",
  "Russia": "The biggest country — across the north of Europe and Asia.",
  "Indonesia": "Many islands south-east of Asia, above Australia.",
  "Australia": "The island continent, south-east of Asia.",
  "Brazil": "The biggest country in South America.",
  "Canada": "North of the USA — the second-largest country in the world.",
  "United Kingdom": "Islands north-west of Europe — England, Scotland and Wales.",
  "France": "In western Europe, next to the United Kingdom and Germany.",
  "Iran": "In the Middle East, east of Iraq.",
  "Iraq": "In Iraq, in the Middle East, east of Syria.",
  "Myanmar": "In South-East Asia, east of India and Bangladesh.",
  "Thailand": "In South-East Asia, east of Myanmar.",
  "Malaysia": "In South-East Asia, south of Thailand.",
  "Afghanistan": "In South Asia, north-west of Pakistan.",
  "Bhutan": "In South Asia, in the Himalayas, east of Nepal.",
  "Maldives": "Small islands in the Indian Ocean, south-west of India.",
  "UAE": "On the Arabian Peninsula, next to Saudi Arabia and Oman.",
  "Kenya": "In East Africa, on the Indian Ocean.",
  "South Africa": "At the southern tip of Africa.",
  "Mexico": "South of the USA, in North America.",
  "Argentina": "In South America, south of Brazil.",
  "Chile": "A long thin country on the west coast of South America.",
  "New Zealand": "Islands south-east of Australia, in the Pacific Ocean.",
};

// States + UTs: [name, capital, region]. Regions follow the pack:
// North / South / East / West / Central / North-East India.
const STATES = [
  ["Himachal Pradesh", "Shimla", "North India"], ["Uttarakhand", "Dehradun", "North India"],
  ["Haryana", "Chandigarh", "North India"], ["Punjab", "Chandigarh", "North India"],
  ["Uttar Pradesh", "Lucknow", "North India"], ["Rajasthan", "Jaipur", "North India"],
  ["Kerala", "Thiruvananthapuram", "South India"], ["Tamil Nadu", "Chennai", "South India"],
  ["Karnataka", "Bengaluru", "South India"], ["Andhra Pradesh", "Amaravati", "South India"],
  ["Telangana", "Hyderabad", "South India"],
  ["West Bengal", "Kolkata", "East India"], ["Bihar", "Patna", "East India"],
  ["Jharkhand", "Ranchi", "East India"], ["Odisha", "Bhubaneswar", "East India"],
  ["Gujarat", "Gandhinagar", "West India"], ["Maharashtra", "Mumbai", "West India"],
  ["Goa", "Panaji", "West India"],
  ["Madhya Pradesh", "Bhopal", "Central India"], ["Chhattisgarh", "Raipur", "Central India"],
  ["Assam", "Dispur", "North-East India"], ["Arunachal Pradesh", "Itanagar", "North-East India"],
  ["Manipur", "Imphal", "North-East India"], ["Meghalaya", "Shillong", "North-East India"],
  ["Mizoram", "Aizawl", "North-East India"], ["Nagaland", "Kohima", "North-East India"],
  ["Tripura", "Agartala", "North-East India"], ["Sikkim", "Gangtok", "North-East India"],
  ["Andaman and Nicobar Islands", "Port Blair", "East India"],
  ["Chandigarh", "Chandigarh", "North India"],
  ["Dadra and Nagar Haveli and Daman and Diu", "Daman", "West India"],
  ["Delhi", "New Delhi", "North India"],
  ["Jammu and Kashmir", "Srinagar", "North India"],
  ["Ladakh", "Leh", "North India"],
  ["Lakshadweep", "Kavaratti", "South India"],
  ["Puducherry", "Puducherry", "South India"],
].map(([name, capital, region]) => ({ name, capital, region, isUT: [
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"].includes(name) }));
if (STATES.length !== 36) throw new Error("Expected 36 states+UTs, got " + STATES.length);
const STATE_NOTE = {
  "Kerala": "On the south-west coast of India, on the Arabian Sea.",
  "Tamil Nadu": "On the south-east coast of India, next to Kerala.",
  "Karnataka": "In South India, above Kerala, on the west coast.",
  "Rajasthan": "In the west of India, next to Pakistan — the Thar Desert is here.",
  "West Bengal": "In the east of India, on the Bay of Bengal.",
  "Maharashtra": "On the west coast of India, below Gujarat.",
  "Assam": "In the north-east — the state that joins the 7 sisters to the rest of India.",
  "Sikkim": "A small state in the north-east, near Nepal — Kanchenjunga is here.",
  "Madhya Pradesh": "In the very centre of India — the 'Heart of India'.",
  "Gujarat": "In the west of India, on the Arabian Sea, north of Maharashtra.",
  "Uttar Pradesh": "In the north of India — the most populous state.",
  "Bihar": "In the east of India, next to West Bengal and Uttar Pradesh.",
  "Odisha": "On the east coast of India, on the Bay of Bengal.",
  "Goa": "A small state on the west coast, below Maharashtra.",
  "Ladakh": "In the far north, in the Himalayas.",
  "Kanyakumari": "The very bottom tip of India, in Tamil Nadu.",
};
const REGIONS = ["North India", "South India", "East India", "West India", "Central India", "North-East India"];

// Asia groups from the pack (34 countries).
const ASIA_GROUPS = {
  "South Asia": ["India", "Pakistan", "Bangladesh", "Nepal", "Bhutan", "Sri Lanka", "Myanmar", "Maldives", "Afghanistan"],
  "Middle East (West Asia)": ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Oman", "Yemen", "Jordan", "Lebanon", "Syria", "Iraq", "Iran", "Turkey", "Israel", "Palestine"],
  "East & South-East Asia": ["China", "Japan", "South Korea", "North Korea", "Mongolia", "Thailand", "Vietnam", "Malaysia", "Singapore", "Indonesia", "Philippines"],
};
const ASIA_REGION_OF = {};
for (const [g, list] of Object.entries(ASIA_GROUPS)) for (const c of list) ASIA_REGION_OF[c] = g;

// ── Question builder ──
function mkQ(key, level, q, answer, distractors, point, extra = {}) {
  const options = shuffle([answer, ...distractors], rng);
  if (new Set(options).size !== 4) throw new Error("Bad options for " + key + ": " + JSON.stringify(options));
  if (!options.includes(answer)) throw new Error("Answer not in options for " + key);
  const typed = cleanTyped(answer);
  const accept = ACCEPT_ALIASES[normKey(typed)] || undefined;
  const out = { key, level, q, options, answer, point, typed };
  if (accept) out.accept = accept;
  if (extra.hint) out.hint = extra.hint;
  if (extra.map) out.map = extra.map;
  return out;
}
function capMap(country) {
  const where = CONTINENT_OF[country];
  return { kind: "world", place: country, where, note: COUNTRY_NOTE[country] || `In ${where}.` };
}
function stateMap(st) {
  return { kind: "india", place: st.name, where: st.region, note: STATE_NOTE[st.name] || `In ${st.region}.` };
}
// Level rules for generated questions.
const CAP_EASY = new Set(["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Saudi Arabia", "UAE", "China", "Japan", "United States", "United Kingdom", "France", "Egypt", "Indonesia", "Malaysia"]);
const CAP_HARD = new Set(["Papua New Guinea", "Tanzania", "Dem. Rep. of Congo", "Jamaica", "Ecuador", "Ghana", "Kenya", "Ethiopia", "Morocco", "Algeria", "Nigeria", "Vietnam", "Myanmar", "Bhutan", "Maldives", "Cuba", "Ukraine", "Norway", "Sweden", "Portugal", "Greece", "Chile", "Peru", "Colombia", "Venezuela", "Qatar", "Kuwait", "Oman", "Yemen", "Jordan", "Lebanon", "Syria", "Afghanistan"]);
const capLevel = (country, reverse) => {
  const base = CAP_EASY.has(country) ? "easy" : CAP_HARD.has(country) ? "hard" : "medium";
  if (!reverse) return base;
  return base === "easy" ? "medium" : "hard"; // capital -> country is the harder direction
};
const STATE_EASY = new Set(["Kerala", "Tamil Nadu", "Karnataka", "Maharashtra", "Rajasthan", "Uttar Pradesh", "West Bengal", "Gujarat", "Delhi"]);
const STATE_HARD = new Set(["Arunachal Pradesh", "Mizoram", "Nagaland", "Tripura", "Lakshadweep", "Dadra and Nagar Haveli and Daman and Diu", "Andaman and Nicobar Islands", "Meghalaya", "Manipur"]);
const stateLevel = (st, reverse) => {
  const base = STATE_EASY.has(st.name) ? "easy" : STATE_HARD.has(st.name) ? "hard" : "medium";
  if (!reverse) return base;
  return base === "easy" ? "medium" : "hard";
};

// Original questions, kept verbatim, plus typed/accept for Round 2.
// factKey lets the generator skip a generated question that would ask
// the same fact in the same direction as an original.
const ORIG_FACT = {
  "s4-q1": "cap:United Kingdom", "s4-q2": "cap:France", "s4-q3": "cap:Japan", "s4-q4": "cap:Egypt",
  "s4-q5": "cap:Brazil", "s4-q6": "cap:Australia", "s4-q7": "cap:UAE", "s4-q8": "cap:Canada",
  "s4-q9": "cap:Turkey", "s4-q10": "cap:Nepal",
  "s5-q1": "state:Kerala", "s5-q2": "state:Tamil Nadu", "s5-q3": "state:Karnataka",
  "s5-q4": "state:Rajasthan", "s5-q5": "state:West Bengal", "s5-q6": "state:Maharashtra",
  "s5-q7": "state:Assam", "s5-q10": "state:Sikkim",
  "s5-q8": "heart", "s5-q9": "chandigarh2",
  "s3-q1": "asia:India", "s3-q6": "asia:Iraq", "s3-q7": "asia-not:South Asia",
  "s6-q9": "neigh-not:Thailand",
};
function keepOriginal(q) {
  const typed = cleanTyped(q.answer);
  const out = { ...q, typed };
  const accept = ACCEPT_ALIASES[normKey(typed)];
  if (accept) out.accept = accept;
  return out;
}
const NEW = {}; // stage -> generated questions
for (let n = 1; n <= 8; n++) NEW[n] = [];
function add(n, q) { NEW[n].push(q); }
const usedFact = new Set(Object.values(ORIG_FACT));
function addFact(n, factKey, q) {
  if (usedFact.has(factKey)) { if (process.env.DEBUG_SKIP) console.log("SKIP stage", n, factKey); return false; } // already asked as an original
  usedFact.add(factKey);
  NEW[n].push(q);
  return true;
}

// ── Stage 1: Map-Reading Basics (10 originals + 7 new = 17) ──
add(1, mkQ("s1-g1", "easy", "On most maps, which direction is DOWN?", "South",
  ["North", "East", "West"], "South is down on most maps."));
add(1, mkQ("s1-g2", "easy", "On most maps, which direction is to the RIGHT?", "East",
  ["West", "North", "South"], "East is right on most maps."));
add(1, mkQ("s1-g3", "easy", "On most maps, which direction is to the LEFT?", "West",
  ["East", "North", "South"], "West is left on most maps."));
add(1, mkQ("s1-g4", "medium", "Longitude lines run in which direction?", "North–south",
  ["East–west", "Up–down", "Round in circles"], "Latitude lines run east–west; longitude lines run north–south."));
add(1, mkQ("s1-g5", "medium", "What does the key (legend) of a map tell you?", "What colours and symbols mean",
  ["The rainfall", "The population", "The time of day"], "First look at the title and the key / legend — what colours and symbols mean."));
add(1, mkQ("s1-g6", "medium", "Which line is 0 degrees and runs through London?", "Prime Meridian",
  ["Equator", "Tropic of Cancer", "International Date Line"], "The Prime Meridian is the starting line (0 degrees) running through London, England."));
add(1, mkQ("s1-g7", "medium", "India is NORTH of which line?", "Equator",
  ["Prime Meridian", "Tropic of Cancer", "Arctic Circle"], "The Equator is the middle line (0 degrees). India is north of it."));

// ── Stage 2: Continents & Oceans (10 originals + 13 new = 23) ──
// Largest country in each continent (Asia is already asked in Stage 3).
add(2, mkQ("s2-g1", "medium", "Which is the largest country in Africa?", "Algeria",
  pickN(["Egypt", "Nigeria", "Kenya", "Ethiopia", "Morocco", "Ghana"], "Algeria", 3, rng),
  "Africa — largest country: Algeria. The Sahara desert is here.",
  { map: { kind: "world", place: "Algeria", where: "Africa", note: "In North Africa — the largest country in Africa." } }));
add(2, mkQ("s2-g2", "medium", "Which is the largest country in North America?", "Canada",
  pickN(["USA", "Mexico", "Brazil", "Argentina"], "Canada", 3, rng),
  "North America — largest country: Canada. USA, Canada, Mexico.",
  { map: { kind: "world", place: "Canada", where: "North America", note: "North of the USA — the second-largest country in the world." } }));
add(2, mkQ("s2-g3", "medium", "Which is the largest country in South America?", "Brazil",
  pickN(["Argentina", "Chile", "Peru", "Colombia"], "Brazil", 3, rng),
  "South America — largest country: Brazil. The Amazon river is here.",
  { map: { kind: "world", place: "Brazil", where: "South America", note: "The biggest country in South America." } }));
add(2, mkQ("s2-g4", "medium", "Which is the largest country in Europe?", "Russia",
  pickN(["France", "Germany", "Italy", "Spain"], "Russia", 3, rng),
  "Europe — largest country: Russia. Russia is partly in Europe and partly in Asia.",
  { map: { kind: "world", place: "Russia", where: "Europe and Asia", note: "The biggest country — across the north of Europe and Asia." } }));
add(2, mkQ("s2-g5", "easy", "Which is the largest country in Australia (Oceania)?", "Australia",
  pickN(["New Zealand", "Papua New Guinea", "Indonesia", "Japan"], "Australia", 3, rng),
  "Australia (Oceania) — smallest continent; also a country. Largest country in it: Australia.",
  { map: { kind: "world", place: "Australia", where: "Oceania", note: "The island continent, south-east of Asia." } }));
add(2, mkQ("s2-g6", "medium", "Which is the SECOND largest ocean?", "Atlantic Ocean",
  ["Pacific Ocean", "Indian Ocean", "Arctic Ocean"], "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th)."));
add(2, mkQ("s2-g7", "medium", "Which is the FOURTH largest ocean?", "Southern Ocean",
  ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th)."));
add(2, mkQ("s2-g8", "easy", "Which is the SMALLEST ocean?", "Arctic Ocean",
  ["Indian Ocean", "Southern Ocean", "Atlantic Ocean"], "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th)."));
add(2, mkQ("s2-g9", "medium", "Which sea is between Europe and Africa?", "Mediterranean Sea",
  ["Red Sea", "Arabian Sea", "Caspian Sea"], "Mediterranean Sea — between Europe and Africa.",
  { map: { kind: "world", place: "Mediterranean Sea", where: "Between Europe and Africa", note: "Between Europe (north) and Africa (south)." } }));
add(2, mkQ("s2-g10", "hard", "Which is the world's largest lake / sea, between Europe and Asia?", "Caspian Sea",
  ["Mediterranean Sea", "Red Sea", "Black Sea"], "Caspian Sea — the world's largest lake / sea, between Europe and Asia.",
  { map: { kind: "world", place: "Caspian Sea", where: "Between Europe and Asia", note: "Between Europe and Asia, north of Iran." } }));
add(2, mkQ("s2-g11", "medium", "Which ocean is between Africa, Asia and Australia?", "Indian Ocean",
  ["Pacific Ocean", "Atlantic Ocean", "Southern Ocean"], "The Indian Ocean is between Africa, Asia and Australia. India touches it on the south.",
  { map: { kind: "world", place: "Indian Ocean", where: "South of India", note: "Below India — the ocean between Africa, Asia and Australia." } }));
add(2, mkQ("s2-g12", "medium", "Which continent has NO permanent country?", "Antarctica",
  ["Australia", "Europe", "Africa"], "Antarctica — coldest, at the South Pole. No permanent country."));
add(2, mkQ("s2-g13", "easy", "Which continent is India in?", "Asia",
  ["Africa", "Europe", "North America"], "Asia is the largest continent. India is in South Asia.",
  { map: { kind: "world", place: "India", where: "South Asia", note: "In South Asia — the triangle pointing down into the Indian Ocean." } }));

// ── Stage 3: Asia (10 originals + 40 new = 50) ──
// One "which part of Asia?" question for EVERY country in the 3 groups.
const ASIA_CONTINENTS = ["Africa", "Europe", "North America"];
let asiaDistractor = 0;
for (const [group, countries] of Object.entries(ASIA_GROUPS)) {
  for (const c of countries) {
    const others = Object.keys(ASIA_GROUPS).filter((g) => g !== group);
    const fourth = ASIA_CONTINENTS[asiaDistractor++ % ASIA_CONTINENTS.length];
    addFact(3, `asia:${c}`, mkQ(`s3-g-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`, c === "India" || ["Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Bhutan", "Myanmar", "Saudi Arabia", "China", "Japan"].includes(c) ? "easy" : (["Maldives", "North Korea", "Mongolia", "Palestine", "Israel", "Lebanon", "Yemen"].includes(c) ? "hard" : "medium"),
      `Which part of Asia is ${c} in?`, group, [...others, fourth],
      `${c} is in ${group}.`,
      { map: { kind: "world", place: c, where: group, note: COUNTRY_NOTE[c] || `In ${group}.` } }));
  }
}
// "Which of these is in X?" — one per group.
for (const [group, countries] of Object.entries(ASIA_GROUPS)) {
  const inCountry = countries[0];
  const out = [];
  for (const [g2, list] of Object.entries(ASIA_GROUPS)) if (g2 !== group) out.push(list[0], list[1]);
  const distractors = shuffle(out, rng).slice(0, 3);
  addFact(3, `asia-in:${group}`, mkQ(`s3-g-in-${group.toLowerCase().replace(/[^a-z]+/g, "-")}`, "medium",
    `Which of these countries is in ${group}?`, inCountry, distractors,
    `${inCountry} is in ${group}.`));
}
// "Which of these is NOT in X?" — for Middle East and East/SE Asia
// (South Asia NOT-in is already an original, s3-q7).
for (const group of ["Middle East (West Asia)", "East & South-East Asia"]) {
  const out = ASIA_GROUPS[group];
  const inOthers = [];
  for (const [g2, list] of Object.entries(ASIA_GROUPS)) if (g2 !== group) inOthers.push(list[0]);
  const answer = shuffle(inOthers, rng)[0];
  addFact(3, `asia-not:${group}`, mkQ(`s3-g-not-${group.toLowerCase().replace(/[^a-z]+/g, "-")}`, "medium",
    `Which of these countries is NOT in ${group}?`, answer, shuffle(out, rng).slice(0, 3),
    `${answer} is not in ${group}.`));
}

// ── Stage 4: World Capitals (10 originals + 120 new = 130) ──
// BOTH ways for all 65 countries; skip country->capital already asked.
// Russia is alone in "Europe and Asia", so its pool merges Europe + Asia.
function capPoolFor(country) {
  const cont = CONTINENT_OF[country];
  let pool = [...(CAP_BY_CONTINENT[cont] || [])];
  if (cont === "Europe and Asia") pool = [...(CAP_BY_CONTINENT["Europe"] || []), ...(CAP_BY_CONTINENT["Asia"] || [])];
  if (pool.length < 4) pool = CAPITALS.map((c) => c.capital);
  return pool;
}
function countryPoolFor(country) {
  const cont = CONTINENT_OF[country];
  let pool = [...(COUNTRY_BY_CONTINENT[cont] || [])];
  if (cont === "Europe and Asia") pool = [...(COUNTRY_BY_CONTINENT["Europe"] || []), ...(COUNTRY_BY_CONTINENT["Asia"] || [])];
  if (pool.length < 4) pool = CAPITALS.map((c) => c.country);
  return pool;
}
let g4 = 0;
for (const { country, capital } of CAPITALS) {
  // Country -> capital.
  addFact(4, `cap:${country}`, mkQ(`s4-g${++g4}`, capLevel(country, false),
    `What is the capital of ${country}?`, capital,
    pickN(capPoolFor(country), capital, 3, rng),
    `${country} — ${capital}${capital.endsWith(".") ? "" : "."}`,
    { map: capMap(country) }));
  // Capital -> country.
  addFact(4, `caprev:${capital}`, mkQ(`s4-g${++g4}`, capLevel(country, true),
    `${capital} is the capital of which country?`, country,
    pickN(countryPoolFor(country), country, 3, rng),
    `${country} — ${capital}${capital.endsWith(".") ? "" : "."}`,
    { map: capMap(country) }));
}

// ── Stage 5: India States (10 originals + 100 new = 110) ──
// BOTH ways for all 36 states/UTs + which region each is in.
let g5 = 0;
const CAPS_BY_REGION = {};
for (const st of STATES) (CAPS_BY_REGION[st.region] = CAPS_BY_REGION[st.region] || []).push(st.capital);
const STATES_BY_REGION = {};
for (const st of STATES) (STATES_BY_REGION[st.region] = STATES_BY_REGION[st.region] || []).push(st.name);
for (const st of STATES) {
  // State -> capital (skip the 8 already asked as originals).
  addFact(5, `state:${st.name}`, mkQ(`s5-g${++g5}`, stateLevel(st, false),
    `What is the capital of ${st.name}?`, st.capital,
    pickN([...new Set(STATES.map((s) => s.capital))], st.capital, 3, rng),
    st.name === "Jammu and Kashmir"
      ? "Jammu and Kashmir — Srinagar (summer) / Jammu (winter)."
      : st.name === "Chandigarh" && st.isUT
      ? "Chandigarh is the capital of two states — Punjab and Haryana — and is also a Union Territory itself."
      : `${st.name} — ${st.capital}.`,
    { map: stateMap(st) }));
  // Capital -> state. SKIP Chandigarh: it is the capital of TWO states
  // (Punjab and Haryana), so the question would have two right answers.
  // The original s5-q9 already covers Chandigarh.
  if (st.capital !== "Chandigarh")
  addFact(5, `statecap:${st.capital}:${st.name}`, mkQ(`s5-g${++g5}`, stateLevel(st, true),
    `${st.capital} is the capital of which state?`, st.name,
    pickN(STATES.map((s) => s.name), st.name, 3, rng),
    st.name === "Jammu and Kashmir"
      ? "Jammu and Kashmir — Srinagar (summer) / Jammu (winter)."
      : `${st.name} — ${st.capital}.`,
    { map: stateMap(st) }));
  // Which region is it in?
  const otherRegions = shuffle(REGIONS.filter((r) => r !== st.region), rng).slice(0, 3);
  addFact(5, `region:${st.name}`, mkQ(`s5-g${++g5}`, "medium",
    `Which region of India is ${st.name} in?`, st.region, otherRegions,
    `${st.name} is in ${st.region}.`,
    { map: stateMap(st) }));
}
// Chandigarh special: capital of two states (also asked as an original
// s5-q9, kept verbatim above).

// ── Stage 6: Rivers & Mountains (10 originals + 14 new = 24) ──
const NEIGHBOURS = ["Pakistan", "China", "Nepal", "Bhutan", "Bangladesh", "Myanmar", "Afghanistan"];
for (const nb of ["Pakistan", "Nepal", "Bangladesh"]) {
  add(6, mkQ(`s6-g-neigh-${nb.toLowerCase()}`, "easy",
    `Which of these is a land neighbour of India?`, nb,
    shuffle(["Thailand", "Vietnam", "Malaysia", "Japan"], rng).slice(0, 3),
    `${nb} is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.`,
    { map: { kind: "world", place: nb, where: "South Asia", note: COUNTRY_NOTE[nb] || `In South Asia, next to India.` } }));
}
add(6, mkQ("s6-g-island", "medium", "Which country is India's island neighbour?", "Sri Lanka",
  ["Thailand", "Myanmar", "Maldives"], "Island neighbour: Sri Lanka (across the Palk Strait).",
  { map: { kind: "world", place: "Sri Lanka", where: "South Asia", note: "A small teardrop island just below India, in the Indian Ocean." } }));
add(6, mkQ("s6-g-narmada", "medium", "Which of these is a great river of India?", "Narmada",
  ["Nile", "Amazon", "Thames"], "Narmada is a great river of India. The great rivers are Ganga, Yamuna, Brahmaputra, Godavari, Krishna, Kaveri, Narmada, Tapti and Indus."));
add(6, mkQ("s6-g-ganga-sea", "medium", "The Ganga ends in which sea?", "Bay of Bengal",
  ["Arabian Sea", "Indian Ocean", "Mediterranean Sea"], "The Ganga flows east into the Bay of Bengal.",
  { map: { kind: "india", place: "Bay of Bengal", where: "East coast of India", note: "The sea on the east side of India, next to West Bengal and Odisha." } }));
add(6, mkQ("s6-g-everest-h", "hard", "How high is Mount Everest?", "8,849 m",
  ["8,586 m", "6,650 m", "5,000 m"], "Mount Everest (8,849 m) is the highest mountain in the world.",
  { map: { kind: "world", place: "Mount Everest", where: "Nepal / China", note: "On the Nepal–China border, in the Himalayas." } }));
add(6, mkQ("s6-g-kanch-h", "hard", "How high is Kanchenjunga?", "8,586 m",
  ["8,849 m", "6,650 m", "5,000 m"], "Kanchenjunga (8,586 m) in Sikkim is the highest peak in India.",
  { map: { kind: "india", place: "Kanchenjunga", where: "Sikkim", note: "In Sikkim, in the north-east — the highest peak in India." } }));
add(6, mkQ("s6-g-kanch-state", "medium", "Kanchenjunga is in which state?", "Sikkim",
  ["Kerala", "Rajasthan", "Assam"], "Kanchenjunga (8,586 m) in Sikkim is the highest peak in India.",
  { map: { kind: "india", place: "Sikkim", where: "North-East India", note: "A small state in the north-east, near Nepal — Kanchenjunga is here." } }));
add(6, mkQ("s6-g-east-ghats", "medium", "Which mountain range is on the EAST coast of India?", "Eastern Ghats",
  ["Western Ghats", "The Himalayas", "The Thar Desert"], "The Western Ghats are on the west coast; the Eastern Ghats are on the east coast."));
add(6, mkQ("s6-g-highest-range", "hard", "Which is the HIGHEST mountain range in the world?", "The Himalayas",
  ["Andes", "Western Ghats", "Eastern Ghats"], "The Himalayas are in the north — the highest mountains in the world.",
  { map: { kind: "india", place: "The Himalayas", where: "North India", note: "Across the north of India, on the border with Nepal and China." } }));
add(6, mkQ("s6-g-thar-state", "medium", "The Thar Desert is in which state?", "Rajasthan",
  ["Gujarat", "Madhya Pradesh", "Uttar Pradesh"], "The Thar Desert is in Rajasthan, in the west of India.",
  { map: { kind: "india", place: "Thar Desert", where: "West India (Rajasthan)", note: "In the west, in Rajasthan, next to Pakistan." } }));
add(6, mkQ("s6-g-three-seas", "hard", "Where do the Arabian Sea, the Bay of Bengal and the Indian Ocean meet?", "Kanyakumari",
  ["Kochi", "Chennai", "Port Blair"], "Kanyakumari (Tamil Nadu) is the southern tip of India — where 3 seas meet.",
  { map: { kind: "india", place: "Kanyakumari", where: "South India (Tamil Nadu)", note: "The very bottom tip of India, in Tamil Nadu." } }));

// ── Stage 7: Holy Places (10 originals + 10 new = 20) ──
const HOLY = [
  ["Jerusalem", "Palestine", "Masjid al-Aqsa — the first Qibla.", "Jerusalem (Bayt al-Maqdis) in Palestine — Masjid al-Aqsa, the first Qibla."],
  ["Makkah", "Saudi Arabia", "The Ka'ba; the Qibla for Muslims.", "Makkah is in Saudi Arabia. The Ka'ba is there — the Qibla for Muslims."],
  ["Madinah", "Saudi Arabia", "Masjid an-Nabawi; the Prophet's city (Hijrah).", "Madinah is in Saudi Arabia. Masjid an-Nabawi is there — the Prophet's city (Hijrah)."],
  ["Cairo", "Egypt", "Capital of Egypt; Al-Azhar; on the Nile.", "Cairo is the capital of Egypt, on the river Nile. Al-Azhar is in Cairo."],
  ["Baghdad", "Iraq", "Capital of Iraq; old Abbasid capital.", "Baghdad is the capital of Iraq — the old Abbasid capital."],
  ["Istanbul", "Turkey", "Old Ottoman capital; on the Bosphorus.", "Istanbul, Turkey — the old Ottoman capital, on the Bosphorus."],
  ["Karbala", "Iraq", "Where Imam Hussain (RA) was martyred.", "Karbala is in Iraq — where Imam Hussain (RA) was martyred."],
  ["Najaf", "Iraq", "Resting place of Ali ibn Abi Talib (RA).", "Najaf is in Iraq — the resting place of Ali ibn Abi Talib (RA)."],
  ["Fez", "Morocco", "Famous old centre of Islamic learning.", "Fez is in Morocco — a famous old centre of Islamic learning."],
  ["Cordoba", "Spain", "Famous old centre of Islamic learning.", "Cordoba is in Spain — a famous old centre of Islamic learning."],
];
add(7, mkQ("s7-g1", "medium", "Which holy place is in Palestine?", "Jerusalem",
  ["Makkah", "Cairo", "Baghdad"], "Jerusalem (Bayt al-Maqdis) in Palestine — Masjid al-Aqsa, the first Qibla.",
  { map: { kind: "world", place: "Jerusalem", where: "Palestine", note: "In Palestine, on the east side of the Mediterranean Sea." } }));
add(7, mkQ("s7-g2", "easy", "Which holy place is in Saudi Arabia and is the Qibla?", "Makkah",
  ["Madinah", "Jerusalem", "Cairo"], "Makkah is in Saudi Arabia. The Ka'ba is there — the Qibla for Muslims.",
  { map: { kind: "world", place: "Makkah", where: "Saudi Arabia", note: "In Saudi Arabia, on the western side, near the Red Sea." } }));
add(7, mkQ("s7-g3", "medium", "Masjid an-Nabawi is in which city?", "Madinah",
  ["Makkah", "Jerusalem", "Baghdad"], "Madinah is in Saudi Arabia. Masjid an-Nabawi is there — the Prophet's city (Hijrah).",
  { map: { kind: "world", place: "Madinah", where: "Saudi Arabia", note: "In Saudi Arabia, north of Makkah." } }));
add(7, mkQ("s7-g4", "medium", "Al-Azhar is in which city?", "Cairo",
  ["Baghdad", "Damascus", "Istanbul"], "Cairo is the capital of Egypt, on the river Nile. Al-Azhar is in Cairo.",
  { map: { kind: "world", place: "Cairo", where: "Egypt", note: "In Egypt, on the river Nile, near the Mediterranean Sea." } }));
add(7, mkQ("s7-g5", "medium", "Which city was the old Abbasid capital?", "Baghdad",
  ["Cairo", "Damascus", "Istanbul"], "Baghdad is the capital of Iraq — the old Abbasid capital.",
  { map: { kind: "world", place: "Baghdad", where: "Iraq", note: "In Iraq, in the Middle East, east of Syria." } }));
add(7, mkQ("s7-g6", "medium", "Which city was the old Ottoman capital?", "Istanbul",
  ["Ankara", "Baghdad", "Cairo"], "Istanbul, Turkey — the old Ottoman capital, on the Bosphorus.",
  { map: { kind: "world", place: "Istanbul", where: "Turkey", note: "In Turkey, between Europe and Asia." } }));
add(7, mkQ("s7-g7", "hard", "Where was Imam Hussain (RA) martyred?", "Karbala",
  ["Najaf", "Makkah", "Madinah"], "Karbala is in Iraq — where Imam Hussain (RA) was martyred.",
  { map: { kind: "world", place: "Karbala", where: "Iraq", note: "In Iraq, south of Baghdad." } }));
add(7, mkQ("s7-g8", "hard", "Ali ibn Abi Talib (RA) rests in which city?", "Najaf",
  ["Karbala", "Baghdad", "Cairo"], "Najaf is in Iraq — the resting place of Ali ibn Abi Talib (RA).",
  { map: { kind: "world", place: "Najaf", where: "Iraq", note: "In Iraq, south of Baghdad, near Karbala." } }));
add(7, mkQ("s7-g9", "hard", "Fez is in which country?", "Morocco",
  ["Egypt", "Spain", "Turkey"], "Fez is in Morocco — a famous old centre of Islamic learning.",
  { map: { kind: "world", place: "Fez", where: "Morocco", note: "In Morocco, in North Africa." } }));
add(7, mkQ("s7-g10", "hard", "Cordoba is in which country?", "Spain",
  ["Morocco", "Egypt", "Italy"], "Cordoba is in Spain — a famous old centre of Islamic learning.",
  { map: { kind: "world", place: "Cordoba", where: "Spain", note: "In Spain, in southern Europe." } }));

// ── Stage 8: Biggest / Longest / Highest (10 originals + 9 new = 19) ──
add(8, mkQ("s8-g1", "easy", "Which is the SMALLEST continent?", "Australia",
  ["Europe", "Africa", "Antarctica"], "Australia is the smallest continent; it is also a country."));
add(8, mkQ("s8-g2", "easy", "Which is the LARGEST ocean?", "Pacific Ocean",
  ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], "Largest ocean: Pacific Ocean. Largest to smallest: Pacific, Atlantic, Indian, Southern, Arctic."));
add(8, mkQ("s8-g3", "medium", "Which is the LONGEST river in the world?", "Nile",
  ["Amazon", "Ganga", "Brahmaputra"], "Longest river in the world: Nile (Africa, about 6,650 km) — flows into the Mediterranean Sea.",
  { map: { kind: "world", place: "River Nile", where: "Africa (Egypt)", note: "In Africa — it flows north through Egypt into the Mediterranean Sea." } }));
add(8, mkQ("s8-g4", "medium", "Which sea is between Europe and Africa?", "Mediterranean Sea",
  ["Red Sea", "Arabian Sea", "Caspian Sea"], "Sea between Europe and Africa: Mediterranean Sea.",
  { map: { kind: "world", place: "Mediterranean Sea", where: "Between Europe and Africa", note: "Between Europe (north) and Africa (south)." } }));
add(8, mkQ("s8-g5", "hard", "The Mediterranean Sea is between which TWO continents?", "Europe and Africa",
  ["Asia and Africa", "Europe and Asia", "Africa and Australia"], "Sea between Europe and Africa: Mediterranean Sea."));
add(8, mkQ("s8-g6", "medium", "Which sea is between Africa and Arabia?", "Red Sea",
  ["Arabian Sea", "Mediterranean Sea", "Bay of Bengal"], "Sea between Africa and Arabia: Red Sea.",
  { map: { kind: "world", place: "Red Sea", where: "Between Africa and Arabia", note: "Between Africa (Egypt, Sudan) and Arabia (Saudi Arabia)." } }));
add(8, mkQ("s8-g7", "hard", "The Red Sea is between Africa and which country?", "Saudi Arabia",
  ["Egypt", "India", "Turkey"], "Sea between Africa and Arabia: Red Sea. Saudi Arabia is on the Arabian side.",
  { map: { kind: "world", place: "Red Sea", where: "Between Africa and Arabia", note: "Between Africa (Egypt, Sudan) and Arabia (Saudi Arabia)." } }));
add(8, mkQ("s8-g8", "medium", "Which river flows through Egypt?", "Nile",
  ["Amazon", "Ganga", "Indus"], "River through Egypt: Nile — Cairo is on the Nile.",
  { map: { kind: "world", place: "River Nile", where: "Africa (Egypt)", note: "In Africa — it flows north through Egypt into the Mediterranean Sea." } }));
add(8, mkQ("s8-g9", "hard", "The Nile flows through which country?", "Egypt",
  ["Sudan", "India", "Brazil"], "River through Egypt: Nile — Cairo is on the Nile.",
  { map: { kind: "world", place: "Egypt", where: "Africa", note: "In north-east Africa, on the river Nile." } }));

// ── Assemble: originals (verbatim + typed) + generated, per stage ──
const QUESTIONS = {};
let total = 0;
for (let n = 1; n <= 8; n++) {
  const orig = (OLD.MAP_GAME_QUESTIONS[n] || []).map(keepOriginal);
  const gen = NEW[n];
  const all = [...orig, ...gen];
  const keys = new Set(all.map((q) => q.key));
  if (keys.size !== all.length) throw new Error(`Stage ${n}: duplicate keys`);
  for (const q of all) {
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Stage ${n} ${q.key}: must have 4 options`);
    if (new Set(q.options).size !== 4) throw new Error(`Stage ${n} ${q.key}: options not unique`);
    if (!q.options.includes(q.answer)) throw new Error(`Stage ${n} ${q.key}: answer not in options`);
    if (!q.typed || !String(q.typed).trim()) throw new Error(`Stage ${n} ${q.key}: no typed answer`);
    if (!["easy", "medium", "hard"].includes(q.level)) throw new Error(`Stage ${n} ${q.key}: bad level`);
    if (!q.point) throw new Error(`Stage ${n} ${q.key}: no point`);
  }
  QUESTIONS[n] = all;
  total += all.length;
  console.log(`Stage ${n} (${OLD.MAP_GAME_STAGES[n - 1].title}): ${orig.length} original + ${gen.length} generated = ${all.length}`);
}
console.log("TOTAL QUESTIONS:", total);
// Cross-checks against the verified lists.
const s4 = QUESTIONS[4];
const capFacts = new Set();
for (const q of s4) {
  const m = q.point.match(/^(.+?) — /);
}
const stripThe = (s) => s.replace(/^the /, "");
const countriesAsked = new Set(s4.filter((q) => q.q.startsWith("What is the capital of")).map((q) => stripThe(q.q.replace("What is the capital of ", "").replace("?", ""))));
const capitalsAsked = new Set(s4.filter((q) => q.q.endsWith("is the capital of which country?")).map((q) => q.q.replace(" is the capital of which country?", "")));
console.log("S4 countries asked (country->capital):", countriesAsked.size, "/ 65;",
  "capitals asked (capital->country):", capitalsAsked.size, "/ 65");
const missingC = CAPITALS.filter(({ country }) => !countriesAsked.has(country)).map((x) => x.country);
const missingR = CAPITALS.filter(({ capital }) => !capitalsAsked.has(capital)).map((x) => x.capital);
if (missingC.length || missingR.length) throw new Error("S4 coverage gap: missing country->capital " + JSON.stringify(missingC) + " missing capital->country " + JSON.stringify(missingR));
const s5 = QUESTIONS[5];
const statesAsked = new Set(s5.filter((q) => q.q.startsWith("What is the capital of")).map((q) => q.q.replace("What is the capital of ", "").replace("?", "")));
const statesRev = new Set(s5.filter((q) => q.q.endsWith("is the capital of which state?")).map((q) => q.q.replace(" is the capital of which state?", "")));
const regionsAsked = new Set(s5.filter((q) => q.q.startsWith("Which region of India is")).map((q) => q.q.replace("Which region of India is ", "").replace(" in?", "")));
console.log("S5 states asked (state->capital):", statesAsked.size, "/ 36; capitals asked:", statesRev.size, "/ 34 askable (Chandigarh excluded — shared by Punjab, Haryana and the UT); regions asked:", regionsAsked.size, "/ 36");
const missingS = STATES.filter((s) => !statesAsked.has(s.name)).map((s) => s.name);
// Chandigarh is deliberately NOT asked capital->state (two right answers;
// the original s5-q9 covers it), so Punjab/Haryana are expected gaps here.
const missingSR = STATES.filter((s) => s.capital !== "Chandigarh" && !statesRev.has(s.capital)).map((s) => s.name);
const missingRG = STATES.filter((s) => !regionsAsked.has(s.name)).map((s) => s.name);
if (missingS.length || missingSR.length || missingRG.length) throw new Error("S5 coverage gap: " + JSON.stringify({ missingS, missingSR, missingRG }));
const s3 = QUESTIONS[3];
const asiaAsked = new Set(s3.filter((q) => q.q.startsWith("Which part of Asia is")).map((q) => q.q.replace("Which part of Asia is ", "").replace(" in?", "")));
console.log("S3 Asia countries asked (region):", asiaAsked.size, "/ 34");
 // India + Iraq are covered by originals s3-q1 / s3-q6 in a different form
 // ("India is in which part of Asia?" / "Which of these is in the Middle East?").
const missingA = Object.values(ASIA_GROUPS).flat().filter((c) => !asiaAsked.has(c) && c !== "India" && c !== "Iraq");
if (missingA.length) throw new Error("S3 coverage gap: " + JSON.stringify(missingA));

// ── Write the new map-game-data.js ──
const header = `// ─────────────────────────────────────────────────────────────
// Bidaya Map Study game (BNS31) — question bank + study sheets.
// SOURCE OF TRUTH: SIBAQ26_Bidaya_Map_Study_Full_Pack.pdf (5 pp, 12 Nov 2026)
// + Quiz Questions and Map Tasks, Tasks 1-2 (28 states, 45 countries).
// Every fact below comes from that pack. Do not invent capitals or facts.
// The game is for S Abdul Khadirul Faaz (N1322) first; other boys can be
// added later via the map_game_players table — the bank is not tied to a boy.
// CONCEPT-BASED 100% COVERAGE (Nov 2026): the pool is generated from the
// verified fact lists (65 capitals both ways, 36 states/UTs both ways +
// region, all 34 Asia countries by region, all 15 biggest/longest/highest
// rows, continents/oceans, rivers/mountains, holy places). Each play draws
// 10 questions per stage, UNSEEN first, then past mistakes, then review —
// so repeated plays cover new ground instead of the same 10.
// A question:
//   key     stable id, e.g. "s4-q3" (originals) or "s4-g12" (generated)
//   q       the question (simple English, age 10-12)
//   options exactly 4; answer must be one of them, word for word
//   level   "easy" | "medium" | "hard"
//   point   the exact fact to learn ("Capital of Saudi Arabia — Riyadh")
//   hint    a clue shown on Easy/Medium only; Hard shows no hint
//   typed   canonical short answer for Round 2 (no-options typing round)
//   accept  extra accepted spellings for Round 2 (normalised matching)
//   map     map-location question: { kind: "world"|"india", place, where, note }
//           kind "world" = on the world map; "india" = on the India map.
//           where = continent / region; note = where it is, in plain words.
// ─────────────────────────────────────────────────────────────
`;
function js(v) { return JSON.stringify(v, null, 2); }
const out =
  header +
  `const MAP_GAME_STAGES = ${js(OLD.MAP_GAME_STAGES)};\n\n` +
  `// Pass mark to finish a stage and unlock the next one: 6 of 10.\n` +
  `const MAP_GAME_PASS_MARK = ${OLD.MAP_GAME_PASS_MARK};\n` +
  `const MAP_GAME_TIME_PER_Q = ${js(OLD.MAP_GAME_TIME_PER_Q)}; // seconds; 0 = no timer\n` +
  `// Questions drawn per play (one stage = one play of 10).\n` +
  `const MAP_GAME_PLAY_COUNT = 10;\n` +
  `// Round 2 (no-options typing round): 45 seconds per question.\n` +
  `const MAP_GAME_ROUND2_TIME_PER_Q = 45;\n\n` +
  `const MAP_GAME_QUESTIONS = ${js(QUESTIONS)};\n\n` +
  `// All 65 capitals from the Full Pack (45 Task-2 + 20 extra), for the\n` +
  `// Stage-4 study sheet. [country, capital]\n` +
  `const MAP_GAME_ALL_CAPITALS = ${js(OLD.MAP_GAME_ALL_CAPITALS)};\n\n` +
  `// Study-sheet facts per stage, for the weak-section PDF (B&W, print-ready).\n` +
  `// Each fact is one short line. Stage 4 uses MAP_GAME_ALL_CAPITALS instead.\n` +
  `const MAP_GAME_SHEETS = ${js(OLD.MAP_GAME_SHEETS)};\n\n` +
  `module.exports = { MAP_GAME_STAGES, MAP_GAME_QUESTIONS, MAP_GAME_PASS_MARK, MAP_GAME_TIME_PER_Q, MAP_GAME_PLAY_COUNT, MAP_GAME_ROUND2_TIME_PER_Q, MAP_GAME_ALL_CAPITALS, MAP_GAME_SHEETS };\n`;
if (!fs.existsSync(path.join(__dirname, "..", "map-game-data.v1-80q.js"))) {
  fs.copyFileSync(path.join(__dirname, "..", "map-game-data.js"), path.join(__dirname, "..", "map-game-data.v1-80q.js"));
}
fs.writeFileSync(OUT, out);
console.log("WROTE:", OUT, `(${Math.round(out.length / 1024)} KB)`);
console.log("Original 80-question file kept at map-game-data.v1-80q.js");
