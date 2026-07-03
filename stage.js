// STAGES

const stages = {
    classic: [],
    box: [],
    tunnel: [],
    cross: [],
    mage: [],
    bigMage: [],
    windows: []
};

// CLASSIC

stages.classic = [];

// BOX

// Top & Bottom

for (let x = 0; x < board_size; x++) {

    stages.box.push({ x, y: 0 });
    stages.box.push({ x, y: board_size - 1 });

}

// Left & Right

for (let y = 1; y < board_size - 1; y++) {

    stages.box.push({ x: 0, y });
    stages.box.push({ x: board_size - 1, y });

}

// TUNNEL

// Top

for (let x = 0; x <= 8; x++) {
    stages.tunnel.push({ x, y: 8 });
}

for (let x = 13; x < board_size; x++) {
    stages.tunnel.push({ x, y: 8 });
}

// Bottom

for (let x = 0; x <= 7; x++) {
    stages.tunnel.push({ x, y: 13 });
}

for (let x = 13; x < board_size; x++) {
    stages.tunnel.push({ x, y: 13 });
}

// Left

for (let y = 0; y <= 7; y++) {
    stages.tunnel.push({ x: 8, y });
}

for (let y = 13; y < board_size; y++) {
    stages.tunnel.push({ x: 8, y });
}

// Right

for (let y = 0; y <= 7; y++) {
    stages.tunnel.push({ x: 13, y });
}

for (let y = 13; y < board_size; y++) {
    stages.tunnel.push({ x: 13, y });
}

// CROSS

// Vertical

for (let y = 0; y < board_size; y++) {

    stages.cross.push({
        x: Math.floor(board_size / 2),
        y
    });

}

// Horizontal

for (let x = 0; x < board_size; x++) {

    stages.cross.push({
        x,
        y: Math.floor(board_size / 2)
    });

}

// MAGE

while (stages.mage.length < 20) {

    const x = Math.floor(Math.random() * board_size);
    const y = Math.floor(Math.random() * board_size);

    if (
        (x === 5 && y === 5) ||
        (x === 4 && y === 5) ||
        (x === 3 && y === 5)
    ) {
        continue;
    }

    //  no duplicate wall
    if (
        stages.mage.some(wall => wall.x === x && wall.y === y)
    ) {
        continue;
    }

    stages.mage.push({ x, y });

}

// BIG MAGE

while (stages.bigMage.length < 40) {

    const x = Math.floor(Math.random() * board_size);
    const y = Math.floor(Math.random() * board_size);

    if (
        (x === 5 && y === 5) ||
        (x === 4 && y === 5) ||
        (x === 3 && y === 5)
    ) {
        continue;
    }

    //  no duplicate wall
    if (
        stages.bigMage.some(wall => wall.x === x && wall.y === y)
    ) {
        continue;
    }

    stages.bigMage.push({ x, y });

}

// WINDOWS 

// Top & Bottom

for (let x = 0; x < board_size; x++) {

    stages.windows.push({ x, y: 0 });
    stages.windows.push({ x, y: board_size - 1 });

}

// Left & Right

for (let y = 1; y < board_size - 1; y++) {

    stages.windows.push({ x: 0, y });
    stages.windows.push({ x: board_size - 1, y });

}

// Vertical

for (let y = 0; y < board_size; y++) {
    
    if(y===Math.floor(board_size / 4) || y===3*Math.floor(board_size / 4)){
        continue ;
    }
    
    stages.windows.push({
        x: Math.floor(board_size / 2),
        y
    });

}

// Horizontal

for (let x = 0; x < board_size; x++) {
    
    if(x===Math.floor(board_size / 4) || x===3*Math.floor(board_size / 4)){
        continue ;
    }

    stages.windows.push({
        x,
        y: Math.floor(board_size / 2)
    });

}

// LOAD STAGE

function loadStage(stageName) {

    walls = [...stages[stageName]];

}

// DRAW WALLS

function drawWalls() {

    // Remove old walls

    for (let y = 0; y < board_size; y++) {

        for (let x = 0; x < board_size; x++) {

            cells[y][x].classList.remove("wall");

        }

    }

    // Draw new walls

    for (const wall of walls) {

        cells[wall.y][wall.x].classList.add("wall");

    }

}

// CHECK WALL

function isWall(x, y) {

    return walls.some(wall => wall.x === x && wall.y === y);

}