"use client"
import Image from "next/image"
import { useState } from "react";
import { IoStar } from "react-icons/io5"
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";

const Rating = ({ info }) => {
  const [hoverIndex, setHoverIndex] = useState(0)

  return (

    <div className="flex items-center mt-2 relative max-[1240px]:hidden">

      <Image
        src="/images/waifus/2.png"
        alt="logo"
        width={200}
        height={300}
        className="object-cover absolute -top-20 -z-1 left-1/2 -translate-x-1/2"
      />

      <div className="bg-[#22212c] border border-[#39374b] rounded-2xl h-max p-4 flex flex-col items-center justify-center w-max relative z-10">
        <div className="flex gap-2">
          <span className="text-[#c7799f] text-2xl font-semibold">{info?.averageScore / 10}/10</span>
          <span className="text-[#717480] text-sm font-semibold">{info?.popularity} reviews</span>
        </div>

        <div
          className="flex items-center bg-[#333145] gap-2 text-[27px] rounded-lg px-4 py-1 mt-4 text-[#6a727f] cursor-pointer"
          onMouseMove={(e) => {
            if (e.target.closest("svg")) {
              const rect = e.target.getBoundingClientRect();
              const mouseX = e.clientX - rect.left;
              const starIndex = Array.from(e.currentTarget.children).indexOf(e.target.closest("svg"));
              const isHalf = mouseX < rect.width / 2; // Check if mouse is in left half

              setHoverIndex(starIndex + (isHalf ? 0.5 : 1)); // Set hover index (0.5 increments)
            }
          }}
          onMouseLeave={() => setHoverIndex(0)} // Reset on mouse leave
        >
          {Array.from({ length: 5 }).map((_, i) => (
            i + 1 <= hoverIndex ? (
              <IoStar key={i} />
            ) : i + 0.5 === hoverIndex ? (
              <IoStarHalf key={i} />
            ) : (
              <IoStarOutline key={i} />
            )
          ))}
        </div>

        <div className="mt-3 text-[#858792] font-['poppins',_sans-serif] text-sm">Rate this anime or f**k u??</div>
      </div>

    </div>
  )
}

export default Rating