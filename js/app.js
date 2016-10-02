(function(){
  "use strict";

  // alert(commonWords);

  // create variables of the nodes we want to watch or change
  var gameForm = document.getElementById('guess-form');
  var wordHolder = document.getElementById('word-holder');
  var guessText = document.getElementById('guess-text');

  var textSlots, // spans in the word holder
      randomWord, // will be filled with random word
      randomWordArray, // the array version of randomWord
      wrongGuesses, // store invalid guesses
      guessTracker; // starts as empty array indicating the correct guessed

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

  guessTracker = [];

  console.log(randomWordArray);


  // ################################
  // Game Logic
  // ################################

  // set html content of word lenth hint
  function setStage(){

    randomWordArray.forEach(function(letter){
      wordHolder.innerHTML += '<span> _ </span>';
    });

  }

  function updateStage(idx){
    idx.forEach(function(item){
      textSlots[item].textContent = randomWordArray[item].toUpperCase();
    });
  }

  // check player input on submit event
  function guessCheck(e){
    e.preventDefault();
    // get the input value at submission
    var guess = guessText.value.toLowerCase();
    guessText.value = '';

    console.log('guess:', guess);

    var indices = [];
    randomWordArray.forEach(function(letter, i){
      if (guess === letter){
        indices.push(i);
        guessTracker.push(true)
      }
    });

    updateStage(indices);
    console.log(indices, guessTracker);

    if (guessTracker.length == randomWord.length){
      console.log('You Win!');
      var wrapper = document.getElementById('wrapper');
      wrapper.style.backgroundColor = 'forestgreen';
    }

  }

  // call functions to start the game with a new word
  function gameStart(){
    setStage();
    textSlots = document.querySelectorAll('.word-holder span');
  }

  gameStart();

  gameForm.addEventListener('submit', guessCheck);

}());
