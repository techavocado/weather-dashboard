export default function UVCard({ value = 0 }) {

    const safeValue = Math.min(Math.max(value, 0), 12);
    const percent = (safeValue / 12) * 100;

    return (
        <div className="card" style={{ width: "250px" }}>

            <p style={{ color: "#aaa", marginBottom: "10px" }}>
                UV Index
            </p>

            <div style={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
            }}>
                {/* OUTER RING */}
                <div style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: `conic-gradient(
    orange ${percent}%,
    #333 ${percent}%
  )`,
                    transform: "rotate(-90deg)"
                }} />

                {/* INNER CUT */}
                <div style={{
                    position: "absolute",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "#1e1e1e"
                }} />

                {/* CENTER TEXT */}
                <div style={{
                    position: "absolute",
                    textAlign: "center"
                }}>
                    <div style={{ fontSize: "24px", fontWeight: "600" }}>
                        {safeValue}
                    </div>
                    <div style={{ color: "orange", fontSize: "14px" }}>
                        {safeValue < 3 ? "Low" :
                            safeValue < 6 ? "Moderate" :
                                safeValue < 8 ? "High" : "Very High"}
                    </div>
                </div>

            </div>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                color: "#aaa"
            }}>
                <span>{safeValue.toFixed(2)}</span>
                <span>UV</span>
            </div>

        </div>
    );
}