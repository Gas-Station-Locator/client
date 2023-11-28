"use client";

import React, { useState } from 'react';
import {
    APIProvider,
    Map,
} from '@vis.gl/react-google-maps'
import './css/HomePage.css'


const HomePage = () => {
    const [mapConfig, setMapConfig] = useState(MAP_CONFIGS[1]);
    const position = { lat: 38.25, lng: 263.08};
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    return (
        // display map from google maps api
        <APIProvider apiKey={apiKey}>
            <div className="find-gas-container">
                <h1>Find Gas Near You...</h1>
                <div id="search-bar">
                    <input
                        type="text"
                        placeholder="Search by state, city, or zip code"
                        id="search-input"
                        name="searchInput"
                    />
                </div>
            </div>
            <div className="map-container" style={{padding: "0px", margin: "0px", height: "100vh"}}>
                <Map
                    mapTypeId={mapConfig.mapTypeId}
                    width="100%" 
                    height="100%"
                    viewState={{ 
                        latitude: position.lat, 
                        longitude: position.lng, 
                        zoom: 4
                    }}
                    styles={mapConfig.styles}
                    disableDefaultUI={true}
                    />
            </div>
        </APIProvider>
    )
};

export default HomePage;

const MAP_STYLES = [
    {
        featureType: "all",
        elementType: "labels",
        stylers: [{ "visibility": "off" }]
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [{ "visibility": "off" }]
    },
    {
        featureType: "administrative.province",
        elementType: "geometry",
        stylers: [{ "visibility": "off" }]
    },
    {
        featureType: "landscape.natural.terrain",
        elementType: "geometry",
        stylers: [{ "color": "#000000" }]
    },
    {
        featureType: "landscape.natural.landcover",
        elementType: "geometry",
        stylers: [{ "color": "#e8eaec" }]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ "color": "#3c4042" }]
    }
];

const MapTypeId = {
    HYBRID: "hybrid",
    ROADMAP: "roadmap",
    SATELLITE: "satellite",
    TERRAIN: "terrain"
};

const MAP_CONFIGS = [
    {
        id: "light",
        label: "Light",
        mapTypeId: MapTypeId.ROADMAP
        // customize styles for light mode
    },
    {
        id: "dark",
        label: "Dark",
        mapTypeId: MapTypeId.ROADMAP,
        styles: MAP_STYLES
    }
]