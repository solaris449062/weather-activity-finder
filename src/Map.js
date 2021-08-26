import React from "react";
import GoogleMapReact from 'google-map-react';
import {GOOGLE_KEY, OPENWEATHER_KEY} from './config';

function Map({addressLatLng}) {
    
    const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
    const sanFranciscoCoord = {lat: 37.7749295, lng: -122.4194155}
    const originCoord = sanFranciscoCoord;
    // map loading
    const mapOptions = {
      center: originCoord,
      zoom: 11
    };
  
    const handleApiLoaded = (map, maps) => {
      new maps.Marker({
        position: addressLatLng,
        map
        })
      map.setCenter(sanFranciscoCoord)
      console.log("handleApiLoaded is called")
      console.log(addressLatLng)
    };
    
    return (
        <div style={{ height: '100vh', width: '50%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_KEY }}
            defaultCenter={mapOptions.center}
            defaultZoom={mapOptions.zoom}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
      </div>
    )
}

export default Map;