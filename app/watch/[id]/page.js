import EpisodeSelector from "@/content/watch/EpisodeSelector/EpisodeSelector"
import MainVideo from "@/content/watch/MainVideo/MainVideo"
import { AnimeInfoAnilist } from "@/lib/Anilistfunction"
import './watch.css'
import AnimeInfo from "@/content/watch/AnimeInfo/AnimeInfo"
import Rating from "@/content/watch/AnimeInfo/Rating"
import { FetchEpisodes } from "@/lib/ConsumetFunction"
import { WatchAreaContextProvider } from "@/context/Watch"
import { WatchSettingContextProvider } from "@/context/WatchSetting"
import Additionalinfo from "@/content/watch/Additionalinfo/Additionalinfo"


const Watch = async ({ params }) => {
  const { id: AnimeID } = params

  const [animeInfo] = await Promise.all([
    AnimeInfoAnilist(AnimeID)
  ])



  return (
    <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[106px]">
      <div className="w-full max-w-[96rem]">

        {/* container div in this context ⬇ ⬇ */}
        <WatchSettingContextProvider>

          <WatchAreaContextProvider AnimeInfo={animeInfo}>
            <EpisodeSelector AnimeID={AnimeID} />

            <MainVideo />

          </WatchAreaContextProvider>

        </WatchSettingContextProvider>

        <div className="mt-20 flex gap-44">
          <AnimeInfo info={animeInfo} />
          <Rating info={animeInfo} />
        </div>


        {/* <Additionalinfo info={animeInfo} /> */}

      </div>
    </div>
  )
}

export default Watch