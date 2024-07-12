import Image from "next/image"

const CharacterItem = ({ data }) => {
  return (
    <div
      className="bg-[#242735] border-[1px] border-[#39374b] max-w-[26rem] flex w-full overflow-hidden rounded-md">

      <Image src={data?.node?.image?.large} alt="yes" height={130} width={100} className="object-cover h-[110px] w-[80px]" />

      <div className="w-full flex flex-col justify-between mx-2 my-2">

        <div className="flex justify-between items-center gap-4 text-[15px]">
          <div className="text-[#c4c7cc] font-medium">{data?.node?.name?.full}</div>
          <div className="text-[#c4c7cc] font-medium">{data?.voiceActorRoles[0]?.voiceActor?.name?.full}</div>
        </div>

        <div className="flex justify-between items-center text-[14px]">
          <div className="text-[#aeaeae]">{data?.role ? `${data.role.slice(0, 1).toUpperCase()}${data.role.slice(1).toLowerCase()}` : ''}</div>
          <div className="text-[#aeaeae]">japanese</div>
        </div>
      </div>

      <Image src={data?.voiceActorRoles[0]?.voiceActor?.image?.large} alt="yes" height={130} width={100} className="object-cover h-[110px] w-[80px]" />

    </div>
  )
}

export default CharacterItem