"use client"

import CatalogSelect from "@/components/ui/CatalogSelect"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

const SortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortData, setSortData] = useState(null);

  const currentSort = searchParams.get("sort");

  useEffect(() => {
    const updateSortInUrl = (sortKey) => {
      const updatedParams = new URLSearchParams(searchParams);
      if (sortKey) {
        updatedParams.set("sort", sortKey);
      } else {
        updatedParams.delete("sort");
      }

      const newQuery = updatedParams.toString();
      const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ""}`;
      router.push(newUrl, { scroll: false });
    };

    // Check if sortData.key is defined and different from currentSort before updating URL
    if (sortData?.key && sortData.key !== currentSort) {
      updateSortInUrl(sortData.key);
    }
  }, [sortData?.key, currentSort, router, searchParams]);


  return (
    <div>
      <span className="text-[#d7d7d797] text-sm">Sort by</span>
      <div className="w-full max-w-44">
        <CatalogSelect setSortBy={setSortData} currentSort={currentSort} />
      </div>
    </div>
  )
}

export default SortBy