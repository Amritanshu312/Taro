import { SaveProgress } from "@/utils/saveProgress";

export const handleVideoEvents = (art, watchSetting, setEpisode, animeid, episode, watchInfo, AnimeInfo) => {
  art.on("video:ended", () => {
    if (watchSetting?.autoNext) {
      setEpisode((prev) => prev + 1);
    }
  });

  const throttledSaveProgress = (() => {
    let lastRun = 0;
    return (data) => {
      const now = Date.now();
      if (now - lastRun >= 8000) {
        SaveProgress(
          animeid,
          episode,
          data?.target?.currentTime,
          watchInfo?.thumbnail,
          data?.target?.duration,
          watchInfo?.title || AnimeInfo?.title?.english || AnimeInfo?.title?.romaji
        );
        lastRun = now;
      }
    };
  })();

  art.on("video:timeupdate", throttledSaveProgress);

  art.on("ready", () => {
    const watchHistory = JSON.parse(localStorage.getItem("watch_history"));
    if (watchHistory?.[animeid]?.episode?.toString() === episode?.toString()) {
      const currentTime = parseInt(watchHistory[animeid].currentTime, 10);
      if (!isNaN(currentTime)) {
        art.seek = currentTime;
      }
    }
  });
};
