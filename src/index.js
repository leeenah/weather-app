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
  let currentMinutes = date.getMinutes(); //need to figure out what to do when time is <10 mins
  if (currentMinutes < 10) {
    currentMinutes = `0 ${currentMinutes}`;
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
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
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
  let humidiityDisplay = (document.querySelector(
    "#humidity"
  ).innerHTML = humidity);
}

function parseResponse(response) {
  showTemperature(response);
  showCity(response);
  showMoreWeatherInfo(response);
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
  temperature.innerHTML = 50;
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = 10;
}
//feature 1
let today = new Date();
let currentTimeAndDay = document.querySelector("#current-dayAndTime");
currentTimeAndDay.innerHTML = formatDate(today);

//feature 2
let cityWeather = document.querySelector("#search-form"); //added an id in input element
cityWeather.addEventListener("submit", submitForm);

//bonus feature
let farenheitInput = document.querySelector("#farenheit-link");
farenheitInput.addEventListener("click", convertToFarenheit);

let celciusInput = document.querySelector("#celcius-link");
celciusInput.addEventListener("click", convertToCelcius);

//Add current location button. Use the geolocation API to get your GPS coordinates
// and display the city and current temperature.

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "fc744c97c485c14d19b2746947729882";
  let apiGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  console.log(apiGeoLocation);
  axios.get(apiGeoLocation).then(parseLocation);
}

navigator.geolocation.getCurrentPosition(showPosition);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("submit", showPosition);

function parseLocation(response) {
  showTemperature(response);
  showCity(response);
}
