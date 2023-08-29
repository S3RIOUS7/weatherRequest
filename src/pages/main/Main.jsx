import '../main/main.scss';
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import SmallContainer from '../../components/smallContainer/SmallContainer';
import Input from '../../components/input/Input';

import { API_KEY, BASE_URL } from '../../utils/constants/constants';
import MainContainer from '../../components/mainContainer/MainContainer';

function Main() {
  const firstCity = 'Zaporizhzhia'; 
  const [inputSearch, setInputSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  

  const inputChange = (event) => {
    setInputSearch(event.target.value);
  };

  const fetchWeatherData = (city) => {
    const apiURL = `${BASE_URL}/data/2.5/forecast?q=${city}&lang=ua&appid=${API_KEY}&units=metric`;

    axios.get(apiURL)
      .then(response => {
        let result = response.data;
        result.list = result.list.filter((it, i) => i === 0 || i === 8 || i === 16 || i === 24);
        setWeatherData(result);
       
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      });
  };


  const searchCity = (event) => {
    event.preventDefault();
    fetchWeatherData(inputSearch);
    setInputSearch('');
  };

  useEffect(() => {
    fetchWeatherData( firstCity); 
  }, []);

  return (
    <div className='main'>
      <div className="main-container">
        <div className='main-weather'>
          <form onSubmit={searchCity}>
            <Input label="Search Location" value={inputSearch} onChange={inputChange} />
            <button type='submit'>Search</button>
          </form>

          {weatherData && (
            <div>
              <MainContainer
                date={weatherData.list[0].dt_txt.substring(0, 10)}
                temperature={weatherData.list[0].main.temp}
                city={weatherData.city.name}
                maxTemp={weatherData.list[0].main.temp_max}
                minTemp={weatherData.list[0].main.temp_min}
              />
              {weatherData.list.length > 1 && (
                <div className='other-weather'>
                  {weatherData.list.slice(1).map((item, index) => (
                    <SmallContainer
                      key={index}
                      temperature={item.main.temp}
                      date={item.dt_txt.substring(0, 10)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;