import { getWeatherByCity, getForecastByCity } from "../services/weatherService.js";

export const fetchWeather = async (req, res) => {
  try {
    const city = req.query.city || "Ahmedabad";

    const data = await getWeatherByCity(city);

    const cleanedData = {
      city: data.name,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      visibility: data.visibility,
      condition: data.weather[0].main,
    };

    res.json(cleanedData);
  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};

// 🔥 filter next 24 hours
const filterNext24Hours = (forecastData) => {
  const now = Date.now();

  return forecastData.list.filter((item) => {
    const time = item.dt * 1000;
    return time >= now && time <= now + 24 * 60 * 60 * 1000;
  });
};

// 🔥 forecast controller
export const fetchForecast = async (req, res) => {
  try {
    const city = req.query.city || "Ahmedabad";

    const data = await getForecastByCity(city);

    const next24Hours = filterNext24Hours(data);

    res.json(next24Hours);
  } catch (error) {
  console.log("FORECAST ERROR:", error.response?.data || error.message);
  res.status(500).json({ error: "Failed to fetch forecast" });
}
};