"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
function Page() {
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/app/dashboard");
  };
  return (
    <>
      <div className="bg-gray-950 w-full flex flex-col justify-start items-start space-y-8 min-h-screen relative">
        <div className="w-full flex flex-row space-x-8 px-8 pt-4 pb-2 justify-between items-center border-b border-gray-600">
          <h2 className="text-4xl py-4 text-white font-normal">Create NFT</h2>
          <a href="/app/dashboard" className="text-2xl font-medium text-white">
            Back
          </a>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-4 p-8">
          <div className="flex flex-col space-y-6 w-full justify-start items-start max-w-3xl">
            <div className="text-3xl text-white font-normal">NFT Details</div>
            <div className="w-full bg-slate-900/80 border border-dashed border-gray-300 rounded-xl py-12 px-4 sm:px-12 mx-auto flex flex-col space-y-4 items-center justify-center">
              <h4 className="font-medium text-xl text-white">
                PNG, GIF, WEBP, MP4 OR MP3.
              </h4>
              <p className="font-medium text-lg text-white">Max 100mb.</p>
              <button
                type="button"
                className="px-8 py-4 bg-white text-gray-800 text-lg font-normal text-center rounded-full"
              >
                Browse Files
              </button>
            </div>

            <div className="w-full flex flex-col space-y-2 items-start justify-start">
              <div className="text-md font-normal text-white nml">Price</div>
              <input
                type="text"
                placeholder="El bador"
                className="border-2 border-gray-800 p-4 text-lg text-white font-normal bg-transparent rounded-xl w-full"
              />
            </div>

            <div className="w-full flex flex-col space-y-2 items-start justify-start">
              <div className="text-md font-normal text-white nml">
                Name of NFT
              </div>
              <input
                type="text"
                placeholder="El bador"
                className="border-2 border-gray-800 p-4 text-lg text-white font-normal bg-transparent rounded-xl w-full"
              />
            </div>

            <div className="w-full flex flex-col space-y-2 items-start justify-start">
              <div className="text-md font-normal text-white nml">
                Description
              </div>
              <input
                type="text"
                placeholder="El bador"
                className="border-2 border-gray-800 p-4 text-lg text-white font-normal bg-transparent rounded-xl w-full"
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-start items-start mt-24 lg:mt-0 max-w-3xl">
            <div className="text-3xl text-white font-normal">Preview</div>
            <div className="w-full flex flex-col space-y-4 items-center justify-center py-6 max-w-sm">
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
            <div className="w-full p-4 rounded-lg border border-slate-800 flex flex-col space-y-6 justify-start items-start">
              <div className="w-full flex justify-between items-center bg-gray-800 px-4 py-4 rounded-lg">
                <div className="flex flex-col space-y-1 items-start">
                  <p className="text-white font-bold text-md md:text-lg">Price</p>
                  <p className="text-white font-black textl-lg md:text-2xl">9.56 ETH</p>
                </div>
                <div className="text-white font-bold text-xl md:text-3xl">$50,152.56</div>
              </div>
              <button
                type="button"
                className="px-8 py-5 bg-white text-gray-800 text-xl font-normal text-center rounded-full w-full"
              >
                SUBMIT NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
