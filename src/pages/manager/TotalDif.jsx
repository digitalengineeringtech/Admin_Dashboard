import React, { useEffect, useRef, useState } from "react";
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
import { downloadExcel, useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";

const TotalDif = () => {
  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(0);
  end = new Date(end);

  // let end = new Date();
  // end.setHours(23);
  // end.setMinutes(0);
  // end = new Date(end);

  const [totalCalcu, setTotalCalcu] = useState([]);

  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();
  const [{ data_g_2, loading_g_2, error_g_2, pagi_g_2 }, fetchItGet2] =
    UseGet2();
  const [{ data_g_3, loading_g_3, error_g_3, pagi_g_3 }, fetchItGet3] =
    UseGet3();
  //   console.log(start, end, "hhhhhhhhhhhhhhhhhhh");
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

  const [sDate, setSDate] = useState(start);
  const [eDate, setEDate] = useState(end);

  const next = new Date(sDate);
  next.setDate(sDate.getDate() + 1);
  // start = new Date(start);
  //   console.log(next, "yyyyyyyyyyyyyyyyyyyyyyyyyy");

  const currentDate = sDate;

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  //   console.log(formattedDate, "............");
  // const [eDate, setEDate] = useState(end);

  const [con, setCon] = useState(false);

  useEffect(() => {
    setCon(true);
  }, []);

  useEffect(() => {
    // fetchItGet(`/detail-sale/by-date/?sDate=${sDate}`, token);
    fetchItGet2(`/detail-sale/total_statement?reqDate=${formattedDate}`, token);
    fetchItGet(`/detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);

    fetchItGet3(`/device`, token);
  }, [con]);

  useEffect(() => {
    if (data_g?.length > 0) {
      // if (data_g_2?.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data_g, loading_g, error_g, fetchItGet]);

  //   console.log(
  //     data_g,data_g_3,
  //     "lfffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  //   );

  const detailHeader = [
    "Nozzle No",
    "Fuel Type",
    "Totalizer opening",
    "Totalizer closing",
    "Difference",
    "Issue",
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

  //   console.log(
  //     data_g_3,
  //     nozzle,
  //     "........................................................................."
  //   );

  const handleClick = () => {
    // fetchItGet(`/detail-sale/by-date/?sDate=${sDate}`, token);
    fetchItGet2(`detail-sale/total_statement?reqDate=${formattedDate}`, token);
    fetchItGet(`/detail-sale/by-date/?sDate=${sDate}&eDate=${eDate}`, token);

    fetchItGet3(`/device`, token);
  };

  //   console.log(data_g_3, "33333333333333333333333");
  console.log(totalCalcu, data_g_3, data_g);
  //   console.log(data_g, "1111111111111111111111111");

  useEffect(() => {
    let ninety2 = 0;
    let ninety5 = 0;
    let diesel = 0;
    let premium = 0;
    let totalLiter = 0;
    let totalPrice = 0;

    // fetchfrom detailsale statement
    data_g_2?.map((obj) => {
      // data_g?.map((obj) => {
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
  }, [data_g, data_g_2, data_g_3]);

  //   console.log(okData, "llllllllllllllllllllllllllllllllllll");

  useEffect(() => {
    if (data_g) {
      setOkData(data_g);
    }
  }, [data_g, loading_g, error_g]);

  const detailRow = totalCalcu?.map((element) => {
    // const matchingEntry = literByNoz.find(
    //   (entry) => entry.nozzle_no === element.nozzle_no
    // );
    // const totalLiter = matchingEntry ? matchingEntry.totalLiter : 0;

    // console.log("............................");
    // console.log(totalLiter, literByNoz);
    // console.log("............................");
    return (
      <Table.Tr key={element._id} className=" duration-150 text-sm text-center">
        <Table.Td>{element.nozzle_no || "-"}</Table.Td>
        <Table.Td>{element.fuel_type || "-"}</Table.Td>
        <Table.Td>
          {(element.firstTotalizer - element.totalLiter).toFixed(3) || "-"}
        </Table.Td>
        <Table.Td>{element.lastTotalizer.toFixed(3) || "-"}</Table.Td>
        <Table.Td>
          {(
            element.lastTotalizer.toFixed(3) -
            (element.firstTotalizer - element.totalLiter).toFixed(3)
          ).toFixed(3) || "-"}
        </Table.Td>
        <Table.Td>{element.totalLiter.toFixed(2) || "-"}</Table.Td>
        <Table.Td>
          {element.totalPrice.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }) || "-"}
        </Table.Td>
        {/* <Table.Td>
          {element.daily_price.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }) || "-"}
        </Table.Td> */}
      </Table.Tr>
    );
  });

  function handleDownloadExcel2() {
    downloadExcel({
      fileName: "Totalizer Difference",
      sheet: "Totalizer Difference",
      tablePayload: {
        header: detailHeader,
        // accept two different data structures
        body: data_g_3.map((element) => {
          const matchingEntry = literByNoz.find(
            (entry) => entry.nozzle_no === element.nozzle_no
          );
          const totalLiter = matchingEntry ? matchingEntry.totalLiter : 0;

          return [
            element.nozzle_no || "-",
            element.fuel_type || "-",
            element.daily_price || "-",
            totalLiter.toFixed(3) || "-",
            (element.daily_price * totalLiter).toLocaleString(undefined, {
              maximumFractionDigits: 3,
            }) || "-",
          ];
        }),
      },
    });
  }

  const tableRef2 = useRef(null);
  const meterBalance = useDownloadExcel({
    currentTableRef: tableRef2.current,
    filename: "Totalizer Difference",
    sheet: "Totalizer Difference",
  });

  const handlePrint2 = useReactToPrint({
    content: () => tableRef2.current,
  });

  useEffect(() => {
    const fuelCalcu = data_g_3.map((e, index) => {
      const calcuLiter = data_g
        .filter((voc) => voc.nozzleNo == e.nozzle_no)
        .map((element) => element.saleLiter)
        .reduce((pv, cv) => pv + cv, 0);
      const calcuPrice = data_g
        .filter((voc) => voc.nozzleNo == e.nozzle_no)
        .map((element) => element.totalPrice)
        .reduce((pv, cv) => pv + cv, 0);
      const totalizer = data_g
        .filter((voc) => voc.nozzleNo == e.nozzle_no)
        .reverse()[0]?.totalizer_liter;
      const length = data_g.filter((voc) => voc.nozzleNo == e.nozzle_no).length;
      const lTotalizer = data_g
        .filter((voc) => voc.nozzleNo == e.nozzle_no)
        .reverse()[length - 1]?.totalizer_liter;

      console.log(
        data_g.filter((voc) => voc.nozzleNo == e.nozzle_no).reverse()[0],
        "lllllkkkjjkkjkjkjkjkj"
      );

      return {
        nozzle_no: e.nozzle_no,
        totalLiter: calcuLiter,
        fuel_type: e.fuel_type,
        totalPrice: calcuPrice,
        firstTotalizer: totalizer,
        lastTotalizer: lTotalizer,
        length: length,
      };
    });
    setTotalCalcu(fuelCalcu);
  }, [data_g]);

  return (
    <div className="w-full pt-28">
      <div className="flex  flex-wrap gap-4 gap-x-10  justify-between">
        <CalendarPick date={sDate} setDate={setSDate} label="Date" />
        <CalendarPick date={eDate} setDate={setEDate} label="End Date" />

        {/* <div className="">
          <CalendarPick date={eDate} setDate={setEDate} label="End Date" />
        </div> */}
        <SearchButton onClick={handleClick} />
      </div>
      {isData ? (
        <div className="">
          <div className="mt-8">
            <FilterTable
              handleDownloadExcel={meterBalance.onDownload}
              handlePrint={handlePrint2}
              tableRef={tableRef2}
              header={detailHeader}
              rows={detailRow}
            />
            <Footer print={handlePrint2} onClick={meterBalance.onDownload} />
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

export default TotalDif;
