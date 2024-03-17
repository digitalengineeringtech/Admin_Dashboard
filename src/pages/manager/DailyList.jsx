import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../../components/SelectDrop";
import purpose from "../../testBeforeApi/data/pou";
import CalendarPick from "../../components/CalendarPick";
import { RiErrorWarningLine } from "react-icons/ri";
import Footer from "../../components/footer/Footer";
import TableCom from "../../components/table/TableCom";
import elements, { office_use } from "../../testBeforeApi/tableData/dailyList";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Table } from "@mantine/core";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet from "../../api/hooks/UseGet";
import UseGet2 from "../../api/hooks/UseGet2";
import UseGet3 from "../../api/hooks/UseGet3";
import fuelData from "../../pages/installer/drop_data/fuel";

const DailyList = () => {
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const [{ data_g_2, loading_g_2, error_g_2 }, fetchItGet2] = UseGet2();
  const [{ data_g_3, loading_g_3, error_g_3 }, fetchItGet3] = UseGet3();

  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  let start = new Date();
  let today = new Date();
  start.setHours(0);
  start.setMinutes(0);
  // start = new Date(start);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(0);
  end = new Date(end);

  const [sDate, setSDate] = useState(start);
  const [eDate, setEDate] = useState(end);
  const [totalPTest, setTotalPTest] = useState();
  const [totalOTest, setTotalOTest] = useState();
  const [totalCredit, setTotalCredit] = useState();
  const [refresh, setRefresh] = useState(false);
  const [notCredit, setNotCredit] = useState();
  const [stock, setStock] = useState();

  // console.log(elements);
  const [isData, setIsData] = useState(true);
  const [con, setCon] = useState(false);
  const formattedDate = today.toISOString().split("T")[0];
  useEffect(() => {
    setCon(true);
  }, []);

  console.log(
    sDate,
    "...................................................................................................."
  );

  useEffect(() => {
    fetchItGet(`detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);
    fetchItGet2("/device", token);
    fetchItGet3(`/balance-statement/?reqDate=${formattedDate}`, token);

    console.log("wkwk");
  }, [con, refresh]);

  const handleClick = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    const yesterday = new Date(sDate);
    yesterday.setDate(sDate.getDate() + 1);
    const formattedYesterday = yesterday.toISOString().split("T")[0];
    fetchItGet(`detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);
    fetchItGet2("/device", token);
    fetchItGet3(`/balance-statement/?reqDate=${formattedYesterday}`, token);
    console.log(
      "........................",
      sDate,
      `/balance-statement/?reqDate=${formattedYesterday}`
    );
  };

  useEffect(() => {
    // setStock(data_g_3); normal
    setStock(data_g_3.slice(0, 4));
  }, [data_g_3, refresh]);

  console.log(data_g, data_g_2);

  if (data_g.length > 0) {
    console.log("sksksks");
  }

  useEffect(() => {
    const fuelCalcu = fuelData.map((e, index) => {
      const calcuLiter = data_g
        .filter((fuel) => fuel.fuelType == e.value)
        .filter((type) => type.vehicleType == "Pump Test")
        .map((element) => element.saleLiter)
        .reduce((pv, cv) => pv + cv, 0);
      const unitPrice = data_g_2.filter((unit) => unit.fuel_type == e.value)[0]
        ?.daily_price;

      return {
        fueltype: e.value,
        totalLiter: calcuLiter,
        pricePerLiter: unitPrice || "0",
        totalAmount: calcuLiter * unitPrice || "0",
        // totalAmount: `${calcuLiter * unitPrice}`.replace(".", ",") || "0",
      };
    });
    setTotalPTest(fuelCalcu);
  }, [data_g, fuelData]);

  console.log(data_g_3, "llllllllllllllllllllllllllllllllllllllllllll");

  useEffect(() => {
    const fuelCalcu = fuelData.map((e, index) => {
      const calcuLiter = data_g
        .filter((fuel) => fuel.fuelType == e.value)
        .filter((type) => type.vehicleType == "Office Use ( Bowser Car )")
        .map((element) => element.saleLiter)
        .reduce((pv, cv) => pv + cv, 0);
      const unitPrice = data_g_2.filter((unit) => unit.fuel_type == e.value)[0]
        ?.daily_price;

      return {
        fueltype: e.value,
        totalLiter: calcuLiter,
        pricePerLiter: unitPrice || "0",
        totalAmount: calcuLiter * unitPrice || "0",
        // totalAmount: `${calcuLiter * unitPrice}`.replace(".", ",") || "0",
      };
    });
    setTotalOTest(fuelCalcu);
  }, [data_g, fuelData]);

  useEffect(() => {
    const fuelCalcu = fuelData.map((e, index) => {
      const calcuLiter = data_g
        .filter((fuel) => fuel.fuelType == e.value)
        .filter((type) => type.cashType == "Credit Card")
        .map((element) => element.saleLiter)
        .reduce((pv, cv) => pv + cv, 0);
      const unitPrice = data_g_2.filter((unit) => unit.fuel_type == e.value)[0]
        ?.daily_price;

      return {
        fueltype: e.value,
        totalLiter: calcuLiter,
        pricePerLiter: unitPrice || "0",
        totalAmount: calcuLiter * unitPrice || "0",
        discount: 0,
        // totalAmount: `${calcuLiter * unitPrice}`.replace(".", ",") || "0",
      };
    });
    setTotalCredit(fuelCalcu);
  }, [data_g, fuelData]);

  useEffect(() => {
    const fuelCalcu = fuelData.map((e, index) => {
      const calcuLiter = data_g
        .filter((fuel) => fuel.fuelType == e.value)
        .filter((type) => type.cashType != "Credit Card")
        .map((element) => element.saleLiter)
        .reduce((pv, cv) => pv + cv, 0);
      const unitPrice = data_g_2.filter((unit) => unit.fuel_type == e.value)[0]
        ?.daily_price;

      return {
        fueltype: e.value,
        totalLiter: calcuLiter,
        pricePerLiter: unitPrice || "0",
        totalAmount: calcuLiter * unitPrice || "0",
        discount: 0,
        // totalAmount: `${calcuLiter * unitPrice}`.replace(".", ",") || "0",
      };
    });
    setNotCredit(fuelCalcu);
  }, [data_g, fuelData]);

  // console.log(totalPTest, "lllllllllllllllll");
  // console.log(totalCredit, "lddddddddddd");
  // console.log(data_g, "ggggggggggggggg");

  const total = totalPTest?.concat(totalOTest);

  return (
    <div className="w-full pt-28">
      <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
        <CalendarPick date={sDate} setDate={setSDate} label="Start Date" />
        <div className="">
          <CalendarPick date={eDate} setDate={setEDate} label="End Date" />
        </div>
        <SearchButton onClick={handleClick} />
      </div>
      <div className="border-b-2 text-text border-gray-300 pb-3 mt-8 flex">
        <NavLink className="text-xl px-6 py-2 rounded-md" to="/daily_list" end>
          Reports
        </NavLink>
        <NavLink
          to="/daily_list/stock"
          className="text-xl px-6 py-2 rounded-md"
        >
          Stock Balances
        </NavLink>
      </div>
      {isData ? (
        <div className="mt-2">
          <Outlet
            context={[
              totalPTest,
              totalOTest,
              totalCredit,
              notCredit,
              total,
              stock,
              setRefresh,
            ]}
          />
        </div>
      ) : (
        <div className="w-full h-[250px] gap-5 text-gray-300 flex items-center justify-center border-2 border-[#38b59e] mt-10 rounded-xl">
          <div className="flex items-center gap-4">
            <RiErrorWarningLine className="text-[6rem]" />
            <div className="font-mono text-[2.5rem]">NO DATA FOUND</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyList;
