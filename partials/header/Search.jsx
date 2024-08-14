"use client";
import useScreenDimensions from "@/hook/useScreenDimensions";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import SearchResults from "./SearchResults";
import { usePathname, useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter()

  const { width } = useScreenDimensions();
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // or a loader/spinner
  }

  if (width <= 590) {
    return (
      isSearchBoxOpen ? (

        <div className="absolute w-[86%] top-1/2 left-0 -translate-y-1/2">
          <div className="relative w-full">

            <div className="h-12 flex items-center justify-between bg-[#231f2c]">
              <div className="flex items-center text-white px-4 py-1 gap-2 rounded-md h-12 w-full">
                <div className="text-xl">
                  <IoIosSearch />
                </div>

                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none w-full"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onKeyUp={e => {
                    if (e.key === "Enter") {
                      router.push(`/catalog?search=${searchValue}`);
                    }
                  }}
                />
              </div>

              <div className="text-3xl text-white cursor-pointer mr-2" onClick={() => setIsSearchBoxOpen(false)}>
                <IoCloseOutline />
              </div>
            </div>

            {searchValue !== "" && <SearchResults searchValue={searchValue} />}
          </div>
        </div>
      ) : (
        <div className="text-2xl text-white cursor-pointer" onClick={() => setIsSearchBoxOpen(true)}>
          <IoIosSearch />
        </div>
      )
    );
  }

  return (
    <div className="relative ">
      <div className="flex items-center text-white bg-[#231f2c] px-4 py-1 gap-2 rounded-md h-10">
        <div className="text-xl">
          <IoIosSearch />
        </div>

        <input
          type="text"
          placeholder="Search"
          className="bg-[#231f2c] outline-none"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyUp={e => {
            if (e.key === "Enter") {
              router.push(`/catalog?search=${searchValue}`);
            }
          }}
        />
      </div>

      {searchValue !== "" && <SearchResults searchValue={searchValue} />}
    </div>
  );
}

export default Search;
