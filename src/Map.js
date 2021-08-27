import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config';

const google = window.google;

function Map({address, addressLatLng}) {
    
  const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
  const sanFranciscoCoord = {lat: 37.7749295, lng: -122.4194155}
  const originCoord = sanFranciscoCoord;
  // map loading
  const mapOptions = {
    center: originCoord,
    zoom: 11
  };

  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)

  const handleApiLoaded = (map, maps) => {
      setMapApiLoaded(true)
      setMapInstance(map)
      setMapApi(maps)
// console.log(maps.places.PlacesService)
      // console.log(mapApi)



      // new maps.Marker({
      // position: addressLatLng,
      // map
      // })
    console.log("handleApiLoaded is called")
  //   console.log(addressLatLng)

  };
  return (
      <div style={{ height: '100vh', width: '50%' }}>
          <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_KEY, libraries:['places', 'visualization']}}
          defaultCenter={mapOptions.center}
          center={addressLatLng}
          defaultZoom={mapOptions.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => {

              let request = {
                  location: addressLatLng,
                  rankBy: maps.places.RankBy.DISTANCE,
                  keyword: "ski"
                }

              let placeSearch = new maps.places.PlacesService(map).nearbySearch(request, nearbyCallback)
              // console.log(map.center.lat)
              // console.log(maps)

              function nearbyCallback(results, status) {
                  if (status == maps.places.PlacesServiceStatus.OK) {
                      console.log(results)
                  }
              }

              handleApiLoaded(map, maps)}
          }
          // onGoogleApiLoaded={({ map, maps }) => map.center(newYorkCoord)}
          address={address}>
          </GoogleMapReact>
    </div>
  )
}

export default Map;