export const fetchWatchedEpisodes = (AnimeID, episode) => {
  const storedItems = JSON.parse(localStorage.getItem(`playing.${AnimeID}`) || "[]");
  return storedItems.includes(episode) ? storedItems : [...storedItems, episode];
};

export const updateWatchedEpisodes = (AnimeID, episode) => {
  const storedItems = JSON.parse(localStorage.getItem(`playing.${AnimeID}`) || "[]");
  if (!storedItems.includes(episode)) {
    storedItems.push(episode);
    localStorage.setItem(`playing.${AnimeID}`, JSON.stringify(storedItems));
  }
};
