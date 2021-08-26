import './App.css';
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config';
import Form from "./Form";
import Weather from "./Weather";


const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
const originCoord = newYorkCoord;

function App() {
  const [addressLatLng, setAddressLatLng] = useState(newYorkCoord); // this variable will save the geocoded latitude and longitude
  const [weather, setWeather] = useState("");

  // gets the form input and passes to the geocoding function
  function handleSubmittedData(address) {
    console.log(address);
    geocoding(address);
  };

  // geocoding query with the output as another variable: addressLatLng
  function geocoding(address) {
  const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
  
    fetch(geocodingAPI)
    .then(response => response.json())
    .then(json => {
      console.log(json.results[0].geometry.location)
      setAddressLatLng(json.results[0].geometry.location)
      }
    )
  }
  
  // sends the coordinates (addressLatLng) to the weather query function
  //weatherQuery(addressLatLng);


  // weather query with the output as another variable: weatherData

//function weatherQuery(addressLatLng) {
  useEffect(() => {
  console.log({addressLatLng})
  const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${addressLatLng.lat}&lon=${addressLatLng.lng}&exclude=daily&appid=${OPENWEATHER_KEY}`;
    fetch(weatherAPI)
    .then(response => response.json())
    .then(json => setWeather(json)
    )
  }, [addressLatLng]);

  console.log({weather});

  // map loading
  const mapOptions = {
    center: originCoord,
    zoom: 11
  };

  return (
<div>
    <Form handleSubmittedData={handleSubmittedData}/>
    <Weather weather={weather}/>
    

    {/* Important! Always set the container height explicitly*/}
    <div style={{ height: '100vh', width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_KEY }}
        defaultCenter={mapOptions.center}
        defaultZoom={mapOptions.zoom}
      >
      </GoogleMapReact>
    </div>
    </div>
  )}

export default App;
