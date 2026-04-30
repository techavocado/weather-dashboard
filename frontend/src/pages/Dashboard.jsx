import { useEffect, useState } from "react";
import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";
import BlankOverlay from "../components/overlay/BlankOverlay";

const BACKEND_URL = "https://weather-dashboard-rsgt.onrender.com";

export default function Dashboard() {
  const [city, setCity] = useState("Ahmedabad");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [uvValue, setUvValue] = useState(null);
  const [currAqi, setCurrAqi] = useState(null);
  const [error, setError] = useState(false);

  // const [overlay, setOverlay] = useState(false);

  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleOpenModal = (type, specificData = null) => {
    setActiveModal(type);
    setModalData(specificData);
  };

  useEffect(() => {
    if (!city) return;

    const fetchAllData = async () => {
      try {
        setError(false);
        const [weatherRes, forecastRes, uvRes, aqiRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/weather?city=${city}`),
          fetch(`${BACKEND_URL}/api/forecast?city=${city}`),
          fetch(`${BACKEND_URL}/api/uvindex?city=${city}`),
          fetch(`${BACKEND_URL}/api/curraqi?city=${city}`)
        ]);

        // Agar backend 500 error de raha hai toh yahan handle hoga
        if (!weatherRes.ok || !forecastRes.ok || !uvRes.ok || !aqiRes.ok) {
          setError(true);
          console.error("Backend failed for some city");
          return;
        }

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();
        const uvData = await uvRes.json();
        const aqiData = await aqiRes.json();

        setWeather(weatherData);
        setForecast(forecastData);
        setUvValue(uvData);
        setCurrAqi(aqiData);

      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchAllData();
  }, [city]);

  const handleCitySearch = (newCity) => {
    if (newCity && newCity.trim() !== "") {
      setCity(newCity);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LeftPanel weather={weather} forecast={forecast} onSearchCity={handleCitySearch} error={error} onOpenOverlay={handleOpenModal} />
      <RightPanel weather={weather} forecast={forecast} uvValue={uvValue} city={city} onOpenOverlay={handleOpenModal} />
      {activeModal && (
        <BlankOverlay
          type={activeModal}
          city={city}
          data={
            activeModal === 'forecast' ? modalData : // Use the clicked card's data here!
              activeModal === 'uv' ? uvValue :
                activeModal === 'aqi' ? currAqi :
                  (activeModal === 'temp' || activeModal === 'wind') ? forecast :
                    weather
          }
          onClose={() => {
            setActiveModal(null);
            setModalData(null); // Clear data on close
          }}
        />
      )}
    </div>
  );
}