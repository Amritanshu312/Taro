/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import OptionBox from "../components/OptionBox"
import Title from "../components/Title"

const Preferences = () => {
  const [homePageTrailer, setHomePageTrailer] = useState(true);
  const [upscaledBanner, setUpscaledBanner] = useState(false);
  const [trendingCardVideo, setTrendingCardVideo] = useState(false);

  useEffect(() => {
    if (homePageTrailer && upscaledBanner) {
      setUpscaledBanner(false);
    }

  }, [homePageTrailer]);

  useEffect(() => {
    if (homePageTrailer && upscaledBanner) {
      setHomePageTrailer(false);
    }
  }, [upscaledBanner]);


  useEffect(() => {
    const jsonifiedLocalsotrage = JSON.parse(localStorage.getItem("setting.Taro") || '{}')

    if (jsonifiedLocalsotrage?.appearence) {
      if (jsonifiedLocalsotrage?.Preferences?.homePageTrailer) setHomePageTrailer(jsonifiedLocalsotrage?.Preferences?.homePageTrailer === true || false)
      if (jsonifiedLocalsotrage?.Preferences?.upscaledBanner) setUpscaledBanner(jsonifiedLocalsotrage?.Preferences?.upscaledBanner === true || false)
      if (jsonifiedLocalsotrage?.Preferences?.trendingCardVideo) setTrendingCardVideo(jsonifiedLocalsotrage?.Preferences?.trendingCardVideo === true || false)
    }
  }, [])

  useEffect(() => {
    const jsonifiedLocalsotrage = JSON.parse(localStorage.getItem("setting.Taro") || '{}')

    localStorage.setItem("setting.Taro", JSON.stringify({
      ...jsonifiedLocalsotrage, Preferences: {
        homePageTrailer,
        upscaledBanner,
        trendingCardVideo
      }
    }))
  }, [homePageTrailer, upscaledBanner, trendingCardVideo])


  return (
    <div className="mt-10">
      <Title title={"Preferences"} />

      <div>
        <OptionBox
          title={"HomePage Trailer"}
          description={"If you want to stop video previews on the homepage, you can do it to save data with just a click."}
          ischecked={homePageTrailer}
          setischecked={setHomePageTrailer}
        />

        <OptionBox
          title={"Revamp banner"}
          description={"If you want to have a better banner image, Toggle it on if you want else off. Turning it on may consume a little bit more data."}
          ischecked={upscaledBanner}
          setischecked={setUpscaledBanner}
        />

        <OptionBox
          title={"TrendingCard Video"}
          description={"If you want trailer on hover in trending card, Toggle it on if you want else off."}
          ischecked={trendingCardVideo}
          setischecked={setTrendingCardVideo}
        />
      </div>
    </div>
  )
}

export default Preferences