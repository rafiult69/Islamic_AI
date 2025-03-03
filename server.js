// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// OpenRouter API configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || 'your-api-key-here';

// Islamic scholar system prompt
const SYSTEM_PROMPT = `You are a knowledgeable Islamic scholar assistant. Provide authentic answers from Quran and Sahih Hadith. 
Be clear, concise, and compassionate. For fiqh matters, mention different school of thoughts when applicable. 
Always include relevant Quranic verses (in Arabic with translation) and Hadith references. 
Format responses with proper Islamic etiquette and use Islamic terminology.`;

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(OPENROUTER_API_URL, {
      model: 'meta-llama/llama-3-70b-instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: req.body.message }
      ],
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://islamic-scholar-ai.replit.app',
        'X-Title': 'Islamic Scholar AI',
        'Content-Type': 'application/json'
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Could not get response. Please try again.' });
  }
});

// Listen on all interfaces for both development and production
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port} (http://0.0.0.0:${port})`));

// Export the Express API (for serverless environments like Vercel)
module.exports = app;