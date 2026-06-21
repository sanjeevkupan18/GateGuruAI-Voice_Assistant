// PATH: server/src/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const {
  handleChat,
  getHistory,
  clearHistory,
} = require("../controllers/chatController");

// Send a message and get AI reply
router.post("/chat", handleChat);

// Get full conversation history by sessionId
router.get("/history/:sessionId", getHistory);

// Clear a conversation
router.delete("/history/:sessionId", clearHistory);

module.exports = router;
