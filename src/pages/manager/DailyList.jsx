import React, { useState } from "react";
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

const DailyList = () => {
  console.log(elements);
  const [isData, setIsData] = useState(true);

  return (
    <div className="w-full pt-28">
      <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
        <CalendarPick label="Start Date" />
        <div className="">
          <CalendarPick label="End Date" />
        </div>
        <SearchButton />
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
          <Outlet />
        </div>
      ) : (
        <div className="w-full h-[250px] gap-5 text-gray-300 flex items-center justify-center border-2 border-[#38b59e] mt-10 rounded-xl">
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

export default DailyList;
