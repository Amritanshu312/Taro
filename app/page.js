import Collection from "@/content/Home/Collection";
import Herosection from "@/content/Home/HeroSection/Herosection"
import Popular from "@/content/Home/Popular";
import Season from "@/content/Home/Season";
import Trending from "@/content/Home/Trending";
import { SeasonalAnilist, Top100Anilist, TrendingAnilist } from "@/lib/Anilistfunction";

const Home = async () => {
  // const top100data = await Top100Anilist();
  const [trendingdata, seasonaldata] = await Promise.all([
    TrendingAnilist(),
    SeasonalAnilist()
  ]);


  return (
    <>
      <Herosection data={trendingdata} />

      <div className="w-full flex flex-col items-center z-10 relative main-responsive">
        <Trending data={trendingdata} />
        <Collection />
        <Popular />
        <Season data={seasonaldata} />
      </div>
    </>
  )
}

export default Home