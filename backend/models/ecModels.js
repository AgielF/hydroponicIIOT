const db = require("../config/db");

const Item = {
  // Fungsi untuk mendapatkan semua data dari tabel sensor_ec
  getAll: (callback) => {
    db.query("SELECT * FROM sensor_ec", callback);
  },

  // Fungsi untuk menyimpan data baru ke tabel sensor_ec
  create: (data, callback) => {
    const query = "INSERT INTO sensor_ec (ec_value, timestamp) VALUES (?, ?)";
    db.query(query, [data.tdsValue, new Date()], callback);
  },

  // Fungsi untuk mendapatkan data terbaru dari tabel sensor_ec
  getLatest: (callback) => {
    db.query("SELECT * FROM sensor_ec ORDER BY timestamp DESC LIMIT 1", callback);
  },

  // Fungsi untuk menghitung rata-rata nilai EC
  Ratarata: (callback) => {
    const query = `
      SELECT 
        AVG(ec_value) AS avg_ec
      FROM sensor_ec
    `;
    db.query(query, callback);
  },
};

module.exports = Item;
