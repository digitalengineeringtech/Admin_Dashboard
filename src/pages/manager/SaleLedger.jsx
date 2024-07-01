import React, { useEffect, useRef, useState } from "react";
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
import Stock from "../../components/nested/Stock";
import UsePost from "../../api/hooks/UsePost";
import StockTable from "../../components/table/StockTable";
import FuelInDrop from "../../components/FuelInDrop";
import TextInput from "../../components/inputbox/TextInput";
import ConAlert from "../../components/alert/ConAlert";
import Swal from "sweetalert2";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";

const SaleLedger = () => {
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
    data_g_3,
    "...................................................................................................."
  );

  if (stock) {
    const calcu = () => {
      stock.slice(0, 4).map((e) => {
        
      });

      return{

      }
    };
  }

  useEffect(() => {
    fetchItGet(`detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);
    fetchItGet2("/device", token);
    fetchItGet3(`/fuel-balance/by-date?sDate=${sDate}&eDate=${eDate}`, token);

    console.log("wkwk");
  }, [con, refresh]);

  const handleClick = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    const yesterday = new Date(sDate);
    yesterday.setDate(sDate.getDate() + 1);
    const formattedYesterday = yesterday.toISOString().split("T")[0];
    fetchItGet(`detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);
    fetchItGet2("/device", token);
    fetchItGet3(`/fuel-balance/by-date?sDate=${sDate}&eDate=${eDate}`, token);
    // console.log(
    //   "........................",
    //   sDate,
    //   `/balance-statement/?reqDate=${formattedYesterday}`
    // );
  };

  useEffect(() => {
    // setStock(data_g_3); normal
    setStock(data_g_3.reverse().slice(0, 4));
  }, [data_g_3, refresh]);

  // console.log(data_g, data_g_2);

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
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  //   const [
  //     totalPTest,
  //     totalOTest,
  //     totalCredit,
  //     notCredit,
  //     total,
  //     stock,
  //     setRefresh,
  //   ] = useOutletContext();
  const [{ data, loading, error }, fetchIt] = UsePost();
  const [fuelType, setFuelType] = useState();
  const [fuelType2, setFuelType2] = useState();
  const [todayTank, setTodayTank] = useState();
  const [fuelId, setFuelId] = useState();

  const [adjust, setAdjust] = useState();
  const tableRef = useRef(null);
  const meterBalance = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Meter Balance",
    sheet: "Meter Balance",
  });

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const tableRef1 = useRef(null);
  const stockBalance = useDownloadExcel({
    currentTableRef: tableRef1.current,
    filename: "OfficeUse ",
    sheet: "OfficeUse ",
  });

  const handlePrint1 = useReactToPrint({
    content: () => tableRef1.current,
  });

  useEffect(() => {
    if (data.con == true) {
      Swal.fire({
        title: "SUCCESS !",
        icon: "success",
        buttonsStyling: false,
        iconColor: "#38b59e",
        color: "#38b59e",
        width: "25em",
        background: "#ffffff",
        customClass: {
          title: "text-white",
          confirmButton:
            "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#38b59e] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
        },
      });
    }
  }, [data]);

  console.log(fuelId, "ljlllljjljlljjjljljljljl");

  // let start = new Date();
  // const [token, setToken] = useState("none");
  // const [sDate, setSDate] = useState(start);

  // const { loadToken } = useTokenStorage();
  // useEffect(() => {
  //   const token = loadToken();
  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);
  // const formattedDate = sDate.toISOString().split("T")[0];

  // const route = `/balance-statement/?reqDate=${formattedDate}`;
  // console.log(formattedDate, route);
  // const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  // const [con, setCon] = useState(false);

  // useEffect(() => {
  //   setCon(true);
  // }, []);

  // useEffect(() => {
  //   fetchItGet(route, token);
  //   console.log("hello");
  // }, [con]);
  // console.log(data_g, start, "hkhkhkkhkhkhkhkhkhkhkhkk");

  const meterHeader = [
    "No",
    "Date",
    // "Pump",
    "Item",
    "Opening",
    "Closing",
    "Issue",
  ];

  console.log(stock);

  const meterRow = stock?.map((element, index) => (
    <Table.Tr key={index} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.createAt}</Table.Td>
      {/* <Table.Td>{element.pump}</Table.Td> */}
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element.opening?.toFixed(2)}</Table.Td>
      <Table.Td>{element.balance?.toFixed(2)}</Table.Td>
      <Table.Td>{(element.opening - element.balance).toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  const stockHeader = [
    "No",
    "Tank",
    "Opening",
    "Receive",
    "Issue",
    "Adjust",
    "Balance",
    "Today Tank",
    "Yesterday Tank ",
    "Total Issue",
    "Today G/L",
    "Total G/L",
  ];
  const stockRow = stock?.map((element, index) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element.opening?.toFixed(2)}</Table.Td>
      <Table.Td>{element.fuelIn?.toFixed(2)}</Table.Td>
      {/* <Table.Td>{element.issue?.toFixed(2)}</Table.Td> */}
      <Table.Td>{element.cash}</Table.Td>
      <Table.Td>
        {(
          element.balance -
          element.open -
          element.receive +
          element.totalLiter
        )?.toFixed(2)}
      </Table.Td>
      <Table.Td>{element.balance?.toFixed(2)}</Table.Td>
      <Table.Td>{element.todayTank?.toFixed(2)}</Table.Td>
      <Table.Td>{element.yesterdayTank?.toFixed(2)}</Table.Td>
      <Table.Td>{element.tankIssue?.toFixed(2)}</Table.Td>
      <Table.Td>{element.todayGL?.toFixed(2)}</Table.Td>
      <Table.Td>{element.totalGL?.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  const handleClick1 = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    fetchIt(
      `/balance-statement/adjust-balance?id=${fuelType?._id}`,
      {
        adjustAmount: adjust,
      },
      token
    );
    setAdjust("");
    setFuelType("");
    setRefresh((pre) => !pre);
  };

  const handleClick2 = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    fetchIt(
      `/balance-statement/today-balance?id=${fuelType2?._id}`,
      {
        todayTankAmount: todayTank,
      },
      token
    );
    setTodayTank("");
    setFuelType2("");
    setRefresh((pre) => !pre);
  };

  console.log(
    fuelType2,
    "/.SDSDSSSDSDSDSSDSDSS...................................."
  );

  return (
    <div className="w-full pt-28">
      <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
        <CalendarPick date={sDate} setDate={setSDate} label="Start Date" />
        <div className="">
          <CalendarPick date={eDate} setDate={setEDate} label="End Date" />
        </div>
        <SearchButton onClick={handleClick} />
      </div>
      {/* <div className="border-b-2 text-text border-gray-300 pb-3 mt-8 flex">
        <NavLink className="text-xl px-6 py-2 rounded-md" to="/daily_list" end>
          Reports
        </NavLink>
        <NavLink
          to="/daily_list/stock"
          className="text-xl px-6 py-2 rounded-md"
        >
          Stock Balances
        </NavLink>
      </div> */}
      {isData ? (
        // <div className="mt-2">
        //   <Outlet
        //     context={[
        //       totalPTest,
        //       totalOTest,
        //       totalCredit,
        //       notCredit,
        //       total,
        //       stock,
        //       setRefresh,
        //     ]}
        //   />
        // </div>
        <div className="mt-14">
          <div>
            <div className="flex gap-8 mt-8">
              <div className="w-[40%] shadow-md shadow-shadow/20 bg-secondary rounded-xl flex items-center justify-center">
                <img
                  className="w-[70%]  2xl:w-[55%]"
                  src="../../../static/images/Fuel station-pana.png"
                  alt=""
                />
              </div>
              <div className="w-[60%] ">
                <StockTable
                  handleDownloadExcel={meterBalance.onDownload}
                  handlePrint={handlePrint}
                  tableRef={tableRef}
                  header={meterHeader}
                  rows={meterRow}
                  label="Meter Balance"
                />
              </div>
            </div>
            <div className=" mt-10 ">
              <div className="text-3xl ms-2 text-detail font-bold font-mono my-auto">
                Adjust Amount
              </div>
              <div className="flex gap-5 mt-2">
                <FuelInDrop
                  placeholder="Please Select"
                  label="Fuel Type"
                  data={stock}
                  value={fuelType}
                  setValue={setFuelType}
                />
                <TextInput
                  style="!w-[300px]"
                  label="Adjust amount"
                  placeholder="Adjust amount"
                  value={adjust}
                  onChange={(e) => setAdjust(e.target.value)}
                />
                <SearchButton
                  visible={false}
                  title="ADD"
                  onClick={ConAlert("Are you sure ?", true, handleClick1)}
                />
              </div>
            </div>
            <div className=" mt-8 ">
              <div className="text-3xl ms-2 text-detail font-bold font-mono my-auto">
                Add Today Tank Balance
              </div>
              <div className="flex gap-5 mt-2">
                <FuelInDrop
                  placeholder="Please Select"
                  label="Fuel Type"
                  data={stock}
                  value={fuelType2}
                  setValue={setFuelType2}
                />
                <TextInput
                  style="!w-[300px]"
                  label="Today balance"
                  placeholder="Today balance"
                  value={todayTank}
                  onChange={(e) => setTodayTank(e.target.value)}
                />
                <SearchButton
                  visible={false}
                  title="ADD"
                  onClick={ConAlert("Are you sure ?", true, handleClick2)}
                />
              </div>
            </div>
            <div className="my-8 ">
              <StockTable
                handleDownloadExcel={stockBalance.onDownload}
                tableRef={tableRef1}
                handlePrint={handlePrint1}
                label="Stock Balance"
                rows={stockRow}
                header={stockHeader}
              />
            </div>
          </div>
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

export default SaleLedger;
