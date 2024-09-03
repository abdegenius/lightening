"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
export function AccessCard() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const handleClick = () => {
    router.push("/app/profile-type");
  };
  return (
    <div className="max-w-sm w-full h-fit ml-auto py-12 px-6 rounded-lg border-2 border-gray-600">
      {isConnected ? (
        <div className="w-full flex flex-col justify-start items-start space-y-4">
          <span className="text-lg font-bold text-white nmb">
            You are logged in on musique....
          </span>
          <button
            onClick={handleClick}
            type="button"
            className="w-auto flex-none py-2 px-4 sm:py-3 sm:px-6 rounded-lg flex items-center space-x-2 justify-center mx-auto border-2 border-gray-600"
          >
            <span className="text-sm sm:text-md md:text-lg font-normal text-white">
              EXPLORE DASHBOARD
            </span>
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-start space-y-4">
          <span className="text-lg font-bold text-white nmb">
            Login to musique....
          </span>
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
      )}
    </div>
  );
}
