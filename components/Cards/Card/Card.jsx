"use client"
import Image from "next/image"
import styles from "./Card.module.css"
import { useState } from "react"
import InfoWindow from "@/components/InfoWindow/InfoWindow"
import Link from "next/link"
import useScreenDimensions from "@/hook/useScreenDimensions"

const Card = ({ data, index, loading, hidden }) => {
  const [isHovered, setIsHovered] = useState({ hover: false, info: {} })
  let hoverTimer = null;

  const onMouseEnter = (data) => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      hoverTimer = setTimeout(() => {
        const { clientX, clientY } = data
        setIsHovered({ hover: true, info: { clientX, clientY } })
      }, 200);
    }
  }

  const onMouseLeave = () => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      clearTimeout(hoverTimer); // Cancel the timeout if mouse leaves before HoverTime
      setIsHovered({ hover: false, info: {} })
    }
  }

  const onInfoWindowMouseEnter = () => {
    setIsHovered((prev) => ({ ...prev, hover: true }))
  }

  const onInfoWindowMouseLeave = () => {
    setIsHovered((prev) => ({ ...prev, hover: false, info: {} }))
  }

  if (hidden) {
    return <div
      className={`aspect-[9/14] mb-2 bg-[#1c1b2000]`}
    ></div>
  }

  if (loading) {
    return <div
      className={`${styles.bounce} aspect-[9/14] rounded-2xl cursor-pointer mb-2 bg-[#22212c]`}
      style={{ animationDelay: `${index * 0.02 + 0.1}s` }}
    ></div>
  }

  return (
    <div className="aspect-[9/14] rounded-2xl cursor-pointer mb-2 relative" >
      <Link href={`/watch/${data?.id}`} className={`${styles.wrapper}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Image
          src={data?.coverImage?.extraLarge}
          alt="Trending"
          width={200}
          height={280}
          className="object-cover w-full h-full rounded-2xl cursor-pointer aspect-[4/6] pointer-events-none"
        />

        <div className={`${styles.info} bottom-2 left-0 right-0 absolute text-xs font-medium flex flex-wrap items-center justify-center gap-[.3rem] z-[7] opacity-0`}>
          <span className="uppercase text-slate-200">{data?.format}</span>
          <span className="text-[10px]">•</span>
          <span className="font-medium text-green-400">{data?.status}</span>
          <span className="text-[10px]">•</span>
          <span className="text-slate-200">Ep {data?.episodes}</span>
        </div>

      </Link>

      <div className="text-[#efebebf2] font-['Poppins'] font-medium text-[14px] mt-2 text-center line-clamp-2 text-ellipsis overflow-hidden mx-3">{data?.title?.english}</div>

      {isHovered?.hover && (
        <InfoWindow
          info={data}
          hoverdata={isHovered?.info}
          onMouseEnter={onInfoWindowMouseEnter}
          onMouseLeave={onInfoWindowMouseLeave}
        />
      )}
    </div>
  )
}

export default Card
