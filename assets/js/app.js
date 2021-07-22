/* This new app file is largely based on some of the logic from Web Dev Simplified - https://www.youtube.com/watch?v=riDzcEQbX6k&ab_channel=WebDevSimplified */

/* Pull in HTML elements using element ID's */
const startButton = document.getElementById("start-btn");
const introContainerEl = document.getElementById("intro-container");
const introTitleEl = document.getElementById("intro-title");
const introTextEl = document.getElementById("intro-text");
const timeEl = document.getElementById("timer");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const formEl = document.getElementById("highscore-form");
const formBtn = document.getElementById("form-submit");

/* Create backend variables */
let shuffledQuestions, currentQuestionIndex;
let secondsLeft = 75;

/* Adds event listeners to interact with the page */
startButton.addEventListener("click", startGame);

// This event listener sets a new question when a user answers by clicking
answerButtonsElement.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

// This event listener adds the user's initials and score to local storage
formBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let initials = document.querySelector("#initials").value;
    if (initials === "") {
      console.log("Error! Initials must be added in order to submit!");
    } else if (initials.length > 4) {
      console.log("Error! Initials length too long, please only add up to 4 initials!");
    } else {
      console.log("Success! Registered successfully!");
      localStorage.setItem("initials", initials);
      localStorage.setItem("score", score);
    }

    window.open("./highscore.html");
});

/* Develop all neccessary functions */
// This function begins the game, by calling on starting the timer, hiding the intro information, creating a randomized array of shuffled questions, displaying the question container, and calling on the set next question function
function startGame() {
    startTimer(shuffledQuestions, currentQuestionIndex);
    displayElementsBegin();
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

// This function begins a timer and updates it after it's called in the beginning of the game. Checks conditions to pause the timer and end the game
function startTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time Left: " + secondsLeft;
    if(secondsLeft === 0 || shuffledQuestions.length <= currentQuestionIndex + 1) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// This function first calls on the resetState function to clear out the container, then calls the showQuestion function by providing an index of our shuffled questions from the start game function
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// This function takes in one question at a time, then displays the question text inside, and loops through each answer, creating a button for each. Additionally, it classifies which answers are correct and provides event listeners for each answer that calls the selectAnswer function
function showQuestion(question) {
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

// Removes all the buttons from answered questions to reset page
function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Assigns users answer choice a variable and certifies whether or not it's correct
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(correct);
}

// Creates a penalty if user's choice is wrong by deducting points
function setStatusClass(correct) {
  if (correct) {
    console.log("That's correct!");
  } else {
    console.log("That's wrong!");
    secondsLeft = secondsLeft - 10;
  }
}

function displayElementsBegin() {
  introContainerEl.classList.add("hide");
  startButton.classList.add("hide");
  formEl.classList.add("hide");
  questionContainerElement.classList.remove("hide");
}

// Displays new elements at the end of the game
function displayElementsEnd() {
  startButton.innerText = "Restart Game";
  startButton.classList.remove("hide");
  questionContainerElement.classList.add("hide");
  introTitleEl.innerText = "Congrats! You finished the quiz!";
  introTextEl.innerText = "You're score was " + score + ". Put your initials below to register your highscore!";
  introContainerEl.classList.remove("hide");
  formEl.classList.remove("hide");
}

// Finishes the game, assigns the score to a stable variable, redevelops the page, and resets the timer
function endGame() {
  score = secondsLeft;
  displayElementsEnd();
  secondsLeft = 75;
  return score;
}

/* Create array of objects for questions */
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