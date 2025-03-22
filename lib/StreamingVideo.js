// Fetch watch data, including streaming data and optional skip times
export const fetchWatchData = async (episodeId, isdub = false, timeout = 10000) => {
  try {
    try {
      const response = await fetch(`/api/anime/watch?episodeid=${encodeURIComponent(episodeId)}&isdub=${isdub}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
      }

      const data = await response.json();
      return { episodeId, ...data };
    } catch (error) {
      console.error(`Error fetching streaming data for episode ${episodeId}:`, error.message);
      return [];
    }


  } catch (error) {
    console.error('Error fetching watch data:', error.message);
    throw error;
  }
};