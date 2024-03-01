import React, { useEffect, useState } from "react";
import ShowLiters from "./ShowLiters";
// import ShowPrice from "./ShowPrice";

function RealTime({ printFormInfo, obj, setSaleLiter, setSalePrice }) {
  const [price, setPrice] = useState(0);
  const [liter, setLiter] = useState(0);

  useEffect(() => {
    setSaleLiter(liter);
    setSalePrice(price);
  }, [price, liter]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { liter, price, nozzleNo } = obj.current;

      if (parseInt(nozzleNo) === parseInt(printFormInfo.nozzle_no)) {
        setPrice(price);
        setLiter(liter);
      }
    }, 100); // Update the values every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container mx-auto flex justify-center p-4">
      <div className="bg-red-300 w-[70%] flex justify-between">
        <div className="w-[40%] bg-blue-200">{liter}</div>
        <div className="w-[40%] bg-blue-200">{price}</div>
      </div>
    </div>
  );
}

export default RealTime;
