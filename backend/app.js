const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming Request -> ${req.method} ${req.url}`);
  console.log(`[DEBUG] Body:`, req.body);
  res.setHeader("Content-Type", "application/json");
  next();
});

// Import routes dynamically from the "routes" folder
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(`./routes/${file}`);
  app.use("/api", route);
});

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
