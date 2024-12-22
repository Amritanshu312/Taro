"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Select from "@/components/ui/Select";
import EpisodeCard from "./EpisodeCard";
import { useWatchContext } from "@/context/Watch";
import { getEpisodes } from "@/actions/episode";

const EpisodeSelector = ({ AnimeID }) => {
  const [dubSelected, setDubSelected] = useState({ id: 0 });
  const [epFromTo, setEpFromTo] = useState({ id: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedEP, setWatchedEP] = useState([]);


  const chunkSize = 80;

  const { setIsDub, episode, setEpisodes, episodes } = useWatchContext();

  useEffect(() => {
    const fetchData = async () => {
      setEpisodes("loading")
      const data = await getEpisodes(AnimeID)

      const { sub, dub } = data.find(item => item?.providerId === 'gogoanime')?.episodes;


      setEpisodes({ dub, sub });
    };

    fetchData();
  }, [AnimeID]);

  const loading = (episodes === "loading");
  const isSubSelected = dubSelected.id === 0 || dubSelected.id === 1;

  const data = useMemo(() => {
    if (loading) return [];
    return isSubSelected ? episodes?.sub : episodes?.dub;
  }, [loading, isSubSelected, episodes]);

  const SplitedEpisodes = useMemo(() => {
    return data?.reduce((chunks, _, i) => {
      if (i % chunkSize === 0) {
        chunks.push(data.slice(i, i + chunkSize));
      }
      return chunks;
    }, []);
  }, [data]);

  useEffect(() => {
    setIsDub(!isSubSelected);
  }, [isSubSelected, setIsDub]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(`playing.${AnimeID}`) || "[]");
    if (!storedItems.includes(episode)) {
      storedItems.push(episode);
      localStorage.setItem(`playing.${AnimeID}`, JSON.stringify(storedItems));
    }
    setWatchedEP(storedItems);
  }, [AnimeID, episode]);

  const handleSearchQueryChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="bg-[#201f28] w-full max-w-[22rem] EPSResponsive rounded-md flex flex-col">
      <div>
        <div className="flex justify-between px-2 py-3 border-b-2 border-[#514f61a1]">
          <div className="bg-[#2e2b3d] h-10 rounded-md">
            <input
              type="text"
              placeholder="Ep Number"
              className="bg-transparent outline-none h-full w-full px-2 text-slate-200 max-w-[13rem]"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>

          <div className="bg-[#2e2b3d] flex gap-2 rounded-lg">
            <div className="bg-[#d5d5d7] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer">
              <HiOutlineBars3 />
            </div>
          </div>
        </div>
        <div className="flex justify-between px-2 py-3 gap-4">
          <div className="w-full">
            <Select
              setSelected={setDubSelected}
              data={["sub & dub", "sub", "dub"]}
              defaultValue={0}
            />
          </div>
          <div className="w-full">
            <Select
              setSelected={setEpFromTo}
              data={Array.from({ length: SplitedEpisodes?.length ?? 0 }, (v, i) =>
                `${i === 0 && i * chunkSize === 0 ? 1 : i * chunkSize} - ${(i + 1) * chunkSize}`
              )}
              defaultValue={0}
            />
          </div>
        </div>
      </div>

      <div className="px-2 overflow-y-scroll h-full max-h-[44rem]">
        {!loading ? (
          !searchQuery ? (
            SplitedEpisodes[epFromTo?.id]?.map((item, index) => (
              <EpisodeCard key={index + 1} info={item} currentEp={episode} watchedEP={watchedEP} />
            ))
          ) : (
            data
              .filter(
                (item) =>
                  `episode ${item?.number.toString()}`.includes(searchQuery.toLowerCase()) ||
                  item?.title?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '')?.includes(searchQuery.toLowerCase())
              )
              ?.map((item, index) => (
                <EpisodeCard key={index + 1} info={item} currentEp={episode} watchedEP={watchedEP} />
              ))
          )
        ) : (
          Array.from({ length: 7 }).map((_, index) => (
            <EpisodeCard key={index} loading />
          ))
        )}

        {!loading && (!data || data.length === 0) && (
          <p className="text-[#d5d5d7] text-center my-5">No episodes found</p>
        )}
      </div>
    </div>
  );
};

export default EpisodeSelector;
