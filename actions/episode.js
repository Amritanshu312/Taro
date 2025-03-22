"use server";
import { ANIME } from "@consumet/extensions";
import { getMappings } from "./mapping";

const kaianime = new ANIME.AnimeKai();


export const getEpisodes = async (id, title) => {
  if (!id || !title) return [];

  try {
    const mappingID = await getMappings(title);
    if (!mappingID) return [];

    const animeInfo = await kaianime.fetchAnimeInfo(mappingID);
    let episodes = animeInfo?.episodes || [];

    const coverMeta = await fetchEpisodeMeta(id);
    if (coverMeta.length > 0) {
      episodes = await CombineEpisodeMeta(episodes, coverMeta);
    }

    return episodes;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
};

function CombineEpisodeMeta(episodeData, imageData) {
  const episodeImages = {};

  // Map image data by episode number
  imageData.forEach((image) => {
    const episodeNum = image.number || image.episode;
    if (episodeNum) {
      episodeImages[episodeNum] = image;
    }
  });

  // Process each episode
  episodeData.forEach((episode) => {
    const episodeNum = episode.number;
    if (episodeNum in episodeImages) {
      const imageData = episodeImages[episodeNum];

      episode.image = imageData.img || imageData.image || null;
      episode.description = imageData.description || imageData.overview || imageData.summary || '';

      // Handle different title formats
      if (typeof imageData.title === 'object') {
        episode.title = imageData.title.en || imageData.title['x-jat'] || `Episode ${episodeNum}`;
      } else {
        episode.title = imageData.title || `Episode ${episodeNum}`;
      }
    }
  });

  return episodeData;
}
async function fetchEpisodeMeta(id) {
  if (!id) return [];

  try {
    const response = await fetch(`https://api.ani.zip/mappings?anilist_id=${id}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return Object.values(data?.episodes || []);
  } catch (error) {
    console.error("Error fetching episode metadata:", error);
    return [];
  }
}
