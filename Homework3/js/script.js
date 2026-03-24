async function getCoordinates() {
    const zip = document.getElementById("zipCode").value;
    const result = document.getElementById("result");

    if (zip === "") {
        result.innerHTML = "<p class='error'>Please enter a ZIP code.</p>";
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


        result.innerHTML =
            "<h3>" + location.name + ", " + location.admin1 + "</h3>" +
            "<p><strong>Temperature:</strong> " + temp + " °F</p>";


        const image = document.getElementById("weatherImage");

        let imagePath = "";

        if (temp < 0) {
            imagePath = "img/below0.jpeg";
        } else if (temp < 30) {
            imagePath = "img/below30.jpeg";
        } else if (temp < 50) {
            imagePath = "img/below50.jpg";
        } else if (temp < 70) {
            imagePath = "img/below70.jpg";
        } else if (temp < 80) {
            imagePath = "img/below80.jpg";
        } else if (temp < 90) {
            imagePath = "img/below90.jpeg";
        } else if (temp < 100) {
            imagePath = "img/below100.jpeg";
        } else {
            imagePath = "img/over100.jpeg";
        }

        image.src = imagePath;
        image.style.display = "block";

    } catch (error) {
        result.innerHTML = "<p class='error'>Error!</p>";
    }
}