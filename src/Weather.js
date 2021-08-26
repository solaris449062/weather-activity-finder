import React from "react";

function Weather({weather}) {
    return (
        <div>
            <h1>Today's temp is: {!weather ? 100 : weather.current.temp}°C</h1>
        </div>
    )
}

export default Weather;