import { useState } from "react";

export default function MainWeatherCard({ weather }) {

  const [unit, setUnit] = useState("C");

  const tempC = weather?.temp || 0;
  const tempF = (tempC * 9) / 5 + 32;

  const displayTemp =
    unit === "C"
      ? Math.round(tempC)
      : Math.round(tempF);

  const condition = weather?.condition || "";
  const city = weather?.city || "";
  const wind = Math.round((weather?.windSpeed || 0) * 3.6);
  const humidity = weather?.humidity || 0;

  return (
    <div style={{
      background: "#1e1e1e",
      padding: "14px",
      borderRadius: "20px",
      color: "white",
    }}>

      <p style={{ color: "#aaa", marginBottom: "8px" }}>
        {city}
      </p>

      <div style={{ fontSize: "32px", marginBottom: "6px" }}>
        ☁️
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>

        <h1 style={{
          fontSize: "52px",
          margin: 0,
          fontWeight: "600"
        }}>
          {displayTemp}°{unit}
        </h1>

        {/* 🔥 Toggle */}
        <div style={{
          display: "flex",
          border: "1px solid #333",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer"
        }}>
          <span
            onClick={() => setUnit("C")}
            style={{
              background: unit === "C" ? "#f59e0b" : "transparent",
              padding: "4px 8px",
              color: unit === "C" ? "black" : "#aaa",
              fontWeight: "500"
            }}
          >
            °C
          </span>

          <span
            onClick={() => setUnit("F")}
            style={{
              background: unit === "F" ? "#f59e0b" : "transparent",
              padding: "4px 8px",
              color: unit === "F" ? "black" : "#aaa"
            }}
          >
            °F
          </span>
        </div>

      </div>

      <p style={{ marginTop: "6px", color: "#aaa" }}>
        {condition}
      </p>

      <div style={{
        height: "1px",
        background: "#333",
        margin: "10px 0"
      }} />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        color: "#aaa"
      }}>
        <span>Wind {wind} km/h</span>
        <span>Hum {humidity}%</span>
      </div>

    </div>
  );
}