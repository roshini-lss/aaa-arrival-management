// src/contexts/SelectedContext.js
import React, { createContext, useState } from "react"

export const SelectedContext = createContext()

export const SelectedProvider = ({ children }) => {
    const [selected, setSelected] = useState("By Region")

    return (
        <SelectedContext.Provider value={{ selected, setSelected }}>
            {children}
        </SelectedContext.Provider>
    )
}
