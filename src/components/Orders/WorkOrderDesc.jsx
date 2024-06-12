import React from "react";
import "./WorkOrderDesc.css";

const OrderDesc = ({ workOrders }) => {
  const item = workOrders[0];

  return (
    <>
      {item ? (
        <div className="desc-container">
          <div className="desc-title">
            {item.description_of_the_problem_code}
          </div>
          <hr></hr>
          <div className="desc-card">
            <div className="desc-col">
              <h3 className="desc-sub">State</h3>
              <h6>{item.State}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Longitude</h3>
              <h6>{item.breakdown_location_latitude}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Latitude</h3>
              <h6>{item.breakdown_location_longitude}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Trucks Assigned</h3>
              <h6>{item.pta_truck}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Truck Predicted</h3>
              <h6>{item.pta_truck_predicted}</h6>
            </div>
          </div>
          <button className="desc-btn">View</button>
          <hr></hr>
          <div className="other-details">
            <div>01/02/2024, there had a good condition</div>
          </div>
        </div>
      ) : (
        <div className="desc-none">None Found!</div>
      )}
    </>
  );
};

export default OrderDesc;
