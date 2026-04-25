import MainWeatherCard from "../left/MainWeatherCard";
import TemperatureCard from "../left/TemperatureCard";
import ImageCard from "../left/ImageCard";

export default function LeftPanel() {
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
            <MainWeatherCard />
            <TemperatureCard />
            <ImageCard />
        </div>
    );
}