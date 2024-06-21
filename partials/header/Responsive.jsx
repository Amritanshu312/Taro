"use client"
import { LuAlignLeft } from "react-icons/lu";
import Links from "./Links";
import { useState } from "react";

const Responsive = () => {
  const [isModelOpened, setIsModelOpened] = useState(false)
  return (
    <div className="flex">
      <div
        className="text-3xl text-white flex items-center justify-center mr-2 cursor-pointer min-[990px]:hidden"
        onClick={() => setIsModelOpened(!isModelOpened)}
      >
        <LuAlignLeft />
      </div>

      {isModelOpened ? <div className="w-44 bg-[#19172596] backdrop-blur-[26px] border-2 border-[#ffffff0a] absolute top-20 rounded-lg">
        <Links isMobile />
      </div> : null}

    </div>
  )
}

export default Responsive