"use client"
import { useState } from "react"
import Animes from "./Animes"
import CategorySelector from "./CategorySelector"

const CategoryMain = ({ lists }) => {
  const [active, setActive] = useState("CURRENT")  // by default Watching (ID)

  return (
    <div>
      <CategorySelector active={active} setActive={setActive} />
      <Animes data={lists.find(item => item?.status === active)} />
    </div>
  )
}

export default CategoryMain