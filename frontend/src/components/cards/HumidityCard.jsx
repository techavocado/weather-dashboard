export default function HumidityCard({ value = 0, temp = 0 }) {

  // safe values
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);
  const safeTemp = Number(temp) || 0;

  // dew point calculation
  const dewPoint = Math.round(
    safeTemp - ((100 - safeValue) / 5)
  );

  return (
    <div className="card" style={{ width: "280px" }}>

      {/* Title */}
      <p style={{ color: "#aaa", marginBottom: "12px" }}>
        Humidity
      </p>

      {/* Progress bar */}
      <div style={{
        width: "100%",
        height: "6px",
        background: "#2a2a2a",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "18px"
      }}>
        <div style={{
          width: `${safeValue}%`,
          height: "100%",
          background: "#f59e0b",
          borderRadius: "10px",
          transition: "width 0.4s ease"
        }} />
      </div>

      {/* Bottom section */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        
        {/* Value */}
        <div style={{
          fontSize: "30px",
          fontWeight: "600",
          color: "white"
        }}>
          {safeValue}
          <span style={{
            fontSize: "16px",
            color: "#aaa",
            marginLeft: "4px"
          }}>
            %
          </span>
        </div>

        {/* Description */}
        <div style={{
          fontSize: "13px",
          color: "#aaa",
          maxWidth: "120px",
          lineHeight: "1.4"
        }}>
          💧 Dew point is {dewPoint}° now
        </div>

      </div>

    </div>
  );
}