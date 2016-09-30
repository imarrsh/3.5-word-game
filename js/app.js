(function(){
  "use strict";

  // alert(commonWords);

  var randomWord = function(){
    // console.log('random word is working!');
    var min = 0;
    var max = commonWords.length;
    var random = Math.floor(Math.random() * (max-min) + min);

    var currentWord = commonWords[random];

    console.log(random, currentWord);

    return currentWord;
  };

  function sethtml(){}

  function gameStart(){
    randomWord();
  }

  gameStart();
  // window.addEventListener('load', gameStart);

}());
