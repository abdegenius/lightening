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
    router.push("/app/dashboard/user/profile");
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
              <h2 className="text-4xl py-4 text-white font-normal">TRENDING</h2>

              <div className="w-full flex space-x-12 items-center mb-8">
                <button
                  type="button"
                  onClick={() => handleTabChange("this_week")}
                  className={`text-2xl py-2 font-normal ${
                    tab == "this_week"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-600"
                  }`}
                >
                  THIS WEEK
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("this_month")}
                  className={`text-2xl py-2 font-normal ${
                    tab == "this_month"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-600"
                  }`}
                >
                  THIS MONTH
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("all_time")}
                  className={`text-2xl py-2 font-normal ${
                    tab == "all_time"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-600"
                  }`}
                >
                  ALL TIME
                </button>
              </div>

              <ul className="w-full flex flex-col space-y-4 items-start justify-start">
                <li className="w-full grid grid-cols-12 items-start gap-4 px-4 pt-4 bg-gray-900/75 border border-gray-800 rounded-xl">
                  <div className="w-full col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 flex flex-row space-x-4 items-center justify-start">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-20 h-20 rounded-full"
                    />
                    <div className="w-full flex flex-col items-start space-y-0 justify-start">
                      <span className="text-2xl font-normal text-white">
                        Kash
                      </span>
                      <div className="w-full flex flex-row space-x-2 items-center flex-wrap justify-start">
                        <div className="py-2 flex justify-center space-x-2 items-center text-gray-400">
                          <Image
                            src={"/streams.png"}
                            alt="streams"
                            width={20}
                            height={20}
                          />
                          <span className="font-medium text-md">
                            111.1K Streams
                          </span>
                        </div>
                        <div className="py-2 flex justify-center space-x-2 items-center text-gray-400">
                          <Image
                            src={"/songs.png"}
                            alt="songs"
                            width={20}
                            height={20}
                          />
                          <span className="font-medium text-md">
                            111.1K Songs
                          </span>
                        </div>
                        <div className="py-2 flex justify-center space-x-2 items-center text-gray-400">
                          <Image
                            src={"/subscribers.png"}
                            alt="subscribers"
                            width={20}
                            height={20}
                          />
                          <span className="font-medium text-md">
                            111.1K Subscribers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto md:mr-auto w-full col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                    <button
                    onClick={handleClick}
                      type="button"
                      className="w-full md:w-fit px-6 py-2 flex justify-center space-x-2.5 items-center mx-auto text-gray-300 bg-gray-800 border border-gray-700 rounded-full"
                    >
                      <Image
                        src={"/profile.png"}
                        alt="profile"
                        width={16}
                        height={16}
                      />
                      <span className="font-medium text-md">View profile</span>
                    </button>
                  </div>
                  <div className="w-full flex flex-col space-y-4 items-start justify-start"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
