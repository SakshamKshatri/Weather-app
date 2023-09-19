import { useState } from "react";

import "./styles.css";

import cloudIcon from "./Assets/cloud.png";
import rainIcon from "./Assets/rain.png";
import clearIcon from "./Assets/clear.png";
import drizzleIcon from "./Assets/drizzle.png";
import snowIcon from "./Assets/snow.png";
import brokenCloudIcon from "./Assets/brokenCloud.png";

function App() {
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");

  const apiKey = "0fda9e30d1639d7822f629350873d819";

  const search = async (event) => {
    event.preventDefault();

    const citySearch = document.getElementsByClassName("city");

    if (citySearch[0].value === "") {
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch[0].value}&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const cityName = document.getElementsByClassName("city-name");
    const temperature = document.getElementsByClassName("temperature");
    const humidity = document.getElementsByClassName("humidity");
    const windSpeed = document.getElementsByClassName("wind-speed");
    const description = document.getElementsByClassName("description");

    cityName[0].innerHTML = data.name;
    humidity[0].innerHTML = data.main.humidity + "%";
    temperature[0].innerHTML = Math.round(data.main.temp) - 273 + "°C";
    windSpeed[0].innerHTML = data.wind.speed + " km/h";
    description[0].innerHTML = data.weather[0].description;

    console.log(data.weather[0].icon);

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setIcon(clearIcon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n" ||
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setIcon(cloudIcon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setIcon(brokenCloudIcon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setIcon(drizzleIcon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setIcon(rainIcon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setIcon(snowIcon);
    }
  };

  return (
    <>
      <div className="weather-app">
        <div className="search-bar">
          <form onSubmit={search}>
            <input
              className="city"
              type="text"
              placeholder="search a city..."
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <button className="submit-city">Search</button>
          </form>
        </div>

        <div className="image-grid">
          <img src={icon ? icon : cloudIcon} alt="weather-img" />
        </div>

        <div>
          <h1 className="temperature">21°C</h1>
        </div>

        <div className="location">
          <h1 className="city-name">City name</h1>
          <p className="description">Partly cloudy</p>
        </div>

        <div className="weather-info">
          <div>
            <h2>Wind speed</h2>
            <p className="wind-speed">5.66 km/h</p>
          </div>
          <div>
            <h2>Humidity</h2>
            <p className="humidity">71%</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
