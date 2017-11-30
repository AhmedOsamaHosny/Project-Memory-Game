let cards = [];
let newCards = [];
let openCards = [];
let moves = 0;
let stars = 3;

// Handling the time in the game
var myVar = setInterval(myTimer, 100);
var firstSecond = Date.now();
var d = new Date();
function myTimer() {
  d.setTime(Date.now() - firstSecond);
  var time = document.getElementById("timer").innerHTML = d.getMinutes() + ":" + d.getSeconds();
}

// Reset time to zero
function resetTime() {
  firstSecond = Date.now();
}

// Put all the cards in array
$('.deck li').each(function() {
  cards.push(this.cloneNode(true));
});

refreshGame();

function refreshGame(){
  openCards = [];
  moves = 0;
  stars = 3;
  resetTime();
  $(".moves").text(moves);
  $(".stars").html('<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>');
  newCards = shuffle(cards).slice();
  $(".deck").empty();
  for (var i = 0; i < cards.length; i++) {
    $(".deck").append(newCards[i].cloneNode(true));
  }
}

// Restart new game with new card postions
$('.restart').click(function functionName() {
  refreshGame();
});

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

//This function open the card when the player click it
$(document).on("click", ".card", function() {
  $(this).addClass("open show");
  openCards.push(this);
  checkMatching(this.childNodes[1].className);
  if (openCards.length > 1) {
    if (openCards.length % 2 == 0) {
      numberOfMoves();

      if (checkMatching(this.childNodes[1].className) == false) {
        setTimeout(function() {
          $(openCards[openCards.length - 1]).removeClass("open show");
          $(openCards[openCards.length - 2]).removeClass("open show");
          openCards.pop();
          openCards.pop();
        }, 500);
      } else if (checkMatching(this.childNodes[1].className) == true && openCards.length == 16) {
          setTimeout(function() {
          window.location = "winner.html?minutes="+d.getMinutes()+"&seconds="+d.getSeconds()+"&moves="+moves+"&stars="+stars;
        }, 250);
      }

    }
  }
});

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
