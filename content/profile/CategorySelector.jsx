"use client"
import { LuEye } from "react-icons/lu"
import { FaRegBookmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineFrontHand } from "react-icons/md";
import { BiBullseye } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import clsx from "clsx";
import { useMemo } from "react";

const CategorySelector = ({ active, setActive, data }) => {

  const statusMap = useMemo(() => {
    return data.reduce((acc, item) => {
      if (item && item.status) {
        acc[item.status] = (item.entries || []).length;
      }
      return acc;
    }, {});
  }, [data]);

  // Memoize the categorys array
  const categorys = useMemo(() => [
    {
      title: "Watching",
      id: "CURRENT",
      icon: <LuEye />,
      number: statusMap['CURRENT'] || 0,
    },
    {
      title: "To Watch",
      id: "PLANNING",
      icon: <FaRegBookmark />,
      number: statusMap['PLANNING'] || 0,
    },
    {
      title: "Watched",
      id: "COMPLETED",
      icon: <IoMdCheckmark />,
      number: statusMap['COMPLETED'] || 0,
    },
    {
      title: "On Hold",
      id: "PAUSED",
      icon: <MdOutlineFrontHand />,
      number: statusMap['PAUSED'] || 0,
    },
    {
      title: "Dropped",
      id: "DROPPED",
      icon: <BiBullseye />,
      number: statusMap['DROPPED'] || 0,
    },
    {
      title: "Statistics",
      id: "STATISTICS",
      icon: <IoPersonOutline />
    }
  ], [statusMap]);

  return (
    <div className="relative w-full min-[762px]:h-14 border-b border-[#23253274] text-white z-10">
      <div className="flex items-center justify-center h-full gap-1 max-[762px]:flex-wrap">


        {categorys.map((item, index) => <div
          key={index}
          className={
            clsx(
              "relative flex gap-1 items-center cursor-pointer px-2 py-4 justify-center after:bg-[#ffffff9d] after:hover:w-full after:h-[3px] after:rounded-lg after:absolute after:bottom-0 after:w-0 after:transition-all",
              { "after:bg-[#ffffff9d] after:w-full after:h-[3px] after:rounded-lg after:absolute after:bottom-0": categorys.find(item => item?.id === active)?.title === item?.title }
            )
          }
          onClick={() => setActive(item?.id)}
        >
          <div className="text-xl">{item?.icon}</div>
          <div>{item?.title}</div>
          <span>{item?.number}</span>
        </div>)}

      </div>
    </div>
  )
}

export default CategorySelector