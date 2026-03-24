async function getWeather() {
    const zip = document.getElementById("zipCode").value;
    const result = document.getElementById("result");

    if (zip === "") {
        result.innerHTML = "<p class='error'>Please enter a ZIP code.</p>";
        return;
    }

    const apiKey = "1bc2dd74a57903d4331aa36418f71b41";
    const url = "http://api.weatherstack.com/current?access_key=" + apiKey + "&query=" + zip + "&units=f";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            result.innerHTML = "<p class='error'>Invalid ZIP code.</p>";
            return;
        }

        result.innerHTML =

            "<p><strong>Weather:</strong> " + data.current.weather_descriptions[0] + "</p>";

    } catch (error) {
        result.innerHTML = "<p class='error'>Something went wrong.</p>";
    }
}