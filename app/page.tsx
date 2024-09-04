"use client";
import { Header } from "./_components/Header";
import { AccessCard } from "./_components/AccessCard";
function Page() {
  return (
    <>
      <div className="w-screen min-h-screen relative">
        <Header />
        <div className="relative w-full h-screen bg-gray-900 top-24">
          <div className="w-full h-full grid grid-cols-3 items-start">
            <div className="bg-transparent col-span-1 w-full h-full"></div>
            <div className="bg-gray-950/5 col-span-1 w-full h-full relative">
              <img
                src="./hero.png"
                alt="hero"
                className="z-[998] absolute bottom-0 w-full min-h-80 min-w-60 max-w-2xl h-auto"
              />
            </div>
            <div className="bg-transparent col-span-1 w-full h-full"></div>
          </div>
          <div className="absolute inset-0 flex flex-col space-y-4 items-start justify-start px-6 py-12 sm:px-16 md:px-24 md:py-16 lg:px-48 lg:py-24 xl:px-60">
            <div className="w-full leading-[6rem] text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] text-white font-normal ">
              Empower <span className="bs text-amber-600">Music</span> Own the <span className="bs text-lime-600">Future.</span>  
            </div>
            <AccessCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
