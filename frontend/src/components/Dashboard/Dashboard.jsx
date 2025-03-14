import React, { useState } from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";
import Tabs from "./Tabs";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("DHT22");

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <Tabs
        arguments_1="DHT22"
        arguments_2="PH"
        arguments_3="EC"
        arguments_4="Cahaya"
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <Grid activeTab={activeTab} />
    </div>
  );
}

export default Dashboard;
