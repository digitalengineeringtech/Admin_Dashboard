import React, { useRef } from "react";
import { Table } from "@mantine/core";
import clsx from "clsx";

const FilterTable = ({
  header,
  className,
  label,
  rows,
  tab,
  con1,
  tableRef,
  type,
  totalSale,
  total,
  con,
}) => {
  // const tableRef = useRef();

  // console.log(tableRef, ".........................");
  return (
    <div className="">
      {label && <h3 className="text-text ms-3 mb-3 text-xl">{label}</h3>}
      <div className=" p-4 rounded-xl bg-secondary  shadow-md shadow-shadow/20 ">
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
          className=" text-text col-span-4"
        >
          <Table.Thead className="text-center bg-[#E4F5FF] sticky top-0">
            <Table.Tr className="text-[1rem] font-semibold text-center ">
              {header?.map((item, index) => (
                <Table.Td
                  key={index}
                  className={clsx("bg-[#E4F5FF] text-text", {
                    "w-[20px]": index == 0 && type == "detail",
                  })}
                  // className="bg-[#E4F5FF] text-text"
                >
                  {item}
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody className="text-[1.1rem]">
            {rows}
            {tab && tab}
            {con && (
              <Table.Tr>
                <Table.Td colSpan={8}></Table.Td>
                <Table.Td colSpan={2} className="text-center">
                  Total
                </Table.Td>
                <Table.Td className="text-center">{total}</Table.Td>
              </Table.Tr>
            )}
            {con && (
              <Table.Tr>
                <Table.Td colSpan={8}></Table.Td>
                <Table.Td colSpan={2} className="text-center">
                  Return Amount
                </Table.Td>
                <Table.Td className="text-center">0.00</Table.Td>
              </Table.Tr>
            )}
            {con1 && (
              <Table.Tr>
                <Table.Td colSpan={7}></Table.Td>
                <Table.Td colSpan={2} className="text-center">
                  Total
                </Table.Td>
                <Table.Td className="text-center">{total}</Table.Td>
              </Table.Tr>
            )}
            {con1 && (
              <Table.Tr>
                <Table.Td colSpan={7}></Table.Td>
                <Table.Td colSpan={2} className="text-center">
                  Return Amount
                </Table.Td>
                <Table.Td className="text-center">0.00</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default FilterTable;
