import { Line } from "react-chartjs-2";

export default function TemperatureCard({ labels, temps, options , onOpenOverlay}) {

  const dayParts = ["Morning", "Afternoon", "Evening", "Night"];
  const dayTemps = temps?.slice(0, 4) || [];

  return (
    
    <div  onClick={() => onOpenOverlay?.()}  style={{
      background: "#1e1e1e",
      padding: "20px",
      borderRadius: "16px",
      color: "white",
      cursor: "pointer",
      transition: "transform 0.2s ease",
    }}>
      <p>Temperature</p>
      <div style={{
        height: "140px",
        background: "transparent",
        borderRadius: "10px",
        marginTop: "10px"
      }}>

        {/* chart */}
        {labels && temps && (
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  data: temps,
                  borderColor: "#facc15",
                  borderWidth: 3,
                  tension: 0.4,
                  fill: true,   

                  backgroundColor: (context) => {
                    const chart = context.chart;

                    if (!chart.chartArea) {
                      return null; 
                    }

                    const { ctx, chartArea } = chart;

                    const gradient = ctx.createLinearGradient(
                      0,
                      chartArea.top,
                      0,
                      chartArea.bottom
                    );

                    gradient.addColorStop(0, "rgba(250, 204, 21, 0.4)");
                    gradient.addColorStop(1, "rgba(250, 204, 21, 0)");

                    return gradient;
                  },

                },
              ],
            }}
            options={options}
          />
        )}

      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px"
      }}>
        {dayParts.map((label, i) => (
          <div key={i} style={{ textAlign: "center", flex: 1 }}>
            <div style={{ color: "#aaa", fontSize: "12px" }}>
              {label}
            </div>
            <div style={{ color: "white", fontSize: "14px", marginTop: "4px" }}>
              {dayTemps[i]}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}