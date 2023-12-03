import React from "react";
import "./css/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search-row">
        <div className="search-column-input">
          <input
            type="text"
            name="Destination"
            className="search-input"
            placeholder="Search by state, city, or zip code"
          />
        </div>
        <div className="search-column-btn">
          <button
            type="submit"
            name="submit"
            className="search-btn"
            onClick={console.log("Search")}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
};

export default SearchBar