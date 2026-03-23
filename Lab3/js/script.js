//event listeners
document.querySelector("#password").addEventListener("click", displaySuggestedPassword);
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("input", checkUsername);

document.querySelector("#signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let isValid = await validateForm();

    if (isValid) {
        document.querySelector("#signupForm").submit();
    }
});

displayStates();

let isUsernameAvailable = false;

//functions

//Displaying city from Web API after entering a zip code
async function displayCity() {
     //alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;
    //console.log(zipCode);

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    
    document.querySelector("#zipcodeError").innerHTML = "";

    if (!data || !data.city) {
        document.querySelector("#zipcodeError").innerHTML = "Zip code not found";
        document.querySelector("#zipcodeError").style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
    } else {
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#longitude").innerHTML = data.longitude;
        document.querySelector("#latitude").innerHTML = data.latitude;
    }
}


//Displaying counties from Web API based on the two-letter abbreviation of a state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();

    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";

    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

// checking whether the username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    if (username.length == 0) {
        usernameError.innerHTML = "Username Required!";
        usernameError.style.color = "red";
        isUsernameAvailable = false;
        return false;
    }



    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
        isUsernameAvailable = true;
        return true;
    } else {
        usernameError.innerHTML = "Username taken";
        usernameError.style.color = "red";
        isUsernameAvailable = false;
        return false;
    }
}

// Validating form data
async function validateForm(e) {
    let isValid = true;

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let passwordCheck = document.querySelector("#passwordCheck").value;

    document.querySelector("#usernameError").innerHTML = "";
    document.querySelector("#passwordError").innerHTML = "";

    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        document.querySelector("#usernameError").style.color = "red";
        isValid = false;
    } else {
        let available = await checkUsername();
        if (!available) {
            isValid = false;
        }
    }

    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters!";
        isValid = false;
    }

    if (password != passwordCheck) {
        document.querySelector("#passwordError").innerHTML = "Passwords must match!";
        isValid = false;
    }

    return isValid;
}

function displaySuggestedPassword() {
    let suggestedPassword = "Password1";
    document.querySelector("#suggestedPwd").innerHTML = " Suggested password: " + suggestedPassword;
}

async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    let stateList = document.querySelector("#state");
    stateList.innerHTML = "<option value=''>Select One</option>";

    for (let i = 0; i < data.length; i++) {
        stateList.innerHTML += `<option value="${data[i].usps}">${data[i].state}</option>`;
    }
}
