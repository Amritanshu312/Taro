const Search = ({ search, setSearch }) => {
  return (
    <div>
      <div className="flex justify-between items-center cursor-pointer border-[#1a1921] border-b-[2px] pb-2">
        <div className="text-[#efefef]">Search</div>
      </div>


      <div className="bg-[#1a1921] px-3 py-2 w-full rounded-md cursor-pointer mb-4 mt-4">
        <input
          type="text"
          placeholder="search"
          className="w-full bg-transparent text-[#e9e8e8d5] focus:border-0 focus:outline-none"
          value={search}
          onChange={value => setSearch(value.target.value)}
        />
      </div>
    </div>

  )
}

export default Search