const moora = require("./src/lib/moora");
const normalize = require("./src/lib/normalize");
const convertWeight = require("./src/lib/convertWeight");
const preferenceConversion = require("./src/lib/preferenceConversion");

// const decision = [
//   [4, 2, 2, 3],
//   [2, 4, 3, 2],
//   [3, 3, 4, 1],
// ];
// const weight = [0.5, 0.2, 0.1, 0.2];
// const isBenefit = [true, true, true, false];

// const decision2 = [
//   [500000, 15],
//   [600000, 6],
//   [1000000, 3],
//   [650000, 10],
//   [500000, 7],
//   [600000, 3],
//   [400000, 5],
//   [700000, 10],
//   [500000, 8],
//   [1200000, 10],
// ];
// console.log(normalize(decision2, { min: 0.25, max: 1 }));

// const decision3 = [
//   [0.34375, 1, 0.25, 0.5, 0.5],
//   [0.4375, 0.4375, 0.5, 0.5, 0.5],
//   [0.8125, 0.25, 0.75, 0.5, 0.25],
//   [0.484375, 0.6875, 0.5, 0.5, 0.5],
//   [0.34375, 0.5, 0.25, 0.5, 0.5],
//   [0.4375, 0.25, 0.5, 0.25, 0.25],
//   [0.25, 0.375, 0.25, 0.25, 0.25],
//   [0.53125, 0.6875, 0.5, 0.5, 0.5],
//   [0.34375, 0.5625, 0.25, 0.5, 0.5],
//   [1, 0.6875, 0.75, 0.5, 0.5],
// ];

// const weight2 = [0.25, 0.2, 0.2, 0.2, 0.15];
// const isBenefit2 = [false, true, false, false, false];

// console.log(moora(decision, weight, isBenefit));
// console.log(moora(decision3, weight2, isBenefit2));

const preference = [
  250000,
  2000,
  16000,
  2,
  1000,
  ["Windows"],
  ["Simulation", "Strategy", "Adventure"],
  ["Singleplayer"],
  false,
  ["Building", "Management", "Sandbox"],
];

const input = [
  [
    436533,
    8000,
    6000,
    2,
    1000,
    ["Windows"],
    ["Simulation", "Strategy"],
    ["Multiplayer"],
    false,
    ["Building", "Management", "Sandbox"],
  ],
  [
    135999,
    6000,
    20000,
    2,
    2000,
    ["Windows"],
    ["Action", "Adventure"],
    ["Multiplayer", "Coop"],
    false,
    ["Horror", "Survival", "Open World"],
  ],
  [
    239998,
    2000,
    5000,
    1.8,
    520,
    ["Windows"],
    ["Sport", "Racing", "Casual"],
    ["Multiplayer", "Coop"],
    false,
    ["Football", "Teambased"],
  ],
  [
    552419,
    4000,
    72000,
    2,
    2000,
    ["Windows"],
    ["Action", "RPG"],
    ["Multiplayer", "Singleplayer"],
    false,
    ["Comedy", "Shooter", "Crime"],
  ],
  [
    199999,
    4000,
    500,
    1.8,
    1000,
    ["Windows", "Mac OS", "Steam OS"],
    ["Simulation", "Action", "Strategy"],
    ["Singleplayer"],
    false,
    ["Open World", "2D", "Pixel"],
  ],
];

inputAsli = [
  [
    799000,
    8000,
    50000,
    3.3,
    4000,
    ["Windows"],
    ["Action"],
    ["Singleplayer", "Multiplayer"],
    false,
    ["FPS"],
  ],
  [
    249000,
    12000,
    67000,
    3.2,
    6000,
    ["Windows"],
    ["Action", "Adventure"],
    ["Singleplayer"],
    true,
    ["FPS"],
  ],
  [
    824999,
    8000,
    45000,
    3.2,
    2000,
    ["Windows"],
    ["Action", "Horror"],
    ["Singleplayer", "Multiplayer", "Coop"],
    false,
    ["TPS", "Gore"],
  ],
  [
    139999,
    8000,
    20000,
    3.2,
    2000,
    ["Windows"],
    ["Action", "Adventure"],
    ["Singleplayer"],
    false,
    ["2D Side Scroller"],
  ],
  [
    139999,
    8000,
    15000,
    3.2,
    2000,
    ["Windows"],
    ["Action"],
    ["Multiplayer"],
    false,
    ["TPS"],
  ],
];

const decisionMatrix = preferenceConversion(input, preference);
const normalizedDecisionmatrix = normalize(decisionMatrix, { min: 0, max: 1 });
// console.log(normalizedDecisionmatrix);
const weight = [5, 3, 3, 3, 3, 3, 5, 3, 5, 3];
const newWeight = convertWeight(weight);
const isBenefit = [
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
];
console.log(moora(normalizedDecisionmatrix, newWeight, isBenefit));
