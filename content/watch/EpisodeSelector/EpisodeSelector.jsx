"use client";
import Select from "@/components/ui/Select";
import { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RiFilter3Line } from "react-icons/ri";
import EpisodeCard from "./EpisodeCard";
import { useWatchContext } from "@/context/Watch";

const EpisodeSelector = ({ sub, dub }) => {
  const [dubSelected, setDubSelected] = useState({ id: 0 });
  const [epFromTo, setEpFromTo] = useState({});

  const { setIsDub, episode } = useWatchContext()

  const data = dubSelected?.id === 0 || dubSelected?.id === 1 ? sub : dub;

  useEffect(() => {
    if (dubSelected?.id === 0 || dubSelected?.id === 1) {
      setIsDub(false)
    } else {
      setIsDub(true)
    }
  }, [dubSelected?.id])

  return (
    <div className="bg-[#201f28] max-w-[22rem] rounded-md w-full">
      <div>
        <div className="flex justify-between px-2 py-3 border-b-2 border-[#514f61a1]">
          <div className="bg-[#2e2b3d] h-10 rounded-md">
            <input type="text" placeholder="Ep Number" className="bg-transparent outline-none h-full w-full px-2 text-slate-200 max-w-[13rem]" />
          </div>
          <div className="bg-[#2e2b3d] flex gap-2 rounded-lg">
            <div className="text-[#d5d5d7] hover:bg-[#d5d5d7] hover:text-[#2e2b3d] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer"><RiFilter3Line /></div>
            <div className="bg-[#d5d5d7] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer"><HiOutlineBars3 /></div>
          </div>
        </div>
        <div className="flex justify-between px-2 py-3 gap-4 ">
          <div className="w-full"><Select setSelected={setDubSelected} data={["sub & dub", "sub", "dub"]} defaultValue={0} /></div>
          <div className="w-full"><Select setSelected={setEpFromTo} data={["1-100", "100-200", "200-300"]} defaultValue={0} /></div>
        </div>
      </div>

      <div className="px-2 overflow-y-scroll h-[44rem]">

        {data.map((item, index) => <EpisodeCard key={index} info={item} currentEp={episode} />)}
        {data.length === 0 || data === undefined || !data ? <p className="text-[#d5d5d7] text-center mt-5">No episodes found</p> : null}
      </div>
    </div>
  )
}

export default EpisodeSelector