import { useEffect, useState } from "react";
import "./CurrAqiCard.css"
import AqiComponents from "./AqiComponents";

export default function CurrAqiCard({city}) {
    let [currAqi, setCurrAqi] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/curraqi?city=${city}`)
            .then((res) => res.json())
            .then((data) => {
                setCurrAqi(data);
            })
    }, [city]);

    const aqiLevels = {
        1: { label: "Good", color: "#00e400" },
        2: { label: "Fair", color: "#ffff00" },
        3: { label: "Moderate", color: "#ff7e00" },
        4: { label: "Poor", color: "#ff0000" },
        5: { label: "Very Poor", color: "#7e0023" }
    };

    const aqiValue = currAqi?.list[0].main.aqi;
    const components = currAqi?.list[0].components;
    const current = aqiLevels[aqiValue] || { label: "N/A", color: "#ccc" };

    return (
        <div className="card" style={{ marginTop: "12px", width: "95.5%",height: "90px"}}>
            <div className="AqiContent">
                <div className="AqiCard">
                    <p style={{ color: "#aaa", marginBottom: "7px" }}>Air Quality</p>
                    <div className="flex">
                        <div className="AqiCircle" style={{ backgroundColor: current.color }}>
                            <span className="AqiDigit">{aqiValue}</span>
                        </div>
                        <p className="AqiLabel">{current.label}</p>
                    </div>
                </div>
                <AqiComponents name= "PM2.5" value={components?.pm2_5}/>
                <AqiComponents name= "PM10" value={components?.pm10}/>
                <AqiComponents name= "O3" value={components?.o3}/>
                <AqiComponents name= "NO2" value={components?.no2}/>
            </div>
        </div>
    )
}