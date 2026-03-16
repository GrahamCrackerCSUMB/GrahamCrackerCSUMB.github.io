//Event listerners
    document.querySelector("#guessBtn").addEventListener("click", checkGuess);
    document.querySelector("#restBtn").addEventListener("click", initalizeGame);

//Global variable
let randomNumber = Math.floor(Math.random() * 99) + 1;
let attempts = 0;

function intializeGame(){
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("random number = " + randomNumber);

    // hide the reset button
    document.querySelector("#resetBtn").Style.display = "none";

    // showing the guess button
    document.querySelector("#guessBtn").Style.display = "inline";

    let playerguess = document.querySelector("#playerGuess")
    playerguess.focus(); //adding focus to the textbox
    playerguess.valuer = ""; // clear the textbox.
     let feedback = document.querySelector("#feedback");
     feedback.textContent = ""; //clearing feedback message
     ocument.querySelector("#guesses").textContent = ""; //clearing 
}
   
function checkGuess(){
    let guess = document.querySelector("#playerGuess").value;
    console.log("player guess = " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    if(guess <1 || guess > 99){
        feedback.textContent = "Please enter a value between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts ++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if(guess ==randomNumber){
            feedback.textContent = "You guessed it! You won!";
            feedback.style.color = "darkgreen";
            gameOver();
    }
    else{
        document.querySelector("#guesses").textContent += guess + " ";
        if(attempts == 7) {
            feedback.textContent = "You lost!";
            feedback.style.color = "black";
            gameOver();
        } else if (guess > randomNumber){
            feedback.textContent = "Guess was high!";
        } else {
            feedback.textContent = "Guess was low!";
    }
}

function gameOver(){
    guessBtn = document.querySelector("#guessBtn");
    resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hide guess button
    resetBtn.style.display = "inline";
}
}
