import { Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import ProblemCode from "./components/MainDash/ProblemCode"
import Sidebar from "./components/Sidebar"
import Region from "./components/MainDash/Region"
import Login from "./components/Login/Login"
import Order from "./components/Orders/WorkOrder"
function App() {
    const location = useLocation()
    console.log(location.pathname)
    console.log(location.pathname !== "/login" && location.pathname !== "/")
    return (
        <div className="App">
            <div
                className={
                    location.pathname === "/login" || location.pathname === "/"
                        ? "AppGlassLog"
                        : "AppGlass"
                }
            >
                {location.pathname !== "/login" &&
                    location.pathname !== "/" && <Sidebar />}
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/by-region" element={<Region />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/by-problem-code" element={<ProblemCode />} />
                    <Route path="/by-region/:val" element={<ProblemCode />} />
                    <Route path="/call-management-orders" element={<Order />} />
                </Routes>
            </div>
        </div>
    )
}
export default App