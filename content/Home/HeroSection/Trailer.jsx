"use client"
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css"

const Video = ({ populardata }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    async function fetchTrailer(trailerId) {
      console.log("called");
      try {
        if (trailerId) {
          const response = await fetch(
            `https://pipedapi.kavin.rocks/streams/${trailerId}`
          );

          if (!response.ok) return
          const res = await response.json();
          const item = res.videoStreams.find(
            (i) => i.quality === '1080p' && i.format === 'WEBM'
          );
          console.log(item?.url);
          setTrailer(item?.url || null);
        }
      } catch (error) {
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