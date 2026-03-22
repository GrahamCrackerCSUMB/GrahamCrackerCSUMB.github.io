//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);


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
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#longitude").innerHTML = data.longitude;
    document.querySelector("#latitude").innerHTML = data.latitude;
}

//Displaying counties from Web API based on the two-letter abbreviation of a state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();

    let countyList = document.querySelector("#county");

    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}