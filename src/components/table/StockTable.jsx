import React from "react";
import { Table } from "@mantine/core";
import Footer from "../footer/Footer";

const StockTable = ({
  header,
  visible = true,
  tableRef,
  handlePrint,
  handleDownloadExcel,
  label,
  rows,
  head,
}) => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h3 className="text-text ms-3  text-xl">{label}</h3>

        {visible && (
          <h3 className="text-text ms-3 my-[-20px] mb-[-7px] text-xl flex">
            <Footer
              print={handlePrint}
              onClick={handleDownloadExcel}
              totalPages="0"
              // onPageChange={onPageChange}
              pagi="true"
            />
          </h3>
        )}
      </div>
      <div className=" p-4 rounded-xl bg-secondary  shadow-md shadow-shadow/20 ">
        <Table
          ref={tableRef}
          verticalSpacing="md"
          striped
          withTableBorder
          highlightOnHover
          withColumnBorders
          className=" text-text"
        >
          {head ? (
            head
          ) : (
            <Table.Thead className="text-center">
              <Table.Tr className="text-[1.1rem] font-semibold text-center ">
                {header.map((item, index) => (
                  <Table.Td key={index} className="bg-detail/20">
                    {item}
                  </Table.Td>
                ))}
              </Table.Tr>
            </Table.Thead>
          )}
          <Table.Tbody className="text-[1.1rem]">{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default StockTable;
