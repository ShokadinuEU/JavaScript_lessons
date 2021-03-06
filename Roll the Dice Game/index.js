/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

// initializing the game
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. random numner
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    // add first dice
    console.log(dice1, dice2);
    document.getElementById("dice1").style.display = "block";
    document.getElementById("dice1").src = "dice-" + dice1 + ".png";
    // adding second dice
    document.getElementById("dice2").style.display = "block";
    document.getElementById("dice2").src = "dice-" + dice2 + ".png";

    // 3. Update the round score if the rolled number was not 1
    if (dice1 !== 1 || dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }

    if (dice1 === 6 && dice2 === 6 && winningScore === 6) {
      // reset score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }
    winningScore = dice1 + dice2;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  // Add current score to golbal score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    var input = document.querySelector(".final-score").value;
    var winningScore;
    // console.log(input);

    //* Undefined, 0, null or "" are COERCED to false
    //* Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice1").style.display = "none";
      document.getElementById("dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".btn-roll").style.display = "none";
      document.querySelector(".btn-hold").style.display = "none";
      activePlayer = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  prevScore = 0;
  gamePlaying = true;

  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
}

/*
  Challenge: Change the game to follow these rules:

  1. A player looses his Entire score when he rolls two 6 in a row. After that, it's the next player's turn.(HINT: Always save previous dice roll in a separate variable)
  2. Add an input field to the HTML where players can set their winning score, so that they can change the predefinited score of 100.(HINT: you can read that value with .value property in JavaScript. This is a good oportunity to use google to figure this out)
  3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.(HINT: You'll need CSS to position the second dice, so take a look at the css code for the first one)

  GOOD LUCK!
*/
