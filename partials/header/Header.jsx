import { nightTokyo } from "@/utils/fonts"
import styles from "./header.module.css"
import Link from "next/link"
import Image from "next/image"
import Links from "./links/Links"
import Search from "./search/Search"
import { PiBellRingingFill as Bell } from "react-icons/pi";
import { LuAlignLeft } from "react-icons/lu";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        <div className={styles.left}>

          <div className="text-3xl text-white flex items-center justify-center mr-2 cursor-pointer min-[990px]:hidden">
            <LuAlignLeft />
          </div>

          <Link href={"/"} className={`${nightTokyo.className} text-white flex items-center gap-2`}>
            <Image
              src="/images/logo.png"
              alt="Taro"
              width={50}
              height={50} />
            <span className="text-3xl">TARO</span>
          </Link>

          {/* links */}
          <Links />

        </div>

        <div className={styles.right}>
          <Search />
          {/* notification */}
          <div className="text-2xl text-slate-200">
            <Bell />
          </div>

          {/* profile */}
          <div>
            <Link href={"/profile"}>
              <Image src="/images/logo.png" alt="profile" width={50} height={50} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Header