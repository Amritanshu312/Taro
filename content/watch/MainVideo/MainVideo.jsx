"use client"

import { useWatchContext } from "@/context/Watch";
import EpInfo from "./EpInfo";
import Option from "./Option"
import Server from "./Server";
import VideoPlayer from "./videoPlayer/VideoPlayer";

const MainVideo = () => {
  const { episode } = useWatchContext();

  return (
    <div className="w-full bg-[#22212c] rounded-md p-2 !pb-0 flex flex-col">

      <VideoPlayer />

      <Option />

      <div className="h-full min-h-[124px] bg-[#484460] text-slate-100 flex rounded-md overflow-hidden mt-4 shadow-[3px_13px_29px_0px_#48455fbd] max-[880px]:flex-col">
        <EpInfo episode={episode} />
        <Server />
      </div>

    </div>
  )
}

export default MainVideo