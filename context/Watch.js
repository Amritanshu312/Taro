"use client";

import { fetchWatchData } from "@/lib/StreamingVideo";
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
  const [server, setServer] = useState("sub");

  const [sub, dub] = episodes !== "loading" && episodes.length > 0
    ? [episodes.filter(e => e?.isSubbed), episodes.filter(e => e?.isDubbed)]
    : [[], []];



  useEffect(() => {
    if (!episodes || episodes === "loading") return;

    const fetchData = async () => {
      try {
        setWatchInfo((prev) => ({ ...prev, loading: true }));

        if (episodes.length === 0) {
          toast("No Episodes found");
          return;
        }

        const currentEpisode = episodes.find((ep) => ep.number === episode);
        if (!currentEpisode) {
          toast("Episode not found");
          return;
        }

        const [watchData, episodeData] = await Promise.all([
          fetchWatchData(currentEpisode.id, !!(server === "dub")),
          findEpisodeData(!!(server === "dub") ? dub : sub, episode),
        ]);

        setWatchInfo({
          watchData,
          thumbnail: episodeData?.image || "",
          title: episodeData?.title || `Episode ${episode}`,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch watch info:", error);
        toast("Failed to load episode data");
        setWatchInfo((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, [episode, server, episodes]);



  useEffect(() => {
    if (typeof window !== "undefined") {
      const watchHistory = JSON.parse(localStorage.getItem("watch_history")) || {};
      const animeHistory = watchHistory?.[AnimeInfo?.id];
      const epFromHistory = parseInt(animeHistory?.episode);

      if (!isNaN(epFromHistory) && !searchparam.get("ep")) {
        setEpisode(epFromHistory);
      }
    }
  }, [AnimeInfo?.id, episodes]);

  const findEpisodeData = (selectedList, episodeNumber) => {
    return selectedList?.find((item) => item.number === episodeNumber);
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
