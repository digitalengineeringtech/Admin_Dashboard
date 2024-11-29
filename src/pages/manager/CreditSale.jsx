import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const CreditSale = () => {
  return (
    <>
      <div className="w-full pt-28">
        <Outlet />
      </div>
    </>
  );
};

export default CreditSale;
