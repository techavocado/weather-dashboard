export default function FeelsLikeCard({ temp, feelsLike }) {
  const safeTemp = Number(temp ?? 0);
  const safeFeels = Number(feelsLike ?? 0);

  // NaN guard
  if (Number.isNaN(safeTemp) || Number.isNaN(safeFeels)) {
    return null;
  }

  const diff = safeFeels - safeTemp;

  // safe progress (0–100)
  const progress = Math.min(
    Math.max((safeFeels / 50) * 100, 0),
    100
  );

  let message = "Feels normal right now";
  if (diff > 2) message = "Humidity is making it feel hotter";
  if (diff < -2) message = "Wind is making it feel cooler";

  return (
    <div className="card" style={{ width: "280px" }}>
      <p style={{ color: "#aaa", marginBottom: "12px" }}>
        Feels Like
      </p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "30px", color: "white" }}>
          {Math.round(safeFeels)}°
        </div>

        <div style={{ fontSize: "13px", color: "#aaa", maxWidth: "120px" }}>
          🌡️ {message}
        </div>
      </div>

      <div style={{
        width: "100%",
        height: "6px",
        background: "#2a2a2a",
        borderRadius: "10px",
        marginTop: "15px"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: "#f59e0b"
        }} />
      </div>
    </div>
  );
}