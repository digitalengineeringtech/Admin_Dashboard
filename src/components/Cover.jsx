import React from "react";
import { FaAngleDown } from "react-icons/fa";

const Cover = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-input border w-[300px] border-inputB z-30 text-text duration-100 select-none items-center h-[60px] mt-auto p-4 flex justify-between rounded-lg active:scale-95"
    >
      {label}
      <FaAngleDown className="text-text" />
    </div>
  );
};

export default Cover;
