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
import Modal from "react-bootstrap/Modal"
import { PieChart } from "@mui/x-charts";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
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
  const [isOpen, setIsOpen] = useState(false)
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

//   console.log({details})

  const regionDataToPass = Regiondata.filter((region) => {
    return region.title === regionNav;
  });
  let serviceData = {};
  listData.forEach((item) => {
    serviceData[item] = batteryJump(item);
  });

  console.log({byProblemCodeDatas})


  const getValueData = ()=>{
    const woData = [];
    const assignedPTAData = [];
    const delayData = [];
    const unassignedData = [];
const dataSet =problemCode?byProblemCodeDatas: regionDataToPass?.[0]?.problemCode
    for (let index = 0; index < dataSet.length; index++) {
        const problemCodeData = dataSet[index];
        woData.push(problemCodeData.totalWO || problemCodeData?.datas?.totalWO?.length || 0);
        assignedPTAData.push(problemCodeData.assingedPTA || problemCodeData?.datas?.assingedPTA?.length || 0);
        delayData.push(problemCodeData.delays || problemCodeData?.datas?.delays?.length || 0);
        unassignedData.push(problemCodeData.unassigned || problemCodeData?.datas?.unassigned || 0);
        
    }
    return ([{
        label: "Total Number of WO",
        data: woData
      },
      {
        label: "Assigned PTA",
        data: assignedPTAData
      },
      {
        label: "Delays",
        data: delayData
      },
      {
        label: "Unassigned",
        data:unassignedData
      }
    ])
  }
const getData = (data) => {
    return {
    labels: byProblemCodeDatas.map(problemCode=>problemCode.name),
    datasets: [
      {
        label: data.label,
        data: data.data,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 71, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)',
            'rgba(255, 99, 71, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }};
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels:{
            boxWidth: 0
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  

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

  const handleViewChart = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <div className="MainDash-Component">
        <div className="title-chart-container">
     
      <div className="view-chart">
        <button className="view-chart-button" onClick={handleViewChart}>View <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
  <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778zM8.5.015V7.5h7.485A8 8 0 0 0 8.5.015"/>
</svg></button>
      </div>
       <div className="main-view-title">VIEW BY - PROBLEM CODE</div>
      </div>
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
    {isOpen ? (
         <Modal
         show={isOpen}
         onHide={handleViewChart}
         size="lg"
     >
         <Modal.Header closeButton className="filter-area">
             <Modal.Title>Chart</Modal.Title>
         </Modal.Header>
         <Modal.Body className="modal-body"
             style={{ maxHeight: "400px", overflowY: "auto" }}>
                 {getValueData().map((data, index) => (
                    <div className="pie-container">
                        <div className="label"><b>{data.label}</b></div>
                        <div className="pie-chart">
          <Pie key={index} data={getData(data)} options={options} />
          </div>
          </div>
        ))}
                 {/* <Pie data={data} options={options} />; */}
         </Modal.Body>
     </Modal>
    ) : null}
    </>

  );
};
export default ProblemCode;
