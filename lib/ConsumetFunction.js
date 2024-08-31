export const FetchEpisodes = async (id, timeout = 10000) => {

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/episodes/${id}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
  } catch (error) {

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