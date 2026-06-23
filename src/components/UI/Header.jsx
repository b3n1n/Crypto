import React from "react";
import Navigation from "./Header/Navigation";
import RateLine from "./Header/RateLine";

function Header({ coins }) {
  return (
    <div className="header-line">
      <Navigation></Navigation>
      <RateLine coins={coins}></RateLine>
    </div>
  );
}

export default Header;
