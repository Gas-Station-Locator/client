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
import { useTheme } from "../assets/ThemeContext";
import "./css/Search.css";

// let defaultCenter = { lat: 34.01804962044509, lng: -117.90501316026715 };
let defaultCenter = { lat: 32.7157, lng: -117.1611};
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
  const { theme, toggleTheme } = useTheme();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [stations, setStations] = useState(null);
  const [gasMarkers, setGasMarkers] = useState();
  const [gasMarkersArr, setGasMarkersArr] = useState([]);

  useEffect(() => {
    console.log(stations);
  }, [stations]);

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

  function Tom(props) {
    const [lat, setLat] = useState(props.lat);    
    const [lng, setLng] = useState(props.lng); 
  
    useEffect(() => {
      setLat(props.lat)
      setLng(props.lng)
    }, [props.lat, props.lng]);
  
    // let defaultCenter = {lat: props.lat, lng: props.lng}
    const URL = `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lng}&radius=10000&categorySet=7311&view=Unified&relatedPois=off&key=${process.env.REACT_APP_TOM_KEY}`;
  
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        
        setData(data.results);
        console.log(data);
      }
      fetchData();
    }, []);


  
    return (
      <div className="Tom">
        <ul style={{ listStyle: "none" }}>
          {data.map((item) => {

            let address = `${item.address.streetNumber} ${item.address.streetName}, ${item.address.municipality}, ${item.address.countrySubdivision} ${item.address.postalCode}`;
            console.log(address);
            fromAddress(address).then(({ results }) => {
              const { lat, lng } = results[0].geometry.location;
              let markerPos = { lat: lat, lng: lng };
              setGasMarkers({markerPos})
              setGasMarkersArr([...gasMarkersArr,
                {position: markerPos}]);
              // gasMarkersArr.push({gasMarkers})
              // console.log(gasMarkersArr)
            })
            return (
              <li key={item.id}>
                Address: {address} --- Name: {item.poi.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
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
    newLocation();
    // fromAddress(originRef.current.value).then(({ results }) => {
    //   const { lat, lng } = results[0].geometry.location;
    //   defaultCenter = { lat: lat, lng: lng };
    // });
    map.panTo(defaultCenter);
    console.log(defaultCenter.lat, defaultCenter.lng);

    // return (
    //   <div>
    //     <p>The nearest gas stations are: </p>
    //     {/* <Stations lat={defaultCenter.lat} lng={defaultCenter.lng} /> */}
    //   </div>
    // );
    // <GoogleMap>
    //   <MarkerF position={defaultCenter}/>
    // </GoogleMap>
    // addMarker(defaultCenter);
  }
  
  function newLocation() {
    fromAddress(originRef.current.value).then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      defaultCenter = { lat: lat, lng: lng };
      setLat(defaultCenter.lat);
      setLng(defaultCenter.lng);
    });
  }
  
  function nearestStations() {
    setStations(
    <div className="search-results-container" style={{
      color: theme === "dark" ? "black" : "white",
      backgroundColor: theme === "dark" ? "#f1f3f4" : "#3c4042"
    }}> 
      <h1>The nearest gas stations are:</h1>
      <div className="search-result">
        <Tom lat={defaultCenter.lat} lng={defaultCenter.lng} />
      </div>
    </div>
    )
    // <Stations lat={defaultCenter.lat} lng={defaultCenter.lng} />
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
          onLoad={(map) => setMap(map)}>
          <MarkerF position={defaultCenter} />
          {gasMarkersArr.map(gasMarkers => (
              <MarkerF position={gasMarkers.position} />
          ))}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <div className="position">
            <button
              type="button"
              className="btn position-btn"
              onClick={() => map.panTo(defaultCenter)}
              style={{
                color: theme === "dark" ? "#e8eaec" : "#3c4042",
                backgroundColor: theme === "dark" ? "#3c4042" : "#e8eaec",
                borderColor: theme === "dark" ? "#e8eaec" : "#3c4042",
              }}
            >
              Center
            </button>
          </div>
        </GoogleMap>
      </div>

      <div
        className="search"
        style={{ backgroundColor: theme === "dark" ? "#f1f3f4" : "#3c4042" }}
      >
        <Autocomplete>
          <input
            type="text"
            placeholder="Enter Your Location..."
            ref={originRef}
            className="search-input"
          />
        </Autocomplete>
        <button
          className="btn search-btn map-btn"
          type="submit"
          onClick={() => {
            searchPlace();
            // setLat(defaultCenter.lat);
            // setLng(defaultCenter.lng);
          }}>
          Search
        </button>
        <button type="submit" onClick={calculateRoute} className="btn map-btn">
          Calculate Route
        </button>
        <select name="destinations" className="destination-dropdown">
          <option hidden>Choose a Gas Station</option>
          <option>Test</option>
        </select>
        <p className="destination-info">Distance: </p>
        <p className="destination-info">Duration: </p>
        <button type="button" className="btn clear-btn" onClick={clearRoute}>
          Clear
        </button>
        <br />
        <button type="submit" onClick={nearestStations} className="btn map-btn nearest-stations-btn">
          Stations near me:
        </button>
        {console.log(defaultCenter.lat, defaultCenter.lng)}
        {/* <Stations lat={defaultCenter.lat} lng={defaultCenter.lng} /> */}
        {stations}
      </div>
    </div>
  );
};

export default Search;
