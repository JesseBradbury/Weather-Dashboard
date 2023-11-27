// Psuedo code for this project. 

// We need to call in the Weather API we will be using

// This code will get the weather data for the location inputed by the user. 
var weatherReport = document.getElementById("weather-report")

function getTestApi() {
    var lat = "33.448376";
    var lon = "-112.074036";
    var units = "imperial"
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=' + units + '&appid=7683dd89e3713c696366aefeb8fa991f';

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var listName = document.createElement("h2");
            var iconCode = data.list[0].weather[0].icon; // Accessing the icon code from the API response
            var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png'; // Constructing the icon URL
            var iconImg = document.createElement("img");
            iconImg.src = iconUrl;
            iconImg.alt = "Weather Icon"; // Add alt text for accessibility
            
            listName.textContent = data.city.name + " " + "(" + dayjs().format('M/D/YYYY') + ")";
            
            var listTemp = document.createElement("p");
            listTemp.textContent = "Temp: " + data.list[0].main.temp;
            
            var listWind = document.createElement("p");
            listWind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
            
            var listHumid = document.createElement("p");
            listHumid.textContent = "Humidity: " + data.list[0].main.humidity + " %";
            
            weatherReport.appendChild(listName);
            listName.appendChild(iconImg);
            weatherReport.appendChild(listTemp);
            weatherReport.appendChild(listWind);
            weatherReport.appendChild(listHumid);
        })
};
getTestApi();


// var getWeatherData = function (repo) {
//     var lat = "33.448376";
//     var lon = "-112.074036";
//     var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=7683dd89e3713c696366aefeb8fa991f';

//     fetch(apiUrl).then(function (response) {
//         //   if (response.ok) {
//         //     response.json().then(function (data) {
//         //       displayIssues(data);

//         //       if (response.headers.get('Link')) {
//         //         displayWarning(repo);
//         //       }
//         //     });
//         //   } else {
//         //     document.location.replace('./index.html');
//         //   }
//     });
// };

var locationGeoData = function () {
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=7683dd89e3713c696366aefeb8fa991f"

    fetch(geoApiUrl)
        .then(function (response) {
            return response.json()
        })
}

// We need a header. 

// We need the location entry box. 
// When the user searches a location, we will pull data from the weather API about that location. 


// We will need some system of getting the long/lat of the location to place into the API 

// We need a spot that displays the previous search location that the user has searched. 

// We need an empty div that will display thecurrent conditions at the top and the 5 day forcast at the bottom. 

// When the user submits a new location, or clicks a previously searched one, the 5 day forecast is displayed in the empty div. 

