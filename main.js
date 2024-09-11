const game = document.getElementById("game");
const number = document.getElementById("number");
const guessBtn = document.getElementById("guess__btn");
const numOfGuessesAns = document.getElementById("num__guesses");
const guessesNumbersAns = document.getElementById("guesses__numbers");
const restart = document.getElementById("restart");
const hint = document.getElementById("hint");

let answer, numOfGuesses, guessesNumbersArr;

const play = () => {
  const userGuess = number.value;
  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    alert("Please enter a valid number between 1 and 100");
    return;
  }

  numOfGuesses += 1;
  guessesNumbersArr.push(userGuess);

  if (userGuess != answer) {
    if (userGuess < answer) {
      hint.innerHTML = "Too low. Try Again!";
    } else {
      hint.innerHTML = "Too high. Try Again!";
    }
    numOfGuessesAns.innerHTML = `${numOfGuesses}`;
    guessesNumbersAns.innerHTML = `${guessesNumbersArr.join(", ")}`;
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    hint.innerHTML = `Congratulations! <br> The number was <span>${answer}</span>.<br> You guessed the number in <span>${numOfGuesses}</span> tries.`;
    hint.classList.add("success");
    game.style.display = "none";
    restart.style.display = "inline";
  }
};

const init = () => {
  answer = Math.floor(Math.random() * 100) + 1;
  numOfGuesses = 0;
  guessesNumbersArr = [];

  numOfGuessesAns.innerHTML = `0`;
  guessesNumbersAns.innerHTML = `None`;

  number.value = "";
  hint.classList.remove("success", "error");
};

restart.addEventListener("click", () => {
  game.style.display = "grid";
  restart.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success");
  init();
});

number.addEventListener("click", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
});

guessBtn.addEventListener("click", play);
window.addEventListener("load", init);
