import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../installer/SelectDrop";
import purpose from "../../testBeforeApi/data/pou";
import CalendarPick from "../../components/CalendarPick";
import { RiErrorWarningLine } from "react-icons/ri";
import tank from "../../testBeforeApi/data/tank";
import Footer from "../../components/footer/Footer";
import fuelData from "../installer/drop_data/manager/managerFuel";
import useTokenStorage from "../../utils/useDecrypt";
import FilterTable from "../../components/table/FilterTable";
import UseGet from "../../api/hooks/UseGet";
import { Modal, Table } from "@mantine/core";
const TankData = () => {
  // `/tank-data/by-date/1?dailyReportDate=${formattedDate}
  let start = new Date();
  let today = new Date();
  start.setHours(0);
  start.setMinutes(0);
  // start = new Date(start);
  const [sDate, setSDate] = useState(start);

  let end = new Date(sDate);
  end.setHours(23);
  end.setMinutes(59);
  end = new Date(end);

  const [token, setToken] = useState("none");

  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    fetchItGet(
      `/tank-data/pagi/1?dateOfDay=${sDate.toLocaleDateString(`fr-CA`)}`,
      token
    );
  }, []);

  console.log(data_g, "...................");

  const detailHeader = [
    "Tank No",
    "Capacity",
    "Fuel Type",
    "Tank Level (mm)",
    "Tank Level (Liter)",
    "Tank Level (Gal)",
    "Avaliable to fill (Liter)",
    "Avaliable to fill (Gal)",
    "Tank Temperature (Celsius)",
  ];

  const route = `/tank-data/pagi/1?dateOfDay=${sDate.toLocaleDateString(
    `fr-CA`
  )}`;

  const tableRow = data_g[
    data_g.length == 0 ? data_g.length : data_g.length - 1
  ]?.data?.map((dataEntry) => (
    <Table.Tr key={dataEntry.no} className=" duration-150 text-sm text-center">
      <Table.Td>{dataEntry?.id}</Table.Td>
      <Table.Td>{dataEntry?.volume}</Table.Td>
      <Table.Td>{dataEntry?.oilType}</Table.Td>
      {/* <Table.Td>{time}</Table.Td> */}
      <Table.Td>{dataEntry?.level}</Table.Td>
      <Table.Td>{dataEntry?.volume}</Table.Td>
      <Table.Td>{(Number(dataEntry?.volume) / 4.16).toFixed(3)}</Table.Td>
      <Table.Td>{(14500 - Number(dataEntry?.volume)).toFixed(3)}</Table.Td>
      <Table.Td>
        {(14500 / 4.16 - Number(dataEntry?.volume) / 4.16).toFixed(3)}
      </Table.Td>
      <Table.Td>{dataEntry?.temperature}</Table.Td>
    </Table.Tr>
  ));

  console.log(route, "this is route");
  const [fuelType, setFuelType] = useState();
  return (
    <>
      <div className="w-full pt-28">
        <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
          <CalendarPick
            value={sDate}
            setValue={setSDate}
            date={sDate}
            setDate={setSDate}
            label="Date"
          />
          <div className="">
            {/* <SelectDrop
            label="Tank"
            data={tank}
            value={fuelType}
            setValue={setFuelType}
          /> */}
            {/* <SelectDrop
              placeholder="All"
              label="Fuel Type"
              data={fuelData}
              value={fuelType}
              setValue={setFuelType}
            /> */}
          </div>
          <SearchButton
            visible={false}
            title="Search"
            onClick={() => fetchItGet(route, token)}
          />
        </div>
        {data_g.length > 0 ? (
          <div className="">
            <div className="mt-8">
              <FilterTable
                // tableRef={tableRef2}
                header={detailHeader}
                rows={tableRow}
              />
              {/* <Footer print={handlePrint2} onClick={handleDownloadExcel2} /> */}
            </div>
          </div>
        ) : (
          <div className="w-full h-[250px] gap-5 text-nodata flex items-center justify-center border-2 border-nodata mt-10 rounded-xl">
            <div className="flex items-center gap-4">
              <RiErrorWarningLine className="text-[6rem]" />
              <div className="font-mono text-[2.5rem]">NO DATA FOUND</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TankData;
