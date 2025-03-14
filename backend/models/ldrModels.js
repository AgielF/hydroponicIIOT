const db = require("../config/db");

const Item = {
  // Fungsi untuk mendapatkan semua data dari tabel sensor_ldr
  getAll: (callback) => {
    db.query("SELECT * FROM sensor_ldr", callback);
  },

  // Fungsi untuk menyimpan data baru ke tabel sensor_ldr
  create: (data, callback) => {
    const query = "INSERT INTO sensor_ldr (ldr_value, timestamp) VALUES (?, ?)";
    db.query(query, [data.ldrValue, new Date()], callback);
  },

  // Fungsi untuk mendapatkan data terbaru dari tabel sensor_ldr
  getLatest: (callback) => {
    db.query("SELECT * FROM sensor_ldr ORDER BY timestamp DESC LIMIT 1", callback);
  },

  // Fungsi untuk menghitung rata-rata nilai LDR
  Ratarata: (callback) => {
    const query = `
      SELECT 
        AVG(ldr_value) AS avg_ldr_value
      FROM sensor_ldr
    `;
    db.query(query, callback);
  },
};

module.exports = Item;
