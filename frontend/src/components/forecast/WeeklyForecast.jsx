import { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";

export default function WeeklyForecast() {
  const [dailyTemp, setDailyTemp] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/dailytemp");
        const data = await res.json();
        setDailyTemp(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getWeatherData();
  }, []);

  // If data hasn't loaded, show a loader or return null
  if (!dailyTemp) return <p>Loading forecast...</p>;

  const temperatures = dailyTemp.daily.temperature_2m_max;
  const dates = dailyTemp.daily.time;

  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      {dates.map((dateString, index) => {
        const dayName = new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
        
        return (
          <ForecastCard 
            key={dateString} 
            day={dayName} 
            temp={temperatures[index]} 
          />
        );
      })}
    </div>
  );
}