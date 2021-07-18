// Selects elements from HTML
var timeEl = document.querySelector("#timer");

var secondsLeft = 75;

// Borrowed ideas for this timer function from Activity 9, Week 4 DU Coding Bootcamp
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = "Time Left: " + secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function display end screen
        sendMessage();
        }
    }, 1000);
}

// Function to edit timer message, eventually will also be used to take user to end screen
function sendMessage() {
    timeEl.textContent = "TIME'S UP!";
}

setTime();