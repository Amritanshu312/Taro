"use client"
import { LuClock3 } from "react-icons/lu";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useMemo } from "react";

const Categorys = ({ user, lists }) => {
  const watchingAnime = lists.find(item => item?.status === "CURRENT")
  const droppedAnime = lists.find(item => item?.status === "DROPPED")

  const AnimesWatchedThisMonth = useMemo(() => {
    const currentMonth = new Date().getMonth() + 1;

    return watchingAnime?.entries.filter(item => item?.startedAt?.month === currentMonth) || [];
  }, [watchingAnime]);


  return (
    <div className="flex justify-center gap-6 flex-wrap" >

      <div className="w-64 h-44 max-[535px]:mr-24 max-[535px]:mt-4 rounded-lg border-2 border-[#fce3ee88] flex flex-col justify-between items-center cursor-pointer text-white py-6 transition-all hover:bg-[#f485b0] hover:shadow-[0px_0px_20px_2px_#f485b0] group">
        <div className="text-[#f070a8e4] font-['poppins'] text-[15px] font-semibold">TOTAL MINUTES</div>
        <div className="relative text-4xl text-[#ff1940]">
          <div><LuClock3 /></div>
          <div className="absolute top-[40%] left-[40%] text-[#e6e4e476] text-[28px] -z-10 transition-all group-hover:text-4xl group-hover:top-0 group-hover:left-0"><LuClock3 /></div>
        </div>

        <div className="font-['poppins'] font-bold text-[#d23758]">{user?.statistics?.anime?.minutesWatched < 35693 ? user?.statistics?.anime?.minutesWatched : 35693}+</div>
      </div>

      <div className="w-64 h-44 min-[535px]:mt-12 max-[535px]:ml-24 rounded-lg border-2 border-[#d9e8d988] flex flex-col justify-between items-center cursor-pointer text-white py-6 transition-all hover:bg-[#d9e8d9] hover:shadow-[0px_0px_20px_2px_#d9e8d9] group">
        <div className="text-[#71b69b] font-['poppins'] text-[14px] font-semibold">WATCHED EPISODES</div>
        <div className="relative text-4xl text-[#32b3a3]">
          <div><HiOutlineDesktopComputer /></div>
          <div className="absolute top-[40%] left-[40%] text-[#e6e4e476] text-[28px] -z-10 transition-all group-hover:text-4xl group-hover:top-0 group-hover:left-0"><HiOutlineDesktopComputer /></div>
        </div>

        <div className="font-['poppins'] font-bold text-[#106057]">{user?.statistics?.anime?.episodesWatched}+</div>
      </div>

      <div className="w-64 h-44 max-[535px]:mr-24 rounded-lg border-2 border-[#edd8c688] flex flex-col justify-between items-center cursor-pointer text-white py-6 transition-all hover:bg-[#ebe3dc] hover:shadow-[0px_0px_20px_2px_#ebe3dc] group">
        <div className="text-[#cf7650] font-['poppins'] text-[15px] font-semibold">WATCHED THIS MONTHS</div>
        <div className="relative text-4xl text-[#ff661f]">
          <div><IoCalendarClearOutline /></div>
          <div className="absolute top-[40%] left-[40%] text-[#e6e4e476] text-[28px] -z-10 transition-all group-hover:text-4xl group-hover:top-0 group-hover:left-0"><IoCalendarClearOutline /></div>
        </div>

        <div className="font-['poppins'] font-bold text-[#b96037c1]">{AnimesWatchedThisMonth.length}+</div>
      </div>

      <div className="w-64 h-44 min-[535px]:mt-12 max-[535px]:ml-24 rounded-lg border-2 border-[#c1dbf388] flex flex-col justify-between items-center cursor-pointer text-white py-6 transition-all hover:bg-[#70bcebea] hover:shadow-[0px_0px_20px_2px_#2e82cf] group">
        <div className="text-[#2e82cf] font-['poppins'] text-[15px] font-semibold">TOTAL DROPPED</div>
        <div className="relative text-4xl text-[#2699df]">
          <div><MdDeleteOutline /></div>
          <div className="absolute top-[40%] left-[40%] text-[#e6e4e476] text-[28px] -z-10 transition-all group-hover:text-4xl group-hover:top-0 group-hover:left-0"><MdDeleteOutline /></div>
        </div>

        <div className="font-['poppins'] font-bold text-[#1f94dd98]">{droppedAnime?.entries?.length || 0}+</div>
      </div>

    </div>
  )
}

export default Categorys