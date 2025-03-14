export { API_BASE_URL, WS_URL } from '../../config/config';

import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { WS_URL } from "../../config/config";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabLabels = ["DHT22", "Sensor PH", "Sensor LDR", "Sensor EC", "Suhu Air"];
  return (
    <div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {tabLabels.map((tab, index) => (
              <a
                key={index}
                href="#"
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  activeTab === index + 1
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(index + 1);
                }}
              >
                {tab}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [graphData, setGraphData] = useState({
    DHT22: { labels: [], datasets: [] },
    PH: { labels: [], datasets: [] },
    LDR: { labels: [], datasets: [] },
    EC: { labels: [], datasets: [] },
    SuhuAir: { labels: [], datasets: [] },
  });

  useEffect(() => {
    // Connect to HiveMQ Cloud
    const client = mqtt.connect(WS_URL, {
      username: "plantsociety",
      password: "Timhura2025",
    });

    // Log connection status
    client.on("connect", () => {
      console.log("✅ Connected to HiveMQ Cloud!");
      client.subscribe("hidroponik/realtimeSensorData", (err) => {
        if (err) {
          console.error("❌ Failed to subscribe to topic:", err);
        } else {
          console.log("📡 Subscribed to topic: hidroponik/realtimeSensorData");
        }
      });
    });

    client.on("error", (err) => {
      console.error("❌ Connection error:", err);
    });

    // Handle incoming messages
    client.on("message", (topic, message) => {
      if (topic === "hidroponik/realtimeSensorData") {
        const sensorData = JSON.parse(message.toString());
        console.log("📨 Received data:", sensorData);

        setData((prevData) => [...prevData, sensorData]);

        if (activeTab === 1) {
          setGraphData((prevState) => ({
            ...prevState,
            DHT22: {
              labels: [...prevState.DHT22.labels, new Date().toLocaleTimeString()],
              datasets: [
                {
                  label: "Temperature (°C)",
                  data: [...(prevState.DHT22.datasets[0]?.data || []), sensorData.suhuUdara],
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  pointStyle: 'circle',
                  pointBorderColor: 'rgba(75, 192, 192, 1)',
                  pointBackgroundColor: '#fff',
                  fill: true,
                },
                {
                  label: "Humidity (%)",
                  data: [...(prevState.DHT22.datasets[1]?.data || []), sensorData.kelembabanUdara],
                  borderColor: "rgba(153, 102, 255, 1)",
                  backgroundColor: "rgba(153, 102, 255, 0.2)",
                  pointStyle: 'rectRot',
                  pointBorderColor: 'rgba(153, 102, 255, 1)',
                  pointBackgroundColor: '#fff',
                  fill: true,
                },
              ],
            },
          }));
        }

        if (activeTab === 2) {
          setGraphData((prevState) => ({
            ...prevState,
            PH: {
              labels: [...prevState.PH.labels, new Date().toLocaleTimeString()],
              datasets: [
                {
                  label: "PH Level",
                  data: [...(prevState.PH.datasets[0]?.data || []), sensorData.phValue],
                  borderColor: "rgba(255, 159, 64, 1)",
                  backgroundColor: "rgba(255, 159, 64, 0.2)",
                  pointStyle: 'triangle',
                  pointBorderColor: 'rgba(255, 159, 64, 1)',
                  pointBackgroundColor: '#fff',
                  fill: true,
                },
              ],
            },
          }));
        }

        if (activeTab === 3) {
          setGraphData((prevState) => ({
            ...prevState,
            LDR: {
              labels: [...prevState.LDR.labels, new Date().toLocaleTimeString()],
              datasets: [
                {
                  label: "LDR Value",
                  data: [...(prevState.LDR.datasets[0]?.data || []), sensorData.ldrValue],
                  borderColor: "rgba(255, 206, 86, 1)",
                  backgroundColor: "rgba(255, 206, 86, 0.2)",
                  pointStyle: 'star',
                  pointBorderColor: 'rgba(255, 206, 86, 1)',
                  pointBackgroundColor: '#fff',
                  fill: true,
                },
              ],
            },
          }));
        }

        if (activeTab === 4) {
          setGraphData((prevState) => ({
            ...prevState,
            EC: {
              labels: [...prevState.EC.labels, new Date().toLocaleTimeString()],
              datasets: [
                {
                  label: "EC Value",
                  data: [...(prevState.EC.datasets[0]?.data || []), sensorData.tdsValue],
                  borderColor: "rgba(54, 162, 235, 1)",
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  pointStyle: 'rect',
                  pointBorderColor: 'rgba(54, 162, 235, 1)',
                  pointBackgroundColor: '#fff',
                  fill: true,
                },
              ],
            },
          }));
        }

        if (activeTab === 5) {
          setGraphData((prevState) => ({
            ...prevState,
            SuhuAir: {
              labels: [...prevState.SuhuAir.labels, new Date().toLocaleTimeString()],
              datasets: [
                {
                  label: "Water Temperature (°C)",
                  data: [...(prevState.SuhuAir.datasets[0]?.data || []), sensorData.suhuAir],
                  borderColor: "rgba(255, 99, 132, 1)",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  pointStyle: 'dash',
                  pointBorderColor: 'rgba(255, 99, 132, 1)',
                  pointBackgroundColor: '#fff',
                  fill: true,
                },
              ],
            },
          }));
        }
      }
    });

    return () => client.end();
  }, [activeTab]);

  const renderTable = () => {
    switch (activeTab) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Temperature and Humidity</h2>
            <div className="h-72">
              <Line
                data={graphData.DHT22}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Live Temperature and Humidity",
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">PH Sensor</h2>
            <div className="h-72">
              <Line
                data={graphData.PH}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Live PH Level",
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">LDR Sensor</h2>
            <div className="h-72">
              <Line
                data={graphData.LDR}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Live LDR Value",
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">EC Sensor</h2>
            <div className="h-72">
              <Line
                data={graphData.EC}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Live EC Value",
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Water Temperature</h2>
            <div className="h-72">
              <Line
                data={graphData.SuhuAir}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Live Water Temperature",
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        );
      default:
        return <div>Tab not found.</div>;
    }
  };

  return (
    <div className="p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTable()}
    </div>
  );
};

export default Dashboard;
