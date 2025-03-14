import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import Tabs from "./Tabs"; // Pastikan import sesuai dengan lokasi Tabs

const UsageRadar = () => {
  const [dht22Data, setDht22Data] = useState([]);
  const [ecData, setEcData] = useState([]);
  const [ldrData, setLdrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("DHT22"); // Tab default

  // Fetch data from REST API
  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setter(data.cluster);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData("http://127.0.0.1:8000/analysis/cluster/cluster-dht22", setDht22Data),
        fetchData("http://127.0.0.1:8000/analysis/cluster/cluster-ec", setEcData),
        fetchData("http://127.0.0.1:8000/analysis/cluster/cluster-ldr", setLdrData),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  // Data berdasarkan tab aktif
  const getDataByTab = () => {
    switch (activeTab) {
      case "DHT22":
        return dht22Data.map((item) => ({
          cluster: item.cluster,
          value: item.temp,
          group_name: item.group_name,
        }));
      case "EC":
        return ecData.map((item) => ({
          cluster: item.cluster,
          value: item.ec_value,
          group_name: item.group_name,
        }));
      case "LDR":
        return ldrData.map((item) => ({
          cluster: item.cluster,
          value: item.ldr_value,
          group_name: item.group_name,
        }));
      default:
        return [];
    }
  };

  const activeData = getDataByTab();

  return (
    <div>

      <h2>Sensor Cluster Visualization</h2>
      <Tabs
        arguments_1="DHT22"
        arguments_2="EC"
        arguments_3="LDR"
        arguments_4="Combined"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Render berdasarkan tab aktif */}
      {activeTab === "Combined" ? (
        <>
          <h3>Combined Data Visualization</h3>
          <BarChart width={600} height={300} data={[...dht22Data, ...ecData, ...ldrData]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </>
      ) : (
        <>
          <h3>{activeTab} Data Visualization</h3>
          {/* Bar Chart */}
          <BarChart width={600} height={300} data={activeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>

          {/* Radar Chart */}
          {/* <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={activeData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="cluster" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar
              name={`${activeTab} Data`}
              dataKey="value"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
          </RadarChart> */}
        </>
      )}
    </div>
  );
};

export default UsageRadar;
