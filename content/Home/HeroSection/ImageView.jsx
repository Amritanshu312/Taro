"use client"

import Image from "next/image"
import styles from "./HeroSection.module.css"
import { useEffect, useState } from "react";

const ImageView = ({ populardata, dynamicBanner = false, VideoPlay }) => {
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    const getBannerImage = async () => {
      if (populardata && populardata.bannerImage && populardata.id && !bannerImage && !VideoPlay) {
        try {
          const response = await fetch(`https://consumet-anime-beta.vercel.app/meta/anilist/artwork/${populardata.id}`);
          if (!response.ok) setBannerImage(populardata?.bannerImage);

          const data = await response.json();
          const filteredData = data.filter(item => item.type === 'banner');

          if (filteredData.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            setBannerImage(filteredData[randomIndex]?.img || null);
          }
        } catch (error) {
          setBannerImage(populardata?.bannerImage)
        }
      }
    };


    if (dynamicBanner) {
      getBannerImage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populardata]);

  return (
    (dynamicBanner && bannerImage) ?
      <Image
        src={dynamicBanner ? bannerImage : populardata?.bannerImage}
        alt="banner"
        loading='eager'
        priority={true}
        fill
        className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px]`}
      />
      : <Image
        src={populardata?.bannerImage}
        alt="banner"
        loading='eager'
        priority={true}
        fill
        className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px]`}
      />
  )
}

export default ImageView