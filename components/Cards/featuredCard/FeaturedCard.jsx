import Image from "next/image"
import styles from "./featuredCard.module.css"

const FeaturedCard = ({ data }) => {
  return (
    <div className={styles.card}>
      <h1 className="text-[#ffffffbd] text-xl font-['Rubik'] font-medium mt-2 z-[2] relative">{data?.text}</h1>

      <div className="mt-8 flex justify-center items-center w-full relative top-9 translate-x-6 z-[2]">
        <div className="border-4 border-[#6f6b8a] -rotate-12 rounded-2xl overflow-hidden w-max"><Image src={data?.image[0]} alt="Ecchi " width={150} height={300} quality={20} className="object-cover" /></div>
        <div className="border-4 border-[#6f6b8a] -rotate-2 z-[1] rounded-2xl overflow-hidden w-max relative top-2 right-8"><Image src={data?.image[1]} alt="Ecchi " quality={20} width={150} height={300} className="object-cover" /></div>
        <div className="border-4 border-[#6f6b8a] z-[2] rotate-12 rounded-2xl overflow-hidden w-max relative top-10 right-20"><Image src={data?.image[2]} alt="Ecchi " quality={20} width={150} height={300} className="object-cover" /></div>
      </div>
    </div>

  )
}

export default FeaturedCard