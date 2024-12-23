"use client"
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css"

const Video = ({ populardata, setVideoError }) => {
  const [trailer, setTrailer] = useState(null);

  console.log(trailer);

  useEffect(() => {
    async function fetchTrailer(trailerId) {
      try {
        if (trailerId) {
          const response = await fetch(
            `/api/yt?id=${trailerId}`
          );

          if (!response.ok) return setVideoError(true)
          const res = await response.json();
          setTrailer(res?.url || null);
        }
      } catch (error) {
        setVideoError(true)
        console.error('Error fetching trailer:', error);
      }
    }
    if (populardata && populardata.trailer) {
      fetchTrailer(populardata.trailer.id)
    }
  }, [populardata]);

  return (
    <video
      src={trailer}
      preload="auto"
      autoPlay
      loop
      muted
      alt="banner"
      className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px] w-full`}
    />
  )
}

export default Video