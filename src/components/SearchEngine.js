import React from "react";

function SearchEngine({ query, setQuery, search }) {
  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && search(e)}
      />
      <button onClick={search}>
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
}

export default SearchEngine;
