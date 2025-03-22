"use client"
import Image from "next/image"
import styles from "./TrendingCard.module.css"
import { FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TrendingCard = ({ info }) => {
  const [isTrailerFetched, setIsTrailerFetched] = useState(false)
  const [imageHovered, setImageHovered] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [videoPlay, setVideoPlay] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const videoRef = useRef(null);

  useEffect(() => {
    setVideoPlay(JSON.parse(localStorage.getItem("setting.Taro") || '{}')?.Preferences?.trendingCardVideo || false)
  }, [])

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    videoRef.current.playbackRate = 2;

    const changeCurrentTime = (e) => {
      const currentTime = Math.floor(e?.target?.currentTime)

      setCurrentTime(currentTime)
    };

    video.addEventListener("timeupdate", changeCurrentTime);

    return () => {
      video.removeEventListener("timeupdate", changeCurrentTime);
    };
  }, [trailer, imageHovered]);

  useEffect(() => {
    const fetch_and_set_data = async (id) => {
      if ((trailer !== null || !id) && isTrailerFetched) return

      const url = `/api/yt?id=${id}&q=480p`;
      const res = await fetch(url)

      if (res.ok) {
        const parsedData = await res.json()

        if (parsedData && parsedData?.url?.length > 0) {
          const webp_url = parsedData.url
            .filter(item => item.mimeType.includes("video/webm"))
          [0]?.url

          setTrailer(webp_url)
        }
      }

      setIsTrailerFetched(true)
    }

    if (imageHovered && !trailer && !isTrailerFetched) {
      fetch_and_set_data(info.trailer.id)
    }
  }, [imageHovered])

  const HoverTime = 1000;
  let hoverTimer = null;



  const onMouseEnter = () => {
    if (videoPlay) {
      hoverTimer = setTimeout(() => {
        setImageHovered(true)
      }, HoverTime);
    }
  }


  const onMouseLeave = () => {
    if (!videoPlay) return
    clearTimeout(hoverTimer);
    setImageHovered(false);
  }

  return (
    <Link
      href={`/watch/${info?.id}`}
      className={`${styles.cardImage} w-full aspect-[9/14] rounded-2xl relative overflow-hidden cursor-pointer group`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {imageHovered ? <video
        ref={videoRef}
        src={trailer}
        className="object-cover w-full h-full rounded-2xl hover:cursor-pointer"
        poster={info?.coverImage?.extraLarge}
        preload="auto"
        autoPlay
        loop
        muted
      ></video> : <Image
        src={info?.coverImage?.extraLarge}
        alt="Trending"
        width={200}
        height={280}
        quality={100}
        className="object-cover w-full h-full rounded-2xl hover:cursor-pointer"
      />}


      <div className={`${styles.rating} absolute top-0 left-0 bg-[#21212c] w-[60%] rounded-br-lg rounded-tl-md flex items-center justify-center gap-2 text-white h-10`}>
        <FaStar />
        <span>{info?.averageScore / 10}</span>
      </div>

      <div className="absolute bottom-0 left-0 pl-[8px] pb-2 z-10 opacity-100 group-hover:opacity-0 transition">
        <h1 className="text-[#ffffffd1] font-medium text-md font-['poppins'] w-[186px] line-clamp-1 text-ellipsis overflow-hidden cursor-pointer">{info?.title?.english || info?.title?.romaji} </h1>
        <span className="text-[#ffffffb0] text-sm">{info?.seasonYear}, {info?.genres[0]}</span>
      </div>

      {(imageHovered && videoRef && videoRef?.current) && <div className="absolute bottom-0 left-0 w-full duration-100 h-1 z-50">
        <div className="w-0 rounded-md h-full bg-[#4a476e] duration-100" style={{ width: `${currentTime * 100 / videoRef.current.duration}%` }}>

        </div>
      </div>}

    </Link>
  )
}

export default TrendingCard