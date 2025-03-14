const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/waterLevelControllers");
// Definisikan route di sini
router.get("/sensor-waterLevel", sensorController.getAllItems);

module.exports = router;
