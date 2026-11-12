// ─────────────────────────────────────────────────────────────
// GK Kids — SIBAQ 2026 GK Quiz game (Bidaya & Uoola).
// SOURCE OF TRUTH: Ajmal Ujire NHIA WhatsApp chat export (16 Oct–12 Nov 2026)
// + Mock Test PDFs 1-3 + Test 4 photos. Every question and answer below
// comes from that pack — nothing invented. Full pack (with study bank):
// SIBAQ26_GK_Quiz_Pack_Ajmal_Mock_Tests.pdf (28 pp).
// Samad's plan: when the child passes all 4 tests, DELETE this pack and
// move to a new syllabus Samad + Muse make ourselves.
// The game is for S Abdul Khadirul Faaz (N1322) first; other boys can be
// added later via the gk_game_players table — the bank is not tied to a boy.
// How it plays (like the Map Study game): 4 tests in order, Test N+1
// unlocks only after Test N is passed (8/10 in one round). Each round
// draws 10 questions — UNSEEN first, then past mistakes, then review —
// so repeated plays cover new ground instead of the same 10.
// A question:
//   key     stable id, e.g. "t1-q1"
//   q       the question (exactly as Ajmal gave it)
//   options exactly 4; answer must be one of them, word for word
//   point   the fact to learn (the correct answer)
//   img     Test 4 photo questions only: /gk-photos/<file>.jpg
// FLAGS (from the pack — confirm with Ajmal before testing on them):
//   * 19 Oct 'Education Minister Prahlad Joshi' was WRONG in the chat —
//     correct is Dharmendra Pradhan (fixed here).
//   * 29 Oct current affairs unverified (Cyclone Arnab, Ballon d'Or 2026).
//   * Test 3 Q19 answer missing in chat — filled as Caliph Al-Mutawakkil.
//   * Test 4 Q21 connect (rhino+elephant+tiger) — suggested Kaziranga.
// ─────────────────────────────────────────────────────────────
const GK_GAME_PLAY_COUNT = 10;
const GK_GAME_PASS_MARK = 8;
const GK_GAME_TESTS = [
  {
    "id": "T1",
    "n": 1,
    "key": "mock-test-1",
    "icon": "🧠",
    "title": "Mock Test 1 — GK Quiz",
    "desc": "51 questions · 9 Nov 2026 · Ajmal Ujire",
    "total": 51
  },
  {
    "id": "T2",
    "n": 2,
    "key": "mock-test-2",
    "icon": "🗺️",
    "title": "Mock Test 2 — Map Study",
    "desc": "59 questions · 10 Nov 2026 · Ajmal Ujire",
    "total": 59
  },
  {
    "id": "T3",
    "n": 3,
    "key": "mock-test-3",
    "icon": "🧠",
    "title": "Mock Test 3 — GK Quiz",
    "desc": "20 questions · 11 Nov 2026 · Ajmal Ujire",
    "total": 20
  },
  {
    "id": "T4",
    "n": 4,
    "key": "mock-test-4",
    "icon": "🖼️",
    "title": "Mock Test 4 — GK Quiz (Day-4)",
    "desc": "24 questions · 12 Nov 2026 · photos + written + connect",
    "total": 24
  }
];

const GK_GAME_QUESTIONS = {
  "T1": [
    {
      "key": "t1-q1",
      "q": "When did the First World War begin and end?",
      "options": [
        "Charles Babbage",
        "Prophet Yaqub (AS)",
        "1914–1918",
        "245"
      ],
      "answer": "1914–1918",
      "point": "1914–1918"
    },
    {
      "key": "t1-q2",
      "q": "Who is the current President of Brazil?",
      "options": [
        "Dr. B. R. Ambedkar",
        "Abu Hurairah (RA)",
        "543",
        "Luiz Inacio Lula da Silva"
      ],
      "answer": "Luiz Inacio Lula da Silva",
      "point": "Luiz Inacio Lula da Silva"
    },
    {
      "key": "t1-q3",
      "q": "Who is the current Chief Election Commissioner of India?",
      "options": [
        "40 years",
        "26 January",
        "Mars",
        "Gyanesh Kumar"
      ],
      "answer": "Gyanesh Kumar",
      "point": "Gyanesh Kumar"
    },
    {
      "key": "t1-q4",
      "q": "Who is the current President of the Indian National Congress (INC)?",
      "options": [
        "Reserve Bank of India",
        "Electronic Voting Machine",
        "Mallikarjun Kharge",
        "Abu Ayyub al-Ansari (RA)"
      ],
      "answer": "Mallikarjun Kharge",
      "point": "Mallikarjun Kharge"
    },
    {
      "key": "t1-q5",
      "q": "Who is known as the Fifth Rightly Guided Caliph of Islam?",
      "options": [
        "Mount Judi",
        "Umar ibn Abdul Aziz",
        "Zayd ibn Harithah (RA)",
        "Sanjay Malhotra"
      ],
      "answer": "Umar ibn Abdul Aziz",
      "point": "Umar ibn Abdul Aziz"
    },
    {
      "key": "t1-q6",
      "q": "Who was the first Education Minister of independent India?",
      "options": [
        "Electronic Voting Machine",
        "Satya Nadella",
        "Maulana Abul Kalam Azad",
        "Dr. A. P. J. Abdul Kalam"
      ],
      "answer": "Maulana Abul Kalam Azad",
      "point": "Maulana Abul Kalam Azad"
    },
    {
      "key": "t1-q7",
      "q": "Who is regarded as the intellectual father of the French Revolution?",
      "options": [
        "Jean-Jacques Rousseau",
        "Rahul Gandhi",
        "Dr. B. R. Ambedkar",
        "Maulana Abul Kalam Azad"
      ],
      "answer": "Jean-Jacques Rousseau",
      "point": "Jean-Jacques Rousseau"
    },
    {
      "key": "t1-q8",
      "q": "In which year did the Russian Revolution take place?",
      "options": [
        "Aisha (RA)",
        "1917",
        "Pratibha Patil",
        "10 years"
      ],
      "answer": "1917",
      "point": "1917"
    },
    {
      "key": "t1-q9",
      "q": "What is the full form of EVM?",
      "options": [
        "Satya Nadella",
        "1917",
        "Electronic Voting Machine",
        "Nuh, Ibrahim, Musa, Isa and Muhammad (peace be upon them)"
      ],
      "answer": "Electronic Voting Machine",
      "point": "Electronic Voting Machine"
    },
    {
      "key": "t1-q10",
      "q": "Who is the CEO of Microsoft?",
      "options": [
        "Pratibha Patil",
        "Jerusalem (Al-Aqsa Mosque)",
        "Satya Nadella",
        "Los Angeles, USA"
      ],
      "answer": "Satya Nadella",
      "point": "Satya Nadella"
    },
    {
      "key": "t1-q11",
      "q": "Who was the first woman President of India?",
      "options": [
        "543",
        "Sanjay Malhotra",
        "Soviet Union",
        "Pratibha Patil"
      ],
      "answer": "Pratibha Patil",
      "point": "Pratibha Patil"
    },
    {
      "key": "t1-q12",
      "q": "Who wrote the novel The God of Small Things?",
      "options": [
        "245",
        "Dr. A. P. J. Abdul Kalam",
        "Part III",
        "Arundhati Roy"
      ],
      "answer": "Arundhati Roy",
      "point": "Arundhati Roy"
    },
    {
      "key": "t1-q13",
      "q": "Who wrote the autobiography Long Walk to Freedom?",
      "options": [
        "Nelson Mandela",
        "Abu Ayyub al-Ansari (RA)",
        "26 January 1950",
        "President (all four were Presidents of India)"
      ],
      "answer": "Nelson Mandela",
      "point": "Nelson Mandela"
    },
    {
      "key": "t1-q14",
      "q": "Which companion of Prophet Muhammad (PBUH) is mentioned by name in the Quran?",
      "options": [
        "Zayd ibn Harithah (RA)",
        "Rahul Gandhi",
        "Political and military tension between the USA and the Soviet Union",
        "Maulana Abul Kalam Azad"
      ],
      "answer": "Zayd ibn Harithah (RA)",
      "point": "Zayd ibn Harithah (RA)"
    },
    {
      "key": "t1-q15",
      "q": "Who are the five Ulul Azm Prophets?",
      "options": [
        "Part III",
        "Los Angeles, USA",
        "Reserve Bank of India",
        "Nuh, Ibrahim, Musa, Isa and Muhammad (peace be upon them)"
      ],
      "answer": "Nuh, Ibrahim, Musa, Isa and Muhammad (peace be upon them)",
      "point": "Nuh, Ibrahim, Musa, Isa and Muhammad (peace be upon them)"
    },
    {
      "key": "t1-q16",
      "q": "What was the name of Prophet Yusuf's (AS) father?",
      "options": [
        "1914–1918",
        "Electronic Voting Machine",
        "Prophet Yaqub (AS)",
        "Los Angeles, USA"
      ],
      "answer": "Prophet Yaqub (AS)",
      "point": "Prophet Yaqub (AS)"
    },
    {
      "key": "t1-q17",
      "q": "What was the first Qibla of Muslims?",
      "options": [
        "Los Angeles, USA",
        "Jerusalem (Al-Aqsa Mosque)",
        "Reserve Bank of India",
        "Aisha (RA)"
      ],
      "answer": "Jerusalem (Al-Aqsa Mosque)",
      "point": "Jerusalem (Al-Aqsa Mosque)"
    },
    {
      "key": "t1-q18",
      "q": "What is the capital claimed by Palestine?",
      "options": [
        "Qitmir",
        "East Jerusalem",
        "Maulana Abul Kalam Azad",
        "Mount Judi"
      ],
      "answer": "East Jerusalem",
      "point": "East Jerusalem"
    },
    {
      "key": "t1-q19",
      "q": "Who is the current Chief Justice of India?",
      "options": [
        "Charles Babbage",
        "Satya Nadella",
        "Justice Surya Kant",
        "Nuh, Ibrahim, Musa, Isa and Muhammad (peace be upon them)"
      ],
      "answer": "Justice Surya Kant",
      "point": "Justice Surya Kant"
    },
    {
      "key": "t1-q20",
      "q": "Who is the current Governor of the Reserve Bank of India?",
      "options": [
        "Political and military tension between the USA and the Soviet Union",
        "Mount Judi",
        "Sanjay Malhotra",
        "Dr. Sarvepalli Radhakrishnan"
      ],
      "answer": "Sanjay Malhotra",
      "point": "Sanjay Malhotra"
    },
    {
      "key": "t1-q21",
      "q": "What is the full form of RBI?",
      "options": [
        "Rahul Gandhi",
        "Soviet Union",
        "Justice Surya Kant",
        "Reserve Bank of India"
      ],
      "answer": "Reserve Bank of India",
      "point": "Reserve Bank of India"
    },
    {
      "key": "t1-q22",
      "q": "At what age did Prophet Muhammad (PBUH) receive the first revelation?",
      "options": [
        "40 years",
        "Om Birla",
        "26 January 1950",
        "Laika"
      ],
      "answer": "40 years",
      "point": "40 years"
    },
    {
      "key": "t1-q23",
      "q": "How many years did Prophet Muhammad (PBUH) live in Madinah?",
      "options": [
        "Dr. B. R. Ambedkar",
        "Charles Babbage",
        "40 years",
        "10 years"
      ],
      "answer": "10 years",
      "point": "10 years"
    },
    {
      "key": "t1-q24",
      "q": "In whose house did Prophet Muhammad (PBUH) stay after migrating to Madinah?",
      "options": [
        "Abu Ayyub al-Ansari (RA)",
        "Om Birla",
        "Mallikarjun Kharge",
        "East Jerusalem"
      ],
      "answer": "Abu Ayyub al-Ansari (RA)",
      "point": "Abu Ayyub al-Ansari (RA)"
    },
    {
      "key": "t1-q25",
      "q": "What was the Cold War?",
      "options": [
        "Jean-Jacques Rousseau",
        "Political and military tension between the USA and the Soviet Union",
        "Soviet Union",
        "543"
      ],
      "answer": "Political and military tension between the USA and the Soviet Union",
      "point": "Political and military tension between the USA and the Soviet Union"
    },
    {
      "key": "t1-q26",
      "q": "Who is known as the Father of the Computer?",
      "options": [
        "Prophet Yaqub (AS)",
        "Prime Minister (all four were Prime Ministers of India)",
        "Charles Babbage",
        "1914–1918"
      ],
      "answer": "Charles Babbage",
      "point": "Charles Babbage"
    },
    {
      "key": "t1-q27",
      "q": "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
      "options": [
        "Dr. B. R. Ambedkar",
        "Soviet Union",
        "Justice Surya Kant",
        "East Jerusalem"
      ],
      "answer": "Dr. B. R. Ambedkar",
      "point": "Dr. B. R. Ambedkar"
    },
    {
      "key": "t1-q28",
      "q": "On which date did the Constitution of India come into effect?",
      "options": [
        "1914–1918",
        "1917",
        "26 January 1950",
        "Soviet Union"
      ],
      "answer": "26 January 1950",
      "point": "26 January 1950"
    },
    {
      "key": "t1-q29",
      "q": "When is Republic Day celebrated in India?",
      "options": [
        "East Jerusalem",
        "Nelson Mandela",
        "26 January",
        "Pratibha Patil"
      ],
      "answer": "26 January",
      "point": "26 January"
    },
    {
      "key": "t1-q30",
      "q": "Who was the first Vice-President of India?",
      "options": [
        "Dr. Sarvepalli Radhakrishnan",
        "Political and military tension between the USA and the Soviet Union",
        "Laika",
        "Abu Ayyub al-Ansari (RA)"
      ],
      "answer": "Dr. Sarvepalli Radhakrishnan",
      "point": "Dr. Sarvepalli Radhakrishnan"
    },
    {
      "key": "t1-q31",
      "q": "Who is known as the Missile Man of India?",
      "options": [
        "Luiz Inacio Lula da Silva",
        "Dr. B. R. Ambedkar",
        "Dr. A. P. J. Abdul Kalam",
        "Zayd ibn Harithah (RA)"
      ],
      "answer": "Dr. A. P. J. Abdul Kalam",
      "point": "Dr. A. P. J. Abdul Kalam"
    },
    {
      "key": "t1-q32",
      "q": "Which city will host the 2028 Summer Olympics?",
      "options": [
        "Charles Babbage",
        "Los Angeles, USA",
        "Maulana Abul Kalam Azad",
        "Om Birla"
      ],
      "answer": "Los Angeles, USA",
      "point": "Los Angeles, USA"
    },
    {
      "key": "t1-q33",
      "q": "Which countries will jointly host the 2030 FIFA World Cup?",
      "options": [
        "Nuh, Ibrahim, Musa, Isa and Muhammad (peace be upon them)",
        "Spain, Portugal and Morocco (centenary matches in Argentina, Paraguay and Uruguay)",
        "Om Birla",
        "Electronic Voting Machine"
      ],
      "answer": "Spain, Portugal and Morocco (centenary matches in Argentina, Paraguay and Uruguay)",
      "point": "Spain, Portugal and Morocco (centenary matches in Argentina, Paraguay and Uruguay)"
    },
    {
      "key": "t1-q34",
      "q": "Which Prophets received the divine books Tawrat, Injil and Zabur?",
      "options": [
        "Prophet Yaqub (AS)",
        "Musa (AS) – Tawrat; Isa (AS) – Injil; Dawud (AS) – Zabur",
        "Soviet Union",
        "1914–1918"
      ],
      "answer": "Musa (AS) – Tawrat; Isa (AS) – Injil; Dawud (AS) – Zabur",
      "point": "Musa (AS) – Tawrat; Isa (AS) – Injil; Dawud (AS) – Zabur"
    },
    {
      "key": "t1-q35",
      "q": "Who narrated the largest number of Hadith among the male companions?",
      "options": [
        "Abu Hurairah (RA)",
        "Luiz Inacio Lula da Silva",
        "Qitmir",
        "Prime Minister (all four were Prime Ministers of India)"
      ],
      "answer": "Abu Hurairah (RA)",
      "point": "Abu Hurairah (RA)"
    },
    {
      "key": "t1-q36",
      "q": "Who narrated the largest number of Hadith among the female companions?",
      "options": [
        "Luiz Inacio Lula da Silva",
        "Aisha (RA)",
        "Part III",
        "Los Angeles, USA"
      ],
      "answer": "Aisha (RA)",
      "point": "Aisha (RA)"
    },
    {
      "key": "t1-q37",
      "q": "On which mountain did the Ark of Prophet Nuh (AS) come to rest?",
      "options": [
        "Om Birla",
        "Satya Nadella",
        "Mount Judi",
        "East Jerusalem"
      ],
      "answer": "Mount Judi",
      "point": "Mount Judi"
    },
    {
      "key": "t1-q38",
      "q": "What was the name of the dog of the Companions of the Cave (Ashab al-Kahf)?",
      "options": [
        "Qitmir",
        "Charles Babbage",
        "Reserve Bank of India",
        "Laika"
      ],
      "answer": "Qitmir",
      "point": "Qitmir"
    },
    {
      "key": "t1-q39",
      "q": "Which animal was the first to orbit Earth?",
      "options": [
        "Rahul Gandhi",
        "Dog",
        "Reserve Bank of India",
        "Dr. Sarvepalli Radhakrishnan"
      ],
      "answer": "Dog",
      "point": "Dog"
    },
    {
      "key": "t1-q40",
      "q": "Which country sent the dog Laika into space?",
      "options": [
        "Soviet Union",
        "Musa (AS) – Tawrat; Isa (AS) – Injil; Dawud (AS) – Zabur",
        "Aisha (RA)",
        "Satya Nadella"
      ],
      "answer": "Soviet Union",
      "point": "Soviet Union"
    },
    {
      "key": "t1-q41",
      "q": "What was the name of the first dog to orbit Earth?",
      "options": [
        "Maulana Abul Kalam Azad",
        "Laika",
        "Abu Ayyub al-Ansari (RA)",
        "Arundhati Roy"
      ],
      "answer": "Laika",
      "point": "Laika"
    },
    {
      "key": "t1-q42",
      "q": "Which planet is known as the Red Planet?",
      "options": [
        "Qitmir",
        "Soviet Union",
        "40 years",
        "Mars"
      ],
      "answer": "Mars",
      "point": "Mars"
    },
    {
      "key": "t1-q43",
      "q": "How many elected seats are there in the Lok Sabha?",
      "options": [
        "543",
        "Aisha (RA)",
        "Abu Hurairah (RA)",
        "Laika"
      ],
      "answer": "543",
      "point": "543"
    },
    {
      "key": "t1-q44",
      "q": "How many seats are there in the Rajya Sabha?",
      "options": [
        "Luiz Inacio Lula da Silva",
        "Arundhati Roy",
        "245",
        "Electronic Voting Machine"
      ],
      "answer": "245",
      "point": "245"
    },
    {
      "key": "t1-q45",
      "q": "In which Part of the Indian Constitution are Fundamental Rights mentioned?",
      "options": [
        "Part III",
        "Umar ibn Abdul Aziz",
        "26 January",
        "Pratibha Patil"
      ],
      "answer": "Part III",
      "point": "Part III"
    },
    {
      "key": "t1-q46",
      "q": "Who is the current Leader of the Opposition in the Lok Sabha?",
      "options": [
        "Prime Minister (all four were Prime Ministers of India)",
        "Nelson Mandela",
        "Rahul Gandhi",
        "Arundhati Roy"
      ],
      "answer": "Rahul Gandhi",
      "point": "Rahul Gandhi"
    },
    {
      "key": "t1-q47",
      "q": "Who is the current Speaker of the Lok Sabha?",
      "options": [
        "Om Birla",
        "Abu Hurairah (RA)",
        "Jean-Jacques Rousseau",
        "40 years"
      ],
      "answer": "Om Birla",
      "point": "Om Birla"
    },
    {
      "key": "t1-q48",
      "q": "Who is the current Vice-President of India?",
      "options": [
        "Spain, Portugal and Morocco (centenary matches in Argentina, Paraguay and Uruguay)",
        "C. P. Radhakrishnan",
        "Mars",
        "Jerusalem (Al-Aqsa Mosque)"
      ],
      "answer": "C. P. Radhakrishnan",
      "point": "C. P. Radhakrishnan"
    },
    {
      "key": "t1-q49",
      "q": "Who is the Chairman of the Rajya Sabha?",
      "options": [
        "Arundhati Roy",
        "Qitmir",
        "C. P. Radhakrishnan",
        "East Jerusalem"
      ],
      "answer": "C. P. Radhakrishnan",
      "point": "C. P. Radhakrishnan"
    },
    {
      "key": "t1-q50",
      "q": "What is common among Dr. S. Radhakrishnan, Neelam Sanjiva Reddy, Dr. Zakir Husain and Dr. A. P. J. Abdul Kalam?",
      "options": [
        "President (all four were Presidents of India)",
        "26 January",
        "Laika",
        "Jean-Jacques Rousseau"
      ],
      "answer": "President (all four were Presidents of India)",
      "point": "President (all four were Presidents of India)"
    },
    {
      "key": "t1-q51",
      "q": "What is common among Morarji Desai, Rajiv Gandhi, P. V. Narasimha Rao and Atal Bihari Vajpayee?",
      "options": [
        "Zayd ibn Harithah (RA)",
        "Abu Ayyub al-Ansari (RA)",
        "543",
        "Prime Minister (all four were Prime Ministers of India)"
      ],
      "answer": "Prime Minister (all four were Prime Ministers of India)",
      "point": "Prime Minister (all four were Prime Ministers of India)"
    }
  ],
  "T2": [
    {
      "key": "t2-q1",
      "q": "What is the capital of Russia?",
      "options": [
        "Shimla.",
        "Moscow.",
        "Lesotho.",
        "Persian Gulf."
      ],
      "answer": "Moscow.",
      "point": "Moscow."
    },
    {
      "key": "t2-q2",
      "q": "Which is the world's largest inhabited river island?",
      "options": [
        "Majuli Island.",
        "Yarlung Tsangpo (Tsangpo).",
        "Himalayas.",
        "Arctic Ocean."
      ],
      "answer": "Majuli Island.",
      "point": "Majuli Island."
    },
    {
      "key": "t2-q3",
      "q": "The Western Ghats pass through which six Indian states?",
      "options": [
        "Mount Kilimanjaro.",
        "Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu.",
        "Kutch, Gujarat.",
        "Cyprus and Kosovo."
      ],
      "answer": "Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu.",
      "point": "Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu."
    },
    {
      "key": "t2-q4",
      "q": "What is the capital of Meghalaya?",
      "options": [
        "Ganga, Yamuna and the mythical Saraswati.",
        "Shillong.",
        "Yangtze River.",
        "Yamuna River."
      ],
      "answer": "Shillong.",
      "point": "Shillong."
    },
    {
      "key": "t2-q5",
      "q": "What is the capital of Manipur?",
      "options": [
        "Cyprus and Kosovo.",
        "Arctic Ocean.",
        "Bengaluru.",
        "Imphal."
      ],
      "answer": "Imphal.",
      "point": "Imphal."
    },
    {
      "key": "t2-q6",
      "q": "Which is the largest district in India by area?",
      "options": [
        "Kutch, Gujarat.",
        "Pretoria, Cape Town and Bloemfontein.",
        "Great Barrier Reef.",
        "Sri Vijaya Puram (formerly Port Blair)."
      ],
      "answer": "Kutch, Gujarat.",
      "point": "Kutch, Gujarat."
    },
    {
      "key": "t2-q7",
      "q": "Name one major tributary of the Ganga River.",
      "options": [
        "Yamuna River.",
        "Great Barrier Reef.",
        "China and Russia.",
        "Arunachal Pradesh."
      ],
      "answer": "Yamuna River.",
      "point": "Yamuna River."
    },
    {
      "key": "t2-q8",
      "q": "Which river is known as the Salt River of India?",
      "options": [
        "Riyadh and Doha.",
        "Luni River.",
        "Yangtze River.",
        "Western Ghats."
      ],
      "answer": "Luni River.",
      "point": "Luni River."
    },
    {
      "key": "t2-q9",
      "q": "Which river flows between the Vindhya and Satpura ranges?",
      "options": [
        "Narmada River.",
        "Mariana Trench.",
        "Amazon River.",
        "Cyprus and Kosovo."
      ],
      "answer": "Narmada River.",
      "point": "Narmada River."
    },
    {
      "key": "t2-q10",
      "q": "Which is the easternmost state of India?",
      "options": [
        "China.",
        "Moscow.",
        "Arunachal Pradesh.",
        "Japan."
      ],
      "answer": "Arunachal Pradesh.",
      "point": "Arunachal Pradesh."
    },
    {
      "key": "t2-q11",
      "q": "Which is the westernmost state of India?",
      "options": [
        "Gangtok.",
        "Son River.",
        "Gujarat.",
        "Western Ghats."
      ],
      "answer": "Gujarat.",
      "point": "Gujarat."
    },
    {
      "key": "t2-q12",
      "q": "Which Indian state shares borders with seven other states and the Union Territory of Delhi?",
      "options": [
        "Persian Gulf.",
        "Barren Island.",
        "Uttar Pradesh.",
        "Son River."
      ],
      "answer": "Uttar Pradesh.",
      "point": "Uttar Pradesh."
    },
    {
      "key": "t2-q13",
      "q": "Which mountain range separates the Indian subcontinent from the Tibetan Plateau?",
      "options": [
        "Gangtok.",
        "Himalayas.",
        "Kunchikal Falls, Karnataka.",
        "Kavaratti."
      ],
      "answer": "Himalayas.",
      "point": "Himalayas."
    },
    {
      "key": "t2-q14",
      "q": "Which river originates from the Amarkantak Plateau and flows eastwards?",
      "options": [
        "Uttar Pradesh.",
        "Son River.",
        "Riyadh and Doha.",
        "Rocky Mountains."
      ],
      "answer": "Son River.",
      "point": "Son River."
    },
    {
      "key": "t2-q15",
      "q": "Which is the highest waterfall in India?",
      "options": [
        "Moscow.",
        "Kunchikal Falls, Karnataka.",
        "Yamuna River.",
        "Lakshadweep Islands."
      ],
      "answer": "Kunchikal Falls, Karnataka.",
      "point": "Kunchikal Falls, Karnataka."
    },
    {
      "key": "t2-q16",
      "q": "Which is the largest freshwater lake in India?",
      "options": [
        "Wular Lake, Jammu and Kashmir.",
        "Indonesia.",
        "China and Russia.",
        "Sri Vijaya Puram (formerly Port Blair)."
      ],
      "answer": "Wular Lake, Jammu and Kashmir.",
      "point": "Wular Lake, Jammu and Kashmir."
    },
    {
      "key": "t2-q17",
      "q": "Which group of islands is located in the Arabian Sea?",
      "options": [
        "Ural Mountains.",
        "Lakshadweep Islands.",
        "Cyprus and Kosovo.",
        "Son River."
      ],
      "answer": "Lakshadweep Islands.",
      "point": "Lakshadweep Islands."
    },
    {
      "key": "t2-q18",
      "q": "What is the capital of Andaman and Nicobar Islands?",
      "options": [
        "Jamuna River.",
        "Hyderabad.",
        "Sri Vijaya Puram (formerly Port Blair).",
        "Caspian Sea."
      ],
      "answer": "Sri Vijaya Puram (formerly Port Blair).",
      "point": "Sri Vijaya Puram (formerly Port Blair)."
    },
    {
      "key": "t2-q19",
      "q": "What is the capital of Lakshadweep?",
      "options": [
        "Hyderabad.",
        "Kavaratti.",
        "Jupiter.",
        "Great Barrier Reef."
      ],
      "answer": "Kavaratti.",
      "point": "Kavaratti."
    },
    {
      "key": "t2-q20",
      "q": "Which Indian state is famous for tea production?",
      "options": [
        "Assam.",
        "Lesotho.",
        "Barren Island.",
        "Jaipur."
      ],
      "answer": "Assam.",
      "point": "Assam."
    },
    {
      "key": "t2-q21",
      "q": "Which three rivers are traditionally believed to meet at Prayagraj?",
      "options": [
        "Pampas.",
        "Yamuna River.",
        "Ganga, Yamuna and the mythical Saraswati.",
        "Tehran and Baghdad."
      ],
      "answer": "Ganga, Yamuna and the mythical Saraswati.",
      "point": "Ganga, Yamuna and the mythical Saraswati."
    },
    {
      "key": "t2-q22",
      "q": "Which is the longest river in Asia?",
      "options": [
        "Yangtze River.",
        "Equator.",
        "Sri Vijaya Puram (formerly Port Blair).",
        "Great Barrier Reef."
      ],
      "answer": "Yangtze River.",
      "point": "Yangtze River."
    },
    {
      "key": "t2-q23",
      "q": "Which Indian state is known as the Land of the Rising Sun?",
      "options": [
        "Arctic Ocean.",
        "Arunachal Pradesh.",
        "50 stars.",
        "Sri Vijaya Puram (formerly Port Blair)."
      ],
      "answer": "Arunachal Pradesh.",
      "point": "Arunachal Pradesh."
    },
    {
      "key": "t2-q24",
      "q": "Which is the largest ocean in the world?",
      "options": [
        "Pacific Ocean.",
        "Gujarat.",
        "Yarlung Tsangpo (Tsangpo).",
        "Tehran and Baghdad."
      ],
      "answer": "Pacific Ocean.",
      "point": "Pacific Ocean."
    },
    {
      "key": "t2-q25",
      "q": "Which Indian city is known as the Pink City?",
      "options": [
        "Jaipur.",
        "Son River.",
        "Gobi Desert.",
        "Imphal."
      ],
      "answer": "Jaipur.",
      "point": "Jaipur."
    },
    {
      "key": "t2-q26",
      "q": "Which Indian city is known as the Silicon Valley of India?",
      "options": [
        "Bengaluru.",
        "Narmada River.",
        "Shillong.",
        "Moscow."
      ],
      "answer": "Bengaluru.",
      "point": "Bengaluru."
    },
    {
      "key": "t2-q27",
      "q": "Which is the largest planet in our Solar System?",
      "options": [
        "Jupiter.",
        "Japan.",
        "Yarlung Tsangpo (Tsangpo).",
        "Assam."
      ],
      "answer": "Jupiter.",
      "point": "Jupiter."
    },
    {
      "key": "t2-q28",
      "q": "What is the Brahmaputra River called in Tibet?",
      "options": [
        "Shillong.",
        "Mount Kilimanjaro.",
        "Uttar Pradesh.",
        "Yarlung Tsangpo (Tsangpo)."
      ],
      "answer": "Yarlung Tsangpo (Tsangpo).",
      "point": "Yarlung Tsangpo (Tsangpo)."
    },
    {
      "key": "t2-q29",
      "q": "What is the Ganga River called in Bangladesh?",
      "options": [
        "Jamuna River.",
        "Wular Lake, Jammu and Kashmir.",
        "Lesotho.",
        "Kutch, Gujarat."
      ],
      "answer": "Jamuna River.",
      "point": "Jamuna River."
    },
    {
      "key": "t2-q30",
      "q": "Which country is completely surrounded by South Africa?",
      "options": [
        "Tehran and Baghdad.",
        "Arunachal Pradesh.",
        "Lesotho.",
        "Luni River."
      ],
      "answer": "Lesotho.",
      "point": "Lesotho."
    },
    {
      "key": "t2-q31",
      "q": "What are the three capital cities of South Africa?",
      "options": [
        "Pretoria, Cape Town and Bloemfontein.",
        "Bengaluru.",
        "Great Barrier Reef.",
        "Pacific Ocean."
      ],
      "answer": "Pretoria, Cape Town and Bloemfontein.",
      "point": "Pretoria, Cape Town and Bloemfontein."
    },
    {
      "key": "t2-q32",
      "q": "Which mountain range is also known as the Sahyadri?",
      "options": [
        "Western Ghats.",
        "Caspian Sea.",
        "Kavaratti.",
        "Son River."
      ],
      "answer": "Western Ghats.",
      "point": "Western Ghats."
    },
    {
      "key": "t2-q33",
      "q": "Which is the only confirmed active volcano in India?",
      "options": [
        "Lesotho.",
        "Jamuna River.",
        "Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu.",
        "Barren Island."
      ],
      "answer": "Barren Island.",
      "point": "Barren Island."
    },
    {
      "key": "t2-q34",
      "q": "In which city is the famous Charminar located?",
      "options": [
        "Equator.",
        "China.",
        "Western Ghats.",
        "Hyderabad."
      ],
      "answer": "Hyderabad.",
      "point": "Hyderabad."
    },
    {
      "key": "t2-q35",
      "q": "What is Point Nemo?",
      "options": [
        "The oceanic pole of inaccessibility, the point farthest from any land.",
        "Jamuna River.",
        "Lesotho.",
        "Majuli Island."
      ],
      "answer": "The oceanic pole of inaccessibility, the point farthest from any land.",
      "point": "The oceanic pole of inaccessibility, the point farthest from any land."
    },
    {
      "key": "t2-q36",
      "q": "What are the capitals of Saudi Arabia and Qatar?",
      "options": [
        "Riyadh and Doha.",
        "Lakshadweep Islands.",
        "Cyprus and Kosovo.",
        "Kavaratti."
      ],
      "answer": "Riyadh and Doha.",
      "point": "Riyadh and Doha."
    },
    {
      "key": "t2-q37",
      "q": "In which country is the Great Wall located?",
      "options": [
        "Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu.",
        "Kutch, Gujarat.",
        "China.",
        "Western Ghats."
      ],
      "answer": "China.",
      "point": "China."
    },
    {
      "key": "t2-q38",
      "q": "What is the capital of Himachal Pradesh?",
      "options": [
        "Kunchikal Falls, Karnataka.",
        "Shimla.",
        "Indonesia.",
        "Narmada River."
      ],
      "answer": "Shimla.",
      "point": "Shimla."
    },
    {
      "key": "t2-q39",
      "q": "What is the capital of Sikkim?",
      "options": [
        "Jamuna River.",
        "Wular Lake, Jammu and Kashmir.",
        "Indonesia.",
        "Gangtok."
      ],
      "answer": "Gangtok.",
      "point": "Gangtok."
    },
    {
      "key": "t2-q40",
      "q": "What are the capitals of Iran and Iraq?",
      "options": [
        "Bengaluru.",
        "Tehran and Baghdad.",
        "Sri Vijaya Puram (formerly Port Blair).",
        "Gobi Desert."
      ],
      "answer": "Tehran and Baghdad.",
      "point": "Tehran and Baghdad."
    },
    {
      "key": "t2-q41",
      "q": "Which country is known as the Land of the Rising Sun?",
      "options": [
        "Indonesia.",
        "China and Russia.",
        "Japan.",
        "Western Ghats."
      ],
      "answer": "Japan.",
      "point": "Japan."
    },
    {
      "key": "t2-q42",
      "q": "How many stars are there on the flag of the United States?",
      "options": [
        "Son River.",
        "Shillong.",
        "Pampas.",
        "50 stars."
      ],
      "answer": "50 stars.",
      "point": "50 stars."
    },
    {
      "key": "t2-q43",
      "q": "Which two current national flags feature the geographical maps of their respective countries?",
      "options": [
        "Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu.",
        "Cyprus and Kosovo.",
        "Gujarat.",
        "Sri Vijaya Puram (formerly Port Blair)."
      ],
      "answer": "Cyprus and Kosovo.",
      "point": "Cyprus and Kosovo."
    },
    {
      "key": "t2-q44",
      "q": "Which is the largest inland body of water in the world by area?",
      "options": [
        "Amazon River.",
        "Caspian Sea.",
        "Kutch, Gujarat.",
        "China."
      ],
      "answer": "Caspian Sea.",
      "point": "Caspian Sea."
    },
    {
      "key": "t2-q45",
      "q": "Which river carries the largest volume of water in the world?",
      "options": [
        "Ural Mountains.",
        "Amazon River.",
        "China and Russia.",
        "Luni River."
      ],
      "answer": "Amazon River.",
      "point": "Amazon River."
    },
    {
      "key": "t2-q46",
      "q": "Which gulf is an important oil-shipping waterway bordered by Saudi Arabia, the UAE and Qatar?",
      "options": [
        "Wular Lake, Jammu and Kashmir.",
        "50 stars.",
        "Persian Gulf.",
        "Kavaratti."
      ],
      "answer": "Persian Gulf.",
      "point": "Persian Gulf."
    },
    {
      "key": "t2-q47",
      "q": "Which is the smallest and shallowest of the world's five oceans?",
      "options": [
        "Himalayas.",
        "Arctic Ocean.",
        "Barren Island.",
        "Sri Vijaya Puram (formerly Port Blair)."
      ],
      "answer": "Arctic Ocean.",
      "point": "Arctic Ocean."
    },
    {
      "key": "t2-q48",
      "q": "What is the name of the highly saline lake located in the Jordan Rift Valley?",
      "options": [
        "Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu.",
        "Gangtok.",
        "Dead Sea.",
        "Western Ghats."
      ],
      "answer": "Dead Sea.",
      "point": "Dead Sea."
    },
    {
      "key": "t2-q49",
      "q": "What is the world's largest coral reef system, located off the coast of Queensland, Australia?",
      "options": [
        "Son River.",
        "50 stars.",
        "Rocky Mountains.",
        "Great Barrier Reef."
      ],
      "answer": "Great Barrier Reef.",
      "point": "Great Barrier Reef."
    },
    {
      "key": "t2-q50",
      "q": "Which mountain range stretches across western North America from Canada to the southwestern United States?",
      "options": [
        "Gangtok.",
        "50 stars.",
        "Rocky Mountains.",
        "Atacama Desert."
      ],
      "answer": "Rocky Mountains.",
      "point": "Rocky Mountains."
    },
    {
      "key": "t2-q51",
      "q": "What are the temperate grasslands of Argentina and Uruguay called?",
      "options": [
        "Persian Gulf.",
        "Himalayas.",
        "Pampas.",
        "Japan."
      ],
      "answer": "Pampas.",
      "point": "Pampas."
    },
    {
      "key": "t2-q52",
      "q": "Which large cold desert lies across northern China and southern Mongolia?",
      "options": [
        "Shillong.",
        "Gangtok.",
        "Gobi Desert.",
        "Kutch, Gujarat."
      ],
      "answer": "Gobi Desert.",
      "point": "Gobi Desert."
    },
    {
      "key": "t2-q53",
      "q": "Which mountain range is traditionally considered the natural boundary between Europe and Asia?",
      "options": [
        "Gujarat.",
        "Jaipur.",
        "Moscow.",
        "Ural Mountains."
      ],
      "answer": "Ural Mountains.",
      "point": "Ural Mountains."
    },
    {
      "key": "t2-q54",
      "q": "Which is the highest mountain in Africa?",
      "options": [
        "Mount Kilimanjaro.",
        "Atacama Desert.",
        "Hyderabad.",
        "Kavaratti."
      ],
      "answer": "Mount Kilimanjaro.",
      "point": "Mount Kilimanjaro."
    },
    {
      "key": "t2-q55",
      "q": "Which desert in northern Chile is considered one of the driest places on Earth?",
      "options": [
        "Arunachal Pradesh.",
        "Atacama Desert.",
        "Rocky Mountains.",
        "Uttar Pradesh."
      ],
      "answer": "Atacama Desert.",
      "point": "Atacama Desert."
    },
    {
      "key": "t2-q56",
      "q": "Which two countries share land borders with 14 countries each?",
      "options": [
        "Great Barrier Reef.",
        "Uttar Pradesh.",
        "Mount Kilimanjaro.",
        "China and Russia."
      ],
      "answer": "China and Russia.",
      "point": "China and Russia."
    },
    {
      "key": "t2-q57",
      "q": "Which island country consists of more than 17,000 islands and lies between the Indian and Pacific Oceans?",
      "options": [
        "Amazon River.",
        "Indonesia.",
        "Tehran and Baghdad.",
        "Yarlung Tsangpo (Tsangpo)."
      ],
      "answer": "Indonesia.",
      "point": "Indonesia."
    },
    {
      "key": "t2-q58",
      "q": "Which imaginary line of latitude passes through parts of Africa, South America and Southeast Asia?",
      "options": [
        "Equator.",
        "Cyprus and Kosovo.",
        "Mount Kilimanjaro.",
        "Gangtok."
      ],
      "answer": "Equator.",
      "point": "Equator."
    },
    {
      "key": "t2-q59",
      "q": "What is the deepest oceanic trench in the world, located in the western Pacific Ocean?",
      "options": [
        "Mariana Trench.",
        "Jamuna River.",
        "Sri Vijaya Puram (formerly Port Blair).",
        "Gobi Desert."
      ],
      "answer": "Mariana Trench.",
      "point": "Mariana Trench."
    }
  ],
  "T3": [
    {
      "key": "t3-q1",
      "q": "Where will the 31st Conference of the Parties (COP31) be held in 2026?",
      "options": [
        "Antalya, Türkiye.",
        "Justice M. Fathima Beevi.",
        "1905.",
        "Dadabhai Naoroji."
      ],
      "answer": "Antalya, Türkiye.",
      "point": "Antalya, Türkiye."
    },
    {
      "key": "t3-q2",
      "q": "Who became India's 100th Chess Grandmaster?",
      "options": [
        "26 January 1950.",
        "Dr. Verghese Kurien.",
        "Anuj Shrivatri. InsightsIAS +1",
        "Caliph Al-Mutawakkil  [NOT in Ajmal's chat - added, please confirm with Ajmal]"
      ],
      "answer": "Anuj Shrivatri. InsightsIAS +1",
      "point": "Anuj Shrivatri. InsightsIAS +1"
    },
    {
      "key": "t3-q3",
      "q": "Who wrote the autobiography \"Playing It My Way\"?",
      "options": [
        "Sachin Tendulkar.",
        "Pratibha Patil.",
        "Dr. Verghese Kurien.",
        "Dadabhai Naoroji."
      ],
      "answer": "Sachin Tendulkar.",
      "point": "Sachin Tendulkar."
    },
    {
      "key": "t3-q4",
      "q": "Who was the first woman President of India?",
      "options": [
        "Mehmed II (Mehmed the Conqueror).",
        "Sachin Tendulkar.",
        "Pratibha Patil.",
        "1905."
      ],
      "answer": "Pratibha Patil.",
      "point": "Pratibha Patil."
    },
    {
      "key": "t3-q5",
      "q": "Who is popularly known as the Mahatma?",
      "options": [
        "Samarra, Iraq.",
        "Justice M. Fathima Beevi.",
        "Iran.",
        "Mahatma Gandhi."
      ],
      "answer": "Mahatma Gandhi.",
      "point": "Mahatma Gandhi."
    },
    {
      "key": "t3-q6",
      "q": "Who wrote the book \"Poverty and Un-British Rule in India\"?",
      "options": [
        "Anuj Shrivatri. InsightsIAS +1",
        "Dadabhai Naoroji.",
        "Caliph Al-Mutawakkil  [NOT in Ajmal's chat - added, please confirm with Ajmal]",
        "1905."
      ],
      "answer": "Dadabhai Naoroji.",
      "point": "Dadabhai Naoroji."
    },
    {
      "key": "t3-q7",
      "q": "Who is known as the Frontier Gandhi of India?",
      "options": [
        "26 January 1950.",
        "Iran.",
        "Sachin Tendulkar.",
        "Khan Abdul Ghaffar Khan."
      ],
      "answer": "Khan Abdul Ghaffar Khan.",
      "point": "Khan Abdul Ghaffar Khan."
    },
    {
      "key": "t3-q8",
      "q": "Who is known as the Father of the White Revolution in India?",
      "options": [
        "Microsoft.",
        "Dr. Verghese Kurien.",
        "Sonia Gandhi. HarperReach",
        "Mahatma Gandhi."
      ],
      "answer": "Dr. Verghese Kurien.",
      "point": "Dr. Verghese Kurien."
    },
    {
      "key": "t3-q9",
      "q": "In which year did the Partition of Bengal take place?",
      "options": [
        "Sachin Tendulkar.",
        "Anuj Shrivatri. InsightsIAS +1",
        "1905.",
        "Samarra, Iraq."
      ],
      "answer": "1905.",
      "point": "1905."
    },
    {
      "key": "t3-q10",
      "q": "Who was the first woman judge of the Supreme Court of India?",
      "options": [
        "Justice M. Fathima Beevi.",
        "Antalya, Türkiye.",
        "1905.",
        "Microsoft."
      ],
      "answer": "Justice M. Fathima Beevi.",
      "point": "Justice M. Fathima Beevi."
    },
    {
      "key": "t3-q11",
      "q": "On which date did the Constitution of India come into effect?",
      "options": [
        "Antalya, Türkiye.",
        "Sachin Tendulkar.",
        "26 January 1950.",
        "Sonia Gandhi. HarperReach"
      ],
      "answer": "26 January 1950.",
      "point": "26 January 1950."
    },
    {
      "key": "t3-q12",
      "q": "Persia is the historical name of which present-day country?",
      "options": [
        "Iran.",
        "1905.",
        "Microsoft.",
        "Anuj Shrivatri. InsightsIAS +1"
      ],
      "answer": "Iran.",
      "point": "Iran."
    },
    {
      "key": "t3-q13",
      "q": "In which country is the historic city of Samarkand located?",
      "options": [
        "1905.",
        "Vijaya Lakshmi Pandit.",
        "Uzbekistan.",
        "Microsoft."
      ],
      "answer": "Uzbekistan.",
      "point": "Uzbekistan."
    },
    {
      "key": "t3-q14",
      "q": "Which Ottoman Sultan conquered Constantinople in 1453?",
      "options": [
        "Anuj Shrivatri. InsightsIAS +1",
        "M. John Harrison. The Booker Prizes",
        "Mehmed II (Mehmed the Conqueror).",
        "Khan Abdul Ghaffar Khan."
      ],
      "answer": "Mehmed II (Mehmed the Conqueror).",
      "point": "Mehmed II (Mehmed the Conqueror)."
    },
    {
      "key": "t3-q15",
      "q": "Who won the 2026 Booker Prize for the novel \"The End of Everything\"?",
      "options": [
        "Caliph Al-Mutawakkil  [NOT in Ajmal's chat - added, please confirm with Ajmal]",
        "Pratibha Patil.",
        "M. John Harrison. The Booker Prizes",
        "26 January 1950."
      ],
      "answer": "M. John Harrison. The Booker Prizes",
      "point": "M. John Harrison. The Booker Prizes"
    },
    {
      "key": "t3-q16",
      "q": "Who wrote the book \"Belonging: A Journey of Love\"?",
      "options": [
        "26 January 1950.",
        "Sonia Gandhi. HarperReach",
        "Dr. Verghese Kurien.",
        "Iran."
      ],
      "answer": "Sonia Gandhi. HarperReach",
      "point": "Sonia Gandhi. HarperReach"
    },
    {
      "key": "t3-q17",
      "q": "Which organisation uses the motto \"Your Potential, Our Passion\"?",
      "options": [
        "Sonia Gandhi. HarperReach",
        "Microsoft.",
        "Justice M. Fathima Beevi.",
        "Uzbekistan."
      ],
      "answer": "Microsoft.",
      "point": "Microsoft."
    },
    {
      "key": "t3-q18",
      "q": "Which city became the capital of the Abbasid Caliphate in 836 CE under Caliph Al-Mu'tasim?",
      "options": [
        "Khan Abdul Ghaffar Khan.",
        "Samarra, Iraq.",
        "M. John Harrison. The Booker Prizes",
        "Dadabhai Naoroji."
      ],
      "answer": "Samarra, Iraq.",
      "point": "Samarra, Iraq."
    },
    {
      "key": "t3-q19",
      "q": "Which Abbasid Caliph further developed the city of Samarra?",
      "options": [
        "Dr. Verghese Kurien.",
        "Samarra, Iraq.",
        "Mahatma Gandhi.",
        "Caliph Al-Mutawakkil  [NOT in Ajmal's chat - added, please confirm with Ajmal]"
      ],
      "answer": "Caliph Al-Mutawakkil  [NOT in Ajmal's chat - added, please confirm with Ajmal]",
      "point": "Caliph Al-Mutawakkil  [NOT in Ajmal's chat - added, please confirm with Ajmal]"
    },
    {
      "key": "t3-q20",
      "q": "Who was the first Indian woman to become President of the United Nations General Assembly?",
      "options": [
        "Vijaya Lakshmi Pandit.",
        "1905.",
        "Iran.",
        "Samarra, Iraq."
      ],
      "answer": "Vijaya Lakshmi Pandit.",
      "point": "Vijaya Lakshmi Pandit."
    }
  ],
  "T4": [
    {
      "key": "t4-q1",
      "q": "Who is this person?",
      "options": [
        "Dr. Zakir Husain - third President of India",
        "Pratibha Patil - first woman President of India",
        "Lal Bahadur Shastri - second Prime Minister of India",
        "Young Mahatma Gandhi"
      ],
      "answer": "Young Mahatma Gandhi",
      "point": "Young Mahatma Gandhi",
      "img": "/gk-photos/00000178-PHOTO-2026-11-12-12-57-29.jpg"
    },
    {
      "key": "t4-q2",
      "q": "Who is this person?",
      "options": [
        "Abraham Lincoln - 16th President of the USA",
        "Rahul Dravid - cricketer",
        "Dr. Rajendra Prasad - first President of India",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi"
      ],
      "answer": "Dr. Rajendra Prasad - first President of India",
      "point": "Dr. Rajendra Prasad - first President of India",
      "img": "/gk-photos/00000179-PHOTO-2026-11-12-12-57-29.jpg"
    },
    {
      "key": "t4-q3",
      "q": "Who is this person?",
      "options": [
        "Pratibha Patil - first woman President of India",
        "Martin Luther King Jr.",
        "Lal Bahadur Shastri - second Prime Minister of India",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi"
      ],
      "answer": "Lal Bahadur Shastri - second Prime Minister of India",
      "point": "Lal Bahadur Shastri - second Prime Minister of India",
      "img": "/gk-photos/00000180-PHOTO-2026-11-12-12-57-29.jpg"
    },
    {
      "key": "t4-q4",
      "q": "Who is this person?",
      "options": [
        "Rahul Dravid - cricketer",
        "Young Mahatma Gandhi",
        "Dr. Rajendra Prasad - first President of India",
        "J. D. Vance - Vice President of the USA"
      ],
      "answer": "Rahul Dravid - cricketer",
      "point": "Rahul Dravid - cricketer",
      "img": "/gk-photos/00000181-PHOTO-2026-11-12-12-57-30.jpg"
    },
    {
      "key": "t4-q5",
      "q": "Who is this person?",
      "options": [
        "Martin Luther King Jr.",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi",
        "Rahul Dravid - cricketer",
        "Pratibha Patil - first woman President of India"
      ],
      "answer": "Khan Abdul Ghaffar Khan - Frontier Gandhi",
      "point": "Khan Abdul Ghaffar Khan - Frontier Gandhi",
      "img": "/gk-photos/00000182-PHOTO-2026-11-12-12-57-30.jpg"
    },
    {
      "key": "t4-q6",
      "q": "Who is this person?",
      "options": [
        "Lal Bahadur Shastri - second Prime Minister of India",
        "Muhammad Ali Jinnah - founder of Pakistan",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi",
        "Dr. Zakir Husain - third President of India"
      ],
      "answer": "Dr. Zakir Husain - third President of India",
      "point": "Dr. Zakir Husain - third President of India",
      "img": "/gk-photos/00000183-PHOTO-2026-11-12-12-57-30.jpg"
    },
    {
      "key": "t4-q7",
      "q": "Who is this person?",
      "options": [
        "Pratibha Patil - first woman President of India",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi",
        "Muhammad Ali Jinnah - founder of Pakistan",
        "Rahul Dravid - cricketer"
      ],
      "answer": "Muhammad Ali Jinnah - founder of Pakistan",
      "point": "Muhammad Ali Jinnah - founder of Pakistan",
      "img": "/gk-photos/00000184-PHOTO-2026-11-12-12-57-31.jpg"
    },
    {
      "key": "t4-q8",
      "q": "Who is this person?",
      "options": [
        "Abraham Lincoln - 16th President of the USA",
        "Dr. Zakir Husain - third President of India",
        "Pratibha Patil - first woman President of India",
        "Vaibhav Suryavanshi - cricketer, Rajasthan Royals"
      ],
      "answer": "Pratibha Patil - first woman President of India",
      "point": "Pratibha Patil - first woman President of India",
      "img": "/gk-photos/00000185-PHOTO-2026-11-12-12-57-31.jpg"
    },
    {
      "key": "t4-q9",
      "q": "Who is this person?",
      "options": [
        "Lal Bahadur Shastri - second Prime Minister of India",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi",
        "Vaibhav Suryavanshi - cricketer, Rajasthan Royals",
        "J. D. Vance - Vice President of the USA"
      ],
      "answer": "Vaibhav Suryavanshi - cricketer, Rajasthan Royals",
      "point": "Vaibhav Suryavanshi - cricketer, Rajasthan Royals",
      "img": "/gk-photos/00000186-PHOTO-2026-11-12-12-57-31.jpg"
    },
    {
      "key": "t4-q10",
      "q": "Who is this person?",
      "options": [
        "Abraham Lincoln - 16th President of the USA",
        "Young Mahatma Gandhi",
        "Pratibha Patil - first woman President of India",
        "Martin Luther King Jr."
      ],
      "answer": "Martin Luther King Jr.",
      "point": "Martin Luther King Jr.",
      "img": "/gk-photos/00000187-PHOTO-2026-11-12-12-57-31.jpg"
    },
    {
      "key": "t4-q11",
      "q": "Who is this person?",
      "options": [
        "J. D. Vance - Vice President of the USA",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi",
        "Pratibha Patil - first woman President of India",
        "Dr. Rajendra Prasad - first President of India"
      ],
      "answer": "J. D. Vance - Vice President of the USA",
      "point": "J. D. Vance - Vice President of the USA",
      "img": "/gk-photos/00000188-PHOTO-2026-11-12-12-57-32.jpg"
    },
    {
      "key": "t4-q12",
      "q": "Who is this person?",
      "options": [
        "Abraham Lincoln - 16th President of the USA",
        "Rahul Dravid - cricketer",
        "Khan Abdul Ghaffar Khan - Frontier Gandhi",
        "Pratibha Patil - first woman President of India"
      ],
      "answer": "Abraham Lincoln - 16th President of the USA",
      "point": "Abraham Lincoln - 16th President of the USA",
      "img": "/gk-photos/00000189-PHOTO-2026-11-12-12-57-32.jpg"
    },
    {
      "key": "t4-q13",
      "q": "How many Prophets are mentioned by name in the Holy Quran?",
      "options": [
        "25 Prophets",
        "24 Prophets",
        "28 Prophets",
        "30 Prophets"
      ],
      "answer": "25 Prophets",
      "point": "25 Prophets"
    },
    {
      "key": "t4-q14",
      "q": "How many times has the Indian men's cricket team won the ICC ODI Cricket World Cup, and in which years?",
      "options": [
        "2 times - 1983 and 2011",
        "1 time - 1983",
        "3 times - 1983, 2011 and 2023",
        "2 times - 1983 and 2007"
      ],
      "answer": "2 times - 1983 and 2011",
      "point": "2 times - 1983 and 2011"
    },
    {
      "key": "t4-q15",
      "q": "Which is the third-highest civilian award in India?  A. Bharat Ratna  B. Padma Vibhushan  C. Padma Bhushan  D. Padma Shri",
      "options": [
        "Padma Bhushan",
        "Bharat Ratna",
        "Padma Vibhushan",
        "Padma Shri"
      ],
      "answer": "Padma Bhushan",
      "point": "Padma Bhushan"
    },
    {
      "key": "t4-q16",
      "q": "Who wrote the autobiography My Experiments with Truth?",
      "options": [
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Sardar Patel",
        "Dr. Rajendra Prasad"
      ],
      "answer": "Mahatma Gandhi",
      "point": "Mahatma Gandhi"
    },
    {
      "key": "t4-q17",
      "q": "What is the retirement age of the Chief Justice of India?",
      "options": [
        "65 years",
        "60 years",
        "62 years",
        "70 years"
      ],
      "answer": "65 years",
      "point": "65 years"
    },
    {
      "key": "t4-q18",
      "q": "Which is the Lower House of the Indian Parliament?",
      "options": [
        "Lok Sabha",
        "Rajya Sabha",
        "Vidhan Sabha",
        "Parliament House"
      ],
      "answer": "Lok Sabha",
      "point": "Lok Sabha"
    },
    {
      "key": "t4-q19",
      "q": "On the bank of which river is the Taj Mahal situated?",
      "options": [
        "Yamuna River",
        "Ganga River",
        "Narmada River",
        "Godavari River"
      ],
      "answer": "Yamuna River",
      "point": "Yamuna River"
    },
    {
      "key": "t4-q20",
      "q": "What is the term of office of the President of India?",
      "options": [
        "5 years",
        "4 years",
        "6 years",
        "7 years"
      ],
      "answer": "5 years",
      "point": "5 years"
    },
    {
      "key": "t4-q21",
      "q": "What connects these three animals?",
      "options": [
        "All three are found in Kaziranga National Park, Assam",
        "All three are national animals of India",
        "All three live only in Africa",
        "All three are sea animals"
      ],
      "answer": "All three are found in Kaziranga National Park, Assam",
      "point": "All three are found in Kaziranga National Park, Assam",
      "img": "/gk-photos/00000193-PHOTO-2026-11-12-13-02-20.jpg"
    },
    {
      "key": "t4-q22",
      "q": "In which battle was Zayd ibn Harithah (RA) martyred?",
      "options": [
        "Battle of Mu'tah",
        "Battle of Badr",
        "Battle of Uhud",
        "Battle of Khandaq"
      ],
      "answer": "Battle of Mu'tah",
      "point": "Battle of Mu'tah",
      "img": "/gk-photos/00000194-PHOTO-2026-11-12-13-02-20.jpg"
    },
    {
      "key": "t4-q23",
      "q": "Is the Black Stone originally black or not?",
      "options": [
        "No - it was originally white",
        "Yes - it was always black",
        "No - it was originally green",
        "It was made of silver"
      ],
      "answer": "No - it was originally white",
      "point": "No - it was originally white",
      "img": "/gk-photos/00000195-PHOTO-2026-11-12-13-02-20.jpg"
    },
    {
      "key": "t4-q24",
      "q": "Which mosque is the oldest mosque and one of the first in Islam?",
      "options": [
        "Masjid Quba",
        "Masjid an-Nabawi",
        "Masjid al-Haram",
        "Masjid al-Aqsa"
      ],
      "answer": "Masjid Quba",
      "point": "Masjid Quba",
      "img": "/gk-photos/00000196-PHOTO-2026-11-12-13-02-21.jpg"
    }
  ]
};

module.exports = { GK_GAME_TESTS, GK_GAME_QUESTIONS, GK_GAME_PASS_MARK, GK_GAME_PLAY_COUNT };
