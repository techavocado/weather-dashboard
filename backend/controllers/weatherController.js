import { getWeatherByCity } from "../services/weatherService.js";

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