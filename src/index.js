import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import { SelectedProvider } from "./contexts/SelectedContext"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { UserProvider } from "./contexts/UserContext"
import { RegionProvider } from "./contexts/RegionContext"

ReactDOM.render(
    <Router>
        <UserProvider>
            <SelectedProvider>
                <RegionProvider>
                    <ChakraProvider theme={theme}>
                        <App />
                    </ChakraProvider>
                </RegionProvider>
            </SelectedProvider>
        </UserProvider>
    </Router>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
