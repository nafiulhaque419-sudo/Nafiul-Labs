// LOAD GAME

loadStage(currentStage);
drawWalls();
drawSnake();
spawnFood(apple);


// GAME LOOP

function gameLoop() {

    const head = snake[0];

    const move = directions[direction];

    let newHead = {

        x: head.x + move.x,

        y: head.y + move.y

    };

    // WRAP AROUND

    if (newHead.x < 0){
        newHead.x = board_size - 1; 
    }

    if (newHead.x >= board_size){
        newHead.x = 0;
    }

    if (newHead.y < 0){
        newHead.y = board_size - 1; 
    }

    if (newHead.y >= board_size){
        newHead.y = 0;
    }
            
            
    if (checkCollision(newHead)) {

        gameOver.hidden = false;

        clearInterval(game);

        playGameOverSound();

        return;

    }


    updateScoreAndLevel(newHead);

    updateSnake(newHead);

    drawSnake();

}

// RESTART

function restartGame() {

    clearInterval(game);

    removeFood(apple);

    resetSnake();

    scoreVal = 0;

    level = 1;

    speed = 150;

    score.textContent = "Score : 0";

    difficultyLevel.textContent = "Level : 1";

    gameOver.hidden = true;

    loadStage(currentStage);

    drawWalls();

    spawnFood(apple);

    drawSnake();

    game = setInterval(gameLoop, speed);

    isPlay = true;

    icon.classList.replace("fa-play", "fa-pause");

}

// RESTART ON CLICK

board.addEventListener("click", () => {

    if (!gameOver.hidden) {

        restartGame();

    }

});

// START GAME

game = setInterval(gameLoop, speed);