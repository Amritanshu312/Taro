"use client"
import Image from "next/image"
import styles from "./TrendingCard.module.css"
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FetchYtVideoStream } from "@/utils/YT_Video";
import Link from "next/link";

const TrendingCard = ({ info }) => {
  const [imageHovered, setImageHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [videoPlay, setVideoPlay] = useState(false)

  useEffect(() => {
    setVideoPlay(JSON.parse(localStorage.getItem("setting.Taro") || '{}')?.Preferences?.trendingCardVideo || false)
  }, [])

  const HoverTime = 1000
  let hoverTimer = null;

  const onMouseEnter = () => {
    if (videoPlay) {
      hoverTimer = setTimeout(async () => {
        if (!trailer) {
          const trailer = await FetchYtVideoStream(info.trailer.id);
          if (trailer === "error") return
          setTrailer(trailer);
        }

        setImageHovered(true)
      }, HoverTime);
    }
  }


  const onMouseLeave = () => {
    if (!videoPlay) return
    clearTimeout(hoverTimer); // Cancel the timeout if mouse leaves before HoverTime
    setImageHovered(false);
  }


  return (
    <Link
      href={`/watch/${info?.id}`}
      className={`${styles.cardImage} w-full aspect-[9/14] rounded-2xl relative overflow-hidden cursor-pointer group`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {imageHovered && !videoError ? <video
        src={trailer}
        className="object-cover w-full h-full rounded-2xl hover:cursor-pointer"
        preload="auto"
        autoPlay
        loop
        muted
        onError={() => setVideoError(true)}
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

    </Link>
  )
}

export default TrendingCard