"use client"
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useWatchContext } from "@/context/Watch";
import { updatelist } from "@/lib/anilistqueries";

const AddToList = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { data: session } = useSession();
  const { animeid, episode } = useWatchContext();

  const categories = [
    { title: "Watching", id: "CURRENT" },
    { title: "To Watch", id: "PLANNING" },
    { title: "Watched", id: "COMPLETED" },
    { title: "On Hold", id: "PAUSED" },
    { title: "Dropped", id: "DROPPED" },
  ];

  const handleSubmit = async (status) => {
    try {
      const response = await fetch("https://graphql.anilist.co/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          query: updatelist,
          variables: {
            mediaId: animeid,
            status: status || null,
            progress: episode || 0,
          },
        }),
      });

      const { data } = await response.json();

      if (data?.SaveMediaListEntry === null) {
        toast.error("Something went wrong");
        return;
      }



      toast.success("List entry updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsOpened((prev) => !prev)}>
        <span className="text-xl"><GoPlus /></span>
        Add to List
      </div>

      {isOpened && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="absolute bg-[#484460] border border-[#5c5778] w-full text-center left-0 top-7 py-1 rounded-md overflow-hidden"
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="px-2 py-1 z-50 cursor-pointer hover:bg-[#363346]"
              onClick={() => handleSubmit(item?.id)}
            >
              {item.title}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AddToList;
