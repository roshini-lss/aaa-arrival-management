import React from "react";
import { Toaster, toast } from "sonner";
import "./WorkOrderDesc.css";
import { defaultHistory, ordersHistory } from "../../Data/Data";

const OrderDesc = ({ workOrders }) => {
  const item = workOrders[0];
  //   if (item === undefined) {
  //     toast.warning("Invalid Credentials");
  //   }

  let history = ordersHistory.filter(
    (data) => data.workOrderNo === String(item?.work_order_number)
  );
  if (history.length === 0) {
    history = defaultHistory;
  }

  history.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  console.log(history);

  const stateToPass = {
    latitude: item?.breakdown_location_latitude,
    longitude: item?.breakdown_location_longitude,
    destinations: item?.breakdown_location_address,
    truck_location: item?.mechanic_location_work_data,
  };

  const viewMap = () => {
    const queryString = new URLSearchParams(stateToPass).toString();
    window.open(`/view-map?${queryString}`, "_blank");
  };

  return (
    <>
      {item ? (
        <div className="desc-container">
          <div className="desc-title">
            Problem Description: {item.description_of_the_problem_code}
          </div>
          <hr></hr>
          <div className="desc-card">
            <div className="desc-col">
              <h3 className="desc-sub">State</h3>
              <h6>{item.State}</h6>
            </div>
            {/* <div className="desc-col">
              <h3 className="desc-sub">Breakdown Location Latitude</h3>
              <h6>{item.breakdown_location_latitude}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Mechanic Location Work Data</h3>
              <h6>{item.breakdown_location_longitude}</h6>
            </div> */}
            <div className="desc-col">
              <h3 className="desc-sub">Breakdown Location Address</h3>
              <h6>{item.breakdown_location_address}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Mechanic Location Address</h3>
              <h6>{item.mechanic_location_address}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Truck Assigned</h3>
              {/* <h6>{item.pta_truck}</h6> */}
              <h6>{"Yes"}</h6>
            </div>
            <div className="desc-col">
              <h3 className="desc-sub">Truck Predicted</h3>
              <h6>{item.pta_truck_predicted}</h6>
            </div>
          </div>
          <div className="view-button">
            <button className="view-btn" onClick={viewMap}>
              View
            </button>
          </div>
          <hr></hr>
          <div className="other-details">
            <div>
              <h3>Previous work order summary</h3>
            </div>
            <div>
              {history.map((data) => {
                return (
                  <p
                    className={
                      data.positive ? "positive review" : "negative review"
                    }
                  >
                    {`${data.date} - ${data.review}`}{" "}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="desc-none"></div>
      )}
    </>
  );
};

export default OrderDesc;
