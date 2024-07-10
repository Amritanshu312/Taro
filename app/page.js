import Collection from "@/content/Home/Collection";
import FeaturedAnime from "@/content/Home/FeaturedAnime/FeaturedAnime";
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
        <FeaturedAnime data={trendingdata} />
        <Collection />
        <Popular />
        <Season data={seasonaldata} />
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </>
  )
}

export default Home