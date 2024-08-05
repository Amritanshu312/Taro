import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handlerRef = useRef();

  useEffect(() => {
    handlerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handlerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ResultItems = ({ data }) => {
  const listItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={listItemVariants} initial="hidden" animate="show">
      <Link
        className="flex gap-[6px] w-full cursor-pointer hover:bg-[#242734]"
        href={`/watch/${data?.id}`}
      >
        <div className="px-2 py-[4px] flex gap-[6px] w-full">
          <Image
            src={data?.image}
            alt="Image"
            height={40}
            width={60}
            className="w-[54px] aspect-[9/13] object-cover cursor-pointer rounded-md"
          />
          <div className="flex flex-col gap-[10px]">
            <div className="text-[#efebebf2] font-['Poppins'] font-medium text-[15px] overflow-hidden text-ellipsis line-clamp-1">
              {data?.title?.english || data?.title?.romaji}
            </div>
            <div className="flex gap-[10px]">
              <div className="border border-[#ffffff86] text-[#ffffffab] rounded-md px-1 text-[12px] flex items-center justify-center">
                {data?.status}
              </div>
              <div className="flex gap-1 items-center text-[#ffffffab] text-[14px]">
                <FaStar /> {data?.rating / 10}
              </div>
              <div className="text-[#ffffffab] text-[14px]">{data?.type}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const SearchResults = ({ searchValue }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const fetchSearch = useCallback(async () => {
    if (!debouncedSearchValue) {
      setData([]);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/${debouncedSearchValue}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const dataJSON = await response.json();
      if (dataJSON?.results?.length === 0) {
        setData("NO_RESULT_FOUND");
      } else {
        setData(dataJSON);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="bg-[#231f2c] rounded-b-md w-full absolute flex flex-col gap-2 pb-1 border-x border-b border-[#ffffff24]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {error && <div>Error: {error}</div>}
      {Array.isArray(data?.results) &&
        data?.results?.slice(0, 5)?.map((result) => (
          <Fragment key={result.id}>
            <ResultItems data={result} />
          </Fragment>
        ))}
      {data === "NO_RESULT_FOUND" && <div className="text-slate-200 text-sm text-center">No result found</div>}
    </motion.div>
  );
};

export default SearchResults;
