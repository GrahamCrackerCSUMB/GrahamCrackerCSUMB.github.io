// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global variables
$("#totalScore").html(`Total Score: ${score}`);
var score=0;

// Functions
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
    score += 20;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
    console.log("Grading quiz..");

    // resets validation feedback
    document.querySelector("#validationFdbk").innerHTML = "";

    if (!isFormValid()) {
        return;
    }

    // variables
    let score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    console.log(q1Response);

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

document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

} // gradeQuiz