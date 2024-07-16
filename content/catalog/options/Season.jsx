"use client"

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Checkbox from "../components/Checkbox"
import { useState } from "react";

const Season = () => {
  const [isOpened, setIsOpened] = useState(true)
  const [checkBoxItem, setCheckBoxItem] = useState("Winter")

  console.log(checkBoxItem);

  return (
    <div>

      <div className="flex justify-between items-center cursor-pointer border-[#1a1921] border-b-[2px] pb-2 mt-4" onClick={()=> setIsOpened(prev => !prev)}>
        <div className="text-[#efefef]">Season</div>
        <div>{isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
      </div>

      {isOpened ? <div className="mt-3 px-1 flex flex-col gap-2">

        <Checkbox title={"Winter"} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} />
        <Checkbox title={"Spring"} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} />
        <Checkbox title={"Summer"} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} />
        <Checkbox title={"Fall"} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} />

      </div> : null}

    </div>
  )
}

export default Season