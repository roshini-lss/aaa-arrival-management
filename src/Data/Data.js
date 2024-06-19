// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
} from "@iconscout/react-unicons"
// import batteryjump from "../Assets/imgs/battery-jump.jpeg";
// import batteryService from "../Assets/imgs/battery-service.jpeg";
// import extricationRecovery from "../Assets/imgs/extrication-recovery.jpeg";
// import flatTyre from "../Assets/imgs/extrication-recovery.jpeg";
// import images from "../Assets/imgs/images.jpeg";
// import towAccident from "../Assets/imgs/tow-accident.jpeg";
// import towMechanic from "../Assets/imgs/two-mechanic.jpeg";
// import lockout from "../Assets/imgs/lockout.jpeg";
// import akImage from "../Assets/imgs/ak-image.png";
// import azImage from "../Assets/imgs/az-image.png";
// import getDriveImageUrl(driveImageIds["battery-jump"]) from "../Assets/imgs/ca-image.png";
// import mtImage from "../Assets/imgs/mt-image.png";
// import nvImage from "../Assets/imgs/nv-image.png";
// import utImage from "../Assets/imgs/ut-image.png";
// import wyImage from "../Assets/imgs/yw-image.png";
import allData from "./all-data.json"
import { driveImageIds } from "../constants/static-assets"
import { getDriveImageUrl } from "../utils/url-utils"

const CAData = {
    totalNumberOfOrders: allData.filter((item) => item.State === "CA").length,
    assingedPTA: allData.filter(
        (item) => item.State === "CA" && item.pta_truck_predicted > 0
    ).length,
    delays: allData.filter(
        (item) =>
            item.State === "CA" && item.pta_truck > item.pta_truck_predicted
    ).length,
}

console.log(CAData)

const NVData = {
    totalNumberOfOrders: allData.filter((item) => item.State === "NV").length,
    assingedPTA: allData.filter(
        (item) => item.State === "NV" && item.pta_truck_predicted > 0
    ).length,
    delays: allData.filter(
        (item) =>
            item.State === "CA" && item.pta_truck > item.pta_truck_predicted
    ).length,
}

const AKData = {
    totalNumberOfOrders: allData.filter((item) => item.State === "AK").length,
    assingedPTA: allData.filter(
        (item) => item.State === "AK" && item.pta_truck_predicted > 0
    ).length,
    delays: allData.filter(
        (item) =>
            item.State === "AK" && item.pta_truck > item.pta_truck_predicted
    ).length,
}

const UTData = {
    totalNumberOfOrders: allData.filter((item) => item.State === "UT").length,
    assingedPTA: allData.filter(
        (item) => item.State === "UT" && item.pta_truck_predicted > 0
    ).length,
    delays: allData.filter(
        (item) =>
            item.State === "UT" && item.pta_truck > item.pta_truck_predicted
    ).length,
}

const AZData = {
    totalNumberOfOrders: allData.filter((item) => item.State === "AZ").length,
    assingedPTA: allData.filter(
        (item) => item.State === "AZ" && item.pta_truck_predicted > 0
    ).length,
    delays: allData.filter(
        (item) =>
            item.State === "AZ" && item.pta_truck > item.pta_truck_predicted
    ).length,
}

const WYData = {
    totalNumberOfOrders: allData.filter((item) => item.State === "WY").length,
    assingedPTA: allData.filter(
        (item) => item.State === "WY" && item.pta_truck_predicted > 0
    ).length,
    delays: allData.filter(
        (item) =>
            item.State === "WY" && item.pta_truck > item.pta_truck_predicted
    ).length,
}

const MTData = {
    totalNumberOfOrders: allData.filter((item) => item.State === "MT").length,
    assingedPTA: allData.filter(
        (item) => item.State === "MT" && item.pta_truck_predicted > 0
    ).length,
    delays: allData.filter(
        (item) =>
            item.State === "MT" && item.pta_truck > item.pta_truck_predicted
    ).length,
}

export let batteryJump = {}
export const regionParams = (region) => {
    const regions = region?.val?.toUpperCase()
    const totalNumberOfOrders = allData.filter(
        (item) =>
            item.State === regions &&
            item.description_of_the_problem_code === "Battery_Jump"
    ).length

    batteryJump = { ...batteryJump, totalNumberOfOrders }
    localStorage.setItem("batteryJump", JSON.stringify(batteryJump))
}

export const batteryJumpFunc = () => {
    const value = JSON.parse(localStorage.getItem("batteryJump")) || {}
    return value.totalNumberOfOrders
}

const calculateTotalsByDescription = (data, description) => {
    return {
        title: description,
        totalWO: data.filter(
            (item) => item.description_of_the_problem_code === description
        ),
        assingedPTA: data.filter(
            (item) =>
                item.description_of_the_problem_code === description &&
                item.pta_truck_predicted > 0
        ),
        delays: data.filter(
            (item) =>
                item.description_of_the_problem_code === description &&
                item.pta_truck > item.pta_truck_predicted
        ),
        unassigned: data.filter(
            (item) =>
                item.description_of_the_problem_code === description &&
                item["PTA IN HRS"] === 0
        ).length,
    }
}

const batteryJumpTotal = calculateTotalsByDescription(allData, "Battery_Jump")

const towMechanicalTotals = calculateTotalsByDescription(
    allData,
    "Tow_Mechanical"
)

const flatTireTotals = calculateTotalsByDescription(
    allData,
    "Flat_Tire_No_Spare"
)

const extractionRecoveryTotal = calculateTotalsByDescription(
    allData,
    "Extrication_Recovery"
)

const towAccidentTotal = calculateTotalsByDescription(allData, "Tow_Accident")

const batteryServiceTotal = calculateTotalsByDescription(
    allData,
    "Battery_Service"
)

const towMotorcycleTotal = calculateTotalsByDescription(
    allData,
    "Tow_Motorcycle"
)

const lockoutTotal = calculateTotalsByDescription(allData, "Lockout")

export const byProblemCodeDatas = [
    {
        color: "green",
        img: getDriveImageUrl(driveImageIds["battery-jump"]),
        name: "Battery Jump",
        datas: batteryJumpTotal,
        // unassigned: batteryJumpTotal.totalWO.length - batteryJumpTotal.assingedPTA.length,
    },
    {
        color: "green",
        img: getDriveImageUrl(driveImageIds["battery-service"]),
        name: "Battery Service",
        datas: batteryServiceTotal,
        // unassigned: batteryServiceTotal.totalWO.length - batteryServiceTotal.assingedPTA.length,
    },
    {
        color: "yellow",
        img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
        name: "Extraction Recovery",
        datas: extractionRecoveryTotal,
        // unassigned: batteryJumpTotal.totalWO.length - batteryJumpTotal.assingedPTA.length,
    },
    {
        color: "red",
        img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
        name: "Flat Tire No Spare",
        datas: flatTireTotals,
        // unassigned: flatTireTotals.totalWO.length - flatTireTotals.assingedPTA.length,
    },
    {
        color: "red",
        img: getDriveImageUrl(driveImageIds["tow-accident"]),
        name: "Tow Accident",
        datas: towAccidentTotal,
        // unassigned: towAccidentTotal.totalWO.length - towAccidentTotal.assingedPTA.length,
    },
    {
        color: "green",
        img: getDriveImageUrl(driveImageIds["images"]),
        name: "Tow Motorcycle",
        datas: towMotorcycleTotal,
        // unassigned: towMotorcycleTotal.totalWO.length - towMotorcycleTotal.assingedPTA.length,
    },
    {
        color: "red",
        img: getDriveImageUrl(driveImageIds["two-mechanic"]),
        name: "Tow Mechanical",
        datas: towMechanicalTotals,
        // unassigned: towMechanicalTotals.totalWO.length - towMechanicalTotals.assingedPTA.length,
    },
    {
        color: "green",
        img: getDriveImageUrl(driveImageIds["lockout"]),
        name: "Lockout",
        datas: lockoutTotal,
        // unassigned: lockoutTotal.totalWO.length - lockoutTotal.assingedPTA.length,
    },
]

export const sideBarDatasNavigate = [
    {
        icon: UilEstate,
        heading: "Home",
    },
]

export const sideBarDatasGoto = [
    {
        icon: UilEstate,
        heading: "PTA Health Check",
    },
]

export const sideBarDatasAdmin = [
    {
        icon: UilClipboardAlt,
        heading: "User Management",
    },
    {
        icon: UilUsersAlt,
        heading: "Onboard New Vendor",
    },
    {
        icon: UilPackage,
        heading: "Other Admin Functions",
    },
]

export const sideBarDatasReports = [
    {
        icon: UilChart,
        heading: "PTA Health Check",
    },
    {
        icon: UilChart,
        heading: "By Problem code",
    },
    {
        icon: UilChart,
        heading: "By Region",
    },
]
export const SidebarDatasAltered = [
    sideBarDatasNavigate,
    sideBarDatasAdmin,
    sideBarDatasReports,
]

export const SideBarDataCMAltered = [sideBarDatasNavigate, sideBarDatasGoto]

export const SideBarDataCategories = ["Navigate", "Admin", "Reports"]
export const SideBarDataCMCategories = ["Navigate", "GoTo"]

export const cardsData = [
    {
        title: "Battery Jump",
        img: getDriveImageUrl(driveImageIds["battery-jump"]),
        totalWO: batteryJumpFunc(),
        assingedPTA: 10,
        delays: 2,
        unassigned: 3,
    },
    {
        title: "Battery Service",
        img: getDriveImageUrl(driveImageIds["battery-service"]),
        totalWO: batteryJumpFunc(),
    },
    {
        title: "Extrication Recovery",
        img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
    },
    {
        title: "Flat Tyre No Spare",
        img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
    },
    {
        title: "Tow Accident",
        img: getDriveImageUrl(driveImageIds["tow-accident"]),
    },
    {
        title: "Tow Motorcycle",
        img: getDriveImageUrl(driveImageIds["images"]),
    },
    {
        title: "Tow Mechanical",
        img: getDriveImageUrl(driveImageIds["two-mechanic"]),
    },
    {
        title: "Lockout",
        img: getDriveImageUrl(driveImageIds["lockout"]),
    },
]

export const mapDetails = [
    {
        title: "CA",
        color: "green",
        img: getDriveImageUrl(driveImageIds["ca-image"]),
        totalWO: CAData.totalNumberOfOrders,
        assingedPTA: CAData.assingedPTA,
        delays: CAData.delays,
        unassigned: CAData.totalNumberOfOrders - CAData.assingedPTA,
    },
    {
        title: "NV",
        color: "yellow",
        img: getDriveImageUrl(driveImageIds["nv-image"]),
        totalWO: NVData.totalNumberOfOrders,
        assingedPTA: NVData.assingedPTA,
        delays: NVData.delays,
        unassigned: NVData.totalNumberOfOrders - NVData.assingedPTA,
    },
    {
        title: "AK",
        color: "green",
        img: getDriveImageUrl(driveImageIds["ak-image"]),
        totalWO: AKData.totalNumberOfOrders,
        assingedPTA: AKData.assingedPTA,
        delays: AKData.delays,
        unassigned: AKData.totalNumberOfOrders - AKData.assingedPTA,
    },
    {
        title: "UT",
        color: "green",
        img: getDriveImageUrl(driveImageIds["ut-image"]),
        totalWO: UTData.totalNumberOfOrders,
        assingedPTA: UTData.assingedPTA,
        delays: UTData.delays,
        unassigned: UTData.totalNumberOfOrders - UTData.assingedPTA,
    },
    {
        title: "AZ",
        color: "red",
        img: getDriveImageUrl(driveImageIds["az-image"]),
        totalWO: AZData.totalNumberOfOrders,
        assingedPTA: AZData.assingedPTA,
        delays: AZData.delays,
        unassigned: AZData.totalNumberOfOrders - AZData.assingedPTA,
    },
    {
        title: "WY",
        color: "red",
        img: getDriveImageUrl(driveImageIds["wy-image"]),
        totalWO: WYData.totalNumberOfOrders,
        assingedPTA: WYData.assingedPTA,
        delays: WYData.delays,
        unassigned: WYData.totalNumberOfOrders - WYData.assingedPTA,
    },
    {
        title: "MT",
        color: "green",
        img: getDriveImageUrl(driveImageIds["mt-image"]),
        totalWO: MTData.totalNumberOfOrders,
        assingedPTA: MTData.assingedPTA,
        delays: MTData.delays,
        unassigned: MTData.totalNumberOfOrders - MTData.assingedPTA,
    },
]

export const ordersHistory = [
    {
        workOrderNo: "36522",
        date: "12/12/2023",
        review: "Mechanic arrived 45 minutes late due to heavy traffic, flat tire changed efficiently. Customer dissatisfied due to delay in mechanic reaching the site.",
        positive: false,
    },
    {
        workOrderNo: "36522",
        date: "01/23/2024",
        review: "Tow truck arrived within 30 minutes, vehicle severely damaged. Customer appreciated quick response in a stressful situation.",
        positive: true,
    },
    {
        workOrderNo: "36523",
        date: "02/10/2024",
        review: "Technician arrived within 20 minutes, quickly unlocked vehicle. Customer locked keys inside car and was extremely satisfied.",
        positive: true,
    },
    {
        workOrderNo: "36524",
        date: "03/15/2024",
        review: "Technician arrived on time, replaced battery. Car battery was dead and the customer was happy with prompt service.",
        positive: true,
    },
    {
        workOrderNo: "36523",
        date: "02/05/2024",
        review: "Tow truck arrived in 35 minutes, transported motorcycle to nearest repair shop. Customer content with service after the motorcycle broke down.",
        positive: true,
    },
    {
        workOrderNo: "36524",
        date: "01/17/2024",
        review: "Recovery team reached within 40 minutes, successfully extracted vehicle. Vehicle was stuck in mud and the customer was pleased with efficiency.",
        positive: true,
    },
    {
        workOrderNo: "36525",
        date: "12/22/2023",
        review: "Technician brought and installed a new tire. Customer had no spare and was satisfied with the quick resolution.",
        positive: true,
    },
    {
        workOrderNo: "36525",
        date: "11/14/2023",
        review: "Technician arrived in 15 minutes, jump-started car. Customer was grateful for fast service after the car battery drained.",
        positive: true,
    },
    {
        workOrderNo: "36526",
        date: "02/09/2024",
        review: "Tow truck reached in 25 minutes, towed car to repair shop. Car broke down due to mechanical failure and the customer was satisfied with timely service.",
        positive: true,
    },
    {
        workOrderNo: "36526",
        date: "09/18/2023",
        review: "Mechanic arrived within 20 minutes, changed tire swiftly. Customer stressed about missing an important meeting was relieved and happy.",
        positive: true,
    },
    {
        workOrderNo: "36527",
        date: "10/23/2023",
        review: "Technician arrived in 10 minutes, unlocked car efficiently. Customer delighted with prompt service after being locked out of car.",
        positive: true,
    },
    {
        workOrderNo: "36527",
        date: "11/07/2023",
        review: "Technician arrived in 25 minutes, performed battery jump. Car wouldn't start and the customer appreciated the quick help.",
        positive: true,
    },
    {
        workOrderNo: "36528",
        date: "12/03/2023",
        review: "Tow truck arrived in 30 minutes, towed car to nearby garage. Minor collision left car undrivable and the customer was content with response time.",
        positive: true,
    },
    {
        workOrderNo: "36528",
        date: "12/18/2023",
        review: "Recovery team reached within 50 minutes, successfully extracted vehicle. Vehicle was stuck in sand and the customer was unhappy with the delay.",
        positive: false,
    },
    {
        workOrderNo: "36695",
        date: "01/02/2024",
        review: "Tow truck arrived in 40 minutes, towed car to the repair shop. Car broke down due to engine failure and the customer was angry about the long wait and unfriendly driver.",
        positive: false,
    },
    {
        workOrderNo: "36695",
        date: "01/25/2024",
        review: "Mechanic arrived in 15 minutes, changed the tire quickly. Customer was very happy with the quick response and great service.",
        positive: true,
    },
]

export const defaultHistory = [
    {
        date: "01/25/2024",
        review: "Mechanic arrived in 15 minutes, changed the tire quickly. Customer was very happy with the quick response and great service.",
        positive: true,
    },
    {
        workOrderNo: "36526",
        date: "09/18/2023",
        review: "Mechanic arrived within 20 minutes, changed tire swiftly. Customer stressed about missing an important meeting was relieved and happy.",
        positive: true,
    },
]

export const Regiondata = [
    {
        title: "CA",
        color: "green",
        img: getDriveImageUrl(driveImageIds["ca-image"]),
        totalWO: 2037,
        assingedPTA: 2025,
        delays: 16,
        unassigned: 12,
        problemCode: [
            {
                title: "Battery Jump",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-jump"]),
                totalWO: 10,
                assingedPTA: 10,
                delays: 2,
                unassigned: 0,
            },
            {
                title: "Battery Service",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-service"]),
                totalWO: 160,
                assingedPTA: 150,
                delays: 2,
                unassigned: 10,
            },
            {
                title: "Extrication Recovery",
                color: "yellow",
                img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
                totalWO: 40,
                assingedPTA: 10,
                delays: 1,
                unassigned: 30,
            },
            {
                title: "Flat Tyre No Spare",
                color: "red",
                img: getDriveImageUrl(driveImageIds["flat-tire-no-spare"]),
                totalWO: 180,
                assingedPTA: 170,
                delays: 1,
                unassigned: 10,
            },
            {
                title: "Tow Accident",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-accident"]),
                totalWO: 40,
                assingedPTA: 37,
                delays: 2,
                unassigned: 3,
            },
            {
                title: "Tow Motorcycle",
                color: "green",
                img: getDriveImageUrl(driveImageIds["images"]),
                totalWO: 40,
                assingedPTA: 37,
                delays: 2,
                unassigned: 3,
            },
            {
                title: "Tow Mechanical",
                color: "red",
                img: getDriveImageUrl(driveImageIds["two-mechanic"]),
                totalWO: 1550,
                assingedPTA: 1500,
                delays: 3,
                unassigned: 50,
            },
            {
                title: "Lockout",
                color: "green",
                img: getDriveImageUrl(driveImageIds["lockout"]),
                totalWO: 20,
                assingedPTA: 15,
                delays: 5,
                unassigned: 5,
            },
        ],
    },

    {
        title: "NV",
        color: "green",
        img: getDriveImageUrl(driveImageIds["nv-image"]),
        totalWO: 542,
        assingedPTA: 512,
        delays: 27,
        unassigned: 30,
        problemCode: [
            {
                title: "Battery Jump",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-jump"]),
                totalWO: 10,
                assingedPTA: 10,
                delays: 2,
                unassigned: 0,
            },
            {
                title: "Battery Service",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-service"]),
                totalWO: 10,
                assingedPTA: 8,
                delays: 2,
                unassigned: 2,
            },
            {
                title: "Extrication Recovery",
                color: "yellow",
                img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
                totalWO: 140,
                assingedPTA: 120,
                delays: 1,
                unassigned: 20,
            },
            {
                title: "Flat Tyre No Spare",
                color: "red",
                img: getDriveImageUrl(driveImageIds["flat-tire-no-spare"]),
                totalWO: 150,
                assingedPTA: 140,
                delays: 3,
                unassigned: 10,
            },
            {
                title: "Tow Accident",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-accident"]),
                totalWO: 23,
                assingedPTA: 17,
                delays: 2,
                unassigned: 6,
            },
            {
                title: "Tow Motorcycle",
                color: "green",
                img: getDriveImageUrl(driveImageIds["images"]),
                totalWO: 110,
                assingedPTA: 108,
                delays: 3,
                unassigned: 2,
            },
            {
                title: "Tow Mechanical",
                color: "red",
                img: getDriveImageUrl(driveImageIds["two-mechanic"]),
                totalWO: 70,
                assingedPTA: 66,
                delays: 1,
                unassigned: 4,
            },
            {
                title: "Lockout",
                color: "green",
                img: getDriveImageUrl(driveImageIds["lockout"]),
                totalWO: 29,
                assingedPTA: 10,
                delays: 4,
                unassigned: 10,
            },
        ],
    },
    {
        title: "AK",
        color: "green",
        img: getDriveImageUrl(driveImageIds["ak-image"]),
        totalWO: 417,
        assingedPTA: 406,
        delays: 10,
        unassigned: 11,
        problemCode: [
            {
                title: "Battery Jump",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-jump"]),
                totalWO: 10,
                assingedPTA: 8,
                delays: 2,
                unassigned: 2,
            },
            {
                title: "Battery Service",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-service"]),
                totalWO: 160,
                assingedPTA: 157,
                delays: 3,
                unassigned: 3,
            },
            {
                title: "Extrication Recovery",
                color: "yellow",
                img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
                totalWO: 40,
                assingedPTA: 10,
                delays: 1,
                unassigned: 30,
            },
            {
                title: "Flat Tyre No Spare",
                color: "red",
                img: getDriveImageUrl(driveImageIds["flat-tire-no-spare"]),
                totalWO: 150,
                assingedPTA: 134,
                delays: 1,
                unassigned: 16,
            },
            {
                title: "Tow Accident",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-accident"]),
                totalWO: 10,
                assingedPTA: 9,
                delays: 4,
                unassigned: 1,
            },
            {
                title: "Tow Motorcycle",
                color: "green",
                img: getDriveImageUrl(driveImageIds["images"]),
                totalWO: 11,
                assingedPTA: 10,
                delays: 3,
                unassigned: 1,
            },
            {
                title: "Tow Mechanical",
                color: "red",
                img: getDriveImageUrl(driveImageIds["two-mechanic"]),
                totalWO: 10,
                assingedPTA: 10,
                delays: 2,
                unassigned: 0,
            },
            {
                title: "Lockout",
                color: "green",
                img: getDriveImageUrl(driveImageIds["lockout"]),
                totalWO: 20,
                assingedPTA: 10,
                delays: 3,
                unassigned: 10,
            },
        ],
    },
    {
        title: "UT",
        color: "green",
        img: getDriveImageUrl(driveImageIds["ut-image"]),
        totalWO: 667,
        assingedPTA: 651,
        delays: 7,
        unassigned: 16,
        problemCode: [
            {
                title: "Battery Jump",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-jump"]),
                totalWO: 81,
                assingedPTA: 76,
                delays: 3,
                unassigned: 5,
            },
            {
                title: "Battery Service",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-service"]),
                totalWO: 111,
                assingedPTA: 110,
                delays: 0,
                unassigned: 1,
            },
            {
                title: "Extrication Recovery",
                color: "yellow",
                img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
                totalWO: 47,
                assingedPTA: 45,
                delays: 1,
                unassigned: 3,
            },
            {
                title: "Flat Tire No Spare",
                color: "red",
                img: getDriveImageUrl(driveImageIds["flat-tire-no-spare"]),
                totalWO: 51,
                assingedPTA: 48,
                delays: 0,
                unassigned: 3,
            },
            {
                title: "Tow Accident",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-accident"]),
                totalWO: 47,
                assingedPTA: 45,
                delays: 0,
                unassigned: 2,
            },
            {
                title: "Tow Motorcycle",
                color: "green",
                img: getDriveImageUrl(driveImageIds["images"]),
                totalWO: 126,
                assingedPTA: 126,
                delays: 2,
                unassigned: 0,
            },
            {
                title: "Tow Mechanical",
                color: "red",
                img: getDriveImageUrl(driveImageIds["two-mechanic"]),
                totalWO: 97,
                assingedPTA: 96,
                delays: 0,
                unassigned: 1,
            },
            {
                title: "Lockout",
                color: "green",
                img: getDriveImageUrl(driveImageIds["lockout"]),
                totalWO: 107,
                assingedPTA: 106,
                delays: 1,
                unassigned: 1,
            },
        ],
    },
    {
        title: "AZ",
        color: "green",
        img: getDriveImageUrl(driveImageIds["az-image"]),
        totalWO: 1598,
        assingedPTA: 1561,
        delays: 83,
        unassigned: 37,
        problemCode: [
            {
                title: "Battery Jump",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-jump"]),
                totalWO: 150,
                assingedPTA: 145,
                delays: 10,
                unassigned: 5,
            },
            {
                title: "Battery Service",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-service"]),
                totalWO: 254,
                assingedPTA: 248,
                delays: 12,
                unassigned: 8,
            },
            {
                title: "Extrication Recovery",
                color: "yellow",
                img: getDriveImageUrl(driveImageIds["extraction-recovery"]),
                totalWO: 35,
                assingedPTA: 34,
                delays: 8,
                unassigned: 5,
            },
            {
                title: "Flat Tyre No Spare",
                color: "red",
                img: getDriveImageUrl(driveImageIds["flat-tyre-no-spare"]),
                totalWO: 127,
                assingedPTA: 120,
                delays: 10,
                unassigned: 4,
            },
            {
                title: "Tow Accident",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-accident"]),
                totalWO: 170,
                assingedPTA: 168,
                delays: 12,
                unassigned: 7,
            },
            {
                title: "Tow Motorcycle",
                color: "green",
                img: getDriveImageUrl(driveImageIds["tow-motorcycle"]),
                totalWO: 321,
                assingedPTA: 316,
                delays: 10,
                unassigned: 5,
            },
            {
                title: "Tow Mechanical",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-mechanical"]),
                totalWO: 222,
                assingedPTA: 220,
                delays: 8,
                unassigned: 1,
            },
            {
                title: "Lockout",
                color: "green",
                img: getDriveImageUrl(driveImageIds["lockout"]),
                totalWO: 319,
                assingedPTA: 310,
                delays: 13,
                unassigned: 2,
            },
        ],
    },
    {
        title: "WY",
        color: "red",
        img: getDriveImageUrl(driveImageIds["wy-image"]),
        totalWO: 467,
        assingedPTA: 452,
        delays: 18,
        unassigned: 15,
        problemCode: [
            {
                title: "Battery Jump",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-jump"]),
                totalWO: 60,
                assingedPTA: 55,
                delays: 2,
                unassigned: 5,
            },
            {
                title: "Battery Service",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-service"]),
                totalWO: 90,
                assingedPTA: 89,
                delays: 5,
                unassigned: 1,
            },
            {
                title: "Extrication Recovery",
                color: "yellow",
                img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
                totalWO: 26,
                assingedPTA: 24,
                delays: 1,
                unassigned: 2,
            },
            {
                title: "Flat Tyre No Spare",
                color: "red",
                img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
                totalWO: 30,
                assingedPTA: 29,
                delays: 3,
                unassigned: 1,
            },
            {
                title: "Tow Accident",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-accident"]),
                totalWO: 26,
                assingedPTA: 24,
                delays: 1,
                unassigned: 2,
            },
            {
                title: "Tow Motorcycle",
                color: "green",
                img: getDriveImageUrl(driveImageIds["images"]),
                totalWO: 105,
                assingedPTA: 103,
                delays: 2,
                unassigned: 2,
            },
            {
                title: "Tow Mechanical",
                color: "red",
                img: getDriveImageUrl(driveImageIds["two-mechanic"]),
                totalWO: 70,
                assingedPTA: 68,
                delays: 3,
                unassigned: 2,
            },
            {
                title: "Lockout",
                color: "green",
                img: getDriveImageUrl(driveImageIds["lockout"]),
                totalWO: 86,
                assingedPTA: 86,
                delays: 1,
                unassigned: 0,
            },
        ],
    },
    {
        title: "MT",
        color: "green",
        img: getDriveImageUrl(driveImageIds["mt-image"]),
        totalWO: 346,
        assingedPTA: 324,
        delays: 15,
        unassigned: 22,
        problemCode: [
            {
                title: "Battery Jump",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-jump"]),
                totalWO: 30,
                assingedPTA: 27,
                delays: 2,
                unassigned: 3,
            },
            {
                title: "Battery Service",
                color: "green",
                img: getDriveImageUrl(driveImageIds["battery-service"]),
                totalWO: 42,
                assingedPTA: 40,
                delays: 3,
                unassigned: 2,
            },
            {
                title: "Extrication Recovery",
                color: "yellow",
                img: getDriveImageUrl(driveImageIds["extraction-recovery"]),
                totalWO: 26,
                assingedPTA: 23,
                delays: 1,
                unassigned: 3,
            },
            {
                title: "Flat Tyre No Spare",
                color: "red",
                img: getDriveImageUrl(driveImageIds["flat-tyre-no-spare"]),
                totalWO: 60,
                assingedPTA: 57,
                delays: 2,
                unassigned: 3,
            },
            {
                title: "Tow Accident",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-accident"]),
                totalWO: 35,
                assingedPTA: 33,
                delays: 2,
                unassigned: 2,
            },
            {
                title: "Tow Motorcycle",
                color: "green",
                img: getDriveImageUrl(driveImageIds["tow-motorcycle"]),
                totalWO: 42,
                assingedPTA: 39,
                delays: 2,
                unassigned: 3,
            },
            {
                title: "Tow Mechanical",
                color: "red",
                img: getDriveImageUrl(driveImageIds["tow-mechanical"]),
                totalWO: 55,
                assingedPTA: 51,
                delays: 2,
                unassigned: 1,
            },
            {
                title: "Lockout",
                color: "green",
                img: getDriveImageUrl(driveImageIds["lockout"]),
                totalWO: 34,
                assingedPTA: 32,
                delays: 1,
                unassigned: 2,
            },
        ],
    },
]
