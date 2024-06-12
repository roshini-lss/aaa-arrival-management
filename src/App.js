import { Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import MainDash from "./components/MainDash/MainDash"
import ProblemCode from "./components/MainDash/ProblemCode"
import Sidebar from "./components/Sidebar"
import Region from "./components/MainDash/Region"
import Login from "./components/Login/Login"

function App() {
    const location = useLocation()
    const gridStyle = {
        gridTemplateColumns: "auto auto",
    }

    return (
        <div className="App">
            <div
                className={
                    location.pathname !== "/login" ? "AppGlass" : "AppGlassLog"
                }
                // style={location.pathname !== "/login" && gridStyle}
            >
                {location.pathname !== "/login" && <Sidebar />}
                <Routes>
                    <Route path="/" element={<MainDash />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/by-problem-code" element={<ProblemCode />} />
                    <Route path="/by-region" element={<Region />} />
                    <Route path="/by-region/:val" element={<ProblemCode />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
