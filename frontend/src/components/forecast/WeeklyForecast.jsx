import { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";

export default function WeeklyForecast({ city, onOpenOverlay }) {
  const [dailyTemp, setDailyTemp] = useState(null);

  useEffect(() => {
    if (!city) return;

    const getForecastData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/dailytemp?city=${city}`);

        if (!res.ok) return;

        const data = await res.json();

        if (!data?.daily?.time || !data?.daily?.temperature_2m_max) return;

        setDailyTemp(data);
      } catch (err) {
        console.error("Forecast fetch failed:", err);
      }
    };

    getForecastData();
  }, [city]);

  if (!dailyTemp?.daily) return null;

  const temperatures = dailyTemp.daily.temperature_2m_max;
  const dates = dailyTemp.daily.time;

  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      {dates.map((dateString, index) => {
        const dayName = new Date(dateString).toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <div
            key={dateString}
            onClick={() => onOpenOverlay?.()}   
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <ForecastCard
              day={dayName}
              temp={temperatures?.[index] ?? "--"}
              city={city}
            />
          </div>
        );
      })}
    </div>
  );
}