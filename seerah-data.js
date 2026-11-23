// ─────────────────────────────────────────────────────────────
// Seerah Quiz game (Nov 2026 — Samad): 200 questions in 6 parts,
// for Faaz (Ad 494) — the same boy as the Map Study game.
// SOURCE: ~/workspace/seerah-quiz/questions.json — content EXACT as
// given (questions, 6 options each, correct_index, answer_full =
// the book's full answer). Do not edit the wording.
// How it plays: pick a part, answer one question at a time (tap one
// of 6 options), instant correct/wrong + the book's full answer,
// result screen with score, percentage, time and a full review.
// Game scores live ONLY in sq_game_* tables — never in points_log.
// English only, text only — no images of the Prophet (PBUH) or any Sahabi.
const SQ_PARTS = [
  { n: 1, name: "Birth and Early Life", count: 30 },
  { n: 2, name: "Family, Lineage and Relatives", count: 30 },
  { n: 3, name: "Wives: Mothers of the Believers", count: 30 },
  { n: 4, name: "Children and Grandchildren", count: 25 },
  { n: 5, name: "Prophethood, Makkah and Madinah Life", count: 40 },
  { n: 6, name: "Sahaba: The Companions", count: 45 },
];
const SQ_QUESTIONS = [
 {
  "num": 1,
  "question": "What is the full name of the Prophet (peace be upon him)?",
  "options": [
   "Muhammad ibn Abd al-Muttalib ibn Hashim ibn Abdullah ibn Abd Manaf",
   "Muhammad ibn Abd al-Muttalib ibn Abdullah ibn Hashim ibn Abd Manaf",
   "Muhammad ibn Abdullah ibn Abd al-Muttalib ibn Hashim ibn Abd Manaf",
   "Muhammad ibn Abdullah ibn Hashim ibn Abd al-Muttalib ibn Abd Manaf",
   "Muhammad ibn Abdullah ibn Abd al-Muttalib ibn Abd Manaf ibn Hashim",
   "Muhammad ibn Abdullah ibn Hashim ibn Abd Manaf ibn Abd al-Muttalib"
  ],
  "correct_index": 2,
  "answer_full": "Muhammad ibn Abdullah ibn Abd al-Muttalib ibn Hashim ibn Abd Manaf.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 2,
  "question": "In which city was the Prophet Muhammad (peace be upon him) born?",
  "options": [
   "Madinah al-Munawwarah",
   "Makkah al-Mukarramah",
   "Taif",
   "Tabuk",
   "Yathrib",
   "Khaybar"
  ],
  "correct_index": 1,
  "answer_full": "Makkah al-Mukarramah.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 3,
  "question": "In which year was the Prophet (peace be upon him) born?",
  "options": [
   "The Year of the Wolf (about 570 CE)",
   "The Year of the Elephant (about 622 CE)",
   "The Year of Sorrow (about 619 CE)",
   "The Year of the Elephant (about 632 CE)",
   "The Year of the Camel (about 571 CE)",
   "The Year of the Elephant (about 570 CE)"
  ],
  "correct_index": 5,
  "answer_full": "In the Year of the Elephant. The commonly cited approximate CE year is 570, though exact conversion and chronology are not certain.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 4,
  "question": "On which day of the week was the Prophet (peace be upon him) born?",
  "options": [
   "Thursday",
   "Wednesday",
   "Tuesday",
   "Friday",
   "Monday",
   "Sunday"
  ],
  "correct_index": 4,
  "answer_full": "Monday.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 5,
  "question": "In which Islamic month was the Prophet (peace be upon him) born?",
  "options": [
   "Muharram",
   "Ramadan",
   "Dhul-Hijjah",
   "Rabi al-Awwal",
   "Rajab",
   "Sha'ban"
  ],
  "correct_index": 3,
  "answer_full": "Rabi al-Awwal is the commonly reported month. The exact date is disputed; 12 Rabi al-Awwal is a well-known opinion, not unanimous.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 6,
  "question": "What was the name of the Prophet's father?",
  "options": [
   "Abu Talib ibn Abd al-Muttalib",
   "Abdullah ibn Hashim",
   "Al-Harith ibn Abd al-Muttalib",
   "Abd al-Muttalib ibn Hashim",
   "Abd al-Uzza ibn Abd al-Muttalib",
   "Abdullah ibn Abd al-Muttalib"
  ],
  "correct_index": 5,
  "answer_full": "Abdullah ibn Abd al-Muttalib.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 7,
  "question": "What was the name of the Prophet's mother?",
  "options": [
   "Khadijah bint Khuwaylid",
   "Aminah bint Abd Manaf",
   "Fatimah bint Za'idah",
   "Halimah al-Sa'diyah",
   "Aminah bint Wahb",
   "Halah bint Wuhaib"
  ],
  "correct_index": 4,
  "answer_full": "Aminah bint Wahb.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 8,
  "question": "When did the Prophet's father Abdullah die?",
  "options": [
   "In the Year of Sorrow",
   "Before the Prophet's birth",
   "When the Prophet was 6 years old",
   "Shortly after the Prophet's birth",
   "When the Prophet was 8 years old",
   "When the Prophet was 2 years old"
  ],
  "correct_index": 1,
  "answer_full": "He died before the Prophet’s birth, according to the commonly reported account; some chronology details differ.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 9,
  "question": "Who named the child Muhammad?",
  "options": [
   "His grandfather, Abd al-Muttalib",
   "Wahb ibn Abd Manaf",
   "His father, Abdullah",
   "His uncle, Abu Talib",
   "Hashim ibn Abd Manaf",
   "Abd Manaf ibn Qusayy"
  ],
  "correct_index": 0,
  "answer_full": "His grandfather, Abd al-Muttalib.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 10,
  "question": "What does the name Muhammad mean?",
  "options": [
   "The praised servant",
   "The guided one",
   "The truthful one",
   "The chosen one",
   "The praised one",
   "The trustworthy one"
  ],
  "correct_index": 4,
  "answer_full": "The praised one.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 11,
  "question": "Who was the first woman to nurse the Prophet (peace be upon him)?",
  "options": [
   "Halah bint Wuhaib",
   "Fatimah bint Za'idah",
   "Thuwaybah",
   "Umm Ayman (Barakah)",
   "Halimah al-Sa'diyah",
   "Aminah bint Wahb"
  ],
  "correct_index": 2,
  "answer_full": "Thuwaybah, the freed slave-woman of Abu Lahab, for a few days.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 12,
  "question": "Who was the famous wet-nurse who raised the Prophet in the desert?",
  "options": [
   "Thuwaybah",
   "Halimah al-Sa'diyah",
   "Safiyyah bint Abd al-Muttalib",
   "Umm Ayman (Barakah)",
   "Fatimah bint Za'idah",
   "Aminah bint Wahb"
  ],
  "correct_index": 1,
  "answer_full": "Halimah al-Sa'diyah, from the tribe of Banu Sa'd.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 13,
  "question": "Why was the baby sent to the desert with Halimah?",
  "options": [
   "To be raised by his grandfather's tribe",
   "For pure air, strong health and pure Arabic",
   "Because his mother had died",
   "Because Makkah had no food that year",
   "To learn trade in the desert",
   "To hide him from the Quraysh"
  ],
  "correct_index": 1,
  "answer_full": "It was the custom of Makkah's noble families to send babies to the desert for pure air, strong health and pure Arabic language.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 14,
  "question": "Who was the Prophet's foster-father through Halimah?",
  "options": [
   "Wahb ibn Abd Manaf",
   "Abu Talib ibn Abd al-Muttalib",
   "Abd al-Muttalib ibn Hashim",
   "Abd al-Uzza ibn Abd al-Muttalib",
   "Al-Harith ibn Abd al-Uzza",
   "Al-Harith ibn Abd al-Muttalib"
  ],
  "correct_index": 4,
  "answer_full": "Al-Harith ibn Abd al-Uzza, Halimah's husband.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 15,
  "question": "Which uncle of the Prophet was also his foster-brother?",
  "options": [
   "Abu Talib ibn Abd al-Muttalib",
   "Hamzah ibn Abd al-Muttalib",
   "Az-Zubayr ibn Abd al-Muttalib",
   "Al-Abbas ibn Abd al-Muttalib",
   "Abu Lahab ibn Abd al-Muttalib",
   "Al-Harith ibn Abd al-Muttalib"
  ],
  "correct_index": 1,
  "answer_full": "Hamzah ibn Abd al-Muttalib - both were nursed by Thuwaybah.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 16,
  "question": "What miraculous event happened to the young Muhammad in the desert?",
  "options": [
   "The opening of his chest by angels (Shaqq al-Sadr)",
   "A cloud shaded him wherever he went",
   "A light shone from his forehead",
   "He spoke in the cradle",
   "The idols of Makkah fell down",
   "The moon split above the desert"
  ],
  "correct_index": 0,
  "answer_full": "The opening of his chest (Shaqq al-Sadr) by angels, who washed his heart - reported in Sahih Muslim.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 17,
  "question": "At what age did the Prophet's mother Aminah die?",
  "options": [
   "5 years old",
   "6 years old",
   "8 years old",
   "9 years old",
   "4 years old",
   "7 years old"
  ],
  "correct_index": 1,
  "answer_full": "When he was 6 years old, at a place called al-Abwa, on the return journey from Yathrib.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 18,
  "question": "Who took care of the Prophet after his mother died?",
  "options": [
   "His uncle Al-Abbas",
   "His uncle Abu Lahab",
   "His uncle Abu Talib",
   "His grandfather Abd al-Muttalib",
   "Wahb ibn Abd Manaf",
   "His uncle Hamzah"
  ],
  "correct_index": 3,
  "answer_full": "His grandfather Abd al-Muttalib, and Umm Ayman looked after him daily.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 19,
  "question": "At what age did the Prophet's grandfather die?",
  "options": [
   "6 years old",
   "7 years old",
   "10 years old",
   "12 years old",
   "9 years old",
   "8 years old"
  ],
  "correct_index": 5,
  "answer_full": "When the Prophet was 8 years old.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 20,
  "question": "Who took care of the Prophet after his grandfather died?",
  "options": [
   "His uncle Abu Lahab ibn Abd al-Muttalib",
   "His uncle Az-Zubayr ibn Abd al-Muttalib",
   "His uncle Al-Abbas ibn Abd al-Muttalib",
   "His uncle Al-Harith ibn Abd al-Muttalib",
   "His uncle Hamzah ibn Abd al-Muttalib",
   "His uncle Abu Talib ibn Abd al-Muttalib"
  ],
  "correct_index": 5,
  "answer_full": "His uncle Abu Talib ibn Abd al-Muttalib.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 21,
  "question": "Who was Umm Ayman?",
  "options": [
   "A freed slave-woman of Abu Lahab",
   "His paternal aunt",
   "Barakah, his Abyssinian caretaker from childhood",
   "The wife of Abu Talib",
   "His grandmother from Banu Zuhrah",
   "His wet-nurse from Banu Sa'd"
  ],
  "correct_index": 2,
  "answer_full": "Barakah, an Abyssinian woman who was the Prophet's caretaker from childhood. He called her 'my mother after my mother'.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 22,
  "question": "At what age did the Prophet travel to Syria with Abu Talib?",
  "options": [
   "About 12 years old",
   "About 9 years old",
   "About 20 years old",
   "About 17 years old",
   "About 10 years old",
   "About 15 years old"
  ],
  "correct_index": 0,
  "answer_full": "At about 12 years old, according to the well-known Seerah account.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 23,
  "question": "Which monk is reported in Seerah accounts to have recognized signs of Prophethood in the young Muhammad in Syria?",
  "options": [
   "Tamim al-Dari",
   "Zayd ibn Amr ibn Nufayl",
   "Waraqah ibn Nawfal",
   "Salman al-Farsi",
   "Bahira",
   "Abdullah ibn Salam"
  ],
  "correct_index": 4,
  "answer_full": "Bahira. This story appears in Seerah reports, but its details and authenticity are discussed by scholars.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 24,
  "question": "What job did the young Muhammad do?",
  "options": [
   "A shepherd, then a caravan guard",
   "A shepherd, then a trader",
   "A farmer, then a trader",
   "A shepherd, then a scribe",
   "A carpenter, then a merchant",
   "A blacksmith, then a trader"
  ],
  "correct_index": 1,
  "answer_full": "He was a shepherd in his youth, and later a trader / merchant.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 25,
  "question": "What title did the people of Makkah give Muhammad before Prophethood?",
  "options": [
   "Al-Hakim (The Wise)",
   "Al-Amin (The Trustworthy)",
   "Al-Faruq (The Distinguisher)",
   "Al-Azim (The Great)",
   "Al-Karim (The Generous)",
   "Al-Mahdi (The Guided)"
  ],
  "correct_index": 1,
  "answer_full": "Al-Amin (The Trustworthy) and As-Sadiq (The Truthful).",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 26,
  "question": "At what age did the Prophet help rebuild the Kaaba and settle the Black Stone dispute?",
  "options": [
   "30 years old",
   "38 years old",
   "25 years old",
   "40 years old",
   "32 years old",
   "35 years old"
  ],
  "correct_index": 5,
  "answer_full": "At 35 years old. He placed the Black Stone on a cloth so all tribes could lift it together.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 27,
  "question": "Which pact of justice did the young Muhammad join in Makkah?",
  "options": [
   "The Charter of Madinah",
   "Hilf Bani Hashim",
   "The Pledge of Aqabah",
   "Hilf al-Mutayyibin",
   "Hilf al-Ahlaf",
   "Hilf al-Fudul"
  ],
  "correct_index": 5,
  "answer_full": "Hilf al-Fudul - a pact to protect the oppressed and help the wronged.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 28,
  "question": "For whom did Muhammad work as a trader before marriage?",
  "options": [
   "Waraqah ibn Nawfal",
   "Umm al-Fadl bint al-Harith",
   "Fatimah bint Za'idah",
   "Abu Talib ibn Abd al-Muttalib",
   "Khadijah bint Khuwaylid",
   "Abd al-Muttalib ibn Hashim"
  ],
  "correct_index": 4,
  "answer_full": "For Khadijah bint Khuwaylid, a wealthy and noble businesswoman of Makkah.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 29,
  "question": "At what age did the Prophet marry Khadijah?",
  "options": [
   "35 years old",
   "28 years old",
   "30 years old",
   "25 years old",
   "23 years old",
   "20 years old"
  ],
  "correct_index": 3,
  "answer_full": "The Prophet was commonly reported to be 25. Khadijah’s age is often given as 40, but historical reports differ.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 30,
  "question": "Who was Khadijah's servant who travelled with Muhammad and praised his honesty?",
  "options": [
   "Salman al-Farsi",
   "Maysarah",
   "Abdullah ibn Abi Bakr",
   "Anas ibn Malik",
   "Zayd ibn Harithah",
   "Bilal ibn Rabah"
  ],
  "correct_index": 1,
  "answer_full": "Maysarah.",
  "part": 1,
  "part_name": "Birth and Early Life"
 },
 {
  "num": 31,
  "question": "To which tribe did the Prophet (peace be upon him) belong?",
  "options": [
   "Banu Zuhrah",
   "Banu Umayyah",
   "Banu Hashim",
   "Banu Makhzum",
   "Quraysh",
   "Banu Sa'd"
  ],
  "correct_index": 4,
  "answer_full": "Quraysh, the leading tribe of Makkah.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 32,
  "question": "To which clan of Quraysh did he belong?",
  "options": [
   "Banu Makhzum",
   "Banu Taym",
   "Banu Umayyah",
   "Banu Hashim",
   "Banu Zuhrah",
   "Banu al-Muttalib"
  ],
  "correct_index": 3,
  "answer_full": "Banu Hashim.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 33,
  "question": "The Prophet's lineage goes back to which great Prophet through Ismail?",
  "options": [
   "Nuh, through his son Sam",
   "Musa, through his brother Harun",
   "Ibrahim, through his son Ismail",
   "Ibrahim, through his son Ishaq",
   "Adam, through his son Shith",
   "Ibrahim, through his grandson Ya'qub"
  ],
  "correct_index": 2,
  "answer_full": "Prophet Ibrahim (Abraham), through his son Ismail (Ishmael) - peace be upon them.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 34,
  "question": "Who was Hashim, after whom Banu Hashim is named?",
  "options": [
   "His great-great-grandfather, famous for feeding pilgrims",
   "His father-in-law through Khadijah",
   "His uncle, chief of Quraysh",
   "His grandfather, who named him Muhammad",
   "His great-grandfather, who rebuilt the Kaaba",
   "His grandfather, who rediscovered Zamzam"
  ],
  "correct_index": 0,
  "answer_full": "Hashim ibn Abd Manaf, the Prophet's great-great-grandfather, famous for feeding pilgrims in Makkah.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 35,
  "question": "Who was Abd al-Muttalib?",
  "options": [
   "His grandfather, who rediscovered the well of Zamzam",
   "His father, who died before his birth",
   "His maternal grandfather from Banu Zuhrah",
   "His great-great-grandfather, who fed pilgrims",
   "His grandfather, chief of Banu Zuhrah",
   "His uncle, who raised him"
  ],
  "correct_index": 0,
  "answer_full": "The Prophet's grandfather, chief of Banu Hashim, who rediscovered the well of Zamzam.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 36,
  "question": "Who dug / rediscovered the well of Zamzam?",
  "options": [
   "Ismail (peace be upon him)",
   "Hashim ibn Abd Manaf",
   "Abd al-Muttalib",
   "Abd Manaf ibn Qusayy",
   "Abu Talib ibn Abd al-Muttalib",
   "Ibrahim (peace be upon him)"
  ],
  "correct_index": 2,
  "answer_full": "Abd al-Muttalib.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 37,
  "question": "Who was Abu Talib to the Prophet?",
  "options": [
   "His full uncle who raised and protected him",
   "His youngest uncle",
   "His uncle who became a bitter enemy of Islam",
   "His grandfather's brother",
   "His maternal uncle",
   "His cousin and son-in-law"
  ],
  "correct_index": 0,
  "answer_full": "His full uncle (brother of his father Abdullah) who raised and protected him for over 40 years.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 38,
  "question": "Who was Abu Lahab to the Prophet?",
  "options": [
   "His uncle, the Lion of Allah",
   "His uncle who migrated to Abyssinia",
   "His maternal uncle from Banu Zuhrah",
   "His youngest uncle",
   "His uncle who became a bitter enemy of Islam",
   "His uncle who protected him in Makkah"
  ],
  "correct_index": 4,
  "answer_full": "His uncle, Abd al-Uzza ibn Abd al-Muttalib, who became a bitter enemy of Islam. Surah Al- Masad (111) was revealed about him and his wife.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 39,
  "question": "Who was Hamzah ibn Abd al-Muttalib to the Prophet?",
  "options": [
   "His cousin, martyred at Mu'tah",
   "His uncle, the first muezzin",
   "His uncle, father of the Abbasid caliphs",
   "His uncle, martyred at Badr",
   "His uncle, Asadullah (Lion of Allah), martyred at Uhud",
   "His uncle, who kept the Mushaf"
  ],
  "correct_index": 4,
  "answer_full": "His uncle, a brave warrior, called Asadullah - the Lion of Allah. He was martyred at Uhud.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 40,
  "question": "Who was Al-Abbas ibn Abd al-Muttalib to the Prophet?",
  "options": [
   "His uncle, father of Ali",
   "His youngest uncle, father of Abdullah ibn Abbas",
   "His uncle, martyred at Uhud",
   "His uncle, who raised him",
   "His maternal uncle",
   "His eldest uncle"
  ],
  "correct_index": 1,
  "answer_full": "His youngest uncle, father of Abdullah ibn Abbas. The Abbasid caliphs descend from him.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 41,
  "question": "Name some paternal uncles of the Prophet (peace be upon him).",
  "options": [
   "Hamzah, al-Abbas, Abu Talib, Abu Lahab, al-Zubayr, Shaybah",
   "Hamzah, al-Abbas, Abu Talib, Abu Lahab, Utbah, al-Harith",
   "Hamzah, Abu Sufyan, Abu Talib, Abu Lahab, al-Zubayr, al-Harith",
   "Hamzah, al-Abbas, Abu Jahl, Abu Lahab, al-Zubayr, al-Harith",
   "Hamzah, al-Abbas, Abu Talib, Abu Lahab, al-Zubayr, al-Harith",
   "Umar, al-Abbas, Abu Talib, Abu Lahab, al-Zubayr, al-Harith"
  ],
  "correct_index": 4,
  "answer_full": "Among those commonly listed are Hamzah, al-Abbas, Abu Talib, Abu Lahab, al-Zubayr, al-Harith, and others. Genealogical sources differ in the count and lists.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 42,
  "question": "Who was Safiyyah bint Abd al-Muttalib to the Prophet?",
  "options": [
   "His foster-mother from Banu Sa'd",
   "His paternal aunt; her son Tulayb was an early Muslim",
   "His paternal aunt, mother of Az-Zubayr ibn al-Awwam",
   "His paternal aunt, mother of Abu Salamah",
   "His paternal aunt, known for a dream before Badr",
   "His wife, from Banu Nadir"
  ],
  "correct_index": 2,
  "answer_full": "His paternal aunt, mother of Az-Zubayr ibn al-Awwam, and a brave Muslim woman.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 43,
  "question": "Who was the Prophet's cousin who became the fourth Caliph?",
  "options": [
   "Ja'far ibn Abi Talib",
   "Talhah ibn Ubaydullah",
   "Aqeel ibn Abi Talib",
   "Az-Zubayr ibn al-Awwam",
   "Abdullah ibn Abbas",
   "Ali ibn Abi Talib"
  ],
  "correct_index": 5,
  "answer_full": "Ali ibn Abi Talib, son of his uncle Abu Talib.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 44,
  "question": "Who was Ja'far ibn Abi Talib to the Prophet?",
  "options": [
   "His cousin, the fourth Caliph",
   "His cousin, the first ambassador to Madinah",
   "His cousin, Ja'far al-Tayyar, martyred at Mu'tah",
   "His cousin, martyred at Uhud",
   "His cousin, elder brother of Ali",
   "His cousin, the great Quran scholar"
  ],
  "correct_index": 2,
  "answer_full": "His cousin, brother of Ali, known as Ja'far al-Tayyar (Ja'far the Flyer) after he was martyred at Mu'tah.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 45,
  "question": "Who was Aqeel ibn Abi Talib to the Prophet?",
  "options": [
   "His foster-brother through Thuwaybah",
   "His cousin, martyred at Mu'tah",
   "His cousin, elder brother of Ali and Ja'far",
   "His youngest uncle",
   "His cousin, the fourth Caliph",
   "His cousin, son of Al-Abbas"
  ],
  "correct_index": 2,
  "answer_full": "His cousin, the elder brother of Ali and Ja'far.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 46,
  "question": "Who was Abdullah ibn Abbas to the Prophet?",
  "options": [
   "His uncle, father of the Abbasid caliphs",
   "His cousin, son of Abu Talib",
   "His cousin, son of Al-Abbas, a great Quran interpreter",
   "His son-in-law",
   "His cousin, martyred at Mu'tah",
   "His cousin, whose mother was Safiyyah"
  ],
  "correct_index": 2,
  "answer_full": "His cousin, son of Al-Abbas, famous as the great scholar and interpreter of the Quran among the Sahaba.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 47,
  "question": "Who was Umm al-Fadl to the Prophet?",
  "options": [
   "Lubabah bint al-Harith, wife of Abu Talib",
   "Lubabah bint al-Harith, wife of Al-Abbas",
   "Fatimah bint Za'idah, Khadijah's mother",
   "Hind bint Abi Umayyah, his wise wife",
   "Maymunah bint al-Harith, his last wife",
   "Barakah, his caretaker from childhood"
  ],
  "correct_index": 1,
  "answer_full": "Lubabah bint al-Harith, wife of Al-Abbas and aunt by marriage; she was among the earliest women to accept Islam.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 48,
  "question": "What was the name of the Prophet's mother-in-law through Khadijah and mother of Khadijah?",
  "options": [
   "Fatimah bint al-Khattab",
   "Aminah bint Abd Manaf",
   "Aminah bint Wahb",
   "Fatimah bint Asad",
   "Fatimah bint Za'idah",
   "Halah bint Wuhaib"
  ],
  "correct_index": 4,
  "answer_full": "Fatimah bint Za'idah.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 49,
  "question": "Who was Waraqah ibn Nawfal to the Prophet?",
  "options": [
   "A learned Christian relative of Khadijah",
   "His cousin, brother of Ali",
   "His maternal uncle",
   "The chief of Banu al-Mustaliq",
   "A monk who met him in Syria",
   "A Jewish scholar of Madinah"
  ],
  "correct_index": 0,
  "answer_full": "A relative of Khadijah and a learned Christian; the Seerah account says he recognized the first revelation as connected with the Prophethood.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 50,
  "question": "Which family protected the Prophet in Makkah even before Islam?",
  "options": [
   "Banu Hashim and Banu al-Muttalib",
   "Banu Hashim and Banu Sa'd",
   "Banu Hashim and Banu Umayyah",
   "Banu Zuhrah and Banu Taym",
   "Banu al-Muttalib and Banu Zuhrah",
   "Banu Umayyah and Banu Makhzum"
  ],
  "correct_index": 0,
  "answer_full": "Banu Hashim and Banu al-Muttalib, who stood with him during the boycott in Shi'b Abi Talib.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 51,
  "question": "What was the boycott of Shi'b Abi Talib?",
  "options": [
   "A boycott of about three years (7th–10th years of Prophethood)",
   "A boycott of one year (5th year of Prophethood)",
   "A boycott of about five years (7th–12th years of Prophethood)",
   "A boycott of forty days",
   "A boycott of about three years (1st–3rd years of Prophethood)",
   "A boycott of ten years"
  ],
  "correct_index": 0,
  "answer_full": "Quraysh imposed a boycott on Banu Hashim and Banu al-Muttalib for roughly three years, traditionally dated to the 7th–10th years of Prophethood.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 52,
  "question": "In which year did Abu Talib and Khadijah die?",
  "options": [
   "The 1st year of Prophethood",
   "The 13th year of Prophethood",
   "The 5th year of Prophethood",
   "The 7th year of Prophethood",
   "The 10th year of Prophethood (the Year of Sorrow)",
   "The 10th year after Hijrah"
  ],
  "correct_index": 4,
  "answer_full": "In the 10th year of Prophethood, traditionally called the Year of Sorrow (Am al-Huzn).",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 53,
  "question": "Who was Az-Zubayr ibn Abd al-Muttalib to the Prophet?",
  "options": [
   "His maternal uncle",
   "His uncle who became a bitter enemy of Islam",
   "His cousin, son of Safiyyah",
   "His youngest uncle",
   "His uncle, martyred at Uhud",
   "His paternal uncle, a chief of Banu Hashim"
  ],
  "correct_index": 5,
  "answer_full": "His paternal uncle, father-in-law relation through Safiyyah's family line and a chief of Banu Hashim.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 54,
  "question": "Who was the Prophet's aunt Arwa bint Abd al-Muttalib?",
  "options": [
   "His wife, from Banu Nadir",
   "His paternal aunt, mother of Abu Salamah",
   "His paternal aunt, mother of Az-Zubayr ibn al-Awwam",
   "His paternal aunt, known for a dream before Badr",
   "His foster-sister through Halimah",
   "His paternal aunt; her son Tulayb was an early Muslim"
  ],
  "correct_index": 5,
  "answer_full": "One of his paternal aunts; her son Tulayb was among the early Muslims.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 55,
  "question": "Who was Barrah bint Abd al-Muttalib to the Prophet?",
  "options": [
   "His paternal aunt; her son Tulayb was an early Muslim",
   "His paternal aunt, known for a dream before Badr",
   "His paternal aunt, mother of Az-Zubayr ibn al-Awwam",
   "His caretaker from childhood",
   "His paternal aunt, mother of Ja'far",
   "His paternal aunt, mother of Abu Salamah"
  ],
  "correct_index": 5,
  "answer_full": "His paternal aunt, mother of Abu Salamah, one of the early Sahaba.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 56,
  "question": "Who was Atikah bint Abd al-Muttalib?",
  "options": [
   "His paternal aunt, known for a dream before Badr",
   "His paternal aunt, mother of Az-Zubayr ibn al-Awwam",
   "His wife, mother of Ibrahim",
   "His paternal aunt, mother of Abu Salamah",
   "His paternal aunt; her son Tulayb was an early Muslim",
   "His foster-mother from Banu Sa'd"
  ],
  "correct_index": 0,
  "answer_full": "His paternal aunt, known for a dream she saw before the Battle of Badr.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 57,
  "question": "Which paternal uncle protected the Prophet in Makkah, although he did not accept Islam?",
  "options": [
   "Abu Talib ibn Abd al-Muttalib",
   "Al-Abbas ibn Abd al-Muttalib",
   "Hamzah ibn Abd al-Muttalib",
   "Az-Zubayr ibn Abd al-Muttalib",
   "Abu Lahab ibn Abd al-Muttalib",
   "Al-Harith ibn Abd al-Muttalib"
  ],
  "correct_index": 0,
  "answer_full": "Abu Talib ibn Abd al-Muttalib.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 58,
  "question": "Who was the Prophet’s foster mother besides Halimah al-Sa‘diyah?",
  "options": [
   "Fatimah bint Za'idah",
   "Safiyyah bint Abd al-Muttalib",
   "Thuwaybah",
   "Halah bint Wuhaib",
   "Umm Ayman (Barakah)",
   "Aminah bint Wahb"
  ],
  "correct_index": 2,
  "answer_full": "Thuwaybah is reported to have nursed him. Umm Ayman was his caretaker, but is not usually described as a wet-nurse.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 59,
  "question": "Who were the Prophet's foster siblings through Halimah?",
  "options": [
   "Abdullah, Unaysah and Barakah",
   "Abdullah, Asma and Hudhafah",
   "Hamzah, Unaysah and Hudhafah",
   "Abdullah, Unaysah and Hudhafah (al-Shayma)",
   "Zayd, Unaysah and Hudhafah",
   "Abdullah, Unaysah and Fatimah"
  ],
  "correct_index": 3,
  "answer_full": "Abdullah, Unaysah and Hudhafah (al-Shayma) - the children of Halimah.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 60,
  "question": "What is the term for the Prophet's family in the Quran and Hadith?",
  "options": [
   "Al-Ashara al-Mubashshara",
   "Ahl al-Bayt",
   "Al-Ansar",
   "Al-Muhajirun",
   "Ahl as-Suffah",
   "Banu Hashim"
  ],
  "correct_index": 1,
  "answer_full": "Ahl al-Bayt - the People of the House, especially Ali, Fatimah, Hasan and Husayn and his wives.",
  "part": 2,
  "part_name": "Family, Lineage and Relatives"
 },
 {
  "num": 61,
  "question": "What title is given to the wives of the Prophet (peace be upon him) in the Quran?",
  "options": [
   "Ummahat al-Mu'minin wa al-Muslimin",
   "Sahabiyyat (Women Companions)",
   "Azwaaj an-Nabi (Wives of the Prophet)",
   "Ahl al-Bayt (People of the House)",
   "Ummahat al-Muslimin (Mothers of the Muslims)",
   "Ummahat al-Mu'minin (Mothers of the Believers)"
  ],
  "correct_index": 5,
  "answer_full": "Ummahat al-Mu'minin - Mothers of the Believers (Quran 33:6).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 62,
  "question": "How many wives did the Prophet (peace be upon him) marry, according to the commonly used count?",
  "options": [
   "Twelve wives",
   "Thirteen wives",
   "Eleven wives",
   "Nine wives",
   "Ten wives",
   "Seven wives"
  ],
  "correct_index": 2,
  "answer_full": "Eleven wives are commonly counted among those he married. Historical reports and counting conventions may vary.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 63,
  "question": "Who was the Prophet's first wife?",
  "options": [
   "Zaynab bint Jahsh",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Sawdah bint Zam'ah",
   "Hafsah bint Umar",
   "Aisha bint Abi Bakr",
   "Khadijah bint Khuwaylid"
  ],
  "correct_index": 5,
  "answer_full": "Khadijah bint Khuwaylid (may Allah be pleased with her).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 64,
  "question": "How long was the Prophet married to Khadijah, and did he marry anyone else during her life?",
  "options": [
   "About 15 years, and he married no one else in her lifetime",
   "About 25 years, and he married Sawdah in her lifetime",
   "About 10 years, and he married no one else in her lifetime",
   "About 25 years, and he married Aisha in her lifetime",
   "About 40 years, and he married no one else in her lifetime",
   "About 25 years, and he married no one else in her lifetime"
  ],
  "correct_index": 5,
  "answer_full": "About 25 years. He did not marry another woman while Khadijah (RA) was alive.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 65,
  "question": "Who was the Prophet's wife who was previously married and proposed marriage to him?",
  "options": [
   "Aisha bint Abi Bakr",
   "Sawdah bint Zam'ah",
   "Maymunah bint al-Harith",
   "Zaynab bint Jahsh",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Khadijah bint Khuwaylid"
  ],
  "correct_index": 5,
  "answer_full": "Khadijah bint Khuwaylid - she sent the proposal through Nafisah after hearing of his honesty.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 66,
  "question": "Who was the second wife of the Prophet, an elderly widow who cared for his daughters?",
  "options": [
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Hafsah bint Umar",
   "Sawdah bint Zam'ah",
   "Zaynab bint Khuzaymah",
   "Maymunah bint al-Harith",
   "Khadijah bint Khuwaylid"
  ],
  "correct_index": 2,
  "answer_full": "Sawdah bint Zam'ah.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 67,
  "question": "Who was the youngest wife of the Prophet and daughter of Abu Bakr?",
  "options": [
   "Zaynab bint Jahsh",
   "Hafsah bint Umar",
   "Aisha bint Abi Bakr",
   "Juwayriyah bint al-Harith",
   "Safiyyah bint Huyayy",
   "Sawdah bint Zam'ah"
  ],
  "correct_index": 2,
  "answer_full": "Aisha bint Abi Bakr as-Siddiq.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 68,
  "question": "What is Aisha (RA) especially famous for in Islamic knowledge?",
  "options": [
   "The keeper of the first written Mushaf",
   "A Hadith narrator of about 500 narrations",
   "A poet who defended Islam in verse",
   "A foremost scholar of Fiqh who gave fatwas in Madinah",
   "A foremost scholar and Hadith narrator (about 2,210 narrations)",
   "The first woman to migrate to Abyssinia"
  ],
  "correct_index": 4,
  "answer_full": "She was among the foremost scholars and Hadith narrators, teaching many Companions and later Muslims. Traditional counts attribute about 2,210 narrations to her.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 69,
  "question": "Who was Hafsah (RA) to the Prophet and whose daughter was she?",
  "options": [
   "His wife, daughter of Abu Bakr",
   "His wife, daughter of Khuwaylid",
   "His wife, daughter of al-Harith",
   "His wife, daughter of Umar ibn al-Khattab",
   "His cousin, daughter of his aunt Umaymah",
   "His wife, daughter of Abu Sufyan"
  ],
  "correct_index": 3,
  "answer_full": "His wife, daughter of Umar ibn al-Khattab, famous for keeping the written copy of the Quran compiled under Abu Bakr.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 70,
  "question": "Who was Zaynab bint Khuzaymah (RA) and what was she called?",
  "options": [
   "His wife, called Umm al-Masakin (Mother of the Poor)",
   "His wife, called Umm al-Mu'minin (Mother of the Believers)",
   "His wife, known for her wisdom at Hudaybiyyah",
   "His wife, called Dhat an-Nitaqayn (Possessor of Two Belts)",
   "His wife, daughter of Abu Sufyan",
   "His wife, the last he married"
  ],
  "correct_index": 0,
  "answer_full": "His wife, known as Umm al-Masakin (Mother of the Poor), was remembered for generosity and died during his lifetime.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 71,
  "question": "Who was Umm Salamah (RA)?",
  "options": [
   "Hind bint Utbah, wife of Abu Sufyan",
   "Hafsah bint Umar, his wife",
   "Hind bint Abi Umayyah, wife of Abu Salamah only",
   "Hind bint Abi Umayyah, his wise wife",
   "Ramla bint Abi Sufyan, his wife",
   "Zaynab bint Jahsh, his wife and cousin"
  ],
  "correct_index": 3,
  "answer_full": "Hind bint Abi Umayyah, his wife, known for her wisdom. Her advice at Hudaybiyyah helped resolve a difficult moment.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 72,
  "question": "Who was Zaynab bint Jahsh (RA)?",
  "options": [
   "His wife, from Banu Nadir",
   "His wife, daughter of the chief of Banu al-Mustaliq",
   "His wife, sister of Umm al-Fadl",
   "His wife, daughter of Abu Bakr",
   "His wife, daughter of Umar ibn al-Khattab",
   "His wife and cousin, daughter of his aunt Umaymah"
  ],
  "correct_index": 5,
  "answer_full": "His wife and cousin (daughter of his aunt Umaymah). Her marriage is mentioned in Surah Al- Ahzab (33:37).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 73,
  "question": "Who was Juwayriyah bint al-Harith (RA)?",
  "options": [
   "His wife, sister of Umm al-Fadl",
   "His wife, daughter of his aunt Umaymah",
   "His wife, daughter of the chief of Banu al-Mustaliq",
   "His wife, from Banu Nadir",
   "His wife, daughter of Abu Sufyan",
   "His wife, daughter of Khuwaylid"
  ],
  "correct_index": 2,
  "answer_full": "His wife, daughter of the chief of Banu al-Mustaliq. Her marriage led to the freeing of many captives from her tribe.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 74,
  "question": "Who was Umm Habibah (RA) and whose daughter was she?",
  "options": [
   "Ramla bint Abi Sufyan, wife of Abu Sufyan",
   "Maymunah bint al-Harith, his wife",
   "Ramla bint Abi Sufyan, his wife",
   "Hind bint Abi Umayyah, his wife",
   "Safiyyah bint Huyayy, his wife",
   "Juwayriyah bint al-Harith, his wife"
  ],
  "correct_index": 2,
  "answer_full": "Ramla bint Abi Sufyan, his wife. She had migrated to Abyssinia for Islam while her father was then a leader of Quraysh.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 75,
  "question": "Who was Safiyyah bint Huyayy (RA)?",
  "options": [
   "His wife from Banu al-Mustaliq, freed and married by him",
   "His wife, daughter of Abu Sufyan",
   "His wife, the last he married",
   "His wife from Banu Qurayzah, freed and married by him",
   "His paternal aunt, mother of Az-Zubayr",
   "His wife from Banu Nadir, freed and married by him"
  ],
  "correct_index": 5,
  "answer_full": "She was a wife of the Prophet, from Banu Nadir, and is described in traditional biographies as being of Israelite ancestry. He freed her and married her.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 76,
  "question": "Who was Maymunah bint al-Harith (RA)?",
  "options": [
   "His wife, known as Mother of the Poor",
   "His wife, daughter of the chief of Banu al-Mustaliq",
   "His first wife, mother of his children",
   "His last wife in marriage, sister of Umm al-Fadl",
   "His wife, daughter of Abu Sufyan",
   "His wife, from Banu Nadir"
  ],
  "correct_index": 3,
  "answer_full": "His last wife in marriage, sister of Umm al-Fadl, wife of Al-Abbas.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 77,
  "question": "Who was Maria al-Qibtiyyah?",
  "options": [
   "The mother of his daughter Fatimah",
   "His wife, daughter of Abu Sufyan",
   "The mother of his son Ibrahim",
   "His wife, from Banu Nadir",
   "His last wife in marriage",
   "The mother of his son Al-Qasim"
  ],
  "correct_index": 2,
  "answer_full": "She was the mother of the Prophet’s son Ibrahim. In the mainstream Sunni account, she is not counted among the wives; classical sources describe her as an umm walad.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 78,
  "question": "Which wife of the Prophet was the daughter of Umar ibn al-Khattab?",
  "options": [
   "Aisha bint Abi Bakr",
   "Hafsah bint Umar",
   "Sawdah bint Zam'ah",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Juwayriyah bint al-Harith",
   "Zaynab bint Jahsh"
  ],
  "correct_index": 1,
  "answer_full": "Hafsah bint Umar.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 79,
  "question": "Which two wives were daughters of the first two Caliphs?",
  "options": [
   "Hafsah (daughter of Umar) and Zaynab (daughter of Jahsh)",
   "Hafsah (daughter of Umar) and Maymunah (daughter of al-Harith)",
   "Aisha (daughter of Abu Bakr) and Safiyyah (daughter of Huyayy)",
   "Umm Salamah (daughter of Abu Umayyah) and Hafsah (daughter of Umar)",
   "Aisha (daughter of Abu Bakr) and Umm Habibah (daughter of Abu Sufyan)",
   "Aisha (daughter of Abu Bakr) and Hafsah (daughter of Umar)"
  ],
  "correct_index": 5,
  "answer_full": "Aisha, daughter of Abu Bakr, and Hafsah, daughter of Umar.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 80,
  "question": "Which wife kept the first official written copy (Mushaf) of the Quran in her house?",
  "options": [
   "Sawdah bint Zam'ah",
   "Hafsah bint Umar",
   "Zaynab bint Jahsh",
   "Aisha bint Abi Bakr",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Maymunah bint al-Harith"
  ],
  "correct_index": 1,
  "answer_full": "Hafsah bint Umar (RA).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 81,
  "question": "Which wife narrated the most Hadith among the wives?",
  "options": [
   "Umm Habibah (Ramla bint Abi Sufyan)",
   "Maymunah bint al-Harith",
   "Zaynab bint Jahsh",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Hafsah bint Umar",
   "Aisha bint Abi Bakr"
  ],
  "correct_index": 5,
  "answer_full": "Aisha bint Abi Bakr (RA).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 82,
  "question": "Which wife died first after the Prophet's death?",
  "options": [
   "Hafsah bint Umar",
   "Aisha bint Abi Bakr",
   "Zaynab bint Jahsh",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Sawdah bint Zam'ah",
   "Zaynab bint Khuzaymah"
  ],
  "correct_index": 2,
  "answer_full": "Zaynab bint Jahsh (RA), according to the well-known report.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 83,
  "question": "Which wife was known as Mother of the Poor?",
  "options": [
   "Aisha bint Abi Bakr",
   "Hafsah bint Umar",
   "Juwayriyah bint al-Harith",
   "Zaynab bint Khuzaymah",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Zaynab bint Jahsh"
  ],
  "correct_index": 3,
  "answer_full": "Zaynab bint Khuzaymah (RA).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 84,
  "question": "Which wife gave the famous advice at Hudaybiyyah?",
  "options": [
   "Hafsah bint Umar",
   "Aisha bint Abi Bakr",
   "Umm Habibah (Ramla bint Abi Sufyan)",
   "Umm Salamah",
   "Zaynab bint Jahsh",
   "Sawdah bint Zam'ah"
  ],
  "correct_index": 3,
  "answer_full": "Umm Salamah (RA) - she advised the Prophet to shave his head and sacrifice, and the Sahaba then followed him.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 85,
  "question": "Which wife was married to the Prophet in Makkah before Hijrah after Khadijah's death?",
  "options": [
   "Maymunah bint al-Harith",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Hafsah bint Umar",
   "Aisha bint Abi Bakr",
   "Sawdah bint Zam'ah",
   "Zaynab bint Khuzaymah"
  ],
  "correct_index": 4,
  "answer_full": "Sawdah bint Zam‘ah (RA). Aisha’s marriage contract was also made in Makkah before Hijrah.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 86,
  "question": "In which city did most of the Prophet's marriages after Hijrah take place?",
  "options": [
   "Taif",
   "Tabuk",
   "Makkah al-Mukarramah",
   "Khaybar",
   "Yathrib's neighbour, Quba",
   "Madinah al-Munawwarah"
  ],
  "correct_index": 5,
  "answer_full": "Madinah al-Munawwarah.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 87,
  "question": "Which wife was the Prophet with when he passed away, and in whose room was he buried?",
  "options": [
   "Aisha (RA) — he passed away in her room and was buried there",
   "Zaynab bint Jahsh (RA) — he passed away in her room and was buried there",
   "Hafsah (RA) — he passed away in her room and was buried there",
   "Maymunah (RA) — he passed away in her room and was buried there",
   "Umm Salamah (RA) — he passed away in her room and was buried there",
   "Sawdah (RA) — he passed away in her room and was buried there"
  ],
  "correct_index": 0,
  "answer_full": "Aisha (RA) - he passed away in her room, resting against her, and was buried there.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 88,
  "question": "What did the Prophet say about Khadijah's love and support?",
  "options": [
   "Allah blessed him with her love; she advised him at Hudaybiyyah",
   "Allah blessed him with her love; she narrated the most Hadith",
   "She was the best of women because of her charity to the poor",
   "Allah blessed him with her love; she was the first to migrate to Abyssinia",
   "She believed in him and kept the Mushaf in her house",
   "Allah blessed him with her love; she believed and supported him with her wealth"
  ],
  "correct_index": 5,
  "answer_full": "He said Allah had blessed him with her love, and that she believed in him when people disbelieved and supported him with her wealth (Bukhari and Muslim).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 89,
  "question": "Which Surah mentions that the Prophet's wives are Mothers of the Believers?",
  "options": [
   "Surah An-Nisa, verse 3 (4:3)",
   "Surah Al-Ahzab, verse 37 (33:37)",
   "Surah Al-Baqarah, verse 187 (2:187)",
   "Surah Al-Ahzab, verse 6 (33:6)",
   "Surah At-Tahrim, verse 1 (66:1)",
   "Surah Al-Ahzab, verse 53 (33:53)"
  ],
  "correct_index": 3,
  "answer_full": "Surah Al-Ahzab, verse 6 (33:6).",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 90,
  "question": "How many of the Prophet's wives were alive at the time of his death?",
  "options": [
   "Nine wives",
   "Seven wives",
   "Eleven wives",
   "Six wives",
   "Eight wives",
   "Ten wives"
  ],
  "correct_index": 0,
  "answer_full": "Nine wives survived him; Khadijah and Zaynab bint Khuzaymah had died before him.",
  "part": 3,
  "part_name": "Wives: Mothers of the Believers"
 },
 {
  "num": 91,
  "question": "How many children did the Prophet (peace be upon him) have in total?",
  "options": [
   "Seven children — four sons and three daughters",
   "Six children — two sons and four daughters",
   "Seven children — two sons and five daughters",
   "Eight children — three sons and five daughters",
   "Seven children — three sons and four daughters",
   "Six children — three sons and three daughters"
  ],
  "correct_index": 4,
  "answer_full": "Seven children - three sons and four daughters.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 92,
  "question": "Who was the mother of most of the Prophet's children?",
  "options": [
   "Khadijah bint Khuwaylid",
   "Sawdah bint Zam'ah",
   "Maria al-Qibtiyyah",
   "Aisha bint Abi Bakr",
   "Umm Salamah (Hind bint Abi Umayyah)",
   "Hafsah bint Umar"
  ],
  "correct_index": 0,
  "answer_full": "Khadijah bint Khuwaylid (RA) - mother of six of his seven children.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 93,
  "question": "Who was the eldest child of the Prophet?",
  "options": [
   "Abdullah",
   "Husayn",
   "Hasan",
   "Ibrahim",
   "Muhsin",
   "Al-Qasim"
  ],
  "correct_index": 5,
  "answer_full": "Al-Qasim, his eldest son. From him the Prophet got his kunya Abu al-Qasim.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 94,
  "question": "What is a kunya, and what was the Prophet's kunya?",
  "options": [
   "Abu Abdullah",
   "Abu Bakr",
   "Abu Talib",
   "Abu Ibrahim",
   "Abu al-Qasim",
   "Abu al-Hasan"
  ],
  "correct_index": 4,
  "answer_full": "A kunya is an honorific name formed with Abu (father of) or Umm (mother of); his kunya was Abu al-Qasim.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 95,
  "question": "Who was the eldest daughter of the Prophet?",
  "options": [
   "Zaynab bint Ali",
   "Umm Kulthum bint Muhammad",
   "Fatimah bint Muhammad",
   "Umm Kulthum bint Ali",
   "Ruqayyah bint Muhammad",
   "Zaynab bint Muhammad"
  ],
  "correct_index": 5,
  "answer_full": "Zaynab bint Muhammad (RA).",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 96,
  "question": "Who did Zaynab (RA) marry?",
  "options": [
   "Uthman ibn Affan",
   "Abu al-As ibn al-Rabi",
   "Abu Salamah ibn Abd al-Asad",
   "Ali ibn Abi Talib",
   "Az-Zubayr ibn al-Awwam",
   "Talhah ibn Ubaydullah"
  ],
  "correct_index": 1,
  "answer_full": "Abu al-As ibn al-Rabi, her cousin (son of her aunt Halah).",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 97,
  "question": "Who was the second daughter of the Prophet?",
  "options": [
   "Umm Kulthum bint Muhammad",
   "Fatimah bint Muhammad",
   "Ruqayyah bint Ali",
   "Ruqayyah bint Muhammad",
   "Zaynab bint Muhammad",
   "Zaynab bint Ali"
  ],
  "correct_index": 3,
  "answer_full": "Ruqayyah bint Muhammad (RA).",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 98,
  "question": "Who did Ruqayyah (RA) marry?",
  "options": [
   "Abu al-As ibn al-Rabi",
   "Az-Zubayr ibn al-Awwam",
   "Ali ibn Abi Talib",
   "Uthman ibn Affan",
   "Umar ibn al-Khattab",
   "Abu Bakr as-Siddiq"
  ],
  "correct_index": 3,
  "answer_full": "Uthman ibn Affan (RA). After her death, Uthman married her sister Umm Kulthum, so he was called Dhun-Nurayn - Possessor of Two Lights.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 99,
  "question": "When did Ruqayyah (RA) die?",
  "options": [
   "In Abyssinia, during the first migration",
   "In Madinah, around the Battle of Uhud (3 AH)",
   "In Madinah, around the Battle of Badr (2 AH)",
   "In Madinah, around the Conquest of Makkah (8 AH)",
   "In Makkah, before the Hijrah",
   "In Madinah, around the Battle of the Trench (5 AH)"
  ],
  "correct_index": 2,
  "answer_full": "In Madinah, around the time of the Battle of Badr (2 AH).",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 100,
  "question": "Who was the third daughter of the Prophet?",
  "options": [
   "Fatimah bint Muhammad",
   "Zaynab bint Ali",
   "Zaynab bint Muhammad",
   "Umm Kulthum bint Ali",
   "Umm Kulthum bint Muhammad",
   "Ruqayyah bint Muhammad"
  ],
  "correct_index": 4,
  "answer_full": "Umm Kulthum bint Muhammad (RA).",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 101,
  "question": "Who did Umm Kulthum (RA) marry?",
  "options": [
   "Abdur-Rahman ibn Awf",
   "Uthman ibn Affan",
   "Ali ibn Abi Talib",
   "Abu Bakr as-Siddiq",
   "Abu al-As ibn al-Rabi",
   "Umar ibn al-Khattab"
  ],
  "correct_index": 1,
  "answer_full": "Uthman ibn Affan (RA), after the death of Ruqayyah.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 102,
  "question": "Who was the youngest daughter and most beloved to the Prophet?",
  "options": [
   "Zaynab bint Muhammad",
   "Fatimah al-Zahra bint Muhammad",
   "Fatimah bint al-Khattab",
   "Zaynab bint Ali",
   "Umm Kulthum bint Muhammad",
   "Ruqayyah bint Muhammad"
  ],
  "correct_index": 1,
  "answer_full": "Fatimah al-Zahra bint Muhammad (RA), his youngest daughter.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 103,
  "question": "Who did Fatimah (RA) marry?",
  "options": [
   "Uthman ibn Affan",
   "Az-Zubayr ibn al-Awwam",
   "Umar ibn al-Khattab",
   "Abu al-As ibn al-Rabi",
   "Ali ibn Abi Talib",
   "Ja'far ibn Abi Talib"
  ],
  "correct_index": 4,
  "answer_full": "Ali ibn Abi Talib (RA), the Prophet's cousin.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 104,
  "question": "What did the Prophet say about Fatimah?",
  "options": [
   "\"Fatimah is the first woman of this Ummah to migrate\"",
   "\"Fatimah is a part of me; whoever loves her loves me\"",
   "\"Fatimah is a part of me; whoever angers her angers me\"",
   "\"Fatimah is the keeper of the Mushaf\"",
   "\"Fatimah is a part of me; whoever visits her visits me\"",
   "\"Fatimah is the Mother of the Poor\""
  ],
  "correct_index": 2,
  "answer_full": "He said: Fatimah is a part of me. Whoever angers her angers me (Bukhari and Muslim). And she is the leader of the women of Paradise.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 105,
  "question": "Who was Abdullah, the Prophet's son?",
  "options": [
   "His son by Khadijah, called Al-Tayyib and Al-Tahir, died in infancy in Makkah",
   "His grandson, son of Fatimah and Ali",
   "His son by Aisha, died in infancy in Madinah",
   "His son by Khadijah, called Al-Tayyib, martyred at Uhud",
   "His eldest son, from whom he got his kunya",
   "His son by Maria, died in infancy in Madinah"
  ],
  "correct_index": 0,
  "answer_full": "Abdullah ibn Muhammad, son of Khadijah, also called Al-Tayyib and Al-Tahir. He died in infancy in Makkah.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 106,
  "question": "Who was Ibrahim, the Prophet's youngest son?",
  "options": [
   "His youngest son, son of Aisha, died in infancy in Madinah",
   "His youngest son, son of Khadijah, died in infancy in Makkah",
   "His son, called Al-Tayyib and Al-Tahir",
   "His grandson, son of Fatimah and Ali",
   "His youngest son, son of Maria al-Qibtiyyah, died in infancy in Madinah",
   "His eldest son, son of Khadijah"
  ],
  "correct_index": 4,
  "answer_full": "Ibrahim ibn Muhammad, son of Maria al-Qibtiyyah. He died in infancy in Madinah, at about 16- 18 months.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 107,
  "question": "What happened on the day Ibrahim died?",
  "options": [
   "A lunar eclipse occurred",
   "Heavy rain fell over Madinah",
   "A solar eclipse occurred",
   "The moon split in two",
   "An earthquake struck Madinah",
   "A comet appeared in the sky"
  ],
  "correct_index": 2,
  "answer_full": "A solar eclipse occurred. The Prophet explained that the sun and moon do not eclipse because of anyone’s death or birth (Bukhari and Muslim).",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 108,
  "question": "Which of the Prophet's children lived longest after him?",
  "options": [
   "Zaynab (RA), who died about six months after him",
   "Fatimah (RA), who died about six years after him",
   "Aisha (RA), who died about six months after him",
   "Ruqayyah (RA), who died about six months after him",
   "Fatimah (RA), who died about six months after him",
   "Umm Kulthum (RA), who died about six months after him"
  ],
  "correct_index": 4,
  "answer_full": "Fatimah (RA) - she died about six months after the Prophet (peace be upon him). All his other children died before him.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 109,
  "question": "Who were Hasan and Husayn?",
  "options": [
   "His cousins, sons of Al-Abbas",
   "His grandsons, sons of Ruqayyah and Uthman",
   "His nephews, sons of Abu Talib",
   "His grandsons, sons of Fatimah and Ali",
   "His sons, by Khadijah",
   "His grandsons, sons of Zaynab and Abu al-As"
  ],
  "correct_index": 3,
  "answer_full": "The Prophet's grandsons, sons of Fatimah and Ali (RA).",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 110,
  "question": "What did the Prophet say about Hasan and Husayn?",
  "options": [
   "Leaders of the youth of Makkah",
   "Princes of the people of Madinah",
   "The two lights of Paradise",
   "Leaders of the youth of Paradise",
   "Leaders of the elders of Paradise",
   "The best of the Muhajirun"
  ],
  "correct_index": 3,
  "answer_full": "He is reported to have described Hasan and Husayn as leaders of the youth of Paradise; wording and source grading vary among reports.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 111,
  "question": "Who was Zaynab bint Ali?",
  "options": [
   "His daughter, eldest of his daughters",
   "His granddaughter, daughter of Zaynab and Abu al-As",
   "His wife and cousin",
   "His granddaughter, daughter of Fatimah and Ali",
   "His granddaughter, daughter of Ruqayyah and Uthman",
   "His paternal aunt"
  ],
  "correct_index": 3,
  "answer_full": "The Prophet's granddaughter, daughter of Fatimah and Ali.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 112,
  "question": "Who was Umm Kulthum bint Ali?",
  "options": [
   "His foster-sister through Halimah",
   "His daughter, third of his daughters",
   "His granddaughter, daughter of Ali and Fatimah",
   "His granddaughter, daughter of Ruqayyah and Uthman",
   "His wife, daughter of Umar",
   "His granddaughter, daughter of Zaynab and Abu al-As"
  ],
  "correct_index": 2,
  "answer_full": "She was a daughter of Ali and Fatimah and granddaughter of the Prophet. Her reported marriage to Umar ibn al-Khattab appears in historical sources; details are disputed.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 113,
  "question": "Who was Muhsin ibn Ali?",
  "options": [
   "A reported son of Ruqayyah and Uthman who died young",
   "His grandson through Zaynab and Abu al-As",
   "A son of Ali by another wife, who became Caliph",
   "His youngest son, son of Maria",
   "A reported son of Fatimah and Ali who died young",
   "A reported son of Fatimah and Ali, martyred at Karbala"
  ],
  "correct_index": 4,
  "answer_full": "He is reported in some historical traditions as a son of Fatimah and Ali who died young; accounts differ on details.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 114,
  "question": "Who was Ali Zayn al-Abidin's connection to the Prophet?",
  "options": [
   "His great-grandson, son of Husayn ibn Ali",
   "His grandson, son of Ali ibn Abi Talib",
   "His nephew, son of Al-Abbas",
   "His great-grandson, son of Zayd ibn Harithah",
   "His grandson, son of Hasan ibn Ali",
   "His great-grandson, son of Hasan ibn Ali"
  ],
  "correct_index": 0,
  "answer_full": "He was the Prophet's great-grandson, son of Husayn ibn Ali.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 115,
  "question": "From which daughter does the Prophet's family line continue?",
  "options": [
   "Through Umm Kulthum (RA), via her children",
   "Through Ruqayyah (RA), via her children",
   "Through Fatimah (RA), via Zaynab bint Ali only",
   "Through his son Abdullah",
   "Through Fatimah (RA), via Hasan and Husayn",
   "Through Zaynab (RA), via her children"
  ],
  "correct_index": 4,
  "answer_full": "Through Fatimah (RA), with descendants through Hasan and Husayn. Sayyid/Sharif are honorific lineage titles whose usage varies by region.",
  "part": 4,
  "part_name": "Children and Grandchildren"
 },
 {
  "num": 116,
  "question": "At what age did the Prophet receive the first revelation?",
  "options": [
   "45 years old",
   "35 years old",
   "38 years old",
   "43 years old",
   "40 years old",
   "25 years old"
  ],
  "correct_index": 4,
  "answer_full": "At 40 years old.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 117,
  "question": "In which cave did the first revelation come?",
  "options": [
   "Cave Thawr, on Jabal al-Nur",
   "Cave Kahf, near Taif",
   "Cave Hira, on Mount Safa",
   "Cave Hira, on Jabal al-Nur",
   "Cave Hira, on Jabal Thawr",
   "Cave Thawr, south of Makkah"
  ],
  "correct_index": 3,
  "answer_full": "Cave Hira, on Jabal al-Nur near Makkah.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 118,
  "question": "Which angel brought the revelation?",
  "options": [
   "Jibreel (Gabriel)",
   "Izrael (Angel of Death)",
   "Israfeel",
   "Malik",
   "Mikaeel (Michael)",
   "Ridwan"
  ],
  "correct_index": 0,
  "answer_full": "Jibreel (Gabriel) - peace be upon him.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 119,
  "question": "What were the first words revealed?",
  "options": [
   "\"Iqra\" — Read! (Surah Al-Qalam, 68:1-5)",
   "\"Iqra\" — Read! (Surah Al-Alaq, 96:1-5)",
   "\"Qul huwa Allahu ahad\" (Surah Al-Ikhlas, 112:1)",
   "\"Alhamdu lillah\" (Surah Al-Fatihah, 1:1)",
   "\"Sabbih isma rabbika\" (Surah Al-A'la, 87:1)",
   "\"Ya ayyuhal-muddaththir\" (Surah Al-Muddaththir, 74:1)"
  ],
  "correct_index": 1,
  "answer_full": "'Iqra' - Read! The first five verses of Surah Al-Alaq (96:1-5).",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 120,
  "question": "In which month did the first revelation come?",
  "options": [
   "Ramadan",
   "Sha'ban",
   "Dhul-Hijjah",
   "Muharram",
   "Rabi al-Awwal",
   "Rajab"
  ],
  "correct_index": 0,
  "answer_full": "Ramadan. The first revelation is associated with Laylat al-Qadr, though the precise night is not established definitively.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 121,
  "question": "Who was the first person to believe in the Prophet?",
  "options": [
   "Aisha bint Abi Bakr",
   "Ali ibn Abi Talib",
   "Abu Bakr as-Siddiq",
   "Waraqah ibn Nawfal",
   "Zayd ibn Harithah",
   "Khadijah bint Khuwaylid"
  ],
  "correct_index": 5,
  "answer_full": "Khadijah bint Khuwaylid (RA), his wife.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 122,
  "question": "Who was the first adult free man commonly reported to accept Islam?",
  "options": [
   "Uthman ibn Affan",
   "Ali ibn Abi Talib",
   "Zayd ibn Harithah",
   "Umar ibn al-Khattab",
   "Abu Bakr as-Siddiq",
   "Hamzah ibn Abd al-Muttalib"
  ],
  "correct_index": 4,
  "answer_full": "Abu Bakr as-Siddiq (RA). Accounts distinguish categories: Khadijah among women, Ali among boys, and Zayd ibn Harithah among freedmen.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 123,
  "question": "Who was the first child to accept Islam?",
  "options": [
   "Ali ibn Abi Talib",
   "Usamah ibn Zayd",
   "Abdullah ibn Abbas",
   "Anas ibn Malik",
   "Zayd ibn Harithah",
   "Ja'far ibn Abi Talib"
  ],
  "correct_index": 0,
  "answer_full": "Ali ibn Abi Talib (RA), aged about 10.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 124,
  "question": "Who is commonly named as the first freedman (mawla) to accept Islam?",
  "options": [
   "Khubayb ibn Adiy",
   "Ammar ibn Yasir",
   "Suhaib ar-Rumi",
   "Bilal ibn Rabah",
   "Zayd ibn Harithah",
   "Salman al-Farsi"
  ],
  "correct_index": 4,
  "answer_full": "Zayd ibn Harithah (RA), the Prophet’s freedman and adopted son before the Quranic ruling on adoption clarified lineage.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 125,
  "question": "For how many years did the Prophet call people to Islam secretly?",
  "options": [
   "About five years",
   "About two years",
   "About one year",
   "About three years",
   "About seven years",
   "About ten years"
  ],
  "correct_index": 3,
  "answer_full": "About three years, according to the commonly reported Seerah chronology.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 126,
  "question": "From which mountain did the Prophet first call Quraysh openly?",
  "options": [
   "Mount Arafat",
   "Jabal Thawr",
   "Mount Safa",
   "Mount Marwah",
   "Jabal al-Nur",
   "Jabal Uhud"
  ],
  "correct_index": 2,
  "answer_full": "Mount Safa in Makkah.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 127,
  "question": "Which uncle's wife carried firewood and is mentioned in Surah Al-Masad?",
  "options": [
   "Umm Ayman, his caretaker",
   "Umm Salamah, his wife",
   "Umm Jamil, wife of Abu Lahab",
   "Umm Habibah, his wife",
   "Umm al-Fadl, wife of Al-Abbas",
   "Umm Kulthum, his daughter"
  ],
  "correct_index": 2,
  "answer_full": "Umm Jamil, wife of Abu Lahab.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 128,
  "question": "To which land did the first group of Muslims migrate for safety?",
  "options": [
   "Taif",
   "Abyssinia (Habasha)",
   "Persia",
   "Yemen",
   "Syria (Sham)",
   "Egypt"
  ],
  "correct_index": 1,
  "answer_full": "Abyssinia (Habasha, Ethiopia), ruled by the just king An-Najashi (Negus). It is called the First Hijrah.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 129,
  "question": "Who led the Muslims in Abyssinia and spoke to the king?",
  "options": [
   "Zayd ibn Harithah",
   "Abdullah ibn Mas'ud",
   "Ja'far ibn Abi Talib",
   "Uthman ibn Affan",
   "Mus'ab ibn Umayr",
   "Ali ibn Abi Talib"
  ],
  "correct_index": 2,
  "answer_full": "Ja'far ibn Abi Talib (RA), who recited verses from Surah Maryam.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 130,
  "question": "Which two powerful men accepted Islam in Makkah and strengthened the Muslims?",
  "options": [
   "Umar ibn al-Khattab and Khalid ibn al-Walid",
   "Hamzah ibn Abd al-Muttalib and Ali ibn Abi Talib",
   "Abu Bakr as-Siddiq and Umar ibn al-Khattab",
   "Hamzah ibn Abd al-Muttalib and Umar ibn al-Khattab",
   "Hamzah ibn Abd al-Muttalib and Abu Bakr as-Siddiq",
   "Umar ibn al-Khattab and Uthman ibn Affan"
  ],
  "correct_index": 3,
  "answer_full": "Hamzah ibn Abd al-Muttalib and Umar ibn al-Khattab (RA).",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 131,
  "question": "What journey did the Prophet make to Taif, and what happened?",
  "options": [
   "He went to Taif in the 5th year of Prophethood",
   "He went to Yemen and was rejected and mistreated",
   "He went to Syria and was rejected and mistreated",
   "He went to Taif and signed a treaty with its chiefs",
   "He went to Taif and its people accepted Islam",
   "He went to Taif and was rejected and mistreated"
  ],
  "correct_index": 5,
  "answer_full": "In the 10th year of Prophethood, after the deaths of Abu Talib and Khadijah, he went to Taif. Seerah accounts describe rejection and mistreatment and his prayer for guidance.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 132,
  "question": "What is Isra and Mi'raj?",
  "options": [
   "The Night Journey to Jerusalem and the splitting of the moon",
   "The Ascension to the heavens from Cave Hira",
   "The Night Journey to Jerusalem and the Ascension to the heavens",
   "The Night Journey to Taif and the Ascension to the heavens",
   "The migration from Makkah to Madinah",
   "The Night Journey to Madinah and the Ascension to the heavens"
  ],
  "correct_index": 2,
  "answer_full": "The Night Journey from Makkah to Jerusalem (Isra) and the Ascension to the heavens (Mi'raj), when the five daily prayers were given.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 133,
  "question": "From which mosque did Isra begin and to which did it go?",
  "options": [
   "From Masjid Quba to Al-Masjid al-Aqsa",
   "From Al-Masjid an-Nabawi to Al-Masjid al-Aqsa",
   "From Al-Masjid al-Aqsa to Al-Masjid al-Haram",
   "From Al-Masjid al-Haram to Al-Masjid an-Nabawi",
   "From Al-Masjid al-Haram to Al-Masjid al-Aqsa",
   "From Al-Masjid al-Haram to Masjid Quba"
  ],
  "correct_index": 4,
  "answer_full": "From Al-Masjid al-Haram in Makkah to Al-Masjid al-Aqsa in Jerusalem.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 134,
  "question": "On which creature did the Prophet travel during Isra?",
  "options": [
   "Al-Buraq",
   "A mule named Duldul",
   "A donkey named Ya'fur",
   "A white camel",
   "A she-camel named Qaswa",
   "A winged horse"
  ],
  "correct_index": 0,
  "answer_full": "Al-Buraq.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 135,
  "question": "Which pledge took place at Aqabah before Hijrah?",
  "options": [
   "The Pledge under the Tree",
   "Hilf al-Fudul",
   "The Treaty of Hudaybiyyah",
   "The Pledges of Aqabah",
   "The Charter of Madinah",
   "The Pledge of Ridwan"
  ],
  "correct_index": 3,
  "answer_full": "The Pledges of Aqabah (first and second) by the people of Yathrib (Madinah), who promised to protect the Prophet.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 136,
  "question": "In which year did the Hijrah to Madinah happen?",
  "options": [
   "570 CE",
   "624 CE",
   "619 CE",
   "632 CE",
   "622 CE",
   "610 CE"
  ],
  "correct_index": 4,
  "answer_full": "622 CE. The Hijrah later became the epoch used for the Hijri calendar; the calendar was formally established during Umar’s caliphate.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 137,
  "question": "Who accompanied the Prophet during the Hijrah?",
  "options": [
   "Abu Bakr as-Siddiq",
   "Umar ibn al-Khattab",
   "Ali ibn Abi Talib",
   "Hamzah ibn Abd al-Muttalib",
   "Uthman ibn Affan",
   "Zayd ibn Harithah"
  ],
  "correct_index": 0,
  "answer_full": "Abu Bakr as-Siddiq (RA). They stayed three nights in Cave Thawr.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 138,
  "question": "In which cave did the Prophet and Abu Bakr hide during Hijrah?",
  "options": [
   "Cave Kahf",
   "Cave Safa",
   "Cave Nur",
   "Cave Uhud",
   "Cave Hira",
   "Cave Thawr"
  ],
  "correct_index": 5,
  "answer_full": "Cave Thawr, south of Makkah.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 139,
  "question": "Who brought food to the cave during Hijrah?",
  "options": [
   "Asma bint Abi Bakr",
   "Aisha bint Abi Bakr",
   "Hafsah bint Umar",
   "Khadijah bint Khuwaylid",
   "Fatimah bint Muhammad",
   "Umm Ayman (Barakah)"
  ],
  "correct_index": 0,
  "answer_full": "Asma bint Abi Bakr (RA), Abu Bakr's daughter, called Dhat an-Nitaqayn - Possessor of the Two Belts.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 140,
  "question": "Who slept in the Prophet's bed on the night of Hijrah to mislead Quraysh?",
  "options": [
   "Ja'far ibn Abi Talib",
   "Ali ibn Abi Talib",
   "Abu Bakr as-Siddiq",
   "Usamah ibn Zayd",
   "Zayd ibn Harithah",
   "Umar ibn al-Khattab"
  ],
  "correct_index": 1,
  "answer_full": "Ali ibn Abi Talib (RA).",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 141,
  "question": "Where did the Prophet first stop on reaching Madinah's outskirts and build a mosque?",
  "options": [
   "Taif",
   "Khaybar",
   "Tabuk",
   "Badr",
   "Quba",
   "Hudaybiyyah"
  ],
  "correct_index": 4,
  "answer_full": "Quba, where he established Masjid Quba. It is commonly described as the first mosque built by the Prophet after Hijrah.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 142,
  "question": "In whose house did the Prophet stay first in Madinah?",
  "options": [
   "Abu Talhah al-Ansari",
   "Sa'd ibn Mu'adh",
   "Ubayy ibn Ka'b",
   "Abu Bakr as-Siddiq",
   "Mu'adh ibn Jabal",
   "Abu Ayyub al-Ansari"
  ],
  "correct_index": 5,
  "answer_full": "Abu Ayyub al-Ansari (RA).",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 143,
  "question": "Which mosque did the Prophet build in Madinah?",
  "options": [
   "Al-Masjid al-Haram",
   "Masjid al-Qiblatain",
   "Masjid Bani Salimah",
   "Al-Masjid al-Aqsa",
   "Masjid Quba",
   "Al-Masjid an-Nabawi"
  ],
  "correct_index": 5,
  "answer_full": "Al-Masjid an-Nabawi - the Prophet's Mosque.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 144,
  "question": "When did the direction of prayer (Qibla) change?",
  "options": [
   "In 2 AH, from the Kaaba to Jerusalem",
   "In 2 AH, from Madinah to Jerusalem",
   "In 8 AH, from Jerusalem to the Kaaba",
   "In 5 AH, from Jerusalem to the Kaaba",
   "In 2 AH, from Jerusalem to the Kaaba",
   "In 1 AH, from Jerusalem to the Kaaba"
  ],
  "correct_index": 4,
  "answer_full": "In 2 AH, from Jerusalem to the Kaaba in Makkah (Quran 2:144).",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 145,
  "question": "In which year and month was the Battle of Badr?",
  "options": [
   "Ramadan, 5 AH",
   "Shawwal, 2 AH",
   "Ramadan, 2 AH",
   "Ramadan, 3 AH",
   "Muharram, 2 AH",
   "Dhul-Qa'dah, 6 AH"
  ],
  "correct_index": 2,
  "answer_full": "Ramadan, 2 AH (commonly dated to 624 CE). Traditional accounts give about 313 Muslims and roughly 1,000 Quraysh; figures are approximate.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 146,
  "question": "In which year was the Battle of Uhud?",
  "options": [
   "Ramadan, 2 AH",
   "Shawwal, 3 AH",
   "Dhul-Hijjah, 3 AH",
   "Shawwal, 4 AH",
   "Muharram, 3 AH",
   "Shawwal, 5 AH"
  ],
  "correct_index": 1,
  "answer_full": "Shawwal, 3 AH (625 CE).",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 147,
  "question": "In which year was the Battle of the Trench (Al-Khandaq / Ahzab)?",
  "options": [
   "5 AH",
   "8 AH",
   "10 AH",
   "2 AH",
   "6 AH",
   "3 AH"
  ],
  "correct_index": 0,
  "answer_full": "5 AH (commonly dated to 627 CE). The month is reported differently in historical sources. Salman al-Farsi is traditionally credited with suggesting the trench.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 148,
  "question": "In which year was the Treaty of Hudaybiyyah?",
  "options": [
   "Muharram, 6 AH",
   "Dhul-Qa'dah, 5 AH",
   "Dhul-Qa'dah, 8 AH",
   "Dhul-Qa'dah, 6 AH",
   "Ramadan, 6 AH",
   "Dhul-Hijjah, 6 AH"
  ],
  "correct_index": 3,
  "answer_full": "Dhul-Qa‘dah, 6 AH (commonly dated to 628 CE). The treaty’s duration is commonly stated as ten years, though it was later broken.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 149,
  "question": "In which year was the Conquest of Makkah?",
  "options": [
   "Ramadan, 6 AH",
   "Ramadan, 5 AH",
   "Shawwal, 8 AH",
   "Ramadan, 8 AH",
   "Muharram, 8 AH",
   "Ramadan, 10 AH"
  ],
  "correct_index": 3,
  "answer_full": "Ramadan, 8 AH (commonly dated to 630 CE). The conquest is remembered for the Prophet’s broad amnesty.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 150,
  "question": "In which year did the Prophet perform his Farewell Hajj?",
  "options": [
   "9 AH",
   "10 AH",
   "6 AH",
   "8 AH",
   "5 AH",
   "11 AH"
  ],
  "correct_index": 1,
  "answer_full": "10 AH (632 CE) - his only Hajj after Hijrah, called Hajjat al-Wada.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 151,
  "question": "Where did the Prophet deliver the Farewell Sermon?",
  "options": [
   "In the valley of Mina",
   "At Mina",
   "On the plain of Arafat",
   "At Muzdalifah",
   "On Mount Safa",
   "At the Kaaba in Makkah"
  ],
  "correct_index": 2,
  "answer_full": "On the plain of Arafat, on the Day of Arafah, during the Farewell Hajj.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 152,
  "question": "In which year and month did the Prophet pass away?",
  "options": [
   "11 AH, in Muharram",
   "11 AH, in Rabi al-Awwal",
   "11 AH, in Ramadan",
   "10 AH, in Rabi al-Awwal",
   "11 AH, in Dhul-Hijjah",
   "12 AH, in Rabi al-Awwal"
  ],
  "correct_index": 1,
  "answer_full": "In 11 AH, in Rabi al-Awwal, in Madinah. Monday is well established; 12 Rabi al-Awwal is the famous date, but the exact day of the month is disputed.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 153,
  "question": "At what age did the Prophet pass away?",
  "options": [
   "63 years old",
   "60 years old",
   "70 years old",
   "61 years old",
   "65 years old",
   "62 years old"
  ],
  "correct_index": 0,
  "answer_full": "63 years old (lunar years).",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 154,
  "question": "In whose room did the Prophet pass away and where was he buried?",
  "options": [
   "In Sawdah's room, and buried in that same room",
   "In Umm Salamah's room, and buried in that same room",
   "In Aisha's room, and buried in that same room",
   "In Aisha's room, and buried at Jannat al-Baqi",
   "In Hafsah's room, and buried in that same room",
   "In Aisha's room, and buried beside the Kaaba"
  ],
  "correct_index": 2,
  "answer_full": "In Aisha's (RA) room in Madinah, and he was buried in that same room, now inside Al-Masjid an-Nabawi.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 155,
  "question": "How many Hajj and Umrah did the Prophet perform?",
  "options": [
   "One Hajj and three Umrahs",
   "One Hajj and four Umrahs",
   "Two Hajj and four Umrahs",
   "One Hajj and two Umrahs",
   "Two Hajj and two Umrahs",
   "One Hajj and five Umrahs"
  ],
  "correct_index": 1,
  "answer_full": "One Hajj after Hijrah (the Farewell Hajj) and four Umrahs, according to Sahih reports.",
  "part": 5,
  "part_name": "Prophethood, Makkah and Madinah Life"
 },
 {
  "num": 156,
  "question": "What does Sahaba / Sahabi mean?",
  "options": [
   "One who memorized the whole Quran",
   "One who migrated from Makkah to Madinah",
   "One who was born in Madinah during the Prophet's lifetime",
   "One who met the Prophet believing in him and died as a Muslim",
   "One who met the Prophet, even without believing",
   "One who fought in a battle with the Prophet"
  ],
  "correct_index": 3,
  "answer_full": "A Companion is commonly defined as someone who met the Prophet believing in him and died as a Muslim; scholars discuss the precise definition.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 157,
  "question": "Who are the Muhajirun?",
  "options": [
   "The freed slaves of the Prophet",
   "The Emigrants who migrated from Makkah to Madinah",
   "The Emigrants who migrated from Madinah to Makkah",
   "The Emigrants who migrated to Abyssinia",
   "The people who stayed in Makkah",
   "The Helpers of Madinah (Aws and Khazraj)"
  ],
  "correct_index": 1,
  "answer_full": "The Emigrants - Muslims who migrated from Makkah to Madinah for Islam.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 158,
  "question": "Who are the Ansar?",
  "options": [
   "The people of Abyssinia",
   "The Helpers of Madinah (Aws and Khazraj)",
   "The Emigrants to Abyssinia",
   "The Emigrants from Makkah",
   "The Helpers of Makkah (Banu Hashim)",
   "The Helpers of Taif"
  ],
  "correct_index": 1,
  "answer_full": "The Helpers - Muslims of Madinah (Aws and Khazraj) who welcomed and helped the Prophet and the Muhajirun.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 159,
  "question": "Who are Al-Ashara al-Mubashshara?",
  "options": [
   "The Ten given glad tidings of Paradise",
   "The Ten who memorized the Quran",
   "The Ten commanders at Badr",
   "The Ten who migrated to Abyssinia",
   "The Ten martyrs of Uhud",
   "The Ten who wrote the revelation"
  ],
  "correct_index": 0,
  "answer_full": "The Ten given glad tidings of Paradise in a well-known Hadith.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 160,
  "question": "Name the Ten Promised Paradise.",
  "options": [
   "Abu Bakr, Umar, Uthman, Ali, Talhah, Az-Zubayr, Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas, Sa'id ibn Zayd, Abu Ubaydah ibn al-Jarrah",
   "Abu Bakr, Umar, Uthman, Ali, Talhah, Az-Zubayr, Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas, Sa'id ibn Zayd, Khalid ibn al-Walid",
   "Abu Bakr, Umar, Uthman, Ali, Talhah, Az-Zubayr, Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas, Abu Hurayrah, Abu Ubaydah ibn al-Jarrah",
   "Abu Bakr, Umar, Uthman, Ali, Talhah, Az-Zubayr, Abdur-Rahman ibn Awf, Sa'd ibn Mu'adh, Sa'id ibn Zayd, Abu Ubaydah ibn al-Jarrah",
   "Abu Bakr, Umar, Uthman, Ali, Talhah, Az-Zubayr, Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas, Sa'id ibn Zayd, Bilal ibn Rabah",
   "Abu Bakr, Umar, Uthman, Ali, Talhah, Az-Zubayr, Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas, Sa'id ibn Zayd, Mu'awiyah ibn Abi Sufyan"
  ],
  "correct_index": 0,
  "answer_full": "Abu Bakr, Umar, Uthman, Ali, Talhah, Az-Zubayr, Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas, Sa'id ibn Zayd and Abu Ubaydah ibn al-Jarrah (RA).",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 161,
  "question": "Who was the first Caliph after the Prophet?",
  "options": [
   "Umar ibn al-Khattab",
   "Uthman ibn Affan",
   "Sa'd ibn Abi Waqqas",
   "Abu Bakr as-Siddiq",
   "Abu Ubaydah ibn al-Jarrah",
   "Ali ibn Abi Talib"
  ],
  "correct_index": 3,
  "answer_full": "Abu Bakr as-Siddiq (RA), caliph 11-13 AH.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 162,
  "question": "Why is Abu Bakr called As-Siddiq?",
  "options": [
   "He shielded the Prophet with his body at Uhud",
   "He was the first to shoot an arrow for Islam",
   "He was the Prophet's scribe of revelation",
   "He married two daughters of the Prophet",
   "He distinguished truth from falsehood",
   "He believed the Prophet immediately, especially about Isra and Mi'raj"
  ],
  "correct_index": 5,
  "answer_full": "The Truthful / Great Believer - he believed the Prophet immediately, especially about Isra and Mi'raj, without hesitation.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 163,
  "question": "Who was the second Caliph, called Al-Faruq?",
  "options": [
   "Umar ibn Abd al-Aziz",
   "Abu Bakr as-Siddiq",
   "Ali ibn Abi Talib",
   "Umar ibn al-Khattab",
   "Uthman ibn Affan",
   "Khalid ibn al-Walid"
  ],
  "correct_index": 3,
  "answer_full": "Umar ibn al-Khattab (RA). Al-Faruq means the one who distinguishes truth from falsehood.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 164,
  "question": "Who was the third Caliph, called Dhun-Nurayn?",
  "options": [
   "Talhah ibn Ubaydullah",
   "Abu Bakr as-Siddiq",
   "Umar ibn al-Khattab",
   "Az-Zubayr ibn al-Awwam",
   "Uthman ibn Affan",
   "Ali ibn Abi Talib"
  ],
  "correct_index": 4,
  "answer_full": "Uthman ibn Affan (RA) - Possessor of Two Lights, because he married two daughters of the Prophet, one after the other.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 165,
  "question": "Who was the fourth Caliph?",
  "options": [
   "Umar ibn al-Khattab",
   "Ali ibn Abi Talib",
   "Hasan ibn Ali",
   "Abu Bakr as-Siddiq",
   "Mu'awiyah ibn Abi Sufyan",
   "Uthman ibn Affan"
  ],
  "correct_index": 1,
  "answer_full": "Ali ibn Abi Talib (RA). Together the four are called Al-Khulafa ar-Rashidun - the Rightly Guided Caliphs.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 166,
  "question": "Who is traditionally regarded as the first martyr in Islam?",
  "options": [
   "Nusaybah bint Ka'b",
   "Khadijah bint Khuwaylid",
   "Sumayyah bint Khayyat",
   "Umm Ayman (Barakah)",
   "Asma bint Abi Bakr",
   "Fatimah bint al-Khattab"
  ],
  "correct_index": 2,
  "answer_full": "Sumayyah bint Khayyat (RA), mother of Ammar ibn Yasir, is traditionally regarded as the first martyr.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 167,
  "question": "Who was the first muezzin in Islam?",
  "options": [
   "Zayd ibn Harithah",
   "Ammar ibn Yasir",
   "Abdullah ibn Mas'ud",
   "Bilal ibn Rabah",
   "Salman al-Farsi",
   "Abu Dharr al-Ghifari"
  ],
  "correct_index": 3,
  "answer_full": "Bilal ibn Rabah (RA) is commonly known as the first muezzin. Reports describe him calling the Adhan at the Ka‘bah at the Conquest of Makkah.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 168,
  "question": "Who was the Prophet's scribe of revelation?",
  "options": [
   "Several Companions, including Mu'awiyah and Amr ibn al-As",
   "Several Companions, including Abu Hurayrah and Anas ibn Malik",
   "Several Companions, including Zayd ibn Thabit and Ubayy ibn Ka'b",
   "Only Ali ibn Abi Talib",
   "Only Ubayy ibn Ka'b",
   "Only Zayd ibn Thabit"
  ],
  "correct_index": 2,
  "answer_full": "Several Companions wrote revelation; Zayd ibn Thabit, Ubayy ibn Ka‘b, Ali, Uthman and others are named in historical reports.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 169,
  "question": "Who compiled the Quran into one book under Abu Bakr?",
  "options": [
   "Abdullah ibn Mas'ud",
   "Uthman ibn Affan",
   "Ubayy ibn Ka'b",
   "Ali ibn Abi Talib",
   "Mu'adh ibn Jabal",
   "Zayd ibn Thabit"
  ],
  "correct_index": 5,
  "answer_full": "Zayd ibn Thabit (RA) led the compilation under Abu Bakr, following the Battle of Yamamah and concern about the deaths of Quran reciters.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 170,
  "question": "Who was known as Sayf Allah - the Sword of Allah?",
  "options": [
   "Sa'd ibn Abi Waqqas",
   "Ali ibn Abi Talib",
   "Hamzah ibn Abd al-Muttalib",
   "Khalid ibn al-Walid",
   "Talhah ibn Ubaydullah",
   "Az-Zubayr ibn al-Awwam"
  ],
  "correct_index": 3,
  "answer_full": "Khalid ibn al-Walid (RA), known by the title Sayf Allah (Sword of Allah).",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 171,
  "question": "Who was Abu Hurayrah (RA)?",
  "options": [
   "A Companion renowned as the Sword of Allah",
   "A Companion renowned for narrating many Hadith",
   "A Companion renowned for compiling the Quran",
   "A Companion renowned as the first ambassador to Madinah",
   "A Companion renowned for serving the Prophet for 10 years",
   "A Companion renowned as the first muezzin"
  ],
  "correct_index": 1,
  "answer_full": "A Companion renowned for narrating many Hadith. His personal name is reported in several forms; Abdur-Rahman ibn Sakhr is a commonly cited one.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 172,
  "question": "Which Sahabi narrated the second-most Hadith among the men?",
  "options": [
   "Abu Sa'id al-Khudri",
   "Anas ibn Malik",
   "Abdullah ibn Abbas",
   "Abdullah ibn Umar",
   "Abdullah ibn Mas'ud",
   "Jabir ibn Abdullah"
  ],
  "correct_index": 3,
  "answer_full": "Abdullah ibn Umar (RA) is commonly listed among the most prolific male narrators after Abu Hurayrah; exact ranking can depend on counting methods.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 173,
  "question": "Who was Anas ibn Malik (RA)?",
  "options": [
   "The Prophet's scribe of revelation",
   "The first ambassador to Madinah",
   "The Prophet's young servant for 10 years in Makkah",
   "The Prophet's young servant for 10 years in Madinah",
   "The Prophet's servant who called the Adhan",
   "The Prophet's freedman and adopted son"
  ],
  "correct_index": 3,
  "answer_full": "The Prophet's young servant for 10 years in Madinah. He said the Prophet never scolded him once.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 174,
  "question": "Who was Salman al-Farsi (RA)?",
  "options": [
   "A Roman Sahabi who suggested the trench at Khandaq",
   "A Persian Sahabi who was the first muezzin",
   "A Persian Sahabi martyred at Mu'tah",
   "A Persian Sahabi who suggested the trench at Khandaq",
   "An Abyssinian Sahabi who suggested the trench at Khandaq",
   "A Persian Sahabi who compiled the Quran"
  ],
  "correct_index": 3,
  "answer_full": "A Persian Sahabi who travelled from Persia searching for the truth, freed in Madinah, and suggested the trench at Khandaq. The Prophet said: Salman is from us, the Ahl al-Bayt.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 175,
  "question": "Who was Abu Dharr al-Ghifari (RA)?",
  "options": [
   "A Sahabi famous for narrating the most Hadith",
   "A Sahabi famous for honesty, simplicity and fearlessness in truth",
   "A Sahabi famous for his wealth and generosity",
   "A Sahabi famous as the Sword of Allah",
   "A Sahabi famous for compiling the Quran",
   "A Sahabi famous as the keeper of the Prophet's secret"
  ],
  "correct_index": 1,
  "answer_full": "A Sahabi famous for his honesty, simplicity and fearlessness in speaking the truth.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 176,
  "question": "Who was Mus'ab ibn Umayr (RA)?",
  "options": [
   "A wealthy young Madinan, first ambassador to Makkah, martyred at Uhud",
   "A wealthy young Makkan, scribe of revelation, martyred at Uhud",
   "A wealthy young Makkan, first ambassador/teacher to Madinah, martyred at Uhud",
   "A wealthy young Makkan, first ambassador to Taif, martyred at Uhud",
   "A poor young Makkan, first ambassador to Madinah, martyred at Mu'tah",
   "A wealthy young Makkan, first ambassador to Abyssinia, martyred at Badr"
  ],
  "correct_index": 2,
  "answer_full": "A wealthy young Makkan who gave up luxury for Islam and was sent as the first ambassador / teacher to Madinah before Hijrah. He was martyred at Uhud.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 177,
  "question": "Who carried the banner and was martyred at Uhud looking like the Prophet?",
  "options": [
   "Hamzah ibn Abd al-Muttalib",
   "Abdullah ibn Rawahah",
   "Talhah ibn Ubaydullah",
   "Zayd ibn Harithah",
   "Ja'far ibn Abi Talib",
   "Mus'ab ibn Umayr"
  ],
  "correct_index": 5,
  "answer_full": "Mus'ab ibn Umayr (RA) - enemies thought they had killed the Prophet when he fell.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 178,
  "question": "Who was Ja'far ibn Abi Talib known as after Mu'tah?",
  "options": [
   "Ja'far al-Tayyar (Ja'far the Flyer)",
   "Amin al-Ummah (Trustworthy of the Ummah)",
   "Sayf Allah (Sword of Allah)",
   "Dhun-Nurayn (Possessor of Two Lights)",
   "Asadullah (Lion of Allah)",
   "Al-Faruq (the Distinguisher)"
  ],
  "correct_index": 0,
  "answer_full": "Ja‘far ibn Abi Talib (RA), known as Ja‘far al-Tayyar. Reports describe his reward in Paradise after his martyrdom at Mu‘tah.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 179,
  "question": "Who was Zayd ibn Harithah (RA)?",
  "options": [
   "The Prophet's cousin, martyred at Mu'tah",
   "The Prophet's freedman, named in Quran 33:37, martyred at Mu'tah",
   "The Prophet's freedman, named in Quran 33:37, martyred at Uhud",
   "The Prophet's freedman, the first muezzin",
   "The Prophet's scribe, martyred at Mu'tah",
   "The Prophet's son-in-law, martyred at Mu'tah"
  ],
  "correct_index": 1,
  "answer_full": "Zayd ibn Harithah (RA), named in Quran 33:37, and martyred at Mu‘tah.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 180,
  "question": "Who was Usamah ibn Zayd (RA)?",
  "options": [
   "Son of Zayd ibn Harithah, the first ambassador to Madinah",
   "Son of Abu Bakr, appointed army commander at a young age",
   "Son of Zayd ibn Thabit, appointed army commander at a young age",
   "Son of Zayd ibn Harithah, appointed army commander at a young age",
   "Son of Zayd ibn Harithah, martyred at Mu'tah",
   "Son of Ali ibn Abi Talib, appointed army commander at a young age"
  ],
  "correct_index": 3,
  "answer_full": "Son of Zayd ibn Harithah and Umm Ayman, beloved to the Prophet, appointed commander of an army at a young age.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 181,
  "question": "Who was Talhah ibn Ubaydullah (RA)?",
  "options": [
   "One of the Ten Promised Paradise, a wealthy trader famous for charity",
   "One of the Ten Promised Paradise, called Amin al-Ummah",
   "One of the Ten Promised Paradise, called the Disciple of the Prophet",
   "One of the Ten Promised Paradise, first to shoot an arrow for Islam",
   "One of the Ten Promised Paradise, who shielded the Prophet at Uhud",
   "One of the Ten Promised Paradise, who shielded the Prophet at Badr"
  ],
  "correct_index": 4,
  "answer_full": "One of the Ten Promised Paradise, who shielded the Prophet with his own body at Uhud.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 182,
  "question": "Who was Az-Zubayr ibn al-Awwam (RA)?",
  "options": [
   "One of the Ten Promised Paradise, called the Disciple (Hawari) of the Prophet",
   "One of the Ten Promised Paradise, who shielded the Prophet at Uhud",
   "One of the Ten Promised Paradise, called Amin al-Ummah",
   "One of the Ten Promised Paradise, commander at Qadisiyyah",
   "One of the Ten Promised Paradise, first to shoot an arrow for Islam",
   "One of the Ten Promised Paradise, a wealthy trader famous for charity"
  ],
  "correct_index": 0,
  "answer_full": "One of the Ten Promised Paradise, cousin of the Prophet (son of Safiyyah), called the Disciple (Hawari) of the Prophet.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 183,
  "question": "Who was Sa'd ibn Abi Waqqas (RA)?",
  "options": [
   "One of the Ten Promised Paradise, who shielded the Prophet at Uhud",
   "One of the Ten Promised Paradise, called the Disciple of the Prophet",
   "One of the Ten Promised Paradise, first to shoot an arrow for Islam",
   "One of the Ten Promised Paradise, the Prophet's cousin",
   "One of the Ten Promised Paradise, called Amin al-Ummah",
   "One of the Ten Promised Paradise, a wealthy trader famous for charity"
  ],
  "correct_index": 2,
  "answer_full": "One of the Ten Promised Paradise, first to shoot an arrow for Islam and commander at Qadisiyyah.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 184,
  "question": "Who was Abdur-Rahman ibn Awf (RA)?",
  "options": [
   "One of the Ten Promised Paradise, called the Disciple of the Prophet",
   "One of the Ten Promised Paradise, a wealthy trader famous for charity",
   "One of the Ten Promised Paradise, first to shoot an arrow for Islam",
   "One of the Ten Promised Paradise, called Amin al-Ummah",
   "One of the Ten Promised Paradise, commander at Qadisiyyah",
   "One of the Ten Promised Paradise, who shielded the Prophet at Uhud"
  ],
  "correct_index": 1,
  "answer_full": "One of the Ten Promised Paradise, a wealthy trader famous for his generosity in charity.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 185,
  "question": "Who was Abu Ubaydah ibn al-Jarrah (RA)?",
  "options": [
   "One of the Ten Promised Paradise, called the Disciple of the Prophet",
   "One of the Ten Promised Paradise, who shielded the Prophet at Uhud",
   "One of the Ten Promised Paradise, called As-Siddiq",
   "One of the Ten Promised Paradise, a wealthy trader famous for charity",
   "One of the Ten Promised Paradise, first to shoot an arrow for Islam",
   "One of the Ten Promised Paradise, called Amin al-Ummah"
  ],
  "correct_index": 5,
  "answer_full": "One of the Ten Promised Paradise, called Amin al-Ummah - the Trustworthy One of this Ummah.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 186,
  "question": "Who was Hamzah's killer and what later happened to him?",
  "options": [
   "Wahshi — later accepted Islam and killed Abu Jahl",
   "Hind bint Utbah — later accepted Islam",
   "Wahshi — remained an enemy of Islam until his death",
   "Wahshi — later accepted Islam and became a muezzin",
   "Utbah ibn Rabi'ah — later accepted Islam",
   "Wahshi — later accepted Islam and killed Musaylimah"
  ],
  "correct_index": 5,
  "answer_full": "Wahshi, a slave who killed Hamzah at Uhud with a spear. He later accepted Islam and killed Musaylimah the liar.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 187,
  "question": "Who was Khadijah’s cousin associated with the confirmation of the first revelation?",
  "options": [
   "Abdullah ibn Salam",
   "Bahira the monk",
   "Tamim al-Dari",
   "Zayd ibn Amr ibn Nufayl",
   "Salman al-Farsi",
   "Waraqah ibn Nawfal"
  ],
  "correct_index": 5,
  "answer_full": "Waraqah ibn Nawfal, a learned Christian relative of Khadijah. He died soon after the first revelation; whether he is counted as a Companion is discussed.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 188,
  "question": "Who was the first Sahabi to recite the Quran loudly in Makkah?",
  "options": [
   "Abdullah ibn Abbas",
   "Ubayy ibn Ka'b",
   "Mu'adh ibn Jabal",
   "Abdullah ibn Umar",
   "Abdullah ibn Mas'ud",
   "Zayd ibn Thabit"
  ],
  "correct_index": 4,
  "answer_full": "Abdullah ibn Mas'ud (RA), who recited Surah Ar-Rahman at the Kaaba and was beaten for it.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 189,
  "question": "Who was Abdullah ibn Mas'ud famous for?",
  "options": [
   "The compiler of the Quran under Abu Bakr",
   "The first muezzin in Islam",
   "The narrator of the most Hadith",
   "One of the greatest reciters and scholars of the Quran",
   "The keeper of the Prophet's secret",
   "The first ambassador to Madinah"
  ],
  "correct_index": 3,
  "answer_full": "He was one of the greatest reciters and scholars of the Quran among the Sahaba.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 190,
  "question": "Who was Ubayy ibn Ka'b (RA)?",
  "options": [
   "A leading reciter of the Quran and scribe of revelation from the Ansar",
   "A leading reciter of the Quran and the first muezzin",
   "A leading reciter of the Quran sent to Yemen as judge",
   "A leading reciter of the Quran and keeper of the Mushaf",
   "A leading reciter of the Quran and scribe of revelation from the Muhajirun",
   "A leading reciter of the Quran and compiler under Abu Bakr"
  ],
  "correct_index": 0,
  "answer_full": "A leading reciter of the Quran and scribe of revelation from the Ansar.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 191,
  "question": "Who was Mu'adh ibn Jabal (RA)?",
  "options": [
   "A young Ansari scholar who compiled the Quran",
   "A young Ansari scholar sent to Taif as teacher and judge",
   "A young Ansari scholar who was the first ambassador to Madinah",
   "A young Ansari scholar sent to Abyssinia as teacher",
   "A young Ansari scholar sent to Yemen as teacher and judge",
   "A young Muhajir scholar sent to Yemen as teacher and judge"
  ],
  "correct_index": 4,
  "answer_full": "A young Ansari scholar sent by the Prophet to Yemen as a teacher and judge, most knowledgeable about Halal and Haram.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 192,
  "question": "Who was Abu Ayyub al-Ansari (RA)?",
  "options": [
   "The Prophet stayed in his house during the Hijrah journey",
   "The Prophet stayed in his house on arriving in Taif",
   "He built the first mosque in Madinah",
   "The Prophet stayed in his house on arriving in Madinah",
   "The Prophet stayed in his house on arriving in Quba",
   "He was the first muezzin of Madinah"
  ],
  "correct_index": 3,
  "answer_full": "The Prophet stayed in his house after arriving in Madinah. Abu Ayyub later died during a campaign in the region of Constantinople; the traditional burial location is near Istanbul.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 193,
  "question": "Who was Asma bint Abi Bakr (RA)?",
  "options": [
   "Daughter of Abu Bakr, who carried food to the cave — Dhat an-Nitaqayn",
   "Daughter of Abu Bakr, the youngest wife of the Prophet",
   "Daughter of Umar, who carried food to the cave",
   "Daughter of Abu Bakr, mother of the Poor",
   "Daughter of Abu Bakr, who kept the Mushaf in her house",
   "Sister of Umar, whose reading led him to Islam"
  ],
  "correct_index": 0,
  "answer_full": "Daughter of Abu Bakr, sister of Aisha, who carried food to the cave during Hijrah - Dhat an- Nitaqayn.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 194,
  "question": "Who was Fatimah bint al-Khattab (RA)?",
  "options": [
   "Sister of Umar, whose Quran reading led to his accepting Islam",
   "Sister of Umar, who carried food to the cave",
   "Sister of Umar, who kept the Mushaf",
   "Sister of Umar, the first woman martyr",
   "Wife of Umar, whose Quran reading led to his accepting Islam",
   "Sister of Abu Bakr, whose Quran reading led to his accepting Islam"
  ],
  "correct_index": 0,
  "answer_full": "Sister of Umar; she and her husband Sa'id ibn Zayd were already Muslim and their Quran reading led to Umar accepting Islam.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 195,
  "question": "Who was Nusaybah bint Ka'b (RA)?",
  "options": [
   "Umm Umarah, the first woman martyr in Islam",
   "Umm Umarah, who fought to defend the Prophet at Uhud",
   "Umm Umarah, who fought to defend the Prophet at Badr",
   "Umm Salamah, who fought to defend the Prophet at Uhud",
   "Umm Ayman, who fought to defend the Prophet at Uhud",
   "Umm Umarah, who carried food to the cave"
  ],
  "correct_index": 1,
  "answer_full": "Umm Umarah, a brave Ansari woman who fought to defend the Prophet at Uhud with a sword.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 196,
  "question": "Who was the Sahabi known as the possessor of the Prophet's secret?",
  "options": [
   "Hudhayfah ibn al-Yaman",
   "Ammar ibn Yasir",
   "Abdullah ibn Mas'ud",
   "Abu Dharr al-Ghifari",
   "Salman al-Farsi",
   "Mu'adh ibn Jabal"
  ],
  "correct_index": 0,
  "answer_full": "Hudhayfah ibn al-Yaman (RA) - the Prophet confided to him the names of the hypocrites.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 197,
  "question": "Who was Abu Bakr's son who helped during Hijrah?",
  "options": [
   "Usamah ibn Zayd",
   "Abdur-Rahman ibn Abi Bakr",
   "Abdullah ibn Abbas",
   "Abdullah ibn Umar",
   "Muhammad ibn Abi Bakr",
   "Abdullah ibn Abi Bakr"
  ],
  "correct_index": 5,
  "answer_full": "Abdullah ibn Abi Bakr, who brought news of Quraysh's plans to the cave each night.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 198,
  "question": "Which Sahabi was paired as brother to Salman al-Farsi in Madinah?",
  "options": [
   "Abu Ayyub al-Ansari",
   "Abu al-Darda",
   "Abu Ubaydah ibn al-Jarrah",
   "Abu Hurayrah",
   "Abu Dharr al-Ghifari",
   "Abu Talhah al-Ansari"
  ],
  "correct_index": 1,
  "answer_full": "Abu al-Darda (RA) is traditionally reported as Salman al-Farsi’s brother through the Madinah brotherhood arrangement.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 199,
  "question": "Who is reported as the first Muslim martyr at Badr?",
  "options": [
   "Mihja', the freedman of Umar",
   "Mihja', the freedman of Uthman",
   "Sumayyah bint Khayyat",
   "Hamzah ibn Abd al-Muttalib",
   "Bilal ibn Rabah, the freedman of Abu Bakr",
   "Mihja', the freedman of Abu Bakr"
  ],
  "correct_index": 0,
  "answer_full": "Mihja‘, the freedman of Umar, is named in historical reports as the first Muslim martyr at Badr.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 },
 {
  "num": 200,
  "question": "Who is commonly regarded as the last Companion to die?",
  "options": [
   "Anas ibn Malik",
   "Jabir ibn Abdullah",
   "Abu Hurayrah",
   "Abu Sa'id al-Khudri",
   "Abu al-Tufayl Amir ibn Wathilah",
   "Abdullah ibn Umar"
  ],
  "correct_index": 4,
  "answer_full": "Abu al-Tufayl Amir ibn Wathilah is commonly named; reports differ over the precise year of his death.  Verification & source note This revision preserves the original 200-question scope while correcting or qualifying several items, especially disputed dates and ages, the Bahira report, the foster-care distinction, the count/list of uncles, Maria al-Qibtiyyah’s classification, the “first to accept Islam” categories, Hijri-calendar wording, and disputed historical reports. Primary/reference materials for study: Qur’an; Sahih al-Bukhari; Sahih Muslim; Ibn Ishaq/Ibn Hisham’s Seerah; Ibn Sa‘d’s al-Tabaqat; al-Tabari’s history. Historical works are not all equally reliable, and reports should be evaluated according to scholarly methods. Selected reference notes: al-Tabari’s historical material records differences in Khadijah’s age at marriage and other biographical details; modern Seerah timelines also note disagreement over the Prophet’s exact birth date. Maria is described in classical biographical accounts as the mother of Ibrahim and as an umm walad, not counted among the wives in the common Sunni list. This PDF uses cautious wording such as “commonly reported,” “traditionally,” and “according to historical reports” where appropriate. For formal religious teaching, check a qualified scholar or the specific source edition.",
  "part": 6,
  "part_name": "Sahaba: The Companions"
 }
];
module.exports = { SQ_PARTS, SQ_QUESTIONS };
