"use client"

import clsx from "clsx"
import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"


const Dropdown = ({ data, checkBoxItem, setCheckBoxItem }) => {
  const dropdownItems = ["All", ...data]
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className="relative w-full">
      <div
        className="bg-[#1a1921] text-[#e9e8e8d5] px-3 py-2 w-full rounded-md cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpened(prev => !prev)}
      >
        <div className="text-[16px] font-['poppins']">{checkBoxItem === "" ? dropdownItems[0] : checkBoxItem}</div>
        <div>{isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
      </div>

      {isOpened ? <div className="bg-[#1a1921] flex flex-col text-[#e9e8e8d5] mt-2 rounded-md absolute w-full overflow-hidden font-['poppins'] text-[15px]">
        {dropdownItems?.map(item => <div
          key={item}
          className={clsx(
            "hover:bg-[#252330] py-2 px-3 cursor-pointer",
            { 'bg-[#252330]': (checkBoxItem === "" ? "All" : checkBoxItem) === item }
          )}
          onClick={() => {
            setCheckBoxItem(item === "All" ? "" : item)
            setIsOpened(false)
          }}
        >{item}</div>)}
      </div> : null}

    </div>
  )
}

export default Dropdown