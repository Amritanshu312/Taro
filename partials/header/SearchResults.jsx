import Image from "next/image"
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ResultItems = ({ data }) => {
  return (
    <Link className="flex gap-[6px] w-full cursor-pointer  hover:bg-[#242734]" href={`/watch/${data?.id}`}>
      <div className="px-2 py-[4px] flex gap-[6px] w-full">
        <Image
          src={data?.image}
          alt="Image"
          height={40}
          width={60}
          className="w-[54px] aspect-[9/13] object-cover cursor-pointer rounded-md"
        />

        <div className="flex flex-col gap-[10px]">
          <div className="text-[#efebebf2] font-['Poppins'] font-medium text-[15px] overflow-hidden text-ellipsis line-clamp-1">{data?.title?.english || data?.title?.romaji}</div>
          <div className="flex gap-[10px]">
            <div className="border border-[#ffffff86] text-[#ffffffab] rounded-md px-1 text-[12px] flex items-center justify-center">{data?.status}</div>
            <div className="flex gap-1 items-center text-[#ffffffab] text-[14px]"><FaStar /> {data?.rating / 10}</div>
            <div className="text-[#ffffffab] text-[14px]">{data?.type}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}


const SearchResults = ({ searchValue }) => {
  const [data, setData] = useState([]);
  const debouncedSearchValue = useDebounce(searchValue, 500); // 500ms delay

  useEffect(() => {
    const fetchSearch = async () => {
      if (!debouncedSearchValue) {
        setData([]);
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/${debouncedSearchValue}`);
      if (response.ok) {
        const dataJSON = await response.json();

        if (dataJSON?.results?.length === 0) {
          return setData("NO_RESULT_FOUND")
        }
        setData(dataJSON);
      }

    };

    fetchSearch();
  }, [debouncedSearchValue]);

  return (
    <div className="bg-[#231f2c] rounded-b-md w-full absolute flex flex-col gap-2 pb-1 border-x border-b border-[#ffffff24]">
      {data?.results?.slice(0, 5)?.map((result, index) => (
        <Fragment key={index}>
          <ResultItems data={result} />
        </Fragment>
      ))}
      {(data === "NO_RESULT_FOUND" === 0) && <div>No result found</div>}
    </div>
  );
};

export default SearchResults;