import Image from "next/image"
import Link from "next/link";

const Relations = ({ info }) => {
  const { relations: { edges } } = info

  console.log(edges);

  const relations = edges.filter(({ relationType, node }) =>
    relationType !== "OTHER" &&
    relationType !== "CHARACTER" &&
    relationType !== "SOURCE" &&
    relationType !== "ALTERNATIVE" &&
    node?.format !== "ONA" &&
    node?.status !== "NOT_YET_RELEASED"
  );

  // const isAnime = (item) => { return item?.format !== "MANGA" && item?.id && (item?.node?.title?.english || item?.node?.title?.native || item?.node?.title?.romaji) }
  const isAnime = (item) => {
    return item?.node?.format !== "MANGA"
  }

  return (
    <div className={"mt-8 gap-[20px] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))]"}>
      {relations?.map((item, index) => <div key={index} className="bg-[#242735] border-[1px] border-[#39374b] max-w-[30.5rem] max-[704px]:max-w-full flex w-full overflow-hidden rounded-md h-[120px]">

        {isAnime(item) ?
          <Link href={`/watch/${item?.node?.id}`} className=" h-full w-[90px]">
            <Image src={item?.node?.coverImage?.large} alt="cover" height={100} width={90} className="object-cover h-full w-full" />
          </Link>
          :
          <div className=" h-full w-[90px] cursor-pointer">
            <Image src={item?.node?.coverImage?.large} alt="cover" height={100} width={90} className="object-cover h-full w-full" />
          </div>
        }

        <div className="ml-2 my-2 flex flex-col justify-between font-['poppins'] max-w-[17rem]">
          <div className="text-[#e839b8] font-medium text-[14px]">{item?.relationType ? `${item?.relationType.slice(0, 1).toUpperCase()}${item?.relationType.slice(1).toLowerCase()}` : ''}</div>
          {isAnime(item) ?
            <Link href={`/watch/${item?.node?.id}`} className="text-[#c4c7cc] text-[15px] overflow-hidden text-ellipsis line-clamp-2 cursor-pointer transition-all hover:text-[#dcdfe3]">{item?.node?.title?.english || item?.node?.title?.romaji}</Link>
            :
            <div className="text-[#c4c7cc] text-[15px] overflow-hidden text-ellipsis line-clamp-2 cursor-pointer transition-all hover:text-[#dcdfe3]">{item?.node?.title?.english}</div>}

          <div className="flex gap-2 items-center">
            <div className="text-[#c4c7cc] text-[14px]">{item?.node?.format}</div>
            <div className="h-1 w-1 bg-[#ffffff94] rounded-full"></div>
            <div className="text-[#c4c7cc] text-[14px]">{item?.node?.status ? `${item?.node?.status.slice(0, 1).toUpperCase()}${item?.node?.status.slice(1).toLowerCase()}` : ''}</div>
          </div>

        </div>
      </div>)}

      {relations?.length < 3 ? Array.from({ length: 3 - relations?.length }).map((_, index) => <div key={index} className="bg-[#24273500] max-w-[30.5rem] max-[704px]:max-w-full flex w-full overflow-hidden rounded-md h-[120px]"></div>) : null}

    </div>
  )
}

export default Relations