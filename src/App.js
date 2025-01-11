import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `http://api.weatherapi.com/v1/current.json?q=${location}&key=f6a7000d434842ecad7132756231007`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data);
        // console.log(res.data);
      }).catch((err) => {
        console.error(err); // Handle API errors
      });
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className="Main">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type='text'
          placeholder='Enter Location'
        />
        {data.location != undefined && (
          <>
            <h1 className="cityName">{data.location.name}, {data.location.region},<br /> {data.location.country}</h1>
            <span className="temperature">{data.current.temp_c}<b>&deg;C</b></span>
            <h2 className="weatherDes">{data.current.condition.text}</h2>
            <div className="Data">
              <div className="feelsLike">
                <h3>{data.current.feelslike_c}&deg;C</h3>
                <h3>Feels Like</h3>
              </div>
              <div className="humidity">
                <h3>{data.current.humidity}%</h3>
                <h3>Humidity</h3>
              </div>
              <div className="windSpeed">
                <h3>{data.current.wind_kph} KPH</h3>
                <h3>Wind Speed</h3>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
