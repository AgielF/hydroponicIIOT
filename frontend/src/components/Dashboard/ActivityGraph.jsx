import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { getData } from "../../services/apiService";
import Graph from "./Graph";

const ActivityGraph = ({ activeTab }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEndpoint = (tab) => {
    switch (tab) {
      case "PH":
        return "sensor-ph";
      case "EC":
        return "sensor-ec";
      case "Cahaya":
        return "sensor-ldr";
      default:
        return "sensor-dht22"; // Default case for DHT22
    }
  };

  const transformData = (data, tab) => {
    switch (tab) {
      case "PH":
        return data.map((item) => ({
          name: new Date(item.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          pH: item.ph_value,
        }));
      case "EC":
        return data.map((item) => ({
          name: new Date(item.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          EC: item.ec_value,
        }));
      case "Cahaya":
        return data.map((item) => ({
          name: new Date(item.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          Light: item.ldr_value,
        }));
      default:
        return data.map((item) => ({
          name: new Date(item.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          Temperature: item.temp,
          Humidity: item.humid,
        }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = fetchEndpoint(activeTab);
        const result = await getData(endpoint);
        const transformedData = transformData(result, activeTab);
        setChartData(transformedData.slice(-10)); // Get the last 10 entries
      } catch (error) {
        console.error("Error loading sensor data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const linesConfig = {
    PH: [{ dataKey: "pH", color: "#32CD32" }],
    EC: [{ dataKey: "EC", color: "#FFD700" }],
    Cahaya: [{ dataKey: "Light", color: "#FFA500" }],
    DHT22: [
      { dataKey: "Temperature", color: "#FF4500" },
      { dataKey: "Humidity", color: "#1E90FF" },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Sensor Data - {activeTab}
        </h3>
      </div>
      <div className="h-64 px-4">
        <Graph data={chartData} lines={linesConfig[activeTab] || []} xAxisKey="name" />
      </div>
    </div>
  );
};

export default ActivityGraph;
