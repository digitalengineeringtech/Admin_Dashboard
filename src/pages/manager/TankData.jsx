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
const TankData = () => {
  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start = new Date(start);
  const [token, setToken] = useState("none");
  const [sDate, setSDate] = useState(start);

  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  console.log(purpose);
  const [fuelType, setFuelType] = useState();
  return (
    <>
      <div className="w-full pt-28">
        <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
          <CalendarPick date={sDate} setDate={setSDate} label="Date" />
          <div className="">
            {/* <SelectDrop
            label="Tank"
            data={tank}
            value={fuelType}
            setValue={setFuelType}
          /> */}
            <SelectDrop
              placeholder="All"
              label="Fuel Type"
              data={fuelData}
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
    </>
  );
};

export default TankData;
