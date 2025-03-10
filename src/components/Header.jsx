import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <div>
        <header className="flex justify-between items-center py-6 border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black px-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                PiggyVest
              </span>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg px-4 py-2  border border-yellow-600 shadow-sm hover:shadow-glow-gold transition-all duration-300">
            <ConnectButton.Custom>
              {({
                account,
                openAccountModal,
                openConnectModal,
                mounted,
              }) => {
                const connected = mounted && account;

                return (
                  <div>
                    {connected ? (
                      <button
                        onClick={openAccountModal}
                        className="flex items-center"
                      >
                        <span className="text-white font-medium">
                          {account.displayName}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={openConnectModal}
                        className="flex items-center"
                      >
                        <span className="text-white font-medium">
                          Connect Wallet
                        </span>
                      </button>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
          </header>
    </div>
  )
}

export default Header
