"use client";

import React, { useState } from "react";
import { Map, APIProvider } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../components/ToggleButton";
import { useTheme } from "../assets/ThemeContext";
import "./css/HomePage.css";

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [mapConfig, setMapConfig] = useState(theme === "dark" ? MAP_CONFIGS[1] : MAP_CONFIGS[0]);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const position = { lat: 38.25, lng: 263.08 };
  const navigate = useNavigate();

  const handleMapStyleChange = () => {
    toggleTheme();
    const newMapConfig =
      theme === "dark" ? MAP_CONFIGS[0] : MAP_CONFIGS[1];
    setMapConfig(newMapConfig);
  };

  const handleSearchPage = () => {
    navigate("/Search");
  };

  return (
    // display map from google maps api
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <div
        className="map-container"
        style={{ padding: "0px", margin: "0px", height: "100vh" }}
      >
        <Map
          mapTypeId={mapConfig.mapTypeId}
          width="100%"
          height="100%"
          viewState={{
            latitude: position.lat,
            longitude: position.lng,
            zoom: 4,
          }}
          styles={mapConfig.styles}
          disableDefaultUI={true}
        />
      </div>
      <div className="find-gas-container">
        <h1 style={{ color: theme === "dark" ? "#3c4042" : "white" }}>
          Find Gas Near You...
        </h1>
        <button
          className="search-transition-btn"
          onClick={handleSearchPage}
          style={{
            color: theme === "dark" ? "#e8eaec" : "#3c4042",
            backgroundColor: theme === "dark" ? "#3c4042" : "white",
            borderColor: theme === "dark" ? "#e8eaec" : "#3c4042",
          }}
        >
          Start Searching!
        </button>
      </div>
      <ToggleButton
        onClick={handleMapStyleChange}
        styles={{
          color: theme === "dark" ? "#e8eaec" : "#3c4042",
          backgroundColor: theme === "dark" ? "#3c4042" : "#e8eaec",
          borderColor: theme === "dark" ? "#e8eaec" : "#3c4042",
        }}
      />
    </APIProvider>
  );
};

export default HomePage;

const LIGHT_MAP_STYLES = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry",
    stylers: [{ color: "#3c4042" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e8eaec" }],
  },
];

const DARK_MAP_STYLES = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry",
    stylers: [{ color: "#e8eaec" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#3c4042" }],
  },
];

const MapTypeId = {
  HYBRID: "hybrid",
  ROADMAP: "roadmap",
  SATELLITE: "satellite",
  TERRAIN: "terrain",
};

const MAP_CONFIGS = [
  {
    id: "light",
    label: "Light",
    mapTypeId: MapTypeId.ROADMAP,
    styles: LIGHT_MAP_STYLES,
  },
  {
    id: "dark",
    label: "Dark",
    mapTypeId: MapTypeId.ROADMAP,
    styles: DARK_MAP_STYLES,
  },
];
