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





// Fetch streaming data for an episode
const fetchStreamingData = async (episodeId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/meta/anilist/watch/${episodeId}`);

    if (data?.message === "Anime not found" && data?.length < 1) {
      return [];
    }

    return data;
  } catch (error) {
    console.error(`Error fetching streaming data for episode ${episodeId}:`, error.message);
    return [];
  }
};

// Fetch skip times for an episode
const fetchSkipTime = async (idMal, epNum) => {
  try {
    const { data } = await axios.get(
      `https://api.aniskip.com/v2/skip-times/${idMal}/${parseInt(epNum)}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`
    );

    return data;
  } catch (error) {
    console.error(`Error fetching skip times for episode ${epNum} of MAL ID ${idMal}:`, error.message);
    return [];
  }
};

// Fetch watch data, including streaming data and optional skip times
export const fetchWatchData = async (episodeId, idMal = null, episode = null, timeout = 10000) => {
  try {
    // Set up a timeout for the Axios requests
    axios.defaults.timeout = timeout;

    // Fetch the streaming data and skip times (if provided)
    const [streamingData, skipTime] = await Promise.all([
      fetchStreamingData(episodeId),
      idMal && episode ? fetchSkipTime(idMal, episode) : null,
    ]);

    return {
      episodeId,
      streamingData,
      skipTime,
    };
  } catch (error) {
    console.error('Error fetching watch data:', error.message);
    throw error;
  }
};