// ─────────────────────────────────────────────────────────────
// Bidaya Map Study game (BNS31) — question bank + study sheets.
// SOURCE OF TRUTH: SIBAQ26_Bidaya_Map_Study_Full_Pack.pdf (5 pp, 12 Nov 2026)
// + Quiz Questions and Map Tasks, Tasks 1-2 (28 states, 45 countries).
// Every fact below comes from that pack. Do not invent capitals or facts.
// The game is for S Abdul Khadirul Faaz (N1322) first; other boys can be
// added later via the map_game_players table — the bank is not tied to a boy.
// ─────────────────────────────────────────────────────────────
// A question:
//   key     stable id, e.g. "s4-q3"
//   q       the question (simple English, age 10-12)
//   options exactly 4; answer must be one of them, word for word
//   level   "easy" | "medium" | "hard"
//   point   the exact fact to learn ("Capital of Saudi Arabia — Riyadh")
//   hint    a clue shown on Easy/Medium only; Hard shows no hint
//   map     map-location question: { kind: "world"|"india", place, where, note }
//           kind "world" = on the world map; "india" = on the India map.
//           where = continent / region; note = where it is, in plain words.
// ─────────────────────────────────────────────────────────────

const MAP_GAME_STAGES = [
  { n: 1, key: "map-basics", icon: "🧭", title: "Map-Reading Basics", desc: "Directions, Equator, Prime Meridian, how to read a map." },
  { n: 2, key: "continents-oceans", icon: "🌍", title: "Continents & Oceans", desc: "The 7 continents and the 5 oceans." },
  { n: 3, key: "asia", icon: "🌏", title: "Asia", desc: "South Asia, the Middle East and East Asia." },
  { n: 4, key: "world-capitals", icon: "🏛️", title: "World Capitals", desc: "The 45 Task-2 countries + 20 extra capitals." },
  { n: 5, key: "india-states", icon: "🇮🇳", title: "India States", desc: "The 28 states by region, with their capitals." },
  { n: 6, key: "rivers-mountains", icon: "🏔️", title: "Rivers & Mountains", desc: "Rivers, mountains, deserts and neighbours of India." },
  { n: 7, key: "holy-places", icon: "🕌", title: "Holy & Famous Places", desc: "Makkah, Madinah, Jerusalem, Cairo, Baghdad and more." },
  { n: 8, key: "biggest", icon: "🏆", title: "Biggest / Longest / Highest", desc: "The biggest, longest and highest things in the world." },
];

// Pass mark to finish a stage and unlock the next one: 6 of 10.
const MAP_GAME_PASS_MARK = 6;
const MAP_GAME_TIME_PER_Q = { easy: 0, medium: 45, hard: 20 }; // seconds; 0 = no timer

const MAP_GAME_QUESTIONS = {
  1: [
    { key: "s1-q1", level: "easy", q: "On most maps, which direction is UP?", options: ["North", "South", "East", "West"], answer: "North", point: "North is up on most maps.", hint: "Think of the compass: N is at the top." },
    { key: "s1-q2", level: "easy", q: "What does the compass rose show?", options: ["The directions", "The rainfall", "The population", "The time"], answer: "The directions", point: "The compass rose shows the directions.", hint: "It has N, S, E and W on it." },
    { key: "s1-q3", level: "easy", q: "Which sea is to the WEST of India?", options: ["Arabian Sea", "Bay of Bengal", "Red Sea", "Mediterranean Sea"], answer: "Arabian Sea", point: "India touches the Arabian Sea on the west.", hint: "Kerala is on this sea.", map: { kind: "india", place: "Arabian Sea", where: "West coast of India", note: "The sea on the WEST side of India, next to Kerala and Gujarat." } },
    { key: "s1-q4", level: "easy", q: "Which sea is to the EAST of India?", options: ["Bay of Bengal", "Arabian Sea", "Red Sea", "Caspian Sea"], answer: "Bay of Bengal", point: "India touches the Bay of Bengal on the east.", hint: "West Bengal and Odisha are on this sea.", map: { kind: "india", place: "Bay of Bengal", where: "East coast of India", note: "The sea on the EAST side of India, next to West Bengal and Odisha." } },
    { key: "s1-q5", level: "medium", q: "The Equator is the middle line of the Earth. What number is it?", options: ["0 degrees", "90 degrees", "180 degrees", "45 degrees"], answer: "0 degrees", point: "The Equator is the middle line (0 degrees). India is north of it.", hint: "It is the starting line for latitude." },
    { key: "s1-q6", level: "medium", q: "The Prime Meridian (0 degrees) runs through which city?", options: ["London", "Paris", "New Delhi", "Cairo"], answer: "London", point: "The Prime Meridian runs through London, England.", hint: "It is the capital of the United Kingdom." },
    { key: "s1-q7", level: "medium", q: "Which country looks like a BOOT on the map?", options: ["Italy", "India", "Japan", "Egypt"], answer: "Italy", point: "Italy is the boot kicking Sicily.", hint: "It is in Europe.", map: { kind: "world", place: "Italy", where: "Europe", note: "In southern Europe — the boot shape, kicking the island of Sicily." } },
    { key: "s1-q8", level: "easy", q: "India looks like which shape on the map?", options: ["A triangle pointing down", "A circle", "A square", "A boot"], answer: "A triangle pointing down", point: "India is the triangle pointing down into the Indian Ocean.", hint: "Look at the bottom of India.", map: { kind: "world", place: "India", where: "South Asia", note: "In South Asia — the triangle pointing down into the Indian Ocean." } },
    { key: "s1-q9", level: "medium", q: "Latitude lines run in which direction?", options: ["East–west", "North–south", "Up–down", "Round in circles"], answer: "East–west", point: "Latitude lines run east–west; longitude lines run north–south.", hint: "The Equator is a latitude line. Which way does it run?" },
    { key: "s1-q10", level: "hard", q: "When you open a new map, what should you look at FIRST?", options: ["Its title and key (legend)", "The smallest country", "The colours only", "The bottom corner"], answer: "Its title and key (legend)", point: "First look at the title and the key/legend — what colours and symbols mean." },
  ],
  2: [
    { key: "s2-q1", level: "easy", q: "Which is the LARGEST continent?", options: ["Asia", "Africa", "Europe", "Australia"], answer: "Asia", point: "Asia is the largest continent. India is in South Asia.", hint: "India and China are in it." },
    { key: "s2-q2", level: "easy", q: "Which is the SMALLEST continent?", options: ["Australia", "Europe", "Africa", "Antarctica"], answer: "Australia", point: "Australia is the smallest continent; it is also a country.", hint: "It is also the name of a country." },
    { key: "s2-q3", level: "easy", q: "Which is the LARGEST ocean?", options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], answer: "Pacific Ocean", point: "Oceans, largest to smallest: Pacific, Atlantic, Indian, Southern, Arctic.", hint: "It is on the east side of Asia." },
    { key: "s2-q4", level: "easy", q: "Which continent is the coldest, at the South Pole?", options: ["Antarctica", "Asia", "Europe", "North America"], answer: "Antarctica", point: "Antarctica is the coldest, at the South Pole.", hint: "It is at the very bottom of the map." },
    { key: "s2-q5", level: "easy", q: "The Sahara desert — the largest HOT desert — is in which continent?", options: ["Africa", "Asia", "Australia", "South America"], answer: "Africa", point: "The Sahara desert is in North Africa.", hint: "Egypt is in the same continent.", map: { kind: "world", place: "Sahara Desert", where: "North Africa", note: "In NORTH Africa — the big desert above the middle of Africa." } },
    { key: "s2-q6", level: "medium", q: "The Amazon river and rainforest are in which continent?", options: ["South America", "Africa", "Asia", "North America"], answer: "South America", point: "The Amazon river and rainforest are in South America.", hint: "Brazil is in this continent." },
    { key: "s2-q7", level: "medium", q: "Which ocean is to the SOUTH of India?", options: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"], answer: "Indian Ocean", point: "India touches the Indian Ocean on the south.", hint: "It has the same name as our country.", map: { kind: "world", place: "Indian Ocean", where: "South of India", note: "Below India — the ocean between Africa, Asia and Australia." } },
    { key: "s2-q8", level: "easy", q: "Which continent has the USA, Canada and Mexico?", options: ["North America", "South America", "Europe", "Asia"], answer: "North America", point: "North America has the USA, Canada and Mexico.", hint: "It is above South America." },
    { key: "s2-q9", level: "hard", q: "Name the oceans from largest to smallest. Which ocean is THIRD?", options: ["Indian Ocean", "Atlantic Ocean", "Southern Ocean", "Arctic Ocean"], answer: "Indian Ocean", point: "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th)." },
    { key: "s2-q10", level: "hard", q: "Russia is partly in which TWO continents?", options: ["Europe and Asia", "Asia and Africa", "Europe and Africa", "Asia and Australia"], answer: "Europe and Asia", point: "Russia is partly in Europe and partly in Asia.", hint: "One part is west, one part is east.", map: { kind: "world", place: "Russia", where: "Europe and Asia", note: "The biggest country — across the north of Europe AND Asia." } },
  ],
  3: [
    { key: "s3-q1", level: "easy", q: "India is in which part of Asia?", options: ["South Asia", "East Asia", "West Asia", "North Asia"], answer: "South Asia", point: "India is in South Asia." },
    { key: "s3-q2", level: "easy", q: "Sri Lanka is a small island in which place?", options: ["Just below India", "East of Japan", "North of China", "West of Arabia"], answer: "Just below India", point: "Sri Lanka is a small teardrop island just below India.", hint: "Look under the triangle of India.", map: { kind: "world", place: "Sri Lanka", where: "South Asia", note: "A small teardrop island just BELOW India, in the Indian Ocean." } },
    { key: "s3-q3", level: "easy", q: "Japan is a chain of islands to the EAST of which country?", options: ["China", "India", "Saudi Arabia", "Indonesia"], answer: "China", point: "Japan is a chain of islands east of China.", hint: "It is the country of Tokyo.", map: { kind: "world", place: "Japan", where: "East Asia", note: "Islands to the EAST of China, in the Pacific Ocean." } },
    { key: "s3-q4", level: "medium", q: "Which country is the largest in Asia?", options: ["China", "India", "Japan", "Saudi Arabia"], answer: "China", point: "China is the largest country in Asia." },
    { key: "s3-q5", level: "medium", q: "Saudi Arabia is on which peninsula?", options: ["Arabian Peninsula", "Indian Peninsula", "Korean Peninsula", "Malay Peninsula"], answer: "Arabian Peninsula", point: "Saudi Arabia is the big country on the Arabian Peninsula.", hint: "Makkah and Madinah are in this country.", map: { kind: "world", place: "Saudi Arabia", where: "Middle East (West Asia)", note: "The big country on the Arabian Peninsula, between the Red Sea and the Gulf." } },
    { key: "s3-q6", level: "medium", q: "Which of these countries is in the Middle East (West Asia)?", options: ["Iraq", "Japan", "Thailand", "Mongolia"], answer: "Iraq", point: "Iraq is in the Middle East (West Asia). Its capital is Baghdad." },
    { key: "s3-q7", level: "medium", q: "Which of these is NOT in South Asia?", options: ["Japan", "Nepal", "Bhutan", "Bangladesh"], answer: "Japan", point: "South Asia is India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Myanmar, Maldives and Afghanistan. Japan is in East Asia." },
    { key: "s3-q8", level: "medium", q: "Indonesia is many islands to the south-east of which continent?", options: ["Asia", "Africa", "Australia", "Europe"], answer: "Asia", point: "Indonesia is many islands south-east of Asia.", hint: "Its capital is Jakarta.", map: { kind: "world", place: "Indonesia", where: "South-East Asia", note: "Many islands SOUTH-EAST of Asia, above Australia." } },
    { key: "s3-q9", level: "hard", q: "Which country is north of India, across the Himalayas?", options: ["China", "Pakistan", "Myanmar", "Thailand"], answer: "China", point: "China is north-east of India, across the Himalayas.", hint: "Its capital is Beijing.", map: { kind: "world", place: "China", where: "East Asia", note: "The big country NORTH-EAST of India, across the Himalayas." } },
    { key: "s3-q10", level: "hard", q: "Which sea is between Africa and Saudi Arabia?", options: ["Red Sea", "Arabian Sea", "Bay of Bengal", "Mediterranean Sea"], answer: "Red Sea", point: "The Red Sea is between Africa and Saudi Arabia.", hint: "Its name is a colour.", map: { kind: "world", place: "Red Sea", where: "Between Africa and Arabia", note: "Between Africa (Egypt, Sudan) and Arabia (Saudi Arabia)." } },
  ],
  4: [
    { key: "s4-q1", level: "easy", q: "What is the capital of the United Kingdom?", options: ["London", "Paris", "Berlin", "Rome"], answer: "London", point: "United Kingdom — London.", hint: "It is in Europe.", map: { kind: "world", place: "United Kingdom", where: "Europe", note: "Islands north-west of Europe — England, Scotland and Wales." } },
    { key: "s4-q2", level: "easy", q: "What is the capital of France?", options: ["Paris", "Madrid", "Lisbon", "Athens"], answer: "Paris", point: "France — Paris.", hint: "It is in Europe.", map: { kind: "world", place: "France", where: "Europe", note: "In western Europe, next to the United Kingdom and Germany." } },
    { key: "s4-q3", level: "easy", q: "What is the capital of Japan?", options: ["Tokyo", "Beijing", "Seoul", "Bangkok"], answer: "Tokyo", point: "Japan — Tokyo.", hint: "It is in East Asia.", map: { kind: "world", place: "Japan", where: "East Asia", note: "Islands to the east of China." } },
    { key: "s4-q4", level: "medium", q: "What is the capital of Egypt?", options: ["Cairo", "Baghdad", "Tehran", "Ankara"], answer: "Cairo", point: "Egypt — Cairo. Cairo is on the river Nile.", hint: "It is in Africa, on the Nile.", map: { kind: "world", place: "Egypt", where: "Africa", note: "In NORTH-EAST Africa, on the river Nile." } },
    { key: "s4-q5", level: "medium", q: "What is the capital of Brazil?", options: ["Brasilia", "Buenos Aires", "Lima", "Santiago"], answer: "Brasilia", point: "Brazil — Brasilia.", hint: "It is in South America.", map: { kind: "world", place: "Brazil", where: "South America", note: "The biggest country in South America." } },
    { key: "s4-q6", level: "medium", q: "What is the capital of Australia?", options: ["Canberra", "Sydney", "Wellington", "Ottawa"], answer: "Canberra", point: "Australia — Canberra. (Sydney is a big city, but it is NOT the capital.)", hint: "It is NOT Sydney.", map: { kind: "world", place: "Australia", where: "Oceania", note: "The island continent, south-east of Asia." } },
    { key: "s4-q7", level: "medium", q: "What is the capital of the UAE?", options: ["Abu Dhabi", "Dubai", "Doha", "Riyadh"], answer: "Abu Dhabi", point: "UAE — Abu Dhabi. (Dubai is a big city, but it is NOT the capital.)", hint: "It is NOT Dubai.", map: { kind: "world", place: "UAE", where: "Middle East (West Asia)", note: "On the Arabian Peninsula, next to Saudi Arabia and Oman." } },
    { key: "s4-q8", level: "hard", q: "What is the capital of Canada?", options: ["Ottawa", "Toronto", "Washington, D.C.", "Mexico City"], answer: "Ottawa", point: "Canada — Ottawa. (Toronto is a big city, but it is NOT the capital.)", map: { kind: "world", place: "Canada", where: "North America", note: "North of the USA — the second-largest country in the world." } },
    { key: "s4-q9", level: "hard", q: "What is the capital of Turkey?", options: ["Ankara", "Istanbul", "Baghdad", "Tehran"], answer: "Ankara", point: "Turkey — Ankara. (Istanbul is a big city, but it is NOT the capital.)", map: { kind: "world", place: "Turkey", where: "West Asia / Europe", note: "Between Europe and Asia, north of Syria and Iraq." } },
    { key: "s4-q10", level: "hard", q: "What is the capital of Nepal?", options: ["Kathmandu", "Thimphu", "Dhaka", "Colombo"], answer: "Kathmandu", point: "Nepal — Kathmandu.", hint: "It is north of India, in the Himalayas.", map: { kind: "world", place: "Nepal", where: "South Asia", note: "North of India, in the Himalayas — Mount Everest is here." } },
  ],
  5: [
    { key: "s5-q1", level: "easy", q: "What is the capital of Kerala?", options: ["Thiruvananthapuram", "Chennai", "Bengaluru", "Kochi"], answer: "Thiruvananthapuram", point: "Kerala — Thiruvananthapuram.", hint: "It is our home state, in South India.", map: { kind: "india", place: "Kerala", where: "South India", note: "On the SOUTH-WEST coast of India, on the Arabian Sea." } },
    { key: "s5-q2", level: "easy", q: "What is the capital of Tamil Nadu?", options: ["Chennai", "Madurai", "Bengaluru", "Hyderabad"], answer: "Chennai", point: "Tamil Nadu — Chennai.", hint: "It is the state next to Kerala, on the east.", map: { kind: "india", place: "Tamil Nadu", where: "South India", note: "On the SOUTH-EAST coast of India, next to Kerala." } },
    { key: "s5-q3", level: "medium", q: "What is the capital of Karnataka?", options: ["Bengaluru", "Chennai", "Mumbai", "Panaji"], answer: "Bengaluru", point: "Karnataka — Bengaluru.", hint: "It is the state above Kerala.", map: { kind: "india", place: "Karnataka", where: "South India", note: "In South India, above Kerala, on the west coast." } },
    { key: "s5-q4", level: "medium", q: "What is the capital of Rajasthan?", options: ["Jaipur", "Lucknow", "Bhopal", "Patna"], answer: "Jaipur", point: "Rajasthan — Jaipur. The Thar Desert is in Rajasthan.", hint: "It is in the west of India.", map: { kind: "india", place: "Rajasthan", where: "West India", note: "In the WEST of India, next to Pakistan — the Thar Desert is here." } },
    { key: "s5-q5", level: "medium", q: "What is the capital of West Bengal?", options: ["Kolkata", "Patna", "Ranchi", "Bhubaneswar"], answer: "Kolkata", point: "West Bengal — Kolkata. Kolkata is on the Hooghly river.", hint: "It is in the east of India.", map: { kind: "india", place: "West Bengal", where: "East India", note: "In the EAST of India, on the Bay of Bengal." } },
    { key: "s5-q6", level: "medium", q: "What is the capital of Maharashtra?", options: ["Mumbai", "Pune", "Gandhinagar", "Bhopal"], answer: "Mumbai", point: "Maharashtra — Mumbai. Mumbai is the largest city in India.", hint: "It is on the west coast.", map: { kind: "india", place: "Maharashtra", where: "West India", note: "On the WEST coast of India, below Gujarat." } },
    { key: "s5-q7", level: "medium", q: "What is the capital of Assam?", options: ["Dispur", "Shillong", "Imphal", "Kohima"], answer: "Dispur", point: "Assam — Dispur.", hint: "It is in the North-East.", map: { kind: "india", place: "Assam", where: "North-East India", note: "In the NORTH-EAST — the state that joins the 7 sisters to the rest of India." } },
    { key: "s5-q8", level: "hard", q: "Which state is called the 'Heart of India'?", options: ["Madhya Pradesh", "Uttar Pradesh", "Chhattisgarh", "Bihar"], answer: "Madhya Pradesh", point: "Madhya Pradesh is in the very centre — that is why it is called the 'Heart of India'. Its capital is Bhopal.", map: { kind: "india", place: "Madhya Pradesh", where: "Central India", note: "In the very CENTRE of India — the 'Heart of India'." } },
    { key: "s5-q9", level: "hard", q: "Chandigarh is the capital of which TWO states?", options: ["Punjab and Haryana", "Kerala and Tamil Nadu", "Gujarat and Rajasthan", "Bihar and Jharkhand"], answer: "Punjab and Haryana", point: "Chandigarh is the capital of two states — Punjab and Haryana — and is also a Union Territory itself." },
    { key: "s5-q10", level: "hard", q: "What is the capital of Sikkim?", options: ["Gangtok", "Itanagar", "Aizawl", "Agartala"], answer: "Gangtok", point: "Sikkim — Gangtok.", hint: "It is a small state in the North-East, near Nepal.", map: { kind: "india", place: "Sikkim", where: "North-East India", note: "A small state in the NORTH-EAST, near Nepal — Kanchenjunga is here." } },
  ],
  6: [
    { key: "s6-q1", level: "easy", q: "What is the LONGEST river of India?", options: ["Ganga", "Yamuna", "Kaveri", "Narmada"], answer: "Ganga", point: "The Ganga is the longest river of India." },
    { key: "s6-q2", level: "medium", q: "The Ganga flows in which direction?", options: ["East, into the Bay of Bengal", "West, into the Arabian Sea", "North, into the Himalayas", "South, into the Indian Ocean"], answer: "East, into the Bay of Bengal", point: "The Ganga flows east into the Bay of Bengal.", hint: "It ends in the sea on the east side." },
    { key: "s6-q3", level: "easy", q: "Which mountain range is in the north of India?", options: ["The Himalayas", "The Western Ghats", "The Eastern Ghats", "The Thar Desert"], answer: "The Himalayas", point: "The Himalayas are in the north — the highest mountains in the world.", hint: "Mount Everest is in this range.", map: { kind: "india", place: "The Himalayas", where: "North India", note: "Across the NORTH of India, on the border with Nepal and China." } },
    { key: "s6-q4", level: "medium", q: "What is the HIGHEST peak in India?", options: ["Kanchenjunga", "Mount Everest", "Kanyakumari", "Thar Desert"], answer: "Kanchenjunga", point: "Kanchenjunga (8,586 m) in Sikkim is the highest peak in India. Mount Everest (8,849 m) is in Nepal.", hint: "It is in Sikkim." },
    { key: "s6-q5", level: "medium", q: "Mount Everest (8,849 m) is in which country?", options: ["Nepal", "India", "Pakistan", "Bhutan"], answer: "Nepal", point: "Mount Everest (8,849 m) is in Nepal, on the Nepal–China border." },
    { key: "s6-q6", level: "easy", q: "Which desert is in Rajasthan, in the west of India?", options: ["Thar Desert", "Sahara Desert", "Arabian Sea", "Western Ghats"], answer: "Thar Desert", point: "The Thar Desert is in Rajasthan, in the west of India.", hint: "It has the same name as the state it is in — no, think: Rajasthan's desert.", map: { kind: "india", place: "Thar Desert", where: "West India (Rajasthan)", note: "In the WEST, in Rajasthan, next to Pakistan." } },
    { key: "s6-q7", level: "medium", q: "What is the southern tip of India called?", options: ["Kanyakumari", "Kochi", "Chennai", "Port Blair"], answer: "Kanyakumari", point: "Kanyakumari (Tamil Nadu) is the southern tip of India — where 3 seas meet.", hint: "It is in Tamil Nadu.", map: { kind: "india", place: "Kanyakumari", where: "South India (Tamil Nadu)", note: "The very BOTTOM tip of India, in Tamil Nadu." } },
    { key: "s6-q8", level: "medium", q: "Which mountain range is on the WEST coast of India?", options: ["Western Ghats", "Eastern Ghats", "The Himalayas", "The Thar Desert"], answer: "Western Ghats", point: "The Western Ghats are on the west coast; the Eastern Ghats are on the east coast." },
    { key: "s6-q9", level: "hard", q: "Which of these countries does NOT share a land border with India?", options: ["Thailand", "Nepal", "Bhutan", "Bangladesh"], answer: "Thailand", point: "India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan. Thailand is NOT one of them." },
    { key: "s6-q10", level: "hard", q: "The Yamuna, Brahmaputra, Godavari and Krishna are all rivers of which country?", options: ["India", "Egypt", "Brazil", "China"], answer: "India", point: "Yamuna, Brahmaputra, Godavari, Krishna, Kaveri, Narmada, Tapti and Indus are great rivers of India." },
  ],
  7: [
    { key: "s7-q1", level: "easy", q: "In which country is Makkah?", options: ["Saudi Arabia", "Egypt", "Iraq", "Turkey"], answer: "Saudi Arabia", point: "Makkah is in Saudi Arabia. The Ka'ba is there — the Qibla for Muslims.", hint: "Madinah is in the same country.", map: { kind: "world", place: "Makkah", where: "Saudi Arabia", note: "In Saudi Arabia, on the western side, near the Red Sea." } },
    { key: "s7-q2", level: "easy", q: "In which country is Madinah?", options: ["Saudi Arabia", "Palestine", "Syria", "Morocco"], answer: "Saudi Arabia", point: "Madinah is in Saudi Arabia. Masjid an-Nabawi is there — the Prophet's city (Hijrah).", hint: "Makkah is in the same country.", map: { kind: "world", place: "Madinah", where: "Saudi Arabia", note: "In Saudi Arabia, north of Makkah." } },
    { key: "s7-q3", level: "medium", q: "Masjid al-Aqsa is in which city?", options: ["Jerusalem", "Makkah", "Cairo", "Baghdad"], answer: "Jerusalem", point: "Jerusalem (Bayt al-Maqdis) in Palestine — Masjid al-Aqsa, the first Qibla.", hint: "It is in Palestine.", map: { kind: "world", place: "Jerusalem", where: "Palestine", note: "In Palestine, on the east side of the Mediterranean Sea." } },
    { key: "s7-q4", level: "medium", q: "Cairo, the capital of Egypt, is on which river?", options: ["Nile", "Ganga", "Amazon", "Indus"], answer: "Nile", point: "Cairo is the capital of Egypt, on the river Nile. Al-Azhar is in Cairo.", hint: "It is the longest river in the world.", map: { kind: "world", place: "Cairo", where: "Egypt", note: "In Egypt, on the river Nile, near the Mediterranean Sea." } },
    { key: "s7-q5", level: "medium", q: "Baghdad is the capital of which country?", options: ["Iraq", "Iran", "Syria", "Turkey"], answer: "Iraq", point: "Baghdad is the capital of Iraq — the old Abbasid capital.", hint: "It is in the Middle East.", map: { kind: "world", place: "Baghdad", where: "Iraq", note: "In Iraq, in the Middle East, east of Syria." } },
    { key: "s7-q6", level: "medium", q: "Damascus is the capital of which country?", options: ["Syria", "Iraq", "Jordan", "Lebanon"], answer: "Syria", point: "Damascus is the capital of Syria — one of the oldest cities in the world.", hint: "It is next to Iraq and Turkey.", map: { kind: "world", place: "Damascus", where: "Syria", note: "In Syria, in the Middle East, next to Turkey and Iraq." } },
    { key: "s7-q7", level: "medium", q: "Istanbul is in which country?", options: ["Turkey", "Egypt", "Iraq", "Iran"], answer: "Turkey", point: "Istanbul, Turkey — the old Ottoman capital, on the Bosphorus.", hint: "Its capital is Ankara.", map: { kind: "world", place: "Istanbul", where: "Turkey", note: "In Turkey, between Europe and Asia." } },
    { key: "s7-q8", level: "hard", q: "Karbala — where Imam Hussain (RA) was martyred — is in which country?", options: ["Iraq", "Saudi Arabia", "Iran", "Syria"], answer: "Iraq", point: "Karbala is in Iraq — where Imam Hussain (RA) was martyred.", hint: "Baghdad is in the same country.", map: { kind: "world", place: "Karbala", where: "Iraq", note: "In Iraq, south of Baghdad." } },
    { key: "s7-q9", level: "hard", q: "Najaf — the resting place of Ali ibn Abi Talib (RA) — is in which country?", options: ["Iraq", "Egypt", "Turkey", "Palestine"], answer: "Iraq", point: "Najaf is in Iraq — the resting place of Ali ibn Abi Talib (RA).", hint: "Karbala is in the same country.", map: { kind: "world", place: "Najaf", where: "Iraq", note: "In Iraq, south of Baghdad, near Karbala." } },
    { key: "s7-q10", level: "hard", q: "Fez and Cordoba were famous old centres of Islamic learning. In which countries are they?", options: ["Morocco and Spain", "Egypt and Iraq", "Turkey and Syria", "India and Pakistan"], answer: "Morocco and Spain", point: "Fez is in Morocco and Cordoba is in Spain — famous old centres of Islamic learning." },
  ],
  8: [
    { key: "s8-q1", level: "medium", q: "Which is the LARGEST country in the world by area?", options: ["Russia", "China", "India", "USA"], answer: "Russia", point: "Russia is the largest country in the world by area.", hint: "It is across the north of Europe and Asia.", map: { kind: "world", place: "Russia", where: "Europe and Asia", note: "The biggest country — across the north of Europe AND Asia." } },
    { key: "s8-q2", level: "medium", q: "Which country has the LARGEST population in the world?", options: ["India", "China", "USA", "Indonesia"], answer: "India", point: "India is the largest country in the world by population." },
    { key: "s8-q3", level: "medium", q: "The Nile is the longest river in the world. Into which sea does it flow?", options: ["Mediterranean Sea", "Red Sea", "Arabian Sea", "Bay of Bengal"], answer: "Mediterranean Sea", point: "The Nile (about 6,650 km, in Africa) flows into the Mediterranean Sea.", hint: "It is the sea between Europe and Africa.", map: { kind: "world", place: "River Nile", where: "Africa (Egypt)", note: "In Africa — it flows north through Egypt into the Mediterranean Sea." } },
    { key: "s8-q4", level: "hard", q: "Which river is the LARGEST in the world by the amount of water?", options: ["Amazon", "Nile", "Ganga", "Brahmaputra"], answer: "Amazon", point: "The Amazon (South America) is the largest river by water. It flows into the Atlantic Ocean.", hint: "It is in South America." },
    { key: "s8-q5", level: "easy", q: "What is the HIGHEST mountain in the world?", options: ["Mount Everest", "Kanchenjunga", "The Himalayas", "The Andes"], answer: "Mount Everest", point: "Mount Everest (8,849 m) is the highest mountain in the world.", hint: "It is in Nepal." },
    { key: "s8-q6", level: "hard", q: "Mount Everest (8,849 m) is on the border of which TWO countries?", options: ["Nepal and China", "India and Nepal", "Pakistan and China", "India and China"], answer: "Nepal and China", point: "Mount Everest (8,849 m) is on the Nepal–China border." },
    { key: "s8-q7", level: "medium", q: "Which is the LARGEST hot desert in the world?", options: ["Sahara Desert", "Thar Desert", "Antarctic Desert", "Bay of Bengal"], answer: "Sahara Desert", point: "The Sahara Desert, in North Africa, is the largest hot desert.", hint: "It is in Africa.", map: { kind: "world", place: "Sahara Desert", where: "North Africa", note: "In NORTH Africa — the big desert above the middle of Africa." } },
    { key: "s8-q8", level: "hard", q: "Which is the LARGEST desert of all (a cold desert)?", options: ["Antarctic Desert", "Sahara Desert", "Thar Desert", "Arabian Sea"], answer: "Antarctic Desert", point: "The Antarctic Desert is the largest desert of all — Antarctica is a cold desert." },
    { key: "s8-q9", level: "medium", q: "Which is the LONGEST mountain range in the world?", options: ["Andes", "Himalayas", "Western Ghats", "Eastern Ghats"], answer: "Andes", point: "The Andes, in South America along the west coast, are the longest mountain range.", hint: "It is in South America." },
    { key: "s8-q10", level: "hard", q: "Which is the LARGEST island in the world?", options: ["Greenland", "Australia", "Sri Lanka", "Japan"], answer: "Greenland", point: "Greenland is the largest island in the world (in North America, near Canada).", hint: "It is near Canada, in the north.", map: { kind: "world", place: "Greenland", where: "North America", note: "In the far north, near Canada — the largest island in the world." } },
  ],
};

// All 65 capitals from the Full Pack (45 Task-2 + 20 extra), for the
// Stage-4 study sheet. [country, capital]
const MAP_GAME_ALL_CAPITALS = [
  ["United Kingdom", "London"], ["France", "Paris"], ["Germany", "Berlin"], ["Italy", "Rome"],
  ["Spain", "Madrid"], ["Portugal", "Lisbon"], ["Norway", "Oslo"], ["Sweden", "Stockholm"],
  ["Greece", "Athens"], ["Ukraine", "Kyiv"],
  ["Egypt", "Cairo"], ["South Africa", "Pretoria *"], ["Nigeria", "Abuja"], ["Kenya", "Nairobi"],
  ["Ethiopia", "Addis Ababa"], ["Algeria", "Algiers"], ["Morocco", "Rabat"],
  ["Dem. Rep. of Congo", "Kinshasa"], ["Ghana", "Accra"], ["Tanzania", "Dodoma"],
  ["India", "New Delhi"], ["China", "Beijing"], ["Japan", "Tokyo"], ["Russia", "Moscow"],
  ["Pakistan", "Islamabad"], ["Bangladesh", "Dhaka"], ["Nepal", "Kathmandu"],
  ["Saudi Arabia", "Riyadh"], ["Indonesia", "Jakarta"], ["South Korea", "Seoul"],
  ["United States", "Washington, D.C."], ["Canada", "Ottawa"], ["Mexico", "Mexico City"],
  ["Cuba", "Havana"], ["Jamaica", "Kingston"],
  ["Brazil", "Brasilia"], ["Argentina", "Buenos Aires"], ["Chile", "Santiago"], ["Peru", "Lima"],
  ["Colombia", "Bogota"], ["Venezuela", "Caracas"], ["Ecuador", "Quito"],
  ["Australia", "Canberra"], ["New Zealand", "Wellington"], ["Papua New Guinea", "Port Moresby"],
  ["UAE", "Abu Dhabi"], ["Qatar", "Doha"], ["Kuwait", "Kuwait City"], ["Oman", "Muscat"],
  ["Yemen", "Sana'a"], ["Jordan", "Amman"], ["Lebanon", "Beirut"], ["Syria", "Damascus"],
  ["Iraq", "Baghdad"], ["Iran", "Tehran"], ["Turkey", "Ankara"], ["Afghanistan", "Kabul"],
  ["Bhutan", "Thimphu"], ["Myanmar", "Naypyidaw"], ["Sri Lanka", "Colombo *"], ["Maldives", "Male"],
  ["Thailand", "Bangkok"], ["Malaysia", "Kuala Lumpur"], ["Singapore", "Singapore"], ["Vietnam", "Hanoi"],
];

// Study-sheet facts per stage, for the weak-section PDF (B&W, print-ready).
// Each fact is one short line. Stage 4 uses MAP_GAME_ALL_CAPITALS instead.
const MAP_GAME_SHEETS = {
  1: { title: "Map-Reading Basics", facts: [
    "North is up, South is down, East is right, West is left on most maps.",
    "The compass rose shows the directions.",
    "The Equator is the middle line (0 degrees). India is north of it.",
    "The Prime Meridian is the starting line (0 degrees) running through London, England.",
    "Latitude lines run east–west; longitude lines run north–south.",
    "First look at the title and the key / legend — what colours and symbols mean.",
    "Then find the place by its shape and position.",
    "India is the triangle pointing down into the Indian Ocean.",
    "Italy is the boot kicking Sicily.",
    "India touches the Arabian Sea (west), the Bay of Bengal (east) and the Indian Ocean (south).",
    "Exam plan (60 minutes): do the questions you are sure of first. Keep the last 5 minutes to recheck.",
  ] },
  2: { title: "Continents & Oceans", facts: [
    "Asia — largest continent. Largest country in it: China. India is in South Asia.",
    "Africa — largest country: Algeria. The Sahara desert is here.",
    "North America — largest country: Canada. USA, Canada, Mexico.",
    "South America — largest country: Brazil. The Amazon river is here.",
    "Europe — small, many countries. Russia is partly in Europe and Asia.",
    "Australia (Oceania) — smallest continent; also a country.",
    "Antarctica — coldest, at the South Pole. No permanent country.",
    "Oceans, largest to smallest: Pacific, Atlantic, Indian, Southern, Arctic.",
    "India touches: Arabian Sea (west), Bay of Bengal (east), Indian Ocean (south).",
    "Mediterranean Sea — between Europe and Africa.",
    "Red Sea — between Africa and Saudi Arabia.",
    "Caspian Sea — the world's largest lake / sea, between Europe and Asia.",
  ] },
  3: { title: "Asia", facts: [
    "South Asia: India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Myanmar, Maldives, Afghanistan.",
    "Middle East / West Asia: Saudi Arabia, UAE, Qatar, Kuwait, Oman, Yemen, Jordan, Lebanon, Syria, Iraq, Iran, Turkey, Israel, Palestine.",
    "East & South-East Asia: China, Japan, South Korea, North Korea, Mongolia, Thailand, Vietnam, Malaysia, Singapore, Indonesia, Philippines.",
    "India — triangle pointing down. Saudi Arabia — big country on the Arabian Peninsula.",
    "China — big country north-east of India. Japan — a chain of islands east of China.",
    "Indonesia — many islands south-east of Asia. Sri Lanka — a small teardrop island just below India.",
  ] },
  4: { title: "World Capitals — all 65", facts: [
    "Learn country + capital together, continent by continent.",
    "* South Africa has 3 capitals. Pretoria is the administrative capital — the one to answer in a quiz.",
    "* Sri Lanka: Colombo is the executive / judicial capital. Answer Colombo in a school quiz.",
    "Tricky ones: Australia — Canberra (NOT Sydney). UAE — Abu Dhabi (NOT Dubai).",
    "Turkey — Ankara (NOT Istanbul). Canada — Ottawa (NOT Toronto).",
  ] },
  5: { title: "India States", facts: [
    "North: Jammu & Kashmir (UT — Srinagar / Jammu), Ladakh (UT — Leh), Himachal Pradesh — Shimla, Uttarakhand — Dehradun, Haryana — Chandigarh, Punjab — Chandigarh, Uttar Pradesh — Lucknow, Delhi (UT — New Delhi), Rajasthan — Jaipur.",
    "South: Kerala — Thiruvananthapuram, Tamil Nadu — Chennai, Karnataka — Bengaluru, Andhra Pradesh — Amaravati, Telangana — Hyderabad.",
    "East: West Bengal — Kolkata, Bihar — Patna, Jharkhand — Ranchi, Odisha — Bhubaneswar.",
    "West & Central: Gujarat — Gandhinagar, Maharashtra — Mumbai, Goa — Panaji, Madhya Pradesh — Bhopal, Chhattisgarh — Raipur.",
    "North-East (7 sisters + Sikkim): Assam — Dispur, Arunachal Pradesh — Itanagar, Manipur — Imphal, Meghalaya — Shillong, Mizoram — Aizawl, Nagaland — Kohima, Tripura — Agartala, Sikkim — Gangtok.",
    "Union Territories (8): Andaman and Nicobar Islands — Port Blair; Chandigarh — Chandigarh; Dadra and Nagar Haveli and Daman and Diu — Daman; Delhi — New Delhi; Jammu and Kashmir — Srinagar (summer) / Jammu (winter); Ladakh — Leh; Lakshadweep — Kavaratti; Puducherry — Puducherry.",
    "Remember: Chandigarh is the capital of TWO states (Punjab and Haryana) and is also a Union Territory itself.",
    "Madhya Pradesh is in the very centre — that is why it is called the 'Heart of India'.",
    "Kanyakumari (Tamil Nadu) is the southern tip of India. Lakshadweep (UT — Kavaratti) is in the Arabian Sea, west of Kerala.",
    "Mumbai is the largest city in India. Kolkata is on the Hooghly river.",
  ] },
  6: { title: "Rivers & Mountains", facts: [
    "Capital of India: New Delhi.",
    "Land neighbours (7): Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar, Afghanistan.",
    "Island neighbour: Sri Lanka (across the Palk Strait).",
    "Longest river: Ganga — flows east into the Bay of Bengal.",
    "Other great rivers: Yamuna, Brahmaputra, Godavari, Krishna, Kaveri, Narmada, Tapti, Indus.",
    "Mountain range in the north: The Himalayas — the highest mountains in the world.",
    "Highest peak in India: Kanchenjunga (8,586 m) — in Sikkim.",
    "Mount Everest (8,849 m) is in Nepal, on the Nepal–China border.",
    "Western Ghats (west coast) and Eastern Ghats (east coast).",
    "Desert: Thar Desert — in Rajasthan, in the west.",
    "Southern tip: Kanyakumari, Tamil Nadu — where 3 seas meet.",
    "Seas around India: Arabian Sea (west), Bay of Bengal (east), Indian Ocean (south).",
  ] },
  7: { title: "Holy & Famous Places", facts: [
    "Makkah — Saudi Arabia. The Ka'ba; the Qibla for Muslims.",
    "Madinah — Saudi Arabia. Masjid an-Nabawi; the Prophet's city (Hijrah).",
    "Jerusalem (Bayt al-Maqdis) — Palestine. Masjid al-Aqsa — the first Qibla.",
    "Cairo — Egypt. Capital of Egypt; Al-Azhar; on the Nile.",
    "Baghdad — Iraq. Capital of Iraq; old Abbasid capital.",
    "Damascus — Syria. Capital of Syria; one of the oldest cities.",
    "Istanbul — Turkey. Old Ottoman capital; on the Bosphorus.",
    "Karbala — Iraq. Where Imam Hussain (RA) was martyred.",
    "Najaf — Iraq. Resting place of Ali ibn Abi Talib (RA).",
    "Fez (Morocco) and Cordoba (Spain) — famous old centres of Islamic learning.",
  ] },
  8: { title: "Biggest / Longest / Highest", facts: [
    "Largest continent: Asia. Smallest continent: Australia.",
    "Largest ocean: Pacific Ocean.",
    "Largest country (area): Russia. Largest country (population): India.",
    "Longest river in the world: Nile (Africa, about 6,650 km) — flows into the Mediterranean Sea.",
    "Largest river by water: Amazon (South America) — flows into the Atlantic Ocean.",
    "Highest mountain in the world: Mount Everest (8,849 m) — Nepal / China border.",
    "Largest hot desert: Sahara Desert — in North Africa.",
    "Largest desert (all): Antarctic Desert — Antarctica is a cold desert.",
    "Longest mountain range: Andes — in South America, along the west coast.",
    "Largest island: Greenland (in North America, near Canada).",
    "Sea between Europe and Africa: Mediterranean Sea. Sea between Africa and Arabia: Red Sea.",
    "River through Egypt: Nile — Cairo is on the Nile.",
  ] },
};

module.exports = { MAP_GAME_STAGES, MAP_GAME_QUESTIONS, MAP_GAME_PASS_MARK, MAP_GAME_TIME_PER_Q, MAP_GAME_ALL_CAPITALS, MAP_GAME_SHEETS };
