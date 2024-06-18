// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import { useParams } from "react-router-dom";
import batteryjump from "../imgs/battery-jump.jpeg";
import batteryService from "../imgs/battery-service.jpeg";
import extricationRecovery from "../imgs/extrication-recovery.jpeg";
import flatTyre from "../imgs/extrication-recovery.jpeg";
import images from "../imgs/images.jpeg";
import towAccident from "../imgs/tow-accident.jpeg";
import towMechanic from "../imgs/two-mechanic.jpeg";
import lockout from "../imgs/lockout.jpeg";
import akImage from "../imgs/ak-image.png";
import azImage from "../imgs/az-image.png";
import caImage from "../imgs/ca-image.png";
import mtImage from "../imgs/mt-image.png";
import nvImage from "../imgs/nv-image.png";
import utImage from "../imgs/ut-image.png";
import wyImage from "../imgs/yw-image.png";
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
    ).length,
    assingedPTA: data.filter(
      (item) =>
        item.description_of_the_problem_code === description &&
        item.pta_truck_predicted > 0
    ).length,
    delays: data.filter(
      (item) =>
        item.description_of_the_problem_code === description &&
        item.pta_truck > item.pta_truck_predicted
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
    unassigned: batteryJumpTotal.totalWO - batteryJumpTotal.assingedPTA,
  },
  {
    color: "green",
    img: batteryService,
    name: "Battery Service",
    datas: batteryServiceTotal,
    unassigned: batteryServiceTotal.totalWO - batteryServiceTotal.assingedPTA,
  },
  {
    color: "yellow",
    img: extricationRecovery,
    name: "Extraction Recovery",
    datas: extractionRecoveryTotal,
    unassigned: batteryJumpTotal.totalWO - batteryJumpTotal.assingedPTA,
  },
  {
    color: "red",
    img: flatTyre,
    name: "Flat Tire No Spare",
    datas: flatTireTotals,
    unassigned: flatTireTotals.totalWO - flatTireTotals.assingedPTA,
  },
  {
    color: "red",
    img: towAccident,
    name: "Tow Accident",
    datas: towAccidentTotal,
    unassigned: towAccidentTotal.totalWO - towAccidentTotal.assingedPTA,
  },
  {
    color: "green",
    img: images,
    name: "Tow Motorcycle",
    datas: towMotorcycleTotal,
    unassigned: towMotorcycleTotal.totalWO - towMotorcycleTotal.assingedPTA,
  },
  {
    color: "red",
    img: towMechanic,
    name: "Tow Mechanical",
    datas: towMechanicalTotals,
    unassigned: towMechanicalTotals.totalWO - towMechanicalTotals.assingedPTA,
  },
  {
    color: "green",
    img: lockout,
    name: "Lockout",
    datas: lockoutTotal,
    unassigned: lockoutTotal.totalWO - lockoutTotal.assingedPTA,
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
