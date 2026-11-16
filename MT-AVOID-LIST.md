# Memory Test game — AVOID LIST (Practices 1–4, Muhammad Afeef, BNO14)

Source: SIBAQ26_Bidaya_Memory_Test_Practice1/2/3/4_Afeef.pdf (extracted with
pdftotext, Nov 2026). NOTHING below may be reused in the game — not as a
Round 1 word, Round 2 number, Round 3 scene/item, or Round 4 story fact.
Generic small words (the, a, boy, girl, went, morning, friend, etc.) are
unavoidable in stories and are NOT banned; the ban covers the memorizable
items and the distinctive story facts (names, places, numbers, objects).

## Round 1 — words (60, all banned as game Round 1 words)
- P1: Mango, River, Pencil, Elephant, Moon, School, Banana, Tiger, Book, Star, Garden, Horse, Orange, Mountain, Lamp
- P2: Apple, Ocean, Chair, Lion, Sun, Teacher, Grapes, Eagle, Pen, Cloud, Bridge, Rabbit, Flower, Castle, Drum
- P3: Window, Forest, Monkey, Guitar, Rain, Doctor, Strawberry, Dolphin, Clock, Snow, Camel, Piano, Butterfly, Rocket, Umbrella
- P4: Parrot, Balloon, Candle, Mirror, Basket, Cotton, Ladder, Peacock, Coconut, Bicycle, Feather, Lantern, Pumpkin, Sparrow, Blanket

## Round 2 — numbers, in order (40 values, all banned as game numbers)
- P1: 7, 42, 18, 95, 3, 61, 27, 84, 13, 50
- P2: 9, 35, 72, 14, 88, 26, 51, 63, 19, 47
- P3: 6, 58, 23, 91, 12, 76, 34, 69, 21, 45
- P4: 8, 54, 31, 67, 2, 79, 16, 93, 40, 25
(2-digit banned: 42, 18, 95, 61, 27, 84, 13, 50, 35, 72, 14, 88, 26, 51, 63,
19, 47, 58, 23, 91, 12, 76, 34, 69, 21, 45, 54, 31, 67, 79, 16, 93, 40, 25.
1-digit banned: 7, 3, 9, 6, 8, 2.)

## Round 3 — scenes + items (4 scenes, 40 items — scenes AND things banned)
- P1 market: red bicycle; basket of oranges; brown dog; blue umbrella;
  man selling flowers; white cat on a wall; three yellow balloons;
  green shop board; boy with a kite; clock showing 4 o'clock
- P2 park: blue swing; red ball; tall green tree; yellow kite in the sky;
  brown bench; white duck in a pond; four black birds; pink flower bed;
  girl with a skipping rope; fountain with blue water
- P3 beach: red crab on the sand; blue boat on the sea; yellow sun hat;
  green palm tree; brown coconut; three white seagulls; pink bucket and spade;
  boy building a sandcastle; girl swimming in the sea;
  lighthouse with red and white stripes
- P4 classroom: green chalkboard; four red chairs; blue school bag on a desk;
  yellow wall clock; brown teacher's table; white ceiling fan;
  boy raising his hand; pink water bottle; world map on the wall;
  three purple crayons in a box

## Round 4 — stories (4 plots — names, places, numbers, facts banned)
- P1: Omar, 12, Calicut, friend Bilal, library, 3 books (space, animals,
  Prophet's life), 2 mangoes, 20 rupees, grandmother Amina (70), 15 pages of
  the space book under a mango tree, Friday morning
- P2: Bilal, 11, Malappuram, sister Sara, park, 4 marbles (red, blue, green,
  yellow), friend Yusuf, 5 sweets, 2 sweets to Sara, 3 glasses of juice,
  30 rupees, 20 pages of a book about birds under a lamp, Sunday evening
- P3: Sara, 10, Kozhikode, mother Aisha, market, 6 apples for 45 rupees,
  2 notebooks for 25 rupees, teacher Mr. Rahman, storybook, little brother
  Arif (5), 12 pages of the storybook under a tree, Monday morning
- P4: Hamza, 9, Kannur, grandfather's house by train, father Saleem,
  train left 2 o'clock / reached 4 o'clock, small red bag, 7 dates,
  bottle of water, grandfather Ibrahim (65) with a white car, ate 4 dates,
  10 pages of a book about the sea under a banyan tree, Tuesday afternoon

## Also banned as game content (distinctive practice words in any round)
library, train, mango/mangoes, marble(s), dates, apple(s), juice, sweets,
notebook(s), storybook, lamp, kite, bicycle, boat, crab, coconut, chalkboard,
crayon(s), seagull(s), sandcastle, palm tree, skipping rope, fountain,
flower bed, shop board, balloons, oranges (basket of), umbrella, swing,
bench, duck, birds (black), crab, bucket, spade, sun hat, lighthouse,
ceiling fan, water bottle, world map, school bag, teacher's table, wall clock,
chairs (red), cat (white, on a wall), dog (brown), flowers (man selling),
space book, book about birds, book about the sea, banyan tree, white car,
Calicut, Malappuram, Kozhikode, Kannur, Omar, Bilal, Sara, Hamza, Amina,
Yusuf, Aisha, Arif, Saleem, Ibrahim, Mr. Rahman.

## Game content check (done when writing memory-test-data.js)
- All 150 Round 1 words: none in the 60-word list, none a Round 3 thing
  from the practices, none a key noun from the practice stories.
- All 100 Round 2 numbers: no exact value reused (2-digit levels use only
  values outside the 34 banned 2-digit values; 3-digit levels use values
  never seen in the practices).
- All 10 Round 3 scenes are new themes (kitchen, farm, railway station,
  bedroom, hospital, mosque, zoo, sports ground, workshop, bakery) and all
  100 items are new thing+colour pairs (no thing reused from the practices).
- All 10 Round 4 stories are new plots with new names, places and facts.
