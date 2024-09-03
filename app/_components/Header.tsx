import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
export function Header() {
  return (
    <div className="w-full flex flex-row items-center justify-between h-24 fixed p-4 bg-gray-900 z-[999]">
      <div className="w-full">
        <Image src={"/logo.png"} alt="logo" width={120} height={30} className="w-24 sm:w-32 h-auto" />
      </div>
      {/* <button
            type="button"
            className="w-auto flex-none py-2 px-4 sm:py-3 sm:px-6 rounded-lg flex items-center space-x-2 justify-center mx-auto border-2 border-gray-600"
          >
            <img
              src="./metamask.png"
              alt="metamask"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-sm sm:text-md md:text-lg font-normal text-white">
              CONNECT WALLET
            </span>
          </button> */}
      <div className="w-auto flex-none py-2 px-4 sm:py-3 sm:px-6">
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
