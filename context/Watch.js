"use client";

import { fetchWatchData } from "@/lib/ConsumetFunction";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";

export const WatchAreaContext = createContext();

export function WatchAreaContextProvider({ children, AnimeInfo }) {
  const searchparam = useSearchParams();

  const [episode, setEpisode] = useState(() => {
    const epFromSearch = parseInt(searchparam.get("ep"));
    return !isNaN(epFromSearch) ? epFromSearch : 1;
  });

  const [watchInfo, setWatchInfo] = useState({ loading: true });
  const [isDub, setIsDub] = useState(false);
  const [episodes, setEpisodes] = useState("loading");
  const [server, setServer] = useState("Tokiro");

  let dub, sub;
  if (episodes !== "loading") {
    ({ dub, sub } = episodes);
  }
  useEffect(() => {
    if (episodes === "loading") return;

    let isMounted = true;

    const fetchData = async () => {
      setWatchInfo((prev) => ({ ...prev, loading: true }));

      try {
        const selectedList = isDub ? dub : sub;
        const episodeData = findEpisodeData(selectedList, episode);

        if (!episodeData) {
          if (isMounted) handleNoEpisodeFound();
          return;
        }

        const watchData = await fetchWatchData(
          episodeData.id,
          AnimeInfo?.idMal,
          episodeData.number,
          server
        );

        if (isMounted) {
          setWatchInfo((prev) => ({
            ...prev,
            ...watchData,
            thumbnail: episodeData.image,
            title: episodeData.title,
            loading: false,
          }));
        }
      } catch (error) {
        if (isMounted) handleError(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [episode, dub, sub, isDub, server, episodes]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const watchHistory = JSON.parse(localStorage.getItem("watch_history")) || {};
      const animeHistory = watchHistory?.[AnimeInfo?.id];
      const epFromHistory = parseInt(animeHistory?.episode);

      if (!isNaN(epFromHistory)) {
        setEpisode(epFromHistory);
      }
    }
  }, [AnimeInfo?.id, episodes]);

  const findEpisodeData = (selectedList, episodeNumber) => {
    return selectedList?.find((item) => item.number === episodeNumber);
  };

  const handleNoEpisodeFound = () => {
    setWatchInfo({ loading: false });
    toast(`No ${isDub ? "Dub" : "Sub"} episode found`);
  };

  const handleError = (error, isMounted) => {
    console.error("Failed to fetch watch data:", error);
    if (isMounted) {
      setWatchInfo({ loading: false, error: "Failed to fetch data" });
      toast("Failed to fetch data");
    }
  };

  const contextValue = useMemo(
    () => ({
      episode,
      watchInfo,
      setEpisode,
      setIsDub,
      isDub,
      setEpisodes,
      episodes,
      AnimeInfo,
      server,
      setServer,
      animeid: AnimeInfo?.id,
    }),
    [episode, watchInfo, isDub, episodes, server, setServer, AnimeInfo]
  );

  return (
    <WatchAreaContext.Provider value={contextValue}>
      {children}
    </WatchAreaContext.Provider>
  );
}

export function useWatchContext() {
  return useContext(WatchAreaContext);
}
