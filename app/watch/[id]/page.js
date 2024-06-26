import EpisodeSelector from "@/content/watch/EpisodeSelector/EpisodeSelector"
import MainVideo from "@/content/watch/MainVideo/MainVideo"
import { AnimeInfoAnilist } from "@/lib/Anilistfunction"
import './watch.css'
import AnimeInfo from "@/content/watch/AnimeInfo/AnimeInfo"
import Rating from "@/content/watch/AnimeInfo/Rating"
import { FetchEpisodes } from "@/lib/ConsumetFunction"
import { WatchAreaContextProvider } from "@/context/Watch"


const Watch = async ({ params }) => {
  const { id: AnimeID } = params
  const [animeInfo, sub, dub] = await Promise.all([
    AnimeInfoAnilist(AnimeID),
    FetchEpisodes(AnimeID, false),
    FetchEpisodes(AnimeID, true)
  ])


  return (
    <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[106px]">
      <div className="w-full max-w-[96rem]">

        <div className="flex gap-3">
          <WatchAreaContextProvider sub={sub} dub={dub}>
            <EpisodeSelector sub={sub} dub={dub} />
            <MainVideo sub={sub} dub={dub} />
          </WatchAreaContextProvider>
        </div>

        <div className="mt-20 flex gap-44">
          <AnimeInfo info={animeInfo} />
          <Rating info={animeInfo} />
        </div>

      </div>
    </div>
  )
}

export default Watch