'use client';

import { FetchWatchData } from '@/lib/ConsumetFunction';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export const WatchAreaContext = createContext();

export function WatchAreaContextProvider({ children, dub, sub }) {
  const [episode, setEpisode] = useState(1);
  const [watchInfo, setWatchInfo] = useState({ loading: true });
  const [isDub, setIsDub] = useState(false);

  console.log(isDub);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setWatchInfo((prev) => ({ ...prev, loading: true }));

      try {
        const selectedList = isDub ? dub : sub;
        const episodeData = selectedList.find((item) => item.number === episode);

        if (!episodeData) {
          if (isMounted) {
            setWatchInfo({ loading: false });
            toast(`No ${isDub ? 'Dub' : 'Sub'} episode found`);
          }
          return;
        }

        const WatchInfo = await FetchWatchData(episodeData.id);

        if (isMounted) {
          setWatchInfo({ ...WatchInfo, loading: false });
        }
      } catch (error) {
        console.error('Failed to fetch watch data:', error);
        if (isMounted) {
          setWatchInfo({ loading: false, error: 'Failed to fetch data' });
          toast('Failed to fetch data');
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [episode, dub, sub, isDub]);

  const contextValue = useMemo(
    () => ({
      episode,
      watchInfo,
      setEpisode,
      setIsDub,
      isDub,
    }),
    [episode, watchInfo, isDub]
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
