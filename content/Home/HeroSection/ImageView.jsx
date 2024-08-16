import Image from "next/image"
import styles from "./HeroSection.module.css"

const ImageView = ({ populardata }) => {


  return (
    <Image
      src={populardata?.bannerImage}
      alt="banner"
      loading='eager'
      priority={true}
      fill
      className={`${styles.smoothTransform} relative aspect-[16/9] object-cover max-h-[800px] min-h-[460px]`}
    />
  )
}

export default ImageView