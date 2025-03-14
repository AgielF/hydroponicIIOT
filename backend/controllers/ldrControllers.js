const Item = require("../models/ldrModels");

// Endpoint untuk mendapatkan semua data dari tabel sensor LDR
exports.getAllItems = (req, res) => {
  Item.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Endpoint untuk mendapatkan rata-rata nilai LDR
exports.getRatarata = (req, res) => {
  Item.Ratarata((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Endpoint untuk menyimpan data baru dari sensor LDR
exports.createItem = (req, res) => {
  const { ldrValue } = req.body;

  console.log(`[DEBUG] Incoming POST data -> LDR: ${ldrValue}`);

  if (!ldrValue) {
    console.error("[ERROR] Missing LDR data!");
    return res.status(400).json({ error: "Data tidak lengkap!" });
  }

  const data = { ldrValue };

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
