import React from "react";

export const TopBar = () => {
  // Simulasi data statis, jika API tidak digunakan
  const sensorData = {
    month_year_max: [{ month_year: "November 2024" }],
  };

  // Ambil nilai `month_year_max` untuk ditampilkan
  const monthYear = sensorData?.month_year_max?.[0]?.month_year || "No Data";

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        {/* Konten kiri */}
        <div>
          <span className="text-sm font-bold block">🚀 Good morning!</span>
          <span className="text-xs block text-stone-500">
            {/* Data tambahan jika diperlukan */}
            Welcome back to your dashboard.
          </span>
        </div>

        {/* Tombol dengan data dinamis */}
        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <span>{monthYear}</span>
        </button>
      </div>
    </div>
  );
};
