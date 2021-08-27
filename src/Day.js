import React from "react";


function Day({day}) {
    const {temp} = day;
    const date = new Date(day.dt * 1000).toLocaleString();
    

    function kelvinToCelcius (tempKelvin) {
        return (tempKelvin - 273.15).toFixed(1);
    }
    
    function kelvinToFahrenheit (tempKelvin) {
        return ((tempKelvin - 273.15)*(9/5) + 32).toFixed(1);
    }

   

    return (
        <div> 
        {!day ? "..." : 
            <div>
                <p> {date} </p>
                <p> {day.weather[0].main} </p>
                <p> {kelvinToFahrenheit(temp.day) + "°F / " + kelvinToCelcius(temp.day) + "°C"}</p>
            </div>
        }
        </div>
    )
}

export default Day;