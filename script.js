'use strict';
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
}]; //our data
var timerDisplay = document.querySelector("#timerDisplay");
var timer = document.querySelector("#timer");
var hsLink = document.querySelector("#HS");
var body = document.querySelector('body');
var content = document.querySelector("#content");
var title = document.querySelector("title");
var form = document.querySelector("#hsform");
var questionIndex = 0;
var quizTime = 60; //seconds
var interval; //timer
var timeElapsed; //time elapsed
var previousUser; //only needed for additional signaling
var highscoreArray; //storage
var prevScore; //only needed for additional signaling

function htmlToElement(html) { //put html as a string, get actual html out.
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function compareValues(key, order = 'ascending') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
            return 0;
        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (varA > varB)
            comparison = 1;
        else if (varA < varB)
            comparison = -1;
        return ((order === 'descending') ? (comparison * -1) : comparison);
    };
} //code from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/

function enterScoreBoard(score) {
    prevScore = score;
    title.textContent = "Quiz: Record Highscore";
    clearTimeout(interval);
    content.textContent = "";
    timerDisplay.setAttribute("style", "display:none");
    alert("Quiz Finished!");
    if (score === 0) displayScoreBoard(score); //if no score, just display endscreen
    var section = document.createElement('section');
    section.append(htmlToElement(
        "<h1>" +
        "You got a score of " + score + "!" +
        "</h1>"
    ));
    var form = htmlToElement(
        "<form id=\"hsform\" method=\"POST\"></form>"
    );
    form.append(htmlToElement(
        "<label for=\"name\">" +
        "Enter your name and press the enter key to submit to the scoreboard!  " +
        "</label>"
    ));
    form.append(htmlToElement(
        "<input type=\"text\" placeholder=\"Your name\" name=\"name\" id=\"name\" />>"
    ));
    section.append(form);
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const userName = document.querySelector("#name").value.trim();
        if (userName === "") return;
        highscoreArray = JSON.parse(localStorage.getItem("highscoreArray"));
        const newEntry = { "name": userName, "score": prevScore };
        if (highscoreArray === null)
            highscoreArray = [];
        else if (highscoreArray.includes(newEntry))
            return; //we don't want duplicate entries to be stored, we'll just treat it as 1 entry
        highscoreArray.push(newEntry);
        localStorage.setItem("highscoreArray", JSON.stringify(highscoreArray));
        displayScoreBoard();
        //make sure none are the same
        //save to local storage
    });
    content.append(section);
}

function displayScoreBoard() {
    title.textContent = "Quiz Leaderboard";
    content.textContent = "";
    timerDisplay.setAttribute("style", "display:none");
    hsLink.setAttribute("style", "display:none");
    highscoreArray = JSON.parse(localStorage.getItem("highscoreArray"));
    //create function
    if (highscoreArray.length === 0)
        localStorage.setItem("highscoreArray", JSON.stringify([]));
    else {
        highscoreArray.sort(compareValues('score', 'decending')); //sort it
        localStorage.setItem("highscoreArray", JSON.stringify(highscoreArray));
    }
    var section = document.createElement('section');
    section.append(htmlToElement(
        "<h1>" +
        "Lederboard" +
        "</h1>"
    ));
    var ol = document.createElement('ol');
    if (typeof(highscoreArray) !== 'object' || highscoreArray.length === 0)
        ol.textContent = "No highscores yet! You could be the first!";
    else
        for (let player of highscoreArray)
            ol.append(htmlToElement(
                "<li>" +
                player.name + ": " +
                player.score +
                "</li>"
            ));
    section.appendChild(ol);
    section.append(htmlToElement(
        "<button class=\"back\">" +
        "Back to menu" +
        "</button>"
    ));
    section.append(htmlToElement(
        "<button class=\"clearHS\">" +
        "Clear Leaderboard" +
        "</button>"
    ));
    //button to start over. (mainMenu)
    content.appendChild(section);
}

function displayQuiz(isCorrect) {
    content.textContent = "";
    if (questionIndex >= QUESTIONSET.length) {
        clearInterval(interval);
        enterScoreBoard(quizTime - timeElapsed);
    } else {
        if (!isCorrect)
            timeElapsed += 10;
        var section = document.createElement('section');
        section.append(htmlToElement(
            "<h1>" +
            QUESTIONSET[questionIndex].question +
            "</h1>"
        ));
        var ul = document.createElement('ul');
        for (let choice of QUESTIONSET[questionIndex].choices) {
            ul.append(htmlToElement(
                "<ul>" +
                "<button class=\"choice\">" +
                choice +
                "</button>" +
                "</ul>"
            ));
        }
        section.append(ul);
        section.append(htmlToElement( //for additional styling, modify to fade on timeElapsed for 500 ms
            "<h6>" +
            ((isCorrect) ? "" : "Wrong!") +
            "</h6>"
        ));
        content.append(section);
    }
}

function countdown() { //for additional styling, modify to be 100
    interval = setInterval(function() {
        displayTimer();
        timeElapsed++;
        if (timeElapsed > quizTime) {
            clearInterval(interval);
            enterScoreBoard(0);
        }
    }, 1000);
}

function displayTimer() {
    const timeLeft = quizTime - timeElapsed;
    timer.textContent = ((timeLeft > 9) ? "" : "0") + timeLeft;
}

function mainMenu() {
    title.textContent = "Code Quiz Challenge Menu";
    clearInterval(interval); //clear any timer that's happening
    timeElapsed = quizTime; //display 0 time
    hsLink.setAttribute("style", "display:inline");
    timerDisplay.setAttribute("style", "display:none");
    content.textContent = ""; //erases my content
    content.append(htmlToElement(
        "<h1 id = \"title\">Coding Quiz Challenge</h1>" //looks like html
    ));
    content.append(htmlToElement(
        "<p id=\"description\">" +
        "Try to answer the following code-related questions within the time limit. Keep in mind that the incorrect answers will penalize your score/time by ten seconds!" +
        "</p>"
    ));
    content.append(htmlToElement(
        "<section>" +
        "<button id=\"startBtn\">Start Quiz</button>" +
        "</section>"
    ));
    document.getElementsByClassName("container");
}

function initQuiz() {
    questionIndex = 0;
    title.textContent = "Quiz time!"
    timeElapsed = 0;
    timerDisplay.setAttribute("style", "display:inline");
    hsLink.setAttribute("style", "display:none");
    displayQuiz(true); //to show nothing
    countdown();
}

body.addEventListener("click", function(event) {
    event.stopPropagation();
    const text = event.target.textContent;
    const c = event.target.getAttribute("class");
    if (text === "Start Quiz")
        initQuiz(); //initalize quiz
    if (c === "choice") //choice for a question
        if (QUESTIONSET[questionIndex].choices.includes(text))
            displayQuiz(text === QUESTIONSET[questionIndex++].answer); //move to the next question and display if its wrong or right
    if (text === "View Highscores") {
        displayScoreBoard(); //display highscores
    }
    if (c === "back") mainMenu(); //mainmenu
    if (c === "clearHS") {
        localStorage.setItem("highscoreArray", JSON.stringify([])); //clear localstorage
        displayScoreBoard(); //display highscores
    }
});

mainMenu();