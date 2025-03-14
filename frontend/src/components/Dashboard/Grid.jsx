import React from "react";
import ActivityGraph from "./ActivityGraph";

export const Grid = ({ activeTab }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <ActivityGraph activeTab={activeTab} />
    </div>
  );
};
