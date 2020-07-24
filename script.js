const QUESTIONSET = [{
    "question": "Commonly used data types DO NOT include: ",
    "choices": ["strings", "booleans", "alerts", "numbers"],
    "answer": "alerts"
}, {
    "question": "The condition in an if/else statement is enclosed within ___.",
    "choices": ["quotes", "curly brackets", "parantheses", "square ebrackets"],
    "answer": "curly brackets"
}, {
    "question": "Arrays in JavaScript can be used to store ___.",
    "choices": ["numbers and strings", "other arrays", "booleans", "all of the above"],
    "answer": "all of the above"
}, {
    "question": "String values must be enclosed within ___ when being assigned to variables.",
    "choices": ["commas", "curly brackets", "quotes", "parentheses"],
    "answer": "quotes"
}, {
    "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
    "choices": ["JavaScript", "terminal/bash", "for keeps", "console.log"],
    "answer": "console.log"
}];
var timerDisplay = document.querySelector("#timerDisplay");
var timer = document.querySelector("#timer");
var hsLink = document.querySelector("#HS");
var content = document.querySelector("#content");
var scoreBoard = [];
var questionIndex = 0;
var quizTime = 60; //seconds
var interval;
var timeElapsed;

function enterScoreBoard(score) {
    //enter initials
    //make button that links to display board
}

function displayScoreBoard(name) {
    //display scores in decending order
    //indicate place of recent player
    //button to start over. (mainMenu)
}

function quiz() {
    var score = 0,
        wrong = 0;

}

function countdown() {
    interval = setInterval(function() {
        timeElapsed++;
        displayTimer();
        if (timeElapsed > quizTime) {
            clearInterval(interval);
            //display scoreboard
        }
    }, 1000);
}

function displayTimer() {
    const timeLeft = quizTime - timeElapsed;
    timer.textContent = ((timeLeft > 9) ? "" : "0") + timeLeft;
}

function htmlToElement(html) { //given
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function mainMenu() {
    timeElapsed = quizTime; //display 0 time
    timerDisplay.setAttribute("style", "display:none");
    content.textContent = "";

    var title = document.createElement('h1');
    title.setAttribute("id", "title")
    title.textContent = "Coding Quiz Challenge";
    content.append(title);
    var p = document.createElement('p');
    p.setAttribute('id', "description");
    p.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that the incorrect answers will penalize your score/time by ten seconds!";
    content.append(p);
    var section = document.createElement('section');
    var startBtn = document.createElement("button");
    startBtn.setAttribute("class", "btn");
    startBtn.setAttribute("id", "startBtn");
    startBtn.textContent = "Start Quiz";
    section.appendChild(startBtn);
    content.appendChild(section);
}

mainMenu();