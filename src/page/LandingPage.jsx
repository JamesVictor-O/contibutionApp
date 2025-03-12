import React from "react"
import { useAccount } from "wagmi"



const LandingPage = () => {
  const { isConnected, address } = useAccount();
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
        </div>
      </div>
    </div>
  )
}

export default LandingPage
