import React, { useState } from "react"
import "./Sidebar.css"
import Logo from "../imgs/logo.png"
import { UilSignOutAlt } from "@iconscout/react-unicons"
import {
    SideBarDataCategories,
    SidebarData,
    SidebarDatasAltered,
} from "../Data/Data"
import { UilBars } from "@iconscout/react-unicons"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate()

    const [selected, setSelected] = useState("By Region")
    console.log(selected)

    const [expanded, setExpaned] = useState(true)

    const sidebarVariants = {
        true: {
            left: "0",
        },
        false: {
            left: "-60%",
        },
    }
    console.log(window.innerWidth)

    const handleSelection = (path) => {
        setSelected(path)
        if (path === "By Problem code") {
            navigate("/by-problem-code")
        }
        if (path === "By Region") {
            navigate("/by-region")
        }
        console.log({ path })
    }

    return (
        <>
            <div
                className="bars"
                style={expanded ? { left: "60%" } : { left: "5%" }}
                onClick={() => setExpaned(!expanded)}
            >
                <UilBars />
            </div>
            <motion.div
                className="sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ""}
            >
                {/* logo */}
                <div className="logo">
                    <img src={Logo} alt="logo" />
                    <span>
                        A<span>A</span>A
                    </span>
                </div>

                <div className="menu">
                    {/* {SidebarData.map((item, index) => {
                        return (
                            <div
                                className={
                                    selected === index
                                        ? "menuItem active"
                                        : "menuItem"
                                }
                                key={index}
                                onClick={() => handleSelection(index)}
                            >
                                <item.icon />
                                <span>{item.heading}</span>
                            </div>
                        )
                    })} */}
                    {SideBarDataCategories.map((item, index) => {
                        return (
                            <div className="sidebar-titles" key={index}>
                                {<div className="sidebar-title">{item}</div>}
                                {SidebarDatasAltered[index].map((item, i) => {
                                    return (
                                        <div
                                            className={
                                                selected === item.heading
                                                    ? "menuItem active"
                                                    : "menuItem"
                                            }
                                            key={i}
                                            onClick={() =>
                                                handleSelection(item.heading)
                                            }
                                        >
                                            <item.icon />
                                            <span>{item.heading}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                {/* signoutIcon */}
                <div className="menuItem">{/* <UilSignOutAlt /> */}</div>
            </motion.div>
        </>
    )
}

export default Sidebar
