"use client";
import { AVATAR } from "@/app/helpers/avatar";
import { DashboardSideNav } from "@/app/_components/DashboardSideNav";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
function Page() {
  const { address } = useAccount();
  let avatar = AVATAR(address);
  const router = useRouter();
  const handleClick = () => {
    router.push("/app/dashboard/create-nft");
  };
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState("stats");
  const handleTabChange = (value: any) => {
    setTab(value);
  };
  return (
    <>
      <div className="bg-gray-950 w-full block lg:flex min-h-screen relative">
        <DashboardSideNav show={show} />
        <div className="ml-0 lg:ml-[320px] relative inset-0 w-full h-full">
          <div className="flex flex-col space-y-4 items-start justify-start px-2 md:px-6 mx-auto max-w-6xl py-16">
            <div className="mb-8 w-full flex lg:hidden">
              <button
                onClick={() => setShow((show) => !show)}
                type="button"
                className="w-fit flex-none py-3 px-6 rounded-full text-center ml-auto border-2 border-gray-600"
              >
                <span className="text-sm font-normal text-white">MENU</span>
              </button>
            </div>

            <div className="w-full flex flex-col justify-start items-start rounded-xl">
              <h2 className="text-4xl py-4 text-white font-normal">
                DASHBOARD
              </h2>
              <div className="mix-blend-screen bg-gradient-to-br from-gray-600 via-slate-700 to-zinc-800 border border-slate-700 blur-sm backdrop-blur-sm h-32 w-full rounded-t-xl"></div>
              <div className="w-full px-4 py-6 flex flex-col space-y-4 items-start justify-start bg-gray-900/50 border border-slate-700 rounded-b-xl shadow-md border-t-0 mb-8">
                <div className="w-full flex items-center space-x-4 justify-start">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <span className="text-lg font-normal text-white">Kash</span>
                </div>
                <div className="w-full flex flex-row flex-wrap items-center space-x-0 justify-start">
                  <div className="mr-2 flex flex-row items-center justify-center space-x-2 py-2.5 px-5 bg-gray-950/50 rounded-full my-2">
                    <Image
                      src={"/spotify.png"}
                      alt="spotify"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm sm:text-lg font-normal text-white">
                      spotify.com/geeslim
                    </span>
                  </div>
                  <div className="mr-2 flex flex-row items-center justify-center space-x-2 py-2.5 px-5 bg-gray-950/50 rounded-full my-2">
                    <Image
                      src={"/yt_music.png"}
                      alt="yt_music"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm sm:text-lg font-normal text-white">
                      youtubemusic.com/geeslim
                    </span>
                  </div>
                </div>
                <div className="w-full text-sm md:text-md font-normal text-gray-400">
                  Something something bio bio
                </div>

                <div className="py-6 w-full">
                  <button
                    onClick={handleClick}
                    type="button"
                    className="w-fit flex-none px-12 py-3 rounded-full flex items-start space-x-2 justify-start border border-slate-700"
                  >
                    <span className="text-sm sm:text-md md:text-lg font-normal text-white">
                      CREATE NFT
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full flex space-x-12 items-center mb-8">
                <button
                  type="button"
                  onClick={() => handleTabChange("stats")}
                  className={`text-2xl py-2 font-normal ${
                    tab == "stats"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-600"
                  }`}
                >
                  STATS
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("collectables")}
                  className={`text-2xl py-2 font-normal ${
                    tab == "collectables"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-600"
                  }`}
                >
                  COLLECTABLES
                </button>
              </div>
              {tab == "stats" ? (
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mb-2">
                  <div className="w-full col-span-1 rounded-2xl flex flex-col space-y-0 items-start justify-start p-6 bg-gray-900/75 border border-gray-800">
                    <div className="py-2.5 text-4xl font-medium text-gray-600">
                      0
                    </div>
                    <div className="py-2.5 text-xl font-medium text-gray-600">
                      Streams
                    </div>
                  </div>
                  <div className="w-full col-span-1 rounded-2xl flex flex-col space-y-0 items-start justify-start p-6 bg-gray-900/75 border border-gray-800">
                    <div className="py-2.5 text-4xl font-medium text-gray-600">
                      0
                    </div>
                    <div className="py-2.5 text-xl font-medium text-gray-600">
                      Songs
                    </div>
                  </div>
                  <div className="w-full col-span-1 rounded-2xl flex flex-col space-y-0 items-start justify-start p-6 bg-gray-900/75 border border-gray-800">
                    <div className="py-2.5 text-4xl font-medium text-gray-600">
                      0
                    </div>
                    <div className="py-2.5 text-xl font-medium text-gray-600">
                      Subscribers
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 mb-2">
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-zinc-800 shadow-sm shadow-zinc-800 w-full col-span-1 drop-shadow-md flex flex-col space-y-4 items-center justify-center">
                    <img
                      src="./../../../../nft.png"
                      alt="fan"
                      className="h-60 w-full rounded-xl"
                    />
                    <div className="text-2xl text-center font-medium text-gray-400">
                      Active ft Travis Scott
                    </div>
                    <div className="text-md text-center font-normal text-gray-600">
                      9.65 ETH
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-zinc-800 shadow-sm shadow-zinc-800 w-full col-span-1 drop-shadow-md flex flex-col space-y-4 items-center justify-center">
                    <img
                      src="./../../../../nft.png"
                      alt="fan"
                      className="h-60 w-full rounded-xl"
                    />
                    <div className="text-2xl text-center font-medium text-gray-400">
                      Active ft Travis Scott
                    </div>
                    <div className="text-md text-center font-normal text-gray-600">
                      9.65 ETH
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-zinc-800 shadow-sm shadow-zinc-800 w-full col-span-1 drop-shadow-md flex flex-col space-y-4 items-center justify-center">
                    <img
                      src="./../../../../nft.png"
                      alt="fan"
                      className="h-60 w-full rounded-xl"
                    />
                    <div className="text-2xl text-center font-medium text-gray-400">
                      Active ft Travis Scott
                    </div>
                    <div className="text-md text-center font-normal text-gray-600">
                      9.65 ETH
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-zinc-800 shadow-sm shadow-zinc-800 w-full col-span-1 drop-shadow-md flex flex-col space-y-4 items-center justify-center">
                    <img
                      src="./../../../../nft.png"
                      alt="fan"
                      className="h-60 w-full rounded-xl"
                    />
                    <div className="text-2xl text-center font-medium text-gray-400">
                      Active ft Travis Scott
                    </div>
                    <div className="text-md text-center font-normal text-gray-600">
                      9.65 ETH
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
