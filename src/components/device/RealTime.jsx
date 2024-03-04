import React, { useEffect, useState } from "react";
import ShowLiters from "./ShowLiters";
// import ShowPrice from "./ShowPrice";

function RealTime({
  printFormInfo,
  obj,
  liter,
  price,
  setSaleLiter,
  setSalePrice,
}) {
  // const [price, setPrice] = useState(0);
  // const [liter, setLiter] = useState(0);

  // useEffect(() => {
  //   setSaleLiter(liter);
  //   setSalePrice(price);
  // }, [price, liter]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const { liter, price, nozzleNo } = obj.current;

  //     if (parseInt(nozzleNo) === parseInt(printFormInfo.nozzle_no)) {
  //       setPrice(price);
  //       setLiter(liter);
  //     }
  //   }, 100); // Update the values every second

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="container mx-auto flex-col flex justify-center items-center p-4 pt-0">
      <div className="w-[70%] flex justify-between">
        <div className="w-[40%] text-center items-center pb-2 rounded-lg text-detail font-semibold font-sans text-[1.8rem]">
          LITERS
        </div>
        <div className="w-[40%] text-center items-center pb-2 rounded-lg text-detail font-semibold font-sans text-[1.8rem]">
          PRICES
        </div>
      </div>
      <div className="w-[70%] flex justify-between">
        <div className="w-[40%] bg-[#DEF5EE] text-center items-center py-8 rounded-lg text-detail font-semibold font-sans text-[1.8rem]">
          {liter}
        </div>
        <div className="w-[40%] bg-[#DEF5EE] text-center items-center py-8 rounded-lg text-detail font-semibold font-sans text-[1.8rem]">
          {price}
        </div>
      </div>
    </div>
  );
}

export default RealTime;
