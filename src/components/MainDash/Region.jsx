import React, { useContext, useEffect } from "react";
import "./MainDash.css";
import { Regiondata, mapDetails, regionParams } from "../../Data/Data";
import Cards from "../Cards/Cards";
import allData from "../../Data/all-data.json";
import { SelectedContext } from "../../contexts/SelectedContext";
const Region = () => {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("By Region");
  }, []);

  return (
    <div>
      <div className="view-title">VIEW BY - REGION</div>
      <div className="total-number-wo">
        Total Number of WOs: {allData.length}
      </div>
      <div className="MainDash">
        {Regiondata.map((card, id) => {
          return <Cards card={card} key={id} problemCode={false} />;
        })}
      </div>
    </div>
  );
};
export default Region;
