// ==========================
// CREATE BOARD
// ==========================

for (let y = 0; y < board_size; y++) {

    cells[y] = [];

    for (let x = 0; x < board_size; x++) {

        const cell = document.createElement("div");

        cell.classList.add("cell");

        board.appendChild(cell);

        cells[y][x] = cell;

    }

}