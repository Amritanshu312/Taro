"use client"
import HLSPlayer from "@/components/HSLplayer";
import clsx from "clsx";
import Image from "next/image"
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

const ContinueWatchingCard = ({ data, hidden }) => {

  if (hidden) {
    return <div className=""></div>
  }

  return (
    <Link
      className="w-full h-full aspect-video cursor-pointer rounded-xl relative overflow-hidden border-2 border-[#22212c] bg-[#22212c] group"
      href={`/watch/${data?.id}?ep=${data?.episode}${data?.videoURL ? `&videoURL=${data?.videoURL}` : ""}`}
    >
      <Image
        src={data?.thumbnail}
        alt="thumbnail"
        height={284}
        width={388}
        className="object-cover w-full h-full group-hover:h-[106%] duration-200"
      />

      <div className="w-full h-20 absolute flex flex-col justify-between bottom-0 after:content-[''] after:w-full after:h-28 after:absolute after:bottom-0 after:bg-[linear-gradient(360deg,#060602,#00000069,transparent)]">
        <div className="flex flex-col mx-3 justify-between gap-3 z-10">

          <div className="flex items-center justify-between w-full ">
            <div>
              <div className="text-white w-full text-wrap break-words overflow-hidden text-ellipsis line-clamp-1 font-['poppins'] text-lg cursor-pointer hover:text-slate-200">{data?.title}</div>
              <div className="text-[#ffffff8a] font-['poppins'] text-[14px]">Episode: {data?.episode}</div>
            </div>

            <div className="p-[13px] rounded-full flex items-center justify-center bg-[#1a212bd0] text-[#8c97a7] cursor-pointer border border-[#242b35] backdrop-blur-sm hover:bg-[#2c3440d0] hover:text-[#abbcd5] duration-100 ">
              <FaPlay />
            </div>

          </div>

          <div className="w-full bg-[#404141] h-1 rounded-md">
            <div
              className="h-full bg-[#dd8dae] rounded-md"
              style={{ width: `${(data?.currentTime * 100 / data?.duration) || 0}%` }}
            ></div>
          </div>

        </div>


      </div>
    </Link>
  )
}

export default ContinueWatchingCard