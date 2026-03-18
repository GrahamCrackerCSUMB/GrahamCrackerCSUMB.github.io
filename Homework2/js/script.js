// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global variables
var score=0;
var attempts= localStorage.getItem("total_attempts");
attempts = parseInt(attempts) || 0;

displayQ4Choices();

// Functions
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    document.querySelector("#q4Choices").innerHTML = "";

    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML +=
            `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}">
             <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label><br>`;
    }
}

function displayQ8Choices() {
    let q4ChoicesArray = ["Death Valley", "Gulf of Mexico", "New Orleans", "Lake Erie"];
    q4ChoicesArray = _.shuffle(q8ChoicesArray);

    document.querySelector("#q4Choices").innerHTML = "";

    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q8Choices").innerHTML +=
            `<input type="radio" name="q8" id="${q8ChoicesArray[i]}" value="${q8ChoicesArray[i]}">
             <label for="${q8ChoicesArray[i]}">${q8ChoicesArray[i]}</label><br>`;
    }
}

function isFormValid(){
    let isValid = true;

    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }

    return isValid;
} // isFormValid

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png'>";
    score += 10;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
    console.log("Grading quiz..");

    // resets validation feedback
    document.querySelector("#validationFdbk").innerHTML = ""


    if (!isFormValid()) {
        return;
    }

    // variables
    score = 0;

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Selected = document.querySelector("input[name=q4]:checked");
    let q4Response = q4Selected ? q4Selected.value : "";
    let q5Response = document.querySelector("#q5").value.toLowerCase();
    let q6Response = document.querySelector("#q6").value;
    let q8Selected = document.querySelector("input[name=q8]:checked");
    let q8Response = q8Selected ? q8Selected.value : "";
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    let q10Response = document.querySelector("#q10").value;

    // Grading question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // Grading question 2
    if (q2Response == "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    // Grading question 3
    if (
        document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked
    ) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // Question 4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }
    // Grading question 5
    if (q5Response == "San Francisco") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // Grading question 6
    if (q6Response == "wy") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // Grading question 7
    if (
        document.querySelector("#Maine").checked &&
        document.querySelector("#Vermont").checked &&
        document.querySelector("#Massachusetts").checked &&
        !document.querySelector("#Virginia").checked
    ) {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    // Question 8
    if (q8Response == "Death Valley") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    // Grading question 9
    if (q9Response == "Pierre") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // Grading question 10
    if (q10Response == "wi") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    if (score >= 80) {
    document.querySelector("#highScore").innerHTML = "Great job! You scored above 80!";
    } else {
        document.querySelector("#highScore").innerHTML = "";
    }


document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    if (score < 80) {
        document.querySelector("#totalScore").className = "text-danger";
    } else {
        document.querySelector("#totalScore").className = "text-success";
    }
document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
localStorage.setItem("total_attempts", attempts);
} // gradeQuiz