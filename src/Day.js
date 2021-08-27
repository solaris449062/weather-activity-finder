import React, {useState} from "react";
import cloudy from "./images/cloudy.png";
import rainy from "./images/rainy.png";
import snow from "./images/snow.png";
import sunny from "./images/sunny.png";

function Day({day}) {
    const {temp} = day;
    const date = new Date(day.dt * 1000).toLocaleString();

    function kelvinToCelcius (tempKelvin) {
        return (tempKelvin - 273.15).toFixed(1);
    }
    
    function kelvinToFahrenheit (tempKelvin) {
        return ((tempKelvin - 273.15)*(9/5) + 32).toFixed(1);
    }

    function handleWeatherImage(weather){
        if (weather === "Clouds") {
            return cloudy
           
        } else if (weather === "Clear") {
            return sunny
        
        } else if (weather === "Rain") {
            return rainy
        
        } else if (weather === "Snow") {
            return snow
        
        } else {return sunny}
    }

   
    return (
        <div> 
        {!day ? "..." : 
            <div>
                <img src={handleWeatherImage(day.weather[0].main)}></img>
                <p> {date} </p>
                <p> {day.weather[0].main} </p>
                <p> {kelvinToFahrenheit(temp.day) + "°F / " + kelvinToCelcius(temp.day) + "°C"}</p>
            </div>
        }
        </div>
    )
}

export default Day;