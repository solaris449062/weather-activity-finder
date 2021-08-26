import React from "react";

function Weather({weather}) {
console.log({weather});
    return (

        <div>

            <h1>Today's temp is: {weather.current.temp}°</h1>

        </div>
        
    )

}

export default Weather;