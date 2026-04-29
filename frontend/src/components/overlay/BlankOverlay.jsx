import { useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale, 
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

// Sabhi scales aur elements ko register kiya
ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler
);

export default function BlankOverlay({ onClose, type, data, city }) {
  // Background scroll disable
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Helper function: Wind Direction
  const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degree / 45) % 8];
  };

  // Helper function: UV Severity
  const getUvSeverity = (val) => {
    if (val < 3) return { text: "Low", color: "#4ade80" }; // Green
    if (val < 6) return { text: "Moderate", color: "#facc15" }; // Yellow
    if (val < 8) return { text: "High", color: "#f97316" }; // Orange
    if (val < 11) return { text: "Very High", color: "#ef4444" }; // Red
    return { text: "Extreme", color: "#d946ef" }; // Purple
  };

  // Helper function: AQI Status (1 to 5)
  const getAqiStatus = (index) => {
    switch(index) {
      case 1: return { text: "Good", color: "#00e400" }; // Green
      case 2: return { text: "Fair", color: "#ffff00" }; // Yellow
      case 3: return { text: "Moderate", color: "#ff7e00" }; // Orange
      case 4: return { text: "Poor", color: "#ff0000" }; // Red
      case 5: return { text: "Very Poor", color: "#7e0023" }; // Purple
      default: return { text: "Unknown", color: "#aaa" };
    }
  };

  // Content render karne ka logic
  const renderContent = () => {
    if (!data) {
      return <div style={{ color: "#aaa", textAlign: "center", marginTop: "100px" }}>Loading details...</div>;
    }

    // ==========================================
    // 1. TEMPERATURE OVERLAY LOGIC
    // ==========================================
    if (type === "temp") {
      const next24Hours = data.slice(0, 9);
      
      const labels = next24Hours.map(item => {
        const d = new Date(item.dt_txt);
        return d.toLocaleTimeString([], { hour: "numeric", hour12: true });
      });
      
      const temps = next24Hours.map(item => Math.round(item.main.temp));

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temps,
            borderColor: "#facc15",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#1e1e1e",
            pointBorderColor: "#facc15",
            pointRadius: 4,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return null;
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, "rgba(250, 204, 21, 0.4)");
              gradient.addColorStop(1, "rgba(250, 204, 21, 0)");
              return gradient;
            },
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#facc15",
            displayColors: false,
            callbacks: { label: (context) => `${context.parsed.y}°C` }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#aaa" } },
          y: { grid: { color: "#333", borderDash: [5, 5] }, ticks: { color: "#aaa", callback: (val) => `${val}°` } },
        },
      };

      return (
        <div style={innerFlex}>
          <div style={graphSide}>
            <h2 style={titleStyle}>Temperature Trend - {city}</h2>
            <div style={chartBox}><Line data={chartData} options={chartOptions} /></div>
          </div>
          <div style={statsSide}>
            <h3 style={subTitle}>Next 24 Hours</h3>
            <div style={tableScroll}>
              {next24Hours.map((item, i) => (
                <div key={i} style={tableRow}>
                  <span style={{ color: "#aaa", width: "70px" }}>{labels[i]}</span>
                  <span style={{ color: "#888", textTransform: "capitalize", fontSize: "12px", flex: 1, textAlign: "center" }}>{item.weather[0].description}</span>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>{Math.round(item.main.temp)}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // 2. WIND OVERLAY LOGIC
    // ==========================================
    if (type === "wind") {
      const next24Hours = data.slice(0, 9);
      const labels = next24Hours.map(item => new Date(item.dt_txt).toLocaleTimeString([], { hour: "numeric", hour12: true }));
      const speeds = next24Hours.map(item => Math.round(item.wind.speed * 3.6));

      const chartData = {
        labels: labels,
        datasets: [{
          label: "Wind Speed (km/h)",
          data: speeds,
          backgroundColor: "#0ea5e9",
          borderRadius: 4,
          barThickness: 30,
        }],
      };

      const chartOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(25, 25, 25, 0.95)", titleColor: "#aaa", bodyColor: "#0ea5e9",
            bodyFont: { size: 18, weight: 'bold' }, padding: 12, displayColors: false,
            callbacks: { label: (ctx) => `${ctx.parsed.y} km/h` }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#aaa" } },
          y: { grid: { color: "#333", borderDash: [5, 5] }, ticks: { color: "#aaa", callback: (val) => `${val} km/h` } },
        },
      };

      return (
        <div style={innerFlex}>
          <div style={graphSide}>
            <h2 style={titleStyle}>Wind Speed Trend - {city}</h2>
            <div style={chartBox}><Bar data={chartData} options={chartOptions} /></div>
          </div>
          <div style={statsSide}>
            <h3 style={subTitle}>Next 24 Hours</h3>
            <div style={tableScroll}>
              {next24Hours.map((item, i) => (
                <div key={i} style={tableRow}>
                  <span style={{ color: "#aaa", width: "70px" }}>{labels[i]}</span>
                  <span style={{ color: "#888", fontSize: "12px", flex: 1, textAlign: "center" }}>Dir: {getWindDirection(item.wind.deg)}</span>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>{Math.round(item.wind.speed * 3.6)} <span style={{fontSize: "12px", color: "#0ea5e9"}}>km/h</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // 3. UV INDEX OVERLAY LOGIC
    // ==========================================
    if (type === "uv") {
      const currentHour = new Date().getHours();
      const uvArray = data?.hourly?.uv_index || [];
      const timeArray = data?.hourly?.time || [];
      const displayUv = uvArray.slice(currentHour, currentHour + 12);
      const displayTime = timeArray.slice(currentHour, currentHour + 12);
      const labels = displayTime.map(t => new Date(t).toLocaleTimeString([], { hour: "numeric", hour12: true }));

      const chartData = {
        labels: labels,
        datasets: [{
          label: "UV Index",
          data: displayUv,
          borderColor: "#f97316", borderWidth: 3, tension: 0.4, fill: true,
          pointBackgroundColor: "#1e1e1e", pointBorderColor: "#f97316", pointRadius: 4,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(249, 115, 22, 0.4)");
            gradient.addColorStop(1, "rgba(249, 115, 22, 0)");
            return gradient;
          },
        }],
      };

      const chartOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(25, 25, 25, 0.95)", titleColor: "#aaa", bodyColor: "#f97316",
            bodyFont: { size: 18, weight: 'bold' }, padding: 12, displayColors: false,
            callbacks: { label: (ctx) => `UV Index: ${ctx.parsed.y}` }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#aaa" } },
          y: { grid: { color: "#333", borderDash: [5, 5] }, ticks: { color: "#aaa" }, beginAtZero: true, suggestedMax: 11 },
        },
      };

      return (
        <div style={innerFlex}>
          <div style={graphSide}>
            <h2 style={titleStyle}>UV Index Trend - {city}</h2>
            <div style={chartBox}><Line data={chartData} options={chartOptions} /></div>
          </div>
          <div style={statsSide}>
            <h3 style={subTitle}>Next 12 Hours</h3>
            <div style={tableScroll}>
              {displayUv.map((val, i) => {
                const severity = getUvSeverity(val);
                return (
                  <div key={i} style={tableRow}>
                    <span style={{ color: "#aaa", width: "70px" }}>{labels[i]}</span>
                    <span style={{ color: severity.color, fontSize: "14px", flex: 1, textAlign: "center", fontWeight: "500" }}>{severity.text}</span>
                    <span style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>{val} <span style={{fontSize: "12px", color: "#888"}}>UV</span></span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // 4. AQI (AIR QUALITY) OVERLAY LOGIC
    // ==========================================
    if (type === "aqi") {
      const aqiData = data?.list?.[0]; 
      
      if (!aqiData) {
        return <div style={{ color: "#aaa", textAlign: "center", marginTop: "100px" }}>AQI Data unavailable</div>;
      }

      const aqiIndex = aqiData.main.aqi;
      const components = aqiData.components; // { co: 145.16, no: 0.34, no2: 1.87... }
      const aqiStatus = getAqiStatus(aqiIndex);

      const labels = Object.keys(components).map(k => k.toUpperCase().replace('_', '.'));
      const values = Object.values(components);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Concentration (μg/m³)",
            data: values,
            backgroundColor: "#10b981", // Emerald Green
            borderRadius: 4,
            barThickness: 25,
          },
        ],
      };

      const chartOptionsAqi = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(25, 25, 25, 0.95)",
            titleColor: "#aaa",
            bodyColor: "#10b981", 
            bodyFont: { size: 18, weight: 'bold' },
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (context) => `${context.parsed.y} μg/m³`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#aaa", font: { size: 10 } }, 
          },
          y: {
            grid: { color: "#333", borderDash: [5, 5] },
            ticks: { color: "#aaa" },
            type: 'logarithmic',
          },
        },
      };

      return (
        <div style={innerFlex}>
          <div style={graphSide}>
            <h2 style={titleStyle}>Air Pollutants Analysis - {city}</h2>
            <div style={chartBox}>
              <Bar data={chartData} options={chartOptionsAqi} />
            </div>
            <p style={{ color: "#666", fontSize: "11px", marginTop: "10px", textAlign: "right" }}>
              *Chart is on a logarithmic scale to show both high (CO) and low (NO) values clearly.
            </p>
          </div>

          <div style={statsSide}>
            <div style={{ background: "#1e1e1e", padding: "15px", borderRadius: "12px", marginBottom: "20px", textAlign: "center", border: `1px solid ${aqiStatus.color}` }}>
              <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "5px" }}>Overall Air Quality Index</div>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}>{aqiIndex}</div>
              <div style={{ fontSize: "16px", fontWeight: "500", color: aqiStatus.color }}>{aqiStatus.text}</div>
            </div>

            <h3 style={subTitle}>Pollutants Breakdown</h3>
            <div style={tableScroll}>
              {Object.entries(components).map(([key, val], i) => (
                <div key={i} style={tableRow}>
                  <span style={{ color: "#aaa", fontWeight: "500", textTransform: "uppercase" }}>
                    {key.replace('_', '.')}
                  </span>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>
                    {val} <span style={{fontSize: "11px", color: "#888", fontWeight: "normal"}}>μg/m³</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // 5. HUMIDITY OVERLAY LOGIC
    // ==========================================
    if (type === "humidity") {
      // Yahan hum forecast API data use kar rahe hain jo temp/wind me use kiya tha
      const next24Hours = data.slice(0, 9);
      
      const labels = next24Hours.map(item => {
        const d = new Date(item.dt_txt);
        return d.toLocaleTimeString([], { hour: "numeric", hour12: true });
      });
      
      const humidities = next24Hours.map(item => item.main.humidity);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Humidity (%)",
            data: humidities,
            borderColor: "#3b82f6", // Nice blue color for water/humidity
            borderWidth: 3,
            tension: 0.4, // smooth curves
            fill: true,
            pointBackgroundColor: "#1e1e1e",
            pointBorderColor: "#3b82f6",
            pointRadius: 4,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return null;
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)"); // blue gradient
              gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
              return gradient;
            },
          },
        ],
      };

      if (type === "forecast") {
  if (!data) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 style={{ fontSize: "28px" }}>{data.day}</h2>

      <p style={{ color: "#aaa" }}>{data.date}</p>

      <div style={{
        fontSize: "60px",
        fontWeight: "bold",
        marginTop: "30px"
      }}>
        {data.temp}°
      </div>

      <p style={{ color: "#888" }}>
        Temperature in {city}
      </p>
    </div>
  );
}

      
      return (
        <div style={innerFlex}>
          <div style={graphSide}>
            <h2 style={titleStyle}>Humidity Trend - {city}</h2>
            <div style={chartBox}><Line data={chartData} options={chartOptionsHumidity} /></div>
          </div>
          <div style={statsSide}>
            <h3 style={subTitle}>Next 24 Hours</h3>
            <div style={tableScroll}>
              {next24Hours.map((item, i) => {
                const hum = item.main.humidity;
                const temp = item.main.temp;
                // Dew point calculation (Approximate formula)
                const dewPoint = Math.round(temp - ((100 - hum) / 5));

                return (
                  <div key={i} style={tableRow}>
                    <span style={{ color: "#aaa", width: "70px" }}>{labels[i]}</span>
                    <span style={{ color: "#888", fontSize: "12px", flex: 1, textAlign: "center" }}>
                      Dew Pt: {dewPoint}°
                    </span>
                    <span style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
                      {hum} <span style={{fontSize: "12px", color: "#3b82f6"}}>%</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return <div style={{ color: "#aaa", textAlign: "center", marginTop: "100px" }}>Details for {type} coming soon...</div>;
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeBtn}>✕</button>
        <div style={{ height: "100%", width: "100%" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// 🎨 Styles
const overlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 };
const cardStyle = { background: "#1e1e1e", padding: "40px", borderRadius: "16px", width: "1020px", height: "550px", position: "relative", color: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" };
const closeBtn = { position: "absolute", top: "15px", right: "20px", background: "transparent", border: "none", color: "#888", fontSize: "24px", cursor: "pointer", transition: "color 0.2s" };
const innerFlex = { display: "flex", gap: "30px", height: "100%", marginTop: "10px" };
const graphSide = { flex: 2, display: "flex", flexDirection: "column" };
const statsSide = { flex: 1, background: "#252525", padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "column" };
const chartBox = { flex: 1, background: "transparent", marginTop: "20px", position: "relative" };
const titleStyle = { margin: 0, fontSize: "24px", color: "#fff", fontWeight: "600" };
const subTitle = { margin: "0 0 15px 0", fontSize: "18px", color: "#ccc", borderBottom: "1px solid #444", paddingBottom: "10px" };
const tableScroll = { flex: 1, overflowY: "auto", paddingRight: "10px" };
const tableRow = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #333", fontFamily: "monospace" };