import React, { useContext, useEffect, useState } from "react";
import "./Cards.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { batteryJump, regionParams, byProblemCodeDatas } from "../../Data/Data";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import allData from "../../Data/all-data.json";
import { RegionContext } from "../../contexts/RegionContext";
import Table from "../MainDash/Table";
import ReactDOM from 'react-dom';
const Cards = ({ card, probCode, titles, img, unassigned, color }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const cardVal = card?.title.toLowerCase();
  const [coloredCount, setColoredCount] = useState(0);
  const { regionNav, setRegionNav } = useContext(RegionContext);
  const region = useParams();
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

  const [expandedRows, setExpandedRows] = useState([]);
  const [toggle, setToggle] = useState(false);

  const toggleRow = (index) => {
    setToggle(!toggle);
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((row) => row !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  //  window.location.reload()
  useEffect(() => {
    regionParams(region);
    //  debugger
    //   const batteryJump = JSON.parse(localStorage.getItem('batteryJump')) || {};
    //   console.log(batteryJump)
    //   // setData((prev) => {[...prev, ...{totalWO:batteryJump.totalNumberOfOrders}]})
    //   // window.location.reload()
    //   // localStorage.removeItem('batteryJump');
  }, [cardVal]);

  // useEffect(() => {
  //   listData.map((val) => {
  //     const valData = val.toLowerCase()
  //     if(title.includes(valData)){
  //       workOrders = workOrders.push(allData.filter((item) => item.State === region && item.description_of_the_problem_code === val))
  //     }
  //   })
  //   console.log({workOrders})
  // },[isOpen])

  const getInfoByRegion = () => {
    navigate(`/by-region/${cardVal}`);
  };

  const handleClose = () => {
    // debugger
    setIsOpen(false);
  };
  const handleShow = (title) => {
    if (location.pathname === "/by-problem-code") {
      setWorkOrders([...probCode.totalWO]);
    }
    listData.map((val) => {
      const normalizeString = (str) => str.replace(/_/g, " ");
      const normalizedVal2 = normalizeString(val);
      const modifiedVal1 = val.replace(/_/g, " ");
      if (modifiedVal1.includes(title)) {
        const data = allData.filter(
          (item) =>
            item.State === region.val.toUpperCase() &&
            item.description_of_the_problem_code === val
        );
        setWorkOrders([...workOrders, ...data]);
      }
    });
    setIsOpen(true);
  };

  const handleNavigate = () => {
    setRegionNav(card?.title);
  };

  const handleChange = () => {
    if (location.pathname === "/by-region") {
      navigate(`/by-region/${cardVal}`);
    } else {
      probCode ? handleShow(probCode.title) : handleShow(card.title);
      if(workOrders.length > 0){
      // const serializedParams = encodeURIComponent(JSON.stringify(workOrders));
      // const url = `/table-view?orderParams=${serializedParams}`;
      // window.open(url, '_blank');
        handleNavigates()
      }
    }
  };
  const handleNavigates = (orderParams) => {
    const newWindow = window.open('/table-view', '_blank');
    if (newWindow) {
      // Wait for the new window to fully load before sending the message
      newWindow.onload = () => {
        newWindow.postMessage({ workOrders }, '*'); // The '*' wildcard allows messages from any origin
      };
    }
  };

  // const handleClick = () => {
  //   const newWindow = window.open('', '', 'width=600,height=400');
  //   newWindow.document.write(`
  //   <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <title>New Window</title>
  //     </head>
  //     <body>
  //       <div id="root"></div>
  //     </body>
  //   </html>
  // `);
  //   newWindow.document.addEventListener('DOMContentLoaded', () => {
  //     ReactDOM.render(<Table workOrders={workOrders}/>, newWindow.document.getElementById('root'));
  //   });
  // }

  console.log(location.pathname, workOrders);

  const getRandomColor = (orders) => {
    if (orders["PTA IN HRS"] !== 0) {
      const colors = ["green", "red", "white"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return color;
    } else {
      return "white";
    }
  };

  return (
    <>
      <div className="card-container" onClick={handleChange}>
        <div className="status-indicator-container">
          <div
            className="status-indicator"
            style={{
              background: card ? card.color : color || "defaultColor",
            }}
          ></div>
        </div>
        <div className="category-label">
          <img
            className="category-image"
            src={card ? card.img : img}
            width={150}
            height={100}
          />
          <div className="category-title">{card ? card.title : titles}</div>
        </div>
        {probCode ? (
          <div className="data-fields pointer">
            <div className="total-wo">
              Total number of WOs: {probCode?.totalWO.length || 0}
            </div>
            <div className="assinged-pta">
              Assigned PTA: {probCode?.assingedPTA.length || 0}
            </div>
            <div className="predicted-delays">
              PTA - Predicted delays: {probCode?.delays.length || 0}
            </div>
            <div className="unassigned">
              Unassigned: {probCode?.unassigned || 0}
            </div>
          </div>
        ) : (
          <div className="data-fields pointer">
            <div className="total-wo">
              Total number of WOs: {card?.totalWO || 0}
            </div>
            <div className="assinged-pta">
              Assigned PTA: {card?.assingedPTA || 0}
            </div>
            <div className="predicted-delays">
              PTA - Predicted delays: {card?.delays || 0}
            </div>
            <div className="unassigned">
              Unassigned: {card?.unassigned || 0}
            </div>
          </div>
        )}
      </div>
      {isOpen && workOrders?.length > 0 ? (
        <>
          <Modal show={isOpen} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Status</th>
                    <th>Assigned/ Unassigned</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Time Taken</th>
                    <th>Time Predicted</th>
                    <th>PTA in Mins</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrders.map((orders, index) => (
                    <tr
                      key={orders.work_order_number}
                      className={`data-table-row-${getRandomColor(orders)}`}
                    >
                      <td>{orders.work_order_number}</td>
                      <td>
                        <div
                          className="status-signal"
                          style={{
                            backgroundColor:
                              orders.Diff > -10
                                ? "green"
                                : orders.Diff > -13
                                ? "yellow"
                                : "red",
                          }}
                        ></div>
                      </td>
                      <td className="status">{orders["PTA IN HRS"] === 0 ? <>U</> : <>A</>}</td>
                      <td>{orders.breakdown_location_latitude}</td>
                      <td>{orders.breakdown_location_longitude}</td>
                      <td>{orders.pta_truck}</td>
                      <td>{orders.pta_truck_predicted}</td>
                      <td>
                        {orders["PTA IN HRS"] !== 0
                          ? orders["PTA IN HRS"] * 60 +
                            Math.floor(Math.random() * 15)
                          : 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <Modal show={isOpen} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Time Taken</th>
                    <th>Time Predicted</th>
                    <th>PTA in Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrders.map((orders, index) => (
                    <tr
                      key={orders.work_order_number}
                      className={`data-table-row-${getRandomColor(orders)}`}
                    >
                      <td>{orders.work_order_number}</td>
                      <td>{orders.breakdown_location_latitude}</td>
                      <td>{orders.breakdown_location_longitude}</td>
                      <td>{orders.pta_truck}</td>
                      <td>{orders.pta_truck_predicted}</td>
                      <td>{orders["PTA IN HRS"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};
export default Cards;
