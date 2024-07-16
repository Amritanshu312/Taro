"use client"

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Checkbox from "../components/Checkbox"
import { Fragment, useState } from "react";

const Types = () => {
  const [isOpened, setIsOpened] = useState(true)
  const [checkBoxItem, setCheckBoxItem] = useState("")

  const types = [
    "TV",
    "OVA",
    "Movies",
    "Special",
    "ONA",
    "Music",
  ]

  return (
    <div>

      <div className="flex justify-between items-center cursor-pointer border-[#1a1921] border-b-[2px] pb-2 mt-4" onClick={() => setIsOpened(prev => !prev)}>
        <div className="text-[#efefef]">Types</div>
        <div>{isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
      </div>

      {isOpened ? <div className="mt-3 px-1 flex gap-12">

        <div className="flex flex-col gap-2">
          {types.slice(0, 3)?.map(item => <Fragment key={item}><Checkbox title={item} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} /></Fragment>)}
        </div>

        <div className="flex flex-col gap-2">
          {types.slice(3)?.map(item => <Fragment key={item}><Checkbox title={item} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} /></Fragment>)}
        </div>


      </div> : null}

    </div>
  )
}

export default Types