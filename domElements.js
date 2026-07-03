// ==========================
// DOM ELEMENTS
// ==========================

// Board
const board = document.querySelector("#board");

const board_size = 20;
const cells = [];

// UI
const score = document.querySelector("#score");
const highScore = document.querySelector("#highScore");
const difficultyLevel = document.querySelector("#difficultyLevel");
const gameOver = document.querySelector("#gameOver");

const playPauseBtn = document.querySelector("#playPauseBtn");
const icon = document.querySelector("#icon");
const stageSelect = document.querySelector("#stageSelect");

// GAME VARIABLES

let scoreVal = 0;
let highScoreVal = 0;

let level = 1;
let speed = 150;

let game = null;
let isPlay = true;

// ==========================
// SNAKE
// ==========================

let snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
];

// ==========================
// DIRECTION
// ==========================

let direction = "right";

const directions = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 }
};

// ==========================
// STAGE
// ==========================

let walls = [];
let currentStage = "classic";