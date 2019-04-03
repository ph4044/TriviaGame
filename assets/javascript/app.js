var questionsArray =
    [
        {
            question: "1. How many times has France won the World Cup?",
            choices: [1, 2, 3, 4],
            answer: "2",
            name: "one"
        },

        {
            question: "2. Who are the all-time leading scorers at the FIFA World Cup?",
            choices: ["Brazil", "Germany", "Argentina", "Spain"],
            answer: "Brazil",
            name: "two"
        },

        {
            question: '3. Which Argentine player was awarded the FIFA Golden Ball award for "Player of the Tournament" in recognition of his four goals and one assist and leading Argentina to the final of the 2014 World Cup?',
            choices: ["Sergio Aguero", "Lionel Messi", "Marcos Rojo", "Lucas Biglia"],
            answer: "Lionel Messi",
            name: "three"
        },

        {
            question: "4. Which was the first country to retain the World Cup?",
            choices: ["Germany", "Argentina", "Italy", "Brazil"],
            answer: "Italy",
            name: "four"
        },

        {
            question: "5. Who won the Golden Gloves award in the 2010 World Cup?",
            choices: ["Diego Bemaglio", "Ike Casillas", "Tim Wiese", "Eduardo"],
            answer: "Eduardo",
            name: "five"
        },
    ]

var counter = 15;
var intervalId;
var theQuestion = "";
var correctAnswers = 0;
var unAnswered = 0;
var wrongAnswers = 0;
var clockRunning = false;  // prevents the clock from being sped up unnecessarily.
var checkedResults = false;

$("#start-button").on("click", function () {
    $("#start-button").remove();  //remove the start button.
    displayQuestions();  // call function to display the questions and choices.
    start();   // call function to start the countdown timer.
    $("#submit-button").on("click", function () {    // event listener for submit button.
        $("#submit-button").css("visibility", "hidden");  // hide the submit button.
        checkResults();  // call function to check and display the results of the trivia game.
    });
});

function displayQuestions() {    // function displays the questions and choices, and the submit button.
    var output = [];
    for (var i = 0; i < questionsArray.length; i++) {
        theQuestion = questionsArray[i].question;
        var questionDiv = $("<div>");
        questionDiv.text(theQuestion);
        $("#game-section").append(questionDiv);
        questionDiv.attr("class", "question");

        for (var j = 0; j <= 3; j++) {
            theChoice = questionsArray[i].choices[j];
            var choicesDiv = $("<div>");
            choicesDiv.text(theChoice);
            var radioBtn = $('<input type="radio" name="' + questionsArray[i].name + '" value="' + questionsArray[i].choices[j] + '"/><label for="' + questionsArray[i].choices[j] + '">' + questionsArray[i].choices[j] + '</label>');
            $("#game-section").append(radioBtn);
        }
    }
    var spaceIt = $("<br>");  // add some space between the questions and the submit button.
    $("#game-section").append(spaceIt);
    createSubmit();   // call function to create Submit button.
}

function createSubmit() {   // function to create and display the Submit button.
    var $input = $('<input type="button" value="Submit" id="submit-button" />');
    $("#game-section").append($input);
}

function start() {   // function to start the interval timer.
    if (!clockRunning) {
        intervalId = setInterval(decrement, 1000);
        clockRunning = true;
    }
}

function decrement() {   // function to decrement the game time remaining display.
    counter--;  //  Decrease number by one. 
    $("#time-remaining").html("<h2>" + counter + "</h2>");  //  display the seconds remaining

    //  Once number hits zero...
    if (counter <= 0) {
        clearInterval(intervalId);  // clear intervalId
        clockRunning = false;
        checkResults()
    }
}

function checkResults() {  // function to check and display the results of the game.
    if (!checkedResults) {  // only complete this function if it has not been completed before.
        checkedResults = true;
        for (var i = 0; i < questionsArray.length; i++) {  // checking for un-answered questions.
            if (!$('input:radio[name="' + questionsArray[i].name + '"]:checked').val()) {
                unAnswered++;
            }

            // checking for correct answers.
            if ($('input:radio[name="' + questionsArray[i].name + '"]:checked').val() === questionsArray[i].answer) {
                correctAnswers++;
            }
            else {   // checking for incorrect answers.  Un-answered are counted as incorrect.
                wrongAnswers++;
                console.log("wrong = " + wrongAnswers)
            }
        }

        // Empty the div.  Hide the timer and time remaining header.
        $("#game-section").html("");
        $("#time-remaining").css("visibility", "hidden");
        $("#time-header").css("visibility", "hidden");
        // Display the results.
        var resultsDiv = $("<div>");
        resultsDiv.text("Correct = " + correctAnswers + ".  Incorrect = " + wrongAnswers + " (Unanswered = " + unAnswered + ").");
        $("#game-section").prepend(resultsDiv);
    }
}




