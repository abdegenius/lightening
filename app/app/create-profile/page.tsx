"use client";
import { AVATAR } from "@/app/helpers/avatar";
import { Header } from "@/app/_components/Header";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
function Page() {
  const { address } = useAccount();
  let avatar = AVATAR(address);
  const router = useRouter();
  const handleClick = () => {
    router.push("/app/create-profile/links");
  };
  return (
    <>
      <div className="w-screen min-h-screen relative">
        <Header />
        <div className="relative w-full h-full bg-gray-900 py-48">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch xl:items-center h-auto px-0 sm:px-2 md:px-16 lg:px-24 xl:px-40 mx-auto">
            <img src="./../../../../profile-bg.png" alt="profile bg" className="col-span-1 w-full hidden lg:block rounded-l-3xl bg-gray-300" />
            <form className="col-span-1 w-full flex flex-col space-y-4 items-start justify-start px-8 py-12 lg:rounded-l-xl bg-transparent">
              <h2 className="w-full text-xl sm:text-2xl lg:text-4xl font-normal text-center text-white mb-6">
                CREATE YOUR PROFILE
              </h2>
              {address ? (
                <div className="w-full flex items-start justify-start">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="w-full flex flex-col space-y-2 items-start justify-start">
                <div className="text-md font-normal text-white nml">
                  Stage Name
                </div>
                <input
                  type="text"
                  placeholder="El bador"
                  className="border-2 border-gray-800 p-4 text-lg text-white font-normal bg-transparent rounded-xl w-full"
                />
              </div>
              <div className="w-full flex flex-col space-y-2 items-start justify-start">
                <div className="text-md font-normal text-white nml">Genre</div>
                <select className="border-2 border-gray-800 px-4 py-5 text-lg text-white font-normal bg-transparent rounded-xl w-full">
                  <option value="Afrobeats">Afrobeats</option>
                </select>
              </div>
              <div className="w-full flex flex-col space-y-2 items-start justify-start">
                <div className="text-md font-normal text-white nml">Bio</div>
                <textarea
                  rows={4}
                  placeholder="Say something about yourself..."
                  className="border-2 border-gray-800 p-4 text-lg text-white font-normal bg-transparent rounded-xl w-full"
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleClick}
                className="w-full bg-white text-gray-900 text-xl font-medium rounded-full py-4"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
