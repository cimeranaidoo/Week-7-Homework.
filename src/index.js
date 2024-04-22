function refreshWeather(response) {
  let temperatureElement = document.querySelector(
    ".weather-app-temperature-value"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector(".weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.textContent = response.data.city;
  timeElement.textContent = formatDate(date);
  descriptionElement.textContent = response.data.condition.description;
  humidityElement.textContent = `${response.data.temperature.humidity}%`;
  windSpeedElement.textContent = `${response.data.wind.speed}km/h`;
  temperatureElement.textContent = Math.round(temperature);
  iconElement.textContent = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b4aec534dtf9004483oc4f93845406a5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Durban");
