import React, { useEffect, useState } from "react"
import "../Cards/Cards.css"
const Table = () => {
    const [orderParams, setOrderParams] = useState(null);

    useEffect(() => {
      const handleMessage = (event) => {
        // Ensure that the event's origin is trusted if necessary
        if (event.origin !== window.location.origin) {
          return;
        }
        if (event.data.workOrders) {
          setOrderParams(event.data.workOrders);
        }
      };
  
      window.addEventListener('message', handleMessage);
  
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);
  console.log({orderParams})

    return(
        <div className="table-view-container">
            <table className="table table-width">
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
                  {orderParams?.map((orders, index) => (
                    <tr
                      key={orders.work_order_number}
                      className={`data-table-row`}
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
                      <td>{orders["PTA IN HRS"] === 0 ? <>U</> : <>A</>}</td>
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
        </div>
    )
}
export default Table