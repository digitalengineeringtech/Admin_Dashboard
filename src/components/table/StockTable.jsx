import React from "react";
import { Table } from "@mantine/core";

const StockTable = ({ header, label, rows }) => {
  return (
    <div className="">
      <h3 className="text-text ms-3 mb-3 text-xl">{label}</h3>
      <div className=" p-4 rounded-xl bg-secondary  shadow-md shadow-shadow/20 ">
        <Table
          verticalSpacing="md"
          striped
          withTableBorder
          highlightOnHover
          withColumnBorders
          className=" text-text"
        >
          <Table.Thead className="text-center">
            <Table.Tr className="text-[1.1rem] font-semibold text-center ">
              {header.map((item, index) => (
                <Table.Td key={index}>{item}</Table.Td>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody className="text-[1.1rem]">{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default StockTable;
