import axios from 'axios';

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

// Fetch and organize data from the external API
export const FetchEpisodes = async (id, timeout = 10000) => {
  try {
    // Set up a timeout for the Axios requests
    axios.defaults.timeout = timeout;

    // Fetch dub and sub episodes concurrently
    const [dubEpisodes, subEpisodes] = await Promise.all([
      fetchEpisodes(id, true),
      fetchEpisodes(id, false),
    ]);

    // Combine dub and sub episodes into one list
    const episodes = { dub: dubEpisodes, sub: subEpisodes };

    return episodes;
  } catch (error) {
    console.error('Error fetching episodes:', error.message);
    throw error;
  }
};

export const FetchServers = async (EPid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/servers/${EPid}`
  )
  if (response.ok) {
    const data = await response.json()
    return data
  }
}