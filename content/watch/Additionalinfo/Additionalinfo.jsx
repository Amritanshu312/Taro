"use client"
import { useState } from "react"
import Characters from "./Characters/Characters"
import clsx from "clsx"
import Relations from "./Relations/Relations"

const Additionalinfo = ({ info }) => {
  const [active, setActive] = useState("Relation")

  const links = ["Characters", "Relation"]

  return (
    <div className="mt-8 mb-16 w-full">
      <div className="text-white flex w-full relative gap-2">

        {links.map(item => <div
          key={item}
          onClick={() => item !== "Comments" && setActive(item)}
          className={clsx(
            "px-[16px] py-[8px] text-[18px] font-medium relative after:content-[''] after:absolute after:w-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-[#8c8c8e] after:rounded-md after:transition-all hover:after:w-full after:z-10 cursor-pointer max-[380px]:text-[16px]",
            { "after:w-full": item === active }
          )}
        >{item}</div>)}


        {/* small line */}
        <div className="w-full h-[1px] absolute bg-[#212029] bottom-[1px]"></div>
      </div>

      {active === "Characters" ? <Characters info={info} /> : null}
      {active === "Relation" ? <Relations info={info} setActive={setActive} /> : null}

    </div>
  )
}

export default Additionalinfo
