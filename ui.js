// ==========================
// INITIAL UI
// ==========================

score.textContent = "Score : 0";
highScore.textContent = "High Score : 0";
difficultyLevel.textContent = "Level : 1";

// UPDATE SCORE & LEVEL

function updateScoreAndLevel() {

    // APPLE

    if (isFoodEaten(apple)) {

        scoreVal++;
        playEatSound();

    }
    
    // DIAMOND 
    
    if (isFoodEaten(diamond)) {

        scoreVal += 5;
        playEatSound();

    }
    
    // RARE DIAMOND
    
    if (isFoodEaten(rareDiamond)) {

        scoreVal += 10;
        playEatSound();

    }
    
    // BOMB
    
    if (isFoodEaten(bomb)) {

        playEatSound();

    } 

    // POISON

    if (isFoodEaten(poison)) {

        scoreVal = Math.max(0, scoreVal - 2);
        playEatSound();

    }

    // SPEED UP

    if (isFoodEaten(speedUp)) {

        playEatSound();

    }

    // SPEED DOWN

    if (isFoodEaten(speedDown)) {

        playEatSound();

    }
    
    // UPDATE SCORE

    score.textContent = `Score : ${scoreVal}`;

    // HIGH SCORE

    if (scoreVal > highScoreVal) {

        highScoreVal = scoreVal;

        highScore.textContent =
            `High Score : ${highScoreVal}`;

    }

    // LEVEL SYSTEM

    const newLevel = Math.floor(scoreVal / 10) + 1;

    if (newLevel !== level) {

        level = newLevel;

        difficultyLevel.textContent =
            `Level : ${level}`;

        playLevelUpSound();

        speed = Math.max(
            50,
            150 - (level - 1) * 10
        );

        clearInterval(game);

        game = setInterval(
            gameLoop,
            speed
        );
        
        // Poison

        setTimeout(() => {

            if (!poison.active) {

                spawnFood(poison);
                playBonusSound();
            }

        }, 20000);

        // Speed Up

        setTimeout(() => {

            if (!speedUp.active) {

                spawnFood(speedUp);
                playBonusSound(); 

            }

        }, 30000);
        
        // Diamond 
        setTimeout(() => {

            if (! diamond.active) {

                spawnFood(diamond);
                playBonusSound();

            }

        }, 7000);

        // Rare Diamond 

        setTimeout(() => {

            if (!rareDiamond.active) {

                spawnFood(rareDiamond);
                playBonusSound();
            }

        }, 50000);

        // Bomb
    
        setTimeout(() => {

            if (!bomb.active) {

                spawnFood(bomb);
                playBonusSound(); 

            }

        }, 100000); 

        // Speed Down

        setTimeout(() => {

            if (!speedDown.active) {

                spawnFood(speedDown);
                playBonusSound(); 

            }

        }, 40000); 
        
    }

}