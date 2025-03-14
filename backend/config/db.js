// config/db.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project_iot",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

module.exports = connection;
