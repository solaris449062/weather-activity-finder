import './App.css';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config.js'

const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
const originCoord = newYorkCoord;

// console.log(api.openweathermap.org/data/2.5/weather?q={Chicago}&appid={OPENWEATHER_KEY})

function App() {
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
