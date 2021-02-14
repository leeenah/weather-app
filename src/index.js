//Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00
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

//Homework 5
//1. city = london
//2. city = new york
// n = user input
function callApi() {
  let city = document.querySelector("#search-city").value;
  let apiKey = "fc744c97c485c14d19b2746947729882";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(parseResponse);
  // axios.get(apiUrl).then(showCity);
}

//Display results of the searched city on the page

function showTemperature(response) {
  celciusTemperature = response.data.main.temp;
  let temperature = Math.round(celciusTemperature);
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerHTML = temperature;
}

function showCity(response2) {
  let city = response2.data.name; //new york
  let h1 = document.querySelector("#city"); //#city = h1 element.
  h1.innerHTML = city;
  //can also write the above as
  //let h1 = document.querySelector("#city").innerHTML = response2.data.name;
}

function showMoreWeatherInfo(response3) {
  let feelsLike = Math.round(response3.data.main.feels_like);
  let feelsLikeDisplay = (document.querySelector(
    "#feels-like"
  ).innerHTML = feelsLike);
  let humidity = response3.data.main.humidity;
  let humidityDisplay = Math.round(
    (document.querySelector("#humidity").innerHTML = humidity)
  );
}

function showWeatherDescription(response4) {
  let description = response4.data.weather[0].description;
  let weatherDescription = (document.querySelector(
    "#weather-description"
  ).innerHTML = description);
}

function parseResponse(response) {
  showTemperature(response);
  showCity(response);
  showMoreWeatherInfo(response);
  showWeatherDescription(response);
}

function displayForecast(response) {
  console.log(response.data);
}

function search(city) {
  let apiKey = "fc744c97c485c14d19b2746947729882";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(parseResponse);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`; //mode
  axios.get(apiUrl).then(displayForecast);
}
//Feature #2
//Add a search engine, when searching for a city (i.e. Paris),
//display the city name on the page after the user submits the form.

function showCityWeather(event) {
  event.preventDefault();
  // get search text field
  let cityInput = document.querySelector("#search-city");
  // gets H1 element
  let city = document.querySelector("#city");
  city.innerHTML = cityInput.value; //show value(input) from the cityInput
  // callApi(cityInput.value);
}

function submitForm(event) {
  showCityWeather(event);
  callApi();
}

//Bonus Feature:
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

function convertToFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  celciusInput.classList.remove("active");
  farenheitInput.classList.add("active");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenheitTemperature);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusInput.classList.add("active");
  farenheitInput.classList.remove("active");
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
}
//feature 1
let today = new Date();
let currentTimeAndDay = document.querySelector("#current-dayAndTime");
currentTimeAndDay.innerHTML = formatDate(today);

//feature 2
let cityWeather = document.querySelector("#search-form"); //added an id in input element
cityWeather.addEventListener("submit", submitForm);

//bonus feature
let celciusTemperature = null;

let farenheitInput = document.querySelector("#farenheit-link");
farenheitInput.addEventListener("click", convertToFarenheit);

let celciusInput = document.querySelector("#celcius-link");
celciusInput.addEventListener("click", convertToCelcius);

//Add current location button. Use the geolocation API to get your GPS coordinates
// and display the city and current temperature.

function showCurrentLocationWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "fc744c97c485c14d19b2746947729882";
  let apiGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoLocation).then(parseResponse);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationWeather);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

search("Vancouver");
