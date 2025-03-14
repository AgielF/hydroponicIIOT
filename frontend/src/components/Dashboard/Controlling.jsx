import React, { useState } from "react";
import mqtt from "mqtt";
import {WS_URL} from '../../config/config'


const Controlling = () => {
  const [activeTab, setActiveTab] = useState(1);

  // 🔌 Connect to HiveMQ Cloud
  const client = mqtt.connect(WS_URL, {
    username: "plantsociety",
    password: "Timhura2025",
  });

  // ✅ Log connection status
  client.on("connect", () => {
    console.log("✅ Connected to HiveMQ Cloud!");
  });

  client.on("error", (err) => {
    console.error("❌ Connection error:", err);
  });

  // 📡 Handle control for relay
  const handleControl = (relayTopic, action) => {
    // 📨 Send the message as "ON" or "OFF" directly
    client.publish(relayTopic, action, (err) => {
      if (err) {
        console.error("❌ Failed to send message:", err);
        alert("Failed to send the request.");
      } else {
        console.log(`📡 Sent message to ${relayTopic}: ${action}`);
        alert(`Relay ${relayTopic} turned ${action}!`);
      }
    });
  };

  // 📋 Tabs Komponen
  const Tabs = ({ tabLabels }) => (
    <div>
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={activeTab}
          onChange={(e) => setActiveTab(Number(e.target.value))}
        >
          {tabLabels.map((label, index) => (
            <option key={index} value={index + 1}>{label}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {tabLabels.map((label, index) => (
              <a
                key={index}
                href="#"
                className={`shrink-0 border-b-2 ${
                  activeTab === index + 1
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } px-1 pb-4 text-sm font-medium`}
                onClick={() => setActiveTab(index + 1)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  // 🖲️ Button Control
  const ButtonControlling = ({ relayTopic }) => (
    <div className="mt-4 flex gap-4">
      <button
        className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
        onClick={() => handleControl(relayTopic, "ON")}
      >
        ON
      </button>

      <button
        className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
        onClick={() => handleControl(relayTopic, "OFF")}
      >
        OFF
      </button>
    </div>
  );

  // 🔧 Render Utama
  return (
    <div>
      <Tabs tabLabels={["Relay Pompa 1", "Relay Pompa 2", "Relay Pompa 3", "Relay Pompa 4"]} />
      <div className="mt-4">
        {activeTab === 1 && (
          <div>
            <h2 className="text-lg font-semibold">Control for Relay Pompa 1</h2>
            <ButtonControlling relayTopic="hidroponik/relay1" />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2 className="text-lg font-semibold">Control for Relay Pompa 2</h2>
            <ButtonControlling relayTopic="hidroponik/relay2" />
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2 className="text-lg font-semibold">Control for Relay Pompa 3</h2>
            <ButtonControlling relayTopic="hidroponik/relay3" />
          </div>
        )}
        {activeTab === 4 && (
          <div>
            <h2 className="text-lg font-semibold">Control for Relay Pompa 4</h2>
            <ButtonControlling relayTopic="hidroponik/relay4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Controlling;
