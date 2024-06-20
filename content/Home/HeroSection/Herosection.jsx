"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css"
import { FaCirclePlay } from "react-icons/fa6";

const Herosection = ({ data }) => {
  const [populardata, setpopulardata] = useState(null);
  const [trailer, setTrailer] = useState(null);

  let VideoPlay = false;


  useEffect(() => {
    const getPopular = () => {
      if (data && Array.isArray(data) && data.length > 0) {
        const filteredData = data.filter(item => item.trailer && item.trailer.id && item.id !== 21 && item.bannerImage !== null && item.status !== 'NOT_YET_RELEASED');
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        setpopulardata(filteredData[randomIndex]);
      }
    };
    getPopular();
  }, [data]);

  useEffect(() => {
    async function fetchTrailer(trailerId) {
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
          setTrailer(item?.url || null);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }
    if (populardata && populardata.trailer && VideoPlay) {
      fetchTrailer(populardata.trailer.id)
    }
  }, [populardata, VideoPlay]);


  return (
    <div className={`relative w-full ${styles.smoothImageBlending}`}>
      <div>

        {populardata ? populardata?.bannerImage ?
          !trailer ?
            <Image
              src={populardata?.bannerImage}
              alt="banner"
              loading='eager'
              priority={true}
              fill
              className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px]`}
            /> :
            <video
              src={trailer}
              preload="auto"
              autoPlay
              loop
              muted
              alt="banner"
              className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px] w-full`}
            />

          : null : <div className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px] w-full`}></div>}
      </div>

      {populardata ?
        <div className={`absolute top-[35%] left-32 z-10 max-[1320px]:left-[5%] max-[794px]:left-[2%]`}>
          <h1 className="text-6xl text-white font-medium w-full max-w-[60rem] tracking-normal overflow-hidden text-ellipsis line-clamp-1 font-['Outfit'] max-[794px]:text-4xl">
            {
              populardata?.title?.english || populardata?.title?.romaji
            }
          </h1>
          <h2 className="text-sm text-white w-full max-w-[60rem] tracking-normal overflow-hidden text-ellipsis line-clamp-2 font-['poppins'] mt-3 mb-4 max-[794px]:text-[13px]">{populardata?.description.replace(/<[^>]*>/g, '')}</h2>
          <button className="flex gap-2 items-center text-white bg-[#ffffff24] px-4 py-1 rounded-md border-[2px] border-[#ffffff31] mt-2"><FaCirclePlay /> Watch Now</button>
        </div> : null}



    </div>
  )
}

export default Herosection