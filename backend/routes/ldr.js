const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/ldrControllers");

// Endpoint untuk mendapatkan data semua sensor
router.get("/sensor-ldr", sensorController.getAllItems);

// Endpoint untuk menyimpan data dari ESP32 (dihasilkan oleh sensor DHT22)
router.post("/sensor-ldr", sensorController.createItem);

// Endpoint untuk menghitung rata-rata suhu dan kelembaban
router.get("/sensor-ldr/rata-rata", sensorController.getRatarata);

module.exports = router;
