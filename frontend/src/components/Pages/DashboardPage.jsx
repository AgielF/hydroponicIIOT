import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar"; // Import Sidebar
import Dashboard from "../Dashboard/Dashboard";
import { RecentTransactions } from "../Dashboard/RecentTransactions";
import MainComponents from '../Dashboard/StatCards';
import RealTimeSensor from '../Dashboard/RealTimeSensor';
import RelayControl from '../Dashboard/Controlling';
import UsageRadar from '../Dashboard/UsageRadar';
import ForecastChart from '../Dashboard/PredictDataa'

const DashboardPage = () => {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  // Fungsi untuk merender komponen berdasarkan rute yang aktif
  const renderActiveComponent = () => {
    switch (activeRoute) {
      case "Dashboard":
        return <Dashboard />;
      case "History":
        return <RecentTransactions />;
      case "Rata-rata sensor":
        return <MainComponents/>; // Placeholder
      case "RealTime sensor":
        return <RealTimeSensor/>; // Placeholder
      case "Controling":
        return <RelayControl/>; // Placeholders
      case "Analytics Data":
        return <UsageRadar/>;
        case "Predict Data":
          return <ForecastChart/>;
  
      default:
        return <div>asas</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Content Area */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[220px] bg-stone-100 p-4">
          <Sidebar onSelectRoute={setActiveRoute} /> {/* Kirim prop ke Sidebar */}
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-4">{renderActiveComponent()}</section>
      </main>
    </div>
  );
};

export default DashboardPage;
