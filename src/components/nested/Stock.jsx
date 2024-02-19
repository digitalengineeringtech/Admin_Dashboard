import React from "react";
import StockTable from "../table/StockTable";
import { meter, stock } from "../../testBeforeApi/tableData/stock";
import { Table } from "@mantine/core";

const Stock = () => {
  const meterHeader = [
    "No",
    "Date",
    "Pump",
    "Item",
    "Opening",
    "Closing",
    "Issue",
  ];
  const meterRow = meter?.map((element) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{element.no}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.pump}</Table.Td>
      <Table.Td>{element.item}</Table.Td>
      <Table.Td>{element.opening}</Table.Td>
      <Table.Td>{element.closing}</Table.Td>
      <Table.Td>{element.issue}</Table.Td>
    </Table.Tr>
  ));

  const stockHeader = [
    "No",
    "Tank",
    "Opening",
    "Receive",
    "Issue",
    "Adjust",
    "Balance",
    "Today Tank",
    "Yesterday Tank ",
    "Total Issue",
    "Today G/L",
    "Total G/L",
  ];
  const stockRow = stock?.map((element) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{element.no}</Table.Td>
      <Table.Td>{element.tank}</Table.Td>
      <Table.Td>{element.opening}</Table.Td>
      <Table.Td>{element.receive}</Table.Td>
      <Table.Td>{element.issue}</Table.Td>
      <Table.Td>{element.adjust}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
      <Table.Td>{element.ttank}</Table.Td>
      <Table.Td>{element.ytank}</Table.Td>
      <Table.Td>{element.tissue}</Table.Td>
      <Table.Td>{element.tgl}</Table.Td>
      <Table.Td>{element.totalgl}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <div className="flex gap-8 mt-8">
        <div className="w-[40%] shadow-md shadow-shadow/20 bg-secondary rounded-xl flex items-center justify-center">
          <img
            className="w-[70%]  2xl:w-[55%]"
            src="../../../static/images/Fuel station-pana.png"
            alt=""
          />
        </div>
        <div className="w-[60%] ">
          <StockTable
            header={meterHeader}
            rows={meterRow}
            label="Meter Balance"
          />
        </div>
      </div>
      <div className="mt-8">
        <StockTable
          label="Stock Balance"
          rows={stockRow}
          header={stockHeader}
        />
      </div>
    </div>
  );
};

export default Stock;
