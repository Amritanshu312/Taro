/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const CatalogSelect = ({ setSortBy }) => {
  const data = [
    { key: "UPDATED", value: "upadted" },
    { key: "POPULAR", value: "popular" },
    { key: "UltraPp", value: "update at" },
    { key: "POPULAR", value: "trending" },
  ]
  const [isOpened, setIsOpened] = useState(false)
  const [active, setActive] = useState(data[0]?.value)

  useEffect(() => {
    setSortBy(data.find(item => item?.value === active))
  }, [active])

  return (
    <div className="w-full relative">
      <div
        className="relative text-[15px] bg-[#406c807a] text-slate-200 cursor-pointer w-full px-[24px] font-['poppins'] rounded-md py-1 border-2 border-[#3f72896e] flex items-center justify-center gap-2"
        onClick={() => setIsOpened(prev => !prev)}
      >
        {active} <span className="text-md"><IoIosArrowDown /></span>
      </div>

      {isOpened ? <div className="bg-[#406c807a] overflow-hidden text-center text-slate-200 absolute w-full border-[1px] border-[#3f72896e] rounded-md mt-1">
        {data?.map(item => <div
          key={item?.value}
          className={clsx(
            "hover:bg-[#406c8078] py-1 cursor-pointer",
            { "bg-[#406c8078]": active === item?.value }
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