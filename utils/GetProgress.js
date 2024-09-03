export const getWatchProgress = () => {
  const animeData = JSON.parse(localStorage.getItem("watch_history") || "{}");

  // Convert the object to an array of entries for better processing
  const entries = Object.entries(animeData);

  // Sort the entries based on updatedDate
  const sortedData = entries.sort(([, a], [, b]) => {
    const dateA = new Date(a?.updatedDate || 0);
    const dateB = new Date(b?.updatedDate || 0);
    return dateB - dateA;
  });

  // Map the first 4 entries to the desired format
  const data = sortedData.slice(0, 4).map(([key, item]) => ({
    id: key,
    animeid: item.animeid,
    episode: item.episode,
    thumbnail: item.thumbnail,
    title: item.title || '', // title might be undefined, so we provide a fallback
    videoURL: item.videoURL || '', // same for videoURL
    currentTime: item.currentTime || 0, // fallback for currentTime
    duration: item.duration || 0, // fallback for duration
    date: item.updatedDate || 0 // fallback for duration
  }));

  return data;
};
