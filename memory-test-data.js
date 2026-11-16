// ─────────────────────────────────────────────────────────────
// Memory Test game (BNO14) — 10 levels, 4 rounds each, 45 marks.
// SOURCE: official BNO14 concept — "To memorize and reproduce the read,
// shown or heard things within a given time." 4 rounds, 45 marks, 30 min.
// The game is for Muhammad Afeef (N1306) first — the only Bidaya boy
// registered for Memory Test. Other boys can be added later via the
// mt_game_players table — the content is not tied to a boy.
// ALL content below is brand-new (Nov 2026). NOTHING is reused from
// Memory Test Practices 1–4 — see MT-AVOID-LIST.md for the full list
// of banned words, numbers, scenes and stories.
// How it plays: each level is one full 4-round test (45 marks).
//   Round 1 Words:   15 words, study 2 min, write 3 min, 15 marks.
//   Round 2 Numbers: 10 numbers in order, study 2 min, write 3 min, 10 marks.
//   Round 3 Picture: 10 things in a scene + colours, study 3 min, write 3 min, 10 marks.
//   Round 4 Story:   read a short story 3 min, answer 10 questions 5 min, 10 marks.
// NO multiple choice anywhere — the boy types what he remembers.
// Marking (server-side, see server.js mtMark*): R1 case-insensitive,
// 1-letter slip allowed for words of 5+ letters; R2 exact number in the
// correct position only; R3 thing + colour keywords; R4 keyword per question.
// Pass a level at 36/45 (80%) to unlock the next level; retry allowed.
// Difficulty: L1–2 easy (short words, 2-digit numbers, simple scene,
// short story); L9–10 expert (longest words, 3-digit numbers, most
// detailed scene, longest story).
// A level:
//   n         level number 1–10
//   title     short name
//   desc      one line for the level card
//   words     15 words to study (any order on recall)
//   numbers   10 numbers in order
//   scene     { name, items: [{ thing, colour, colourAliases, display, draw }] }
//             thing = noun phrase without the colour; colour = colour word(s);
//             display = full phrase shown on the study list ("A red kettle");
//             draw = drawing key for tools/build_mt_scenes.py
//   story     the story text to read
//   questions [{ q, keywords }] — keywords = acceptable answer words/phrases
//             (lowercase; matching is whole-word, case-insensitive; numbers
//             accept both digits and words, e.g. "10" and "ten").
// ─────────────────────────────────────────────────────────────
const MT_GAME_PASS_MARK = 36;
const MT_GAME_TOTAL = 45;
const MT_GAME_ROUNDS = [
  { n: 1, key: "words", title: "Words", studySec: 120, writeSec: 180, marks: 15 },
  { n: 2, key: "numbers", title: "Numbers", studySec: 120, writeSec: 180, marks: 10 },
  { n: 3, key: "picture", title: "Picture", studySec: 180, writeSec: 180, marks: 10 },
  { n: 4, key: "story", title: "Story", studySec: 180, writeSec: 300, marks: 10 }
];
const MT_GAME_LEVELS = [
  {
    n: 1, title: "Level 1 — First Steps", desc: "Short words · 2-digit numbers · kitchen scene · short story",
    words: ["fish", "cake", "milk", "shoe", "hat", "bed", "egg", "ant", "bee", "cow", "pig", "hen", "bus", "van", "cup"],
    numbers: [11, 24, 37, 48, 52, 66, 73, 81, 90, 99],
    scene: { name: "Kitchen", items: [
      { thing: "kettle", colour: "red", colourAliases: [], display: "A red kettle", draw: "kettle" },
      { thing: "plate", colour: "blue", colourAliases: [], display: "A blue plate", draw: "plate" },
      { thing: "mug", colour: "green", colourAliases: [], display: "A green mug", draw: "mug" },
      { thing: "spoon", colour: "yellow", colourAliases: [], display: "A yellow spoon", draw: "spoon" },
      { thing: "fork", colour: "orange", colourAliases: [], display: "An orange fork", draw: "fork" },
      { thing: "knife", colour: "pink", colourAliases: [], display: "A pink knife", draw: "knife" },
      { thing: "pan", colour: "purple", colourAliases: [], display: "A purple pan", draw: "pan" },
      { thing: "pot", colour: "brown", colourAliases: [], display: "A brown pot", draw: "pot" },
      { thing: "oven", colour: "black", colourAliases: [], display: "A black oven", draw: "oven" },
      { thing: "fridge", colour: "white", colourAliases: [], display: "A white fridge", draw: "fridge" }
    ] },
    story: "On Wednesday morning, Arshad, a 10-year-old boy from Kochi, lost his house key on the way to school. He searched under a bench, behind a tree and near a shop, but he could not find it. His friend Nabeel helped him look for one hour. At last, they found the key under a red bus near the school gate. Arshad thanked Nabeel and gave him three toffees. In the evening, Arshad tied the key to a blue string so that he would never lose it again.",
    questions: [
      { q: "What day was it?", keywords: ["wednesday"] },
      { q: "How old is Arshad?", keywords: ["10", "ten"] },
      { q: "Where is Arshad from?", keywords: ["kochi"] },
      { q: "What did Arshad lose?", keywords: ["key", "house key"] },
      { q: "Who helped Arshad search?", keywords: ["nabeel"] },
      { q: "How long did they search?", keywords: ["hour", "1 hour", "one hour"] },
      { q: "Where did they find the key?", keywords: ["bus", "red bus"] },
      { q: "Near what did they find it?", keywords: ["school gate", "gate"] },
      { q: "What did Arshad give Nabeel?", keywords: ["toffee", "toffees", "three"] },
      { q: "What colour was the string?", keywords: ["blue"] }
    ]
  },
  {
    n: 2, title: "Level 2 — Little Steps", desc: "Short words · 2-digit numbers · farm scene · short story",
    words: ["fox", "wolf", "bear", "goat", "frog", "toad", "worm", "slug", "moth", "lark", "wren", "carp", "owl", "emu", "yak"],
    numbers: [15, 22, 30, 44, 57, 68, 75, 83, 92, 98],
    scene: { name: "Farm", items: [
      { thing: "barn", colour: "red", colourAliases: [], display: "A red barn", draw: "barn" },
      { thing: "fence", colour: "white", colourAliases: [], display: "A white fence", draw: "fence" },
      { thing: "haystack", colour: "yellow", colourAliases: [], display: "A yellow haystack", draw: "haystack" },
      { thing: "sheep", colour: "white", colourAliases: [], display: "A white sheep", draw: "sheep" },
      { thing: "donkey", colour: "grey", colourAliases: ["gray"], display: "A grey donkey", draw: "donkey" },
      { thing: "turkey", colour: "brown", colourAliases: [], display: "A brown turkey", draw: "turkey" },
      { thing: "tractor", colour: "green", colourAliases: [], display: "A green tractor", draw: "tractor" },
      { thing: "watering can", colour: "blue", colourAliases: [], display: "A blue watering can", draw: "wateringcan" },
      { thing: "wheelbarrow", colour: "pink", colourAliases: [], display: "A pink wheelbarrow", draw: "wheelbarrow" },
      { thing: "scarecrow", colour: "purple", colourAliases: [], display: "A purple scarecrow", draw: "scarecrow" }
    ] },
    story: "On Thursday afternoon, Maryam, a 9-year-old girl from Thrissur, planted five seeds in pots on her balcony. She watered them every day for two weeks. Her mother, Fatima, helped her every morning. After twenty days, three little plants came up. Maryam watered them with great care and talked to them every morning. She could not wait to see them grow taller. Maryam was very happy. She picked two red chillies and gave one to her grandmother, Khadija. In the evening, Maryam wrote in her diary: 'My plants are growing!'",
    questions: [
      { q: "What day was it?", keywords: ["thursday"] },
      { q: "How old is Maryam?", keywords: ["9", "nine"] },
      { q: "Where is Maryam from?", keywords: ["thrissur"] },
      { q: "How many seeds did she plant?", keywords: ["five", "5"] },
      { q: "Where did she plant them?", keywords: ["balcony", "pots"] },
      { q: "Who helped Maryam water the plants?", keywords: ["fatima", "mother"] },
      { q: "How often did she water them?", keywords: ["every day", "daily", "day"] },
      { q: "After how many days did the plants come up?", keywords: ["twenty", "20"] },
      { q: "How many plants came up?", keywords: ["three", "3"] },
      { q: "Who did Maryam give a chilli to?", keywords: ["khadija", "grandmother"] }
    ]
  },
  {
    n: 3, title: "Level 3 — On the Move", desc: "5–6 letter words · 2-digit numbers · railway station · longer story",
    words: ["bread", "cheese", "butter", "honey", "sugar", "lemon", "melon", "cherry", "peach", "potato", "tomato", "carrot", "onion", "garlic", "pepper"],
    numbers: [17, 29, 38, 46, 59, 64, 71, 86, 94, 20],
    scene: { name: "Railway station", items: [
      { thing: "train", colour: "red", colourAliases: [], display: "A red train", draw: "train" },
      { thing: "signal", colour: "green", colourAliases: [], display: "A green signal", draw: "signal" },
      { thing: "ticket", colour: "yellow", colourAliases: [], display: "A yellow ticket", draw: "ticket" },
      { thing: "platform", colour: "white", colourAliases: [], display: "A white platform", draw: "platform" },
      { thing: "signboard", colour: "blue", colourAliases: [], display: "A blue signboard", draw: "signboard" },
      { thing: "track", colour: "grey", colourAliases: ["gray"], display: "A grey track", draw: "track" },
      { thing: "tunnel", colour: "brown", colourAliases: [], display: "A brown tunnel", draw: "tunnel" },
      { thing: "whistle", colour: "orange", colourAliases: [], display: "An orange whistle", draw: "whistle" },
      { thing: "flag", colour: "pink", colourAliases: [], display: "A pink flag", draw: "flag" },
      { thing: "trolley", colour: "black", colourAliases: [], display: "A black trolley", draw: "trolley" }
    ] },
    story: "On Friday evening, Yusuf, a 12-year-old boy from Palakkad, went to the market with his uncle, Kareem. Yusuf wanted to buy a spinning top for his little brother, but he had only 15 rupees. The shopkeeper, Mr. Ali, smiled and said, 'Take it for 15 rupees.' Yusuf was very happy. On the way home, they saw an old man carrying a heavy bundle. Yusuf and his uncle helped him carry it to his house. The old man thanked them and gave Yusuf two guavas. Yusuf gave one guava to his brother and kept one for himself. On the way home, they stopped at a small tea shop and drank two cups of hot tea. Yusuf told the shopkeeper about the kind old man.",
    questions: [
      { q: "What day was it?", keywords: ["friday"] },
      { q: "How old is Yusuf?", keywords: ["12", "twelve"] },
      { q: "Where is Yusuf from?", keywords: ["palakkad"] },
      { q: "Who went with Yusuf?", keywords: ["kareem", "uncle"] },
      { q: "What did Yusuf want to buy?", keywords: ["spinning top", "top"] },
      { q: "How much money did he have?", keywords: ["15", "fifteen", "rupees"] },
      { q: "Who sold him the top?", keywords: ["ali", "shopkeeper"] },
      { q: "What was the old man carrying?", keywords: ["bundle", "heavy bundle"] },
      { q: "What did the old man give Yusuf?", keywords: ["guava", "guavas", "two"] },
      { q: "Who got the other guava?", keywords: ["brother"] }
    ]
  },
  {
    n: 4, title: "Level 4 — Rainy Day", desc: "5–6 letter words · 2-digit numbers · bedroom scene · longer story",
    words: ["shirt", "jacket", "pocket", "button", "zipper", "pillow", "carpet", "towel", "sponge", "brush", "glove", "scarf", "socks", "shoes", "dress"],
    numbers: [10, 28, 33, 41, 49, 56, 62, 77, 85, 96],
    scene: { name: "Bedroom", items: [
      { thing: "curtain", colour: "blue", colourAliases: [], display: "A blue curtain", draw: "curtain" },
      { thing: "wardrobe", colour: "brown", colourAliases: [], display: "A brown wardrobe", draw: "wardrobe" },
      { thing: "bedsheet", colour: "white", colourAliases: [], display: "A white bedsheet", draw: "bedsheet" },
      { thing: "cushion", colour: "pink", colourAliases: [], display: "A pink cushion", draw: "cushion" },
      { thing: "teddy", colour: "yellow", colourAliases: [], display: "A yellow teddy", draw: "teddy" },
      { thing: "plant", colour: "green", colourAliases: [], display: "A green plant", draw: "plant" },
      { thing: "shelf", colour: "orange", colourAliases: [], display: "An orange shelf", draw: "shelf" },
      { thing: "rug", colour: "purple", colourAliases: [], display: "A purple rug", draw: "rug" },
      { thing: "alarm bell", colour: "grey", colourAliases: ["gray"], display: "A grey alarm bell", draw: "alarmbell" },
      { thing: "photo frame", colour: "red", colourAliases: [], display: "A red photo frame", draw: "photoframe" }
    ] },
    story: "On Saturday morning, Aisha, an 11-year-old girl from Wayanad, woke up to the sound of rain. She looked out of her window and saw the rain falling on the roof. Her father, Rasheed, said, 'No school today — it is raining too much.' Aisha was happy. She made hot tea for her family and read a book about kings and queens. At noon, the rain stopped. Aisha's mother made hot soup for lunch, and they all ate together by the window. Aisha and her sister, Zainab, went out and saw a big rainbow in the sky. They counted seven colours in the rainbow. In the evening, Aisha drew a picture of the rainbow and showed it to her mother, Salma.",
    questions: [
      { q: "What day was it?", keywords: ["saturday"] },
      { q: "How old is Aisha?", keywords: ["11", "eleven"] },
      { q: "Where is Aisha from?", keywords: ["wayanad"] },
      { q: "What woke Aisha up?", keywords: ["rain"] },
      { q: "Who said there was no school?", keywords: ["rasheed", "father"] },
      { q: "What did Aisha make for her family?", keywords: ["tea", "hot tea"] },
      { q: "What was her book about?", keywords: ["kings", "queens"] },
      { q: "When did the rain stop?", keywords: ["noon"] },
      { q: "How many colours did they count in the rainbow?", keywords: ["seven", "7"] },
      { q: "Who did Aisha show her picture to?", keywords: ["salma", "mother"] }
    ]
  },
  {
    n: 5, title: "Level 5 — The Big Catch", desc: "6–7 letter words · 3-digit numbers · hospital scene · 150-word story",
    words: ["valley", "desert", "island", "meadow", "jungle", "volcano", "glacier", "canyon", "harbour", "village", "temple", "mosque", "palace", "museum", "orchard"],
    numbers: [105, 218, 326, 437, 549, 651, 764, 873, 982, 109],
    scene: { name: "Hospital", items: [
      { thing: "cross", colour: "red", colourAliases: [], display: "A red cross", draw: "cross" },
      { thing: "wheelchair", colour: "blue", colourAliases: [], display: "A blue wheelchair", draw: "wheelchair" },
      { thing: "stretcher", colour: "green", colourAliases: [], display: "A green stretcher", draw: "stretcher" },
      { thing: "bandage", colour: "yellow", colourAliases: [], display: "A yellow bandage", draw: "bandage" },
      { thing: "coat", colour: "white", colourAliases: [], display: "A white coat", draw: "coat" },
      { thing: "nurse cap", colour: "pink", colourAliases: [], display: "A pink nurse cap", draw: "nursecap" },
      { thing: "crutch", colour: "brown", colourAliases: [], display: "A brown crutch", draw: "crutch" },
      { thing: "thermometer", colour: "grey", colourAliases: ["gray"], display: "A grey thermometer", draw: "thermometer" },
      { thing: "medicine box", colour: "orange", colourAliases: [], display: "An orange medicine box", draw: "medicinebox" },
      { thing: "ambulance", colour: "purple", colourAliases: [], display: "A purple ambulance", draw: "ambulance" }
    ] },
    story: "On Sunday morning, Hassan, a 13-year-old boy from Beypore, went fishing with his grandfather, Moosa. They walked to the shore before sunrise, carrying their fishing rods. Hassan held his rod while his grandfather showed him where to cast the line. After one hour, Hassan felt a strong pull. He pulled hard and caught a big fish that weighed two kilos. His grandfather smiled and said, 'You are a brave fisherman!' His grandfather was very proud of him. They sold the fish for 150 rupees and bought rice, vegetables and a new fishing net. Hassan's mother cooked the fish for lunch, and the whole family ate together. Hassan kept the new fishing net in a corner of his house. On the way home, Hassan gave 60 rupees to a poor man sitting near the bus stop. They reached home before dark. In the evening, Hassan told his friends about the big fish.",
    questions: [
      { q: "What day was it?", keywords: ["sunday"] },
      { q: "How old is Hassan?", keywords: ["13", "thirteen"] },
      { q: "Where is Hassan from?", keywords: ["beypore"] },
      { q: "Who went fishing with Hassan?", keywords: ["moosa", "grandfather"] },
      { q: "What did they carry to the shore?", keywords: ["rod", "rods", "fishing rod"] },
      { q: "How long before Hassan felt a pull?", keywords: ["hour", "1 hour", "one hour"] },
      { q: "How much did the fish weigh?", keywords: ["kilo", "kilos", "two", "2"] },
      { q: "How much did they sell the fish for?", keywords: ["150", "rupees"] },
      { q: "How much did Hassan give the poor man?", keywords: ["60", "sixty", "rupees"] },
      { q: "Who did Hassan tell about the big fish?", keywords: ["friends"] }
    ]
  },
  {
    n: 6, title: "Level 6 — On Stage", desc: "6–7 letter words · 3-digit numbers · mosque scene · 150-word story",
    words: ["cricket", "hockey", "tennis", "boxing", "racing", "jumping", "running", "fishing", "hunting", "cooking", "reading", "writing", "drawing", "singing", "dancing"],
    numbers: [127, 234, 345, 456, 567, 678, 789, 891, 902, 135],
    scene: { name: "Mosque", items: [
      { thing: "dome", colour: "green", colourAliases: [], display: "A green dome", draw: "dome" },
      { thing: "minaret", colour: "white", colourAliases: [], display: "A white minaret", draw: "minaret" },
      { thing: "crescent", colour: "gold", colourAliases: ["golden"], display: "A golden crescent", draw: "crescent" },
      { thing: "door", colour: "brown", colourAliases: [], display: "A brown door", draw: "door" },
      { thing: "prayer mat", colour: "red", colourAliases: [], display: "A red prayer mat", draw: "prayermat" },
      { thing: "arch", colour: "blue", colourAliases: [], display: "A blue arch", draw: "arch" },
      { thing: "loudspeaker", colour: "grey", colourAliases: ["gray"], display: "A grey loudspeaker", draw: "loudspeaker" },
      { thing: "slipper rack", colour: "yellow", colourAliases: [], display: "A yellow slipper rack", draw: "slipperrack" },
      { thing: "ablution tap", colour: "white", colourAliases: [], display: "A white ablution tap", draw: "ablutiontap" },
      { thing: "plant pot", colour: "pink", colourAliases: [], display: "A pink plant pot", draw: "plantpot" }
    ] },
    story: "On Monday, the children of Class 5 acted in a play about a kind king. Farhan, a 12-year-old boy, played the king. His friend, Imran, played a farmer, and Layla played a queen. The children had practised the play for one whole month. Farhan practised his lines every day for two weeks. His mother stitched his red robe in two days. Imran wore a farmer's hat made of straw, and Layla wore a long blue dress. The play started at 10 o'clock in the morning. Farhan wore a golden crown and a red robe. He spoke his lines loudly and clearly. At the end, the king gave food to all the poor people in his kingdom. The audience clapped for five minutes. The head teacher, Mr. Basheer, gave Farhan a gold medal and said, 'You were the best king!' Farhan kept the medal in a small wooden case at home.",
    questions: [
      { q: "What day was it?", keywords: ["monday"] },
      { q: "Which class acted in the play?", keywords: ["class 5", "5"] },
      { q: "What was the play about?", keywords: ["king", "kind king"] },
      { q: "Who played the king?", keywords: ["farhan"] },
      { q: "Who played the farmer?", keywords: ["imran"] },
      { q: "Who played the queen?", keywords: ["layla"] },
      { q: "What time did the play start?", keywords: ["10", "ten"] },
      { q: "What did Farhan wear?", keywords: ["crown", "robe", "golden", "red"] },
      { q: "How long did the audience clap?", keywords: ["five", "5", "minutes"] },
      { q: "Who gave Farhan the medal?", keywords: ["basheer", "head teacher"] }
    ]
  },
  {
    n: 7, title: "Level 7 — The School Trip", desc: "7–9 letter words · 3-digit numbers · zoo scene · 180-word story",
    words: ["giraffe", "leopard", "cheetah", "panther", "buffalo", "ostrich", "penguin", "vulture", "hamster", "tortoise", "crocodile", "kangaroo", "scorpion", "mosquito", "hedgehog"],
    numbers: [148, 259, 367, 478, 589, 693, 704, 815, 926, 130],
    scene: { name: "Zoo", items: [
      { thing: "zebra", colour: "black and white", colourAliases: ["black", "white"], display: "A black and white zebra", draw: "zebra" },
      { thing: "hippo", colour: "grey", colourAliases: ["gray"], display: "A grey hippo", draw: "hippo" },
      { thing: "rhino", colour: "brown", colourAliases: [], display: "A brown rhino", draw: "rhino" },
      { thing: "gorilla", colour: "black", colourAliases: [], display: "A black gorilla", draw: "gorilla" },
      { thing: "flamingo", colour: "pink", colourAliases: [], display: "A pink flamingo", draw: "flamingo" },
      { thing: "snake", colour: "green", colourAliases: [], display: "A green snake", draw: "snake" },
      { thing: "swan", colour: "white", colourAliases: [], display: "A white swan", draw: "swan" },
      { thing: "orangutan", colour: "orange", colourAliases: [], display: "An orange orangutan", draw: "orangutan" },
      { thing: "panda", colour: "red", colourAliases: [], display: "A red panda", draw: "panda" },
      { thing: "macaw", colour: "blue", colourAliases: [], display: "A blue macaw", draw: "macaw" }
    ] },
    story: "Last month, Rashid, a 14-year-old boy from Kottayam, went on a school trip to the hills with his classmates and two teachers, Mr. Nair and Mrs. Pillai. They left school at 6 o'clock in the morning in a big green bus. The bus driver, Mr. Thomas, drove slowly on the narrow road. After three hours, they reached a small village near a lake. The children walked up a steep path for two hours and saw many deer and squirrels. Rashid took ten photos with his new camera. At noon, they ate lunch under a big tree — rice, curry and papaya. Rashid sat next to his best friend, Anand, and they shared their lunch. The teachers told the children not to go near the edge of the hill. Rashid listened carefully and stayed with his group. In the afternoon, it started to rain, so they ran back to the bus. On the way back, they sang songs in the bus. Rashid was wet, but he was very happy. He showed his photos to his mother that night.",
    questions: [
      { q: "How old is Rashid?", keywords: ["14", "fourteen"] },
      { q: "Where is Rashid from?", keywords: ["kottayam"] },
      { q: "Who went with the children?", keywords: ["nair", "pillai", "teachers"] },
      { q: "What time did they leave school?", keywords: ["6", "six"] },
      { q: "What colour was the bus?", keywords: ["green"] },
      { q: "How long did the journey take?", keywords: ["three", "3", "hours"] },
      { q: "What did they see on the path?", keywords: ["deer", "squirrel", "squirrels"] },
      { q: "How many photos did Rashid take?", keywords: ["ten", "10"] },
      { q: "What did they eat for lunch?", keywords: ["rice", "curry", "papaya"] },
      { q: "When did it start to rain?", keywords: ["afternoon"] }
    ]
  },
  {
    n: 8, title: "Level 8 — The Science Fair", desc: "7–9 letter words · 3-digit numbers · sports ground · 180-word story",
    words: ["scissors", "envelope", "magazine", "newspaper", "telephone", "computer", "keyboard", "backpack", "suitcase", "headphone", "calendar", "stapler", "printer", "monitor", "speaker"],
    numbers: [162, 273, 384, 495, 506, 617, 728, 839, 940, 151],
    scene: { name: "Sports ground", items: [
      { thing: "football", colour: "white", colourAliases: [], display: "A white football", draw: "football" },
      { thing: "goalpost", colour: "green", colourAliases: [], display: "A green goalpost", draw: "goalpost" },
      { thing: "trophy", colour: "red", colourAliases: [], display: "A red trophy", draw: "trophy" },
      { thing: "jersey", colour: "blue", colourAliases: [], display: "A blue jersey", draw: "jersey" },
      { thing: "cone", colour: "orange", colourAliases: [], display: "An orange cone", draw: "cone" },
      { thing: "boots", colour: "black", colourAliases: [], display: "Black boots", draw: "boots" },
      { thing: "headband", colour: "yellow", colourAliases: [], display: "A yellow headband", draw: "headband" },
      { thing: "scoreboard", colour: "grey", colourAliases: ["gray"], display: "A grey scoreboard", draw: "scoreboard" },
      { thing: "ribbon", colour: "purple", colourAliases: [], display: "A purple ribbon", draw: "ribbon" },
      { thing: "badminton racket", colour: "red", colourAliases: [], display: "A red badminton racket", draw: "badmintonracket" }
    ] },
    story: "On Tuesday, Amina, a 13-year-old girl from Kasaragod, took part in a science fair at her school. She made a model of the solar system with nine planets. Amina had worked on her model for three weeks. She used cardboard, paint and small balls to make the planets. Her father bought the paint for 80 rupees. Her model had a big yellow circle in the middle and the Earth was blue and green. Amina's model was the biggest one at the fair. Many children came to see it and asked her questions about the planets. Amina explained her model to three judges. She told them that the Earth takes 365 days to complete one round. The judges asked her ten questions, and she answered all of them correctly. In the evening, the chief guest, Dr. Hameed, gave Amina the first prize — a telescope and a certificate. Amina's friends cheered loudly when her name was called. Her mother took many photos of Amina with her prize. Amina was very happy. She thanked her science teacher, Mrs. Rekha, who had helped her for one month.",
    questions: [
      { q: "What day was it?", keywords: ["tuesday"] },
      { q: "How old is Amina?", keywords: ["13", "thirteen"] },
      { q: "Where is Amina from?", keywords: ["kasaragod"] },
      { q: "What did Amina make?", keywords: ["model", "solar system"] },
      { q: "How many planets did her model have?", keywords: ["nine", "9"] },
      { q: "What colour was the Earth in her model?", keywords: ["blue", "green"] },
      { q: "How many days does the Earth take to complete one round?", keywords: ["365"] },
      { q: "How many questions did the judges ask?", keywords: ["ten", "10"] },
      { q: "Who gave Amina the first prize?", keywords: ["hameed"] },
      { q: "What was the first prize?", keywords: ["telescope", "certificate"] }
    ]
  },
  {
    n: 9, title: "Level 9 — The Pilot's Nephew", desc: "9–12 letter words · 3-digit numbers · workshop scene · 200-word story",
    words: ["adventure", "beautiful", "chocolate", "different", "important", "knowledge", "afternoon", "yesterday", "friendship", "playground", "waterfall", "sunflower", "grasshopper", "caterpillar", "helicopter"],
    numbers: [173, 284, 395, 406, 517, 628, 739, 840, 951, 117],
    scene: { name: "Workshop", items: [
      { thing: "hammer", colour: "red", colourAliases: [], display: "A red hammer", draw: "hammer" },
      { thing: "screwdriver", colour: "blue", colourAliases: [], display: "A blue screwdriver", draw: "screwdriver" },
      { thing: "saw", colour: "yellow", colourAliases: [], display: "A yellow saw", draw: "saw" },
      { thing: "wrench", colour: "green", colourAliases: [], display: "A green wrench", draw: "wrench" },
      { thing: "workbench", colour: "brown", colourAliases: [], display: "A brown workbench", draw: "workbench" },
      { thing: "vice", colour: "grey", colourAliases: ["gray"], display: "A grey vice", draw: "vice" },
      { thing: "drill", colour: "orange", colourAliases: [], display: "An orange drill", draw: "drill" },
      { thing: "toolbox", colour: "black", colourAliases: [], display: "A black toolbox", draw: "toolbox" },
      { thing: "helmet", colour: "white", colourAliases: [], display: "A white helmet", draw: "helmet" },
      { thing: "safety glasses", colour: "pink", colourAliases: [], display: "Pink safety glasses", draw: "safetyglasses" }
    ] },
    story: "Last year, during the summer holidays, Tariq, a 15-year-old boy from Alappuzha, visited his uncle, Captain Rafiq, who is a pilot. His uncle took him to the airport and showed him a big white aeroplane. Tariq's mother packed sandwiches for the trip, and they ate them at the airport. Tariq sat in the pilot's seat and held the steering wheel. His uncle explained that the aeroplane can fly at a height of 10,000 metres and can carry 200 passengers. Tariq's uncle has been a pilot for ten years. He has flown to many countries, including Saudi Arabia, the UAE and Malaysia. Tariq asked his uncle which country he liked the most. His uncle smiled and said, 'I love flying over the sea at sunset.' Tariq asked many questions about flying, wind and storms. Tariq took many photos of the aeroplanes with his father's camera. In the afternoon, they watched three aeroplanes take off, one after another. Tariq's uncle gave him a small model aeroplane and a pilot's cap. Tariq kept them on his shelf. On the way home, Tariq told his mother everything he had seen. His mother said, 'Study well, and one day you will fly a plane too.' He now wants to become a pilot when he grows up.",
    questions: [
      { q: "When did Tariq visit his uncle?", keywords: ["summer", "holidays", "last year"] },
      { q: "How old is Tariq?", keywords: ["15", "fifteen"] },
      { q: "Where is Tariq from?", keywords: ["alappuzha"] },
      { q: "Who is Captain Rafiq?", keywords: ["uncle", "rafiq", "pilot"] },
      { q: "What colour was the aeroplane?", keywords: ["white"] },
      { q: "What did Tariq hold?", keywords: ["steering wheel", "wheel"] },
      { q: "How high can the aeroplane fly?", keywords: ["10000", "10000 metres", "10000 meters"] },
      { q: "How many passengers can it carry?", keywords: ["200"] },
      { q: "How many aeroplanes did they watch take off?", keywords: ["three", "3"] },
      { q: "What did his uncle give him?", keywords: ["model aeroplane", "cap", "pilot's cap", "pilots cap"] }
    ]
  },
  {
    n: 10, title: "Level 10 — The Young Inventor", desc: "9–12 letter words · 3-digit numbers · bakery scene · 200-word story",
    words: ["astronomy", "geography", "mathematics", "laboratory", "university", "celebration", "competition", "information", "education", "literature", "microscope", "telescope", "photograph", "environment", "government"],
    numbers: [184, 295, 306, 417, 528, 639, 740, 851, 962, 129],
    scene: { name: "Bakery", items: [
      { thing: "mixing bowl", colour: "red", colourAliases: [], display: "A red mixing bowl", draw: "mixingbowl" },
      { thing: "tray", colour: "blue", colourAliases: [], display: "A blue tray", draw: "tray" },
      { thing: "apron", colour: "green", colourAliases: [], display: "A green apron", draw: "apron" },
      { thing: "rolling pin", colour: "yellow", colourAliases: [], display: "A yellow rolling pin", draw: "rollingpin" },
      { thing: "flour sack", colour: "white", colourAliases: [], display: "A white flour sack", draw: "floursack" },
      { thing: "cupcake", colour: "pink", colourAliases: [], display: "A pink cupcake", draw: "cupcake" },
      { thing: "cookie jar", colour: "orange", colourAliases: [], display: "An orange cookie jar", draw: "cookiejar" },
      { thing: "whisk", colour: "purple", colourAliases: [], display: "A purple whisk", draw: "whisk" },
      { thing: "spatula", colour: "black", colourAliases: [], display: "A black spatula", draw: "spatula" },
      { thing: "croissant", colour: "brown", colourAliases: [], display: "A brown croissant", draw: "croissant" }
    ] },
    story: "Two years ago, Nihal, a 16-year-old boy from Kollam, built a small robot with his friends at school. They used old wires, four small motors and a battery. The robot could move forward, turn left and right, and pick up small objects. Nihal named the robot 'Chintu'. Nihal's friends, Adil and Zaid, helped him build the robot. Adil fixed the wires, and Zaid painted the robot blue. The robot's eyes were two small red lights that blinked when it moved. Nihal and his friends worked on the robot for three months. They met every Saturday in the school lab. Sometimes the robot did not work, and they had to start again. But they never gave up. Nihal's father, Mr. Kareem, bought them new wires when the old ones broke. One day, the head teacher asked Nihal to show the robot to the whole school. More than 300 students watched as Chintu picked up a coin and dropped it into a bowl. Everyone clapped loudly. The science teacher, Mr. Joseph, gave Nihal a certificate and a medal. The head teacher said the robot was the best project in the school this year. Nihal now dreams of building a bigger robot that can help old people carry heavy things.",
    questions: [
      { q: "When did Nihal build the robot?", keywords: ["two years ago", "two years"] },
      { q: "How old is Nihal?", keywords: ["16", "sixteen"] },
      { q: "Where is Nihal from?", keywords: ["kollam"] },
      { q: "What did they use to build the robot?", keywords: ["wires", "motors", "battery"] },
      { q: "What did Nihal name the robot?", keywords: ["chintu"] },
      { q: "How many students watched?", keywords: ["300"] },
      { q: "What did Chintu pick up?", keywords: ["coin"] },
      { q: "Where did Chintu drop it?", keywords: ["bowl"] },
      { q: "Who gave Nihal the prize?", keywords: ["joseph", "science teacher"] },
      { q: "What does Nihal dream of building?", keywords: ["bigger robot", "robot"] }
    ]
  }
];

module.exports = { MT_GAME_PASS_MARK, MT_GAME_TOTAL, MT_GAME_ROUNDS, MT_GAME_LEVELS };
