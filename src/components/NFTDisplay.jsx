import React from "react";
import contractAbi from "../abi.json"
import {CONTRACT_ADDRESS} from "../utills/contract"
import {
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi";

import { useState, useEffect, } from "react";


const NFTDisplay = ({tokenId}) => {
    // console.log(tokenId)

    const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: tokenURIData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi.abi,
    functionName: " getTokenURI",
    args: [1],
    // enabled: tokenI !== null && tokenId !== undefined,
  });

  

  useEffect(() => {
    if (tokenURIData) {
      try {
        const base64Json = tokenURIData.split(",")[1];
        const jsonString = atob(base64Json);
        const metadata = JSON.parse(jsonString);

        setImageUrl(metadata.image);
        setIsLoading(false);
      } catch (err) {
        console.error("Error parsing token URI:", err);
        setError("Failed to parse NFT data");
        setIsLoading(false);
      }
    }
  }, [tokenURIData]);



  return (
    <div>
      <div className="text-center py-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="mb-4 bg-purple-900 bg-opacity-30 p-4 rounded-lg border border-purple-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-purple-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">You've already contributed!</p>
          <p className="text-sm text-gray-400 mt-1">
            You own PiggyVest NFT 
          </p>
        </div>
         <img 
          src={imageUrl}
          width={200}
          className="nft-image"
          onError={() => setError("Failed to load NFT image")}
         />
        <p className="text-gray-300 text-sm">Contribution Details:</p>
        <p className="font-medium">
        </p>
      </div>
    </div>
  );
};

export default NFTDisplay;
