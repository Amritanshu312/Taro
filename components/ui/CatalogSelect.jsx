/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const CatalogSelect = ({ data, setSortBy, active, setActive }) => {
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    setSortBy(data.find(item => item?.value === active))
  }, [active])

  return (
    <div className="w-full relative">
      <div
        className="bg-[#242735] border-[#39374b] relative text-[15px] text-slate-200 cursor-pointer w-full px-[24px] font-['poppins'] rounded-md py-1 border flex items-center justify-center gap-2"
        onClick={() => setIsOpened(prev => !prev)}
      >
        {active} <span className="text-md"><IoIosArrowDown /></span>
      </div>

      {isOpened ? <div className="bg-[#242735] border-[#39374b] backdrop-blur-md z-10 overflow-hidden text-center text-slate-200 absolute w-full border-[1px] rounded-md mt-1">
        {data?.map(item => <div
          key={item?.value}
          className={clsx(
            "hover:bg-[#1a1924] py-1 cursor-pointer",
            { "bg-[#1a1924]": active === item?.value }
          )}
          onClick={() => {
            setActive(item?.value)
            setIsOpened(false)
          }}
        >
          {item?.value}
        </div>
        )}
      </div> : null}

    </div>
  )
}

export default CatalogSelect