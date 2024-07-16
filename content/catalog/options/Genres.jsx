"use client"

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Checkbox from "../components/Checkbox"
import { Fragment, useState } from "react";

const Genres = ({ genresitem, setGenres }) => {
  const [isOpened, setIsOpened] = useState(true)
  const checkBoxItem = genresitem, setCheckBoxItem = setGenres

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Horror",
    "Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller"
  ]

  return (
    <div>

      <div className="flex justify-between items-center cursor-pointer border-[#1a1921] border-b-[2px] pb-2 mt-4" onClick={() => setIsOpened(prev => !prev)}>
        <div className="text-[#efefef]">Genres</div>
        <div>{isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
      </div>

      {isOpened ? <div className="mt-3 px-1 flex flex-col gap-2">

        {genres?.map(item => <Fragment key={item}><Checkbox title={item} checkBoxItem={checkBoxItem} setCheckBoxItem={setCheckBoxItem} multipleSelect /></Fragment>)}


      </div> : null}

    </div>
  )
}

export default Genres