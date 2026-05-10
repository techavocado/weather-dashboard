import { useEffect, useState } from "react";

export default function UVCard({ city , onOpenOverlay }) {

    const [uvValue, setUvValue] = useState(null);

    useEffect(() => {
        if (!city) return;

        const getForecastData = async () => {
            try {

                const coord = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);

                const data1 = await coord.json();

                let lat = data1?.results[0]?.latitude;
                let lon = data1?.results[0]?.longitude;

                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=auto&past_days=0&forecast_days=1`);

                if (!res.ok) return;

                const data = await res.json();

                // console.log(data);

                setUvValue(data);
            } catch (err) {
                console.error("UVIndex fetch failed:", err);
            }
        };

        getForecastData();
    }, [city]);

    // console.log(uvValue);

    function getCurrentUV() {
        const uvArray = uvValue?.hourly?.uv_index;
        if (!uvArray) return 0;

        const timezone = uvValue?.timezone || "UTC";
        const targetTimeStr = new Date().toLocaleString("en-US", { timeZone: timezone });
        const hour = new Date(targetTimeStr).getHours();
        return uvArray[hour] || 0;
    }

    const value = getCurrentUV();
    const safeValue = Math.min(Math.max(value, 0), 12);
    const percent = (safeValue / 12) * 100;

    return (
        <div onClick={() => onOpenOverlay("uv",{uvValue})} className="card" style={{ width: "280px", height: "210px", cursor: "pointer", transition: "transform 0.2s ease" }}>
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
                    width: "140px",
                    height: "140px",
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