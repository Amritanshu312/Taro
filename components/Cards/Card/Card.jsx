"use client"
import Image from "next/image"
import styles from "./Card.module.css"
import { useState } from "react"
import InfoWindow from "@/components/InfoWindow/InfoWindow"

const Card = ({ data, loading }) => {
  const [isHovered, setIsHovered] = useState({ hover: false, info: {} })


  const onmouseEnter = (data) => {
    const { clientX, clientY } = data
    setIsHovered({ hover: true, info: { clientX, clientY } })
  }

  const onmouseLeave = () => {
    setIsHovered({ hover: false, info: {} })
  }

  if (loading) {
    return <div className={`${styles.bounce} aspect-[9/14] rounded-2xl cursor-pointer mb-2 bg-[#22212c]`}></div>
  }

  return (
    <div className="aspect-[9/14] rounded-2xl cursor-pointer mb-2 relative" onMouseEnter={onmouseEnter} onMouseLeave={onmouseLeave}>
      <div className={`${styles.wrapper}`}>
        <Image
          src={data?.coverImage?.extraLarge}
          alt="Trending"
          width={200}
          height={280}
          className="object-cover w-full h-full rounded-2xl cursor-pointer aspect-[4/6]"
        />

        <div className={`${styles.info} bottom-2 left-0 right-0 absolute text-xs font-medium flex flex-wrap items-center justify-center gap-[.3rem] z-[7] opacity-0`}>
          <span className="uppercase text-slate-200">{data?.format}</span>
          <span className="text-[10px]">•</span>
          <span className="font-medium text-green-400">{data?.status}</span>
          <span className="text-[10px]">•</span>
          <span className="text-slate-200">Ep {data?.episodes}</span>
        </div>

      </div>

      <div className="text-[#efebebf2] font-['Poppins'] font-medium text-[14px] mt-2 text-center line-clamp-2 text-ellipsis overflow-hidden mx-3">{data?.title?.english}</div>

      {isHovered?.hover ? <InfoWindow info={data} hoverdata={isHovered?.info} /> : null}
    </div>
  )
}

export default Card