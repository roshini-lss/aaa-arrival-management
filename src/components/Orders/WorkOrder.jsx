import React, { useContext, useEffect, useState } from "react";
import "./WorkOrders.css";
import OrderDesc from "./WorkOrderDesc";
import allData from "../../Data/all-data.json";
import { SelectedContext } from "../../contexts/SelectedContext";

const Order = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNo, setOrderNo] = useState(0);
  const [error, setError] = useState("");
  const [workOrders, setWorkOrders] = useState([]);

  const handleSubmit = (e) => {
    if (validateOrderNo(orderNo)) {
      setIsSubmitted(true);
      setError("");
      handleFilterChange();
    } else {
      setError("Order number must be valid!");
    }
  };

  const { setSelected } = useContext(SelectedContext)
    useEffect(() => {
        setSelected("PTA Health Check")
    }, [])

  const handleFilterChange = () => {
    if (orderNo) {
      const filteredOrders = allData.filter((order) =>
        order.work_order_number.toString().includes(orderNo)
      );
      setWorkOrders(filteredOrders);
    } else {
      setWorkOrders();
    }
  };

  console.log(orderNo);

  const validateOrderNo = (number) => {
    const orderNoPattern = /^3\d{4}$/;
    return orderNoPattern.test(number);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setOrderNo(e.target.value);
  };
  return (
    <div className="order-component">
      {!isSubmitted ? (
        <div className="order-main">
          <div className={`order-container ${isSubmitted ? "submitted" : ""}`}>
            {/* <div className="order-title">Enter Work Order:</div> */}
            <input
              className="order-input"
              type="number"
              name="workorder"
              placeholder="Type Work Order Number..."
              onChange={handleChange}
              onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
            ></input>
            {error && <div className="order-error">{error}</div>}
            {/* <div className="">
              <button
                className="order-btn pointer"
                type="submit"
                onClick={handleSubmit}
              >
                Enter
              </button>
            </div> */}
          </div>
        </div>
      ) : (
        <div
          className={`order-search-conatainer ${
            isSubmitted ? "submitted" : ""
          }`}
        >
          <div className="order-search">
            <div className="input-container">
              <input
                type="search"
                className="order-input"
                placeholder="Type Work Order Number..."
                onChange={handleChange}
                onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
              ></input>
            </div>
            {/* <div>
              <button
                className="order-btn pointer"
                type="submit"
                onClick={handleSubmit}
              >
                Enter
              </button>
            </div> */}
          </div>
        </div>
      )}
      <div>
        {isSubmitted && (
          <div className="">
            <OrderDesc workOrders={workOrders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
