import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: null,
  });

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || event.key === "Enter") {
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
      const res = await axios.get(url);
      setWeather({ data: res.data, loading: false });
    }
  };

  useEffect(() => {
    (async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=Patna&key=${apiKey}`;
      const res = await axios.get(url);
      setWeather({ data: res.data, loading: false });
    })();
  }, []);

  return (
    <div className="App">
      <SearchEngine query={query} setQuery={setQuery} search={search} />
      {weather.loading && <h4>Searching...</h4>}
      {weather.data && <Forecast weather={weather} />}
    </div>
  );
}

export default App;
