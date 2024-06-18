import React, { useContext, useEffect, useState } from "react";
import "./Cards.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { batteryJump, regionParams, byProblemCodeDatas } from "../../Data/Data";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import allData from "../../Data/all-data.json";
const Cards = ({ card, probCode, titles, img, unassigned, color }) => {
  console.log(card);
  const [isOpen, setIsOpen] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const cardVal = card?.title.toLowerCase();
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

  console.log(card);
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

  console.log(byProblemCodeDatas);
  const getInfoByRegion = () => {
    navigate(`/by-region/${cardVal}`);
  };

  const handleClose = () => setIsOpen(false);
  const handleShow = (title) => {
    console.log({ region });
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
        console.log({ data });
        setWorkOrders([...workOrders, ...data]);
      }
    });
    setIsOpen(true);
  };

  return (
    <div className="card-container">
      <div className="status-indicator-container">
        <div
          className="status-indicator"
          style={{ background: card ? card.color : color || "defaultColor" }}
        ></div>
      </div>
      <div className="category-label">
        <img
          className="category-image"
          src={card ? card.img : img}
          width={150}
          height={100}
          onClick={getInfoByRegion}
        />
        <div className="category-title">{card ? card.title : titles}</div>
      </div>
      {probCode ? (
        <div className="data-fields pointer">
          <div className="total-wo">
            Total number of WOs: {probCode?.totalWO || 0}
          </div>
          <div className="assinged-pta">
            Assigned PTA: {probCode?.assingedPTA || 0}
          </div>
          <div className="predicted-delays">
            PTA - Predicted delays: {probCode?.delays || 0}
          </div>
          <div className="unassigned">
            Unassigned: {probCode ? unassigned : 0}
          </div>
        </div>
      ) : (
        <div
          className="data-fields pointer"
          onClick={() => handleShow(card.title)}
        >
          <div className="total-wo">
            Total number of WOs: {card?.totalWO || 0}
          </div>
          <div className="assinged-pta">
            Assigned PTA: {card?.assingedPTA || 0}
          </div>
          <div className="predicted-delays">
            PTA - Predicted delays: {card?.delays || 0}
          </div>
          <div className="unassigned">Unassigned: {card?.unassigned || 0}</div>
        </div>
      )}
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
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Time Taken</th>
                    <th>Time Predicted</th>
                    <th>PTA in Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrders.map((orders, index) => (
                    <tr key={orders.work_order_number}>
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
      ) : null}
    </div>
  );
};
export default Cards;
