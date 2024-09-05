"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { create } from "ipfs-http-client";

function Page() {
    const client = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
    });

    async function uploadJsonToIPFS(jsonData: any) {
        try {
            // Convert the JSON object to a string
            const jsonString = JSON.stringify(jsonData);

            // Create a Buffer of the JSON string
            const buffer = Buffer.from(jsonString);

            // Upload the buffer to IPFS
            const result = await client.add(buffer);

            // Return the IPFS hash (CID)
            return result.path;
        } catch (error) {
            console.error("Error uploading to IPFS:", error);
            throw error;
        }
    }

    async function uploadJpgToIPFS(file: File) {
        try {
            const buffer = await file.arrayBuffer();
            const result = await client.add(buffer);
            return result.path;
        } catch (error) {
            console.error("Error uploading JPG to IPFS:", error);
            throw error;
        }
    }

    const router = useRouter();
    const handleGoBack = () => {
        router.push("/app/dashboard");
    };
    return (
        <>
            <div className="bg-gray-950 w-full flex flex-col justify-start items-start space-y-8 min-h-screen relative">
                <div className="w-full flex flex-row space-x-8 px-8 pt-4 pb-2 justify-between items-center border-b border-gray-600">
                    <h2 className="text-4xl py-4 text-white font-normal">
                        Create NFT
                    </h2>
                    <a
                        href="/app/dashboard"
                        className="text-2xl font-medium text-white"
                    >
                        Back
                    </a>
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-4 p-8">
                    <div className="flex flex-col space-y-6 w-full justify-start items-start max-w-3xl">
                        <div className="text-3xl text-white font-normal">
                            NFT Details
                        </div>
                        <div className="w-full bg-slate-900/80 border border-dashed border-gray-300 rounded-xl py-12 px-4 sm:px-12 mx-auto flex flex-col space-y-4 items-center justify-center">
                            <h4 className="font-medium text-xl text-white">
                                PNG, GIF, WEBP, MP4 OR MP3.
                            </h4>
                            <p className="font-medium text-lg text-white">
                                Max 100mb.
                            </p>
                            <input
                                type="file"
                                className="px-8 py-4 bg-white text-gray-800 text-lg font-normal text-center rounded-full"
                            />
                            <span className="text-lg font-normal text-white">
                                Browse Files
                            </span>
                        </div>

                        <div className="w-full flex flex-col space-y-2 items-start justify-start">
                            <div className="text-md font-normal text-white nml">
                                Price
                            </div>
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

                    <div className="flex w-full justify-start items-start mt-24 lg:mt-0">
                        <div className="text-3xl text-white font-normal">
                            Preview
                        </div>
                        <div className="w-full flex flex-col space-y-4 items-center justify-center py-24">
                            <h2 className="text-xl font-bold text-white">
                                No Preview Yet
                            </h2>
                            <p className="text-md font-normal text-gray-400">
                                Fill in valid details to populate preview.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
