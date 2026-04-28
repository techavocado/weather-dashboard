import MainWeatherCard from "../left/MainWeatherCard";
import TemperatureCard from "../left/TemperatureCard";
import ImageCard from "../left/ImageCard";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,        
      Filler,       

} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip,  Filler,);

export default function LeftPanel({ weather, forecast,onSearchCity }) {

    const labels = forecast?.slice(0, 13).map((item) => {
        const date = new Date(item.dt_txt);
        return date.toLocaleTimeString([], {
            hour: "numeric",
            hour12: true,
        });
    });
    
    const temps = forecast?.slice(0, 13).map((item) =>
        Math.round(item.main.temp)
    );

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            tooltip: {
                enabled: true,
                intersect: false,
                mode: "index",
            },
        },
        scales: {
            x: {
                grid: { display: false },
                display: true,
                ticks: {
                    color: "#aaa",
                    display: true,
                    font: {
                        size: 10,
                    },
                },

            },
            y: {
                grid: { display: false },
                display: true,
                ticks: {
                    color: "#aaa",
                    font: {
                        size: 10,
                    },
                    callback: (value) => `${value}°`,
                },

            },
        },
        elements: {
            point: { radius: 2 },
        },
    };

    return (
        <div style={{
            width: "30%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            background: "#111",
            height: "100vh"
        }}>
            <MainWeatherCard weather={weather} />
            <TemperatureCard labels={labels} temps={temps} options={options} />
            <ImageCard onSearch={onSearchCity}/>
        </div>
    );
}