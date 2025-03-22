"use client"
import Video from "./Trailer";
import ImageView from "./ImageView";
import { useEffect, useState } from "react";


const ImageSection = ({ populardata }) => {
  const [videoError, setVideoError] = useState(false)
  const [videoPlay, setVideoPlay] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    setVideoPlay(JSON.parse(localStorage.getItem("setting.Taro") || '{}')?.Preferences?.homePageTrailer || true)
  }, [])


  return <>
    {videoPlay &&
      <Video populardata={populardata} setVideoError={setVideoError} setIsVideoReady={setIsVideoReady} isVideoReady={isVideoReady} />}

    {!isVideoReady && <ImageView populardata={populardata} VideoPlay={videoPlay} />}
  </>
}

export default ImageSection