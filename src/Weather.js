import React from "react";
import DailyForecasts from "./DailyForecasts";

function Weather({weather}) {
    function kelvinToCelcius (tempKelvin) {
        return (tempKelvin - 273.15).toFixed(1);
    }
    
    function kelvinToFahrenheit (tempKelvin) {
        return ((tempKelvin - 273.15)*(9/5) + 32).toFixed(1);
    }

    return (
        <div>
            <h1> Today's weather is {!weather ? "..." : weather.current.weather[0].main}</h1>
            <h2> {
                !weather ? 
                "Loading temperature" : 
                kelvinToFahrenheit(weather.current.temp) + " °F  /  " + 
                kelvinToCelcius(weather.current.temp) + " °C"
            } </h2>

            <h2>{!weather ? "... " : `Relative humidity: ${weather.current.humidity} %`}</h2>
            <div> {!weather ? "..." : <DailyForecasts weather={weather}/>} </div>

        </div>
    )
}

export default Weather;