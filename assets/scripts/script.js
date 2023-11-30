// Psuedo code for this project. 

// We need to call in the Weather API we will be using

// This code will get the weather data for the location inputed by the user. 
var weatherReport = document.getElementById("weather-report")

function clearWeatherReport() {
    weatherReport.innerHTML = '';
}

function storeSearch(location) {
    var storedLocations = JSON.parse(localStorage.getItem("storedLocations")) || [];

    storedLocations.push(location);

    localStorage.setItem("storedLocations", JSON.stringify(storedLocations));
    displaySearchHistory();
    // Add code that will save the value of the searched location to loacl storage.

    // Appends that title to the prev-results-btn text. 

}

function getTestApi(lat, lon) {
    var units = "imperial"
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=' + units + '&appid=7683dd89e3713c696366aefeb8fa991f';

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var listName = document.createElement("h2");

            var iconCode = data.list[0].weather[0].icon;
            var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
            var iconImg = document.createElement("img");
            iconImg.src = iconUrl;
            iconImg.alt = "Weather Icon";

            // listName.textContent = locationSearchEl.value.trim() + " " + "(" + dayjs().format('M/D/YYYY') + ")";
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
// getTestApi();


// We need the location entry box. 
var locationSearchEl = document.querySelector("#search-box");

// When the user searches a location, we will pull data from the weather API about that location. 

var formSubmitHandler = function (event) {
    event.preventDefault();

    var locationSearch = locationSearchEl.value.trim();

    if (locationSearch) {
        storeSearch(locationSearch);
        // This is the code to convert the location name into lon and lat values. 
        var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + locationSearch + "&limit=1&appid=7683dd89e3713c696366aefeb8fa991f"

        fetch(geoApiUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                if (data.length > 0) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    // console.log("Latitude:", lat, "Longitude:", lon);
                    clearWeatherReport();
                    getTestApi(lat, lon);
                }
                else {
                    console.log("location not found");
                }
            })
            .catch(function (error) {
                console.log("Error fetching data: ", error);
            });


    } else {
        alert('Please try a different location');
    }
};

var form = document.querySelector('form');
form.addEventListener('submit', formSubmitHandler);




// We need a spot that displays the previous search location that the user has searched. 
// This will be the code to create the previous results buttons. 


function displaySearchHistory() {
    var previousSearch = JSON.parse(localStorage.getItem("storedLocations"));
    var searchHistory = document.querySelector("#search-history")

    searchHistory.innerHTML = "";

    var endIndex = previousSearch.length;
    var startIndex = Math.max(0, previousSearch.length - 10);
    var uniqueCities = new Set();

    for (var i = endIndex - 1; i >= startIndex; i--) {
        var cityName = previousSearch[i];
        if (cityName && !uniqueCities.has(cityName)) {

            var historyBtn = document.createElement("button");
            historyBtn.classList.add("prev-results-btn")
            historyBtn.value = cityName;
            historyBtn.textContent = cityName;
            attachHoverEffect(historyBtn);

            // trying to add function for button clicks.
            historyBtn.addEventListener("click", function (event){

                var nameValue = event.target.value;
    
                if (nameValue) {
    
                    // This is the code to convert the location name into lon and lat values. 
                    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + nameValue + "&limit=1&appid=7683dd89e3713c696366aefeb8fa991f"
    
                    fetch(geoApiUrl)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (data) {
                            if (data.length > 0) {
                                var lat = data[0].lat;
                                var lon = data[0].lon;
                                // console.log("Latitude:", lat, "Longitude:", lon);
                                clearWeatherReport();
                                getTestApi(lat, lon);
                            }
                            else {
                                console.log("location not found");
                            }
                        })
                        .catch(function (error) {
                            console.log("Error fetching data: ", error);
                        });
    
    
                } else {
                    alert('Please try a different location');
                }

            });

            searchHistory.appendChild(historyBtn);
            uniqueCities.add(cityName);
        }

        // add event listener to each button.
    }
    // console.log(cityName);
}
displaySearchHistory();
function attachHoverEffect(button) {

    button.addEventListener("mouseover", function () {
        button.style.boxShadow = "0 8px 13px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)";
    })
    button.addEventListener("mouseout", function () {
        button.style.boxShadow = "";
    });
}



var resetPress = function resetSearchHistory() {
    localStorage.removeItem("storedLocations");
    window.location.reload();
};
var clearPress = document.querySelector("#clear");
clearPress.addEventListener('click', resetPress);


// We need an empty div that will display thecurrent conditions at the top and the 5 day forcast at the bottom. 

// When the user submits a new location, or clicks a previously searched one, the 5 day forecast is displayed in the empty div. 

