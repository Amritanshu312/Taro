import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"

const LoadingImage = ({ url }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="relative h-[110px] w-[140px]">
      {imageLoading && !imageError && (
        <div className="absolute inset-0 bg-[#323043] rounded-md"></div>
      )}
      {!imageError ? (
        <Image
          src={url}
          alt="Character"
          height={130}
          width={100}
          className={clsx("object-cover h-[110px] w-[140px]", {
            "opacity-0": imageLoading,
          })}
          onError={handleImageError}
          onLoad={() => setImageLoading(false)}
        />
      ) : (
        <div className="absolute inset-0 bg-[#323043] rounded-md"></div>
      )}
    </div>
  );
};




const CharacterItem = ({ data }) => {
  return (
    <div
      className="bg-[#242735] border-[1px] border-[#39374b] max-w-[26rem] max-[704px]:max-w-full flex w-full overflow-hidden rounded-md">

      <LoadingImage url={data?.node?.image?.large} />

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


      <LoadingImage url={data?.voiceActorRoles[0]?.voiceActor?.image?.large} />

    </div>
  )
}

export default CharacterItem