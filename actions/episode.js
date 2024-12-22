"use server";
import { ANIME } from "@consumet/extensions";
import { CombineEpisodeMeta } from "../utils/EpisodeFunctions";
import { getMappings } from "./mapping";

const gogo = new ANIME.Gogoanime();
const zoro = new ANIME.Zoro();

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

export const getEpisodes = async (id) => {
  const fetchdata = await fetchData(id);
  return fetchdata;
};

