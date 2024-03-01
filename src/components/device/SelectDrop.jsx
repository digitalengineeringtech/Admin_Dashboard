import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { motion } from "framer-motion";
import "react-dropdown/style.css";
import { FaAngleDown } from "react-icons/fa";
import debounce from "lodash.debounce";

const SelectDrop = ({
  placeholder,
  header,
  items,
  selectedItem,
  onSelectedItem,
  onSearch,
  customer,
  customerId,
}) => {
  const [con, setCon] = useState(false);
  const [customers, setCustomers] = useState([]);

  //   const [value, setValue] = useState("");
  //   const [name, setName] = useState("");
  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  const pfp = {
    open: { opacity: 1 },
    close: { opacity: 0 },
    duration: 10,
  };

  const def_cus = [
    {
      _id: null,
      cou_name: "Individual Customer",
      cou_id: "12345",
    },
  ];
  let label;
  let value;

  if (customer) {
    label = "cou_name";
    value = "cou_id";
  } else if (customerId) {
    label = "cou_id";
    value = "cou_id";
  }

  useEffect(() => {
    setCustomers([]);
    setCustomers(def_cus);
  }, []);

  const handleSearch = debounce(async (searchText) => {
    const apiUrl = `http://192.168.0.100:9000/api/customer/search?key=${searchText}`;
    try {
      const authToken = await authStorage.getToken();

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      });

      if (response.data.result.length === 0) {
        setCustomers(def_cus);
      } else {
        let all = response.data.result;
        all.push({
          _id: null,
          cou_name: "Individual Customer",
          cou_id: "",
        });

        setCustomers(all);
      }

      // Handle the response data as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error condition
    }
  }, 500);

  // console.log("====================================");
  // console.log(value);
  // console.log("====================================");
  console.log(selectedItem, "lllllllllllllllllllllll");
  return (
    <div className="w-[300px] relative">
      <div className="ms-2 text-gray-500 mb-1">{header}</div>
      <div
        onClick={() => setCon((pre) => !pre)}
        className="bg-input border border-inputB z-30 text-text duration-100 select-none items-center w-full p-4 flex justify-between rounded-lg active:scale-95"
      >
        {selectedItem ? selectedItem[label] : "Please Select"}
        <FaAngleDown className="text-text ms-auto" />
      </div>
      {con && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          className=" z-50 absolute bg-[#eff7f6] p-3 border border-inputB w-full  overflow-y-scroll mt-1 rounded-xl "
        >
          {customers.map((item, index) => (
            <div
              onClick={() => {
                setCon(false);
                onSelectedItem(item);
              }}
              key={index}
              className="ps-4 mb-1 bg-secondary text-text border border-nodata rounded-lg shadow-sm shadow-shadow/20  py-2 text-lg hover:bg-detail hover:text-secondary cursor-pointer duration-100"
            >
              {item.cou_name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SelectDrop;
