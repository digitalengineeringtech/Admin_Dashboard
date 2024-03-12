import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../../components/SelectDrop";
import purpose from "../../testBeforeApi/data/pou";
import nozz from "../../testBeforeApi/data/nozzle";
import fuel from "../../testBeforeApi/data/fueltype";
import tank from "../../testBeforeApi/data/tank";
import CalendarPick from "../../components/CalendarPick";
import { Loader } from "@mantine/core";
import { Calendar } from "primereact/calendar";
import { ToggleButton } from "primereact/togglebutton";
import { RiErrorWarningLine } from "react-icons/ri";
import TextInput from "../../components/inputbox/TextInput";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import FilterTable from "../../components/table/FilterTable";
import fuelData from "../installer/drop_data/manager/managerFuel";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet from "../../api/hooks/UseGet";
import { Table } from "@mantine/core";
import FuelInDrop from "../../components/FuelInDrop";
import UseGet3 from "../../api/hooks/UseGet3";
import UsePost from "../../api/hooks/UsePost";

const FuelIn = () => {
  console.log(purpose);
  const [isData, setIsData] = useState(true);
  const [pou, setPou] = useState();
  const [noz, setNoz] = useState();
  const [stock, setStock] = useState();
  const [fuelType, setFuelType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [date, setDate] = useState(null);
  const [receive, setReceive] = useState();
  const navigate = useNavigate();
  const [{ data_g_3, loading_g_3, error_g_3 }, fetchItGet3] = UseGet3();
  const [{ data, loading, error }, fetchIt] = UsePost();

  console.log(fuelType?._id, receive, "hlelllllllllllllllllllllllllllll");

  let start = new Date();
  const [token, setToken] = useState("none");
  const [sDate, setSDate] = useState(start);

  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);
  const formattedDate = sDate.toISOString().split("T")[0];

  // const route = `/balance-statement/?reqDate=2024-03-11`;
  const route = `/balance-statement/?reqDate=${formattedDate}`;
  console.log(formattedDate, route);
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  const [con, setCon] = useState(false);

  useEffect(() => {
    setCon(true);
  }, []);

  useEffect(() => {
    fetchItGet(route, token);
    console.log("hello");
  }, [con, data]);

  console.log(data_g);

  const tableHeader = [
    "Receive Data",
    "Fuel Type",
    // "Fuel in Code",
    // "Driver",
    // "Browser No",
    // "Tank",
    // "Tank Capacity",
    "Receive Volume",
    "Balance",
  ];
  const tableRow = stock?.map((element) => (
    <Table.Tr key={element.no} className=" duration-150 text-sm text-center">
      <Table.Td>{element.dateOfDay}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element.receive}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
      {/* <Table.Td>{element.saleLiter}</Table.Td> */}
      {/* <Table.Td>
        {element.salePrice.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td>
        {element.totalPrice.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td>{element.totalizer_liter.toFixed(3)}</Table.Td>
      <Table.Td>
        {element.totalizer_amount.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td> */}
    </Table.Tr>
  ));

  // const [con, setCon] = useState(false);
  // const formattedDate2 = today.toISOString().split("T")[0];
  useEffect(() => {
    setCon(true);
  }, []);

  console.log(
    `/balance-statement/receive-balance?id=${fuelType?._id}`,
    { receiveAmount: receive },
    "...................................................................................................."
  );

  useEffect(() => {
    fetchItGet3(`/balance-statement/?reqDate=${formattedDate}`, token);

    console.log("wkwk");
  }, [con, data]);

  const handleClick = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    fetchIt(
      `/balance-statement/recive-balance?id=${fuelType?._id}`,
      { receiveAmount: receive },
      token
    );
    setReceive("");
    setFuelType("");
  };

  useEffect(() => {
    // setStock(data_g_3); normal
    setStock(data_g_3.slice(0, 4));
  }, [data_g_3, data]);

  return (
    <div className="w-full pt-28">
      <div className="flex flex-wrap gap-4 gap-x-10 justify-between">
        {/* <SelectDrop
          label="Tank Number"
          data={tank}
          value={fuelType}
          setValue={setFuelType}
        /> */}
        <FuelInDrop
          placeholder="Please Select"
          label="Fuel Type"
          data={stock}
          value={fuelType}
          setValue={setFuelType}
        />
        <TextInput
          style="!w-[300px]"
          label="Receive Liters"
          placeholder="Receive Liters"
          value={receive}
          onChange={(e) => setReceive(e.target.value)}
        />
        {/* <TextInput
          style="!w-[300px]"
          label="Driver Name"
          placeholder="Driver Name"
        />
        <TextInput
          style="!w-[300px]"
          label="Browser No"
          placeholder="Browser No"
        /> */}
        <SearchButton title="ADD" onClick={handleClick} />
      </div>
      {isData ? (
        <div className="mt-8">
          <FilterTable
            // tableRef={tableRef}
            header={tableHeader}
            rows={tableRow}
          />
        </div>
      ) : (
        <div className="w-full h-[250px] gap-5 text-nodata flex items-center justify-center border-2 border-nodata mt-10 rounded-xl">
          <div className="flex items-center gap-4">
            <RiErrorWarningLine className="text-[6rem]" />
            <div className="font-mono text-[2.5rem]">NO DATA FOUND</div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default FuelIn;
