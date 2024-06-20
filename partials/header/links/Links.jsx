"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Links = () => {
  const pathname = usePathname()

  const links = [
    "Home",
    "Catalog",
    "News",
    "Collection",
    "Ai-Chat"
  ]


  return (
    <div className="flex mt-[8px] text-[#c4c2c7] max-[990px]:hidden">
      {links.map((link, index) => (
        <Link
          href={link === "Home" ? "/" : link}
          key={link}
          className={`${index === 0 ? "ml-6" : "ml-4"} ${(pathname === "/" ? "Home" : pathname).includes(link) ? "text-white" : ""}`}
        >
          {link}
        </Link>
      ))}
    </div>
  )
}

export default Links