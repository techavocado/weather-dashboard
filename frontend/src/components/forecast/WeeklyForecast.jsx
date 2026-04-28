import { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";

export default function WeeklyForecast({city}) {
  const [dailyTemp, setDailyTemp] = useState(null);

  useEffect(() => {
    if (!city) return;

    const getWeatherData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/dailytemp?city=${city}`);
        const data = await res.json();
        setDailyTemp(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    getWeatherData();
  }, [city]); 

  if (!dailyTemp || !dailyTemp.daily) return <p style={{color: "#aaa"}}>Loading forecast...</p>;

  const temperatures = dailyTemp.daily.temperature_2m_max;
  const dates = dailyTemp.daily.time;

  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px", }}>
      {dates.map((dateString, index) => {
        const dayName = new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
        
        return (
          <ForecastCard 
            key={dateString} 
            day={dayName} 
            temp={temperatures[index]}
            city = {city}
          />
        );
      })}
    </div>
  );
}