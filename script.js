"use strict";
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const weatherBox = document.querySelector(".weather-details-box");
const weatherDetails = document.querySelector(".weather-details");
const hourTemp = document.querySelector(".hour-temp");

const getData = (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Pleasy try again");
      return res.json();
    })
    .then((data) => {
      console.log(data);
      renderAcutalCity(data);
      renderWeatherDetails(data);
    });
};

const getHourWeatherData = (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Pleasy try again");
      return res.json();
    })
    .then((data) => {
      // console.log(data.forecast.forecastday[0].hour);
      renderForecastHourWeather(data);
    });
};

const getSearchCityData = (city) => {
  getData(
    `http://api.weatherapi.com/v1/current.json?key=82afcda73acb4552a50171727242703&q=${city}&aqi=no`
  );
};

const getHoursData = (city) => {
  getHourWeatherData(`http://api.weatherapi.com/v1/forecast.json?key=82afcda73acb4552a50171727242703&q=${city}&days=1&aqi=no&alerts=no
`);
};

const renderAcutalCity = (data) => {
  weatherBox.innerHTML = "";

  const html = `
    <h1 class="city">${data.location.name}</h1>
    <p class="date">${data.location.localtime}</p>
    <p class="temp">${data.current.temp_c} ℃</p>
    <img
      src="${data.current.condition.icon}"
      alt="Cloudy Icon"
      class="mainWeatherIcon"
    />
  `;

  weatherBox.insertAdjacentHTML("afterbegin", html);
};

const renderWeatherDetails = (data) => {
  weatherDetails.innerHTML = "";

  const html = `
  <li class="weather-detail">
    <i class="fa-solid fa-wind weather-icon"></i>
    <p class="weather-value">${data.current.wind_kph} km/h</p>
    <p class="weather-parametr">Wind speed</p>
  </li>
  <li class="weather-detail">
    <i class="fa-solid fa-arrows-down-to-line weather-icon"></i>
    <p class="weather-value">${data.current.pressure_mb}</p>
    <p class="weather-parametr">Pressure</p>
  </li>
  <li class="weather-detail">
    <i class="fa-solid fa-cloud weather-icon"></i>
    <p class="weather-value">${data.current.humidity}</p>
    <p class="weather-parametr">Humidity</p>
  </li>
  
`;

  weatherDetails.insertAdjacentHTML("afterbegin", html);
};

const renderForecastHourWeather = (data) => {
  hourTemp.innerHTML = "";

  const hourWeatherData = data.forecast.forecastday[0].hour;

  console.log(hourWeatherData);

  const html = hourWeatherData
    .map((hour) => {
      return `
    <li class="weather-detail">
       <p class="hour">${hour.time.slice(10, 16)}</p>
        <img
          src="${hour.condition.icon}"
          alt="Cloudy Icon"
          class="hourWeatherIcon"
    />
        <p class="hou-temp">${hour.temp_c}℃</p>
      </li>
    `;
    })
    .join("");

  hourTemp.insertAdjacentHTML("afterbegin", html);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchCityName = searchInput.value;

  getSearchCityData(searchCityName);
  getHoursData(searchCityName);
});
getSearchCityData("warsaw");
getHoursData("warsaw");
