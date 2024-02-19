import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { motion } from "framer-motion";
import "react-dropdown/style.css";
import { FaAngleDown } from "react-icons/fa";

const SelectDrop = ({ data, value, setValue, label }) => {
  const [con, setCon] = useState(false);
  //   const [value, setValue] = useState("");
  //   const [name, setName] = useState("");
  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  const pfp = {
    open: { opacity: 1 },
    close: { opacity: 0 },
    duration: 10,
  };

  console.log("====================================");
  console.log(value);
  console.log("====================================");

  return (
    <div className="w-[300px] relative">
      <div className="ms-2 text-gray-500 mb-1">{label}</div>
      <div
        onClick={() => setCon((pre) => !pre)}
        className="bg-input border border-inputB z-30 text-text duration-100 select-none items-center w-full p-4 flex justify-between rounded-lg active:scale-95"
      >
        {value?.name ? value?.name : "Please Select"}
        <FaAngleDown className="text-text" />
      </div>
      {con && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          className=" z-50 absolute bg-[#eff7f6] p-3 border border-inputB w-full h-[200px] overflow-y-scroll mt-1 rounded-xl "
        >
          {data.map((item, index) => (
            <div
              onClick={() => {
                setCon(false);
                setValue(item);
              }}
              key={index}
              className="ps-4 mb-1 bg-secondary text-text border border-nodata rounded-lg shadow-sm shadow-shadow/20  py-2 text-lg hover:bg-detail hover:text-secondary cursor-pointer duration-100"
            >
              {item.name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SelectDrop;
