export default function ForecastCard({ day, temp }) {
  return (
    <div style={{
      background: "#1e1e1e",
      padding: "15px",
      borderRadius: "12px",
      color: "white",
      textAlign: "center",
      width: "80px"
    }}>
      <p style={{ fontSize: "12px", opacity: 0.6 }}>{day}</p>
      <h3>{temp}°</h3>
    </div>
  );
}