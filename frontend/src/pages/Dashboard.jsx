import { useEffect, useState } from "react";
import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";
import BlankOverlay from "../components/overlay/BlankOverlay";

// const BACKEND_URL = "https://weather-dashboard-rsgt.onrender.com";
const BACKEND_URL = "http://localhost:8000";

export default function Dashboard() {
  const [city, setCity] = useState("Ahmedabad");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
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

    // 1. Sab data ko fetch karo, lekin ek fail ho toh baaki na rukein
    const [weatherRes, forecastRes, aqiRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/weather?city=${city}`).catch(e => ({ ok: false })),
      fetch(`${BACKEND_URL}/api/forecast?city=${city}`).catch(e => ({ ok: false })),
      fetch(`${BACKEND_URL}/api/curraqi?city=${city}`).catch(e => ({ ok: false }))
    ]);

    // 2. Sirf Weather main hai, agar ye nahi aaya toh hi Error dikhao
    if (weatherRes.ok) {
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
    } else {
      setError(true); // Weather hi nahi mila toh error dikhao
      console.error("Main weather data failed");
    }

    // 3. Baaki data agar OK hai toh set karo, warna skip karo (App crash nahi hogi)
    if (forecastRes.ok) setForecast(await forecastRes.json());
    if (aqiRes.ok) setCurrAqi(await aqiRes.json());

  } catch (err) {
    console.error("Fetch Error:", err);
    // Yahan hum error(true) nahi kar rahe taaki partial data dikhta rahe
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
      <RightPanel weather={weather} forecast={forecast} city={city} onOpenOverlay={handleOpenModal} />
      {activeModal && (
        <BlankOverlay
          type={activeModal}
          city={city}
          data={
            activeModal === 'forecast' ? modalData : // Use the clicked card's data here!
                activeModal === 'aqi' ? currAqi :
                activeModal == 'uv' ? modalData : 
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