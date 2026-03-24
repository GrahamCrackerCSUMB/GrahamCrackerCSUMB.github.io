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

        const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true";

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        const temp = weatherData.current_weather.temperature;


        result.innerHTML =
            "<h3>" + location.name + ", " + location.admin1 + "</h3>" +
            "<p><strong>Latitude:</strong> " + lat + "</p>" +
            "<p><strong>Longitude:</strong> " + lon + "</p>" +
            "<p><strong>Temperature:</strong> " + temp + " °C</p>";

    } catch (error) {
        result.innerHTML = "<p class='error'>Error!</p>";
    }
}