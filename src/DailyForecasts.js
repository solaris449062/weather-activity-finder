import React from "react";
import Day from "./Day";

function DailyForecasts({weather}) {
const {daily} = weather;
const handleDays = daily.map((day) => <Day key={day.dt} day={day}/>);


return (
    <div>{handleDays}</div>
)

}

export default DailyForecasts;