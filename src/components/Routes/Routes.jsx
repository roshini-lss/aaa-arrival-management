import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import ProblemCode from "../MainDash/ProblemCode"
const Routes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/by-problem-code" element={<ProblemCode />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Routes