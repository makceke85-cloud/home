import React, { useState, useEffect } from 'react';
import './App.css';
import Pra from './component/Pra';

const cities = [
  { name: "القاهرة", value: "Cairo" },
  { name: "الإسكندرية", value: "Alexandria" },
  { name: "الجيزة", value: "Giza" },
  { name: "البحيرة", value: "Beheira" },
  { name: "المنصورة", value: "Mansoura" },
  { name: "بورسعيد", value: "Port Said" },
  { name: "السويس", value: "Suez" },
  { name: "طنطا", value: "Tanta" },
  { name: "أسوان", value: "Aswan" },
  { name: "الأقصر", value: "Luxor" },
  { name: "أسيوط", value: "Asyut" },
  { name: "سوهاج", value: "Sohag" },
  { name: "قنا", value: "Qena" },
  { name: "الفيوم", value: "Fayoum" },
  { name: "بني سويف", value: "Beni Suef" },
  { name: "المنيا", value: "Minya" },
  { name: "دمياط", value: "Damietta" },
  { name: "الإسماعيلية", value: "Ismailia" }
];

function App() {
  const [selectCity, setSelectCity] = useState('Cairo');
  const [timings, setTimings] = useState({
    Fajr: "00:00",
    Dhuhr: "00:00",
    Asr: "00:00",
    Maghrib: "00:00",
    Isha: "00:00"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const formatTime = (time) => {
    if (!time) return "00:00";
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    const period = hours >= 12 ? "م" : "ص";
    hours = hours % 12 || 12; 
    return `${hours < 10 ? '0' + hours : hours}:${minutes} ${period}`;
  };

  
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectCity}&country=Egypt&method=5`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        return response.json();
      })
      .then(data => {
        if (data.data) {
          setTimings(data.data.timings);
        } else {
          throw new Error('Invalid data received');
        }
      })
      .catch(error => {
        console.error("Error fetching timings:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [selectCity]);

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>
            <select 
              value={selectCity} 
              onChange={(e) => setSelectCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="data">
            <h3>التاريخ</h3>
            <h4>{new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}</h4>
          </div>
        </div>

        {loading && <p style={{ color: 'white', textAlign: 'center' }}>جاري التحميل...</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>خطأ: {error}</p>}

        <div className="prayers-list">
          <Pra name="الفجر" time={formatTime(timings.Fajr)} />
          <Pra name="الظهر" time={formatTime(timings.Dhuhr)} />
          <Pra name="العصر" time={formatTime(timings.Asr)} />
          <Pra name="المغرب" time={formatTime(timings.Maghrib)} />
          <Pra name="العشاء" time={formatTime(timings.Isha)} />
        </div>
      </div>
    </section>
  );
}

export default App;