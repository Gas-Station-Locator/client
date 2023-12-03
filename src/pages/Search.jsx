import React, { useState, useEffect, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import Tom from "../apis/tomtom";
import "./css/Search.css";

let defaultCenter = { lat: 34.01804962044509, lng: -117.90501316026715 };
const google = window.google;
setDefaults({
  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  language: "en",
  region: "es",
});

//function to output langitude and latitude
/*
  fromAddress(destinationRef.current.value)
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
  })
*/

const Search = () => {
  const [tomData, setTomData] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /**@type React.MutableRefObject<HTMLInputElement */
  const originRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement */
  const destinationRef = useRef();

  if (!isLoaded) {
    return "LOADING...";
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  async function searchPlace() {
    if (originRef.current.value === "") {
      return;
    }
    fromAddress(originRef.current.value).then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log(lat, lng);
      defaultCenter = { lat: lat, lng: lng };
    });
    map.panTo(defaultCenter);
    return "Here are the nearest Gas Stations:";
    // <GoogleMap>
    //   <MarkerF position={defaultCenter}/>
    // </GoogleMap>
    // addMarker(defaultCenter);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }

  return (
    <div className="map">
      <div className="mapBox">
        {/*Google Map Box*/}
        <GoogleMap
          center={defaultCenter}
          zoom={15}
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <MarkerF position={defaultCenter} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      <div className="search">
        <Autocomplete>
          <input type="text" placeholder="Enter Location..." ref={originRef} />
        </Autocomplete>
        <button type="submit" onClick={searchPlace}>
          Search
        </button>
        <button type="submit" onClick={calculateRoute}>
          Calculate Route
        </button>
        <p>Distance: </p>
        <p>Duration: </p>
        <button className="position" onClick={clearRoute}>
          Clear
        </button>
      </div>
      <div>
        <button className="position" onClick={() => map.panTo(defaultCenter)}>
          Center
        </button>
      </div>
      {console.log(defaultCenter)}
    </div>
  );
};

export default Search;

/**
const MapTypeId = {
  HYBRID: "hybrid",
  ROADMAP: "roadmap",
  SATELLITE: "satellite",
  TERRAIN: "terrain",
};

const SEARCH_MAP_STYLES = [
  {
    featureType: "poi.attraction",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.government",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.medical",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.school",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const MAP_CONFIG = {
  id: "search",
  label: "Search Map",
  mapTypeId: MapTypeId.ROADMAP,
  styles: SEARCH_MAP_STYLES,
};
*/
