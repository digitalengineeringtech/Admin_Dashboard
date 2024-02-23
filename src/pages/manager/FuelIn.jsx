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

const FuelIn = () => {
  console.log(purpose);
  const [pou, setPou] = useState();
  const [noz, setNoz] = useState();
  const [fuelType, setFuelType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

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
        <SelectDrop
          label="Nozzle"
          data={nozz}
          value={endDate}
          setValue={setEndDate}
        />
        <SelectDrop
          label="Nozzle"
          data={nozz}
          value={endDate}
          setValue={setEndDate}
        />
        <SelectDrop
          label="Nozzle"
          data={nozz}
          value={endDate}
          setValue={setEndDate}
        />
        <TextInput
          style="!w-[300px]"
          label="Receive Liters"
          placeholder="Receive Liters"
        />
        <SearchButton onClick={() => console.log("hello")} />
      </div>
      <div className="w-full h-[250px] gap-5 text-nodata flex items-center justify-center border-2 border-nodata mt-10 rounded-xl">
        <div className="flex items-center gap-4">
          <RiErrorWarningLine className="text-[6rem]" />
          <div className="font-mono text-[2.5rem]">NO DATA FOUND</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FuelIn;
