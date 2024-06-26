import { LuExpand } from "react-icons/lu";
import { FaForward, FaLightbulb } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

const Option = () => {
  return (
    <div className="flex justify-between bg-[#22212c] px-2 py-2 text-slate-200 text-sm">
      <div className="flex gap-3">
        <div className="flex items-center gap-2 cursor-pointer"><span><LuExpand /></span> Expand</div>
        <div className="flex items-center gap-2 cursor-pointer"><span><FaLightbulb /></span> Light <span className="text-[#e26bbd]">Off</span></div>
        <div className="flex items-center gap-2 cursor-pointer">Auto Play <span className="text-[#e26bbd]">Off</span></div>
        <div className="flex items-center gap-2 cursor-pointer">Auto Next <span className="text-[#e26bbd]">Off</span></div>
        <div className="flex items-center gap-2 cursor-pointer">Auto Skip Intro <span className="text-[#e26bbd]">Off</span></div>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 cursor-pointer"><span><FaBackward /></span> Prev</div>
        <div className="flex items-center gap-2 cursor-pointer">Next <span><FaForward /></span></div>
        <div className="flex items-center gap-2 cursor-pointer"><span className="text-xl"><GoPlus /></span> Add to List</div>
      </div>
    </div>
  )
}

export default Option