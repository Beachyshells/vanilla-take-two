function searchCity(city) {
  let apiKey = "b9aaeaaf97004f2a03afob830bt63baf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement;
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
