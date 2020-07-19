var colourArray = ["green", "red", "yellow", "blue"];

var userChosenArray = [];

var gamePattern = [];

var level = 0;

var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userChosenArray.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenArray.length - 1);

});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio1 = new Audio("sounds/" + name + ".mp3");
  audio1.play();
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenArray[currentLevel]) {
    if (gamePattern.length === userChosenArray.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

    } else {
      audio2 = new Audio("sounds/wrong.mp3");
      audio2.play();
      $(document).addClass("game-over");
      setTimeout(function () {
        $(document).removeClass("game-over");
      }, 300);
      $("h1").text("Game over! Refresh to start again :)")
      $("h1").css("font-size", "2rem");
      startOver();
    }

}

function nextSequence() {

  userChosenArray = [];

  level++;

  $("#level-title").text("Level " + level);

  var chosenNumber = Math.floor(Math.random() * 4);

  var chosenColour = colourArray[chosenNumber];

  gamePattern.push(chosenColour);

  $("#" + chosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(chosenColour);

}

function startOver() {

  level = 0;
  gamePattern = [];
  userChosenArray = [];

}
