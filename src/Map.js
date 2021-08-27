import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config';

const google = window.google;

function Map({address, addressLatLng}) {
    
  const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
  const sanFranciscoCoord = {lat: 37.7749295, lng: -122.4194155}
  const boulderCoord = {lat: 40.0149856, lng: -105.2705456}
  const originCoord = boulderCoord;
  // for initial map loading
  const mapOptions = {
    center: originCoord,
    zoom: 11
  };

  // const [mapApiLoaded, setMapApiLoaded] = useState(false)
  // const [mapInstance, setMapInstance] = useState(null)
  // const [mapApi, setMapApi] = useState(null)

const [map, setMap] = useState(undefined);
const [maps, setMaps] = useState(undefined);

  function handleApiLoaded(map, maps) {
    console.log("addressLatLng from handleApiLoaded", addressLatLng)
    // handlePlaceSearch()
    setMap(map)
    setMaps(maps)
  }

  function handlePlaceSearch() {
    if (!maps) {
      return
    }
    let request = {
      location: addressLatLng,
      rankBy: maps.places.RankBy.PROMINENCE,
      keyword: "sushi",
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
  
useEffect(() => {
  handlePlaceSearch()
}, [addressLatLng])

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