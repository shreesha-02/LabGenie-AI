const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "LabGenie AI Backend",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
