import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ForecastChart = () => {
  const [forecastData, setForecastData] = useState([]);
  const [activeTab, setActiveTab] = useState('humidity'); // State untuk tab aktif

  // Fetch data berdasarkan tab yang aktif
  useEffect(() => {
    const apiEndpoint =
      activeTab === 'humidity'
        ? 'http://127.0.0.1:8000/analysis/forcasting/forecast-humid-dht22'
        : 'http://127.0.0.1:8000/analysis/forcasting/forecast-temp-dht22';

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.forecast.map(item => ({
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
          prediction: parseFloat(item.prediction.toFixed(2)),
        }));
        setForecastData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [activeTab]); // Memicu fetch data ketika tab berubah

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: activeTab === 'humidity' ? '#8884d8' : '#f0f0f0',
            color: activeTab === 'humidity' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setActiveTab('humidity')}
        >
          Humidity
        </button>
        <button
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: activeTab === 'temperature' ? '#8884d8' : '#f0f0f0',
            color: activeTab === 'temperature' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setActiveTab('temperature')}
        >
          Temperature
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="prediction" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
