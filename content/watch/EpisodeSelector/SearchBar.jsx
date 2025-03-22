import { HiOutlineBars3 } from "react-icons/hi2";
import { LuLayoutGrid } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { useEffect } from "react";

const SearchBar = ({ searchQuery, handleSearchQueryChange, setShowType, showType }) => {

  useEffect(() => {
    if (!allepisodelayout.length) return;
    const storedType = localStorage.getItem("episode_list_type");
    const foundIndex = allepisodelayout.findIndex(item => item.title === storedType);
    let currentIndex = foundIndex !== -1 ? foundIndex : allepisodelayout.findIndex(item => item.title === showType);
    if (currentIndex === -1) return;
    const currentIndexTitle = allepisodelayout[currentIndex].title;
    localStorage.setItem("episode_list_type", currentIndexTitle);
    setShowType(currentIndexTitle);
  }, []);

  const switchbetweenlayoutClick = () => {
    let currentIndex = localStorage.getItem("episode_list_type") ?
      allepisodelayout.findIndex(item => item.title === localStorage.getItem("episode_list_type")) :
      allepisodelayout.findIndex(item => item.title === showType)


    let nextIndex = currentIndex + 1 === 3 ? 0 : currentIndex + 1
    let nextIndexTitle = allepisodelayout[nextIndex].title

    localStorage.setItem("episode_list_type", nextIndexTitle)
    setShowType(nextIndexTitle)
  }

  return (
    <div className="flex justify-between px-2 py-3 border-b-2 border-[#514f61a1]">
      <div className="bg-[#2e2b3d] h-10 rounded-md">
        <input
          type="text"
          placeholder="Ep Number"
          className="bg-transparent outline-none h-full w-full px-2 text-slate-200 max-w-[13rem]"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
      <div className="bg-[#2e2b3d] flex gap-2 rounded-lg">

        <div
          className="bg-[#d5d5d7] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer"
          onClick={switchbetweenlayoutClick}
        >
          {allepisodelayout.find(item => item?.title === showType)?.icon}
        </div>

      </div>
    </div>
  );
}

export const allepisodelayout = [{
  title: "list",
  icon: <HiOutlineBars3 />
},
{
  title: "compact_list",
  icon: <CiBoxList />
},
{
  title: "grid",
  icon: <LuLayoutGrid />
},
]

export default SearchBar;
