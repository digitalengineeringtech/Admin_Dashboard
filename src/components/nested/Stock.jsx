import React, { useEffect, useRef, useState } from "react";
import StockTable from "../table/StockTable";
import { meter, stock } from "../../testBeforeApi/tableData/stock";
import { Table } from "@mantine/core";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet from "../../api/hooks/UseGet";
import fuelData from "../../pages/installer/drop_data/manager/Fuel";
import { useOutletContext } from "react-router-dom";
import SelectDrop from "../../pages/installer/SelectDrop";
import TextInput from "../inputbox/TextInput";
import SearchButton from "../SearchButton";
import ConAlert from "../../components/alert/ConAlert";
import Swal from "sweetalert2";
import UsePost from "../../api/hooks/UsePost";
import UseGet3 from "../../api/hooks/UseGet3";
import FuelInDrop from "../FuelInDrop";

const Stock = () => {
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();

  const [
    totalPTest,
    totalOTest,
    totalCredit,
    notCredit,
    total,
    stock,
    setRefresh,
  ] = useOutletContext();
  const [{ data, loading, error }, fetchIt] = UsePost();
  const [fuelType, setFuelType] = useState();
  const [fuelType2, setFuelType2] = useState();
  const [todayTank, setTodayTank] = useState();
  const [fuelId, setFuelId] = useState();

  const [adjust, setAdjust] = useState();
  const tableRef = useRef(null);
  const tableRef1 = useRef(null);

  useEffect(() => {
    if (data.con == true) {
      Swal.fire({
        title: "SUCCESS !",
        icon: "success",
        buttonsStyling: false,
        iconColor: "#38b59e",
        color: "#38b59e",
        width: "25em",
        background: "#ffffff",
        customClass: {
          title: "text-white",
          confirmButton:
            "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#38b59e] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
        },
      });
    }
  }, [data]);

  console.log(fuelId, "ljlllljjljlljjjljljljljl");

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
      <Table.Td>{element.openingBalance.toFixed(2)}</Table.Td>
      <Table.Td>{element.balance.toFixed(2)}</Table.Td>
      <Table.Td>{element.issue.toFixed(2)}</Table.Td>
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
      <Table.Td>{element.openingBalance.toFixed(2)}</Table.Td>
      <Table.Td>{element.receive.toFixed(2)}</Table.Td>
      <Table.Td>{element.issue.toFixed(2)}</Table.Td>
      <Table.Td>{element.adjust.toFixed(2)}</Table.Td>
      <Table.Td>{element.balance.toFixed(2)}</Table.Td>
      <Table.Td>{element.todayTank.toFixed(2)}</Table.Td>
      <Table.Td>{element.yesterdayTank.toFixed(2)}</Table.Td>
      <Table.Td>{element.tankIssue.toFixed(2)}</Table.Td>
      <Table.Td>{element.todayGL.toFixed(2)}</Table.Td>
      <Table.Td>{element.totalGL.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  const handleClick = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    fetchIt(
      `/balance-statement/adjust-balance?id=${fuelType?._id}`,
      {
        adjustAmount: adjust,
      },
      token
    );
    setAdjust("");
    setFuelType("");
    setRefresh((pre) => !pre);
  };

  const handleClick2 = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    fetchIt(
      `/balance-statement/today-balance?id=${fuelType2?._id}`,
      {
        todayTankAmount: todayTank,
      },
      token
    );
    setTodayTank("");
    setFuelType2("");
    setRefresh((pre) => !pre);
  };

  console.log(
    fuelType2,
    "/.SDSDSSSDSDSDSSDSDSS...................................."
  );

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
      <div className=" mt-10 ">
        <div className="text-3xl ms-2 text-detail font-bold font-mono my-auto">
          Adjust Amount
        </div>
        <div className="flex gap-5 mt-2">
          <FuelInDrop
            placeholder="Please Select"
            label="Fuel Type"
            data={stock}
            value={fuelType}
            setValue={setFuelType}
          />
          <TextInput
            style="!w-[300px]"
            label="Adjust amount"
            placeholder="Adjust amount"
            value={adjust}
            onChange={(e) => setAdjust(e.target.value)}
          />
          <SearchButton
            visible={false}
            title="ADD"
            onClick={ConAlert("Are you sure ?", true, handleClick)}
          />
        </div>
      </div>
      <div className=" mt-8 ">
        <div className="text-3xl ms-2 text-detail font-bold font-mono my-auto">
          Add Today Tank Balance
        </div>
        <div className="flex gap-5 mt-2">
          <FuelInDrop
            placeholder="Please Select"
            label="Fuel Type"
            data={stock}
            value={fuelType2}
            setValue={setFuelType2}
          />
          <TextInput
            style="!w-[300px]"
            label="Today balance"
            placeholder="Today balance"
            value={todayTank}
            onChange={(e) => setTodayTank(e.target.value)}
          />
          <SearchButton
            visible={false}
            title="ADD"
            onClick={ConAlert("Are you sure ?", true, handleClick2)}
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
