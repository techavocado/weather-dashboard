export default function TemperatureCard() {
  return (
    <div style={{
      background: "#1e1e1e",
      padding: "20px",
      borderRadius: "16px",
      color: "white"
    }}>
      <p>Temperature</p>
      <div style={{
        height: "80px",
        background: "#333",
        borderRadius: "10px",
        marginTop: "10px"
      }}>
        {/* Chart later */}
      </div>
    </div>
  );
}