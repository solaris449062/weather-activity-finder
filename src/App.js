import './App.css';
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config.js'

const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
const originCoord = newYorkCoord;

function App() {
  
  // geocoding query
  const address = "San Francisco, CA";
  const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
  useEffect(() => {
    fetch(geocodingAPI)
    .then(response => response.json())
    .then(json => console.log(json))
  }, []);

  // weather query

  const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${newYorkCoord.lat}&lon=${newYorkCoord.lng}&exclude=daily&appid=${OPENWEATHER_KEY}`;
  useEffect(() => {
    fetch(weatherAPI)
    .then(response => response.json())
    .then(json => console.log(json))
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
