require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const healthRouter    = require("./routes/health");
const labRouter       = require("./routes/lab");
const assistantRouter = require("./routes/assistant");

app.use("/api/health",    healthRouter);
app.use("/api/lab",       labRouter);
app.use("/api/assistant", assistantRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`LabGenie AI backend running on http://localhost:${PORT}`);
});

module.exports = app;
