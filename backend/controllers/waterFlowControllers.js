// controllers/itemController.js
const Item = require("../models/waterFlowModels");

exports.getAllItems = (req, res) => {
  Item.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// exports.createItem = (req, res) => {
//   const data = req.body;
//   Item.create(data, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.status(201).json({ message: "Item created", id: results.insertId });
//   });

// };
