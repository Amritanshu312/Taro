"use server";
import { ANIME } from "@consumet/extensions";
import { CombineEpisodeMeta } from "../utils/EpisodeFunctions";
import { getMappings } from "./mapping";
import Redis from "ioredis";

const gogo = new ANIME.Gogoanime();
const zoro = new ANIME.Zoro();
const redis = new Redis({
  host: process.env.NEXT_REDIS_HOST,
  port: process.env.NEXT_REDIS_PORT,
  password: process.env.NEXT_REDIS_PASSWORD,
});

export async function fetchGogoEpisodes(id) {
  try {
    const data = await gogo.fetchAnimeInfo(id);
    return data?.episodes || [];
  } catch (error) {
    console.error("Error fetching gogoanime:", error.message);
    return [];
  }
}

export async function fetchZoroEpisodes(id) {
  try {
    const data = await zoro.fetchAnimeInfo(id);
    return data?.episodes || [];
  } catch (error) {
    console.error("Error fetching zoro:", error.message);
    return [];
  }
}

async function fetchEpisodeMeta(id) {
  try {
    const res = await fetch(
      `https://api.ani.zip/mappings?anilist_id=${id}`
    );
    const data = await res.json();
    const episodesArray = Object.values(data?.episodes);

    if (!episodesArray) {
      return [];
    }
    return episodesArray;
  } catch (error) {
    console.error("Error fetching and processing meta:", error.message);
    return [];
  }
}

const fetchData = async (id) => {
  let mappings;
  let subEpisodes = [];
  let dubEpisodes = [];
  let allepisodes = [];

  if (id) {
    mappings = await getMappings(id);
  }

  if (mappings && mappings.gogoanime && Object.keys(mappings.gogoanime).length >= 1) {
    // Fetch sub episodes if available
    if (
      mappings?.gogoanime?.uncensored ||
      mappings?.gogoanime?.sub ||
      mappings?.gogoanime?.tv
    ) {
      subEpisodes = await fetchGogoEpisodes(
        mappings?.gogoanime?.uncensored ||
        mappings.gogoanime.sub ||
        mappings?.gogoanime?.tv
      );
    }

    // Fetch dub episodes if available
    if (mappings?.gogoanime?.dub) {
      dubEpisodes = await fetchGogoEpisodes(mappings?.gogoanime?.dub);
    }

    if (subEpisodes?.length > 0 || dubEpisodes?.length > 0) {
      allepisodes.push({
        episodes: { sub: subEpisodes, dub: dubEpisodes },
        providerId: "gogoanime",
        consumet: true,
      });
    }

  }

  const cover = await fetchEpisodeMeta(id)

  let data = allepisodes;
  if (cover && cover?.length > 0) {
    data = await CombineEpisodeMeta(allepisodes, cover);
  }

  return data;
};

export const getEpisodes = async (id, cachePeriod = 3600, cacheTTL = 120) => {
  const cacheKey = `episodes:${id}`;

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // Reset TTL on access
      await redis.expire(cacheKey, cacheTTL);
      return JSON.parse(cachedData);
    }

    const fetchedData = await fetchData(id);

    // Set initial cache with primary expiration (cachePeriod)
    await redis.set(cacheKey, JSON.stringify(fetchedData), {
      EX: cachePeriod,  // Primary expiry (3600s default)
      NX: true         // Only set if key doesn't exist
    });

    // Set shorter TTL if not accessed
    await redis.expire(cacheKey, cacheTTL);  // Secondary expiry (120s default)

    return fetchedData;
  } catch (error) {
    console.error('Redis error:', error);
    return fetchData(id);
  }
};