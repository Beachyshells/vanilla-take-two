function updateTime(unixTime) {
  let cityTime = new Date(unixTime * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[cityTime.getDay()];
  let hours = cityTime.getHours();
  let minutes = cityTime.getMinutes();

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  document.getElementById("todays-day").innerHTML = currentDay;
  document.getElementById("current-hours").innerHTML = hours;
  document.getElementById("current-minutes").innerHTML = `${minutes} ${ampm}`;
}

function capitalizeWords(input) {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function searchCity(city) {
  let apiKey = "b9aaeaaf97004f2a03afob830bt63baf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data);

  let searchedCityElement = document.querySelector("#searched-city");
  searchedCityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  temperatureElement.style.display = "inline";

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  windElement.style.display = "inline";

  let iconUrlElement = document.querySelector("#weather-icon");
  iconUrlElement.src = response.data.condition.icon_url;
  iconUrlElement.style.display = "inline";

  let farenheitElement = document.querySelector(".degree-fahrenheit");
  farenheitElement.style.display = "inline";

  updateTime(response.data.time);
  if (window.timeUpdateInterval) {
    clearInterval(window.timeUpdateInterval);
  }
  window.timeUpdateInterval = setInterval(() => {
    response.data.time += 60;
    updateTime(response.data.time);
  }, 60000);
}

function pushSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#user-input");
  let city = capitalizeWords(searchInput.value.trim());
  if (city) {
    searchCity(city);
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", pushSubmit);
