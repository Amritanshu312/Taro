"use client"
import useScreenDimensions from "@/hook/useScreenDimensions";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";


const Search = () => {
  const { width } = useScreenDimensions();
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  if (width <= 590) {

    return (
      isSearchBoxOpen ? <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 flex items-center justify-between bg-[#231f2c]">
        <div className="flex items-center text-white px-4 py-1 gap-2 rounded-md h-12 w-full">
          <div className="text-xl">
            <IoIosSearch />
          </div>

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full"
          />
        </div>

        <div className="text-3xl text-white cursor-pointer mr-2" onClick={() => setIsSearchBoxOpen(false)}>
          <IoCloseOutline />
        </div>

      </div> :
        <div className="text-2xl text-white cursor-pointer" onClick={() => setIsSearchBoxOpen(true)}>
          <IoIosSearch />
        </div>
    )
  }

  return (
    <div>
      <div className="flex items-center text-white bg-[#231f2c] px-4 py-1 gap-2 rounded-md h-10">
        <div className="text-xl">
          <IoIosSearch />
        </div>

        <input
          type="text"
          placeholder="Search"
          className="bg-[#231f2c] outline-none"
        />
      </div>
    </div>
  )
}

export default Search