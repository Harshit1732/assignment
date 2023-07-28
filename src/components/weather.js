import React, { useState } from 'react';
import axios from 'axios';


const WeatherApp = () => {
  const [choice, setChoice] = useState(-1);
  const [inputDate, setInputDate] = useState('');
  const [result, setResult] = useState('');

  const handleChoiceChange = (event) => {
    setChoice(parseInt(event.target.value));
  };

  const handleDateChange = (event) => {
    setInputDate(event.target.value);
  };

  const fetchData = async () => {
     const apiKey = 'b6907d289e10d714a6e88b30761fae22';
     const city = 'London,uk';
    const apiUrl = `https://samples.openweathermap.org/data/2.5/forecast/hourly?q=${city},us&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = await response.json();
      console.log(data.list);
      return data.list;

    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  // const fetchWeather = async () => {
  //   try {
  //     const response = await axios.get(apiUrl);
  //     const data= await response.json();

  //     console.log(data);
  //     setResult(data);
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //     setResult(null);
  //   }
  // };

  const handleGetWeather = async () => {
    const weatherData = await fetchData();
    const weather = findWeather(weatherData, inputDate);
    setResult(weather ? `Temperature on ${inputDate}: ${weather.main.temp}°C` : 'Weather data not found for the given date.');
  };

  const handleGetWindSpeed = async () => {
    const weatherData = await fetchData();
    const weather = findWeather(weatherData, inputDate);
    setResult(weather ? `Wind Speed on ${inputDate}: ${weather.wind.speed} m/s` : 'Weather data not found for the given date.');
  };

  const handleGetPressure = async () => {
    const weatherData = result;
    console.log(weatherData);
    const weather = findWeather(weatherData, inputDate);
    setResult(weather ? `Pressure on ${inputDate}: ${weather.main.pressure} hPa` : 'Weather data not found for the given date.');
  };

  const findWeather = (weatherData, date) => {
      // console.log(weatherData);
      console.log(weatherData);
     return weatherData.map((item)=>item.dt_txt===date);
 
  };

  const handleExit = () => {
    setResult('');
    setChoice(0);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <label htmlFor="choice">Choose an option:</label>
      <select id="choice" value={choice} onChange={handleChoiceChange}>
        <option value={1}>Get weather</option>
        <option value={2}>Get Wind Speed</option>
        <option value={3}>Get Pressure</option>
        <option value={0}>Exit</option>
      </select>
      {choice === 1 || choice === 2 || choice === 3 ? (
        <div>
          <label htmlFor="date">Enter the date (YYYY-MM-DD HH:mm:ss):</label>
          <input type="text" id="date" value={inputDate} onChange={handleDateChange} />
          <button onClick={choice === 1 ? handleGetWeather : choice === 2 ? handleGetWindSpeed : handleGetPressure}>Submit</button>
        </div>
      ) : null}
      <div>
        <h1>{result}</h1>
        </div>
    </div>
  );
};

export default WeatherApp;
