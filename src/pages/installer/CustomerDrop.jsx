import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { motion } from "framer-motion";
import "react-dropdown/style.css";
import { FaAngleDown } from "react-icons/fa";

const CustomerDrop = ({ data, value, cls, setValue, placeholder, label }) => {
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

  // console.log("====================================");
  // console.log(value, data);
  // console.log("====================================");
  const [search, setSearch] = useState("");
  const searchData = data?.filter((e) =>
    e?.customer?.cusName.toLowerCase().trim().includes(search.toLowerCase())
  );
  // console.log("====================================");
  // console.log(searchData);
  // console.log("====================================");

  // const filterData = (value)=>{
  //   const filteredData = data.filter((e) => e.customer.cusName.toLowerCase() === value
  // }

  return (
    <div className={cls ? cls : ` w-[300px] relative`}>
      <div className="ms-2 text-gray-500 mb-1">{label}</div>
      <div
        onClick={() => setCon((pre) => !pre)}
        className="bg-input border border-inputB z-30 text-text duration-100 select-none items-center w-full p-4 flex justify-between rounded-lg active:scale-95"
      >
        {value?.customer?.cusName
          ? value?.customer?.cusName
          : placeholder
          ? placeholder
          : "Please Select"}
        <FaAngleDown className="text-text" />
      </div>
      {con && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          className=" z-50 absolute bg-[#DCF3FF] p-3 border border-inputB w-full h-[200px] overflow-y-scroll mt-1 rounded-xl "
        >
          <div className="flex">
            <input
              className={`bg-[#fafafa] text-lg mb-3  border border-inputB text-text outline-detail/40 w-[100%] h-[60px] rounded-md  px-4 `}
              // type={type}
              value={value}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>

          {searchData.map((item, index) => (
            <div
              onClick={() => {
                setCon(false);
                setValue(item);
              }}
              key={index}
              className="ps-4 mb-1 bg-secondary text-text border border-nodata rounded-lg shadow-sm shadow-shadow/20  py-2 text-lg hover:bg-detail hover:text-secondary cursor-pointer duration-100"
            >
              {item?.customer?.cusName}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CustomerDrop;
