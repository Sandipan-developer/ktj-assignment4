const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express(); // ✅ THIS must be before app.use / app.post
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/summarize-article", async (req, res) => {
  const { text } = req.body;
  console.log("🔍 Received text:", text);

  if (!text) {
    return res.status(400).json({ error: "No article text provided" });
  }

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: `Summarize this article in 3 bullet points:\n${text}` },
            ],
          },
        ],
      }
    );
    

    const summary = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("✅ Summary generated:", summary);

    res.json({ summary });
  } catch (err) {
    console.error("❌ Gemini error:", err.response?.data || err.message);
    res.status(500).json({ error: "Summarization failed." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
