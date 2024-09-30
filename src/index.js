function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  humidityElement = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

    getForecast(response.data.city);  
}

function searchCity(city) {
  let apiKey = "a38tf674efobb00a595326db8b0e697a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
    let apikey = "a38tf674efobb00a595326db8b0e697a";
    let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
    axios(apiURL).then(displayForecast);

}
function displayForecast(response) {
    
  let forecastHtml = "";

  response.data.daily.forEach (function (day, index) {
    if (index < 6) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}"class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Durban");
displayForecast();
