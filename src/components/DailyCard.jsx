import React from "react";

const DailyCard = () => {
  return (
    <div className="bg-[#e8f4ee] shadow-shadow/10 border-2 gap-4 p-4 border-[#94d99a] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl ">
      <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
        <img
          src="../../public/static/images/gasoline.png"
          className="h-14 2xl:ms-2 mr-2"
          alt=""
        />
        <div className="flex flex-col">
          <div className="font-semibold text-detail">002-Octane Ron (92)</div>
          <div className=" text-detail">Total - 100,000 MMK</div>
          <div className=" text-detail">Total - 10 Liter</div>
        </div>
      </div>
      <div className="w-[170px] h-full bg-secondary rounded-xl ">
        {" "}
        <div className="flex flex-col items-center justify-center h-full">
          <div className=" text-detail">Price</div>
          <div className=" text-detail font-semibold text-xl">2,000</div>
          <div className=" text-detail">MMK</div>
        </div>
      </div>
    </div>
  );
};

export default DailyCard;
