let score = 0;
let time = 30;
let timer;

const star = document.getElementById("star");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameArea = document.getElementById("game-area");

function moveStar() {
    let x = Math.random() * (gameArea.clientWidth - 40);
    let y = Math.random() * (gameArea.clientHeight - 40);

    star.style.left = x + "px";
    star.style.top = y + "px";
}

function startGame() {
    clearInterval(timer);

    score = 0;
    time = 30;

    scoreDisplay.innerText = score;
    timeDisplay.innerText = time;

    star.style.display = "block";

    moveStar();

    timer = setInterval(function () {
        time--;

        timeDisplay.innerText = time;

        if (time <= 0) {
            clearInterval(timer);
            star.style.display = "none";

            alert("Game Over! Your Score: " + score);
        }

    }, 1000);
}

star.addEventListener("click", function () {
    if (time > 0) {
        score++;
        scoreDisplay.innerText = score;

        moveStar();
    }
});

star.style.display = "none";