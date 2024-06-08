import React from "react";

const TotalNozzleDrop = ({ full, setValue, value, title = "No" }) => {
  return (
    <div className={`${full ? "w-full " : "w-[47%]"} `}>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="languages"
        id="lang"
        className=" ps-3 h-[45px] rounded-md p-2 px-1 w-[100%]"
      >
        <option value="0">None</option>
        <option value="1">1 Nozzle</option>
        <option value="2">2 Nozzle</option>
        <option value="3">3 Nozzle</option>
        <option value="4">4 Nozzle</option>
        <option value="5">5 Nozzle</option>
        <option value="6">6 Nozzle</option>
        <option value="7">7 Nozzle</option>
        <option value="8">8 Nozzle</option>
      </select>
    </div>
  );
};

export default TotalNozzleDrop;
