// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global variables

// Functions
function isFormValid(){
    let isValid = true;

    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }

    return isValid;
} // isFormValid

function gradeQuiz(){
    console.log("Grading quiz..");

    // resets validation feedback
    document.querySelector("#validationFdbk").innerHTML = "";

    if (!isFormValid()) {
        return;
    }

    let q1Response = document.querySelector("#q1").value;
    console.log(q1Response);

} // gradeQuiz