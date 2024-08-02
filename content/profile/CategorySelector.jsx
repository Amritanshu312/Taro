"use client"
import { LuEye } from "react-icons/lu"
import { FaRegBookmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineFrontHand } from "react-icons/md";
import { BiBullseye } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";

const CategorySelector = () => {
  const [active, setActive] = useState("Watching")
  const categorys = [
    {
      title: "Watching",
      icon: <LuEye />,
      number: 46
    },
    {
      title: "To Watch",
      icon: <FaRegBookmark />,
      number: 46
    },
    {
      title: "Watched",
      icon: <IoMdCheckmark />,
      number: 46
    },
    {
      title: "On Hold",
      icon: <MdOutlineFrontHand />,
      number: 46
    },
    {
      title: "Dropped",
      icon: <BiBullseye />,
      number: 46
    },
    {
      title: "Statistics",
      icon: <IoPersonOutline />
    },
  ]
  return (
    <div className="relative w-full h-14 border-b border-[#23253274] text-white z-10">
      <div className="flex items-center justify-center h-full gap-1">


        {categorys.map((item, index) => <div
          key={index}
          className={
            clsx(
              "relative flex gap-1 items-center cursor-pointer px-2 py-4 justify-center after:bg-[#ffffff9d] after:hover:w-full after:h-[3px] after:rounded-lg after:absolute after:bottom-0 after:w-0 after:transition-all",
              { "after:bg-[#ffffff9d] after:w-full after:h-[3px] after:rounded-lg after:absolute after:bottom-0": active === item?.title }
            )
          }
          onClick={() => setActive(item?.title)}
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