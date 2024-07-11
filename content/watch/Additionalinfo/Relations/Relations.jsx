import Image from "next/image"

const Relations = ({ info }) => {
  const { relations: { edges } } = info
  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[20px]">
      {edges.filter(item => item?.relationType !== "OTHER")?.map((item, index) => <div key={index} className="bg-[#242735] border-[1px] border-[#39374b] max-w-[29rem] flex w-full overflow-hidden rounded-md">
        <Image src={item?.node?.coverImage?.large} alt="cover" height={130} width={100} className="object-cover h-[140px] w-[100px]" />

        <div className="ml-2 my-2 flex flex-col justify-between font-['poppins']">
          <div className="text-[#e839b8] font-medium text-[16px]">{item?.relationType}</div>
          <div className="text-[#c4c7cc] text-[16px]">{item?.node?.title?.english}</div>
          <div className="text-[#c4c7cc] text-[16px]">{item?.node?.format}</div>
        </div>
      </div>)}

    </div>
  )
}

export default Relations