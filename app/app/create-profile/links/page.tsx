"use client";
import { Header } from "@/app/_components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/app/create-profile/password");
  };
  return (
    <>
      <div className="w-screen min-h-screen relative">
        <Header />
        <div className="relative w-full h-screen bg-gray-900 py-48">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-auto px-0 sm:px-2 md:px-16 lg:px-24 xl:px-40 mx-auto">
            <div className="col-span-1 w-full hidden lg:block rounded-l-3xl bg-gray-300"></div>
            <form className="col-span-1 w-full flex flex-col space-y-4 items-start justify-start p-8 lg:rounded-l-xl bg-transparent">
              <h2 className="w-full text-xl sm:text-2xl lg:text-4xl font-normal text-center text-white">
                CREATE YOUR PROFILE
              </h2>
              <p className="w-full text-xl font-light text-center text-white/25 pb-6">
                Add links to your music accounts
              </p>
              <div className="border-2 border-gray-800 px-4 w-full bg-transparent rounded-xl flex flex-row space-x-4 items-center justify-start">
                <Image
                  src={"/spotify.png"}
                  alt="spotify"
                  width={24}
                  height={24}
                  className="w-auto h-auto border-r-2 border-gray-700 pr-4"
                />
                <input
                  type="text"
                  placeholder="Spotify artist url"
                  className="outline-none border-none px-2 py-4 text-lg text-white bg-transparent font-normal w-full"
                />
              </div>
              <div className="border-2 border-gray-800 px-4 w-full bg-transparent rounded-xl flex flex-row space-x-4 items-center justify-start">
                <Image
                  src={"/yt_music.png"}
                  alt="yt_music"
                  width={24}
                  height={24}
                  className="w-auto h-auto border-r-2 border-gray-700 pr-4"
                />
                <input
                  type="text"
                  placeholder="Youtube music artist url"
                  className="outline-none border-none px-2 py-4 text-lg text-white bg-transparent font-normal w-full"
                />
              </div>

              <button
                type="button"
                onClick={handleClick}
                className="w-full bg-white text-gray-900 text-xl font-medium rounded-full py-4"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
