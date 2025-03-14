const db = require("../config/db");

const Item = {
  // Mendapatkan semua data dari tabel
  getAll: (callback) => {
    db.query("SELECT * FROM dht_22", callback);
  },

  // Menyimpan data ke tabel
  create: (data, callback) => {
    const query = "INSERT INTO dht_22 (temp, humid, timestamp) VALUES (?, ?, ?)";
    db.query(query, [data.suhuUdara, data.kelembabanUdara, new Date()], callback);
  },

  // Mendapatkan data terbaru berdasarkan timestamp
  getLatest: (callback) => {
    db.query("SELECT * FROM dht_22 ORDER BY timestamp DESC LIMIT 1", callback);
  },

  // Menghitung rata-rata suhu dan kelembaban
  Ratarata: (callback) => {
    const query = `
      SELECT 
        AVG(temp) AS avg_temp, 
        AVG(humid) AS avg_humid 
      FROM dht_22
    `;
    db.query(query, callback);
  },

  // Menghitung rata-rata suhu dan kelembaban dalam 10 menit terakhir
  Ratarata_10_menits: (callback) => {
    const query = `
      SELECT 
        AVG(temp) AS avg_temp, 
        AVG(humid) AS avg_humid 
      FROM dht_22
      WHERE timestamp >= NOW() - INTERVAL 10 MINUTE
    `;
    db.query(query, callback);
  },
};

module.exports = Item;
