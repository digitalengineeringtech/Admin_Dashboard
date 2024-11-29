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
import UseGet2 from "../../api/hooks/UseGet2";
import TankDrop from "../../components/TankDrop";

const FuelBalance = () => {
  const [fuelType, setFuelType] = useState();
  const [tank, setTank] = useState();
  const tableRef = useRef(null);
  const [purposeUse,setPurposeUse] = useState();
  const [noz, setNoz] = useState();
  const [casher, setCasher] = useState();
  const [num, setNum] = useState();





  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  start = new Date(start)


  let end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);
  end = new Date(end)
 

  
  const [token, setToken] = useState("none");
  const [sDate, setSDate] = useState(start);
  const [eDate, setEDate] = useState(end);
 

  // console.log(fuelType?.value)

  const purposeRoute = purposeUse?.value
    ? `&vehicleType=${purposeUse?.value}`
    : "";
  const fuelRoute = fuelType?.value ? `&fuelType=${fuelType?.value}` : "";
  const nozzleRoute = noz?.value ? `&nozzleNo=${noz?.value}` : "";
  const casherRoute = casher?.name ? `&casherCode=${casher?.name}` : "";
  const carNo = num ? `&carNo=${num}` : "";
  
  // let initial = new Date(sDate);
  // initial.setHours(0);
  // initial.setMinutes(0);
  // initial.setSeconds(0);


  // console.log(fuelRoute)
  
  const { loadToken } = useTokenStorage();
  
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);
  
  const formattedDate = sDate.toISOString().split("T")[0];
  
  const route = `detail-sale/pagi/by-date/1?sDate=${sDate}&eDate=${eDate}${purposeRoute}${fuelRoute}${nozzleRoute}${casherRoute}${carNo}`;
  // const route = `/fuel-balance/by-one-date?sDate=${sDate}`;
  // console.log(`/fuel-balance/by-one-date?sDate=${sDate}`, "this is start");
  // const route = `/fuel-balance/by-one-date?sDate=${formattedDate}&eDate=${formattedDate}`;
  // console.log(initial, "..........");
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();
  const [{ data_g_2, loading_g_2, error_g_2 }, fetchItGet2] = UseGet2();

  const [con, setCon] = useState(false);

  useEffect(() => {
    setCon(true);
  }, []);

  useEffect(() => {
    fetchItGet2(`detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);
    // console.log("this is fetchItGet2")
  }, [token, sDate,eDate]);

  useEffect(() => {
    fetchItGet(route, token);
    // console.log(token, "this");
  }, [con]);

  console.log(data_g_2, "hkhkhkkhkhkhkhkhkhkhkhkk");
  // console.log(fuelRoute);
  // console.log(
  //   `detail-sale/pagi/by-date/1?sDate=${start}&eDate=${end}${purposeRoute}${fuelRoute}${nozzleRoute}${casherRoute}${carNo}`,
  //   "dddd"
  // );


  const stockHeader = [
    "No",
    "Tank No",
    "Fuel Type",
    // "Opening",
    // "Receive",
    // "Balance",
    "Send From Terminal Balance",
    "Actual Tank Balance",
    "Total Liter",
    "Sale",
    "Receive Volume",
    "Diff Gallon"
  ];

  console.log(data_g,"This is data_g")
  console.log(data_g_2, "This is data_g_2")
  const stockRow = data_g_2?.map((element, index) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.tankNo}</Table.Td>
      <Table.Td>
        {element?.fuelType == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fuelType == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fuelType == "004-Diesel"
          ? "HSD"
          : element?.fuelType == "005-Premium Diesel"
          ? "PHSD"
          : ""}
      </Table.Td>
      {/* <Table.Td>{element?.opening?.toFixed(2)}</Table.Td>
      <Table.Td>{element.fuelIn}</Table.Td>
      <Table.Td>{element?.balance?.toFixed(2)}</Table.Td> */}
      <Table.Td>10000</Table.Td>
      <Table.Td>2000</Table.Td>
      <Table.Td>12000</Table.Td>
      <Table.Td>2000</Table.Td>
      <Table.Td>10000</Table.Td>
      <Table.Td>0</Table.Td>
    </Table.Tr>
  ));

  console.log(data_g, "this is data_g");

  const handleClick = () => {
    const formattedDate2 = sDate.toISOString().split("T")[0];
    // const yesterday = new Date(sDate);
    // yesterday.setDate(sDate.getDate() + 1);
    // const formattedYesterday = yesterday.toISOString().split("T")[0];
    fetchItGet(`/fuel-balance/by-one-date?sDate=${sDate}&eDate=${eDate}`, token);
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
      <div className="flex flex-wrap gap-4 gap-x-10 justify-between">
        <TankDrop
          placeholder="Please Select"
          label="Tank No."
          data={data_g_2}
          value={tank}
          setValue={setTank}
          setFuel={setFuelType}
        />
        {/* {console.log(fuelType?.value, fuelType?.name)} */}
        <SelectDrop
          placeholder="All"
          label="Fuel Type"
          data={fuelData}
          value={fuelType}
          setValue={setFuelType}
        />
        
        <CalendarPick
          value={sDate}
          start={true}
          setValue={setSDate}
          date={sDate}
          setDate={setSDate}
          label="From Date"
        />
        <CalendarPick
          value={eDate}
          setValue={setEDate}
          date={eDate}
          setDate={setEDate}
          label="To Date"
        />
        
      </div>

      <div className="flex justify-end mt-5">
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
