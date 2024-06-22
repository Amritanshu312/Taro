import { HiOutlineBars3 } from "react-icons/hi2";
import { RiFilter3Line } from "react-icons/ri";

const EpisodeSelector = () => {
  return (
    <div className="bg-[#201f28] w-96 h-96 rounded-md">
      <div className="flex justify-between px-2 py-3 border-b-2 border-[#514f61a1]">
        <div className="bg-[#2e2b3d] h-10 rounded-md">
          <input type="text" placeholder="Ep Number" className="bg-transparent outline-none h-full w-full px-2 text-slate-200" />
        </div>
        <div className="bg-[#2e2b3d] flex gap-2 rounded-lg">
          <div className="text-[#d5d5d7] hover:bg-[#d5d5d7] hover:text-[#2e2b3d] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer"><RiFilter3Line /></div>
          <div className="bg-[#d5d5d7] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer"><HiOutlineBars3 /></div>
        </div>
      </div>

      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default EpisodeSelector