// gameSetup.js
let gameWidth = 800;
let gameHeight = 600;
let timerDuration = 600; // 10 minutes * 60 fps
let score = 0;
let timer; // Timer for countdown
let showInventory = false;
let isBluePowerUpActive = false;
let bluePowerUpDuration = 300; // Adjusted duration for using multiple blue power-ups
let bluePowerUpTimer = 0;

function setupGame() {
    createCanvas(gameWidth, gameHeight);
    playerPosition = createVector(gameWidth / 2, gameHeight / 2);
    powerUps = []; // Initialize powerUps array
    inventory = {}; // Initialize inventory object
    addPowerUps(5); // Initial set of power-ups
    timer = timerDuration; // Initialize the timer
}

