"use client";
import { AVATAR } from "@/app/helpers/avatar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
interface toggleProps {
  show?: boolean;
}
export function DashboardSideNav({ show = false }: toggleProps) {
  const { address } = useAccount();
  let avatar = AVATAR(address);
  const router = useRouter();
  const handleClick = () => {
    router.push("/app/dashboard/create-nft");
  };
  const TOGGLE_SHOW = () => {
    show = !show;
  };
  return (
    <div
      className={`${
        show ? "block w-full inset-0" : "hidden"
      } lg:w-[320px] lg:flex lg:flex-col lg:items-start lg:justify-start min-h-screen h-full fixed p-8 bg-gray-900 z-[999] lg:border-r-2 lg:border-gray-950/25`}
    >
      <div className="w-full flex items-center justify-between mb-12">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={25}
          className="w-20 sm:w-24 h-auto"
        />
        <button
          type="button"
          onClick={TOGGLE_SHOW}
          className="cursor-pointer flex items-end justify-end ml-auto lg:hidden text-red-600 font-medium text-md underline-offset-2 underline"
        >
          Close
        </button>
      </div>
      <div className="flex flex-col space-y-8 items-start justify-start w-full">
        {address ? (
          <div className="w-full flex items-center space-x-4 justify-start">
            <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full" />
            <span className="text-xl font-normal text-white">Kash</span>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={handleClick}
          type="button"
          className="w-full flex-none p-3 rounded-full flex items-center space-x-2 justify-center mx-auto border-2 border-gray-600"
        >
          <span className="text-sm sm:text-md md:text-lg font-normal text-white">
            CREATE NFT
          </span>
        </button>
      </div>
      <div className="w-full bg-slate-900 border-t border-gray-800 absolute bottom-0 left-0 flex-none px-4 py-8">
        <ConnectButton
          label="CONNECT WALLET"
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: false,
          }}
        />
      </div>
    </div>
  );
}
