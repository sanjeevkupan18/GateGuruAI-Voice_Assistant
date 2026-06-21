// PATH: server/src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Groq API errors
  if (err?.status === 429) {
    return res.status(429).json({
      error: "AI rate limit reached. Please wait a moment and try again.",
    });
  }
  if (err?.status === 401) {
    return res.status(401).json({
      error: "Invalid Groq API key. Check your .env file.",
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  // Generic fallback
  return res.status(500).json({
    error: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
