// Selects elements from HTML
var timeEl = document.getElementById("timer");
var startBtn = document.getElementById("start-button");
var introText = document.getElementById("intro-text");
var introTitle = document.getElementById("intro-title");
var startBtnCont = document.getElementById("start-button-container");

// Create new global variables
var score = 0
var questionList = ["A", "B", "C", "D", "E", "F", "G"]; // Template questions, will be updated later

// Initializes the game, primary function
function startGame() {
    hideStarterElements();
    startTimer();
    randomizeQuestions();

}

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
        endGame();
        }
    }, 1000);
}

// Function to edit timer message, eventually will also be used to take user to end screen
function endGame() {
    timeEl.textContent = "TIME'S UP!";
}

// This function randomly shuffles questions to make the quiz more difficult. Credit to the Fisher-Yates Shuffle for this function logic.
function randomizeQuestions() {
    var currentIndex = questionList.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [questionList[currentIndex], questionList[randomIndex]] = [questionList[randomIndex], questionList[currentIndex]];
    }
    return questionList;
}

// This function removes our introduction page to start the quiz
function hideStarterElements() {
    startBtnCont.classList.add("hide");
    introText.classList.add("hide");
    introTitle.classList.add("hide");
}

startBtn.addEventListener("click", startGame);