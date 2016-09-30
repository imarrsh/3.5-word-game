(function(){
  "use strict";

  // alert(commonWords);

  // create variables of the nodes we want to watch or change
  var gameForm = document.getElementById('guess-form');

  // go get a random word and call the setHtml function
  var randomWord = function(){
    // console.log('random word is working!');
    var min = 0;
    var max = commonWords.length;
    var random = Math.floor(Math.random() * (max-min) + min);

    var currentWord = commonWords[random];

    console.log(random, currentWord);

    setHtml(currentWord);

    return currentWord;
  };

  // set html content of word lenth hint
  function setHtml(word){

    var wordHolder = document.getElementById('word-holder');

    word.split('').forEach(function(letter){
      wordHolder.innerHTML += '<span> _ </span>';
      // console.log(letter);
    });
  }

  // check player input
  function guessCheck(){

  }

  // call functions to start the game with a new word
  function gameStart(){
    randomWord();
  }

  gameStart();

  gameForm.addEventListener('submit', guessCheck);

}());
