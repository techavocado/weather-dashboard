export default function MainWeatherCard() {
  return (
    <div style={{
      background: "#1e1e1e",
      padding: "20px",
      borderRadius: "16px",
      color: "white"
    }}>
      <h2>14°C</h2>
      <p style={{ opacity: 0.7 }}>Cloudy</p>
      <p style={{ fontSize: "12px", opacity: 0.5 }}>Alaska</p>
    </div>
  );
}