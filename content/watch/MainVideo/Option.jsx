import { LuExpand } from "react-icons/lu";
import { FaForward, FaLightbulb } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useWatchSettingContext } from "@/context/WatchSetting";
import { useWatchContext } from "@/context/Watch";
import { BiCollapse } from "react-icons/bi";

const Option = () => {
  const { setWatchSetting, watchSetting } = useWatchSettingContext()
  const { setEpisode } = useWatchContext()

  return (
    <div className="flex justify-between bg-[#22212c] px-2 py-2 text-slate-200 text-sm max-[880px]:flex-col max-[880px]:gap-[15px]">
      <div className="flex gap-3 max-[880px]:flex-wrap">

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, isExpanded: !prev.isExpanded }))}
        ><span>{watchSetting.isExpanded ? <BiCollapse /> : <LuExpand />}</span> {watchSetting.isExpanded ? "Collapse" : "Expand"}</div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, light: !prev.light }))}
        >
          <span><FaLightbulb /></span>
          Light
          <span className="text-[#e26bbd]">{watchSetting.light ? "On" : "Off"}</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, autoPlay: !prev.autoPlay }))}
        >Auto Play <span className="text-[#e26bbd]">{watchSetting.autoPlay ? "On" : "Off"}</span></div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, autoNext: !prev.autoNext }))}
        >Auto Next <span className="text-[#e26bbd]">{watchSetting.autoNext ? "On" : "Off"}</span></div>

        <div className="flex items-center gap-2 cursor-pointer">Auto Skip Intro <span className="text-[#e26bbd]">Off</span></div>
      </div>

      <div className="flex gap-3">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setEpisode(prev => prev > 1 ? prev - 1 : prev)}
        ><span><FaBackward /></span> Prev</div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setEpisode(prev => prev + 1)}
        >Next <span><FaForward /></span></div>
        <div className="flex items-center gap-2 cursor-pointer"><span className="text-xl"><GoPlus /></span> Add to List</div>
      </div>
    </div>
  )
}

export default Option