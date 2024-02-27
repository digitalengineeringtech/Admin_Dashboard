import React from "react";
import Button from "./Button";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoPrintSharp } from "react-icons/io5";
import { Pagination } from "@mantine/core";
import { DownloadTableExcel } from "react-export-table-to-excel";

const Footer = ({
  pagi,
  onPageChange,
  totalPages,
  print,
  tableRef,
  onClick,
  activePage,
}) => {
  console.log(activePage, "dddddd");
  return (
    <div className="flex items-center justify-between mb-4 px-3 mt-7">
      <div className="flex gap-4">
        <Button
          onClick={onClick}
          className="flex"
          icon={<RiFileExcel2Fill className="text-xl" />}
          text="To Excel"
        />
        <Button
          onClick={print}
          className="flex"
          icon={<IoPrintSharp className="text-xl" />}
          text="To Print"
        />
      </div>
      {pagi && (
        <Pagination
          page={2}
          total={totalPages}
          onChange={onPageChange}
          color="#38b59e"
          withEdges
        />
      )}
    </div>
  );
};

export default Footer;
