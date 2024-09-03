export const getWatchProgress = (isSlice = true) => {
  const animeData = JSON.parse(localStorage.getItem("watch_history") || "{}");

  const entries = Object.entries(animeData);

  // Sort the entries based on updatedDate
  const sortedData = entries.sort(([, a], [, b]) => {
    const dateA = new Date(a?.updatedDate || 0);
    const dateB = new Date(b?.updatedDate || 0);
    return dateB - dateA;
  });

  // Conditionally slice the array if isSlice is true
  const processedData = isSlice ? sortedData.slice(0, 4) : sortedData;

  // Map the data to the desired format
  const data = processedData.map(([key, item]) => ({
    id: key,
    animeid: item.animeid,
    episode: item.episode,
    thumbnail: item.thumbnail,
    title: item.title || '', // title might be undefined, so we provide a fallback
    videoURL: item.videoURL || '', // same for videoURL
    currentTime: item.currentTime || 0, // fallback for currentTime
    duration: item.duration || 0, // fallback for duration
    date: item.updatedDate || 0, // fallback for updatedDate,
  }));

  return data;
};
