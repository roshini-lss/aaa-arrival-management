import React from "react";
import "./MainDash.css";
import { mapDetails, regionParams } from "../../Data/Data";
import Cards from "../Cards/Cards";
import allData from "../../Data/all-data.json"
const Region = () => {
  return (
    <div>
      <div className="total-number-wo">Total Number of WOs: {allData.length}</div>
      <div className="MainDash">
        {mapDetails.map((card, id) => {
          return <Cards card={card} key={id} />;
        })}
      </div>
    </div>
  );
};
export default Region;
