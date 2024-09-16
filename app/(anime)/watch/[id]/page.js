import EpisodeSelector from "@/content/watch/EpisodeSelector/EpisodeSelector"
import MainVideo from "@/content/watch/MainVideo/MainVideo"
import { AnimeInfoAnilist } from "@/lib/Anilistfunction"
import './watch.css'
import AnimeInfo from "@/content/watch/AnimeInfo/AnimeInfo"
import Rating from "@/content/watch/AnimeInfo/Rating"
import { WatchAreaContextProvider } from "@/context/Watch"
import { WatchSettingContextProvider } from "@/context/WatchSetting"
import Additionalinfo from "@/content/watch/Additionalinfo/Additionalinfo"
import { Fragment } from "react"
import Comments from "@/content/watch/Comment/Comment"
import Recommendation from "@/content/watch/Recommendation/Recommendation"
import AnimeNotFound from "@/components/errors/AnimeNotFound"

export async function generateMetadata({ params }) {
  const { id: AnimeID } = params
  const data = await AnimeInfoAnilist(AnimeID)
  const hasAnime = (data?.title?.english || data?.title?.romaji)
  return {
    title: hasAnime ? `Watch ${data?.title?.english || data?.title?.romaji} - Taro` || 'Loading...' : `Anime Not Found`,
    description: data?.description?.slice(0, 180),
    openGraph: {
      title: "Watch" + ' - ' + data?.title?.english || data?.title?.romaji + "in Taro",
      images: [data?.coverImage?.extraLarge],
      description: data?.description,
    },
    twitter: {
      card: "summary",
      title: "Watch" + ' - ' + data?.title?.english || data?.title?.romaji + "in Taro",
      description: data?.description?.slice(0, 180),
    },
  }
}


const Watch = async ({ params }) => {
  const { id: AnimeID } = params

  const animeInfo = await AnimeInfoAnilist(AnimeID)


  return animeInfo ? (
    <Fragment>
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


          <Additionalinfo info={animeInfo} />


          <div className="flex mb-5 gap-5 max-[1125px]:flex-col">
            <Comments AnimeID={AnimeID} title={animeInfo?.title?.english} />
            <Recommendation info={animeInfo} />
          </div>

        </div>
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="absolute max-[737px]:fixed w-[500px] h-[370.13px] right-[50%] bottom-[-25%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </Fragment>
  ) : <AnimeNotFound />
}

export default Watch