import React, { useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../../components/SelectDrop";
import purpose from "../../testBeforeApi/data/pou";
import CalendarPick from "../../components/CalendarPick";
import { RiErrorWarningLine } from "react-icons/ri";
import tank from "../../testBeforeApi/data/tank";
import Footer from "../../components/footer/Footer";

const TankData = () => {
  console.log(purpose);
  const [fuelType, setFuelType] = useState();

  return (
    <div className="w-full pt-28">
      <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
        <CalendarPick label="Date" />
        <div className="">
          <SelectDrop
            label="Tank"
            data={tank}
            value={fuelType}
            setValue={setFuelType}
          />
        </div>
        <SearchButton />
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

export default TankData;
