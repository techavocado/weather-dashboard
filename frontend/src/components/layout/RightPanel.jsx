import StatCard from "../cards/StatCard";
import WeeklyForecast from "../forecast/WeeklyForecast";
import WindCard from "../cards/WindCard"
import UVCard from "../cards/UvCard";
import HumidityCard from "../cards/HumidityCard";
import FeelsLikeCard from "../cards/FeelsLIkeCard";
import VisibilityCard from "../cards/VisibilityCard";
import CurrAqiCard from "../cards/CurrAqiCard";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function RightPanel({ weather, forecast, uvValue, city }) {
  // console.log(weather);

  const windData = forecast?.slice(0, 20).map((item) =>
    Math.round(item.wind.speed * 3.6)
  );

  const windLabels = forecast?.slice(0, 20).map((item) => {
    const d = new Date(item.dt_txt);
    return d.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    });
  });

  return (
    <div style={{ width: "70%", padding: "20px", background: "#111" }}>
      <WeeklyForecast forecast={forecast} city={city}/>

      <h2 style={{ color: "white" }}>Today’s Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 325px)",

          gap: "15px",
          marginTop: "20px",
          columnGap: "0px",
          alignItems: "stretch",
        }}
      >
        {weather && (
          <>
            <WindCard windData={windData} windLabels={windLabels} forecast={forecast} />
            <UVCard uvValue ={uvValue}/>
            <StatCard sunrise={weather?.sunrise} sunset={weather?.sunset} />
            <HumidityCard
              value={weather?.humidity}
              temp={weather?.temp}
            />
            <VisibilityCard value={weather?.visibility} />
            <FeelsLikeCard
              temp={weather?.temp}
              feelsLike={weather?.feelsLike}
            />

          </>
        )}
      </div>
        <CurrAqiCard city = {city} />
    </div>
  );
}