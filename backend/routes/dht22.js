const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/dht22Controllers");

// Endpoint untuk mendapatkan data semua sensor
router.get("/sensor-dht22", sensorController.getAllItems);

// Endpoint untuk menyimpan data dari ESP32 (dihasilkan oleh sensor DHT22)
router.post("/sensor-dht22", sensorController.createItem);

// Endpoint untuk menghitung rata-rata suhu dan kelembaban
router.get("/sensor-dht22/rata-rata", sensorController.getRatarata);

module.exports = router;
