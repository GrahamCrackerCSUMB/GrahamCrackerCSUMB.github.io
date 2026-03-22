//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);


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