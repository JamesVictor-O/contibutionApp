import React from "react";
import { useState, useEffect } from "react";
// import { Loader2, Check } from 'lucide-react';
import { useAccount } from "wagmi";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import contractAbi from "../abi.json";
import { CONTRACT_ADDRESS } from "../utills/contract";
import { ethers,parseEther } from "ethers";
import NFTDisplay from "../components/NFTDisplay";

const OwnerHome = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetAmount, setTargetAmount] = useState('10');
  const [contributionAmount, setContributionAmount] = useState('0.001');

  const { address } = useAccount();
  const [accountInfo, setAccountInfo] = useState({
    hasNFT: false,
    contribution: null,
    loading: false,
    isOwner: false,
    account: null,
    makeContribution: null,
    withdrawFunds: null,
  });

    const { data: contractOwner } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: contractAbi.abi,
        functionName: "owner",
        enabled: Boolean(CONTRACT_ADDRESS)
    });
    
    const isOwner = address && contractOwner ? address === contractOwner : false;


  // Get current parties count
  const { data: nextPartyId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi.abi,
    functionName: "nextPartyId",
    enabled: Boolean(CONTRACT_ADDRESS),
  });

  // Setup contract write
  const { writeContractAsync, isPending, isError, error } = useWriteContract();

  const handleCreateParty = async (target,contibution) => {
    if (!isOwner) return;

   

    setIsCreating(true);

    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: contractAbi.abi,
        functionName: "createParty",
        args:[target,contibution]
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to create party:", err);
    } finally {
      setIsCreating(false);
    }
  };



  const createNewParty = () => {
    // Convert ETH values to wei (BigInt) when calling the contract
    const targetAmountWei = parseEther(targetAmount);
    const contributionAmountWei = parseEther(contributionAmount);
    
    handleCreateParty(targetAmountWei, contributionAmountWei);
  };


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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8  bg-gradient-to-b from-gray-900 to-black text-white">
        {/* withdraw funds */}

        <div className="bg-gray-800  bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all shadow-xl">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Admin Controls</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-yellow-900 bg-opacity-20 rounded-lg border border-yellow-700">
              <p className="text-yellow-400 text-sm font-medium mb-2">
                Owner Access
              </p>
              <p className="text-gray-300 text-sm">
                You have admin access to withdraw funds from the contract.
              </p>
            </div>

            <button
              // onClick={withdrawFunds}
              disabled={
                accountInfo.loading || accountInfo.contractBalance === "0.0"
              }
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
                    ${
                      accountInfo.loading ||
                      accountInfo.contractBalance === "0.0"
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 transform hover:-translate-y-0.5 transition-all"
                    }`}
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
                "Withdraw Funds"
              )}
            </button>
          </div>
        </div>
        {/* create parties */}

        <div className="bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 rounded-xl p-6 shadow-xl border border-indigo-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Party Creator</h2>
            <div className="bg-indigo-700 rounded-full px-3 py-1">
              <span className="text-xs text-white font-medium">
                Owner Access
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-indigo-800/50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-indigo-200">Existing Parties</span>
                <span className="text-white font-bold">
                  {nextPartyId ? Number(nextPartyId) : "..."}
                </span>
              </div>
            </div>

            <div className="bg-indigo-800/50 rounded-lg p-4">
              <div className="flex flex-col space-y-2">
                <label className="text-indigo-200">Target Amount (ETH)</label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="bg-indigo-700/50 border border-indigo-600 rounded-lg p-2 text-white"
                  placeholder="10"
                  min="0.001"
                  step="0.001"
                />
              </div>
            </div>

            <div className="bg-indigo-800/50 rounded-lg p-4">
              <div className="flex flex-col space-y-2">
                <label className="text-indigo-200">
                  Contribution Amount (ETH)
                </label>
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="bg-indigo-700/50 border border-indigo-600 rounded-lg p-2 text-white"
                  placeholder="0.001"
                  min="0.0001"
                  step="0.0001"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={createNewParty}
              disabled={isCreating}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white flex items-center justify-center
          ${
            isCreating
              ? "bg-indigo-700 cursor-wait"
              : showSuccess
              ? "bg-green-600 cursor-default"
              : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 cursor-pointer"
          }`}
            >
              {isCreating ? (
                <>
                  {/* <Loader2 className="w-5 h-5 mr-2 animate-spin" /> */}
                  Creating Party...
                </>
              ) : showSuccess ? (
                <>
                  {/* <Check className="w-5 h-5 mr-2" /> */}
                  Party Created!
                </>
              ) : (
                <>Create New Party</>
              )}
            </button>

            {isError && (
              <div className="mt-2 text-red-400 text-sm">
                Error: {error?.message || "Failed to create party"}
              </div>
            )}
          </div>

          <div className="mt-4 text-indigo-300 text-xs">
            <p>
              As the contract owner, you can create new contribution pools with
              custom target amounts and contribution amounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
