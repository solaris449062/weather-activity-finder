import React, {useState} from "react";

function Form({handleSubmittedData}) { // callback from the App component
const [address, setAddress] = useState("San Francisco, CA");

function handleLocationChange(event) { // sets the input to the address variable
    setAddress(event.target.value); 
  };

function handleSubmit(event) {
    event.preventDefault();
    handleSubmittedData(address); // passes the address to the App component so it can be passed to the geocoding API
  };

    return (
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleLocationChange} value={address} />
          <button type="submit">Submit</button>
        </form>
      );
}

export default Form;