import { useEffect, useState } from "react";
import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/weather?city=Ahmedabad")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setWeather(data);
      });
    fetch("http://localhost:8000/api/forecast?city=Ahmedabad")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      setForecast(data);
    });
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LeftPanel weather={weather} forecast={forecast} />
      <RightPanel weather={weather} forecast={forecast} />
    </div>
  );
}