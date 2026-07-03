const eatSound = new Audio("eat.mp3");
const levelUpSound = new Audio("levelUp.mp3");
const gameOverSound = new Audio("gameOver.mp3");
const bonusSound = new Audio("bonus.mp3");

eatSound.preload = "auto";
levelUpSound.preload = "auto";
gameOverSound.preload = "auto";
bonusSound.preload = "auto";

function playEatSound() {
    eatSound.currentTime = 0;
    eatSound.play();
}

function playLevelUpSound() {
    levelUpSound.currentTime = 0;
    levelUpSound.play();
}

function playGameOverSound() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
}

function playBonusSound() {
    bonusSound.currentTime = 0;
    bonusSound.play();
}