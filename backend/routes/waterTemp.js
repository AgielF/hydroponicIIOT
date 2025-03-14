const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/waterTempControllers");
// Definisikan route di sini
router.get("/sensor-waterTemp", sensorController.getAllItems);

module.exports = router;
