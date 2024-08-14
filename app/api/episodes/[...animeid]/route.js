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
    return response.data;
  } catch (error) {
    console.error(`Error fetching episodes for ${animeID} (dub: ${isDub}):`, error.message);
    return [];
  }
};

// Fetch and organize data with Redis caching
const fetchData = async (animeId, refresh, cacheTime) => {
  try {
    // Create a unique cache key using anime ID, dub/sub status, and potentially other identifiers
    const dubCacheKey = `anime:${animeId}:dub:episodes`;
    const subCacheKey = `anime:${animeId}:sub:episodes`;

    // Check if the data is already cached
    if (!refresh) {
      const cachedDub = await redis.get(dubCacheKey);
      const cachedSub = await redis.get(subCacheKey);

      if (cachedDub && cachedSub) {
        // Reset the cache expiration time
        await redis.expire(dubCacheKey, cacheTime);
        await redis.expire(subCacheKey, cacheTime);

        return {
          animeId,
          dub: JSON.parse(cachedDub),
          sub: JSON.parse(cachedSub)
        };
      }
    }

    // Fetch data from external API if not cached
    const [dubEpisodes, subEpisodes] = await Promise.all([
      fetchEpisodes(animeId, true),
      fetchEpisodes(animeId, false),
    ]);

    const data = { animeId, dub: dubEpisodes, sub: subEpisodes };

    // Cache the data in Redis with an expiration time
    await redis.set(dubCacheKey, JSON.stringify(dubEpisodes), 'EX', cacheTime);
    await redis.set(subCacheKey, JSON.stringify(subEpisodes), 'EX', cacheTime);


    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { error: 'Failed to fetch data. Please try again later.' };
  }
};

export const GET = async (req, { params }) => {
  try {
    const animeId = params.animeid[0];
    const url = new URL(req.url);
    const refresh = url.searchParams.get('refresh') === 'true' || false;
    const releasing = url.searchParams.get('releasing') || false;

    let cacheTime = null;
    if (releasing === "true") {
      cacheTime = 60 * 60 * 3; // 3 hours for releasing anime
    } else if (releasing === "false") {
      cacheTime = 60 * 60 * 24 * 45; // 45 days for completed anime
    } else {
      cacheTime = 60 * 60 * 24; // Default cache time, e.g., 24 hours, to avoid null or undefined values
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
