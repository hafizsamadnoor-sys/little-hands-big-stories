// ─────────────────────────────────────────────────────────────
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
const MAP_GAME_STAGES = [
  {
    "n": 1,
    "key": "map-basics",
    "icon": "🧭",
    "title": "Map-Reading Basics",
    "desc": "Directions, Equator, Prime Meridian, how to read a map."
  },
  {
    "n": 2,
    "key": "continents-oceans",
    "icon": "🌍",
    "title": "Continents & Oceans",
    "desc": "The 7 continents and the 5 oceans."
  },
  {
    "n": 3,
    "key": "asia",
    "icon": "🌏",
    "title": "Asia",
    "desc": "South Asia, the Middle East and East Asia."
  },
  {
    "n": 4,
    "key": "world-capitals",
    "icon": "🏛️",
    "title": "World Capitals",
    "desc": "The 45 Task-2 countries + 20 extra capitals."
  },
  {
    "n": 5,
    "key": "india-states",
    "icon": "🇮🇳",
    "title": "India States",
    "desc": "The 28 states by region, with their capitals."
  },
  {
    "n": 6,
    "key": "rivers-mountains",
    "icon": "🏔️",
    "title": "Rivers & Mountains",
    "desc": "Rivers, mountains, deserts and neighbours of India."
  },
  {
    "n": 7,
    "key": "holy-places",
    "icon": "🕌",
    "title": "Holy & Famous Places",
    "desc": "Makkah, Madinah, Jerusalem, Cairo, Baghdad and more."
  },
  {
    "n": 8,
    "key": "biggest",
    "icon": "🏆",
    "title": "Biggest / Longest / Highest",
    "desc": "The biggest, longest and highest things in the world."
  }
];

// Pass mark to finish a stage and unlock the next one: 6 of 10.
const MAP_GAME_PASS_MARK = 6;
const MAP_GAME_TIME_PER_Q = {
  "easy": 0,
  "medium": 45,
  "hard": 20
}; // seconds; 0 = no timer
// Questions drawn per play (one stage = one play of 10).
const MAP_GAME_PLAY_COUNT = 10;
// Round 2 (no-options typing round): 45 seconds per question.
const MAP_GAME_ROUND2_TIME_PER_Q = 45;

const MAP_GAME_QUESTIONS = {
  "1": [
    {
      "key": "s1-q1",
      "level": "easy",
      "q": "On most maps, which direction is UP?",
      "options": [
        "North",
        "South",
        "East",
        "West"
      ],
      "answer": "North",
      "point": "North is up on most maps.",
      "hint": "Think of the compass: N is at the top.",
      "typed": "North"
    },
    {
      "key": "s1-q2",
      "level": "easy",
      "q": "What does the compass rose show?",
      "options": [
        "The directions",
        "The rainfall",
        "The population",
        "The time"
      ],
      "answer": "The directions",
      "point": "The compass rose shows the directions.",
      "hint": "It has N, S, E and W on it.",
      "typed": "The directions",
      "accept": [
        "directions"
      ]
    },
    {
      "key": "s1-q3",
      "level": "easy",
      "q": "Which sea is to the WEST of India?",
      "options": [
        "Arabian Sea",
        "Bay of Bengal",
        "Red Sea",
        "Mediterranean Sea"
      ],
      "answer": "Arabian Sea",
      "point": "India touches the Arabian Sea on the west.",
      "hint": "Kerala is on this sea.",
      "map": {
        "kind": "india",
        "place": "Arabian Sea",
        "where": "West coast of India",
        "note": "The sea on the WEST side of India, next to Kerala and Gujarat."
      },
      "typed": "Arabian Sea"
    },
    {
      "key": "s1-q4",
      "level": "easy",
      "q": "Which sea is to the EAST of India?",
      "options": [
        "Bay of Bengal",
        "Arabian Sea",
        "Red Sea",
        "Caspian Sea"
      ],
      "answer": "Bay of Bengal",
      "point": "India touches the Bay of Bengal on the east.",
      "hint": "West Bengal and Odisha are on this sea.",
      "map": {
        "kind": "india",
        "place": "Bay of Bengal",
        "where": "East coast of India",
        "note": "The sea on the EAST side of India, next to West Bengal and Odisha."
      },
      "typed": "Bay of Bengal"
    },
    {
      "key": "s1-q5",
      "level": "medium",
      "q": "The Equator is the middle line of the Earth. What number is it?",
      "options": [
        "0 degrees",
        "90 degrees",
        "180 degrees",
        "45 degrees"
      ],
      "answer": "0 degrees",
      "point": "The Equator is the middle line (0 degrees). India is north of it.",
      "hint": "It is the starting line for latitude.",
      "typed": "0 degrees",
      "accept": [
        "0",
        "zero degrees"
      ]
    },
    {
      "key": "s1-q6",
      "level": "medium",
      "q": "The Prime Meridian (0 degrees) runs through which city?",
      "options": [
        "London",
        "Paris",
        "New Delhi",
        "Cairo"
      ],
      "answer": "London",
      "point": "The Prime Meridian runs through London, England.",
      "hint": "It is the capital of the United Kingdom.",
      "typed": "London"
    },
    {
      "key": "s1-q7",
      "level": "medium",
      "q": "Which country looks like a BOOT on the map?",
      "options": [
        "Italy",
        "India",
        "Japan",
        "Egypt"
      ],
      "answer": "Italy",
      "point": "Italy is the boot kicking Sicily.",
      "hint": "It is in Europe.",
      "map": {
        "kind": "world",
        "place": "Italy",
        "where": "Europe",
        "note": "In southern Europe — the boot shape, kicking the island of Sicily."
      },
      "typed": "Italy"
    },
    {
      "key": "s1-q8",
      "level": "easy",
      "q": "India looks like which shape on the map?",
      "options": [
        "A triangle pointing down",
        "A circle",
        "A square",
        "A boot"
      ],
      "answer": "A triangle pointing down",
      "point": "India is the triangle pointing down into the Indian Ocean.",
      "hint": "Look at the bottom of India.",
      "map": {
        "kind": "world",
        "place": "India",
        "where": "South Asia",
        "note": "In South Asia — the triangle pointing down into the Indian Ocean."
      },
      "typed": "A triangle pointing down",
      "accept": [
        "triangle",
        "triangle pointing down"
      ]
    },
    {
      "key": "s1-q9",
      "level": "medium",
      "q": "Latitude lines run in which direction?",
      "options": [
        "East–west",
        "North–south",
        "Up–down",
        "Round in circles"
      ],
      "answer": "East–west",
      "point": "Latitude lines run east–west; longitude lines run north–south.",
      "hint": "The Equator is a latitude line. Which way does it run?",
      "typed": "East–west",
      "accept": [
        "east-west"
      ]
    },
    {
      "key": "s1-q10",
      "level": "hard",
      "q": "When you open a new map, what should you look at FIRST?",
      "options": [
        "Its title and key (legend)",
        "The smallest country",
        "The colours only",
        "The bottom corner"
      ],
      "answer": "Its title and key (legend)",
      "point": "First look at the title and the key/legend — what colours and symbols mean.",
      "typed": "Its title and key (legend)",
      "accept": [
        "title and key",
        "the title and key"
      ]
    },
    {
      "key": "s1-g1",
      "level": "easy",
      "q": "On most maps, which direction is DOWN?",
      "options": [
        "South",
        "East",
        "North",
        "West"
      ],
      "answer": "South",
      "point": "South is down on most maps.",
      "typed": "South"
    },
    {
      "key": "s1-g2",
      "level": "easy",
      "q": "On most maps, which direction is to the RIGHT?",
      "options": [
        "West",
        "South",
        "East",
        "North"
      ],
      "answer": "East",
      "point": "East is right on most maps.",
      "typed": "East"
    },
    {
      "key": "s1-g3",
      "level": "easy",
      "q": "On most maps, which direction is to the LEFT?",
      "options": [
        "West",
        "East",
        "North",
        "South"
      ],
      "answer": "West",
      "point": "West is left on most maps.",
      "typed": "West"
    },
    {
      "key": "s1-g4",
      "level": "medium",
      "q": "Longitude lines run in which direction?",
      "options": [
        "North–south",
        "Round in circles",
        "Up–down",
        "East–west"
      ],
      "answer": "North–south",
      "point": "Latitude lines run east–west; longitude lines run north–south.",
      "typed": "North–south",
      "accept": [
        "north-south"
      ]
    },
    {
      "key": "s1-g5",
      "level": "medium",
      "q": "What does the key (legend) of a map tell you?",
      "options": [
        "The time of day",
        "What colours and symbols mean",
        "The population",
        "The rainfall"
      ],
      "answer": "What colours and symbols mean",
      "point": "First look at the title and the key / legend — what colours and symbols mean.",
      "typed": "What colours and symbols mean"
    },
    {
      "key": "s1-g6",
      "level": "medium",
      "q": "Which line is 0 degrees and runs through London?",
      "options": [
        "Equator",
        "Tropic of Cancer",
        "International Date Line",
        "Prime Meridian"
      ],
      "answer": "Prime Meridian",
      "point": "The Prime Meridian is the starting line (0 degrees) running through London, England.",
      "typed": "Prime Meridian"
    },
    {
      "key": "s1-g7",
      "level": "medium",
      "q": "India is NORTH of which line?",
      "options": [
        "Equator",
        "Tropic of Cancer",
        "Arctic Circle",
        "Prime Meridian"
      ],
      "answer": "Equator",
      "point": "The Equator is the middle line (0 degrees). India is north of it.",
      "typed": "Equator"
    }
  ],
  "2": [
    {
      "key": "s2-q1",
      "level": "easy",
      "q": "Which is the LARGEST continent?",
      "options": [
        "Asia",
        "Africa",
        "Europe",
        "Australia"
      ],
      "answer": "Asia",
      "point": "Asia is the largest continent. India is in South Asia.",
      "hint": "India and China are in it.",
      "typed": "Asia"
    },
    {
      "key": "s2-q2",
      "level": "easy",
      "q": "Which is the SMALLEST continent?",
      "options": [
        "Australia",
        "Europe",
        "Africa",
        "Antarctica"
      ],
      "answer": "Australia",
      "point": "Australia is the smallest continent; it is also a country.",
      "hint": "It is also the name of a country.",
      "typed": "Australia"
    },
    {
      "key": "s2-q3",
      "level": "easy",
      "q": "Which is the LARGEST ocean?",
      "options": [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean"
      ],
      "answer": "Pacific Ocean",
      "point": "Oceans, largest to smallest: Pacific, Atlantic, Indian, Southern, Arctic.",
      "hint": "It is on the east side of Asia.",
      "typed": "Pacific Ocean"
    },
    {
      "key": "s2-q4",
      "level": "easy",
      "q": "Which continent is the coldest, at the South Pole?",
      "options": [
        "Antarctica",
        "Asia",
        "Europe",
        "North America"
      ],
      "answer": "Antarctica",
      "point": "Antarctica is the coldest, at the South Pole.",
      "hint": "It is at the very bottom of the map.",
      "typed": "Antarctica"
    },
    {
      "key": "s2-q5",
      "level": "easy",
      "q": "The Sahara desert — the largest HOT desert — is in which continent?",
      "options": [
        "Africa",
        "Asia",
        "Australia",
        "South America"
      ],
      "answer": "Africa",
      "point": "The Sahara desert is in North Africa.",
      "hint": "Egypt is in the same continent.",
      "map": {
        "kind": "world",
        "place": "Sahara Desert",
        "where": "North Africa",
        "note": "In NORTH Africa — the big desert above the middle of Africa."
      },
      "typed": "Africa"
    },
    {
      "key": "s2-q6",
      "level": "medium",
      "q": "The Amazon river and rainforest are in which continent?",
      "options": [
        "South America",
        "Africa",
        "Asia",
        "North America"
      ],
      "answer": "South America",
      "point": "The Amazon river and rainforest are in South America.",
      "hint": "Brazil is in this continent.",
      "typed": "South America"
    },
    {
      "key": "s2-q7",
      "level": "medium",
      "q": "Which ocean is to the SOUTH of India?",
      "options": [
        "Indian Ocean",
        "Pacific Ocean",
        "Atlantic Ocean",
        "Arctic Ocean"
      ],
      "answer": "Indian Ocean",
      "point": "India touches the Indian Ocean on the south.",
      "hint": "It has the same name as our country.",
      "map": {
        "kind": "world",
        "place": "Indian Ocean",
        "where": "South of India",
        "note": "Below India — the ocean between Africa, Asia and Australia."
      },
      "typed": "Indian Ocean"
    },
    {
      "key": "s2-q8",
      "level": "easy",
      "q": "Which continent has the USA, Canada and Mexico?",
      "options": [
        "North America",
        "South America",
        "Europe",
        "Asia"
      ],
      "answer": "North America",
      "point": "North America has the USA, Canada and Mexico.",
      "hint": "It is above South America.",
      "typed": "North America"
    },
    {
      "key": "s2-q9",
      "level": "hard",
      "q": "Name the oceans from largest to smallest. Which ocean is THIRD?",
      "options": [
        "Indian Ocean",
        "Atlantic Ocean",
        "Southern Ocean",
        "Arctic Ocean"
      ],
      "answer": "Indian Ocean",
      "point": "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th).",
      "typed": "Indian Ocean"
    },
    {
      "key": "s2-q10",
      "level": "hard",
      "q": "Russia is partly in which TWO continents?",
      "options": [
        "Europe and Asia",
        "Asia and Africa",
        "Europe and Africa",
        "Asia and Australia"
      ],
      "answer": "Europe and Asia",
      "point": "Russia is partly in Europe and partly in Asia.",
      "hint": "One part is west, one part is east.",
      "map": {
        "kind": "world",
        "place": "Russia",
        "where": "Europe and Asia",
        "note": "The biggest country — across the north of Europe AND Asia."
      },
      "typed": "Europe and Asia",
      "accept": [
        "europe asia"
      ]
    },
    {
      "key": "s2-g1",
      "level": "medium",
      "q": "Which is the largest country in Africa?",
      "options": [
        "Ethiopia",
        "Ghana",
        "Morocco",
        "Algeria"
      ],
      "answer": "Algeria",
      "point": "Africa — largest country: Algeria. The Sahara desert is here.",
      "typed": "Algeria",
      "map": {
        "kind": "world",
        "place": "Algeria",
        "where": "Africa",
        "note": "In North Africa — the largest country in Africa."
      }
    },
    {
      "key": "s2-g2",
      "level": "medium",
      "q": "Which is the largest country in North America?",
      "options": [
        "Argentina",
        "Mexico",
        "USA",
        "Canada"
      ],
      "answer": "Canada",
      "point": "North America — largest country: Canada. USA, Canada, Mexico.",
      "typed": "Canada",
      "map": {
        "kind": "world",
        "place": "Canada",
        "where": "North America",
        "note": "North of the USA — the second-largest country in the world."
      }
    },
    {
      "key": "s2-g3",
      "level": "medium",
      "q": "Which is the largest country in South America?",
      "options": [
        "Colombia",
        "Peru",
        "Chile",
        "Brazil"
      ],
      "answer": "Brazil",
      "point": "South America — largest country: Brazil. The Amazon river is here.",
      "typed": "Brazil",
      "map": {
        "kind": "world",
        "place": "Brazil",
        "where": "South America",
        "note": "The biggest country in South America."
      }
    },
    {
      "key": "s2-g4",
      "level": "medium",
      "q": "Which is the largest country in Europe?",
      "options": [
        "Spain",
        "Italy",
        "Germany",
        "Russia"
      ],
      "answer": "Russia",
      "point": "Europe — largest country: Russia. Russia is partly in Europe and partly in Asia.",
      "typed": "Russia",
      "map": {
        "kind": "world",
        "place": "Russia",
        "where": "Europe and Asia",
        "note": "The biggest country — across the north of Europe and Asia."
      }
    },
    {
      "key": "s2-g5",
      "level": "easy",
      "q": "Which is the largest country in Australia (Oceania)?",
      "options": [
        "Indonesia",
        "Papua New Guinea",
        "New Zealand",
        "Australia"
      ],
      "answer": "Australia",
      "point": "Australia (Oceania) — smallest continent; also a country. Largest country in it: Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Australia",
        "where": "Oceania",
        "note": "The island continent, south-east of Asia."
      }
    },
    {
      "key": "s2-g6",
      "level": "medium",
      "q": "Which is the SECOND largest ocean?",
      "options": [
        "Indian Ocean",
        "Pacific Ocean",
        "Atlantic Ocean",
        "Arctic Ocean"
      ],
      "answer": "Atlantic Ocean",
      "point": "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th).",
      "typed": "Atlantic Ocean"
    },
    {
      "key": "s2-g7",
      "level": "medium",
      "q": "Which is the FOURTH largest ocean?",
      "options": [
        "Indian Ocean",
        "Atlantic Ocean",
        "Arctic Ocean",
        "Southern Ocean"
      ],
      "answer": "Southern Ocean",
      "point": "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th).",
      "typed": "Southern Ocean"
    },
    {
      "key": "s2-g8",
      "level": "easy",
      "q": "Which is the SMALLEST ocean?",
      "options": [
        "Atlantic Ocean",
        "Southern Ocean",
        "Arctic Ocean",
        "Indian Ocean"
      ],
      "answer": "Arctic Ocean",
      "point": "Oceans, largest to smallest: Pacific (1st), Atlantic (2nd), Indian (3rd), Southern (4th), Arctic (5th).",
      "typed": "Arctic Ocean"
    },
    {
      "key": "s2-g9",
      "level": "medium",
      "q": "Which sea is between Europe and Africa?",
      "options": [
        "Red Sea",
        "Caspian Sea",
        "Arabian Sea",
        "Mediterranean Sea"
      ],
      "answer": "Mediterranean Sea",
      "point": "Mediterranean Sea — between Europe and Africa.",
      "typed": "Mediterranean Sea",
      "map": {
        "kind": "world",
        "place": "Mediterranean Sea",
        "where": "Between Europe and Africa",
        "note": "Between Europe (north) and Africa (south)."
      }
    },
    {
      "key": "s2-g10",
      "level": "hard",
      "q": "Which is the world's largest lake / sea, between Europe and Asia?",
      "options": [
        "Caspian Sea",
        "Red Sea",
        "Black Sea",
        "Mediterranean Sea"
      ],
      "answer": "Caspian Sea",
      "point": "Caspian Sea — the world's largest lake / sea, between Europe and Asia.",
      "typed": "Caspian Sea",
      "map": {
        "kind": "world",
        "place": "Caspian Sea",
        "where": "Between Europe and Asia",
        "note": "Between Europe and Asia, north of Iran."
      }
    },
    {
      "key": "s2-g11",
      "level": "medium",
      "q": "Which ocean is between Africa, Asia and Australia?",
      "options": [
        "Atlantic Ocean",
        "Southern Ocean",
        "Pacific Ocean",
        "Indian Ocean"
      ],
      "answer": "Indian Ocean",
      "point": "The Indian Ocean is between Africa, Asia and Australia. India touches it on the south.",
      "typed": "Indian Ocean",
      "map": {
        "kind": "world",
        "place": "Indian Ocean",
        "where": "South of India",
        "note": "Below India — the ocean between Africa, Asia and Australia."
      }
    },
    {
      "key": "s2-g12",
      "level": "medium",
      "q": "Which continent has NO permanent country?",
      "options": [
        "Africa",
        "Australia",
        "Europe",
        "Antarctica"
      ],
      "answer": "Antarctica",
      "point": "Antarctica — coldest, at the South Pole. No permanent country.",
      "typed": "Antarctica"
    },
    {
      "key": "s2-g13",
      "level": "easy",
      "q": "Which continent is India in?",
      "options": [
        "North America",
        "Europe",
        "Africa",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Asia is the largest continent. India is in South Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "India",
        "where": "South Asia",
        "note": "In South Asia — the triangle pointing down into the Indian Ocean."
      }
    }
  ],
  "3": [
    {
      "key": "s3-q1",
      "level": "easy",
      "q": "India is in which part of Asia?",
      "options": [
        "South Asia",
        "East Asia",
        "West Asia",
        "North Asia"
      ],
      "answer": "South Asia",
      "point": "India is in South Asia.",
      "typed": "South Asia"
    },
    {
      "key": "s3-q2",
      "level": "easy",
      "q": "Sri Lanka is a small island in which place?",
      "options": [
        "Just below India",
        "East of Japan",
        "North of China",
        "West of Arabia"
      ],
      "answer": "Just below India",
      "point": "Sri Lanka is a small teardrop island just below India.",
      "hint": "Look under the triangle of India.",
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "South Asia",
        "note": "A small teardrop island just BELOW India, in the Indian Ocean."
      },
      "typed": "Just below India"
    },
    {
      "key": "s3-q3",
      "level": "easy",
      "q": "Japan is a chain of islands to the EAST of which country?",
      "options": [
        "China",
        "India",
        "Saudi Arabia",
        "Indonesia"
      ],
      "answer": "China",
      "point": "Japan is a chain of islands east of China.",
      "hint": "It is the country of Tokyo.",
      "map": {
        "kind": "world",
        "place": "Japan",
        "where": "East Asia",
        "note": "Islands to the EAST of China, in the Pacific Ocean."
      },
      "typed": "China"
    },
    {
      "key": "s3-q4",
      "level": "medium",
      "q": "Which country is the largest in Asia?",
      "options": [
        "China",
        "India",
        "Japan",
        "Saudi Arabia"
      ],
      "answer": "China",
      "point": "China is the largest country in Asia.",
      "typed": "China"
    },
    {
      "key": "s3-q5",
      "level": "medium",
      "q": "Saudi Arabia is on which peninsula?",
      "options": [
        "Arabian Peninsula",
        "Indian Peninsula",
        "Korean Peninsula",
        "Malay Peninsula"
      ],
      "answer": "Arabian Peninsula",
      "point": "Saudi Arabia is the big country on the Arabian Peninsula.",
      "hint": "Makkah and Madinah are in this country.",
      "map": {
        "kind": "world",
        "place": "Saudi Arabia",
        "where": "Middle East (West Asia)",
        "note": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf."
      },
      "typed": "Arabian Peninsula"
    },
    {
      "key": "s3-q6",
      "level": "medium",
      "q": "Which of these countries is in the Middle East (West Asia)?",
      "options": [
        "Iraq",
        "Japan",
        "Thailand",
        "Mongolia"
      ],
      "answer": "Iraq",
      "point": "Iraq is in the Middle East (West Asia). Its capital is Baghdad.",
      "typed": "Iraq"
    },
    {
      "key": "s3-q7",
      "level": "medium",
      "q": "Which of these is NOT in South Asia?",
      "options": [
        "Japan",
        "Nepal",
        "Bhutan",
        "Bangladesh"
      ],
      "answer": "Japan",
      "point": "South Asia is India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Myanmar, Maldives and Afghanistan. Japan is in East Asia.",
      "typed": "Japan"
    },
    {
      "key": "s3-q8",
      "level": "medium",
      "q": "Indonesia is many islands to the south-east of which continent?",
      "options": [
        "Asia",
        "Africa",
        "Australia",
        "Europe"
      ],
      "answer": "Asia",
      "point": "Indonesia is many islands south-east of Asia.",
      "hint": "Its capital is Jakarta.",
      "map": {
        "kind": "world",
        "place": "Indonesia",
        "where": "South-East Asia",
        "note": "Many islands SOUTH-EAST of Asia, above Australia."
      },
      "typed": "Asia"
    },
    {
      "key": "s3-q9",
      "level": "hard",
      "q": "Which country is north of India, across the Himalayas?",
      "options": [
        "China",
        "Pakistan",
        "Myanmar",
        "Thailand"
      ],
      "answer": "China",
      "point": "China is north-east of India, across the Himalayas.",
      "hint": "Its capital is Beijing.",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "East Asia",
        "note": "The big country NORTH-EAST of India, across the Himalayas."
      },
      "typed": "China"
    },
    {
      "key": "s3-q10",
      "level": "hard",
      "q": "Which sea is between Africa and Saudi Arabia?",
      "options": [
        "Red Sea",
        "Arabian Sea",
        "Bay of Bengal",
        "Mediterranean Sea"
      ],
      "answer": "Red Sea",
      "point": "The Red Sea is between Africa and Saudi Arabia.",
      "hint": "Its name is a colour.",
      "map": {
        "kind": "world",
        "place": "Red Sea",
        "where": "Between Africa and Arabia",
        "note": "Between Africa (Egypt, Sudan) and Arabia (Saudi Arabia)."
      },
      "typed": "Red Sea"
    },
    {
      "key": "s3-g-pakistan",
      "level": "easy",
      "q": "Which part of Asia is Pakistan in?",
      "options": [
        "Middle East (West Asia)",
        "South Asia",
        "East & South-East Asia",
        "Europe"
      ],
      "answer": "South Asia",
      "point": "Pakistan is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Pakistan",
        "where": "South Asia",
        "note": "In South Asia, west of India."
      }
    },
    {
      "key": "s3-g-bangladesh",
      "level": "easy",
      "q": "Which part of Asia is Bangladesh in?",
      "options": [
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia",
        "North America"
      ],
      "answer": "South Asia",
      "point": "Bangladesh is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Bangladesh",
        "where": "South Asia",
        "note": "In South Asia, east of India."
      }
    },
    {
      "key": "s3-g-nepal",
      "level": "easy",
      "q": "Which part of Asia is Nepal in?",
      "options": [
        "Africa",
        "Middle East (West Asia)",
        "East & South-East Asia",
        "South Asia"
      ],
      "answer": "South Asia",
      "point": "Nepal is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Nepal",
        "where": "South Asia",
        "note": "North of India, in the Himalayas — Mount Everest is here."
      }
    },
    {
      "key": "s3-g-bhutan",
      "level": "easy",
      "q": "Which part of Asia is Bhutan in?",
      "options": [
        "Europe",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "South Asia",
      "point": "Bhutan is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Bhutan",
        "where": "South Asia",
        "note": "In South Asia, in the Himalayas, east of Nepal."
      }
    },
    {
      "key": "s3-g-sri-lanka",
      "level": "easy",
      "q": "Which part of Asia is Sri Lanka in?",
      "options": [
        "Middle East (West Asia)",
        "South Asia",
        "North America",
        "East & South-East Asia"
      ],
      "answer": "South Asia",
      "point": "Sri Lanka is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "South Asia",
        "note": "A small teardrop island just below India, in the Indian Ocean."
      }
    },
    {
      "key": "s3-g-myanmar",
      "level": "easy",
      "q": "Which part of Asia is Myanmar in?",
      "options": [
        "Africa",
        "Middle East (West Asia)",
        "South Asia",
        "East & South-East Asia"
      ],
      "answer": "South Asia",
      "point": "Myanmar is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Myanmar",
        "where": "South Asia",
        "note": "In South-East Asia, east of India and Bangladesh."
      }
    },
    {
      "key": "s3-g-maldives",
      "level": "hard",
      "q": "Which part of Asia is Maldives in?",
      "options": [
        "Middle East (West Asia)",
        "South Asia",
        "Europe",
        "East & South-East Asia"
      ],
      "answer": "South Asia",
      "point": "Maldives is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Maldives",
        "where": "South Asia",
        "note": "Small islands in the Indian Ocean, south-west of India."
      }
    },
    {
      "key": "s3-g-afghanistan",
      "level": "medium",
      "q": "Which part of Asia is Afghanistan in?",
      "options": [
        "South Asia",
        "East & South-East Asia",
        "North America",
        "Middle East (West Asia)"
      ],
      "answer": "South Asia",
      "point": "Afghanistan is in South Asia.",
      "typed": "South Asia",
      "map": {
        "kind": "world",
        "place": "Afghanistan",
        "where": "South Asia",
        "note": "In South Asia, north-west of Pakistan."
      }
    },
    {
      "key": "s3-g-saudi-arabia",
      "level": "easy",
      "q": "Which part of Asia is Saudi Arabia in?",
      "options": [
        "Africa",
        "South Asia",
        "East & South-East Asia",
        "Middle East (West Asia)"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Saudi Arabia is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Saudi Arabia",
        "where": "Middle East (West Asia)",
        "note": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf."
      }
    },
    {
      "key": "s3-g-uae",
      "level": "medium",
      "q": "Which part of Asia is UAE in?",
      "options": [
        "South Asia",
        "Europe",
        "East & South-East Asia",
        "Middle East (West Asia)"
      ],
      "answer": "Middle East (West Asia)",
      "point": "UAE is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "UAE",
        "where": "Middle East (West Asia)",
        "note": "On the Arabian Peninsula, next to Saudi Arabia and Oman."
      }
    },
    {
      "key": "s3-g-qatar",
      "level": "medium",
      "q": "Which part of Asia is Qatar in?",
      "options": [
        "North America",
        "East & South-East Asia",
        "South Asia",
        "Middle East (West Asia)"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Qatar is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Qatar",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-kuwait",
      "level": "medium",
      "q": "Which part of Asia is Kuwait in?",
      "options": [
        "Africa",
        "South Asia",
        "Middle East (West Asia)",
        "East & South-East Asia"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Kuwait is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Kuwait",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-oman",
      "level": "medium",
      "q": "Which part of Asia is Oman in?",
      "options": [
        "East & South-East Asia",
        "Europe",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Oman is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Oman",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-yemen",
      "level": "hard",
      "q": "Which part of Asia is Yemen in?",
      "options": [
        "South Asia",
        "Middle East (West Asia)",
        "East & South-East Asia",
        "North America"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Yemen is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Yemen",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-jordan",
      "level": "medium",
      "q": "Which part of Asia is Jordan in?",
      "options": [
        "East & South-East Asia",
        "South Asia",
        "Middle East (West Asia)",
        "Africa"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Jordan is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Jordan",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-lebanon",
      "level": "hard",
      "q": "Which part of Asia is Lebanon in?",
      "options": [
        "Middle East (West Asia)",
        "East & South-East Asia",
        "Europe",
        "South Asia"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Lebanon is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Lebanon",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-syria",
      "level": "medium",
      "q": "Which part of Asia is Syria in?",
      "options": [
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia",
        "North America"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Syria is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Syria",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-iran",
      "level": "medium",
      "q": "Which part of Asia is Iran in?",
      "options": [
        "Middle East (West Asia)",
        "Europe",
        "East & South-East Asia",
        "South Asia"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Iran is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Iran",
        "where": "Middle East (West Asia)",
        "note": "In the Middle East, east of Iraq."
      }
    },
    {
      "key": "s3-g-turkey",
      "level": "medium",
      "q": "Which part of Asia is Turkey in?",
      "options": [
        "North America",
        "East & South-East Asia",
        "South Asia",
        "Middle East (West Asia)"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Turkey is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Turkey",
        "where": "Middle East (West Asia)",
        "note": "Between Europe and Asia, north of Syria and Iraq."
      }
    },
    {
      "key": "s3-g-israel",
      "level": "hard",
      "q": "Which part of Asia is Israel in?",
      "options": [
        "South Asia",
        "Middle East (West Asia)",
        "East & South-East Asia",
        "Africa"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Israel is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Israel",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-palestine",
      "level": "hard",
      "q": "Which part of Asia is Palestine in?",
      "options": [
        "Middle East (West Asia)",
        "South Asia",
        "East & South-East Asia",
        "Europe"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Palestine is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Palestine",
        "where": "Middle East (West Asia)",
        "note": "In Middle East (West Asia)."
      }
    },
    {
      "key": "s3-g-china",
      "level": "easy",
      "q": "Which part of Asia is China in?",
      "options": [
        "South Asia",
        "East & South-East Asia",
        "North America",
        "Middle East (West Asia)"
      ],
      "answer": "East & South-East Asia",
      "point": "China is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "East & South-East Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s3-g-japan",
      "level": "easy",
      "q": "Which part of Asia is Japan in?",
      "options": [
        "Africa",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Japan is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Japan",
        "where": "East & South-East Asia",
        "note": "Islands to the east of China, in the Pacific Ocean."
      }
    },
    {
      "key": "s3-g-south-korea",
      "level": "medium",
      "q": "Which part of Asia is South Korea in?",
      "options": [
        "Middle East (West Asia)",
        "Europe",
        "South Asia",
        "East & South-East Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "South Korea is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "East & South-East Asia",
        "note": "In East & South-East Asia."
      }
    },
    {
      "key": "s3-g-north-korea",
      "level": "hard",
      "q": "Which part of Asia is North Korea in?",
      "options": [
        "East & South-East Asia",
        "North America",
        "South Asia",
        "Middle East (West Asia)"
      ],
      "answer": "East & South-East Asia",
      "point": "North Korea is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "North Korea",
        "where": "East & South-East Asia",
        "note": "In East & South-East Asia."
      }
    },
    {
      "key": "s3-g-mongolia",
      "level": "hard",
      "q": "Which part of Asia is Mongolia in?",
      "options": [
        "Middle East (West Asia)",
        "Africa",
        "South Asia",
        "East & South-East Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Mongolia is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Mongolia",
        "where": "East & South-East Asia",
        "note": "In East & South-East Asia."
      }
    },
    {
      "key": "s3-g-thailand",
      "level": "medium",
      "q": "Which part of Asia is Thailand in?",
      "options": [
        "Europe",
        "Middle East (West Asia)",
        "South Asia",
        "East & South-East Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Thailand is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Thailand",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, east of Myanmar."
      }
    },
    {
      "key": "s3-g-vietnam",
      "level": "medium",
      "q": "Which part of Asia is Vietnam in?",
      "options": [
        "East & South-East Asia",
        "South Asia",
        "North America",
        "Middle East (West Asia)"
      ],
      "answer": "East & South-East Asia",
      "point": "Vietnam is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "East & South-East Asia",
        "note": "In East & South-East Asia."
      }
    },
    {
      "key": "s3-g-malaysia",
      "level": "medium",
      "q": "Which part of Asia is Malaysia in?",
      "options": [
        "East & South-East Asia",
        "South Asia",
        "Africa",
        "Middle East (West Asia)"
      ],
      "answer": "East & South-East Asia",
      "point": "Malaysia is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Malaysia",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, south of Thailand."
      }
    },
    {
      "key": "s3-g-singapore",
      "level": "medium",
      "q": "Which part of Asia is Singapore in?",
      "options": [
        "Europe",
        "Middle East (West Asia)",
        "East & South-East Asia",
        "South Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Singapore is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Singapore",
        "where": "East & South-East Asia",
        "note": "In East & South-East Asia."
      }
    },
    {
      "key": "s3-g-indonesia",
      "level": "medium",
      "q": "Which part of Asia is Indonesia in?",
      "options": [
        "North America",
        "South Asia",
        "Middle East (West Asia)",
        "East & South-East Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Indonesia is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Indonesia",
        "where": "East & South-East Asia",
        "note": "Many islands south-east of Asia, above Australia."
      }
    },
    {
      "key": "s3-g-philippines",
      "level": "medium",
      "q": "Which part of Asia is Philippines in?",
      "options": [
        "Africa",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Philippines is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Philippines",
        "where": "East & South-East Asia",
        "note": "In East & South-East Asia."
      }
    },
    {
      "key": "s3-g-in-south-asia",
      "level": "medium",
      "q": "Which of these countries is in South Asia?",
      "options": [
        "India",
        "UAE",
        "Japan",
        "China"
      ],
      "answer": "India",
      "point": "India is in South Asia.",
      "typed": "India"
    },
    {
      "key": "s3-g-in-middle-east-west-asia-",
      "level": "medium",
      "q": "Which of these countries is in Middle East (West Asia)?",
      "options": [
        "India",
        "Japan",
        "Pakistan",
        "Saudi Arabia"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia is in Middle East (West Asia).",
      "typed": "Saudi Arabia"
    },
    {
      "key": "s3-g-in-east-south-east-asia",
      "level": "medium",
      "q": "Which of these countries is in East & South-East Asia?",
      "options": [
        "Pakistan",
        "Saudi Arabia",
        "India",
        "China"
      ],
      "answer": "China",
      "point": "China is in East & South-East Asia.",
      "typed": "China"
    },
    {
      "key": "s3-g-not-middle-east-west-asia-",
      "level": "medium",
      "q": "Which of these countries is NOT in Middle East (West Asia)?",
      "options": [
        "India",
        "Saudi Arabia",
        "Syria",
        "Kuwait"
      ],
      "answer": "India",
      "point": "India is not in Middle East (West Asia).",
      "typed": "India"
    },
    {
      "key": "s3-g-not-east-south-east-asia",
      "level": "medium",
      "q": "Which of these countries is NOT in East & South-East Asia?",
      "options": [
        "Thailand",
        "Indonesia",
        "Saudi Arabia",
        "Philippines"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia is not in East & South-East Asia.",
      "typed": "Saudi Arabia"
    }
  ],
  "4": [
    {
      "key": "s4-q1",
      "level": "easy",
      "q": "What is the capital of the United Kingdom?",
      "options": [
        "London",
        "Paris",
        "Berlin",
        "Rome"
      ],
      "answer": "London",
      "point": "United Kingdom — London.",
      "hint": "It is in Europe.",
      "map": {
        "kind": "world",
        "place": "United Kingdom",
        "where": "Europe",
        "note": "Islands north-west of Europe — England, Scotland and Wales."
      },
      "typed": "London"
    },
    {
      "key": "s4-q2",
      "level": "easy",
      "q": "What is the capital of France?",
      "options": [
        "Paris",
        "Madrid",
        "Lisbon",
        "Athens"
      ],
      "answer": "Paris",
      "point": "France — Paris.",
      "hint": "It is in Europe.",
      "map": {
        "kind": "world",
        "place": "France",
        "where": "Europe",
        "note": "In western Europe, next to the United Kingdom and Germany."
      },
      "typed": "Paris"
    },
    {
      "key": "s4-q3",
      "level": "easy",
      "q": "What is the capital of Japan?",
      "options": [
        "Tokyo",
        "Beijing",
        "Seoul",
        "Bangkok"
      ],
      "answer": "Tokyo",
      "point": "Japan — Tokyo.",
      "hint": "It is in East Asia.",
      "map": {
        "kind": "world",
        "place": "Japan",
        "where": "East Asia",
        "note": "Islands to the east of China."
      },
      "typed": "Tokyo"
    },
    {
      "key": "s4-q4",
      "level": "medium",
      "q": "What is the capital of Egypt?",
      "options": [
        "Cairo",
        "Baghdad",
        "Tehran",
        "Ankara"
      ],
      "answer": "Cairo",
      "point": "Egypt — Cairo. Cairo is on the river Nile.",
      "hint": "It is in Africa, on the Nile.",
      "map": {
        "kind": "world",
        "place": "Egypt",
        "where": "Africa",
        "note": "In NORTH-EAST Africa, on the river Nile."
      },
      "typed": "Cairo"
    },
    {
      "key": "s4-q5",
      "level": "medium",
      "q": "What is the capital of Brazil?",
      "options": [
        "Brasilia",
        "Buenos Aires",
        "Lima",
        "Santiago"
      ],
      "answer": "Brasilia",
      "point": "Brazil — Brasilia.",
      "hint": "It is in South America.",
      "map": {
        "kind": "world",
        "place": "Brazil",
        "where": "South America",
        "note": "The biggest country in South America."
      },
      "typed": "Brasilia"
    },
    {
      "key": "s4-q6",
      "level": "medium",
      "q": "What is the capital of Australia?",
      "options": [
        "Canberra",
        "Sydney",
        "Wellington",
        "Ottawa"
      ],
      "answer": "Canberra",
      "point": "Australia — Canberra. (Sydney is a big city, but it is NOT the capital.)",
      "hint": "It is NOT Sydney.",
      "map": {
        "kind": "world",
        "place": "Australia",
        "where": "Oceania",
        "note": "The island continent, south-east of Asia."
      },
      "typed": "Canberra"
    },
    {
      "key": "s4-q7",
      "level": "medium",
      "q": "What is the capital of the UAE?",
      "options": [
        "Abu Dhabi",
        "Dubai",
        "Doha",
        "Riyadh"
      ],
      "answer": "Abu Dhabi",
      "point": "UAE — Abu Dhabi. (Dubai is a big city, but it is NOT the capital.)",
      "hint": "It is NOT Dubai.",
      "map": {
        "kind": "world",
        "place": "UAE",
        "where": "Middle East (West Asia)",
        "note": "On the Arabian Peninsula, next to Saudi Arabia and Oman."
      },
      "typed": "Abu Dhabi"
    },
    {
      "key": "s4-q8",
      "level": "hard",
      "q": "What is the capital of Canada?",
      "options": [
        "Ottawa",
        "Toronto",
        "Washington, D.C.",
        "Mexico City"
      ],
      "answer": "Ottawa",
      "point": "Canada — Ottawa. (Toronto is a big city, but it is NOT the capital.)",
      "map": {
        "kind": "world",
        "place": "Canada",
        "where": "North America",
        "note": "North of the USA — the second-largest country in the world."
      },
      "typed": "Ottawa"
    },
    {
      "key": "s4-q9",
      "level": "hard",
      "q": "What is the capital of Turkey?",
      "options": [
        "Ankara",
        "Istanbul",
        "Baghdad",
        "Tehran"
      ],
      "answer": "Ankara",
      "point": "Turkey — Ankara. (Istanbul is a big city, but it is NOT the capital.)",
      "map": {
        "kind": "world",
        "place": "Turkey",
        "where": "West Asia / Europe",
        "note": "Between Europe and Asia, north of Syria and Iraq."
      },
      "typed": "Ankara"
    },
    {
      "key": "s4-q10",
      "level": "hard",
      "q": "What is the capital of Nepal?",
      "options": [
        "Kathmandu",
        "Thimphu",
        "Dhaka",
        "Colombo"
      ],
      "answer": "Kathmandu",
      "point": "Nepal — Kathmandu.",
      "hint": "It is north of India, in the Himalayas.",
      "map": {
        "kind": "world",
        "place": "Nepal",
        "where": "South Asia",
        "note": "North of India, in the Himalayas — Mount Everest is here."
      },
      "typed": "Kathmandu"
    },
    {
      "key": "s4-g2",
      "level": "medium",
      "q": "London is the capital of which country?",
      "options": [
        "Italy",
        "United Kingdom",
        "Norway",
        "Spain"
      ],
      "answer": "United Kingdom",
      "point": "United Kingdom — London.",
      "typed": "United Kingdom",
      "accept": [
        "uk",
        "britain"
      ],
      "map": {
        "kind": "world",
        "place": "United Kingdom",
        "where": "Europe",
        "note": "Islands north-west of Europe — England, Scotland and Wales."
      }
    },
    {
      "key": "s4-g4",
      "level": "medium",
      "q": "Paris is the capital of which country?",
      "options": [
        "Italy",
        "Sweden",
        "Portugal",
        "France"
      ],
      "answer": "France",
      "point": "France — Paris.",
      "typed": "France",
      "map": {
        "kind": "world",
        "place": "France",
        "where": "Europe",
        "note": "In western Europe, next to the United Kingdom and Germany."
      }
    },
    {
      "key": "s4-g5",
      "level": "medium",
      "q": "What is the capital of Germany?",
      "options": [
        "Lisbon",
        "Stockholm",
        "Berlin",
        "Athens"
      ],
      "answer": "Berlin",
      "point": "Germany — Berlin.",
      "typed": "Berlin",
      "map": {
        "kind": "world",
        "place": "Germany",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g6",
      "level": "hard",
      "q": "Berlin is the capital of which country?",
      "options": [
        "Norway",
        "Germany",
        "Portugal",
        "Spain"
      ],
      "answer": "Germany",
      "point": "Germany — Berlin.",
      "typed": "Germany",
      "map": {
        "kind": "world",
        "place": "Germany",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g7",
      "level": "medium",
      "q": "What is the capital of Italy?",
      "options": [
        "Lisbon",
        "Paris",
        "London",
        "Rome"
      ],
      "answer": "Rome",
      "point": "Italy — Rome.",
      "typed": "Rome",
      "map": {
        "kind": "world",
        "place": "Italy",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g8",
      "level": "hard",
      "q": "Rome is the capital of which country?",
      "options": [
        "Italy",
        "Norway",
        "Sweden",
        "Portugal"
      ],
      "answer": "Italy",
      "point": "Italy — Rome.",
      "typed": "Italy",
      "map": {
        "kind": "world",
        "place": "Italy",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g9",
      "level": "medium",
      "q": "What is the capital of Spain?",
      "options": [
        "Kyiv",
        "London",
        "Stockholm",
        "Madrid"
      ],
      "answer": "Madrid",
      "point": "Spain — Madrid.",
      "typed": "Madrid",
      "map": {
        "kind": "world",
        "place": "Spain",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g10",
      "level": "hard",
      "q": "Madrid is the capital of which country?",
      "options": [
        "United Kingdom",
        "Ukraine",
        "France",
        "Spain"
      ],
      "answer": "Spain",
      "point": "Spain — Madrid.",
      "typed": "Spain",
      "map": {
        "kind": "world",
        "place": "Spain",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g11",
      "level": "hard",
      "q": "What is the capital of Portugal?",
      "options": [
        "London",
        "Kyiv",
        "Lisbon",
        "Madrid"
      ],
      "answer": "Lisbon",
      "point": "Portugal — Lisbon.",
      "typed": "Lisbon",
      "map": {
        "kind": "world",
        "place": "Portugal",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g12",
      "level": "hard",
      "q": "Lisbon is the capital of which country?",
      "options": [
        "Portugal",
        "Sweden",
        "Germany",
        "Italy"
      ],
      "answer": "Portugal",
      "point": "Portugal — Lisbon.",
      "typed": "Portugal",
      "map": {
        "kind": "world",
        "place": "Portugal",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g13",
      "level": "hard",
      "q": "What is the capital of Norway?",
      "options": [
        "Oslo",
        "Kyiv",
        "Madrid",
        "Berlin"
      ],
      "answer": "Oslo",
      "point": "Norway — Oslo.",
      "typed": "Oslo",
      "map": {
        "kind": "world",
        "place": "Norway",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g14",
      "level": "hard",
      "q": "Oslo is the capital of which country?",
      "options": [
        "Norway",
        "United Kingdom",
        "Italy",
        "Germany"
      ],
      "answer": "Norway",
      "point": "Norway — Oslo.",
      "typed": "Norway",
      "map": {
        "kind": "world",
        "place": "Norway",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g15",
      "level": "hard",
      "q": "What is the capital of Sweden?",
      "options": [
        "London",
        "Athens",
        "Stockholm",
        "Kyiv"
      ],
      "answer": "Stockholm",
      "point": "Sweden — Stockholm.",
      "typed": "Stockholm",
      "map": {
        "kind": "world",
        "place": "Sweden",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g16",
      "level": "hard",
      "q": "Stockholm is the capital of which country?",
      "options": [
        "Portugal",
        "Spain",
        "Sweden",
        "Germany"
      ],
      "answer": "Sweden",
      "point": "Sweden — Stockholm.",
      "typed": "Sweden",
      "map": {
        "kind": "world",
        "place": "Sweden",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g17",
      "level": "hard",
      "q": "What is the capital of Greece?",
      "options": [
        "Paris",
        "Athens",
        "London",
        "Berlin"
      ],
      "answer": "Athens",
      "point": "Greece — Athens.",
      "typed": "Athens",
      "map": {
        "kind": "world",
        "place": "Greece",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g18",
      "level": "hard",
      "q": "Athens is the capital of which country?",
      "options": [
        "Ukraine",
        "Spain",
        "Greece",
        "Portugal"
      ],
      "answer": "Greece",
      "point": "Greece — Athens.",
      "typed": "Greece",
      "map": {
        "kind": "world",
        "place": "Greece",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g19",
      "level": "hard",
      "q": "What is the capital of Ukraine?",
      "options": [
        "Madrid",
        "Oslo",
        "Kyiv",
        "Berlin"
      ],
      "answer": "Kyiv",
      "point": "Ukraine — Kyiv.",
      "typed": "Kyiv",
      "map": {
        "kind": "world",
        "place": "Ukraine",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g20",
      "level": "hard",
      "q": "Kyiv is the capital of which country?",
      "options": [
        "Greece",
        "Italy",
        "Spain",
        "Ukraine"
      ],
      "answer": "Ukraine",
      "point": "Ukraine — Kyiv.",
      "typed": "Ukraine",
      "map": {
        "kind": "world",
        "place": "Ukraine",
        "where": "Europe",
        "note": "In Europe."
      }
    },
    {
      "key": "s4-g22",
      "level": "medium",
      "q": "Cairo is the capital of which country?",
      "options": [
        "Egypt",
        "Ethiopia",
        "Kenya",
        "Ghana"
      ],
      "answer": "Egypt",
      "point": "Egypt — Cairo.",
      "typed": "Egypt",
      "map": {
        "kind": "world",
        "place": "Egypt",
        "where": "Africa",
        "note": "In north-east Africa, on the river Nile."
      }
    },
    {
      "key": "s4-g23",
      "level": "medium",
      "q": "What is the capital of South Africa?",
      "options": [
        "Pretoria",
        "Kinshasa",
        "Cairo",
        "Rabat"
      ],
      "answer": "Pretoria",
      "point": "South Africa — Pretoria.",
      "typed": "Pretoria",
      "map": {
        "kind": "world",
        "place": "South Africa",
        "where": "Africa",
        "note": "At the southern tip of Africa."
      }
    },
    {
      "key": "s4-g24",
      "level": "hard",
      "q": "Pretoria is the capital of which country?",
      "options": [
        "Morocco",
        "Ghana",
        "Egypt",
        "South Africa"
      ],
      "answer": "South Africa",
      "point": "South Africa — Pretoria.",
      "typed": "South Africa",
      "map": {
        "kind": "world",
        "place": "South Africa",
        "where": "Africa",
        "note": "At the southern tip of Africa."
      }
    },
    {
      "key": "s4-g25",
      "level": "hard",
      "q": "What is the capital of Nigeria?",
      "options": [
        "Kinshasa",
        "Addis Ababa",
        "Pretoria",
        "Abuja"
      ],
      "answer": "Abuja",
      "point": "Nigeria — Abuja.",
      "typed": "Abuja",
      "map": {
        "kind": "world",
        "place": "Nigeria",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g26",
      "level": "hard",
      "q": "Abuja is the capital of which country?",
      "options": [
        "Kenya",
        "Morocco",
        "Nigeria",
        "South Africa"
      ],
      "answer": "Nigeria",
      "point": "Nigeria — Abuja.",
      "typed": "Nigeria",
      "map": {
        "kind": "world",
        "place": "Nigeria",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g27",
      "level": "hard",
      "q": "What is the capital of Kenya?",
      "options": [
        "Addis Ababa",
        "Nairobi",
        "Rabat",
        "Accra"
      ],
      "answer": "Nairobi",
      "point": "Kenya — Nairobi.",
      "typed": "Nairobi",
      "map": {
        "kind": "world",
        "place": "Kenya",
        "where": "Africa",
        "note": "In East Africa, on the Indian Ocean."
      }
    },
    {
      "key": "s4-g28",
      "level": "hard",
      "q": "Nairobi is the capital of which country?",
      "options": [
        "Ghana",
        "Kenya",
        "Algeria",
        "South Africa"
      ],
      "answer": "Kenya",
      "point": "Kenya — Nairobi.",
      "typed": "Kenya",
      "map": {
        "kind": "world",
        "place": "Kenya",
        "where": "Africa",
        "note": "In East Africa, on the Indian Ocean."
      }
    },
    {
      "key": "s4-g29",
      "level": "hard",
      "q": "What is the capital of Ethiopia?",
      "options": [
        "Cairo",
        "Addis Ababa",
        "Nairobi",
        "Algiers"
      ],
      "answer": "Addis Ababa",
      "point": "Ethiopia — Addis Ababa.",
      "typed": "Addis Ababa",
      "map": {
        "kind": "world",
        "place": "Ethiopia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g30",
      "level": "hard",
      "q": "Addis Ababa is the capital of which country?",
      "options": [
        "Algeria",
        "Nigeria",
        "Ethiopia",
        "Dem. Rep. of Congo"
      ],
      "answer": "Ethiopia",
      "point": "Ethiopia — Addis Ababa.",
      "typed": "Ethiopia",
      "map": {
        "kind": "world",
        "place": "Ethiopia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g31",
      "level": "hard",
      "q": "What is the capital of Algeria?",
      "options": [
        "Dodoma",
        "Algiers",
        "Addis Ababa",
        "Nairobi"
      ],
      "answer": "Algiers",
      "point": "Algeria — Algiers.",
      "typed": "Algiers",
      "map": {
        "kind": "world",
        "place": "Algeria",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g32",
      "level": "hard",
      "q": "Algiers is the capital of which country?",
      "options": [
        "Algeria",
        "Ghana",
        "Dem. Rep. of Congo",
        "Tanzania"
      ],
      "answer": "Algeria",
      "point": "Algeria — Algiers.",
      "typed": "Algeria",
      "map": {
        "kind": "world",
        "place": "Algeria",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g33",
      "level": "hard",
      "q": "What is the capital of Morocco?",
      "options": [
        "Algiers",
        "Rabat",
        "Addis Ababa",
        "Pretoria"
      ],
      "answer": "Rabat",
      "point": "Morocco — Rabat.",
      "typed": "Rabat",
      "map": {
        "kind": "world",
        "place": "Morocco",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g34",
      "level": "hard",
      "q": "Rabat is the capital of which country?",
      "options": [
        "Morocco",
        "Egypt",
        "Algeria",
        "Dem. Rep. of Congo"
      ],
      "answer": "Morocco",
      "point": "Morocco — Rabat.",
      "typed": "Morocco",
      "map": {
        "kind": "world",
        "place": "Morocco",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g35",
      "level": "hard",
      "q": "What is the capital of Dem. Rep. of Congo?",
      "options": [
        "Abuja",
        "Nairobi",
        "Rabat",
        "Kinshasa"
      ],
      "answer": "Kinshasa",
      "point": "Dem. Rep. of Congo — Kinshasa.",
      "typed": "Kinshasa",
      "map": {
        "kind": "world",
        "place": "Dem. Rep. of Congo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g36",
      "level": "hard",
      "q": "Kinshasa is the capital of which country?",
      "options": [
        "Dem. Rep. of Congo",
        "Morocco",
        "Kenya",
        "Ethiopia"
      ],
      "answer": "Dem. Rep. of Congo",
      "point": "Dem. Rep. of Congo — Kinshasa.",
      "typed": "Dem. Rep. of Congo",
      "accept": [
        "democratic republic of congo",
        "congo",
        "drc"
      ],
      "map": {
        "kind": "world",
        "place": "Dem. Rep. of Congo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g37",
      "level": "hard",
      "q": "What is the capital of Ghana?",
      "options": [
        "Pretoria",
        "Abuja",
        "Accra",
        "Cairo"
      ],
      "answer": "Accra",
      "point": "Ghana — Accra.",
      "typed": "Accra",
      "map": {
        "kind": "world",
        "place": "Ghana",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g38",
      "level": "hard",
      "q": "Accra is the capital of which country?",
      "options": [
        "South Africa",
        "Ghana",
        "Nigeria",
        "Dem. Rep. of Congo"
      ],
      "answer": "Ghana",
      "point": "Ghana — Accra.",
      "typed": "Ghana",
      "map": {
        "kind": "world",
        "place": "Ghana",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g39",
      "level": "hard",
      "q": "What is the capital of Tanzania?",
      "options": [
        "Dodoma",
        "Cairo",
        "Kinshasa",
        "Rabat"
      ],
      "answer": "Dodoma",
      "point": "Tanzania — Dodoma.",
      "typed": "Dodoma",
      "map": {
        "kind": "world",
        "place": "Tanzania",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g40",
      "level": "hard",
      "q": "Dodoma is the capital of which country?",
      "options": [
        "Kenya",
        "South Africa",
        "Tanzania",
        "Ghana"
      ],
      "answer": "Tanzania",
      "point": "Tanzania — Dodoma.",
      "typed": "Tanzania",
      "map": {
        "kind": "world",
        "place": "Tanzania",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g41",
      "level": "easy",
      "q": "What is the capital of India?",
      "options": [
        "Dhaka",
        "Tehran",
        "New Delhi",
        "Baghdad"
      ],
      "answer": "New Delhi",
      "point": "India — New Delhi.",
      "typed": "New Delhi",
      "map": {
        "kind": "world",
        "place": "India",
        "where": "Asia",
        "note": "In South Asia — the triangle pointing down into the Indian Ocean."
      }
    },
    {
      "key": "s4-g42",
      "level": "medium",
      "q": "New Delhi is the capital of which country?",
      "options": [
        "Syria",
        "India",
        "Japan",
        "Nepal"
      ],
      "answer": "India",
      "point": "India — New Delhi.",
      "typed": "India",
      "map": {
        "kind": "world",
        "place": "India",
        "where": "Asia",
        "note": "In South Asia — the triangle pointing down into the Indian Ocean."
      }
    },
    {
      "key": "s4-g43",
      "level": "easy",
      "q": "What is the capital of China?",
      "options": [
        "Kathmandu",
        "Beijing",
        "New Delhi",
        "Dhaka"
      ],
      "answer": "Beijing",
      "point": "China — Beijing.",
      "typed": "Beijing",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s4-g44",
      "level": "medium",
      "q": "Beijing is the capital of which country?",
      "options": [
        "Nepal",
        "Yemen",
        "China",
        "Singapore"
      ],
      "answer": "China",
      "point": "China — Beijing.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s4-g46",
      "level": "medium",
      "q": "Tokyo is the capital of which country?",
      "options": [
        "Japan",
        "South Korea",
        "Yemen",
        "China"
      ],
      "answer": "Japan",
      "point": "Japan — Tokyo.",
      "typed": "Japan",
      "map": {
        "kind": "world",
        "place": "Japan",
        "where": "Asia",
        "note": "Islands to the east of China, in the Pacific Ocean."
      }
    },
    {
      "key": "s4-g47",
      "level": "medium",
      "q": "What is the capital of Russia?",
      "options": [
        "Moscow",
        "Kuwait City",
        "Stockholm",
        "Colombo"
      ],
      "answer": "Moscow",
      "point": "Russia — Moscow.",
      "typed": "Moscow",
      "map": {
        "kind": "world",
        "place": "Russia",
        "where": "Europe and Asia",
        "note": "The biggest country — across the north of Europe and Asia."
      }
    },
    {
      "key": "s4-g48",
      "level": "hard",
      "q": "Moscow is the capital of which country?",
      "options": [
        "Bhutan",
        "Russia",
        "Thailand",
        "Oman"
      ],
      "answer": "Russia",
      "point": "Russia — Moscow.",
      "typed": "Russia",
      "map": {
        "kind": "world",
        "place": "Russia",
        "where": "Europe and Asia",
        "note": "The biggest country — across the north of Europe and Asia."
      }
    },
    {
      "key": "s4-g49",
      "level": "easy",
      "q": "What is the capital of Pakistan?",
      "options": [
        "Seoul",
        "Kuwait City",
        "Islamabad",
        "Naypyidaw"
      ],
      "answer": "Islamabad",
      "point": "Pakistan — Islamabad.",
      "typed": "Islamabad",
      "map": {
        "kind": "world",
        "place": "Pakistan",
        "where": "Asia",
        "note": "In South Asia, west of India."
      }
    },
    {
      "key": "s4-g50",
      "level": "medium",
      "q": "Islamabad is the capital of which country?",
      "options": [
        "Pakistan",
        "Indonesia",
        "Turkey",
        "UAE"
      ],
      "answer": "Pakistan",
      "point": "Pakistan — Islamabad.",
      "typed": "Pakistan",
      "map": {
        "kind": "world",
        "place": "Pakistan",
        "where": "Asia",
        "note": "In South Asia, west of India."
      }
    },
    {
      "key": "s4-g51",
      "level": "easy",
      "q": "What is the capital of Bangladesh?",
      "options": [
        "Dhaka",
        "Naypyidaw",
        "Bangkok",
        "Baghdad"
      ],
      "answer": "Dhaka",
      "point": "Bangladesh — Dhaka.",
      "typed": "Dhaka",
      "map": {
        "kind": "world",
        "place": "Bangladesh",
        "where": "Asia",
        "note": "In South Asia, east of India."
      }
    },
    {
      "key": "s4-g52",
      "level": "medium",
      "q": "Dhaka is the capital of which country?",
      "options": [
        "Bangladesh",
        "Sri Lanka",
        "Jordan",
        "Singapore"
      ],
      "answer": "Bangladesh",
      "point": "Bangladesh — Dhaka.",
      "typed": "Bangladesh",
      "map": {
        "kind": "world",
        "place": "Bangladesh",
        "where": "Asia",
        "note": "In South Asia, east of India."
      }
    },
    {
      "key": "s4-g54",
      "level": "medium",
      "q": "Kathmandu is the capital of which country?",
      "options": [
        "Lebanon",
        "Myanmar",
        "Indonesia",
        "Nepal"
      ],
      "answer": "Nepal",
      "point": "Nepal — Kathmandu.",
      "typed": "Nepal",
      "map": {
        "kind": "world",
        "place": "Nepal",
        "where": "Asia",
        "note": "North of India, in the Himalayas — Mount Everest is here."
      }
    },
    {
      "key": "s4-g55",
      "level": "easy",
      "q": "What is the capital of Saudi Arabia?",
      "options": [
        "Sana'a",
        "Singapore",
        "Naypyidaw",
        "Riyadh"
      ],
      "answer": "Riyadh",
      "point": "Saudi Arabia — Riyadh.",
      "typed": "Riyadh",
      "map": {
        "kind": "world",
        "place": "Saudi Arabia",
        "where": "Asia",
        "note": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf."
      }
    },
    {
      "key": "s4-g56",
      "level": "medium",
      "q": "Riyadh is the capital of which country?",
      "options": [
        "Saudi Arabia",
        "Qatar",
        "Vietnam",
        "Singapore"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia — Riyadh.",
      "typed": "Saudi Arabia",
      "map": {
        "kind": "world",
        "place": "Saudi Arabia",
        "where": "Asia",
        "note": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf."
      }
    },
    {
      "key": "s4-g57",
      "level": "easy",
      "q": "What is the capital of Indonesia?",
      "options": [
        "Ankara",
        "Kabul",
        "Jakarta",
        "Naypyidaw"
      ],
      "answer": "Jakarta",
      "point": "Indonesia — Jakarta.",
      "typed": "Jakarta",
      "map": {
        "kind": "world",
        "place": "Indonesia",
        "where": "Asia",
        "note": "Many islands south-east of Asia, above Australia."
      }
    },
    {
      "key": "s4-g58",
      "level": "medium",
      "q": "Jakarta is the capital of which country?",
      "options": [
        "Qatar",
        "Vietnam",
        "Indonesia",
        "Pakistan"
      ],
      "answer": "Indonesia",
      "point": "Indonesia — Jakarta.",
      "typed": "Indonesia",
      "map": {
        "kind": "world",
        "place": "Indonesia",
        "where": "Asia",
        "note": "Many islands south-east of Asia, above Australia."
      }
    },
    {
      "key": "s4-g59",
      "level": "medium",
      "q": "What is the capital of South Korea?",
      "options": [
        "Tehran",
        "Damascus",
        "Naypyidaw",
        "Seoul"
      ],
      "answer": "Seoul",
      "point": "South Korea — Seoul.",
      "typed": "Seoul",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g60",
      "level": "hard",
      "q": "Seoul is the capital of which country?",
      "options": [
        "Qatar",
        "Japan",
        "Afghanistan",
        "South Korea"
      ],
      "answer": "South Korea",
      "point": "South Korea — Seoul.",
      "typed": "South Korea",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g61",
      "level": "easy",
      "q": "What is the capital of United States?",
      "options": [
        "Ottawa",
        "Washington, D.C.",
        "Mexico City",
        "Kingston"
      ],
      "answer": "Washington, D.C.",
      "point": "United States — Washington, D.C.",
      "typed": "Washington, D.C.",
      "map": {
        "kind": "world",
        "place": "United States",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g62",
      "level": "medium",
      "q": "Washington, D.C. is the capital of which country?",
      "options": [
        "Cuba",
        "Canada",
        "Mexico",
        "United States"
      ],
      "answer": "United States",
      "point": "United States — Washington, D.C.",
      "typed": "United States",
      "accept": [
        "usa",
        "us",
        "america"
      ],
      "map": {
        "kind": "world",
        "place": "United States",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g64",
      "level": "hard",
      "q": "Ottawa is the capital of which country?",
      "options": [
        "Canada",
        "Cuba",
        "United States",
        "Mexico"
      ],
      "answer": "Canada",
      "point": "Canada — Ottawa.",
      "typed": "Canada",
      "map": {
        "kind": "world",
        "place": "Canada",
        "where": "North America",
        "note": "North of the USA — the second-largest country in the world."
      }
    },
    {
      "key": "s4-g65",
      "level": "medium",
      "q": "What is the capital of Mexico?",
      "options": [
        "Washington, D.C.",
        "Mexico City",
        "Kingston",
        "Havana"
      ],
      "answer": "Mexico City",
      "point": "Mexico — Mexico City.",
      "typed": "Mexico City",
      "map": {
        "kind": "world",
        "place": "Mexico",
        "where": "North America",
        "note": "South of the USA, in North America."
      }
    },
    {
      "key": "s4-g66",
      "level": "hard",
      "q": "Mexico City is the capital of which country?",
      "options": [
        "Jamaica",
        "Mexico",
        "Cuba",
        "Canada"
      ],
      "answer": "Mexico",
      "point": "Mexico — Mexico City.",
      "typed": "Mexico",
      "map": {
        "kind": "world",
        "place": "Mexico",
        "where": "North America",
        "note": "South of the USA, in North America."
      }
    },
    {
      "key": "s4-g67",
      "level": "hard",
      "q": "What is the capital of Cuba?",
      "options": [
        "Havana",
        "Mexico City",
        "Washington, D.C.",
        "Kingston"
      ],
      "answer": "Havana",
      "point": "Cuba — Havana.",
      "typed": "Havana",
      "map": {
        "kind": "world",
        "place": "Cuba",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g68",
      "level": "hard",
      "q": "Havana is the capital of which country?",
      "options": [
        "Canada",
        "Mexico",
        "United States",
        "Cuba"
      ],
      "answer": "Cuba",
      "point": "Cuba — Havana.",
      "typed": "Cuba",
      "map": {
        "kind": "world",
        "place": "Cuba",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g69",
      "level": "hard",
      "q": "What is the capital of Jamaica?",
      "options": [
        "Ottawa",
        "Kingston",
        "Mexico City",
        "Havana"
      ],
      "answer": "Kingston",
      "point": "Jamaica — Kingston.",
      "typed": "Kingston",
      "map": {
        "kind": "world",
        "place": "Jamaica",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g70",
      "level": "hard",
      "q": "Kingston is the capital of which country?",
      "options": [
        "Jamaica",
        "United States",
        "Cuba",
        "Mexico"
      ],
      "answer": "Jamaica",
      "point": "Jamaica — Kingston.",
      "typed": "Jamaica",
      "map": {
        "kind": "world",
        "place": "Jamaica",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g72",
      "level": "hard",
      "q": "Brasilia is the capital of which country?",
      "options": [
        "Chile",
        "Ecuador",
        "Peru",
        "Brazil"
      ],
      "answer": "Brazil",
      "point": "Brazil — Brasilia.",
      "typed": "Brazil",
      "map": {
        "kind": "world",
        "place": "Brazil",
        "where": "South America",
        "note": "The biggest country in South America."
      }
    },
    {
      "key": "s4-g73",
      "level": "medium",
      "q": "What is the capital of Argentina?",
      "options": [
        "Caracas",
        "Lima",
        "Buenos Aires",
        "Bogota"
      ],
      "answer": "Buenos Aires",
      "point": "Argentina — Buenos Aires.",
      "typed": "Buenos Aires",
      "map": {
        "kind": "world",
        "place": "Argentina",
        "where": "South America",
        "note": "In South America, south of Brazil."
      }
    },
    {
      "key": "s4-g74",
      "level": "hard",
      "q": "Buenos Aires is the capital of which country?",
      "options": [
        "Colombia",
        "Brazil",
        "Argentina",
        "Peru"
      ],
      "answer": "Argentina",
      "point": "Argentina — Buenos Aires.",
      "typed": "Argentina",
      "map": {
        "kind": "world",
        "place": "Argentina",
        "where": "South America",
        "note": "In South America, south of Brazil."
      }
    },
    {
      "key": "s4-g75",
      "level": "hard",
      "q": "What is the capital of Chile?",
      "options": [
        "Bogota",
        "Brasilia",
        "Santiago",
        "Lima"
      ],
      "answer": "Santiago",
      "point": "Chile — Santiago.",
      "typed": "Santiago",
      "map": {
        "kind": "world",
        "place": "Chile",
        "where": "South America",
        "note": "A long thin country on the west coast of South America."
      }
    },
    {
      "key": "s4-g76",
      "level": "hard",
      "q": "Santiago is the capital of which country?",
      "options": [
        "Venezuela",
        "Peru",
        "Argentina",
        "Chile"
      ],
      "answer": "Chile",
      "point": "Chile — Santiago.",
      "typed": "Chile",
      "map": {
        "kind": "world",
        "place": "Chile",
        "where": "South America",
        "note": "A long thin country on the west coast of South America."
      }
    },
    {
      "key": "s4-g77",
      "level": "hard",
      "q": "What is the capital of Peru?",
      "options": [
        "Lima",
        "Quito",
        "Santiago",
        "Buenos Aires"
      ],
      "answer": "Lima",
      "point": "Peru — Lima.",
      "typed": "Lima",
      "map": {
        "kind": "world",
        "place": "Peru",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g78",
      "level": "hard",
      "q": "Lima is the capital of which country?",
      "options": [
        "Argentina",
        "Chile",
        "Peru",
        "Ecuador"
      ],
      "answer": "Peru",
      "point": "Peru — Lima.",
      "typed": "Peru",
      "map": {
        "kind": "world",
        "place": "Peru",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g79",
      "level": "hard",
      "q": "What is the capital of Colombia?",
      "options": [
        "Quito",
        "Brasilia",
        "Bogota",
        "Santiago"
      ],
      "answer": "Bogota",
      "point": "Colombia — Bogota.",
      "typed": "Bogota",
      "map": {
        "kind": "world",
        "place": "Colombia",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g80",
      "level": "hard",
      "q": "Bogota is the capital of which country?",
      "options": [
        "Ecuador",
        "Venezuela",
        "Colombia",
        "Brazil"
      ],
      "answer": "Colombia",
      "point": "Colombia — Bogota.",
      "typed": "Colombia",
      "map": {
        "kind": "world",
        "place": "Colombia",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g81",
      "level": "hard",
      "q": "What is the capital of Venezuela?",
      "options": [
        "Brasilia",
        "Bogota",
        "Lima",
        "Caracas"
      ],
      "answer": "Caracas",
      "point": "Venezuela — Caracas.",
      "typed": "Caracas",
      "map": {
        "kind": "world",
        "place": "Venezuela",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g82",
      "level": "hard",
      "q": "Caracas is the capital of which country?",
      "options": [
        "Venezuela",
        "Argentina",
        "Brazil",
        "Ecuador"
      ],
      "answer": "Venezuela",
      "point": "Venezuela — Caracas.",
      "typed": "Venezuela",
      "map": {
        "kind": "world",
        "place": "Venezuela",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g83",
      "level": "hard",
      "q": "What is the capital of Ecuador?",
      "options": [
        "Santiago",
        "Quito",
        "Lima",
        "Brasilia"
      ],
      "answer": "Quito",
      "point": "Ecuador — Quito.",
      "typed": "Quito",
      "map": {
        "kind": "world",
        "place": "Ecuador",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g84",
      "level": "hard",
      "q": "Quito is the capital of which country?",
      "options": [
        "Ecuador",
        "Chile",
        "Peru",
        "Colombia"
      ],
      "answer": "Ecuador",
      "point": "Ecuador — Quito.",
      "typed": "Ecuador",
      "map": {
        "kind": "world",
        "place": "Ecuador",
        "where": "South America",
        "note": "In South America."
      }
    },
    {
      "key": "s4-g86",
      "level": "hard",
      "q": "Canberra is the capital of which country?",
      "options": [
        "Ghana",
        "Australia",
        "Canada",
        "Tanzania"
      ],
      "answer": "Australia",
      "point": "Australia — Canberra.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Australia",
        "where": "Oceania",
        "note": "The island continent, south-east of Asia."
      }
    },
    {
      "key": "s4-g87",
      "level": "medium",
      "q": "What is the capital of New Zealand?",
      "options": [
        "Berlin",
        "Moscow",
        "Ankara",
        "Wellington"
      ],
      "answer": "Wellington",
      "point": "New Zealand — Wellington.",
      "typed": "Wellington",
      "map": {
        "kind": "world",
        "place": "New Zealand",
        "where": "Oceania",
        "note": "Islands south-east of Australia, in the Pacific Ocean."
      }
    },
    {
      "key": "s4-g88",
      "level": "hard",
      "q": "Wellington is the capital of which country?",
      "options": [
        "Greece",
        "New Zealand",
        "Portugal",
        "Egypt"
      ],
      "answer": "New Zealand",
      "point": "New Zealand — Wellington.",
      "typed": "New Zealand",
      "map": {
        "kind": "world",
        "place": "New Zealand",
        "where": "Oceania",
        "note": "Islands south-east of Australia, in the Pacific Ocean."
      }
    },
    {
      "key": "s4-g89",
      "level": "hard",
      "q": "What is the capital of Papua New Guinea?",
      "options": [
        "Cairo",
        "Quito",
        "Port Moresby",
        "London"
      ],
      "answer": "Port Moresby",
      "point": "Papua New Guinea — Port Moresby.",
      "typed": "Port Moresby",
      "map": {
        "kind": "world",
        "place": "Papua New Guinea",
        "where": "Oceania",
        "note": "In Oceania."
      }
    },
    {
      "key": "s4-g90",
      "level": "hard",
      "q": "Port Moresby is the capital of which country?",
      "options": [
        "Bangladesh",
        "Papua New Guinea",
        "Chile",
        "Colombia"
      ],
      "answer": "Papua New Guinea",
      "point": "Papua New Guinea — Port Moresby.",
      "typed": "Papua New Guinea",
      "map": {
        "kind": "world",
        "place": "Papua New Guinea",
        "where": "Oceania",
        "note": "In Oceania."
      }
    },
    {
      "key": "s4-g92",
      "level": "medium",
      "q": "Abu Dhabi is the capital of which country?",
      "options": [
        "Iraq",
        "Yemen",
        "Jordan",
        "UAE"
      ],
      "answer": "UAE",
      "point": "UAE — Abu Dhabi.",
      "typed": "UAE",
      "map": {
        "kind": "world",
        "place": "UAE",
        "where": "Asia",
        "note": "On the Arabian Peninsula, next to Saudi Arabia and Oman."
      }
    },
    {
      "key": "s4-g93",
      "level": "hard",
      "q": "What is the capital of Qatar?",
      "options": [
        "Beijing",
        "Kuala Lumpur",
        "Doha",
        "Kuwait City"
      ],
      "answer": "Doha",
      "point": "Qatar — Doha.",
      "typed": "Doha",
      "map": {
        "kind": "world",
        "place": "Qatar",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g94",
      "level": "hard",
      "q": "Doha is the capital of which country?",
      "options": [
        "Lebanon",
        "Qatar",
        "Kuwait",
        "Bangladesh"
      ],
      "answer": "Qatar",
      "point": "Qatar — Doha.",
      "typed": "Qatar",
      "map": {
        "kind": "world",
        "place": "Qatar",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g95",
      "level": "hard",
      "q": "What is the capital of Kuwait?",
      "options": [
        "Kathmandu",
        "Kuwait City",
        "Kuala Lumpur",
        "Damascus"
      ],
      "answer": "Kuwait City",
      "point": "Kuwait — Kuwait City.",
      "typed": "Kuwait City",
      "map": {
        "kind": "world",
        "place": "Kuwait",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g96",
      "level": "hard",
      "q": "Kuwait City is the capital of which country?",
      "options": [
        "Kuwait",
        "Thailand",
        "Syria",
        "Bhutan"
      ],
      "answer": "Kuwait",
      "point": "Kuwait — Kuwait City.",
      "typed": "Kuwait",
      "map": {
        "kind": "world",
        "place": "Kuwait",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g97",
      "level": "hard",
      "q": "What is the capital of Oman?",
      "options": [
        "Muscat",
        "Islamabad",
        "Doha",
        "Abu Dhabi"
      ],
      "answer": "Muscat",
      "point": "Oman — Muscat.",
      "typed": "Muscat",
      "map": {
        "kind": "world",
        "place": "Oman",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g98",
      "level": "hard",
      "q": "Muscat is the capital of which country?",
      "options": [
        "Oman",
        "Qatar",
        "Kuwait",
        "China"
      ],
      "answer": "Oman",
      "point": "Oman — Muscat.",
      "typed": "Oman",
      "map": {
        "kind": "world",
        "place": "Oman",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g99",
      "level": "hard",
      "q": "What is the capital of Yemen?",
      "options": [
        "Jakarta",
        "Naypyidaw",
        "Male",
        "Sana'a"
      ],
      "answer": "Sana'a",
      "point": "Yemen — Sana'a.",
      "typed": "Sana'a",
      "map": {
        "kind": "world",
        "place": "Yemen",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g100",
      "level": "hard",
      "q": "Sana'a is the capital of which country?",
      "options": [
        "Nepal",
        "Afghanistan",
        "Thailand",
        "Yemen"
      ],
      "answer": "Yemen",
      "point": "Yemen — Sana'a.",
      "typed": "Yemen",
      "map": {
        "kind": "world",
        "place": "Yemen",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g101",
      "level": "hard",
      "q": "What is the capital of Jordan?",
      "options": [
        "Tehran",
        "Amman",
        "Dhaka",
        "Ankara"
      ],
      "answer": "Amman",
      "point": "Jordan — Amman.",
      "typed": "Amman",
      "map": {
        "kind": "world",
        "place": "Jordan",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g102",
      "level": "hard",
      "q": "Amman is the capital of which country?",
      "options": [
        "Jordan",
        "Oman",
        "Malaysia",
        "Myanmar"
      ],
      "answer": "Jordan",
      "point": "Jordan — Amman.",
      "typed": "Jordan",
      "map": {
        "kind": "world",
        "place": "Jordan",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g103",
      "level": "hard",
      "q": "What is the capital of Lebanon?",
      "options": [
        "Colombo",
        "Muscat",
        "Abu Dhabi",
        "Beirut"
      ],
      "answer": "Beirut",
      "point": "Lebanon — Beirut.",
      "typed": "Beirut",
      "map": {
        "kind": "world",
        "place": "Lebanon",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g104",
      "level": "hard",
      "q": "Beirut is the capital of which country?",
      "options": [
        "Qatar",
        "Afghanistan",
        "Iraq",
        "Lebanon"
      ],
      "answer": "Lebanon",
      "point": "Lebanon — Beirut.",
      "typed": "Lebanon",
      "map": {
        "kind": "world",
        "place": "Lebanon",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g105",
      "level": "hard",
      "q": "What is the capital of Syria?",
      "options": [
        "Hanoi",
        "Tehran",
        "Damascus",
        "New Delhi"
      ],
      "answer": "Damascus",
      "point": "Syria — Damascus.",
      "typed": "Damascus",
      "map": {
        "kind": "world",
        "place": "Syria",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g106",
      "level": "hard",
      "q": "Damascus is the capital of which country?",
      "options": [
        "Turkey",
        "Syria",
        "South Korea",
        "Qatar"
      ],
      "answer": "Syria",
      "point": "Syria — Damascus.",
      "typed": "Syria",
      "map": {
        "kind": "world",
        "place": "Syria",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g107",
      "level": "medium",
      "q": "What is the capital of Iraq?",
      "options": [
        "Naypyidaw",
        "Baghdad",
        "Jakarta",
        "Beijing"
      ],
      "answer": "Baghdad",
      "point": "Iraq — Baghdad.",
      "typed": "Baghdad",
      "map": {
        "kind": "world",
        "place": "Iraq",
        "where": "Asia",
        "note": "In Iraq, in the Middle East, east of Syria."
      }
    },
    {
      "key": "s4-g108",
      "level": "hard",
      "q": "Baghdad is the capital of which country?",
      "options": [
        "Japan",
        "China",
        "Maldives",
        "Iraq"
      ],
      "answer": "Iraq",
      "point": "Iraq — Baghdad.",
      "typed": "Iraq",
      "map": {
        "kind": "world",
        "place": "Iraq",
        "where": "Asia",
        "note": "In Iraq, in the Middle East, east of Syria."
      }
    },
    {
      "key": "s4-g109",
      "level": "medium",
      "q": "What is the capital of Iran?",
      "options": [
        "Islamabad",
        "Doha",
        "Male",
        "Tehran"
      ],
      "answer": "Tehran",
      "point": "Iran — Tehran.",
      "typed": "Tehran",
      "map": {
        "kind": "world",
        "place": "Iran",
        "where": "Asia",
        "note": "In the Middle East, east of Iraq."
      }
    },
    {
      "key": "s4-g110",
      "level": "hard",
      "q": "Tehran is the capital of which country?",
      "options": [
        "Bhutan",
        "Sri Lanka",
        "Jordan",
        "Iran"
      ],
      "answer": "Iran",
      "point": "Iran — Tehran.",
      "typed": "Iran",
      "map": {
        "kind": "world",
        "place": "Iran",
        "where": "Asia",
        "note": "In the Middle East, east of Iraq."
      }
    },
    {
      "key": "s4-g112",
      "level": "hard",
      "q": "Ankara is the capital of which country?",
      "options": [
        "Pakistan",
        "Turkey",
        "Iran",
        "Afghanistan"
      ],
      "answer": "Turkey",
      "point": "Turkey — Ankara.",
      "typed": "Turkey",
      "map": {
        "kind": "world",
        "place": "Turkey",
        "where": "Asia",
        "note": "Between Europe and Asia, north of Syria and Iraq."
      }
    },
    {
      "key": "s4-g113",
      "level": "hard",
      "q": "What is the capital of Afghanistan?",
      "options": [
        "Riyadh",
        "Tehran",
        "Damascus",
        "Kabul"
      ],
      "answer": "Kabul",
      "point": "Afghanistan — Kabul.",
      "typed": "Kabul",
      "map": {
        "kind": "world",
        "place": "Afghanistan",
        "where": "Asia",
        "note": "In South Asia, north-west of Pakistan."
      }
    },
    {
      "key": "s4-g114",
      "level": "hard",
      "q": "Kabul is the capital of which country?",
      "options": [
        "Maldives",
        "Japan",
        "Afghanistan",
        "Nepal"
      ],
      "answer": "Afghanistan",
      "point": "Afghanistan — Kabul.",
      "typed": "Afghanistan",
      "map": {
        "kind": "world",
        "place": "Afghanistan",
        "where": "Asia",
        "note": "In South Asia, north-west of Pakistan."
      }
    },
    {
      "key": "s4-g115",
      "level": "hard",
      "q": "What is the capital of Bhutan?",
      "options": [
        "Colombo",
        "Thimphu",
        "Sana'a",
        "Bangkok"
      ],
      "answer": "Thimphu",
      "point": "Bhutan — Thimphu.",
      "typed": "Thimphu",
      "map": {
        "kind": "world",
        "place": "Bhutan",
        "where": "Asia",
        "note": "In South Asia, in the Himalayas, east of Nepal."
      }
    },
    {
      "key": "s4-g116",
      "level": "hard",
      "q": "Thimphu is the capital of which country?",
      "options": [
        "Bhutan",
        "Syria",
        "Oman",
        "Indonesia"
      ],
      "answer": "Bhutan",
      "point": "Bhutan — Thimphu.",
      "typed": "Bhutan",
      "map": {
        "kind": "world",
        "place": "Bhutan",
        "where": "Asia",
        "note": "In South Asia, in the Himalayas, east of Nepal."
      }
    },
    {
      "key": "s4-g117",
      "level": "hard",
      "q": "What is the capital of Myanmar?",
      "options": [
        "Hanoi",
        "Kuwait City",
        "Naypyidaw",
        "Muscat"
      ],
      "answer": "Naypyidaw",
      "point": "Myanmar — Naypyidaw.",
      "typed": "Naypyidaw",
      "map": {
        "kind": "world",
        "place": "Myanmar",
        "where": "Asia",
        "note": "In South-East Asia, east of India and Bangladesh."
      }
    },
    {
      "key": "s4-g118",
      "level": "hard",
      "q": "Naypyidaw is the capital of which country?",
      "options": [
        "Myanmar",
        "Afghanistan",
        "Oman",
        "China"
      ],
      "answer": "Myanmar",
      "point": "Myanmar — Naypyidaw.",
      "typed": "Myanmar",
      "map": {
        "kind": "world",
        "place": "Myanmar",
        "where": "Asia",
        "note": "In South-East Asia, east of India and Bangladesh."
      }
    },
    {
      "key": "s4-g119",
      "level": "easy",
      "q": "What is the capital of Sri Lanka?",
      "options": [
        "Abu Dhabi",
        "Beijing",
        "Thimphu",
        "Colombo"
      ],
      "answer": "Colombo",
      "point": "Sri Lanka — Colombo.",
      "typed": "Colombo",
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "Asia",
        "note": "A small teardrop island just below India, in the Indian Ocean."
      }
    },
    {
      "key": "s4-g120",
      "level": "medium",
      "q": "Colombo is the capital of which country?",
      "options": [
        "Vietnam",
        "Sri Lanka",
        "Maldives",
        "South Korea"
      ],
      "answer": "Sri Lanka",
      "point": "Sri Lanka — Colombo.",
      "typed": "Sri Lanka",
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "Asia",
        "note": "A small teardrop island just below India, in the Indian Ocean."
      }
    },
    {
      "key": "s4-g121",
      "level": "hard",
      "q": "What is the capital of Maldives?",
      "options": [
        "Beirut",
        "Hanoi",
        "Islamabad",
        "Male"
      ],
      "answer": "Male",
      "point": "Maldives — Male.",
      "typed": "Male",
      "map": {
        "kind": "world",
        "place": "Maldives",
        "where": "Asia",
        "note": "Small islands in the Indian Ocean, south-west of India."
      }
    },
    {
      "key": "s4-g122",
      "level": "hard",
      "q": "Male is the capital of which country?",
      "options": [
        "China",
        "Maldives",
        "Malaysia",
        "Pakistan"
      ],
      "answer": "Maldives",
      "point": "Maldives — Male.",
      "typed": "Maldives",
      "map": {
        "kind": "world",
        "place": "Maldives",
        "where": "Asia",
        "note": "Small islands in the Indian Ocean, south-west of India."
      }
    },
    {
      "key": "s4-g123",
      "level": "medium",
      "q": "What is the capital of Thailand?",
      "options": [
        "Colombo",
        "Bangkok",
        "Dhaka",
        "Beirut"
      ],
      "answer": "Bangkok",
      "point": "Thailand — Bangkok.",
      "typed": "Bangkok",
      "map": {
        "kind": "world",
        "place": "Thailand",
        "where": "Asia",
        "note": "In South-East Asia, east of Myanmar."
      }
    },
    {
      "key": "s4-g124",
      "level": "hard",
      "q": "Bangkok is the capital of which country?",
      "options": [
        "Thailand",
        "Vietnam",
        "Qatar",
        "Syria"
      ],
      "answer": "Thailand",
      "point": "Thailand — Bangkok.",
      "typed": "Thailand",
      "map": {
        "kind": "world",
        "place": "Thailand",
        "where": "Asia",
        "note": "In South-East Asia, east of Myanmar."
      }
    },
    {
      "key": "s4-g125",
      "level": "easy",
      "q": "What is the capital of Malaysia?",
      "options": [
        "Kuwait City",
        "Kuala Lumpur",
        "Amman",
        "Baghdad"
      ],
      "answer": "Kuala Lumpur",
      "point": "Malaysia — Kuala Lumpur.",
      "typed": "Kuala Lumpur",
      "map": {
        "kind": "world",
        "place": "Malaysia",
        "where": "Asia",
        "note": "In South-East Asia, south of Thailand."
      }
    },
    {
      "key": "s4-g126",
      "level": "medium",
      "q": "Kuala Lumpur is the capital of which country?",
      "options": [
        "Jordan",
        "Malaysia",
        "Bangladesh",
        "Iran"
      ],
      "answer": "Malaysia",
      "point": "Malaysia — Kuala Lumpur.",
      "typed": "Malaysia",
      "map": {
        "kind": "world",
        "place": "Malaysia",
        "where": "Asia",
        "note": "In South-East Asia, south of Thailand."
      }
    },
    {
      "key": "s4-g127",
      "level": "medium",
      "q": "What is the capital of Singapore?",
      "options": [
        "Kabul",
        "Male",
        "Singapore",
        "Dhaka"
      ],
      "answer": "Singapore",
      "point": "Singapore — Singapore.",
      "typed": "Singapore",
      "map": {
        "kind": "world",
        "place": "Singapore",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g128",
      "level": "hard",
      "q": "Singapore is the capital of which country?",
      "options": [
        "Myanmar",
        "Singapore",
        "Malaysia",
        "Turkey"
      ],
      "answer": "Singapore",
      "point": "Singapore — Singapore.",
      "typed": "Singapore",
      "map": {
        "kind": "world",
        "place": "Singapore",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g129",
      "level": "hard",
      "q": "What is the capital of Vietnam?",
      "options": [
        "Muscat",
        "Hanoi",
        "Kathmandu",
        "Islamabad"
      ],
      "answer": "Hanoi",
      "point": "Vietnam — Hanoi.",
      "typed": "Hanoi",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g130",
      "level": "hard",
      "q": "Hanoi is the capital of which country?",
      "options": [
        "UAE",
        "Myanmar",
        "Yemen",
        "Vietnam"
      ],
      "answer": "Vietnam",
      "point": "Vietnam — Hanoi.",
      "typed": "Vietnam",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "Asia",
        "note": "In Asia."
      }
    }
  ],
  "5": [
    {
      "key": "s5-q1",
      "level": "easy",
      "q": "What is the capital of Kerala?",
      "options": [
        "Thiruvananthapuram",
        "Chennai",
        "Bengaluru",
        "Kochi"
      ],
      "answer": "Thiruvananthapuram",
      "point": "Kerala — Thiruvananthapuram.",
      "hint": "It is our home state, in South India.",
      "map": {
        "kind": "india",
        "place": "Kerala",
        "where": "South India",
        "note": "On the SOUTH-WEST coast of India, on the Arabian Sea."
      },
      "typed": "Thiruvananthapuram"
    },
    {
      "key": "s5-q2",
      "level": "easy",
      "q": "What is the capital of Tamil Nadu?",
      "options": [
        "Chennai",
        "Madurai",
        "Bengaluru",
        "Hyderabad"
      ],
      "answer": "Chennai",
      "point": "Tamil Nadu — Chennai.",
      "hint": "It is the state next to Kerala, on the east.",
      "map": {
        "kind": "india",
        "place": "Tamil Nadu",
        "where": "South India",
        "note": "On the SOUTH-EAST coast of India, next to Kerala."
      },
      "typed": "Chennai"
    },
    {
      "key": "s5-q3",
      "level": "medium",
      "q": "What is the capital of Karnataka?",
      "options": [
        "Bengaluru",
        "Chennai",
        "Mumbai",
        "Panaji"
      ],
      "answer": "Bengaluru",
      "point": "Karnataka — Bengaluru.",
      "hint": "It is the state above Kerala.",
      "map": {
        "kind": "india",
        "place": "Karnataka",
        "where": "South India",
        "note": "In South India, above Kerala, on the west coast."
      },
      "typed": "Bengaluru"
    },
    {
      "key": "s5-q4",
      "level": "medium",
      "q": "What is the capital of Rajasthan?",
      "options": [
        "Jaipur",
        "Lucknow",
        "Bhopal",
        "Patna"
      ],
      "answer": "Jaipur",
      "point": "Rajasthan — Jaipur. The Thar Desert is in Rajasthan.",
      "hint": "It is in the west of India.",
      "map": {
        "kind": "india",
        "place": "Rajasthan",
        "where": "West India",
        "note": "In the WEST of India, next to Pakistan — the Thar Desert is here."
      },
      "typed": "Jaipur"
    },
    {
      "key": "s5-q5",
      "level": "medium",
      "q": "What is the capital of West Bengal?",
      "options": [
        "Kolkata",
        "Patna",
        "Ranchi",
        "Bhubaneswar"
      ],
      "answer": "Kolkata",
      "point": "West Bengal — Kolkata. Kolkata is on the Hooghly river.",
      "hint": "It is in the east of India.",
      "map": {
        "kind": "india",
        "place": "West Bengal",
        "where": "East India",
        "note": "In the EAST of India, on the Bay of Bengal."
      },
      "typed": "Kolkata"
    },
    {
      "key": "s5-q6",
      "level": "medium",
      "q": "What is the capital of Maharashtra?",
      "options": [
        "Mumbai",
        "Pune",
        "Gandhinagar",
        "Bhopal"
      ],
      "answer": "Mumbai",
      "point": "Maharashtra — Mumbai. Mumbai is the largest city in India.",
      "hint": "It is on the west coast.",
      "map": {
        "kind": "india",
        "place": "Maharashtra",
        "where": "West India",
        "note": "On the WEST coast of India, below Gujarat."
      },
      "typed": "Mumbai"
    },
    {
      "key": "s5-q7",
      "level": "medium",
      "q": "What is the capital of Assam?",
      "options": [
        "Dispur",
        "Shillong",
        "Imphal",
        "Kohima"
      ],
      "answer": "Dispur",
      "point": "Assam — Dispur.",
      "hint": "It is in the North-East.",
      "map": {
        "kind": "india",
        "place": "Assam",
        "where": "North-East India",
        "note": "In the NORTH-EAST — the state that joins the 7 sisters to the rest of India."
      },
      "typed": "Dispur"
    },
    {
      "key": "s5-q8",
      "level": "hard",
      "q": "Which state is called the 'Heart of India'?",
      "options": [
        "Madhya Pradesh",
        "Uttar Pradesh",
        "Chhattisgarh",
        "Bihar"
      ],
      "answer": "Madhya Pradesh",
      "point": "Madhya Pradesh is in the very centre — that is why it is called the 'Heart of India'. Its capital is Bhopal.",
      "map": {
        "kind": "india",
        "place": "Madhya Pradesh",
        "where": "Central India",
        "note": "In the very CENTRE of India — the 'Heart of India'."
      },
      "typed": "Madhya Pradesh"
    },
    {
      "key": "s5-q9",
      "level": "hard",
      "q": "Chandigarh is the capital of which TWO states?",
      "options": [
        "Punjab and Haryana",
        "Kerala and Tamil Nadu",
        "Gujarat and Rajasthan",
        "Bihar and Jharkhand"
      ],
      "answer": "Punjab and Haryana",
      "point": "Chandigarh is the capital of two states — Punjab and Haryana — and is also a Union Territory itself.",
      "typed": "Punjab and Haryana"
    },
    {
      "key": "s5-q10",
      "level": "hard",
      "q": "What is the capital of Sikkim?",
      "options": [
        "Gangtok",
        "Itanagar",
        "Aizawl",
        "Agartala"
      ],
      "answer": "Gangtok",
      "point": "Sikkim — Gangtok.",
      "hint": "It is a small state in the North-East, near Nepal.",
      "map": {
        "kind": "india",
        "place": "Sikkim",
        "where": "North-East India",
        "note": "A small state in the NORTH-EAST, near Nepal — Kanchenjunga is here."
      },
      "typed": "Gangtok"
    },
    {
      "key": "s5-g1",
      "level": "medium",
      "q": "What is the capital of Himachal Pradesh?",
      "options": [
        "Amaravati",
        "Shimla",
        "Bengaluru",
        "Agartala"
      ],
      "answer": "Shimla",
      "point": "Himachal Pradesh — Shimla.",
      "typed": "Shimla",
      "map": {
        "kind": "india",
        "place": "Himachal Pradesh",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g2",
      "level": "hard",
      "q": "Shimla is the capital of which state?",
      "options": [
        "Himachal Pradesh",
        "Ladakh",
        "Delhi",
        "Kerala"
      ],
      "answer": "Himachal Pradesh",
      "point": "Himachal Pradesh — Shimla.",
      "typed": "Himachal Pradesh",
      "map": {
        "kind": "india",
        "place": "Himachal Pradesh",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g3",
      "level": "medium",
      "q": "Which region of India is Himachal Pradesh in?",
      "options": [
        "North India",
        "North-East India",
        "West India",
        "East India"
      ],
      "answer": "North India",
      "point": "Himachal Pradesh is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Himachal Pradesh",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g4",
      "level": "medium",
      "q": "What is the capital of Uttarakhand?",
      "options": [
        "Jaipur",
        "Panaji",
        "Dehradun",
        "Patna"
      ],
      "answer": "Dehradun",
      "point": "Uttarakhand — Dehradun.",
      "typed": "Dehradun",
      "map": {
        "kind": "india",
        "place": "Uttarakhand",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g5",
      "level": "hard",
      "q": "Dehradun is the capital of which state?",
      "options": [
        "Tamil Nadu",
        "Madhya Pradesh",
        "Uttarakhand",
        "Punjab"
      ],
      "answer": "Uttarakhand",
      "point": "Uttarakhand — Dehradun.",
      "typed": "Uttarakhand",
      "map": {
        "kind": "india",
        "place": "Uttarakhand",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g6",
      "level": "medium",
      "q": "Which region of India is Uttarakhand in?",
      "options": [
        "North India",
        "South India",
        "Central India",
        "West India"
      ],
      "answer": "North India",
      "point": "Uttarakhand is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Uttarakhand",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g7",
      "level": "medium",
      "q": "What is the capital of Haryana?",
      "options": [
        "Chandigarh",
        "Shimla",
        "Agartala",
        "Kolkata"
      ],
      "answer": "Chandigarh",
      "point": "Haryana — Chandigarh.",
      "typed": "Chandigarh",
      "map": {
        "kind": "india",
        "place": "Haryana",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g8",
      "level": "medium",
      "q": "Which region of India is Haryana in?",
      "options": [
        "West India",
        "North-East India",
        "North India",
        "Central India"
      ],
      "answer": "North India",
      "point": "Haryana is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Haryana",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g9",
      "level": "medium",
      "q": "What is the capital of Punjab?",
      "options": [
        "Chennai",
        "Chandigarh",
        "Bhopal",
        "Thiruvananthapuram"
      ],
      "answer": "Chandigarh",
      "point": "Punjab — Chandigarh.",
      "typed": "Chandigarh",
      "map": {
        "kind": "india",
        "place": "Punjab",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g10",
      "level": "medium",
      "q": "Which region of India is Punjab in?",
      "options": [
        "North-East India",
        "South India",
        "West India",
        "North India"
      ],
      "answer": "North India",
      "point": "Punjab is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Punjab",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g11",
      "level": "easy",
      "q": "What is the capital of Uttar Pradesh?",
      "options": [
        "Lucknow",
        "Bengaluru",
        "Panaji",
        "Raipur"
      ],
      "answer": "Lucknow",
      "point": "Uttar Pradesh — Lucknow.",
      "typed": "Lucknow",
      "map": {
        "kind": "india",
        "place": "Uttar Pradesh",
        "where": "North India",
        "note": "In the north of India — the most populous state."
      }
    },
    {
      "key": "s5-g12",
      "level": "medium",
      "q": "Lucknow is the capital of which state?",
      "options": [
        "Uttar Pradesh",
        "Madhya Pradesh",
        "Himachal Pradesh",
        "Rajasthan"
      ],
      "answer": "Uttar Pradesh",
      "point": "Uttar Pradesh — Lucknow.",
      "typed": "Uttar Pradesh",
      "map": {
        "kind": "india",
        "place": "Uttar Pradesh",
        "where": "North India",
        "note": "In the north of India — the most populous state."
      }
    },
    {
      "key": "s5-g13",
      "level": "medium",
      "q": "Which region of India is Uttar Pradesh in?",
      "options": [
        "East India",
        "North-East India",
        "North India",
        "West India"
      ],
      "answer": "North India",
      "point": "Uttar Pradesh is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Uttar Pradesh",
        "where": "North India",
        "note": "In the north of India — the most populous state."
      }
    },
    {
      "key": "s5-g15",
      "level": "medium",
      "q": "Jaipur is the capital of which state?",
      "options": [
        "Arunachal Pradesh",
        "Jammu and Kashmir",
        "Rajasthan",
        "Karnataka"
      ],
      "answer": "Rajasthan",
      "point": "Rajasthan — Jaipur.",
      "typed": "Rajasthan",
      "map": {
        "kind": "india",
        "place": "Rajasthan",
        "where": "North India",
        "note": "In the west of India, next to Pakistan — the Thar Desert is here."
      }
    },
    {
      "key": "s5-g16",
      "level": "medium",
      "q": "Which region of India is Rajasthan in?",
      "options": [
        "South India",
        "West India",
        "Central India",
        "North India"
      ],
      "answer": "North India",
      "point": "Rajasthan is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Rajasthan",
        "where": "North India",
        "note": "In the west of India, next to Pakistan — the Thar Desert is here."
      }
    },
    {
      "key": "s5-g18",
      "level": "medium",
      "q": "Thiruvananthapuram is the capital of which state?",
      "options": [
        "Andaman and Nicobar Islands",
        "Nagaland",
        "Mizoram",
        "Kerala"
      ],
      "answer": "Kerala",
      "point": "Kerala — Thiruvananthapuram.",
      "typed": "Kerala",
      "map": {
        "kind": "india",
        "place": "Kerala",
        "where": "South India",
        "note": "On the south-west coast of India, on the Arabian Sea."
      }
    },
    {
      "key": "s5-g19",
      "level": "medium",
      "q": "Which region of India is Kerala in?",
      "options": [
        "Central India",
        "North India",
        "East India",
        "South India"
      ],
      "answer": "South India",
      "point": "Kerala is in South India.",
      "typed": "South India",
      "map": {
        "kind": "india",
        "place": "Kerala",
        "where": "South India",
        "note": "On the south-west coast of India, on the Arabian Sea."
      }
    },
    {
      "key": "s5-g21",
      "level": "medium",
      "q": "Chennai is the capital of which state?",
      "options": [
        "Ladakh",
        "Tamil Nadu",
        "Jammu and Kashmir",
        "Odisha"
      ],
      "answer": "Tamil Nadu",
      "point": "Tamil Nadu — Chennai.",
      "typed": "Tamil Nadu",
      "map": {
        "kind": "india",
        "place": "Tamil Nadu",
        "where": "South India",
        "note": "On the south-east coast of India, next to Kerala."
      }
    },
    {
      "key": "s5-g22",
      "level": "medium",
      "q": "Which region of India is Tamil Nadu in?",
      "options": [
        "North-East India",
        "Central India",
        "South India",
        "North India"
      ],
      "answer": "South India",
      "point": "Tamil Nadu is in South India.",
      "typed": "South India",
      "map": {
        "kind": "india",
        "place": "Tamil Nadu",
        "where": "South India",
        "note": "On the south-east coast of India, next to Kerala."
      }
    },
    {
      "key": "s5-g24",
      "level": "medium",
      "q": "Bengaluru is the capital of which state?",
      "options": [
        "Punjab",
        "Karnataka",
        "Jammu and Kashmir",
        "Haryana"
      ],
      "answer": "Karnataka",
      "point": "Karnataka — Bengaluru.",
      "typed": "Karnataka",
      "map": {
        "kind": "india",
        "place": "Karnataka",
        "where": "South India",
        "note": "In South India, above Kerala, on the west coast."
      }
    },
    {
      "key": "s5-g25",
      "level": "medium",
      "q": "Which region of India is Karnataka in?",
      "options": [
        "Central India",
        "North-East India",
        "West India",
        "South India"
      ],
      "answer": "South India",
      "point": "Karnataka is in South India.",
      "typed": "South India",
      "map": {
        "kind": "india",
        "place": "Karnataka",
        "where": "South India",
        "note": "In South India, above Kerala, on the west coast."
      }
    },
    {
      "key": "s5-g26",
      "level": "medium",
      "q": "What is the capital of Andhra Pradesh?",
      "options": [
        "Gandhinagar",
        "Jaipur",
        "Amaravati",
        "Hyderabad"
      ],
      "answer": "Amaravati",
      "point": "Andhra Pradesh — Amaravati.",
      "typed": "Amaravati",
      "map": {
        "kind": "india",
        "place": "Andhra Pradesh",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g27",
      "level": "hard",
      "q": "Amaravati is the capital of which state?",
      "options": [
        "Punjab",
        "Sikkim",
        "Karnataka",
        "Andhra Pradesh"
      ],
      "answer": "Andhra Pradesh",
      "point": "Andhra Pradesh — Amaravati.",
      "typed": "Andhra Pradesh",
      "map": {
        "kind": "india",
        "place": "Andhra Pradesh",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g28",
      "level": "medium",
      "q": "Which region of India is Andhra Pradesh in?",
      "options": [
        "West India",
        "North-East India",
        "East India",
        "South India"
      ],
      "answer": "South India",
      "point": "Andhra Pradesh is in South India.",
      "typed": "South India",
      "map": {
        "kind": "india",
        "place": "Andhra Pradesh",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g29",
      "level": "medium",
      "q": "What is the capital of Telangana?",
      "options": [
        "Amaravati",
        "Gandhinagar",
        "Kohima",
        "Hyderabad"
      ],
      "answer": "Hyderabad",
      "point": "Telangana — Hyderabad.",
      "typed": "Hyderabad",
      "map": {
        "kind": "india",
        "place": "Telangana",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g30",
      "level": "hard",
      "q": "Hyderabad is the capital of which state?",
      "options": [
        "Lakshadweep",
        "Telangana",
        "Sikkim",
        "Gujarat"
      ],
      "answer": "Telangana",
      "point": "Telangana — Hyderabad.",
      "typed": "Telangana",
      "map": {
        "kind": "india",
        "place": "Telangana",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g31",
      "level": "medium",
      "q": "Which region of India is Telangana in?",
      "options": [
        "Central India",
        "North-East India",
        "East India",
        "South India"
      ],
      "answer": "South India",
      "point": "Telangana is in South India.",
      "typed": "South India",
      "map": {
        "kind": "india",
        "place": "Telangana",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g33",
      "level": "medium",
      "q": "Kolkata is the capital of which state?",
      "options": [
        "Tamil Nadu",
        "Chhattisgarh",
        "Lakshadweep",
        "West Bengal"
      ],
      "answer": "West Bengal",
      "point": "West Bengal — Kolkata.",
      "typed": "West Bengal",
      "map": {
        "kind": "india",
        "place": "West Bengal",
        "where": "East India",
        "note": "In the east of India, on the Bay of Bengal."
      }
    },
    {
      "key": "s5-g34",
      "level": "medium",
      "q": "Which region of India is West Bengal in?",
      "options": [
        "West India",
        "South India",
        "Central India",
        "East India"
      ],
      "answer": "East India",
      "point": "West Bengal is in East India.",
      "typed": "East India",
      "map": {
        "kind": "india",
        "place": "West Bengal",
        "where": "East India",
        "note": "In the east of India, on the Bay of Bengal."
      }
    },
    {
      "key": "s5-g35",
      "level": "medium",
      "q": "What is the capital of Bihar?",
      "options": [
        "Patna",
        "Puducherry",
        "Itanagar",
        "Leh"
      ],
      "answer": "Patna",
      "point": "Bihar — Patna.",
      "typed": "Patna",
      "map": {
        "kind": "india",
        "place": "Bihar",
        "where": "East India",
        "note": "In the east of India, next to West Bengal and Uttar Pradesh."
      }
    },
    {
      "key": "s5-g36",
      "level": "hard",
      "q": "Patna is the capital of which state?",
      "options": [
        "Telangana",
        "Haryana",
        "Ladakh",
        "Bihar"
      ],
      "answer": "Bihar",
      "point": "Bihar — Patna.",
      "typed": "Bihar",
      "map": {
        "kind": "india",
        "place": "Bihar",
        "where": "East India",
        "note": "In the east of India, next to West Bengal and Uttar Pradesh."
      }
    },
    {
      "key": "s5-g37",
      "level": "medium",
      "q": "Which region of India is Bihar in?",
      "options": [
        "West India",
        "East India",
        "Central India",
        "South India"
      ],
      "answer": "East India",
      "point": "Bihar is in East India.",
      "typed": "East India",
      "map": {
        "kind": "india",
        "place": "Bihar",
        "where": "East India",
        "note": "In the east of India, next to West Bengal and Uttar Pradesh."
      }
    },
    {
      "key": "s5-g38",
      "level": "medium",
      "q": "What is the capital of Jharkhand?",
      "options": [
        "Ranchi",
        "Amaravati",
        "Imphal",
        "Puducherry"
      ],
      "answer": "Ranchi",
      "point": "Jharkhand — Ranchi.",
      "typed": "Ranchi",
      "map": {
        "kind": "india",
        "place": "Jharkhand",
        "where": "East India",
        "note": "In East India."
      }
    },
    {
      "key": "s5-g39",
      "level": "hard",
      "q": "Ranchi is the capital of which state?",
      "options": [
        "Nagaland",
        "Mizoram",
        "Jharkhand",
        "Odisha"
      ],
      "answer": "Jharkhand",
      "point": "Jharkhand — Ranchi.",
      "typed": "Jharkhand",
      "map": {
        "kind": "india",
        "place": "Jharkhand",
        "where": "East India",
        "note": "In East India."
      }
    },
    {
      "key": "s5-g40",
      "level": "medium",
      "q": "Which region of India is Jharkhand in?",
      "options": [
        "North-East India",
        "East India",
        "North India",
        "West India"
      ],
      "answer": "East India",
      "point": "Jharkhand is in East India.",
      "typed": "East India",
      "map": {
        "kind": "india",
        "place": "Jharkhand",
        "where": "East India",
        "note": "In East India."
      }
    },
    {
      "key": "s5-g41",
      "level": "medium",
      "q": "What is the capital of Odisha?",
      "options": [
        "Bengaluru",
        "Puducherry",
        "Bhubaneswar",
        "Port Blair"
      ],
      "answer": "Bhubaneswar",
      "point": "Odisha — Bhubaneswar.",
      "typed": "Bhubaneswar",
      "map": {
        "kind": "india",
        "place": "Odisha",
        "where": "East India",
        "note": "On the east coast of India, on the Bay of Bengal."
      }
    },
    {
      "key": "s5-g42",
      "level": "hard",
      "q": "Bhubaneswar is the capital of which state?",
      "options": [
        "Uttarakhand",
        "Sikkim",
        "Odisha",
        "Jammu and Kashmir"
      ],
      "answer": "Odisha",
      "point": "Odisha — Bhubaneswar.",
      "typed": "Odisha",
      "map": {
        "kind": "india",
        "place": "Odisha",
        "where": "East India",
        "note": "On the east coast of India, on the Bay of Bengal."
      }
    },
    {
      "key": "s5-g43",
      "level": "medium",
      "q": "Which region of India is Odisha in?",
      "options": [
        "Central India",
        "South India",
        "East India",
        "West India"
      ],
      "answer": "East India",
      "point": "Odisha is in East India.",
      "typed": "East India",
      "map": {
        "kind": "india",
        "place": "Odisha",
        "where": "East India",
        "note": "On the east coast of India, on the Bay of Bengal."
      }
    },
    {
      "key": "s5-g44",
      "level": "easy",
      "q": "What is the capital of Gujarat?",
      "options": [
        "Gandhinagar",
        "Patna",
        "Leh",
        "Kohima"
      ],
      "answer": "Gandhinagar",
      "point": "Gujarat — Gandhinagar.",
      "typed": "Gandhinagar",
      "map": {
        "kind": "india",
        "place": "Gujarat",
        "where": "West India",
        "note": "In the west of India, on the Arabian Sea, north of Maharashtra."
      }
    },
    {
      "key": "s5-g45",
      "level": "medium",
      "q": "Gandhinagar is the capital of which state?",
      "options": [
        "Gujarat",
        "Punjab",
        "Telangana",
        "Rajasthan"
      ],
      "answer": "Gujarat",
      "point": "Gujarat — Gandhinagar.",
      "typed": "Gujarat",
      "map": {
        "kind": "india",
        "place": "Gujarat",
        "where": "West India",
        "note": "In the west of India, on the Arabian Sea, north of Maharashtra."
      }
    },
    {
      "key": "s5-g46",
      "level": "medium",
      "q": "Which region of India is Gujarat in?",
      "options": [
        "North-East India",
        "North India",
        "West India",
        "South India"
      ],
      "answer": "West India",
      "point": "Gujarat is in West India.",
      "typed": "West India",
      "map": {
        "kind": "india",
        "place": "Gujarat",
        "where": "West India",
        "note": "In the west of India, on the Arabian Sea, north of Maharashtra."
      }
    },
    {
      "key": "s5-g48",
      "level": "medium",
      "q": "Mumbai is the capital of which state?",
      "options": [
        "Madhya Pradesh",
        "Puducherry",
        "Maharashtra",
        "Tamil Nadu"
      ],
      "answer": "Maharashtra",
      "point": "Maharashtra — Mumbai.",
      "typed": "Maharashtra",
      "map": {
        "kind": "india",
        "place": "Maharashtra",
        "where": "West India",
        "note": "On the west coast of India, below Gujarat."
      }
    },
    {
      "key": "s5-g49",
      "level": "medium",
      "q": "Which region of India is Maharashtra in?",
      "options": [
        "South India",
        "West India",
        "East India",
        "Central India"
      ],
      "answer": "West India",
      "point": "Maharashtra is in West India.",
      "typed": "West India",
      "map": {
        "kind": "india",
        "place": "Maharashtra",
        "where": "West India",
        "note": "On the west coast of India, below Gujarat."
      }
    },
    {
      "key": "s5-g50",
      "level": "medium",
      "q": "What is the capital of Goa?",
      "options": [
        "Shillong",
        "Shimla",
        "Kohima",
        "Panaji"
      ],
      "answer": "Panaji",
      "point": "Goa — Panaji.",
      "typed": "Panaji",
      "map": {
        "kind": "india",
        "place": "Goa",
        "where": "West India",
        "note": "A small state on the west coast, below Maharashtra."
      }
    },
    {
      "key": "s5-g51",
      "level": "hard",
      "q": "Panaji is the capital of which state?",
      "options": [
        "Goa",
        "Jharkhand",
        "Uttar Pradesh",
        "Himachal Pradesh"
      ],
      "answer": "Goa",
      "point": "Goa — Panaji.",
      "typed": "Goa",
      "map": {
        "kind": "india",
        "place": "Goa",
        "where": "West India",
        "note": "A small state on the west coast, below Maharashtra."
      }
    },
    {
      "key": "s5-g52",
      "level": "medium",
      "q": "Which region of India is Goa in?",
      "options": [
        "East India",
        "North-East India",
        "West India",
        "South India"
      ],
      "answer": "West India",
      "point": "Goa is in West India.",
      "typed": "West India",
      "map": {
        "kind": "india",
        "place": "Goa",
        "where": "West India",
        "note": "A small state on the west coast, below Maharashtra."
      }
    },
    {
      "key": "s5-g53",
      "level": "medium",
      "q": "What is the capital of Madhya Pradesh?",
      "options": [
        "Port Blair",
        "Srinagar",
        "Bhopal",
        "Itanagar"
      ],
      "answer": "Bhopal",
      "point": "Madhya Pradesh — Bhopal.",
      "typed": "Bhopal",
      "map": {
        "kind": "india",
        "place": "Madhya Pradesh",
        "where": "Central India",
        "note": "In the very centre of India — the 'Heart of India'."
      }
    },
    {
      "key": "s5-g54",
      "level": "hard",
      "q": "Bhopal is the capital of which state?",
      "options": [
        "Ladakh",
        "Sikkim",
        "Madhya Pradesh",
        "Rajasthan"
      ],
      "answer": "Madhya Pradesh",
      "point": "Madhya Pradesh — Bhopal.",
      "typed": "Madhya Pradesh",
      "map": {
        "kind": "india",
        "place": "Madhya Pradesh",
        "where": "Central India",
        "note": "In the very centre of India — the 'Heart of India'."
      }
    },
    {
      "key": "s5-g55",
      "level": "medium",
      "q": "Which region of India is Madhya Pradesh in?",
      "options": [
        "North-East India",
        "Central India",
        "North India",
        "South India"
      ],
      "answer": "Central India",
      "point": "Madhya Pradesh is in Central India.",
      "typed": "Central India",
      "map": {
        "kind": "india",
        "place": "Madhya Pradesh",
        "where": "Central India",
        "note": "In the very centre of India — the 'Heart of India'."
      }
    },
    {
      "key": "s5-g56",
      "level": "medium",
      "q": "What is the capital of Chhattisgarh?",
      "options": [
        "Itanagar",
        "Dehradun",
        "New Delhi",
        "Raipur"
      ],
      "answer": "Raipur",
      "point": "Chhattisgarh — Raipur.",
      "typed": "Raipur",
      "map": {
        "kind": "india",
        "place": "Chhattisgarh",
        "where": "Central India",
        "note": "In Central India."
      }
    },
    {
      "key": "s5-g57",
      "level": "hard",
      "q": "Raipur is the capital of which state?",
      "options": [
        "Odisha",
        "Chhattisgarh",
        "Bihar",
        "Uttarakhand"
      ],
      "answer": "Chhattisgarh",
      "point": "Chhattisgarh — Raipur.",
      "typed": "Chhattisgarh",
      "map": {
        "kind": "india",
        "place": "Chhattisgarh",
        "where": "Central India",
        "note": "In Central India."
      }
    },
    {
      "key": "s5-g58",
      "level": "medium",
      "q": "Which region of India is Chhattisgarh in?",
      "options": [
        "North India",
        "West India",
        "North-East India",
        "Central India"
      ],
      "answer": "Central India",
      "point": "Chhattisgarh is in Central India.",
      "typed": "Central India",
      "map": {
        "kind": "india",
        "place": "Chhattisgarh",
        "where": "Central India",
        "note": "In Central India."
      }
    },
    {
      "key": "s5-g60",
      "level": "hard",
      "q": "Dispur is the capital of which state?",
      "options": [
        "Tripura",
        "Arunachal Pradesh",
        "Delhi",
        "Assam"
      ],
      "answer": "Assam",
      "point": "Assam — Dispur.",
      "typed": "Assam",
      "map": {
        "kind": "india",
        "place": "Assam",
        "where": "North-East India",
        "note": "In the north-east — the state that joins the 7 sisters to the rest of India."
      }
    },
    {
      "key": "s5-g61",
      "level": "medium",
      "q": "Which region of India is Assam in?",
      "options": [
        "South India",
        "Central India",
        "North India",
        "North-East India"
      ],
      "answer": "North-East India",
      "point": "Assam is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Assam",
        "where": "North-East India",
        "note": "In the north-east — the state that joins the 7 sisters to the rest of India."
      }
    },
    {
      "key": "s5-g62",
      "level": "hard",
      "q": "What is the capital of Arunachal Pradesh?",
      "options": [
        "Itanagar",
        "Puducherry",
        "Chennai",
        "Raipur"
      ],
      "answer": "Itanagar",
      "point": "Arunachal Pradesh — Itanagar.",
      "typed": "Itanagar",
      "map": {
        "kind": "india",
        "place": "Arunachal Pradesh",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g63",
      "level": "hard",
      "q": "Itanagar is the capital of which state?",
      "options": [
        "Puducherry",
        "Goa",
        "Arunachal Pradesh",
        "Dadra and Nagar Haveli and Daman and Diu"
      ],
      "answer": "Arunachal Pradesh",
      "point": "Arunachal Pradesh — Itanagar.",
      "typed": "Arunachal Pradesh",
      "map": {
        "kind": "india",
        "place": "Arunachal Pradesh",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g64",
      "level": "medium",
      "q": "Which region of India is Arunachal Pradesh in?",
      "options": [
        "Central India",
        "North-East India",
        "North India",
        "East India"
      ],
      "answer": "North-East India",
      "point": "Arunachal Pradesh is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Arunachal Pradesh",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g65",
      "level": "hard",
      "q": "What is the capital of Manipur?",
      "options": [
        "Gandhinagar",
        "Imphal",
        "Hyderabad",
        "Chennai"
      ],
      "answer": "Imphal",
      "point": "Manipur — Imphal.",
      "typed": "Imphal",
      "map": {
        "kind": "india",
        "place": "Manipur",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g66",
      "level": "hard",
      "q": "Imphal is the capital of which state?",
      "options": [
        "Uttarakhand",
        "Gujarat",
        "Manipur",
        "Arunachal Pradesh"
      ],
      "answer": "Manipur",
      "point": "Manipur — Imphal.",
      "typed": "Manipur",
      "map": {
        "kind": "india",
        "place": "Manipur",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g67",
      "level": "medium",
      "q": "Which region of India is Manipur in?",
      "options": [
        "South India",
        "Central India",
        "North India",
        "North-East India"
      ],
      "answer": "North-East India",
      "point": "Manipur is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Manipur",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g68",
      "level": "hard",
      "q": "What is the capital of Meghalaya?",
      "options": [
        "Kohima",
        "Shillong",
        "Hyderabad",
        "Patna"
      ],
      "answer": "Shillong",
      "point": "Meghalaya — Shillong.",
      "typed": "Shillong",
      "map": {
        "kind": "india",
        "place": "Meghalaya",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g69",
      "level": "hard",
      "q": "Shillong is the capital of which state?",
      "options": [
        "Mizoram",
        "Bihar",
        "Uttarakhand",
        "Meghalaya"
      ],
      "answer": "Meghalaya",
      "point": "Meghalaya — Shillong.",
      "typed": "Meghalaya",
      "map": {
        "kind": "india",
        "place": "Meghalaya",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g70",
      "level": "medium",
      "q": "Which region of India is Meghalaya in?",
      "options": [
        "North-East India",
        "South India",
        "North India",
        "Central India"
      ],
      "answer": "North-East India",
      "point": "Meghalaya is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Meghalaya",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g71",
      "level": "hard",
      "q": "What is the capital of Mizoram?",
      "options": [
        "Ranchi",
        "Aizawl",
        "Bhopal",
        "Jaipur"
      ],
      "answer": "Aizawl",
      "point": "Mizoram — Aizawl.",
      "typed": "Aizawl",
      "map": {
        "kind": "india",
        "place": "Mizoram",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g72",
      "level": "hard",
      "q": "Aizawl is the capital of which state?",
      "options": [
        "Rajasthan",
        "Madhya Pradesh",
        "Uttar Pradesh",
        "Mizoram"
      ],
      "answer": "Mizoram",
      "point": "Mizoram — Aizawl.",
      "typed": "Mizoram",
      "map": {
        "kind": "india",
        "place": "Mizoram",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g73",
      "level": "medium",
      "q": "Which region of India is Mizoram in?",
      "options": [
        "North-East India",
        "East India",
        "West India",
        "Central India"
      ],
      "answer": "North-East India",
      "point": "Mizoram is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Mizoram",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g74",
      "level": "hard",
      "q": "What is the capital of Nagaland?",
      "options": [
        "Shillong",
        "Kohima",
        "Srinagar",
        "Agartala"
      ],
      "answer": "Kohima",
      "point": "Nagaland — Kohima.",
      "typed": "Kohima",
      "map": {
        "kind": "india",
        "place": "Nagaland",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g75",
      "level": "hard",
      "q": "Kohima is the capital of which state?",
      "options": [
        "Puducherry",
        "Goa",
        "Tamil Nadu",
        "Nagaland"
      ],
      "answer": "Nagaland",
      "point": "Nagaland — Kohima.",
      "typed": "Nagaland",
      "map": {
        "kind": "india",
        "place": "Nagaland",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g76",
      "level": "medium",
      "q": "Which region of India is Nagaland in?",
      "options": [
        "South India",
        "Central India",
        "North India",
        "North-East India"
      ],
      "answer": "North-East India",
      "point": "Nagaland is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Nagaland",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g77",
      "level": "hard",
      "q": "What is the capital of Tripura?",
      "options": [
        "Kohima",
        "Hyderabad",
        "Shillong",
        "Agartala"
      ],
      "answer": "Agartala",
      "point": "Tripura — Agartala.",
      "typed": "Agartala",
      "map": {
        "kind": "india",
        "place": "Tripura",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g78",
      "level": "hard",
      "q": "Agartala is the capital of which state?",
      "options": [
        "Arunachal Pradesh",
        "Tripura",
        "Kerala",
        "Chhattisgarh"
      ],
      "answer": "Tripura",
      "point": "Tripura — Agartala.",
      "typed": "Tripura",
      "map": {
        "kind": "india",
        "place": "Tripura",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g79",
      "level": "medium",
      "q": "Which region of India is Tripura in?",
      "options": [
        "North-East India",
        "Central India",
        "North India",
        "South India"
      ],
      "answer": "North-East India",
      "point": "Tripura is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Tripura",
        "where": "North-East India",
        "note": "In North-East India."
      }
    },
    {
      "key": "s5-g81",
      "level": "hard",
      "q": "Gangtok is the capital of which state?",
      "options": [
        "Uttar Pradesh",
        "Sikkim",
        "Manipur",
        "Uttarakhand"
      ],
      "answer": "Sikkim",
      "point": "Sikkim — Gangtok.",
      "typed": "Sikkim",
      "map": {
        "kind": "india",
        "place": "Sikkim",
        "where": "North-East India",
        "note": "A small state in the north-east, near Nepal — Kanchenjunga is here."
      }
    },
    {
      "key": "s5-g82",
      "level": "medium",
      "q": "Which region of India is Sikkim in?",
      "options": [
        "West India",
        "North-East India",
        "East India",
        "North India"
      ],
      "answer": "North-East India",
      "point": "Sikkim is in North-East India.",
      "typed": "North-East India",
      "map": {
        "kind": "india",
        "place": "Sikkim",
        "where": "North-East India",
        "note": "A small state in the north-east, near Nepal — Kanchenjunga is here."
      }
    },
    {
      "key": "s5-g83",
      "level": "hard",
      "q": "What is the capital of Andaman and Nicobar Islands?",
      "options": [
        "Patna",
        "Gangtok",
        "Port Blair",
        "Aizawl"
      ],
      "answer": "Port Blair",
      "point": "Andaman and Nicobar Islands — Port Blair.",
      "typed": "Port Blair",
      "map": {
        "kind": "india",
        "place": "Andaman and Nicobar Islands",
        "where": "East India",
        "note": "In East India."
      }
    },
    {
      "key": "s5-g84",
      "level": "hard",
      "q": "Port Blair is the capital of which state?",
      "options": [
        "Tripura",
        "Andaman and Nicobar Islands",
        "Jammu and Kashmir",
        "Arunachal Pradesh"
      ],
      "answer": "Andaman and Nicobar Islands",
      "point": "Andaman and Nicobar Islands — Port Blair.",
      "typed": "Andaman and Nicobar Islands",
      "map": {
        "kind": "india",
        "place": "Andaman and Nicobar Islands",
        "where": "East India",
        "note": "In East India."
      }
    },
    {
      "key": "s5-g85",
      "level": "medium",
      "q": "Which region of India is Andaman and Nicobar Islands in?",
      "options": [
        "North India",
        "South India",
        "East India",
        "Central India"
      ],
      "answer": "East India",
      "point": "Andaman and Nicobar Islands is in East India.",
      "typed": "East India",
      "map": {
        "kind": "india",
        "place": "Andaman and Nicobar Islands",
        "where": "East India",
        "note": "In East India."
      }
    },
    {
      "key": "s5-g86",
      "level": "medium",
      "q": "What is the capital of Chandigarh?",
      "options": [
        "Chennai",
        "Amaravati",
        "Mumbai",
        "Chandigarh"
      ],
      "answer": "Chandigarh",
      "point": "Chandigarh is the capital of two states — Punjab and Haryana — and is also a Union Territory itself.",
      "typed": "Chandigarh",
      "map": {
        "kind": "india",
        "place": "Chandigarh",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g87",
      "level": "medium",
      "q": "Which region of India is Chandigarh in?",
      "options": [
        "Central India",
        "North India",
        "East India",
        "West India"
      ],
      "answer": "North India",
      "point": "Chandigarh is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Chandigarh",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g88",
      "level": "hard",
      "q": "What is the capital of Dadra and Nagar Haveli and Daman and Diu?",
      "options": [
        "Gangtok",
        "Lucknow",
        "Daman",
        "Chandigarh"
      ],
      "answer": "Daman",
      "point": "Dadra and Nagar Haveli and Daman and Diu — Daman.",
      "typed": "Daman",
      "map": {
        "kind": "india",
        "place": "Dadra and Nagar Haveli and Daman and Diu",
        "where": "West India",
        "note": "In West India."
      }
    },
    {
      "key": "s5-g89",
      "level": "hard",
      "q": "Daman is the capital of which state?",
      "options": [
        "Dadra and Nagar Haveli and Daman and Diu",
        "Uttarakhand",
        "Manipur",
        "Meghalaya"
      ],
      "answer": "Dadra and Nagar Haveli and Daman and Diu",
      "point": "Dadra and Nagar Haveli and Daman and Diu — Daman.",
      "typed": "Dadra and Nagar Haveli and Daman and Diu",
      "map": {
        "kind": "india",
        "place": "Dadra and Nagar Haveli and Daman and Diu",
        "where": "West India",
        "note": "In West India."
      }
    },
    {
      "key": "s5-g90",
      "level": "medium",
      "q": "Which region of India is Dadra and Nagar Haveli and Daman and Diu in?",
      "options": [
        "Central India",
        "South India",
        "West India",
        "North India"
      ],
      "answer": "West India",
      "point": "Dadra and Nagar Haveli and Daman and Diu is in West India.",
      "typed": "West India",
      "map": {
        "kind": "india",
        "place": "Dadra and Nagar Haveli and Daman and Diu",
        "where": "West India",
        "note": "In West India."
      }
    },
    {
      "key": "s5-g91",
      "level": "easy",
      "q": "What is the capital of Delhi?",
      "options": [
        "Kolkata",
        "New Delhi",
        "Amaravati",
        "Hyderabad"
      ],
      "answer": "New Delhi",
      "point": "Delhi — New Delhi.",
      "typed": "New Delhi",
      "map": {
        "kind": "india",
        "place": "Delhi",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g92",
      "level": "medium",
      "q": "New Delhi is the capital of which state?",
      "options": [
        "Rajasthan",
        "Jammu and Kashmir",
        "Mizoram",
        "Delhi"
      ],
      "answer": "Delhi",
      "point": "Delhi — New Delhi.",
      "typed": "Delhi",
      "map": {
        "kind": "india",
        "place": "Delhi",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g93",
      "level": "medium",
      "q": "Which region of India is Delhi in?",
      "options": [
        "North India",
        "Central India",
        "West India",
        "South India"
      ],
      "answer": "North India",
      "point": "Delhi is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Delhi",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g94",
      "level": "medium",
      "q": "What is the capital of Jammu and Kashmir?",
      "options": [
        "Jaipur",
        "Srinagar",
        "Port Blair",
        "Bhopal"
      ],
      "answer": "Srinagar",
      "point": "Jammu and Kashmir — Srinagar (summer) / Jammu (winter).",
      "typed": "Srinagar",
      "accept": [
        "jammu"
      ],
      "map": {
        "kind": "india",
        "place": "Jammu and Kashmir",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g95",
      "level": "hard",
      "q": "Srinagar is the capital of which state?",
      "options": [
        "Karnataka",
        "Assam",
        "Jammu and Kashmir",
        "Mizoram"
      ],
      "answer": "Jammu and Kashmir",
      "point": "Jammu and Kashmir — Srinagar (summer) / Jammu (winter).",
      "typed": "Jammu and Kashmir",
      "map": {
        "kind": "india",
        "place": "Jammu and Kashmir",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g96",
      "level": "medium",
      "q": "Which region of India is Jammu and Kashmir in?",
      "options": [
        "East India",
        "North India",
        "North-East India",
        "Central India"
      ],
      "answer": "North India",
      "point": "Jammu and Kashmir is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Jammu and Kashmir",
        "where": "North India",
        "note": "In North India."
      }
    },
    {
      "key": "s5-g97",
      "level": "medium",
      "q": "What is the capital of Ladakh?",
      "options": [
        "Imphal",
        "Leh",
        "Chennai",
        "Thiruvananthapuram"
      ],
      "answer": "Leh",
      "point": "Ladakh — Leh.",
      "typed": "Leh",
      "map": {
        "kind": "india",
        "place": "Ladakh",
        "where": "North India",
        "note": "In the far north, in the Himalayas."
      }
    },
    {
      "key": "s5-g98",
      "level": "hard",
      "q": "Leh is the capital of which state?",
      "options": [
        "Ladakh",
        "Manipur",
        "Assam",
        "Delhi"
      ],
      "answer": "Ladakh",
      "point": "Ladakh — Leh.",
      "typed": "Ladakh",
      "map": {
        "kind": "india",
        "place": "Ladakh",
        "where": "North India",
        "note": "In the far north, in the Himalayas."
      }
    },
    {
      "key": "s5-g99",
      "level": "medium",
      "q": "Which region of India is Ladakh in?",
      "options": [
        "Central India",
        "North India",
        "East India",
        "West India"
      ],
      "answer": "North India",
      "point": "Ladakh is in North India.",
      "typed": "North India",
      "map": {
        "kind": "india",
        "place": "Ladakh",
        "where": "North India",
        "note": "In the far north, in the Himalayas."
      }
    },
    {
      "key": "s5-g100",
      "level": "hard",
      "q": "What is the capital of Lakshadweep?",
      "options": [
        "Puducherry",
        "Kavaratti",
        "Daman",
        "Dehradun"
      ],
      "answer": "Kavaratti",
      "point": "Lakshadweep — Kavaratti.",
      "typed": "Kavaratti",
      "map": {
        "kind": "india",
        "place": "Lakshadweep",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g101",
      "level": "hard",
      "q": "Kavaratti is the capital of which state?",
      "options": [
        "Tripura",
        "Lakshadweep",
        "Delhi",
        "Andaman and Nicobar Islands"
      ],
      "answer": "Lakshadweep",
      "point": "Lakshadweep — Kavaratti.",
      "typed": "Lakshadweep",
      "map": {
        "kind": "india",
        "place": "Lakshadweep",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g102",
      "level": "medium",
      "q": "Which region of India is Lakshadweep in?",
      "options": [
        "East India",
        "South India",
        "North India",
        "Central India"
      ],
      "answer": "South India",
      "point": "Lakshadweep is in South India.",
      "typed": "South India",
      "map": {
        "kind": "india",
        "place": "Lakshadweep",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g103",
      "level": "medium",
      "q": "What is the capital of Puducherry?",
      "options": [
        "Agartala",
        "Amaravati",
        "Puducherry",
        "Bengaluru"
      ],
      "answer": "Puducherry",
      "point": "Puducherry — Puducherry.",
      "typed": "Puducherry",
      "map": {
        "kind": "india",
        "place": "Puducherry",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g104",
      "level": "hard",
      "q": "Puducherry is the capital of which state?",
      "options": [
        "Punjab",
        "West Bengal",
        "Meghalaya",
        "Puducherry"
      ],
      "answer": "Puducherry",
      "point": "Puducherry — Puducherry.",
      "typed": "Puducherry",
      "map": {
        "kind": "india",
        "place": "Puducherry",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s5-g105",
      "level": "medium",
      "q": "Which region of India is Puducherry in?",
      "options": [
        "North-East India",
        "South India",
        "Central India",
        "West India"
      ],
      "answer": "South India",
      "point": "Puducherry is in South India.",
      "typed": "South India",
      "map": {
        "kind": "india",
        "place": "Puducherry",
        "where": "South India",
        "note": "In South India."
      }
    }
  ],
  "6": [
    {
      "key": "s6-q1",
      "level": "easy",
      "q": "What is the LONGEST river of India?",
      "options": [
        "Ganga",
        "Yamuna",
        "Kaveri",
        "Narmada"
      ],
      "answer": "Ganga",
      "point": "The Ganga is the longest river of India.",
      "typed": "Ganga"
    },
    {
      "key": "s6-q2",
      "level": "medium",
      "q": "The Ganga flows in which direction?",
      "options": [
        "East, into the Bay of Bengal",
        "West, into the Arabian Sea",
        "North, into the Himalayas",
        "South, into the Indian Ocean"
      ],
      "answer": "East, into the Bay of Bengal",
      "point": "The Ganga flows east into the Bay of Bengal.",
      "hint": "It ends in the sea on the east side.",
      "typed": "East, into the Bay of Bengal",
      "accept": [
        "east"
      ]
    },
    {
      "key": "s6-q3",
      "level": "easy",
      "q": "Which mountain range is in the north of India?",
      "options": [
        "The Himalayas",
        "The Western Ghats",
        "The Eastern Ghats",
        "The Thar Desert"
      ],
      "answer": "The Himalayas",
      "point": "The Himalayas are in the north — the highest mountains in the world.",
      "hint": "Mount Everest is in this range.",
      "map": {
        "kind": "india",
        "place": "The Himalayas",
        "where": "North India",
        "note": "Across the NORTH of India, on the border with Nepal and China."
      },
      "typed": "The Himalayas",
      "accept": [
        "himalayas"
      ]
    },
    {
      "key": "s6-q4",
      "level": "medium",
      "q": "What is the HIGHEST peak in India?",
      "options": [
        "Kanchenjunga",
        "Mount Everest",
        "Kanyakumari",
        "Thar Desert"
      ],
      "answer": "Kanchenjunga",
      "point": "Kanchenjunga (8,586 m) in Sikkim is the highest peak in India. Mount Everest (8,849 m) is in Nepal.",
      "hint": "It is in Sikkim.",
      "typed": "Kanchenjunga"
    },
    {
      "key": "s6-q5",
      "level": "medium",
      "q": "Mount Everest (8,849 m) is in which country?",
      "options": [
        "Nepal",
        "India",
        "Pakistan",
        "Bhutan"
      ],
      "answer": "Nepal",
      "point": "Mount Everest (8,849 m) is in Nepal, on the Nepal–China border.",
      "typed": "Nepal"
    },
    {
      "key": "s6-q6",
      "level": "easy",
      "q": "Which desert is in Rajasthan, in the west of India?",
      "options": [
        "Thar Desert",
        "Sahara Desert",
        "Arabian Sea",
        "Western Ghats"
      ],
      "answer": "Thar Desert",
      "point": "The Thar Desert is in Rajasthan, in the west of India.",
      "hint": "It has the same name as the state it is in — no, think: Rajasthan's desert.",
      "map": {
        "kind": "india",
        "place": "Thar Desert",
        "where": "West India (Rajasthan)",
        "note": "In the WEST, in Rajasthan, next to Pakistan."
      },
      "typed": "Thar Desert"
    },
    {
      "key": "s6-q7",
      "level": "medium",
      "q": "What is the southern tip of India called?",
      "options": [
        "Kanyakumari",
        "Kochi",
        "Chennai",
        "Port Blair"
      ],
      "answer": "Kanyakumari",
      "point": "Kanyakumari (Tamil Nadu) is the southern tip of India — where 3 seas meet.",
      "hint": "It is in Tamil Nadu.",
      "map": {
        "kind": "india",
        "place": "Kanyakumari",
        "where": "South India (Tamil Nadu)",
        "note": "The very BOTTOM tip of India, in Tamil Nadu."
      },
      "typed": "Kanyakumari"
    },
    {
      "key": "s6-q8",
      "level": "medium",
      "q": "Which mountain range is on the WEST coast of India?",
      "options": [
        "Western Ghats",
        "Eastern Ghats",
        "The Himalayas",
        "The Thar Desert"
      ],
      "answer": "Western Ghats",
      "point": "The Western Ghats are on the west coast; the Eastern Ghats are on the east coast.",
      "typed": "Western Ghats"
    },
    {
      "key": "s6-q9",
      "level": "hard",
      "q": "Which of these countries does NOT share a land border with India?",
      "options": [
        "Thailand",
        "Nepal",
        "Bhutan",
        "Bangladesh"
      ],
      "answer": "Thailand",
      "point": "India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan. Thailand is NOT one of them.",
      "typed": "Thailand"
    },
    {
      "key": "s6-q10",
      "level": "hard",
      "q": "The Yamuna, Brahmaputra, Godavari and Krishna are all rivers of which country?",
      "options": [
        "India",
        "Egypt",
        "Brazil",
        "China"
      ],
      "answer": "India",
      "point": "Yamuna, Brahmaputra, Godavari, Krishna, Kaveri, Narmada, Tapti and Indus are great rivers of India.",
      "typed": "India"
    },
    {
      "key": "s6-g-neigh-pakistan",
      "level": "easy",
      "q": "Which of these is a land neighbour of India?",
      "options": [
        "Japan",
        "Pakistan",
        "Vietnam",
        "Malaysia"
      ],
      "answer": "Pakistan",
      "point": "Pakistan is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.",
      "typed": "Pakistan",
      "map": {
        "kind": "world",
        "place": "Pakistan",
        "where": "South Asia",
        "note": "In South Asia, west of India."
      }
    },
    {
      "key": "s6-g-neigh-nepal",
      "level": "easy",
      "q": "Which of these is a land neighbour of India?",
      "options": [
        "Vietnam",
        "Nepal",
        "Thailand",
        "Japan"
      ],
      "answer": "Nepal",
      "point": "Nepal is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.",
      "typed": "Nepal",
      "map": {
        "kind": "world",
        "place": "Nepal",
        "where": "South Asia",
        "note": "North of India, in the Himalayas — Mount Everest is here."
      }
    },
    {
      "key": "s6-g-neigh-bangladesh",
      "level": "easy",
      "q": "Which of these is a land neighbour of India?",
      "options": [
        "Bangladesh",
        "Thailand",
        "Malaysia",
        "Japan"
      ],
      "answer": "Bangladesh",
      "point": "Bangladesh is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.",
      "typed": "Bangladesh",
      "map": {
        "kind": "world",
        "place": "Bangladesh",
        "where": "South Asia",
        "note": "In South Asia, east of India."
      }
    },
    {
      "key": "s6-g-island",
      "level": "medium",
      "q": "Which country is India's island neighbour?",
      "options": [
        "Sri Lanka",
        "Myanmar",
        "Thailand",
        "Maldives"
      ],
      "answer": "Sri Lanka",
      "point": "Island neighbour: Sri Lanka (across the Palk Strait).",
      "typed": "Sri Lanka",
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "South Asia",
        "note": "A small teardrop island just below India, in the Indian Ocean."
      }
    },
    {
      "key": "s6-g-narmada",
      "level": "medium",
      "q": "Which of these is a great river of India?",
      "options": [
        "Nile",
        "Amazon",
        "Narmada",
        "Thames"
      ],
      "answer": "Narmada",
      "point": "Narmada is a great river of India. The great rivers are Ganga, Yamuna, Brahmaputra, Godavari, Krishna, Kaveri, Narmada, Tapti and Indus.",
      "typed": "Narmada"
    },
    {
      "key": "s6-g-ganga-sea",
      "level": "medium",
      "q": "The Ganga ends in which sea?",
      "options": [
        "Arabian Sea",
        "Mediterranean Sea",
        "Indian Ocean",
        "Bay of Bengal"
      ],
      "answer": "Bay of Bengal",
      "point": "The Ganga flows east into the Bay of Bengal.",
      "typed": "Bay of Bengal",
      "map": {
        "kind": "india",
        "place": "Bay of Bengal",
        "where": "East coast of India",
        "note": "The sea on the east side of India, next to West Bengal and Odisha."
      }
    },
    {
      "key": "s6-g-everest-h",
      "level": "hard",
      "q": "How high is Mount Everest?",
      "options": [
        "5,000 m",
        "6,650 m",
        "8,586 m",
        "8,849 m"
      ],
      "answer": "8,849 m",
      "point": "Mount Everest (8,849 m) is the highest mountain in the world.",
      "typed": "8,849 m",
      "map": {
        "kind": "world",
        "place": "Mount Everest",
        "where": "Nepal / China",
        "note": "On the Nepal–China border, in the Himalayas."
      }
    },
    {
      "key": "s6-g-kanch-h",
      "level": "hard",
      "q": "How high is Kanchenjunga?",
      "options": [
        "8,586 m",
        "5,000 m",
        "6,650 m",
        "8,849 m"
      ],
      "answer": "8,586 m",
      "point": "Kanchenjunga (8,586 m) in Sikkim is the highest peak in India.",
      "typed": "8,586 m",
      "map": {
        "kind": "india",
        "place": "Kanchenjunga",
        "where": "Sikkim",
        "note": "In Sikkim, in the north-east — the highest peak in India."
      }
    },
    {
      "key": "s6-g-kanch-state",
      "level": "medium",
      "q": "Kanchenjunga is in which state?",
      "options": [
        "Rajasthan",
        "Kerala",
        "Assam",
        "Sikkim"
      ],
      "answer": "Sikkim",
      "point": "Kanchenjunga (8,586 m) in Sikkim is the highest peak in India.",
      "typed": "Sikkim",
      "map": {
        "kind": "india",
        "place": "Sikkim",
        "where": "North-East India",
        "note": "A small state in the north-east, near Nepal — Kanchenjunga is here."
      }
    },
    {
      "key": "s6-g-east-ghats",
      "level": "medium",
      "q": "Which mountain range is on the EAST coast of India?",
      "options": [
        "The Thar Desert",
        "Western Ghats",
        "The Himalayas",
        "Eastern Ghats"
      ],
      "answer": "Eastern Ghats",
      "point": "The Western Ghats are on the west coast; the Eastern Ghats are on the east coast.",
      "typed": "Eastern Ghats"
    },
    {
      "key": "s6-g-highest-range",
      "level": "hard",
      "q": "Which is the HIGHEST mountain range in the world?",
      "options": [
        "Andes",
        "The Himalayas",
        "Western Ghats",
        "Eastern Ghats"
      ],
      "answer": "The Himalayas",
      "point": "The Himalayas are in the north — the highest mountains in the world.",
      "typed": "The Himalayas",
      "accept": [
        "himalayas"
      ],
      "map": {
        "kind": "india",
        "place": "The Himalayas",
        "where": "North India",
        "note": "Across the north of India, on the border with Nepal and China."
      }
    },
    {
      "key": "s6-g-thar-state",
      "level": "medium",
      "q": "The Thar Desert is in which state?",
      "options": [
        "Madhya Pradesh",
        "Gujarat",
        "Rajasthan",
        "Uttar Pradesh"
      ],
      "answer": "Rajasthan",
      "point": "The Thar Desert is in Rajasthan, in the west of India.",
      "typed": "Rajasthan",
      "map": {
        "kind": "india",
        "place": "Thar Desert",
        "where": "West India (Rajasthan)",
        "note": "In the west, in Rajasthan, next to Pakistan."
      }
    },
    {
      "key": "s6-g-three-seas",
      "level": "hard",
      "q": "Where do the Arabian Sea, the Bay of Bengal and the Indian Ocean meet?",
      "options": [
        "Chennai",
        "Port Blair",
        "Kanyakumari",
        "Kochi"
      ],
      "answer": "Kanyakumari",
      "point": "Kanyakumari (Tamil Nadu) is the southern tip of India — where 3 seas meet.",
      "typed": "Kanyakumari",
      "map": {
        "kind": "india",
        "place": "Kanyakumari",
        "where": "South India (Tamil Nadu)",
        "note": "The very bottom tip of India, in Tamil Nadu."
      }
    }
  ],
  "7": [
    {
      "key": "s7-q1",
      "level": "easy",
      "q": "In which country is Makkah?",
      "options": [
        "Saudi Arabia",
        "Egypt",
        "Iraq",
        "Turkey"
      ],
      "answer": "Saudi Arabia",
      "point": "Makkah is in Saudi Arabia. The Ka'ba is there — the Qibla for Muslims.",
      "hint": "Madinah is in the same country.",
      "map": {
        "kind": "world",
        "place": "Makkah",
        "where": "Saudi Arabia",
        "note": "In Saudi Arabia, on the western side, near the Red Sea."
      },
      "typed": "Saudi Arabia"
    },
    {
      "key": "s7-q2",
      "level": "easy",
      "q": "In which country is Madinah?",
      "options": [
        "Saudi Arabia",
        "Palestine",
        "Syria",
        "Morocco"
      ],
      "answer": "Saudi Arabia",
      "point": "Madinah is in Saudi Arabia. Masjid an-Nabawi is there — the Prophet's city (Hijrah).",
      "hint": "Makkah is in the same country.",
      "map": {
        "kind": "world",
        "place": "Madinah",
        "where": "Saudi Arabia",
        "note": "In Saudi Arabia, north of Makkah."
      },
      "typed": "Saudi Arabia"
    },
    {
      "key": "s7-q3",
      "level": "medium",
      "q": "Masjid al-Aqsa is in which city?",
      "options": [
        "Jerusalem",
        "Makkah",
        "Cairo",
        "Baghdad"
      ],
      "answer": "Jerusalem",
      "point": "Jerusalem (Bayt al-Maqdis) in Palestine — Masjid al-Aqsa, the first Qibla.",
      "hint": "It is in Palestine.",
      "map": {
        "kind": "world",
        "place": "Jerusalem",
        "where": "Palestine",
        "note": "In Palestine, on the east side of the Mediterranean Sea."
      },
      "typed": "Jerusalem"
    },
    {
      "key": "s7-q4",
      "level": "medium",
      "q": "Cairo, the capital of Egypt, is on which river?",
      "options": [
        "Nile",
        "Ganga",
        "Amazon",
        "Indus"
      ],
      "answer": "Nile",
      "point": "Cairo is the capital of Egypt, on the river Nile. Al-Azhar is in Cairo.",
      "hint": "It is the longest river in the world.",
      "map": {
        "kind": "world",
        "place": "Cairo",
        "where": "Egypt",
        "note": "In Egypt, on the river Nile, near the Mediterranean Sea."
      },
      "typed": "Nile"
    },
    {
      "key": "s7-q5",
      "level": "medium",
      "q": "Baghdad is the capital of which country?",
      "options": [
        "Iraq",
        "Iran",
        "Syria",
        "Turkey"
      ],
      "answer": "Iraq",
      "point": "Baghdad is the capital of Iraq — the old Abbasid capital.",
      "hint": "It is in the Middle East.",
      "map": {
        "kind": "world",
        "place": "Baghdad",
        "where": "Iraq",
        "note": "In Iraq, in the Middle East, east of Syria."
      },
      "typed": "Iraq"
    },
    {
      "key": "s7-q6",
      "level": "medium",
      "q": "Damascus is the capital of which country?",
      "options": [
        "Syria",
        "Iraq",
        "Jordan",
        "Lebanon"
      ],
      "answer": "Syria",
      "point": "Damascus is the capital of Syria — one of the oldest cities in the world.",
      "hint": "It is next to Iraq and Turkey.",
      "map": {
        "kind": "world",
        "place": "Damascus",
        "where": "Syria",
        "note": "In Syria, in the Middle East, next to Turkey and Iraq."
      },
      "typed": "Syria"
    },
    {
      "key": "s7-q7",
      "level": "medium",
      "q": "Istanbul is in which country?",
      "options": [
        "Turkey",
        "Egypt",
        "Iraq",
        "Iran"
      ],
      "answer": "Turkey",
      "point": "Istanbul, Turkey — the old Ottoman capital, on the Bosphorus.",
      "hint": "Its capital is Ankara.",
      "map": {
        "kind": "world",
        "place": "Istanbul",
        "where": "Turkey",
        "note": "In Turkey, between Europe and Asia."
      },
      "typed": "Turkey"
    },
    {
      "key": "s7-q8",
      "level": "hard",
      "q": "Karbala — where Imam Hussain (RA) was martyred — is in which country?",
      "options": [
        "Iraq",
        "Saudi Arabia",
        "Iran",
        "Syria"
      ],
      "answer": "Iraq",
      "point": "Karbala is in Iraq — where Imam Hussain (RA) was martyred.",
      "hint": "Baghdad is in the same country.",
      "map": {
        "kind": "world",
        "place": "Karbala",
        "where": "Iraq",
        "note": "In Iraq, south of Baghdad."
      },
      "typed": "Iraq"
    },
    {
      "key": "s7-q9",
      "level": "hard",
      "q": "Najaf — the resting place of Ali ibn Abi Talib (RA) — is in which country?",
      "options": [
        "Iraq",
        "Egypt",
        "Turkey",
        "Palestine"
      ],
      "answer": "Iraq",
      "point": "Najaf is in Iraq — the resting place of Ali ibn Abi Talib (RA).",
      "hint": "Karbala is in the same country.",
      "map": {
        "kind": "world",
        "place": "Najaf",
        "where": "Iraq",
        "note": "In Iraq, south of Baghdad, near Karbala."
      },
      "typed": "Iraq"
    },
    {
      "key": "s7-q10",
      "level": "hard",
      "q": "Fez and Cordoba were famous old centres of Islamic learning. In which countries are they?",
      "options": [
        "Morocco and Spain",
        "Egypt and Iraq",
        "Turkey and Syria",
        "India and Pakistan"
      ],
      "answer": "Morocco and Spain",
      "point": "Fez is in Morocco and Cordoba is in Spain — famous old centres of Islamic learning.",
      "typed": "Morocco and Spain"
    },
    {
      "key": "s7-g1",
      "level": "medium",
      "q": "Which holy place is in Palestine?",
      "options": [
        "Cairo",
        "Baghdad",
        "Jerusalem",
        "Makkah"
      ],
      "answer": "Jerusalem",
      "point": "Jerusalem (Bayt al-Maqdis) in Palestine — Masjid al-Aqsa, the first Qibla.",
      "typed": "Jerusalem",
      "map": {
        "kind": "world",
        "place": "Jerusalem",
        "where": "Palestine",
        "note": "In Palestine, on the east side of the Mediterranean Sea."
      }
    },
    {
      "key": "s7-g2",
      "level": "easy",
      "q": "Which holy place is in Saudi Arabia and is the Qibla?",
      "options": [
        "Jerusalem",
        "Makkah",
        "Madinah",
        "Cairo"
      ],
      "answer": "Makkah",
      "point": "Makkah is in Saudi Arabia. The Ka'ba is there — the Qibla for Muslims.",
      "typed": "Makkah",
      "map": {
        "kind": "world",
        "place": "Makkah",
        "where": "Saudi Arabia",
        "note": "In Saudi Arabia, on the western side, near the Red Sea."
      }
    },
    {
      "key": "s7-g3",
      "level": "medium",
      "q": "Masjid an-Nabawi is in which city?",
      "options": [
        "Makkah",
        "Jerusalem",
        "Baghdad",
        "Madinah"
      ],
      "answer": "Madinah",
      "point": "Madinah is in Saudi Arabia. Masjid an-Nabawi is there — the Prophet's city (Hijrah).",
      "typed": "Madinah",
      "map": {
        "kind": "world",
        "place": "Madinah",
        "where": "Saudi Arabia",
        "note": "In Saudi Arabia, north of Makkah."
      }
    },
    {
      "key": "s7-g4",
      "level": "medium",
      "q": "Al-Azhar is in which city?",
      "options": [
        "Istanbul",
        "Baghdad",
        "Cairo",
        "Damascus"
      ],
      "answer": "Cairo",
      "point": "Cairo is the capital of Egypt, on the river Nile. Al-Azhar is in Cairo.",
      "typed": "Cairo",
      "map": {
        "kind": "world",
        "place": "Cairo",
        "where": "Egypt",
        "note": "In Egypt, on the river Nile, near the Mediterranean Sea."
      }
    },
    {
      "key": "s7-g5",
      "level": "medium",
      "q": "Which city was the old Abbasid capital?",
      "options": [
        "Cairo",
        "Baghdad",
        "Istanbul",
        "Damascus"
      ],
      "answer": "Baghdad",
      "point": "Baghdad is the capital of Iraq — the old Abbasid capital.",
      "typed": "Baghdad",
      "map": {
        "kind": "world",
        "place": "Baghdad",
        "where": "Iraq",
        "note": "In Iraq, in the Middle East, east of Syria."
      }
    },
    {
      "key": "s7-g6",
      "level": "medium",
      "q": "Which city was the old Ottoman capital?",
      "options": [
        "Cairo",
        "Istanbul",
        "Ankara",
        "Baghdad"
      ],
      "answer": "Istanbul",
      "point": "Istanbul, Turkey — the old Ottoman capital, on the Bosphorus.",
      "typed": "Istanbul",
      "map": {
        "kind": "world",
        "place": "Istanbul",
        "where": "Turkey",
        "note": "In Turkey, between Europe and Asia."
      }
    },
    {
      "key": "s7-g7",
      "level": "hard",
      "q": "Where was Imam Hussain (RA) martyred?",
      "options": [
        "Karbala",
        "Madinah",
        "Najaf",
        "Makkah"
      ],
      "answer": "Karbala",
      "point": "Karbala is in Iraq — where Imam Hussain (RA) was martyred.",
      "typed": "Karbala",
      "map": {
        "kind": "world",
        "place": "Karbala",
        "where": "Iraq",
        "note": "In Iraq, south of Baghdad."
      }
    },
    {
      "key": "s7-g8",
      "level": "hard",
      "q": "Ali ibn Abi Talib (RA) rests in which city?",
      "options": [
        "Najaf",
        "Cairo",
        "Karbala",
        "Baghdad"
      ],
      "answer": "Najaf",
      "point": "Najaf is in Iraq — the resting place of Ali ibn Abi Talib (RA).",
      "typed": "Najaf",
      "map": {
        "kind": "world",
        "place": "Najaf",
        "where": "Iraq",
        "note": "In Iraq, south of Baghdad, near Karbala."
      }
    },
    {
      "key": "s7-g9",
      "level": "hard",
      "q": "Fez is in which country?",
      "options": [
        "Morocco",
        "Turkey",
        "Spain",
        "Egypt"
      ],
      "answer": "Morocco",
      "point": "Fez is in Morocco — a famous old centre of Islamic learning.",
      "typed": "Morocco",
      "map": {
        "kind": "world",
        "place": "Fez",
        "where": "Morocco",
        "note": "In Morocco, in North Africa."
      }
    },
    {
      "key": "s7-g10",
      "level": "hard",
      "q": "Cordoba is in which country?",
      "options": [
        "Egypt",
        "Italy",
        "Morocco",
        "Spain"
      ],
      "answer": "Spain",
      "point": "Cordoba is in Spain — a famous old centre of Islamic learning.",
      "typed": "Spain",
      "map": {
        "kind": "world",
        "place": "Cordoba",
        "where": "Spain",
        "note": "In Spain, in southern Europe."
      }
    }
  ],
  "8": [
    {
      "key": "s8-q1",
      "level": "medium",
      "q": "Which is the LARGEST country in the world by area?",
      "options": [
        "Russia",
        "China",
        "India",
        "USA"
      ],
      "answer": "Russia",
      "point": "Russia is the largest country in the world by area.",
      "hint": "It is across the north of Europe and Asia.",
      "map": {
        "kind": "world",
        "place": "Russia",
        "where": "Europe and Asia",
        "note": "The biggest country — across the north of Europe AND Asia."
      },
      "typed": "Russia"
    },
    {
      "key": "s8-q2",
      "level": "medium",
      "q": "Which country has the LARGEST population in the world?",
      "options": [
        "India",
        "China",
        "USA",
        "Indonesia"
      ],
      "answer": "India",
      "point": "India is the largest country in the world by population.",
      "typed": "India"
    },
    {
      "key": "s8-q3",
      "level": "medium",
      "q": "The Nile is the longest river in the world. Into which sea does it flow?",
      "options": [
        "Mediterranean Sea",
        "Red Sea",
        "Arabian Sea",
        "Bay of Bengal"
      ],
      "answer": "Mediterranean Sea",
      "point": "The Nile (about 6,650 km, in Africa) flows into the Mediterranean Sea.",
      "hint": "It is the sea between Europe and Africa.",
      "map": {
        "kind": "world",
        "place": "River Nile",
        "where": "Africa (Egypt)",
        "note": "In Africa — it flows north through Egypt into the Mediterranean Sea."
      },
      "typed": "Mediterranean Sea"
    },
    {
      "key": "s8-q4",
      "level": "hard",
      "q": "Which river is the LARGEST in the world by the amount of water?",
      "options": [
        "Amazon",
        "Nile",
        "Ganga",
        "Brahmaputra"
      ],
      "answer": "Amazon",
      "point": "The Amazon (South America) is the largest river by water. It flows into the Atlantic Ocean.",
      "hint": "It is in South America.",
      "typed": "Amazon"
    },
    {
      "key": "s8-q5",
      "level": "easy",
      "q": "What is the HIGHEST mountain in the world?",
      "options": [
        "Mount Everest",
        "Kanchenjunga",
        "The Himalayas",
        "The Andes"
      ],
      "answer": "Mount Everest",
      "point": "Mount Everest (8,849 m) is the highest mountain in the world.",
      "hint": "It is in Nepal.",
      "typed": "Mount Everest"
    },
    {
      "key": "s8-q6",
      "level": "hard",
      "q": "Mount Everest (8,849 m) is on the border of which TWO countries?",
      "options": [
        "Nepal and China",
        "India and Nepal",
        "Pakistan and China",
        "India and China"
      ],
      "answer": "Nepal and China",
      "point": "Mount Everest (8,849 m) is on the Nepal–China border.",
      "typed": "Nepal and China"
    },
    {
      "key": "s8-q7",
      "level": "medium",
      "q": "Which is the LARGEST hot desert in the world?",
      "options": [
        "Sahara Desert",
        "Thar Desert",
        "Antarctic Desert",
        "Bay of Bengal"
      ],
      "answer": "Sahara Desert",
      "point": "The Sahara Desert, in North Africa, is the largest hot desert.",
      "hint": "It is in Africa.",
      "map": {
        "kind": "world",
        "place": "Sahara Desert",
        "where": "North Africa",
        "note": "In NORTH Africa — the big desert above the middle of Africa."
      },
      "typed": "Sahara Desert"
    },
    {
      "key": "s8-q8",
      "level": "hard",
      "q": "Which is the LARGEST desert of all (a cold desert)?",
      "options": [
        "Antarctic Desert",
        "Sahara Desert",
        "Thar Desert",
        "Arabian Sea"
      ],
      "answer": "Antarctic Desert",
      "point": "The Antarctic Desert is the largest desert of all — Antarctica is a cold desert.",
      "typed": "Antarctic Desert"
    },
    {
      "key": "s8-q9",
      "level": "medium",
      "q": "Which is the LONGEST mountain range in the world?",
      "options": [
        "Andes",
        "Himalayas",
        "Western Ghats",
        "Eastern Ghats"
      ],
      "answer": "Andes",
      "point": "The Andes, in South America along the west coast, are the longest mountain range.",
      "hint": "It is in South America.",
      "typed": "Andes"
    },
    {
      "key": "s8-q10",
      "level": "hard",
      "q": "Which is the LARGEST island in the world?",
      "options": [
        "Greenland",
        "Australia",
        "Sri Lanka",
        "Japan"
      ],
      "answer": "Greenland",
      "point": "Greenland is the largest island in the world (in North America, near Canada).",
      "hint": "It is near Canada, in the north.",
      "map": {
        "kind": "world",
        "place": "Greenland",
        "where": "North America",
        "note": "In the far north, near Canada — the largest island in the world."
      },
      "typed": "Greenland"
    },
    {
      "key": "s8-g1",
      "level": "easy",
      "q": "Which is the SMALLEST continent?",
      "options": [
        "Africa",
        "Europe",
        "Australia",
        "Antarctica"
      ],
      "answer": "Australia",
      "point": "Australia is the smallest continent; it is also a country.",
      "typed": "Australia"
    },
    {
      "key": "s8-g2",
      "level": "easy",
      "q": "Which is the LARGEST ocean?",
      "options": [
        "Pacific Ocean",
        "Arctic Ocean",
        "Indian Ocean",
        "Atlantic Ocean"
      ],
      "answer": "Pacific Ocean",
      "point": "Largest ocean: Pacific Ocean. Largest to smallest: Pacific, Atlantic, Indian, Southern, Arctic.",
      "typed": "Pacific Ocean"
    },
    {
      "key": "s8-g3",
      "level": "medium",
      "q": "Which is the LONGEST river in the world?",
      "options": [
        "Amazon",
        "Brahmaputra",
        "Ganga",
        "Nile"
      ],
      "answer": "Nile",
      "point": "Longest river in the world: Nile (Africa, about 6,650 km) — flows into the Mediterranean Sea.",
      "typed": "Nile",
      "map": {
        "kind": "world",
        "place": "River Nile",
        "where": "Africa (Egypt)",
        "note": "In Africa — it flows north through Egypt into the Mediterranean Sea."
      }
    },
    {
      "key": "s8-g4",
      "level": "medium",
      "q": "Which sea is between Europe and Africa?",
      "options": [
        "Arabian Sea",
        "Red Sea",
        "Caspian Sea",
        "Mediterranean Sea"
      ],
      "answer": "Mediterranean Sea",
      "point": "Sea between Europe and Africa: Mediterranean Sea.",
      "typed": "Mediterranean Sea",
      "map": {
        "kind": "world",
        "place": "Mediterranean Sea",
        "where": "Between Europe and Africa",
        "note": "Between Europe (north) and Africa (south)."
      }
    },
    {
      "key": "s8-g5",
      "level": "hard",
      "q": "The Mediterranean Sea is between which TWO continents?",
      "options": [
        "Africa and Australia",
        "Asia and Africa",
        "Europe and Africa",
        "Europe and Asia"
      ],
      "answer": "Europe and Africa",
      "point": "Sea between Europe and Africa: Mediterranean Sea.",
      "typed": "Europe and Africa"
    },
    {
      "key": "s8-g6",
      "level": "medium",
      "q": "Which sea is between Africa and Arabia?",
      "options": [
        "Mediterranean Sea",
        "Arabian Sea",
        "Red Sea",
        "Bay of Bengal"
      ],
      "answer": "Red Sea",
      "point": "Sea between Africa and Arabia: Red Sea.",
      "typed": "Red Sea",
      "map": {
        "kind": "world",
        "place": "Red Sea",
        "where": "Between Africa and Arabia",
        "note": "Between Africa (Egypt, Sudan) and Arabia (Saudi Arabia)."
      }
    },
    {
      "key": "s8-g7",
      "level": "hard",
      "q": "The Red Sea is between Africa and which country?",
      "options": [
        "Turkey",
        "India",
        "Saudi Arabia",
        "Egypt"
      ],
      "answer": "Saudi Arabia",
      "point": "Sea between Africa and Arabia: Red Sea. Saudi Arabia is on the Arabian side.",
      "typed": "Saudi Arabia",
      "map": {
        "kind": "world",
        "place": "Red Sea",
        "where": "Between Africa and Arabia",
        "note": "Between Africa (Egypt, Sudan) and Arabia (Saudi Arabia)."
      }
    },
    {
      "key": "s8-g8",
      "level": "medium",
      "q": "Which river flows through Egypt?",
      "options": [
        "Ganga",
        "Indus",
        "Nile",
        "Amazon"
      ],
      "answer": "Nile",
      "point": "River through Egypt: Nile — Cairo is on the Nile.",
      "typed": "Nile",
      "map": {
        "kind": "world",
        "place": "River Nile",
        "where": "Africa (Egypt)",
        "note": "In Africa — it flows north through Egypt into the Mediterranean Sea."
      }
    },
    {
      "key": "s8-g9",
      "level": "hard",
      "q": "The Nile flows through which country?",
      "options": [
        "Egypt",
        "Sudan",
        "Brazil",
        "India"
      ],
      "answer": "Egypt",
      "point": "River through Egypt: Nile — Cairo is on the Nile.",
      "typed": "Egypt",
      "map": {
        "kind": "world",
        "place": "Egypt",
        "where": "Africa",
        "note": "In north-east Africa, on the river Nile."
      }
    }
  ]
};

// All 65 capitals from the Full Pack (45 Task-2 + 20 extra), for the
// Stage-4 study sheet. [country, capital]
const MAP_GAME_ALL_CAPITALS = [
  [
    "United Kingdom",
    "London"
  ],
  [
    "France",
    "Paris"
  ],
  [
    "Germany",
    "Berlin"
  ],
  [
    "Italy",
    "Rome"
  ],
  [
    "Spain",
    "Madrid"
  ],
  [
    "Portugal",
    "Lisbon"
  ],
  [
    "Norway",
    "Oslo"
  ],
  [
    "Sweden",
    "Stockholm"
  ],
  [
    "Greece",
    "Athens"
  ],
  [
    "Ukraine",
    "Kyiv"
  ],
  [
    "Egypt",
    "Cairo"
  ],
  [
    "South Africa",
    "Pretoria *"
  ],
  [
    "Nigeria",
    "Abuja"
  ],
  [
    "Kenya",
    "Nairobi"
  ],
  [
    "Ethiopia",
    "Addis Ababa"
  ],
  [
    "Algeria",
    "Algiers"
  ],
  [
    "Morocco",
    "Rabat"
  ],
  [
    "Dem. Rep. of Congo",
    "Kinshasa"
  ],
  [
    "Ghana",
    "Accra"
  ],
  [
    "Tanzania",
    "Dodoma"
  ],
  [
    "India",
    "New Delhi"
  ],
  [
    "China",
    "Beijing"
  ],
  [
    "Japan",
    "Tokyo"
  ],
  [
    "Russia",
    "Moscow"
  ],
  [
    "Pakistan",
    "Islamabad"
  ],
  [
    "Bangladesh",
    "Dhaka"
  ],
  [
    "Nepal",
    "Kathmandu"
  ],
  [
    "Saudi Arabia",
    "Riyadh"
  ],
  [
    "Indonesia",
    "Jakarta"
  ],
  [
    "South Korea",
    "Seoul"
  ],
  [
    "United States",
    "Washington, D.C."
  ],
  [
    "Canada",
    "Ottawa"
  ],
  [
    "Mexico",
    "Mexico City"
  ],
  [
    "Cuba",
    "Havana"
  ],
  [
    "Jamaica",
    "Kingston"
  ],
  [
    "Brazil",
    "Brasilia"
  ],
  [
    "Argentina",
    "Buenos Aires"
  ],
  [
    "Chile",
    "Santiago"
  ],
  [
    "Peru",
    "Lima"
  ],
  [
    "Colombia",
    "Bogota"
  ],
  [
    "Venezuela",
    "Caracas"
  ],
  [
    "Ecuador",
    "Quito"
  ],
  [
    "Australia",
    "Canberra"
  ],
  [
    "New Zealand",
    "Wellington"
  ],
  [
    "Papua New Guinea",
    "Port Moresby"
  ],
  [
    "UAE",
    "Abu Dhabi"
  ],
  [
    "Qatar",
    "Doha"
  ],
  [
    "Kuwait",
    "Kuwait City"
  ],
  [
    "Oman",
    "Muscat"
  ],
  [
    "Yemen",
    "Sana'a"
  ],
  [
    "Jordan",
    "Amman"
  ],
  [
    "Lebanon",
    "Beirut"
  ],
  [
    "Syria",
    "Damascus"
  ],
  [
    "Iraq",
    "Baghdad"
  ],
  [
    "Iran",
    "Tehran"
  ],
  [
    "Turkey",
    "Ankara"
  ],
  [
    "Afghanistan",
    "Kabul"
  ],
  [
    "Bhutan",
    "Thimphu"
  ],
  [
    "Myanmar",
    "Naypyidaw"
  ],
  [
    "Sri Lanka",
    "Colombo *"
  ],
  [
    "Maldives",
    "Male"
  ],
  [
    "Thailand",
    "Bangkok"
  ],
  [
    "Malaysia",
    "Kuala Lumpur"
  ],
  [
    "Singapore",
    "Singapore"
  ],
  [
    "Vietnam",
    "Hanoi"
  ]
];

// Study-sheet facts per stage, for the weak-section PDF (B&W, print-ready).
// Each fact is one short line. Stage 4 uses MAP_GAME_ALL_CAPITALS instead.
const MAP_GAME_SHEETS = {
  "1": {
    "title": "Map-Reading Basics",
    "facts": [
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
      "Exam plan (60 minutes): do the questions you are sure of first. Keep the last 5 minutes to recheck."
    ]
  },
  "2": {
    "title": "Continents & Oceans",
    "facts": [
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
      "Caspian Sea — the world's largest lake / sea, between Europe and Asia."
    ]
  },
  "3": {
    "title": "Asia",
    "facts": [
      "South Asia: India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Myanmar, Maldives, Afghanistan.",
      "Middle East / West Asia: Saudi Arabia, UAE, Qatar, Kuwait, Oman, Yemen, Jordan, Lebanon, Syria, Iraq, Iran, Turkey, Israel, Palestine.",
      "East & South-East Asia: China, Japan, South Korea, North Korea, Mongolia, Thailand, Vietnam, Malaysia, Singapore, Indonesia, Philippines.",
      "India — triangle pointing down. Saudi Arabia — big country on the Arabian Peninsula.",
      "China — big country north-east of India. Japan — a chain of islands east of China.",
      "Indonesia — many islands south-east of Asia. Sri Lanka — a small teardrop island just below India."
    ]
  },
  "4": {
    "title": "World Capitals — all 65",
    "facts": [
      "Learn country + capital together, continent by continent.",
      "* South Africa has 3 capitals. Pretoria is the administrative capital — the one to answer in a quiz.",
      "* Sri Lanka: Colombo is the executive / judicial capital. Answer Colombo in a school quiz.",
      "Tricky ones: Australia — Canberra (NOT Sydney). UAE — Abu Dhabi (NOT Dubai).",
      "Turkey — Ankara (NOT Istanbul). Canada — Ottawa (NOT Toronto)."
    ]
  },
  "5": {
    "title": "India States",
    "facts": [
      "North: Jammu & Kashmir (UT — Srinagar / Jammu), Ladakh (UT — Leh), Himachal Pradesh — Shimla, Uttarakhand — Dehradun, Haryana — Chandigarh, Punjab — Chandigarh, Uttar Pradesh — Lucknow, Delhi (UT — New Delhi), Rajasthan — Jaipur.",
      "South: Kerala — Thiruvananthapuram, Tamil Nadu — Chennai, Karnataka — Bengaluru, Andhra Pradesh — Amaravati, Telangana — Hyderabad.",
      "East: West Bengal — Kolkata, Bihar — Patna, Jharkhand — Ranchi, Odisha — Bhubaneswar.",
      "West & Central: Gujarat — Gandhinagar, Maharashtra — Mumbai, Goa — Panaji, Madhya Pradesh — Bhopal, Chhattisgarh — Raipur.",
      "North-East (7 sisters + Sikkim): Assam — Dispur, Arunachal Pradesh — Itanagar, Manipur — Imphal, Meghalaya — Shillong, Mizoram — Aizawl, Nagaland — Kohima, Tripura — Agartala, Sikkim — Gangtok.",
      "Union Territories (8): Andaman and Nicobar Islands — Port Blair; Chandigarh — Chandigarh; Dadra and Nagar Haveli and Daman and Diu — Daman; Delhi — New Delhi; Jammu and Kashmir — Srinagar (summer) / Jammu (winter); Ladakh — Leh; Lakshadweep — Kavaratti; Puducherry — Puducherry.",
      "Remember: Chandigarh is the capital of TWO states (Punjab and Haryana) and is also a Union Territory itself.",
      "Madhya Pradesh is in the very centre — that is why it is called the 'Heart of India'.",
      "Kanyakumari (Tamil Nadu) is the southern tip of India. Lakshadweep (UT — Kavaratti) is in the Arabian Sea, west of Kerala.",
      "Mumbai is the largest city in India. Kolkata is on the Hooghly river."
    ]
  },
  "6": {
    "title": "Rivers & Mountains",
    "facts": [
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
      "Seas around India: Arabian Sea (west), Bay of Bengal (east), Indian Ocean (south)."
    ]
  },
  "7": {
    "title": "Holy & Famous Places",
    "facts": [
      "Makkah — Saudi Arabia. The Ka'ba; the Qibla for Muslims.",
      "Madinah — Saudi Arabia. Masjid an-Nabawi; the Prophet's city (Hijrah).",
      "Jerusalem (Bayt al-Maqdis) — Palestine. Masjid al-Aqsa — the first Qibla.",
      "Cairo — Egypt. Capital of Egypt; Al-Azhar; on the Nile.",
      "Baghdad — Iraq. Capital of Iraq; old Abbasid capital.",
      "Damascus — Syria. Capital of Syria; one of the oldest cities.",
      "Istanbul — Turkey. Old Ottoman capital; on the Bosphorus.",
      "Karbala — Iraq. Where Imam Hussain (RA) was martyred.",
      "Najaf — Iraq. Resting place of Ali ibn Abi Talib (RA).",
      "Fez (Morocco) and Cordoba (Spain) — famous old centres of Islamic learning."
    ]
  },
  "8": {
    "title": "Biggest / Longest / Highest",
    "facts": [
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
      "River through Egypt: Nile — Cairo is on the Nile."
    ]
  }
};

module.exports = { MAP_GAME_STAGES, MAP_GAME_QUESTIONS, MAP_GAME_PASS_MARK, MAP_GAME_TIME_PER_Q, MAP_GAME_PLAY_COUNT, MAP_GAME_ROUND2_TIME_PER_Q, MAP_GAME_ALL_CAPITALS, MAP_GAME_SHEETS };
