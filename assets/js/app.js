// Selects elements from HTML
var timeEl = document.getElementById("timer");
var startBtn = document.getElementById("start-button");
var introText = document.getElementById("intro-text");
var introTitle = document.getElementById("intro-title");
var startBtnCont = document.getElementById("start-button-container");
var questionCont = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerEl = document.getElementsByClassName("answer-btn")
var answerBtn1 = document.getElementById("answer-btn-1")

// Create new global variables
var score = 0
var questionList = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false}
        ]
    }, {
        question: "The condition of an if/else statement is enclosed within ___:",
        answers: [
            {text: "Curly Brackets", correct: false},
            {text: "Parentheses", correct: true},
            {text: "Quotes", correct: false},
            {text: "Square Brackets", correct: false}
        ]
    }, {
        question: "Arrays in JavaScript can be used to store ___:",
        answers: [
            {text: "Numbers and Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Other Arrays", correct: false},
            {text: "All of the Above", correct: true}
        ]
    }, {
        question: "String values must be enclosed within ___ when being assigned to variables:",
        answers: [
            {text: "Commas", correct: false},
            {text: "Curly Brackets", correct: false},
            {text: "Quotes", correct: true},
            {text: "Parentheses", correct: false}
        ]
    }, {
        question: "A very useful tool during debugging and development for printing content to the debugger is:",
        answers: [
            {text: "console.log", correct: true},
            {text: "JavaScript", correct: false},
            {text: "For Loops", correct: false},
            {text: "Terminal/Bash", correct: false}
        ]
    }
]

// Initializes the game, primary function
function startGame() {
    visibleStarterElements();
    startTimer();
    randomizeQuestions();
    for (let i = 0; i < questionList.length - 1; i++) {
        var question = questionList[i];
        showQuestion(question);
    }
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

// This function changes the visibility of items on our page
function visibleStarterElements() {
    startBtnCont.classList.add("hide");
    introText.classList.add("hide");
    introTitle.classList.add("hide");
    questionCont.classList.remove("hide");
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    console.log(question);
    for (var i = 0; i < question.answers.length; i++) {
        var answerText = question.answers[i].text;
        answerBtn1.innerText = answerText;
        console.log(answerText);
        //answerEl.textContent(question.answers[i].text);
    }
}

startBtn.addEventListener("click", startGame);