import axios from 'axios';
import { NextResponse } from 'next/server';


// Set a global timeout for Axios requests if not already set
axios.interceptors.request.use(config => {
  config.timeout = 9000;
  return config;
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
const fetchData = async (animeId) => {
  try {
    // If no cached data or refresh is true, fetch new data from external API
    const [dubEpisodes, subEpisodes] = await Promise.all([
      fetchEpisodes(animeId, true),
      fetchEpisodes(animeId, false),
    ]);

    // Combine dub and sub episodes into one list
    const episodes = { dub: dubEpisodes, sub: subEpisodes };

    return episodes;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { error: 'Failed to fetch data. Please try again later.' };
  }
};

export const GET = async (req, { params }) => {
  try {
    const animeId = params.animeid[0];

    if (!animeId) {
      return NextResponse.json({ error: 'Anime ID is required.' }, { status: 400 });
    }

    const data = await fetchData(animeId);

    if (data.error) {
      return NextResponse.json(data, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing GET request:', error.message);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
};
