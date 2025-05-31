function updateTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let formattedTime = `${currentDay} ${hours}:${minutes} ${ampm}`;
  document.getElementById("current-time").innerHTML = formattedTime;
}
updateTime();
setInterval(updateTime, 60000);

function searchCity(city) {
  let apiKey = "b9aaeaaf97004f2a03afob830bt63baf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  temperatureElement.style.display = "inline";

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconUrlElement = document.querySelector("#weather-icon");
  iconUrlElement.src = response.data.condition.icon_url;
}

function pushSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#user-input");
  let searchedCityElement = document.querySelector("#searched-city");
  searchedCityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", pushSubmit);
