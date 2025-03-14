const db = require("../config/db");

const Item = {
  getAll: (callback) => {
    db.query("SELECT * FROM sensor_ph", callback);
  },
  create: (data, callback) => {
    const query = "INSERT INTO sensor_ph (ph_value, timestamp) VALUES ( ?, ?)";
    db.query(query, [data.phValue, new Date()], callback);
  },
  // Mengambil data terbaru berdasarkan timestamp
  getLatest: (callback) => {
    db.query("SELECT * FROM sensor_ph ORDER BY timestamp DESC LIMIT 1", callback);
  },
  // Menghitung rata-rata suhu dan kelembaban
  Ratarata: (callback) => {
    const query = `
    SELECT 
      AVG(ph_value) AS avg_ph_value
    FROM sensor_ldr
  `;
    db.query(query, callback);
  },
};

module.exports = Item;
