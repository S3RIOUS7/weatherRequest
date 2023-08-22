import '../main/main.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SmallContainer from '../../components/smallContainer/SmallContainer';
import Input from '../../components/input/Input';
import Sun from '../../assets/img/SUN.svg'

function Main() {
  const [inputSearch, setInputSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null); 
  const [searchButton, setsearchButton] = useState(false);

  const inputChange = (event) => {
    setInputSearch(event.target.value);
  }

  const fetchWeatherData = () => {

    if (!searchButton) {
      return; 
    }
    const apiKey = '0253d0a06c11efe90f17a5e5b13601bf';
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputSearch}&cnt=1&lang=ua&appid=${apiKey}&units=metric`;

    axios.get(apiURL)
      .then(response => {
        setWeatherData(response.data);
        setsearchButton(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
        setsearchButton(false);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы при нажатии Enter
    fetchWeatherData();
    setInputSearch('');
  };

  const date = new Date()

  useEffect(() => {
    if (inputSearch) {
      fetchWeatherData();
    } else {
      setWeatherData(null);
    }
  }, [inputSearch]);

  return (
    <div className='main'>
      <div className="main-container">
        <div className='main-weather'>
          <form onSubmit={handleSearch}> 
            <Input label="Search Location" value={inputSearch} onChange={inputChange} />
            <button onClick={() => setsearchButton(true)}>Search</button>
          </form>
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