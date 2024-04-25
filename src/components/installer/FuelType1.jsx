import React from "react";

const FuelType1 = ({ setValue, value }) => {
  return (
    <div className=" w-[47%] ">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="languages"
        id="lang"
        className="ps-3 h-[45px] rounded-md p-2 px-1 w-[100%]"
      >
        <option value="none">None</option>
        <option value="001-Octane Ron(92)">001-Octane Ron(92)</option>
        <option value="002-Octane Ron(95)">002-Octane Ron(95)</option>
        <option value="004-Diesel">004-Diesel</option>
        <option value="005-Premium Diesel">005-Premium Diesel</option>
      </select>
    </div>
  );
};

export default FuelType1;
