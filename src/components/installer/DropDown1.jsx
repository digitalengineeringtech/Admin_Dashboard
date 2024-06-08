import React from "react";

const DropDown1 = ({ setValue, value }) => {
  return (
    <div className="w-[47%]">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="languages"
        id="lang"
        className="h-[45px] ps-3 rounded-md p-2 px-1 w-[100%]"
      >
        <option value="0">None</option>
        <option value="1">Dispenser 1</option>
        <option value="2">Dispenser 2</option>
        <option value="3">Dispenser 3</option>
        <option value="4">Dispenser 4</option>
        <option value="5">Dispenser 5</option>
        <option value="6">Dispenser 6</option>
        <option value="7">Dispenser 7</option>
      </select>
    </div>
  );
};

export default DropDown1;
