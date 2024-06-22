import EpisodeSelector from "@/content/watch/EpisodeSelector/EpisodeSelector"
import { AnimeInfoAnilist } from "@/lib/Anilistfunction"

const Watch = async ({ params }) => {
  const { id: AnimeID } = params
  // const AnimeInfo = await AnimeInfoAnilist(AnimeID)

  return (
    <>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[106px]">
        <div className="w-full max-w-[96rem] flex gap-3">
          <EpisodeSelector />
        </div>
      </div>
    </>
  )
}

export default Watch