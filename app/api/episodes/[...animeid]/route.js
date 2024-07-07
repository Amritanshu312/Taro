import axios from 'axios';
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Create a Redis client
const redis = new Redis({
  host: process.env.NEXT_REDIS_HOST, // Redis server hostname
  port: process.env.NEXT_REDIS_PORT, // Redis server port
  password: process.env.NEXT_REDIS_PASSWORD, // Optional, if your Redis server requires a password
});

// Set a global timeout for Axios requests
axios.interceptors.request.use(config => {
  config.timeout = 15000; // Reduced timeout to 15 seconds for faster failure
  return config;
});

// Fetch episodes data from the external API
const fetchEpisodes = async (episodeId, isDub, provider) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/episodes/${episodeId}?dub=${isDub}${provider ? `&provider=${provider}` : ""}`
    );
    if (response.data?.message === "Anime not found" || response.data?.length < 1) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching episodes for ${episodeId} (dub: ${isDub}):`, error.message);
    return [];
  }
};

// Fetch and cache data
const fetchAndCacheData = async (animeId, provider) => {
  const cacheKey = `episodes/${animeId}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (provider === parsedData?.provider) {
        return parsedData;
      }
    }

    const [dubEP, subEP] = await Promise.all([
      fetchEpisodes(animeId, true, provider),
      fetchEpisodes(animeId, false, provider),
    ]);

    const initialData = { animeId, provider, dub: dubEP, sub: subEP };
    await redis.set(cacheKey, JSON.stringify(initialData), 'EX', 9000); // Set cache expiration to 9000 seconds

    return initialData;
  } catch (error) {
    console.error('Error fetching or caching data:', error.message);
    return { error: 'Failed to fetch data. Please try again later.' };
  }
};

export const GET = async (req, { params }) => {
  try {
    const url = new URL(req.url);
    const animeId = params.animeid[0];
    const provider = url.searchParams.get('provider') || "gogoanime";

    const data = await fetchAndCacheData(animeId, provider);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing GET request:', error.message);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
};
