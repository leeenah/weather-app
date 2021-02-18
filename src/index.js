//Feature #1
//display the current date and time (ie Tuesday 16:00 )
function formatDate(date) {
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = dayIndex[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

function timeFormat(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentHour}:${currentMinutes}`;
}

//Displays the temperature of the searched city on the page by replacing the HTML element
function showTemperature(temperature) {
  let roundTemperature = Math.round(temperature);
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerHTML = roundTemperature;
}

//Displays the city of the searched city on the page by replacing the HTML element
function showCity(city) {
  let h1 = document.querySelector("#city"); //#city = h1 element.
  h1.innerHTML = city;
  //can also write the above as:
  //let h1 = document.querySelector("#city").innerHTML = response2.data.name;
}
//Additional weather information
function showMoreWeatherInfo(feelsLike, humidity) {
  let roundFeelsLike = Math.round(feelsLike);
  let feelsLikeDisplay = (document.querySelector(
    "#feels-like"
  ).innerHTML = roundFeelsLike);
  let humidityDisplay = Math.round(
    (document.querySelector("#humidity").innerHTML = humidity)
  );
}

function showWeatherDescription(description) {
  let weatherDescription = (document.querySelector(
    "#weather-description"
  ).innerHTML = description);
}

function parseResponse(response) {
  showTemperature(response.data.main.temp);
  showCity(response.data.name);
  showMoreWeatherInfo(
    response.data.main.feels_like,
    response.data.main.humidity
  );
  showWeatherDescription(response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  //this loops from index 0 - 6.
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2"> <div>${timeFormat(forecast.dt * 1000)}</div>
      
      <img src = "http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" />
      
      <div <span id = "high"> <strong>${Math.round(
        forecast.main.temp_max
      )}°C </strong> </span>| <span> ${Math.round(
      forecast.main.temp_min
    )}°C </span>
      </div>
    </div>`;
  }
}

//this passes "Vancouver" and will display the forecast for Vancouver only
function searchCity(city) {
  let apiKey = "fc744c97c485c14d19b2746947729882";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(parseResponse);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

//Bonus Feature:
//Displays degrees celcius and vice versa
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureField = document.querySelector("#current-temperature");
  let temperature = Number(temperatureField.innerHTML);
  celciusInput.classList.remove("active");
  farenheitInput.classList.add("active");
  let farenheitTemperature = (temperature * 9) / 5 + 32;
  temperatureField.innerHTML = Math.round(farenheitTemperature);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusInput.classList.add("active");
  farenheitInput.classList.remove("active");
  let temperatureField = document.querySelector("#current-temperature");
  let temperature = Number(temperatureField.innerHTML);
  let celciusTemperature = ((temperature - 32) * 5) / 9;
  temperatureField.innerHTML = Math.round(celciusTemperature);
}

//Add current location button.
//Display the city and current temperature using the geolocation API
function showCurrentLocationWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "fc744c97c485c14d19b2746947729882";
  let apiGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoLocation).then(parseCurrentLocation);
}

function parseCurrentLocation(response) {
  parseResponse(response);
  let city = response.data.name;
  let units = "metric";
  let apiKey = "fc744c97c485c14d19b2746947729882";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationWeather);
}

//feature 1
let today = new Date();
let currentTimeAndDay = document.querySelector("#current-dayAndTime");
currentTimeAndDay.innerHTML = formatDate(today);

//feature 2
let cityWeather = document.querySelector("#search-form"); //added an id in input element
cityWeather.addEventListener("submit", submitForm);

let farenheitInput = document.querySelector("#farenheit-link");
farenheitInput.addEventListener("click", convertToFarenheit);

let celciusInput = document.querySelector("#celcius-link");
celciusInput.addEventListener("click", convertToCelcius);

//Current location button
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("San Francisco");
