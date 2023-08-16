import '../main/main.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SmallContainer from '../../components/smallContainer/SmallContainer';
import Input from '../../components/input/Input';

function Main() {
  const [inputSearch, setInputSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null); // Состояние для хранения данных о погоде

  const inputChange = (event) => {
    setInputSearch(event.target.value);
  }

  const fetchWeatherData = () => {
    
    const apiRespons = `https://api.openweathermap.org/data/2.5/weather?id=690791&appid=58ebd93640b20ccecfc6a735ef360e75`;

    axios.get(apiRespons)
      .then(response => {
        setWeatherData(response.data); 
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  
  useEffect(() => {
    fetchWeatherData();
  }, [inputSearch]);

  return (
    <div className='main'>
      <div className="main-container">
        <div className='main-weather'>
          <Input label="Search Location" value={inputSearch} onChange={inputChange} />
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