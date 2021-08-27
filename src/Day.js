import React from "react";
import cloudy from "./images/cloudy.png";
import rainy from "./images/rainy.png";
import snow from "./images/snow.png";
import sunny from "./images/sunny.png";

function Day({day}) {
    const {temp} = day;
    const date = new Date(day.dt * 1000).toLocaleString(); // calculates the date and time
    const dayOfWeek = new Date(day.dt * 1000).toLocaleString("en-US", {weekday: "long"}); // calculates the day of the week

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
                <h2>{dayOfWeek}</h2>
                <h3> {date}</h3>
                <img alt={day.weather[0].main} src={handleWeatherImage(day.weather[0].main)}></img>
                <h3> {kelvinToFahrenheit(temp.day) + "°F / " + kelvinToCelcius(temp.day) + "°C"}</h3>
                <p>{day.weather[0].main}</p>
                <h3 style={{color: "#D3AD37"}}>UV Index: {day.uvi}</h3>
                <p>Relative humidity: {day.humidity}%</p>
                <br></br>
                <br></br>
                <br></br>
            </div>
        }
        </div>
    )
}

export default Day;