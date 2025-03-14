import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTemperatureHigh } from "react-icons/fa6";
import { getData } from "../../services/apiService";
import Tabs from "./Tabs";

export const RecentTransactions = () => {
  const [sensorData, setSensorData] = useState([]);
  const [activeTab, setActiveTab] = useState("kelembapan"); // Tab default

  const fetchEndpoint = (tab) => {
    switch (tab) {
      case "kelembapan":
        return "/sensor-dht22";
      case "PH":
        return "/sensor-ph";
      case "EC":
        return "/sensor-ec";
      case "Cahaya":
        return "/sensor-ldr";
      default:
        return "/sensor-dht22";
    }
  };

  const mapData = (data, tab) => {
    switch (tab) {
      case "kelembapan":
        return data.map((row) => ({
          id: row.ID_dht22,
          description: `${row.temp}°C`,
          date: new Date(row.timestamp).toLocaleDateString(),
          additionalInfo: `${row.humid}%`,
        }));
      case "PH":
        return data.map((row) => ({
          id: row.ID_ph,
          description: `${row.ph_value}`,
          date: new Date(row.timestamp).toLocaleDateString(),
          additionalInfo: `${row.status || "N/A"}`,
        }));
      case "EC":
        return data.map((row) => ({
          id: row.ID_sensorEC,
          description: `${row.ec_value}`,
          date: new Date(row.timestamp).toLocaleDateString(),
          additionalInfo: `${row.salinity || "N/A"}`,
        }));
      case "Cahaya":
        return data.map((row) => ({
          id: row.ID_ldr,
          description: `${row.ldr_value}`,
          date: new Date(row.timestamp).toLocaleDateString(),
          additionalInfo: `${row.intensity || "N/A"}`,
        }));
      default:
        return [];
    }
  };

  const getHeaders = (tab) => {
    switch (tab) {
      case "kelembapan":
        return ["ID DHT22", "Suhu", "Tanggal", "Kelembapan"];
      case "PH":
        return ["ID PH", "Tingkat PH", "Tanggal", "Status"];
      case "EC":
        return ["ID EC", "Nilai EC", "Tanggal", "Salinitas"];
      case "Cahaya":
        return ["ID LDR", "Tingkat Kecerahan", "Tanggal", "Intensitas Cahaya"];
      default:
        return ["ID", "Deskripsi", "Tanggal", "Info Tambahan"];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = fetchEndpoint(activeTab);
        const result = await getData(endpoint);
        const mappedData = mapData(result, activeTab);
        setSensorData(mappedData);
      } catch (error) {
        console.error("Error loading sensor data:", error);
      }
    };

    fetchData();
  }, [activeTab]);

  const headers = getHeaders(activeTab);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FaTemperatureHigh /> Histori Data
        </h3>
        <button className="text-sm text-violet-500 hover:underline">
          See all
        </button>
      </div>
      <div>
        <Tabs
          arguments_1="kelembapan"
          arguments_2="PH"
          arguments_3="EC"
          arguments_4="Cahaya"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <table className="w-full table-auto">
        <TableHead headers={headers} />
        <tbody>
          {sensorData.map((row, index) => (
            <TableRow
              key={row.id}
              cusId={row.id}
              sku={row.description}
              date={row.date}
              price={row.additionalInfo}
              order={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        {headers.map((header, index) => (
          <th key={index} className="text-start p-1.5">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRow = ({ cusId, sku, date, price, order }) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a href="#" className="text-violet-600 underline flex items-center gap-1">
          {cusId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
    </tr>
  );
};

export default RecentTransactions;
