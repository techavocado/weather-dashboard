import { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";


export default function WeeklyForecast({ city, onOpenOverlay }) {
  const [dailyTemp, setDailyTemp] = useState(null);

  useEffect(() => {
    if (!city) return;

    const getForecastData = async () => {
      try {
        const coord = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);

        const data1 = await coord.json();

        let lat = data1?.results[0]?.latitude;
        let lon = data1?.results[0]?.longitude;


        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=auto&past_days=0&forecast_days=7`);

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
    <div className="forecast-scroll-row" style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      {dates.map((dateString, index) => {
        const dayName = new Date(dateString).toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <div
            key={dateString}
            className="forecast-card-wrapper"
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
              onOpenOverlay={onOpenOverlay}
              date={dateString}
            />
          </div>
        );
      })}
    </div>
  );
}