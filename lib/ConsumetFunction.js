import { META, StreamingServers } from '@consumet/extensions';
import Gogoanime from '@consumet/extensions/dist/providers/anime/gogoanime';
import Anilist from '@consumet/extensions/dist/providers/meta/anilist';

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_CONSUMET_URL;
if (!BASE_URL) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_CONSUMET_URL");
}

const fetchStreamingData = async (episodeId, server) => {
  try {
    const response = await fetch(`/api/anime/watch/${episodeId}?s=${server}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
    }

    const data = await response.json();
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
export const fetchWatchData = async (episodeId, idMal = null, episode = null, server = "", timeout = 10000) => {
  try {
    // Set up a timeout for the Axios requests
    axios.defaults.timeout = timeout;

    // Fetch the streaming data and skip times (if provided)
    const [streamingData, skipTime] = await Promise.all([
      fetchStreamingData(episodeId, server),
      // idMal && episode ? fetchSkipTime(idMal, episode) : null,
      null
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