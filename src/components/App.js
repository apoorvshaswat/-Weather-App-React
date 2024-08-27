import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({ loading: true, data: null, error: false });

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || event.key === "Enter") {
      try {
        setWeather({ ...weather, loading: true });
        const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
        const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
        const res = await axios.get(url);
        setWeather({ data: res.data, loading: false, error: false });
      } catch {
        setWeather({ data: null, loading: false, error: true });
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
        const url = `https://api.shecodes.io/weather/v1/current?query=Patna&key=${apiKey}`;
        const res = await axios.get(url);
        setWeather({ data: res.data, loading: false, error: false });
      } catch {
        setWeather({ data: null, loading: false, error: true });
      }
    })();
  }, []);

  return (
    <div className="App">
      <SearchEngine query={query} setQuery={setQuery} search={search} />
      {weather.loading && <h4>Searching...</h4>}
      {weather.error && <p className="error-message">City not found, please try again.</p>}
      {weather.data && <Forecast weather={weather} />}
    </div>
  );
}

export default App;
