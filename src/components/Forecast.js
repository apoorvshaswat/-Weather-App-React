import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    (async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;
      const res = await axios.get(url);
      setForecastData(res.data.daily);
    })();
  }, [data.city]);

  const toggleTemperatureUnit = () => setIsCelsius(!isCelsius);
  const convertTemperature = (temp) => (isCelsius ? temp : (temp * 9) / 5 + 32);

  return (
    <div>
      <h2>
        {data.city}, {data.country}
      </h2>
      <p>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="temp">
        <img
          src={data.condition.icon_url}
          alt={data.condition.description}
          className="temp-icon"
        />
        <span>{Math.round(convertTemperature(data.temperature.current))}°</span>
        <sup onClick={toggleTemperatureUnit}>
          {isCelsius ? "C | F" : "F | C"}
        </sup>
      </div>
      <p>{data.condition.description}</p>
      <div className="weather-info">
        <div>
          <ReactAnimatedWeather icon="WIND" size="40" />
          <p>{data.wind.speed} m/s</p>
        </div>
        <div>
          <ReactAnimatedWeather icon="RAIN" size="40" />
          <p>{data.temperature.humidity}% Humidity</p>
        </div>
      </div>
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecastData.slice(0, 5).map((day) => (
          <div key={day.time}>
            <p>
              {new Date(day.time * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img src={day.condition.icon_url} alt={day.condition.description} />
            <p>
              {Math.round(day.temperature.minimum)}° /{" "}
              {Math.round(day.temperature.maximum)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
