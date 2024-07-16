import AiringStatus from "./Airing"
import Genres from "./Genres"
import Search from "./Search"
import Season from "./Season"
import Types from "./Types"
import Year from "./Year"

const Options = () => {
  return (
    <div className="py-4 px-3 bg-[#242735] border-[1px] border-[#39374b] max-w-[20rem] text-white rounded-sm">
      <Search />
      <Year />
      <Season />
      <Genres />
      <AiringStatus />
      <Types />

      <div className="bg-[#1b1a23] text-center py-2 rounded-md mt-6 cursor-pointer font-['poppins'] hover:bg-[#22202d] transition-all">Filter</div>
    </div>
  )
}

export default Options