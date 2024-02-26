import React, { useEffect, useRef, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../../components/SelectDrop";
import CalendarPick from "../../components/CalendarPick";
import { RiErrorWarningLine } from "react-icons/ri";
import Footer from "../../components/footer/Footer";
import { Table } from "@mantine/core";
import FilterTable from "../../components/table/FilterTable";
import UseGet from "../../api/hooks/UseGet";
import purposes from "../installer/drop_data/purposes";
import useTokenStorage from "../../utils/useDecrypt";
import fuelData from "../installer/drop_data/manager/managerFuel";
import nozzleData from "../installer/drop_data/manager/nozzle";
import { useDownloadExcel } from "react-export-table-to-excel";

const DailySale = () => {
  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start = new Date(start);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(0);
  end = new Date(end);

  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const [pou, setPou] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [date, setDate] = useState(null);
  const [isData, setIsData] = useState(false);

  const [sDate, setSDate] = useState(start);
  const [eDate, setEDate] = useState(end);
  const [fuelType, setFuelType] = useState();
  const [purposeUse, setPurposeUse] = useState();
  const [noz, setNoz] = useState();

  const [totalLength, setTotalLength] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(50);

  const purposeRoute = purposeUse?.value
    ? `&vehicleType=${purposeUse?.value}`
    : "";
  const fuelRoute = fuelType?.value ? `&fuelType=${fuelType?.value}` : "";
  const nozzleRoute = noz?.value ? `&nozzleNo=${noz?.value}` : "";

  // http://192.168.0.100:9000/api/detail-sale/pagi/1?sDate=2024-02-20T13:27:15.000Z&eDate=2024-02-21T13:27:15.000Z
  // const route = `/detail-sale/pagi/by-date/1?sDate=${sDate}&eDate=${eDate}&vehicleType=${purposeUse?.value}&fuelType=${fuelType?.value}&nozzleNo=${noz?.value}`;
  // http://192.168.0.100:9000/api/detail-sale/pagi/by-date/1?sDate=Thu Feb 22 2024 00:00:42 GMT+0630 (Myanmar Time)&eDate=Thu Feb 22 2024 23:00:42 GMT+0630 (Myanmar Time)&vehicleType=Cycle&fuelType=004-Disel&nozzleNo=02
  const route = `detail-sale/pagi/by-date/1?sDate=${sDate}&eDate=${eDate}${purposeRoute}${fuelRoute}${nozzleRoute}`;
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  useEffect(() => {
    fetchItGet(route, token);
    console.log("hello");
    console.log(data_g);
  }, []);

  useEffect(() => {
    if (data_g?.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data_g, loading_g, error_g, fetchItGet]);

  const recordsPerPage = 50;
  const totalPages = Math.ceil(pagi_g / recordsPerPage);
  console.log(totalPages);

  const tableHeader = [
    "Vocno",
    "Sale Date",
    "Vehicle No",
    "Purpose",
    "Nozzle",
    "Fuel",
    "Sale Gallon",
    "Sale Liter",
    "Sale Price",
    "Total Price",
    "Totallizer liter",
    "Totallizer Amount",
  ];
  const tableRow = data_g?.map((element) => (
    <Table.Tr key={element.no} className=" duration-150 text-sm text-center">
      <Table.Td>{element.vocono}</Table.Td>
      <Table.Td>{element.createAt}</Table.Td>
      <Table.Td>{element.carNo}</Table.Td>
      <Table.Td>{element.vehicleType}</Table.Td>
      <Table.Td>{element.nozzleNo}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{(parseFloat(element?.saleLiter) / 4.16).toFixed(3)}</Table.Td>
      <Table.Td>{element.saleLiter}</Table.Td>
      <Table.Td>
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
      </Table.Td>
    </Table.Tr>
  ));

  console.log(
    "start",
    sDate,
    "end",
    eDate,
    "fuel",
    fuelType?.name,
    "purpose",
    purposeUse?.name,
    "nozzle",
    noz?.value
  );

  console.log(data_g);
  console.log(data_g?.length > 0);
  console.log(pagi_g);

  const onPageChange = (event) => {
    console.log(event);
    fetchItGet(
      `detail-sale/pagi/by-date/${event}?sDate=${sDate}&eDate=${eDate}${purposeRoute}${fuelRoute}${nozzleRoute}`,
      token
    );
  };

  const tableRef = useRef(null);

  console.log(tableRef, "ooooooooooooooooo");
  console.log(data_g, "..............................");

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  return (
    <div className="w-full pt-28">
      <div className="flex flex-wrap gap-4 gap-x-10 justify-between">
        <CalendarPick date={sDate} setDate={setSDate} label="Start Date" />
        <CalendarPick date={eDate} setDate={setEDate} label="End Date" />
        <SelectDrop
          placeholder="All"
          label="Fuel Type"
          data={fuelData}
          value={fuelType}
          setValue={setFuelType}
        />
        <SelectDrop
          placeholder="All"
          label="Purpose of Use"
          data={purposes}
          value={purposeUse}
          setValue={setPurposeUse}
        />
        <SelectDrop
          label="Nozzle"
          placeholder="All"
          data={nozzleData}
          value={noz}
          setValue={setNoz}
        />
        <SearchButton onClick={() => fetchItGet(route, token)} />
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
      <div className="">
        <Footer
          download={onDownload}
          totalPages={totalPages}
          onPageChange={onPageChange}
          // first={first}
          // rows={rows}
        />
      </div>
      <table ref={tableRef}>
        <tr>
          <td>kjk</td>
          <td>kjk</td>
          <td>kjk</td>
        </tr>
      </table>
    </div>
  );
};

export default DailySale;
