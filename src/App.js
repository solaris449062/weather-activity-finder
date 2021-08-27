import './App.css';
import React, { useEffect, useState } from 'react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config';
import Form from "./Form";
import Weather from "./Weather";
import Map from "./Map"
import { Column, Row } from "simple-flexbox";

const google = window.google

function App() {

  const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
  const sanFranciscoCoord = {lat: 37.7749295, lng: -122.4194155}
  const boulderCoord = {lat: 40.0149856, lng: -105.2705456}
  const originCoord = boulderCoord;

  const [address, setAddress] = useState("San Francisco, CA"); // this variable will save the geocoded latitude and longitude
  const [addressLatLng, setAddressLatLng] = useState(originCoord); // this variable will save the geocoded latitude and longitude
  const [weather, setWeather] = useState("");
  const [formSubmit, setFormSubmit] = useState(false); // to detect form submission for conditional map rendering
  console.log("formSubmit is: " + formSubmit)
  

  // gets the form input and passes to the geocoding function
  function handleSubmittedData(address) {
    console.log(address);
    setAddress(address);
    setFormSubmit(true);
  };

  // geocoding query with the output as another variable: addressLatLng

  useEffect(() => {
    const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
    fetch(geocodingAPI)
    .then(response => response.json())
    .then(json => {
      console.log(json.results[0].geometry.location)
      setAddressLatLng(json.results[0].geometry.location)
      })
  }, [address])
  
  // sends the coordinates (addressLatLng) to the weather query function
  //weatherQuery(addressLatLng);


  // weather query with the output as another variable: weatherData

  
  useEffect(() => {
  console.log({addressLatLng})
  const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${addressLatLng.lat}&lon=${addressLatLng.lng}&appid=${OPENWEATHER_KEY}`;
    fetch(weatherAPI)
    .then(response => response.json())
    .then(json => setWeather(json))
  }, [addressLatLng]);

  console.log({weather});

  return (

<Column flexGrow={1}>
        <Row horizontal="center">
          <Column horizontal="center" style={{ marginBottom: 16 }}>
            <h1>Outdoor Activity Planner</h1>
            
          </Column>
        </Row>
        <Row wrap horizontal="spaced">
          <Column
            style={{
              backgroundColor: "#378FD3",
              minWidth: 250,
              padding: 12,
              color: "#f5f5f5"
            }}
            flexGrow={1}
            horizontal="center"
          >
            <h3> Where are you located? </h3>
            <span><Form handleSubmittedData={handleSubmittedData} /></span>
          </Column>
          <Column
            style={{
              backgroundColor: "#378FD3",
              minWidth: 250,
              padding: 12,
              color: "#f5f5f5"
            }}
            flexGrow={1}
            horizontal="center"
          >
            <h3>UV Index Guide</h3>
          <h4 style={{color: "#EDC23D"}}>Low: 1-2 | Moderate: 3-5 | High: 6-7 | Very High: 8-10 | Extreme: 11+</h4>
            <span></span>
          </Column>
        </Row>
        <Row wrap horizontal="spaced" style={{ marginTop: 8 }}>
        {formSubmit ? <Map address={address} addressLatLng={addressLatLng}/> : <div style={{ height: '100vh', width: '50%' }}/>}
          <Column
            style={{
              backgroundColor: "#FFFFFF",
              minWidth: 250,
              maxWidth: 800,
              padding: 12,
            }}
            flexGrow={1}
            horizontal="center"
          >
            <h3>  </h3>
            <span><Weather weather={weather} addressLatLng={addressLatLng}/></span>
          </Column>
        </Row>
        
      </Column>
    );




    
  }

export default App;



//<div>
   // <Form handleSubmittedData={handleSubmittedData}/>
    //<Map address={address} addressLatLng={addressLatLng}/>
    //<Weather weather={weather} addressLatLng={addressLatLng}/>
    //</div>