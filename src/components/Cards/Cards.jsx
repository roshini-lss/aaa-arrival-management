import React, { useContext, useEffect, useState } from "react";
import "./Cards.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { batteryJump, regionParams, byProblemCodeDatas } from "../../Data/Data";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import allData from "../../Data/all-data.json";
import { RegionContext } from "../../contexts/RegionContext";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Cards = ({ card, probCode, titles, img, unassigned, color }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [workOrdersCopy, setWorkOrdersCopy] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const cardVal = card?.title.toLowerCase();
  const [coloredCount, setColoredCount] = useState(0);
  const { regionNav, setRegionNav } = useContext(RegionContext);
  const [navigateToTable, setNavigateToTable] = useState(false);
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

  const [selectedOptions, setSelectedOptions] = useState();

  const options = [
    // { value: "None", label: "None" },
    { value: "High", label: "High" },
    { value: "Moderate", label: "Moderate" },
    { value: "Low", label: "Low" },
  ];

  const [expandedRows, setExpandedRows] = useState([]);
  const [toggle, setToggle] = useState(false);

  const animatedComponents = makeAnimated();

  const toggleRow = (index) => {
    setToggle(!toggle);
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((row) => row !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  useEffect(() => {
    regionParams(region);
  }, [cardVal]);

  useEffect(() => {
    if (navigateToTable && workOrders.length > 0) {
      navigate(`/table-view`, { state: workOrders });
      setNavigateToTable(false);
    }
  }, [navigateToTable, workOrders, navigate]);

  const getInfoByRegion = () => {
    navigate(`/by-region/${cardVal}`);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleShow = (title) => {
    if (location.pathname === "/by-problem-code") {
      setWorkOrders([...probCode.totalWO]);
      return;
    }

    const normalizeString = (str) => str.replace(/_/g, " ");
    const aggregatedData = [];

    listData.forEach((val) => {
      const modifiedVal1 = normalizeString(val);
      if (modifiedVal1.includes(title)) {
        const data = allData.filter(
          (item) =>
            item.State === region.val.toUpperCase() &&
            item.description_of_the_problem_code === val
        );
        aggregatedData.push(...data);
      }
    });

    setWorkOrders([...workOrders, ...aggregatedData]);
    setWorkOrdersCopy([...workOrders, ...aggregatedData]);
    setIsOpen(true);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    // const newWindow = window.open("/table-view", "_blank")
    // if (newWindow) {
    //     newWindow.onload = () => {
    //         newWindow.postMessage({ workOrders }, "*")
    //     }
    // }
    probCode ? handleShow(probCode.title) : handleShow(card.title);
    setNavigateToTable(true);
  };

  const handleChange = () => {
    if (location.pathname === "/by-region") {
      navigate(`/by-region/${cardVal}`);
    } else {
      probCode ? handleShow(probCode.title) : handleShow(card.title);
    }
  };

  const getRandomColor = (orders) => {
    if (orders["PTA IN HRS"] !== 0) {
      const colors = ["green", "red", "white"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return color;
    } else {
      return "white";
    }
  };

  const handleFilter = (type) => {
    console.log({ type });
    switch (type) {
      case "High":
        return workOrdersCopy.filter((workOrder) => workOrder.Diff < -13);
      case "Moderate":
        return workOrdersCopy.filter((workOrder) => {
          return workOrder.Diff < -10 && workOrder.Diff > -14;
        });
      case "Low":
        return workOrdersCopy.filter((workOrder) => workOrder.Diff >= -10);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    // You can perform any additional logic here based on selectedOptions
    console.log("Selected Options:", selectedOptions);
    // setWorkOrders(handleFilter(selectedOptions.value))
    // setWorkOrders([])
    // selectedOptions.map((val) => {
    //     console.log(setWorkOrders)
    //     console.log({ val })
    const filteredBySelectedData = handleFilter(selectedOptions.value);
    setWorkOrders(filteredBySelectedData);
    // })
  };
  console.log({ selectedOptions });

  return (
    <>
      <div
        className="card-container"
        onClick={handleChange}
        onContextMenu={handleRightClick}
      >
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
            <Modal.Header closeButton className="filter-area">
              <Modal.Title>Risk</Modal.Title>
              <div className="test">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  // defaultValue={[
                  //     colourOptions[4],
                  //     colourOptions[5],
                  // ]}
                  // isMulti
                  options={options}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  placeholder="Filter by status"
                />
              </div>
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
                      <td className="status">
                        {orders["PTA IN HRS"] === 0 ? <>U</> : <>A</>}
                      </td>
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
            <Modal.Header closeButton className="filter-area">
              <Modal.Title>Risk</Modal.Title>
              <div className="test">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={[
                  //     colourOptions[4],
                  //     colourOptions[5],
                  // ]}
                  // isMulti
                  options={options}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  placeholder="Filter by status"
                />
              </div>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table className="table">
                {/* <thead>
                                    <tr>
                                        <th>Order Number</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Time Taken</th>
                                        <th>Time Predicted</th>
                                        <th>PTA in Hours</th>
                                    </tr>
                                </thead> */}
                <tbody>
                  <div>No data available</div>
                  {/* {workOrders.map((orders, index) => (
                                        <tr
                                            key={orders.work_order_number}
                                            className={`data-table-row-${getRandomColor(
                                                orders
                                            )}`}
                                        >
                                            <td>{orders.work_order_number}</td>
                                            <td>
                                                {
                                                    orders.breakdown_location_latitude
                                                }
                                            </td>
                                            <td>
                                                {
                                                    orders.breakdown_location_longitude
                                                }
                                            </td>
                                            <td>{orders.pta_truck}</td>
                                            <td>
                                                {orders.pta_truck_predicted}
                                            </td>
                                            <td>{orders["PTA IN HRS"]}</td>
                                        </tr>
                                    ))} */}
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
