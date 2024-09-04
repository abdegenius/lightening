"use client";
import { Header } from "@/app/_components/Header";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/app/create-profile");
  };
  return (
    <>
      <div className="w-screen min-h-screen relative">
        <Header />
        <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center mx-auto flex-col space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-normal bs">
            WHO ARE YOU?
          </h2>
          <div className="w-full items-center justify-center mx-auto space-y-8 space-x-0 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row p-8">
            <div
              onClick={handleClick}
              className="p-4 rounded-xl bg-gray-900/90 border border-zinc-800 shadow-sm shadow-zinc-800 w-full max-w-[240px] drop-shadow-md flex flex-col space-y-4 items-center justify-center"
            >
              <img
                src="./../../../artist.png"
                alt="artist"
                className="bg-gray-200 h-48 w-full rounded-lg"
              />
              <div className="text-xl font-medium text-white">An artist</div>
            </div>
            <div
              onClick={handleClick}
              className="p-4 rounded-xl bg-gray-900/90 border border-zinc-800 shadow-sm shadow-zinc-800 w-full max-w-[240px] drop-shadow-md flex flex-col space-y-4 items-center justify-center"
            >
              <img
                src="./../../../fan.png"
                alt="fan"
                className="bg-gray-200 h-48 w-full rounded-xl"
              />
              <div className="text-xl font-medium text-white">A fan</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
