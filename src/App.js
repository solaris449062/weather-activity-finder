import './App.css';
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config';
import Form from "./Form";

const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
const originCoord = newYorkCoord;


function App() {
  //moved this to the top so it's within the component's scope
  const [addressLatLng, setAddressLatLng] = useState(""); // this variable will save the geocoded latitude and longitude


  // gets the form input and sets the value for the address variable
  function setSubmittedData(address) {
    console.log(address);
    geocoding(address);
  };

  // geocoding query

  // a form component will be created and the form input value will be replacing the address below to be geocoded, 
  // with the output as another variable addressLatLng
  //let address = "San Francisco, CA"; // this will be replaced by the user input from the form
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
  
  // this ensures that the correct coordinates are sent
  weatherQuery(addressLatLng);
  console.log(addressLatLng)


  // weather query
function weatherQuery(addressLatLng) {
  console.log({addressLatLng})
  const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${addressLatLng.lat}&lon=${addressLatLng.lng}&exclude=daily&appid=${OPENWEATHER_KEY}`;
  
    fetch(weatherAPI)
    .then(response => response.json())
    .then(json => console.log(json))
}

  // map loading
  const mapOptions = {
    center: originCoord,
    zoom: 11
  };


  return (
<div>
    <Form setSubmittedData={setSubmittedData}/>

    {/* Important! Always set the container height explicitly*/}
    <div style={{ height: '60vh', width: '50%' }}>
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
