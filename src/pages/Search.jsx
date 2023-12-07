import React, { useState, useEffect, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
  InfoWindowF,
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
let defaultCenter = { lat: 32.7157, lng: -117.1611 };
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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [stationsList, setStationsList] = useState([]);
  const [gasPrice, setGasPrice] = useState([]);

  const URL = `https://localhost:4000/getStations`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/getStations");
      const data = await response.json();

      setStationsList(data[0].results);
    };
    fetchData();
  }, []);
  let stationTitle = [];
  let stationPrices = [];
  const arrayOfNamesAndPrices = [];

  stationsList.map((item)=>{
    stationTitle.push([item.title])
  })
  stationsList.map((item)=>{
    stationPrices.push([item.gasPrices[0].priceTag])
  })
  // {console.log(stationPrices[Math.floor(Math.random()*stationPrices.length)])}
  for(let i=0; i<stationTitle.length; i++) {
    arrayOfNamesAndPrices[i] = { title: stationTitle[i][0], price: stationPrices[i][0]};
  }
  // console.log(arrayOfNamesAndPrices);

  useEffect(() => {
    console.log(stations);  
  }, [stations]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    onError: (error) => {
      console.error("Error loading Google Maps API:", error);
    }
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
      setLat(props.lat);
      setLng(props.lng);
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
      };
      fetchData();
    }, []);

    return (
      <div className="Tom">
        <ul style={{ listStyle: "none" }}>
          {data.map((item) => {
            let address = `${item.address.streetNumber} ${item.address.streetName}, ${item.address.municipality}, ${item.address.countrySubdivision} ${item.address.postalCode}`;
            let stationName = `${item.poi.name}`;
            console.log(stationName)
            for (let i = 0; i < stationTitle.length; i++) {
              if (stationTitle[i][0] === stationName) {
                  setGasPrice((gasPrice) => [
                    ...gasPrice,
                    stationPrices[i][0]
                  ]);
                  // console.log(gasPrice)
                  console.log(true);
                  
                  // continue; // Breaks out of the loop when a match is found
              }
            }
            console.log(stationPrices);
            console.log(gasPrice);
            fromAddress(address).then(({ results }) => {
              const { lat, lng } = results[0].geometry.location;
              let markerPos = {
                lat: lat,
                lng: lng,
                name: item.poi.name,
                address: address,
              };
              setGasMarkers(markerPos);
              setGasMarkersArr((gasMarkersArr) => [
                ...gasMarkersArr,
                markerPos,
              ]);
              // gasMarkersArr.push({gasMarkers})
              // console.log(gasMarkersArr)
            });
            /**
            return (
              <li key={item.id}>
                Address: {address} --- Name: {item.poi.name}
              </li>
            );
            */
          })}
        </ul>
      </div>
    );
  }

  async function calculateRoute() {
    if (!isLoaded || !google || !google.maps) {
      console.error("Google maps API not loaded");
      return;
    }
    if (originRef.current.value === "" || !selectedMarker) {
      console.log("Please enter origin and select a destination");
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: selectedMarker.address,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    clearRoute();

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  async function searchPlace() {
    if (originRef.current.value === "") {
      return;
    }
    newLocation();
    /** 
      fromAddress(originRef.current.value).then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        defaultCenter = { lat: lat, lng: lng };
      });
    */
    map.panTo(defaultCenter);
    console.log(defaultCenter.lat, defaultCenter.lng);

    /** 
      return (
        <div>
          <p>The nearest gas stations are: </p>
          {<Stations lat={defaultCenter.lat} lng={defaultCenter.lng} /> /}
        </div>
      );
      <GoogleMap>
        <MarkerF position={defaultCenter}/>
      </GoogleMap>
        addMarker(defaultCenter);
    */
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
      <Tom lat={defaultCenter.lat} lng={defaultCenter.lng} />
      /**
      <div
        className="search-results-container"
        style={{
          color: theme === "dark" ? "black" : "white",
          background: theme === "dark" ? "#f1f3f4" : "#3c4042",
        }}
      >
        {/<h1>The nearest gas stations are:</h1>}
        <div className="search-result">
          <Tom lat={defaultCenter.lat} lng={defaultCenter.lng} />
        </div>
      </div>
      */
    );
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }

  return (
    <div className="map">
      {loadError && <div>Error loading Google Maps API</div>}
      {!isLoaded && !loadError && <div>Loading...</div>}
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
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "landscape.man_made",
                elementType: "all",
                stylers: [{ color: "#f9f5ed" }],
              },
              {
                featureType: "water",
                stylers: [{ color: "#aee0f4" }],
              },
            ],
          }}
          onLoad={(map) => setMap(map)}
        >
          <MarkerF
            position={defaultCenter}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
          {gasMarkersArr.map((gasMarker, index) => (
            <MarkerF
              key={index}
              position={gasMarker}
              onClick={() => {
                setSelectedMarker(gasMarker);
              }}
            />
          ))}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {selectedMarker && (
            <InfoWindowF
              position={selectedMarker}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
              options={{
                maxWidth: 300,
                pixelOffset: {
                  height: -40,
                },
              }}
            >
              <div className="info-window-content">
                <h3>{selectedMarker.name}</h3>
                <h4>{selectedMarker.address}</h4>
                <h4>{gasPrice.shift()}</h4>
                <button
                  type="submit"
                  onClick={calculateRoute}
                  className="btn calculate-route-btn"
                >
                  Calculate Route
                </button>
                <p className="destination-info">Distance: {distance}</p>
                <p className="destination-info">Duration: {duration}</p>
              </div>
            </InfoWindowF>
          )}
          <div className="position">
            <button
              type="button"
              className="btn position-btn"
              onClick={() => map.panTo(defaultCenter)}
              style={{
                color: theme === "dark" ? "#e8eaec" : "#3c4042",
                backgroundColor: theme === "dark" ? "#3c4042" : "#ffffff",
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
        style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#3c4042" }}
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
          className="btn map-btn search-btn"
          type="submit"
          onClick={() => {
            searchPlace();
            // setLat(defaultCenter.lat);
            // setLng(defaultCenter.lng);
            setGasMarkersArr([]);
          }}
        >
          Search
        </button>
        <button
          type="submit"
          onClick={nearestStations}
          className="btn map-btn nearest-stations-btn"
        >
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
