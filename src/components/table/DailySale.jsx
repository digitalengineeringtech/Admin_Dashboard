import React from "react";
import { Table } from "@mantine/core";

const DailySale = ({ rows2, label, rows }) => {
  return (
    <div className=" mt-3">
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
              <Table.Td>No</Table.Td>
              <Table.Td>Fuel Type</Table.Td>
              <Table.Td>Liter</Table.Td>
              <Table.Td>Price</Table.Td>
              <Table.Td>Amount</Table.Td>
              <Table.Td>Discount</Table.Td>
              <Table.Td>Amount</Table.Td>
              <Table.Td>Credit</Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody className="text-[1.1rem]">
            {rows}
            <Table.Tr className="font-semibold duration-150 text-center">
              <Table.Td colSpan={4}></Table.Td>
              <Table.Td>900,000,000</Table.Td>
              <Table.Td>0.00</Table.Td>
              <Table.Td>999,000</Table.Td>
              <Table.Td>990,000</Table.Td>
            </Table.Tr>
            {rows2}
            <Table.Tr className="font-semibold duration-150 text-center">
              <Table.Td colSpan={4}>Credit Sale</Table.Td>
              <Table.Td>900,000,000</Table.Td>
              <Table.Td>0.00</Table.Td>
              <Table.Td>999,000</Table.Td>
              <Table.Td>990,000</Table.Td>
            </Table.Tr>
            <Table.Tr className="font-semibold duration-150 text-center">
              <Table.Td colSpan={4}>Total Sale</Table.Td>
              <Table.Td>900,000,000</Table.Td>
              <Table.Td>0.00</Table.Td>
              <Table.Td>999,000</Table.Td>
              <Table.Td>990,000</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default DailySale;
