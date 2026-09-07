const express = require("express");
const router = express.Router();
const { askAssistant } = require("../controllers/assistantController");

// POST /api/assistant/ask
router.post("/ask", askAssistant);

module.exports = router;
