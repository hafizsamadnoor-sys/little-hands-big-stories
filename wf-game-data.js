// ─────────────────────────────────────────────────────────────
// Word Fight — SIBAQ 2026, Bidaya BNS35 (Word Fight Eng).
// Player first: Thalha Ibrahim (N1325, Ad 503) — the only Bidaya
// candidate for Word Fight Eng. Other boys can be added later via
// the wf_game_players table — the banks are not tied to a boy.
// Official concept (from the concept book): "The programme follows a
// multifaceted structure designed to assess participants' word power
// across different areas. The first phase is Word Passing, conducted
// in three rounds: verbs, nouns, and adjectives. The subsequent
// phases focus on synonyms, antonyms and phrasal verbs, along with
// their meanings. There will be no minus marks. Marks will be awarded
// in every phase, and the final result will be based on the cumulative
// score throughout the programme." Stage, 90 minutes, Linguistics.
// PRACTICE rules (Samad, 12 Nov 2026 — labelled as practice in the
// app, because the official rule says NO minus marks):
//   * a REPEAT word in Word Passing = -2 points (officially it is 0)
//   * timer: Verbs = NO timer; Nouns 20s; Adjectives 15s;
//     Synonyms 15s; Antonyms 10s; Phrasal Verbs 10s.
// Word Passing rule ASSUMPTION (the concept book does not say how
// the word moves from player to player — labelled in the app):
// word CHAIN — each word must start with the LAST letter of the
// last accepted word (e.g. play -> yawn). If no unused bank word
// starts with the needed letter, the chain restarts with the first
// available letter in a fixed order (dead-letter reset — the same
// rule on the server and in the browser, so the chains agree).
// How it plays: 10 seats — Thalha + 9 AI players (3 Strong, 3 Medium,
// 3 Weak). A full match: Word Passing 3 turns each per round
// (30 turns a round, 3 of them Thalha's) + 10 MCQ questions in each
// of Synonyms / Antonyms / Phrasal Verbs.
// Scoring (same as the verified demo): Word Passing correct new
// word +2, repeat -2, wrong letter / not in bank / no word 0;
// MCQ correct +3, wrong 0. Full-match maximum:
//   Word Passing 3 rounds x 3 turns x 2 = 18
//   + MCQ 3 phases x 10 questions x 3 = 90  =>  108 points.
// Game scores live ONLY in the wf_game_* tables — never in
// points_log / Points Board / clubs / certificates.
// Word banks: verbs / nouns / adjectives from the verified demo
// (Word-Fight-Demo.html); MCQ pools expanded from 10 to 20 each
// so a 10-question draw is unseen-first, not the whole bank.
// ─────────────────────────────────────────────────────────────
const WF_GAME_PLAY_COUNT = 10;
const WF_GAME_WP_TURNS_EACH = 3;
const WF_GAME_MAX_TOTAL = 108;
const WF_GAME_PHASES = [
  { id: "WP1", n: 1, kind: "word", cat: "verbs", title: "Word Passing — Verbs", timer: null, max: 6, turnsEach: 3 },
  { id: "WP2", n: 2, kind: "word", cat: "nouns", title: "Word Passing — Nouns", timer: 20, max: 6, turnsEach: 3 },
  { id: "WP3", n: 3, kind: "word", cat: "adjectives", title: "Word Passing — Adjectives", timer: 15, max: 6, turnsEach: 3 },
  { id: "SYN", n: 4, kind: "mcq", cat: "synonyms", title: "Synonyms + Meaning", timer: 15, max: 30 },
  { id: "ANT", n: 5, kind: "mcq", cat: "antonyms", title: "Antonyms + Meaning", timer: 10, max: 30 },
  { id: "PHR", n: 6, kind: "mcq", cat: "phrasal", title: "Phrasal Verbs + Meaning", timer: 10, max: 30 },
];
const WF_GAME_AI = [
  { name: "AI-Arif", level: "strong" },
  { name: "AI-Bilal", level: "strong" },
  { name: "AI-Danish", level: "strong" },
  { name: "AI-Eshan", level: "medium" },
  { name: "AI-Farhan", level: "medium" },
  { name: "AI-Gita", level: "medium" },
  { name: "AI-Hamza", level: "weak" },
  { name: "AI-Imran", level: "weak" },
  { name: "AI-Junaid", level: "weak" },
];
const WF_GAME_VERBS = [
  "act",
  "agree",
  "answer",
  "arrive",
  "ask",
  "bake",
  "bathe",
  "believe",
  "bend",
  "bite",
  "blow",
  "borrow",
  "break",
  "bring",
  "brush",
  "build",
  "burn",
  "buy",
  "call",
  "carry",
  "catch",
  "change",
  "check",
  "choose",
  "clean",
  "climb",
  "close",
  "come",
  "cook",
  "count",
  "cover",
  "cross",
  "cry",
  "cut",
  "drink",
  "eat",
  "find",
  "get",
  "give",
  "go",
  "grow",
  "help",
  "jump",
  "learn",
  "listen",
  "look",
  "make",
  "meet",
  "need",
  "open",
  "pack",
  "paint",
  "pass",
  "pay",
  "pick",
  "plant",
  "play",
  "please",
  "point",
  "pray",
  "prepare",
  "pull",
  "push",
  "put",
  "read",
  "remember",
  "repeat",
  "reply",
  "rescue",
  "rest",
  "return",
  "ring",
  "rise",
  "roll",
  "run",
  "save",
  "say",
  "see",
  "sell",
  "send",
  "serve",
  "shake",
  "shout",
  "show",
  "sing",
  "sit",
  "sleep",
  "smile",
  "speak",
  "stand",
  "start",
  "stop",
  "study",
  "sweep",
  "swim",
  "take",
  "talk",
  "taste",
  "teach",
  "tell",
  "test",
  "thank",
  "think",
  "throw",
  "tie",
  "touch",
  "train",
  "travel",
  "trust",
  "try",
  "turn",
  "type",
  "walk",
  "watch",
  "work",
  "write",
  "yawn"
];
const WF_GAME_NOUNS = [
  "ant",
  "apple",
  "bag",
  "ball",
  "banana",
  "basket",
  "bed",
  "bell",
  "bike",
  "bird",
  "book",
  "box",
  "boy",
  "bread",
  "bridge",
  "brother",
  "bus",
  "butterfly",
  "cake",
  "camel",
  "cap",
  "car",
  "cat",
  "chair",
  "child",
  "city",
  "class",
  "clock",
  "cloud",
  "cow",
  "cup",
  "dog",
  "egg",
  "elephant",
  "fish",
  "goat",
  "hen",
  "house",
  "ice",
  "king",
  "lion",
  "moon",
  "nest",
  "orange",
  "paper",
  "park",
  "parrot",
  "pen",
  "pencil",
  "phone",
  "picture",
  "plate",
  "potato",
  "pumpkin",
  "queen",
  "rabbit",
  "rain",
  "rice",
  "ring",
  "river",
  "road",
  "rock",
  "roof",
  "room",
  "rope",
  "rose",
  "ruler",
  "school",
  "sea",
  "ship",
  "shop",
  "sister",
  "snake",
  "snow",
  "soap",
  "song",
  "star",
  "stone",
  "story",
  "street",
  "student",
  "sun",
  "table",
  "teacher",
  "temple",
  "tent",
  "tiger",
  "tomato",
  "town",
  "toy",
  "train",
  "tree",
  "umbrella",
  "van",
  "water"
];
const WF_GAME_ADJECTIVES = [
  "bad",
  "beautiful",
  "big",
  "bitter",
  "black",
  "blue",
  "bold",
  "brave",
  "bright",
  "brown",
  "busy",
  "calm",
  "careful",
  "cheap",
  "cheerful",
  "clean",
  "clear",
  "clever",
  "cloudy",
  "cold",
  "colourful",
  "easy",
  "fast",
  "good",
  "green",
  "happy",
  "high",
  "hot",
  "kind",
  "long",
  "new",
  "old",
  "patient",
  "peaceful",
  "perfect",
  "pink",
  "playful",
  "pleasant",
  "polite",
  "poor",
  "popular",
  "powerful",
  "pretty",
  "proud",
  "rainy",
  "rapid",
  "ready",
  "red",
  "rich",
  "right",
  "rough",
  "round",
  "royal",
  "sad",
  "safe",
  "shiny",
  "short",
  "silent",
  "slow",
  "small",
  "smart",
  "smooth",
  "soft",
  "special",
  "strong",
  "sunny",
  "sweet",
  "tall",
  "tasty",
  "thankful",
  "thick",
  "thin",
  "thirsty",
  "tidy",
  "tiny",
  "tired",
  "true",
  "warm",
  "white",
  "wild",
  "yellow",
  "young"
];
const WF_GAME_QUESTIONS = {
  "SYN": [
    {
      "key": "syn-happy",
      "word": "happy",
      "answer": "joyful \u2014 full of joy",
      "options": [
        "joyful \u2014 full of joy",
        "sad \u2014 unhappy",
        "angry \u2014 furious",
        "tired \u2014 sleepy"
      ],
      "point": "joyful means full of joy"
    },
    {
      "key": "syn-big",
      "word": "big",
      "answer": "large \u2014 of great size",
      "options": [
        "large \u2014 of great size",
        "small \u2014 little",
        "long \u2014 tall",
        "wide \u2014 broad"
      ],
      "point": "large means of great size"
    },
    {
      "key": "syn-fast",
      "word": "fast",
      "answer": "quick \u2014 moving with speed",
      "options": [
        "quick \u2014 moving with speed",
        "slow \u2014 not fast",
        "late \u2014 delayed",
        "lazy \u2014 idle"
      ],
      "point": "quick means moving with speed"
    },
    {
      "key": "syn-brave",
      "word": "brave",
      "answer": "courageous \u2014 not afraid",
      "options": [
        "courageous \u2014 not afraid",
        "afraid \u2014 scared",
        "weak \u2014 not strong",
        "shy \u2014 timid"
      ],
      "point": "courageous means not afraid"
    },
    {
      "key": "syn-smart",
      "word": "smart",
      "answer": "clever \u2014 quick to learn",
      "options": [
        "clever \u2014 quick to learn",
        "slow \u2014 dull",
        "silly \u2014 foolish",
        "lazy \u2014 idle"
      ],
      "point": "clever means quick to learn"
    },
    {
      "key": "syn-beautiful",
      "word": "beautiful",
      "answer": "pretty \u2014 pleasing to look at",
      "options": [
        "pretty \u2014 pleasing to look at",
        "ugly \u2014 not pretty",
        "dirty \u2014 unclean",
        "plain \u2014 simple"
      ],
      "point": "pretty means pleasing to look at"
    },
    {
      "key": "syn-strong",
      "word": "strong",
      "answer": "powerful \u2014 full of strength",
      "options": [
        "powerful \u2014 full of strength",
        "weak \u2014 not strong",
        "soft \u2014 gentle",
        "small \u2014 little"
      ],
      "point": "powerful means full of strength"
    },
    {
      "key": "syn-easy",
      "word": "easy",
      "answer": "simple \u2014 not difficult",
      "options": [
        "simple \u2014 not difficult",
        "hard \u2014 difficult",
        "long \u2014 lengthy",
        "heavy \u2014 weighty"
      ],
      "point": "simple means not difficult"
    },
    {
      "key": "syn-rich",
      "word": "rich",
      "answer": "wealthy \u2014 having much money",
      "options": [
        "wealthy \u2014 having much money",
        "poor \u2014 having little money",
        "happy \u2014 joyful",
        "busy \u2014 occupied"
      ],
      "point": "wealthy means having much money"
    },
    {
      "key": "syn-honest",
      "word": "honest",
      "answer": "truthful \u2014 always telling the truth",
      "options": [
        "truthful \u2014 always telling the truth",
        "false \u2014 not true",
        "lazy \u2014 idle",
        "rude \u2014 impolite"
      ],
      "point": "truthful means always telling the truth"
    },
    {
      "key": "syn-sad",
      "word": "sad",
      "answer": "unhappy \u2014 full of sorrow",
      "options": [
        "unhappy \u2014 full of sorrow",
        "joyful \u2014 full of joy",
        "angry \u2014 furious",
        "tired \u2014 sleepy"
      ],
      "point": "unhappy means full of sorrow"
    },
    {
      "key": "syn-small",
      "word": "small",
      "answer": "little \u2014 not big",
      "options": [
        "little \u2014 not big",
        "large \u2014 of great size",
        "long \u2014 tall",
        "wide \u2014 broad"
      ],
      "point": "little means not big"
    },
    {
      "key": "syn-begin",
      "word": "begin",
      "answer": "start \u2014 to do something first",
      "options": [
        "start \u2014 to do something first",
        "finish \u2014 to stop",
        "stop \u2014 to end",
        "close \u2014 to shut"
      ],
      "point": "start means to do something first"
    },
    {
      "key": "syn-end",
      "word": "end",
      "answer": "finish \u2014 to stop, to complete",
      "options": [
        "finish \u2014 to stop, to complete",
        "start \u2014 to begin",
        "begin \u2014 to start",
        "open \u2014 to make not closed"
      ],
      "point": "finish means to stop, to complete"
    },
    {
      "key": "syn-glad",
      "word": "glad",
      "answer": "happy \u2014 pleased",
      "options": [
        "happy \u2014 pleased",
        "sad \u2014 unhappy",
        "angry \u2014 furious",
        "afraid \u2014 scared"
      ],
      "point": "happy means pleased"
    },
    {
      "key": "syn-quiet",
      "word": "quiet",
      "answer": "silent \u2014 making no sound",
      "options": [
        "silent \u2014 making no sound",
        "loud \u2014 making much sound",
        "noisy \u2014 full of sound",
        "bright \u2014 full of light"
      ],
      "point": "silent means making no sound"
    },
    {
      "key": "syn-angry",
      "word": "angry",
      "answer": "furious \u2014 very angry",
      "options": [
        "furious \u2014 very angry",
        "happy \u2014 joyful",
        "calm \u2014 peaceful",
        "kind \u2014 gentle"
      ],
      "point": "furious means very angry"
    },
    {
      "key": "syn-tired",
      "word": "tired",
      "answer": "exhausted \u2014 very tired",
      "options": [
        "exhausted \u2014 very tired",
        "fresh \u2014 full of energy",
        "awake \u2014 not sleeping",
        "strong \u2014 powerful"
      ],
      "point": "exhausted means very tired"
    },
    {
      "key": "syn-near",
      "word": "near",
      "answer": "close \u2014 not far away",
      "options": [
        "close \u2014 not far away",
        "far \u2014 a long way away",
        "distant \u2014 far away",
        "long \u2014 lengthy"
      ],
      "point": "close means not far away"
    },
    {
      "key": "syn-cold",
      "word": "cold",
      "answer": "chilly \u2014 cold, but not freezing",
      "options": [
        "chilly \u2014 cold, but not freezing",
        "hot \u2014 very warm",
        "warm \u2014 not cold",
        "boiling \u2014 very hot"
      ],
      "point": "chilly means cold, but not freezing"
    }
  ],
  "ANT": [
    {
      "key": "ant-hot",
      "word": "hot",
      "answer": "cold",
      "options": [
        "cold",
        "warm",
        "soft",
        "bright"
      ],
      "point": "The opposite of hot is cold."
    },
    {
      "key": "ant-big",
      "word": "big",
      "answer": "small",
      "options": [
        "small",
        "large",
        "tall",
        "wide"
      ],
      "point": "The opposite of big is small."
    },
    {
      "key": "ant-happy",
      "word": "happy",
      "answer": "sad",
      "options": [
        "sad",
        "joyful",
        "glad",
        "proud"
      ],
      "point": "The opposite of happy is sad."
    },
    {
      "key": "ant-fast",
      "word": "fast",
      "answer": "slow",
      "options": [
        "slow",
        "quick",
        "rapid",
        "swift"
      ],
      "point": "The opposite of fast is slow."
    },
    {
      "key": "ant-rich",
      "word": "rich",
      "answer": "poor",
      "options": [
        "poor",
        "wealthy",
        "happy",
        "busy"
      ],
      "point": "The opposite of rich is poor."
    },
    {
      "key": "ant-strong",
      "word": "strong",
      "answer": "weak",
      "options": [
        "weak",
        "powerful",
        "brave",
        "hard"
      ],
      "point": "The opposite of strong is weak."
    },
    {
      "key": "ant-tall",
      "word": "tall",
      "answer": "short",
      "options": [
        "short",
        "high",
        "long",
        "big"
      ],
      "point": "The opposite of tall is short."
    },
    {
      "key": "ant-easy",
      "word": "easy",
      "answer": "difficult",
      "options": [
        "difficult",
        "simple",
        "soft",
        "clear"
      ],
      "point": "The opposite of easy is difficult."
    },
    {
      "key": "ant-early",
      "word": "early",
      "answer": "late",
      "options": [
        "late",
        "soon",
        "quick",
        "first"
      ],
      "point": "The opposite of early is late."
    },
    {
      "key": "ant-full",
      "word": "full",
      "answer": "empty",
      "options": [
        "empty",
        "heavy",
        "much",
        "many"
      ],
      "point": "The opposite of full is empty."
    },
    {
      "key": "ant-light",
      "word": "light",
      "answer": "dark",
      "options": [
        "dark",
        "bright",
        "white",
        "clear"
      ],
      "point": "The opposite of light is dark."
    },
    {
      "key": "ant-new",
      "word": "new",
      "answer": "old",
      "options": [
        "old",
        "young",
        "fresh",
        "recent"
      ],
      "point": "The opposite of new is old."
    },
    {
      "key": "ant-good",
      "word": "good",
      "answer": "bad",
      "options": [
        "bad",
        "kind",
        "nice",
        "happy"
      ],
      "point": "The opposite of good is bad."
    },
    {
      "key": "ant-kind",
      "word": "kind",
      "answer": "cruel",
      "options": [
        "cruel",
        "gentle",
        "nice",
        "polite"
      ],
      "point": "The opposite of kind is cruel."
    },
    {
      "key": "ant-true",
      "word": "true",
      "answer": "false",
      "options": [
        "false",
        "right",
        "real",
        "honest"
      ],
      "point": "The opposite of true is false."
    },
    {
      "key": "ant-open",
      "word": "open",
      "answer": "closed",
      "options": [
        "closed",
        "wide",
        "free",
        "clear"
      ],
      "point": "The opposite of open is closed."
    },
    {
      "key": "ant-clean",
      "word": "clean",
      "answer": "dirty",
      "options": [
        "dirty",
        "tidy",
        "neat",
        "clear"
      ],
      "point": "The opposite of clean is dirty."
    },
    {
      "key": "ant-high",
      "word": "high",
      "answer": "low",
      "options": [
        "low",
        "tall",
        "big",
        "long"
      ],
      "point": "The opposite of high is low."
    },
    {
      "key": "ant-long",
      "word": "long",
      "answer": "short",
      "options": [
        "short",
        "big",
        "wide",
        "tall"
      ],
      "point": "The opposite of long is short."
    },
    {
      "key": "ant-win",
      "word": "win",
      "answer": "lose",
      "options": [
        "lose",
        "try",
        "play",
        "run"
      ],
      "point": "The opposite of win is lose."
    }
  ],
  "PHR": [
    {
      "key": "phr-look-after",
      "word": "look after",
      "answer": "take care of",
      "options": [
        "take care of",
        "look for",
        "give away",
        "run away"
      ],
      "point": "'look after' means take care of."
    },
    {
      "key": "phr-give-up",
      "word": "give up",
      "answer": "stop trying",
      "options": [
        "stop trying",
        "take up",
        "go on",
        "look up"
      ],
      "point": "'give up' means stop trying."
    },
    {
      "key": "phr-look-for",
      "word": "look for",
      "answer": "search for",
      "options": [
        "search for",
        "look after",
        "give up",
        "take off"
      ],
      "point": "'look for' means search for."
    },
    {
      "key": "phr-turn-on",
      "word": "turn on",
      "answer": "switch on",
      "options": [
        "switch on",
        "turn off",
        "put on",
        "sit down"
      ],
      "point": "'turn on' means switch on."
    },
    {
      "key": "phr-get-up",
      "word": "get up",
      "answer": "rise from bed",
      "options": [
        "rise from bed",
        "go out",
        "sit down",
        "wake up \u2014 stop sleeping"
      ],
      "point": "'get up' means rise from bed."
    },
    {
      "key": "phr-put-on",
      "word": "put on",
      "answer": "wear (clothes)",
      "options": [
        "wear (clothes)",
        "take off",
        "turn on",
        "give up"
      ],
      "point": "'put on' means wear (clothes)."
    },
    {
      "key": "phr-take-off",
      "word": "take off",
      "answer": "remove (clothes)",
      "options": [
        "remove (clothes)",
        "put on",
        "turn off",
        "look for"
      ],
      "point": "'take off' means remove (clothes)."
    },
    {
      "key": "phr-come-back",
      "word": "come back",
      "answer": "return",
      "options": [
        "return",
        "go out",
        "give up",
        "sit down"
      ],
      "point": "'come back' means return."
    },
    {
      "key": "phr-go-out",
      "word": "go out",
      "answer": "leave the house",
      "options": [
        "leave the house",
        "come back",
        "get up",
        "turn on"
      ],
      "point": "'go out' means leave the house."
    },
    {
      "key": "phr-wake-up",
      "word": "wake up",
      "answer": "stop sleeping",
      "options": [
        "stop sleeping",
        "get up",
        "go out",
        "sit down"
      ],
      "point": "'wake up' means stop sleeping."
    },
    {
      "key": "phr-sit-down",
      "word": "sit down",
      "answer": "take a seat",
      "options": [
        "take a seat",
        "stand up",
        "get up",
        "go out"
      ],
      "point": "'sit down' means take a seat."
    },
    {
      "key": "phr-stand-up",
      "word": "stand up",
      "answer": "rise to your feet",
      "options": [
        "rise to your feet",
        "sit down",
        "lie down",
        "turn off"
      ],
      "point": "'stand up' means rise to your feet."
    },
    {
      "key": "phr-turn-off",
      "word": "turn off",
      "answer": "switch off",
      "options": [
        "switch off",
        "turn on",
        "put on",
        "take off"
      ],
      "point": "'turn off' means switch off."
    },
    {
      "key": "phr-look-at",
      "word": "look at",
      "answer": "see, watch",
      "options": [
        "see, watch",
        "look for",
        "look after",
        "give up"
      ],
      "point": "'look at' means see, watch."
    },
    {
      "key": "phr-run-away",
      "word": "run away",
      "answer": "escape, leave quickly",
      "options": [
        "escape, leave quickly",
        "come back",
        "go out",
        "sit down"
      ],
      "point": "'run away' means escape, leave quickly."
    },
    {
      "key": "phr-get-on",
      "word": "get on",
      "answer": "climb onto (a bus or train)",
      "options": [
        "climb onto (a bus or train)",
        "get off",
        "sit down",
        "go out"
      ],
      "point": "'get on' means climb onto (a bus or train)."
    },
    {
      "key": "phr-get-off",
      "word": "get off",
      "answer": "climb down from (a bus or train)",
      "options": [
        "climb down from (a bus or train)",
        "get on",
        "put on",
        "take off"
      ],
      "point": "'get off' means climb down from (a bus or train)."
    },
    {
      "key": "phr-hurry-up",
      "word": "hurry up",
      "answer": "be quick",
      "options": [
        "be quick",
        "slow down",
        "sit down",
        "give up"
      ],
      "point": "'hurry up' means be quick."
    },
    {
      "key": "phr-pick-up",
      "word": "pick up",
      "answer": "lift, take in your hand",
      "options": [
        "lift, take in your hand",
        "put down",
        "throw away",
        "give up"
      ],
      "point": "'pick up' means lift, take in your hand."
    },
    {
      "key": "phr-throw-away",
      "word": "throw away",
      "answer": "get rid of",
      "options": [
        "get rid of",
        "pick up",
        "keep",
        "look after"
      ],
      "point": "'throw away' means get rid of."
    }
  ]
};

module.exports = { WF_GAME_PLAY_COUNT, WF_GAME_WP_TURNS_EACH, WF_GAME_MAX_TOTAL,
  WF_GAME_PHASES, WF_GAME_AI, WF_GAME_VERBS, WF_GAME_NOUNS, WF_GAME_ADJECTIVES, WF_GAME_QUESTIONS };
