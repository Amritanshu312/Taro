"use client";

import CatalogSelect from "@/components/ui/CatalogSelect";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = [
    { key: "POPULARITY_DESC", value: "Popularity" },
    { key: "TRENDING_DESC", value: "Trending" },
    { key: "FAVOURITES_DESC", value: "Favourites" },
    { key: "SCORE_DESC", value: "MAL Score" },
  ];

  const [sortData, setSortData] = useState(data.find(item => item.key === searchParams.get("sort")));
  const [active, setActive] = useState(sortData?.value || data[0]?.value)

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

    if (sortData?.key) {
      updateSortInUrl(sortData.key);
    }
  }, [sortData?.key, router, searchParams]);

  return (
    <div>
      <span className="text-[#d7d7d797] text-sm">Sort by</span>
      <div className="w-full max-w-44">
        <CatalogSelect setSortBy={setSortData} data={data} active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default SortBy;
