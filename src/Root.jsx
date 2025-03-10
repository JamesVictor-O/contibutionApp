import { Outlet } from "react-router-dom"
import Header from "./components/Header"

const Root = () => {
  return (
    <div className="relative">
      <Header/>
     <div className="">
        <Outlet/>
     </div>
    </div>
  )
}

export default Root
