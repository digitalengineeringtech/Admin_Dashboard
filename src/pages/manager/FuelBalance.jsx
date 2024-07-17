import React, { useEffect, useRef, useState } from "react";
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
import { useReactToPrint } from "react-to-print";
import { downloadExcel } from "react-export-table-to-excel";

const FuelBalance = () => {
  const [fuelType, setFuelType] = useState();
  const tableRef = useRef(null);

  let start = new Date();
  const [token, setToken] = useState("none");
  const [sDate, setSDate] = useState(start);

  let initial = new Date(sDate);
  initial.setHours(0);
  initial.setMinutes(0);
  initial.setSeconds(0);

  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);
  const formattedDate = sDate.toISOString().split("T")[0];

  const route = `/fuel-balance/by-one-date?sDate=${sDate}`;
  // const route = `/fuel-balance/by-one-date?sDate=${formattedDate}&eDate=${formattedDate}`;
  console.log(initial, "..........");
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  const [con, setCon] = useState(false);

  useEffect(() => {
    setCon(true);
  }, []);

  useEffect(() => {
    fetchItGet(route, token);
    console.log(token, "this");
  }, [con]);
  console.log(data_g, start, "hkhkhkkhkhkhkhkhkhkhkhkk");
  console.log(purpose);

  const stockHeader = ["No", "Fuel Type", "Opening", "Receive", "Balance"];
  const stockRow = data_g?.map((element, index) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element?.opening?.toFixed(2)}</Table.Td>
      <Table.Td>{element.fuelIn}</Table.Td>
      <Table.Td>{element?.balance?.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  const handleClick = () => {
    const formattedDate2 = sDate.toISOString().split("T")[0];
    // const yesterday = new Date(sDate);
    // yesterday.setDate(sDate.getDate() + 1);
    // const formattedYesterday = yesterday.toISOString().split("T")[0];
    fetchItGet(`/fuel-balance/by-one-date?sDate=${sDate}`, token);
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Fuel Receive",
      sheet: "Fuel Receive",
      tablePayload: {
        header: stockHeader,
        // accept two different data structures
        body: data_g.map((e, index) => [
          index + 1,
          e.fuelType,
          e.openingBalance,
          e.receive,
          e.balance,
        ]),
      },
    });
  }

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
          visible={false}
          tableRef={tableRef}
          label="Stock Balance"
          rows={stockRow}
          header={stockHeader}
        />
      </div>
      <Footer
        print={handlePrint}
        onClick={handleDownloadExcel}
        totalPages="0"
        // onPageChange={onPageChange}
        pagi="true"
      />
    </div>
  );
};

export default FuelBalance;
