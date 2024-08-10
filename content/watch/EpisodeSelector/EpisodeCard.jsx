import { useCallback } from "react";
import { useWatchContext } from "@/context/Watch";
import clsx from "clsx";
import Image from "next/image";

const EpisodeCard = ({ info, currentEp, loading, watchedEP }) => {
  const { setEpisode } = useWatchContext();

  const handleClick = useCallback(() => {
    if (info?.number) {
      setEpisode(info.number);
    }
  }, [info?.number, setEpisode]);

  if (loading) {
    return (
      <div
        className="flex py-2 h-[96px] my-[3px] border-2 border-[#21232e] rounded-md bg-[#242430] cursor-pointer group relative"
      >
        <div className="absolute bottom-1/2 translate-y-1/2 flex gap-3 w-full">
          <div className="h-[80px] min-w-[150px] bg-[#48455f] rounded-md"></div>
          <div className="w-full flex flex-col gap-3">
            <div className="h-4 w-full bg-[#48465e] rounded-sm"></div>
            <div className="h-6 w-full bg-[#48465e] rounded-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex gap-3 py-2 border-2 border-[#21232e] rounded-md hover:bg-[#242430] cursor-pointer group",
        {
          "bg-[#242430]": currentEp === info?.number,
          "bg-[#1f1f28]": currentEp !== info?.number && !watchedEP?.includes(info?.number),
          "bg-[#2a2a38] hover:bg-[#1c1c26]": watchedEP?.includes(info?.number),
        }
      )}
      onClick={handleClick}
    >
      <div className="w-full max-w-[150px] relative">
        <Image
          src={info?.image || "/default-image.jpg"}
          alt={`Episode ${info?.number}`}
          width={150}
          height={100}
          className="object-cover w-full h-[82px] rounded-md"
        />
        <div className="text-[#ffffffe0] absolute bottom-1 right-1 bg-[#262233d4] px-1 rounded-lg text-[15px]">
          24m
        </div>
      </div>
      <div className="w-full pr-1">
        <div className="text-slate-200 text-wrap break-words overflow-hidden text-ellipsis line-clamp-2 font-['poppins'] text-sm">
          {info?.title || "No title available"}
        </div>
        <div className="text-[#ffffffa3] font-['poppins'] text-[14px]">
          Episode {info?.number}
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
