"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");

const max = 20;
const scores = [0, 0];

let currentScore = 0;
let activePLayer = 0;

score0El.textContent = 0;
score1El.textContent = 0;

function switchPLayer() {
  activePLayer = activePLayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function playerWon() {
  let nonActivePlayer = activePLayer === 0 ? 1 : 0;
  let loser = document.querySelector(`.player--${nonActivePlayer}`);
  let winner = document.querySelector(`.player--${activePLayer}`);
  btnRoll.hidden = true;
  btnHold.hidden = true;
  diceEl.hidden = true;
  loser.style.display = "none";
  winner.classList.add("player--winner");
  winner.classList.remove("player--active");
  document.querySelector("main").style.width = "50rem";
}

btnNew.addEventListener("click", () => {
  document.querySelector("main").removeAttribute("style");

  let nonActivePlayer = activePLayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePLayer}`)
    .classList.remove("player--winner");

  document
    .querySelector(`.player--${nonActivePlayer}`)
    .removeAttribute("style");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.hidden = true;

  btnRoll.removeAttribute("hidden");
  btnHold.removeAttribute("hidden");

  activePLayer = 0;
  currentScore = 0;
  for (let i = 0; i < 2; i++) scores[i] = 0;
});

btnRoll.addEventListener("click", () => {
  const activeCurrent = document.querySelector(`#current--${activePLayer}`);
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (dice !== 1) {
    diceEl.setAttribute("src", `images/dice-${dice}.png`);
    diceEl.removeAttribute("hidden");
    activeCurrent.textContent = currentScore += dice;
  } else {
    diceEl.hidden = true;
    activeCurrent.textContent = currentScore = 0;
    switchPLayer();
  }
});

btnHold.addEventListener("click", () => {
  const activeCurrent = document.querySelector(`#current--${activePLayer}`);
  const activeScore = document.querySelector(`#score--${activePLayer}`);
  activeScore.textContent = scores[activePLayer] += currentScore;
  activeCurrent.textContent = currentScore = 0;
  if (scores[activePLayer] >= max) playerWon();
  else switchPLayer();
});
