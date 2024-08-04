"use client"
import ProfileCard from "@/components/Cards/ProfileCard/ProfileCard";
import { motion } from "framer-motion";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Animes = ({ data }) => {
  const [page, setPage] = useState(0);

  const SplitedAnimes = useMemo(() => {
    const animes = data?.entries || [];
    if (!animes.length) return [];
    const chunkSize = 18;
    return animes.reduce((chunks, _, i) => {
      if (i % chunkSize === 0) {
        chunks.push(animes.slice(i, i + chunkSize));
      }
      return chunks;
    }, []);
  }, [data]);

  useEffect(() => {
    // Reset page to 0 when data changes
    setPage(0);
  }, [data]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { staggerChildren: 0.05 } }
  };

  const handlePreviousPage = () => setPage(prev => Math.max(prev - 1, 0));
  const handleNextPage = () => setPage(prev => Math.min(prev + 1, SplitedAnimes.length - 1));

  return (
    <Fragment>
      <motion.div
        key={page}
        className="h-full mt-6 mx-24 grid grid-auto-fit gap-[8px_20px]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {SplitedAnimes[page]?.map((anime, index) => (
          <ProfileCard key={index} info={anime} />
        ))}

        {SplitedAnimes[page]?.length < 9 &&
          Array.from({ length: 9 - SplitedAnimes[page]?.length })?.map((_, i) => (
            <ProfileCard key={`placeholder-${i}`} hidden />
          ))}
      </motion.div>

      {SplitedAnimes.length > 1 && (
        <div className="text-white flex gap-1 text-[16px] justify-center mt-8 mb-5">
          <div
            className="flex items-center justify-center h-10 w-10 cursor-pointer rounded-full bg-[#22212c] transition hover:bg-[#48465e]"
            onClick={handlePreviousPage}
          >
            <FaArrowLeft />
          </div>

          <div
            className="flex items-center justify-center h-10 w-10 cursor-pointer rounded-full bg-[#22212c] transition hover:bg-[#48465e]"
            onClick={handleNextPage}
          >
            <FaArrowRight />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Animes;
