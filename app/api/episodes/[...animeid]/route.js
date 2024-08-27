import axios from 'axios';
import { Redis } from 'ioredis';
import { NextResponse } from 'next/server';

// Create a Redis client
const redis = new Redis({
  host: process.env.NEXT_REDIS_HOST, // Redis server hostname
  port: process.env.NEXT_REDIS_PORT, // Redis server port
  password: process.env.NEXT_REDIS_PASSWORD, // Optional, if your Redis server requires a password
});

// Set a global timeout for Axios requests if not already set
axios.interceptors.request.use(config => {
  if (!config.timeout) {
    config.timeout = 15000; // Set timeout to 15 seconds for faster failure
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Validate environment variables
const BASE_URL = process.env.NEXT_PUBLIC_CONSUMET_URL;
if (!BASE_URL) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_CONSUMET_URL");
}

// Fetch episodes data from the external API
const fetchEpisodes = async (animeID, isDub) => {
  try {
    const response = await axios.get(`${BASE_URL}/meta/anilist/episodes/${animeID}${isDub ? "?dub=true" : ""}`);
    if (response.data?.message === "Anime not found" || response.data?.length === 0) {
      return [];
    }

    // Add dub or sub flag to each episode
    return response.data.map(episode => ({
      ...episode,
      isDub,
    }));
  } catch (error) {
    console.error(`Error fetching episodes for ${animeID} (dub: ${isDub}):`, error.message);
    return [];
  }
};

// Fetch and organize data with Redis caching
const fetchData = async (animeId, refresh, cacheTime) => {
  try {
    // Create a unique cache key using anime ID and potentially other identifiers
    const cacheKey = `anime:${animeId}:episodes`;

    // Fetch new data if refresh is true or if cache is empty (data has expired)
    if (refresh) {
      console.log(`Refresh triggered for animeId: ${animeId}, fetching new data.`);
    }

    // Fetch data from Redis
    const cachedData = await redis.get(cacheKey);

    if (!refresh && cachedData) {
      // Reset the cache expiration time to the provided cacheTime if data is found
      await redis.expire(cacheKey, cacheTime);
      return JSON.parse(cachedData);
    }

    // If no cached data or refresh is true, fetch new data from external API
    const [dubEpisodes, subEpisodes] = await Promise.all([
      fetchEpisodes(animeId, true),
      fetchEpisodes(animeId, false),
    ]);

    // Combine dub and sub episodes into one list
    const episodes = { dub: dubEpisodes, sub: subEpisodes };

    // Cache the new data in Redis with the provided cacheTime
    await redis.set(cacheKey, JSON.stringify(episodes), 'EX', cacheTime);

    return episodes;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { error: 'Failed to fetch data. Please try again later.' };
  }
};

export const GET = async (req, { params }) => {
  try {
    const animeId = params.animeid[0];
    const url = new URL(req.url);
    const refresh = url.searchParams.get('refresh') === 'true';
    const releasing = url.searchParams.get('releasing') || false;

    let cacheTime;
    if (releasing === "true") {
      cacheTime = 60 * 60 * 3; // 3 hours for releasing anime
    } else if (releasing === "false") {
      cacheTime = 60 * 60 * 24 * 45; // 45 days for completed anime
    } else {
      cacheTime = 60 * 60 * 24; // Default cache time, e.g., 24 hours
    }

    // Ensure cacheTime is an integer
    cacheTime = parseInt(cacheTime, 10);

    if (!animeId) {
      return NextResponse.json({ error: 'Anime ID is required.' }, { status: 400 });
    }

    const data = await fetchData(animeId, refresh, cacheTime);

    if (data.error) {
      return NextResponse.json(data, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing GET request:', error.message);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
};
