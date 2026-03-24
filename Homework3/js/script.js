document.getElementById("zipCode").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getCoordinates();
    }
});

async function getCoordinates() {
    const zip = document.getElementById("zipCode").value;
    const result = document.getElementById("result");

    if (zip === "") {
        result.innerHTML = "<p class='error'>Please enter a ZIP code.</p>";
        return;
    }

    if (zip.length !== 5) {
    result.innerHTML = "<p class='error'>ZIP must be 5 digits.</p>";
    return;
    }


    try {
        const url = "https://geocoding-api.open-meteo.com/v1/search?name="  + zip;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results) {
            result.innerHTML = "<p class='error'>Invalid ZIP code.</p>";
            return;
        }

        const location = data.results[0];
        const lat = location.latitude;
        const lon = location.longitude;

        const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true&temperature_unit=fahrenheit";

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        const temp = weatherData.current_weather.temperature;
        const image = document.getElementById("weatherImage");

        let imagePath = "";
        let message = "";

        if (temp < 0) {
            message = "Girl, all the layers. Every. Single. One. You'll catch your death!";
            imagePath = "img/below0.jpeg";
        } else if (temp < 30) {
            message = "Thermal pants, a coat, and a sweater.";
            imagePath = "img/below30.jpeg";
        } else if (temp < 50) {
            message = "One heavy winter coat.";
            imagePath = "img/below50.jpg";
        } else if (temp < 70) {
            message = "A light jacket should be fine.";
            imagePath = "img/below70.jpg";
        } else if (temp < 80) {
            message = "No sweater needed, enjoy the sunshine!";
            imagePath = "img/below80.jpg";
        } else if (temp < 90) {
            message = "No sweater, but you better be wearing sunscreen.";
            imagePath = "img/below90.jpeg";
        } else if (temp < 100) {
            message = "Forget the sweater, pack the sunglasses and some cold drinks.";
            imagePath = "img/below100.jpeg";
        } else {
            message = "You need sunprotective layers or you'll burn!";
            imagePath = "img/over100.jpeg";
        }

        result.innerHTML =
            "<h3>" + location.name + ", " + location.admin1 + "</h3>" +
            "<p><strong>Temperature:</strong> " + temp + " °F</p>" +
            "<p><strong>Advice:</strong> " + message + "</p>";

        image.src = imagePath;
        image.style.display = "block";

    } catch (error) {
        result.innerHTML = "<p class='error'>Error!</p>";
    }
}