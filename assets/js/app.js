/* This new app file is largely based on the logic from Web Dev Simplified - https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified */

/* Pull in HTML elements using element ID's */
const startButton = document.getElementById("start-btn");
const introContainerEl = document.getElementById("intro-container");
let timeEl = document.getElementById("timer");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

/* Create backend variables */
// These variables are empty at first, will go through a function that shuffles questions and uses the index to cycle through them
let shuffledQuestions, currentQuestionIndex;

/* Adds event listeners to interact with the page */
// This event listener waits for user to click the start button, then initializes the start game function
startButton.addEventListener("click", startGame);

// This event listener sets a new question when a user answers by clicking
answerButtonsElement.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

/* Develop all neccessary functions */
// This function begins the game, by calling on starting the timer, hiding the intro information, creating a randomized array of shuffled questions, displaying the question container, and calling on the set next question function
function startGame() {
    startTimer();
    introContainerEl.classList.add("hide");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

// This function begins a timer and updates it after it's called in the beginning of the game
function startTimer() {
  var secondsLeft = 75;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time Left: " + secondsLeft;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// This function first calls on the resetState function to clear out the container, then calls the showQuestion function by providing an index of our shuffled questions from the start game function. The index increases in value from the event listener above
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// This function takes in one question at a time, then displays the question text inside, and loops through each answer, creating a button for each. Additionally, it classifies which answers are correct and provides event listeners for each answer that calls the selectAnswer function
function showQuestion(question) {
  if (shuffledQuestions.length <= currentQuestionIndex + 1) {
    endGame();
  }
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

// Resets the page by calling clearStatusClass, then creates a while loop that removes all the children of of the answerButtonsElement so more can be created for the next question
function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Takes in a random argument, assigns selected button a variable, as well as the correctness of the answer, then calls the setStatusClass function. Checks if there are still questions remaining, then hides or shows a start button based on the info.
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(correct);
}

function setStatusClass(correct) {
  if (correct) {
    console.log("That's correct!");
  } else {
    console.log("That's wrong!");
  }
}

function endGame() {
  startButton.innerText = "Restart Game";
  startButton.classList.remove("hide");
  questionContainerElement.classList.add("hide");
}

const questions = [
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
];