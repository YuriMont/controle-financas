import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Sign } from "./pages/Sign";
import { SignUp } from "./pages/SignUp";

export function Router(){
    return (
        <Routes>
            <Route element={<Home/>} path="/" />
            <Route element={<Sign />} path="/sign" />
            <Route element={<SignUp />} path="/signup" />
        </Routes>
    );
}