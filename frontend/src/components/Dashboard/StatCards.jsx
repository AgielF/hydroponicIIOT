import React, { useEffect, useState } from "react";
import { getData } from "../../services/apiService";

// Komponen Tabs
function Tabs({ options, activeTab, setActiveTab }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={index + 1}>{option}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {options.map((option, index) => (
              <a
                key={index}
                href="#"
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === (index + 1).toString()
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab((index + 1).toString());
                }}
              >
                {option}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// Komponen StatCards
function StatCards({ apiEndpoint, title, fields }) {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(apiEndpoint);
        setSensorData(result[0]); // Ambil elemen pertama dari data yang diterima
      } catch (error) {
        console.error("Error loading sensor data:", error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (!sensorData) {
    return <p>Loading...</p>;
  }

  return (
    <Card
      title={title}
      fields={fields.map((field) => ({
        label: field.label,
        value: sensorData[field.key]?.toFixed(2) || "N/A",
      }))}
    />
  );
}

// Komponen Reusable Card
const Card = ({ title, fields }) => (
  <div className="col-span-4 p-4 rounded border border-stone-300">
    <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
    {fields.map((field, index) => (
      <p key={index} className="text-3xl font-semibold">
        {field.label}: {field.value}
      </p>
    ))}
  </div>
);

// Komponen Utama
function MainComponents() {
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("1");

  const mainTabs = [
    "Rata-rata Sensor DHT22",
    "Rata-rata Sensor PH",
    "Rata-rata Sensor Cahaya",
    "Rata-rata Sensor EC",
  ];

  const subTabs = [
    "Rata-rata Keseluruhan",
    "10 Menit Terakhir",
    "20 Menit Terakhir",
    "30 Menit Terakhir",
    "60 Menit Terakhir",
  ];

  const apiEndpoints = {
    "1": [
      "sensor-dht22/rata-rata",
      "sensor-dht22/rata-rata/10",
      "sensor-dht22/rata-rata/20",
      "sensor-dht22/rata-rata/30",
      "sensor-dht22/rata-rata/60",
    ],
    "2": [
      "sensor-ph/rata-rata",
      "sensor-ph/rata-rata/10",
      "sensor-ph/rata-rata/20",
      "sensor-ph/rata-rata/30",
      "sensor-ph/rata-rata/60",
    ],
    "3": [
      "sensor-ldr/rata-rata",
      "sensor-ldr/rata-rata/10",
      "sensor-ldr/rata-rata/20",
      "sensor-ldr/rata-rata/30",
      "sensor-ldr/rata-rata/60",
    ],
    "4": [
      "sensor-ec/rata-rata",
      "sensor-ec/rata-rata/10",
      "sensor-ec/rata-rata/20",
      "sensor-ec/rata-rata/30",
      "sensor-ec/rata-rata/60",
    ],
  };

  const fieldsByTab = {
    "1": [
      { label: "Rata-rata Temp", key: "avg_temp" },
      { label: "Rata-rata Humid", key: "avg_humid" },
    ],
    "2": [
      { label: "Rata-rata PH", key: "avg_ph" },
    ],
    "3": [
      { label: "Rata-rata Cahaya", key: "avg_ldr_value" },
    ],
    "4": [
      { label: "Rata-rata EC", key: "avg_ec" },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs options={mainTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        <Tabs options={subTabs} activeTab={activeSubTab} setActiveTab={setActiveSubTab} />
        <div className="mt-6">
          <StatCards
            apiEndpoint={apiEndpoints[activeTab][parseInt(activeSubTab) - 1]}
            title={mainTabs[parseInt(activeTab) - 1]}
            fields={fieldsByTab[activeTab]}
          />
        </div>
      </div>
    </div>
  );
}

export default MainComponents;
