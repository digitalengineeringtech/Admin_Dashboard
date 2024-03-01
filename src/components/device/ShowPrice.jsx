import React from "react";

function ShowPrice({ price }) {
  return (
    <div className="flex items-center justify-center gap-10">
      <div className="">
        <span className="">{price}</span>
      </div>
      <span className="">Price</span>
    </div>
  );
}

export default ShowPrice;
