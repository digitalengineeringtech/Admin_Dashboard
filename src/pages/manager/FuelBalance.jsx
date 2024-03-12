import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../../components/SelectDrop";
import purpose from "../../testBeforeApi/data/pou";
import CalendarPick from "../../components/CalendarPick";
import { RiErrorWarningLine } from "react-icons/ri";
import Footer from "../../components/footer/Footer";
import fuelData from "../installer/drop_data/manager/managerFuel";
import UseGet from "../../api/hooks/UseGet";
import useTokenStorage from "../../utils/useDecrypt";
import { Table } from "@mantine/core";
import StockTable from "../../components/table/StockTable";

const FuelBalance = () => {
  const [fuelType, setFuelType] = useState();

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
  }, [con]);
  console.log(data_g, start, "hkhkhkkhkhkhkhkhkhkhkhkk");
  console.log(purpose);

  const stockHeader = ["No", "Fuel Type", "Opening", "Receive", "Balance"];
  const stockRow = data_g?.map((element, index) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element.openingBalance}</Table.Td>
      <Table.Td>{element.receive}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
    </Table.Tr>
  ));

  const handleClick = () => {
    const formattedDate2 = sDate.toISOString().split("T")[0];
    // const yesterday = new Date(sDate);
    // yesterday.setDate(sDate.getDate() + 1);
    // const formattedYesterday = yesterday.toISOString().split("T")[0];
    fetchItGet(`/balance-statement/?reqDate=${formattedDate2}`, token);
    console.log(
      "........................",
      formattedDate2,
      `/balance-statement/?reqDate=${formattedDate2}`
    );
  };

  return (
    <div className="w-full pt-28">
      <div className="flex  flex-wrap gap-4 gap-x-10 justify-between">
        <CalendarPick date={sDate} setDate={setSDate} label="Start Date" />
        {/* <SelectDrop
          placeholder="All"
          label="Fuel Type"
          data={fuelData}
          value={fuelType}
          setValue={setFuelType}
        /> */}
        <SearchButton onClick={handleClick} />
      </div>
      {/* <div className="w-full h-[250px] gap-5 text-nodata flex items-center justify-center border-2 border-nodata mt-10 rounded-xl">
        <div className="flex items-center gap-4">
          <RiErrorWarningLine className="text-[6rem]" />
          <div className="font-mono text-[2.5rem]">NO DATA FOUND</div>
        </div>
      </div> */}
      <div className="mt-6">
        <StockTable
          label="Stock Balance"
          rows={stockRow}
          header={stockHeader}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default FuelBalance;
