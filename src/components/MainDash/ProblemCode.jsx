import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./MainDash.css";
import Cards from "../Cards/Cards";
import allData from "../../Data/all-data.json";
import { SelectedContext } from "../../contexts/SelectedContext";
import { Regiondata, byProblemCodeDatas } from "../../Data/Data";
import { getDriveImageUrl } from "../../utils/url-utils";
import { driveImageIds } from "../../constants/static-assets";
import { RegionContext } from "../../contexts/RegionContext";

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
  ];
  const { regionNav } = useContext(RegionContext);
  const region = useParams();
  const location = useLocation();
  const regions = region?.val?.toUpperCase();
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
      unassigned: allData.filter(
        (item) =>
          item.State === regions &&
          item.description_of_the_problem_code === service &&
          item["PTA IN HRS"] === 0
      ).length,
    };
    return details;
  };

  const regionDataToPass = Regiondata.filter((region) => {
    return region.title === regionNav;
  });
  let serviceData = {};
  listData.forEach((item) => {
    serviceData[item] = batteryJump(item);
  });

  const cardsData = [
    {
      title: "Battery Jump",
      color: "green",
      img: getDriveImageUrl(driveImageIds["battery-jump"]),
      totalWO: serviceData.Battery_Jump.totalNumberOfOrders || 0,
      assingedPTA: serviceData.Battery_Jump.assingedPTA || 0,
      delays: serviceData.Battery_Jump.delays || 0,
      unassigned: serviceData.Battery_Jump.unassigned || 0,
      // serviceData.Battery_Jump.totalNumberOfOrders -
      //   serviceData.Battery_Jump.assingedPTA || 0,
    },
    {
      title: "Battery Service",
      color: "green",
      img: getDriveImageUrl(driveImageIds["battery-service"]),
      totalWO: serviceData.Battery_Service.totalNumberOfOrders || 0,
      assingedPTA: serviceData.Battery_Service.assingedPTA || 0,
      delays: serviceData.Battery_Service.delays,
      unassigned: serviceData.Battery_Service.unassigned || 0,
      // serviceData.Battery_Service.totalNumberOfOrders -
      // serviceData.Battery_Service.assingedPTA,
    },
    {
      title: "Extrication Recovery",
      color: "yellow",
      img: getDriveImageUrl(driveImageIds["extrication-recovery"]),
      totalWO: serviceData.Extrication_Recovery.totalNumberOfOrders,
      assingedPTA: serviceData.Extrication_Recovery.assingedPTA,
      delays: serviceData.Extrication_Recovery.delays,
      unassigned: serviceData.Extrication_Recovery.unassigned || 0,
      // serviceData.Extrication_Recovery.totalNumberOfOrders -
      // serviceData.Extrication_Recovery.assingedPTA,
    },
    {
      title: "Flat Tire No Spare",
      color: "red",
      img: getDriveImageUrl(driveImageIds["flat-tyre"]),
      totalWO: serviceData.Flat_Tire_No_Spare.totalNumberOfOrders,
      assingedPTA: serviceData.Flat_Tire_No_Spare.assingedPTA,
      delays: serviceData.Flat_Tire_No_Spare.delays,
      unassigned: serviceData.Flat_Tire_No_Spare.unassigned || 0,
      // serviceData.Flat_Tire_No_Spare.totalNumberOfOrders -
      // serviceData.Flat_Tire_No_Spare.assingedPTA,
    },
    {
      title: "Tow Accident",
      color: "red",
      img: getDriveImageUrl(driveImageIds["tow-accident"]),
      totalWO: serviceData.Tow_Accident.totalNumberOfOrders,
      assingedPTA: serviceData.Tow_Accident.assingedPTA,
      delays: serviceData.Tow_Accident.delays,
      unassigned: serviceData.Tow_Accident.unassigned || 0,
      // serviceData.Tow_Accident.totalNumberOfOrders -
      // serviceData.Tow_Accident.assingedPTA,
    },
    {
      title: "Tow Motorcycle",
      color: "green",
      img: getDriveImageUrl(driveImageIds["images"]),
      totalWO: serviceData.Tow_Motorcycle.totalNumberOfOrders,
      assingedPTA: serviceData.Tow_Motorcycle.assingedPTA,
      delays: serviceData.Tow_Motorcycle.delays,
      unassigned: serviceData.Tow_Motorcycle.unassigned || 0,
      // serviceData.Tow_Motorcycle.totalNumberOfOrders -
      // serviceData.Tow_Motorcycle.assingedPTA,
    },
    {
      title: "Tow Mechanical",
      color: "red",
      img: getDriveImageUrl(driveImageIds["two-mechanic"]),
      totalWO: serviceData.Tow_Mechanical.totalNumberOfOrders,
      assingedPTA: serviceData.Tow_Mechanical.assingedPTA,
      delays: serviceData.Tow_Mechanical.delays,
      unassigned: serviceData.Tow_Mechanical.unassigned || 0,
      // serviceData.Tow_Mechanical.totalNumberOfOrders -
      // serviceData.Tow_Mechanical.assingedPTA,
    },
    {
      title: "Lockout",
      color: "green",
      img: getDriveImageUrl(driveImageIds["lockout"]),
      totalWO: serviceData.Lockout.totalNumberOfOrders,
      assingedPTA: serviceData.Lockout.assingedPTA,
      delays: serviceData.Lockout.delays,
      unassigned: serviceData.Lockout.unassigned || 0,
      // serviceData.Lockout.totalNumberOfOrders -
      // serviceData.Lockout.assingedPTA,
    },
  ];
  const style =
    location.pathname === "/by-region" ? { left: "20px" } : { left: "unset" };
  const problemCode = location.pathname === "/by-problem-code";

  return (
    <div className="MainDash-Component">
      <div className="main-view-title">VIEW BY - PROBLEM CODE</div>
      {problemCode ? (
        <div className="MainDash" style={style}>
          {byProblemCodeDatas.map((card, id) => {
            return (
              <Cards
                probCode={card.datas}
                img={card.img}
                titles={card.name}
                unassigned={card.unassigned}
                color={card.color}
                key={id}
              />
            );
          })}
        </div>
      ) : (
        <div className="MainDash" style={style}>
          {regionDataToPass?.[0]?.problemCode.map((card, id) => {
            return <Cards card={card} key={id} />;
          })}
        </div>
      )}
    </div>
  );
};
export default ProblemCode;
