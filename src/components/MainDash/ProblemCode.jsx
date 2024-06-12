import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./MainDash.css"
import Cards from "../Cards/Cards"
import batteryjump from "../../imgs//battery-jump.jpeg"
import batteryService from "../../imgs//battery-service.jpeg"
import extricationRecovery from "../../imgs/extrication-recovery.jpeg"
import flatTyre from "../../imgs//extrication-recovery.jpeg"
import images from "../../imgs//images.jpeg"
import towAccident from "../../imgs/tow-accident.jpeg"
import towMechanic from "../../imgs/two-mechanic.jpeg"
import lockout from "../../imgs/lockout.jpeg"
import allData from "../../Data/all-data.json"
import { SelectedContext } from "../../contexts/SelectedContext"

const ProblemCode = () => {
    const listData = [
        "Battery_Jump",
        "Battery_Service",
        "Extrication_Recovery",
        "Flat_Tire_No_Spare",
        "Tow_Accident",
        "Tow_Motorcycle",
        "Tow_Mechanical",
        "Lockout",
    ]
    const region = useParams()
    const regions = region?.val?.toUpperCase()
    const batteryJump = (service) => {
        const details = {
            totalNumberOfOrders: allData.filter(
                (item) =>
                    item.State === regions &&
                    item.description_of_the_problem_code === service
            ).length,
            assingedPTA: allData.filter(
                (item) =>
                    item.State === regions &&
                    item.description_of_the_problem_code === service &&
                    item.pta_truck_predicted > 0
            ).length,
            delays: allData.filter(
                (item) =>
                    item.State === regions &&
                    item.description_of_the_problem_code === service &&
                    item.pta_truck > item.pta_truck_predicted
            ).length,
        }
        return details
    }

    let serviceData = {}
    listData.forEach((item) => {
        serviceData[item] = batteryJump(item)
    })

    const { setSelected } = useContext(SelectedContext)
    useEffect(() => {
        setSelected("By Problem code")
    }, [])

    console.log(serviceData.Battery_Jump)

    const cardsData = [
        {
            title: "Battery Jump",
            color: "green",
            img: batteryjump,
            totalWO: serviceData.Battery_Jump.totalNumberOfOrders || 0,
            assingedPTA: serviceData.Battery_Jump.assingedPTA || 0,
            delays: serviceData.Battery_Jump.delays || 0,
            unassigned:
                serviceData.Battery_Jump.totalNumberOfOrders -
                    serviceData.Battery_Jump.assingedPTA || 0,
        },
        {
            title: "Battery Service",
            color: "green",
            img: batteryService,
            totalWO: serviceData.Battery_Service.totalNumberOfOrders || 0,
            assingedPTA: serviceData.Battery_Service.assingedPTA || 0,
            delays: serviceData.Battery_Service.delays,
            unassigned:
                serviceData.Battery_Service.totalNumberOfOrders -
                serviceData.Battery_Service.assingedPTA,
        },
        {
            title: "Extrication Recovery",
            color: "yellow",
            img: extricationRecovery,
            totalWO: serviceData.Extrication_Recovery.totalNumberOfOrders,
            assingedPTA: serviceData.Extrication_Recovery.assingedPTA,
            delays: serviceData.Extrication_Recovery.delays,
            unassigned:
                serviceData.Extrication_Recovery.totalNumberOfOrders -
                serviceData.Extrication_Recovery.assingedPTA,
        },
        {
            title: "Flat Tire No Spare",
            color: "red",
            img: flatTyre,
            totalWO: serviceData.Flat_Tire_No_Spare.totalNumberOfOrders,
            assingedPTA: serviceData.Flat_Tire_No_Spare.assingedPTA,
            delays: serviceData.Flat_Tire_No_Spare.delays,
            unassigned:
                serviceData.Flat_Tire_No_Spare.totalNumberOfOrders -
                serviceData.Flat_Tire_No_Spare.assingedPTA,
        },
        {
            title: "Tow Accident",
            color: "red",
            img: towAccident,
            totalWO: serviceData.Tow_Accident.totalNumberOfOrders,
            assingedPTA: serviceData.Tow_Accident.assingedPTA,
            delays: serviceData.Tow_Accident.delays,
            unassigned:
                serviceData.Tow_Accident.totalNumberOfOrders -
                serviceData.Tow_Accident.assingedPTA,
        },
        {
            title: "Tow Motorcycle",
            color: "green",
            img: images,
            totalWO: serviceData.Tow_Motorcycle.totalNumberOfOrders,
            assingedPTA: serviceData.Tow_Motorcycle.assingedPTA,
            delays: serviceData.Tow_Motorcycle.delays,
            unassigned:
                serviceData.Tow_Motorcycle.totalNumberOfOrders -
                serviceData.Tow_Motorcycle.assingedPTA,
        },
        {
            title: "Tow Mechanical",
            color: "red",
            img: towMechanic,
            totalWO: serviceData.Tow_Mechanical.totalNumberOfOrders,
            assingedPTA: serviceData.Tow_Mechanical.assingedPTA,
            delays: serviceData.Tow_Mechanical.delays,
            unassigned:
                serviceData.Tow_Mechanical.totalNumberOfOrders -
                serviceData.Tow_Mechanical.assingedPTA,
        },
        {
            title: "Lockout",
            color: "green",
            img: lockout,
            totalWO: serviceData.Lockout.totalNumberOfOrders,
            assingedPTA: serviceData.Lockout.assingedPTA,
            delays: serviceData.Lockout.delays,
            unassigned:
                serviceData.Lockout.totalNumberOfOrders -
                serviceData.Lockout.assingedPTA,
        },
    ]
    return (
        <div className="MainDash-Component">
            <div className="main-view-title">
                View by - Problem Code Based Problem
            </div>
            <div className="MainDash">
                {cardsData.map((card, id) => {
                    return <Cards card={card} key={id} />
                })}
            </div>
        </div>
    )
}
export default ProblemCode
