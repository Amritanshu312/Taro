"use client"
import { useState } from "react"
import Animes from "./Animes"
import CategorySelector from "./CategorySelector"
import Statistics from "./Statistics/Statistics"

const CategoryMain = ({ lists, user, watchedAnime }) => {
  const [active, setActive] = useState("CURRENT")  // by default Watching (ID)

  return (
    <div>
      <CategorySelector active={active} setActive={setActive} data={lists} />
      {active !== "STATISTICS" ?
        <Animes data={active === "COMPLETED" ? watchedAnime : lists.find(item => item?.status === active)} />
        :
        <Statistics user={user} lists={lists} />}
    </div>
  )
}

export default CategoryMain