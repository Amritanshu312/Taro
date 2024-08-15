/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io";

const Select = ({ data, defaultValue, setSelected }) => {
  const [isOpened, setisOpened] = useState({ opened: false, id: defaultValue })

  const onitemClick = (id) => {
    setisOpened({ id: id, opened: false })
  }

  useEffect(() => {
    setSelected({ id: isOpened.id, value: data[isOpened.id] })
  }, [isOpened.id])


  return (
    <div className="w-full relative">
      <div
        className="relative text-[15px] bg-[#406c807a] text-slate-200 cursor-pointer w-full px-[24px] font-['poppins'] rounded-md py-1 border-2 border-[#3f72896e] flex items-center justify-center gap-2"
        onClick={() => setisOpened({ ...isOpened, opened: !isOpened?.opened })}
      >{data[isOpened?.id] ? data[isOpened?.id] : "1 - 80"} <span className="text-md"><IoIosArrowDown /></span>
      </div>

      {isOpened?.opened ? <div className="bg-[#406c807a] p-1 rounded-md mt-1 flex flex-col gap-1 absolute z-20 backdrop-blur-lg w-full">
        {data?.map((item, index) => <div
          key={index}
          className="hover:bg-[#163245ba] cursor-pointer rounded-md h-8 flex items-center justify-center text-slate-300"
          style={{ backgroundColor: isOpened?.id === index || (index === defaultValue && !isOpened?.id) ? "#163245ba" : "" }}
          onClick={() => onitemClick(index)}
        >
          {item}
        </div>)}

        {(data.length < 1) && <div className="text-center text-slate-300 text-[14px]">No Episode Found</div>}

      </div> : null}
    </div>
  )
}

export default Select