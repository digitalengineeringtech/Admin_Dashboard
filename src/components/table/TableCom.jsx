import React from "react";
import { Table } from "@mantine/core";

const TableCom = ({ data, footer, footer2, label, header, rows }) => {
  // console.log(data);
  // const rows = data?.map((element) => (
  //   <Table.Tr key={element.price} className=" duration-150 text-center">
  //     <Table.Td>{element.no}</Table.Td>
  //     <Table.Td>{element.type}</Table.Td>
  //     <Table.Td>{element.liter}</Table.Td>
  //     <Table.Td>{element.price}</Table.Td>
  //     <Table.Td>{element.amount}</Table.Td>
  //     <Table.Td>{element.description}</Table.Td>
  //   </Table.Tr>
  // ));

  return (
    <div className=" mt-5">
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
                <Table.Td key={index} className="bg-detail/20">
                  {item}
                </Table.Td>
              ))}
            </Table.Tr>
            {/* <Table.Tr className="text-[1.1rem] font-semibold text-center ">
              <Table.Td>No</Table.Td>
              <Table.Td className="">Fuel Type</Table.Td>
              <Table.Td>Liter</Table.Td>
              <Table.Td>Price</Table.Td>
              <Table.Td>Amount</Table.Td>
              <Table.Td>Description</Table.Td>
            </Table.Tr> */}
          </Table.Thead>
          <Table.Tbody className="text-[1.1rem]">
            {rows}
            {footer ? (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  className="text-center text-lg font-semibold"
                >
                  {footer?.desc}
                </Table.Td>
                <Table.Td
                  colSpan={2}
                  className="text-center text-lg font-semibold"
                >
                  {footer?.total}
                </Table.Td>
              </Table.Tr>
            ) : footer2 ? (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  className="text-center text-lg font-semibold"
                >
                  {footer2?.desc}
                </Table.Td>
                <Table.Td
                  colSpan={2}
                  className="text-center text-lg font-semibold"
                >
                  {footer2?.total}
                </Table.Td>
              </Table.Tr>
            ) : (
              <div className="">dfdf</div>
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableCom;
