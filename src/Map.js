import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config';

const google = window.google;

function Map({address, addressLatLng}) {
    
  const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
  const sanFranciscoCoord = {lat: 37.7749295, lng: -122.4194155}
  const originCoord = sanFranciscoCoord;
  // for initial map loading
  const mapOptions = {
    center: originCoord,
    zoom: 11
  };

  // const [mapApiLoaded, setMapApiLoaded] = useState(false)
  // const [mapInstance, setMapInstance] = useState(null)
  // const [mapApi, setMapApi] = useState(null)

  function handleApiLoaded(map, maps) {
    let request = {
      location: addressLatLng,
      rankBy: maps.places.RankBy.PROMINENCE,
      keyword: "camping",
      radius: "15000"
    }

    new maps.places.PlacesService(map).nearbySearch(request, nearbyCallback)
    // console.log(map.center.lat)
    // console.log(maps)

    function nearbyCallback(results, status) {
      if (status == maps.places.PlacesServiceStatus.OK) {
          console.log(results)
          displayMarkers(results)
      }
    }
    function displayMarkers(places) {
      places.forEach(place => (
        new maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name
        })
      ))
    }
    new maps.Marker({
    position: addressLatLng,
    map
    })
    console.log("handleApiLoaded is called")
  };
  
  return (
    <div style={{ height: '100vh', width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_KEY, libraries:['places', 'visualization']}}
        defaultCenter={mapOptions.center}
        center={addressLatLng}
        defaultZoom={mapOptions.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => {handleApiLoaded(map, maps)}}
        address={address}
      />
    </div>
  )
}

export default Map;