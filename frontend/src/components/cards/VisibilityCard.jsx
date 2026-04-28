export default function VisibilityCard({ value = 0 }) {

    const km = Math.round((Number(value) || 0) / 1000);

    const progress = Math.min((km / 10) * 100, 100);

    const message =
        km < 3
            ? "Low visibility"
            : km < 6
                ? "Haze is affecting visibility"
                : "Clear visibility";

    return (
        <div className="card" style={{ width: "280px" }}>

            {/* Title */}
            <p style={{ color: "#aaa", marginBottom: "12px" }}>
                Visibility
            </p>

            {/* Value + text */}
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
                    {km}
                    <span style={{
                        fontSize: "16px",
                        color: "#aaa",
                        marginLeft: "4px"
                    }}>
                        Km
                    </span>
                </div>

                {/* Message */}
                <div style={{
                    fontSize: "13px",
                    color: "#aaa",
                    maxWidth: "120px",
                    lineHeight: "1.4"
                }}>
                    👁️ {message}
                </div>

            </div>

            {/* Progress bar */}
            <div style={{
                width: "100%",
                height: "6px",
                background: "#2a2a2a",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "15px"
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                    borderRadius: "10px",
                    transition: "width 0.4s ease"
                }} />
            </div>

        </div>
    );
}