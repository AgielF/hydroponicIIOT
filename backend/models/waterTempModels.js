// models/item.js
const db = require("../config/db");

const Item = {
  getAll: (callback) => {
    db.query("SELECT * FROM sensor_suhuair", callback);
  },
  //   create: (data, callback) => {
  //     db.query("INSERT INTO dht_22 SET ?", data, callback);
  //   },
  // Tambahkan fungsi lain sesuai kebutuhan
};

module.exports = Item;
