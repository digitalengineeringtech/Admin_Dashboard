import React, { useState } from "react";

const checkTankStatus = () => {
  const [atg, setAtg] = useState();
  let status = localStorage.getItem("atg");
  if (status === "true") {
    setAtg(true);
  } else {
    setAtg(false);
  }
  return atg;
};

export default checkTankStatus;
