import { useEffect, useState } from "react";
import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";

export default function Dashboard() {
  const [city, setCity] = useState("Ahmedabad");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [uvValue, setUvValue] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchAllData = async () => {
      try {
        const [weatherRes, forecastRes, uvRes] = await Promise.all([
          fetch(`http://localhost:8000/api/weather?city=${city}`),
          fetch(`http://localhost:8000/api/forecast?city=${city}`),
          fetch(`http://localhost:8000/api/uvindex?city=${city}`)
        ]);

        // Agar backend 500 error de raha hai toh yahan handle hoga
        if (!weatherRes.ok || !forecastRes.ok || !uvRes.ok) {
           console.error("Backend failed for some city");
           return;
        }

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();
        const uvData = await uvRes.json();

        setWeather(weatherData);
        setForecast(forecastData);
        setUvValue(uvData);

      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchAllData();
  }, [city]); // Hamesha constant size dependency array [city]

  const handleCitySearch = (newCity) => {
    if (newCity && newCity.trim() !== "") {
      setCity(newCity);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LeftPanel weather={weather} forecast={forecast} onSearchCity={handleCitySearch} />
      <RightPanel weather={weather} forecast={forecast} uvValue={uvValue} city={city} />
    </div>
  );
}