import { IoIosSearch } from "react-icons/io";


const Search = () => {
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