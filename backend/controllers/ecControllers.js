const Item = require("../models/ecModels");

// Endpoint untuk mendapatkan semua data dari tabel sensor EC
exports.getAllItems = (req, res) => {
  Item.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Endpoint untuk mendapatkan rata-rata nilai EC
exports.getRatarata = (req, res) => {
  Item.Ratarata((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Endpoint untuk menyimpan data baru dari sensor EC
exports.createItem = (req, res) => {
  const { tdsValue } = req.body;

  console.log(`[DEBUG] Incoming POST data -> EC: ${tdsValue}`);

  if (!tdsValue) {
    console.error("[ERROR] Missing EC data!");
    return res.status(400).json({ error: "Data tidak lengkap!" });
  }

  const data = { tdsValue };

  // Simpan data ke database
  Item.create(data, (err, results) => {
    if (err) {
      console.error(`[ERROR] Database Insertion Error: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }

    console.log("[DEBUG] Data successfully inserted into database:", results);

    // Kirim response berhasil
    res.status(201).json({
      message: "Data berhasil disimpan",
      id: results.insertId,
    });
  });
};
