// src/contexts/SelectedContext.js
import React, { createContext, useState } from "react"

export const RegionContext = createContext()

export const RegionProvider = ({ children }) => {
    const [regionNav, setRegionNav] = useState("CA")

    return (
        <RegionContext.Provider value={{ regionNav, setRegionNav }}>
            {children}
        </RegionContext.Provider>
    )
}
