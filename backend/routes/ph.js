const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/phControllers");
// Definisikan route di sini
router.get("/sensor-ph", sensorController.getAllItems);

// Endpoint untuk menyimpan data dari ESP32 (dihasilkan oleh sensor DHT22)
router.post("/sensor-ph", sensorController.createItem);

// Endpoint untuk menghitung rata-rata suhu dan kelembaban
router.get("/sensor-ph/rata-rata", sensorController.getRatarata);

module.exports = router;
