// ─────────────────────────────────────────────────────────────
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

// Pass mark to finish a stage and unlock the next one: 8 of 10 (Samad, 12 Nov 2026).
const MAP_GAME_PASS_MARK = 8;
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
    },
    {
      "key": "s1-g8",
      "level": "medium",
      "q": "Which line passes through the middle of India?",
      "options": [
        "Equator",
        "Arctic Circle",
        "Tropic of Capricorn",
        "Tropic of Cancer"
      ],
      "answer": "Tropic of Cancer",
      "point": "The Tropic of Cancer passes through the middle of India.",
      "typed": "Tropic of Cancer"
    },
    {
      "key": "s1-g9",
      "level": "medium",
      "q": "Which line is south of the Equator?",
      "options": [
        "Tropic of Cancer",
        "Prime Meridian",
        "Tropic of Capricorn",
        "Arctic Circle"
      ],
      "answer": "Tropic of Capricorn",
      "point": "The Tropic of Capricorn is south of the Equator. The Tropic of Cancer is north of it.",
      "typed": "Tropic of Capricorn"
    },
    {
      "key": "s1-g10",
      "level": "medium",
      "q": "Which circle is around the North Pole?",
      "options": [
        "Tropic of Cancer",
        "Antarctic Circle",
        "Equator",
        "Arctic Circle"
      ],
      "answer": "Arctic Circle",
      "point": "The Arctic Circle is around the North Pole. The Antarctic Circle is around the South Pole.",
      "typed": "Arctic Circle"
    },
    {
      "key": "s1-g11",
      "level": "medium",
      "q": "Which circle is around the South Pole?",
      "options": [
        "Prime Meridian",
        "Tropic of Capricorn",
        "Antarctic Circle",
        "Arctic Circle"
      ],
      "answer": "Antarctic Circle",
      "point": "The Antarctic Circle is around the South Pole.",
      "typed": "Antarctic Circle"
    },
    {
      "key": "s1-g12",
      "level": "medium",
      "q": "The Equator cuts the Earth into which two halves?",
      "options": [
        "Eastern and Western Hemispheres",
        "North and South Poles",
        "Northern and Southern Hemispheres",
        "Land and Water"
      ],
      "answer": "Northern and Southern Hemispheres",
      "point": "The Equator cuts the Earth into the Northern Hemisphere and the Southern Hemisphere.",
      "typed": "Northern and Southern Hemispheres"
    },
    {
      "key": "s1-g13",
      "level": "medium",
      "q": "The Prime Meridian cuts the Earth into which two halves?",
      "options": [
        "Land and Water",
        "Eastern and Western Hemispheres",
        "North and South Poles",
        "Northern and Southern Hemispheres"
      ],
      "answer": "Eastern and Western Hemispheres",
      "point": "The Prime Meridian cuts the Earth into the Eastern Hemisphere and the Western Hemisphere.",
      "typed": "Eastern and Western Hemispheres"
    },
    {
      "key": "s1-g14",
      "level": "medium",
      "q": "Which two hemispheres is India in?",
      "options": [
        "Eastern and Western",
        "Northern and Eastern",
        "Northern and Southern",
        "Southern and Western"
      ],
      "answer": "Northern and Eastern",
      "point": "India is in the Northern Hemisphere and the Eastern Hemisphere.",
      "typed": "Northern and Eastern"
    },
    {
      "key": "s1-g15",
      "level": "medium",
      "q": "Which two hemispheres is Australia in?",
      "options": [
        "Northern and Eastern",
        "Southern and Western",
        "Northern and Southern",
        "Southern and Eastern"
      ],
      "answer": "Southern and Eastern",
      "point": "Australia is in the Southern Hemisphere and the Eastern Hemisphere.",
      "typed": "Southern and Eastern"
    },
    {
      "key": "s1-g16",
      "level": "hard",
      "q": "Latitude is measured from 0 degrees to how many degrees?",
      "options": [
        "90 degrees",
        "360 degrees",
        "180 degrees",
        "45 degrees"
      ],
      "answer": "90 degrees",
      "point": "Latitude goes from 0 degrees (Equator) to 90 degrees (the poles).",
      "typed": "90 degrees"
    },
    {
      "key": "s1-g17",
      "level": "hard",
      "q": "Longitude is measured from 0 degrees to how many degrees?",
      "options": [
        "90 degrees",
        "45 degrees",
        "180 degrees",
        "360 degrees"
      ],
      "answer": "180 degrees",
      "point": "Longitude goes from 0 degrees (Prime Meridian) to 180 degrees.",
      "typed": "180 degrees"
    },
    {
      "key": "s1-g18",
      "level": "medium",
      "q": "Which line is at 180 degrees, on the other side of the Earth from London?",
      "options": [
        "International Date Line",
        "Equator",
        "Tropic of Cancer",
        "Arctic Circle"
      ],
      "answer": "International Date Line",
      "point": "The International Date Line is at 180 degrees — where one day changes to the next.",
      "typed": "International Date Line"
    },
    {
      "key": "s1-g19",
      "level": "medium",
      "q": "What does the scale of a map tell you?",
      "options": [
        "The rainfall",
        "The time of day",
        "The population",
        "How far places really are"
      ],
      "answer": "How far places really are",
      "point": "The scale tells you how far places really are — for example, 1 cm on the map = 100 km on the ground.",
      "typed": "How far places really are"
    },
    {
      "key": "s1-g20",
      "level": "hard",
      "q": "When it is 12 noon in London, what is the time in India?",
      "options": [
        "5:30 in the morning",
        "7:30 in the evening",
        "12 noon",
        "5:30 in the evening"
      ],
      "answer": "5:30 in the evening",
      "point": "India is 5 hours 30 minutes ahead of London. 12 noon in London = 5:30 in the evening in India.",
      "typed": "5:30 in the evening"
    },
    {
      "key": "s1-g21",
      "level": "easy",
      "q": "How many time zones does India have?",
      "options": [
        "Two",
        "Three",
        "Five",
        "One"
      ],
      "answer": "One",
      "point": "India has only one time zone — Indian Standard Time.",
      "typed": "One"
    },
    {
      "key": "s1-g22",
      "level": "easy",
      "q": "What is a globe?",
      "options": [
        "A flat book of maps",
        "A kind of compass",
        "A round model of the Earth",
        "A map of India only"
      ],
      "answer": "A round model of the Earth",
      "point": "A globe is a round model of the Earth — it shows the real shapes of countries.",
      "typed": "A round model of the Earth"
    },
    {
      "key": "s1-g23",
      "level": "easy",
      "q": "What is a book of maps called?",
      "options": [
        "A dictionary",
        "An atlas",
        "A compass",
        "A globe"
      ],
      "answer": "An atlas",
      "point": "A book of maps is called an atlas.",
      "typed": "An atlas"
    },
    {
      "key": "s1-g24",
      "level": "easy",
      "q": "On a map, what does the colour BLUE usually mean?",
      "options": [
        "Deserts",
        "Water",
        "Mountains",
        "Forests"
      ],
      "answer": "Water",
      "point": "On a map, blue means water — seas, rivers and lakes.",
      "typed": "Water"
    },
    {
      "key": "s1-g25",
      "level": "easy",
      "q": "On a map, what does the colour GREEN usually mean?",
      "options": [
        "Water",
        "Low land and plains",
        "Mountains",
        "Deserts"
      ],
      "answer": "Low land and plains",
      "point": "On a map, green means low land and plains.",
      "typed": "Low land and plains"
    },
    {
      "key": "s1-g26",
      "level": "easy",
      "q": "On a map, what does the colour BROWN usually mean?",
      "options": [
        "Mountains and high land",
        "Deserts",
        "Forests",
        "Water"
      ],
      "answer": "Mountains and high land",
      "point": "On a map, brown means mountains and high land.",
      "typed": "Mountains and high land"
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
        "Egypt",
        "Nigeria",
        "Algeria",
        "Ghana"
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
        "Brazil",
        "Mexico",
        "Argentina",
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
        "Chile",
        "Brazil",
        "Argentina"
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
        "Russia",
        "France",
        "Spain",
        "Germany"
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
        "Japan",
        "Indonesia",
        "Papua New Guinea",
        "Australia"
      ],
      "answer": "Australia",
      "point": "Australia (Oceania) — smallest continent; also a country. Largest country in it: Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Australia",
        "where": "Australia",
        "note": "The island continent, south-east of Asia."
      }
    },
    {
      "key": "s2-g6",
      "level": "medium",
      "q": "Which is the SECOND largest ocean?",
      "options": [
        "Arctic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Atlantic Ocean"
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
        "Arctic Ocean",
        "Atlantic Ocean",
        "Southern Ocean",
        "Indian Ocean"
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
        "Southern Ocean",
        "Atlantic Ocean",
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
        "Mediterranean Sea",
        "Arabian Sea",
        "Caspian Sea"
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
        "Red Sea",
        "Mediterranean Sea",
        "Caspian Sea",
        "Black Sea"
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
        "Indian Ocean",
        "Atlantic Ocean",
        "Southern Ocean",
        "Pacific Ocean"
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
        "Europe",
        "Antarctica",
        "Australia",
        "Africa"
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
        "Africa",
        "Europe",
        "Asia",
        "North America"
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
    },
    {
      "key": "s2-g-cont-algeria",
      "level": "medium",
      "q": "Which continent is Algeria in?",
      "options": [
        "Africa",
        "Antarctica",
        "North America",
        "Asia"
      ],
      "answer": "Africa",
      "point": "Algeria is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Algeria",
        "where": "Africa",
        "note": "In North Africa — the largest country in Africa."
      }
    },
    {
      "key": "s2-g-cont-egypt",
      "level": "easy",
      "q": "Which continent is Egypt in?",
      "options": [
        "Antarctica",
        "Africa",
        "Asia",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Egypt is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Egypt",
        "where": "Africa",
        "note": "In north-east Africa, on the river Nile."
      }
    },
    {
      "key": "s2-g-cont-libya",
      "level": "medium",
      "q": "Which continent is Libya in?",
      "options": [
        "Africa",
        "Europe",
        "Australia",
        "South America"
      ],
      "answer": "Africa",
      "point": "Libya is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Libya",
        "where": "Africa",
        "note": "In North Africa, on the Mediterranean Sea."
      }
    },
    {
      "key": "s2-g-cont-morocco",
      "level": "medium",
      "q": "Which continent is Morocco in?",
      "options": [
        "Africa",
        "South America",
        "Antarctica",
        "Australia"
      ],
      "answer": "Africa",
      "point": "Morocco is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Morocco",
        "where": "Africa",
        "note": "In North Africa, across the sea from Spain."
      }
    },
    {
      "key": "s2-g-cont-tunisia",
      "level": "medium",
      "q": "Which continent is Tunisia in?",
      "options": [
        "Australia",
        "Asia",
        "Africa",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Tunisia is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Tunisia",
        "where": "Africa",
        "note": "In North Africa, between Algeria and Libya."
      }
    },
    {
      "key": "s2-g-cont-sudan",
      "level": "medium",
      "q": "Which continent is Sudan in?",
      "options": [
        "North America",
        "Asia",
        "South America",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Sudan is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Sudan",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-south-sudan",
      "level": "medium",
      "q": "Which continent is South Sudan in?",
      "options": [
        "Asia",
        "Europe",
        "Australia",
        "Africa"
      ],
      "answer": "Africa",
      "point": "South Sudan is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "South Sudan",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-ethiopia",
      "level": "medium",
      "q": "Which continent is Ethiopia in?",
      "options": [
        "Africa",
        "Antarctica",
        "North America",
        "Asia"
      ],
      "answer": "Africa",
      "point": "Ethiopia is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Ethiopia",
        "where": "Africa",
        "note": "In East Africa."
      }
    },
    {
      "key": "s2-g-cont-eritrea",
      "level": "hard",
      "q": "Which continent is Eritrea in?",
      "options": [
        "Australia",
        "Africa",
        "Asia",
        "North America"
      ],
      "answer": "Africa",
      "point": "Eritrea is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Eritrea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-djibouti",
      "level": "hard",
      "q": "Which continent is Djibouti in?",
      "options": [
        "Africa",
        "Asia",
        "North America",
        "South America"
      ],
      "answer": "Africa",
      "point": "Djibouti is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Djibouti",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-somalia",
      "level": "medium",
      "q": "Which continent is Somalia in?",
      "options": [
        "Australia",
        "Antarctica",
        "South America",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Somalia is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Somalia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-kenya",
      "level": "easy",
      "q": "Which continent is Kenya in?",
      "options": [
        "North America",
        "Africa",
        "Antarctica",
        "South America"
      ],
      "answer": "Africa",
      "point": "Kenya is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Kenya",
        "where": "Africa",
        "note": "In East Africa, on the Indian Ocean."
      }
    },
    {
      "key": "s2-g-cont-uganda",
      "level": "medium",
      "q": "Which continent is Uganda in?",
      "options": [
        "Europe",
        "North America",
        "Africa",
        "Australia"
      ],
      "answer": "Africa",
      "point": "Uganda is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Uganda",
        "where": "Africa",
        "note": "In East Africa, on Lake Victoria."
      }
    },
    {
      "key": "s2-g-cont-rwanda",
      "level": "medium",
      "q": "Which continent is Rwanda in?",
      "options": [
        "South America",
        "North America",
        "Africa",
        "Antarctica"
      ],
      "answer": "Africa",
      "point": "Rwanda is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Rwanda",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-burundi",
      "level": "medium",
      "q": "Which continent is Burundi in?",
      "options": [
        "South America",
        "Asia",
        "Africa",
        "Antarctica"
      ],
      "answer": "Africa",
      "point": "Burundi is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Burundi",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-tanzania",
      "level": "medium",
      "q": "Which continent is Tanzania in?",
      "options": [
        "Africa",
        "Antarctica",
        "South America",
        "North America"
      ],
      "answer": "Africa",
      "point": "Tanzania is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Tanzania",
        "where": "Africa",
        "note": "In East Africa — Mount Kilimanjaro is here."
      }
    },
    {
      "key": "s2-g-cont-mozambique",
      "level": "medium",
      "q": "Which continent is Mozambique in?",
      "options": [
        "South America",
        "Europe",
        "Australia",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Mozambique is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Mozambique",
        "where": "Africa",
        "note": "In south-east Africa, on the Indian Ocean."
      }
    },
    {
      "key": "s2-g-cont-zambia",
      "level": "medium",
      "q": "Which continent is Zambia in?",
      "options": [
        "Europe",
        "North America",
        "Antarctica",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Zambia is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Zambia",
        "where": "Africa",
        "note": "In southern Africa — Victoria Falls is here."
      }
    },
    {
      "key": "s2-g-cont-zimbabwe",
      "level": "medium",
      "q": "Which continent is Zimbabwe in?",
      "options": [
        "Asia",
        "Africa",
        "North America",
        "Australia"
      ],
      "answer": "Africa",
      "point": "Zimbabwe is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Zimbabwe",
        "where": "Africa",
        "note": "In southern Africa, next to Zambia."
      }
    },
    {
      "key": "s2-g-cont-malawi",
      "level": "medium",
      "q": "Which continent is Malawi in?",
      "options": [
        "Antarctica",
        "Africa",
        "Australia",
        "South America"
      ],
      "answer": "Africa",
      "point": "Malawi is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Malawi",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-botswana",
      "level": "medium",
      "q": "Which continent is Botswana in?",
      "options": [
        "Antarctica",
        "Africa",
        "Asia",
        "South America"
      ],
      "answer": "Africa",
      "point": "Botswana is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Botswana",
        "where": "Africa",
        "note": "In southern Africa, north of South Africa."
      }
    },
    {
      "key": "s2-g-cont-namibia",
      "level": "medium",
      "q": "Which continent is Namibia in?",
      "options": [
        "Antarctica",
        "Europe",
        "South America",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Namibia is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Namibia",
        "where": "Africa",
        "note": "In southern Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s2-g-cont-south-africa",
      "level": "easy",
      "q": "Which continent is South Africa in?",
      "options": [
        "Africa",
        "Australia",
        "Asia",
        "Antarctica"
      ],
      "answer": "Africa",
      "point": "South Africa is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "South Africa",
        "where": "Africa",
        "note": "At the southern tip of Africa."
      }
    },
    {
      "key": "s2-g-cont-lesotho",
      "level": "hard",
      "q": "Which continent is Lesotho in?",
      "options": [
        "Asia",
        "Australia",
        "Africa",
        "Antarctica"
      ],
      "answer": "Africa",
      "point": "Lesotho is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Lesotho",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-eswatini",
      "level": "hard",
      "q": "Which continent is Eswatini in?",
      "options": [
        "Asia",
        "Africa",
        "South America",
        "Antarctica"
      ],
      "answer": "Africa",
      "point": "Eswatini is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Eswatini",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-madagascar",
      "level": "medium",
      "q": "Which continent is Madagascar in?",
      "options": [
        "Antarctica",
        "Africa",
        "Australia",
        "South America"
      ],
      "answer": "Africa",
      "point": "Madagascar is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Madagascar",
        "where": "Africa",
        "note": "A big island off the south-east coast of Africa."
      }
    },
    {
      "key": "s2-g-cont-mauritius",
      "level": "hard",
      "q": "Which continent is Mauritius in?",
      "options": [
        "Asia",
        "Europe",
        "North America",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Mauritius is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Mauritius",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-seychelles",
      "level": "hard",
      "q": "Which continent is Seychelles in?",
      "options": [
        "North America",
        "Africa",
        "Australia",
        "Antarctica"
      ],
      "answer": "Africa",
      "point": "Seychelles is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Seychelles",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-comoros",
      "level": "hard",
      "q": "Which continent is Comoros in?",
      "options": [
        "Europe",
        "South America",
        "Australia",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Comoros is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Comoros",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-cape-verde",
      "level": "hard",
      "q": "Which continent is Cape Verde in?",
      "options": [
        "Africa",
        "Antarctica",
        "South America",
        "Australia"
      ],
      "answer": "Africa",
      "point": "Cape Verde is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Cape Verde",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-sao-tome-and-principe",
      "level": "hard",
      "q": "Which continent is Sao Tome and Principe in?",
      "options": [
        "Africa",
        "Asia",
        "South America",
        "North America"
      ],
      "answer": "Africa",
      "point": "Sao Tome and Principe is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Sao Tome and Principe",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-nigeria",
      "level": "easy",
      "q": "Which continent is Nigeria in?",
      "options": [
        "Antarctica",
        "Africa",
        "Asia",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Nigeria is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Nigeria",
        "where": "Africa",
        "note": "In West Africa — the most populous country in Africa."
      }
    },
    {
      "key": "s2-g-cont-ghana",
      "level": "medium",
      "q": "Which continent is Ghana in?",
      "options": [
        "Asia",
        "Australia",
        "South America",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Ghana is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Ghana",
        "where": "Africa",
        "note": "In West Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s2-g-cont-ivory-coast",
      "level": "medium",
      "q": "Which continent is Ivory Coast in?",
      "options": [
        "Africa",
        "North America",
        "Europe",
        "Asia"
      ],
      "answer": "Africa",
      "point": "Ivory Coast is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Ivory Coast",
        "where": "Africa",
        "note": "In West Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s2-g-cont-senegal",
      "level": "medium",
      "q": "Which continent is Senegal in?",
      "options": [
        "Asia",
        "Africa",
        "Australia",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Senegal is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Senegal",
        "where": "Africa",
        "note": "In West Africa — the westernmost country of Africa."
      }
    },
    {
      "key": "s2-g-cont-mali",
      "level": "medium",
      "q": "Which continent is Mali in?",
      "options": [
        "North America",
        "Australia",
        "Antarctica",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Mali is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Mali",
        "where": "Africa",
        "note": "In West Africa — Timbuktu is here."
      }
    },
    {
      "key": "s2-g-cont-burkina-faso",
      "level": "medium",
      "q": "Which continent is Burkina Faso in?",
      "options": [
        "North America",
        "South America",
        "Antarctica",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Burkina Faso is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Burkina Faso",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-niger",
      "level": "medium",
      "q": "Which continent is Niger in?",
      "options": [
        "Africa",
        "North America",
        "Antarctica",
        "South America"
      ],
      "answer": "Africa",
      "point": "Niger is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Niger",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-guinea",
      "level": "medium",
      "q": "Which continent is Guinea in?",
      "options": [
        "Asia",
        "South America",
        "Africa",
        "North America"
      ],
      "answer": "Africa",
      "point": "Guinea is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Guinea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-guinea-bissau",
      "level": "medium",
      "q": "Which continent is Guinea-Bissau in?",
      "options": [
        "Europe",
        "Africa",
        "South America",
        "Asia"
      ],
      "answer": "Africa",
      "point": "Guinea-Bissau is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Guinea-Bissau",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-sierra-leone",
      "level": "medium",
      "q": "Which continent is Sierra Leone in?",
      "options": [
        "Australia",
        "Africa",
        "South America",
        "Asia"
      ],
      "answer": "Africa",
      "point": "Sierra Leone is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Sierra Leone",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-liberia",
      "level": "medium",
      "q": "Which continent is Liberia in?",
      "options": [
        "Africa",
        "South America",
        "North America",
        "Australia"
      ],
      "answer": "Africa",
      "point": "Liberia is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Liberia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-togo",
      "level": "medium",
      "q": "Which continent is Togo in?",
      "options": [
        "South America",
        "Africa",
        "Europe",
        "Asia"
      ],
      "answer": "Africa",
      "point": "Togo is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Togo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-benin",
      "level": "medium",
      "q": "Which continent is Benin in?",
      "options": [
        "Africa",
        "North America",
        "Asia",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Benin is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Benin",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-cameroon",
      "level": "medium",
      "q": "Which continent is Cameroon in?",
      "options": [
        "South America",
        "Asia",
        "Australia",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Cameroon is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Cameroon",
        "where": "Africa",
        "note": "In Central Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s2-g-cont-central-african-republic",
      "level": "medium",
      "q": "Which continent is Central African Republic in?",
      "options": [
        "Antarctica",
        "Australia",
        "Africa",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Central African Republic is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Central African Republic",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-chad",
      "level": "medium",
      "q": "Which continent is Chad in?",
      "options": [
        "Asia",
        "North America",
        "Africa",
        "Australia"
      ],
      "answer": "Africa",
      "point": "Chad is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Chad",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-congo",
      "level": "medium",
      "q": "Which continent is Congo in?",
      "options": [
        "Australia",
        "North America",
        "Europe",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Congo is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Congo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-dem-rep-of-congo",
      "level": "medium",
      "q": "Which continent is Dem. Rep. of Congo in?",
      "options": [
        "Antarctica",
        "Australia",
        "Africa",
        "South America"
      ],
      "answer": "Africa",
      "point": "Dem. Rep. of Congo is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Dem. Rep. of Congo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-gabon",
      "level": "medium",
      "q": "Which continent is Gabon in?",
      "options": [
        "Africa",
        "Asia",
        "Australia",
        "Antarctica"
      ],
      "answer": "Africa",
      "point": "Gabon is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Gabon",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-equatorial-guinea",
      "level": "medium",
      "q": "Which continent is Equatorial Guinea in?",
      "options": [
        "Australia",
        "Africa",
        "Europe",
        "South America"
      ],
      "answer": "Africa",
      "point": "Equatorial Guinea is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Equatorial Guinea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-angola",
      "level": "medium",
      "q": "Which continent is Angola in?",
      "options": [
        "Antarctica",
        "Asia",
        "South America",
        "Africa"
      ],
      "answer": "Africa",
      "point": "Angola is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Angola",
        "where": "Africa",
        "note": "In southern Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s2-g-cont-mauritania",
      "level": "medium",
      "q": "Which continent is Mauritania in?",
      "options": [
        "Australia",
        "North America",
        "Africa",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Mauritania is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Mauritania",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-gambia",
      "level": "medium",
      "q": "Which continent is Gambia in?",
      "options": [
        "Africa",
        "North America",
        "South America",
        "Europe"
      ],
      "answer": "Africa",
      "point": "Gambia is in Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Gambia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s2-g-cont-afghanistan",
      "level": "medium",
      "q": "Which continent is Afghanistan in?",
      "options": [
        "Africa",
        "Asia",
        "Australia",
        "North America"
      ],
      "answer": "Asia",
      "point": "Afghanistan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Afghanistan",
        "where": "Asia",
        "note": "In South Asia, north-west of Pakistan."
      }
    },
    {
      "key": "s2-g-cont-armenia",
      "level": "medium",
      "q": "Which continent is Armenia in?",
      "options": [
        "Europe",
        "Asia",
        "North America",
        "Antarctica"
      ],
      "answer": "Asia",
      "point": "Armenia is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Armenia",
        "where": "Asia",
        "note": "In the Caucasus, between Turkey and Azerbaijan."
      }
    },
    {
      "key": "s2-g-cont-azerbaijan",
      "level": "medium",
      "q": "Which continent is Azerbaijan in?",
      "options": [
        "Africa",
        "Asia",
        "South America",
        "Australia"
      ],
      "answer": "Asia",
      "point": "Azerbaijan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Azerbaijan",
        "where": "Asia",
        "note": "In the Caucasus, on the Caspian Sea."
      }
    },
    {
      "key": "s2-g-cont-bahrain",
      "level": "medium",
      "q": "Which continent is Bahrain in?",
      "options": [
        "South America",
        "Asia",
        "North America",
        "Australia"
      ],
      "answer": "Asia",
      "point": "Bahrain is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Bahrain",
        "where": "Asia",
        "note": "A small island country in the Gulf, next to Saudi Arabia."
      }
    },
    {
      "key": "s2-g-cont-bangladesh",
      "level": "easy",
      "q": "Which continent is Bangladesh in?",
      "options": [
        "Antarctica",
        "South America",
        "Asia",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Bangladesh is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Bangladesh",
        "where": "Asia",
        "note": "In South Asia, east of India."
      }
    },
    {
      "key": "s2-g-cont-bhutan",
      "level": "medium",
      "q": "Which continent is Bhutan in?",
      "options": [
        "North America",
        "South America",
        "Asia",
        "Australia"
      ],
      "answer": "Asia",
      "point": "Bhutan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Bhutan",
        "where": "Asia",
        "note": "In South Asia, in the Himalayas, east of Nepal."
      }
    },
    {
      "key": "s2-g-cont-brunei",
      "level": "hard",
      "q": "Which continent is Brunei in?",
      "options": [
        "South America",
        "North America",
        "Antarctica",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Brunei is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Brunei",
        "where": "Asia",
        "note": "A small country on the island of Borneo."
      }
    },
    {
      "key": "s2-g-cont-cambodia",
      "level": "medium",
      "q": "Which continent is Cambodia in?",
      "options": [
        "Asia",
        "Europe",
        "Africa",
        "North America"
      ],
      "answer": "Asia",
      "point": "Cambodia is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Cambodia",
        "where": "Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s2-g-cont-china",
      "level": "easy",
      "q": "Which continent is China in?",
      "options": [
        "Australia",
        "Asia",
        "Europe",
        "South America"
      ],
      "answer": "Asia",
      "point": "China is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s2-g-cont-cyprus",
      "level": "medium",
      "q": "Which continent is Cyprus in?",
      "options": [
        "Europe",
        "Asia",
        "North America",
        "South America"
      ],
      "answer": "Asia",
      "point": "Cyprus is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Cyprus",
        "where": "Asia",
        "note": "An island in the Mediterranean Sea, south of Turkey."
      }
    },
    {
      "key": "s2-g-cont-georgia",
      "level": "medium",
      "q": "Which continent is Georgia in?",
      "options": [
        "Europe",
        "Asia",
        "Australia",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Georgia is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Georgia",
        "where": "Asia",
        "note": "In the Caucasus, on the Black Sea."
      }
    },
    {
      "key": "s2-g-cont-indonesia",
      "level": "easy",
      "q": "Which continent is Indonesia in?",
      "options": [
        "Africa",
        "Asia",
        "South America",
        "Antarctica"
      ],
      "answer": "Asia",
      "point": "Indonesia is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Indonesia",
        "where": "Asia",
        "note": "Many islands south-east of Asia, above Australia."
      }
    },
    {
      "key": "s2-g-cont-iran",
      "level": "medium",
      "q": "Which continent is Iran in?",
      "options": [
        "North America",
        "Europe",
        "Asia",
        "Antarctica"
      ],
      "answer": "Asia",
      "point": "Iran is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Iran",
        "where": "Asia",
        "note": "In the Middle East, east of Iraq."
      }
    },
    {
      "key": "s2-g-cont-iraq",
      "level": "medium",
      "q": "Which continent is Iraq in?",
      "options": [
        "Antarctica",
        "Asia",
        "Europe",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Iraq is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Iraq",
        "where": "Asia",
        "note": "In Iraq, in the Middle East, east of Syria."
      }
    },
    {
      "key": "s2-g-cont-israel",
      "level": "medium",
      "q": "Which continent is Israel in?",
      "options": [
        "North America",
        "Australia",
        "Asia",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Israel is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Israel",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-japan",
      "level": "easy",
      "q": "Which continent is Japan in?",
      "options": [
        "Asia",
        "Europe",
        "Australia",
        "North America"
      ],
      "answer": "Asia",
      "point": "Japan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Japan",
        "where": "Asia",
        "note": "Islands to the east of China, in the Pacific Ocean."
      }
    },
    {
      "key": "s2-g-cont-jordan",
      "level": "medium",
      "q": "Which continent is Jordan in?",
      "options": [
        "Europe",
        "Asia",
        "Africa",
        "North America"
      ],
      "answer": "Asia",
      "point": "Jordan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Jordan",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-kazakhstan",
      "level": "medium",
      "q": "Which continent is Kazakhstan in?",
      "options": [
        "Australia",
        "Asia",
        "Africa",
        "North America"
      ],
      "answer": "Asia",
      "point": "Kazakhstan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Kazakhstan",
        "where": "Asia",
        "note": "In Central Asia — the largest landlocked country in the world."
      }
    },
    {
      "key": "s2-g-cont-kuwait",
      "level": "medium",
      "q": "Which continent is Kuwait in?",
      "options": [
        "Asia",
        "South America",
        "Australia",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Kuwait is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Kuwait",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-kyrgyzstan",
      "level": "medium",
      "q": "Which continent is Kyrgyzstan in?",
      "options": [
        "Asia",
        "Australia",
        "Antarctica",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Kyrgyzstan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Kyrgyzstan",
        "where": "Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s2-g-cont-laos",
      "level": "hard",
      "q": "Which continent is Laos in?",
      "options": [
        "Asia",
        "South America",
        "North America",
        "Australia"
      ],
      "answer": "Asia",
      "point": "Laos is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Laos",
        "where": "Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s2-g-cont-lebanon",
      "level": "medium",
      "q": "Which continent is Lebanon in?",
      "options": [
        "Asia",
        "Australia",
        "North America",
        "Europe"
      ],
      "answer": "Asia",
      "point": "Lebanon is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Lebanon",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-malaysia",
      "level": "easy",
      "q": "Which continent is Malaysia in?",
      "options": [
        "Australia",
        "Asia",
        "Africa",
        "South America"
      ],
      "answer": "Asia",
      "point": "Malaysia is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Malaysia",
        "where": "Asia",
        "note": "In South-East Asia, south of Thailand."
      }
    },
    {
      "key": "s2-g-cont-maldives",
      "level": "medium",
      "q": "Which continent is Maldives in?",
      "options": [
        "Africa",
        "Europe",
        "Australia",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Maldives is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Maldives",
        "where": "Asia",
        "note": "Small islands in the Indian Ocean, south-west of India."
      }
    },
    {
      "key": "s2-g-cont-mongolia",
      "level": "hard",
      "q": "Which continent is Mongolia in?",
      "options": [
        "Asia",
        "Europe",
        "Australia",
        "South America"
      ],
      "answer": "Asia",
      "point": "Mongolia is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Mongolia",
        "where": "Asia",
        "note": "In East Asia, between China and Russia."
      }
    },
    {
      "key": "s2-g-cont-myanmar",
      "level": "medium",
      "q": "Which continent is Myanmar in?",
      "options": [
        "Asia",
        "North America",
        "South America",
        "Australia"
      ],
      "answer": "Asia",
      "point": "Myanmar is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Myanmar",
        "where": "Asia",
        "note": "In South-East Asia, east of India and Bangladesh."
      }
    },
    {
      "key": "s2-g-cont-nepal",
      "level": "easy",
      "q": "Which continent is Nepal in?",
      "options": [
        "Asia",
        "Antarctica",
        "South America",
        "Europe"
      ],
      "answer": "Asia",
      "point": "Nepal is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Nepal",
        "where": "Asia",
        "note": "North of India, in the Himalayas — Mount Everest is here."
      }
    },
    {
      "key": "s2-g-cont-north-korea",
      "level": "medium",
      "q": "Which continent is North Korea in?",
      "options": [
        "Asia",
        "Australia",
        "South America",
        "Antarctica"
      ],
      "answer": "Asia",
      "point": "North Korea is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "North Korea",
        "where": "Asia",
        "note": "In East Asia, north of South Korea."
      }
    },
    {
      "key": "s2-g-cont-oman",
      "level": "medium",
      "q": "Which continent is Oman in?",
      "options": [
        "North America",
        "Europe",
        "Antarctica",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Oman is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Oman",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-pakistan",
      "level": "easy",
      "q": "Which continent is Pakistan in?",
      "options": [
        "North America",
        "Antarctica",
        "South America",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Pakistan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Pakistan",
        "where": "Asia",
        "note": "In South Asia, west of India."
      }
    },
    {
      "key": "s2-g-cont-palestine",
      "level": "medium",
      "q": "Which continent is Palestine in?",
      "options": [
        "Europe",
        "Africa",
        "South America",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Palestine is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Palestine",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-philippines",
      "level": "medium",
      "q": "Which continent is Philippines in?",
      "options": [
        "Europe",
        "Asia",
        "Antarctica",
        "North America"
      ],
      "answer": "Asia",
      "point": "Philippines is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Philippines",
        "where": "Asia",
        "note": "Islands in South-East Asia, east of Vietnam."
      }
    },
    {
      "key": "s2-g-cont-qatar",
      "level": "medium",
      "q": "Which continent is Qatar in?",
      "options": [
        "Europe",
        "North America",
        "Asia",
        "South America"
      ],
      "answer": "Asia",
      "point": "Qatar is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Qatar",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-saudi-arabia",
      "level": "easy",
      "q": "Which continent is Saudi Arabia in?",
      "options": [
        "Australia",
        "Antarctica",
        "Africa",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Saudi Arabia is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Saudi Arabia",
        "where": "Asia",
        "note": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf."
      }
    },
    {
      "key": "s2-g-cont-singapore",
      "level": "medium",
      "q": "Which continent is Singapore in?",
      "options": [
        "Asia",
        "Antarctica",
        "Africa",
        "North America"
      ],
      "answer": "Asia",
      "point": "Singapore is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Singapore",
        "where": "Asia",
        "note": "A small island city at the tip of Malaysia."
      }
    },
    {
      "key": "s2-g-cont-south-korea",
      "level": "medium",
      "q": "Which continent is South Korea in?",
      "options": [
        "South America",
        "Europe",
        "Antarctica",
        "Asia"
      ],
      "answer": "Asia",
      "point": "South Korea is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "Asia",
        "note": "In East Asia, south of North Korea."
      }
    },
    {
      "key": "s2-g-cont-sri-lanka",
      "level": "easy",
      "q": "Which continent is Sri Lanka in?",
      "options": [
        "Antarctica",
        "Asia",
        "Africa",
        "Australia"
      ],
      "answer": "Asia",
      "point": "Sri Lanka is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "Asia",
        "note": "A small teardrop island just below India, in the Indian Ocean."
      }
    },
    {
      "key": "s2-g-cont-syria",
      "level": "medium",
      "q": "Which continent is Syria in?",
      "options": [
        "North America",
        "Asia",
        "Antarctica",
        "Europe"
      ],
      "answer": "Asia",
      "point": "Syria is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Syria",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-tajikistan",
      "level": "medium",
      "q": "Which continent is Tajikistan in?",
      "options": [
        "South America",
        "Asia",
        "Africa",
        "Europe"
      ],
      "answer": "Asia",
      "point": "Tajikistan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Tajikistan",
        "where": "Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s2-g-cont-thailand",
      "level": "easy",
      "q": "Which continent is Thailand in?",
      "options": [
        "Africa",
        "Asia",
        "North America",
        "Europe"
      ],
      "answer": "Asia",
      "point": "Thailand is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Thailand",
        "where": "Asia",
        "note": "In South-East Asia, east of Myanmar."
      }
    },
    {
      "key": "s2-g-cont-east-timor",
      "level": "hard",
      "q": "Which continent is East Timor in?",
      "options": [
        "South America",
        "Antarctica",
        "Australia",
        "Asia"
      ],
      "answer": "Asia",
      "point": "East Timor is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "East Timor",
        "where": "Asia",
        "note": "A small country on the island of Timor, north of Australia."
      }
    },
    {
      "key": "s2-g-cont-turkey",
      "level": "easy",
      "q": "Which continent is Turkey in?",
      "options": [
        "Asia",
        "Australia",
        "Antarctica",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Turkey is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Turkey",
        "where": "Asia",
        "note": "Between Europe and Asia, north of Syria and Iraq."
      }
    },
    {
      "key": "s2-g-cont-turkmenistan",
      "level": "medium",
      "q": "Which continent is Turkmenistan in?",
      "options": [
        "Africa",
        "Asia",
        "Australia",
        "North America"
      ],
      "answer": "Asia",
      "point": "Turkmenistan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Turkmenistan",
        "where": "Asia",
        "note": "In Central Asia, east of the Caspian Sea."
      }
    },
    {
      "key": "s2-g-cont-uae",
      "level": "easy",
      "q": "Which continent is UAE in?",
      "options": [
        "Australia",
        "Asia",
        "Europe",
        "North America"
      ],
      "answer": "Asia",
      "point": "UAE is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "UAE",
        "where": "Asia",
        "note": "On the Arabian Peninsula, next to Saudi Arabia and Oman."
      }
    },
    {
      "key": "s2-g-cont-uzbekistan",
      "level": "medium",
      "q": "Which continent is Uzbekistan in?",
      "options": [
        "North America",
        "Europe",
        "Asia",
        "Africa"
      ],
      "answer": "Asia",
      "point": "Uzbekistan is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Uzbekistan",
        "where": "Asia",
        "note": "In Central Asia, south of Kazakhstan."
      }
    },
    {
      "key": "s2-g-cont-vietnam",
      "level": "easy",
      "q": "Which continent is Vietnam in?",
      "options": [
        "North America",
        "Africa",
        "South America",
        "Asia"
      ],
      "answer": "Asia",
      "point": "Vietnam is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "Asia",
        "note": "In South-East Asia, east of Cambodia."
      }
    },
    {
      "key": "s2-g-cont-yemen",
      "level": "medium",
      "q": "Which continent is Yemen in?",
      "options": [
        "Africa",
        "North America",
        "Asia",
        "Europe"
      ],
      "answer": "Asia",
      "point": "Yemen is in Asia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Yemen",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s2-g-cont-albania",
      "level": "hard",
      "q": "Which continent is Albania in?",
      "options": [
        "Europe",
        "North America",
        "Antarctica",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Albania is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Albania",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s2-g-cont-andorra",
      "level": "hard",
      "q": "Which continent is Andorra in?",
      "options": [
        "Australia",
        "Europe",
        "North America",
        "South America"
      ],
      "answer": "Europe",
      "point": "Andorra is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Andorra",
        "where": "Europe",
        "note": "A small country in Europe, between France and Spain."
      }
    },
    {
      "key": "s2-g-cont-austria",
      "level": "medium",
      "q": "Which continent is Austria in?",
      "options": [
        "Europe",
        "Antarctica",
        "South America",
        "Australia"
      ],
      "answer": "Europe",
      "point": "Austria is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Austria",
        "where": "Europe",
        "note": "In Europe, in the Alps — Vienna is its capital."
      }
    },
    {
      "key": "s2-g-cont-belarus",
      "level": "medium",
      "q": "Which continent is Belarus in?",
      "options": [
        "Europe",
        "Antarctica",
        "Africa",
        "North America"
      ],
      "answer": "Europe",
      "point": "Belarus is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Belarus",
        "where": "Europe",
        "note": "In Europe, east of Poland."
      }
    },
    {
      "key": "s2-g-cont-belgium",
      "level": "medium",
      "q": "Which continent is Belgium in?",
      "options": [
        "Europe",
        "Antarctica",
        "North America",
        "South America"
      ],
      "answer": "Europe",
      "point": "Belgium is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Belgium",
        "where": "Europe",
        "note": "In Europe, between France and the Netherlands."
      }
    },
    {
      "key": "s2-g-cont-bosnia-and-herzegovina",
      "level": "hard",
      "q": "Which continent is Bosnia and Herzegovina in?",
      "options": [
        "Antarctica",
        "North America",
        "Europe",
        "Africa"
      ],
      "answer": "Europe",
      "point": "Bosnia and Herzegovina is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Bosnia and Herzegovina",
        "where": "Europe",
        "note": "In Europe — Sarajevo is its capital."
      }
    },
    {
      "key": "s2-g-cont-bulgaria",
      "level": "medium",
      "q": "Which continent is Bulgaria in?",
      "options": [
        "Antarctica",
        "Africa",
        "North America",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Bulgaria is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Bulgaria",
        "where": "Europe",
        "note": "In Europe, on the Black Sea."
      }
    },
    {
      "key": "s2-g-cont-croatia",
      "level": "medium",
      "q": "Which continent is Croatia in?",
      "options": [
        "Asia",
        "South America",
        "Australia",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Croatia is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Croatia",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s2-g-cont-czech-republic",
      "level": "medium",
      "q": "Which continent is Czech Republic in?",
      "options": [
        "South America",
        "Europe",
        "North America",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Czech Republic is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Czech Republic",
        "where": "Europe",
        "note": "In Europe, next to Germany and Poland."
      }
    },
    {
      "key": "s2-g-cont-denmark",
      "level": "medium",
      "q": "Which continent is Denmark in?",
      "options": [
        "Australia",
        "Europe",
        "North America",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Denmark is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Denmark",
        "where": "Europe",
        "note": "In Europe, north of Germany."
      }
    },
    {
      "key": "s2-g-cont-estonia",
      "level": "hard",
      "q": "Which continent is Estonia in?",
      "options": [
        "Australia",
        "Antarctica",
        "South America",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Estonia is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Estonia",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s2-g-cont-finland",
      "level": "medium",
      "q": "Which continent is Finland in?",
      "options": [
        "Australia",
        "Europe",
        "South America",
        "North America"
      ],
      "answer": "Europe",
      "point": "Finland is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Finland",
        "where": "Europe",
        "note": "In Europe, east of Sweden."
      }
    },
    {
      "key": "s2-g-cont-france",
      "level": "easy",
      "q": "Which continent is France in?",
      "options": [
        "North America",
        "Antarctica",
        "Australia",
        "Europe"
      ],
      "answer": "Europe",
      "point": "France is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "France",
        "where": "Europe",
        "note": "In western Europe, next to the United Kingdom and Germany."
      }
    },
    {
      "key": "s2-g-cont-germany",
      "level": "easy",
      "q": "Which continent is Germany in?",
      "options": [
        "North America",
        "Europe",
        "Asia",
        "Antarctica"
      ],
      "answer": "Europe",
      "point": "Germany is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Germany",
        "where": "Europe",
        "note": "In Europe, next to France and Poland."
      }
    },
    {
      "key": "s2-g-cont-greece",
      "level": "easy",
      "q": "Which continent is Greece in?",
      "options": [
        "Europe",
        "South America",
        "Antarctica",
        "North America"
      ],
      "answer": "Europe",
      "point": "Greece is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Greece",
        "where": "Europe",
        "note": "In Europe, on the Mediterranean Sea — Athens is its capital."
      }
    },
    {
      "key": "s2-g-cont-hungary",
      "level": "medium",
      "q": "Which continent is Hungary in?",
      "options": [
        "Australia",
        "Antarctica",
        "Europe",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Hungary is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Hungary",
        "where": "Europe",
        "note": "In Europe, next to Austria."
      }
    },
    {
      "key": "s2-g-cont-iceland",
      "level": "hard",
      "q": "Which continent is Iceland in?",
      "options": [
        "South America",
        "Asia",
        "Europe",
        "Africa"
      ],
      "answer": "Europe",
      "point": "Iceland is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Iceland",
        "where": "Europe",
        "note": "An island in the North Atlantic, north-west of Europe."
      }
    },
    {
      "key": "s2-g-cont-ireland",
      "level": "medium",
      "q": "Which continent is Ireland in?",
      "options": [
        "Australia",
        "South America",
        "Europe",
        "Antarctica"
      ],
      "answer": "Europe",
      "point": "Ireland is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Ireland",
        "where": "Europe",
        "note": "An island west of the United Kingdom."
      }
    },
    {
      "key": "s2-g-cont-italy",
      "level": "easy",
      "q": "Which continent is Italy in?",
      "options": [
        "North America",
        "Europe",
        "South America",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Italy is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Italy",
        "where": "Europe",
        "note": "In Europe — the boot kicking Sicily."
      }
    },
    {
      "key": "s2-g-cont-latvia",
      "level": "hard",
      "q": "Which continent is Latvia in?",
      "options": [
        "Australia",
        "Africa",
        "Asia",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Latvia is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Latvia",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s2-g-cont-liechtenstein",
      "level": "hard",
      "q": "Which continent is Liechtenstein in?",
      "options": [
        "Antarctica",
        "North America",
        "Australia",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Liechtenstein is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Liechtenstein",
        "where": "Europe",
        "note": "A small country in Europe, between Switzerland and Austria."
      }
    },
    {
      "key": "s2-g-cont-lithuania",
      "level": "hard",
      "q": "Which continent is Lithuania in?",
      "options": [
        "South America",
        "North America",
        "Europe",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Lithuania is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Lithuania",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s2-g-cont-luxembourg",
      "level": "hard",
      "q": "Which continent is Luxembourg in?",
      "options": [
        "Australia",
        "North America",
        "Europe",
        "Africa"
      ],
      "answer": "Europe",
      "point": "Luxembourg is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Luxembourg",
        "where": "Europe",
        "note": "A small country in Europe, between France, Germany and Belgium."
      }
    },
    {
      "key": "s2-g-cont-malta",
      "level": "hard",
      "q": "Which continent is Malta in?",
      "options": [
        "Africa",
        "Europe",
        "Antarctica",
        "Australia"
      ],
      "answer": "Europe",
      "point": "Malta is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Malta",
        "where": "Europe",
        "note": "A small island in the Mediterranean Sea, south of Italy."
      }
    },
    {
      "key": "s2-g-cont-moldova",
      "level": "hard",
      "q": "Which continent is Moldova in?",
      "options": [
        "Europe",
        "Africa",
        "North America",
        "Antarctica"
      ],
      "answer": "Europe",
      "point": "Moldova is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Moldova",
        "where": "Europe",
        "note": "In Europe, between Romania and Ukraine."
      }
    },
    {
      "key": "s2-g-cont-monaco",
      "level": "hard",
      "q": "Which continent is Monaco in?",
      "options": [
        "Asia",
        "North America",
        "Europe",
        "Africa"
      ],
      "answer": "Europe",
      "point": "Monaco is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Monaco",
        "where": "Europe",
        "note": "A tiny country in Europe, on the Mediterranean Sea."
      }
    },
    {
      "key": "s2-g-cont-montenegro",
      "level": "hard",
      "q": "Which continent is Montenegro in?",
      "options": [
        "Australia",
        "Europe",
        "Antarctica",
        "South America"
      ],
      "answer": "Europe",
      "point": "Montenegro is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Montenegro",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s2-g-cont-netherlands",
      "level": "medium",
      "q": "Which continent is Netherlands in?",
      "options": [
        "Asia",
        "Africa",
        "Europe",
        "Antarctica"
      ],
      "answer": "Europe",
      "point": "Netherlands is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Netherlands",
        "where": "Europe",
        "note": "In Europe, on the North Sea — Amsterdam is its capital."
      }
    },
    {
      "key": "s2-g-cont-north-macedonia",
      "level": "hard",
      "q": "Which continent is North Macedonia in?",
      "options": [
        "Europe",
        "South America",
        "Australia",
        "Africa"
      ],
      "answer": "Europe",
      "point": "North Macedonia is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "North Macedonia",
        "where": "Europe",
        "note": "In Europe — Skopje is its capital."
      }
    },
    {
      "key": "s2-g-cont-norway",
      "level": "medium",
      "q": "Which continent is Norway in?",
      "options": [
        "South America",
        "Europe",
        "Australia",
        "Antarctica"
      ],
      "answer": "Europe",
      "point": "Norway is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Norway",
        "where": "Europe",
        "note": "In Europe, in Scandinavia — Oslo is its capital."
      }
    },
    {
      "key": "s2-g-cont-poland",
      "level": "medium",
      "q": "Which continent is Poland in?",
      "options": [
        "Europe",
        "Antarctica",
        "Africa",
        "North America"
      ],
      "answer": "Europe",
      "point": "Poland is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Poland",
        "where": "Europe",
        "note": "In Europe, east of Germany."
      }
    },
    {
      "key": "s2-g-cont-portugal",
      "level": "medium",
      "q": "Which continent is Portugal in?",
      "options": [
        "South America",
        "Antarctica",
        "Europe",
        "Australia"
      ],
      "answer": "Europe",
      "point": "Portugal is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Portugal",
        "where": "Europe",
        "note": "In Europe, west of Spain."
      }
    },
    {
      "key": "s2-g-cont-romania",
      "level": "medium",
      "q": "Which continent is Romania in?",
      "options": [
        "North America",
        "Australia",
        "Antarctica",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Romania is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Romania",
        "where": "Europe",
        "note": "In Europe, on the Black Sea."
      }
    },
    {
      "key": "s2-g-cont-russia",
      "level": "easy",
      "q": "Which continent is Russia in?",
      "options": [
        "Europe and Asia",
        "Australia",
        "North America",
        "South America"
      ],
      "answer": "Europe and Asia",
      "point": "Russia is in Europe and Asia.",
      "typed": "Europe and Asia",
      "accept": [
        "europe asia"
      ],
      "map": {
        "kind": "world",
        "place": "Russia",
        "where": "Europe and Asia",
        "note": "The biggest country — across the north of Europe and Asia."
      }
    },
    {
      "key": "s2-g-cont-san-marino",
      "level": "hard",
      "q": "Which continent is San Marino in?",
      "options": [
        "Australia",
        "Europe",
        "North America",
        "Antarctica"
      ],
      "answer": "Europe",
      "point": "San Marino is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "San Marino",
        "where": "Europe",
        "note": "A tiny country inside Italy."
      }
    },
    {
      "key": "s2-g-cont-serbia",
      "level": "medium",
      "q": "Which continent is Serbia in?",
      "options": [
        "Europe",
        "Antarctica",
        "North America",
        "Australia"
      ],
      "answer": "Europe",
      "point": "Serbia is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Serbia",
        "where": "Europe",
        "note": "In Europe — Belgrade is its capital."
      }
    },
    {
      "key": "s2-g-cont-slovakia",
      "level": "medium",
      "q": "Which continent is Slovakia in?",
      "options": [
        "North America",
        "Europe",
        "Antarctica",
        "Africa"
      ],
      "answer": "Europe",
      "point": "Slovakia is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Slovakia",
        "where": "Europe",
        "note": "In Europe, next to the Czech Republic."
      }
    },
    {
      "key": "s2-g-cont-slovenia",
      "level": "hard",
      "q": "Which continent is Slovenia in?",
      "options": [
        "Africa",
        "Europe",
        "North America",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Slovenia is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Slovenia",
        "where": "Europe",
        "note": "In Europe, next to Italy and Austria."
      }
    },
    {
      "key": "s2-g-cont-spain",
      "level": "easy",
      "q": "Which continent is Spain in?",
      "options": [
        "Antarctica",
        "Asia",
        "Africa",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Spain is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Spain",
        "where": "Europe",
        "note": "In Europe, next to Portugal and France."
      }
    },
    {
      "key": "s2-g-cont-sweden",
      "level": "medium",
      "q": "Which continent is Sweden in?",
      "options": [
        "South America",
        "Australia",
        "Europe",
        "Asia"
      ],
      "answer": "Europe",
      "point": "Sweden is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Sweden",
        "where": "Europe",
        "note": "In Europe, in Scandinavia."
      }
    },
    {
      "key": "s2-g-cont-switzerland",
      "level": "medium",
      "q": "Which continent is Switzerland in?",
      "options": [
        "Australia",
        "Antarctica",
        "North America",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Switzerland is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Switzerland",
        "where": "Europe",
        "note": "In Europe, in the Alps."
      }
    },
    {
      "key": "s2-g-cont-ukraine",
      "level": "medium",
      "q": "Which continent is Ukraine in?",
      "options": [
        "Antarctica",
        "Australia",
        "Africa",
        "Europe"
      ],
      "answer": "Europe",
      "point": "Ukraine is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Ukraine",
        "where": "Europe",
        "note": "In Europe, east of Poland — Kyiv is its capital."
      }
    },
    {
      "key": "s2-g-cont-united-kingdom",
      "level": "easy",
      "q": "Which continent is United Kingdom in?",
      "options": [
        "Australia",
        "Europe",
        "North America",
        "South America"
      ],
      "answer": "Europe",
      "point": "United Kingdom is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "United Kingdom",
        "where": "Europe",
        "note": "Islands north-west of Europe — England, Scotland and Wales."
      }
    },
    {
      "key": "s2-g-cont-vatican-city",
      "level": "medium",
      "q": "Which continent is Vatican City in?",
      "options": [
        "South America",
        "Australia",
        "Europe",
        "Antarctica"
      ],
      "answer": "Europe",
      "point": "Vatican City is in Europe.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "Vatican City",
        "where": "Europe",
        "note": "The smallest country in the world, inside Rome."
      }
    },
    {
      "key": "s2-g-cont-antigua-and-barbuda",
      "level": "hard",
      "q": "Which continent is Antigua and Barbuda in?",
      "options": [
        "North America",
        "Australia",
        "South America",
        "Asia"
      ],
      "answer": "North America",
      "point": "Antigua and Barbuda is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Antigua and Barbuda",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s2-g-cont-bahamas",
      "level": "medium",
      "q": "Which continent is Bahamas in?",
      "options": [
        "Africa",
        "North America",
        "South America",
        "Asia"
      ],
      "answer": "North America",
      "point": "Bahamas is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Bahamas",
        "where": "North America",
        "note": "Islands in the Atlantic Ocean, south-east of Florida."
      }
    },
    {
      "key": "s2-g-cont-barbados",
      "level": "hard",
      "q": "Which continent is Barbados in?",
      "options": [
        "North America",
        "Africa",
        "Europe",
        "Australia"
      ],
      "answer": "North America",
      "point": "Barbados is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Barbados",
        "where": "North America",
        "note": "An island in the Caribbean Sea."
      }
    },
    {
      "key": "s2-g-cont-belize",
      "level": "hard",
      "q": "Which continent is Belize in?",
      "options": [
        "North America",
        "Antarctica",
        "South America",
        "Australia"
      ],
      "answer": "North America",
      "point": "Belize is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Belize",
        "where": "North America",
        "note": "In Central America, on the Caribbean Sea."
      }
    },
    {
      "key": "s2-g-cont-canada",
      "level": "easy",
      "q": "Which continent is Canada in?",
      "options": [
        "Africa",
        "Antarctica",
        "Australia",
        "North America"
      ],
      "answer": "North America",
      "point": "Canada is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Canada",
        "where": "North America",
        "note": "North of the USA — the second-largest country in the world."
      }
    },
    {
      "key": "s2-g-cont-costa-rica",
      "level": "medium",
      "q": "Which continent is Costa Rica in?",
      "options": [
        "North America",
        "Antarctica",
        "Africa",
        "South America"
      ],
      "answer": "North America",
      "point": "Costa Rica is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Costa Rica",
        "where": "North America",
        "note": "In Central America, between Nicaragua and Panama."
      }
    },
    {
      "key": "s2-g-cont-cuba",
      "level": "medium",
      "q": "Which continent is Cuba in?",
      "options": [
        "North America",
        "South America",
        "Europe",
        "Asia"
      ],
      "answer": "North America",
      "point": "Cuba is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Cuba",
        "where": "North America",
        "note": "An island in the Caribbean Sea, south of the USA."
      }
    },
    {
      "key": "s2-g-cont-dominica",
      "level": "hard",
      "q": "Which continent is Dominica in?",
      "options": [
        "Europe",
        "Australia",
        "North America",
        "Africa"
      ],
      "answer": "North America",
      "point": "Dominica is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Dominica",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s2-g-cont-dominican-republic",
      "level": "medium",
      "q": "Which continent is Dominican Republic in?",
      "options": [
        "Africa",
        "North America",
        "Antarctica",
        "Europe"
      ],
      "answer": "North America",
      "point": "Dominican Republic is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Dominican Republic",
        "where": "North America",
        "note": "On the island of Hispaniola, in the Caribbean Sea."
      }
    },
    {
      "key": "s2-g-cont-el-salvador",
      "level": "medium",
      "q": "Which continent is El Salvador in?",
      "options": [
        "Antarctica",
        "Europe",
        "North America",
        "Asia"
      ],
      "answer": "North America",
      "point": "El Salvador is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "El Salvador",
        "where": "North America",
        "note": "In Central America, on the Pacific Ocean."
      }
    },
    {
      "key": "s2-g-cont-grenada",
      "level": "hard",
      "q": "Which continent is Grenada in?",
      "options": [
        "South America",
        "Africa",
        "Europe",
        "North America"
      ],
      "answer": "North America",
      "point": "Grenada is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Grenada",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s2-g-cont-guatemala",
      "level": "medium",
      "q": "Which continent is Guatemala in?",
      "options": [
        "Europe",
        "South America",
        "North America",
        "Antarctica"
      ],
      "answer": "North America",
      "point": "Guatemala is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Guatemala",
        "where": "North America",
        "note": "In Central America, south of Mexico."
      }
    },
    {
      "key": "s2-g-cont-haiti",
      "level": "medium",
      "q": "Which continent is Haiti in?",
      "options": [
        "North America",
        "Australia",
        "Antarctica",
        "Africa"
      ],
      "answer": "North America",
      "point": "Haiti is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Haiti",
        "where": "North America",
        "note": "On the island of Hispaniola, in the Caribbean Sea."
      }
    },
    {
      "key": "s2-g-cont-honduras",
      "level": "medium",
      "q": "Which continent is Honduras in?",
      "options": [
        "Europe",
        "North America",
        "Australia",
        "Africa"
      ],
      "answer": "North America",
      "point": "Honduras is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Honduras",
        "where": "North America",
        "note": "In Central America, between Guatemala and Nicaragua."
      }
    },
    {
      "key": "s2-g-cont-jamaica",
      "level": "medium",
      "q": "Which continent is Jamaica in?",
      "options": [
        "Antarctica",
        "North America",
        "Australia",
        "Africa"
      ],
      "answer": "North America",
      "point": "Jamaica is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Jamaica",
        "where": "North America",
        "note": "An island in the Caribbean Sea, south of Cuba."
      }
    },
    {
      "key": "s2-g-cont-mexico",
      "level": "easy",
      "q": "Which continent is Mexico in?",
      "options": [
        "Australia",
        "North America",
        "Antarctica",
        "Africa"
      ],
      "answer": "North America",
      "point": "Mexico is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Mexico",
        "where": "North America",
        "note": "South of the USA, in North America."
      }
    },
    {
      "key": "s2-g-cont-nicaragua",
      "level": "medium",
      "q": "Which continent is Nicaragua in?",
      "options": [
        "Asia",
        "Africa",
        "North America",
        "South America"
      ],
      "answer": "North America",
      "point": "Nicaragua is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Nicaragua",
        "where": "North America",
        "note": "In Central America, between Honduras and Costa Rica."
      }
    },
    {
      "key": "s2-g-cont-panama",
      "level": "medium",
      "q": "Which continent is Panama in?",
      "options": [
        "North America",
        "Asia",
        "Australia",
        "South America"
      ],
      "answer": "North America",
      "point": "Panama is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Panama",
        "where": "North America",
        "note": "In Central America — the Panama Canal is here."
      }
    },
    {
      "key": "s2-g-cont-st-kitts-and-nevis",
      "level": "hard",
      "q": "Which continent is St. Kitts and Nevis in?",
      "options": [
        "North America",
        "Antarctica",
        "Europe",
        "Australia"
      ],
      "answer": "North America",
      "point": "St. Kitts and Nevis is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "St. Kitts and Nevis",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s2-g-cont-st-lucia",
      "level": "hard",
      "q": "Which continent is St. Lucia in?",
      "options": [
        "North America",
        "Europe",
        "South America",
        "Australia"
      ],
      "answer": "North America",
      "point": "St. Lucia is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "St. Lucia",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s2-g-cont-st-vincent-and-the-grenadines",
      "level": "hard",
      "q": "Which continent is St. Vincent and the Grenadines in?",
      "options": [
        "North America",
        "Australia",
        "Asia",
        "Europe"
      ],
      "answer": "North America",
      "point": "St. Vincent and the Grenadines is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "St. Vincent and the Grenadines",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s2-g-cont-trinidad-and-tobago",
      "level": "medium",
      "q": "Which continent is Trinidad and Tobago in?",
      "options": [
        "Europe",
        "South America",
        "North America",
        "Antarctica"
      ],
      "answer": "North America",
      "point": "Trinidad and Tobago is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Trinidad and Tobago",
        "where": "North America",
        "note": "Islands in the Caribbean Sea, north of Venezuela."
      }
    },
    {
      "key": "s2-g-cont-united-states",
      "level": "easy",
      "q": "Which continent is United States in?",
      "options": [
        "Australia",
        "North America",
        "Europe",
        "Asia"
      ],
      "answer": "North America",
      "point": "United States is in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "United States",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s2-g-cont-argentina",
      "level": "easy",
      "q": "Which continent is Argentina in?",
      "options": [
        "South America",
        "Antarctica",
        "Asia",
        "Australia"
      ],
      "answer": "South America",
      "point": "Argentina is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Argentina",
        "where": "South America",
        "note": "In South America, south of Brazil."
      }
    },
    {
      "key": "s2-g-cont-bolivia",
      "level": "medium",
      "q": "Which continent is Bolivia in?",
      "options": [
        "South America",
        "Australia",
        "Africa",
        "Europe"
      ],
      "answer": "South America",
      "point": "Bolivia is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Bolivia",
        "where": "South America",
        "note": "In South America — Sucre is its capital."
      }
    },
    {
      "key": "s2-g-cont-brazil",
      "level": "easy",
      "q": "Which continent is Brazil in?",
      "options": [
        "Europe",
        "Antarctica",
        "South America",
        "Africa"
      ],
      "answer": "South America",
      "point": "Brazil is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Brazil",
        "where": "South America",
        "note": "The biggest country in South America."
      }
    },
    {
      "key": "s2-g-cont-chile",
      "level": "medium",
      "q": "Which continent is Chile in?",
      "options": [
        "Asia",
        "Australia",
        "South America",
        "North America"
      ],
      "answer": "South America",
      "point": "Chile is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Chile",
        "where": "South America",
        "note": "A long thin country on the west coast of South America."
      }
    },
    {
      "key": "s2-g-cont-colombia",
      "level": "medium",
      "q": "Which continent is Colombia in?",
      "options": [
        "South America",
        "Europe",
        "Asia",
        "Africa"
      ],
      "answer": "South America",
      "point": "Colombia is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Colombia",
        "where": "South America",
        "note": "In South America, in the north-west — next to Panama."
      }
    },
    {
      "key": "s2-g-cont-ecuador",
      "level": "medium",
      "q": "Which continent is Ecuador in?",
      "options": [
        "Africa",
        "North America",
        "Antarctica",
        "South America"
      ],
      "answer": "South America",
      "point": "Ecuador is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Ecuador",
        "where": "South America",
        "note": "In South America, on the Pacific Ocean — the Equator runs through it."
      }
    },
    {
      "key": "s2-g-cont-guyana",
      "level": "hard",
      "q": "Which continent is Guyana in?",
      "options": [
        "Africa",
        "Europe",
        "Australia",
        "South America"
      ],
      "answer": "South America",
      "point": "Guyana is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Guyana",
        "where": "South America",
        "note": "In South America, on the Atlantic Ocean."
      }
    },
    {
      "key": "s2-g-cont-paraguay",
      "level": "medium",
      "q": "Which continent is Paraguay in?",
      "options": [
        "Antarctica",
        "Africa",
        "Europe",
        "South America"
      ],
      "answer": "South America",
      "point": "Paraguay is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Paraguay",
        "where": "South America",
        "note": "In South America, between Argentina and Brazil."
      }
    },
    {
      "key": "s2-g-cont-peru",
      "level": "medium",
      "q": "Which continent is Peru in?",
      "options": [
        "Antarctica",
        "North America",
        "Australia",
        "South America"
      ],
      "answer": "South America",
      "point": "Peru is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Peru",
        "where": "South America",
        "note": "In South America, on the Pacific Ocean — Machu Picchu is here."
      }
    },
    {
      "key": "s2-g-cont-suriname",
      "level": "hard",
      "q": "Which continent is Suriname in?",
      "options": [
        "Australia",
        "Antarctica",
        "South America",
        "North America"
      ],
      "answer": "South America",
      "point": "Suriname is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Suriname",
        "where": "South America",
        "note": "In South America, on the Atlantic Ocean."
      }
    },
    {
      "key": "s2-g-cont-uruguay",
      "level": "medium",
      "q": "Which continent is Uruguay in?",
      "options": [
        "Australia",
        "South America",
        "North America",
        "Asia"
      ],
      "answer": "South America",
      "point": "Uruguay is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Uruguay",
        "where": "South America",
        "note": "In South America, between Argentina and Brazil."
      }
    },
    {
      "key": "s2-g-cont-venezuela",
      "level": "medium",
      "q": "Which continent is Venezuela in?",
      "options": [
        "Antarctica",
        "South America",
        "Australia",
        "Asia"
      ],
      "answer": "South America",
      "point": "Venezuela is in South America.",
      "typed": "South America",
      "map": {
        "kind": "world",
        "place": "Venezuela",
        "where": "South America",
        "note": "In South America, on the Caribbean Sea."
      }
    },
    {
      "key": "s2-g-cont-australia",
      "level": "easy",
      "q": "Which continent is Australia in?",
      "options": [
        "Africa",
        "North America",
        "Australia",
        "Europe"
      ],
      "answer": "Australia",
      "point": "Australia is both a country and a continent.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Australia",
        "where": "Australia",
        "note": "The island continent, south-east of Asia."
      }
    },
    {
      "key": "s2-g-cont-fiji",
      "level": "hard",
      "q": "Which continent is Fiji in?",
      "options": [
        "Australia",
        "Antarctica",
        "Europe",
        "North America"
      ],
      "answer": "Australia",
      "point": "Fiji is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Fiji",
        "where": "Australia",
        "note": "Islands in the Pacific Ocean, east of Australia."
      }
    },
    {
      "key": "s2-g-cont-kiribati",
      "level": "hard",
      "q": "Which continent is Kiribati in?",
      "options": [
        "Australia",
        "Africa",
        "North America",
        "South America"
      ],
      "answer": "Australia",
      "point": "Kiribati is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Kiribati",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-marshall-islands",
      "level": "hard",
      "q": "Which continent is Marshall Islands in?",
      "options": [
        "Europe",
        "Antarctica",
        "Australia",
        "Africa"
      ],
      "answer": "Australia",
      "point": "Marshall Islands is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Marshall Islands",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-micronesia",
      "level": "hard",
      "q": "Which continent is Micronesia in?",
      "options": [
        "North America",
        "South America",
        "Europe",
        "Australia"
      ],
      "answer": "Australia",
      "point": "Micronesia is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Micronesia",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-nauru",
      "level": "hard",
      "q": "Which continent is Nauru in?",
      "options": [
        "Australia",
        "North America",
        "Europe",
        "Asia"
      ],
      "answer": "Australia",
      "point": "Nauru is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Nauru",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-new-zealand",
      "level": "easy",
      "q": "Which continent is New Zealand in?",
      "options": [
        "Asia",
        "Australia",
        "Antarctica",
        "South America"
      ],
      "answer": "Australia",
      "point": "New Zealand is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "New Zealand",
        "where": "Australia",
        "note": "Islands south-east of Australia, in the Pacific Ocean."
      }
    },
    {
      "key": "s2-g-cont-palau",
      "level": "hard",
      "q": "Which continent is Palau in?",
      "options": [
        "Antarctica",
        "Africa",
        "Asia",
        "Australia"
      ],
      "answer": "Australia",
      "point": "Palau is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Palau",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-papua-new-guinea",
      "level": "medium",
      "q": "Which continent is Papua New Guinea in?",
      "options": [
        "Europe",
        "Asia",
        "South America",
        "Australia"
      ],
      "answer": "Australia",
      "point": "Papua New Guinea is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Papua New Guinea",
        "where": "Australia",
        "note": "On the island of New Guinea, north of Australia."
      }
    },
    {
      "key": "s2-g-cont-samoa",
      "level": "hard",
      "q": "Which continent is Samoa in?",
      "options": [
        "Australia",
        "Antarctica",
        "South America",
        "North America"
      ],
      "answer": "Australia",
      "point": "Samoa is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Samoa",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-solomon-islands",
      "level": "hard",
      "q": "Which continent is Solomon Islands in?",
      "options": [
        "Antarctica",
        "Asia",
        "Australia",
        "South America"
      ],
      "answer": "Australia",
      "point": "Solomon Islands is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Solomon Islands",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-tonga",
      "level": "hard",
      "q": "Which continent is Tonga in?",
      "options": [
        "Africa",
        "South America",
        "Australia",
        "Antarctica"
      ],
      "answer": "Australia",
      "point": "Tonga is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Tonga",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-tuvalu",
      "level": "hard",
      "q": "Which continent is Tuvalu in?",
      "options": [
        "Australia",
        "South America",
        "Asia",
        "Europe"
      ],
      "answer": "Australia",
      "point": "Tuvalu is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Tuvalu",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-cont-vanuatu",
      "level": "hard",
      "q": "Which continent is Vanuatu in?",
      "options": [
        "Europe",
        "Antarctica",
        "Australia",
        "Africa"
      ],
      "answer": "Australia",
      "point": "Vanuatu is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Vanuatu",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s2-g-sea1",
      "level": "hard",
      "q": "Which is the second-largest island in the world?",
      "options": [
        "Madagascar",
        "Borneo",
        "New Guinea",
        "Sumatra"
      ],
      "answer": "New Guinea",
      "point": "New Guinea is the second-largest island in the world (after Greenland).",
      "typed": "New Guinea",
      "map": {
        "kind": "world",
        "place": "New Guinea",
        "where": "Australia",
        "note": "North of Australia — the island of Papua New Guinea."
      }
    },
    {
      "key": "s2-g-sea2",
      "level": "medium",
      "q": "Madagascar is in which ocean?",
      "options": [
        "Southern Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean"
      ],
      "answer": "Indian Ocean",
      "point": "Madagascar is a big island in the Indian Ocean, off Africa.",
      "typed": "Indian Ocean",
      "map": {
        "kind": "world",
        "place": "Madagascar",
        "where": "Africa",
        "note": "A big island off the south-east coast of Africa."
      }
    },
    {
      "key": "s2-g-sea3",
      "level": "medium",
      "q": "Which sea is between India and Sri Lanka?",
      "options": [
        "Bay of Bengal",
        "Arabian Sea",
        "Red Sea",
        "Palk Strait"
      ],
      "answer": "Palk Strait",
      "point": "The Palk Strait is between India and Sri Lanka.",
      "typed": "Palk Strait",
      "map": {
        "kind": "india",
        "place": "Palk Strait",
        "where": "Between India and Sri Lanka",
        "note": "Between India (Tamil Nadu) and Sri Lanka."
      }
    },
    {
      "key": "s2-g-sea4",
      "level": "medium",
      "q": "Which sea is between Australia and New Zealand?",
      "options": [
        "Timor Sea",
        "Indian Ocean",
        "Tasman Sea",
        "Coral Sea"
      ],
      "answer": "Tasman Sea",
      "point": "The Tasman Sea is between Australia and New Zealand.",
      "typed": "Tasman Sea",
      "map": {
        "kind": "world",
        "place": "Tasman Sea",
        "where": "Australia",
        "note": "Between Australia and New Zealand."
      }
    },
    {
      "key": "s2-g-sea5",
      "level": "medium",
      "q": "Which sea is between the United Kingdom and France?",
      "options": [
        "North Sea",
        "English Channel",
        "Irish Sea",
        "Mediterranean Sea"
      ],
      "answer": "English Channel",
      "point": "The English Channel is between the United Kingdom and France.",
      "typed": "English Channel",
      "map": {
        "kind": "world",
        "place": "English Channel",
        "where": "Europe",
        "note": "Between the United Kingdom and France."
      }
    },
    {
      "key": "s2-g-sea6",
      "level": "hard",
      "q": "Which sea is between Timor and Australia?",
      "options": [
        "Coral Sea",
        "Timor Sea",
        "Arafura Sea",
        "Java Sea"
      ],
      "answer": "Timor Sea",
      "point": "The Timor Sea is between Timor (East Timor) and Australia.",
      "typed": "Timor Sea",
      "map": {
        "kind": "world",
        "place": "Timor Sea",
        "where": "Australia",
        "note": "Between East Timor and Australia."
      }
    },
    {
      "key": "s2-g-sea7",
      "level": "medium",
      "q": "Which ocean is between North America and Europe?",
      "options": [
        "Atlantic Ocean",
        "Pacific Ocean",
        "Southern Ocean",
        "Indian Ocean"
      ],
      "answer": "Atlantic Ocean",
      "point": "The Atlantic Ocean is between North America and Europe.",
      "typed": "Atlantic Ocean",
      "map": {
        "kind": "world",
        "place": "Atlantic Ocean",
        "where": "Between North America and Europe",
        "note": "Between North America (west) and Europe and Africa (east)."
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
        "Europe",
        "Central Asia",
        "Middle East (West Asia)",
        "South Asia"
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
        "South Asia",
        "Middle East (West Asia)",
        "North America",
        "Central Asia"
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
        "Middle East (West Asia)",
        "South Asia",
        "Africa",
        "Central Asia"
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
        "South Asia",
        "Europe",
        "Middle East (West Asia)",
        "Central Asia"
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
        "Central Asia",
        "Middle East (West Asia)",
        "South Asia",
        "North America"
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
        "Middle East (West Asia)",
        "Central Asia",
        "Africa",
        "South Asia"
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
        "Central Asia",
        "Europe"
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
        "Middle East (West Asia)",
        "South Asia",
        "Central Asia",
        "North America"
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
        "South Asia",
        "Central Asia",
        "Middle East (West Asia)",
        "Africa"
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
        "Europe",
        "Middle East (West Asia)",
        "Central Asia",
        "South Asia"
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
        "South Asia",
        "Middle East (West Asia)",
        "Central Asia"
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
        "Central Asia",
        "South Asia",
        "Middle East (West Asia)"
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
        "Central Asia",
        "South Asia",
        "Europe",
        "Middle East (West Asia)"
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
        "Central Asia",
        "Middle East (West Asia)",
        "North America",
        "South Asia"
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
        "South Asia",
        "Middle East (West Asia)",
        "Central Asia",
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
        "Europe",
        "Middle East (West Asia)",
        "Central Asia",
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
        "Middle East (West Asia)",
        "North America",
        "Central Asia",
        "South Asia"
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
        "Europe",
        "Central Asia",
        "South Asia",
        "Middle East (West Asia)"
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
        "South Asia",
        "Central Asia",
        "Middle East (West Asia)",
        "North America"
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
        "Middle East (West Asia)",
        "Central Asia",
        "South Asia",
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
        "Central Asia",
        "Middle East (West Asia)",
        "Europe",
        "South Asia"
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
      "key": "s3-g-armenia",
      "level": "medium",
      "q": "Which part of Asia is Armenia in?",
      "options": [
        "Middle East (West Asia)",
        "North America",
        "Central Asia",
        "South Asia"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Armenia is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Armenia",
        "where": "Middle East (West Asia)",
        "note": "In the Caucasus, between Turkey and Azerbaijan."
      }
    },
    {
      "key": "s3-g-azerbaijan",
      "level": "medium",
      "q": "Which part of Asia is Azerbaijan in?",
      "options": [
        "South Asia",
        "Central Asia",
        "Middle East (West Asia)",
        "Africa"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Azerbaijan is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Azerbaijan",
        "where": "Middle East (West Asia)",
        "note": "In the Caucasus, on the Caspian Sea."
      }
    },
    {
      "key": "s3-g-georgia",
      "level": "medium",
      "q": "Which part of Asia is Georgia in?",
      "options": [
        "Central Asia",
        "South Asia",
        "Middle East (West Asia)",
        "Europe"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Georgia is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Georgia",
        "where": "Middle East (West Asia)",
        "note": "In the Caucasus, on the Black Sea."
      }
    },
    {
      "key": "s3-g-cyprus",
      "level": "medium",
      "q": "Which part of Asia is Cyprus in?",
      "options": [
        "Central Asia",
        "North America",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Cyprus is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Cyprus",
        "where": "Middle East (West Asia)",
        "note": "An island in the Mediterranean Sea, south of Turkey."
      }
    },
    {
      "key": "s3-g-bahrain",
      "level": "medium",
      "q": "Which part of Asia is Bahrain in?",
      "options": [
        "Middle East (West Asia)",
        "South Asia",
        "Central Asia",
        "Africa"
      ],
      "answer": "Middle East (West Asia)",
      "point": "Bahrain is in Middle East (West Asia).",
      "typed": "Middle East (West Asia)",
      "map": {
        "kind": "world",
        "place": "Bahrain",
        "where": "Middle East (West Asia)",
        "note": "A small island country in the Gulf, next to Saudi Arabia."
      }
    },
    {
      "key": "s3-g-kazakhstan",
      "level": "medium",
      "q": "Which part of Asia is Kazakhstan in?",
      "options": [
        "Europe",
        "Central Asia",
        "South Asia",
        "Middle East (West Asia)"
      ],
      "answer": "Central Asia",
      "point": "Kazakhstan is in Central Asia.",
      "typed": "Central Asia",
      "map": {
        "kind": "world",
        "place": "Kazakhstan",
        "where": "Central Asia",
        "note": "In Central Asia — the largest landlocked country in the world."
      }
    },
    {
      "key": "s3-g-kyrgyzstan",
      "level": "medium",
      "q": "Which part of Asia is Kyrgyzstan in?",
      "options": [
        "Central Asia",
        "North America",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "Central Asia",
      "point": "Kyrgyzstan is in Central Asia.",
      "typed": "Central Asia",
      "map": {
        "kind": "world",
        "place": "Kyrgyzstan",
        "where": "Central Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s3-g-tajikistan",
      "level": "medium",
      "q": "Which part of Asia is Tajikistan in?",
      "options": [
        "Central Asia",
        "Africa",
        "South Asia",
        "Middle East (West Asia)"
      ],
      "answer": "Central Asia",
      "point": "Tajikistan is in Central Asia.",
      "typed": "Central Asia",
      "map": {
        "kind": "world",
        "place": "Tajikistan",
        "where": "Central Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s3-g-turkmenistan",
      "level": "medium",
      "q": "Which part of Asia is Turkmenistan in?",
      "options": [
        "Middle East (West Asia)",
        "Europe",
        "South Asia",
        "Central Asia"
      ],
      "answer": "Central Asia",
      "point": "Turkmenistan is in Central Asia.",
      "typed": "Central Asia",
      "map": {
        "kind": "world",
        "place": "Turkmenistan",
        "where": "Central Asia",
        "note": "In Central Asia, east of the Caspian Sea."
      }
    },
    {
      "key": "s3-g-uzbekistan",
      "level": "medium",
      "q": "Which part of Asia is Uzbekistan in?",
      "options": [
        "North America",
        "Middle East (West Asia)",
        "South Asia",
        "Central Asia"
      ],
      "answer": "Central Asia",
      "point": "Uzbekistan is in Central Asia.",
      "typed": "Central Asia",
      "map": {
        "kind": "world",
        "place": "Uzbekistan",
        "where": "Central Asia",
        "note": "In Central Asia, south of Kazakhstan."
      }
    },
    {
      "key": "s3-g-china",
      "level": "easy",
      "q": "Which part of Asia is China in?",
      "options": [
        "South Asia",
        "Africa",
        "East & South-East Asia",
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
        "South Asia",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "Europe"
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
        "North America",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "South Korea is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "East & South-East Asia",
        "note": "In East Asia, south of North Korea."
      }
    },
    {
      "key": "s3-g-north-korea",
      "level": "hard",
      "q": "Which part of Asia is North Korea in?",
      "options": [
        "South Asia",
        "Middle East (West Asia)",
        "Africa",
        "East & South-East Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "North Korea is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "North Korea",
        "where": "East & South-East Asia",
        "note": "In East Asia, north of South Korea."
      }
    },
    {
      "key": "s3-g-mongolia",
      "level": "hard",
      "q": "Which part of Asia is Mongolia in?",
      "options": [
        "South Asia",
        "Europe",
        "East & South-East Asia",
        "Middle East (West Asia)"
      ],
      "answer": "East & South-East Asia",
      "point": "Mongolia is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Mongolia",
        "where": "East & South-East Asia",
        "note": "In East Asia, between China and Russia."
      }
    },
    {
      "key": "s3-g-thailand",
      "level": "medium",
      "q": "Which part of Asia is Thailand in?",
      "options": [
        "South Asia",
        "North America",
        "Middle East (West Asia)",
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
        "Africa",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Vietnam is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, east of Cambodia."
      }
    },
    {
      "key": "s3-g-malaysia",
      "level": "medium",
      "q": "Which part of Asia is Malaysia in?",
      "options": [
        "South Asia",
        "East & South-East Asia",
        "Europe",
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
        "Middle East (West Asia)",
        "South Asia",
        "North America",
        "East & South-East Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Singapore is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Singapore",
        "where": "East & South-East Asia",
        "note": "A small island city at the tip of Malaysia."
      }
    },
    {
      "key": "s3-g-indonesia",
      "level": "medium",
      "q": "Which part of Asia is Indonesia in?",
      "options": [
        "East & South-East Asia",
        "South Asia",
        "Middle East (West Asia)",
        "Africa"
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
        "South Asia",
        "Middle East (West Asia)",
        "East & South-East Asia",
        "Europe"
      ],
      "answer": "East & South-East Asia",
      "point": "Philippines is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Philippines",
        "where": "East & South-East Asia",
        "note": "Islands in South-East Asia, east of Vietnam."
      }
    },
    {
      "key": "s3-g-brunei",
      "level": "medium",
      "q": "Which part of Asia is Brunei in?",
      "options": [
        "Middle East (West Asia)",
        "North America",
        "South Asia",
        "East & South-East Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Brunei is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Brunei",
        "where": "East & South-East Asia",
        "note": "A small country on the island of Borneo."
      }
    },
    {
      "key": "s3-g-cambodia",
      "level": "medium",
      "q": "Which part of Asia is Cambodia in?",
      "options": [
        "East & South-East Asia",
        "Africa",
        "South Asia",
        "Middle East (West Asia)"
      ],
      "answer": "East & South-East Asia",
      "point": "Cambodia is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Cambodia",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s3-g-laos",
      "level": "medium",
      "q": "Which part of Asia is Laos in?",
      "options": [
        "Europe",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "South Asia"
      ],
      "answer": "East & South-East Asia",
      "point": "Laos is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "Laos",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s3-g-east-timor",
      "level": "medium",
      "q": "Which part of Asia is East Timor in?",
      "options": [
        "South Asia",
        "East & South-East Asia",
        "Middle East (West Asia)",
        "North America"
      ],
      "answer": "East & South-East Asia",
      "point": "East Timor is in East & South-East Asia.",
      "typed": "East & South-East Asia",
      "map": {
        "kind": "world",
        "place": "East Timor",
        "where": "East & South-East Asia",
        "note": "A small country on the island of Timor, north of Australia."
      }
    },
    {
      "key": "s3-g-in-south-asia",
      "level": "medium",
      "q": "Which of these countries is in South Asia?",
      "options": [
        "India",
        "Saudi Arabia",
        "UAE",
        "Japan"
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
        "Saudi Arabia",
        "China",
        "Pakistan",
        "Japan"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia is in Middle East (West Asia).",
      "typed": "Saudi Arabia"
    },
    {
      "key": "s3-g-in-central-asia",
      "level": "medium",
      "q": "Which of these countries is in Central Asia?",
      "options": [
        "Japan",
        "Pakistan",
        "Saudi Arabia",
        "Kazakhstan"
      ],
      "answer": "Kazakhstan",
      "point": "Kazakhstan is in Central Asia.",
      "typed": "Kazakhstan"
    },
    {
      "key": "s3-g-in-east-south-east-asia",
      "level": "medium",
      "q": "Which of these countries is in East & South-East Asia?",
      "options": [
        "China",
        "UAE",
        "Saudi Arabia",
        "Kyrgyzstan"
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
        "Iran",
        "Georgia",
        "Qatar",
        "Kazakhstan"
      ],
      "answer": "Kazakhstan",
      "point": "Kazakhstan is not in Middle East (West Asia).",
      "typed": "Kazakhstan"
    },
    {
      "key": "s3-g-not-east-south-east-asia",
      "level": "medium",
      "q": "Which of these countries is NOT in East & South-East Asia?",
      "options": [
        "China",
        "Vietnam",
        "Brunei",
        "Kazakhstan"
      ],
      "answer": "Kazakhstan",
      "point": "Kazakhstan is not in East & South-East Asia.",
      "typed": "Kazakhstan"
    },
    {
      "key": "s3-g-not-central-asia",
      "level": "medium",
      "q": "Which of these countries is NOT in Central Asia?",
      "options": [
        "Uzbekistan",
        "Saudi Arabia",
        "Turkmenistan",
        "Tajikistan"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia is not in Central Asia.",
      "typed": "Saudi Arabia"
    },
    {
      "key": "s3-g-neigh-india",
      "level": "medium",
      "q": "Which of these countries shares a border with India?",
      "options": [
        "Oman",
        "Singapore",
        "Pakistan",
        "Syria"
      ],
      "answer": "Pakistan",
      "point": "Pakistan shares a border with India.",
      "typed": "Pakistan",
      "map": {
        "kind": "world",
        "place": "Pakistan",
        "where": "South Asia",
        "note": "In South Asia, west of India."
      }
    },
    {
      "key": "s3-g-neigh-pakistan",
      "level": "medium",
      "q": "Which of these countries shares a border with Pakistan?",
      "options": [
        "Iran",
        "Syria",
        "UAE",
        "Malaysia"
      ],
      "answer": "Iran",
      "point": "Iran shares a border with Pakistan.",
      "typed": "Iran",
      "map": {
        "kind": "world",
        "place": "Iran",
        "where": "Middle East (West Asia)",
        "note": "In the Middle East, east of Iraq."
      }
    },
    {
      "key": "s3-g-neigh-nepal",
      "level": "medium",
      "q": "Which of these countries shares a border with Nepal?",
      "options": [
        "China",
        "Israel",
        "Turkey",
        "Bhutan"
      ],
      "answer": "China",
      "point": "China shares a border with Nepal.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "East & South-East Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s3-g-neigh-bhutan",
      "level": "medium",
      "q": "Which of these countries shares a border with Bhutan?",
      "options": [
        "India",
        "Georgia",
        "Myanmar",
        "Israel"
      ],
      "answer": "India",
      "point": "India shares a border with Bhutan.",
      "typed": "India",
      "map": {
        "kind": "world",
        "place": "India",
        "where": "South Asia",
        "note": "In South Asia — the triangle pointing down into the Indian Ocean."
      }
    },
    {
      "key": "s3-g-neigh-myanmar",
      "level": "medium",
      "q": "Which of these countries shares a border with Myanmar?",
      "options": [
        "Iraq",
        "North Korea",
        "Afghanistan",
        "Thailand"
      ],
      "answer": "Thailand",
      "point": "Thailand shares a border with Myanmar.",
      "typed": "Thailand",
      "map": {
        "kind": "world",
        "place": "Thailand",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, east of Myanmar."
      }
    },
    {
      "key": "s3-g-neigh-thailand",
      "level": "medium",
      "q": "Which of these countries shares a border with Thailand?",
      "options": [
        "Cyprus",
        "Philippines",
        "Vietnam",
        "Malaysia"
      ],
      "answer": "Malaysia",
      "point": "Malaysia shares a border with Thailand.",
      "typed": "Malaysia",
      "map": {
        "kind": "world",
        "place": "Malaysia",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, south of Thailand."
      }
    },
    {
      "key": "s3-g-neigh-vietnam",
      "level": "medium",
      "q": "Which of these countries shares a border with Vietnam?",
      "options": [
        "UAE",
        "Kazakhstan",
        "Armenia",
        "Cambodia"
      ],
      "answer": "Cambodia",
      "point": "Cambodia shares a border with Vietnam.",
      "typed": "Cambodia",
      "map": {
        "kind": "world",
        "place": "Cambodia",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s3-g-neigh-cambodia",
      "level": "medium",
      "q": "Which of these countries shares a border with Cambodia?",
      "options": [
        "Laos",
        "Bhutan",
        "Tajikistan",
        "Brunei"
      ],
      "answer": "Laos",
      "point": "Laos shares a border with Cambodia.",
      "typed": "Laos",
      "map": {
        "kind": "world",
        "place": "Laos",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s3-g-neigh-laos",
      "level": "medium",
      "q": "Which of these countries shares a border with Laos?",
      "options": [
        "Vietnam",
        "Sri Lanka",
        "Malaysia",
        "Kyrgyzstan"
      ],
      "answer": "Vietnam",
      "point": "Vietnam shares a border with Laos.",
      "typed": "Vietnam",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, east of Cambodia."
      }
    },
    {
      "key": "s3-g-neigh-malaysia",
      "level": "medium",
      "q": "Which of these countries shares a border with Malaysia?",
      "options": [
        "Vietnam",
        "Thailand",
        "North Korea",
        "Kuwait"
      ],
      "answer": "Thailand",
      "point": "Thailand shares a border with Malaysia.",
      "typed": "Thailand",
      "map": {
        "kind": "world",
        "place": "Thailand",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, east of Myanmar."
      }
    },
    {
      "key": "s3-g-neigh-indonesia",
      "level": "medium",
      "q": "Which of these countries shares a border with Indonesia?",
      "options": [
        "Malaysia",
        "Mongolia",
        "Tajikistan",
        "Bhutan"
      ],
      "answer": "Malaysia",
      "point": "Malaysia shares a border with Indonesia.",
      "typed": "Malaysia",
      "map": {
        "kind": "world",
        "place": "Malaysia",
        "where": "East & South-East Asia",
        "note": "In South-East Asia, south of Thailand."
      }
    },
    {
      "key": "s3-g-neigh-china",
      "level": "medium",
      "q": "Which of these countries shares a border with China?",
      "options": [
        "Kuwait",
        "Mongolia",
        "Uzbekistan",
        "Israel"
      ],
      "answer": "Mongolia",
      "point": "Mongolia shares a border with China.",
      "typed": "Mongolia",
      "map": {
        "kind": "world",
        "place": "Mongolia",
        "where": "East & South-East Asia",
        "note": "In East Asia, between China and Russia."
      }
    },
    {
      "key": "s3-g-neigh-mongolia",
      "level": "medium",
      "q": "Which of these countries shares a border with Mongolia?",
      "options": [
        "Afghanistan",
        "China",
        "Georgia",
        "Lebanon"
      ],
      "answer": "China",
      "point": "China shares a border with Mongolia.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "East & South-East Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s3-g-neigh-north-korea",
      "level": "medium",
      "q": "Which of these countries shares a border with North Korea?",
      "options": [
        "Vietnam",
        "Thailand",
        "Pakistan",
        "South Korea"
      ],
      "answer": "South Korea",
      "point": "South Korea shares a border with North Korea.",
      "typed": "South Korea",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "East & South-East Asia",
        "note": "In East Asia, south of North Korea."
      }
    },
    {
      "key": "s3-g-neigh-south-korea",
      "level": "medium",
      "q": "Which of these countries shares a border with South Korea?",
      "options": [
        "Tajikistan",
        "Kyrgyzstan",
        "North Korea",
        "Uzbekistan"
      ],
      "answer": "North Korea",
      "point": "North Korea shares a border with South Korea.",
      "typed": "North Korea",
      "map": {
        "kind": "world",
        "place": "North Korea",
        "where": "East & South-East Asia",
        "note": "In East Asia, north of South Korea."
      }
    },
    {
      "key": "s3-g-neigh-saudi-arabia",
      "level": "medium",
      "q": "Which of these countries shares a border with Saudi Arabia?",
      "options": [
        "Vietnam",
        "Yemen",
        "India",
        "Malaysia"
      ],
      "answer": "Yemen",
      "point": "Yemen shares a border with Saudi Arabia.",
      "typed": "Yemen",
      "map": {
        "kind": "world",
        "place": "Yemen",
        "where": "Middle East (West Asia)",
        "note": "Next to Saudi Arabia."
      }
    },
    {
      "key": "s3-g-neigh-yemen",
      "level": "medium",
      "q": "Which of these countries shares a border with Yemen?",
      "options": [
        "Turkey",
        "Jordan",
        "China",
        "Oman"
      ],
      "answer": "Oman",
      "point": "Oman shares a border with Yemen.",
      "typed": "Oman",
      "map": {
        "kind": "world",
        "place": "Oman",
        "where": "Middle East (West Asia)",
        "note": "Next to Yemen."
      }
    },
    {
      "key": "s3-g-neigh-oman",
      "level": "medium",
      "q": "Which of these countries shares a border with Oman?",
      "options": [
        "Turkmenistan",
        "China",
        "UAE",
        "Myanmar"
      ],
      "answer": "UAE",
      "point": "UAE shares a border with Oman.",
      "typed": "UAE",
      "map": {
        "kind": "world",
        "place": "UAE",
        "where": "Middle East (West Asia)",
        "note": "On the Arabian Peninsula, next to Saudi Arabia and Oman."
      }
    },
    {
      "key": "s3-g-neigh-uae",
      "level": "medium",
      "q": "Which of these countries shares a border with UAE?",
      "options": [
        "Israel",
        "Saudi Arabia",
        "Armenia",
        "Myanmar"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia shares a border with UAE.",
      "typed": "Saudi Arabia",
      "map": {
        "kind": "world",
        "place": "Saudi Arabia",
        "where": "Middle East (West Asia)",
        "note": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf."
      }
    },
    {
      "key": "s3-g-neigh-qatar",
      "level": "medium",
      "q": "Which of these countries shares a border with Qatar?",
      "options": [
        "Malaysia",
        "Saudi Arabia",
        "Thailand",
        "Syria"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia shares a border with Qatar.",
      "typed": "Saudi Arabia",
      "map": {
        "kind": "world",
        "place": "Saudi Arabia",
        "where": "Middle East (West Asia)",
        "note": "The big country on the Arabian Peninsula, between the Red Sea and the Gulf."
      }
    },
    {
      "key": "s3-g-neigh-kuwait",
      "level": "medium",
      "q": "Which of these countries shares a border with Kuwait?",
      "options": [
        "Iraq",
        "Cambodia",
        "Vietnam",
        "Palestine"
      ],
      "answer": "Iraq",
      "point": "Iraq shares a border with Kuwait.",
      "typed": "Iraq",
      "map": {
        "kind": "world",
        "place": "Iraq",
        "where": "Middle East (West Asia)",
        "note": "In Iraq, in the Middle East, east of Syria."
      }
    },
    {
      "key": "s3-g-neigh-jordan",
      "level": "medium",
      "q": "Which of these countries shares a border with Jordan?",
      "options": [
        "Bhutan",
        "Lebanon",
        "Israel",
        "Singapore"
      ],
      "answer": "Israel",
      "point": "Israel shares a border with Jordan.",
      "typed": "Israel",
      "map": {
        "kind": "world",
        "place": "Israel",
        "where": "Middle East (West Asia)",
        "note": "Next to Jordan."
      }
    },
    {
      "key": "s3-g-neigh-lebanon",
      "level": "medium",
      "q": "Which of these countries shares a border with Lebanon?",
      "options": [
        "Syria",
        "Kyrgyzstan",
        "South Korea",
        "Iran"
      ],
      "answer": "Syria",
      "point": "Syria shares a border with Lebanon.",
      "typed": "Syria",
      "map": {
        "kind": "world",
        "place": "Syria",
        "where": "Middle East (West Asia)",
        "note": "Next to Lebanon."
      }
    },
    {
      "key": "s3-g-neigh-syria",
      "level": "medium",
      "q": "Which of these countries shares a border with Syria?",
      "options": [
        "UAE",
        "Bhutan",
        "South Korea",
        "Turkey"
      ],
      "answer": "Turkey",
      "point": "Turkey shares a border with Syria.",
      "typed": "Turkey",
      "map": {
        "kind": "world",
        "place": "Turkey",
        "where": "Middle East (West Asia)",
        "note": "Between Europe and Asia, north of Syria and Iraq."
      }
    },
    {
      "key": "s3-g-neigh-iraq",
      "level": "medium",
      "q": "Which of these countries shares a border with Iraq?",
      "options": [
        "Iran",
        "Azerbaijan",
        "Uzbekistan",
        "Yemen"
      ],
      "answer": "Iran",
      "point": "Iran shares a border with Iraq.",
      "typed": "Iran",
      "map": {
        "kind": "world",
        "place": "Iran",
        "where": "Middle East (West Asia)",
        "note": "In the Middle East, east of Iraq."
      }
    },
    {
      "key": "s3-g-neigh-iran",
      "level": "medium",
      "q": "Which of these countries shares a border with Iran?",
      "options": [
        "Turkmenistan",
        "Oman",
        "Tajikistan",
        "Bahrain"
      ],
      "answer": "Turkmenistan",
      "point": "Turkmenistan shares a border with Iran.",
      "typed": "Turkmenistan",
      "map": {
        "kind": "world",
        "place": "Turkmenistan",
        "where": "Central Asia",
        "note": "In Central Asia, east of the Caspian Sea."
      }
    },
    {
      "key": "s3-g-neigh-turkey",
      "level": "medium",
      "q": "Which of these countries shares a border with Turkey?",
      "options": [
        "South Korea",
        "Afghanistan",
        "Laos",
        "Georgia"
      ],
      "answer": "Georgia",
      "point": "Georgia shares a border with Turkey.",
      "typed": "Georgia",
      "map": {
        "kind": "world",
        "place": "Georgia",
        "where": "Middle East (West Asia)",
        "note": "In the Caucasus, on the Black Sea."
      }
    },
    {
      "key": "s3-g-neigh-israel",
      "level": "medium",
      "q": "Which of these countries shares a border with Israel?",
      "options": [
        "Kyrgyzstan",
        "Japan",
        "Kazakhstan",
        "Lebanon"
      ],
      "answer": "Lebanon",
      "point": "Lebanon shares a border with Israel.",
      "typed": "Lebanon",
      "map": {
        "kind": "world",
        "place": "Lebanon",
        "where": "Middle East (West Asia)",
        "note": "Next to Israel."
      }
    },
    {
      "key": "s3-g-neigh-afghanistan",
      "level": "medium",
      "q": "Which of these countries shares a border with Afghanistan?",
      "options": [
        "Pakistan",
        "Kyrgyzstan",
        "Cyprus",
        "UAE"
      ],
      "answer": "Pakistan",
      "point": "Pakistan shares a border with Afghanistan.",
      "typed": "Pakistan",
      "map": {
        "kind": "world",
        "place": "Pakistan",
        "where": "South Asia",
        "note": "In South Asia, west of India."
      }
    },
    {
      "key": "s3-g-neigh-kazakhstan",
      "level": "medium",
      "q": "Which of these countries shares a border with Kazakhstan?",
      "options": [
        "Nepal",
        "Uzbekistan",
        "South Korea",
        "Japan"
      ],
      "answer": "Uzbekistan",
      "point": "Uzbekistan shares a border with Kazakhstan.",
      "typed": "Uzbekistan",
      "map": {
        "kind": "world",
        "place": "Uzbekistan",
        "where": "Central Asia",
        "note": "In Central Asia, south of Kazakhstan."
      }
    },
    {
      "key": "s3-g-pop",
      "level": "medium",
      "q": "Which Asian country has the largest population?",
      "options": [
        "Indonesia",
        "India",
        "Pakistan",
        "China"
      ],
      "answer": "India",
      "point": "India has the largest population in Asia — and in the world.",
      "typed": "India"
    },
    {
      "key": "s3-g-mideast-big",
      "level": "medium",
      "q": "Which is the largest country in the Middle East?",
      "options": [
        "Iraq",
        "Saudi Arabia",
        "Iran",
        "Turkey"
      ],
      "answer": "Saudi Arabia",
      "point": "Saudi Arabia is the largest country in the Middle East.",
      "typed": "Saudi Arabia"
    },
    {
      "key": "s3-g-turkey2",
      "level": "medium",
      "q": "Turkey is between which two continents?",
      "options": [
        "Asia and Australia",
        "Europe and Africa",
        "Asia and Africa",
        "Europe and Asia"
      ],
      "answer": "Europe and Asia",
      "point": "Turkey is between Europe and Asia — Istanbul is in both.",
      "typed": "Europe and Asia",
      "accept": [
        "europe asia"
      ]
    },
    {
      "key": "s3-g-rising-sun",
      "level": "easy",
      "q": "Which country is called the Land of the Rising Sun?",
      "options": [
        "Japan",
        "China",
        "Thailand",
        "South Korea"
      ],
      "answer": "Japan",
      "point": "Japan is called the Land of the Rising Sun.",
      "typed": "Japan"
    },
    {
      "key": "s3-g-thunder",
      "level": "medium",
      "q": "Which country is called the Land of the Thunder Dragon?",
      "options": [
        "Myanmar",
        "Thailand",
        "Bhutan",
        "Nepal"
      ],
      "answer": "Bhutan",
      "point": "Bhutan is called the Land of the Thunder Dragon.",
      "typed": "Bhutan"
    },
    {
      "key": "s3-g-morning-calm",
      "level": "medium",
      "q": "Which country is called the Land of the Morning Calm?",
      "options": [
        "South Korea",
        "China",
        "Japan",
        "North Korea"
      ],
      "answer": "South Korea",
      "point": "South Korea is called the Land of the Morning Calm.",
      "typed": "South Korea"
    },
    {
      "key": "s3-g-south-hemi",
      "level": "hard",
      "q": "Which Asian country is entirely in the Southern Hemisphere?",
      "options": [
        "East Timor",
        "Indonesia",
        "Malaysia",
        "Singapore"
      ],
      "answer": "East Timor",
      "point": "East Timor is entirely south of the Equator, in the Southern Hemisphere.",
      "typed": "East Timor"
    },
    {
      "key": "s3-g-most-islands",
      "level": "medium",
      "q": "Which Asian country has the most islands?",
      "options": [
        "Indonesia",
        "Maldives",
        "Philippines",
        "Japan"
      ],
      "answer": "Indonesia",
      "point": "Indonesia has the most islands of any Asian country — about 17,000 islands.",
      "typed": "Indonesia"
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
      "key": "s4-g1",
      "level": "hard",
      "q": "What is the capital of Algeria?",
      "options": [
        "Bangui",
        "Niamey",
        "Abuja",
        "Algiers"
      ],
      "answer": "Algiers",
      "point": "Algeria — Algiers.",
      "typed": "Algiers",
      "map": {
        "kind": "world",
        "place": "Algeria",
        "where": "Africa",
        "note": "In North Africa — the largest country in Africa."
      }
    },
    {
      "key": "s4-g2",
      "level": "hard",
      "q": "Algiers is the capital of which country?",
      "options": [
        "Liberia",
        "Dem. Rep. of Congo",
        "Djibouti",
        "Algeria"
      ],
      "answer": "Algeria",
      "point": "Algeria — Algiers.",
      "typed": "Algeria",
      "map": {
        "kind": "world",
        "place": "Algeria",
        "where": "Africa",
        "note": "In North Africa — the largest country in Africa."
      }
    },
    {
      "key": "s4-g4",
      "level": "medium",
      "q": "Cairo is the capital of which country?",
      "options": [
        "Senegal",
        "Zambia",
        "Kenya",
        "Egypt"
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
      "key": "s4-g5",
      "level": "medium",
      "q": "What is the capital of Libya?",
      "options": [
        "Tripoli",
        "Freetown",
        "Bangui",
        "Kinshasa"
      ],
      "answer": "Tripoli",
      "point": "Libya — Tripoli.",
      "typed": "Tripoli",
      "map": {
        "kind": "world",
        "place": "Libya",
        "where": "Africa",
        "note": "In North Africa, on the Mediterranean Sea."
      }
    },
    {
      "key": "s4-g6",
      "level": "hard",
      "q": "Tripoli is the capital of which country?",
      "options": [
        "Libya",
        "Malawi",
        "Guinea-Bissau",
        "Comoros"
      ],
      "answer": "Libya",
      "point": "Libya — Tripoli.",
      "typed": "Libya",
      "map": {
        "kind": "world",
        "place": "Libya",
        "where": "Africa",
        "note": "In North Africa, on the Mediterranean Sea."
      }
    },
    {
      "key": "s4-g7",
      "level": "hard",
      "q": "What is the capital of Morocco?",
      "options": [
        "Rabat",
        "Kinshasa",
        "Juba",
        "Banjul"
      ],
      "answer": "Rabat",
      "point": "Morocco — Rabat.",
      "typed": "Rabat",
      "map": {
        "kind": "world",
        "place": "Morocco",
        "where": "Africa",
        "note": "In North Africa, across the sea from Spain."
      }
    },
    {
      "key": "s4-g8",
      "level": "hard",
      "q": "Rabat is the capital of which country?",
      "options": [
        "Morocco",
        "Madagascar",
        "Tanzania",
        "Dem. Rep. of Congo"
      ],
      "answer": "Morocco",
      "point": "Morocco — Rabat.",
      "typed": "Morocco",
      "map": {
        "kind": "world",
        "place": "Morocco",
        "where": "Africa",
        "note": "In North Africa, across the sea from Spain."
      }
    },
    {
      "key": "s4-g9",
      "level": "medium",
      "q": "What is the capital of Tunisia?",
      "options": [
        "Bamako",
        "Tunis",
        "Banjul",
        "Yaounde"
      ],
      "answer": "Tunis",
      "point": "Tunisia — Tunis.",
      "typed": "Tunis",
      "map": {
        "kind": "world",
        "place": "Tunisia",
        "where": "Africa",
        "note": "In North Africa, between Algeria and Libya."
      }
    },
    {
      "key": "s4-g10",
      "level": "hard",
      "q": "Tunis is the capital of which country?",
      "options": [
        "Guinea",
        "Libya",
        "Seychelles",
        "Tunisia"
      ],
      "answer": "Tunisia",
      "point": "Tunisia — Tunis.",
      "typed": "Tunisia",
      "map": {
        "kind": "world",
        "place": "Tunisia",
        "where": "Africa",
        "note": "In North Africa, between Algeria and Libya."
      }
    },
    {
      "key": "s4-g11",
      "level": "medium",
      "q": "What is the capital of Sudan?",
      "options": [
        "Abuja",
        "Khartoum",
        "Lome",
        "Yamoussoukro"
      ],
      "answer": "Khartoum",
      "point": "Sudan — Khartoum.",
      "typed": "Khartoum",
      "map": {
        "kind": "world",
        "place": "Sudan",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g12",
      "level": "hard",
      "q": "Khartoum is the capital of which country?",
      "options": [
        "Chad",
        "Seychelles",
        "Sudan",
        "Eritrea"
      ],
      "answer": "Sudan",
      "point": "Sudan — Khartoum.",
      "typed": "Sudan",
      "map": {
        "kind": "world",
        "place": "Sudan",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g13",
      "level": "medium",
      "q": "What is the capital of South Sudan?",
      "options": [
        "Bissau",
        "Juba",
        "Asmara",
        "Libreville"
      ],
      "answer": "Juba",
      "point": "South Sudan — Juba.",
      "typed": "Juba",
      "map": {
        "kind": "world",
        "place": "South Sudan",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g14",
      "level": "hard",
      "q": "Juba is the capital of which country?",
      "options": [
        "Chad",
        "South Sudan",
        "Tanzania",
        "Liberia"
      ],
      "answer": "South Sudan",
      "point": "South Sudan — Juba.",
      "typed": "South Sudan",
      "map": {
        "kind": "world",
        "place": "South Sudan",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g15",
      "level": "hard",
      "q": "What is the capital of Ethiopia?",
      "options": [
        "Addis Ababa",
        "Conakry",
        "Kigali",
        "Yamoussoukro"
      ],
      "answer": "Addis Ababa",
      "point": "Ethiopia — Addis Ababa.",
      "typed": "Addis Ababa",
      "map": {
        "kind": "world",
        "place": "Ethiopia",
        "where": "Africa",
        "note": "In East Africa."
      }
    },
    {
      "key": "s4-g16",
      "level": "hard",
      "q": "Addis Ababa is the capital of which country?",
      "options": [
        "Niger",
        "Ethiopia",
        "Djibouti",
        "Angola"
      ],
      "answer": "Ethiopia",
      "point": "Ethiopia — Addis Ababa.",
      "typed": "Ethiopia",
      "map": {
        "kind": "world",
        "place": "Ethiopia",
        "where": "Africa",
        "note": "In East Africa."
      }
    },
    {
      "key": "s4-g17",
      "level": "medium",
      "q": "What is the capital of Eritrea?",
      "options": [
        "Asmara",
        "Porto-Novo",
        "Algiers",
        "Tripoli"
      ],
      "answer": "Asmara",
      "point": "Eritrea — Asmara.",
      "typed": "Asmara",
      "map": {
        "kind": "world",
        "place": "Eritrea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g18",
      "level": "hard",
      "q": "Asmara is the capital of which country?",
      "options": [
        "Angola",
        "Algeria",
        "Eritrea",
        "Comoros"
      ],
      "answer": "Eritrea",
      "point": "Eritrea — Asmara.",
      "typed": "Eritrea",
      "map": {
        "kind": "world",
        "place": "Eritrea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g19",
      "level": "medium",
      "q": "What is the capital of Djibouti?",
      "options": [
        "Abuja",
        "Malabo",
        "Algiers",
        "Djibouti"
      ],
      "answer": "Djibouti",
      "point": "Djibouti — Djibouti.",
      "typed": "Djibouti",
      "map": {
        "kind": "world",
        "place": "Djibouti",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g20",
      "level": "hard",
      "q": "Djibouti is the capital of which country?",
      "options": [
        "Mali",
        "Mauritania",
        "Djibouti",
        "Tunisia"
      ],
      "answer": "Djibouti",
      "point": "Djibouti — Djibouti.",
      "typed": "Djibouti",
      "map": {
        "kind": "world",
        "place": "Djibouti",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g21",
      "level": "medium",
      "q": "What is the capital of Somalia?",
      "options": [
        "Lusaka",
        "Antananarivo",
        "Cairo",
        "Mogadishu"
      ],
      "answer": "Mogadishu",
      "point": "Somalia — Mogadishu.",
      "typed": "Mogadishu",
      "map": {
        "kind": "world",
        "place": "Somalia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g22",
      "level": "hard",
      "q": "Mogadishu is the capital of which country?",
      "options": [
        "Dem. Rep. of Congo",
        "Gambia",
        "Kenya",
        "Somalia"
      ],
      "answer": "Somalia",
      "point": "Somalia — Mogadishu.",
      "typed": "Somalia",
      "map": {
        "kind": "world",
        "place": "Somalia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g23",
      "level": "hard",
      "q": "What is the capital of Kenya?",
      "options": [
        "Lilongwe",
        "Windhoek",
        "Nairobi",
        "Bangui"
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
      "key": "s4-g24",
      "level": "hard",
      "q": "Nairobi is the capital of which country?",
      "options": [
        "Comoros",
        "Botswana",
        "Cameroon",
        "Kenya"
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
      "key": "s4-g25",
      "level": "medium",
      "q": "What is the capital of Uganda?",
      "options": [
        "Lome",
        "Nairobi",
        "Kampala",
        "Maputo"
      ],
      "answer": "Kampala",
      "point": "Uganda — Kampala.",
      "typed": "Kampala",
      "map": {
        "kind": "world",
        "place": "Uganda",
        "where": "Africa",
        "note": "In East Africa, on Lake Victoria."
      }
    },
    {
      "key": "s4-g26",
      "level": "hard",
      "q": "Kampala is the capital of which country?",
      "options": [
        "Guinea",
        "Uganda",
        "Morocco",
        "Senegal"
      ],
      "answer": "Uganda",
      "point": "Uganda — Kampala.",
      "typed": "Uganda",
      "map": {
        "kind": "world",
        "place": "Uganda",
        "where": "Africa",
        "note": "In East Africa, on Lake Victoria."
      }
    },
    {
      "key": "s4-g27",
      "level": "medium",
      "q": "What is the capital of Rwanda?",
      "options": [
        "Sao Tome",
        "Yamoussoukro",
        "Kigali",
        "Maputo"
      ],
      "answer": "Kigali",
      "point": "Rwanda — Kigali.",
      "typed": "Kigali",
      "map": {
        "kind": "world",
        "place": "Rwanda",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g28",
      "level": "hard",
      "q": "Kigali is the capital of which country?",
      "options": [
        "Senegal",
        "Rwanda",
        "Mozambique",
        "Benin"
      ],
      "answer": "Rwanda",
      "point": "Rwanda — Kigali.",
      "typed": "Rwanda",
      "map": {
        "kind": "world",
        "place": "Rwanda",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g29",
      "level": "medium",
      "q": "What is the capital of Burundi?",
      "options": [
        "Kigali",
        "Freetown",
        "Nairobi",
        "Gitega"
      ],
      "answer": "Gitega",
      "point": "Burundi — Gitega.",
      "typed": "Gitega",
      "map": {
        "kind": "world",
        "place": "Burundi",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g30",
      "level": "hard",
      "q": "Gitega is the capital of which country?",
      "options": [
        "Burundi",
        "Djibouti",
        "Zimbabwe",
        "Central African Republic"
      ],
      "answer": "Burundi",
      "point": "Burundi — Gitega.",
      "typed": "Burundi",
      "map": {
        "kind": "world",
        "place": "Burundi",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g31",
      "level": "hard",
      "q": "What is the capital of Tanzania?",
      "options": [
        "Nairobi",
        "Dodoma",
        "Asmara",
        "Banjul"
      ],
      "answer": "Dodoma",
      "point": "Tanzania — Dodoma.",
      "typed": "Dodoma",
      "map": {
        "kind": "world",
        "place": "Tanzania",
        "where": "Africa",
        "note": "In East Africa — Mount Kilimanjaro is here."
      }
    },
    {
      "key": "s4-g32",
      "level": "hard",
      "q": "Dodoma is the capital of which country?",
      "options": [
        "Tanzania",
        "Sao Tome and Principe",
        "Madagascar",
        "Zambia"
      ],
      "answer": "Tanzania",
      "point": "Tanzania — Dodoma.",
      "typed": "Tanzania",
      "map": {
        "kind": "world",
        "place": "Tanzania",
        "where": "Africa",
        "note": "In East Africa — Mount Kilimanjaro is here."
      }
    },
    {
      "key": "s4-g33",
      "level": "medium",
      "q": "What is the capital of Mozambique?",
      "options": [
        "Antananarivo",
        "Rabat",
        "Maputo",
        "Dakar"
      ],
      "answer": "Maputo",
      "point": "Mozambique — Maputo.",
      "typed": "Maputo",
      "map": {
        "kind": "world",
        "place": "Mozambique",
        "where": "Africa",
        "note": "In south-east Africa, on the Indian Ocean."
      }
    },
    {
      "key": "s4-g34",
      "level": "hard",
      "q": "Maputo is the capital of which country?",
      "options": [
        "Mali",
        "Malawi",
        "Ethiopia",
        "Mozambique"
      ],
      "answer": "Mozambique",
      "point": "Mozambique — Maputo.",
      "typed": "Mozambique",
      "map": {
        "kind": "world",
        "place": "Mozambique",
        "where": "Africa",
        "note": "In south-east Africa, on the Indian Ocean."
      }
    },
    {
      "key": "s4-g35",
      "level": "medium",
      "q": "What is the capital of Zambia?",
      "options": [
        "Freetown",
        "Lusaka",
        "Praia",
        "Malabo"
      ],
      "answer": "Lusaka",
      "point": "Zambia — Lusaka.",
      "typed": "Lusaka",
      "map": {
        "kind": "world",
        "place": "Zambia",
        "where": "Africa",
        "note": "In southern Africa — Victoria Falls is here."
      }
    },
    {
      "key": "s4-g36",
      "level": "hard",
      "q": "Lusaka is the capital of which country?",
      "options": [
        "Tunisia",
        "Malawi",
        "Zambia",
        "Comoros"
      ],
      "answer": "Zambia",
      "point": "Zambia — Lusaka.",
      "typed": "Zambia",
      "map": {
        "kind": "world",
        "place": "Zambia",
        "where": "Africa",
        "note": "In southern Africa — Victoria Falls is here."
      }
    },
    {
      "key": "s4-g37",
      "level": "medium",
      "q": "What is the capital of Zimbabwe?",
      "options": [
        "Harare",
        "Cairo",
        "Nouakchott",
        "Tripoli"
      ],
      "answer": "Harare",
      "point": "Zimbabwe — Harare.",
      "typed": "Harare",
      "map": {
        "kind": "world",
        "place": "Zimbabwe",
        "where": "Africa",
        "note": "In southern Africa, next to Zambia."
      }
    },
    {
      "key": "s4-g38",
      "level": "hard",
      "q": "Harare is the capital of which country?",
      "options": [
        "Liberia",
        "Morocco",
        "Burundi",
        "Zimbabwe"
      ],
      "answer": "Zimbabwe",
      "point": "Zimbabwe — Harare.",
      "typed": "Zimbabwe",
      "map": {
        "kind": "world",
        "place": "Zimbabwe",
        "where": "Africa",
        "note": "In southern Africa, next to Zambia."
      }
    },
    {
      "key": "s4-g39",
      "level": "medium",
      "q": "What is the capital of Malawi?",
      "options": [
        "Porto-Novo",
        "Lilongwe",
        "Harare",
        "Antananarivo"
      ],
      "answer": "Lilongwe",
      "point": "Malawi — Lilongwe.",
      "typed": "Lilongwe",
      "map": {
        "kind": "world",
        "place": "Malawi",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g40",
      "level": "hard",
      "q": "Lilongwe is the capital of which country?",
      "options": [
        "Ivory Coast",
        "Niger",
        "Libya",
        "Malawi"
      ],
      "answer": "Malawi",
      "point": "Malawi — Lilongwe.",
      "typed": "Malawi",
      "map": {
        "kind": "world",
        "place": "Malawi",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g41",
      "level": "medium",
      "q": "What is the capital of Botswana?",
      "options": [
        "Algiers",
        "Moroni",
        "Gaborone",
        "Niamey"
      ],
      "answer": "Gaborone",
      "point": "Botswana — Gaborone.",
      "typed": "Gaborone",
      "map": {
        "kind": "world",
        "place": "Botswana",
        "where": "Africa",
        "note": "In southern Africa, north of South Africa."
      }
    },
    {
      "key": "s4-g42",
      "level": "hard",
      "q": "Gaborone is the capital of which country?",
      "options": [
        "South Africa",
        "Botswana",
        "Dem. Rep. of Congo",
        "Malawi"
      ],
      "answer": "Botswana",
      "point": "Botswana — Gaborone.",
      "typed": "Botswana",
      "map": {
        "kind": "world",
        "place": "Botswana",
        "where": "Africa",
        "note": "In southern Africa, north of South Africa."
      }
    },
    {
      "key": "s4-g43",
      "level": "medium",
      "q": "What is the capital of Namibia?",
      "options": [
        "Abuja",
        "Algiers",
        "Windhoek",
        "Rabat"
      ],
      "answer": "Windhoek",
      "point": "Namibia — Windhoek.",
      "typed": "Windhoek",
      "map": {
        "kind": "world",
        "place": "Namibia",
        "where": "Africa",
        "note": "In southern Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g44",
      "level": "hard",
      "q": "Windhoek is the capital of which country?",
      "options": [
        "Mauritania",
        "Zimbabwe",
        "Eritrea",
        "Namibia"
      ],
      "answer": "Namibia",
      "point": "Namibia — Windhoek.",
      "typed": "Namibia",
      "map": {
        "kind": "world",
        "place": "Namibia",
        "where": "Africa",
        "note": "In southern Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g45",
      "level": "medium",
      "q": "What is the capital of South Africa?",
      "options": [
        "Porto-Novo",
        "Conakry",
        "Moroni",
        "Pretoria"
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
      "key": "s4-g46",
      "level": "hard",
      "q": "Pretoria is the capital of which country?",
      "options": [
        "Burundi",
        "South Africa",
        "Ethiopia",
        "Senegal"
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
      "key": "s4-g47",
      "level": "medium",
      "q": "What is the capital of Lesotho?",
      "options": [
        "Nouakchott",
        "Malabo",
        "Maseru",
        "Sao Tome"
      ],
      "answer": "Maseru",
      "point": "Lesotho — Maseru.",
      "typed": "Maseru",
      "map": {
        "kind": "world",
        "place": "Lesotho",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g48",
      "level": "hard",
      "q": "Maseru is the capital of which country?",
      "options": [
        "Cape Verde",
        "Sierra Leone",
        "Zambia",
        "Lesotho"
      ],
      "answer": "Lesotho",
      "point": "Lesotho — Maseru.",
      "typed": "Lesotho",
      "map": {
        "kind": "world",
        "place": "Lesotho",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g49",
      "level": "medium",
      "q": "What is the capital of Eswatini?",
      "options": [
        "Mogadishu",
        "Ouagadougou",
        "Windhoek",
        "Mbabane"
      ],
      "answer": "Mbabane",
      "point": "Eswatini — Mbabane.",
      "typed": "Mbabane",
      "map": {
        "kind": "world",
        "place": "Eswatini",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g50",
      "level": "hard",
      "q": "Mbabane is the capital of which country?",
      "options": [
        "Egypt",
        "Eswatini",
        "Djibouti",
        "Congo"
      ],
      "answer": "Eswatini",
      "point": "Eswatini — Mbabane.",
      "typed": "Eswatini",
      "map": {
        "kind": "world",
        "place": "Eswatini",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g51",
      "level": "medium",
      "q": "What is the capital of Madagascar?",
      "options": [
        "Khartoum",
        "Yamoussoukro",
        "Bissau",
        "Antananarivo"
      ],
      "answer": "Antananarivo",
      "point": "Madagascar — Antananarivo.",
      "typed": "Antananarivo",
      "map": {
        "kind": "world",
        "place": "Madagascar",
        "where": "Africa",
        "note": "A big island off the south-east coast of Africa."
      }
    },
    {
      "key": "s4-g52",
      "level": "hard",
      "q": "Antananarivo is the capital of which country?",
      "options": [
        "Cameroon",
        "Morocco",
        "Madagascar",
        "Seychelles"
      ],
      "answer": "Madagascar",
      "point": "Madagascar — Antananarivo.",
      "typed": "Madagascar",
      "map": {
        "kind": "world",
        "place": "Madagascar",
        "where": "Africa",
        "note": "A big island off the south-east coast of Africa."
      }
    },
    {
      "key": "s4-g53",
      "level": "medium",
      "q": "What is the capital of Mauritius?",
      "options": [
        "Luanda",
        "Port Louis",
        "Mogadishu",
        "Harare"
      ],
      "answer": "Port Louis",
      "point": "Mauritius — Port Louis.",
      "typed": "Port Louis",
      "map": {
        "kind": "world",
        "place": "Mauritius",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g54",
      "level": "hard",
      "q": "Port Louis is the capital of which country?",
      "options": [
        "Congo",
        "Mauritius",
        "Kenya",
        "Central African Republic"
      ],
      "answer": "Mauritius",
      "point": "Mauritius — Port Louis.",
      "typed": "Mauritius",
      "map": {
        "kind": "world",
        "place": "Mauritius",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g55",
      "level": "medium",
      "q": "What is the capital of Seychelles?",
      "options": [
        "Victoria",
        "Kampala",
        "Kigali",
        "Brazzaville"
      ],
      "answer": "Victoria",
      "point": "Seychelles — Victoria.",
      "typed": "Victoria",
      "map": {
        "kind": "world",
        "place": "Seychelles",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g56",
      "level": "hard",
      "q": "Victoria is the capital of which country?",
      "options": [
        "Seychelles",
        "Cape Verde",
        "Ethiopia",
        "Mali"
      ],
      "answer": "Seychelles",
      "point": "Seychelles — Victoria.",
      "typed": "Seychelles",
      "map": {
        "kind": "world",
        "place": "Seychelles",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g57",
      "level": "medium",
      "q": "What is the capital of Comoros?",
      "options": [
        "Algiers",
        "Yamoussoukro",
        "Moroni",
        "Dakar"
      ],
      "answer": "Moroni",
      "point": "Comoros — Moroni.",
      "typed": "Moroni",
      "map": {
        "kind": "world",
        "place": "Comoros",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g58",
      "level": "hard",
      "q": "Moroni is the capital of which country?",
      "options": [
        "Benin",
        "Somalia",
        "Togo",
        "Comoros"
      ],
      "answer": "Comoros",
      "point": "Comoros — Moroni.",
      "typed": "Comoros",
      "map": {
        "kind": "world",
        "place": "Comoros",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g59",
      "level": "medium",
      "q": "What is the capital of Cape Verde?",
      "options": [
        "N'Djamena",
        "Praia",
        "Conakry",
        "Niamey"
      ],
      "answer": "Praia",
      "point": "Cape Verde — Praia.",
      "typed": "Praia",
      "map": {
        "kind": "world",
        "place": "Cape Verde",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g60",
      "level": "hard",
      "q": "Praia is the capital of which country?",
      "options": [
        "Eswatini",
        "Cape Verde",
        "Congo",
        "Sierra Leone"
      ],
      "answer": "Cape Verde",
      "point": "Cape Verde — Praia.",
      "typed": "Cape Verde",
      "map": {
        "kind": "world",
        "place": "Cape Verde",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g61",
      "level": "medium",
      "q": "What is the capital of Sao Tome and Principe?",
      "options": [
        "Brazzaville",
        "Dakar",
        "Banjul",
        "Sao Tome"
      ],
      "answer": "Sao Tome",
      "point": "Sao Tome and Principe — Sao Tome.",
      "typed": "Sao Tome",
      "map": {
        "kind": "world",
        "place": "Sao Tome and Principe",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g62",
      "level": "hard",
      "q": "Sao Tome is the capital of which country?",
      "options": [
        "Nigeria",
        "Dem. Rep. of Congo",
        "Sao Tome and Principe",
        "Gambia"
      ],
      "answer": "Sao Tome and Principe",
      "point": "Sao Tome and Principe — Sao Tome.",
      "typed": "Sao Tome and Principe",
      "accept": [
        "sao tome"
      ],
      "map": {
        "kind": "world",
        "place": "Sao Tome and Principe",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g63",
      "level": "hard",
      "q": "What is the capital of Nigeria?",
      "options": [
        "Abuja",
        "Nouakchott",
        "Cairo",
        "Windhoek"
      ],
      "answer": "Abuja",
      "point": "Nigeria — Abuja.",
      "typed": "Abuja",
      "map": {
        "kind": "world",
        "place": "Nigeria",
        "where": "Africa",
        "note": "In West Africa — the most populous country in Africa."
      }
    },
    {
      "key": "s4-g64",
      "level": "hard",
      "q": "Abuja is the capital of which country?",
      "options": [
        "Lesotho",
        "Eritrea",
        "Burkina Faso",
        "Nigeria"
      ],
      "answer": "Nigeria",
      "point": "Nigeria — Abuja.",
      "typed": "Nigeria",
      "map": {
        "kind": "world",
        "place": "Nigeria",
        "where": "Africa",
        "note": "In West Africa — the most populous country in Africa."
      }
    },
    {
      "key": "s4-g65",
      "level": "hard",
      "q": "What is the capital of Ghana?",
      "options": [
        "Accra",
        "Sao Tome",
        "Addis Ababa",
        "Praia"
      ],
      "answer": "Accra",
      "point": "Ghana — Accra.",
      "typed": "Accra",
      "map": {
        "kind": "world",
        "place": "Ghana",
        "where": "Africa",
        "note": "In West Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g66",
      "level": "hard",
      "q": "Accra is the capital of which country?",
      "options": [
        "South Sudan",
        "Dem. Rep. of Congo",
        "Ghana",
        "Guinea"
      ],
      "answer": "Ghana",
      "point": "Ghana — Accra.",
      "typed": "Ghana",
      "map": {
        "kind": "world",
        "place": "Ghana",
        "where": "Africa",
        "note": "In West Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g67",
      "level": "medium",
      "q": "What is the capital of Ivory Coast?",
      "options": [
        "Tunis",
        "Dakar",
        "Yamoussoukro",
        "Conakry"
      ],
      "answer": "Yamoussoukro",
      "point": "Ivory Coast — Yamoussoukro.",
      "typed": "Yamoussoukro",
      "map": {
        "kind": "world",
        "place": "Ivory Coast",
        "where": "Africa",
        "note": "In West Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g68",
      "level": "hard",
      "q": "Yamoussoukro is the capital of which country?",
      "options": [
        "Ivory Coast",
        "Mauritania",
        "Senegal",
        "Chad"
      ],
      "answer": "Ivory Coast",
      "point": "Ivory Coast — Yamoussoukro.",
      "typed": "Ivory Coast",
      "map": {
        "kind": "world",
        "place": "Ivory Coast",
        "where": "Africa",
        "note": "In West Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g69",
      "level": "medium",
      "q": "What is the capital of Senegal?",
      "options": [
        "Brazzaville",
        "N'Djamena",
        "Harare",
        "Dakar"
      ],
      "answer": "Dakar",
      "point": "Senegal — Dakar.",
      "typed": "Dakar",
      "map": {
        "kind": "world",
        "place": "Senegal",
        "where": "Africa",
        "note": "In West Africa — the westernmost country of Africa."
      }
    },
    {
      "key": "s4-g70",
      "level": "hard",
      "q": "Dakar is the capital of which country?",
      "options": [
        "Seychelles",
        "Senegal",
        "Tanzania",
        "Gabon"
      ],
      "answer": "Senegal",
      "point": "Senegal — Dakar.",
      "typed": "Senegal",
      "map": {
        "kind": "world",
        "place": "Senegal",
        "where": "Africa",
        "note": "In West Africa — the westernmost country of Africa."
      }
    },
    {
      "key": "s4-g71",
      "level": "medium",
      "q": "What is the capital of Mali?",
      "options": [
        "Bamako",
        "Mbabane",
        "Banjul",
        "Mogadishu"
      ],
      "answer": "Bamako",
      "point": "Mali — Bamako.",
      "typed": "Bamako",
      "map": {
        "kind": "world",
        "place": "Mali",
        "where": "Africa",
        "note": "In West Africa — Timbuktu is here."
      }
    },
    {
      "key": "s4-g72",
      "level": "hard",
      "q": "Bamako is the capital of which country?",
      "options": [
        "Mali",
        "Sudan",
        "Senegal",
        "Botswana"
      ],
      "answer": "Mali",
      "point": "Mali — Bamako.",
      "typed": "Mali",
      "map": {
        "kind": "world",
        "place": "Mali",
        "where": "Africa",
        "note": "In West Africa — Timbuktu is here."
      }
    },
    {
      "key": "s4-g73",
      "level": "medium",
      "q": "What is the capital of Burkina Faso?",
      "options": [
        "Pretoria",
        "Monrovia",
        "Ouagadougou",
        "Tunis"
      ],
      "answer": "Ouagadougou",
      "point": "Burkina Faso — Ouagadougou.",
      "typed": "Ouagadougou",
      "map": {
        "kind": "world",
        "place": "Burkina Faso",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g74",
      "level": "hard",
      "q": "Ouagadougou is the capital of which country?",
      "options": [
        "Burkina Faso",
        "Guinea",
        "Ethiopia",
        "Togo"
      ],
      "answer": "Burkina Faso",
      "point": "Burkina Faso — Ouagadougou.",
      "typed": "Burkina Faso",
      "map": {
        "kind": "world",
        "place": "Burkina Faso",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g75",
      "level": "medium",
      "q": "What is the capital of Niger?",
      "options": [
        "Sao Tome",
        "Dakar",
        "Lilongwe",
        "Niamey"
      ],
      "answer": "Niamey",
      "point": "Niger — Niamey.",
      "typed": "Niamey",
      "map": {
        "kind": "world",
        "place": "Niger",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g76",
      "level": "hard",
      "q": "Niamey is the capital of which country?",
      "options": [
        "Mozambique",
        "Ethiopia",
        "Niger",
        "Burkina Faso"
      ],
      "answer": "Niger",
      "point": "Niger — Niamey.",
      "typed": "Niger",
      "map": {
        "kind": "world",
        "place": "Niger",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g77",
      "level": "medium",
      "q": "What is the capital of Guinea?",
      "options": [
        "Dakar",
        "Antananarivo",
        "Conakry",
        "Sao Tome"
      ],
      "answer": "Conakry",
      "point": "Guinea — Conakry.",
      "typed": "Conakry",
      "map": {
        "kind": "world",
        "place": "Guinea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g78",
      "level": "hard",
      "q": "Conakry is the capital of which country?",
      "options": [
        "Chad",
        "Guinea",
        "Libya",
        "Congo"
      ],
      "answer": "Guinea",
      "point": "Guinea — Conakry.",
      "typed": "Guinea",
      "map": {
        "kind": "world",
        "place": "Guinea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g79",
      "level": "medium",
      "q": "What is the capital of Guinea-Bissau?",
      "options": [
        "Porto-Novo",
        "Bissau",
        "Freetown",
        "Monrovia"
      ],
      "answer": "Bissau",
      "point": "Guinea-Bissau — Bissau.",
      "typed": "Bissau",
      "map": {
        "kind": "world",
        "place": "Guinea-Bissau",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g80",
      "level": "hard",
      "q": "Bissau is the capital of which country?",
      "options": [
        "Chad",
        "Eswatini",
        "Comoros",
        "Guinea-Bissau"
      ],
      "answer": "Guinea-Bissau",
      "point": "Guinea-Bissau — Bissau.",
      "typed": "Guinea-Bissau",
      "map": {
        "kind": "world",
        "place": "Guinea-Bissau",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g81",
      "level": "medium",
      "q": "What is the capital of Sierra Leone?",
      "options": [
        "Bamako",
        "Khartoum",
        "Freetown",
        "Conakry"
      ],
      "answer": "Freetown",
      "point": "Sierra Leone — Freetown.",
      "typed": "Freetown",
      "map": {
        "kind": "world",
        "place": "Sierra Leone",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g82",
      "level": "hard",
      "q": "Freetown is the capital of which country?",
      "options": [
        "Burkina Faso",
        "Morocco",
        "South Sudan",
        "Sierra Leone"
      ],
      "answer": "Sierra Leone",
      "point": "Sierra Leone — Freetown.",
      "typed": "Sierra Leone",
      "map": {
        "kind": "world",
        "place": "Sierra Leone",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g83",
      "level": "medium",
      "q": "What is the capital of Liberia?",
      "options": [
        "Freetown",
        "Moroni",
        "Yamoussoukro",
        "Monrovia"
      ],
      "answer": "Monrovia",
      "point": "Liberia — Monrovia.",
      "typed": "Monrovia",
      "map": {
        "kind": "world",
        "place": "Liberia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g84",
      "level": "hard",
      "q": "Monrovia is the capital of which country?",
      "options": [
        "Guinea-Bissau",
        "Dem. Rep. of Congo",
        "Liberia",
        "Togo"
      ],
      "answer": "Liberia",
      "point": "Liberia — Monrovia.",
      "typed": "Liberia",
      "map": {
        "kind": "world",
        "place": "Liberia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g85",
      "level": "medium",
      "q": "What is the capital of Togo?",
      "options": [
        "Bissau",
        "Lome",
        "Sao Tome",
        "Yamoussoukro"
      ],
      "answer": "Lome",
      "point": "Togo — Lome.",
      "typed": "Lome",
      "map": {
        "kind": "world",
        "place": "Togo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g86",
      "level": "hard",
      "q": "Lome is the capital of which country?",
      "options": [
        "South Africa",
        "Burkina Faso",
        "Equatorial Guinea",
        "Togo"
      ],
      "answer": "Togo",
      "point": "Togo — Lome.",
      "typed": "Togo",
      "map": {
        "kind": "world",
        "place": "Togo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g87",
      "level": "medium",
      "q": "What is the capital of Benin?",
      "options": [
        "Rabat",
        "Porto-Novo",
        "Accra",
        "Tripoli"
      ],
      "answer": "Porto-Novo",
      "point": "Benin — Porto-Novo.",
      "typed": "Porto-Novo",
      "map": {
        "kind": "world",
        "place": "Benin",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g88",
      "level": "hard",
      "q": "Porto-Novo is the capital of which country?",
      "options": [
        "Mali",
        "Benin",
        "Uganda",
        "Sierra Leone"
      ],
      "answer": "Benin",
      "point": "Benin — Porto-Novo.",
      "typed": "Benin",
      "map": {
        "kind": "world",
        "place": "Benin",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g89",
      "level": "medium",
      "q": "What is the capital of Cameroon?",
      "options": [
        "Maseru",
        "Yaounde",
        "Nouakchott",
        "Moroni"
      ],
      "answer": "Yaounde",
      "point": "Cameroon — Yaounde.",
      "typed": "Yaounde",
      "map": {
        "kind": "world",
        "place": "Cameroon",
        "where": "Africa",
        "note": "In Central Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g90",
      "level": "hard",
      "q": "Yaounde is the capital of which country?",
      "options": [
        "South Sudan",
        "Djibouti",
        "Morocco",
        "Cameroon"
      ],
      "answer": "Cameroon",
      "point": "Cameroon — Yaounde.",
      "typed": "Cameroon",
      "map": {
        "kind": "world",
        "place": "Cameroon",
        "where": "Africa",
        "note": "In Central Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g91",
      "level": "medium",
      "q": "What is the capital of Central African Republic?",
      "options": [
        "Yaounde",
        "Victoria",
        "Bangui",
        "Praia"
      ],
      "answer": "Bangui",
      "point": "Central African Republic — Bangui.",
      "typed": "Bangui",
      "map": {
        "kind": "world",
        "place": "Central African Republic",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g92",
      "level": "hard",
      "q": "Bangui is the capital of which country?",
      "options": [
        "Central African Republic",
        "Chad",
        "Equatorial Guinea",
        "Sudan"
      ],
      "answer": "Central African Republic",
      "point": "Central African Republic — Bangui.",
      "typed": "Central African Republic",
      "map": {
        "kind": "world",
        "place": "Central African Republic",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g93",
      "level": "medium",
      "q": "What is the capital of Chad?",
      "options": [
        "Libreville",
        "N'Djamena",
        "Yaounde",
        "Tunis"
      ],
      "answer": "N'Djamena",
      "point": "Chad — N'Djamena.",
      "typed": "N'Djamena",
      "map": {
        "kind": "world",
        "place": "Chad",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g94",
      "level": "hard",
      "q": "N'Djamena is the capital of which country?",
      "options": [
        "Chad",
        "South Sudan",
        "Mauritius",
        "Zambia"
      ],
      "answer": "Chad",
      "point": "Chad — N'Djamena.",
      "typed": "Chad",
      "map": {
        "kind": "world",
        "place": "Chad",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g95",
      "level": "medium",
      "q": "What is the capital of Congo?",
      "options": [
        "Mogadishu",
        "Malabo",
        "Khartoum",
        "Brazzaville"
      ],
      "answer": "Brazzaville",
      "point": "Congo — Brazzaville.",
      "typed": "Brazzaville",
      "map": {
        "kind": "world",
        "place": "Congo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g96",
      "level": "hard",
      "q": "Brazzaville is the capital of which country?",
      "options": [
        "Congo",
        "Nigeria",
        "Mauritius",
        "Uganda"
      ],
      "answer": "Congo",
      "point": "Congo — Brazzaville.",
      "typed": "Congo",
      "map": {
        "kind": "world",
        "place": "Congo",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g97",
      "level": "hard",
      "q": "What is the capital of Dem. Rep. of Congo?",
      "options": [
        "Maseru",
        "Rabat",
        "Djibouti",
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
      "key": "s4-g98",
      "level": "hard",
      "q": "Kinshasa is the capital of which country?",
      "options": [
        "Malawi",
        "Dem. Rep. of Congo",
        "South Sudan",
        "Seychelles"
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
      "key": "s4-g99",
      "level": "medium",
      "q": "What is the capital of Gabon?",
      "options": [
        "Libreville",
        "Porto-Novo",
        "Nairobi",
        "Cairo"
      ],
      "answer": "Libreville",
      "point": "Gabon — Libreville.",
      "typed": "Libreville",
      "map": {
        "kind": "world",
        "place": "Gabon",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g100",
      "level": "hard",
      "q": "Libreville is the capital of which country?",
      "options": [
        "Sierra Leone",
        "Gabon",
        "Namibia",
        "Ethiopia"
      ],
      "answer": "Gabon",
      "point": "Gabon — Libreville.",
      "typed": "Gabon",
      "map": {
        "kind": "world",
        "place": "Gabon",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g101",
      "level": "medium",
      "q": "What is the capital of Equatorial Guinea?",
      "options": [
        "Antananarivo",
        "Port Louis",
        "Malabo",
        "Bissau"
      ],
      "answer": "Malabo",
      "point": "Equatorial Guinea — Malabo.",
      "typed": "Malabo",
      "map": {
        "kind": "world",
        "place": "Equatorial Guinea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g102",
      "level": "hard",
      "q": "Malabo is the capital of which country?",
      "options": [
        "Uganda",
        "Burkina Faso",
        "Equatorial Guinea",
        "Lesotho"
      ],
      "answer": "Equatorial Guinea",
      "point": "Equatorial Guinea — Malabo.",
      "typed": "Equatorial Guinea",
      "map": {
        "kind": "world",
        "place": "Equatorial Guinea",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g103",
      "level": "medium",
      "q": "What is the capital of Angola?",
      "options": [
        "Luanda",
        "N'Djamena",
        "Lusaka",
        "Maseru"
      ],
      "answer": "Luanda",
      "point": "Angola — Luanda.",
      "typed": "Luanda",
      "map": {
        "kind": "world",
        "place": "Angola",
        "where": "Africa",
        "note": "In southern Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g104",
      "level": "hard",
      "q": "Luanda is the capital of which country?",
      "options": [
        "Angola",
        "Ghana",
        "Egypt",
        "Equatorial Guinea"
      ],
      "answer": "Angola",
      "point": "Angola — Luanda.",
      "typed": "Angola",
      "map": {
        "kind": "world",
        "place": "Angola",
        "where": "Africa",
        "note": "In southern Africa, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g105",
      "level": "medium",
      "q": "What is the capital of Mauritania?",
      "options": [
        "Mbabane",
        "Nouakchott",
        "Tripoli",
        "Banjul"
      ],
      "answer": "Nouakchott",
      "point": "Mauritania — Nouakchott.",
      "typed": "Nouakchott",
      "map": {
        "kind": "world",
        "place": "Mauritania",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g106",
      "level": "hard",
      "q": "Nouakchott is the capital of which country?",
      "options": [
        "Egypt",
        "Tunisia",
        "Togo",
        "Mauritania"
      ],
      "answer": "Mauritania",
      "point": "Mauritania — Nouakchott.",
      "typed": "Mauritania",
      "map": {
        "kind": "world",
        "place": "Mauritania",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g107",
      "level": "medium",
      "q": "What is the capital of Gambia?",
      "options": [
        "Banjul",
        "Monrovia",
        "Cairo",
        "Asmara"
      ],
      "answer": "Banjul",
      "point": "Gambia — Banjul.",
      "typed": "Banjul",
      "map": {
        "kind": "world",
        "place": "Gambia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g108",
      "level": "hard",
      "q": "Banjul is the capital of which country?",
      "options": [
        "Morocco",
        "Benin",
        "Gambia",
        "Chad"
      ],
      "answer": "Gambia",
      "point": "Gambia — Banjul.",
      "typed": "Gambia",
      "map": {
        "kind": "world",
        "place": "Gambia",
        "where": "Africa",
        "note": "In Africa."
      }
    },
    {
      "key": "s4-g109",
      "level": "hard",
      "q": "What is the capital of Afghanistan?",
      "options": [
        "Seoul",
        "Kabul",
        "Thimphu",
        "Baghdad"
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
      "key": "s4-g110",
      "level": "hard",
      "q": "Kabul is the capital of which country?",
      "options": [
        "Bangladesh",
        "Thailand",
        "Tajikistan",
        "Afghanistan"
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
      "key": "s4-g111",
      "level": "medium",
      "q": "What is the capital of Armenia?",
      "options": [
        "Doha",
        "Yerevan",
        "Manama",
        "Bishkek"
      ],
      "answer": "Yerevan",
      "point": "Armenia — Yerevan.",
      "typed": "Yerevan",
      "map": {
        "kind": "world",
        "place": "Armenia",
        "where": "Asia",
        "note": "In the Caucasus, between Turkey and Azerbaijan."
      }
    },
    {
      "key": "s4-g112",
      "level": "hard",
      "q": "Yerevan is the capital of which country?",
      "options": [
        "Myanmar",
        "Armenia",
        "Maldives",
        "India"
      ],
      "answer": "Armenia",
      "point": "Armenia — Yerevan.",
      "typed": "Armenia",
      "map": {
        "kind": "world",
        "place": "Armenia",
        "where": "Asia",
        "note": "In the Caucasus, between Turkey and Azerbaijan."
      }
    },
    {
      "key": "s4-g113",
      "level": "medium",
      "q": "What is the capital of Azerbaijan?",
      "options": [
        "Baku",
        "Ashgabat",
        "Dili",
        "Riyadh"
      ],
      "answer": "Baku",
      "point": "Azerbaijan — Baku.",
      "typed": "Baku",
      "map": {
        "kind": "world",
        "place": "Azerbaijan",
        "where": "Asia",
        "note": "In the Caucasus, on the Caspian Sea."
      }
    },
    {
      "key": "s4-g114",
      "level": "hard",
      "q": "Baku is the capital of which country?",
      "options": [
        "Azerbaijan",
        "Palestine",
        "Laos",
        "Kyrgyzstan"
      ],
      "answer": "Azerbaijan",
      "point": "Azerbaijan — Baku.",
      "typed": "Azerbaijan",
      "map": {
        "kind": "world",
        "place": "Azerbaijan",
        "where": "Asia",
        "note": "In the Caucasus, on the Caspian Sea."
      }
    },
    {
      "key": "s4-g115",
      "level": "medium",
      "q": "What is the capital of Bahrain?",
      "options": [
        "Damascus",
        "Manama",
        "Hanoi",
        "Ulaanbaatar"
      ],
      "answer": "Manama",
      "point": "Bahrain — Manama.",
      "typed": "Manama",
      "map": {
        "kind": "world",
        "place": "Bahrain",
        "where": "Asia",
        "note": "A small island country in the Gulf, next to Saudi Arabia."
      }
    },
    {
      "key": "s4-g116",
      "level": "hard",
      "q": "Manama is the capital of which country?",
      "options": [
        "Bahrain",
        "Kuwait",
        "Vietnam",
        "Bhutan"
      ],
      "answer": "Bahrain",
      "point": "Bahrain — Manama.",
      "typed": "Bahrain",
      "map": {
        "kind": "world",
        "place": "Bahrain",
        "where": "Asia",
        "note": "A small island country in the Gulf, next to Saudi Arabia."
      }
    },
    {
      "key": "s4-g117",
      "level": "easy",
      "q": "What is the capital of Bangladesh?",
      "options": [
        "Beijing",
        "Sanaa",
        "Dhaka",
        "New Delhi"
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
      "key": "s4-g118",
      "level": "medium",
      "q": "Dhaka is the capital of which country?",
      "options": [
        "Armenia",
        "Bangladesh",
        "UAE",
        "Sri Lanka"
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
      "key": "s4-g119",
      "level": "hard",
      "q": "What is the capital of Bhutan?",
      "options": [
        "Thimphu",
        "Beijing",
        "Abu Dhabi",
        "Tehran"
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
      "key": "s4-g120",
      "level": "hard",
      "q": "Thimphu is the capital of which country?",
      "options": [
        "Cambodia",
        "Vietnam",
        "Bhutan",
        "Azerbaijan"
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
      "key": "s4-g121",
      "level": "medium",
      "q": "What is the capital of Brunei?",
      "options": [
        "Bandar Seri Begawan",
        "Manama",
        "Baku",
        "Tashkent"
      ],
      "answer": "Bandar Seri Begawan",
      "point": "Brunei — Bandar Seri Begawan.",
      "typed": "Bandar Seri Begawan",
      "accept": [
        "bandar"
      ],
      "map": {
        "kind": "world",
        "place": "Brunei",
        "where": "Asia",
        "note": "A small country on the island of Borneo."
      }
    },
    {
      "key": "s4-g122",
      "level": "hard",
      "q": "Bandar Seri Begawan is the capital of which country?",
      "options": [
        "Brunei",
        "Palestine",
        "Mongolia",
        "Singapore"
      ],
      "answer": "Brunei",
      "point": "Brunei — Bandar Seri Begawan.",
      "typed": "Brunei",
      "map": {
        "kind": "world",
        "place": "Brunei",
        "where": "Asia",
        "note": "A small country on the island of Borneo."
      }
    },
    {
      "key": "s4-g123",
      "level": "medium",
      "q": "What is the capital of Cambodia?",
      "options": [
        "Naypyidaw",
        "Sanaa",
        "Male",
        "Phnom Penh"
      ],
      "answer": "Phnom Penh",
      "point": "Cambodia — Phnom Penh.",
      "typed": "Phnom Penh",
      "map": {
        "kind": "world",
        "place": "Cambodia",
        "where": "Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s4-g124",
      "level": "hard",
      "q": "Phnom Penh is the capital of which country?",
      "options": [
        "Thailand",
        "Cambodia",
        "Iran",
        "China"
      ],
      "answer": "Cambodia",
      "point": "Cambodia — Phnom Penh.",
      "typed": "Cambodia",
      "map": {
        "kind": "world",
        "place": "Cambodia",
        "where": "Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s4-g125",
      "level": "easy",
      "q": "What is the capital of China?",
      "options": [
        "Seoul",
        "Kabul",
        "Beijing",
        "Baku"
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
      "key": "s4-g126",
      "level": "medium",
      "q": "Beijing is the capital of which country?",
      "options": [
        "Turkey",
        "China",
        "Bangladesh",
        "Israel"
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
      "key": "s4-g127",
      "level": "medium",
      "q": "What is the capital of Cyprus?",
      "options": [
        "Thimphu",
        "Pyongyang",
        "Nicosia",
        "Tashkent"
      ],
      "answer": "Nicosia",
      "point": "Cyprus — Nicosia.",
      "typed": "Nicosia",
      "map": {
        "kind": "world",
        "place": "Cyprus",
        "where": "Asia",
        "note": "An island in the Mediterranean Sea, south of Turkey."
      }
    },
    {
      "key": "s4-g128",
      "level": "hard",
      "q": "Nicosia is the capital of which country?",
      "options": [
        "Brunei",
        "Cyprus",
        "Vietnam",
        "Syria"
      ],
      "answer": "Cyprus",
      "point": "Cyprus — Nicosia.",
      "typed": "Cyprus",
      "map": {
        "kind": "world",
        "place": "Cyprus",
        "where": "Asia",
        "note": "An island in the Mediterranean Sea, south of Turkey."
      }
    },
    {
      "key": "s4-g129",
      "level": "medium",
      "q": "What is the capital of Georgia?",
      "options": [
        "Bangkok",
        "Tbilisi",
        "Jerusalem",
        "Phnom Penh"
      ],
      "answer": "Tbilisi",
      "point": "Georgia — Tbilisi.",
      "typed": "Tbilisi",
      "map": {
        "kind": "world",
        "place": "Georgia",
        "where": "Asia",
        "note": "In the Caucasus, on the Black Sea."
      }
    },
    {
      "key": "s4-g130",
      "level": "hard",
      "q": "Tbilisi is the capital of which country?",
      "options": [
        "Azerbaijan",
        "Iran",
        "Qatar",
        "Georgia"
      ],
      "answer": "Georgia",
      "point": "Georgia — Tbilisi.",
      "typed": "Georgia",
      "map": {
        "kind": "world",
        "place": "Georgia",
        "where": "Asia",
        "note": "In the Caucasus, on the Black Sea."
      }
    },
    {
      "key": "s4-g131",
      "level": "easy",
      "q": "What is the capital of India?",
      "options": [
        "Phnom Penh",
        "Male",
        "New Delhi",
        "Beijing"
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
      "key": "s4-g132",
      "level": "medium",
      "q": "New Delhi is the capital of which country?",
      "options": [
        "Sri Lanka",
        "Thailand",
        "Mongolia",
        "India"
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
      "key": "s4-g133",
      "level": "easy",
      "q": "What is the capital of Indonesia?",
      "options": [
        "Jakarta",
        "Jerusalem",
        "Dhaka",
        "Beijing"
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
      "key": "s4-g134",
      "level": "medium",
      "q": "Jakarta is the capital of which country?",
      "options": [
        "Bangladesh",
        "Malaysia",
        "Indonesia",
        "Philippines"
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
      "key": "s4-g135",
      "level": "medium",
      "q": "What is the capital of Iran?",
      "options": [
        "Beijing",
        "Tehran",
        "Jerusalem",
        "Amman"
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
      "key": "s4-g136",
      "level": "hard",
      "q": "Tehran is the capital of which country?",
      "options": [
        "Lebanon",
        "Maldives",
        "Turkmenistan",
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
      "key": "s4-g137",
      "level": "medium",
      "q": "What is the capital of Iraq?",
      "options": [
        "Baghdad",
        "Seoul",
        "Damascus",
        "Jerusalem"
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
      "key": "s4-g138",
      "level": "hard",
      "q": "Baghdad is the capital of which country?",
      "options": [
        "Iraq",
        "Bangladesh",
        "Jordan",
        "Iran"
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
      "key": "s4-g139",
      "level": "medium",
      "q": "What is the capital of Israel?",
      "options": [
        "Muscat",
        "Dushanbe",
        "Tehran",
        "Jerusalem"
      ],
      "answer": "Jerusalem",
      "point": "Israel — Jerusalem.",
      "typed": "Jerusalem",
      "map": {
        "kind": "world",
        "place": "Israel",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g140",
      "level": "hard",
      "q": "Jerusalem is the capital of which country?",
      "options": [
        "Jordan",
        "Turkmenistan",
        "Israel",
        "Pakistan"
      ],
      "answer": "Israel",
      "point": "Israel — Jerusalem.",
      "typed": "Israel",
      "map": {
        "kind": "world",
        "place": "Israel",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g142",
      "level": "medium",
      "q": "Tokyo is the capital of which country?",
      "options": [
        "Singapore",
        "Jordan",
        "Japan",
        "South Korea"
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
      "key": "s4-g143",
      "level": "hard",
      "q": "What is the capital of Jordan?",
      "options": [
        "Phnom Penh",
        "Tbilisi",
        "Amman",
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
      "key": "s4-g144",
      "level": "hard",
      "q": "Amman is the capital of which country?",
      "options": [
        "Pakistan",
        "Jordan",
        "Bahrain",
        "Azerbaijan"
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
      "key": "s4-g145",
      "level": "medium",
      "q": "What is the capital of Kazakhstan?",
      "options": [
        "Astana",
        "Beirut",
        "Manila",
        "Singapore"
      ],
      "answer": "Astana",
      "point": "Kazakhstan — Astana.",
      "typed": "Astana",
      "map": {
        "kind": "world",
        "place": "Kazakhstan",
        "where": "Asia",
        "note": "In Central Asia — the largest landlocked country in the world."
      }
    },
    {
      "key": "s4-g146",
      "level": "hard",
      "q": "Astana is the capital of which country?",
      "options": [
        "Philippines",
        "Georgia",
        "Kazakhstan",
        "Nepal"
      ],
      "answer": "Kazakhstan",
      "point": "Kazakhstan — Astana.",
      "typed": "Kazakhstan",
      "map": {
        "kind": "world",
        "place": "Kazakhstan",
        "where": "Asia",
        "note": "In Central Asia — the largest landlocked country in the world."
      }
    },
    {
      "key": "s4-g147",
      "level": "hard",
      "q": "What is the capital of Kuwait?",
      "options": [
        "Baghdad",
        "Dushanbe",
        "Bandar Seri Begawan",
        "Kuwait City"
      ],
      "answer": "Kuwait City",
      "point": "Kuwait — Kuwait City.",
      "typed": "Kuwait City",
      "accept": [
        "kuwait"
      ],
      "map": {
        "kind": "world",
        "place": "Kuwait",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g148",
      "level": "hard",
      "q": "Kuwait City is the capital of which country?",
      "options": [
        "East Timor",
        "Lebanon",
        "Israel",
        "Kuwait"
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
      "key": "s4-g149",
      "level": "medium",
      "q": "What is the capital of Kyrgyzstan?",
      "options": [
        "Pyongyang",
        "Bangkok",
        "Bishkek",
        "Kathmandu"
      ],
      "answer": "Bishkek",
      "point": "Kyrgyzstan — Bishkek.",
      "typed": "Bishkek",
      "map": {
        "kind": "world",
        "place": "Kyrgyzstan",
        "where": "Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s4-g150",
      "level": "hard",
      "q": "Bishkek is the capital of which country?",
      "options": [
        "Iraq",
        "Japan",
        "Kyrgyzstan",
        "Pakistan"
      ],
      "answer": "Kyrgyzstan",
      "point": "Kyrgyzstan — Bishkek.",
      "typed": "Kyrgyzstan",
      "map": {
        "kind": "world",
        "place": "Kyrgyzstan",
        "where": "Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s4-g151",
      "level": "medium",
      "q": "What is the capital of Laos?",
      "options": [
        "Seoul",
        "Vientiane",
        "Hanoi",
        "Islamabad"
      ],
      "answer": "Vientiane",
      "point": "Laos — Vientiane.",
      "typed": "Vientiane",
      "map": {
        "kind": "world",
        "place": "Laos",
        "where": "Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s4-g152",
      "level": "hard",
      "q": "Vientiane is the capital of which country?",
      "options": [
        "Bahrain",
        "Malaysia",
        "Uzbekistan",
        "Laos"
      ],
      "answer": "Laos",
      "point": "Laos — Vientiane.",
      "typed": "Laos",
      "map": {
        "kind": "world",
        "place": "Laos",
        "where": "Asia",
        "note": "In South-East Asia, between Thailand and Vietnam."
      }
    },
    {
      "key": "s4-g153",
      "level": "hard",
      "q": "What is the capital of Lebanon?",
      "options": [
        "Beirut",
        "Bangkok",
        "Vientiane",
        "Tbilisi"
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
      "key": "s4-g154",
      "level": "hard",
      "q": "Beirut is the capital of which country?",
      "options": [
        "Lebanon",
        "Jordan",
        "Turkey",
        "Sri Lanka"
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
      "key": "s4-g155",
      "level": "easy",
      "q": "What is the capital of Malaysia?",
      "options": [
        "Amman",
        "Kuala Lumpur",
        "Kuwait City",
        "Islamabad"
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
      "key": "s4-g156",
      "level": "medium",
      "q": "Kuala Lumpur is the capital of which country?",
      "options": [
        "UAE",
        "Malaysia",
        "Bahrain",
        "Tajikistan"
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
      "key": "s4-g157",
      "level": "hard",
      "q": "What is the capital of Maldives?",
      "options": [
        "Manila",
        "Kabul",
        "Baghdad",
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
      "key": "s4-g158",
      "level": "hard",
      "q": "Male is the capital of which country?",
      "options": [
        "Cyprus",
        "Lebanon",
        "Maldives",
        "Iran"
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
      "key": "s4-g159",
      "level": "medium",
      "q": "What is the capital of Mongolia?",
      "options": [
        "Bangkok",
        "Seoul",
        "Ulaanbaatar",
        "Tbilisi"
      ],
      "answer": "Ulaanbaatar",
      "point": "Mongolia — Ulaanbaatar.",
      "typed": "Ulaanbaatar",
      "map": {
        "kind": "world",
        "place": "Mongolia",
        "where": "Asia",
        "note": "In East Asia, between China and Russia."
      }
    },
    {
      "key": "s4-g160",
      "level": "hard",
      "q": "Ulaanbaatar is the capital of which country?",
      "options": [
        "Mongolia",
        "East Timor",
        "Pakistan",
        "Thailand"
      ],
      "answer": "Mongolia",
      "point": "Mongolia — Ulaanbaatar.",
      "typed": "Mongolia",
      "map": {
        "kind": "world",
        "place": "Mongolia",
        "where": "Asia",
        "note": "In East Asia, between China and Russia."
      }
    },
    {
      "key": "s4-g161",
      "level": "hard",
      "q": "What is the capital of Myanmar?",
      "options": [
        "Ulaanbaatar",
        "Naypyidaw",
        "Tashkent",
        "Seoul"
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
      "key": "s4-g162",
      "level": "hard",
      "q": "Naypyidaw is the capital of which country?",
      "options": [
        "Saudi Arabia",
        "Uzbekistan",
        "Japan",
        "Myanmar"
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
      "key": "s4-g164",
      "level": "medium",
      "q": "Kathmandu is the capital of which country?",
      "options": [
        "Tajikistan",
        "Brunei",
        "Nepal",
        "Georgia"
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
      "key": "s4-g165",
      "level": "medium",
      "q": "What is the capital of North Korea?",
      "options": [
        "Pyongyang",
        "Male",
        "Dushanbe",
        "Baghdad"
      ],
      "answer": "Pyongyang",
      "point": "North Korea — Pyongyang.",
      "typed": "Pyongyang",
      "map": {
        "kind": "world",
        "place": "North Korea",
        "where": "Asia",
        "note": "In East Asia, north of South Korea."
      }
    },
    {
      "key": "s4-g166",
      "level": "hard",
      "q": "Pyongyang is the capital of which country?",
      "options": [
        "Myanmar",
        "Kazakhstan",
        "Brunei",
        "North Korea"
      ],
      "answer": "North Korea",
      "point": "North Korea — Pyongyang.",
      "typed": "North Korea",
      "map": {
        "kind": "world",
        "place": "North Korea",
        "where": "Asia",
        "note": "In East Asia, north of South Korea."
      }
    },
    {
      "key": "s4-g167",
      "level": "hard",
      "q": "What is the capital of Oman?",
      "options": [
        "Muscat",
        "Islamabad",
        "Yerevan",
        "Dushanbe"
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
      "key": "s4-g168",
      "level": "hard",
      "q": "Muscat is the capital of which country?",
      "options": [
        "Turkey",
        "Mongolia",
        "Oman",
        "Nepal"
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
      "key": "s4-g169",
      "level": "easy",
      "q": "What is the capital of Pakistan?",
      "options": [
        "Sri Jayawardenepura Kotte",
        "Manila",
        "Islamabad",
        "Male"
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
      "key": "s4-g170",
      "level": "medium",
      "q": "Islamabad is the capital of which country?",
      "options": [
        "Nepal",
        "China",
        "Turkmenistan",
        "Pakistan"
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
      "key": "s4-g171",
      "level": "medium",
      "q": "What is the capital of Palestine?",
      "options": [
        "Jakarta",
        "Seoul",
        "Ramallah",
        "Nicosia"
      ],
      "answer": "Ramallah",
      "point": "Palestine — Ramallah.",
      "typed": "Ramallah",
      "map": {
        "kind": "world",
        "place": "Palestine",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g172",
      "level": "hard",
      "q": "Ramallah is the capital of which country?",
      "options": [
        "Georgia",
        "South Korea",
        "Palestine",
        "Bhutan"
      ],
      "answer": "Palestine",
      "point": "Palestine — Ramallah.",
      "typed": "Palestine",
      "map": {
        "kind": "world",
        "place": "Palestine",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g173",
      "level": "medium",
      "q": "What is the capital of Philippines?",
      "options": [
        "Kathmandu",
        "Phnom Penh",
        "Thimphu",
        "Manila"
      ],
      "answer": "Manila",
      "point": "Philippines — Manila.",
      "typed": "Manila",
      "map": {
        "kind": "world",
        "place": "Philippines",
        "where": "Asia",
        "note": "Islands in South-East Asia, east of Vietnam."
      }
    },
    {
      "key": "s4-g174",
      "level": "hard",
      "q": "Manila is the capital of which country?",
      "options": [
        "Maldives",
        "Kuwait",
        "Philippines",
        "Nepal"
      ],
      "answer": "Philippines",
      "point": "Philippines — Manila.",
      "typed": "Philippines",
      "map": {
        "kind": "world",
        "place": "Philippines",
        "where": "Asia",
        "note": "Islands in South-East Asia, east of Vietnam."
      }
    },
    {
      "key": "s4-g175",
      "level": "hard",
      "q": "What is the capital of Qatar?",
      "options": [
        "Sanaa",
        "Ulaanbaatar",
        "Kabul",
        "Doha"
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
      "key": "s4-g176",
      "level": "hard",
      "q": "Doha is the capital of which country?",
      "options": [
        "Afghanistan",
        "Oman",
        "Iraq",
        "Qatar"
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
      "key": "s4-g177",
      "level": "easy",
      "q": "What is the capital of Saudi Arabia?",
      "options": [
        "Jerusalem",
        "Riyadh",
        "Beijing",
        "Male"
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
      "key": "s4-g178",
      "level": "medium",
      "q": "Riyadh is the capital of which country?",
      "options": [
        "Indonesia",
        "Jordan",
        "Tajikistan",
        "Saudi Arabia"
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
      "key": "s4-g179",
      "level": "medium",
      "q": "What is the capital of Singapore?",
      "options": [
        "Phnom Penh",
        "Hanoi",
        "Astana",
        "Singapore"
      ],
      "answer": "Singapore",
      "point": "Singapore — Singapore.",
      "typed": "Singapore",
      "map": {
        "kind": "world",
        "place": "Singapore",
        "where": "Asia",
        "note": "A small island city at the tip of Malaysia."
      }
    },
    {
      "key": "s4-g180",
      "level": "hard",
      "q": "Singapore is the capital of which country?",
      "options": [
        "Singapore",
        "South Korea",
        "UAE",
        "Brunei"
      ],
      "answer": "Singapore",
      "point": "Singapore — Singapore.",
      "typed": "Singapore",
      "map": {
        "kind": "world",
        "place": "Singapore",
        "where": "Asia",
        "note": "A small island city at the tip of Malaysia."
      }
    },
    {
      "key": "s4-g181",
      "level": "medium",
      "q": "What is the capital of South Korea?",
      "options": [
        "Manama",
        "Manila",
        "Seoul",
        "Ramallah"
      ],
      "answer": "Seoul",
      "point": "South Korea — Seoul.",
      "typed": "Seoul",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "Asia",
        "note": "In East Asia, south of North Korea."
      }
    },
    {
      "key": "s4-g182",
      "level": "hard",
      "q": "Seoul is the capital of which country?",
      "options": [
        "Turkey",
        "Pakistan",
        "Japan",
        "South Korea"
      ],
      "answer": "South Korea",
      "point": "South Korea — Seoul.",
      "typed": "South Korea",
      "map": {
        "kind": "world",
        "place": "South Korea",
        "where": "Asia",
        "note": "In East Asia, south of North Korea."
      }
    },
    {
      "key": "s4-g183",
      "level": "easy",
      "q": "What is the capital of Sri Lanka?",
      "options": [
        "Tashkent",
        "Manila",
        "Sri Jayawardenepura Kotte",
        "Islamabad"
      ],
      "answer": "Sri Jayawardenepura Kotte",
      "point": "Sri Lanka — Sri Jayawardenepura Kotte.",
      "typed": "Sri Jayawardenepura Kotte",
      "accept": [
        "kotte",
        "sri jayawardenepura"
      ],
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "Asia",
        "note": "A small teardrop island just below India, in the Indian Ocean."
      }
    },
    {
      "key": "s4-g184",
      "level": "medium",
      "q": "Sri Jayawardenepura Kotte is the capital of which country?",
      "options": [
        "Brunei",
        "Armenia",
        "Georgia",
        "Sri Lanka"
      ],
      "answer": "Sri Lanka",
      "point": "Sri Lanka — Sri Jayawardenepura Kotte.",
      "typed": "Sri Lanka",
      "map": {
        "kind": "world",
        "place": "Sri Lanka",
        "where": "Asia",
        "note": "A small teardrop island just below India, in the Indian Ocean."
      }
    },
    {
      "key": "s4-g185",
      "level": "hard",
      "q": "What is the capital of Syria?",
      "options": [
        "Beijing",
        "Jakarta",
        "Damascus",
        "Tbilisi"
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
      "key": "s4-g186",
      "level": "hard",
      "q": "Damascus is the capital of which country?",
      "options": [
        "Nepal",
        "Jordan",
        "Syria",
        "India"
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
      "key": "s4-g187",
      "level": "medium",
      "q": "What is the capital of Tajikistan?",
      "options": [
        "Kathmandu",
        "Tokyo",
        "Beijing",
        "Dushanbe"
      ],
      "answer": "Dushanbe",
      "point": "Tajikistan — Dushanbe.",
      "typed": "Dushanbe",
      "map": {
        "kind": "world",
        "place": "Tajikistan",
        "where": "Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s4-g188",
      "level": "hard",
      "q": "Dushanbe is the capital of which country?",
      "options": [
        "UAE",
        "Lebanon",
        "Tajikistan",
        "Vietnam"
      ],
      "answer": "Tajikistan",
      "point": "Tajikistan — Dushanbe.",
      "typed": "Tajikistan",
      "map": {
        "kind": "world",
        "place": "Tajikistan",
        "where": "Asia",
        "note": "In Central Asia, in the mountains."
      }
    },
    {
      "key": "s4-g189",
      "level": "medium",
      "q": "What is the capital of Thailand?",
      "options": [
        "Kuwait City",
        "Bangkok",
        "Dili",
        "Amman"
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
      "key": "s4-g190",
      "level": "hard",
      "q": "Bangkok is the capital of which country?",
      "options": [
        "Thailand",
        "Bangladesh",
        "Pakistan",
        "Jordan"
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
      "key": "s4-g191",
      "level": "medium",
      "q": "What is the capital of East Timor?",
      "options": [
        "Dili",
        "Sri Jayawardenepura Kotte",
        "Kuwait City",
        "Bangkok"
      ],
      "answer": "Dili",
      "point": "East Timor — Dili.",
      "typed": "Dili",
      "map": {
        "kind": "world",
        "place": "East Timor",
        "where": "Asia",
        "note": "A small country on the island of Timor, north of Australia."
      }
    },
    {
      "key": "s4-g192",
      "level": "hard",
      "q": "Dili is the capital of which country?",
      "options": [
        "East Timor",
        "Lebanon",
        "UAE",
        "Iraq"
      ],
      "answer": "East Timor",
      "point": "East Timor — Dili.",
      "typed": "East Timor",
      "map": {
        "kind": "world",
        "place": "East Timor",
        "where": "Asia",
        "note": "A small country on the island of Timor, north of Australia."
      }
    },
    {
      "key": "s4-g194",
      "level": "hard",
      "q": "Ankara is the capital of which country?",
      "options": [
        "Bahrain",
        "Kuwait",
        "Tajikistan",
        "Turkey"
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
      "key": "s4-g195",
      "level": "medium",
      "q": "What is the capital of Turkmenistan?",
      "options": [
        "Jakarta",
        "Manama",
        "Beijing",
        "Ashgabat"
      ],
      "answer": "Ashgabat",
      "point": "Turkmenistan — Ashgabat.",
      "typed": "Ashgabat",
      "map": {
        "kind": "world",
        "place": "Turkmenistan",
        "where": "Asia",
        "note": "In Central Asia, east of the Caspian Sea."
      }
    },
    {
      "key": "s4-g196",
      "level": "hard",
      "q": "Ashgabat is the capital of which country?",
      "options": [
        "Azerbaijan",
        "Turkmenistan",
        "Jordan",
        "Cambodia"
      ],
      "answer": "Turkmenistan",
      "point": "Turkmenistan — Ashgabat.",
      "typed": "Turkmenistan",
      "map": {
        "kind": "world",
        "place": "Turkmenistan",
        "where": "Asia",
        "note": "In Central Asia, east of the Caspian Sea."
      }
    },
    {
      "key": "s4-g198",
      "level": "medium",
      "q": "Abu Dhabi is the capital of which country?",
      "options": [
        "Pakistan",
        "Japan",
        "UAE",
        "Israel"
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
      "key": "s4-g199",
      "level": "medium",
      "q": "What is the capital of Uzbekistan?",
      "options": [
        "Islamabad",
        "Sanaa",
        "Tashkent",
        "Kuala Lumpur"
      ],
      "answer": "Tashkent",
      "point": "Uzbekistan — Tashkent.",
      "typed": "Tashkent",
      "map": {
        "kind": "world",
        "place": "Uzbekistan",
        "where": "Asia",
        "note": "In Central Asia, south of Kazakhstan."
      }
    },
    {
      "key": "s4-g200",
      "level": "hard",
      "q": "Tashkent is the capital of which country?",
      "options": [
        "Uzbekistan",
        "Yemen",
        "Afghanistan",
        "Oman"
      ],
      "answer": "Uzbekistan",
      "point": "Uzbekistan — Tashkent.",
      "typed": "Uzbekistan",
      "map": {
        "kind": "world",
        "place": "Uzbekistan",
        "where": "Asia",
        "note": "In Central Asia, south of Kazakhstan."
      }
    },
    {
      "key": "s4-g201",
      "level": "hard",
      "q": "What is the capital of Vietnam?",
      "options": [
        "Yerevan",
        "Sanaa",
        "Hanoi",
        "Seoul"
      ],
      "answer": "Hanoi",
      "point": "Vietnam — Hanoi.",
      "typed": "Hanoi",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "Asia",
        "note": "In South-East Asia, east of Cambodia."
      }
    },
    {
      "key": "s4-g202",
      "level": "hard",
      "q": "Hanoi is the capital of which country?",
      "options": [
        "Vietnam",
        "Sri Lanka",
        "Singapore",
        "East Timor"
      ],
      "answer": "Vietnam",
      "point": "Vietnam — Hanoi.",
      "typed": "Vietnam",
      "map": {
        "kind": "world",
        "place": "Vietnam",
        "where": "Asia",
        "note": "In South-East Asia, east of Cambodia."
      }
    },
    {
      "key": "s4-g203",
      "level": "hard",
      "q": "What is the capital of Yemen?",
      "options": [
        "Sanaa",
        "Muscat",
        "Male",
        "Tehran"
      ],
      "answer": "Sanaa",
      "point": "Yemen — Sanaa.",
      "typed": "Sanaa",
      "map": {
        "kind": "world",
        "place": "Yemen",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g204",
      "level": "hard",
      "q": "Sanaa is the capital of which country?",
      "options": [
        "Yemen",
        "Turkey",
        "Sri Lanka",
        "China"
      ],
      "answer": "Yemen",
      "point": "Yemen — Sanaa.",
      "typed": "Yemen",
      "map": {
        "kind": "world",
        "place": "Yemen",
        "where": "Asia",
        "note": "In Asia."
      }
    },
    {
      "key": "s4-g205",
      "level": "medium",
      "q": "What is the capital of Albania?",
      "options": [
        "Chisinau",
        "Vienna",
        "Tirana",
        "Sarajevo"
      ],
      "answer": "Tirana",
      "point": "Albania — Tirana.",
      "typed": "Tirana",
      "map": {
        "kind": "world",
        "place": "Albania",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s4-g206",
      "level": "hard",
      "q": "Tirana is the capital of which country?",
      "options": [
        "Germany",
        "Austria",
        "Albania",
        "Monaco"
      ],
      "answer": "Albania",
      "point": "Albania — Tirana.",
      "typed": "Albania",
      "map": {
        "kind": "world",
        "place": "Albania",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s4-g207",
      "level": "medium",
      "q": "What is the capital of Andorra?",
      "options": [
        "Vaduz",
        "Valletta",
        "Stockholm",
        "Andorra la Vella"
      ],
      "answer": "Andorra la Vella",
      "point": "Andorra — Andorra la Vella.",
      "typed": "Andorra la Vella",
      "accept": [
        "andorra"
      ],
      "map": {
        "kind": "world",
        "place": "Andorra",
        "where": "Europe",
        "note": "A small country in Europe, between France and Spain."
      }
    },
    {
      "key": "s4-g208",
      "level": "hard",
      "q": "Andorra la Vella is the capital of which country?",
      "options": [
        "Iceland",
        "Luxembourg",
        "Bosnia and Herzegovina",
        "Andorra"
      ],
      "answer": "Andorra",
      "point": "Andorra — Andorra la Vella.",
      "typed": "Andorra",
      "map": {
        "kind": "world",
        "place": "Andorra",
        "where": "Europe",
        "note": "A small country in Europe, between France and Spain."
      }
    },
    {
      "key": "s4-g209",
      "level": "medium",
      "q": "What is the capital of Austria?",
      "options": [
        "Vienna",
        "Athens",
        "Warsaw",
        "Amsterdam"
      ],
      "answer": "Vienna",
      "point": "Austria — Vienna.",
      "typed": "Vienna",
      "map": {
        "kind": "world",
        "place": "Austria",
        "where": "Europe",
        "note": "In Europe, in the Alps — Vienna is its capital."
      }
    },
    {
      "key": "s4-g210",
      "level": "hard",
      "q": "Vienna is the capital of which country?",
      "options": [
        "North Macedonia",
        "France",
        "Denmark",
        "Austria"
      ],
      "answer": "Austria",
      "point": "Austria — Vienna.",
      "typed": "Austria",
      "map": {
        "kind": "world",
        "place": "Austria",
        "where": "Europe",
        "note": "In Europe, in the Alps — Vienna is its capital."
      }
    },
    {
      "key": "s4-g211",
      "level": "medium",
      "q": "What is the capital of Belarus?",
      "options": [
        "Vilnius",
        "Minsk",
        "Athens",
        "Bucharest"
      ],
      "answer": "Minsk",
      "point": "Belarus — Minsk.",
      "typed": "Minsk",
      "map": {
        "kind": "world",
        "place": "Belarus",
        "where": "Europe",
        "note": "In Europe, east of Poland."
      }
    },
    {
      "key": "s4-g212",
      "level": "hard",
      "q": "Minsk is the capital of which country?",
      "options": [
        "Germany",
        "Ukraine",
        "Albania",
        "Belarus"
      ],
      "answer": "Belarus",
      "point": "Belarus — Minsk.",
      "typed": "Belarus",
      "map": {
        "kind": "world",
        "place": "Belarus",
        "where": "Europe",
        "note": "In Europe, east of Poland."
      }
    },
    {
      "key": "s4-g213",
      "level": "medium",
      "q": "What is the capital of Belgium?",
      "options": [
        "Athens",
        "Brussels",
        "Zagreb",
        "Skopje"
      ],
      "answer": "Brussels",
      "point": "Belgium — Brussels.",
      "typed": "Brussels",
      "map": {
        "kind": "world",
        "place": "Belgium",
        "where": "Europe",
        "note": "In Europe, between France and the Netherlands."
      }
    },
    {
      "key": "s4-g214",
      "level": "hard",
      "q": "Brussels is the capital of which country?",
      "options": [
        "Czech Republic",
        "Ireland",
        "Belgium",
        "Italy"
      ],
      "answer": "Belgium",
      "point": "Belgium — Brussels.",
      "typed": "Belgium",
      "map": {
        "kind": "world",
        "place": "Belgium",
        "where": "Europe",
        "note": "In Europe, between France and the Netherlands."
      }
    },
    {
      "key": "s4-g215",
      "level": "medium",
      "q": "What is the capital of Bosnia and Herzegovina?",
      "options": [
        "Bern",
        "Madrid",
        "Sarajevo",
        "Vaduz"
      ],
      "answer": "Sarajevo",
      "point": "Bosnia and Herzegovina — Sarajevo.",
      "typed": "Sarajevo",
      "map": {
        "kind": "world",
        "place": "Bosnia and Herzegovina",
        "where": "Europe",
        "note": "In Europe — Sarajevo is its capital."
      }
    },
    {
      "key": "s4-g216",
      "level": "hard",
      "q": "Sarajevo is the capital of which country?",
      "options": [
        "Finland",
        "Bosnia and Herzegovina",
        "Portugal",
        "Austria"
      ],
      "answer": "Bosnia and Herzegovina",
      "point": "Bosnia and Herzegovina — Sarajevo.",
      "typed": "Bosnia and Herzegovina",
      "map": {
        "kind": "world",
        "place": "Bosnia and Herzegovina",
        "where": "Europe",
        "note": "In Europe — Sarajevo is its capital."
      }
    },
    {
      "key": "s4-g217",
      "level": "medium",
      "q": "What is the capital of Bulgaria?",
      "options": [
        "Madrid",
        "Sofia",
        "Helsinki",
        "Monaco"
      ],
      "answer": "Sofia",
      "point": "Bulgaria — Sofia.",
      "typed": "Sofia",
      "map": {
        "kind": "world",
        "place": "Bulgaria",
        "where": "Europe",
        "note": "In Europe, on the Black Sea."
      }
    },
    {
      "key": "s4-g218",
      "level": "hard",
      "q": "Sofia is the capital of which country?",
      "options": [
        "Bulgaria",
        "Netherlands",
        "Spain",
        "Czech Republic"
      ],
      "answer": "Bulgaria",
      "point": "Bulgaria — Sofia.",
      "typed": "Bulgaria",
      "map": {
        "kind": "world",
        "place": "Bulgaria",
        "where": "Europe",
        "note": "In Europe, on the Black Sea."
      }
    },
    {
      "key": "s4-g219",
      "level": "medium",
      "q": "What is the capital of Croatia?",
      "options": [
        "Kyiv",
        "Oslo",
        "Berlin",
        "Zagreb"
      ],
      "answer": "Zagreb",
      "point": "Croatia — Zagreb.",
      "typed": "Zagreb",
      "map": {
        "kind": "world",
        "place": "Croatia",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s4-g220",
      "level": "hard",
      "q": "Zagreb is the capital of which country?",
      "options": [
        "Croatia",
        "United Kingdom",
        "Ireland",
        "San Marino"
      ],
      "answer": "Croatia",
      "point": "Croatia — Zagreb.",
      "typed": "Croatia",
      "map": {
        "kind": "world",
        "place": "Croatia",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s4-g221",
      "level": "medium",
      "q": "What is the capital of Czech Republic?",
      "options": [
        "San Marino",
        "Amsterdam",
        "Prague",
        "Kyiv"
      ],
      "answer": "Prague",
      "point": "Czech Republic — Prague.",
      "typed": "Prague",
      "map": {
        "kind": "world",
        "place": "Czech Republic",
        "where": "Europe",
        "note": "In Europe, next to Germany and Poland."
      }
    },
    {
      "key": "s4-g222",
      "level": "hard",
      "q": "Prague is the capital of which country?",
      "options": [
        "Slovenia",
        "Vatican City",
        "North Macedonia",
        "Czech Republic"
      ],
      "answer": "Czech Republic",
      "point": "Czech Republic — Prague.",
      "typed": "Czech Republic",
      "map": {
        "kind": "world",
        "place": "Czech Republic",
        "where": "Europe",
        "note": "In Europe, next to Germany and Poland."
      }
    },
    {
      "key": "s4-g223",
      "level": "medium",
      "q": "What is the capital of Denmark?",
      "options": [
        "Copenhagen",
        "Madrid",
        "Skopje",
        "Belgrade"
      ],
      "answer": "Copenhagen",
      "point": "Denmark — Copenhagen.",
      "typed": "Copenhagen",
      "map": {
        "kind": "world",
        "place": "Denmark",
        "where": "Europe",
        "note": "In Europe, north of Germany."
      }
    },
    {
      "key": "s4-g224",
      "level": "hard",
      "q": "Copenhagen is the capital of which country?",
      "options": [
        "Montenegro",
        "Denmark",
        "Serbia",
        "Germany"
      ],
      "answer": "Denmark",
      "point": "Denmark — Copenhagen.",
      "typed": "Denmark",
      "map": {
        "kind": "world",
        "place": "Denmark",
        "where": "Europe",
        "note": "In Europe, north of Germany."
      }
    },
    {
      "key": "s4-g225",
      "level": "medium",
      "q": "What is the capital of Estonia?",
      "options": [
        "Zagreb",
        "Tallinn",
        "Berlin",
        "Madrid"
      ],
      "answer": "Tallinn",
      "point": "Estonia — Tallinn.",
      "typed": "Tallinn",
      "map": {
        "kind": "world",
        "place": "Estonia",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s4-g226",
      "level": "hard",
      "q": "Tallinn is the capital of which country?",
      "options": [
        "Estonia",
        "North Macedonia",
        "Czech Republic",
        "Hungary"
      ],
      "answer": "Estonia",
      "point": "Estonia — Tallinn.",
      "typed": "Estonia",
      "map": {
        "kind": "world",
        "place": "Estonia",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s4-g227",
      "level": "medium",
      "q": "What is the capital of Finland?",
      "options": [
        "Oslo",
        "Skopje",
        "Brussels",
        "Helsinki"
      ],
      "answer": "Helsinki",
      "point": "Finland — Helsinki.",
      "typed": "Helsinki",
      "map": {
        "kind": "world",
        "place": "Finland",
        "where": "Europe",
        "note": "In Europe, east of Sweden."
      }
    },
    {
      "key": "s4-g228",
      "level": "hard",
      "q": "Helsinki is the capital of which country?",
      "options": [
        "Ukraine",
        "United Kingdom",
        "Finland",
        "Vatican City"
      ],
      "answer": "Finland",
      "point": "Finland — Helsinki.",
      "typed": "Finland",
      "map": {
        "kind": "world",
        "place": "Finland",
        "where": "Europe",
        "note": "In Europe, east of Sweden."
      }
    },
    {
      "key": "s4-g230",
      "level": "medium",
      "q": "Paris is the capital of which country?",
      "options": [
        "France",
        "Czech Republic",
        "Poland",
        "Switzerland"
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
      "key": "s4-g231",
      "level": "medium",
      "q": "What is the capital of Germany?",
      "options": [
        "Chisinau",
        "Stockholm",
        "Berlin",
        "Skopje"
      ],
      "answer": "Berlin",
      "point": "Germany — Berlin.",
      "typed": "Berlin",
      "map": {
        "kind": "world",
        "place": "Germany",
        "where": "Europe",
        "note": "In Europe, next to France and Poland."
      }
    },
    {
      "key": "s4-g232",
      "level": "hard",
      "q": "Berlin is the capital of which country?",
      "options": [
        "Croatia",
        "Lithuania",
        "France",
        "Germany"
      ],
      "answer": "Germany",
      "point": "Germany — Berlin.",
      "typed": "Germany",
      "map": {
        "kind": "world",
        "place": "Germany",
        "where": "Europe",
        "note": "In Europe, next to France and Poland."
      }
    },
    {
      "key": "s4-g233",
      "level": "hard",
      "q": "What is the capital of Greece?",
      "options": [
        "Brussels",
        "London",
        "Athens",
        "Monaco"
      ],
      "answer": "Athens",
      "point": "Greece — Athens.",
      "typed": "Athens",
      "map": {
        "kind": "world",
        "place": "Greece",
        "where": "Europe",
        "note": "In Europe, on the Mediterranean Sea — Athens is its capital."
      }
    },
    {
      "key": "s4-g234",
      "level": "hard",
      "q": "Athens is the capital of which country?",
      "options": [
        "Greece",
        "Ukraine",
        "Hungary",
        "Malta"
      ],
      "answer": "Greece",
      "point": "Greece — Athens.",
      "typed": "Greece",
      "map": {
        "kind": "world",
        "place": "Greece",
        "where": "Europe",
        "note": "In Europe, on the Mediterranean Sea — Athens is its capital."
      }
    },
    {
      "key": "s4-g235",
      "level": "medium",
      "q": "What is the capital of Hungary?",
      "options": [
        "Dublin",
        "Prague",
        "Budapest",
        "Kyiv"
      ],
      "answer": "Budapest",
      "point": "Hungary — Budapest.",
      "typed": "Budapest",
      "map": {
        "kind": "world",
        "place": "Hungary",
        "where": "Europe",
        "note": "In Europe, next to Austria."
      }
    },
    {
      "key": "s4-g236",
      "level": "hard",
      "q": "Budapest is the capital of which country?",
      "options": [
        "Latvia",
        "Hungary",
        "Greece",
        "Finland"
      ],
      "answer": "Hungary",
      "point": "Hungary — Budapest.",
      "typed": "Hungary",
      "map": {
        "kind": "world",
        "place": "Hungary",
        "where": "Europe",
        "note": "In Europe, next to Austria."
      }
    },
    {
      "key": "s4-g237",
      "level": "medium",
      "q": "What is the capital of Iceland?",
      "options": [
        "Brussels",
        "Copenhagen",
        "Bern",
        "Reykjavik"
      ],
      "answer": "Reykjavik",
      "point": "Iceland — Reykjavik.",
      "typed": "Reykjavik",
      "map": {
        "kind": "world",
        "place": "Iceland",
        "where": "Europe",
        "note": "An island in the North Atlantic, north-west of Europe."
      }
    },
    {
      "key": "s4-g238",
      "level": "hard",
      "q": "Reykjavik is the capital of which country?",
      "options": [
        "Spain",
        "Latvia",
        "Liechtenstein",
        "Iceland"
      ],
      "answer": "Iceland",
      "point": "Iceland — Reykjavik.",
      "typed": "Iceland",
      "map": {
        "kind": "world",
        "place": "Iceland",
        "where": "Europe",
        "note": "An island in the North Atlantic, north-west of Europe."
      }
    },
    {
      "key": "s4-g239",
      "level": "medium",
      "q": "What is the capital of Ireland?",
      "options": [
        "Dublin",
        "Athens",
        "Belgrade",
        "Bratislava"
      ],
      "answer": "Dublin",
      "point": "Ireland — Dublin.",
      "typed": "Dublin",
      "map": {
        "kind": "world",
        "place": "Ireland",
        "where": "Europe",
        "note": "An island west of the United Kingdom."
      }
    },
    {
      "key": "s4-g240",
      "level": "hard",
      "q": "Dublin is the capital of which country?",
      "options": [
        "Ukraine",
        "Finland",
        "Luxembourg",
        "Ireland"
      ],
      "answer": "Ireland",
      "point": "Ireland — Dublin.",
      "typed": "Ireland",
      "map": {
        "kind": "world",
        "place": "Ireland",
        "where": "Europe",
        "note": "An island west of the United Kingdom."
      }
    },
    {
      "key": "s4-g241",
      "level": "medium",
      "q": "What is the capital of Italy?",
      "options": [
        "Helsinki",
        "Chisinau",
        "Rome",
        "Copenhagen"
      ],
      "answer": "Rome",
      "point": "Italy — Rome.",
      "typed": "Rome",
      "map": {
        "kind": "world",
        "place": "Italy",
        "where": "Europe",
        "note": "In Europe — the boot kicking Sicily."
      }
    },
    {
      "key": "s4-g242",
      "level": "hard",
      "q": "Rome is the capital of which country?",
      "options": [
        "Bosnia and Herzegovina",
        "Estonia",
        "Italy",
        "Denmark"
      ],
      "answer": "Italy",
      "point": "Italy — Rome.",
      "typed": "Italy",
      "map": {
        "kind": "world",
        "place": "Italy",
        "where": "Europe",
        "note": "In Europe — the boot kicking Sicily."
      }
    },
    {
      "key": "s4-g243",
      "level": "medium",
      "q": "What is the capital of Latvia?",
      "options": [
        "Oslo",
        "Riga",
        "Valletta",
        "Berlin"
      ],
      "answer": "Riga",
      "point": "Latvia — Riga.",
      "typed": "Riga",
      "map": {
        "kind": "world",
        "place": "Latvia",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s4-g244",
      "level": "hard",
      "q": "Riga is the capital of which country?",
      "options": [
        "Moldova",
        "Finland",
        "Latvia",
        "Luxembourg"
      ],
      "answer": "Latvia",
      "point": "Latvia — Riga.",
      "typed": "Latvia",
      "map": {
        "kind": "world",
        "place": "Latvia",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s4-g245",
      "level": "medium",
      "q": "What is the capital of Liechtenstein?",
      "options": [
        "Vatican City",
        "London",
        "Vaduz",
        "Warsaw"
      ],
      "answer": "Vaduz",
      "point": "Liechtenstein — Vaduz.",
      "typed": "Vaduz",
      "map": {
        "kind": "world",
        "place": "Liechtenstein",
        "where": "Europe",
        "note": "A small country in Europe, between Switzerland and Austria."
      }
    },
    {
      "key": "s4-g246",
      "level": "hard",
      "q": "Vaduz is the capital of which country?",
      "options": [
        "Liechtenstein",
        "Estonia",
        "Netherlands",
        "Portugal"
      ],
      "answer": "Liechtenstein",
      "point": "Liechtenstein — Vaduz.",
      "typed": "Liechtenstein",
      "map": {
        "kind": "world",
        "place": "Liechtenstein",
        "where": "Europe",
        "note": "A small country in Europe, between Switzerland and Austria."
      }
    },
    {
      "key": "s4-g247",
      "level": "medium",
      "q": "What is the capital of Lithuania?",
      "options": [
        "Dublin",
        "Paris",
        "Vilnius",
        "Sarajevo"
      ],
      "answer": "Vilnius",
      "point": "Lithuania — Vilnius.",
      "typed": "Vilnius",
      "map": {
        "kind": "world",
        "place": "Lithuania",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s4-g248",
      "level": "hard",
      "q": "Vilnius is the capital of which country?",
      "options": [
        "Sweden",
        "Lithuania",
        "Vatican City",
        "San Marino"
      ],
      "answer": "Lithuania",
      "point": "Lithuania — Vilnius.",
      "typed": "Lithuania",
      "map": {
        "kind": "world",
        "place": "Lithuania",
        "where": "Europe",
        "note": "In Europe, on the Baltic Sea."
      }
    },
    {
      "key": "s4-g249",
      "level": "medium",
      "q": "What is the capital of Luxembourg?",
      "options": [
        "Tallinn",
        "Luxembourg",
        "Sarajevo",
        "Riga"
      ],
      "answer": "Luxembourg",
      "point": "Luxembourg — Luxembourg.",
      "typed": "Luxembourg",
      "map": {
        "kind": "world",
        "place": "Luxembourg",
        "where": "Europe",
        "note": "A small country in Europe, between France, Germany and Belgium."
      }
    },
    {
      "key": "s4-g250",
      "level": "hard",
      "q": "Luxembourg is the capital of which country?",
      "options": [
        "France",
        "Luxembourg",
        "United Kingdom",
        "Malta"
      ],
      "answer": "Luxembourg",
      "point": "Luxembourg — Luxembourg.",
      "typed": "Luxembourg",
      "map": {
        "kind": "world",
        "place": "Luxembourg",
        "where": "Europe",
        "note": "A small country in Europe, between France, Germany and Belgium."
      }
    },
    {
      "key": "s4-g251",
      "level": "medium",
      "q": "What is the capital of Malta?",
      "options": [
        "Berlin",
        "Valletta",
        "Vaduz",
        "San Marino"
      ],
      "answer": "Valletta",
      "point": "Malta — Valletta.",
      "typed": "Valletta",
      "map": {
        "kind": "world",
        "place": "Malta",
        "where": "Europe",
        "note": "A small island in the Mediterranean Sea, south of Italy."
      }
    },
    {
      "key": "s4-g252",
      "level": "hard",
      "q": "Valletta is the capital of which country?",
      "options": [
        "Malta",
        "Finland",
        "Hungary",
        "Liechtenstein"
      ],
      "answer": "Malta",
      "point": "Malta — Valletta.",
      "typed": "Malta",
      "map": {
        "kind": "world",
        "place": "Malta",
        "where": "Europe",
        "note": "A small island in the Mediterranean Sea, south of Italy."
      }
    },
    {
      "key": "s4-g253",
      "level": "medium",
      "q": "What is the capital of Moldova?",
      "options": [
        "Reykjavik",
        "Chisinau",
        "Prague",
        "San Marino"
      ],
      "answer": "Chisinau",
      "point": "Moldova — Chisinau.",
      "typed": "Chisinau",
      "map": {
        "kind": "world",
        "place": "Moldova",
        "where": "Europe",
        "note": "In Europe, between Romania and Ukraine."
      }
    },
    {
      "key": "s4-g254",
      "level": "hard",
      "q": "Chisinau is the capital of which country?",
      "options": [
        "Iceland",
        "Moldova",
        "Estonia",
        "North Macedonia"
      ],
      "answer": "Moldova",
      "point": "Moldova — Chisinau.",
      "typed": "Moldova",
      "map": {
        "kind": "world",
        "place": "Moldova",
        "where": "Europe",
        "note": "In Europe, between Romania and Ukraine."
      }
    },
    {
      "key": "s4-g255",
      "level": "medium",
      "q": "What is the capital of Monaco?",
      "options": [
        "Amsterdam",
        "Reykjavik",
        "Monaco",
        "Brussels"
      ],
      "answer": "Monaco",
      "point": "Monaco — Monaco.",
      "typed": "Monaco",
      "map": {
        "kind": "world",
        "place": "Monaco",
        "where": "Europe",
        "note": "A tiny country in Europe, on the Mediterranean Sea."
      }
    },
    {
      "key": "s4-g256",
      "level": "hard",
      "q": "Monaco is the capital of which country?",
      "options": [
        "Monaco",
        "Slovenia",
        "Latvia",
        "Slovakia"
      ],
      "answer": "Monaco",
      "point": "Monaco — Monaco.",
      "typed": "Monaco",
      "map": {
        "kind": "world",
        "place": "Monaco",
        "where": "Europe",
        "note": "A tiny country in Europe, on the Mediterranean Sea."
      }
    },
    {
      "key": "s4-g257",
      "level": "medium",
      "q": "What is the capital of Montenegro?",
      "options": [
        "Warsaw",
        "Bucharest",
        "Podgorica",
        "Madrid"
      ],
      "answer": "Podgorica",
      "point": "Montenegro — Podgorica.",
      "typed": "Podgorica",
      "map": {
        "kind": "world",
        "place": "Montenegro",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s4-g258",
      "level": "hard",
      "q": "Podgorica is the capital of which country?",
      "options": [
        "Montenegro",
        "Slovenia",
        "Sweden",
        "Malta"
      ],
      "answer": "Montenegro",
      "point": "Montenegro — Podgorica.",
      "typed": "Montenegro",
      "map": {
        "kind": "world",
        "place": "Montenegro",
        "where": "Europe",
        "note": "In Europe, on the Adriatic Sea."
      }
    },
    {
      "key": "s4-g259",
      "level": "medium",
      "q": "What is the capital of Netherlands?",
      "options": [
        "Vienna",
        "Chisinau",
        "Amsterdam",
        "Vatican City"
      ],
      "answer": "Amsterdam",
      "point": "Netherlands — Amsterdam.",
      "typed": "Amsterdam",
      "map": {
        "kind": "world",
        "place": "Netherlands",
        "where": "Europe",
        "note": "In Europe, on the North Sea — Amsterdam is its capital."
      }
    },
    {
      "key": "s4-g260",
      "level": "hard",
      "q": "Amsterdam is the capital of which country?",
      "options": [
        "Denmark",
        "Netherlands",
        "Belgium",
        "Bulgaria"
      ],
      "answer": "Netherlands",
      "point": "Netherlands — Amsterdam.",
      "typed": "Netherlands",
      "map": {
        "kind": "world",
        "place": "Netherlands",
        "where": "Europe",
        "note": "In Europe, on the North Sea — Amsterdam is its capital."
      }
    },
    {
      "key": "s4-g261",
      "level": "medium",
      "q": "What is the capital of North Macedonia?",
      "options": [
        "Vaduz",
        "Amsterdam",
        "Skopje",
        "Luxembourg"
      ],
      "answer": "Skopje",
      "point": "North Macedonia — Skopje.",
      "typed": "Skopje",
      "map": {
        "kind": "world",
        "place": "North Macedonia",
        "where": "Europe",
        "note": "In Europe — Skopje is its capital."
      }
    },
    {
      "key": "s4-g262",
      "level": "hard",
      "q": "Skopje is the capital of which country?",
      "options": [
        "San Marino",
        "Bulgaria",
        "Ireland",
        "North Macedonia"
      ],
      "answer": "North Macedonia",
      "point": "North Macedonia — Skopje.",
      "typed": "North Macedonia",
      "map": {
        "kind": "world",
        "place": "North Macedonia",
        "where": "Europe",
        "note": "In Europe — Skopje is its capital."
      }
    },
    {
      "key": "s4-g263",
      "level": "hard",
      "q": "What is the capital of Norway?",
      "options": [
        "Copenhagen",
        "Bucharest",
        "Chisinau",
        "Oslo"
      ],
      "answer": "Oslo",
      "point": "Norway — Oslo.",
      "typed": "Oslo",
      "map": {
        "kind": "world",
        "place": "Norway",
        "where": "Europe",
        "note": "In Europe, in Scandinavia — Oslo is its capital."
      }
    },
    {
      "key": "s4-g264",
      "level": "hard",
      "q": "Oslo is the capital of which country?",
      "options": [
        "Norway",
        "Czech Republic",
        "Andorra",
        "Poland"
      ],
      "answer": "Norway",
      "point": "Norway — Oslo.",
      "typed": "Norway",
      "map": {
        "kind": "world",
        "place": "Norway",
        "where": "Europe",
        "note": "In Europe, in Scandinavia — Oslo is its capital."
      }
    },
    {
      "key": "s4-g265",
      "level": "medium",
      "q": "What is the capital of Poland?",
      "options": [
        "Warsaw",
        "Tallinn",
        "Kyiv",
        "Chisinau"
      ],
      "answer": "Warsaw",
      "point": "Poland — Warsaw.",
      "typed": "Warsaw",
      "map": {
        "kind": "world",
        "place": "Poland",
        "where": "Europe",
        "note": "In Europe, east of Germany."
      }
    },
    {
      "key": "s4-g266",
      "level": "hard",
      "q": "Warsaw is the capital of which country?",
      "options": [
        "Poland",
        "Portugal",
        "Greece",
        "Iceland"
      ],
      "answer": "Poland",
      "point": "Poland — Warsaw.",
      "typed": "Poland",
      "map": {
        "kind": "world",
        "place": "Poland",
        "where": "Europe",
        "note": "In Europe, east of Germany."
      }
    },
    {
      "key": "s4-g267",
      "level": "hard",
      "q": "What is the capital of Portugal?",
      "options": [
        "Paris",
        "Warsaw",
        "Lisbon",
        "Tirana"
      ],
      "answer": "Lisbon",
      "point": "Portugal — Lisbon.",
      "typed": "Lisbon",
      "map": {
        "kind": "world",
        "place": "Portugal",
        "where": "Europe",
        "note": "In Europe, west of Spain."
      }
    },
    {
      "key": "s4-g268",
      "level": "hard",
      "q": "Lisbon is the capital of which country?",
      "options": [
        "Portugal",
        "Andorra",
        "Norway",
        "Slovakia"
      ],
      "answer": "Portugal",
      "point": "Portugal — Lisbon.",
      "typed": "Portugal",
      "map": {
        "kind": "world",
        "place": "Portugal",
        "where": "Europe",
        "note": "In Europe, west of Spain."
      }
    },
    {
      "key": "s4-g269",
      "level": "medium",
      "q": "What is the capital of Romania?",
      "options": [
        "Bucharest",
        "Sofia",
        "Podgorica",
        "Paris"
      ],
      "answer": "Bucharest",
      "point": "Romania — Bucharest.",
      "typed": "Bucharest",
      "map": {
        "kind": "world",
        "place": "Romania",
        "where": "Europe",
        "note": "In Europe, on the Black Sea."
      }
    },
    {
      "key": "s4-g270",
      "level": "hard",
      "q": "Bucharest is the capital of which country?",
      "options": [
        "Malta",
        "Ukraine",
        "United Kingdom",
        "Romania"
      ],
      "answer": "Romania",
      "point": "Romania — Bucharest.",
      "typed": "Romania",
      "map": {
        "kind": "world",
        "place": "Romania",
        "where": "Europe",
        "note": "In Europe, on the Black Sea."
      }
    },
    {
      "key": "s4-g271",
      "level": "medium",
      "q": "What is the capital of Russia?",
      "options": [
        "Moscow",
        "Dili",
        "Vaduz",
        "Warsaw"
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
      "key": "s4-g272",
      "level": "hard",
      "q": "Moscow is the capital of which country?",
      "options": [
        "North Korea",
        "Tajikistan",
        "Nepal",
        "Russia"
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
      "key": "s4-g273",
      "level": "medium",
      "q": "What is the capital of San Marino?",
      "options": [
        "Ljubljana",
        "Riga",
        "San Marino",
        "Vaduz"
      ],
      "answer": "San Marino",
      "point": "San Marino — San Marino.",
      "typed": "San Marino",
      "map": {
        "kind": "world",
        "place": "San Marino",
        "where": "Europe",
        "note": "A tiny country inside Italy."
      }
    },
    {
      "key": "s4-g274",
      "level": "hard",
      "q": "San Marino is the capital of which country?",
      "options": [
        "Croatia",
        "Spain",
        "San Marino",
        "Czech Republic"
      ],
      "answer": "San Marino",
      "point": "San Marino — San Marino.",
      "typed": "San Marino",
      "map": {
        "kind": "world",
        "place": "San Marino",
        "where": "Europe",
        "note": "A tiny country inside Italy."
      }
    },
    {
      "key": "s4-g275",
      "level": "medium",
      "q": "What is the capital of Serbia?",
      "options": [
        "Madrid",
        "Belgrade",
        "Luxembourg",
        "Chisinau"
      ],
      "answer": "Belgrade",
      "point": "Serbia — Belgrade.",
      "typed": "Belgrade",
      "map": {
        "kind": "world",
        "place": "Serbia",
        "where": "Europe",
        "note": "In Europe — Belgrade is its capital."
      }
    },
    {
      "key": "s4-g276",
      "level": "hard",
      "q": "Belgrade is the capital of which country?",
      "options": [
        "Vatican City",
        "Switzerland",
        "Germany",
        "Serbia"
      ],
      "answer": "Serbia",
      "point": "Serbia — Belgrade.",
      "typed": "Serbia",
      "map": {
        "kind": "world",
        "place": "Serbia",
        "where": "Europe",
        "note": "In Europe — Belgrade is its capital."
      }
    },
    {
      "key": "s4-g277",
      "level": "medium",
      "q": "What is the capital of Slovakia?",
      "options": [
        "Madrid",
        "Riga",
        "Bratislava",
        "Prague"
      ],
      "answer": "Bratislava",
      "point": "Slovakia — Bratislava.",
      "typed": "Bratislava",
      "map": {
        "kind": "world",
        "place": "Slovakia",
        "where": "Europe",
        "note": "In Europe, next to the Czech Republic."
      }
    },
    {
      "key": "s4-g278",
      "level": "hard",
      "q": "Bratislava is the capital of which country?",
      "options": [
        "France",
        "Sweden",
        "Slovakia",
        "Vatican City"
      ],
      "answer": "Slovakia",
      "point": "Slovakia — Bratislava.",
      "typed": "Slovakia",
      "map": {
        "kind": "world",
        "place": "Slovakia",
        "where": "Europe",
        "note": "In Europe, next to the Czech Republic."
      }
    },
    {
      "key": "s4-g279",
      "level": "medium",
      "q": "What is the capital of Slovenia?",
      "options": [
        "Amsterdam",
        "Minsk",
        "Monaco",
        "Ljubljana"
      ],
      "answer": "Ljubljana",
      "point": "Slovenia — Ljubljana.",
      "typed": "Ljubljana",
      "map": {
        "kind": "world",
        "place": "Slovenia",
        "where": "Europe",
        "note": "In Europe, next to Italy and Austria."
      }
    },
    {
      "key": "s4-g280",
      "level": "hard",
      "q": "Ljubljana is the capital of which country?",
      "options": [
        "Vatican City",
        "Denmark",
        "Estonia",
        "Slovenia"
      ],
      "answer": "Slovenia",
      "point": "Slovenia — Ljubljana.",
      "typed": "Slovenia",
      "map": {
        "kind": "world",
        "place": "Slovenia",
        "where": "Europe",
        "note": "In Europe, next to Italy and Austria."
      }
    },
    {
      "key": "s4-g281",
      "level": "medium",
      "q": "What is the capital of Spain?",
      "options": [
        "Zagreb",
        "Chisinau",
        "Madrid",
        "Oslo"
      ],
      "answer": "Madrid",
      "point": "Spain — Madrid.",
      "typed": "Madrid",
      "map": {
        "kind": "world",
        "place": "Spain",
        "where": "Europe",
        "note": "In Europe, next to Portugal and France."
      }
    },
    {
      "key": "s4-g282",
      "level": "hard",
      "q": "Madrid is the capital of which country?",
      "options": [
        "Bulgaria",
        "Belgium",
        "Liechtenstein",
        "Spain"
      ],
      "answer": "Spain",
      "point": "Spain — Madrid.",
      "typed": "Spain",
      "map": {
        "kind": "world",
        "place": "Spain",
        "where": "Europe",
        "note": "In Europe, next to Portugal and France."
      }
    },
    {
      "key": "s4-g283",
      "level": "hard",
      "q": "What is the capital of Sweden?",
      "options": [
        "Kyiv",
        "Valletta",
        "Stockholm",
        "Reykjavik"
      ],
      "answer": "Stockholm",
      "point": "Sweden — Stockholm.",
      "typed": "Stockholm",
      "map": {
        "kind": "world",
        "place": "Sweden",
        "where": "Europe",
        "note": "In Europe, in Scandinavia."
      }
    },
    {
      "key": "s4-g284",
      "level": "hard",
      "q": "Stockholm is the capital of which country?",
      "options": [
        "Sweden",
        "Luxembourg",
        "Liechtenstein",
        "Moldova"
      ],
      "answer": "Sweden",
      "point": "Sweden — Stockholm.",
      "typed": "Sweden",
      "map": {
        "kind": "world",
        "place": "Sweden",
        "where": "Europe",
        "note": "In Europe, in Scandinavia."
      }
    },
    {
      "key": "s4-g285",
      "level": "medium",
      "q": "What is the capital of Switzerland?",
      "options": [
        "London",
        "Bern",
        "Reykjavik",
        "Stockholm"
      ],
      "answer": "Bern",
      "point": "Switzerland — Bern.",
      "typed": "Bern",
      "map": {
        "kind": "world",
        "place": "Switzerland",
        "where": "Europe",
        "note": "In Europe, in the Alps."
      }
    },
    {
      "key": "s4-g286",
      "level": "hard",
      "q": "Bern is the capital of which country?",
      "options": [
        "Switzerland",
        "Ukraine",
        "Austria",
        "Montenegro"
      ],
      "answer": "Switzerland",
      "point": "Switzerland — Bern.",
      "typed": "Switzerland",
      "map": {
        "kind": "world",
        "place": "Switzerland",
        "where": "Europe",
        "note": "In Europe, in the Alps."
      }
    },
    {
      "key": "s4-g287",
      "level": "hard",
      "q": "What is the capital of Ukraine?",
      "options": [
        "Podgorica",
        "Belgrade",
        "Copenhagen",
        "Kyiv"
      ],
      "answer": "Kyiv",
      "point": "Ukraine — Kyiv.",
      "typed": "Kyiv",
      "map": {
        "kind": "world",
        "place": "Ukraine",
        "where": "Europe",
        "note": "In Europe, east of Poland — Kyiv is its capital."
      }
    },
    {
      "key": "s4-g288",
      "level": "hard",
      "q": "Kyiv is the capital of which country?",
      "options": [
        "Sweden",
        "Moldova",
        "Ukraine",
        "Serbia"
      ],
      "answer": "Ukraine",
      "point": "Ukraine — Kyiv.",
      "typed": "Ukraine",
      "map": {
        "kind": "world",
        "place": "Ukraine",
        "where": "Europe",
        "note": "In Europe, east of Poland — Kyiv is its capital."
      }
    },
    {
      "key": "s4-g290",
      "level": "medium",
      "q": "London is the capital of which country?",
      "options": [
        "Czech Republic",
        "France",
        "United Kingdom",
        "Serbia"
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
      "key": "s4-g291",
      "level": "medium",
      "q": "What is the capital of Vatican City?",
      "options": [
        "Chisinau",
        "Vatican City",
        "Dublin",
        "Sarajevo"
      ],
      "answer": "Vatican City",
      "point": "Vatican City — Vatican City.",
      "typed": "Vatican City",
      "accept": [
        "vatican"
      ],
      "map": {
        "kind": "world",
        "place": "Vatican City",
        "where": "Europe",
        "note": "The smallest country in the world, inside Rome."
      }
    },
    {
      "key": "s4-g292",
      "level": "hard",
      "q": "Vatican City is the capital of which country?",
      "options": [
        "Vatican City",
        "Netherlands",
        "Albania",
        "Bulgaria"
      ],
      "answer": "Vatican City",
      "point": "Vatican City — Vatican City.",
      "typed": "Vatican City",
      "accept": [
        "vatican"
      ],
      "map": {
        "kind": "world",
        "place": "Vatican City",
        "where": "Europe",
        "note": "The smallest country in the world, inside Rome."
      }
    },
    {
      "key": "s4-g293",
      "level": "medium",
      "q": "What is the capital of Antigua and Barbuda?",
      "options": [
        "St. John's",
        "Havana",
        "Kingston",
        "Roseau"
      ],
      "answer": "St. John's",
      "point": "Antigua and Barbuda — St. John's.",
      "typed": "St. John's",
      "map": {
        "kind": "world",
        "place": "Antigua and Barbuda",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g294",
      "level": "hard",
      "q": "St. John's is the capital of which country?",
      "options": [
        "Honduras",
        "Barbados",
        "Mexico",
        "Antigua and Barbuda"
      ],
      "answer": "Antigua and Barbuda",
      "point": "Antigua and Barbuda — St. John's.",
      "typed": "Antigua and Barbuda",
      "map": {
        "kind": "world",
        "place": "Antigua and Barbuda",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g295",
      "level": "medium",
      "q": "What is the capital of Bahamas?",
      "options": [
        "Port-au-Prince",
        "St. John's",
        "Castries",
        "Nassau"
      ],
      "answer": "Nassau",
      "point": "Bahamas — Nassau.",
      "typed": "Nassau",
      "map": {
        "kind": "world",
        "place": "Bahamas",
        "where": "North America",
        "note": "Islands in the Atlantic Ocean, south-east of Florida."
      }
    },
    {
      "key": "s4-g296",
      "level": "hard",
      "q": "Nassau is the capital of which country?",
      "options": [
        "El Salvador",
        "St. Kitts and Nevis",
        "Barbados",
        "Bahamas"
      ],
      "answer": "Bahamas",
      "point": "Bahamas — Nassau.",
      "typed": "Bahamas",
      "map": {
        "kind": "world",
        "place": "Bahamas",
        "where": "North America",
        "note": "Islands in the Atlantic Ocean, south-east of Florida."
      }
    },
    {
      "key": "s4-g297",
      "level": "medium",
      "q": "What is the capital of Barbados?",
      "options": [
        "Belmopan",
        "Bridgetown",
        "Basseterre",
        "Guatemala City"
      ],
      "answer": "Bridgetown",
      "point": "Barbados — Bridgetown.",
      "typed": "Bridgetown",
      "map": {
        "kind": "world",
        "place": "Barbados",
        "where": "North America",
        "note": "An island in the Caribbean Sea."
      }
    },
    {
      "key": "s4-g298",
      "level": "hard",
      "q": "Bridgetown is the capital of which country?",
      "options": [
        "Barbados",
        "Honduras",
        "Antigua and Barbuda",
        "Bahamas"
      ],
      "answer": "Barbados",
      "point": "Barbados — Bridgetown.",
      "typed": "Barbados",
      "map": {
        "kind": "world",
        "place": "Barbados",
        "where": "North America",
        "note": "An island in the Caribbean Sea."
      }
    },
    {
      "key": "s4-g299",
      "level": "medium",
      "q": "What is the capital of Belize?",
      "options": [
        "Tegucigalpa",
        "Belmopan",
        "Kingston",
        "Santo Domingo"
      ],
      "answer": "Belmopan",
      "point": "Belize — Belmopan.",
      "typed": "Belmopan",
      "map": {
        "kind": "world",
        "place": "Belize",
        "where": "North America",
        "note": "In Central America, on the Caribbean Sea."
      }
    },
    {
      "key": "s4-g300",
      "level": "hard",
      "q": "Belmopan is the capital of which country?",
      "options": [
        "St. Lucia",
        "Belize",
        "El Salvador",
        "Mexico"
      ],
      "answer": "Belize",
      "point": "Belize — Belmopan.",
      "typed": "Belize",
      "map": {
        "kind": "world",
        "place": "Belize",
        "where": "North America",
        "note": "In Central America, on the Caribbean Sea."
      }
    },
    {
      "key": "s4-g302",
      "level": "hard",
      "q": "Ottawa is the capital of which country?",
      "options": [
        "Dominican Republic",
        "Jamaica",
        "Canada",
        "Antigua and Barbuda"
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
      "key": "s4-g303",
      "level": "medium",
      "q": "What is the capital of Costa Rica?",
      "options": [
        "San Jose",
        "Kingstown",
        "Managua",
        "Port of Spain"
      ],
      "answer": "San Jose",
      "point": "Costa Rica — San Jose.",
      "typed": "San Jose",
      "map": {
        "kind": "world",
        "place": "Costa Rica",
        "where": "North America",
        "note": "In Central America, between Nicaragua and Panama."
      }
    },
    {
      "key": "s4-g304",
      "level": "hard",
      "q": "San Jose is the capital of which country?",
      "options": [
        "Costa Rica",
        "Nicaragua",
        "Haiti",
        "Dominican Republic"
      ],
      "answer": "Costa Rica",
      "point": "Costa Rica — San Jose.",
      "typed": "Costa Rica",
      "map": {
        "kind": "world",
        "place": "Costa Rica",
        "where": "North America",
        "note": "In Central America, between Nicaragua and Panama."
      }
    },
    {
      "key": "s4-g305",
      "level": "hard",
      "q": "What is the capital of Cuba?",
      "options": [
        "Port of Spain",
        "Managua",
        "San Salvador",
        "Havana"
      ],
      "answer": "Havana",
      "point": "Cuba — Havana.",
      "typed": "Havana",
      "map": {
        "kind": "world",
        "place": "Cuba",
        "where": "North America",
        "note": "An island in the Caribbean Sea, south of the USA."
      }
    },
    {
      "key": "s4-g306",
      "level": "hard",
      "q": "Havana is the capital of which country?",
      "options": [
        "St. Vincent and the Grenadines",
        "Haiti",
        "Cuba",
        "Trinidad and Tobago"
      ],
      "answer": "Cuba",
      "point": "Cuba — Havana.",
      "typed": "Cuba",
      "map": {
        "kind": "world",
        "place": "Cuba",
        "where": "North America",
        "note": "An island in the Caribbean Sea, south of the USA."
      }
    },
    {
      "key": "s4-g307",
      "level": "medium",
      "q": "What is the capital of Dominica?",
      "options": [
        "Tegucigalpa",
        "Port of Spain",
        "Roseau",
        "Port-au-Prince"
      ],
      "answer": "Roseau",
      "point": "Dominica — Roseau.",
      "typed": "Roseau",
      "map": {
        "kind": "world",
        "place": "Dominica",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g308",
      "level": "hard",
      "q": "Roseau is the capital of which country?",
      "options": [
        "St. Lucia",
        "Grenada",
        "Dominica",
        "Cuba"
      ],
      "answer": "Dominica",
      "point": "Dominica — Roseau.",
      "typed": "Dominica",
      "map": {
        "kind": "world",
        "place": "Dominica",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g309",
      "level": "medium",
      "q": "What is the capital of Dominican Republic?",
      "options": [
        "St. John's",
        "Mexico City",
        "San Jose",
        "Santo Domingo"
      ],
      "answer": "Santo Domingo",
      "point": "Dominican Republic — Santo Domingo.",
      "typed": "Santo Domingo",
      "map": {
        "kind": "world",
        "place": "Dominican Republic",
        "where": "North America",
        "note": "On the island of Hispaniola, in the Caribbean Sea."
      }
    },
    {
      "key": "s4-g310",
      "level": "hard",
      "q": "Santo Domingo is the capital of which country?",
      "options": [
        "Grenada",
        "Trinidad and Tobago",
        "El Salvador",
        "Dominican Republic"
      ],
      "answer": "Dominican Republic",
      "point": "Dominican Republic — Santo Domingo.",
      "typed": "Dominican Republic",
      "map": {
        "kind": "world",
        "place": "Dominican Republic",
        "where": "North America",
        "note": "On the island of Hispaniola, in the Caribbean Sea."
      }
    },
    {
      "key": "s4-g311",
      "level": "medium",
      "q": "What is the capital of El Salvador?",
      "options": [
        "Kingston",
        "Mexico City",
        "Basseterre",
        "San Salvador"
      ],
      "answer": "San Salvador",
      "point": "El Salvador — San Salvador.",
      "typed": "San Salvador",
      "map": {
        "kind": "world",
        "place": "El Salvador",
        "where": "North America",
        "note": "In Central America, on the Pacific Ocean."
      }
    },
    {
      "key": "s4-g312",
      "level": "hard",
      "q": "San Salvador is the capital of which country?",
      "options": [
        "El Salvador",
        "St. Lucia",
        "Canada",
        "Panama"
      ],
      "answer": "El Salvador",
      "point": "El Salvador — San Salvador.",
      "typed": "El Salvador",
      "map": {
        "kind": "world",
        "place": "El Salvador",
        "where": "North America",
        "note": "In Central America, on the Pacific Ocean."
      }
    },
    {
      "key": "s4-g313",
      "level": "medium",
      "q": "What is the capital of Grenada?",
      "options": [
        "St. George's",
        "Ottawa",
        "Guatemala City",
        "St. John's"
      ],
      "answer": "St. George's",
      "point": "Grenada — St. George's.",
      "typed": "St. George's",
      "map": {
        "kind": "world",
        "place": "Grenada",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g314",
      "level": "hard",
      "q": "St. George's is the capital of which country?",
      "options": [
        "St. Vincent and the Grenadines",
        "Grenada",
        "Cuba",
        "Belize"
      ],
      "answer": "Grenada",
      "point": "Grenada — St. George's.",
      "typed": "Grenada",
      "map": {
        "kind": "world",
        "place": "Grenada",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g315",
      "level": "medium",
      "q": "What is the capital of Guatemala?",
      "options": [
        "Castries",
        "Guatemala City",
        "Nassau",
        "Bridgetown"
      ],
      "answer": "Guatemala City",
      "point": "Guatemala — Guatemala City.",
      "typed": "Guatemala City",
      "accept": [
        "guatemala"
      ],
      "map": {
        "kind": "world",
        "place": "Guatemala",
        "where": "North America",
        "note": "In Central America, south of Mexico."
      }
    },
    {
      "key": "s4-g316",
      "level": "hard",
      "q": "Guatemala City is the capital of which country?",
      "options": [
        "Guatemala",
        "El Salvador",
        "Grenada",
        "Bahamas"
      ],
      "answer": "Guatemala",
      "point": "Guatemala — Guatemala City.",
      "typed": "Guatemala",
      "map": {
        "kind": "world",
        "place": "Guatemala",
        "where": "North America",
        "note": "In Central America, south of Mexico."
      }
    },
    {
      "key": "s4-g317",
      "level": "medium",
      "q": "What is the capital of Haiti?",
      "options": [
        "Kingston",
        "Havana",
        "Port-au-Prince",
        "Santo Domingo"
      ],
      "answer": "Port-au-Prince",
      "point": "Haiti — Port-au-Prince.",
      "typed": "Port-au-Prince",
      "map": {
        "kind": "world",
        "place": "Haiti",
        "where": "North America",
        "note": "On the island of Hispaniola, in the Caribbean Sea."
      }
    },
    {
      "key": "s4-g318",
      "level": "hard",
      "q": "Port-au-Prince is the capital of which country?",
      "options": [
        "Mexico",
        "St. Kitts and Nevis",
        "Guatemala",
        "Haiti"
      ],
      "answer": "Haiti",
      "point": "Haiti — Port-au-Prince.",
      "typed": "Haiti",
      "map": {
        "kind": "world",
        "place": "Haiti",
        "where": "North America",
        "note": "On the island of Hispaniola, in the Caribbean Sea."
      }
    },
    {
      "key": "s4-g319",
      "level": "medium",
      "q": "What is the capital of Honduras?",
      "options": [
        "Guatemala City",
        "St. John's",
        "Basseterre",
        "Tegucigalpa"
      ],
      "answer": "Tegucigalpa",
      "point": "Honduras — Tegucigalpa.",
      "typed": "Tegucigalpa",
      "map": {
        "kind": "world",
        "place": "Honduras",
        "where": "North America",
        "note": "In Central America, between Guatemala and Nicaragua."
      }
    },
    {
      "key": "s4-g320",
      "level": "hard",
      "q": "Tegucigalpa is the capital of which country?",
      "options": [
        "Costa Rica",
        "Honduras",
        "Jamaica",
        "Grenada"
      ],
      "answer": "Honduras",
      "point": "Honduras — Tegucigalpa.",
      "typed": "Honduras",
      "map": {
        "kind": "world",
        "place": "Honduras",
        "where": "North America",
        "note": "In Central America, between Guatemala and Nicaragua."
      }
    },
    {
      "key": "s4-g321",
      "level": "hard",
      "q": "What is the capital of Jamaica?",
      "options": [
        "San Jose",
        "Nassau",
        "San Salvador",
        "Kingston"
      ],
      "answer": "Kingston",
      "point": "Jamaica — Kingston.",
      "typed": "Kingston",
      "map": {
        "kind": "world",
        "place": "Jamaica",
        "where": "North America",
        "note": "An island in the Caribbean Sea, south of Cuba."
      }
    },
    {
      "key": "s4-g322",
      "level": "hard",
      "q": "Kingston is the capital of which country?",
      "options": [
        "Dominican Republic",
        "Trinidad and Tobago",
        "Jamaica",
        "United States"
      ],
      "answer": "Jamaica",
      "point": "Jamaica — Kingston.",
      "typed": "Jamaica",
      "map": {
        "kind": "world",
        "place": "Jamaica",
        "where": "North America",
        "note": "An island in the Caribbean Sea, south of Cuba."
      }
    },
    {
      "key": "s4-g323",
      "level": "medium",
      "q": "What is the capital of Mexico?",
      "options": [
        "Guatemala City",
        "Port of Spain",
        "San Salvador",
        "Mexico City"
      ],
      "answer": "Mexico City",
      "point": "Mexico — Mexico City.",
      "typed": "Mexico City",
      "accept": [
        "mexico"
      ],
      "map": {
        "kind": "world",
        "place": "Mexico",
        "where": "North America",
        "note": "South of the USA, in North America."
      }
    },
    {
      "key": "s4-g324",
      "level": "hard",
      "q": "Mexico City is the capital of which country?",
      "options": [
        "Panama",
        "Haiti",
        "Costa Rica",
        "Mexico"
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
      "key": "s4-g325",
      "level": "medium",
      "q": "What is the capital of Nicaragua?",
      "options": [
        "San Jose",
        "Managua",
        "Havana",
        "Kingston"
      ],
      "answer": "Managua",
      "point": "Nicaragua — Managua.",
      "typed": "Managua",
      "map": {
        "kind": "world",
        "place": "Nicaragua",
        "where": "North America",
        "note": "In Central America, between Honduras and Costa Rica."
      }
    },
    {
      "key": "s4-g326",
      "level": "hard",
      "q": "Managua is the capital of which country?",
      "options": [
        "Mexico",
        "Cuba",
        "Costa Rica",
        "Nicaragua"
      ],
      "answer": "Nicaragua",
      "point": "Nicaragua — Managua.",
      "typed": "Nicaragua",
      "map": {
        "kind": "world",
        "place": "Nicaragua",
        "where": "North America",
        "note": "In Central America, between Honduras and Costa Rica."
      }
    },
    {
      "key": "s4-g327",
      "level": "medium",
      "q": "What is the capital of Panama?",
      "options": [
        "Panama City",
        "Kingston",
        "St. John's",
        "Havana"
      ],
      "answer": "Panama City",
      "point": "Panama — Panama City.",
      "typed": "Panama City",
      "accept": [
        "panama"
      ],
      "map": {
        "kind": "world",
        "place": "Panama",
        "where": "North America",
        "note": "In Central America — the Panama Canal is here."
      }
    },
    {
      "key": "s4-g328",
      "level": "hard",
      "q": "Panama City is the capital of which country?",
      "options": [
        "United States",
        "Belize",
        "Antigua and Barbuda",
        "Panama"
      ],
      "answer": "Panama",
      "point": "Panama — Panama City.",
      "typed": "Panama",
      "map": {
        "kind": "world",
        "place": "Panama",
        "where": "North America",
        "note": "In Central America — the Panama Canal is here."
      }
    },
    {
      "key": "s4-g329",
      "level": "medium",
      "q": "What is the capital of St. Kitts and Nevis?",
      "options": [
        "Panama City",
        "Basseterre",
        "Castries",
        "Ottawa"
      ],
      "answer": "Basseterre",
      "point": "St. Kitts and Nevis — Basseterre.",
      "typed": "Basseterre",
      "map": {
        "kind": "world",
        "place": "St. Kitts and Nevis",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g330",
      "level": "hard",
      "q": "Basseterre is the capital of which country?",
      "options": [
        "Cuba",
        "Belize",
        "St. Kitts and Nevis",
        "St. Lucia"
      ],
      "answer": "St. Kitts and Nevis",
      "point": "St. Kitts and Nevis — Basseterre.",
      "typed": "St. Kitts and Nevis",
      "map": {
        "kind": "world",
        "place": "St. Kitts and Nevis",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g331",
      "level": "medium",
      "q": "What is the capital of St. Lucia?",
      "options": [
        "Castries",
        "St. George's",
        "Santo Domingo",
        "Roseau"
      ],
      "answer": "Castries",
      "point": "St. Lucia — Castries.",
      "typed": "Castries",
      "map": {
        "kind": "world",
        "place": "St. Lucia",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g332",
      "level": "hard",
      "q": "Castries is the capital of which country?",
      "options": [
        "St. Lucia",
        "Belize",
        "Grenada",
        "Jamaica"
      ],
      "answer": "St. Lucia",
      "point": "St. Lucia — Castries.",
      "typed": "St. Lucia",
      "map": {
        "kind": "world",
        "place": "St. Lucia",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g333",
      "level": "medium",
      "q": "What is the capital of St. Vincent and the Grenadines?",
      "options": [
        "Santo Domingo",
        "Kingston",
        "San Salvador",
        "Kingstown"
      ],
      "answer": "Kingstown",
      "point": "St. Vincent and the Grenadines — Kingstown.",
      "typed": "Kingstown",
      "map": {
        "kind": "world",
        "place": "St. Vincent and the Grenadines",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g334",
      "level": "hard",
      "q": "Kingstown is the capital of which country?",
      "options": [
        "St. Vincent and the Grenadines",
        "St. Lucia",
        "Guatemala",
        "Haiti"
      ],
      "answer": "St. Vincent and the Grenadines",
      "point": "St. Vincent and the Grenadines — Kingstown.",
      "typed": "St. Vincent and the Grenadines",
      "map": {
        "kind": "world",
        "place": "St. Vincent and the Grenadines",
        "where": "North America",
        "note": "In North America."
      }
    },
    {
      "key": "s4-g335",
      "level": "medium",
      "q": "What is the capital of Trinidad and Tobago?",
      "options": [
        "Ottawa",
        "St. George's",
        "Port of Spain",
        "Kingston"
      ],
      "answer": "Port of Spain",
      "point": "Trinidad and Tobago — Port of Spain.",
      "typed": "Port of Spain",
      "map": {
        "kind": "world",
        "place": "Trinidad and Tobago",
        "where": "North America",
        "note": "Islands in the Caribbean Sea, north of Venezuela."
      }
    },
    {
      "key": "s4-g336",
      "level": "hard",
      "q": "Port of Spain is the capital of which country?",
      "options": [
        "Canada",
        "Trinidad and Tobago",
        "Bahamas",
        "St. Kitts and Nevis"
      ],
      "answer": "Trinidad and Tobago",
      "point": "Trinidad and Tobago — Port of Spain.",
      "typed": "Trinidad and Tobago",
      "map": {
        "kind": "world",
        "place": "Trinidad and Tobago",
        "where": "North America",
        "note": "Islands in the Caribbean Sea, north of Venezuela."
      }
    },
    {
      "key": "s4-g337",
      "level": "easy",
      "q": "What is the capital of United States?",
      "options": [
        "Port-au-Prince",
        "St. John's",
        "Washington, D.C.",
        "Mexico City"
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
      "key": "s4-g338",
      "level": "medium",
      "q": "Washington, D.C. is the capital of which country?",
      "options": [
        "Dominica",
        "Nicaragua",
        "Jamaica",
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
      "key": "s4-g339",
      "level": "medium",
      "q": "What is the capital of Argentina?",
      "options": [
        "Santiago",
        "Lima",
        "Buenos Aires",
        "Georgetown"
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
      "key": "s4-g340",
      "level": "hard",
      "q": "Buenos Aires is the capital of which country?",
      "options": [
        "Chile",
        "Colombia",
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
      "key": "s4-g341",
      "level": "medium",
      "q": "What is the capital of Bolivia?",
      "options": [
        "Sucre",
        "Paramaribo",
        "Santiago",
        "Buenos Aires"
      ],
      "answer": "Sucre",
      "point": "Bolivia — Sucre.",
      "typed": "Sucre",
      "map": {
        "kind": "world",
        "place": "Bolivia",
        "where": "South America",
        "note": "In South America — Sucre is its capital."
      }
    },
    {
      "key": "s4-g342",
      "level": "hard",
      "q": "Sucre is the capital of which country?",
      "options": [
        "Venezuela",
        "Colombia",
        "Uruguay",
        "Bolivia"
      ],
      "answer": "Bolivia",
      "point": "Bolivia — Sucre.",
      "typed": "Bolivia",
      "map": {
        "kind": "world",
        "place": "Bolivia",
        "where": "South America",
        "note": "In South America — Sucre is its capital."
      }
    },
    {
      "key": "s4-g344",
      "level": "hard",
      "q": "Brasilia is the capital of which country?",
      "options": [
        "Suriname",
        "Peru",
        "Brazil",
        "Paraguay"
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
      "key": "s4-g345",
      "level": "hard",
      "q": "What is the capital of Chile?",
      "options": [
        "Bogota",
        "Quito",
        "Sucre",
        "Santiago"
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
      "key": "s4-g346",
      "level": "hard",
      "q": "Santiago is the capital of which country?",
      "options": [
        "Ecuador",
        "Peru",
        "Chile",
        "Guyana"
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
      "key": "s4-g347",
      "level": "hard",
      "q": "What is the capital of Colombia?",
      "options": [
        "Buenos Aires",
        "Santiago",
        "Bogota",
        "Caracas"
      ],
      "answer": "Bogota",
      "point": "Colombia — Bogota.",
      "typed": "Bogota",
      "map": {
        "kind": "world",
        "place": "Colombia",
        "where": "South America",
        "note": "In South America, in the north-west — next to Panama."
      }
    },
    {
      "key": "s4-g348",
      "level": "hard",
      "q": "Bogota is the capital of which country?",
      "options": [
        "Brazil",
        "Colombia",
        "Guyana",
        "Ecuador"
      ],
      "answer": "Colombia",
      "point": "Colombia — Bogota.",
      "typed": "Colombia",
      "map": {
        "kind": "world",
        "place": "Colombia",
        "where": "South America",
        "note": "In South America, in the north-west — next to Panama."
      }
    },
    {
      "key": "s4-g349",
      "level": "hard",
      "q": "What is the capital of Ecuador?",
      "options": [
        "Sucre",
        "Paramaribo",
        "Quito",
        "Bogota"
      ],
      "answer": "Quito",
      "point": "Ecuador — Quito.",
      "typed": "Quito",
      "map": {
        "kind": "world",
        "place": "Ecuador",
        "where": "South America",
        "note": "In South America, on the Pacific Ocean — the Equator runs through it."
      }
    },
    {
      "key": "s4-g350",
      "level": "hard",
      "q": "Quito is the capital of which country?",
      "options": [
        "Guyana",
        "Colombia",
        "Paraguay",
        "Ecuador"
      ],
      "answer": "Ecuador",
      "point": "Ecuador — Quito.",
      "typed": "Ecuador",
      "map": {
        "kind": "world",
        "place": "Ecuador",
        "where": "South America",
        "note": "In South America, on the Pacific Ocean — the Equator runs through it."
      }
    },
    {
      "key": "s4-g351",
      "level": "medium",
      "q": "What is the capital of Guyana?",
      "options": [
        "Georgetown",
        "Sucre",
        "Paramaribo",
        "Santiago"
      ],
      "answer": "Georgetown",
      "point": "Guyana — Georgetown.",
      "typed": "Georgetown",
      "map": {
        "kind": "world",
        "place": "Guyana",
        "where": "South America",
        "note": "In South America, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g352",
      "level": "hard",
      "q": "Georgetown is the capital of which country?",
      "options": [
        "Guyana",
        "Chile",
        "Suriname",
        "Venezuela"
      ],
      "answer": "Guyana",
      "point": "Guyana — Georgetown.",
      "typed": "Guyana",
      "map": {
        "kind": "world",
        "place": "Guyana",
        "where": "South America",
        "note": "In South America, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g353",
      "level": "medium",
      "q": "What is the capital of Paraguay?",
      "options": [
        "Montevideo",
        "Lima",
        "Asuncion",
        "Sucre"
      ],
      "answer": "Asuncion",
      "point": "Paraguay — Asuncion.",
      "typed": "Asuncion",
      "map": {
        "kind": "world",
        "place": "Paraguay",
        "where": "South America",
        "note": "In South America, between Argentina and Brazil."
      }
    },
    {
      "key": "s4-g354",
      "level": "hard",
      "q": "Asuncion is the capital of which country?",
      "options": [
        "Uruguay",
        "Paraguay",
        "Bolivia",
        "Ecuador"
      ],
      "answer": "Paraguay",
      "point": "Paraguay — Asuncion.",
      "typed": "Paraguay",
      "map": {
        "kind": "world",
        "place": "Paraguay",
        "where": "South America",
        "note": "In South America, between Argentina and Brazil."
      }
    },
    {
      "key": "s4-g355",
      "level": "hard",
      "q": "What is the capital of Peru?",
      "options": [
        "Georgetown",
        "Buenos Aires",
        "Lima",
        "Brasilia"
      ],
      "answer": "Lima",
      "point": "Peru — Lima.",
      "typed": "Lima",
      "map": {
        "kind": "world",
        "place": "Peru",
        "where": "South America",
        "note": "In South America, on the Pacific Ocean — Machu Picchu is here."
      }
    },
    {
      "key": "s4-g356",
      "level": "hard",
      "q": "Lima is the capital of which country?",
      "options": [
        "Uruguay",
        "Suriname",
        "Venezuela",
        "Peru"
      ],
      "answer": "Peru",
      "point": "Peru — Lima.",
      "typed": "Peru",
      "map": {
        "kind": "world",
        "place": "Peru",
        "where": "South America",
        "note": "In South America, on the Pacific Ocean — Machu Picchu is here."
      }
    },
    {
      "key": "s4-g357",
      "level": "medium",
      "q": "What is the capital of Suriname?",
      "options": [
        "Quito",
        "Georgetown",
        "Paramaribo",
        "Brasilia"
      ],
      "answer": "Paramaribo",
      "point": "Suriname — Paramaribo.",
      "typed": "Paramaribo",
      "map": {
        "kind": "world",
        "place": "Suriname",
        "where": "South America",
        "note": "In South America, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g358",
      "level": "hard",
      "q": "Paramaribo is the capital of which country?",
      "options": [
        "Venezuela",
        "Suriname",
        "Paraguay",
        "Chile"
      ],
      "answer": "Suriname",
      "point": "Suriname — Paramaribo.",
      "typed": "Suriname",
      "map": {
        "kind": "world",
        "place": "Suriname",
        "where": "South America",
        "note": "In South America, on the Atlantic Ocean."
      }
    },
    {
      "key": "s4-g359",
      "level": "medium",
      "q": "What is the capital of Uruguay?",
      "options": [
        "Brasilia",
        "Asuncion",
        "Montevideo",
        "Bogota"
      ],
      "answer": "Montevideo",
      "point": "Uruguay — Montevideo.",
      "typed": "Montevideo",
      "map": {
        "kind": "world",
        "place": "Uruguay",
        "where": "South America",
        "note": "In South America, between Argentina and Brazil."
      }
    },
    {
      "key": "s4-g360",
      "level": "hard",
      "q": "Montevideo is the capital of which country?",
      "options": [
        "Venezuela",
        "Colombia",
        "Uruguay",
        "Suriname"
      ],
      "answer": "Uruguay",
      "point": "Uruguay — Montevideo.",
      "typed": "Uruguay",
      "map": {
        "kind": "world",
        "place": "Uruguay",
        "where": "South America",
        "note": "In South America, between Argentina and Brazil."
      }
    },
    {
      "key": "s4-g361",
      "level": "hard",
      "q": "What is the capital of Venezuela?",
      "options": [
        "Lima",
        "Caracas",
        "Quito",
        "Bogota"
      ],
      "answer": "Caracas",
      "point": "Venezuela — Caracas.",
      "typed": "Caracas",
      "map": {
        "kind": "world",
        "place": "Venezuela",
        "where": "South America",
        "note": "In South America, on the Caribbean Sea."
      }
    },
    {
      "key": "s4-g362",
      "level": "hard",
      "q": "Caracas is the capital of which country?",
      "options": [
        "Venezuela",
        "Suriname",
        "Paraguay",
        "Argentina"
      ],
      "answer": "Venezuela",
      "point": "Venezuela — Caracas.",
      "typed": "Venezuela",
      "map": {
        "kind": "world",
        "place": "Venezuela",
        "where": "South America",
        "note": "In South America, on the Caribbean Sea."
      }
    },
    {
      "key": "s4-g364",
      "level": "hard",
      "q": "Canberra is the capital of which country?",
      "options": [
        "Tonga",
        "Australia",
        "Palau",
        "Fiji"
      ],
      "answer": "Australia",
      "point": "Australia — Canberra.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Australia",
        "where": "Australia",
        "note": "The island continent, south-east of Asia."
      }
    },
    {
      "key": "s4-g365",
      "level": "medium",
      "q": "What is the capital of Fiji?",
      "options": [
        "Suva",
        "South Tarawa",
        "Wellington",
        "Honiara"
      ],
      "answer": "Suva",
      "point": "Fiji — Suva.",
      "typed": "Suva",
      "map": {
        "kind": "world",
        "place": "Fiji",
        "where": "Australia",
        "note": "Islands in the Pacific Ocean, east of Australia."
      }
    },
    {
      "key": "s4-g366",
      "level": "hard",
      "q": "Suva is the capital of which country?",
      "options": [
        "Fiji",
        "Nauru",
        "Solomon Islands",
        "Tonga"
      ],
      "answer": "Fiji",
      "point": "Fiji — Suva.",
      "typed": "Fiji",
      "map": {
        "kind": "world",
        "place": "Fiji",
        "where": "Australia",
        "note": "Islands in the Pacific Ocean, east of Australia."
      }
    },
    {
      "key": "s4-g367",
      "level": "medium",
      "q": "What is the capital of Kiribati?",
      "options": [
        "Port Moresby",
        "South Tarawa",
        "Honiara",
        "Yaren"
      ],
      "answer": "South Tarawa",
      "point": "Kiribati — South Tarawa.",
      "typed": "South Tarawa",
      "map": {
        "kind": "world",
        "place": "Kiribati",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g368",
      "level": "hard",
      "q": "South Tarawa is the capital of which country?",
      "options": [
        "Tuvalu",
        "Kiribati",
        "Micronesia",
        "Samoa"
      ],
      "answer": "Kiribati",
      "point": "Kiribati — South Tarawa.",
      "typed": "Kiribati",
      "map": {
        "kind": "world",
        "place": "Kiribati",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g369",
      "level": "medium",
      "q": "What is the capital of Marshall Islands?",
      "options": [
        "Palikir",
        "Majuro",
        "Port Moresby",
        "Nuku'alofa"
      ],
      "answer": "Majuro",
      "point": "Marshall Islands — Majuro.",
      "typed": "Majuro",
      "map": {
        "kind": "world",
        "place": "Marshall Islands",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g370",
      "level": "hard",
      "q": "Majuro is the capital of which country?",
      "options": [
        "Papua New Guinea",
        "Marshall Islands",
        "Australia",
        "Samoa"
      ],
      "answer": "Marshall Islands",
      "point": "Marshall Islands — Majuro.",
      "typed": "Marshall Islands",
      "map": {
        "kind": "world",
        "place": "Marshall Islands",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g371",
      "level": "medium",
      "q": "What is the capital of Micronesia?",
      "options": [
        "Yaren",
        "Suva",
        "South Tarawa",
        "Palikir"
      ],
      "answer": "Palikir",
      "point": "Micronesia — Palikir.",
      "typed": "Palikir",
      "map": {
        "kind": "world",
        "place": "Micronesia",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g372",
      "level": "hard",
      "q": "Palikir is the capital of which country?",
      "options": [
        "Nauru",
        "Micronesia",
        "Tuvalu",
        "Solomon Islands"
      ],
      "answer": "Micronesia",
      "point": "Micronesia — Palikir.",
      "typed": "Micronesia",
      "map": {
        "kind": "world",
        "place": "Micronesia",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g373",
      "level": "medium",
      "q": "What is the capital of Nauru?",
      "options": [
        "South Tarawa",
        "Suva",
        "Yaren",
        "Port Vila"
      ],
      "answer": "Yaren",
      "point": "Nauru — Yaren.",
      "typed": "Yaren",
      "map": {
        "kind": "world",
        "place": "Nauru",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g374",
      "level": "hard",
      "q": "Yaren is the capital of which country?",
      "options": [
        "Samoa",
        "Nauru",
        "Kiribati",
        "Tonga"
      ],
      "answer": "Nauru",
      "point": "Nauru — Yaren.",
      "typed": "Nauru",
      "map": {
        "kind": "world",
        "place": "Nauru",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g375",
      "level": "medium",
      "q": "What is the capital of New Zealand?",
      "options": [
        "Majuro",
        "Palikir",
        "Port Moresby",
        "Wellington"
      ],
      "answer": "Wellington",
      "point": "New Zealand — Wellington.",
      "typed": "Wellington",
      "map": {
        "kind": "world",
        "place": "New Zealand",
        "where": "Australia",
        "note": "Islands south-east of Australia, in the Pacific Ocean."
      }
    },
    {
      "key": "s4-g376",
      "level": "hard",
      "q": "Wellington is the capital of which country?",
      "options": [
        "Fiji",
        "New Zealand",
        "Tuvalu",
        "Micronesia"
      ],
      "answer": "New Zealand",
      "point": "New Zealand — Wellington.",
      "typed": "New Zealand",
      "map": {
        "kind": "world",
        "place": "New Zealand",
        "where": "Australia",
        "note": "Islands south-east of Australia, in the Pacific Ocean."
      }
    },
    {
      "key": "s4-g377",
      "level": "medium",
      "q": "What is the capital of Palau?",
      "options": [
        "Nuku'alofa",
        "Apia",
        "Wellington",
        "Ngerulmud"
      ],
      "answer": "Ngerulmud",
      "point": "Palau — Ngerulmud.",
      "typed": "Ngerulmud",
      "map": {
        "kind": "world",
        "place": "Palau",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g378",
      "level": "hard",
      "q": "Ngerulmud is the capital of which country?",
      "options": [
        "Palau",
        "Vanuatu",
        "Tuvalu",
        "Samoa"
      ],
      "answer": "Palau",
      "point": "Palau — Ngerulmud.",
      "typed": "Palau",
      "map": {
        "kind": "world",
        "place": "Palau",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g379",
      "level": "hard",
      "q": "What is the capital of Papua New Guinea?",
      "options": [
        "Port Vila",
        "Honiara",
        "Palikir",
        "Port Moresby"
      ],
      "answer": "Port Moresby",
      "point": "Papua New Guinea — Port Moresby.",
      "typed": "Port Moresby",
      "map": {
        "kind": "world",
        "place": "Papua New Guinea",
        "where": "Australia",
        "note": "On the island of New Guinea, north of Australia."
      }
    },
    {
      "key": "s4-g380",
      "level": "hard",
      "q": "Port Moresby is the capital of which country?",
      "options": [
        "Tuvalu",
        "Papua New Guinea",
        "New Zealand",
        "Kiribati"
      ],
      "answer": "Papua New Guinea",
      "point": "Papua New Guinea — Port Moresby.",
      "typed": "Papua New Guinea",
      "map": {
        "kind": "world",
        "place": "Papua New Guinea",
        "where": "Australia",
        "note": "On the island of New Guinea, north of Australia."
      }
    },
    {
      "key": "s4-g381",
      "level": "medium",
      "q": "What is the capital of Samoa?",
      "options": [
        "Apia",
        "Port Vila",
        "Suva",
        "Palikir"
      ],
      "answer": "Apia",
      "point": "Samoa — Apia.",
      "typed": "Apia",
      "map": {
        "kind": "world",
        "place": "Samoa",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g382",
      "level": "hard",
      "q": "Apia is the capital of which country?",
      "options": [
        "Nauru",
        "Kiribati",
        "Samoa",
        "Tonga"
      ],
      "answer": "Samoa",
      "point": "Samoa — Apia.",
      "typed": "Samoa",
      "map": {
        "kind": "world",
        "place": "Samoa",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g383",
      "level": "medium",
      "q": "What is the capital of Solomon Islands?",
      "options": [
        "Palikir",
        "Apia",
        "Honiara",
        "Ngerulmud"
      ],
      "answer": "Honiara",
      "point": "Solomon Islands — Honiara.",
      "typed": "Honiara",
      "map": {
        "kind": "world",
        "place": "Solomon Islands",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g384",
      "level": "hard",
      "q": "Honiara is the capital of which country?",
      "options": [
        "Solomon Islands",
        "Kiribati",
        "Samoa",
        "New Zealand"
      ],
      "answer": "Solomon Islands",
      "point": "Solomon Islands — Honiara.",
      "typed": "Solomon Islands",
      "map": {
        "kind": "world",
        "place": "Solomon Islands",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g385",
      "level": "medium",
      "q": "What is the capital of Tonga?",
      "options": [
        "Palikir",
        "Port Moresby",
        "Nuku'alofa",
        "Apia"
      ],
      "answer": "Nuku'alofa",
      "point": "Tonga — Nuku'alofa.",
      "typed": "Nuku'alofa",
      "map": {
        "kind": "world",
        "place": "Tonga",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g386",
      "level": "hard",
      "q": "Nuku'alofa is the capital of which country?",
      "options": [
        "Fiji",
        "Solomon Islands",
        "Tonga",
        "Australia"
      ],
      "answer": "Tonga",
      "point": "Tonga — Nuku'alofa.",
      "typed": "Tonga",
      "map": {
        "kind": "world",
        "place": "Tonga",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g387",
      "level": "medium",
      "q": "What is the capital of Tuvalu?",
      "options": [
        "Wellington",
        "Apia",
        "South Tarawa",
        "Funafuti"
      ],
      "answer": "Funafuti",
      "point": "Tuvalu — Funafuti.",
      "typed": "Funafuti",
      "map": {
        "kind": "world",
        "place": "Tuvalu",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g388",
      "level": "hard",
      "q": "Funafuti is the capital of which country?",
      "options": [
        "Tuvalu",
        "Palau",
        "Samoa",
        "Fiji"
      ],
      "answer": "Tuvalu",
      "point": "Tuvalu — Funafuti.",
      "typed": "Tuvalu",
      "map": {
        "kind": "world",
        "place": "Tuvalu",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g389",
      "level": "medium",
      "q": "What is the capital of Vanuatu?",
      "options": [
        "Port Vila",
        "Canberra",
        "South Tarawa",
        "Honiara"
      ],
      "answer": "Port Vila",
      "point": "Vanuatu — Port Vila.",
      "typed": "Port Vila",
      "map": {
        "kind": "world",
        "place": "Vanuatu",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s4-g390",
      "level": "hard",
      "q": "Port Vila is the capital of which country?",
      "options": [
        "Tuvalu",
        "Tonga",
        "New Zealand",
        "Vanuatu"
      ],
      "answer": "Vanuatu",
      "point": "Vanuatu — Port Vila.",
      "typed": "Vanuatu",
      "map": {
        "kind": "world",
        "place": "Vanuatu",
        "where": "Australia",
        "note": "In Australia."
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
        "Shimla",
        "Kavaratti",
        "Puducherry",
        "Kolkata"
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
        "Arunachal Pradesh",
        "Himachal Pradesh",
        "Karnataka",
        "Punjab"
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
        "South India",
        "East India",
        "North India",
        "West India"
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
        "Amaravati",
        "Dehradun",
        "Gangtok",
        "Port Blair"
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
        "Rajasthan",
        "Arunachal Pradesh",
        "Jammu and Kashmir",
        "Uttarakhand"
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
        "East India",
        "North India",
        "South India",
        "North-East India"
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
        "Puducherry",
        "Daman",
        "Chandigarh",
        "Kohima"
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
        "North-East India",
        "North India",
        "East India",
        "West India"
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
        "Chandigarh",
        "Thiruvananthapuram",
        "Jaipur",
        "Bhubaneswar"
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
        "North India",
        "South India",
        "Central India",
        "West India"
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
        "Kohima",
        "Patna",
        "Leh"
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
        "Arunachal Pradesh",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu"
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
        "North-East India",
        "West India",
        "North India",
        "South India"
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
        "Nagaland",
        "Chhattisgarh",
        "Kerala",
        "Rajasthan"
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
        "West India",
        "North-East India",
        "East India",
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
        "Karnataka",
        "Kerala",
        "Gujarat",
        "Jharkhand"
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
        "North-East India",
        "West India",
        "Central India",
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
        "Meghalaya",
        "Madhya Pradesh",
        "Tamil Nadu",
        "Assam"
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
        "North India",
        "West India",
        "South India",
        "East India"
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
        "Telangana",
        "Punjab",
        "Karnataka",
        "Andaman and Nicobar Islands"
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
        "East India",
        "West India",
        "South India",
        "North India"
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
        "New Delhi",
        "Amaravati",
        "Itanagar",
        "Bengaluru"
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
        "Andhra Pradesh",
        "Uttar Pradesh",
        "Telangana",
        "Chhattisgarh"
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
        "Central India",
        "East India",
        "North India",
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
        "Ranchi",
        "Chandigarh",
        "Itanagar",
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
        "Chhattisgarh",
        "Tamil Nadu",
        "Puducherry",
        "Telangana"
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
        "North India",
        "South India",
        "East India",
        "North-East India"
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
        "West Bengal",
        "Maharashtra",
        "Jammu and Kashmir",
        "Himachal Pradesh"
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
        "North-East India",
        "Central India",
        "East India",
        "South India"
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
        "Bhubaneswar",
        "Patna",
        "Hyderabad",
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
        "Ladakh",
        "Bihar",
        "Chhattisgarh",
        "Andaman and Nicobar Islands"
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
        "North-East India",
        "South India",
        "North India",
        "East India"
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
        "Panaji",
        "Itanagar",
        "Daman",
        "Ranchi"
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
        "Gujarat",
        "Delhi",
        "Jharkhand",
        "Arunachal Pradesh"
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
        "East India",
        "North India",
        "South India",
        "North-East India"
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
        "Bhubaneswar",
        "Ranchi",
        "Srinagar",
        "Gandhinagar"
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
        "Andhra Pradesh",
        "Odisha",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu"
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
        "East India",
        "North-East India",
        "South India"
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
        "Bhopal",
        "Bengaluru",
        "Thiruvananthapuram"
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
        "Maharashtra",
        "Gujarat",
        "Punjab",
        "Chhattisgarh"
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
        "West India",
        "South India",
        "Central India",
        "North-East India"
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
        "Andaman and Nicobar Islands",
        "Maharashtra",
        "Uttar Pradesh",
        "Goa"
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
        "West India",
        "North-East India",
        "South India",
        "East India"
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
        "Aizawl",
        "Leh",
        "Panaji",
        "Chennai"
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
        "Uttarakhand",
        "Maharashtra",
        "Goa",
        "Dadra and Nagar Haveli and Daman and Diu"
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
        "South India",
        "West India",
        "East India",
        "North-East India"
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
        "Bhopal",
        "Gangtok",
        "Shillong",
        "Jaipur"
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
        "West Bengal",
        "Manipur",
        "Gujarat",
        "Madhya Pradesh"
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
        "West India",
        "Central India",
        "East India",
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
        "Bhopal",
        "Dispur",
        "Kohima",
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
        "Manipur",
        "Jharkhand",
        "Goa",
        "Chhattisgarh"
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
        "Central India",
        "West India",
        "East India",
        "North India"
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
        "Uttarakhand",
        "Jammu and Kashmir",
        "Lakshadweep",
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
        "East India",
        "North-East India",
        "North India",
        "South India"
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
        "Bhubaneswar",
        "Itanagar",
        "Patna",
        "Bengaluru"
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
        "Arunachal Pradesh",
        "Karnataka",
        "Puducherry",
        "Mizoram"
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
        "North-East India",
        "West India",
        "South India",
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
        "Imphal",
        "Bengaluru",
        "Srinagar",
        "New Delhi"
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
        "Uttar Pradesh",
        "Telangana",
        "Chhattisgarh",
        "Manipur"
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
        "North India",
        "North-East India",
        "East India",
        "Central India"
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
        "Itanagar",
        "Bhopal",
        "Shillong",
        "Leh"
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
        "Madhya Pradesh",
        "Telangana",
        "Meghalaya",
        "Chandigarh"
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
        "North India",
        "West India",
        "South India"
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
        "Amaravati",
        "Shimla",
        "Kavaratti",
        "Aizawl"
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
        "Maharashtra",
        "Mizoram",
        "Puducherry",
        "Odisha"
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
        "West India",
        "East India",
        "North-East India",
        "North India"
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
        "Patna",
        "New Delhi",
        "Kohima",
        "Leh"
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
        "Himachal Pradesh",
        "Mizoram",
        "Andaman and Nicobar Islands",
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
        "Central India",
        "North India",
        "North-East India",
        "West India"
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
        "Patna",
        "Imphal",
        "Mumbai",
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
        "Mizoram",
        "Maharashtra",
        "Karnataka",
        "Tripura"
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
        "South India",
        "North-East India",
        "West India",
        "Central India"
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
        "Manipur",
        "Sikkim",
        "Maharashtra",
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
        "North India",
        "Central India",
        "South India",
        "North-East India"
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
        "New Delhi",
        "Port Blair",
        "Patna",
        "Itanagar"
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
        "Himachal Pradesh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Andaman and Nicobar Islands",
        "Karnataka"
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
        "East India",
        "Central India",
        "West India",
        "South India"
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
        "Jaipur",
        "Raipur",
        "Chandigarh",
        "Puducherry"
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
        "South India",
        "West India",
        "North India"
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
        "Daman",
        "Mumbai",
        "Jaipur",
        "Kavaratti"
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
        "Mizoram",
        "Karnataka",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Lakshadweep"
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
        "South India",
        "West India",
        "Central India",
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
        "Panaji",
        "Mumbai",
        "New Delhi",
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
        "Punjab",
        "Jammu and Kashmir",
        "Jharkhand",
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
        "West India",
        "South India",
        "North-East India",
        "North India"
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
        "Mumbai",
        "Srinagar",
        "Port Blair",
        "Aizawl"
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
        "Jammu and Kashmir",
        "Madhya Pradesh",
        "Haryana",
        "Karnataka"
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
        "South India",
        "North-East India",
        "West India",
        "North India"
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
        "Dehradun",
        "Leh",
        "Ranchi",
        "Chennai"
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
        "Manipur",
        "Ladakh",
        "Himachal Pradesh",
        "Uttarakhand"
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
        "West India",
        "South India",
        "North India",
        "Central India"
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
        "Patna",
        "Dispur",
        "Kavaratti",
        "Bhubaneswar"
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
        "Rajasthan",
        "Manipur",
        "Uttar Pradesh",
        "Lakshadweep"
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
        "South India",
        "West India",
        "North-East India",
        "North India"
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
        "Lucknow",
        "Daman",
        "Puducherry",
        "Leh"
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
        "Mizoram",
        "Puducherry",
        "West Bengal",
        "Delhi"
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
        "North India",
        "North-East India",
        "South India",
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
        "Malaysia",
        "Pakistan",
        "Thailand",
        "Vietnam"
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
        "Nepal",
        "Japan",
        "Thailand",
        "Vietnam"
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
        "Thailand",
        "Malaysia",
        "Bangladesh",
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
        "Myanmar",
        "Thailand",
        "Maldives",
        "Sri Lanka"
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
        "Thames",
        "Amazon",
        "Nile",
        "Narmada"
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
        "Mediterranean Sea",
        "Arabian Sea",
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
        "8,849 m",
        "6,650 m",
        "5,000 m",
        "8,586 m"
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
        "8,849 m",
        "6,650 m"
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
        "Assam",
        "Kerala",
        "Rajasthan",
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
        "The Himalayas",
        "The Thar Desert",
        "Western Ghats",
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
        "Eastern Ghats",
        "Andes",
        "The Himalayas",
        "Western Ghats"
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
        "Rajasthan",
        "Gujarat",
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
        "Kanyakumari",
        "Chennai",
        "Port Blair",
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
    },
    {
      "key": "s6-g-neigh-china",
      "level": "easy",
      "q": "Which of these is a land neighbour of India?",
      "options": [
        "Thailand",
        "China",
        "Malaysia",
        "Vietnam"
      ],
      "answer": "China",
      "point": "China is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "South Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s6-g-neigh-bhutan",
      "level": "easy",
      "q": "Which of these is a land neighbour of India?",
      "options": [
        "Japan",
        "Thailand",
        "Bhutan",
        "Vietnam"
      ],
      "answer": "Bhutan",
      "point": "Bhutan is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.",
      "typed": "Bhutan",
      "map": {
        "kind": "world",
        "place": "Bhutan",
        "where": "South Asia",
        "note": "In South Asia, in the Himalayas, east of Nepal."
      }
    },
    {
      "key": "s6-g-neigh-myanmar",
      "level": "easy",
      "q": "Which of these is a land neighbour of India?",
      "options": [
        "Myanmar",
        "Japan",
        "Vietnam",
        "Malaysia"
      ],
      "answer": "Myanmar",
      "point": "Myanmar is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.",
      "typed": "Myanmar",
      "map": {
        "kind": "world",
        "place": "Myanmar",
        "where": "South Asia",
        "note": "In South-East Asia, east of India and Bangladesh."
      }
    },
    {
      "key": "s6-g-neigh-afghanistan",
      "level": "easy",
      "q": "Which of these is a land neighbour of India?",
      "options": [
        "Thailand",
        "Afghanistan",
        "Malaysia",
        "Japan"
      ],
      "answer": "Afghanistan",
      "point": "Afghanistan is a land neighbour of India. India's land neighbours are Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar and Afghanistan.",
      "typed": "Afghanistan",
      "map": {
        "kind": "world",
        "place": "Afghanistan",
        "where": "South Asia",
        "note": "In South Asia, north-west of Pakistan."
      }
    },
    {
      "key": "s6-g-maldives",
      "level": "medium",
      "q": "Which country is India's island neighbour in the south-west?",
      "options": [
        "Myanmar",
        "Japan",
        "Thailand",
        "Maldives"
      ],
      "answer": "Maldives",
      "point": "Maldives is India's island neighbour in the south-west, in the Indian Ocean.",
      "typed": "Maldives",
      "map": {
        "kind": "world",
        "place": "Maldives",
        "where": "South Asia",
        "note": "Small islands in the Indian Ocean, south-west of India."
      }
    },
    {
      "key": "s6-g-amazon-longest",
      "level": "medium",
      "q": "Which is the longest river in South America?",
      "options": [
        "Parana",
        "Amazon",
        "Orinoco",
        "Sao Francisco"
      ],
      "answer": "Amazon",
      "point": "The Amazon (about 6,400 km) is the longest river in South America — and the second-longest in the world.",
      "typed": "Amazon",
      "map": {
        "kind": "world",
        "place": "Amazon River",
        "where": "South America",
        "note": "In South America — it flows into the Atlantic Ocean."
      }
    },
    {
      "key": "s6-g-yangtze-longest",
      "level": "medium",
      "q": "Which is the longest river in Asia?",
      "options": [
        "Yellow River",
        "Yangtze",
        "Indus",
        "Mekong"
      ],
      "answer": "Yangtze",
      "point": "The Yangtze (about 6,300 km) is the longest river in Asia. It is in China.",
      "typed": "Yangtze",
      "map": {
        "kind": "world",
        "place": "Yangtze River",
        "where": "Asia",
        "note": "In China — the longest river in Asia."
      }
    },
    {
      "key": "s6-g-mississippi-longest",
      "level": "medium",
      "q": "Which is the longest river in North America?",
      "options": [
        "Mississippi",
        "Rio Grande",
        "Colorado",
        "Missouri"
      ],
      "answer": "Mississippi",
      "point": "The Mississippi (about 3,766 km) is the longest river in North America.",
      "typed": "Mississippi",
      "map": {
        "kind": "world",
        "place": "Mississippi River",
        "where": "North America",
        "note": "In the USA — it flows into the Gulf of Mexico."
      }
    },
    {
      "key": "s6-g-volga-longest",
      "level": "medium",
      "q": "Which is the longest river in Europe?",
      "options": [
        "Volga",
        "Rhine",
        "Thames",
        "Danube"
      ],
      "answer": "Volga",
      "point": "The Volga (about 3,530 km) is the longest river in Europe. It is in Russia.",
      "typed": "Volga",
      "map": {
        "kind": "world",
        "place": "Volga River",
        "where": "Europe",
        "note": "In Russia — it flows into the Caspian Sea."
      }
    },
    {
      "key": "s6-g-murray-longest",
      "level": "medium",
      "q": "Which is the longest river in Australia?",
      "options": [
        "Murray",
        "Darling",
        "Lachlan",
        "Murrumbidgee"
      ],
      "answer": "Murray",
      "point": "The Murray (about 2,508 km) is the longest river in Australia.",
      "typed": "Murray",
      "map": {
        "kind": "world",
        "place": "Murray River",
        "where": "Australia",
        "note": "In south-east Australia."
      }
    },
    {
      "key": "s6-g-aconcagua",
      "level": "medium",
      "q": "Which is the highest mountain in South America?",
      "options": [
        "Mount Elbrus",
        "Denali",
        "Aconcagua",
        "Mount Kilimanjaro"
      ],
      "answer": "Aconcagua",
      "point": "Aconcagua (6,961 m) in Argentina is the highest mountain in South America.",
      "typed": "Aconcagua",
      "map": {
        "kind": "world",
        "place": "Aconcagua",
        "where": "South America",
        "note": "In Argentina, in the Andes."
      }
    },
    {
      "key": "s6-g-denali",
      "level": "medium",
      "q": "Which is the highest mountain in North America?",
      "options": [
        "Mount Kilimanjaro",
        "Mount Logan",
        "Denali",
        "Mount Whitney"
      ],
      "answer": "Denali",
      "point": "Denali (6,190 m) in the USA is the highest mountain in North America.",
      "typed": "Denali",
      "map": {
        "kind": "world",
        "place": "Denali",
        "where": "North America",
        "note": "In Alaska, USA."
      }
    },
    {
      "key": "s6-g-kilimanjaro",
      "level": "medium",
      "q": "Which is the highest mountain in Africa?",
      "options": [
        "Mount Elbrus",
        "Aconcagua",
        "Mount Kenya",
        "Kilimanjaro"
      ],
      "answer": "Kilimanjaro",
      "point": "Kilimanjaro (5,895 m) in Tanzania is the highest mountain in Africa.",
      "typed": "Kilimanjaro",
      "map": {
        "kind": "world",
        "place": "Kilimanjaro",
        "where": "Africa",
        "note": "In Tanzania, in East Africa."
      }
    },
    {
      "key": "s6-g-elbrus",
      "level": "medium",
      "q": "Which is the highest mountain in Europe?",
      "options": [
        "Denali",
        "Mont Blanc",
        "Mount Kilimanjaro",
        "Elbrus"
      ],
      "answer": "Elbrus",
      "point": "Mount Elbrus (5,642 m) in Russia is the highest mountain in Europe.",
      "typed": "Elbrus",
      "map": {
        "kind": "world",
        "place": "Mount Elbrus",
        "where": "Europe",
        "note": "In Russia, in the Caucasus."
      }
    },
    {
      "key": "s6-g-vinson",
      "level": "hard",
      "q": "Which is the highest mountain in Antarctica?",
      "options": [
        "Mount Erebus",
        "Mount Kilimanjaro",
        "Vinson",
        "Aconcagua"
      ],
      "answer": "Vinson",
      "point": "Mount Vinson (4,892 m) is the highest mountain in Antarctica.",
      "typed": "Vinson",
      "map": {
        "kind": "world",
        "place": "Mount Vinson",
        "where": "Antarctica",
        "note": "In Antarctica, at the South Pole."
      }
    },
    {
      "key": "s6-g-puncak",
      "level": "hard",
      "q": "Which is the highest mountain in Oceania?",
      "options": [
        "Mount Wilhelm",
        "Puncak Jaya",
        "Mount Cook",
        "Mount Kosciuszko"
      ],
      "answer": "Puncak Jaya",
      "point": "Puncak Jaya (4,884 m) in Indonesia is the highest mountain in Oceania. Mount Kosciuszko (2,228 m) is the highest on mainland Australia.",
      "typed": "Puncak Jaya",
      "map": {
        "kind": "world",
        "place": "Puncak Jaya",
        "where": "Australia",
        "note": "In Indonesia, on the island of New Guinea."
      }
    },
    {
      "key": "s6-g-alps",
      "level": "medium",
      "q": "The Alps are in which continent?",
      "options": [
        "Asia",
        "North America",
        "Europe",
        "Africa"
      ],
      "answer": "Europe",
      "point": "The Alps are the mountains of Europe — Mont Blanc is the highest peak in the Alps.",
      "typed": "Europe",
      "map": {
        "kind": "world",
        "place": "The Alps",
        "where": "Europe",
        "note": "Across Europe — France, Switzerland, Italy and Austria."
      }
    },
    {
      "key": "s6-g-rockies",
      "level": "medium",
      "q": "The Rocky Mountains are in which continent?",
      "options": [
        "Europe",
        "South America",
        "North America",
        "Asia"
      ],
      "answer": "North America",
      "point": "The Rocky Mountains are in North America — in the USA and Canada.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Rocky Mountains",
        "where": "North America",
        "note": "In the USA and Canada."
      }
    },
    {
      "key": "s6-g-atlas",
      "level": "medium",
      "q": "The Atlas Mountains are in which continent?",
      "options": [
        "Africa",
        "Asia",
        "South America",
        "Europe"
      ],
      "answer": "Africa",
      "point": "The Atlas Mountains are in North Africa — in Morocco, Algeria and Tunisia.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Atlas Mountains",
        "where": "Africa",
        "note": "In North Africa — Morocco, Algeria and Tunisia."
      }
    },
    {
      "key": "s6-g-dividing",
      "level": "medium",
      "q": "The Great Dividing Range is in which country?",
      "options": [
        "India",
        "New Zealand",
        "South Africa",
        "Australia"
      ],
      "answer": "Australia",
      "point": "The Great Dividing Range is in Australia, along the east coast.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Great Dividing Range",
        "where": "Australia",
        "note": "Along the east coast of Australia."
      }
    },
    {
      "key": "s6-g-urals",
      "level": "hard",
      "q": "Which mountain range separates Europe and Asia?",
      "options": [
        "Andes",
        "Alps",
        "Ural Mountains",
        "Himalayas"
      ],
      "answer": "Ural Mountains",
      "point": "The Ural Mountains separate Europe and Asia, in Russia.",
      "typed": "Ural Mountains",
      "map": {
        "kind": "world",
        "place": "Ural Mountains",
        "where": "Europe and Asia",
        "note": "In Russia, between Europe and Asia."
      }
    },
    {
      "key": "s6-g-gobi",
      "level": "medium",
      "q": "The Gobi Desert is in which continent?",
      "options": [
        "Asia",
        "Australia",
        "Africa",
        "North America"
      ],
      "answer": "Asia",
      "point": "The Gobi Desert is in Asia — in China and Mongolia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Gobi Desert",
        "where": "Asia",
        "note": "In China and Mongolia."
      }
    },
    {
      "key": "s6-g-kalahari",
      "level": "medium",
      "q": "The Kalahari Desert is in which continent?",
      "options": [
        "Asia",
        "South America",
        "Africa",
        "Australia"
      ],
      "answer": "Africa",
      "point": "The Kalahari Desert is in southern Africa — in Botswana, Namibia and South Africa.",
      "typed": "Africa",
      "map": {
        "kind": "world",
        "place": "Kalahari Desert",
        "where": "Africa",
        "note": "In southern Africa."
      }
    },
    {
      "key": "s6-g-arabian-desert",
      "level": "medium",
      "q": "The Arabian Desert is in which continent?",
      "options": [
        "Africa",
        "Asia",
        "Australia",
        "Europe"
      ],
      "answer": "Asia",
      "point": "The Arabian Desert is in Asia — on the Arabian Peninsula, in Saudi Arabia.",
      "typed": "Asia",
      "map": {
        "kind": "world",
        "place": "Arabian Desert",
        "where": "Asia",
        "note": "On the Arabian Peninsula, in Saudi Arabia."
      }
    },
    {
      "key": "s6-g-mojave",
      "level": "hard",
      "q": "The Mojave Desert is in which country?",
      "options": [
        "Egypt",
        "Mexico",
        "United States",
        "Australia"
      ],
      "answer": "United States",
      "point": "The Mojave Desert is in the United States, in California.",
      "typed": "United States",
      "accept": [
        "usa",
        "us",
        "america"
      ],
      "map": {
        "kind": "world",
        "place": "Mojave Desert",
        "where": "North America",
        "note": "In California, USA."
      }
    },
    {
      "key": "s6-g-great-victoria",
      "level": "hard",
      "q": "Which is the largest desert in Australia?",
      "options": [
        "Simpson Desert",
        "Gibson Desert",
        "Sahara Desert",
        "Great Victoria Desert"
      ],
      "answer": "Great Victoria Desert",
      "point": "The Great Victoria Desert is the largest desert in Australia.",
      "typed": "Great Victoria Desert",
      "map": {
        "kind": "world",
        "place": "Great Victoria Desert",
        "where": "Australia",
        "note": "In Australia."
      }
    },
    {
      "key": "s6-g-wular",
      "level": "medium",
      "q": "Which is the largest freshwater lake in India?",
      "options": [
        "Sambhar Lake",
        "Chilika Lake",
        "Dal Lake",
        "Wular Lake"
      ],
      "answer": "Wular Lake",
      "point": "Wular Lake, in Jammu and Kashmir, is the largest freshwater lake in India.",
      "typed": "Wular Lake",
      "map": {
        "kind": "india",
        "place": "Wular Lake",
        "where": "North India",
        "note": "In Jammu and Kashmir, in the north of India."
      }
    },
    {
      "key": "s6-g-tanganyika",
      "level": "hard",
      "q": "Which is the second-deepest lake in the world?",
      "options": [
        "Lake Tanganyika",
        "Lake Victoria",
        "Lake Superior",
        "Caspian Sea"
      ],
      "answer": "Lake Tanganyika",
      "point": "Lake Tanganyika, in Africa, is the second-deepest lake in the world (after Lake Baikal).",
      "typed": "Lake Tanganyika",
      "map": {
        "kind": "world",
        "place": "Lake Tanganyika",
        "where": "Africa",
        "note": "In East Africa, between Tanzania and Congo."
      }
    },
    {
      "key": "s6-g-great-lakes",
      "level": "medium",
      "q": "The Great Lakes are in which continent?",
      "options": [
        "Asia",
        "Africa",
        "North America",
        "Europe"
      ],
      "answer": "North America",
      "point": "The Great Lakes — Superior, Michigan, Huron, Erie and Ontario — are in North America.",
      "typed": "North America",
      "map": {
        "kind": "world",
        "place": "Great Lakes",
        "where": "North America",
        "note": "Between the USA and Canada."
      }
    },
    {
      "key": "s6-g-dead-sea",
      "level": "medium",
      "q": "Which lake is so salty that you can float in it?",
      "options": [
        "Dead Sea",
        "Lake Victoria",
        "Caspian Sea",
        "Lake Baikal"
      ],
      "answer": "Dead Sea",
      "point": "The Dead Sea, between Israel and Jordan, is so salty that you can float in it.",
      "typed": "Dead Sea",
      "map": {
        "kind": "world",
        "place": "Dead Sea",
        "where": "Asia",
        "note": "Between Israel and Jordan — the lowest place on land."
      }
    },
    {
      "key": "s6-g-niagara",
      "level": "medium",
      "q": "Niagara Falls is between which two countries?",
      "options": [
        "USA and Mexico",
        "USA and Brazil",
        "Canada and Mexico",
        "United States and Canada"
      ],
      "answer": "United States and Canada",
      "point": "Niagara Falls is between the United States and Canada.",
      "typed": "United States and Canada",
      "map": {
        "kind": "world",
        "place": "Niagara Falls",
        "where": "North America",
        "note": "Between the USA and Canada."
      }
    },
    {
      "key": "s6-g-victoria-falls",
      "level": "medium",
      "q": "Victoria Falls is on the border of which two countries?",
      "options": [
        "Kenya and Tanzania",
        "South Africa and Botswana",
        "Zambia and Namibia",
        "Zambia and Zimbabwe"
      ],
      "answer": "Zambia and Zimbabwe",
      "point": "Victoria Falls is on the border of Zambia and Zimbabwe, in Africa.",
      "typed": "Zambia and Zimbabwe",
      "map": {
        "kind": "world",
        "place": "Victoria Falls",
        "where": "Africa",
        "note": "On the border of Zambia and Zimbabwe."
      }
    },
    {
      "key": "s6-g-jog",
      "level": "medium",
      "q": "Which is the highest waterfall in India?",
      "options": [
        "Athirappilly Falls",
        "Jog Falls",
        "Chitrakote Falls",
        "Dudhsagar Falls"
      ],
      "answer": "Jog Falls",
      "point": "Jog Falls, in Karnataka, is the highest waterfall in India.",
      "typed": "Jog Falls",
      "map": {
        "kind": "india",
        "place": "Jog Falls",
        "where": "South India (Karnataka)",
        "note": "In Karnataka, in South India."
      }
    },
    {
      "key": "s6-g-thames",
      "level": "easy",
      "q": "Which river flows through London?",
      "options": [
        "Seine",
        "Rhine",
        "Thames",
        "Danube"
      ],
      "answer": "Thames",
      "point": "The River Thames flows through London, in the United Kingdom.",
      "typed": "Thames",
      "map": {
        "kind": "world",
        "place": "Thames River",
        "where": "Europe",
        "note": "In England — it flows through London."
      }
    },
    {
      "key": "s6-g-seine",
      "level": "easy",
      "q": "Which river flows through Paris?",
      "options": [
        "Thames",
        "Seine",
        "Rhine",
        "Danube"
      ],
      "answer": "Seine",
      "point": "The River Seine flows through Paris, in France.",
      "typed": "Seine",
      "map": {
        "kind": "world",
        "place": "Seine River",
        "where": "Europe",
        "note": "In France — it flows through Paris."
      }
    },
    {
      "key": "s6-g-danube-vienna",
      "level": "medium",
      "q": "Which river flows through Vienna?",
      "options": [
        "Thames",
        "Rhine",
        "Danube",
        "Volga"
      ],
      "answer": "Danube",
      "point": "The River Danube flows through Vienna, in Austria.",
      "typed": "Danube",
      "map": {
        "kind": "world",
        "place": "Danube River",
        "where": "Europe",
        "note": "In Europe — it flows through Vienna."
      }
    },
    {
      "key": "s6-g-rhine",
      "level": "medium",
      "q": "Which river flows through Germany and the Netherlands?",
      "options": [
        "Rhine",
        "Volga",
        "Danube",
        "Seine"
      ],
      "answer": "Rhine",
      "point": "The River Rhine flows through Germany and the Netherlands, into the North Sea.",
      "typed": "Rhine",
      "map": {
        "kind": "world",
        "place": "Rhine River",
        "where": "Europe",
        "note": "In Germany and the Netherlands."
      }
    },
    {
      "key": "s6-g-mekong",
      "level": "medium",
      "q": "The Mekong flows through which part of Asia?",
      "options": [
        "South Asia",
        "Central Asia",
        "South-East Asia",
        "East Asia"
      ],
      "answer": "South-East Asia",
      "point": "The Mekong flows through South-East Asia — China, Myanmar, Laos, Thailand, Cambodia and Vietnam.",
      "typed": "South-East Asia",
      "map": {
        "kind": "world",
        "place": "Mekong River",
        "where": "East & South-East Asia",
        "note": "In South-East Asia."
      }
    },
    {
      "key": "s6-g-indus",
      "level": "medium",
      "q": "Which river flows through Pakistan?",
      "options": [
        "Ganga",
        "Indus",
        "Yamuna",
        "Brahmaputra"
      ],
      "answer": "Indus",
      "point": "The River Indus flows through Pakistan.",
      "typed": "Indus",
      "map": {
        "kind": "world",
        "place": "Indus River",
        "where": "Asia",
        "note": "In Pakistan."
      }
    },
    {
      "key": "s6-g-tigris-euphrates",
      "level": "medium",
      "q": "Which two rivers flow through Iraq?",
      "options": [
        "Nile and Indus",
        "Danube and Rhine",
        "Ganga and Yamuna",
        "Tigris and Euphrates"
      ],
      "answer": "Tigris and Euphrates",
      "point": "The Tigris and the Euphrates flow through Iraq.",
      "typed": "Tigris and Euphrates",
      "map": {
        "kind": "world",
        "place": "Tigris River",
        "where": "Iraq",
        "note": "In Iraq — the Tigris flows through Baghdad."
      }
    },
    {
      "key": "s6-g-yellow",
      "level": "medium",
      "q": "The Yellow River is in which country?",
      "options": [
        "India",
        "Vietnam",
        "Mongolia",
        "China"
      ],
      "answer": "China",
      "point": "The Yellow River is in China.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "Yellow River",
        "where": "Asia",
        "note": "In China."
      }
    },
    {
      "key": "s6-g-godavari",
      "level": "medium",
      "q": "Which is the longest river in South India?",
      "options": [
        "Godavari",
        "Narmada",
        "Kaveri",
        "Krishna"
      ],
      "answer": "Godavari",
      "point": "The Godavari is the longest river in South India.",
      "typed": "Godavari",
      "map": {
        "kind": "india",
        "place": "Godavari River",
        "where": "South India",
        "note": "In South India."
      }
    },
    {
      "key": "s6-g-yamuna-delhi",
      "level": "medium",
      "q": "Which river flows through New Delhi?",
      "options": [
        "Ganga",
        "Godavari",
        "Narmada",
        "Yamuna"
      ],
      "answer": "Yamuna",
      "point": "The River Yamuna flows through New Delhi.",
      "typed": "Yamuna",
      "map": {
        "kind": "india",
        "place": "Yamuna River",
        "where": "North India",
        "note": "In North India — it flows through New Delhi."
      }
    },
    {
      "key": "s6-g-kili-country",
      "level": "medium",
      "q": "Mount Kilimanjaro is in which country?",
      "options": [
        "Uganda",
        "Ethiopia",
        "Kenya",
        "Tanzania"
      ],
      "answer": "Tanzania",
      "point": "Mount Kilimanjaro is in Tanzania, in East Africa.",
      "typed": "Tanzania",
      "map": {
        "kind": "world",
        "place": "Kilimanjaro",
        "where": "Africa",
        "note": "In Tanzania, in East Africa."
      }
    },
    {
      "key": "s6-g-acon-country",
      "level": "medium",
      "q": "Aconcagua is in which country?",
      "options": [
        "Argentina",
        "Brazil",
        "Chile",
        "Peru"
      ],
      "answer": "Argentina",
      "point": "Aconcagua is in Argentina, in South America.",
      "typed": "Argentina",
      "map": {
        "kind": "world",
        "place": "Aconcagua",
        "where": "South America",
        "note": "In Argentina, in the Andes."
      }
    },
    {
      "key": "s6-g-denali-country",
      "level": "medium",
      "q": "Denali is in which country?",
      "options": [
        "United States",
        "Russia",
        "Canada",
        "Mexico"
      ],
      "answer": "United States",
      "point": "Denali is in the United States (Alaska), in North America.",
      "typed": "United States",
      "accept": [
        "usa",
        "us",
        "america"
      ],
      "map": {
        "kind": "world",
        "place": "Denali",
        "where": "North America",
        "note": "In Alaska, USA."
      }
    },
    {
      "key": "s6-g-elbrus-country",
      "level": "medium",
      "q": "Mount Elbrus is in which country?",
      "options": [
        "Ukraine",
        "Russia",
        "Turkey",
        "Georgia"
      ],
      "answer": "Russia",
      "point": "Mount Elbrus is in Russia, in Europe.",
      "typed": "Russia",
      "map": {
        "kind": "world",
        "place": "Mount Elbrus",
        "where": "Europe",
        "note": "In Russia, in the Caucasus."
      }
    },
    {
      "key": "s6-g-puncak-country",
      "level": "medium",
      "q": "Puncak Jaya is in which country?",
      "options": [
        "Australia",
        "Indonesia",
        "Papua New Guinea",
        "Malaysia"
      ],
      "answer": "Indonesia",
      "point": "Puncak Jaya is in Indonesia, in Oceania.",
      "typed": "Indonesia",
      "map": {
        "kind": "world",
        "place": "Puncak Jaya",
        "where": "Australia",
        "note": "In Indonesia, on the island of New Guinea."
      }
    },
    {
      "key": "s6-g-majuli",
      "level": "medium",
      "q": "Which is the largest river island in the world?",
      "options": [
        "Sri Lanka",
        "Majuli",
        "Madagascar",
        "Borneo"
      ],
      "answer": "Majuli",
      "point": "Majuli, in Assam on the Brahmaputra, is the largest river island in the world.",
      "typed": "Majuli",
      "map": {
        "kind": "india",
        "place": "Majuli",
        "where": "North-East India (Assam)",
        "note": "In Assam, on the Brahmaputra river."
      }
    },
    {
      "key": "s6-g-philippine-sea",
      "level": "hard",
      "q": "Which is the largest sea in the world?",
      "options": [
        "Mediterranean Sea",
        "Philippine Sea",
        "South China Sea",
        "Arabian Sea"
      ],
      "answer": "Philippine Sea",
      "point": "The Philippine Sea, east of the Philippines, is the largest sea in the world.",
      "typed": "Philippine Sea",
      "map": {
        "kind": "world",
        "place": "Philippine Sea",
        "where": "Asia",
        "note": "East of the Philippines, in the Pacific Ocean."
      }
    },
    {
      "key": "s6-g-deepest-ocean",
      "level": "medium",
      "q": "Which is the deepest ocean?",
      "options": [
        "Atlantic Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
        "Indian Ocean"
      ],
      "answer": "Pacific Ocean",
      "point": "The Pacific Ocean is the deepest ocean — the Mariana Trench is in it.",
      "typed": "Pacific Ocean",
      "map": {
        "kind": "world",
        "place": "Pacific Ocean",
        "where": "East of Asia",
        "note": "East of Asia — the largest and deepest ocean."
      }
    },
    {
      "key": "s6-g-tigris-baghdad",
      "level": "medium",
      "q": "Which river flows through Baghdad?",
      "options": [
        "Indus",
        "Nile",
        "Tigris",
        "Euphrates"
      ],
      "answer": "Tigris",
      "point": "The River Tigris flows through Baghdad, in Iraq.",
      "typed": "Tigris",
      "map": {
        "kind": "world",
        "place": "Tigris River",
        "where": "Iraq",
        "note": "In Iraq — the Tigris flows through Baghdad."
      }
    },
    {
      "key": "s6-g-tiber",
      "level": "medium",
      "q": "Which river flows through Rome?",
      "options": [
        "Danube",
        "Arno",
        "Po",
        "Tiber"
      ],
      "answer": "Tiber",
      "point": "The River Tiber flows through Rome, in Italy.",
      "typed": "Tiber",
      "map": {
        "kind": "world",
        "place": "Tiber River",
        "where": "Europe",
        "note": "In Italy — it flows through Rome."
      }
    },
    {
      "key": "s6-g-spree",
      "level": "hard",
      "q": "Which river flows through Berlin?",
      "options": [
        "Spree",
        "Elbe",
        "Danube",
        "Rhine"
      ],
      "answer": "Spree",
      "point": "The River Spree flows through Berlin, in Germany.",
      "typed": "Spree",
      "map": {
        "kind": "world",
        "place": "Spree River",
        "where": "Europe",
        "note": "In Germany — it flows through Berlin."
      }
    },
    {
      "key": "s6-g-chihuahuan",
      "level": "hard",
      "q": "Which is the largest desert in North America?",
      "options": [
        "Mojave Desert",
        "Sonoran Desert",
        "Great Basin Desert",
        "Chihuahuan Desert"
      ],
      "answer": "Chihuahuan Desert",
      "point": "The Chihuahuan Desert, in Mexico and the USA, is the largest desert in North America.",
      "typed": "Chihuahuan Desert",
      "map": {
        "kind": "world",
        "place": "Chihuahuan Desert",
        "where": "North America",
        "note": "In Mexico and the USA."
      }
    },
    {
      "key": "s6-g-baikal-country",
      "level": "medium",
      "q": "Lake Baikal is in which country?",
      "options": [
        "Russia",
        "Kazakhstan",
        "China",
        "Mongolia"
      ],
      "answer": "Russia",
      "point": "Lake Baikal, the deepest lake in the world, is in Russia.",
      "typed": "Russia",
      "map": {
        "kind": "world",
        "place": "Lake Baikal",
        "where": "Europe and Asia",
        "note": "In Russia, in Siberia."
      }
    },
    {
      "key": "s6-g-titicaca",
      "level": "hard",
      "q": "Which is the largest lake in South America?",
      "options": [
        "Lake Poopo",
        "Lake Argentino",
        "Lake Titicaca",
        "Lake Maracaibo"
      ],
      "answer": "Lake Titicaca",
      "point": "Lake Titicaca, between Peru and Bolivia, is the largest lake in South America.",
      "typed": "Lake Titicaca",
      "map": {
        "kind": "world",
        "place": "Lake Titicaca",
        "where": "South America",
        "note": "Between Peru and Bolivia, high in the Andes."
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
        "Makkah",
        "Baghdad",
        "Jerusalem"
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
        "Makkah",
        "Jerusalem",
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
        "Madinah",
        "Makkah",
        "Jerusalem",
        "Baghdad"
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
        "Damascus",
        "Cairo",
        "Baghdad",
        "Istanbul"
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
        "Damascus",
        "Istanbul",
        "Baghdad",
        "Cairo"
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
        "Baghdad",
        "Istanbul",
        "Ankara"
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
        "Makkah",
        "Najaf",
        "Karbala",
        "Madinah"
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
        "Karbala",
        "Baghdad",
        "Cairo"
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
        "Turkey",
        "Spain",
        "Egypt",
        "Morocco"
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
        "Italy",
        "Egypt",
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
    },
    {
      "key": "s7-g11",
      "level": "hard",
      "q": "Dome of the Rock is in which city?",
      "options": [
        "Nazareth",
        "Hebron",
        "Jerusalem",
        "Bethlehem"
      ],
      "answer": "Jerusalem",
      "point": "The Dome of the Rock is in Jerusalem, in Palestine.",
      "typed": "Jerusalem",
      "map": {
        "kind": "world",
        "place": "Jerusalem",
        "where": "Palestine",
        "note": "In Palestine, on the east side of the Mediterranean Sea."
      }
    },
    {
      "key": "s7-g12",
      "level": "hard",
      "q": "Western Wall is in which city?",
      "options": [
        "Haifa",
        "Jerusalem",
        "Bethlehem",
        "Tel Aviv"
      ],
      "answer": "Jerusalem",
      "point": "The Western Wall is in Jerusalem, in Palestine.",
      "typed": "Jerusalem",
      "map": {
        "kind": "world",
        "place": "Jerusalem",
        "where": "Palestine",
        "note": "In Palestine, on the east side of the Mediterranean Sea."
      }
    },
    {
      "key": "s7-g13",
      "level": "hard",
      "q": "Church of the Holy Sepulchre is in which city?",
      "options": [
        "Nazareth",
        "Bethlehem",
        "Cairo",
        "Jerusalem"
      ],
      "answer": "Jerusalem",
      "point": "The Church of the Holy Sepulchre is in Jerusalem, in Palestine.",
      "typed": "Jerusalem",
      "map": {
        "kind": "world",
        "place": "Jerusalem",
        "where": "Palestine",
        "note": "In Palestine, on the east side of the Mediterranean Sea."
      }
    },
    {
      "key": "s7-g14",
      "level": "medium",
      "q": "Bethlehem is in which country?",
      "options": [
        "Israel",
        "Jordan",
        "Syria",
        "Palestine"
      ],
      "answer": "Palestine",
      "point": "Bethlehem is in Palestine — the birthplace of Jesus (Isa AS).",
      "typed": "Palestine",
      "map": {
        "kind": "world",
        "place": "Bethlehem",
        "where": "Palestine",
        "note": "In Palestine, south of Jerusalem."
      }
    },
    {
      "key": "s7-g15",
      "level": "easy",
      "q": "Masjid al-Haram is in which city?",
      "options": [
        "Makkah",
        "Madinah",
        "Jerusalem",
        "Cairo"
      ],
      "answer": "Makkah",
      "point": "Masjid al-Haram, the largest mosque in the world, is in Makkah.",
      "typed": "Makkah",
      "map": {
        "kind": "world",
        "place": "Makkah",
        "where": "Saudi Arabia",
        "note": "In Saudi Arabia, on the western side, near the Red Sea."
      }
    },
    {
      "key": "s7-g16",
      "level": "easy",
      "q": "The Ka'ba is in which city?",
      "options": [
        "Jerusalem",
        "Madinah",
        "Makkah",
        "Baghdad"
      ],
      "answer": "Makkah",
      "point": "The Ka'ba is in Makkah, in Saudi Arabia.",
      "typed": "Makkah",
      "map": {
        "kind": "world",
        "place": "Makkah",
        "where": "Saudi Arabia",
        "note": "In Saudi Arabia, on the western side, near the Red Sea."
      }
    },
    {
      "key": "s7-g17",
      "level": "medium",
      "q": "Hagia Sophia is in which city?",
      "options": [
        "Istanbul",
        "Cairo",
        "Baghdad",
        "Ankara"
      ],
      "answer": "Istanbul",
      "point": "Hagia Sophia is in Istanbul, in Turkey.",
      "typed": "Istanbul",
      "map": {
        "kind": "world",
        "place": "Istanbul",
        "where": "Turkey",
        "note": "In Turkey, between Europe and Asia."
      }
    },
    {
      "key": "s7-g18",
      "level": "medium",
      "q": "Blue Mosque is in which city?",
      "options": [
        "Istanbul",
        "Damascus",
        "Ankara",
        "Cairo"
      ],
      "answer": "Istanbul",
      "point": "The Blue Mosque is in Istanbul, in Turkey.",
      "typed": "Istanbul",
      "map": {
        "kind": "world",
        "place": "Istanbul",
        "where": "Turkey",
        "note": "In Turkey, between Europe and Asia."
      }
    },
    {
      "key": "s7-g19",
      "level": "medium",
      "q": "Sheikh Zayed Grand Mosque is in which city?",
      "options": [
        "Doha",
        "Dubai",
        "Abu Dhabi",
        "Riyadh"
      ],
      "answer": "Abu Dhabi",
      "point": "The Sheikh Zayed Grand Mosque is in Abu Dhabi, in the UAE.",
      "typed": "Abu Dhabi",
      "map": {
        "kind": "world",
        "place": "Abu Dhabi",
        "where": "UAE",
        "note": "On the Arabian Peninsula, next to Saudi Arabia and Oman."
      }
    },
    {
      "key": "s7-g20",
      "level": "hard",
      "q": "Qom is in which country?",
      "options": [
        "Afghanistan",
        "Iraq",
        "Iran",
        "Turkey"
      ],
      "answer": "Iran",
      "point": "Qom is a holy city in Iran.",
      "typed": "Iran",
      "map": {
        "kind": "world",
        "place": "Qom",
        "where": "Iran",
        "note": "In Iran, south of Tehran."
      }
    },
    {
      "key": "s7-g21",
      "level": "hard",
      "q": "Mashhad is in which country?",
      "options": [
        "Turkey",
        "Syria",
        "Iran",
        "Iraq"
      ],
      "answer": "Iran",
      "point": "Mashhad is a holy city in Iran.",
      "typed": "Iran",
      "map": {
        "kind": "world",
        "place": "Mashhad",
        "where": "Iran",
        "note": "In Iran, in the north-east."
      }
    },
    {
      "key": "s7-g22",
      "level": "hard",
      "q": "Kairouan is in which country?",
      "options": [
        "Morocco",
        "Libya",
        "Algeria",
        "Tunisia"
      ],
      "answer": "Tunisia",
      "point": "Kairouan is a holy city in Tunisia, in North Africa.",
      "typed": "Tunisia",
      "map": {
        "kind": "world",
        "place": "Kairouan",
        "where": "Tunisia",
        "note": "In Tunisia, in North Africa."
      }
    },
    {
      "key": "s7-g23",
      "level": "hard",
      "q": "Timbuktu is in which country?",
      "options": [
        "Niger",
        "Mali",
        "Algeria",
        "Senegal"
      ],
      "answer": "Mali",
      "point": "Timbuktu is a famous old city in Mali, in West Africa.",
      "typed": "Mali",
      "map": {
        "kind": "world",
        "place": "Timbuktu",
        "where": "Mali",
        "note": "In Mali, in West Africa."
      }
    },
    {
      "key": "s7-g24",
      "level": "hard",
      "q": "Lalibela is in which country?",
      "options": [
        "Sudan",
        "Egypt",
        "Kenya",
        "Ethiopia"
      ],
      "answer": "Ethiopia",
      "point": "Lalibela, with its rock churches, is in Ethiopia.",
      "typed": "Ethiopia",
      "map": {
        "kind": "world",
        "place": "Lalibela",
        "where": "Ethiopia",
        "note": "In Ethiopia, in East Africa."
      }
    },
    {
      "key": "s7-g25",
      "level": "medium",
      "q": "Golden Temple is in which city?",
      "options": [
        "Lahore",
        "Jaipur",
        "Delhi",
        "Amritsar"
      ],
      "answer": "Amritsar",
      "point": "The Golden Temple is in Amritsar, in Punjab, India.",
      "typed": "Amritsar",
      "map": {
        "kind": "world",
        "place": "Amritsar",
        "where": "India",
        "note": "In Punjab, in North India."
      }
    },
    {
      "key": "s7-g26",
      "level": "medium",
      "q": "Varanasi is in which country?",
      "options": [
        "Nepal",
        "Bangladesh",
        "India",
        "Pakistan"
      ],
      "answer": "India",
      "point": "Varanasi, on the Ganga, is a holy city in India.",
      "typed": "India",
      "map": {
        "kind": "world",
        "place": "Varanasi",
        "where": "India",
        "note": "In Uttar Pradesh, on the Ganga."
      }
    },
    {
      "key": "s7-g27",
      "level": "medium",
      "q": "Bodh Gaya is in which country?",
      "options": [
        "Nepal",
        "India",
        "Myanmar",
        "Sri Lanka"
      ],
      "answer": "India",
      "point": "Bodh Gaya, where the Buddha became enlightened, is in India.",
      "typed": "India",
      "map": {
        "kind": "world",
        "place": "Bodh Gaya",
        "where": "India",
        "note": "In Bihar, in East India."
      }
    },
    {
      "key": "s7-g28",
      "level": "medium",
      "q": "Tirupati is in which country?",
      "options": [
        "India",
        "Bangladesh",
        "Sri Lanka",
        "Nepal"
      ],
      "answer": "India",
      "point": "Tirupati, with its famous temple, is in India (Andhra Pradesh).",
      "typed": "India",
      "map": {
        "kind": "world",
        "place": "Tirupati",
        "where": "India",
        "note": "In Andhra Pradesh, in South India."
      }
    },
    {
      "key": "s7-g29",
      "level": "medium",
      "q": "Ajmer Sharif is in which country?",
      "options": [
        "India",
        "Nepal",
        "Bangladesh",
        "Pakistan"
      ],
      "answer": "India",
      "point": "Ajmer Sharif, the dargah of Khwaja Moinuddin Chishti, is in India (Rajasthan).",
      "typed": "India",
      "map": {
        "kind": "world",
        "place": "Ajmer",
        "where": "India",
        "note": "In Rajasthan, in West India."
      }
    },
    {
      "key": "s7-g30",
      "level": "medium",
      "q": "Angkor Wat is in which country?",
      "options": [
        "Laos",
        "Cambodia",
        "Vietnam",
        "Thailand"
      ],
      "answer": "Cambodia",
      "point": "Angkor Wat, the largest temple in the world, is in Cambodia.",
      "typed": "Cambodia",
      "map": {
        "kind": "world",
        "place": "Angkor Wat",
        "where": "Cambodia",
        "note": "In Cambodia, in South-East Asia."
      }
    },
    {
      "key": "s7-g31",
      "level": "medium",
      "q": "Borobudur is in which country?",
      "options": [
        "Indonesia",
        "Malaysia",
        "Thailand",
        "Philippines"
      ],
      "answer": "Indonesia",
      "point": "Borobudur, the largest Buddhist temple, is in Indonesia.",
      "typed": "Indonesia",
      "map": {
        "kind": "world",
        "place": "Borobudur",
        "where": "Indonesia",
        "note": "In Indonesia, on the island of Java."
      }
    },
    {
      "key": "s7-g32",
      "level": "hard",
      "q": "Shwedagon Pagoda is in which city?",
      "options": [
        "Mandalay",
        "Hanoi",
        "Bangkok",
        "Yangon"
      ],
      "answer": "Yangon",
      "point": "The Shwedagon Pagoda is in Yangon, in Myanmar.",
      "typed": "Yangon",
      "map": {
        "kind": "world",
        "place": "Yangon",
        "where": "Myanmar",
        "note": "In Myanmar, in South-East Asia."
      }
    },
    {
      "key": "s7-g33",
      "level": "hard",
      "q": "Temple of Heaven is in which city?",
      "options": [
        "Shanghai",
        "Nanjing",
        "Xian",
        "Beijing"
      ],
      "answer": "Beijing",
      "point": "The Temple of Heaven is in Beijing, in China.",
      "typed": "Beijing",
      "map": {
        "kind": "world",
        "place": "Beijing",
        "where": "China",
        "note": "In China — the big country north-east of India."
      }
    },
    {
      "key": "s7-g34",
      "level": "medium",
      "q": "Mount Sinai is in which country?",
      "options": [
        "Saudi Arabia",
        "Jordan",
        "Egypt",
        "Israel"
      ],
      "answer": "Egypt",
      "point": "Mount Sinai, where Musa (AS) received the Torah, is in Egypt.",
      "typed": "Egypt",
      "map": {
        "kind": "world",
        "place": "Mount Sinai",
        "where": "Egypt",
        "note": "In Egypt, on the Sinai Peninsula."
      }
    },
    {
      "key": "s7-g35",
      "level": "medium",
      "q": "St Peter's Basilica is in which country?",
      "options": [
        "France",
        "Vatican City",
        "Spain",
        "Italy"
      ],
      "answer": "Vatican City",
      "point": "St Peter's Basilica is in Vatican City, inside Rome.",
      "typed": "Vatican City",
      "accept": [
        "vatican"
      ],
      "map": {
        "kind": "world",
        "place": "Vatican City",
        "where": "Europe",
        "note": "Inside Rome, in Italy — the smallest country in the world."
      }
    },
    {
      "key": "s7-g36",
      "level": "easy",
      "q": "Eiffel Tower is in which country?",
      "options": [
        "France",
        "United Kingdom",
        "Spain",
        "Italy"
      ],
      "answer": "France",
      "point": "The Eiffel Tower is in France, in Paris.",
      "typed": "France",
      "map": {
        "kind": "world",
        "place": "Eiffel Tower",
        "where": "France",
        "note": "In Paris, France."
      }
    },
    {
      "key": "s7-g37",
      "level": "easy",
      "q": "Big Ben is in which country?",
      "options": [
        "Ireland",
        "United Kingdom",
        "France",
        "Netherlands"
      ],
      "answer": "United Kingdom",
      "point": "Big Ben is in the United Kingdom, in London.",
      "typed": "United Kingdom",
      "accept": [
        "uk",
        "britain"
      ],
      "map": {
        "kind": "world",
        "place": "Big Ben",
        "where": "United Kingdom",
        "note": "In London, England."
      }
    },
    {
      "key": "s7-g38",
      "level": "easy",
      "q": "Statue of Liberty is in which country?",
      "options": [
        "United Kingdom",
        "Canada",
        "United States",
        "France"
      ],
      "answer": "United States",
      "point": "The Statue of Liberty is in the United States, in New York.",
      "typed": "United States",
      "accept": [
        "usa",
        "us",
        "america"
      ],
      "map": {
        "kind": "world",
        "place": "Statue of Liberty",
        "where": "United States",
        "note": "In New York, USA."
      }
    },
    {
      "key": "s7-g39",
      "level": "easy",
      "q": "Great Wall is in which country?",
      "options": [
        "India",
        "Japan",
        "China",
        "Mongolia"
      ],
      "answer": "China",
      "point": "The Great Wall is in China — the longest wall in the world.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "Great Wall",
        "where": "China",
        "note": "In China — the big country north-east of India."
      }
    },
    {
      "key": "s7-g40",
      "level": "easy",
      "q": "Taj Mahal is in which city?",
      "options": [
        "Jaipur",
        "Delhi",
        "Lucknow",
        "Agra"
      ],
      "answer": "Agra",
      "point": "The Taj Mahal is in Agra, in India.",
      "typed": "Agra",
      "map": {
        "kind": "world",
        "place": "Agra",
        "where": "India",
        "note": "In Uttar Pradesh, in North India."
      }
    },
    {
      "key": "s7-g41",
      "level": "easy",
      "q": "Pyramids of Giza is in which country?",
      "options": [
        "Turkey",
        "Egypt",
        "Sudan",
        "Iraq"
      ],
      "answer": "Egypt",
      "point": "The Pyramids of Giza are in Egypt, near Cairo.",
      "typed": "Egypt",
      "map": {
        "kind": "world",
        "place": "Pyramids of Giza",
        "where": "Egypt",
        "note": "In Egypt, near Cairo, on the Nile."
      }
    },
    {
      "key": "s7-g42",
      "level": "medium",
      "q": "The Sphinx is in which country?",
      "options": [
        "Egypt",
        "Sudan",
        "Greece",
        "Iraq"
      ],
      "answer": "Egypt",
      "point": "The Great Sphinx is in Egypt, near the Pyramids of Giza.",
      "typed": "Egypt",
      "map": {
        "kind": "world",
        "place": "The Sphinx",
        "where": "Egypt",
        "note": "In Egypt, near Cairo."
      }
    },
    {
      "key": "s7-g43",
      "level": "easy",
      "q": "Colosseum is in which city?",
      "options": [
        "Athens",
        "Rome",
        "Madrid",
        "Paris"
      ],
      "answer": "Rome",
      "point": "The Colosseum is in Rome, in Italy.",
      "typed": "Rome",
      "map": {
        "kind": "world",
        "place": "Rome",
        "where": "Italy",
        "note": "In Italy — the boot kicking Sicily."
      }
    },
    {
      "key": "s7-g44",
      "level": "medium",
      "q": "Leaning Tower of Pisa is in which country?",
      "options": [
        "Italy",
        "Spain",
        "France",
        "Greece"
      ],
      "answer": "Italy",
      "point": "The Leaning Tower of Pisa is in Italy.",
      "typed": "Italy",
      "map": {
        "kind": "world",
        "place": "Pisa",
        "where": "Italy",
        "note": "In Italy, in the city of Pisa."
      }
    },
    {
      "key": "s7-g45",
      "level": "medium",
      "q": "Sydney Opera House is in which country?",
      "options": [
        "Canada",
        "New Zealand",
        "United Kingdom",
        "Australia"
      ],
      "answer": "Australia",
      "point": "The Sydney Opera House is in Australia, in Sydney.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Sydney",
        "where": "Australia",
        "note": "In Sydney, Australia."
      }
    },
    {
      "key": "s7-g46",
      "level": "medium",
      "q": "Brandenburg Gate is in which city?",
      "options": [
        "Paris",
        "Berlin",
        "Vienna",
        "Munich"
      ],
      "answer": "Berlin",
      "point": "The Brandenburg Gate is in Berlin, in Germany.",
      "typed": "Berlin",
      "map": {
        "kind": "world",
        "place": "Berlin",
        "where": "Germany",
        "note": "In Germany, in the city of Berlin."
      }
    },
    {
      "key": "s7-g47",
      "level": "medium",
      "q": "Red Square is in which city?",
      "options": [
        "St Petersburg",
        "Kyiv",
        "Moscow",
        "Minsk"
      ],
      "answer": "Moscow",
      "point": "Red Square is in Moscow, in Russia.",
      "typed": "Moscow",
      "map": {
        "kind": "world",
        "place": "Moscow",
        "where": "Russia",
        "note": "In Russia — the biggest country."
      }
    },
    {
      "key": "s7-g48",
      "level": "medium",
      "q": "Christ the Redeemer is in which city?",
      "options": [
        "Buenos Aires",
        "Sao Paulo",
        "Lima",
        "Rio de Janeiro"
      ],
      "answer": "Rio de Janeiro",
      "point": "Christ the Redeemer is in Rio de Janeiro, in Brazil.",
      "typed": "Rio de Janeiro",
      "map": {
        "kind": "world",
        "place": "Rio de Janeiro",
        "where": "Brazil",
        "note": "In Brazil, the biggest country in South America."
      }
    },
    {
      "key": "s7-g49",
      "level": "medium",
      "q": "Machu Picchu is in which country?",
      "options": [
        "Chile",
        "Ecuador",
        "Bolivia",
        "Peru"
      ],
      "answer": "Peru",
      "point": "Machu Picchu, the old Inca city, is in Peru.",
      "typed": "Peru",
      "map": {
        "kind": "world",
        "place": "Machu Picchu",
        "where": "Peru",
        "note": "In Peru, in the Andes."
      }
    },
    {
      "key": "s7-g50",
      "level": "medium",
      "q": "Chichen Itza is in which country?",
      "options": [
        "Honduras",
        "Mexico",
        "Guatemala",
        "Belize"
      ],
      "answer": "Mexico",
      "point": "Chichen Itza, the old Maya city, is in Mexico.",
      "typed": "Mexico",
      "map": {
        "kind": "world",
        "place": "Chichen Itza",
        "where": "Mexico",
        "note": "In Mexico, south of the USA."
      }
    },
    {
      "key": "s7-g51",
      "level": "medium",
      "q": "Petra is in which country?",
      "options": [
        "Jordan",
        "Syria",
        "Egypt",
        "Israel"
      ],
      "answer": "Jordan",
      "point": "Petra, the rose-red city, is in Jordan.",
      "typed": "Jordan",
      "map": {
        "kind": "world",
        "place": "Petra",
        "where": "Jordan",
        "note": "In Jordan, in the Middle East."
      }
    },
    {
      "key": "s7-g52",
      "level": "medium",
      "q": "Acropolis is in which city?",
      "options": [
        "Athens",
        "Rome",
        "Istanbul",
        "Cairo"
      ],
      "answer": "Athens",
      "point": "The Acropolis is in Athens, in Greece.",
      "typed": "Athens",
      "map": {
        "kind": "world",
        "place": "Athens",
        "where": "Greece",
        "note": "In Greece, on the Mediterranean Sea."
      }
    },
    {
      "key": "s7-g53",
      "level": "medium",
      "q": "Mount Fuji is in which country?",
      "options": [
        "Japan",
        "South Korea",
        "Indonesia",
        "China"
      ],
      "answer": "Japan",
      "point": "Mount Fuji is in Japan — its highest mountain.",
      "typed": "Japan",
      "map": {
        "kind": "world",
        "place": "Mount Fuji",
        "where": "Japan",
        "note": "In Japan, islands east of China."
      }
    },
    {
      "key": "s7-g54",
      "level": "medium",
      "q": "Uluru is in which country?",
      "options": [
        "South Africa",
        "New Zealand",
        "Australia",
        "India"
      ],
      "answer": "Australia",
      "point": "Uluru, the big red rock, is in Australia.",
      "typed": "Australia",
      "map": {
        "kind": "world",
        "place": "Uluru",
        "where": "Australia",
        "note": "In central Australia."
      }
    },
    {
      "key": "s7-g55",
      "level": "medium",
      "q": "Table Mountain is in which city?",
      "options": [
        "Johannesburg",
        "Pretoria",
        "Cape Town",
        "Durban"
      ],
      "answer": "Cape Town",
      "point": "Table Mountain is in Cape Town, in South Africa.",
      "typed": "Cape Town",
      "map": {
        "kind": "world",
        "place": "Cape Town",
        "where": "South Africa",
        "note": "At the southern tip of Africa."
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
        "Europe",
        "Africa",
        "Antarctica",
        "Australia"
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
        "Atlantic Ocean",
        "Arctic Ocean",
        "Indian Ocean"
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
        "Brahmaputra",
        "Amazon",
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
        "Caspian Sea",
        "Mediterranean Sea",
        "Red Sea",
        "Arabian Sea"
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
        "Asia and Africa",
        "Africa and Australia",
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
        "Bay of Bengal",
        "Arabian Sea",
        "Mediterranean Sea",
        "Red Sea"
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
        "Amazon",
        "Ganga",
        "Indus",
        "Nile"
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
    },
    {
      "key": "s8-g10",
      "level": "easy",
      "q": "Which is the SMALLEST country in the world?",
      "options": [
        "Vatican City",
        "Maldives",
        "Monaco",
        "San Marino"
      ],
      "answer": "Vatican City",
      "point": "Vatican City is the smallest country in the world.",
      "typed": "Vatican City",
      "accept": [
        "vatican"
      ],
      "map": {
        "kind": "world",
        "place": "Vatican City",
        "where": "Europe",
        "note": "Inside Rome, in Italy — the smallest country in the world."
      }
    },
    {
      "key": "s8-g11",
      "level": "medium",
      "q": "Which is the largest island country in the world?",
      "options": [
        "Indonesia",
        "New Zealand",
        "Japan",
        "Madagascar"
      ],
      "answer": "Indonesia",
      "point": "Indonesia is the largest island country in the world.",
      "typed": "Indonesia",
      "map": {
        "kind": "world",
        "place": "Indonesia",
        "where": "Asia",
        "note": "Many islands south-east of Asia, above Australia."
      }
    },
    {
      "key": "s8-g12",
      "level": "medium",
      "q": "Which is the longest wall in the world?",
      "options": [
        "Western Wall",
        "Great Wall of China",
        "Hadrian's Wall",
        "Berlin Wall"
      ],
      "answer": "Great Wall of China",
      "point": "The Great Wall of China (about 21,196 km) is the longest wall in the world.",
      "typed": "Great Wall of China",
      "map": {
        "kind": "world",
        "place": "Great Wall",
        "where": "China",
        "note": "In China — the big country north-east of India."
      }
    },
    {
      "key": "s8-g13",
      "level": "medium",
      "q": "Which is the tallest building in the world?",
      "options": [
        "Shanghai Tower",
        "Burj Khalifa",
        "Eiffel Tower",
        "Empire State Building"
      ],
      "answer": "Burj Khalifa",
      "point": "The Burj Khalifa (828 m) in Dubai is the tallest building in the world.",
      "typed": "Burj Khalifa",
      "map": {
        "kind": "world",
        "place": "Burj Khalifa",
        "where": "UAE",
        "note": "In Dubai, in the UAE."
      }
    },
    {
      "key": "s8-g14",
      "level": "medium",
      "q": "The tallest building in the world is in which city?",
      "options": [
        "Doha",
        "Riyadh",
        "Abu Dhabi",
        "Dubai"
      ],
      "answer": "Dubai",
      "point": "The Burj Khalifa is in Dubai, in the UAE.",
      "typed": "Dubai",
      "map": {
        "kind": "world",
        "place": "Dubai",
        "where": "UAE",
        "note": "On the Arabian Peninsula, next to Saudi Arabia and Oman."
      }
    },
    {
      "key": "s8-g15",
      "level": "medium",
      "q": "Which is the largest rainforest in the world?",
      "options": [
        "Congo Rainforest",
        "Daintree Rainforest",
        "Amazon Rainforest",
        "Black Forest"
      ],
      "answer": "Amazon Rainforest",
      "point": "The Amazon Rainforest, in South America, is the largest rainforest in the world.",
      "typed": "Amazon Rainforest",
      "map": {
        "kind": "world",
        "place": "Amazon Rainforest",
        "where": "South America",
        "note": "In South America — in Brazil and its neighbours."
      }
    },
    {
      "key": "s8-g16",
      "level": "medium",
      "q": "Which is the largest peninsula in the world?",
      "options": [
        "Indian Peninsula",
        "Malay Peninsula",
        "Arabian Peninsula",
        "Korean Peninsula"
      ],
      "answer": "Arabian Peninsula",
      "point": "The Arabian Peninsula is the largest peninsula in the world.",
      "typed": "Arabian Peninsula",
      "map": {
        "kind": "world",
        "place": "Arabian Peninsula",
        "where": "Asia",
        "note": "In the Middle East — Saudi Arabia is the big country on it."
      }
    },
    {
      "key": "s8-g17",
      "level": "medium",
      "q": "Which is the largest delta in the world?",
      "options": [
        "Mekong Delta",
        "Ganges Delta",
        "Nile Delta",
        "Amazon Delta"
      ],
      "answer": "Ganges Delta",
      "point": "The Ganges Delta, in India and Bangladesh, is the largest delta in the world.",
      "typed": "Ganges Delta",
      "map": {
        "kind": "world",
        "place": "Ganges Delta",
        "where": "South Asia",
        "note": "In India and Bangladesh, where the Ganga meets the Bay of Bengal."
      }
    },
    {
      "key": "s8-g18",
      "level": "hard",
      "q": "Which is the hottest place on Earth?",
      "options": [
        "Thar Desert",
        "Death Valley",
        "Dasht-e Lut",
        "Sahara Desert"
      ],
      "answer": "Death Valley",
      "point": "Death Valley, in the USA, is the hottest place on Earth (56.7°C).",
      "typed": "Death Valley",
      "map": {
        "kind": "world",
        "place": "Death Valley",
        "where": "North America",
        "note": "In California, USA."
      }
    },
    {
      "key": "s8-g19",
      "level": "hard",
      "q": "Which is the driest place on Earth?",
      "options": [
        "Sahara Desert",
        "Atacama Desert",
        "Gobi Desert",
        "Thar Desert"
      ],
      "answer": "Atacama Desert",
      "point": "The Atacama Desert, in Chile, is the driest place on Earth.",
      "typed": "Atacama Desert",
      "map": {
        "kind": "world",
        "place": "Atacama Desert",
        "where": "South America",
        "note": "In Chile, in South America."
      }
    },
    {
      "key": "s8-g20",
      "level": "hard",
      "q": "Which is the wettest place on Earth?",
      "options": [
        "Cherrapunji",
        "Mawsynram",
        "Kochi",
        "Singapore"
      ],
      "answer": "Mawsynram",
      "point": "Mawsynram, in Meghalaya, India, is the wettest place on Earth.",
      "typed": "Mawsynram",
      "map": {
        "kind": "india",
        "place": "Mawsynram",
        "where": "North-East India (Meghalaya)",
        "note": "In Meghalaya, in the north-east of India."
      }
    },
    {
      "key": "s8-g21",
      "level": "hard",
      "q": "Which is the deepest lake in the world?",
      "options": [
        "Lake Tanganyika",
        "Caspian Sea",
        "Lake Baikal",
        "Lake Superior"
      ],
      "answer": "Lake Baikal",
      "point": "Lake Baikal (1,642 m deep) in Russia is the deepest lake in the world.",
      "typed": "Lake Baikal",
      "map": {
        "kind": "world",
        "place": "Lake Baikal",
        "where": "Europe and Asia",
        "note": "In Russia, in Siberia."
      }
    },
    {
      "key": "s8-g22",
      "level": "medium",
      "q": "Which is the largest freshwater lake in the world?",
      "options": [
        "Lake Tanganyika",
        "Lake Victoria",
        "Lake Baikal",
        "Lake Superior"
      ],
      "answer": "Lake Superior",
      "point": "Lake Superior, in North America, is the largest freshwater lake in the world.",
      "typed": "Lake Superior",
      "map": {
        "kind": "world",
        "place": "Lake Superior",
        "where": "North America",
        "note": "Between the USA and Canada — one of the Great Lakes."
      }
    },
    {
      "key": "s8-g23",
      "level": "medium",
      "q": "Which is the second-longest river in the world?",
      "options": [
        "Nile",
        "Yangtze",
        "Amazon",
        "Mississippi"
      ],
      "answer": "Amazon",
      "point": "The Amazon (about 6,400 km) is the second-longest river in the world, after the Nile.",
      "typed": "Amazon",
      "map": {
        "kind": "world",
        "place": "Amazon River",
        "where": "South America",
        "note": "In South America — it flows into the Atlantic Ocean."
      }
    },
    {
      "key": "s8-g24",
      "level": "hard",
      "q": "Which is the highest OFFICIAL capital city in the world?",
      "options": [
        "Bogota",
        "Quito",
        "Kathmandu",
        "La Paz"
      ],
      "answer": "Quito",
      "point": "Quito, the capital of Ecuador (2,850 m), is the highest official capital city in the world. La Paz, in Bolivia, is higher (3,650 m), but Sucre is the official capital.",
      "typed": "Quito",
      "map": {
        "kind": "world",
        "place": "Quito",
        "where": "South America",
        "note": "In Ecuador, in South America."
      }
    },
    {
      "key": "s8-g25",
      "level": "hard",
      "q": "Which is the highest waterfall in the world?",
      "options": [
        "Jog Falls",
        "Niagara Falls",
        "Angel Falls",
        "Victoria Falls"
      ],
      "answer": "Angel Falls",
      "point": "Angel Falls (979 m) in Venezuela is the highest waterfall in the world.",
      "typed": "Angel Falls",
      "map": {
        "kind": "world",
        "place": "Angel Falls",
        "where": "South America",
        "note": "In Venezuela, in South America."
      }
    },
    {
      "key": "s8-g26",
      "level": "medium",
      "q": "Which is the largest mosque in the world?",
      "options": [
        "Masjid al-Haram",
        "Blue Mosque",
        "Masjid an-Nabawi",
        "Sheikh Zayed Grand Mosque"
      ],
      "answer": "Masjid al-Haram",
      "point": "Masjid al-Haram, in Makkah, is the largest mosque in the world.",
      "typed": "Masjid al-Haram",
      "map": {
        "kind": "world",
        "place": "Makkah",
        "where": "Saudi Arabia",
        "note": "In Saudi Arabia, on the western side, near the Red Sea."
      }
    },
    {
      "key": "s8-g27",
      "level": "medium",
      "q": "Which is the second-largest country in the world?",
      "options": [
        "China",
        "USA",
        "Canada",
        "Brazil"
      ],
      "answer": "Canada",
      "point": "Canada is the second-largest country in the world, after Russia.",
      "typed": "Canada",
      "map": {
        "kind": "world",
        "place": "Canada",
        "where": "North America",
        "note": "North of the USA — the second-largest country in the world."
      }
    },
    {
      "key": "s8-g28",
      "level": "medium",
      "q": "Which country has the second-largest population in the world?",
      "options": [
        "Indonesia",
        "USA",
        "China",
        "Pakistan"
      ],
      "answer": "China",
      "point": "China has the second-largest population in the world, after India.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s8-g29",
      "level": "hard",
      "q": "Which is the longest land border in the world?",
      "options": [
        "India–Pakistan border",
        "Canada–USA border",
        "Russia–China border",
        "USA–Mexico border"
      ],
      "answer": "Canada–USA border",
      "point": "The Canada–USA border is the longest land border in the world.",
      "typed": "Canada–USA border",
      "map": {
        "kind": "world",
        "place": "Canada",
        "where": "North America",
        "note": "North of the USA — the second-largest country in the world."
      }
    },
    {
      "key": "s8-g30",
      "level": "medium",
      "q": "Which is the largest island in Asia?",
      "options": [
        "Sumatra",
        "Borneo",
        "Java",
        "Sulawesi"
      ],
      "answer": "Borneo",
      "point": "Borneo is the largest island in Asia.",
      "typed": "Borneo",
      "map": {
        "kind": "world",
        "place": "Borneo",
        "where": "Asia",
        "note": "In South-East Asia — Brunei, Malaysia and Indonesia share it."
      }
    },
    {
      "key": "s8-g31",
      "level": "medium",
      "q": "Which is the largest lake in Africa?",
      "options": [
        "Lake Malawi",
        "Lake Chad",
        "Lake Victoria",
        "Lake Tanganyika"
      ],
      "answer": "Lake Victoria",
      "point": "Lake Victoria is the largest lake in Africa.",
      "typed": "Lake Victoria",
      "map": {
        "kind": "world",
        "place": "Lake Victoria",
        "where": "Africa",
        "note": "In East Africa — the Nile starts here."
      }
    },
    {
      "key": "s8-g32",
      "level": "medium",
      "q": "Which is the largest city in the world?",
      "options": [
        "Shanghai",
        "Sao Paulo",
        "Tokyo",
        "Delhi"
      ],
      "answer": "Tokyo",
      "point": "Tokyo, in Japan, is the largest city in the world.",
      "typed": "Tokyo",
      "map": {
        "kind": "world",
        "place": "Tokyo",
        "where": "Japan",
        "note": "In Japan, islands east of China."
      }
    },
    {
      "key": "s8-g33",
      "level": "medium",
      "q": "Which is the largest island in Europe?",
      "options": [
        "Great Britain",
        "Sicily",
        "Iceland",
        "Ireland"
      ],
      "answer": "Great Britain",
      "point": "Great Britain is the largest island in Europe.",
      "typed": "Great Britain",
      "map": {
        "kind": "world",
        "place": "Great Britain",
        "where": "Europe",
        "note": "Islands north-west of Europe — England, Scotland and Wales."
      }
    },
    {
      "key": "s8-g34",
      "level": "medium",
      "q": "Which is the largest island in Africa?",
      "options": [
        "Mauritius",
        "Zanzibar",
        "Madagascar",
        "Seychelles"
      ],
      "answer": "Madagascar",
      "point": "Madagascar is the largest island in Africa.",
      "typed": "Madagascar",
      "map": {
        "kind": "world",
        "place": "Madagascar",
        "where": "Africa",
        "note": "A big island off the south-east coast of Africa."
      }
    },
    {
      "key": "s8-g35",
      "level": "medium",
      "q": "Which is the smallest country in Asia?",
      "options": [
        "Singapore",
        "Maldives",
        "Bahrain",
        "Brunei"
      ],
      "answer": "Maldives",
      "point": "Maldives is the smallest country in Asia.",
      "typed": "Maldives",
      "map": {
        "kind": "world",
        "place": "Maldives",
        "where": "Asia",
        "note": "Small islands in the Indian Ocean, south-west of India."
      }
    },
    {
      "key": "s8-g36",
      "level": "medium",
      "q": "Which is the smallest country in Africa?",
      "options": [
        "Gambia",
        "Cape Verde",
        "Seychelles",
        "Mauritius"
      ],
      "answer": "Seychelles",
      "point": "Seychelles is the smallest country in Africa.",
      "typed": "Seychelles",
      "map": {
        "kind": "world",
        "place": "Seychelles",
        "where": "Africa",
        "note": "Small islands in the Indian Ocean, east of Africa."
      }
    },
    {
      "key": "s8-g37",
      "level": "medium",
      "q": "Which is the largest lake in Europe?",
      "options": [
        "Lake Vanern",
        "Lake Geneva",
        "Lake Onega",
        "Lake Ladoga"
      ],
      "answer": "Lake Ladoga",
      "point": "Lake Ladoga, in Russia, is the largest lake in Europe.",
      "typed": "Lake Ladoga",
      "map": {
        "kind": "world",
        "place": "Lake Ladoga",
        "where": "Europe",
        "note": "In Russia, near St Petersburg."
      }
    },
    {
      "key": "s8-g38",
      "level": "hard",
      "q": "Which country has the most land neighbours?",
      "options": [
        "China",
        "Russia",
        "Brazil",
        "India"
      ],
      "answer": "China",
      "point": "China has the most land neighbours in the world — 14 countries.",
      "typed": "China",
      "map": {
        "kind": "world",
        "place": "China",
        "where": "Asia",
        "note": "The big country north-east of India, across the Himalayas."
      }
    },
    {
      "key": "s8-g39",
      "level": "medium",
      "q": "Which is the largest island in the Mediterranean Sea?",
      "options": [
        "Sicily",
        "Corsica",
        "Sardinia",
        "Cyprus"
      ],
      "answer": "Sicily",
      "point": "Sicily, in Italy, is the largest island in the Mediterranean Sea.",
      "typed": "Sicily",
      "map": {
        "kind": "world",
        "place": "Sicily",
        "where": "Europe",
        "note": "In Italy — the island Italy kicks."
      }
    },
    {
      "key": "s8-g40",
      "level": "medium",
      "q": "Which is the largest island in the Caribbean Sea?",
      "options": [
        "Hispaniola",
        "Cuba",
        "Puerto Rico",
        "Jamaica"
      ],
      "answer": "Cuba",
      "point": "Cuba is the largest island in the Caribbean Sea.",
      "typed": "Cuba",
      "map": {
        "kind": "world",
        "place": "Cuba",
        "where": "North America",
        "note": "An island in the Caribbean Sea, south of the USA."
      }
    },
    {
      "key": "s8-g41",
      "level": "medium",
      "q": "Which is the largest desert in Asia?",
      "options": [
        "Karakum Desert",
        "Thar Desert",
        "Gobi Desert",
        "Arabian Desert"
      ],
      "answer": "Gobi Desert",
      "point": "The Gobi Desert is the largest desert in Asia.",
      "typed": "Gobi Desert",
      "map": {
        "kind": "world",
        "place": "Gobi Desert",
        "where": "Asia",
        "note": "In China and Mongolia."
      }
    }
  ]
};

// All 195 capitals (193 UN members + Palestine + Vatican City), for the
// Stage-4 study sheet. [country, capital]
const MAP_GAME_ALL_CAPITALS = [
  [
    "Algeria",
    "Algiers"
  ],
  [
    "Egypt",
    "Cairo"
  ],
  [
    "Libya",
    "Tripoli"
  ],
  [
    "Morocco",
    "Rabat"
  ],
  [
    "Tunisia",
    "Tunis"
  ],
  [
    "Sudan",
    "Khartoum"
  ],
  [
    "South Sudan",
    "Juba"
  ],
  [
    "Ethiopia",
    "Addis Ababa"
  ],
  [
    "Eritrea",
    "Asmara"
  ],
  [
    "Djibouti",
    "Djibouti"
  ],
  [
    "Somalia",
    "Mogadishu"
  ],
  [
    "Kenya",
    "Nairobi"
  ],
  [
    "Uganda",
    "Kampala"
  ],
  [
    "Rwanda",
    "Kigali"
  ],
  [
    "Burundi",
    "Gitega"
  ],
  [
    "Tanzania",
    "Dodoma"
  ],
  [
    "Mozambique",
    "Maputo"
  ],
  [
    "Zambia",
    "Lusaka"
  ],
  [
    "Zimbabwe",
    "Harare"
  ],
  [
    "Malawi",
    "Lilongwe"
  ],
  [
    "Botswana",
    "Gaborone"
  ],
  [
    "Namibia",
    "Windhoek"
  ],
  [
    "South Africa",
    "Pretoria"
  ],
  [
    "Lesotho",
    "Maseru"
  ],
  [
    "Eswatini",
    "Mbabane"
  ],
  [
    "Madagascar",
    "Antananarivo"
  ],
  [
    "Mauritius",
    "Port Louis"
  ],
  [
    "Seychelles",
    "Victoria"
  ],
  [
    "Comoros",
    "Moroni"
  ],
  [
    "Cape Verde",
    "Praia"
  ],
  [
    "Sao Tome and Principe",
    "Sao Tome"
  ],
  [
    "Nigeria",
    "Abuja"
  ],
  [
    "Ghana",
    "Accra"
  ],
  [
    "Ivory Coast",
    "Yamoussoukro"
  ],
  [
    "Senegal",
    "Dakar"
  ],
  [
    "Mali",
    "Bamako"
  ],
  [
    "Burkina Faso",
    "Ouagadougou"
  ],
  [
    "Niger",
    "Niamey"
  ],
  [
    "Guinea",
    "Conakry"
  ],
  [
    "Guinea-Bissau",
    "Bissau"
  ],
  [
    "Sierra Leone",
    "Freetown"
  ],
  [
    "Liberia",
    "Monrovia"
  ],
  [
    "Togo",
    "Lome"
  ],
  [
    "Benin",
    "Porto-Novo"
  ],
  [
    "Cameroon",
    "Yaounde"
  ],
  [
    "Central African Republic",
    "Bangui"
  ],
  [
    "Chad",
    "N'Djamena"
  ],
  [
    "Congo",
    "Brazzaville"
  ],
  [
    "Dem. Rep. of Congo",
    "Kinshasa"
  ],
  [
    "Gabon",
    "Libreville"
  ],
  [
    "Equatorial Guinea",
    "Malabo"
  ],
  [
    "Angola",
    "Luanda"
  ],
  [
    "Mauritania",
    "Nouakchott"
  ],
  [
    "Gambia",
    "Banjul"
  ],
  [
    "Afghanistan",
    "Kabul"
  ],
  [
    "Armenia",
    "Yerevan"
  ],
  [
    "Azerbaijan",
    "Baku"
  ],
  [
    "Bahrain",
    "Manama"
  ],
  [
    "Bangladesh",
    "Dhaka"
  ],
  [
    "Bhutan",
    "Thimphu"
  ],
  [
    "Brunei",
    "Bandar Seri Begawan"
  ],
  [
    "Cambodia",
    "Phnom Penh"
  ],
  [
    "China",
    "Beijing"
  ],
  [
    "Cyprus",
    "Nicosia"
  ],
  [
    "Georgia",
    "Tbilisi"
  ],
  [
    "India",
    "New Delhi"
  ],
  [
    "Indonesia",
    "Jakarta"
  ],
  [
    "Iran",
    "Tehran"
  ],
  [
    "Iraq",
    "Baghdad"
  ],
  [
    "Israel",
    "Jerusalem"
  ],
  [
    "Japan",
    "Tokyo"
  ],
  [
    "Jordan",
    "Amman"
  ],
  [
    "Kazakhstan",
    "Astana"
  ],
  [
    "Kuwait",
    "Kuwait City"
  ],
  [
    "Kyrgyzstan",
    "Bishkek"
  ],
  [
    "Laos",
    "Vientiane"
  ],
  [
    "Lebanon",
    "Beirut"
  ],
  [
    "Malaysia",
    "Kuala Lumpur"
  ],
  [
    "Maldives",
    "Male"
  ],
  [
    "Mongolia",
    "Ulaanbaatar"
  ],
  [
    "Myanmar",
    "Naypyidaw"
  ],
  [
    "Nepal",
    "Kathmandu"
  ],
  [
    "North Korea",
    "Pyongyang"
  ],
  [
    "Oman",
    "Muscat"
  ],
  [
    "Pakistan",
    "Islamabad"
  ],
  [
    "Palestine",
    "Ramallah"
  ],
  [
    "Philippines",
    "Manila"
  ],
  [
    "Qatar",
    "Doha"
  ],
  [
    "Saudi Arabia",
    "Riyadh"
  ],
  [
    "Singapore",
    "Singapore"
  ],
  [
    "South Korea",
    "Seoul"
  ],
  [
    "Sri Lanka",
    "Sri Jayawardenepura Kotte"
  ],
  [
    "Syria",
    "Damascus"
  ],
  [
    "Tajikistan",
    "Dushanbe"
  ],
  [
    "Thailand",
    "Bangkok"
  ],
  [
    "East Timor",
    "Dili"
  ],
  [
    "Turkey",
    "Ankara"
  ],
  [
    "Turkmenistan",
    "Ashgabat"
  ],
  [
    "UAE",
    "Abu Dhabi"
  ],
  [
    "Uzbekistan",
    "Tashkent"
  ],
  [
    "Vietnam",
    "Hanoi"
  ],
  [
    "Yemen",
    "Sanaa"
  ],
  [
    "Albania",
    "Tirana"
  ],
  [
    "Andorra",
    "Andorra la Vella"
  ],
  [
    "Austria",
    "Vienna"
  ],
  [
    "Belarus",
    "Minsk"
  ],
  [
    "Belgium",
    "Brussels"
  ],
  [
    "Bosnia and Herzegovina",
    "Sarajevo"
  ],
  [
    "Bulgaria",
    "Sofia"
  ],
  [
    "Croatia",
    "Zagreb"
  ],
  [
    "Czech Republic",
    "Prague"
  ],
  [
    "Denmark",
    "Copenhagen"
  ],
  [
    "Estonia",
    "Tallinn"
  ],
  [
    "Finland",
    "Helsinki"
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
    "Greece",
    "Athens"
  ],
  [
    "Hungary",
    "Budapest"
  ],
  [
    "Iceland",
    "Reykjavik"
  ],
  [
    "Ireland",
    "Dublin"
  ],
  [
    "Italy",
    "Rome"
  ],
  [
    "Latvia",
    "Riga"
  ],
  [
    "Liechtenstein",
    "Vaduz"
  ],
  [
    "Lithuania",
    "Vilnius"
  ],
  [
    "Luxembourg",
    "Luxembourg"
  ],
  [
    "Malta",
    "Valletta"
  ],
  [
    "Moldova",
    "Chisinau"
  ],
  [
    "Monaco",
    "Monaco"
  ],
  [
    "Montenegro",
    "Podgorica"
  ],
  [
    "Netherlands",
    "Amsterdam"
  ],
  [
    "North Macedonia",
    "Skopje"
  ],
  [
    "Norway",
    "Oslo"
  ],
  [
    "Poland",
    "Warsaw"
  ],
  [
    "Portugal",
    "Lisbon"
  ],
  [
    "Romania",
    "Bucharest"
  ],
  [
    "Russia",
    "Moscow"
  ],
  [
    "San Marino",
    "San Marino"
  ],
  [
    "Serbia",
    "Belgrade"
  ],
  [
    "Slovakia",
    "Bratislava"
  ],
  [
    "Slovenia",
    "Ljubljana"
  ],
  [
    "Spain",
    "Madrid"
  ],
  [
    "Sweden",
    "Stockholm"
  ],
  [
    "Switzerland",
    "Bern"
  ],
  [
    "Ukraine",
    "Kyiv"
  ],
  [
    "United Kingdom",
    "London"
  ],
  [
    "Vatican City",
    "Vatican City"
  ],
  [
    "Antigua and Barbuda",
    "St. John's"
  ],
  [
    "Bahamas",
    "Nassau"
  ],
  [
    "Barbados",
    "Bridgetown"
  ],
  [
    "Belize",
    "Belmopan"
  ],
  [
    "Canada",
    "Ottawa"
  ],
  [
    "Costa Rica",
    "San Jose"
  ],
  [
    "Cuba",
    "Havana"
  ],
  [
    "Dominica",
    "Roseau"
  ],
  [
    "Dominican Republic",
    "Santo Domingo"
  ],
  [
    "El Salvador",
    "San Salvador"
  ],
  [
    "Grenada",
    "St. George's"
  ],
  [
    "Guatemala",
    "Guatemala City"
  ],
  [
    "Haiti",
    "Port-au-Prince"
  ],
  [
    "Honduras",
    "Tegucigalpa"
  ],
  [
    "Jamaica",
    "Kingston"
  ],
  [
    "Mexico",
    "Mexico City"
  ],
  [
    "Nicaragua",
    "Managua"
  ],
  [
    "Panama",
    "Panama City"
  ],
  [
    "St. Kitts and Nevis",
    "Basseterre"
  ],
  [
    "St. Lucia",
    "Castries"
  ],
  [
    "St. Vincent and the Grenadines",
    "Kingstown"
  ],
  [
    "Trinidad and Tobago",
    "Port of Spain"
  ],
  [
    "United States",
    "Washington, D.C."
  ],
  [
    "Argentina",
    "Buenos Aires"
  ],
  [
    "Bolivia",
    "Sucre"
  ],
  [
    "Brazil",
    "Brasilia"
  ],
  [
    "Chile",
    "Santiago"
  ],
  [
    "Colombia",
    "Bogota"
  ],
  [
    "Ecuador",
    "Quito"
  ],
  [
    "Guyana",
    "Georgetown"
  ],
  [
    "Paraguay",
    "Asuncion"
  ],
  [
    "Peru",
    "Lima"
  ],
  [
    "Suriname",
    "Paramaribo"
  ],
  [
    "Uruguay",
    "Montevideo"
  ],
  [
    "Venezuela",
    "Caracas"
  ],
  [
    "Australia",
    "Canberra"
  ],
  [
    "Fiji",
    "Suva"
  ],
  [
    "Kiribati",
    "South Tarawa"
  ],
  [
    "Marshall Islands",
    "Majuro"
  ],
  [
    "Micronesia",
    "Palikir"
  ],
  [
    "Nauru",
    "Yaren"
  ],
  [
    "New Zealand",
    "Wellington"
  ],
  [
    "Palau",
    "Ngerulmud"
  ],
  [
    "Papua New Guinea",
    "Port Moresby"
  ],
  [
    "Samoa",
    "Apia"
  ],
  [
    "Solomon Islands",
    "Honiara"
  ],
  [
    "Tonga",
    "Nuku'alofa"
  ],
  [
    "Tuvalu",
    "Funafuti"
  ],
  [
    "Vanuatu",
    "Port Vila"
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
      "Exam plan (60 minutes): do the questions you are sure of first. Keep the last 5 minutes to recheck.",
      "The Tropic of Cancer passes through the middle of India. The Tropic of Capricorn is south of the Equator.",
      "The Arctic Circle is around the North Pole; the Antarctic Circle is around the South Pole.",
      "The Equator cuts the Earth into the Northern and Southern Hemispheres. The Prime Meridian cuts it into the Eastern and Western Hemispheres.",
      "India is in the Northern and Eastern Hemispheres. Australia is in the Southern and Eastern Hemispheres.",
      "Latitude goes from 0 degrees (Equator) to 90 degrees (the poles). Longitude goes from 0 degrees (Prime Meridian) to 180 degrees.",
      "The International Date Line is at 180 degrees — where one day changes to the next.",
      "The scale tells you how far places really are. India is 5 hours 30 minutes ahead of London. India has only one time zone.",
      "A globe is a round model of the Earth. A book of maps is called an atlas.",
      "Map colours: blue = water, green = low land and plains, brown = mountains and high land."
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
      "Caspian Sea — the world's largest lake / sea, between Europe and Asia.",
      "Every country and its continent:",
      "Africa: Algeria, Egypt, Libya, Morocco, Tunisia, Sudan, South Sudan, Ethiopia, Eritrea, Djibouti, Somalia, Kenya, Uganda, Rwanda, Burundi, Tanzania, Mozambique, Zambia, Zimbabwe, Malawi, Botswana, Namibia, South Africa, Lesotho, Eswatini, Madagascar, Mauritius, Seychelles, Comoros, Cape Verde, Sao Tome and Principe, Nigeria, Ghana, Ivory Coast, Senegal, Mali, Burkina Faso, Niger, Guinea, Guinea-Bissau, Sierra Leone, Liberia, Togo, Benin, Cameroon, Central African Republic, Chad, Congo, Dem. Rep. of Congo, Gabon, Equatorial Guinea, Angola, Mauritania, Gambia.",
      "Asia: Afghanistan, Armenia, Azerbaijan, Bahrain, Bangladesh, Bhutan, Brunei, Cambodia, China, Cyprus, Georgia, India, Indonesia, Iran, Iraq, Israel, Japan, Jordan, Kazakhstan, Kuwait, Kyrgyzstan, Laos, Lebanon, Malaysia, Maldives, Mongolia, Myanmar, Nepal, North Korea, Oman, Pakistan, Palestine, Philippines, Qatar, Saudi Arabia, Singapore, South Korea, Sri Lanka, Syria, Tajikistan, Thailand, East Timor, Turkey, Turkmenistan, UAE, Uzbekistan, Vietnam, Yemen.",
      "Europe: Albania, Andorra, Austria, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Moldova, Monaco, Montenegro, Netherlands, North Macedonia, Norway, Poland, Portugal, Romania, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Ukraine, United Kingdom, Vatican City.",
      "North America: Antigua and Barbuda, Bahamas, Barbados, Belize, Canada, Costa Rica, Cuba, Dominica, Dominican Republic, El Salvador, Grenada, Guatemala, Haiti, Honduras, Jamaica, Mexico, Nicaragua, Panama, St. Kitts and Nevis, St. Lucia, St. Vincent and the Grenadines, Trinidad and Tobago, United States.",
      "South America: Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Guyana, Paraguay, Peru, Suriname, Uruguay, Venezuela.",
      "Australia: Australia, Fiji, Kiribati, Marshall Islands, Micronesia, Nauru, New Zealand, Palau, Papua New Guinea, Samoa, Solomon Islands, Tonga, Tuvalu, Vanuatu.",
      "Europe and Asia: Russia.",
      "New Guinea is the second-largest island in the world (after Greenland). Madagascar is a big island in the Indian Ocean.",
      "Palk Strait — between India and Sri Lanka. Tasman Sea — between Australia and New Zealand.",
      "English Channel — between the United Kingdom and France. Timor Sea — between Timor and Australia.",
      "Atlantic Ocean — between North America and Europe."
    ]
  },
  "3": {
    "title": "Asia",
    "facts": [
      "South Asia: India, Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Myanmar, Maldives, Afghanistan.",
      "Middle East / West Asia: Saudi Arabia, UAE, Qatar, Kuwait, Oman, Yemen, Jordan, Lebanon, Syria, Iraq, Iran, Turkey, Israel, Palestine, Armenia, Azerbaijan, Georgia, Cyprus, Bahrain.",
      "Central Asia: Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan.",
      "East & South-East Asia: China, Japan, South Korea, North Korea, Mongolia, Thailand, Vietnam, Malaysia, Singapore, Indonesia, Philippines, Brunei, Cambodia, Laos, East Timor.",
      "India — triangle pointing down. Saudi Arabia — big country on the Arabian Peninsula.",
      "China — big country north-east of India. Japan — a chain of islands east of China.",
      "Indonesia — many islands south-east of Asia. Sri Lanka — a small teardrop island just below India.",
      "India has the largest population in Asia — and in the world. Saudi Arabia is the largest country in the Middle East.",
      "Turkey is between Europe and Asia. Japan is the Land of the Rising Sun. Bhutan is the Land of the Thunder Dragon. South Korea is the Land of the Morning Calm.",
      "East Timor is entirely in the Southern Hemisphere. Indonesia has the most islands — about 17,000."
    ]
  },
  "4": {
    "title": "World Capitals — all 195",
    "facts": [
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
      "Seas around India: Arabian Sea (west), Bay of Bengal (east), Indian Ocean (south).",
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
      "Fez (Morocco) and Cordoba (Spain) — famous old centres of Islamic learning.",
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
      "River through Egypt: Nile — Cairo is on the Nile.",
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
    ]
  }
};

module.exports = { MAP_GAME_STAGES, MAP_GAME_QUESTIONS, MAP_GAME_PASS_MARK, MAP_GAME_TIME_PER_Q, MAP_GAME_PLAY_COUNT, MAP_GAME_ROUND2_TIME_PER_Q, MAP_GAME_ALL_CAPITALS, MAP_GAME_SHEETS };
