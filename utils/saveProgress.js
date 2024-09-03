export const SaveProgress = (
  animeid,
  episode,
  currentTime,
  thumbnail,
  duration,
  title,
) => {
  const localStorageData = localStorage.getItem("watch_history") || '{}';
  const jsonifyLocalStorageData = JSON.parse(localStorageData) || {};


  const updatedData = {
    ...jsonifyLocalStorageData,
    [animeid]: {
      animeid,
      episode,
      currentTime,
      thumbnail,
      duration,
      title,
      updatedDate: new Date().valueOf()
    }
  };

  localStorage.setItem("watch_history", JSON.stringify(updatedData));
};
