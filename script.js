let score = 0;
let level = 1;
let highScore = Number(localStorage.getItem("highScore")) || 0;
let time = 30;
let timer = null;

let gameState = "START";

const star = document.getElementById("star");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const statusDisplay = document.getElementById("status");
const gameArea = document.getElementById("game-area");
const levelDisplay = document.getElementById("level");
const highScoreDisplay = document.getElementById("highScore");

highScoreDisplay.innerText = highScore;

// Change Game State
function changeState(state) {
    gameState = state;
    statusDisplay.innerText = state;
}

// Move Star
function moveStar() {
    let x = Math.random() * (gameArea.clientWidth - 40);
    let y = Math.random() * (gameArea.clientHeight - 40);

    star.style.left = x + "px";
    star.style.top = y + "px";
}

// Start Game
function startGame() {
    clearInterval(timer);

    score = 0;
    time = 30;
    level = 1;
levelDisplay.innerText = level;

    scoreDisplay.innerText = score;
    timeDisplay.innerText = time;

    changeState("PLAYING");

    star.style.display = "block";

    moveStar();

    timer = setInterval(function () {

        time--;
        timeDisplay.innerText = time;

        if (time <= 0) {
            clearInterval(timer);
            star.style.display = "none";

            changeState("LOSE");

        }

    }, 1000);
}

// Pause Game
function pauseGame() {
    if (gameState === "PLAYING") {
        clearInterval(timer);
        changeState("PAUSED");
    }
}

// Resume Game
function resumeGame() {
    if (gameState === "PAUSED") {
        changeState("PLAYING");

        timer = setInterval(function () {
            time--;
            timeDisplay.innerText = time;

            if (time <= 0) {
                clearInterval(timer);
                star.style.display = "none";
                changeState("LOSE");
            }
        }, 1000);
    }
}

// Restart Game
function restartGame() {
    clearInterval(timer);
    changeState("START");

    score = 0;
    time = 30;

    scoreDisplay.innerText = score;
    timeDisplay.innerText = time;

    star.style.display = "none";
}

// Catch Star
// Catch Star
star.addEventListener("click", function () {

    if (gameState === "PLAYING") {
        score++;

        scoreDisplay.innerText = score;

        // High Score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = highScore;
        }

        // Level Progression
        level = Math.floor(score / 5) + 1;
        levelDisplay.innerText = level;

        moveStar();
    }

});