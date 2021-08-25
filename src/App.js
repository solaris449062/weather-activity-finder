import './App.css';
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config.js'

const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
const originCoord = newYorkCoord;

function App() {
  
  // geocoding query

  // a form component will be created and the form input value will be replacing the address below to be geocoded, 
  // with the output as another variable addressLatLng
  let address = "San Francisco, CA"; // this will be replaced by the user input from the form
  const [addressLatLng, setAddressLatLng] = useState(""); // this variable will save the geocoded latitude and longitude
  const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
  useEffect(() => {
    fetch(geocodingAPI)
    .then(response => response.json())
    .then(json => {
      console.log(json.results[0].geometry.location)
      setAddressLatLng(json.results[0].geometry.location)
      }
    )
  }, []);

  console.log(addressLatLng)

  // weather query

  const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${addressLatLng.lat}&lon=${addressLatLng.lng}&exclude=daily&appid=${OPENWEATHER_KEY}`;
  useEffect(() => {
    fetch(weatherAPI)
    .then(response => response.json())
    .then(json => console.log(json.current.temp - 273))
  }, []);



  

  // map loading
  const mapOptions = {
    center: originCoord,
    zoom: 11
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_KEY }}
        defaultCenter={mapOptions.center}
        defaultZoom={mapOptions.zoom}
      >
      </GoogleMapReact>
    </div>
  )}

export default App;
