import React, { useRef } from "react";
import { Table } from "@mantine/core";
import clsx from "clsx";

const CustomTable = ({ header, head, cls, label, rows, tableRef, type }) => {
  // const tableRef = useRef();

  // console.log(tableRef, ".........................");
  return (
    <div className="">
      <div
        className={` p-4 rounded-xl bg-secondary  shadow-md shadow-shadow/20 ${cls}`}
      >
        <Table
          // withRowBorders={true}
          borderColor={"#bacedb"}
          ref={tableRef}
          verticalSpacing="md"
          // striped
          withTableBorder
          highlightOnHover
          stickyHeader={true}
          withColumnBorders
          className=" text-text"
        >
          <Table.Thead className="text-center bg-[#E4F5FF] sticky top-0">
            {head}
          </Table.Thead>
          <Table.Tbody className="text-[1.1rem]">{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustomTable;
