// ==========================
// FOOD OBJECTS
// ==========================

const apple = {
    x: null,
    y: null,
    type: "apple",
    active: false
};

const diamond = {
    x: null,
    y: null,
    type: "diamond",
    active: false,
    duration: 4000
};

const rareDiamond={
    x: null,
    y: null,
    type: "rareDiamond",
    active: false,
    duration: 4000
}

const bomb={
    x: null,
    y: null,
    type: "bomb",
    active: false,
    duration: 4000
}

const poison = {
    x: null,
    y: null,
    type: "poison",
    active: false,
    duration: 5000
};

const speedUp = {
    x: null,
    y: null,
    type: "speedUp",
    active: false,
    duration: 5000
};

const speedDown = {
    x: null,
    y: null,
    type: "speedDown",
    active: false,
    duration: 5000
};

const foods = [
    apple,
    diamond,
    rareDiamond,
    bomb,
    poison,
    speedUp,
    speedDown
];

// CHECK POSITION

function isOnSnake(position) {

    return snake.some(part =>
        part.x === position.x &&
        part.y === position.y
    );

}

function isOccupied(position) {

    if (isOnSnake(position)) return true;

    if (isWall(position.x, position.y)) return true;

    return foods.some(food =>
        food.active &&
        food.x === position.x &&
        food.y === position.y
    );

}

// SPAWN FOOD

function spawnFood(food) {

    let position;

    do {

        position = {

            x: Math.floor(Math.random() * board_size),
            y: Math.floor(Math.random() * board_size)

        };

    }

    while (isOccupied(position));

    food.x = position.x;
    food.y = position.y;
    food.active = true;

    cells[food.y][food.x].classList.add(food.type);

    if (food !== apple) {

        setTimeout(() => {

            if (food.active) {

                removeFood(food);

            }

        }, food.duration);

    }

}

// REMOVE FOOD

function removeFood(food) {

    if (!food.active) return;

    cells[food.y][food.x].classList.remove(food.type);

    food.active = false;

}

// FOOD EATEN

function isFoodEaten(food) {

    return food.active &&
        snake[0].x === food.x &&
        snake[0].y === food.y;

}

// SPEED

function speedIncrease() {

    speed = Math.max(50, speed - 20);

    clearInterval(game);

    game = setInterval(gameLoop, speed);

}

function speedDecrease() {

    speed = Math.min(300, speed + 20);

    clearInterval(game);

    game = setInterval(gameLoop, speed);

}