"use client"
import Image from "next/image"
import { motion } from "framer-motion"

const ProfileCard = ({ info, loading, hidden }) => {
  const animeInfo = info?.media


  const listItem = {
    hidden: { scale: 0 },
    show: { scale: 1 }
  };

  if (hidden) {
    return <motion.div className="aspect-[9/14] relative rounded-xl mb-2 overflow-hidden opacity-0" variants={listItem}></motion.div>
  }

  if (loading) {
    return (
      <div className="aspect-[9/14] relative rounded-xl cursor-pointer mb-2 overflow-hidden bg-[#22212c]">
        <div className="absolute bottom-[13px] left-[15px] z-10 w-full">
          <div className="w-[88%] h-4 bg-[#48465e] rounded-md"></div>
          <div className="w-[40px] h-3 bg-[#48465e] rounded-md mt-2"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div className="aspect-[9/14] relative rounded-md cursor-pointer mb-2 overflow-hidden" variants={listItem}>

      <div className="w-full h-full aspect-[9/14] after:content-[''] after:w-full after:h-[36%] after:absolute after:flex after:bg-[linear-gradient(360deg,#12111ab8,#0000)] after:left-0 after:bottom-0">
        <Image
          src={animeInfo?.coverImage?.extraLarge}
          alt="Trending"
          width={200}
          height={280}
          className="object-cover w-full h-full rounded-xl cursor-pointer aspect-[4/6] pointer-events-none "
        />
      </div>

      <div className="absolute bottom-[13px] left-[15px] text-white z-10">
        <div className="line-clamp-1 text-ellipsis overflow-hidden font-medium cursor-pointer mr-1 transition-all hover:text-[#bca2e0]">{animeInfo?.title?.english || animeInfo?.title?.romaji}</div>
        <div className="text-sm text-[#c3c2c2be]">{animeInfo?.status.charAt(0).toUpperCase() + animeInfo?.status.slice(1).toLowerCase()}</div>
      </div>

    </motion.div>
  )
}

export default ProfileCard