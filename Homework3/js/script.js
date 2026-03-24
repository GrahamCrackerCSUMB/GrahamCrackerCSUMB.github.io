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

        if (data.error) {
            result.innerHTML = "<p class='error'>Invalid ZIP code.</p>";
            return;
        }

        const location = data.results[0];

        result.innerHTML =
            "<h3>" + location.name + ", " + location.admin1 + "</h3>" +
            "<p><strong>Latitude:</strong> " + location.latitude + "</p>" +
            "<p><strong>Longitude:</strong> " + location.longitude + "</p>";

    } catch (error) {
        result.innerHTML = "<p class='error'>Error!</p>";
    }
}