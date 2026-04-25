import ForecastCard from "./ForecastCard";

export default function WeeklyForecast() {
  return (
    <div style={{
      display: "flex",
      gap: "15px",
      marginBottom: "20px"
    }}>
      <ForecastCard day="Sun" temp="16" />
      <ForecastCard day="Mon" temp="15" />
      <ForecastCard day="Tue" temp="14" />
      <ForecastCard day="Wed" temp="12" />
      <ForecastCard day="Thu" temp="15" />
      <ForecastCard day="Fri" temp="16" />
      <ForecastCard day="Sat" temp="16" />
    </div>
  );
}