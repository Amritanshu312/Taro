import { useWatchContext } from "@/context/Watch"
import Image from "next/image"

const EpisodeCard = ({ info, currentEp }) => {
  const { setEpisode } = useWatchContext()
  return (
    <div
      className={`flex gap-3 py-2 border-2 border-[#21232e] rounded-md hover:bg-[#242430] cursor-pointer group ${currentEp === info?.number ? 'bg-[#242430]' : 'bg-[#1f1f28]'}`}
      onClick={() => setEpisode(info?.number)}
    >
      <div className="w-full max-w-[150px] relative">
        <Image src={info?.image} alt="ep1" width={150} height={100} className="object-cover w-full h-[82px] rounded-md" />
        <div className="text-[#ffffffe0] absolute bottom-1 right-1 bg-[#262233d4] px-1 rounded-lg text-[15px]">24m</div>
      </div>
      <div className="w-full pr-1">
        <div className="text-slate-200 text-wrap break-words overflow-hidden text-ellipsis line-clamp-2 font-['poppins'] text-sm">{info?.title}</div>
        <div className="text-[#ffffffa3] font-['poppins'] text-[14px]">Episode {info?.number}</div>
      </div>
    </div>

  )
}

export default EpisodeCard