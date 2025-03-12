import React from "react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { parseEther, formatEther } from 'viem';
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import contractAbi from "../abi.json";
import { CONTRACT_ADDRESS } from "../utills/contract";
import { ethers } from "ethers";
import NFTDisplay from "../components/NFTDisplay";

const NotOwnerHome = () => {
  const [party, setParty] = useState({
    targetAmount: 0,
    contributionAmount: 0,
    poolStatus: false,
    contractBalance: 0,
  });
  const [accountInfo, setAccountInfo] = useState({
    hasNFT: false,
    contribution: null,
    loading: false,
    isOwner: false,
    account: null,
    makeContribution: null,
    withdrawFunds: null,
  });

  const [withdrawFunds, setWithdrawFunds] = useState(null);
  const [connectWallet, setConnectWallet] = useState(null);

  const [tokenId, setTokenId]=useState(null)
  const [parties, setParties] = useState([]);
  const{isConnected, address}=useAccount()

  //  reading data

  const {
    data,
    isError,
    isLoading: contractLoading,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi.abi,
    functionName: "getAllParties",
    args: [],
    account: address,
  });



  
const {
  data: hasNft,
  isNftError,
  isLoading,
} = useReadContract({
  address: CONTRACT_ADDRESS,
  abi: contractAbi.abi,
  functionName: "checkIfAddressHasNFT",
  args: [address],
  account: address,
  enabled: Boolean(address),
});

useEffect(() => {
  if (isLoading) {
    console.log("Loading NFT data...");
  } else if (isError) {
    console.error("Error checking NFT balance:", isError);
  } else if (hasNft !== undefined) {
    setAccountInfo((prev)=>({...prev, hasNFT: hasNft}))
    console.log("Has NFT:", hasNft);
  }
}, [hasNft, isLoading, isNftError]);


  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
  } = useWriteContract();


  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: txError,
  } = useWaitForTransactionReceipt({ hash });

// _____________________handle contribution_______________
const handleContributeToPartie = async (id,amountToContribute) => {
    setTokenId(id)
   
    try {
       writeContract({
        address: CONTRACT_ADDRESS,
        abi: contractAbi.abi,
        functionName: "contribute",
        args: [BigInt(id)],
        value: amountToContribute,
      });
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    if (data) {
      console.log("Contract data:", data);

      const processedData = data.map((party) => ({
        ...party,
      }));

      setParties(processedData);
      setAccountInfo((prev) => ({ ...prev, loading: false }));
    } else if (isError) {
      console.error("Error fetching contract data");
      setAccountInfo((prev) => ({ ...prev, loading: false }));
    }   
    
    
  }, [data, isError, contractLoading]);


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 h-full   text-white">
        {/* Pool Info Card */}
        {parties.map((partie) => (
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all shadow-xl">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Pool Information</h2>
            </div>

            <div className=" md:grid grid-cols-2 ">
              <div>
                <p className="text-gray-400 text-sm">Contributed Amount</p>
                <p className="text-xl font-semibold">
                  {partie.contributedAmount} ETH
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Amount To Contribute</p>
                <p className="text-xl font-semibold">
                 {ethers.formatEther(partie.amountToContribute)} ETH
                </p>
              </div>
              


              <div>
                <p className="text-gray-400 text-sm">Target Amount</p>
                <p className="text-xl font-semibold">
                  {ethers.formatEther(partie.targetAmount)} ETH
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Pool Status</p>
                <div className="flex items-center">
                  <span
                    className={`h-3 w-3 rounded-full mr-2 ${
                      partie.poolStatus ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <p className="font-medium">
                    {party.poolStatus ? "Inactive" : "Active"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Current Pool Balance</p>
                <p className="text-xl font-semibold">
                  {party.contractBalance} ETH
                </p>
              </div>

              {/* <div>
                <p className="text-gray-400 text-sm">Contributors</p>
                <p className="text-xl font-semibold">
                  {party.memberCount}  users
                </p>
              </div> */}
            </div>
            <p className="text-gray-300 mt-6">
              Contribute {ethers.formatEther(partie.amountToContribute)} ETH to receive your unique
              PiggyVest NFT
            </p>

            <button
              onClick={() => handleContributeToPartie(partie.partyId, partie.amountToContribute)}
              // disabled={accountInfo.loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-medium hover:opacity-90 transform hover:-translate-y-0.5 transition-all flex items-center justify-center mt-8"
            >
              {accountInfo.loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Contribute & Mint NFT"
              )}
            </button>
          </div>
        ))}
        

      </div>

      {/* Nft display section */}

       { accountInfo.hasNFT &&  <NFTDisplay tokenId={tokenId}/> }
    </div>
  );
};

export default NotOwnerHome;
