var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];
var timeSpan = document.getElementById("time-span"),
startBtn = document.getElementById("start-btn"),
quizSection = document.getElementById("quiz-section"),
gameOverSctn = document.getElementById("game-over"),
questionH1 = document.getElementById("question"),
yourScore = document.getElementById("user-score"),
goForm = document.getElementById("go-form"),
rightWrong = document.getElementById("right-wrong"),
gameClock = 75,
timerInterval,
currentQuestion = 0,
answerList = document.getElementById("answer-list");


function recordScore(event) {
  event.preventDefault();
    var userInitals = document.getElementById("user-initals").value.trim();
    var highScore = JSON.parse(localStorage.getItem("highScore"));
    if (!highScore){
      highScore = [];
    }
    var tempObj = {initals:userInitals, score:gameClock};
    highScore.push(tempObj);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    window.location.replace("./scores.html");
}

function gameOver() {
  clearInterval(timerInterval);
    quizSection.classList.add("inactive");
    gameOverSctn.classList.remove("inactive");
    yourScore.textContent = "Your Score is: " + gameClock + ", Enter your initials below to record your score"
}

function checkAnswer(event) {
  var userChoice = event.target;
  rightWrong.textContent = " ";
  if (userChoice.matches("li")) {
      var userAnswer = userChoice.textContent,
      correctAnswer = questions[currentQuestion].answer;
      if (userAnswer === correctAnswer) {
          currentQuestion++;
          askQuestion();
          rightWrong.textContent = "CORRECT!";
      }else {
          gameClock = gameClock - 10;
          currentQuestion++;
          askQuestion();
          rightWrong.textContent = "WRONG!";
      }
  }
}

// FUNCTION ask question puts the text in the correct element
function askQuestion() {
    if (currentQuestion < questions.length) {
        answerList.innerHTML = " ";
        questionH1.textContent = questions[currentQuestion].title;
        questionChoices = questions[currentQuestion].choices;
        for (var i = 0; i < questionChoices.length; i++) {
            var li = document.createElement("li");
            li.textContent = questionChoices[i];
            answerList.appendChild(li);
        }
    } else {
        gameOver();
    }
}


function startTimer() {
    timerInterval = setInterval(function() {
        gameClock--;
        timeSpan.textContent = gameClock;
        if(gameClock === 0) {
            gameOver();
        }
    }, 1000);
}

// FUNCTION start game to handle start button click
function startGame() {
    startBtn.classList.add("inactive");
    startTimer();
    askQuestion();
}

  
startBtn.addEventListener("click", startGame);
answerList.addEventListener("click", checkAnswer);
goForm.addEventListener("submit", recordScore);
