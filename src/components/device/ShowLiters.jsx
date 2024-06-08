import React from "react";

function ShowLiters({ liter }) {
  return (
    <div className="flex items-center justify-center gap-10">
      <div style="">
        <span style="">{liter}</span>
      </div>
      <span style=""> Liters</span>
    </div>
  );
}

export default ShowLiters;
