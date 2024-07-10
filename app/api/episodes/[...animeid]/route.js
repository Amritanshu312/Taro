import axios from 'axios';
import { NextResponse } from 'next/server';
// import Redis from 'ioredis';

// // Create a Redis client
// const redis = new Redis({
//   host: process.env.NEXT_REDIS_HOST, // Redis server hostname
//   port: process.env.NEXT_REDIS_PORT, // Redis server port
//   password: process.env.NEXT_REDIS_PASSWORD, // Optional, if your Redis server requires a password
// });

// Set a global timeout for Axios requests
axios.interceptors.request.use(config => {
  config.timeout = 15000; // Reduced timeout to 15 seconds for faster failure
  return config;
});

async function MalSync(id) {
  try {
    const response = await axios.get(`${process.env.MALSYNC_URI}${id}`);

    const data = response?.data;
    const sites = Object.keys(data.Sites).map(providerId => ({ providerId: providerId.toLowerCase(), data: Object.values(data.Sites[providerId]) }));
    const newdata = sites.filter(site => site.providerId === 'gogoanime' || site.providerId === 'zoro');
    const finaldata = [];

    newdata.forEach(item => {
      const { providerId, data } = item;
      if (providerId === 'gogoanime') {
        const remove = 'https://anitaku.to/category/';
        const dub = data.find(item => item.title.toLowerCase().endsWith(" (dub)"));
        const duburl = dub?.url?.replace(remove, '');
        const sub = data.find(item => item.title.toLowerCase().includes(" (uncensored)"))?.url?.replace(remove, '') ?? data.find((item) => item?.url === dub?.url?.replace(/-dub$/, ''))?.url?.replace(remove, '') ?? data.find(item => !item.title.toLowerCase().includes(")"))?.url?.replace(remove, '');
        finaldata.push({ providerId, sub: sub || "", dub: duburl || "" });
      } else {
        const remove = 'https://hianime.to/';
        const sub = data[0]?.url?.replace(remove, '')
        finaldata.push({ providerId, sub: sub || '' });
      }
    });
    return finaldata;
  } catch (error) {
    console.error('Error fetching data from Malsync:', error);
    return null;
  }
}



// Fetch episodes data from the external API
const fetchEpisodes = async (gogoanimeID, episodeId, isDub, provider) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ANIWATCH_URL}/anime/episodes/${gogoanimeID}`
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

const fetchAniwatchEpisodes = async (gogoanimeID) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ANIWATCH_URL}/anime/episodes/${episodeId}`
    );
    if (response.data?.message === "Anime not found" || response.data?.length < 1) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching episodes for ${episodeId} (dub: ${isDub}):`, error.message);
    return [];
  }
}

// Fetch and cache data
const fetchAndCacheData = async (animeId, provider) => {
  try {
    const gogoanimeID = MalSync(animeId)

    if (gogoanimeID) {
      const { sub, dub } = fetchEpisodes()
    }
    const [dubEP, subEP] = await Promise.all([
      fetchEpisodes(gogoanimeID || false, animeId, true, provider),
      fetchEpisodes(gogoanimeID || false, animeId, false, provider),
    ]);

    const initialData = { animeId, provider, dub: dubEP, sub: subEP };

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
