import { createBrowserRouter, createRoutesFromElements,Route } from "react-router-dom";
import LandingPage from "./page/LandingPage.jsx";
import Root from "./Root.jsx";

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root/>}>
            <Route index element={<LandingPage/>}/>
        </Route>
    )
)
export default router