import React from "react";
import { Table } from "@mantine/core";

const DailySale = ({
  rows2,
  label,
  rows,
  notCreditTotal,
  footer,
  footer2,
  tableRef,
}) => {
  return (
    <div className=" mt-3">
      <h3 className="text-text ms-3 mb-3 text-xl">{label}</h3>
      <div className=" p-4 rounded-xl bg-secondary  shadow-md shadow-shadow/20 ">
        <Table
          ref={tableRef}
          borderColor={"#bacedb"}
          verticalSpacing="md"
          striped
          withTableBorder
          highlightOnHover
          withColumnBorders
          className=" text-text"
        >
          <Table.Thead className="text-center">
            <Table.Tr className="text-[1.1rem]  font-semibold text-center ">
              <Table.Td className="bg-detail/20">No</Table.Td>
              <Table.Td className="bg-detail/20">Fuel Type</Table.Td>
              <Table.Td className="bg-detail/20">Liter</Table.Td>
              <Table.Td className="bg-detail/20">Price</Table.Td>
              <Table.Td className="bg-detail/20">Amount</Table.Td>
              <Table.Td className="bg-detail/20">Discount</Table.Td>
              <Table.Td className="bg-detail/20">Amount</Table.Td>
              <Table.Td className="bg-detail/20">Credit</Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody className="text-[1.1rem]">
            {rows}
            <Table.Tr className="font-semibold duration-150 text-center">
              <Table.Td colSpan={4}></Table.Td>
              <Table.Td>{footer?.totalAmount?.toFixed(2)}</Table.Td>
              <Table.Td></Table.Td>
              <Table.Td>{footer?.disAmount?.toFixed(2)}</Table.Td>
              <Table.Td>-</Table.Td>
            </Table.Tr>
            {rows2}
            <Table.Tr className="font-semibold duration-150 text-center">
              <Table.Td colSpan={4}>Credit Sale</Table.Td>
              <Table.Td>{footer2?.totalAmount?.toFixed(2)}</Table.Td>
              <Table.Td></Table.Td>
              <Table.Td>{footer2?.disAmount?.toFixed(2)}</Table.Td>
              <Table.Td>-</Table.Td>
            </Table.Tr>
            <Table.Tr className="font-semibold duration-150 text-center">
              <Table.Td colSpan={4}>Total Sale</Table.Td>
              <Table.Td>
                {(footer?.totalAmount + footer2?.totalAmount)?.toFixed(2)}
              </Table.Td>
              <Table.Td></Table.Td>
              <Table.Td>
                {(footer?.disAmount + footer2?.disAmount)?.toFixed(2)}
              </Table.Td>
              <Table.Td>-</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default DailySale;
