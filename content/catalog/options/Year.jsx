"use client"
import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const Year = () => {
  const [isOpened, setIsOpened] = useState(true)

  return (
    <div>

      <div
        className="flex justify-between items-center cursor-pointer border-[#1a1921] border-b-[2px] pb-2"
        onClick={() => setIsOpened(prev => !prev)}
      >
        <div className="text-[#efefef]">Year</div>
        <div>{isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
      </div>

      {isOpened ? <div
        className="mt-3 px-1 flex items-center justify-center"
      >
        <div className="bg-[#1a1921] px-8 py-2 w-max rounded-md cursor-pointer text-[#e9e8e88e]">2020</div>
        <div className="w-full bg-[#2c3144] h-[2px] max-w-20"></div>
        <div className="bg-[#1a1921] px-8 py-2 w-max rounded-md cursor-pointer text-[#e9e8e88e]">2023</div>
      </div> : null}

    </div>
  )
}

export default Year