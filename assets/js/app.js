// Selects elements from HTML
var timeEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-button");

// Borrowed ideas for this timer function from Activity 9, Week 4 DU Coding Bootcamp
// Function to start the timer at the top right corner
function startTimer() {
    // Sets interval in variable
    var secondsLeft = 75;
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

startBtn.addEventListener("click", startTimer);