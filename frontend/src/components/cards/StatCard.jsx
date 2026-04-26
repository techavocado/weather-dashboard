import "./StatCard.css";

export default function StatCard({ title, value, unit, extra }) {
  return (
    <div className="card" style={{ width: "250px" }}>
      
      {/* Title */}
      <p style={{ marginBottom: "10px", color: "#aaa", fontSize: "14px" }}>
        {title}
      </p>

      {/* Value */}
      <div style={{
        fontSize: "26px",
        fontWeight: "600",
        color: "white"
      }}>
        {value}
        <span style={{
          fontSize: "14px",
          color: "#aaa",
          marginLeft: "4px"
        }}>
          {unit}
        </span>
      </div>

      {/* Extra (optional) */}
      {extra && (
        <div style={{
          marginTop: "10px",
          fontSize: "13px",
          color: "#aaa"
        }}>
          {extra}
        </div>
      )}

    </div>
  );
}