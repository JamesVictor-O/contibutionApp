import { createBrowserRouter, createRoutesFromElements,Route } from "react-router-dom";
import LandingPage from "./page/LandingPage.jsx";
import HomePage from "./page/HomePage.jsx";
import React from "react";
import Root from "./Root.jsx";

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root/>}>
            <Route index element={<LandingPage/>}/>
            <Route path="homepage" element={<HomePage/>}/>
        </Route>
    )
)
export default router