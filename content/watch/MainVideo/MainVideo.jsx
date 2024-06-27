"use client"

import { useWatchContext } from "@/context/Watch";
import EpInfo from "./EpInfo";
import Option from "./Option"
import Server from "./Server";
import VideoPlayer from "./VideoPlayer";

const MainVideo = ({ sub, dub }) => {
  const { episode } = useWatchContext();
  console.log(episode);

  return (
    <div className="w-full bg-[#22212c] rounded-md p-2 flex flex-col">
      <div>
        <VideoPlayer />
      </div>

      <Option />

      <div className="h-full  bg-[#484460] text-slate-100 flex rounded-md overflow-hidden mt-1 shadow-[4px_6px_18px_-4px_#48455f]">
        <EpInfo episode={episode} />
        <Server sub={sub} dub={dub} />
      </div>
    </div>
  )
}

export default MainVideo