const weatherDiv = document.getElementById('weather');

// Append location name to the weather div
function addLocationName(weather) {
    const locationHeader = document.createElement('h2');
    locationHeader.textContent = `Location: ${weather.name}`;
    weatherDiv.append(locationHeader);
    console.log(`Location: ${weather.name}`)
}

// Add temperature to weather div
function addTemp(weather) {
    const temp = Math.floor((9/5) * (weather.main.temp - 273) + 32)
    const tempHeader = document.createElement('h2');
    tempHeader.textContent = `Temperature: ${temp}`;
    weatherDiv.append(tempHeader);
    console.log(`Temperature: ${temp}`)
}

// Add wind speed to weather div
function addWind(weather) {

    const windHeader = document.createElement('h2');
    windHeader.textContent = `Wind speed(mph): ${weather.wind.speed}`;
    weatherDiv.append(windHeader);
    console.log(`Wind speed(mph) ${weather.wind.speed}`)
}

// Add icon to weather div
function addIcon(weather) {
    // get icon code from object
    const iconCode = weather.weather[0].icon;
    console.log(`Icon Code: ${iconCode}`)
    // Use the icon code to get the icon using OpenWeatherMap.org
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    // Create a new image element using the iconUrl
    const image = document.createElement('img');
    image.src = iconUrl
    // Add the weather conditions to an h2 element

    // Append the text and image to the weatherDiv
    weatherDiv.append(image)
}

// adds whatever data is passed to the weather div
function addToWeather(data) {

}

// creates map showing lat long of weather info
function addMap(weather) {
    // get lat and long coordinates
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;

    console.log(`Latitude: ${lat}`)
    console.log(`Longitude: ${lon}`)
    // Use the Lat/Long to create a map
    const mapUrl = `http://maps.google.com/maps?q=${lat},${lon}&output=embed`;

    // create iframe and set attributes
    const iframe = document.createElement('iframe');
    iframe.src = mapUrl


    weatherDiv.append(iframe);
}

function sunInfo(weather) {
    // get sunrise and sunset info
    const sunrise = formatDate(weather.sys.sunrise);
    const sunset = formatDate(weather.sys.sunset);
    const sunriseHeader = document.createElement('h2');
    const sunsetHeader = document.createElement('h2');

    sunriseHeader.textContent = sunrise;
    sunsetHeader.textContent = sunset;

    weatherDiv.append(sunriseHeader);
    weatherDiv.append(sunsetHeader);

}

// add correctly formatted dates to the page
function formatDate(date) {

    let d = new Date(0);
    d.setUTCSeconds(date);

    // Get the year
    const year = d.getFullYear()

    // Get the month
    const month = d.getMonth() + 1;

    // Get the day
    const day = d.getDate();

    // Get the hours
    const hours = d.getHours();

    // Get the minutes
    let minutes =  d.getMinutes();

    // Get seconds
    let seconds = d.getSeconds();

    // Return the date and time...
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
}

// Use the below URL to make a fetch request, 
// and then run the above functions to populate the page
const URL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,US&appid=2f4580c1da2a1471787ee4c356181fd1";

function get(url){
    return fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            addIcon(data);
            addLocationName(data);
            addTemp(data);
            addWind(data);
            addToWeather(data);
            addMap(data);
            sunInfo(data);
        })
        .catch(err => err)
}

get(URL)