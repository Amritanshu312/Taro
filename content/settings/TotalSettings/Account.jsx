import Image from "next/image"
import Title from "../components/Title"


const Account = ({ isLoggedIn, data }) => {


  return !isLoggedIn ? null : (
    <div className="w-full">
      <Title title={"Account"} />

      <div className="flex flex-row items-center bg-[#22212c] mt-8 rounded-lg py-10 h-min w-full">
        <div className="grid lg:grid-cols-[150px,0.75fr] w-full gap-8 px-8">
          <div className="relative flex flex-col items-center gap-6 h-min">
            <div className="w-32 h-32 overflow-hidden rounded-full flex items-center justify-center text-white">
              <span className="text-5xl w-full h-full">
                <Image
                  src={
                    isLoggedIn
                      ? data?.user?.image?.medium || data?.user?.image?.large || "/images/logo.png"
                      : "/images/logo.png"
                  }
                  alt="anilist"
                  loading="lazy"
                  width="200"
                  height="200"
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:ml-4">
            <div className="space-y-3">
              <p className="font-medium md:font-semibold text-textsec">Username</p>
              <div className="w-full flex-1 bg-[#ffffff0d] px-4 py-3 cursor-default md:font-medium focus:outline-none rounded-lg placeholder:text-textsec">
                {data?.user?.name}
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-medium md:font-semibold text-textsec">Signup Date</p>
              <div className="w-full flex-1 bg-[#ffffff0d] px-4 py-3 cursor-default md:font-medium focus:outline-none rounded-lg placeholder:text-textsec">
                {(() => {
                  const date = new Date(data?.user?.createdAt * 1000);
                  const readableDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
                  return readableDate;
                })()}
              </div>

            </div>

            <div className="grid grid-cols-2 w-full mt-2 gap-4">
              <a
                target="_blank"
                className="bg-[#3c3952] text-white font-medium md:font-semibold rounded-lg w-full py-2 text-center"
                href={`https://anilist.co/user/${data?.user?.name}`}
              >
                Edit Anilist Profile
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Account