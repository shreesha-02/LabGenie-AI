const express = require("express");
const router = express.Router();
const { generateLabManual } = require("../controllers/labController");

// POST /api/lab/generate
router.post("/generate", generateLabManual);

module.exports = router;
