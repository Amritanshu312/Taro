export const saveProgress = (animeid, episode, currentTime, thumbnail) => {
  let saveTimeout;
  const DEBOUNCE_DELAY = 5000; // 5 seconds

  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(() => {
    localStorage.setItem(animeid, JSON.stringify({
      episode,
      duration: currentTime,
      image: thumbnail
    }));
  }, DEBOUNCE_DELAY);
};
