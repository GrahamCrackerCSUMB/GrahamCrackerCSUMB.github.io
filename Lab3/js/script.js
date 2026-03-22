//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);


//functions

//Displaying city from Web API after entering a zip code
function displayCity() {

    alert(document.querySelector("#zip").value);

}