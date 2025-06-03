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
  let humidity = parseFloat(response.data.temperature.humidity);
  humidityElement.innerHTML = humidity;

  humidityElement.classList.remove("good", "bad");
  if (humidity >= 30 && humidity <= 60) {
    humidityElement.classList.add("good");
  } else {
    humidityElement.classList.add("bad");
  }

  let windElement = document.querySelector("#wind-speed");
  let windSpeed = parseFloat(response.data.wind.speed);
  windElement.innerHTML = Math.round(windSpeed);
  windElement.style.display = "inline";

  windElement.classList.remove("good", "bad");
  if (windSpeed < 5) {
    windElement.classList.add("good");
  } else {
    windElement.classList.add("bad");
  }

  console.log("Parsed humidity value:", humidity);
  console.log("Parsed wind speed value:", windSpeed);

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
    getForecast(city);
  }
}
let city = "";
function getForecast(city) {
  let apiKey = "b9aaeaaf97004f2a03afob830bt63baf";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
}
function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌤️</div>
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
    <strong>68°</strong>
    </div>
    <div class="weather-forecast-temperature">53°</div>
    </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", pushSubmit);
getForecast();
displayForecast();
