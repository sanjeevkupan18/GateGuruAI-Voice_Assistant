// PATH: server/src/controllers/chatController.js
const Groq = require("groq-sdk");
const { getSystemPrompt } = require("../prompts/systemPrompt");
const Conversation = require("../models/conversation");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// POST /api/chat
const handleChat = async (req, res, next) => {
  const { userMessage, sessionId, branch = "CSE" } = req.body;

  if (!userMessage || !userMessage.trim()) {
    return res.status(400).json({ error: "userMessage is required" });
  }
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    // Load or create conversation from DB
    let conversation = await Conversation.findOne({ sessionId });
    if (!conversation) {
      conversation = new Conversation({ sessionId, branch, messages: [] });
    }

    // Update branch if it changed
    if (conversation.branch !== branch) {
      conversation.branch = branch;
    }

    // Build last 6 messages as context (3 turns)
    const recentHistory = conversation.messages.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Build the messages array for Groq
    const groqMessages = [
      { role: "system", content: getSystemPrompt(branch) },
      ...recentHistory,
      { role: "user", content: userMessage.trim() },
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: groqMessages,
      max_tokens: 300,
      temperature: 0.65,
      top_p: 0.9,
    });

    const aiReply = completion.choices[0]?.message?.content;
    if (!aiReply) {
      return res.status(500).json({ error: "Empty response from AI" });
    }

    // Save both turns to MongoDB
    conversation.messages.push({ role: "user", content: userMessage.trim() });
    conversation.messages.push({ role: "assistant", content: aiReply });
    await conversation.save();

    return res.status(200).json({
      reply: aiReply,
      sessionId,
      branch,
      messageCount: conversation.messages.length,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/history/:sessionId
const getHistory = async (req, res, next) => {
  const { sessionId } = req.params;
  try {
    const conversation = await Conversation.findOne({ sessionId });
    if (!conversation) {
      return res.status(200).json({
        sessionId,
        branch: "CSE",
        messages: [],
        createdAt: null,
      });
    }
    return res.status(200).json({
      sessionId,
      branch: conversation.branch,
      messages: conversation.messages,
      createdAt: conversation.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/history/:sessionId
const clearHistory = async (req, res, next) => {
  const { sessionId } = req.params;
  try {
    await Conversation.findOneAndDelete({ sessionId });
    return res.status(200).json({ message: "Conversation cleared", sessionId });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleChat, getHistory, clearHistory };
