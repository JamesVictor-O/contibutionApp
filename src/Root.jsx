import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"

const Root = () => {
  return (
    <div className="relative">
      <Header/>
     <div className="">
        <Outlet/>
     </div>
      {/* Footer */}
      <footer className=" py-8 border-t border-gray-800 text-center text-gray-400 text-sm bg-gradient-to-b from-gray-900 to-black">
            <p>
              PiggyVest - Contribution Platform &copy;{" "}
              {new Date().getFullYear()}
            </p>
            <p className="mt-2">Built on Ethereum</p>
          </footer>
    </div>
  )
}

export default Root
