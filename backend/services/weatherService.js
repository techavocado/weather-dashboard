import axios from "axios";

export const getWeatherByCity = async (city) => {
  const API_KEY = "1c6c168d10a695816db3a0ecb8d1fd6b"; 

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  return res.data;
};

export const getForecastByCity = async (city) => {
  const API_KEY = "1c6c168d10a695816db3a0ecb8d1fd6b";
  
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  return res.data;
};