import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search from './assets/search.png';
import cloud from './assets/cloud.png';
import clear from './assets/clear.png';
import drizzle from './assets/drizzle.png';
import humidity from './assets/humidity.png';
import rain from './assets/rain.png';
import wind from './assets/wind.png';
import snow from './assets/snow.png';

function Weather() {
  const [wdata, setWdata] = useState({});
  const allicon = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow
  };
  const inputRef = useRef();

  async function weatherData(city) {
    try {
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2acd4edd858e2b7edd8a9f27f511295f`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allicon[data.weather[0].icon] || clear;

      setWdata({
        humidity: data.main.humidity,
        temp: data.main.temp,
        wspeed: data.wind.speed,
        name: data.name,
        icon: icon
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    weatherData('New York');
  }, []);

  return (

    <div className="weather">
                <div className='head'>SKY CAST</div>  

      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search Place' />
        <img src={search} alt="search" onClick={() => weatherData(inputRef.current.value)} />
      </div>
      <img src={wdata.icon} alt="weather icon" className='wicon' />
      <p className='temp'>{wdata.temp}°C</p>
      <p className='loc'>{wdata.name}</p>

      <div className="weatherdata">
        <div className="col">
          <img src={humidity} alt="humidity" />
          <div className='data'>
            <p>{wdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="wind speed" />
          <div className='data'>
            <p>{wdata.wspeed} KM/H</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
