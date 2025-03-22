"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useWatchContext } from "@/context/Watch";
import { getEpisodes } from "@/actions/episode";
import { fetchWatchedEpisodes, updateWatchedEpisodes } from "./utils/LocalStorage";
import { filterEpisodes, chunkEpisodes } from "./utils/EpisodeUtils";
import SearchBar, { allepisodelayout } from "./SearchBar";
import Filters from "./Filters";
import EpisodeList from "./EpisodeList";

const EpisodeSelector = ({ AnimeID }) => {
  const [dubSelected, setDubSelected] = useState({ id: 0 });
  const [epFromTo, setEpFromTo] = useState({ id: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedEP, setWatchedEP] = useState([]);
  const [showType, setShowType] = useState("list")

  const chunkSize = 80;
  const { setIsDub, episode, setEpisodes, episodes, AnimeInfo } = useWatchContext();
  console.log(AnimeInfo)
  useEffect(() => {
    const fetchData = async () => {
      setEpisodes("loading");
      const episodes = await getEpisodes(AnimeID, AnimeInfo?.title);
      if (episodes) setEpisodes(episodes);
    };

    fetchData();
  }, [AnimeID]);

  const loading = episodes === "loading";
  const isSubSelected = dubSelected.id === 0 || dubSelected.id === 1;

  const filteredEpisodes = useMemo(() => filterEpisodes(episodes, isSubSelected, loading), [loading, isSubSelected, episodes]);
  const SplitedEpisodes = useMemo(() => chunkEpisodes(filteredEpisodes, chunkSize), [filteredEpisodes]);

  useEffect(() => {
    setIsDub(!isSubSelected);
  }, [isSubSelected, setIsDub]);

  useEffect(() => {
    setWatchedEP(fetchWatchedEpisodes(AnimeID, episode));
    updateWatchedEpisodes(AnimeID, episode);
  }, [AnimeID, episode]);

  const handleSearchQueryChange = useCallback((e) => setSearchQuery(e.target.value), []);

  return (
    <div className="bg-[#201f28] w-full max-w-[22rem] EPSResponsive rounded-md flex flex-col">
      <SearchBar searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} showType={showType} setShowType={setShowType} />
      <Filters setDubSelected={setDubSelected} setEpFromTo={setEpFromTo} SplitedEpisodes={SplitedEpisodes} chunkSize={chunkSize} />
      <EpisodeList loading={loading} searchQuery={searchQuery} data={filteredEpisodes} SplitedEpisodes={SplitedEpisodes} epFromTo={epFromTo} episode={episode} watchedEP={watchedEP} showType={showType} />
    </div>
  );
};

export default EpisodeSelector;
