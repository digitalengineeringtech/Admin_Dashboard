import React, { useRef } from "react";
import { Table } from "@mantine/core";

const FilterTable = ({ header, label, rows, tableRef }) => {
  // const tableRef = useRef();

  // console.log(tableRef, ".........................");
  return (
    <div className="">
      <h3 className="text-text ms-3 mb-3 text-xl">{label}</h3>
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
          className=" text-text "
        >
          <Table.Thead className="text-center bg-[#E4F5FF] sticky top-0">
            <Table.Tr className="text-[1rem] font-semibold text-center ">
              {header?.map((item, index) => (
                <Table.Td key={index} className="bg-[#E4F5FF] text-text">
                  {item}
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody className="text-[1.1rem]">{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default FilterTable;
