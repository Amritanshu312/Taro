"use client"
import { useEffect, useState } from "react";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { FaArrowRight } from "react-icons/fa";
import { getWatchProgress } from "@/utils/GetProgress";

const WatchHistory = () => {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    const data = getWatchProgress()

    if (data) {
      setMappedData(data);
    }
  }, []);


  return mappedData.length < 1 ? null : (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">| Continue Watching</h1>

        <div className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition">See All <FaArrowRight /></div>
      </div>

      <div className="mt-8 mb-24 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-3">
        {mappedData.map(data => (
          <ContinueWatchingCard key={data.id} data={data} />
        ))}

        {(mappedData?.length < 4) ? Array.from({ length: 4 - mappedData?.length }).map((i, _) => <ContinueWatchingCard key={_} hidden />) : null}
      </div>
    </div>
  );
}

export default WatchHistory;
