const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Proxy route to fetch full news articles from NewsAPI (bypass 426)
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

app.get('/api/news', async (req, res) => {
  const category = req.query.category || 'business';
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category,
        apiKey: NEWSAPI_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error('❌ NewsAPI error:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// ✅ Gemini summarizer route
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/summarize-article', async (req, res) => {
  const { text } = req.body;
  console.log('🔍 Received text:', text);

  if (!text) {
    return res.status(400).json({ error: 'No article text provided' });
  }

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: `Summarize this article in 3 bullet points:\n${text}`}],
          },
        ],
      }
    );

    const summary = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ summary });
  } catch (err) {
    console.error('❌ Gemini error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Summarization failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
