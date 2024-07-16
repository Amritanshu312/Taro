"use client"

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Checkbox from "../components/Checkbox"
import { Fragment, useState } from "react";
import Dropdown from "../components/Dropdown";

const AiringStatus = () => {
  const [isOpened, setIsOpened] = useState(true)
  const [checkBoxItem, setCheckBoxItem] = useState("")
  console.log(checkBoxItem);
  const airings = [
    "Airing",
    "Finished",
    "Not yet Aired",
    "Cancelled",
  ]

  return (
    <div>

      <div className="flex justify-between items-center cursor-pointer border-[#1a1921] border-b-[2px] pb-2 mt-4" onClick={() => setIsOpened(prev => !prev)}>
        <div className="text-[#efefef]">Airing Status</div>
        <div>{isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
      </div>

      {isOpened ? <div className="mt-3 px-1 flex flex-col gap-2">

        {/* {airings?.map(item => <Fragment key={item}><Checkbox title={item} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} /></Fragment>)} */}
        <Dropdown data={airings} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} />


      </div> : null}

    </div>
  )
}

export default AiringStatus