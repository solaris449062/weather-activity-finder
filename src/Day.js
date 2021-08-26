import React from "react";

function Day({day}) {
    const {temp} = day;
    
    return (
        <div> 
        {!day ? "..." : 
            <div>
                <p>Date (need to convert): {day.dt}</p>
                <p>{temp.day} (need to convert)</p>
            </div>
        }
        </div>
    )
}

export default Day;