import clsx from "clsx";
import EpisodeCard from "./EpisodeCard";

const EpisodeList = ({ loading, searchQuery, data, SplitedEpisodes, epFromTo, episode, watchedEP, showType }) => (
  <div className={clsx(
    "px-2 overflow-y-scroll h-full max-h-[44rem]",
    {
      "grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] max-h-fit": showType === "grid",
      "flex-col flex gap-1": showType === "compact_list"
    }
  )}>
    {!loading ? (
      !searchQuery ? (
        SplitedEpisodes[epFromTo?.id]?.map((item, index) => (
          <EpisodeCard key={index + 1} info={item} currentEp={episode} watchedEP={watchedEP} showType={showType} />
        ))
      ) : (
        data
          .filter(
            (item) =>
              `episode ${item?.number.toString()}`.includes(searchQuery.toLowerCase()) ||
              item?.title?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").includes(searchQuery.toLowerCase())
          )
          ?.map((item, index) => (
            <EpisodeCard key={index + 1} info={item} currentEp={episode} watchedEP={watchedEP} showType={showType} />
          ))
      )
    ) : (
      Array.from({ length: showType === "grid" ? 17 : 7 }).map((_, index) => <EpisodeCard key={index} showType={showType} loading />)
    )}

    {!loading && (!data || data.length === 0) && <p className="text-[#d5d5d7] text-center my-5">No episodes found</p>}
    {!loading && showType === "grid" && Array.from({ length: 5 }).map((_, i) => <div key={i}></div>)}
  </div>
);

export default EpisodeList;
