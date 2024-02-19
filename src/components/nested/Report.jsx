import React from "react";
import TableCom from "../table/TableCom";
import elements, {
  daily_sale,
  office_use,
} from "../../testBeforeApi/tableData/dailyList";
import { Table } from "@mantine/core";
import DailySale from "../table/DailySale";

const Report = () => {
  const pumpTestFooter = {
    desc: "Total Pump Test",
    total: "100,000",
  };
  const officeUseFooter = {
    desc: "Total Office Use",
    total: "300,000",
  };
  const dailySaleFooter = {
    desc: "Total Office Use",
    total: "300,000",
  };
  const pumpTestHeader = [
    "No",
    "Fuel Type",
    "Liter",
    "Price",
    "Amount",
    "Description",
  ];

  const dailySaleHeader = [
    "No",
    "Fuel Type",
    "Liter",
    "Price",
    "Amount",
    "Discount",
    "Amount",
    "Credit Balance",
  ];

  const pumpTestRows = elements?.map((element) => (
    <Table.Tr key={element.price} className=" duration-150 text-center">
      <Table.Td>{element.no}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.liter}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
    </Table.Tr>
  ));
  const officeUseRow = office_use?.map((element) => (
    <Table.Tr key={element.price} className=" duration-150 text-center">
      <Table.Td>{element.no}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.liter}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
    </Table.Tr>
  ));
  const dailySale = daily_sale?.map((element) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{element.no}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.liter}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.discount}</Table.Td>
      <Table.Td>{element.tamount}</Table.Td>
      <Table.Td>{element.credit}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="">
      <div className="flex gap-6">
        <div className="w-[50%]">
          <TableCom
            label={"Pump Test"}
            footer={pumpTestFooter}
            header={pumpTestHeader}
            rows={pumpTestRows}
          />
        </div>
        <div className="w-[50%]">
          <TableCom
            label={"Office Use"}
            footer={officeUseFooter}
            header={pumpTestHeader}
            rows={officeUseRow}
          />
        </div>
      </div>
      <div className="w-[100%] mt-10">
        <DailySale rows={dailySale} label={"Daily Sale"} rows2={dailySale} />
      </div>
    </div>
  );
};

export default Report;
