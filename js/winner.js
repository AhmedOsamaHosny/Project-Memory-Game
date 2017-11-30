/* Get query sting parameter from
https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
*/

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var moves = getParameterByName('moves');
var stars = getParameterByName('stars');
var minutes = getParameterByName('minutes');
var seconds = getParameterByName('seconds');

document.getElementById("results").innerHTML = "With " + moves + " Moves and " + stars + " Stars" + " and your Time is "+minutes+":"+seconds;

// Play again 
$('.newGame').click(function functionName() {
  window.location = "index.html";
});
