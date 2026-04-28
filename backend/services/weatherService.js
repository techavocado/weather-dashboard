import axios from "axios";

export const getWeatherByCity = async (city) => {
  const API_KEY = "1c6c168d10a695816db3a0ecb8d1fd6b";
  const coords = await geocoding(city); 

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
  );

  return res.data;
};

export const getForecastByCity = async (city) => {
  const API_KEY = "1c6c168d10a695816db3a0ecb8d1fd6b";

  const coords = await geocoding(city); 
  
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
  );
  return res.data;
};

const geocoding = async (city) => {
  const API_KEY = "1c6c168d10a695816db3a0ecb8d1fd6b";
  
  try {
    const res = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );
  
    if (res.data && res.data.length > 0) {
      return {
        lat: res.data[0].lat,
        lon: res.data[0].lon
      };
    }
  } catch (error) {
    console.error("Geocoding failed:", error);
  }
};

export const getHourlyAqi = async (city) => {
  const API_KEY = "1c6c168d10a695816db3a0ecb8d1fd6b";

  const coords = await geocoding(city); 
  
  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
  );
  return res.data;
};

export const getCurrentAqi = async (city) => {
  const API_KEY = "1c6c168d10a695816db3a0ecb8d1fd6b";

  const coords = await geocoding(city); 
  
  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
  );
  return res.data;
};

export const getHourlyUVIndex = async (city) => {
  const coords = await geocoding(city); 

  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=uv_index&timezone=auto&past_days=0&forecast_days=1`
  );
  return res.data;
}

export const getDailyTemperature = async (city) => {
  const coords = await geocoding(city); 

  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max&timezone=auto&past_days=0&forecast_days=7`
  );
  return res.data;
}

export const getHourlyTempAndWind = async (city) => {
  const coords = await geocoding(city); 

  const date = new Date().toISOString().split('T')[0];

  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,wind_speed_10m&timezone=auto&start_date=${date}&end_date=${date}`
  );
  return res.data;
}