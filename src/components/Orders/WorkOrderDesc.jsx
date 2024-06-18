import React from "react"
import "./WorkOrderDesc.css"

const OrderDesc = ({ workOrders }) => {
    const item = workOrders[0]

    const viewMap = () => {
        window.open(`/view-map`, "_blank")
    }

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
                            Flat tyre and the issue was closed on time and the
                            customer is happy.
                        </div>
                    </div>
                </div>
            ) : (
                <div className="desc-none">{alert("Not Found, Try valid work order number")}</div>
            )}
        </>
    )
}

export default OrderDesc
