function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#user-input");
  let searchedCityElement = document.querySelector("#searched-city");
  searchedCityElement.innerHTML = searchInput.value;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);


let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${}&appid=${apiKey}&units=metric`;
let apiKey="b9aaeaaf97004f2a03afob830bt63baf"