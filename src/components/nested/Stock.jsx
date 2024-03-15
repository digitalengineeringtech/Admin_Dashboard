import React, { useEffect, useRef, useState } from "react";
import StockTable from "../table/StockTable";
import { meter, stock } from "../../testBeforeApi/tableData/stock";
import { Table } from "@mantine/core";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet from "../../api/hooks/UseGet";

import { useOutletContext } from "react-router-dom";

const Stock = () => {
  const [totalPTest, totalOTest, totalCredit, notCredit, total, stock] =
    useOutletContext();

  const tableRef = useRef(null);
  const tableRef1 = useRef(null);

  console.log(stock, "ljlllljjljlljjjljljljljl");

  // let start = new Date();
  // const [token, setToken] = useState("none");
  // const [sDate, setSDate] = useState(start);

  // const { loadToken } = useTokenStorage();
  // useEffect(() => {
  //   const token = loadToken();
  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);
  // const formattedDate = sDate.toISOString().split("T")[0];

  // const route = `/balance-statement/?reqDate=${formattedDate}`;
  // console.log(formattedDate, route);
  // const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  // const [con, setCon] = useState(false);

  // useEffect(() => {
  //   setCon(true);
  // }, []);

  // useEffect(() => {
  //   fetchItGet(route, token);
  //   console.log("hello");
  // }, [con]);
  // console.log(data_g, start, "hkhkhkkhkhkhkhkhkhkhkhkk");

  const meterHeader = [
    "No",
    "Date",
    // "Pump",
    "Item",
    "Opening",
    "Closing",
    "Issue",
  ];

  console.log(stock);

  const meterRow = stock?.map((element, index) => (
    <Table.Tr key={index} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.dateOfDay}</Table.Td>
      {/* <Table.Td>{element.pump}</Table.Td> */}
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element.openingBalance}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
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
  const stockRow = stock?.map((element, index) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element.openingBalance}</Table.Td>
      <Table.Td>{element.receive}</Table.Td>
      <Table.Td>{element.issue}</Table.Td>
      <Table.Td>{element.adjust}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
      <Table.Td>{element.todayTank}</Table.Td>
      <Table.Td>{element.yesterdayTank}</Table.Td>
      <Table.Td>{element.tankIssue}</Table.Td>
      <Table.Td>{element.todayGL}</Table.Td>
      <Table.Td>{element.totalGL}</Table.Td>
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
            tableRef={tableRef}
            header={meterHeader}
            rows={meterRow}
            label="Meter Balance"
          />
        </div>
      </div>
      <div className="my-8 ">
        <StockTable
          tableRef={tableRef1}
          label="Stock Balance"
          rows={stockRow}
          header={stockHeader}
        />
      </div>
    </div>
  );
};

export default Stock;
