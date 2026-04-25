import StatCard from "../cards/StatCard";
import WeeklyForecast from "../forecast/WeeklyForecast";

export default function RightPanel() {
  return (
    <div style={{ width: "70%", padding: "20px", background: "#111" }}>

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
        <StatCard title="Wind" value="7.5" unit="km/h" />
        <StatCard title="Humidity" value="84" unit="%" />
        <StatCard title="AQI" value="120" unit="" />
        <StatCard title="Visibility" value="4" unit="km" />
        <StatCard title="Feels Like" value="30" unit="°C" />
        <StatCard title="UV Index" value="5" unit="" />
      </div>

    </div>
  );
}