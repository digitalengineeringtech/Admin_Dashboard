import React from "react";
import Button from "./Button";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoPrintSharp } from "react-icons/io5";
import { Pagination } from "@mantine/core";
const Footer = ({ onPageChange, totalPages, download }) => {
  return (
    <div className="flex items-center justify-between mb-4 px-3 mt-7">
      <div className="flex gap-4">
        <Button
          onClick={() => download()}
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
      <Pagination
        total={totalPages}
        onChange={onPageChange}
        color="#38b59e"
        withEdges
      />
    </div>
  );
};

export default Footer;
