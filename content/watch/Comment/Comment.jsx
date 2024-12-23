"use client"
import { DiscussionEmbed } from 'disqus-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaComment } from "react-icons/fa6";

const Comments = ({ AnimeID, title }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const disqusNode = document.querySelector('#disqus_thread');
      if (disqusNode && disqusNode.innerHTML.trim() !== "") {
        setLoading(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);



  return (
    <div id="comment" className="text-white bg-[#242735] border-[1px] border-[#39374b] relative rounded-md pb-4 w-full h-max">
      <div className="py-2 px-3 flex justify-between items-center">
        <div className="text-[#ffffffd3] text-[18px] font-medium font-['poppins']">Comment</div>
      </div>

      {loading && (
        <div className='px-3 py-4 h-[14rem] grid place-content-center text-6xl text-[#ffffff81]'><FaComment /></div>
      )}

      <div className='px-3' style={{ display: loading ? 'none' : 'block' }}>
        <DiscussionEmbed
          shortname='taro-6'
          config={{
            url: `${process.env.NEXT_PUBLIC_URL}${pathname}`,
            identifier: AnimeID,
            title: `${title} Anime - Watch online`,
            language: 'en'
          }}
        />
      </div>

    </div>
  );
}

export default Comments;
