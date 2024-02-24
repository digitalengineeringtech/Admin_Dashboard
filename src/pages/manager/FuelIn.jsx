import React, { useState } from "react";
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

const FuelIn = () => {
  console.log(purpose);
  const [isData, setIsData] = useState(true);
  const [pou, setPou] = useState();
  const [noz, setNoz] = useState();
  const [fuelType, setFuelType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  const tableHeader = [
    "Receive Data",
    "Station",
    "Fuel in Code",
    "Driver",
    "Browser No",
    "Tank",
    "Tank Capacity",
    "Receive Volume",
    "Balance",
  ];
  // const tableRow = data_g?.map((element) => (
  //   <Table.Tr key={element.no} className=" duration-150 text-sm text-center">
  //     <Table.Td>{element.vocono}</Table.Td>
  //     <Table.Td>{element.createAt}</Table.Td>
  //     <Table.Td>{element.carNo}</Table.Td>
  //     <Table.Td>{element.vehicleType}</Table.Td>
  //     <Table.Td>{element.nozzleNo}</Table.Td>
  //     <Table.Td>{element.fuelType}</Table.Td>
  //     <Table.Td>{(parseFloat(element?.saleLiter) / 4.16).toFixed(3)}</Table.Td>
  //     <Table.Td>{element.saleLiter}</Table.Td>
  //     <Table.Td>
  //       {element.salePrice.toLocaleString(undefined, {
  //         maximumFractionDigits: 3,
  //       })}
  //     </Table.Td>
  //     <Table.Td>
  //       {element.totalPrice.toLocaleString(undefined, {
  //         maximumFractionDigits: 3,
  //       })}
  //     </Table.Td>
  //     <Table.Td>{element.totalizer_liter.toFixed(3)}</Table.Td>
  //     <Table.Td>
  //       {element.totalizer_amount.toLocaleString(undefined, {
  //         maximumFractionDigits: 3,
  //       })}
  //     </Table.Td>
  //   </Table.Tr>
  // ));

  return (
    <div className="w-full pt-28">
      <div className="flex flex-wrap gap-4 gap-x-10 justify-between">
        <SelectDrop
          label="Tank Number"
          data={tank}
          value={fuelType}
          setValue={setFuelType}
        />
        <SelectDrop
          label="Fuel Type"
          data={tank}
          value={fuelType}
          setValue={setFuelType}
        />
        <TextInput
          style="!w-[300px]"
          label="Receive Liters"
          placeholder="Receive Liters"
        />
        <TextInput
          style="!w-[300px]"
          label="Driver Name"
          placeholder="Driver Name"
        />
        <TextInput
          style="!w-[300px]"
          label="Browser No"
          placeholder="Browser No"
        />
        <SearchButton title="ADD" onClick={() => console.log("hello")} />
      </div>
      {isData ? (
        <div className="mt-8">
          <FilterTable
            // tableRef={tableRef}
            header={tableHeader}
            // rows={tableRow}
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
      <Footer />
    </div>
  );
};

export default FuelIn;
