"use client"
import Video from "./Trailer";
import ImageView from "./ImageView";
import { useEffect, useState } from "react";


const ImageSection = ({ populardata }) => {
  const [videoError, setVideoError] = useState(false)
  const [videoPlay, setVideoPlay] = useState(false)


  useEffect(() => {
    setVideoPlay(JSON.parse(localStorage.getItem("setting.Taro") || '{}')?.Preferences?.homePageTrailer || false)
  }, [])


  return (videoPlay && !videoError) ?
    <Video populardata={populardata} setVideoError={setVideoError} />
    :
    <ImageView populardata={populardata} VideoPlay={videoPlay} />
}

export default ImageSection