const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.TMDB_API_KEY;

app.get('/api/movies', async (req, res) => {
  const { query } = req.query;

  const endpoint = query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;

  try {
    const tmdbRes = await axios.get(endpoint, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    res.json(tmdbRes.data);
  } catch (error) {
    console.error('Error fetching TMDB data:', error.message);
    res.status(500).json({ error: 'TMDB fetch failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));