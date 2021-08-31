// DOM Elements
// Left Side Elements
const alertElement = document.querySelector(".alert-wrapper");
const mainiconElement = document.querySelector(".main_temp_img");
const maintempElement = document.querySelector(".temperature");
const dayElement = document.querySelector(".day-info");
const timeElement = document.querySelector(".time");
const descriptionElement = document.querySelector(".description");
const rainElement = document.querySelector(".rain");
const cityElement = document.querySelector(".city-name");
const countryElement = document.querySelector(".country-name");
const citynameInput = document.querySelector("#cityName");
const formInput = document.querySelector("#form");
const currlocationElement = document.querySelector(".locate-me-btn");

// Right Side Elements
var weekForecastElement = document.getElementsByClassName("seven-day-forecast");
const uvElement = document.querySelector(".uv-details p");
const windElement = document.querySelector(".wind-details p");
const sunriseElement = document.querySelector(".sunrise");
const sunsetElement = document.querySelector(".sunset");
const humidityElement = document.querySelector(".humidity-details .card-data");
const humidityLevelElement = document.querySelector(".humidity-details .desc");
const visibilityElement = document.querySelector(
  ".visibility-details .card-data"
);
const visibilityLevelElement = document.querySelector(
  ".visibility-details .desc"
);
const airElement = document.querySelector(".air-details .card-data");
const airLevelElement = document.querySelector(".air-details .desc");

// API Key
const key = "b9954716863a2b07b18bd038adf88250";

// App Data
let weather = {};

weather.temperature = {
  unit: "celcius",
};

// Show Error Alert to client
const showAlert = (type, message) => {
  alertElement.style.display = "block";
  alertElement.innerHTML = `<div class="alert ${type}" role="alert"><span class="spinner-grow spinner-grow-sm" role="status"></span> ${message}</div>`;
  setTimeout(() => {
    alertElement.style.display = "none";
  }, 3000);
};

// Getting Weather Data from API
const getWeather = (latitude, longitude) => {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${key}&units=metric`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Insert API data to Weather Object
      weather = data;
      // console.log(weather);
    })
    .then((data) => {
      var fday = "";

      weather.daily.forEach((value, index) => {
        if (index > 0) {
          // console.log(index);
          var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
            weekday: "short",
          });

          var icon = value.weather[0].icon;
          var high = value.temp.max.toFixed(0);
          var low = value.temp.min.toFixed(0);

          fday = `<div class="col">
                    <div class="weekday-details">
                        <div class="weekday">${dayname}</div>
                        <img src="icons/${icon}.svg" alt="${icon}" width="60">
                        <div class="temp-details"><span class="high">${high}°</span> <span class="low">${low}°</span></div>
                    </div>
                </div>`;
          weekForecastElement[0].insertAdjacentHTML("afterbegin", fday);
          //    console.log(weekForecastElement);

          // Showding data to client
          mainiconElement.src = `icons/${weather.current.weather[0].icon}.svg`;
          maintempElement.innerHTML = `${Math.floor(
            weather.current.temp
          )} <sup>°C</sup>`;
          descriptionElement.innerHTML = `<img src="icons/${weather.current.weather[0].icon}.svg" alt="icon" width="30"> <span class="align-middle">${weather.current.weather[0].description}</span>`;
          rainElement.innerHTML = `<img src="icons/wind.svg" alt="wind" width="30"> <span class="align-middle">Wind - ${weather.current.wind_deg}<sup>°</sup></span>`;
          var currentTime = new Date(
            weather.current.dt * 1000
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          var todayname = new Date(
            weather.current.dt * 1000
          ).toLocaleDateString("en", {
            weekday: "long",
          });
          dayElement.innerHTML = `<span class="day">${todayname}</span>, <span class="time">${currentTime}</span>`;

          // Right Side Elements
          uvElement.innerHTML = weather.current.uvi;
          windElement.innerHTML = `${weather.current.wind_speed}m/s`;
          var sunrise = new Date(
            weather.current.sunrise * 1000
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          var sunset = new Date(
            weather.current.sunset * 1000
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          // console.log(weather.current.sunrise.getHours());
          sunriseElement.innerHTML = `<img src="icons/sunrise.svg" alt="sunrise" width="30"><span class="align-middle">${sunrise}</span>`;
          sunsetElement.innerHTML = `<img src="icons/sunset.svg" alt="sunrise" width="30"><span class="align-middle">${sunset}</span>`;
          humidityElement.innerHTML = `${weather.current.humidity} <sup>%</sup>`;

          // Checking humidity Level
          if (weather.current.humidity <= 30) {
            humidityLevelElement.innerHTML = `<span class="align-middle">Too Dry</span><img src="icons/humidityLevel/Too-Dry.gif" alt="Too Dry" width="25"></img>`;
          } else if (
            weather.current.humidity >= 30 &&
            weather.current.humidity <= 60
          ) {
            humidityLevelElement.innerHTML = `<span class="align-middle">Comfort</span><img src="icons/humidityLevel/Comfort.gif" alt="Comfort" width="25"></img>`;
          } else {
            humidityLevelElement.innerHTML = `<span class="align-middle">Too Humid</span><img src="icons/humidityLevel/Too-Humid.gif" alt="Too Humid" width="25"></img>`;
          }

          visibilityElement.innerHTML = `${
            weather.current.visibility / 1000
          } <sub>km</sub>`;

          //  Checking Visibility Level
          if (weather.current.visibility / 1000 <= 1) {
            visibilityLevelElement.innerHTML = `<span class="align-middle">Fog</span><img src="icons/visibilityLevel/Fog.gif" alt="Fog" width="25"></img>`;
          } else if (
            weather.current.visibility / 1000 >= 1 &&
            weather.current.visibility / 1000 <= 5
          ) {
            visibilityLevelElement.innerHTML = `<span class="align-middle">Poor</span><img src="icons/visibilityLevel/Poor.gif" alt="Poor" width="25"></img>`;
          } else if (
            weather.current.visibility / 1000 >= 5 &&
            weather.current.visibility / 1000 <= 10
          ) {
            visibilityLevelElement.innerHTML = `<span class="align-middle">Moderate</span><img src="icons/visibilityLevel/Moderate.gif" alt="Moderate" width="25"></img>`;
          } else {
            visibilityLevelElement.innerHTML = `<span class="align-middle">Good</span><img src="icons/visibilityLevel/Good.gif" alt="Good" width="25"></img>`;
          }

          // console.log(mainiconElement);
        }
      });
    })
    .catch((error) => {
      // console.log(`API Error: ${error.message}`);
      showAlert("alert-danger", error.message); // Show alert to Client
    });
};

// Check AQI level from API

const checkAQI = (aqiLevel) => {
  if (aqiLevel === 1) {
    return `<span class="align-middle">Good</span><img src="icons/aqiLevel/Good.gif" alt="Good" width="25">`;
  } else if (aqiLevel === 2) {
    return `<span class="align-middle">Fair</span><img src="icons/aqiLevel/Fair.gif" alt="Fair" width="25">`;
  } else if (aqiLevel === 3) {
    return `<span class="align-middle">Moderate</span><img src="icons/aqiLevel/Moderate.gif" alt="Moderate" width="25">`;
  } else if (aqiLevel === 4) {
    return `<span class="align-middle">Poor</span><img src="icons/aqiLevel/Poor.gif" alt="Poor" width="25">`;
  } else {
    return `<span class="align-middle">Very Poor</span><img src="icons/aqiLevel/Very-Poor.gif" alt="Very Poor" width="25">`;
  }
};

// Get Air Qualitiy Data from API
const getAQI = (latitude, longitude) => {
  let api = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      airElement.innerHTML = `${data.list[0].main.aqi}`;
      airLevelElement.innerHTML = `${checkAQI(data.list[0].main.aqi)}`; // Show AQI Level to client
    })
    .catch((error) => {
      // console.log(error.message);
      showAlert("alert-danger", error.message); // Show alert to Client
    });
};

// GET City Details from API

const getCityName = (latitude, longitude) => {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      cityElement.innerHTML = `${data.name}`;
      countryElement.innerHTML = `${data.sys.country}`;
    })
    .catch((error) => {
      // console.log(error.message);
      showAlert("alert-danger", error.message); // Show alert to Client
    });
};

// Getting Co-ordinates from client
const setPosition = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  //   console.log(latitude, longitude);
  weekForecastElement[0].innerHTML = ""; // Remove Old HTML
  getWeather(latitude, longitude);
  getAQI(latitude, longitude);
  getCityName(latitude, longitude);
};

// Error while Getting Co-ordinates from client
const showError = (error) => {
  // console.log(error.message);
  showAlert("alert-danger", error.message); // Show alert to Client
};

// Checking client browser for geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  // console.log("Something went wrong");
  showAlert("alert-danger", "Browser doesn't support Geolocation."); // Show alert to Client
}

// Getting Data from client Input
formInput.addEventListener("submit", () => {
  city = citynameInput.value;
  event.preventDefault();

  let api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      // console.log(latitude, longitude);

      // Function Call to update data to client

      weekForecastElement[0].innerHTML = ""; // Remove Old HTML
      getWeather(latitude, longitude);
      getAQI(latitude, longitude);
      getCityName(latitude, longitude);
    })
    .catch((error) => {
      // console.log(error.message);
      // showAlert("alert-danger", error.message); // Show alert to Client
      return showAlert("alert-danger", "Oops. City not found"); // Show alert to Client
    });
});

// Get current location data on Client Request
currlocationElement.addEventListener("click", () => {
  // Getting Co-ordinates from client
  const setPosition = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    //   console.log(latitude, longitude);
    weekForecastElement[0].innerHTML = ""; // Remove Old HTML
    getWeather(latitude, longitude);
    getAQI(latitude, longitude);
    getCityName(latitude, longitude);
  };

  // Error while Getting Co-ordinates from client
  const showError = (error) => {
    // console.log(error.message);
    showAlert("alert-danger", error.message); // Show alert to Client
  };

  // Checking client browser for geolocation
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    showAlert("alert-danger", "Browser doesn't support Geolocation."); // Show alert to Client
  }
});
