// DRAW SNAKE

function drawSnake() {

    // Remove old snake

    for (let y = 0; y < board_size; y++) {

        for (let x = 0; x < board_size; x++) {

            cells[y][x].classList.remove("snake");
            cells[y][x].classList.remove("head");

        }

    }

    // Draw body

    for (const part of snake) {

        cells[part.y][part.x].classList.add("snake");

    }

    // Draw head

    cells[snake[0].y][snake[0].x].classList.add("head");

}

// UPDATE SNAKE

function updateSnake(newHead) {

    // Apple

    if (isFoodEaten(apple)) {

        snake.unshift(newHead);

        removeFood(apple);

        spawnFood(apple);

        return;

    }
    
    // Diamond 
    
    if (isFoodEaten(diamond)) {

        snake.unshift(newHead);

        removeFood(diamond);

        return;

    }
    
    // Rare Diamond 
    
    if (isFoodEaten(rareDiamond)) {

        snake.unshift(newHead);

        removeFood(rareDiamond);

        return;

    }
    
    // Bomb
    
    if (isFoodEaten(bomb)) {

        snake.unshift(newHead);

        removeFood(bomb);
        
        gameOver.hidden = false;

        clearInterval(game);

        playGameOverSound();

        return;

    }

    // Poison

    if (isFoodEaten(poison)) {

        removeFood(poison);

        if (snake.length > 3) {

            snake.pop();

        }

        snake.unshift(newHead);

        return;

    }

    // Speed Up

    if (isFoodEaten(speedUp)) {

        removeFood(speedUp);

        speedIncrease();

        snake.pop();

        snake.unshift(newHead);

        return;

    }

    // Speed Down

    if (isFoodEaten(speedDown)) {

        removeFood(speedDown);

        speedDecrease();

        snake.pop();

        snake.unshift(newHead);

        return;

    }

    // Normal Move

    snake.pop();

    snake.unshift(newHead);

}

// ==========================
// COLLISION
// ==========================

function checkCollision(newHead) {

    // Wall

    if (isWall(newHead.x, newHead.y)) {

        return true;

    }

    // Self

    for (const part of snake) {

        if (
            newHead.x === part.x &&
            newHead.y === part.y
        ) {

            return true;

        }

    }

    return false;

}

// ==========================
// RESET SNAKE
// ==========================

function resetSnake() {

    snake = [

        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }

    ];

    direction = "right";

}