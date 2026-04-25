import StatCard from "../cards/StatCard";
import WeeklyForecast from "../forecast/WeeklyForecast";

export default function RightPanel({ weather, forecast }) {
  return (
    <div style={{ width: "70%", padding: "20px", background: "#111" }}>
      {forecast && (
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "white" }}>Next 24 Hours</h3>

          <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
            {forecast.map((item, index) => (
              <div
                key={index}
                style={{
                  minWidth: "80px",
                  padding: "10px",
                  background: "#222",
                  borderRadius: "10px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {/* TIME */}
                <p>
                  {item.dt_txt.split(" ")[1].slice(0, 5)}
                </p>

                {/* TEMP */}
                <p>
                  {Math.round(item.main.temp)}°C
                </p>

                {/* CONDITION */}
                <p>
                  {item.weather[0].main}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <WeeklyForecast />

      <h2 style={{ color: "white" }}>Today’s Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {weather && (
          <>
            <StatCard title="Wind" value={weather.windSpeed} unit="km/h" />
            <StatCard title="Humidity" value={weather.humidity} unit="%" />
            <StatCard title="AQI" value="120" unit="" />
            <StatCard title="Visibility" value={weather.visibility / 1000} unit="km" />
            <StatCard title="Feels Like" value={weather.feelsLike} unit="°C" />
            <StatCard title="UV Index" value="5" unit="" />
          </>
        )}
      </div>

    </div>
  );
}