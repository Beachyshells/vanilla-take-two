function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#user-input");
  let searchedCityElement = document.querySelector("#searched-city");
  searchedCityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
