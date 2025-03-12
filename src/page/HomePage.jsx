import React from "react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import contractAbi from "../abi.json";
import { CONTRACT_ADDRESS } from "../utills/contract";
import OwnerHome from "../components/IsOwnerHome";
import NotOwnerHome from "../components/notOwnerHome";

const HomePage = () => {
    const {address}=useAccount()
    const { data: contractOwner } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: contractAbi.abi,
        functionName: "owner",
        enabled: Boolean(CONTRACT_ADDRESS)
      });
      
    const isOwner = address && contractOwner ? address === contractOwner : false;
      
 
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black">
        {isOwner ? <OwnerHome/>  : <NotOwnerHome/>}
    </div>
  );
};

export default HomePage;
