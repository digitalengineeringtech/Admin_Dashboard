import React, { useContext, useEffect, useRef, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../installer/SelectDrop";
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
import { DownloadTableExcel } from "react-export-table-to-excel";
import Button from "../../components/footer/Button";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoPrintSharp } from "react-icons/io5";
import { downloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import Re from "../../services/Re";
import { FaPrint } from "react-icons/fa6";

const DailySale = () => {
  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start = new Date(start);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end = new Date(end);

  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const [isData, setIsData] = useState(false);

  const [sDate, setSDate] = useState(start);
  const [eDate, setEDate] = useState(end);
  const [fuelType, setFuelType] = useState();
  const [purposeUse, setPurposeUse] = useState();
  const [noz, setNoz] = useState();

  const { reFresh, setReFresh } = useContext(Re);

  const purposeRoute = purposeUse?.value
    ? `&vehicleType=${purposeUse?.value}`
    : "";
  const fuelRoute = fuelType?.value ? `&fuelType=${fuelType?.value}` : "";
  const nozzleRoute = noz?.value ? `&nozzleNo=${noz?.value}` : "";

  const route = `detail-sale/pagi/by-date/1?sDate=${sDate}&eDate=${eDate}${purposeRoute}${fuelRoute}${nozzleRoute}`;
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();
  const [con, setCon] = useState(false);

  useEffect(() => {
    setCon(true);
  }, []);

  useEffect(() => {
    fetchItGet(`detail-sale/pagi/by-date/1?sDate=${start}&eDate=${end}`, token);
    console.log("hello");
  }, [con, reFresh]);

  console.log(data_g, "dddddddddddddddd");

  useEffect(() => {
    if (data_g?.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data_g, loading_g, error_g, fetchItGet]);

  // console.log(totalPages);

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
    "Action",
  ];
  const tableRow = data_g?.map((element) => (
    <Table.Tr key={element.no} className=" duration-150 text-sm text-center">
      <Table.Td className="select-none">{element.vocono}</Table.Td>
      <Table.Td className="select-none">{element.createAt}</Table.Td>
      <Table.Td className="select-none">{element.carNo}</Table.Td>
      <Table.Td className="select-none">{element.vehicleType}</Table.Td>
      <Table.Td className="select-none">{element.nozzleNo}</Table.Td>
      <Table.Td className="select-none">{element.fuelType}</Table.Td>
      <Table.Td className="select-none">
        {(parseFloat(element?.saleLiter) / 4.16).toFixed(3)}
      </Table.Td>
      <Table.Td className="select-none">{element.saleLiter}</Table.Td>
      <Table.Td className="select-none">
        {element.salePrice.toFixed(2).toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td className="select-none">
        {element.totalPrice.toFixed(2).toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td className="select-none">
        {element.totalizer_liter.toFixed(3)}
      </Table.Td>
      <Table.Td className="select-none">
        {element.totalizer_amount.toFixed(2).toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td className="">
        <div className="bg-detail active:scale-90 duration-75 cursor-pointer flex py-3 rounded justify-center ">
          <FaPrint className="text-2xl text-secondary" />
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  // console.log(
  //   "start",
  //   sDate,
  //   "end",
  //   eDate,
  //   "fuel",
  //   fuelType?.name,
  //   "purpose",
  //   purposeUse?.name,
  //   "nozzle",
  //   noz?.value
  // );

  // console.log(data_g);
  // console.log(data_g?.length > 0);
  // console.log(pagi_g);

  const onPageChange = (event) => {
    console.log(event);
    fetchItGet(
      `detail-sale/pagi/by-date/${event}?sDate=${sDate}&eDate=${eDate}${purposeRoute}${fuelRoute}${nozzleRoute}`,
      token
    );
  };
  const [down, setDown] = useState(null);
  const [d, setD] = useState(false);
  const tableRef = useRef(null);
  const fun = () => {
    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: "Users table",
      sheet: "Users",
    });
    return onDownload;
  };

  console.log(tableRef.current != null, "ooooooooooooooooo");
  console.log(tableRef.current, "..............................");

  const recordsPerPage = 50;
  const totalPages = Math.ceil(pagi_g / recordsPerPage);

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Daily Sale Report",
      sheet: "Daily Sale Report",
      tablePayload: {
        header: tableHeader,
        // accept two different data structures
        body: data_g.map((e) => [
          e.vocono,
          e.createAt,
          e.carNo,
          e.vehicleType,
          e.nozzleNo,
          e.fuelType,
          (parseFloat(e?.saleLiter) / 4.16).toFixed(3),
          e.saleLiter,
          e.salePrice.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }),
          e.totalPrice.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }),
          e.totalizer_liter.toFixed(3),
          e.totalizer_amount.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }),
        ]),
      },
    });
  }

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
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
            tableRef={tableRef}
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
      {data_g && (
        <div className="">
          <Footer
            print={handlePrint}
            onClick={handleDownloadExcel}
            totalPages={totalPages}
            onPageChange={onPageChange}
            pagi="true"
            // first={first}
            // rows={rows}
          />
        </div>
      )}
    </div>
  );
};

export default DailySale;
