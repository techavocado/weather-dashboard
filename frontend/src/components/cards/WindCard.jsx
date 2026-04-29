import "./StatCard.css";
import { Bar } from "react-chartjs-2";

export default function WindCard({ windData, windLabels, forecast, onOpenOverlay }) {

  // to the the current time and closest wind speed

  if (!forecast || forecast.length === 0) return null;

  const now = new Date();

  let closestItem = forecast?.[0];

  forecast?.forEach((item) => {
    const itemTime = new Date(item.dt_txt);
    if (
      Math.abs(itemTime - now) <
      Math.abs(new Date(closestItem.dt_txt) - now)
    ) {
      closestItem = item;
    }
  });

  const currentSpeed = Math.round(closestItem.wind.speed * 3.6);

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });


  return (
    // Yahan 'wind' likhna zaroori hai
    <div onClick={() => onOpenOverlay?.('wind')} style={{ width: "280px", height: "210px", cursor: "pointer", transition: "transform 0.2s ease" }} className="card">      {/* Title */}
      <p style={{ marginBottom: "10px" }}>Wind Status</p>

      {/* Chart */}
      <div style={{ height: "130px" }}>
        <Bar
          data={{
            labels: windLabels,
            datasets: [
              {
                data: windData,
                backgroundColor: "#0ea5e9",
                borderRadius: 2,
                barThickness: 12,
                categoryPercentage: 1.0,
                barPercentage: 1.0,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: { display: false },
            },

            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  color: "#aaa",
                  font: { size: 10 },
                  maxRotation: 0,
                  minRotation: 0,
                  autoSkip: true,

                },
              },
              y: {
                grid: { display: false },
                ticks: {
                  autoSkip: false,

                  color: "#aaa",
                  font: { size: 10 },
                },
              },
            },
          }}
        />
      </div>

      {/* current speed and time */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "15px"
      }}>
        {/* Speed */}
        <div style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "white"
        }}>
          {currentSpeed}
          <span style={{
            fontSize: "14px",
            color: "#aaa",
            marginLeft: "4px"
          }}>
            km/h
          </span>
        </div>

        {/* Time */}
        <div style={{
          fontSize: "14px",
          color: "#aaa"
        }}>
          {currentTime}
        </div>
      </div>
    </div>
  );
}