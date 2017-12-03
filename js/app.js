let cards = [];
let newCards = [];
let openCards = [];
let moves = 0;
let stars = 3;
let gameStarted = false;


// Handling the time in the game
var myVar = setInterval(myTimer, 100);
var firstSecond = Date.now();
var d = new Date();

// This is the function that updates the timer value on every iteration of the interval,
// hence updates time every second.
function myTimer() {
  d.setTime(Date.now() - firstSecond);
  var time = document.getElementById("timer").innerHTML = d.getMinutes() + ":" + d.getSeconds();
}

// This is the function that stops the timer and resets its value in the HTML to zero
function stopTimer() {
  clearInterval(myVar);
  document.getElementById("timer").innerHTML = "00:00";
}

// Initialize the timer to the exact current time and start the time interval
function resetTime() {
  firstSecond = Date.now();
  myVar = setInterval(myTimer, 100);
}

// Reset all game values to their intial values and shuffle the cards
function refreshGame() {
  openCards = [];
  moves = 0;
  stars = 3;
  gameStarted = false;
  stopTimer();
  $(".moves").text(moves);
  $(".stars").html('<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>');
  newCards = shuffle(cards).slice();
  $(".deck").empty();
  for (var i = 0; i < cards.length; i++) {
    $(".deck").append(newCards[i].cloneNode(true));
  }
}

// This function check if two cards are matching
function checkMatching(card) {
  for (var i = 0; i < openCards.length - 1; i++) {
    if (openCards[i].childNodes[1].className === card) {
      return true;
    }
  }
  return false;
}

// This function increment the number of moves and handle the number of stars
function numberOfMoves() {
  moves++;
  $(".moves").text(moves);
  if (moves > 8 && moves <= 12) {
    $(".stars").html('<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>');
    stars = 2;
  } else if (moves > 12) {
    $(".stars").html('<li><i class="fa fa-star"></i></li>');
    stars = 1;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Put all the cards in array
$('.deck li').each(function() {
  cards.push(this.cloneNode(true));
});

// This is called at the beginning of the code to initialize all game values and shuffle the cards
refreshGame();

/*
 * This function open the card when the player click it and checks, if it's open it won't open it again
 * if it's not open it will open it and push it to openCards array and check if this array match with
 * any other cards in the openCards array.
 * if the number of the opencards is divisable by 2 this mean that we will increment the moves.
 * if the two cards are matching, they will be opened and if they are not, we will remove them from the openCards array
 * and close them.
 * if the number of elements in openCards is equal to 16 this means that the player won and we will open the winner screen for him
 * and stop the time.
 */

$(document).on("click", ".card", function() {
  if (!gameStarted) {
    gameStarted = true;
    resetTime();
  }
  if ((this).className === "card") {
    $(this).addClass("open show");
    openCards.push(this);
    checkMatching(this.childNodes[1].className);
    if (openCards.length > 1) {
      if (openCards.length % 2 == 0) {
        numberOfMoves();
        if (!checkMatching(this.childNodes[1].className)) {
          setTimeout(function() {
            $(openCards[openCards.length - 1]).removeClass("open show");
            $(openCards[openCards.length - 2]).removeClass("open show");
            openCards.pop();
            openCards.pop();
          }, 500);
        } else if (checkMatching(this.childNodes[1].className) && openCards.length == 16) {
          setTimeout(function() {
            stopTimer();
            window.location = "winner.html?minutes=" + d.getMinutes() + "&seconds=" + d.getSeconds() + "&moves=" + moves + "&stars=" + stars;
          }, 250);
        }

      }
    }
  }
});

// Restart new game with new card postions
$('.restart').click(function functionName() {
  refreshGame();
});
