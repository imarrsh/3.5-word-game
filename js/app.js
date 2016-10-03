(function(){
  "use strict";

  // alert(commonWords);

  // create variables of the nodes we want to watch or change
  var gameForm = document.getElementById('guess-form'),
      wordHolder = document.getElementById('word-holder'),
      guessText = document.getElementById('guess-text'),
      guessesLeftMsg = document.getElementById('guesses-left'),
      wrapper = document.getElementById('wrapper'),
      guessedLetters = document.getElementById('guessed-letters'),
      submit = document.getElementById('submit');



  var textSlots, // spans in the word holder
      randomWord, // will be filled with random word
      randomWordArray, // the array version of randomWord
      wrongGuesses, // store invalid guesses
      allGuesses, // store all guesses
      correctGuessTracker,  // counter for correct guesses
      totalGuesses, // will store the max allowed guesses
      guessesLeft; // will start at totalGuesses value and decrement on wrong guesses

  // ################################
  // Word Randomizer
  // ################################

  // go get a random word
  var pickRandomWord = function(){
    // console.log('random word is working!');
    var qualifyingWords = commonWords.filter(function(word){
      return word.length > 3;
    });

    var min = 0;
    var max = qualifyingWords.length;
    var random = Math.floor(Math.random() * (max-min) + min);

    console.log(random, qualifyingWords[random]);

    return qualifyingWords[random];
  };

  // capture the output of pickRandomWord() and store it for reference
  randomWord = pickRandomWord();
  randomWordArray = randomWord.split('');

  correctGuessTracker = 0;
  totalGuesses = Math.floor(randomWord.length * 1.5);
  guessesLeft = totalGuesses;
  wrongGuesses = [];
  allGuesses = [];

  console.log(randomWordArray);


  // ################################
  // Game Logic
  // ################################

  // set html content of word lenth hint
  function setStage(){

    randomWordArray.forEach(function(letter){
      wordHolder.innerHTML += '<span> _ </span>';
    });

    guessesLeftMsg.innerHTML = '<h3>You have ' + guessesLeft + ' tries. Good Luck!</h3>';

  }

  function updateStage(idx){
    idx.forEach(function(item){
      textSlots[item].textContent = randomWordArray[item].toUpperCase();
    });
  }
  // changes the guess button to a Play Again button
  function guessBtnToPlayAgain(){
    submit.value = 'Play Again';
    guessText.style.display = 'none';
    submit.classList.add('game-btn-finish');
  }

  function showGuesses(letter){
    if(wrongGuesses.length > 0){
      guessedLetters.innerHTML = '<h3>Invalid guesses:</h3>';
    }
    // var guessedLetter = document.createElement('span');
    // var guessedLetterEl = guessedLetter.innerHTML = guessedLetter;
    wrongGuesses.forEach(function(item){
      var guessedLetter = document.createElement('span');
      var itemText = document.createTextNode(' ' +item.toUpperCase() + ' ');
      guessedLetter.appendChild(itemText);

      guessedLetters.appendChild(guessedLetter);
    });
  }

  function gameLost(){
    console.log('Better luck next time!');
    textSlots.forEach(function(letter){
      letter.textContent = '😭';
    });
    wrapper.style.backgroundColor = 'tomato';
    guessText.setAttribute('disabled', true);
    guessBtnToPlayAgain();
  }

  function gameWin(){
    console.log('You Win!');
    wrapper.style.backgroundColor = 'forestgreen';
    guessBtnToPlayAgain();
  }

  // check player input on submit event
  function guessCheck(e){
    e.preventDefault();
    // get the input value at submission
    var guess = guessText.value.toLowerCase();

    var isValidGuess = allGuesses.indexOf(guess) === -1; // true/false

    if(isValidGuess){

      allGuesses.push(guess);

      console.log('guess:', guess);

      // set up an array for matching correct guesses
      var indices = [];
      randomWordArray.forEach(function(letter, i){
        if (guess === letter){
          indices.push(i);
          correctGuessTracker++;
        }
      });
      // if guess is wrong, push the incorrect letter to
      // the wrongGuesses array for tracking and decrenent
      // guessesLeft counter
      if(randomWord.indexOf(guess) === -1){
        wrongGuesses.push(guess);
        guessesLeft--;
        guessesLeftMsg.innerHTML = '<h3>You have ' + guessesLeft + ' tries left!</h3>';
        wordHolder.classList.add('wobble');

        setTimeout(function(){
          wordHolder.classList.remove('wobble');
        }, 1000);
      }

      // check if winner or loser
      if (correctGuessTracker == randomWord.length){
        gameWin();
      } else if (wrongGuesses.length == totalGuesses) {
        gameLost();
      }

      showGuesses(guess);
      updateStage(indices);
      console.log(indices, correctGuessTracker, guessesLeft, wrongGuesses, allGuesses, isValidGuess);
    }

    // clear the value of the field and refocus
    guessText.value = '';
    guessText.focus();

  }

  function resetGame(){
    // do some things to reset the game
  }

  // call functions to start the game with a new word
  function gameStart(){
    setStage();
    textSlots = document.querySelectorAll('.word-holder span');
  }

  gameStart();

  gameForm.addEventListener('submit', guessCheck);

}());
