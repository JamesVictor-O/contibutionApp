import { useState } from "react"
import { useAccount } from "wagmi"

const LandingPage = () => {
  const { isConnected, address } = useAccount();
  const [contributionAmount, setContributionAmount]=useState(0)
  const [targetAmount, setTargetAmount]=useState(0)
  const [poolStatus, setPoolStatus]=useState(false)
  const [contractBalance, setContractBalance]=useState(0)
  const [hasNFT, setHasNFT]=useState(false)
  const [contribution, setContribution]=useState(null)
  const [loading, setLoading]=useState(false)
  const [isOwner, setIsOwner]=useState(false)
  const [account, setAccount]=useState(null)
  const [makeContribution, setMakeContribution]=useState(null)
  const [withdrawFunds, setWithdrawFunds]=useState(null)
  const [connectWallet, setConnectWallet]=useState(null)
  const [formatAddress, setFormatAddress]=useState(null)
  return (
    <div>
      <div className=" bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 ">
       
        

          {/* Hero Section */}
          <section className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
              Contribute &amp; Collect NFTs
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join our community by contributing to the pool. Receive a unique
              NFT that represents your contribution and tracks your involvement
            </p>
          </section>

          {isConnected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {/* Pool Info Card */}
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

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Contribution Amount</p>
                    <p className="text-xl font-semibold">
                      {contributionAmount} ETH
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Target Amount</p>
                    <p className="text-xl font-semibold">{targetAmount} ETH</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Pool Status</p>
                    <div className="flex items-center">
                      <span
                        className={`h-3 w-3 rounded-full mr-2 ${
                          poolStatus ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <p className="font-medium">
                        {poolStatus ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Current Pool Balance
                    </p>
                    <p className="text-xl font-semibold">
                      {contractBalance} ETH
                    </p>
                  </div>
                </div>
              </div>

              {/* User Actions Card */}
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold">Contribute Now</h2>
                </div>

                {hasNFT ? (
                  <div className="text-center py-6">
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
                      <p className="text-lg font-medium">
                        You've already contributed!
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        You own PiggyVest NFT #{contribution?.tokenId}
                      </p>
                    </div>

                    <p className="text-gray-300 text-sm">
                      Contribution Details:
                    </p>
                    <p className="font-medium">
                      {contribution?.amount} ETH on {contribution?.timestamp}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Contribute {contributionAmount} ETH to receive your unique
                      PiggyVest NFT
                    </p>

                    <button
                      onClick={makeContribution}
                      disabled={loading}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-medium hover:opacity-90 transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
                    >
                      {loading ? (
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

                    <p className="text-xs text-gray-400 text-center mt-2">
                      Requires a one-time transaction. Gas fees apply.
                    </p>
                  </div>
                )}
              </div>

              {/* Admin Card (Visible only to owner) */}
              {isOwner && (
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
                        You have admin access to withdraw funds from the
                        contract.
                      </p>
                    </div>

                    <button
                      onClick={withdrawFunds}
                      disabled={loading || contractBalance === "0.0"}
                      className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
                    ${
                      loading || contractBalance === "0.0"
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 transform hover:-translate-y-0.5 transition-all"
                    }`}
                    >
                      {loading ? (
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
              )}

              {/* NFT Gallery Card */}
              {hasNFT && (
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all shadow-xl md:col-span-3">
                  <div className="flex items-center mb-6">
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold">Your PiggyVest NFT</h2>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                      {/* NFT Display */}
                      <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-1">
                        <div className="w-full h-full bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-4xl font-bold">
                                #{contribution?.tokenId}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                              PiggyVest NFT
                            </h3>
                            <p className="text-gray-400 mt-2">
                              Contribution: {contribution?.amount} ETH
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3 md:pl-8">
                      <h3 className="text-lg font-semibold mb-4">
                        NFT Details
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Collection</span>
                          <span className="font-medium">
                            PiggyContributionNFT
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Token ID</span>
                          <span className="font-medium">
                            #{contribution?.tokenId}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Contribution</span>
                          <span className="font-medium">
                            {contribution?.amount} ETH
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Date</span>
                          <span className="font-medium">
                            {contribution?.timestamp}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Owner</span>
                          <span className="font-medium">
                            {formatAddress(account)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-purple-900 bg-opacity-20 rounded-lg border border-purple-800">
                        <p className="text-sm text-purple-300">
                          This NFT represents your contribution to the PiggyVest
                          pool. It's a unique digital asset that proves your
                          participation in this project.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 mb-8 max-w-xl w-full text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
                <p className="text-gray-300 mb-4">
                  Please connect your Ethereum wallet to interact with the
                  PiggyVest contract and view your contribution status.
                </p>
                {/* <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-medium hover:opacity-90 transform hover:-translate-y-0.5 transition-all"
                >
                  {loading ? (
                    <span className="flex items-center">
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
                      Connecting...
                    </span>
                  ) : (
                    "Connect Wallet"
                  )}
                </button> */}
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>
              PiggyVest - Contribution Platform &copy;{" "}
              {new Date().getFullYear()}
            </p>
            <p className="mt-2">Built on Ethereum</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
