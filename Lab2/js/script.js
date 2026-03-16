//Event listerners
    document.querySelector("#guessBtn").addEventListener("click", checkGuess);
    document.querySelector("#resetBtn").addEventListener("click", intializeGame);

//Global variable
let randomNumber = Math.floor(Math.random() * 99) + 1;
let attempts = 0;
let wins = 0;
let losses = 0;

function intializeGame(){
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("random number = " + randomNumber);

    // hide the reset button
    document.querySelector("#resetBtn").style.display = "none";

    // showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    attempts =0;

    let playerguess = document.querySelector("#playerGuess")
    playerguess.focus(); //adding focus to the textbox
    playerguess.value = ""; // clear the textbox.
     let feedback = document.querySelector("#feedback");
     feedback.textContent = ""; //clearing feedback message
     document.querySelector("#Guesses").textContent = ""; //clearing 
}
   
function checkGuess(){
    let guess = document.querySelector("#playerGuess").value;
    console.log("player guess = " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    if(guess < 1 || guess > 99){
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
            wins++;
            document.querySelector("#wins").textContent = wins;
            gameOver();
    }
    else{
        document.querySelector("#Guesses").textContent += guess + " ";
        if(attempts == 7) {
            feedback.textContent = "You lost! The number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            document.querySelector("#losses").textContent = losses;
            gameOver();
        } else if (guess > randomNumber){
            feedback.textContent = "Guess was high!";
        } else {
            feedback.textContent = "Guess was low!";
    }
}
}
function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hide guess button
    resetBtn.style.display = "inline";
}

