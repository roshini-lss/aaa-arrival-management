import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainDash from "./components/MainDash/MainDash";
import ProblemCode from "./components/MainDash/ProblemCode";
import Sidebar from "./components/Sidebar";
import Region from "./components/MainDash/Region";

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainDash />} />
          <Route
            path="/by-problem-code"
            element={<ProblemCode />}
          / >
          <Route path="/by-region" element={<Region />}/>
          <Route path='/by-region/:val' element={<ProblemCode />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
