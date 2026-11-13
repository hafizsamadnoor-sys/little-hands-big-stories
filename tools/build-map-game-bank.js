// ─────────────────────────────────────────────────────────────
// Build the expanded Map Study question bank (concept-based 100%).
// Run:  node tools/build-map-game-bank.js
// Reads the current map-game-data.js, KEEPS the original 80 questions
// verbatim (adding only `typed` / `accept` for Round 2), generates the
// rest of the pool from the verified fact lists below (all facts come
// from SIBAQ26_Bidaya_Map_Study_Full_Pack.pdf + Tasks 1-2 + a world
// atlas), validates every question, and writes the new map-game-data.js.
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
  "6961 m": ["6961"],
  "6190 m": ["6190"],
  "5895 m": ["5895"],
  "5642 m": ["5642"],
  "4892 m": ["4892"],
  "4884 m": ["4884"],
  "6400 km": ["6400"],
  "6300 km": ["6300"],
  "3766 km": ["3766"],
  "3530 km": ["3530"],
  "2508 km": ["2508"],
  "1642 m": ["1642"],
  "979 m": ["979"],
  "828 m": ["828"],
  "21196 km": ["21196"],
  "the himalayas": ["himalayas"],
  "the andes": ["andes"],
  "its title and key legend": ["title and key", "the title and key"],
  "the directions": ["directions"],
  "the compass rose shows the directions": ["compass rose", "directions"],
  "sri jayawardenepura kotte": ["kotte", "sri jayawardenepura"],
  "sao tome and principe": ["sao tome"],
  "n djamena": ["ndjamena"],
  "mexico city": ["mexico"],
  "guatemala city": ["guatemala"],
  "panama city": ["panama"],
  "kuwait city": ["kuwait"],
  "vatican city": ["vatican"],
  "andorra la vella": ["andorra"],
  "bandar seri begawan": ["bandar"],
};

const normKey = (s) => String(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");

// ── Verified data lists ──
// CONTINENT_OF: every one of the 195 countries (7-continent school model;
// Russia sits in two continents, so it gets the special "Europe and Asia"
// value — the capital pools merge Europe + Asia for it, as before).
const CONTINENT_OF = {
  // Africa (54)
  "Algeria": "Africa", "Egypt": "Africa", "Libya": "Africa", "Morocco": "Africa",
  "Tunisia": "Africa", "Sudan": "Africa", "South Sudan": "Africa", "Ethiopia": "Africa",
  "Eritrea": "Africa", "Djibouti": "Africa", "Somalia": "Africa", "Kenya": "Africa",
  "Uganda": "Africa", "Rwanda": "Africa", "Burundi": "Africa", "Tanzania": "Africa",
  "Mozambique": "Africa", "Zambia": "Africa", "Zimbabwe": "Africa", "Malawi": "Africa",
  "Botswana": "Africa", "Namibia": "Africa", "South Africa": "Africa", "Lesotho": "Africa",
  "Eswatini": "Africa", "Madagascar": "Africa", "Mauritius": "Africa", "Seychelles": "Africa",
  "Comoros": "Africa", "Cape Verde": "Africa", "Sao Tome and Principe": "Africa",
  "Nigeria": "Africa", "Ghana": "Africa", "Ivory Coast": "Africa", "Senegal": "Africa",
  "Mali": "Africa", "Burkina Faso": "Africa", "Niger": "Africa", "Guinea": "Africa",
  "Guinea-Bissau": "Africa", "Sierra Leone": "Africa", "Liberia": "Africa", "Togo": "Africa",
  "Benin": "Africa", "Cameroon": "Africa", "Central African Republic": "Africa",
  "Chad": "Africa", "Congo": "Africa", "Dem. Rep. of Congo": "Africa", "Gabon": "Africa",
  "Equatorial Guinea": "Africa", "Angola": "Africa", "Mauritania": "Africa", "Gambia": "Africa",
  // Asia (48)
  "Afghanistan": "Asia", "Armenia": "Asia", "Azerbaijan": "Asia", "Bahrain": "Asia",
  "Bangladesh": "Asia", "Bhutan": "Asia", "Brunei": "Asia", "Cambodia": "Asia",
  "China": "Asia", "Cyprus": "Asia", "Georgia": "Asia", "India": "Asia",
  "Indonesia": "Asia", "Iran": "Asia", "Iraq": "Asia", "Israel": "Asia",
  "Japan": "Asia", "Jordan": "Asia", "Kazakhstan": "Asia", "Kuwait": "Asia",
  "Kyrgyzstan": "Asia", "Laos": "Asia", "Lebanon": "Asia", "Malaysia": "Asia",
  "Maldives": "Asia", "Mongolia": "Asia", "Myanmar": "Asia", "Nepal": "Asia",
  "North Korea": "Asia", "Oman": "Asia", "Pakistan": "Asia", "Palestine": "Asia",
  "Philippines": "Asia", "Qatar": "Asia", "Saudi Arabia": "Asia", "Singapore": "Asia",
  "South Korea": "Asia", "Sri Lanka": "Asia", "Syria": "Asia", "Tajikistan": "Asia",
  "Thailand": "Asia", "East Timor": "Asia", "Turkey": "Asia", "Turkmenistan": "Asia",
  "UAE": "Asia", "Uzbekistan": "Asia", "Vietnam": "Asia", "Yemen": "Asia",
  // Europe (44)
  "Albania": "Europe", "Andorra": "Europe", "Austria": "Europe", "Belarus": "Europe",
  "Belgium": "Europe", "Bosnia and Herzegovina": "Europe", "Bulgaria": "Europe",
  "Croatia": "Europe", "Czech Republic": "Europe", "Denmark": "Europe", "Estonia": "Europe",
  "Finland": "Europe", "France": "Europe", "Germany": "Europe", "Greece": "Europe",
  "Hungary": "Europe", "Iceland": "Europe", "Ireland": "Europe", "Italy": "Europe",
  "Latvia": "Europe", "Liechtenstein": "Europe", "Lithuania": "Europe", "Luxembourg": "Europe",
  "Malta": "Europe", "Moldova": "Europe", "Monaco": "Europe", "Montenegro": "Europe",
  "Netherlands": "Europe", "North Macedonia": "Europe", "Norway": "Europe", "Poland": "Europe",
  "Portugal": "Europe", "Romania": "Europe", "Russia": "Europe and Asia",
  "San Marino": "Europe", "Serbia": "Europe", "Slovakia": "Europe", "Slovenia": "Europe",
  "Spain": "Europe", "Sweden": "Europe", "Switzerland": "Europe", "Ukraine": "Europe",
  "United Kingdom": "Europe", "Vatican City": "Europe",
  // North America (23)
  "Antigua and Barbuda": "North America", "Bahamas": "North America", "Barbados": "North America",
  "Belize": "North America", "Canada": "North America", "Costa Rica": "North America",
  "Cuba": "North America", "Dominica": "North America", "Dominican Republic": "North America",
  "El Salvador": "North America", "Grenada": "North America", "Guatemala": "North America",
  "Haiti": "North America", "Honduras": "North America", "Jamaica": "North America",
  "Mexico": "North America", "Nicaragua": "North America", "Panama": "North America",
  "St. Kitts and Nevis": "North America", "St. Lucia": "North America",
  "St. Vincent and the Grenadines": "North America", "Trinidad and Tobago": "North America",
  "United States": "North America",
  // South America (12)
  "Argentina": "South America", "Bolivia": "South America", "Brazil": "South America",
  "Chile": "South America", "Colombia": "South America", "Ecuador": "South America",
  "Guyana": "South America", "Paraguay": "South America", "Peru": "South America",
  "Suriname": "South America", "Uruguay": "South America", "Venezuela": "South America",
  // Oceania (14)
  "Australia": "Australia", "Fiji": "Australia", "Kiribati": "Australia",
  "Marshall Islands": "Australia", "Micronesia": "Australia", "Nauru": "Australia",
  "New Zealand": "Australia", "Palau": "Australia", "Papua New Guinea": "Australia",
  "Samoa": "Australia", "Solomon Islands": "Australia", "Tonga": "Australia",
  "Tuvalu": "Australia", "Vanuatu": "Australia",
};
// Full list: 193 UN member states + Palestine + Vatican City = 195.
// Capitals verified against Wikipedia "List of national capitals" (Nov 2026).
// Multi-capital countries use ONE standard school answer (exclusions):
//   South Africa -> Pretoria (executive; Cape Town = legislative, Bloemfontein = judicial)
//   Sri Lanka -> Sri Jayawardenepura Kotte (official; Colombo = executive/commercial)
//   Netherlands -> Amsterdam (official; The Hague = seat of government)
//   Bolivia -> Sucre (constitutional; La Paz = seat of government)
//   Benin -> Porto-Novo (official; Cotonou = seat of government)
//   Malaysia -> Kuala Lumpur (Putrajaya = administrative)
//   Eswatini -> Mbabane (administrative; Lobamba = royal/legislative)
//   Ivory Coast -> Yamoussoukro (de jure; Abidjan = former/economic)
//   Burundi -> Gitega (de jure; Bujumbura = de facto)
//   Yemen -> Sanaa (de jure; Aden = de facto temporary)
//   Tanzania -> Dodoma (Dar es Salaam = former)
//   Myanmar -> Naypyidaw (Yangon = until 2006)
//   Equatorial Guinea -> Malabo (school-standard; Wikipedia now lists Ciudad de la Paz, the new capital)
//   Nauru -> Yaren (de facto; Nauru has no official capital)
//   Israel -> Jerusalem (disputed); Palestine -> Ramallah (de facto)
// Country names are plain ASCII school names (Ivory Coast, not Côte d'Ivoire;
// East Timor, not Timor-Leste; Cape Verde, not Cabo Verde) so a child can
// type them in Round 2.
const CAPITALS_195 = [
  // Africa (54)
  ["Algeria", "Algiers"], ["Egypt", "Cairo"], ["Libya", "Tripoli"], ["Morocco", "Rabat"],
  ["Tunisia", "Tunis"], ["Sudan", "Khartoum"], ["South Sudan", "Juba"], ["Ethiopia", "Addis Ababa"],
  ["Eritrea", "Asmara"], ["Djibouti", "Djibouti"], ["Somalia", "Mogadishu"], ["Kenya", "Nairobi"],
  ["Uganda", "Kampala"], ["Rwanda", "Kigali"], ["Burundi", "Gitega"], ["Tanzania", "Dodoma"],
  ["Mozambique", "Maputo"], ["Zambia", "Lusaka"], ["Zimbabwe", "Harare"], ["Malawi", "Lilongwe"],
  ["Botswana", "Gaborone"], ["Namibia", "Windhoek"], ["South Africa", "Pretoria"], ["Lesotho", "Maseru"],
  ["Eswatini", "Mbabane"], ["Madagascar", "Antananarivo"], ["Mauritius", "Port Louis"], ["Seychelles", "Victoria"],
  ["Comoros", "Moroni"], ["Cape Verde", "Praia"], ["Sao Tome and Principe", "Sao Tome"],
  ["Nigeria", "Abuja"], ["Ghana", "Accra"], ["Ivory Coast", "Yamoussoukro"], ["Senegal", "Dakar"],
  ["Mali", "Bamako"], ["Burkina Faso", "Ouagadougou"], ["Niger", "Niamey"], ["Guinea", "Conakry"],
  ["Guinea-Bissau", "Bissau"], ["Sierra Leone", "Freetown"], ["Liberia", "Monrovia"], ["Togo", "Lome"],
  ["Benin", "Porto-Novo"], ["Cameroon", "Yaounde"], ["Central African Republic", "Bangui"],
  ["Chad", "N'Djamena"], ["Congo", "Brazzaville"], ["Dem. Rep. of Congo", "Kinshasa"], ["Gabon", "Libreville"],
  ["Equatorial Guinea", "Malabo"], ["Angola", "Luanda"], ["Mauritania", "Nouakchott"], ["Gambia", "Banjul"],
  // Asia (48)
  ["Afghanistan", "Kabul"], ["Armenia", "Yerevan"], ["Azerbaijan", "Baku"], ["Bahrain", "Manama"],
  ["Bangladesh", "Dhaka"], ["Bhutan", "Thimphu"], ["Brunei", "Bandar Seri Begawan"], ["Cambodia", "Phnom Penh"],
  ["China", "Beijing"], ["Cyprus", "Nicosia"], ["Georgia", "Tbilisi"], ["India", "New Delhi"],
  ["Indonesia", "Jakarta"], ["Iran", "Tehran"], ["Iraq", "Baghdad"], ["Israel", "Jerusalem"],
  ["Japan", "Tokyo"], ["Jordan", "Amman"], ["Kazakhstan", "Astana"], ["Kuwait", "Kuwait City"],
  ["Kyrgyzstan", "Bishkek"], ["Laos", "Vientiane"], ["Lebanon", "Beirut"], ["Malaysia", "Kuala Lumpur"],
  ["Maldives", "Male"], ["Mongolia", "Ulaanbaatar"], ["Myanmar", "Naypyidaw"], ["Nepal", "Kathmandu"],
  ["North Korea", "Pyongyang"], ["Oman", "Muscat"], ["Pakistan", "Islamabad"], ["Palestine", "Ramallah"],
  ["Philippines", "Manila"], ["Qatar", "Doha"], ["Saudi Arabia", "Riyadh"], ["Singapore", "Singapore"],
  ["South Korea", "Seoul"], ["Sri Lanka", "Sri Jayawardenepura Kotte"], ["Syria", "Damascus"], ["Tajikistan", "Dushanbe"],
  ["Thailand", "Bangkok"], ["East Timor", "Dili"], ["Turkey", "Ankara"], ["Turkmenistan", "Ashgabat"],
  ["UAE", "Abu Dhabi"], ["Uzbekistan", "Tashkent"], ["Vietnam", "Hanoi"], ["Yemen", "Sanaa"],
  // Europe (44)
  ["Albania", "Tirana"], ["Andorra", "Andorra la Vella"], ["Austria", "Vienna"], ["Belarus", "Minsk"],
  ["Belgium", "Brussels"], ["Bosnia and Herzegovina", "Sarajevo"], ["Bulgaria", "Sofia"],
  ["Croatia", "Zagreb"], ["Czech Republic", "Prague"], ["Denmark", "Copenhagen"], ["Estonia", "Tallinn"],
  ["Finland", "Helsinki"], ["France", "Paris"], ["Germany", "Berlin"], ["Greece", "Athens"],
  ["Hungary", "Budapest"], ["Iceland", "Reykjavik"], ["Ireland", "Dublin"], ["Italy", "Rome"],
  ["Latvia", "Riga"], ["Liechtenstein", "Vaduz"], ["Lithuania", "Vilnius"], ["Luxembourg", "Luxembourg"],
  ["Malta", "Valletta"], ["Moldova", "Chisinau"], ["Monaco", "Monaco"], ["Montenegro", "Podgorica"],
  ["Netherlands", "Amsterdam"], ["North Macedonia", "Skopje"], ["Norway", "Oslo"], ["Poland", "Warsaw"],
  ["Portugal", "Lisbon"], ["Romania", "Bucharest"], ["Russia", "Moscow"], ["San Marino", "San Marino"],
  ["Serbia", "Belgrade"], ["Slovakia", "Bratislava"], ["Slovenia", "Ljubljana"], ["Spain", "Madrid"],
  ["Sweden", "Stockholm"], ["Switzerland", "Bern"], ["Ukraine", "Kyiv"], ["United Kingdom", "London"],
  ["Vatican City", "Vatican City"],
  // North America (23)
  ["Antigua and Barbuda", "St. John's"], ["Bahamas", "Nassau"], ["Barbados", "Bridgetown"],
  ["Belize", "Belmopan"], ["Canada", "Ottawa"], ["Costa Rica", "San Jose"], ["Cuba", "Havana"],
  ["Dominica", "Roseau"], ["Dominican Republic", "Santo Domingo"], ["El Salvador", "San Salvador"],
  ["Grenada", "St. George's"], ["Guatemala", "Guatemala City"], ["Haiti", "Port-au-Prince"],
  ["Honduras", "Tegucigalpa"], ["Jamaica", "Kingston"], ["Mexico", "Mexico City"],
  ["Nicaragua", "Managua"], ["Panama", "Panama City"], ["St. Kitts and Nevis", "Basseterre"],
  ["St. Lucia", "Castries"], ["St. Vincent and the Grenadines", "Kingstown"],
  ["Trinidad and Tobago", "Port of Spain"], ["United States", "Washington, D.C."],
  // South America (12)
  ["Argentina", "Buenos Aires"], ["Bolivia", "Sucre"], ["Brazil", "Brasilia"], ["Chile", "Santiago"],
  ["Colombia", "Bogota"], ["Ecuador", "Quito"], ["Guyana", "Georgetown"], ["Paraguay", "Asuncion"],
  ["Peru", "Lima"], ["Suriname", "Paramaribo"], ["Uruguay", "Montevideo"], ["Venezuela", "Caracas"],
  // Oceania (14)
  ["Australia", "Canberra"], ["Fiji", "Suva"], ["Kiribati", "South Tarawa"],
  ["Marshall Islands", "Majuro"], ["Micronesia", "Palikir"], ["Nauru", "Yaren"],
  ["New Zealand", "Wellington"], ["Palau", "Ngerulmud"], ["Papua New Guinea", "Port Moresby"],
  ["Samoa", "Apia"], ["Solomon Islands", "Honiara"], ["Tonga", "Nuku'alofa"],
  ["Tuvalu", "Funafuti"], ["Vanuatu", "Port Vila"],
];
const CAPITALS = CAPITALS_195.map(([c, cap]) => ({ country: c, capital: cleanTyped(cap) }));
if (CAPITALS.length !== 195) throw new Error("Expected 195 capitals, got " + CAPITALS.length);
if (new Set(CAPITALS.map((c) => c.country)).size !== 195) throw new Error("Duplicate country in CAPITALS_195");
if (new Set(CAPITALS.map((c) => c.capital)).size !== 195) throw new Error("Duplicate capital in CAPITALS_195");
for (const { country } of CAPITALS) if (!CONTINENT_OF[country]) throw new Error("No continent for " + country);
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
  "Kazakhstan": "In Central Asia — the largest landlocked country in the world.",
  "Uzbekistan": "In Central Asia, south of Kazakhstan.",
  "Kyrgyzstan": "In Central Asia, in the mountains.",
  "Tajikistan": "In Central Asia, in the mountains.",
  "Turkmenistan": "In Central Asia, east of the Caspian Sea.",
  "Armenia": "In the Caucasus, between Turkey and Azerbaijan.",
  "Azerbaijan": "In the Caucasus, on the Caspian Sea.",
  "Georgia": "In the Caucasus, on the Black Sea.",
  "Cyprus": "An island in the Mediterranean Sea, south of Turkey.",
  "Bahrain": "A small island country in the Gulf, next to Saudi Arabia.",
  "Brunei": "A small country on the island of Borneo.",
  "Cambodia": "In South-East Asia, between Thailand and Vietnam.",
  "Laos": "In South-East Asia, between Thailand and Vietnam.",
  "East Timor": "A small country on the island of Timor, north of Australia.",
  "Mongolia": "In East Asia, between China and Russia.",
  "North Korea": "In East Asia, north of South Korea.",
  "South Korea": "In East Asia, south of North Korea.",
  "Philippines": "Islands in South-East Asia, east of Vietnam.",
  "Vietnam": "In South-East Asia, east of Cambodia.",
  "Singapore": "A small island city at the tip of Malaysia.",
  "Algeria": "In North Africa — the largest country in Africa.",
  "Morocco": "In North Africa, across the sea from Spain.",
  "Tunisia": "In North Africa, between Algeria and Libya.",
  "Libya": "In North Africa, on the Mediterranean Sea.",
  "Nigeria": "In West Africa — the most populous country in Africa.",
  "Ghana": "In West Africa, on the Atlantic Ocean.",
  "Ethiopia": "In East Africa.",
  "Tanzania": "In East Africa — Mount Kilimanjaro is here.",
  "Uganda": "In East Africa, on Lake Victoria.",
  "Madagascar": "A big island off the south-east coast of Africa.",
  "Zambia": "In southern Africa — Victoria Falls is here.",
  "Zimbabwe": "In southern Africa, next to Zambia.",
  "Botswana": "In southern Africa, north of South Africa.",
  "Namibia": "In southern Africa, on the Atlantic Ocean.",
  "Mozambique": "In south-east Africa, on the Indian Ocean.",
  "Angola": "In southern Africa, on the Atlantic Ocean.",
  "Cameroon": "In Central Africa, on the Atlantic Ocean.",
  "Senegal": "In West Africa — the westernmost country of Africa.",
  "Mali": "In West Africa — Timbuktu is here.",
  "Ivory Coast": "In West Africa, on the Atlantic Ocean.",
  "Fiji": "Islands in the Pacific Ocean, east of Australia.",
  "Papua New Guinea": "On the island of New Guinea, north of Australia.",
  "Peru": "In South America, on the Pacific Ocean — Machu Picchu is here.",
  "Colombia": "In South America, in the north-west — next to Panama.",
  "Venezuela": "In South America, on the Caribbean Sea.",
  "Ecuador": "In South America, on the Pacific Ocean — the Equator runs through it.",
  "Bolivia": "In South America — Sucre is its capital.",
  "Paraguay": "In South America, between Argentina and Brazil.",
  "Uruguay": "In South America, between Argentina and Brazil.",
  "Guyana": "In South America, on the Atlantic Ocean.",
  "Suriname": "In South America, on the Atlantic Ocean.",
  "Spain": "In Europe, next to Portugal and France.",
  "Italy": "In Europe — the boot kicking Sicily.",
  "Germany": "In Europe, next to France and Poland.",
  "Greece": "In Europe, on the Mediterranean Sea — Athens is its capital.",
  "Poland": "In Europe, east of Germany.",
  "Netherlands": "In Europe, on the North Sea — Amsterdam is its capital.",
  "Belgium": "In Europe, between France and the Netherlands.",
  "Switzerland": "In Europe, in the Alps.",
  "Austria": "In Europe, in the Alps — Vienna is its capital.",
  "Sweden": "In Europe, in Scandinavia.",
  "Norway": "In Europe, in Scandinavia — Oslo is its capital.",
  "Denmark": "In Europe, north of Germany.",
  "Finland": "In Europe, east of Sweden.",
  "Iceland": "An island in the North Atlantic, north-west of Europe.",
  "Ireland": "An island west of the United Kingdom.",
  "Portugal": "In Europe, west of Spain.",
  "Ukraine": "In Europe, east of Poland — Kyiv is its capital.",
  "Romania": "In Europe, on the Black Sea.",
  "Hungary": "In Europe, next to Austria.",
  "Czech Republic": "In Europe, next to Germany and Poland.",
  "Bulgaria": "In Europe, on the Black Sea.",
  "Croatia": "In Europe, on the Adriatic Sea.",
  "Serbia": "In Europe — Belgrade is its capital.",
  "Lithuania": "In Europe, on the Baltic Sea.",
  "Latvia": "In Europe, on the Baltic Sea.",
  "Estonia": "In Europe, on the Baltic Sea.",
  "Belarus": "In Europe, east of Poland.",
  "Moldova": "In Europe, between Romania and Ukraine.",
  "Slovakia": "In Europe, next to the Czech Republic.",
  "Slovenia": "In Europe, next to Italy and Austria.",
  "Bosnia and Herzegovina": "In Europe — Sarajevo is its capital.",
  "Albania": "In Europe, on the Adriatic Sea.",
  "North Macedonia": "In Europe — Skopje is its capital.",
  "Montenegro": "In Europe, on the Adriatic Sea.",
  "Malta": "A small island in the Mediterranean Sea, south of Italy.",
  "Luxembourg": "A small country in Europe, between France, Germany and Belgium.",
  "Monaco": "A tiny country in Europe, on the Mediterranean Sea.",
  "San Marino": "A tiny country inside Italy.",
  "Vatican City": "The smallest country in the world, inside Rome.",
  "Andorra": "A small country in Europe, between France and Spain.",
  "Liechtenstein": "A small country in Europe, between Switzerland and Austria.",
  "Cuba": "An island in the Caribbean Sea, south of the USA.",
  "Jamaica": "An island in the Caribbean Sea, south of Cuba.",
  "Haiti": "On the island of Hispaniola, in the Caribbean Sea.",
  "Dominican Republic": "On the island of Hispaniola, in the Caribbean Sea.",
  "Bahamas": "Islands in the Atlantic Ocean, south-east of Florida.",
  "Trinidad and Tobago": "Islands in the Caribbean Sea, north of Venezuela.",
  "Barbados": "An island in the Caribbean Sea.",
  "Costa Rica": "In Central America, between Nicaragua and Panama.",
  "Panama": "In Central America — the Panama Canal is here.",
  "Guatemala": "In Central America, south of Mexico.",
  "Belize": "In Central America, on the Caribbean Sea.",
  "Honduras": "In Central America, between Guatemala and Nicaragua.",
  "El Salvador": "In Central America, on the Pacific Ocean.",
  "Nicaragua": "In Central America, between Honduras and Costa Rica.",
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

// Asia groups — ALL 48 Asian countries (193 UN + Palestine + Vatican = 195;
// Taiwan is not in the 195, so it is not asked).
const ASIA_GROUPS = {
  "South Asia": ["India", "Pakistan", "Bangladesh", "Nepal", "Bhutan", "Sri Lanka", "Myanmar", "Maldives", "Afghanistan"],
  "Middle East (West Asia)": ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Oman", "Yemen", "Jordan", "Lebanon", "Syria", "Iraq", "Iran", "Turkey", "Israel", "Palestine", "Armenia", "Azerbaijan", "Georgia", "Cyprus", "Bahrain"],
  "Central Asia": ["Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Uzbekistan"],
  "East & South-East Asia": ["China", "Japan", "South Korea", "North Korea", "Mongolia", "Thailand", "Vietnam", "Malaysia", "Singapore", "Indonesia", "Philippines", "Brunei", "Cambodia", "Laos", "East Timor"],
};
const ASIA_REGION_OF = {};
for (const [g, list] of Object.entries(ASIA_GROUPS)) for (const c of list) ASIA_REGION_OF[c] = g;
if (Object.keys(ASIA_REGION_OF).length !== 48) throw new Error("Expected 48 Asia countries, got " + Object.keys(ASIA_REGION_OF).length);
for (const c of Object.keys(ASIA_REGION_OF)) if (CONTINENT_OF[c] !== "Asia") throw new Error(c + " is in an Asia group but not Asia in CONTINENT_OF");

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
  "s2-g13": "cont:India",
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

// ── Stage 1: Map-Reading Basics (10 originals + 7 + 19 new = 36) ──
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
add(1, mkQ("s1-g8", "medium", "Which line passes through the middle of India?", "Tropic of Cancer",
  ["Tropic of Capricorn", "Arctic Circle", "Equator"], "The Tropic of Cancer passes through the middle of India."));
add(1, mkQ("s1-g9", "medium", "Which line is south of the Equator?", "Tropic of Capricorn",
  ["Tropic of Cancer", "Arctic Circle", "Prime Meridian"], "The Tropic of Capricorn is south of the Equator. The Tropic of Cancer is north of it."));
add(1, mkQ("s1-g10", "medium", "Which circle is around the North Pole?", "Arctic Circle",
  ["Antarctic Circle", "Tropic of Cancer", "Equator"], "The Arctic Circle is around the North Pole. The Antarctic Circle is around the South Pole."));
add(1, mkQ("s1-g11", "medium", "Which circle is around the South Pole?", "Antarctic Circle",
  ["Arctic Circle", "Tropic of Capricorn", "Prime Meridian"], "The Antarctic Circle is around the South Pole."));
add(1, mkQ("s1-g12", "medium", "The Equator cuts the Earth into which two halves?", "Northern and Southern Hemispheres",
  ["Eastern and Western Hemispheres", "North and South Poles", "Land and Water"], "The Equator cuts the Earth into the Northern Hemisphere and the Southern Hemisphere."));
add(1, mkQ("s1-g13", "medium", "The Prime Meridian cuts the Earth into which two halves?", "Eastern and Western Hemispheres",
  ["Northern and Southern Hemispheres", "North and South Poles", "Land and Water"], "The Prime Meridian cuts the Earth into the Eastern Hemisphere and the Western Hemisphere."));
add(1, mkQ("s1-g14", "medium", "Which two hemispheres is India in?", "Northern and Eastern",
  ["Northern and Southern", "Southern and Western", "Eastern and Western"], "India is in the Northern Hemisphere and the Eastern Hemisphere."));
add(1, mkQ("s1-g15", "medium", "Which two hemispheres is Australia in?", "Southern and Eastern",
  ["Northern and Eastern", "Southern and Western", "Northern and Southern"], "Australia is in the Southern Hemisphere and the Eastern Hemisphere."));
add(1, mkQ("s1-g16", "hard", "Latitude is measured from 0 degrees to how many degrees?", "90 degrees",
  ["180 degrees", "45 degrees", "360 degrees"], "Latitude goes from 0 degrees (Equator) to 90 degrees (the poles)."));
add(1, mkQ("s1-g17", "hard", "Longitude is measured from 0 degrees to how many degrees?", "180 degrees",
  ["90 degrees", "45 degrees", "360 degrees"], "Longitude goes from 0 degrees (Prime Meridian) to 180 degrees."));
add(1, mkQ("s1-g18", "medium", "Which line is at 180 degrees, on the other side of the Earth from London?", "International Date Line",
  ["Equator", "Tropic of Cancer", "Arctic Circle"], "The International Date Line is at 180 degrees — where one day changes to the next."));
add(1, mkQ("s1-g19", "medium", "What does the scale of a map tell you?", "How far places really are",
  ["The rainfall", "The population", "The time of day"], "The scale tells you how far places really are — for example, 1 cm on the map = 100 km on the ground."));
add(1, mkQ("s1-g20", "hard", "When it is 12 noon in London, what is the time in India?", "5:30 in the evening",
  ["12 noon", "5:30 in the morning", "7:30 in the evening"], "India is 5 hours 30 minutes ahead of London. 12 noon in London = 5:30 in the evening in India."));
add(1, mkQ("s1-g21", "easy", "How many time zones does India have?", "One",
  ["Two", "Three", "Five"], "India has only one time zone — Indian Standard Time."));
add(1, mkQ("s1-g22", "easy", "What is a globe?", "A round model of the Earth",
  ["A flat book of maps", "A kind of compass", "A map of India only"], "A globe is a round model of the Earth — it shows the real shapes of countries."));
add(1, mkQ("s1-g23", "easy", "What is a book of maps called?", "An atlas",
  ["A globe", "A compass", "A dictionary"], "A book of maps is called an atlas."));
add(1, mkQ("s1-g24", "easy", "On a map, what does the colour BLUE usually mean?", "Water",
  ["Mountains", "Forests", "Deserts"], "On a map, blue means water — seas, rivers and lakes."));
add(1, mkQ("s1-g25", "easy", "On a map, what does the colour GREEN usually mean?", "Low land and plains",
  ["Water", "Mountains", "Deserts"], "On a map, green means low land and plains."));
add(1, mkQ("s1-g26", "easy", "On a map, what does the colour BROWN usually mean?", "Mountains and high land",
  ["Water", "Forests", "Deserts"], "On a map, brown means mountains and high land."));

// ── Stage 2: Continents & Oceans (10 originals + 13 + 201 new = 224) ──
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
  { map: { kind: "world", place: "Australia", where: "Australia", note: "The island continent, south-east of Asia." } }));
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
// EVERY country in its continent — one question per country (India is
// already asked as s2-g13, so it is skipped here via the cont:India fact).
// Continent names follow the concept book: Asia, Africa, Europe,
// North America, South America, Australia, Antarctica.
const CONTINENTS_7 = ["Asia", "Africa", "Europe", "North America", "South America", "Australia", "Antarctica"];
const CONT_EASY = new Set(["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Saudi Arabia", "UAE", "China", "Japan", "United States", "United Kingdom", "France", "Egypt", "Indonesia", "Malaysia", "Russia", "Brazil", "Argentina", "Mexico", "Italy", "Spain", "Germany", "Greece", "New Zealand", "South Africa", "Nigeria", "Kenya", "Thailand", "Vietnam", "Canada", "Australia", "Turkey"]);
const CONT_HARD = new Set(["Tuvalu", "Nauru", "Kiribati", "Palau", "Micronesia", "Marshall Islands", "Samoa", "Tonga", "Vanuatu", "Fiji", "Solomon Islands", "St. Kitts and Nevis", "St. Lucia", "St. Vincent and the Grenadines", "Dominica", "Grenada", "Antigua and Barbuda", "Barbados", "Belize", "Guyana", "Suriname", "Brunei", "East Timor", "Laos", "Mongolia", "Lesotho", "Eswatini", "Mauritius", "Seychelles", "Comoros", "Cape Verde", "Sao Tome and Principe", "Djibouti", "Eritrea", "Liechtenstein", "San Marino", "Monaco", "Andorra", "Malta", "Luxembourg", "Moldova", "Estonia", "Latvia", "Lithuania", "Slovenia", "Bosnia and Herzegovina", "Montenegro", "North Macedonia", "Albania", "Iceland"]);
for (const { country } of CAPITALS) {
  const cont = CONTINENT_OF[country];
  const answer = cont === "Europe and Asia" ? "Europe and Asia" : cont;
  const level = CONT_EASY.has(country) ? "easy" : CONT_HARD.has(country) ? "hard" : "medium";
  let distractors;
  if (cont === "Europe and Asia") {
    distractors = pickN(["Africa", "North America", "South America", "Australia", "Antarctica"], answer, 3, rng);
  } else {
    distractors = pickN(CONTINENTS_7, answer, 3, rng);
  }
  const point = country === "Australia"
    ? "Australia is both a country and a continent."
    : `${country} is in ${answer}.`;
  addFact(2, `cont:${country}`, mkQ(`s2-g-cont-${country.toLowerCase().replace(/[^a-z]+/g, "-")}`, level,
    `Which continent is ${country} in?`, answer, distractors, point,
    { map: { kind: "world", place: country, where: answer, note: COUNTRY_NOTE[country] || `In ${answer}.` } }));
}
// Seas and islands.
add(2, mkQ("s2-g-sea1", "hard", "Which is the second-largest island in the world?", "New Guinea",
  ["Borneo", "Madagascar", "Sumatra"], "New Guinea is the second-largest island in the world (after Greenland).",
  { map: { kind: "world", place: "New Guinea", where: "Australia", note: "North of Australia — the island of Papua New Guinea." } }));
add(2, mkQ("s2-g-sea2", "medium", "Madagascar is in which ocean?", "Indian Ocean",
  ["Pacific Ocean", "Atlantic Ocean", "Southern Ocean"], "Madagascar is a big island in the Indian Ocean, off Africa.",
  { map: { kind: "world", place: "Madagascar", where: "Africa", note: "A big island off the south-east coast of Africa." } }));
add(2, mkQ("s2-g-sea3", "medium", "Which sea is between India and Sri Lanka?", "Palk Strait",
  ["Arabian Sea", "Bay of Bengal", "Red Sea"], "The Palk Strait is between India and Sri Lanka.",
  { map: { kind: "india", place: "Palk Strait", where: "Between India and Sri Lanka", note: "Between India (Tamil Nadu) and Sri Lanka." } }));
add(2, mkQ("s2-g-sea4", "medium", "Which sea is between Australia and New Zealand?", "Tasman Sea",
  ["Coral Sea", "Timor Sea", "Indian Ocean"], "The Tasman Sea is between Australia and New Zealand.",
  { map: { kind: "world", place: "Tasman Sea", where: "Australia", note: "Between Australia and New Zealand." } }));
add(2, mkQ("s2-g-sea5", "medium", "Which sea is between the United Kingdom and France?", "English Channel",
  ["North Sea", "Irish Sea", "Mediterranean Sea"], "The English Channel is between the United Kingdom and France.",
  { map: { kind: "world", place: "English Channel", where: "Europe", note: "Between the United Kingdom and France." } }));
add(2, mkQ("s2-g-sea6", "hard", "Which sea is between Timor and Australia?", "Timor Sea",
  ["Arafura Sea", "Coral Sea", "Java Sea"], "The Timor Sea is between Timor (East Timor) and Australia.",
  { map: { kind: "world", place: "Timor Sea", where: "Australia", note: "Between East Timor and Australia." } }));
add(2, mkQ("s2-g-sea7", "medium", "Which ocean is between North America and Europe?", "Atlantic Ocean",
  ["Pacific Ocean", "Indian Ocean", "Southern Ocean"], "The Atlantic Ocean is between North America and Europe.",
  { map: { kind: "world", place: "Atlantic Ocean", where: "Between North America and Europe", note: "Between North America (west) and Europe and Africa (east)." } }));

// ── Stage 3: Asia (10 originals + 91 new = 101) ──
// One "which part of Asia?" question for EVERY country in the 4 groups.
const ASIA_CONTINENTS = ["Africa", "Europe", "North America"];
let asiaDistractor = 0;
for (const [group, countries] of Object.entries(ASIA_GROUPS)) {
  for (const c of countries) {
    const others = Object.keys(ASIA_GROUPS).filter((g) => g !== group);
    const fourth = ASIA_CONTINENTS[asiaDistractor++ % ASIA_CONTINENTS.length];
    addFact(3, `asia:${c}`, mkQ(`s3-g-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`, c === "India" || ["Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Bhutan", "Myanmar", "Saudi Arabia", "China", "Japan"].includes(c) ? "easy" : (["Maldives", "North Korea", "Mongolia", "Palestine", "Israel", "Lebanon", "Yemen"].includes(c) ? "hard" : "medium"),
      `Which part of Asia is ${c} in?`, group, [...others.slice(0, 2), fourth],
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
// "Which of these is NOT in X?" — for Middle East, East/SE Asia and
// Central Asia (South Asia NOT-in is already an original, s3-q7).
for (const group of ["Middle East (West Asia)", "East & South-East Asia", "Central Asia"]) {
  const out = ASIA_GROUPS[group];
  const inOthers = [];
  for (const [g2, list] of Object.entries(ASIA_GROUPS)) if (g2 !== group) inOthers.push(list[0]);
  const answer = shuffle(inOthers, rng)[0];
  addFact(3, `asia-not:${group}`, mkQ(`s3-g-not-${group.toLowerCase().replace(/[^a-z]+/g, "-")}`, "medium",
    `Which of these countries is NOT in ${group}?`, answer, shuffle(out, rng).slice(0, 3),
    `${answer} is not in ${group}.`));
}
// Neighbours: "Which of these countries shares a border with X?"
// The full neighbour list is used to build the distractors, so no
// distractor can also be a neighbour (the answer stays unique).
const NEIGHBOURS_OF = {
  "India": ["Pakistan", "China", "Nepal", "Bhutan", "Bangladesh", "Myanmar", "Afghanistan"],
  "Pakistan": ["India", "China", "Afghanistan", "Iran"],
  "Nepal": ["India", "China"],
  "Bhutan": ["India", "China"],
  "Myanmar": ["India", "Bangladesh", "China", "Thailand", "Laos"],
  "Thailand": ["Myanmar", "Laos", "Cambodia", "Malaysia"],
  "Vietnam": ["China", "Laos", "Cambodia"],
  "Cambodia": ["Thailand", "Laos", "Vietnam"],
  "Laos": ["China", "Myanmar", "Thailand", "Vietnam", "Cambodia"],
  "Malaysia": ["Thailand", "Singapore", "Brunei", "Indonesia"],
  "Indonesia": ["Papua New Guinea", "Malaysia", "East Timor"],
  "China": ["India", "Pakistan", "Afghanistan", "Tajikistan", "Kyrgyzstan", "Kazakhstan", "Mongolia", "Russia", "North Korea", "Nepal", "Bhutan", "Myanmar", "Laos", "Vietnam"],
  "Mongolia": ["China", "Russia"],
  "North Korea": ["China", "Russia", "South Korea"],
  "South Korea": ["North Korea"],
  "Saudi Arabia": ["Jordan", "Iraq", "Kuwait", "Qatar", "UAE", "Oman", "Yemen"],
  "Yemen": ["Saudi Arabia", "Oman"],
  "Oman": ["Saudi Arabia", "UAE", "Yemen"],
  "UAE": ["Saudi Arabia", "Oman"],
  "Qatar": ["Saudi Arabia"],
  "Kuwait": ["Saudi Arabia", "Iraq"],
  "Jordan": ["Syria", "Iraq", "Saudi Arabia", "Israel", "Palestine"],
  "Lebanon": ["Syria", "Israel"],
  "Syria": ["Turkey", "Iraq", "Jordan", "Lebanon", "Israel"],
  "Iraq": ["Turkey", "Syria", "Jordan", "Saudi Arabia", "Kuwait", "Iran"],
  "Iran": ["Turkmenistan", "Afghanistan", "Pakistan", "Iraq", "Turkey", "Armenia", "Azerbaijan"],
  "Turkey": ["Georgia", "Armenia", "Azerbaijan", "Iran", "Iraq", "Syria", "Greece", "Bulgaria"],
  "Israel": ["Lebanon", "Syria", "Jordan", "Egypt", "Palestine"],
  "Afghanistan": ["Turkmenistan", "Uzbekistan", "Tajikistan", "China", "Pakistan", "Iran"],
  "Kazakhstan": ["Russia", "China", "Kyrgyzstan", "Uzbekistan", "Turkmenistan"],
};
const NEIGHBOUR_Q = [
  ["India", "Pakistan"], ["Pakistan", "Iran"], ["Nepal", "China"], ["Bhutan", "India"],
  ["Myanmar", "Thailand"], ["Thailand", "Malaysia"], ["Vietnam", "Cambodia"], ["Cambodia", "Laos"],
  ["Laos", "Vietnam"], ["Malaysia", "Thailand"], ["Indonesia", "Malaysia"], ["China", "Mongolia"],
  ["Mongolia", "China"], ["North Korea", "South Korea"], ["South Korea", "North Korea"],
  ["Saudi Arabia", "Yemen"], ["Yemen", "Oman"], ["Oman", "UAE"], ["UAE", "Saudi Arabia"],
  ["Qatar", "Saudi Arabia"], ["Kuwait", "Iraq"], ["Jordan", "Israel"], ["Lebanon", "Syria"],
  ["Syria", "Turkey"], ["Iraq", "Iran"], ["Iran", "Turkmenistan"], ["Turkey", "Georgia"],
  ["Israel", "Lebanon"], ["Afghanistan", "Pakistan"], ["Kazakhstan", "Uzbekistan"],
];
const ASIA_ALL = Object.keys(ASIA_REGION_OF);
for (const [country, neighbour] of NEIGHBOUR_Q) {
  const notNeighbours = ASIA_ALL.filter((c) => c !== country && c !== neighbour && !NEIGHBOURS_OF[country].includes(c));
  addFact(3, `neigh:${country}`, mkQ(`s3-g-neigh-${country.toLowerCase().replace(/[^a-z]+/g, "-")}`, "medium",
    `Which of these countries shares a border with ${country}?`, neighbour,
    pickN(notNeighbours, neighbour, 3, rng),
    `${neighbour} shares a border with ${country}.`,
    { map: { kind: "world", place: neighbour, where: ASIA_REGION_OF[neighbour] || CONTINENT_OF[neighbour], note: COUNTRY_NOTE[neighbour] || `Next to ${country}.` } }));
}
// Asia features.
add(3, mkQ("s3-g-pop", "medium", "Which Asian country has the largest population?", "India",
  ["China", "Indonesia", "Pakistan"], "India has the largest population in Asia — and in the world."));
add(3, mkQ("s3-g-mideast-big", "medium", "Which is the largest country in the Middle East?", "Saudi Arabia",
  ["Iran", "Iraq", "Turkey"], "Saudi Arabia is the largest country in the Middle East."));
add(3, mkQ("s3-g-turkey2", "medium", "Turkey is between which two continents?", "Europe and Asia",
  ["Asia and Africa", "Europe and Africa", "Asia and Australia"], "Turkey is between Europe and Asia — Istanbul is in both."));
add(3, mkQ("s3-g-rising-sun", "easy", "Which country is called the Land of the Rising Sun?", "Japan",
  ["China", "South Korea", "Thailand"], "Japan is called the Land of the Rising Sun."));
add(3, mkQ("s3-g-thunder", "medium", "Which country is called the Land of the Thunder Dragon?", "Bhutan",
  ["Nepal", "Myanmar", "Thailand"], "Bhutan is called the Land of the Thunder Dragon."));
add(3, mkQ("s3-g-morning-calm", "medium", "Which country is called the Land of the Morning Calm?", "South Korea",
  ["North Korea", "Japan", "China"], "South Korea is called the Land of the Morning Calm."));
add(3, mkQ("s3-g-south-hemi", "hard", "Which Asian country is entirely in the Southern Hemisphere?", "East Timor",
  ["Indonesia", "Malaysia", "Singapore"], "East Timor is entirely south of the Equator, in the Southern Hemisphere."));
add(3, mkQ("s3-g-most-islands", "medium", "Which Asian country has the most islands?", "Indonesia",
  ["Philippines", "Japan", "Maldives"], "Indonesia has the most islands of any Asian country — about 17,000 islands."));

// ── Stage 4: World Capitals (10 originals + 380 new = 390) ──
// BOTH ways for all 195 countries; skip country->capital already asked.
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

// ── Stage 6: Rivers & Mountains (10 originals + 13 + 57 new = 80) ──
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
// More land neighbours of India.
for (const nb of ["China", "Bhutan", "Myanmar", "Afghanistan"]) {
  add(6, mkQ(`s6-g-neigh-${nb.toLowerCase()}`, "easy",
    `Which of these is a land neighbour of India?`, nb,
    shuffle(["Thailand", "Vietnam", "Malaysia", "Japan"], rng).slice(0, 3),
    `${nb} is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.`,
    { map: { kind: "world", place: nb, where: "South Asia", note: COUNTRY_NOTE[nb] || `In South Asia, next to India.` } }));
}
add(6, mkQ("s6-g-maldives", "medium", "Which country is India's island neighbour in the south-west?", "Maldives",
  ["Thailand", "Myanmar", "Japan"], "Maldives is India's island neighbour in the south-west, in the Indian Ocean.",
  { map: { kind: "world", place: "Maldives", where: "South Asia", note: "Small islands in the Indian Ocean, south-west of India." } }));
// Longest river on each continent (Nile is already asked in Stage 8).
add(6, mkQ("s6-g-amazon-longest", "medium", "Which is the longest river in South America?", "Amazon",
  ["Parana", "Orinoco", "Sao Francisco"], "The Amazon (about 6,400 km) is the longest river in South America — and the second-longest in the world.",
  { map: { kind: "world", place: "Amazon River", where: "South America", note: "In South America — it flows into the Atlantic Ocean." } }));
add(6, mkQ("s6-g-yangtze-longest", "medium", "Which is the longest river in Asia?", "Yangtze",
  ["Mekong", "Yellow River", "Indus"], "The Yangtze (about 6,300 km) is the longest river in Asia. It is in China.",
  { map: { kind: "world", place: "Yangtze River", where: "Asia", note: "In China — the longest river in Asia." } }));
add(6, mkQ("s6-g-mississippi-longest", "medium", "Which is the longest river in North America?", "Mississippi",
  ["Missouri", "Colorado", "Rio Grande"], "The Mississippi (about 3,766 km) is the longest river in North America.",
  { map: { kind: "world", place: "Mississippi River", where: "North America", note: "In the USA — it flows into the Gulf of Mexico." } }));
add(6, mkQ("s6-g-volga-longest", "medium", "Which is the longest river in Europe?", "Volga",
  ["Danube", "Rhine", "Thames"], "The Volga (about 3,530 km) is the longest river in Europe. It is in Russia.",
  { map: { kind: "world", place: "Volga River", where: "Europe", note: "In Russia — it flows into the Caspian Sea." } }));
add(6, mkQ("s6-g-murray-longest", "medium", "Which is the longest river in Australia?", "Murray",
  ["Darling", "Murrumbidgee", "Lachlan"], "The Murray (about 2,508 km) is the longest river in Australia.",
  { map: { kind: "world", place: "Murray River", where: "Australia", note: "In south-east Australia." } }));
// Highest mountain on each continent (Everest is already asked).
add(6, mkQ("s6-g-aconcagua", "medium", "Which is the highest mountain in South America?", "Aconcagua",
  ["Mount Kilimanjaro", "Mount Elbrus", "Denali"], "Aconcagua (6,961 m) in Argentina is the highest mountain in South America.",
  { map: { kind: "world", place: "Aconcagua", where: "South America", note: "In Argentina, in the Andes." } }));
add(6, mkQ("s6-g-denali", "medium", "Which is the highest mountain in North America?", "Denali",
  ["Mount Logan", "Mount Whitney", "Mount Kilimanjaro"], "Denali (6,190 m) in the USA is the highest mountain in North America.",
  { map: { kind: "world", place: "Denali", where: "North America", note: "In Alaska, USA." } }));
add(6, mkQ("s6-g-kilimanjaro", "medium", "Which is the highest mountain in Africa?", "Kilimanjaro",
  ["Mount Kenya", "Mount Elbrus", "Aconcagua"], "Kilimanjaro (5,895 m) in Tanzania is the highest mountain in Africa.",
  { map: { kind: "world", place: "Kilimanjaro", where: "Africa", note: "In Tanzania, in East Africa." } }));
add(6, mkQ("s6-g-elbrus", "medium", "Which is the highest mountain in Europe?", "Elbrus",
  ["Mont Blanc", "Mount Kilimanjaro", "Denali"], "Mount Elbrus (5,642 m) in Russia is the highest mountain in Europe.",
  { map: { kind: "world", place: "Mount Elbrus", where: "Europe", note: "In Russia, in the Caucasus." } }));
add(6, mkQ("s6-g-vinson", "hard", "Which is the highest mountain in Antarctica?", "Vinson",
  ["Mount Erebus", "Mount Kilimanjaro", "Aconcagua"], "Mount Vinson (4,892 m) is the highest mountain in Antarctica.",
  { map: { kind: "world", place: "Mount Vinson", where: "Antarctica", note: "In Antarctica, at the South Pole." } }));
add(6, mkQ("s6-g-puncak", "hard", "Which is the highest mountain in Oceania?", "Puncak Jaya",
  ["Mount Kosciuszko", "Mount Cook", "Mount Wilhelm"], "Puncak Jaya (4,884 m) in Indonesia is the highest mountain in Oceania. Mount Kosciuszko (2,228 m) is the highest on mainland Australia.",
  { map: { kind: "world", place: "Puncak Jaya", where: "Australia", note: "In Indonesia, on the island of New Guinea." } }));
// Mountain ranges of the world.
add(6, mkQ("s6-g-alps", "medium", "The Alps are in which continent?", "Europe",
  ["Asia", "Africa", "North America"], "The Alps are the mountains of Europe — Mont Blanc is the highest peak in the Alps.",
  { map: { kind: "world", place: "The Alps", where: "Europe", note: "Across Europe — France, Switzerland, Italy and Austria." } }));
add(6, mkQ("s6-g-rockies", "medium", "The Rocky Mountains are in which continent?", "North America",
  ["South America", "Europe", "Asia"], "The Rocky Mountains are in North America — in the USA and Canada.",
  { map: { kind: "world", place: "Rocky Mountains", where: "North America", note: "In the USA and Canada." } }));
add(6, mkQ("s6-g-atlas", "medium", "The Atlas Mountains are in which continent?", "Africa",
  ["Asia", "Europe", "South America"], "The Atlas Mountains are in North Africa — in Morocco, Algeria and Tunisia.",
  { map: { kind: "world", place: "Atlas Mountains", where: "Africa", note: "In North Africa — Morocco, Algeria and Tunisia." } }));
add(6, mkQ("s6-g-dividing", "medium", "The Great Dividing Range is in which country?", "Australia",
  ["New Zealand", "South Africa", "India"], "The Great Dividing Range is in Australia, along the east coast.",
  { map: { kind: "world", place: "Great Dividing Range", where: "Australia", note: "Along the east coast of Australia." } }));
add(6, mkQ("s6-g-urals", "hard", "Which mountain range separates Europe and Asia?", "Ural Mountains",
  ["Alps", "Himalayas", "Andes"], "The Ural Mountains separate Europe and Asia, in Russia.",
  { map: { kind: "world", place: "Ural Mountains", where: "Europe and Asia", note: "In Russia, between Europe and Asia." } }));
// Deserts of the world.
add(6, mkQ("s6-g-gobi", "medium", "The Gobi Desert is in which continent?", "Asia",
  ["Africa", "Australia", "North America"], "The Gobi Desert is in Asia — in China and Mongolia.",
  { map: { kind: "world", place: "Gobi Desert", where: "Asia", note: "In China and Mongolia." } }));
add(6, mkQ("s6-g-kalahari", "medium", "The Kalahari Desert is in which continent?", "Africa",
  ["Asia", "Australia", "South America"], "The Kalahari Desert is in southern Africa — in Botswana, Namibia and South Africa.",
  { map: { kind: "world", place: "Kalahari Desert", where: "Africa", note: "In southern Africa." } }));
add(6, mkQ("s6-g-arabian-desert", "medium", "The Arabian Desert is in which continent?", "Asia",
  ["Africa", "Australia", "Europe"], "The Arabian Desert is in Asia — on the Arabian Peninsula, in Saudi Arabia.",
  { map: { kind: "world", place: "Arabian Desert", where: "Asia", note: "On the Arabian Peninsula, in Saudi Arabia." } }));
add(6, mkQ("s6-g-mojave", "hard", "The Mojave Desert is in which country?", "United States",
  ["Mexico", "Australia", "Egypt"], "The Mojave Desert is in the United States, in California.",
  { map: { kind: "world", place: "Mojave Desert", where: "North America", note: "In California, USA." } }));
add(6, mkQ("s6-g-great-victoria", "hard", "Which is the largest desert in Australia?", "Great Victoria Desert",
  ["Gibson Desert", "Simpson Desert", "Sahara Desert"], "The Great Victoria Desert is the largest desert in Australia.",
  { map: { kind: "world", place: "Great Victoria Desert", where: "Australia", note: "In Australia." } }));
// Lakes of the world.
add(6, mkQ("s6-g-wular", "medium", "Which is the largest freshwater lake in India?", "Wular Lake",
  ["Dal Lake", "Chilika Lake", "Sambhar Lake"], "Wular Lake, in Jammu and Kashmir, is the largest freshwater lake in India.",
  { map: { kind: "india", place: "Wular Lake", where: "North India", note: "In Jammu and Kashmir, in the north of India." } }));
add(6, mkQ("s6-g-tanganyika", "hard", "Which is the second-deepest lake in the world?", "Lake Tanganyika",
  ["Lake Victoria", "Lake Superior", "Caspian Sea"], "Lake Tanganyika, in Africa, is the second-deepest lake in the world (after Lake Baikal).",
  { map: { kind: "world", place: "Lake Tanganyika", where: "Africa", note: "In East Africa, between Tanzania and Congo." } }));
add(6, mkQ("s6-g-great-lakes", "medium", "The Great Lakes are in which continent?", "North America",
  ["Europe", "Africa", "Asia"], "The Great Lakes — Superior, Michigan, Huron, Erie and Ontario — are in North America.",
  { map: { kind: "world", place: "Great Lakes", where: "North America", note: "Between the USA and Canada." } }));
add(6, mkQ("s6-g-dead-sea", "medium", "Which lake is so salty that you can float in it?", "Dead Sea",
  ["Caspian Sea", "Lake Baikal", "Lake Victoria"], "The Dead Sea, between Israel and Jordan, is so salty that you can float in it.",
  { map: { kind: "world", place: "Dead Sea", where: "Asia", note: "Between Israel and Jordan — the lowest place on land." } }));
// Waterfalls of the world.
add(6, mkQ("s6-g-niagara", "medium", "Niagara Falls is between which two countries?", "United States and Canada",
  ["USA and Mexico", "Canada and Mexico", "USA and Brazil"], "Niagara Falls is between the United States and Canada.",
  { map: { kind: "world", place: "Niagara Falls", where: "North America", note: "Between the USA and Canada." } }));
add(6, mkQ("s6-g-victoria-falls", "medium", "Victoria Falls is on the border of which two countries?", "Zambia and Zimbabwe",
  ["Kenya and Tanzania", "Zambia and Namibia", "South Africa and Botswana"], "Victoria Falls is on the border of Zambia and Zimbabwe, in Africa.",
  { map: { kind: "world", place: "Victoria Falls", where: "Africa", note: "On the border of Zambia and Zimbabwe." } }));
add(6, mkQ("s6-g-jog", "medium", "Which is the highest waterfall in India?", "Jog Falls",
  ["Athirappilly Falls", "Dudhsagar Falls", "Chitrakote Falls"], "Jog Falls, in Karnataka, is the highest waterfall in India.",
  { map: { kind: "india", place: "Jog Falls", where: "South India (Karnataka)", note: "In Karnataka, in South India." } }));
// Famous rivers and the cities and countries they flow through.
add(6, mkQ("s6-g-thames", "easy", "Which river flows through London?", "Thames",
  ["Seine", "Danube", "Rhine"], "The River Thames flows through London, in the United Kingdom.",
  { map: { kind: "world", place: "Thames River", where: "Europe", note: "In England — it flows through London." } }));
add(6, mkQ("s6-g-seine", "easy", "Which river flows through Paris?", "Seine",
  ["Thames", "Danube", "Rhine"], "The River Seine flows through Paris, in France.",
  { map: { kind: "world", place: "Seine River", where: "Europe", note: "In France — it flows through Paris." } }));
add(6, mkQ("s6-g-danube-vienna", "medium", "Which river flows through Vienna?", "Danube",
  ["Rhine", "Volga", "Thames"], "The River Danube flows through Vienna, in Austria.",
  { map: { kind: "world", place: "Danube River", where: "Europe", note: "In Europe — it flows through Vienna." } }));
add(6, mkQ("s6-g-rhine", "medium", "Which river flows through Germany and the Netherlands?", "Rhine",
  ["Danube", "Seine", "Volga"], "The River Rhine flows through Germany and the Netherlands, into the North Sea.",
  { map: { kind: "world", place: "Rhine River", where: "Europe", note: "In Germany and the Netherlands." } }));
add(6, mkQ("s6-g-mekong", "medium", "The Mekong flows through which part of Asia?", "South-East Asia",
  ["South Asia", "Central Asia", "East Asia"], "The Mekong flows through South-East Asia — China, Myanmar, Laos, Thailand, Cambodia and Vietnam.",
  { map: { kind: "world", place: "Mekong River", where: "East & South-East Asia", note: "In South-East Asia." } }));
add(6, mkQ("s6-g-indus", "medium", "Which river flows through Pakistan?", "Indus",
  ["Ganga", "Brahmaputra", "Yamuna"], "The River Indus flows through Pakistan.",
  { map: { kind: "world", place: "Indus River", where: "Asia", note: "In Pakistan." } }));
add(6, mkQ("s6-g-tigris-euphrates", "medium", "Which two rivers flow through Iraq?", "Tigris and Euphrates",
  ["Nile and Indus", "Ganga and Yamuna", "Danube and Rhine"], "The Tigris and the Euphrates flow through Iraq.",
  { map: { kind: "world", place: "Tigris River", where: "Iraq", note: "In Iraq — the Tigris flows through Baghdad." } }));
add(6, mkQ("s6-g-yellow", "medium", "The Yellow River is in which country?", "China",
  ["India", "Mongolia", "Vietnam"], "The Yellow River is in China.",
  { map: { kind: "world", place: "Yellow River", where: "Asia", note: "In China." } }));
add(6, mkQ("s6-g-godavari", "medium", "Which is the longest river in South India?", "Godavari",
  ["Krishna", "Kaveri", "Narmada"], "The Godavari is the longest river in South India.",
  { map: { kind: "india", place: "Godavari River", where: "South India", note: "In South India." } }));
add(6, mkQ("s6-g-yamuna-delhi", "medium", "Which river flows through New Delhi?", "Yamuna",
  ["Ganga", "Narmada", "Godavari"], "The River Yamuna flows through New Delhi.",
  { map: { kind: "india", place: "Yamuna River", where: "North India", note: "In North India — it flows through New Delhi." } }));
// Where the highest mountains stand.
add(6, mkQ("s6-g-kili-country", "medium", "Mount Kilimanjaro is in which country?", "Tanzania",
  ["Kenya", "Uganda", "Ethiopia"], "Mount Kilimanjaro is in Tanzania, in East Africa.",
  { map: { kind: "world", place: "Kilimanjaro", where: "Africa", note: "In Tanzania, in East Africa." } }));
add(6, mkQ("s6-g-acon-country", "medium", "Aconcagua is in which country?", "Argentina",
  ["Chile", "Peru", "Brazil"], "Aconcagua is in Argentina, in South America.",
  { map: { kind: "world", place: "Aconcagua", where: "South America", note: "In Argentina, in the Andes." } }));
add(6, mkQ("s6-g-denali-country", "medium", "Denali is in which country?", "United States",
  ["Canada", "Mexico", "Russia"], "Denali is in the United States (Alaska), in North America.",
  { map: { kind: "world", place: "Denali", where: "North America", note: "In Alaska, USA." } }));
add(6, mkQ("s6-g-elbrus-country", "medium", "Mount Elbrus is in which country?", "Russia",
  ["Georgia", "Turkey", "Ukraine"], "Mount Elbrus is in Russia, in Europe.",
  { map: { kind: "world", place: "Mount Elbrus", where: "Europe", note: "In Russia, in the Caucasus." } }));
add(6, mkQ("s6-g-puncak-country", "medium", "Puncak Jaya is in which country?", "Indonesia",
  ["Malaysia", "Papua New Guinea", "Australia"], "Puncak Jaya is in Indonesia, in Oceania.",
  { map: { kind: "world", place: "Puncak Jaya", where: "Australia", note: "In Indonesia, on the island of New Guinea." } }));
// More water and land.
add(6, mkQ("s6-g-majuli", "medium", "Which is the largest river island in the world?", "Majuli",
  ["Sri Lanka", "Madagascar", "Borneo"], "Majuli, in Assam on the Brahmaputra, is the largest river island in the world.",
  { map: { kind: "india", place: "Majuli", where: "North-East India (Assam)", note: "In Assam, on the Brahmaputra river." } }));
add(6, mkQ("s6-g-philippine-sea", "hard", "Which is the largest sea in the world?", "Philippine Sea",
  ["Arabian Sea", "South China Sea", "Mediterranean Sea"], "The Philippine Sea, east of the Philippines, is the largest sea in the world.",
  { map: { kind: "world", place: "Philippine Sea", where: "Asia", note: "East of the Philippines, in the Pacific Ocean." } }));
add(6, mkQ("s6-g-deepest-ocean", "medium", "Which is the deepest ocean?", "Pacific Ocean",
  ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], "The Pacific Ocean is the deepest ocean — the Mariana Trench is in it.",
  { map: { kind: "world", place: "Pacific Ocean", where: "East of Asia", note: "East of Asia — the largest and deepest ocean." } }));
add(6, mkQ("s6-g-tigris-baghdad", "medium", "Which river flows through Baghdad?", "Tigris",
  ["Euphrates", "Nile", "Indus"], "The River Tigris flows through Baghdad, in Iraq.",
  { map: { kind: "world", place: "Tigris River", where: "Iraq", note: "In Iraq — the Tigris flows through Baghdad." } }));
add(6, mkQ("s6-g-tiber", "medium", "Which river flows through Rome?", "Tiber",
  ["Po", "Arno", "Danube"], "The River Tiber flows through Rome, in Italy.",
  { map: { kind: "world", place: "Tiber River", where: "Europe", note: "In Italy — it flows through Rome." } }));
add(6, mkQ("s6-g-spree", "hard", "Which river flows through Berlin?", "Spree",
  ["Rhine", "Danube", "Elbe"], "The River Spree flows through Berlin, in Germany.",
  { map: { kind: "world", place: "Spree River", where: "Europe", note: "In Germany — it flows through Berlin." } }));
add(6, mkQ("s6-g-chihuahuan", "hard", "Which is the largest desert in North America?", "Chihuahuan Desert",
  ["Mojave Desert", "Sonoran Desert", "Great Basin Desert"], "The Chihuahuan Desert, in Mexico and the USA, is the largest desert in North America.",
  { map: { kind: "world", place: "Chihuahuan Desert", where: "North America", note: "In Mexico and the USA." } }));
add(6, mkQ("s6-g-baikal-country", "medium", "Lake Baikal is in which country?", "Russia",
  ["Mongolia", "China", "Kazakhstan"], "Lake Baikal, the deepest lake in the world, is in Russia.",
  { map: { kind: "world", place: "Lake Baikal", where: "Europe and Asia", note: "In Russia, in Siberia." } }));
add(6, mkQ("s6-g-titicaca", "hard", "Which is the largest lake in South America?", "Lake Titicaca",
  ["Lake Maracaibo", "Lake Poopo", "Lake Argentino"], "Lake Titicaca, between Peru and Bolivia, is the largest lake in South America.",
  { map: { kind: "world", place: "Lake Titicaca", where: "South America", note: "Between Peru and Bolivia, high in the Andes." } }));

// ── Stage 7: Holy Places (10 originals + 10 + 45 new = 65) ──
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
// Holy places + famous landmarks of the world — one question each.
// [place, ask ("city"|"country"), answer, distractors, point, mapPlace, where, note, level]
const PLACES7 = [
  ["Dome of the Rock", "city", "Jerusalem", ["Bethlehem", "Nazareth", "Hebron"], "The Dome of the Rock is in Jerusalem, in Palestine.", "Jerusalem", "Palestine", "In Palestine, on the east side of the Mediterranean Sea.", "hard"],
  ["Western Wall", "city", "Jerusalem", ["Bethlehem", "Tel Aviv", "Haifa"], "The Western Wall is in Jerusalem, in Palestine.", "Jerusalem", "Palestine", "In Palestine, on the east side of the Mediterranean Sea.", "hard"],
  ["Church of the Holy Sepulchre", "city", "Jerusalem", ["Bethlehem", "Nazareth", "Cairo"], "The Church of the Holy Sepulchre is in Jerusalem, in Palestine.", "Jerusalem", "Palestine", "In Palestine, on the east side of the Mediterranean Sea.", "hard"],
  ["Bethlehem", "country", "Palestine", ["Israel", "Jordan", "Syria"], "Bethlehem is in Palestine — the birthplace of Jesus (Isa AS).", "Bethlehem", "Palestine", "In Palestine, south of Jerusalem.", "medium"],
  ["Masjid al-Haram", "city", "Makkah", ["Madinah", "Jerusalem", "Cairo"], "Masjid al-Haram, the largest mosque in the world, is in Makkah.", "Makkah", "Saudi Arabia", "In Saudi Arabia, on the western side, near the Red Sea.", "easy"],
  ["The Ka'ba", "city", "Makkah", ["Madinah", "Jerusalem", "Baghdad"], "The Ka'ba is in Makkah, in Saudi Arabia.", "Makkah", "Saudi Arabia", "In Saudi Arabia, on the western side, near the Red Sea.", "easy"],
  ["Hagia Sophia", "city", "Istanbul", ["Ankara", "Cairo", "Baghdad"], "Hagia Sophia is in Istanbul, in Turkey.", "Istanbul", "Turkey", "In Turkey, between Europe and Asia.", "medium"],
  ["Blue Mosque", "city", "Istanbul", ["Ankara", "Cairo", "Damascus"], "The Blue Mosque is in Istanbul, in Turkey.", "Istanbul", "Turkey", "In Turkey, between Europe and Asia.", "medium"],
  ["Sheikh Zayed Grand Mosque", "city", "Abu Dhabi", ["Dubai", "Doha", "Riyadh"], "The Sheikh Zayed Grand Mosque is in Abu Dhabi, in the UAE.", "Abu Dhabi", "UAE", "On the Arabian Peninsula, next to Saudi Arabia and Oman.", "medium"],
  ["Qom", "country", "Iran", ["Iraq", "Turkey", "Afghanistan"], "Qom is a holy city in Iran.", "Qom", "Iran", "In Iran, south of Tehran.", "hard"],
  ["Mashhad", "country", "Iran", ["Iraq", "Turkey", "Syria"], "Mashhad is a holy city in Iran.", "Mashhad", "Iran", "In Iran, in the north-east.", "hard"],
  ["Kairouan", "country", "Tunisia", ["Morocco", "Algeria", "Libya"], "Kairouan is a holy city in Tunisia, in North Africa.", "Kairouan", "Tunisia", "In Tunisia, in North Africa.", "hard"],
  ["Timbuktu", "country", "Mali", ["Niger", "Senegal", "Algeria"], "Timbuktu is a famous old city in Mali, in West Africa.", "Timbuktu", "Mali", "In Mali, in West Africa.", "hard"],
  ["Lalibela", "country", "Ethiopia", ["Kenya", "Sudan", "Egypt"], "Lalibela, with its rock churches, is in Ethiopia.", "Lalibela", "Ethiopia", "In Ethiopia, in East Africa.", "hard"],
  ["Golden Temple", "city", "Amritsar", ["Delhi", "Lahore", "Jaipur"], "The Golden Temple is in Amritsar, in Punjab, India.", "Amritsar", "India", "In Punjab, in North India.", "medium"],
  ["Varanasi", "country", "India", ["Nepal", "Bangladesh", "Pakistan"], "Varanasi, on the Ganga, is a holy city in India.", "Varanasi", "India", "In Uttar Pradesh, on the Ganga.", "medium"],
  ["Bodh Gaya", "country", "India", ["Nepal", "Sri Lanka", "Myanmar"], "Bodh Gaya, where the Buddha became enlightened, is in India.", "Bodh Gaya", "India", "In Bihar, in East India.", "medium"],
  ["Tirupati", "country", "India", ["Nepal", "Sri Lanka", "Bangladesh"], "Tirupati, with its famous temple, is in India (Andhra Pradesh).", "Tirupati", "India", "In Andhra Pradesh, in South India.", "medium"],
  ["Ajmer Sharif", "country", "India", ["Pakistan", "Bangladesh", "Nepal"], "Ajmer Sharif, the dargah of Khwaja Moinuddin Chishti, is in India (Rajasthan).", "Ajmer", "India", "In Rajasthan, in West India.", "medium"],
  ["Angkor Wat", "country", "Cambodia", ["Thailand", "Vietnam", "Laos"], "Angkor Wat, the largest temple in the world, is in Cambodia.", "Angkor Wat", "Cambodia", "In Cambodia, in South-East Asia.", "medium"],
  ["Borobudur", "country", "Indonesia", ["Malaysia", "Thailand", "Philippines"], "Borobudur, the largest Buddhist temple, is in Indonesia.", "Borobudur", "Indonesia", "In Indonesia, on the island of Java.", "medium"],
  ["Shwedagon Pagoda", "city", "Yangon", ["Mandalay", "Bangkok", "Hanoi"], "The Shwedagon Pagoda is in Yangon, in Myanmar.", "Yangon", "Myanmar", "In Myanmar, in South-East Asia.", "hard"],
  ["Temple of Heaven", "city", "Beijing", ["Shanghai", "Xian", "Nanjing"], "The Temple of Heaven is in Beijing, in China.", "Beijing", "China", "In China — the big country north-east of India.", "hard"],
  ["Mount Sinai", "country", "Egypt", ["Israel", "Jordan", "Saudi Arabia"], "Mount Sinai, where Musa (AS) received the Torah, is in Egypt.", "Mount Sinai", "Egypt", "In Egypt, on the Sinai Peninsula.", "medium"],
  ["St Peter's Basilica", "country", "Vatican City", ["Italy", "France", "Spain"], "St Peter's Basilica is in Vatican City, inside Rome.", "Vatican City", "Europe", "Inside Rome, in Italy — the smallest country in the world.", "medium"],
  ["Eiffel Tower", "country", "France", ["Italy", "Spain", "United Kingdom"], "The Eiffel Tower is in France, in Paris.", "Eiffel Tower", "France", "In Paris, France.", "easy"],
  ["Big Ben", "country", "United Kingdom", ["France", "Ireland", "Netherlands"], "Big Ben is in the United Kingdom, in London.", "Big Ben", "United Kingdom", "In London, England.", "easy"],
  ["Statue of Liberty", "country", "United States", ["Canada", "France", "United Kingdom"], "The Statue of Liberty is in the United States, in New York.", "Statue of Liberty", "United States", "In New York, USA.", "easy"],
  ["Great Wall", "country", "China", ["India", "Japan", "Mongolia"], "The Great Wall is in China — the longest wall in the world.", "Great Wall", "China", "In China — the big country north-east of India.", "easy"],
  ["Taj Mahal", "city", "Agra", ["Delhi", "Jaipur", "Lucknow"], "The Taj Mahal is in Agra, in India.", "Agra", "India", "In Uttar Pradesh, in North India.", "easy"],
  ["Pyramids of Giza", "country", "Egypt", ["Sudan", "Iraq", "Turkey"], "The Pyramids of Giza are in Egypt, near Cairo.", "Pyramids of Giza", "Egypt", "In Egypt, near Cairo, on the Nile.", "easy"],
  ["The Sphinx", "country", "Egypt", ["Sudan", "Iraq", "Greece"], "The Great Sphinx is in Egypt, near the Pyramids of Giza.", "The Sphinx", "Egypt", "In Egypt, near Cairo.", "medium"],
  ["Colosseum", "city", "Rome", ["Athens", "Madrid", "Paris"], "The Colosseum is in Rome, in Italy.", "Rome", "Italy", "In Italy — the boot kicking Sicily.", "easy"],
  ["Leaning Tower of Pisa", "country", "Italy", ["France", "Spain", "Greece"], "The Leaning Tower of Pisa is in Italy.", "Pisa", "Italy", "In Italy, in the city of Pisa.", "medium"],
  ["Sydney Opera House", "country", "Australia", ["New Zealand", "United Kingdom", "Canada"], "The Sydney Opera House is in Australia, in Sydney.", "Sydney", "Australia", "In Sydney, Australia.", "medium"],
  ["Brandenburg Gate", "city", "Berlin", ["Munich", "Vienna", "Paris"], "The Brandenburg Gate is in Berlin, in Germany.", "Berlin", "Germany", "In Germany, in the city of Berlin.", "medium"],
  ["Red Square", "city", "Moscow", ["St Petersburg", "Kyiv", "Minsk"], "Red Square is in Moscow, in Russia.", "Moscow", "Russia", "In Russia — the biggest country.", "medium"],
  ["Christ the Redeemer", "city", "Rio de Janeiro", ["Sao Paulo", "Buenos Aires", "Lima"], "Christ the Redeemer is in Rio de Janeiro, in Brazil.", "Rio de Janeiro", "Brazil", "In Brazil, the biggest country in South America.", "medium"],
  ["Machu Picchu", "country", "Peru", ["Chile", "Bolivia", "Ecuador"], "Machu Picchu, the old Inca city, is in Peru.", "Machu Picchu", "Peru", "In Peru, in the Andes.", "medium"],
  ["Chichen Itza", "country", "Mexico", ["Guatemala", "Belize", "Honduras"], "Chichen Itza, the old Maya city, is in Mexico.", "Chichen Itza", "Mexico", "In Mexico, south of the USA.", "medium"],
  ["Petra", "country", "Jordan", ["Syria", "Israel", "Egypt"], "Petra, the rose-red city, is in Jordan.", "Petra", "Jordan", "In Jordan, in the Middle East.", "medium"],
  ["Acropolis", "city", "Athens", ["Rome", "Cairo", "Istanbul"], "The Acropolis is in Athens, in Greece.", "Athens", "Greece", "In Greece, on the Mediterranean Sea.", "medium"],
  ["Mount Fuji", "country", "Japan", ["China", "South Korea", "Indonesia"], "Mount Fuji is in Japan — its highest mountain.", "Mount Fuji", "Japan", "In Japan, islands east of China.", "medium"],
  ["Uluru", "country", "Australia", ["New Zealand", "South Africa", "India"], "Uluru, the big red rock, is in Australia.", "Uluru", "Australia", "In central Australia.", "medium"],
  ["Table Mountain", "city", "Cape Town", ["Johannesburg", "Durban", "Pretoria"], "Table Mountain is in Cape Town, in South Africa.", "Cape Town", "South Africa", "At the southern tip of Africa.", "medium"],
];
let g7 = 0;
for (const [place, ask, answer, distractors, point, mapPlace, where, note, level] of PLACES7) {
  const q = ask === "city" ? `${place} is in which city?` : `${place} is in which country?`;
  add(7, mkQ(`s7-g${++g7 + 10}`, level, q, answer, distractors, point,
    { map: { kind: "world", place: mapPlace, where, note } }));
}

// ── Stage 8: Biggest / Longest / Highest (10 originals + 9 + 32 new = 51) ──
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
add(8, mkQ("s8-g10", "easy", "Which is the SMALLEST country in the world?", "Vatican City",
  ["Monaco", "San Marino", "Maldives"], "Vatican City is the smallest country in the world.",
  { map: { kind: "world", place: "Vatican City", where: "Europe", note: "Inside Rome, in Italy — the smallest country in the world." } }));
add(8, mkQ("s8-g11", "medium", "Which is the largest island country in the world?", "Indonesia",
  ["Madagascar", "Japan", "New Zealand"], "Indonesia is the largest island country in the world.",
  { map: { kind: "world", place: "Indonesia", where: "Asia", note: "Many islands south-east of Asia, above Australia." } }));
add(8, mkQ("s8-g12", "medium", "Which is the longest wall in the world?", "Great Wall of China",
  ["Berlin Wall", "Hadrian's Wall", "Western Wall"], "The Great Wall of China (about 21,196 km) is the longest wall in the world.",
  { map: { kind: "world", place: "Great Wall", where: "China", note: "In China — the big country north-east of India." } }));
add(8, mkQ("s8-g13", "medium", "Which is the tallest building in the world?", "Burj Khalifa",
  ["Eiffel Tower", "Empire State Building", "Shanghai Tower"], "The Burj Khalifa (828 m) in Dubai is the tallest building in the world.",
  { map: { kind: "world", place: "Burj Khalifa", where: "UAE", note: "In Dubai, in the UAE." } }));
add(8, mkQ("s8-g14", "medium", "The tallest building in the world is in which city?", "Dubai",
  ["Abu Dhabi", "Doha", "Riyadh"], "The Burj Khalifa is in Dubai, in the UAE.",
  { map: { kind: "world", place: "Dubai", where: "UAE", note: "On the Arabian Peninsula, next to Saudi Arabia and Oman." } }));
add(8, mkQ("s8-g15", "medium", "Which is the largest rainforest in the world?", "Amazon Rainforest",
  ["Congo Rainforest", "Daintree Rainforest", "Black Forest"], "The Amazon Rainforest, in South America, is the largest rainforest in the world.",
  { map: { kind: "world", place: "Amazon Rainforest", where: "South America", note: "In South America — in Brazil and its neighbours." } }));
add(8, mkQ("s8-g16", "medium", "Which is the largest peninsula in the world?", "Arabian Peninsula",
  ["Indian Peninsula", "Korean Peninsula", "Malay Peninsula"], "The Arabian Peninsula is the largest peninsula in the world.",
  { map: { kind: "world", place: "Arabian Peninsula", where: "Asia", note: "In the Middle East — Saudi Arabia is the big country on it." } }));
add(8, mkQ("s8-g17", "medium", "Which is the largest delta in the world?", "Ganges Delta",
  ["Nile Delta", "Amazon Delta", "Mekong Delta"], "The Ganges Delta, in India and Bangladesh, is the largest delta in the world.",
  { map: { kind: "world", place: "Ganges Delta", where: "South Asia", note: "In India and Bangladesh, where the Ganga meets the Bay of Bengal." } }));
add(8, mkQ("s8-g18", "hard", "Which is the hottest place on Earth?", "Death Valley",
  ["Sahara Desert", "Thar Desert", "Dasht-e Lut"], "Death Valley, in the USA, is the hottest place on Earth (56.7°C).",
  { map: { kind: "world", place: "Death Valley", where: "North America", note: "In California, USA." } }));
add(8, mkQ("s8-g19", "hard", "Which is the driest place on Earth?", "Atacama Desert",
  ["Sahara Desert", "Gobi Desert", "Thar Desert"], "The Atacama Desert, in Chile, is the driest place on Earth.",
  { map: { kind: "world", place: "Atacama Desert", where: "South America", note: "In Chile, in South America." } }));
add(8, mkQ("s8-g20", "hard", "Which is the wettest place on Earth?", "Mawsynram",
  ["Cherrapunji", "Singapore", "Kochi"], "Mawsynram, in Meghalaya, India, is the wettest place on Earth.",
  { map: { kind: "india", place: "Mawsynram", where: "North-East India (Meghalaya)", note: "In Meghalaya, in the north-east of India." } }));
add(8, mkQ("s8-g21", "hard", "Which is the deepest lake in the world?", "Lake Baikal",
  ["Lake Tanganyika", "Caspian Sea", "Lake Superior"], "Lake Baikal (1,642 m deep) in Russia is the deepest lake in the world.",
  { map: { kind: "world", place: "Lake Baikal", where: "Europe and Asia", note: "In Russia, in Siberia." } }));
add(8, mkQ("s8-g22", "medium", "Which is the largest freshwater lake in the world?", "Lake Superior",
  ["Lake Victoria", "Lake Baikal", "Lake Tanganyika"], "Lake Superior, in North America, is the largest freshwater lake in the world.",
  { map: { kind: "world", place: "Lake Superior", where: "North America", note: "Between the USA and Canada — one of the Great Lakes." } }));
add(8, mkQ("s8-g23", "medium", "Which is the second-longest river in the world?", "Amazon",
  ["Yangtze", "Mississippi", "Nile"], "The Amazon (about 6,400 km) is the second-longest river in the world, after the Nile.",
  { map: { kind: "world", place: "Amazon River", where: "South America", note: "In South America — it flows into the Atlantic Ocean." } }));
add(8, mkQ("s8-g24", "hard", "Which is the highest OFFICIAL capital city in the world?", "Quito",
  ["La Paz", "Bogota", "Kathmandu"], "Quito, the capital of Ecuador (2,850 m), is the highest official capital city in the world. La Paz, in Bolivia, is higher (3,650 m), but Sucre is the official capital.",
  { map: { kind: "world", place: "Quito", where: "South America", note: "In Ecuador, in South America." } }));
add(8, mkQ("s8-g25", "hard", "Which is the highest waterfall in the world?", "Angel Falls",
  ["Niagara Falls", "Victoria Falls", "Jog Falls"], "Angel Falls (979 m) in Venezuela is the highest waterfall in the world.",
  { map: { kind: "world", place: "Angel Falls", where: "South America", note: "In Venezuela, in South America." } }));
add(8, mkQ("s8-g26", "medium", "Which is the largest mosque in the world?", "Masjid al-Haram",
  ["Masjid an-Nabawi", "Blue Mosque", "Sheikh Zayed Grand Mosque"], "Masjid al-Haram, in Makkah, is the largest mosque in the world.",
  { map: { kind: "world", place: "Makkah", where: "Saudi Arabia", note: "In Saudi Arabia, on the western side, near the Red Sea." } }));
add(8, mkQ("s8-g27", "medium", "Which is the second-largest country in the world?", "Canada",
  ["China", "USA", "Brazil"], "Canada is the second-largest country in the world, after Russia.",
  { map: { kind: "world", place: "Canada", where: "North America", note: "North of the USA — the second-largest country in the world." } }));
add(8, mkQ("s8-g28", "medium", "Which country has the second-largest population in the world?", "China",
  ["USA", "Indonesia", "Pakistan"], "China has the second-largest population in the world, after India.",
  { map: { kind: "world", place: "China", where: "Asia", note: "The big country north-east of India, across the Himalayas." } }));
add(8, mkQ("s8-g29", "hard", "Which is the longest land border in the world?", "Canada–USA border",
  ["India–Pakistan border", "Russia–China border", "USA–Mexico border"], "The Canada–USA border is the longest land border in the world.",
  { map: { kind: "world", place: "Canada", where: "North America", note: "North of the USA — the second-largest country in the world." } }));
add(8, mkQ("s8-g30", "medium", "Which is the largest island in Asia?", "Borneo",
  ["Sumatra", "Java", "Sulawesi"], "Borneo is the largest island in Asia.",
  { map: { kind: "world", place: "Borneo", where: "Asia", note: "In South-East Asia — Brunei, Malaysia and Indonesia share it." } }));
add(8, mkQ("s8-g31", "medium", "Which is the largest lake in Africa?", "Lake Victoria",
  ["Lake Tanganyika", "Lake Malawi", "Lake Chad"], "Lake Victoria is the largest lake in Africa.",
  { map: { kind: "world", place: "Lake Victoria", where: "Africa", note: "In East Africa — the Nile starts here." } }));
add(8, mkQ("s8-g32", "medium", "Which is the largest city in the world?", "Tokyo",
  ["Delhi", "Shanghai", "Sao Paulo"], "Tokyo, in Japan, is the largest city in the world.",
  { map: { kind: "world", place: "Tokyo", where: "Japan", note: "In Japan, islands east of China." } }));
add(8, mkQ("s8-g33", "medium", "Which is the largest island in Europe?", "Great Britain",
  ["Iceland", "Ireland", "Sicily"], "Great Britain is the largest island in Europe.",
  { map: { kind: "world", place: "Great Britain", where: "Europe", note: "Islands north-west of Europe — England, Scotland and Wales." } }));
add(8, mkQ("s8-g34", "medium", "Which is the largest island in Africa?", "Madagascar",
  ["Zanzibar", "Seychelles", "Mauritius"], "Madagascar is the largest island in Africa.",
  { map: { kind: "world", place: "Madagascar", where: "Africa", note: "A big island off the south-east coast of Africa." } }));
add(8, mkQ("s8-g35", "medium", "Which is the smallest country in Asia?", "Maldives",
  ["Singapore", "Bahrain", "Brunei"], "Maldives is the smallest country in Asia.",
  { map: { kind: "world", place: "Maldives", where: "Asia", note: "Small islands in the Indian Ocean, south-west of India." } }));
add(8, mkQ("s8-g36", "medium", "Which is the smallest country in Africa?", "Seychelles",
  ["Mauritius", "Cape Verde", "Gambia"], "Seychelles is the smallest country in Africa.",
  { map: { kind: "world", place: "Seychelles", where: "Africa", note: "Small islands in the Indian Ocean, east of Africa." } }));
add(8, mkQ("s8-g37", "medium", "Which is the largest lake in Europe?", "Lake Ladoga",
  ["Lake Onega", "Lake Vanern", "Lake Geneva"], "Lake Ladoga, in Russia, is the largest lake in Europe.",
  { map: { kind: "world", place: "Lake Ladoga", where: "Europe", note: "In Russia, near St Petersburg." } }));
add(8, mkQ("s8-g38", "hard", "Which country has the most land neighbours?", "China",
  ["Russia", "India", "Brazil"], "China has the most land neighbours in the world — 14 countries.",
  { map: { kind: "world", place: "China", where: "Asia", note: "The big country north-east of India, across the Himalayas." } }));
add(8, mkQ("s8-g39", "medium", "Which is the largest island in the Mediterranean Sea?", "Sicily",
  ["Sardinia", "Cyprus", "Corsica"], "Sicily, in Italy, is the largest island in the Mediterranean Sea.",
  { map: { kind: "world", place: "Sicily", where: "Europe", note: "In Italy — the island Italy kicks." } }));
add(8, mkQ("s8-g40", "medium", "Which is the largest island in the Caribbean Sea?", "Cuba",
  ["Hispaniola", "Jamaica", "Puerto Rico"], "Cuba is the largest island in the Caribbean Sea.",
  { map: { kind: "world", place: "Cuba", where: "North America", note: "An island in the Caribbean Sea, south of the USA." } }));
add(8, mkQ("s8-g41", "medium", "Which is the largest desert in Asia?", "Gobi Desert",
  ["Arabian Desert", "Thar Desert", "Karakum Desert"], "The Gobi Desert is the largest desert in Asia.",
  { map: { kind: "world", place: "Gobi Desert", where: "Asia", note: "In China and Mongolia." } }));

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
console.log("S4 countries asked (country->capital):", countriesAsked.size, "/ 195;",
  "capitals asked (capital->country):", capitalsAsked.size, "/ 195");
const missingC = CAPITALS.filter(({ country }) => !countriesAsked.has(country)).map((x) => x.country);
const missingR = CAPITALS.filter(({ capital }) => !capitalsAsked.has(capital)).map((x) => x.capital);
if (missingC.length || missingR.length) throw new Error("S4 coverage gap: missing country->capital " + JSON.stringify(missingC) + " missing capital->country " + JSON.stringify(missingR));
const s5 = QUESTIONS[5];
const statesAsked = new Set(s5.filter((q) => q.q.startsWith("What is the capital of")).map((q) => q.q.replace("What is the capital of ", "").replace("?", "")));
const statesRev = new Set(s5.filter((q) => q.q.endsWith("is the capital of which state?")).map((q) => q.q.replace(" is the capital of which state?", "")));
const regionsAsked = new Set(s5.filter((q) => q.q.startsWith("Which region of India is")).map((q) => q.q.replace("Which region of India is ", "").replace(" in?", "")));
console.log("S5 states asked (state->capital):", statesAsked.size, "/ 36; capitals asked:", statesRev.size, "/ 33 askable (36 states/UTs minus the 3 Chandigarh entries — shared by Punjab, Haryana and the UT); regions asked:", regionsAsked.size, "/ 36");
const missingS = STATES.filter((s) => !statesAsked.has(s.name)).map((s) => s.name);
// Chandigarh is deliberately NOT asked capital->state (two right answers;
// the original s5-q9 covers it), so Punjab/Haryana are expected gaps here.
const missingSR = STATES.filter((s) => s.capital !== "Chandigarh" && !statesRev.has(s.capital)).map((s) => s.name);
const missingRG = STATES.filter((s) => !regionsAsked.has(s.name)).map((s) => s.name);
if (missingS.length || missingSR.length || missingRG.length) throw new Error("S5 coverage gap: " + JSON.stringify({ missingS, missingSR, missingRG }));
const s3 = QUESTIONS[3];
const asiaAsked = new Set(s3.filter((q) => q.q.startsWith("Which part of Asia is")).map((q) => q.q.replace("Which part of Asia is ", "").replace(" in?", "")));
console.log("S3 Asia countries asked (region):", asiaAsked.size, "/ 48");
 // India + Iraq are covered by originals s3-q1 / s3-q6 in a different form
 // ("India is in which part of Asia?" / "Which of these is in the Middle East?").
const missingA = Object.values(ASIA_GROUPS).flat().filter((c) => !asiaAsked.has(c) && c !== "India" && c !== "Iraq");
if (missingA.length) throw new Error("S3 coverage gap: " + JSON.stringify(missingA));
const s2 = QUESTIONS[2];
const contAsked = new Set(s2.filter((q) => q.q.startsWith("Which continent is")).map((q) => q.q.replace("Which continent is ", "").replace(" in?", "")));
console.log("S2 countries asked (continent):", contAsked.size, "/ 195");
const missingCont = CAPITALS.filter(({ country }) => !contAsked.has(country)).map((x) => x.country);
if (missingCont.length) throw new Error("S2 coverage gap: " + JSON.stringify(missingCont));

// ── Study sheets: grow the v1 sheets to cover the new facts ──
const NEW_SHEETS = JSON.parse(JSON.stringify(OLD.MAP_GAME_SHEETS));
NEW_SHEETS[1].facts.push(
  "The Tropic of Cancer passes through the middle of India. The Tropic of Capricorn is south of the Equator.",
  "The Arctic Circle is around the North Pole; the Antarctic Circle is around the South Pole.",
  "The Equator cuts the Earth into the Northern and Southern Hemispheres. The Prime Meridian cuts it into the Eastern and Western Hemispheres.",
  "India is in the Northern and Eastern Hemispheres. Australia is in the Southern and Eastern Hemispheres.",
  "Latitude goes from 0 degrees (Equator) to 90 degrees (the poles). Longitude goes from 0 degrees (Prime Meridian) to 180 degrees.",
  "The International Date Line is at 180 degrees — where one day changes to the next.",
  "The scale tells you how far places really are. India is 5 hours 30 minutes ahead of London. India has only one time zone.",
  "A globe is a round model of the Earth. A book of maps is called an atlas.",
  "Map colours: blue = water, green = low land and plains, brown = mountains and high land."
);
{
  const byCont = {};
  for (const { country } of CAPITALS) {
    const c = CONTINENT_OF[country];
    (byCont[c] = byCont[c] || []).push(country);
  }
  NEW_SHEETS[2].facts.push("Every country and its continent:");
  for (const c of ["Africa", "Asia", "Europe", "North America", "South America", "Australia", "Antarctica", "Europe and Asia"]) {
    if (byCont[c]) NEW_SHEETS[2].facts.push(`${c}: ${byCont[c].join(", ")}.`);
  }
}
NEW_SHEETS[2].facts.push(
  "New Guinea is the second-largest island in the world (after Greenland). Madagascar is a big island in the Indian Ocean.",
  "Palk Strait — between India and Sri Lanka. Tasman Sea — between Australia and New Zealand.",
  "English Channel — between the United Kingdom and France. Timor Sea — between Timor and Australia.",
  "Atlantic Ocean — between North America and Europe."
);
NEW_SHEETS[3].facts = [
  "South Asia: India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Myanmar, Maldives, Afghanistan.",
  "Middle East / West Asia: Saudi Arabia, UAE, Qatar, Kuwait, Oman, Yemen, Jordan, Lebanon, Syria, Iraq, Iran, Turkey, Israel, Palestine, Armenia, Azerbaijan, Georgia, Cyprus, Bahrain.",
  "Central Asia: Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan.",
  "East & South-East Asia: China, Japan, South Korea, North Korea, Mongolia, Thailand, Vietnam, Malaysia, Singapore, Indonesia, Philippines, Brunei, Cambodia, Laos, East Timor.",
  "India — triangle pointing down. Saudi Arabia — big country on the Arabian Peninsula.",
  "China — big country north-east of India. Japan — a chain of islands east of China.",
  "Indonesia — many islands south-east of Asia. Sri Lanka — a small teardrop island just below India.",
  "India has the largest population in Asia — and in the world. Saudi Arabia is the largest country in the Middle East.",
  "Turkey is between Europe and Asia. Japan is the Land of the Rising Sun. Bhutan is the Land of the Thunder Dragon. South Korea is the Land of the Morning Calm.",
  "East Timor is entirely in the Southern Hemisphere. Indonesia has the most islands — about 17,000.",
];
NEW_SHEETS[4] = { title: "World Capitals — all 195", facts: [
  "Learn country + capital together, continent by continent.",
  "South Africa has 3 capitals — answer Pretoria (executive). Cape Town is legislative, Bloemfontein is judicial.",
  "Sri Lanka — answer Sri Jayawardenepura Kotte (official). Colombo is the executive / commercial capital.",
  "Netherlands — Amsterdam (official). The Hague is the seat of government.",
  "Bolivia — Sucre (constitutional). La Paz is the seat of government.",
  "Benin — Porto-Novo (official). Cotonou is the seat of government.",
  "Malaysia — Kuala Lumpur (Putrajaya is administrative). Eswatini — Mbabane (Lobamba is royal/legislative).",
  "Ivory Coast — Yamoussoukro. Burundi — Gitega. Yemen — Sanaa. Tanzania — Dodoma. Myanmar — Naypyidaw.",
  "Equatorial Guinea — Malabo (school answer; the new capital is Ciudad de la Paz). Nauru — Yaren (no official capital).",
  "Israel — Jerusalem. Palestine — Ramallah.",
  "Tricky ones: Australia — Canberra (NOT Sydney). UAE — Abu Dhabi (NOT Dubai).",
  "Turkey — Ankara (NOT Istanbul). Canada — Ottawa (NOT Toronto).",
] };
NEW_SHEETS[6].facts.push(
  "Longest river on each continent: Nile (Africa, 6,650 km), Amazon (South America, 6,400 km), Yangtze (Asia, 6,300 km), Mississippi (North America, 3,766 km), Volga (Europe, 3,530 km), Murray (Australia, 2,508 km).",
  "Highest mountain on each continent: Everest (Asia, 8,849 m), Aconcagua (South America, 6,961 m), Denali (North America, 6,190 m), Kilimanjaro (Africa, 5,895 m), Elbrus (Europe, 5,642 m), Vinson (Antarctica, 4,892 m), Puncak Jaya (Oceania, 4,884 m).",
  "Kilimanjaro is in Tanzania. Aconcagua is in Argentina. Denali is in the USA. Elbrus is in Russia. Puncak Jaya is in Indonesia.",
  "Ranges: Alps (Europe), Rockies (North America), Atlas (Africa), Great Dividing Range (Australia), Urals (between Europe and Asia).",
  "Deserts: Gobi (Asia), Kalahari (Africa), Arabian Desert (Asia), Mojave (USA), Great Victoria Desert (Australia), Chihuahuan Desert (North America).",
  "Lakes: Wular Lake is the largest freshwater lake in India. Tanganyika is the second-deepest lake. Great Lakes are in North America. The Dead Sea is so salty you can float in it.",
  "Waterfalls: Niagara Falls (USA–Canada), Victoria Falls (Zambia–Zimbabwe), Jog Falls is the highest in India.",
  "Rivers and cities: Thames–London, Seine–Paris, Danube–Vienna, Rhine–Germany, Tiber–Rome, Spree–Berlin, Mekong–South-East Asia, Indus–Pakistan, Tigris and Euphrates–Iraq, Yellow River–China, Godavari–South India, Yamuna–New Delhi, Tigris–Baghdad.",
  "Majuli (Assam) is the largest river island in the world. The Philippine Sea is the largest sea. The Pacific Ocean is the deepest ocean.",
  "Lake Baikal, the deepest lake, is in Russia. Lake Titicaca is the largest lake in South America."
);
NEW_SHEETS[7].facts.push(
  "Jerusalem: Dome of the Rock, Western Wall, Church of the Holy Sepulchre. Bethlehem is in Palestine.",
  "Masjid al-Haram and the Ka'ba are in Makkah. Hagia Sophia and the Blue Mosque are in Istanbul.",
  "Sheikh Zayed Grand Mosque is in Abu Dhabi (UAE). Qom and Mashhad are holy cities in Iran.",
  "Kairouan (Tunisia), Timbuktu (Mali), Lalibela (Ethiopia) — famous old holy cities.",
  "Golden Temple — Amritsar, India. Varanasi, Bodh Gaya, Tirupati, Ajmer Sharif — holy places in India.",
  "Angkor Wat (Cambodia), Borobudur (Indonesia), Shwedagon Pagoda (Yangon, Myanmar), Temple of Heaven (Beijing, China).",
  "Mount Sinai is in Egypt. St Peter's Basilica is in Vatican City.",
  "Eiffel Tower — Paris, France. Big Ben — London, UK. Statue of Liberty — New York, USA.",
  "Great Wall — China. Taj Mahal — Agra, India. Pyramids of Giza and the Sphinx — Egypt.",
  "Colosseum and the Leaning Tower of Pisa — Italy. Sydney Opera House — Australia. Brandenburg Gate — Berlin, Germany.",
  "Red Square — Moscow, Russia. Christ the Redeemer — Rio de Janeiro, Brazil. Machu Picchu — Peru.",
  "Chichen Itza — Mexico. Petra — Jordan. Acropolis — Athens, Greece. Mount Fuji — Japan. Uluru — Australia. Table Mountain — Cape Town, South Africa."
);
NEW_SHEETS[8].facts.push(
  "Smallest country in the world: Vatican City. Largest island country: Indonesia.",
  "Longest wall: Great Wall of China (about 21,196 km). Tallest building: Burj Khalifa (828 m) in Dubai.",
  "Largest rainforest: Amazon. Largest peninsula: Arabian Peninsula. Largest delta: Ganges Delta.",
  "Hottest place: Death Valley, USA. Driest place: Atacama Desert, Chile. Wettest place: Mawsynram, India.",
  "Deepest lake: Lake Baikal (1,642 m). Largest freshwater lake: Lake Superior.",
  "Second-longest river: Amazon (about 6,400 km). Highest official capital: Quito, Ecuador (2,850 m).",
  "Highest waterfall: Angel Falls (979 m) in Venezuela. Largest mosque: Masjid al-Haram, Makkah.",
  "Second-largest country: Canada. Second-largest population: China. Longest land border: Canada–USA.",
  "Largest island in Asia: Borneo. Largest lake in Africa: Lake Victoria. Largest city: Tokyo.",
  "Largest island in Europe: Great Britain. Largest island in Africa: Madagascar.",
  "Smallest country in Asia: Maldives. Smallest country in Africa: Seychelles.",
  "Largest lake in Europe: Lake Ladoga. Most land neighbours: China (14).",
  "Largest island in the Mediterranean: Sicily. Largest island in the Caribbean: Cuba. Largest desert in Asia: Gobi."
);

// ── Write the new map-game-data.js ──
const header = `// ─────────────────────────────────────────────────────────────
// Bidaya Map Study game (BNS31) — question bank + study sheets.
// SOURCE OF TRUTH: SIBAQ26_Bidaya_Map_Study_Full_Pack.pdf (5 pp, 12 Nov 2026)
// + Quiz Questions and Map Tasks, Tasks 1-2 (28 states, 45 countries)
// + a world atlas (all 195 countries, verified Nov 2026).
// Every fact below comes from that pack or the atlas. Do not invent capitals or facts.
// The game is for S Abdul Khadirul Faaz (N1322) first; other boys can be
// added later via the map_game_players table — the bank is not tied to a boy.
// CONCEPT-BASED 100% COVERAGE (Nov 2026): the pool is generated from the
// verified fact lists (195 capitals both ways, 36 states/UTs both ways +
// region, all 48 Asia countries by region + neighbours, every country in
// its continent, world rivers/mountains/deserts/lakes/waterfalls, holy
// places + famous landmarks, world superlatives). Each play draws
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
  `// Pass mark to finish a stage and unlock the next one: 8 of 10 (Samad, 12 Nov 2026).\n` +
  `const MAP_GAME_PASS_MARK = 8;\n` +
  `const MAP_GAME_TIME_PER_Q = ${js(OLD.MAP_GAME_TIME_PER_Q)}; // seconds; 0 = no timer\n` +
  `// Questions drawn per play (one stage = one play of 10).\n` +
  `const MAP_GAME_PLAY_COUNT = 10;\n` +
  `// Round 2 (no-options typing round): 45 seconds per question.\n` +
  `const MAP_GAME_ROUND2_TIME_PER_Q = 45;\n\n` +
  `const MAP_GAME_QUESTIONS = ${js(QUESTIONS)};\n\n` +
  `// All 195 capitals (193 UN members + Palestine + Vatican City), for the\n` +
  `// Stage-4 study sheet. [country, capital]\n` +
  `const MAP_GAME_ALL_CAPITALS = ${js(CAPITALS_195)};\n\n` +
  `// Study-sheet facts per stage, for the weak-section PDF (B&W, print-ready).\n` +
  `// Each fact is one short line. Stage 4 uses MAP_GAME_ALL_CAPITALS instead.\n` +
  `const MAP_GAME_SHEETS = ${js(NEW_SHEETS)};\n\n` +
  `module.exports = { MAP_GAME_STAGES, MAP_GAME_QUESTIONS, MAP_GAME_PASS_MARK, MAP_GAME_TIME_PER_Q, MAP_GAME_PLAY_COUNT, MAP_GAME_ROUND2_TIME_PER_Q, MAP_GAME_ALL_CAPITALS, MAP_GAME_SHEETS };\n`;
if (!fs.existsSync(path.join(__dirname, "..", "map-game-data.v1-80q.js"))) {
  fs.copyFileSync(path.join(__dirname, "..", "map-game-data.js"), path.join(__dirname, "..", "map-game-data.v1-80q.js"));
}
fs.writeFileSync(OUT, out);
console.log("WROTE:", OUT, `(${Math.round(out.length / 1024)} KB)`);
console.log("Original 80-question file kept at map-game-data.v1-80q.js");
