"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageInfo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(pageInfo?.currentPage);

  useEffect(() => {
    const updateSortInUrl = (sortKey) => {
      const updatedParams = new URLSearchParams(searchParams);
      if (sortKey) {
        updatedParams.set("page", sortKey);
      } else {
        updatedParams.delete("page");
      }

      const newQuery = updatedParams.toString();
      const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ""}`;
      router.push(newUrl);
    };

    // if (page !== 1 || (searchParams.get("page") && searchParams.get("page") !== "1")) {
    //   updateSortInUrl(page);
    // }
    if (
      (searchParams.get("page") && page !== Number(searchParams.get("page"))) ||
      (!searchParams.get("page") && page !== 1)
    ) {
      updateSortInUrl(page);
    }


  }, [page, searchParams, router]);

  const itemClass = "h-9 w-9 flex items-center justify-center rounded-md bg-[#242735] font-['poppins'] text-[15px] text-slate-200 cursor-pointer";

  return (
    <div className="w-full flex items-center justify-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaArrowRight />}
        onPageChange={(selectedPage) => setPage(selectedPage.selected + 1)}
        pageRangeDisplayed={5}
        containerClassName="flex items-center gap-[4px] flex-wrap"
        pageLinkClassName={itemClass}
        breakClassName={itemClass}
        nextClassName={itemClass}
        previousClassName={itemClass}
        activeLinkClassName="bg-[#48455f]"
        pageCount={pageInfo?.lastPage}
        previousLabel={<FaArrowLeft />}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination;
