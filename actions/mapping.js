"use server"
import { ANIME } from "@consumet/extensions";
import { AnimeInfoAnilist } from '../lib/Anilistfunction';
import { findSimilarTitles } from '../lib/stringSimilarity';


const gogo = new ANIME.Gogoanime();
const hianime = new ANIME.Zoro();

export async function getMappings(anilistId, includeZoroAndExcludeGogo = false) {
  const data = await getInfo(anilistId);
  let gogores, zorores;
  if (!data) {
    return null;
  }
  gogores = await (!includeZoroAndExcludeGogo ? mapGogo(data?.title) : null);
  zorores = await (includeZoroAndExcludeGogo ? mapZoro(data?.title) : null);
  return { gogoanime: gogores, zoro: zorores, id: data?.id, malId: data?.idMal, title: data?.title.romaji };
}

async function getInfo(id) {
  try {
    let cachedData;

    if (cachedData) {
      // console.log("using cached info")
      return JSON.parse(cachedData);
    } else {
      const data = await AnimeInfoAnilist(id);

      return data;
    }
  } catch (error) {
    console.error("Error fetching info: ", error);
  }
}
async function mapGogo(title) {
  let eng = await gogo.search(title?.english || title?.userPreferred);
  let rom = await gogo.search(title?.romaji);
  let english_search = eng?.results || [];
  let romaji_search = rom?.results || [];
  // Combine both results and remove duplicates
  const combined = [...english_search, ...romaji_search];

  const uniqueResults = Array.from(new Set(combined.map(item => JSON.stringify(item))))
    .map(item => JSON.parse(item));

  const gogomap = findSimilarTitles(title?.romaji || title?.english || title?.userPreferred, uniqueResults)
  const gogoanime = {};

  gogomap?.forEach((obj) => {
    const title = obj.title;
    const id = obj.id;

    const match = title.replace(/\(TV\)/g, "").match(/\(([^)0-9]+)\)/);

    if (match && (match[1].toLowerCase() === 'uncensored' || match[1].toLowerCase() === 'dub')) {
      const key = match[1].replace(/\s+/g, '-').toLowerCase();
      if (!gogoanime[key]) {
        gogoanime[key] = id;
      }
    } else {
      if (!gogoanime['sub']) {
        gogoanime['sub'] = id;
      }
    }
  });
  return gogoanime;
}

async function mapZoro(title) {
  let eng = await hianime.search(title?.english || title?.romaji || title?.userPreferred);
  const zoromap = findSimilarTitles(title?.english, eng?.results)
  const zoromaprom = findSimilarTitles(title?.romaji, eng?.results)
  const combined = [...zoromap, ...zoromaprom];

  const uniqueCombined = combined.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Sort based on similarity (assuming similarity is a property of the objects)
  uniqueCombined.sort((a, b) => b.similarity - a.similarity);

  const zoro = {};

  uniqueCombined.forEach((obj) => {
    const title = obj.title;
    const id = obj.id;

    const match = title.replace(/\(TV\)/g, "").match(/\(([^)0-9]+)\)/);
    if (match && (match[1].toLowerCase() === 'uncensored' || match[1].toLowerCase() === 'dub')) {
      const key = match[1].replace(/\s+/g, '-').toLowerCase();
      if (!zoro[key]) {
        zoro[key] = id;
      }
    } else {
      if (!zoro['sub']) {
        zoro['sub'] = id;
      }
    }
  });
  return zoro;
}