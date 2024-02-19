import React from "react";
import Button from "./Button";
import Paginator from "./Paginator";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoPrintSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="flex items-center justify-between mb-4 px-3 mt-7">
      <div className="flex gap-4">
        <Button
          className="flex"
          icon={<RiFileExcel2Fill className="text-xl" />}
          text="To Excel"
        />
        <Button
          className="flex"
          icon={<IoPrintSharp className="text-xl" />}
          text="To Print"
        />
      </div>
      <Paginator />
    </div>
  );
};

export default Footer;
