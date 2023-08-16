import '../main/main.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SmallContainer from '../../components/smallContainer/SmallContainer';
import Input from '../../components/input/Input';
import Sun from '../../assets/img/SUN.svg'
function Main() {
  const [inputSearch, setInputSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null); 

  const inputChange = (event) => {
    setInputSearch(event.target.value);
  }

  const fetchWeatherData = () => {
    
    const apiRespons = `http://api.openweathermap.org/data/2.5/forecast?id=690791&cnt=5&lang=ua&appid=0253d0a06c11efe90f17a5e5b13601bf&units=metric`;

    axios.get(apiRespons)
      .then(response => {
        setWeatherData(response.data);
         console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const date = new Date()


  useEffect(() => {
    fetchWeatherData();
  }, [inputSearch]);

  return (
    <div className='main'>
      <div className="main-container">
        <div className='main-weather'>
          <Input label="Search Location" value={inputSearch} onChange={inputChange} />
          {weatherData && (
          <div className="weather">
            <div className='weatherPic'>
            <div className='weather-info'>
            <h2>{weatherData.city.name}</h2>
            <p1>{date.toDateString()}</p1>
            <p>{weatherData.list[0].main.temp}°C</p>
            </div>
           
            <div className='picture'><img src={Sun}/></div>
            </div>
            <div className='tempLowHigh'>
            <div className='lowHigh'><p>{weatherData.list[0].main.temp_max}°C</p></div>
            <div className='lowHigh'><p>{weatherData.list[0].main.temp_min}°C</p></div>
            </div>
          </div>

        )}
        </div>
        <div className='other-weather'>
          <SmallContainer />
          <SmallContainer />
          <SmallContainer />
        </div>
      </div>
    </div>
  );
}

export default Main;