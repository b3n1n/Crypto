import React from "react";
import BuyMenu from "./BuyMenu";
import Graph from "./Graph";
import "./Body.css";

function Body({ coins }) {
  return (
    <div className="trade-layout container">
      <Graph coins={coins} />
      <BuyMenu coins={coins} />
    </div>
  );
}

export default Body;
