import React, { useEffect, useState } from "react";
const BACKEND_URL = "https://weather-dashboard-rsgt.onrender.com";
// const BACKEND_URL = "http://localhost:8000";

// --- Internal Component: AqiComponents ---
// Isse alag file ki zaroorat nahi padegi aur error fix ho jayega
const AqiComponents = ({ name, value }) => (
    <div className="aqi-pill" style={styles.metricItem}>
        <span style={styles.metricName}>{name}</span>
        <span style={styles.metricValue}>{value ?? "--"}</span>
    </div>
);

export default function CurrAqiCard({ city, onOpenOverlay }) {
    const [currAqi, setCurrAqi] = useState(null);

    useEffect(() => {
        if (!city) return;

        const getWeatherData = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/curraqi?city=${city}`);
                if (!res.ok) return;
                const data = await res.json();
                if (!data?.list?.length) return;
                setCurrAqi(data);
            } catch (err) {
                console.error("AQI fetch failed:", err);
            }
        };

        getWeatherData();
    }, [city]);

    const aqiValue = currAqi?.list?.[0]?.main?.aqi;
    const components = currAqi?.list?.[0]?.components;

    const aqiLevels = {
        1: { label: "Good", color: "#00e400" },
        2: { label: "Fair", color: "#ffff00" },
        3: { label: "Moderate", color: "#ff7e00" },
        4: { label: "Poor", color: "#ff0000" },
        5: { label: "Very Poor", color: "#7e0023" }
    };

    const current = aqiLevels[aqiValue] ?? { label: "N/A", color: "#ccc" };

    return (
        <div 
            className="aqi-card-container"
            style={styles.aqiCardContainer} 
            onClick={() => onOpenOverlay && onOpenOverlay('aqi')}
        >
            <div className="aqi-content" style={styles.aqiContent}>
                {/* Left Side: Main AQI Status */}
                <div style={styles.aqiStatus}>
                    <p style={styles.aqiTitle}>Air Quality</p>
                    <div style={styles.flexRow}>
                        <div
                            style={{ ...styles.aqiCircle, backgroundColor: current.color }}
                        >
                            <span style={styles.aqiDigit}>
                                {aqiValue ?? "--"}
                            </span>
                        </div>
                        <p style={{ ...styles.aqiLabel, color: current.color }}>{current.label}</p>
                    </div>
                </div>

                {/* Right Side: Pollutants (Distributed position) */}
                <div className="aqi-metrics" style={styles.aqiMetrics}>
                    <AqiComponents name="PM2.5" value={components?.pm2_5} />
                    <AqiComponents name="PM10" value={components?.pm10} />
                    <AqiComponents name="O3" value={components?.o3} />
                    <AqiComponents name="NO2" value={components?.no2} />
                </div>
            </div>
        </div>
    );
}

// --- Internal Styling: Fixing Layout and Space Issues ---
const styles = {
    aqiCardContainer: {
        background: "#1e1e1e",
        borderRadius: "16px",
        marginTop: "12px",
        width: "98.5%", 
        height: "100px", // Reverted to original compact height
        cursor: "pointer",
        padding: "0 20px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        transition: "background 0.2s ease",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    },
    aqiContent: {
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center",
        width: "100%"
    },
    aqiStatus: {
        display: "flex",
        flexDirection: "column",
        minWidth: "140px"
    },
    aqiTitle: {
        color: "#98989d",
        fontSize: "13px",
        margin: "0 0 4px 0"
    },
    flexRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    aqiCircle: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#000"
    },
    aqiDigit: {
        fontWeight: "bold",
        fontSize: "16px"
    },
    aqiLabel: {
        margin: 0,
        fontWeight: "600",
        fontSize: "17px"
    },
    aqiMetrics: {
        display: "flex",
        flex: 1,
        justifyContent: "space-around", 
        paddingLeft: "20px"
    },
    metricItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#252525", 
        borderRadius: "12px", 
        padding: "15px", // Compact padding to fit in 90px card
        paddingBottom : "5px",
        minWidth: "70px",
        height: "50px"
    },
    metricName: {
        color: "#98989d",
        fontSize: "15px",
        fontWeight: "500",
        marginBottom: "5px",
    },
    metricValue: {
        color: "#fff",
        fontSize: "15px", // Still slightly larger and bold
        fontWeight: "bold"
    }
};