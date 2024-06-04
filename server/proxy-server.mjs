import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY'; // Replace with your API key

app.use(cors());

app.get('/news', async (req, res) => {
    const query = req.query.q;
    const url = `${NEWS_API_URL}?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data.articles);
    } catch (error) {
        console.error('Error fetching news articles:', error);
        res.status(500).json({ error: 'Failed to fetch news articles' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
