const cardsElement = document.querySelectorAll(".card-wrapper");
const gameScoreElement = document.querySelector(".score span");
const gameStepsElement = document.querySelector(".steps span");
const welcomeDivElement = document.querySelector(".welcome-wrapper");
const winnerDivElement = document.querySelector(".winner-wrapper");
const loserDivElement = document.querySelector(".loser-wrapper");
const playButtonElement = document.querySelector(".play");
const replayButtonElement = document.querySelectorAll(".replay");

// console.log(replayButtonElement[0]);
// Variables
let hasCardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let steps = 50;

cardsElement.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return; // Locking the game board until mismatch cards is flipped back
  this.classList.add("flipped");
  if (this === firstCard) return; // Avoid double click

  // if (steps === 0) return;

  // First Card
  if (!hasCardFlipped) {
    hasCardFlipped = true;
    firstCard = this;
  } else {
    hasCardFlipped = false;
    secondCard = this;
    checkCards();

    // Steps Counter

    stepsCheck();
  }
}

// Checking Cards
function checkCards() {
  let iscardMatched = firstCard.dataset.image === secondCard.dataset.image;
  iscardMatched ? cardMatched() : cardNotMatched();
}

function cardMatched() {
  // Card Matched Effect
  var matched = new Audio("sounds/matched.mp3");
  matched.play();
  gameScore();
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetValues();
}

function cardNotMatched() {
  lockBoard = true;

  // Not Matched Effect
  var notMatched = new Audio("sounds/not-matched.mp3");
  notMatched.play();

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    lockBoard = false;
    resetValues();
  }, 1500);
}

// Reset Values
function resetValues() {
  [hasCardFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle Card Flex Order
function shuffleCard() {
  cardsElement.forEach((card) => {
    let random = Math.floor(Math.random() * 30);
    card.style.order = random;
  });
}

shuffleCard();

// Game Score
function gameScore() {
  // console.log(score);
  score++;
  gameScoreElement.innerHTML = `${score}`;
  if (score === 15) {
    winnerDivElement.style.display = "block";
    // Game Complete Effect
    var gameWon = new Audio("sounds/won.mp3");
    gameWon.play();
  }
}

// Steps Checker
function stepsCheck() {
  steps--;
  gameStepsElement.innerHTML = `${steps}`;
  if (steps === 0) {
    loserDivElement.style.display = "block";
    // Game Lose Effect
    var gameLost = new Audio("sounds/lost.mp3");
    gameLost.play();
  }
}

// Play Button
playButtonElement.addEventListener("click", function() {
  // Game Start Effect
  var gameStart = new Audio("sounds/start.mp3");
  gameStart.play();
  welcomeDivElement.style.display = "none";
})

// Replay Button
replayButtonElement.forEach((button)=> {
  button.addEventListener("click", function() {
    winnerDivElement.style.display = "none";
    loserDivElement.style.display = "none";
    cardsElement.forEach((card) => {
      card.classList.remove("flipped");
    });
    shuffleCard();
    [score, steps] = [0, 50];
    console.log(steps);
  
    gameScoreElement.innerHTML = 0;
    gameStepsElement.innerHTML = 50;
  
    cardsElement.forEach((card) => card.addEventListener("click", flipCard));
  });
})

