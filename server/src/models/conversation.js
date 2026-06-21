// PATH: server/src/models/conversation.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    branch: {
      type: String,
      enum: ["CSE", "ECE", "ME", "CE", "EE", "IN"],
      default: "CSE",
    },
    messages: [messageSchema],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

module.exports = mongoose.model("Conversation", conversationSchema);
