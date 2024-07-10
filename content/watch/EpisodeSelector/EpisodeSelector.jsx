"use client";

import { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RiFilter3Line } from "react-icons/ri";
import Select from "@/components/ui/Select";
import EpisodeCard from "./EpisodeCard";
import { useWatchContext } from "@/context/Watch";
import { FetchEpisodes } from "@/lib/ConsumetFunction";

const EpisodeSelector = ({ AnimeID }) => {
  // State for the selected dub option and episode range
  const [dubSelected, setDubSelected] = useState({ id: 0 });
  const [epFromTo, setEpFromTo] = useState({});

  // Context state
  const { setIsDub, episode, setEpisodes, episodes } = useWatchContext();

  // Fetch episodes when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const [sub, dub] = await Promise.all([
        FetchEpisodes(AnimeID, false),
        FetchEpisodes(AnimeID, true),
      ]);

      setEpisodes({ dub, sub });
    };

    fetchData();
  }, [AnimeID, setEpisodes]);

  // Determine loading state and data to display
  const loading = episodes === "loading";
  const isSubSelected = dubSelected?.id === 0 || dubSelected?.id === 1;
  const data = !loading && isSubSelected ? episodes?.sub : episodes?.dub;

  // Update dub/sub state based on the selected option
  useEffect(() => {
    setIsDub(!isSubSelected);
  }, [isSubSelected, setIsDub]);

  return (
    <div className="bg-[#201f28] w-full max-w-[22rem] EPSResponsive rounded-md flex flex-col">
      {/* Header with search and filter options */}
      <div>
        <div className="flex justify-between px-2 py-3 border-b-2 border-[#514f61a1]">
          <div className="bg-[#2e2b3d] h-10 rounded-md">
            <input
              type="text"
              placeholder="Ep Number"
              className="bg-transparent outline-none h-full w-full px-2 text-slate-200 max-w-[13rem]"
            />
          </div>
          
          <div className="bg-[#2e2b3d] flex gap-2 rounded-lg">
            <div className="text-[#d5d5d7] hover:bg-[#d5d5d7] hover:text-[#2e2b3d] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer">
              <RiFilter3Line />
            </div>
            <div className="bg-[#d5d5d7] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer">
              <HiOutlineBars3 />
            </div>
          </div>


        </div>
        <div className="flex justify-between px-2 py-3 gap-4">
          {/* Select component for dub/sub options */}
          <div className="w-full">
            <Select
              setSelected={setDubSelected}
              data={["sub & dub", "sub", "dub"]}
              defaultValue={0}
            />
          </div>
          {/* Select component for episode range options */}
          <div className="w-full">
            <Select
              setSelected={setEpFromTo}
              data={["1-100", "100-200", "200-300"]}
              defaultValue={0}
            />
          </div>
        </div>
      </div>

      {/* Episode list */}
      <div className="px-2 overflow-y-scroll h-full max-h-[44rem]">
        {!loading ? (
          data.map((item, index) => (
            <EpisodeCard key={index + 1} info={item} currentEp={episode} />
          ))
        ) : (
          Array.from({ length: 7 }).map((_, index) => <EpisodeCard key={index} loading />)
        )}

        {!loading && (!data || data.length === 0) && (
          <p className="text-[#d5d5d7] text-center mt-5">No episodes found</p>
        )}
      </div>
    </div>
  );
};

export default EpisodeSelector;
