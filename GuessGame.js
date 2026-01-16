// const { jsx } = require("react/jsx-runtime");
let body = document.querySelector("body");
let container = document.querySelector(".container");
let game = document.querySelector(".game");
game.style.display = "none";
let welcome_page = document.getElementsByClassName("welcome_page")[0];
let overlay = document.querySelector(".overly");
let game_container = document.querySelector(".game_container");
let winnigMessage = document.querySelector(".winningMessage");

// function for start the game 
let startGame = document.querySelector(".startGame");
startGame.addEventListener("click", () => {
    sessionStorage.setItem("gameSection", "game");
    welcome_page.style.display = "none";
    game.style.display = "block";
    game.style.borderRadius = "20px";
    game.style.boxShadow = "2px 5px 30px 10px rgba(100, 150, 200, 0.6)";
});


// it save the next page temporarly
if (sessionStorage.getItem("gameSection") === "game") {
    welcome_page.style.display = "none";
    game.style.display = "block";
    game.style.borderRadius = "20px";
    game.style.boxShadow = "2px 5px 30px 10px rgba(100, 150, 200, 0.6)";
}

let description = document.querySelector('.description');
const spans = document.querySelectorAll(".score_result span");
let currentScore = spans[0];
let finalScore = spans[1];
let score = 20;
let gameOver = false;
// this is the random number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// this line store the score 
const checkResult = () => {
    if(gameOver) return;
    const inputValue = Number(document.querySelector(".inputValue").value);
    if (!inputValue) {
        description.textContent = "⛔ No number!"
    }
    else if (inputValue === secretNumber) {
        document.querySelector(".random_bum").textContent = secretNumber;
        description.textContent = "You guessed the correct number!🎯";
        finalScore.textContent = currentScore.textContent;
        localStorage.setItem('prevScore', finalScore.textContent);
        currentScore.textContent = 20;
        gameOver = true;
        //  design for winning
        game_container.classList.add("overly");
        body.style.backgroundImage = "linear-gradient(black 100px, red 300px, green)";
        winnigMessage.style.display = "block";
        document.querySelector(".reload_game").style.display = "block";
        function disableInputValue() {
            document.querySelector(".inputValue").disabled = true;
        }
        disableInputValue();
    }
    else if (inputValue > secretNumber) {
        if (score > 1) {
            description.textContent = "Bigger than correct number! ⬆️"
            score--;
            currentScore.textContent = score;
        }
        else {
            description.textContent = "🥺You lost the game!";
            currentScore.textContent = 0;
        }
    }
    else if (inputValue < secretNumber) {
        if (score > 1) {
            description.textContent = "Smaller than correct number! ⬇️"
            score--;
            currentScore.textContent = score;
        }
        else {
            description.textContent = "🥺You lost the game!";
            currentScore.textContent = 0;
        }
    }
};

// savePrevScore tp localStorage
let reload_game = document.getElementsByClassName("reload_game")[0];
reload_game.addEventListener("click", () => {
    gameOver = false;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    description.textContent = "start guessing....!";
    document.querySelector(".random_bum").textContent = '?';
    document.querySelector(".inputValue").value = '';
    currentScore.textContent = 20;
    finalScore.textContent = '0';
    localStorage.removeItem("prevScore");
    game_container.classList.remove("overly");
    body.style.backgroundImage = "";
    document.querySelector(".check_btn").classList.remove("disabled");
    document.querySelector(".inputValue").classList.remove("disabled");
    reload_game.style.display = "none";
    winnigMessage.style.display = "none";
    function disableInputValue() {
        document.querySelector(".inputValue").disabled = false;
    }
    disableInputValue();
});

// this function check that if the localStorage has the prevScore and check that if saveScore is not empty and has the prevscore, assign it to the finalScore and if it is empty put a (0) inside of finalScore tag
window.onload = () => {
    const saveScore = localStorage.getItem("prevScore");
    if (saveScore !== null) {
        finalScore.textContent = saveScore;
    }
    else {
        finalScore.textContent = "0";
    }
}


