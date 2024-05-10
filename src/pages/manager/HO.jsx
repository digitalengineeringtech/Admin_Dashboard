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

const HO = () => {
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
  const [notCredit1, setNotCredit1] = useState();
  const [stock, setStock] = useState();

  // console.log(elements);
  const [isData, setIsData] = useState(true);
  const [con, setCon] = useState(false);
  const formattedDate = today.toISOString().split("T")[0];
  useEffect(() => {
    setCon(true);
  }, []);

  useEffect(() => {
    fetchItGet(`detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);
    fetchItGet2("/device", token);
    fetchItGet3(`/balance-statement/?reqDate=${formattedDate}`, token);

    // console.log("wkwk");
  }, [con, refresh]);

  const handleClick = () => {
    // const formattedDate2 = sDate.toISOString().split("T")[0];
    const yesterday = new Date(sDate);
    yesterday.setDate(sDate.getDate() + 1);
    const formattedYesterday = yesterday.toISOString().split("T")[0];
    fetchItGet(`detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);
    fetchItGet2("/device", token);
    fetchItGet3(`/balance-statement/?reqDate=${formattedYesterday}`, token);
    // console.log(
    //   "........................",
    //   sDate,
    //   eDate,
    //   `/balance-statement/?reqDate=${formattedYesterday}`
    // );
  };

  useEffect(() => {
    // setStock(data_g_3); normal
    setStock(data_g_3.slice(0, 4));
  }, [data_g_3, refresh, data_g]);

  //   console.log(data_g, "....................................................");

  //   if (data_g.length > 0) {
  //     console.log("sksksks");
  //   }

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

  //   console.log(data_g_3, "llllllllllllllllllllllllllllllllllllllllllll");

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
      const open = data_g_3.find((f) => f.fuelType == e.value);
      //   console.log(open, "open");
      return {
        fueltype: e.value,
        totalLiter: calcuLiter,
        pricePerLiter: unitPrice || "0",
        totalAmount: calcuLiter * unitPrice || "0",
        discount: 0,
        open: open?.openingBalance?.toFixed(2),
        balance: open?.balance?.toFixed(2),
        receive: open?.receive?.toFixed(2),
        // totalAmount: `${calcuLiter * unitPrice}`.replace(".", ",") || "0",
      };
    });
    setNotCredit(fuelCalcu);
  }, [data_g, fuelData, data_g_3]);

  useEffect(() => {
    const fuelCalcu = fuelData.map((e, index) => {
      const calcuLiter = data_g
        .filter((fuel) => fuel.fuelType == e.value)
        .filter((type) => type.cashType != "Credit Card")
        .map((element) => element.saleLiter)
        .reduce((pv, cv) => pv + cv, 0);
      const unitPrice = data_g_2.filter((unit) => unit.fuel_type == e.value)[0]
        ?.daily_price;
      const open = data_g_3.find((f) => f.fuelType == e.value);
      console.log(open, "open");
      return {
        fueltype: e.value,
        totalLiter: calcuLiter,
        pricePerLiter: unitPrice || "0",
        totalAmount: calcuLiter * unitPrice || "0",
        discount: 0,
        open: open?.openingBalance?.toFixed(2),
        balance: open?.balance?.toFixed(2),
        receive: open?.receive?.toFixed(2),
        obj: open,
        // totalAmount: `${calcuLiter * unitPrice}`.replace(".", ",") || "0",
      };
    });
    setNotCredit1(fuelCalcu);
  }, [data_g, fuelData, data_g_3]);

  console.log(notCredit, "lljljljljjjljlljjjljljljljjljljlj");

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

  const stockHeader = [
    "Type",
    "Opening",
    "Receive",
    "Sale",
    "Cash",
    "E-payment",
    "Credit",
    "Test ",
    "TestQ",
    "Balance",
    "Adjust",
    "Closing Balance",
  ];
  const stockHeader1 = [
    "Type",
    "Opening",
    "Receive",
    "Sale",
    "Cash",
    "E-payment",
    "Credit",
    "Test ",
    "TestQ",
    "Balance",
    "Adjust",
    "Closing Balance",
  ];
  const stockRow = notCredit?.map((element, index) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{element.fueltype}</Table.Td>
      <Table.Td>{element.open || 0}</Table.Td>
      <Table.Td>{element?.receive || 0}</Table.Td>
      <Table.Td>{Number(element.totalAmount)?.toFixed(2)}</Table.Td>
      <Table.Td>{Number(element.totalAmount)?.toFixed(2)}</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>{element?.balance || 0}</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>{element?.balance || 0}</Table.Td>
    </Table.Tr>
  ));
  const stockRow1 = notCredit1?.map((element, index) => (
    <Table.Tr key={element.no} className=" duration-150 text-center">
      <Table.Td>{element.fueltype}</Table.Td>
      <Table.Td>{element.pricePerLiter || 0}</Table.Td>
      <Table.Td>{element?.totalLiter?.toFixed(2) || 0}</Table.Td>
      <Table.Td>{(element?.totalLiter / 4.26)?.toFixed(2) || 0}</Table.Td>
      <Table.Td>{Number(element.totalAmount)?.toFixed(2)}</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>00</Table.Td>
      <Table.Td>{element?.totalLiter?.toFixed(2) || 0}</Table.Td>
      <Table.Td>{(element?.totalLiter / 4.26)?.toFixed(2) || 0}</Table.Td>
      <Table.Td>000</Table.Td>
      <Table.Td>{Number(element.totalAmount)?.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));
  const stockHead = (
    <Table.Thead className="text-[1rem] bg-detail/20 font-semibold text-center ">
      <Table.Tr className=" duration-150 text-center">
        <Table.Td rowSpan={2}>Type</Table.Td>
        <Table.Td rowSpan={2}>Price</Table.Td>
        <Table.Td colSpan={5}>Cash Sale</Table.Td>
        <Table.Td colSpan={3}>Cash Sale</Table.Td>
        <Table.Td colSpan={4}>E-payment Sale</Table.Td>
        <Table.Td colSpan={4}>Credit Sale</Table.Td>
      </Table.Tr>
      <Table.Tr className=" duration-150 text-center">
        <Table.Td>Liter</Table.Td>
        <Table.Td>Gallon</Table.Td>
        <Table.Td>Cash</Table.Td>
        <Table.Td>Disc</Table.Td>
        <Table.Td>Ammount</Table.Td>
        <Table.Td>Liter</Table.Td>
        <Table.Td>Gallon</Table.Td>
        <Table.Td>Ammount</Table.Td>
        <Table.Td>Liter</Table.Td>
        <Table.Td>Gallon</Table.Td>
        <Table.Td>Disc</Table.Td>
        <Table.Td>Ammount</Table.Td>
        <Table.Td>Liter</Table.Td>
        <Table.Td>Gallon</Table.Td>
        <Table.Td>Disc</Table.Td>
        <Table.Td>Ammount</Table.Td>
      </Table.Tr>
    </Table.Thead>
  );

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

  //   console.log(
  //     fuelType2,
  //     "/.SDSDSSSDSDSDSSDSDSS...................................."
  //   );

  return (
    <div className="w-full pt-28">
      <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
        <CalendarPick date={sDate} setDate={setSDate} label="Start Date" />
        <div className="">
          <CalendarPick date={eDate} setDate={setEDate} label="End Date" />
        </div>
        <SearchButton onClick={handleClick} />
      </div>
      {isData ? (
        <div className="mt-14">
          <div>
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
            <div className="my-8 w-full overflow-x-scroll ">
              <StockTable
                handleDownloadExcel={stockBalance.onDownload}
                tableRef={tableRef}
                handlePrint={handlePrint}
                label="Stock Balance"
                rows={stockRow1}
                header={stockHeader1}
                head={stockHead}
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

export default HO;
