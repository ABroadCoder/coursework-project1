'use strict';

// console.log(document.querySelector('.message').textContent);

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.number').textContent=13;
// document.querySelector('.score').textContent=10;

// document.querySelector('.guess').value=23;
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const soundtrack = new Audio('GuessMyNumberTrack.wav');
const victorySound = new Audio('GuessMyNumberVictorySound.wav');

soundtrack.volume = 0.1;
soundtrack.loop = true;
victorySound.volume = 0.1;

document.addEventListener('click', function () {
  if (!document.querySelector('.overlay').classList.contains('hidden')) {
    document.querySelector('.overlay').classList.add('hidden');
    soundtrack.play();
  }
});

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //    When there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number! 🚫';
    displayMessage('🚫 No number!');

    //When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    soundtrack.pause();
    soundtrack.currentTime = 0;
    victorySound.play();

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      //document.querySelector('.message').textContent = 'Too high! 📈';
      displayMessage(guess > secretNumber ? 'Too high! 📈' : 'Too low! 📉');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You lost the game! 🥲';
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }

  //     else if (guess < secretNumber) {
  //         if (score > 1) {
  //         document.querySelector('.message').textContent = 'Too high! 📈';
  //         score --;
  //         document.querySelector('.score').textContent = score;
  //         } else if {
  //             document.querySelector('.message').textContent = 'You lost the game! 🥲';
  //             document.querySelector('.score').textContent = 0;
  //         }

  // }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  soundtrack.currentTime = 0;
  soundtrack.play();
});

document.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.check').click();
  }
});
