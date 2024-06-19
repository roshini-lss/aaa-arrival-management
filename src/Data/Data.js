// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";
import batteryjump from "../Assets/imgs/battery-jump.jpeg";
import batteryService from "../Assets/imgs/battery-service.jpeg";
import extricationRecovery from "../Assets/imgs/extrication-recovery.jpeg";
import flatTyre from "../Assets/imgs/extrication-recovery.jpeg";
import images from "../Assets/imgs/images.jpeg";
import towAccident from "../Assets/imgs/tow-accident.jpeg";
import towMechanic from "../Assets/imgs/two-mechanic.jpeg";
import lockout from "../Assets/imgs/lockout.jpeg";
import akImage from "../Assets/imgs/ak-image.png";
import azImage from "../Assets/imgs/az-image.png";
import caImage from "../Assets/imgs/ca-image.png";
import mtImage from "../Assets/imgs/mt-image.png";
import nvImage from "../Assets/imgs/nv-image.png";
import utImage from "../Assets/imgs/ut-image.png";
import wyImage from "../Assets/imgs/yw-image.png";
import allData from "./all-data.json";

const CAData = {
  totalNumberOfOrders: allData.filter((item) => item.State === "CA").length,
  assingedPTA: allData.filter(
    (item) => item.State === "CA" && item.pta_truck_predicted > 0
  ).length,
  delays: allData.filter(
    (item) => item.State === "CA" && item.pta_truck > item.pta_truck_predicted
  ).length,
};

console.log(CAData);

const NVData = {
  totalNumberOfOrders: allData.filter((item) => item.State === "NV").length,
  assingedPTA: allData.filter(
    (item) => item.State === "NV" && item.pta_truck_predicted > 0
  ).length,
  delays: allData.filter(
    (item) => item.State === "CA" && item.pta_truck > item.pta_truck_predicted
  ).length,
};

const AKData = {
  totalNumberOfOrders: allData.filter((item) => item.State === "AK").length,
  assingedPTA: allData.filter(
    (item) => item.State === "AK" && item.pta_truck_predicted > 0
  ).length,
  delays: allData.filter(
    (item) => item.State === "AK" && item.pta_truck > item.pta_truck_predicted
  ).length,
};

const UTData = {
  totalNumberOfOrders: allData.filter((item) => item.State === "UT").length,
  assingedPTA: allData.filter(
    (item) => item.State === "UT" && item.pta_truck_predicted > 0
  ).length,
  delays: allData.filter(
    (item) => item.State === "UT" && item.pta_truck > item.pta_truck_predicted
  ).length,
};

const AZData = {
  totalNumberOfOrders: allData.filter((item) => item.State === "AZ").length,
  assingedPTA: allData.filter(
    (item) => item.State === "AZ" && item.pta_truck_predicted > 0
  ).length,
  delays: allData.filter(
    (item) => item.State === "AZ" && item.pta_truck > item.pta_truck_predicted
  ).length,
};

const WYData = {
  totalNumberOfOrders: allData.filter((item) => item.State === "WY").length,
  assingedPTA: allData.filter(
    (item) => item.State === "WY" && item.pta_truck_predicted > 0
  ).length,
  delays: allData.filter(
    (item) => item.State === "WY" && item.pta_truck > item.pta_truck_predicted
  ).length,
};

const MTData = {
  totalNumberOfOrders: allData.filter((item) => item.State === "MT").length,
  assingedPTA: allData.filter(
    (item) => item.State === "MT" && item.pta_truck_predicted > 0
  ).length,
  delays: allData.filter(
    (item) => item.State === "MT" && item.pta_truck > item.pta_truck_predicted
  ).length,
};

export let batteryJump = {};
export const regionParams = (region) => {
  const regions = region?.val?.toUpperCase();
  const totalNumberOfOrders = allData.filter(
    (item) =>
      item.State === regions &&
      item.description_of_the_problem_code === "Battery_Jump"
  ).length;

  batteryJump = { ...batteryJump, totalNumberOfOrders };
  localStorage.setItem("batteryJump", JSON.stringify(batteryJump));
};

export const batteryJumpFunc = () => {
  const value = JSON.parse(localStorage.getItem("batteryJump")) || {};
  return value.totalNumberOfOrders;
};

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
  };
};

const batteryJumpTotal = calculateTotalsByDescription(allData, "Battery_Jump");

const towMechanicalTotals = calculateTotalsByDescription(
  allData,
  "Tow_Mechanical"
);

const flatTireTotals = calculateTotalsByDescription(
  allData,
  "Flat_Tire_No_Spare"
);

const extractionRecoveryTotal = calculateTotalsByDescription(
  allData,
  "Extrication_Recovery"
);

const towAccidentTotal = calculateTotalsByDescription(allData, "Tow_Accident");

const batteryServiceTotal = calculateTotalsByDescription(
  allData,
  "Battery_Service"
);

const towMotorcycleTotal = calculateTotalsByDescription(
  allData,
  "Tow_Motorcycle"
);

const lockoutTotal = calculateTotalsByDescription(allData, "Lockout");

export const byProblemCodeDatas = [
  {
    color: "green",
    img: batteryjump,
    name: "Battery Jump",
    datas: batteryJumpTotal,
    // unassigned: batteryJumpTotal.totalWO.length - batteryJumpTotal.assingedPTA.length,
  },
  {
    color: "green",
    img: batteryService,
    name: "Battery Service",
    datas: batteryServiceTotal,
    // unassigned: batteryServiceTotal.totalWO.length - batteryServiceTotal.assingedPTA.length,
  },
  {
    color: "yellow",
    img: extricationRecovery,
    name: "Extraction Recovery",
    datas: extractionRecoveryTotal,
    // unassigned: batteryJumpTotal.totalWO.length - batteryJumpTotal.assingedPTA.length,
  },
  {
    color: "red",
    img: flatTyre,
    name: "Flat Tire No Spare",
    datas: flatTireTotals,
    // unassigned: flatTireTotals.totalWO.length - flatTireTotals.assingedPTA.length,
  },
  {
    color: "red",
    img: towAccident,
    name: "Tow Accident",
    datas: towAccidentTotal,
    // unassigned: towAccidentTotal.totalWO.length - towAccidentTotal.assingedPTA.length,
  },
  {
    color: "green",
    img: images,
    name: "Tow Motorcycle",
    datas: towMotorcycleTotal,
    // unassigned: towMotorcycleTotal.totalWO.length - towMotorcycleTotal.assingedPTA.length,
  },
  {
    color: "red",
    img: towMechanic,
    name: "Tow Mechanical",
    datas: towMechanicalTotals,
    // unassigned: towMechanicalTotals.totalWO.length - towMechanicalTotals.assingedPTA.length,
  },
  {
    color: "green",
    img: lockout,
    name: "Lockout",
    datas: lockoutTotal,
    // unassigned: lockoutTotal.totalWO.length - lockoutTotal.assingedPTA.length,
  },
];

export const sideBarDatasNavigate = [
  {
    icon: UilEstate,
    heading: "Home",
  },
];

export const sideBarDatasGoto = [
  {
    icon: UilEstate,
    heading: "PTA Health Check",
  },
];

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
];

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
];
export const SidebarDatasAltered = [
  sideBarDatasNavigate,
  sideBarDatasAdmin,
  sideBarDatasReports,
];

export const SideBarDataCMAltered = [sideBarDatasNavigate, sideBarDatasGoto];

export const SideBarDataCategories = ["Navigate", "Admin", "Reports"];
export const SideBarDataCMCategories = ["Navigate", "GoTo"];

export const cardsData = [
  {
    title: "Battery Jump",
    img: batteryjump,
    totalWO: batteryJumpFunc(),
    assingedPTA: 10,
    delays: 2,
    unassigned: 3,
  },
  {
    title: "Battery Service",
    img: batteryService,
    totalWO: batteryJumpFunc(),
  },
  {
    title: "Extrication Recovery",
    img: extricationRecovery,
  },
  {
    title: "Flat Tyre No Spare",
    img: flatTyre,
  },
  {
    title: "Tow Accident",
    img: towAccident,
  },
  {
    title: "Tow Motorcycle",
    img: images,
  },
  {
    title: "Tow Mechanical",
    img: towMechanic,
  },
  {
    title: "Lockout",
    img: lockout,
  },
];

export const mapDetails = [
  {
    title: "CA",
    color: "green",
    img: caImage,
    totalWO: CAData.totalNumberOfOrders,
    assingedPTA: CAData.assingedPTA,
    delays: CAData.delays,
    unassigned: CAData.totalNumberOfOrders - CAData.assingedPTA,
  },
  {
    title: "NV",
    color: "yellow",
    img: nvImage,
    totalWO: NVData.totalNumberOfOrders,
    assingedPTA: NVData.assingedPTA,
    delays: NVData.delays,
    unassigned: NVData.totalNumberOfOrders - NVData.assingedPTA,
  },
  {
    title: "AK",
    color: "green",
    img: akImage,
    totalWO: AKData.totalNumberOfOrders,
    assingedPTA: AKData.assingedPTA,
    delays: AKData.delays,
    unassigned: AKData.totalNumberOfOrders - AKData.assingedPTA,
  },
  {
    title: "UT",
    color: "green",
    img: utImage,
    totalWO: UTData.totalNumberOfOrders,
    assingedPTA: UTData.assingedPTA,
    delays: UTData.delays,
    unassigned: UTData.totalNumberOfOrders - UTData.assingedPTA,
  },
  {
    title: "AZ",
    color: "red",
    img: azImage,
    totalWO: AZData.totalNumberOfOrders,
    assingedPTA: AZData.assingedPTA,
    delays: AZData.delays,
    unassigned: AZData.totalNumberOfOrders - AZData.assingedPTA,
  },
  {
    title: "WY",
    color: "red",
    img: wyImage,
    totalWO: WYData.totalNumberOfOrders,
    assingedPTA: WYData.assingedPTA,
    delays: WYData.delays,
    unassigned: WYData.totalNumberOfOrders - WYData.assingedPTA,
  },
  {
    title: "MT",
    color: "green",
    img: mtImage,
    totalWO: MTData.totalNumberOfOrders,
    assingedPTA: MTData.assingedPTA,
    delays: MTData.delays,
    unassigned: MTData.totalNumberOfOrders - MTData.assingedPTA,
  },
];

export const ordersHistory = [
  {
    workOrderNo: "36522",
    date: "12/12/2023",
    review:
      "Mechanic arrived 45 minutes late due to heavy traffic, flat tire changed efficiently. Customer dissatisfied due to delay in mechanic reaching the site.",
    positive: false,
  },
  {
    workOrderNo: "36522",
    date: "01/23/2024",
    review:
      "Tow truck arrived within 30 minutes, vehicle severely damaged. Customer appreciated quick response in a stressful situation.",
    positive: true,
  },
  {
    workOrderNo: "36523",
    date: "02/10/2024",
    review:
      "Technician arrived within 20 minutes, quickly unlocked vehicle. Customer locked keys inside car and was extremely satisfied.",
    positive: true,
  },
  {
    workOrderNo: "36524",
    date: "03/15/2024",
    review:
      "Technician arrived on time, replaced battery. Car battery was dead and the customer was happy with prompt service.",
    positive: true,
  },
  {
    workOrderNo: "36523",
    date: "02/05/2024",
    review:
      "Tow truck arrived in 35 minutes, transported motorcycle to nearest repair shop. Customer content with service after the motorcycle broke down.",
    positive: true,
  },
  {
    workOrderNo: "36524",
    date: "01/17/2024",
    review:
      "Recovery team reached within 40 minutes, successfully extracted vehicle. Vehicle was stuck in mud and the customer was pleased with efficiency.",
    positive: true,
  },
  {
    workOrderNo: "36525",
    date: "12/22/2023",
    review:
      "Technician brought and installed a new tire. Customer had no spare and was satisfied with the quick resolution.",
    positive: true,
  },
  {
    workOrderNo: "36525",
    date: "11/14/2023",
    review:
      "Technician arrived in 15 minutes, jump-started car. Customer was grateful for fast service after the car battery drained.",
    positive: true,
  },
  {
    workOrderNo: "36526",
    date: "02/09/2024",
    review:
      "Tow truck reached in 25 minutes, towed car to repair shop. Car broke down due to mechanical failure and the customer was satisfied with timely service.",
    positive: true,
  },
  {
    workOrderNo: "36526",
    date: "09/18/2023",
    review:
      "Mechanic arrived within 20 minutes, changed tire swiftly. Customer stressed about missing an important meeting was relieved and happy.",
    positive: true,
  },
  {
    workOrderNo: "36527",
    date: "10/23/2023",
    review:
      "Technician arrived in 10 minutes, unlocked car efficiently. Customer delighted with prompt service after being locked out of car.",
    positive: true,
  },
  {
    workOrderNo: "36527",
    date: "11/07/2023",
    review:
      "Technician arrived in 25 minutes, performed battery jump. Car wouldn't start and the customer appreciated the quick help.",
    positive: true,
  },
  {
    workOrderNo: "36528",
    date: "12/03/2023",
    review:
      "Tow truck arrived in 30 minutes, towed car to nearby garage. Minor collision left car undrivable and the customer was content with response time.",
    positive: true,
  },
  {
    workOrderNo: "36528",
    date: "12/18/2023",
    review:
      "Recovery team reached within 50 minutes, successfully extracted vehicle. Vehicle was stuck in sand and the customer was unhappy with the delay.",
    positive: false,
  },
  {
    workOrderNo: "36695",
    date: "01/02/2024",
    review:
      "Tow truck arrived in 40 minutes, towed car to the repair shop. Car broke down due to engine failure and the customer was angry about the long wait and unfriendly driver.",
    positive: false,
  },
  {
    workOrderNo: "36695",
    date: "01/25/2024",
    review:
      "Mechanic arrived in 15 minutes, changed the tire quickly. Customer was very happy with the quick response and great service.",
    positive: true,
  },
];

export const defaultHistory = [
  {
    date: "01/25/2024",
    review:
      "Mechanic arrived in 15 minutes, changed the tire quickly. Customer was very happy with the quick response and great service.",
    positive: true,
  },
  {
    workOrderNo: "36526",
    date: "09/18/2023",
    review:
      "Mechanic arrived within 20 minutes, changed tire swiftly. Customer stressed about missing an important meeting was relieved and happy.",
    positive: true,
  },
];
