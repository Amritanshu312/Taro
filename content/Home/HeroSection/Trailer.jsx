"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./HeroSection.module.css";

const Video = ({ populardata, setVideoError, setIsVideoReady, isVideoReady }) => {
  const [trailer, setTrailer] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    async function fetchTrailer(trailerId) {
      try {
        if (trailerId) {
          const response = await fetch(`/api/yt?id=${trailerId}`);

          if (!response.ok) return setVideoError(true);
          const res = await response.json();
          setTrailer(res?.url || null);
        }
      } catch (error) {
        setVideoError(true);
        console.error("Error fetching trailer:", error);
      }
    }

    if (populardata && populardata.trailer) {
      fetchTrailer(populardata.trailer.id);
    }
  }, [populardata]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [trailer]);

  return (
    <video
      ref={videoRef}
      src={trailer}
      preload="auto"
      autoPlay
      loop
      muted
      alt="banner"
      className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px] w-full`}
      style={{ display: !isVideoReady ? "none" : "" }}
    />
  );
};

export default Video;
