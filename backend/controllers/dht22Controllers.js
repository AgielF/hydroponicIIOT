const Item = require("../models/dht22Models");

// Fungsi untuk memastikan response JSON
const sendJsonResponse = (res, data) => {
  res.setHeader("Content-Type", "application/json");
  res.json(data);
};

// Endpoint untuk mendapatkan semua data
exports.getAllItems = (req, res) => {
  Item.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    sendJsonResponse(res, results);
  });
};

// Endpoint untuk mendapatkan rata-rata data
exports.getRatarata = (req, res) => {
  Item.Ratarata((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    sendJsonResponse(res, results);
  });
};

// Endpoint untuk mendapatkan data terbaru
exports.getLatestItem = (req, res) => {
  Item.getLatest((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    sendJsonResponse(res, results);
  });
};

// Endpoint untuk membuat data baru
exports.createItem = (req, res) => {
  const { suhuUdara, kelembabanUdara } = req.body;

  if (!suhuUdara || !kelembabanUdara) {
    return res.status(400).json({ error: "Data tidak lengkap!" });
  }

  const data = { suhuUdara, kelembabanUdara };

  Item.create(data, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    sendJsonResponse(res, {
      message: "Data berhasil disimpan",
      id: results.insertId,
    });
  });
};
