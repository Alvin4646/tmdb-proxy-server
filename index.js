const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.TMDB_API_KEY;

app.get("/api/movies", async (req, res) => {
  const { query } = req.query;
  const endpoint = query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;

  try {
    const tmdbRes = await axios.get(endpoint, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    res.json(tmdbRes.data);
  } catch (error) {
    console.error("Error fetching TMDB data:", error.message);
    res.status(500).json({ error: "TMDB fetch failed" });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  const { id } = req.params;
  const endpoint = `https://api.themoviedb.org/3/movie/${id}`;

  try {
    const tmdbRes = await axios.get(endpoint, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    res.json(tmdbRes.data);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
