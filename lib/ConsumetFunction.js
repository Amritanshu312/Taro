export const FetchEpisodes = async (id, timeout = 10000) => {
  const controller = new AbortController();
  const signal = controller.signal;

  // Set a timeout to abort the fetch request
  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/episodes/${id}`,
      { signal }
    );

    // Clear the timeout if the fetch is successful
    clearTimeout(fetchTimeout);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      // throw new Error('Fetch request timed out');
    } else {
      throw error;
    }
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