// ==========================
// SWIPE CONTROLS
// ==========================

let startX = 0;
let startY = 0;

board.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

});

board.addEventListener("touchend", (e) => {

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const dx = endX - startX;
    const dy = endY - startY;

    // Ignore very small swipes
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;

    if (Math.abs(dx) > Math.abs(dy)) {

        if (dx > 0 && direction !== "left") {
            direction = "right";
        }

        else if (dx < 0 && direction !== "right") {
            direction = "left";
        }

    } else {

        if (dy > 0 && direction !== "up") {
            direction = "down";
        }

        else if (dy < 0 && direction !== "down") {
            direction = "up";
        }

    }

});

// ==========================
// KEYBOARD CONTROLS
// ==========================

document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowRight":
            if (direction !== "left")
                direction = "right";
            break;

        case "ArrowLeft":
            if (direction !== "right")
                direction = "left";
            break;

        case "ArrowUp":
            if (direction !== "down")
                direction = "up";
            break;

        case "ArrowDown":
            if (direction !== "up")
                direction = "down";
            break;

    }

});

// ==========================
// PLAY / PAUSE
// ==========================

function playPause() {

    if (isPlay) {

        clearInterval(game);

        icon.classList.replace(
            "fa-pause",
            "fa-play"
        );

    }

    else {

        game = setInterval(
            gameLoop,
            speed
        );

        icon.classList.replace(
            "fa-play",
            "fa-pause"
        );

    }

    isPlay = !isPlay;

}

playPauseBtn.addEventListener(
    "click",
    playPause
);

// ==========================
// CHANGE STAGE
// ==========================

stageSelect.addEventListener("change", () => {

    currentStage = stageSelect.value;

    restartGame();

});