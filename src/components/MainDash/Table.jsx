import React, { useEffect, useState } from "react";
import "../Cards/Cards.css";
import { useLocation, useParams } from "react-router-dom";
const Table = () => {
  const [orderParams, setOrderParams] = useState(null);

  const { state } = useLocation();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data.workOrders) {
        setOrderParams(event.data.workOrders);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  console.log({ orderParams });

  return (
    <div className="table-view-container">
      <table className="table table-width">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Status</th>
            <th>Assigned/ Unassigned</th>
            <th>Breakdown Location Address</th>
            <th>Mechanic Location Address</th>
            {/* <th>Time Taken</th> */}
            <th>PTA in Mins</th>
            <th>Confidence score</th>
          </tr>
        </thead>
        <tbody>
          {state?.map((orders, index) => {
            const ptaInMins =
              orders["PTA IN HRS"] * 60 + Math.floor(Math.random() * 15);
            const isUnassigned = orders["PTA IN HRS"] === 0;

            return (
              <tr key={orders.work_order_number} className={`data-table-row`}>
                <td>{orders.work_order_number}</td>
                <td>
                  <div
                    className="status-signal"
                    style={{
                      backgroundColor: isUnassigned
                        ? "gray"
                        : orders.pta_truck_predicted / 10 < 5
                        ? "red"
                        : orders.pta_truck_predicted / 10 <= 7
                        ? "yellow"
                        : "green",
                    }}
                  ></div>
                </td>
                <td>{orders["PTA IN HRS"] === 0 ? <>U</> : <>A</>}</td>
                <td>{orders.breakdown_location_address}</td>
                <td>{isUnassigned ? "-" : orders.mechanic_location_address}</td>
                {/* <td>
                  {isUnassigned ? "-" : parseFloat(ptaInMins / 60).toFixed(2)}
                </td> */}
                <td>{isUnassigned ? "-" : ptaInMins}</td>
                <td>
                  {isUnassigned
                    ? "-"
                    : orders.pta_truck_predicted / 10 > 7
                    ? 9.66
                    : orders.pta_truck_predicted / 10 >= 5
                    ? 7.63
                    : 4.55}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
