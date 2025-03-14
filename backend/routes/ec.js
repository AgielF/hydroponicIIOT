const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/ecControllers");

// Endpoint untuk mendapatkan data semua sensor
router.get("/sensor-ec", sensorController.getAllItems);

// Endpoint untuk menyimpan data dari ESP32 (dihasilkan oleh sensor DHT22)
router.post("/sensor-ec", sensorController.createItem);

// Endpoint untuk menghitung rata-rata suhu dan kelembaban
router.get("/sensor-ec/rata-rata", sensorController.getRatarata);

module.exports = router;
