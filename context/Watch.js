'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export const WatchAreaContext = createContext();

export function WatchAreaContextProvider({ children, dub, sub, AnimeInfo }) {
  const [episode, setEpisode] = useState(1);
  const [watchInfo, setWatchInfo] = useState({ loading: true });
  const [isDub, setIsDub] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setWatchInfo((prev) => ({ ...prev, loading: true }));

      try {
        const selectedList = isDub ? dub : sub;
        const episodeData = findEpisodeData(selectedList, episode);

        if (!episodeData) {
          handleNoEpisodeFound(isMounted);
          return;
        }

        const watchData = await fetchWatchData(episodeData, AnimeInfo);

        if (isMounted) {
          setWatchInfo({ ...watchData, loading: false });
        }
      } catch (error) {
        handleError(error, isMounted);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [episode, dub, sub, isDub]);

  const findEpisodeData = (selectedList, episodeNumber) => {
    return selectedList?.find((item) => item.number === episodeNumber);
  };

  const fetchWatchData = async (episodeData, AnimeInfo) => {
    console.log(AnimeInfo?.idmal);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/watch/${episodeData.id}?idmal=${AnimeInfo?.idmal}&episode=${episodeData.number}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching watch info:', error);
      toast('Failed to fetch watch data');
      return { error: 'Failed to fetch data' };
    }
  };

  const handleNoEpisodeFound = () => {
    setWatchInfo({ loading: false });
    toast(`No ${isDub ? 'Dub' : 'Sub'} episode found`);
  };

  const handleError = (error, isMounted) => {
    console.error('Failed to fetch watch data:', error);
    if (isMounted) {
      setWatchInfo({ loading: false, error: 'Failed to fetch data' });
      toast('Failed to fetch data');
    }
  };

  const contextValue = useMemo(() => ({
    episode,
    watchInfo,
    setEpisode,
    setIsDub,
    isDub,
  }), [episode, watchInfo, isDub]);

  return (
    <WatchAreaContext.Provider value={contextValue}>
      {children}
    </WatchAreaContext.Provider>
  );
}

export function useWatchContext() {
  return useContext(WatchAreaContext);
}
