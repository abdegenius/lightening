"use client";
import { AVATAR } from "@/app/helpers/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
function Page() {
  const { address } = useAccount();
  let avatar = AVATAR(address);
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/app/dashboard");
  };
  return (
    <>
      <div className="bg-gray-950 w-full flex flex-col justify-start items-start space-y-8 min-h-screen relative">
        <div className="w-full flex flex-row space-x-8 px-8 pt-4 pb-2 justify-between items-center border-b border-gray-600">
          <h2 className="text-4xl py-4 text-white font-normal">COLLECTIBLES</h2>
          <a href="/app/dashboard" className="text-2xl font-medium text-white">
            Back
          </a>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-y-8 gap-x-16 max-w-6xl mx-auto">
          <img
            src="./../../../../nft.png"
            alt="nft"
            className="h-full w-full rounded-xl border border-gray-800 p-12"
          />
          <div className="w-full py-6 px-4 sm:px-12 flex flex-col space-y-4 items-start justify-start">
            <div className="w-full flex items-center space-x-4 justify-start">
              <img
                src={avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
              <span className="text-lg font-normal text-white">Kash</span>
            </div>
            <h4 className="font-medium text-xl text-white">
              Active ft Travis Scott
            </h4>
            <div className="w-full flex justify-between items-center bg-gray-800 px-4 py-4 rounded-lg">
              <div className="flex flex-col space-y-1 items-start">
                <p className="text-white font-bold text-md md:text-lg">Price</p>
                <p className="text-white font-black textl-lg md:text-2xl">
                  9.56 ETH
                </p>
              </div>
              <div className="text-white font-bold text-xl md:text-3xl">
                $50,152.56
              </div>
            </div>
            <h4 className="font-normal text-md text-gray-600">
              NFT for this song
            </h4>
            <div className="w-full flex flex-row space-x-8 items-center justify-start">
              <button
                type="button"
                className="px-5 py-1.5 bg-white text-gray-800 text-lg font-normal text-center rounded-full"
              >
                Share
              </button>
              <button
                type="button"
                className="px-5 py-1.5 font-normal text-xl text-gray-400"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
