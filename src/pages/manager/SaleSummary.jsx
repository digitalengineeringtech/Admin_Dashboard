import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";
import SearchButton from "../../components/SearchButton";
import SelectDrop from "../../components/SelectDrop";
import purpose from "../../testBeforeApi/data/pou";
import CalendarPick from "../../components/CalendarPick";
import { RiErrorWarningLine } from "react-icons/ri";
import Footer from "../../components/footer/Footer";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet2 from "../../api/hooks/UseGet2";
import UseGet3 from "../../api/hooks/UseGet3";
import UseGet from "../../api/hooks/UseGet";
import FilterTable from "../../components/table/FilterTable";
import { Table } from "@mantine/core";

const SaleSummary = () => {
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();
  const [{ data_g_3, loading_g_3, error_g_3, pagi_g_3 }, fetchItGet3] =
    UseGet3();

  const [okData, setOkData] = useState([]);
  const [dynamic, setDynamic] = useState([]);
  const [token, setToken] = useState("none");
  const [isData, setIsData] = useState(false);
  const [ninety2LotalLiter, SetNinety2LotalLiter] = useState(0);
  const [ninety5LotalLiter, SetNinety5LotalLiter] = useState(0);
  const [dieselLotalLiter, SetDieselLotalLiter] = useState(0);
  const [phsdLotalLiter, SetphshLotalLiter] = useState(0);

  const [literByNoz, setLiterByNoz] = useState([]);

  // const [totalLiter, SettotalLiter] = useState();
  const [totalPrice, SetTotalPrice] = useState(0);
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();

  useEffect(() => {
    if (data_g?.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data_g, loading_g, error_g, fetchItGet]);

  const summaryHeader = [
    "Date/Time",
    "Octane Ron(92)",
    "Octane Ron(95)",
    "Disel",
    "Premium Disel",
    "Total Price (Kyat)",
  ];
  const summaryRow = (
    <Table.Tr className=" duration-150 text-sm text-center">
      <Table.Td>
        {sDate?.toDateString()} | {eDate?.toDateString()}
      </Table.Td>
      <Table.Td>
        {ninety2LotalLiter ? ninety2LotalLiter.toFixed(3) : "-"}
      </Table.Td>
      <Table.Td>
        {ninety5LotalLiter ? ninety5LotalLiter.toFixed(3) : "-"}
      </Table.Td>
      <Table.Td>
        {dieselLotalLiter ? dieselLotalLiter.toFixed(3) : "-"}
      </Table.Td>
      <Table.Td>{phsdLotalLiter ? phsdLotalLiter.toFixed(3) : "-"}</Table.Td>
      <Table.Td>
        {totalPrice
          ? totalPrice?.toLocaleString(undefined, {
              maximumFractionDigits: 3,
            })
          : "-"}
      </Table.Td>
    </Table.Tr>
  );
  const detailHeader = [
    "Nozzle No",
    "Fuel Type",
    "Price per Liter",
    "Total Sale Liter",
    "Total Price",
  ];

  // let nozzle = [];
  const [nozzle, setNozzle] = useState([]);

  useEffect(() => {
    // if (data_g_3?.length > 0) {
    //   data_g_3.map((e, index) => nozzle.unshift(e.nozzle_no));
    // }
    // setNozzle(data_g_3.map((e) => [...nozzle, e.nozzle_no]));
    if (data_g_3?.length > 0) {
      setNozzle((prevNozzle) => [
        ...prevNozzle,
        ...data_g_3.map((e) => e.nozzle_no),
      ]);
    }
  }, [data_g_3]);

  // useEffect(() => {
  //   if (nozzle.length > 0) {
  //     nozzle.forEach((e) => {
  //       const totalLiter = data_g
  //         .filter((d) => d.nozzleNo == e)
  //         .map((g) => g.saleLiter)
  //         .reduce((pv, cv) => pv + cv, 0);

  //       setLiterByNoz((prev) => [
  //         ...prev,
  //         {
  //           nozzle_no: e,
  //           totalLiter: totalLiter,
  //         },
  //       ]);
  //     });
  //   }
  // }, [nozzle, data_g]);

  useEffect(() => {
    if (nozzle.length > 0) {
      const updatedLiterByNoz = nozzle.map((e) => {
        const totalLiter = data_g
          .filter((d) => d.nozzleNo === e)
          .map((g) => g.saleLiter)
          .reduce((pv, cv) => pv + cv, 0);

        return {
          nozzle_no: e,
          totalLiter: totalLiter,
        };
      });

      setLiterByNoz((prev) => updatedLiterByNoz);
    }
  }, [nozzle, data_g]);

  console.log(data_g_3, nozzle);

  const handleClick = () => {
    fetchItGet(`/detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);

    fetchItGet3(`/device`, token);
    // fetchItGet2(
    //   `/detail-sale/statement-report?sDate=${sDate}&eDate=${eDate}`,
    //   token
    // );
  };

  useEffect(() => {
    let ninety2 = 0;
    let ninety5 = 0;
    let diesel = 0;
    let premium = 0;
    let totalLiter = 0;
    let totalPrice = 0;

    data_g?.map((obj) => {
      if (obj.fuelType === "001-Octane Ron(92)") {
        ninety2 += obj.saleLiter;
      }
      if (obj.fuelType === "002-Octane Ron(95)") {
        ninety5 += obj.saleLiter;
      }
      if (obj.fuelType === "004-Diesel") {
        diesel += obj.saleLiter;
      }
      if (obj.fuelType === "005-Premium Diesel") {
        premium += obj.saleLiter;
      }

      totalPrice += obj.totalPrice;
    });

    SetNinety2LotalLiter(ninety2);
    SetNinety5LotalLiter(ninety5);
    SetDieselLotalLiter(diesel);
    SetphshLotalLiter(premium);
    // SettotalLiter(totalLiter);
    SetTotalPrice(totalPrice);
  }, [data_g, sDate, eDate]);

  useEffect(() => {
    if (data_g) {
      setOkData(data_g);
    }
  }, [data_g, loading_g, error_g]);

  const detailRow = data_g_3?.map((element) => {
    const matchingEntry = literByNoz.find(
      (entry) => entry.nozzle_no === element.nozzle_no
    );
    const totalLiter = matchingEntry ? matchingEntry.totalLiter : 0;

    console.log("............................");
    console.log(totalLiter, literByNoz);
    console.log("............................");
    return (
      <Table.Tr key={element._id} className=" duration-150 text-sm text-center">
        <Table.Td>{element.nozzle_no || "-"}</Table.Td>
        <Table.Td>{element.fuel_type || "-"}</Table.Td>
        <Table.Td>{element.daily_price || "-"}</Table.Td>
        <Table.Td>{totalLiter.toFixed(3) || "-"}</Table.Td>
        <Table.Td>
          {(element.daily_price * totalLiter).toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }) || "-"}
        </Table.Td>
      </Table.Tr>
    );
  });

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
        <div className="">
          <div className="mt-8">
            <FilterTable header={summaryHeader} rows={summaryRow} />
            <Footer />
          </div>
          <div className="">
            <div className="mt-8">
              <FilterTable header={detailHeader} rows={detailRow} />
              <Footer />
            </div>
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
  );
};

export default SaleSummary;
