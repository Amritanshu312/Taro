"use client"
import Image from "next/image"
import styles from "./FeaturedAnime.module.css"
import { FaCirclePlay } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";


const getRandomFeaturedAnime = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const filteredData = data.filter(
    (item) =>
      item.trailer?.id &&
      item.id !== 21 &&
      item.bannerImage &&
      item.status !== "NOT_YET_RELEASED"
  );
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
};

const FeaturedAnime = ({ data }) => {
  const [populardata, setPopulardata] = useState([])

  useEffect(() => {
    if (typeof window !== undefined) {
      const setting = JSON.parse(localStorage.getItem("setting.Taro"))

      if (
        setting?.appearence?.featuredSection ||
        setting?.appearence?.featuredSection === undefined
      ) {

        const populardata = getRandomFeaturedAnime(data);

        setPopulardata(populardata)
      }


    }
  }, [])



  return populardata.length === 0 ? null : (
    <div className="w-full max-w-[96rem] relative mx-5">
      <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">| Featured Anime</h1>


      <div className="my-20 mt-16 flex h-[24rem] relative overflow-hidden rounded-lg">
        <div className="absolute z-10 top-3 right-0  h-full max-[1348px]:hidden">
          <Image src="/images/waifus/1.png" alt="Ecchi " width={350} height={344} quality={100} className="object-cover" />
        </div>

        <div className={styles.backgroundImage}>
          <Image src={populardata?.bannerImage} alt="Ecchi " fill quality={100} className="object-cover !relative !h-[24rem] rounded-lg aspect-[9/14]" />
        </div>

        <div className="absolute z-10 bottom-1/2 translate-y-1/2 max-[700px]:left-[10px] left-[2rem] flex gap-8">
          <div className="max-[990px]:hidden">
            <Image src={populardata?.coverImage?.extraLarge} alt="Ecchi " width={200} height={340} className="object-cover rounded-lg" />
          </div>

          <div>
            <h3 className="text-[20px] my-2 text-[#ed2672] font-medium max-[500px]:text-[18px]">#{data?.indexOf(populardata) + 1} Trending</h3>
            <h1 className="text-[32px] text-white font-medium w-full max-w-[60rem] tracking-normal overflow-hidden text-ellipsis line-clamp-1 font-['Outfit'] max-[794px]:text-3xl">{populardata?.title?.english || populardata?.title?.romaji}</h1>

            <div className="flex items-center gap-4 max-[500px]:text-[14px]">
              <span className='flex items-center text-white my-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 mr-1 max-[500px]:w-4' viewBox="0 0 48 48"><defs><mask id="ipSPlay0"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" /><path fill="#000" stroke="#000" d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z" /></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPlay0)" /></svg>
                {populardata?.format}
              </span>

              <span className={`${populardata?.status === 'RELEASING' ? "text-[#2fc867]" : "text-white"}`}>{populardata?.status}</span>

              <span className='flex items-center text-white'>
                <svg className="w-5 h-5 mr-1 max-[500px]:w-4 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z" />
                </svg>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"][populardata?.startDate?.month]} {populardata?.startDate?.day}, {populardata?.startDate?.year}
              </span>

              <span className="flex items-center text-white">
                <svg viewBox="0 0 32 32" className="w-5 h-5 mr-1 max-[500px]:w-4" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z" fill="currentColor"></path></svg>
                {populardata?.nextAiringEpisode?.episode - 1 || populardata?.episodes}
              </span>
            </div>

            <h2 className="text-sm text-white w-full max-w-[60rem] tracking-normal overflow-hidden text-ellipsis line-clamp-2 font-['poppins'] mt-3 mb-4 max-[794px]:text-[13px]">{populardata?.description.replace(/<[^>]*>/g, '')}</h2>
            <Button text="Watch now" icon={<FaCirclePlay />} animeID={populardata?.id} />

          </div>
        </div>

      </div>


    </div >
  )
}

export default FeaturedAnime