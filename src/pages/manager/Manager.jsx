import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import fuelData from "../../pages/installer/drop_data/fuel";
import UseGet from "../../api/hooks/UseGet";
import UseGet2 from "../../api/hooks/UseGet2";
import UseGet3 from "../../api/hooks/UseGet3";
import useTokenStorage from "../../utils/useDecrypt";
import color from "../../pages/installer/drop_data/color";
import FilterTable from "../../components/table/FilterTable";
import { useReactToPrint } from "react-to-print";
import { Table } from "@mantine/core";
import CustomTable from "../../components/table/CustomTable";
import clsx from "clsx";
import UseGet4 from "../../api/hooks/UseGet4";

const Manager = () => {
  const [totalCalcu, setTotalCalcu] = useState([]);
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();

  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const [{ data_g_2, loading_g_2, error_g_2 }, fetchItGet2] = UseGet2();
  const [{ data_g_3, loading_g_3, error_g_3 }, fetchItGet3] = UseGet3();
  const [{ data_g_4, loading_g_4, error_g_4 }, fetchItGet4] = UseGet4();

  const [literByNoz, setLiterByNoz] = useState([]);
  const [nozzle, setNozzle] = useState([]);

  const tableRef2 = useRef();
  const handlePrint2 = useReactToPrint({
    content: () => tableRef2.current,
  });

  // const detailRow = (
  //   <Table.Tr className=" duration-150 text-sm text-center">
  //     <Table.Td>eee</Table.Td>
  //     <Table.Td>eee</Table.Td>
  //     <Table.Td>eee</Table.Td>
  //     <Table.Td>eee</Table.Td>
  //   </Table.Tr>
  // );

  const [ninety2LotalLiter, SetNinety2LotalLiter] = useState(0);
  const [ninety5LotalLiter, SetNinety5LotalLiter] = useState(0);
  const [dieselLotalLiter, SetDieselLotalLiter] = useState(0);
  const [phsdLotalLiter, SetphshLotalLiter] = useState(0);

  //console.log("............");
  //console.log(totalCalcu, data_g_4);
  //console.log("............");

  const detailRow = totalCalcu.map((element, index) => {
    return (
      <Table.Tr key={index} className=" text-lg duration-150 text-center">
        <Table.Td>
          {element?.fueltype == "001-Octane Ron(92)"
            ? "92 RON"
            : element?.fueltype == "002-Octane Ron(95)"
            ? "95 RON"
            : element?.fueltype == "004-Diesel"
            ? "HSD"
            : element?.fueltype == "005-Premium Diesel"
            ? "PHSD"
            : ""}
        </Table.Td>
        <Table.Td>
          {element.pricePerLiter.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </Table.Td>
        <Table.Td>
          {(element?.fueltype == "001-Octane Ron(92)"
            ? ninety2LotalLiter
            : element?.fueltype == "002-Octane Ron(95)"
            ? ninety5LotalLiter
            : element?.fueltype == "004-Diesel"
            ? dieselLotalLiter
            : element?.fueltype == "005-Premium Diesel"
            ? phsdLotalLiter
            : ""
          ).toFixed(3)}
        </Table.Td>
        <Table.Td>
          {(
            (element?.fueltype == "001-Octane Ron(92)"
              ? ninety2LotalLiter
              : element?.fueltype == "002-Octane Ron(95)"
              ? ninety5LotalLiter
              : element?.fueltype == "004-Diesel"
              ? dieselLotalLiter
              : element?.fueltype == "005-Premium Diesel"
              ? phsdLotalLiter
              : 5) * element.pricePerLiter
          ).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </Table.Td>
      </Table.Tr>
    );
  });

  //console.log(totalCalcu, "this is total", detailRow);
  const detailHeader = [
    "Fuel Type",
    "Price Per Liter",
    "Total Sale Liter",
    "Total Sale Amount",
  ];
  const detailHeader1 = [
    "Nozzle No.",
    "Fuel Type",
    "Price Per Liter",
    "Total Sale Liter",
    "Total Sale Amount",
  ];

  const singleHeader = (
    <Table.Tr className="duration-150 font-bold text-center">
      {totalCalcu.map((element, index) => (
        <Table.Td
          className={clsx("bg-[#E4F5FF] w-[120px] text-text")}
          key={index}
        >
          {element?.fueltype == "001-Octane Ron(92)"
            ? "92 RON"
            : element?.fueltype == "002-Octane Ron(95)"
            ? "95 RON"
            : element?.fueltype == "004-Diesel"
            ? "HSD"
            : element?.fueltype == "005-Premium Diesel"
            ? "PHSD"
            : ""}
        </Table.Td>
      ))}
    </Table.Tr>
  );

  const singleBody = (
    <Table.Tr className="duration-150 text-center">
      {totalCalcu.map((element, index) => (
        <Table.Td className={clsx("text-sm w-[120px] text-text")} key={index}>
          {element.totalAmount.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </Table.Td>
      ))}
    </Table.Tr>
  );

  // const singleRow = (
  //   <Table.Tr className="duration-150 text-center">
  //     {totalCalcu.map((element, index) => {
  //       <Table.Td key={index}>{element.totalAmount}</Table.Td>;
  //     })}
  //   </Table.Tr>
  // );

  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  start = new Date(start);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);
  end = new Date(end);

  // fetchItGet(
  //   `/detail-sale/sale-summary?sDate=${sDate}&eDate=${eDate}`,
  //   token
  // );

  useEffect(() => {
    let ninety2 = 0;
    let ninety5 = 0;
    let diesel = 0;
    let premium = 0;
    let totalLiter = 0;
    let totalPrice = 0;

    // fetchfrom detailsale statement
    // data_g_2?.map((obj) => {
    // data_g?.map((obj) => {
    //oldVersion
    // nozData?.map((obj) => {

    data_g_4?.map((obj) => {
      if (obj.fuel_type === "001-Octane Ron(92)") {
        ninety2 += Number(obj.devTotalizerDif);
      }
      if (obj.fuel_type === "002-Octane Ron(95)") {
        ninety5 += Number(obj.devTotalizerDif);
      }
      if (obj.fuel_type === "004-Diesel") {
        diesel += Number(obj.devTotalizerDif);
      }
      if (obj.fuel_type === "005-Premium Diesel") {
        premium += Number(obj.devTotalizerDif);
      }

      totalPrice += Number(obj.totalPrice);
    });

    SetNinety2LotalLiter(ninety2);
    SetNinety5LotalLiter(ninety5);
    SetDieselLotalLiter(diesel);
    SetphshLotalLiter(premium);
    // SettotalLiter(totalLiter);
    // SetTotalPrice(totalPrice);
  }, [data_g, data_g_2, data_g_3, data_g_4]);

  const [atgStatus, setAtgStatus] = useState();

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }

    const check = localStorage.getItem("atg");
    check === "true" ? setAtgStatus(true) : setAtgStatus(false);
  }, []);

  useEffect(() => {
    fetchItGet3(
      `/tank-data/pagi/1?dateOfDay=${start.toLocaleDateString(`fr-CA`)}`,
      token
    );
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [endDate, setEndDate] = useState(end);
  // eslint-disable-next-line no-unused-vars
  const [startDate, setStartDate] = useState(start);

  //console.log(nozzle, data_g_2, "ggggg", literByNoz);

  const dataArr = data_g_3[
    data_g_3.length == 0 ? data_g_3.length : data_g_3.length - 1
  ]?.data?.map((e) => {
    return {
      fuel: e.oilType,
      tank: e.id,
      count: e.volume,
    };
  });

  const tankLabel = dataArr?.map((row) => {
    return row?.fuel == ("Petrol 92" || "92 0ctane")
      ? "92 RON"
      : row?.fuel == "95 Octane"
      ? "95 RON"
      : row?.fuel == "Diesel"
      ? "HSD"
      : row?.fuel == "Super Diesel"
      ? "PHSD"
      : "";
  });

  //console.log(tankLabel, "this is tank label");

  const [con, setCon] = useState();
  useEffect(() => {
    (async function () {
      const data = dataArr;

      const barColors = ["#95e199", "#40afbf", "#c9a9c5", "#ef7070", "#e6cf63"];

      new Chart(document.getElementById("acquisitions"), {
        type: "bar",
        data: {
          labels: data?.map((row) => {
            return row?.fuel == ("Petrol 92" || "92 0ctane")
              ? "92 RON" + " " + "( " + row.tank + " )"
              : row?.fuel == "95 Octane"
              ? "95 RON" + " " + "( " + row.tank + " )"
              : row?.fuel == "Diesel"
              ? "HSD" + " " + "( " + row.tank + " )"
              : row?.fuel == "Super Diesel"
              ? "PHSD" + " " + "( " + row.tank + " )"
              : "";
          }),
          datasets: [
            {
              label: "Acquisitions by tank",
              data: data?.map((row) => row.count),
              backgroundColor: barColors,
            },
          ],
        },
        options: {
          // maxBarThickness: 30,
          scales: {
            x: {
              grid: {
                offset: true,
              },
            },
          },
        },
      });
    })();
  });

  useEffect(() => {
    (async function () {
      const data = dataArr;

      const barColors = ["#95e199", "#40afbf", "#c9a9c5", "#ef7070", "#e6cf63"];

      new Chart(document.getElementById("acquisitions1"), {
        type: "bar",
        data: {
          labels: data?.map((row) => {
            return row?.fuel == ("Petrol 92" || "92 0ctane")
              ? "92 RON" + " " + "( " + row.tank + " )"
              : row?.fuel == "95 Octane"
              ? "95 RON" + " " + "( " + row.tank + " )"
              : row?.fuel == "Diesel"
              ? "HSD" + " " + "( " + row.tank + " )"
              : row?.fuel == "Super Diesel"
              ? "PHSD" + " " + "( " + row.tank + " )"
              : "";
          }),
          datasets: [
            {
              label: "Acquisitions by tank",
              data: data?.map((row) => row.count),
              backgroundColor: barColors,
            },
          ],
        },
        options: {
          // maxBarThickness: 30,
          scales: {
            x: {
              grid: {
                offset: true,
              },
            },
          },
        },
      });
    })();
  });

  //console.log(data_g_3, "........................");

  useEffect(() => {
    fuelData?.length > 4 ? setCon(true) : setCon(false);
    fetchItGet(
      `detail-sale/by-date/?sDate=${startDate}&eDate=${endDate}`,
      token
    );
    fetchItGet2("/device", token);
    fetchItGet4(
      `/detail-sale/sale-summary?sDate=${startDate}&eDate=${endDate}`,
      token
    );

    // //console.log("wkwk");
  }, [startDate, endDate, token]);

  useEffect(() => {
    if (data_g_2?.length > 0) {
      setNozzle((prevNozzle) => [
        ...prevNozzle,
        ...data_g_2.map((e) => e.nozzle_no),
      ]);
    }
  }, [data_g_2]);

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
      //console.log("gggggggggggggggggggggg");

      setLiterByNoz(updatedLiterByNoz);
    }
  }, [nozzle, data_g]);

  // //console.log("==ggggg==================================");
  // //console.log(
  //   data_g_3,
  //   start.toLocaleDateString(`fr-CA`),
  //   data_g_3[data_g_3.length == 0 ? data_g_3.length : data_g_3.length - 1]
  //     ?.data,
  //   dataArr
  // );
  // //console.log("==ggggg==================================");

  // //console.log("====llllll================================");
  // //console.log(startDate, endDate);
  // //console.log(data_g, data_g_2);
  // //console.log("====llllll================================");

  const [size, setSize] = useState();

  useEffect(() => {
    if (window.innerWidth < 1460) {
      setSize(true);
    }
  }, [window.innerWidth]);
  // //console.log(size);

  useEffect(() => {
    const fuelCalcu = fuelData?.map((e, index) => {
      const calcuLiter = data_g
        .filter((fuel) => fuel.fuelType == e.value)
        .map((element) => element.saleLiter)
        .reduce((pv, cv) => pv + cv, 0);
      const calcuPrice = data_g
        .filter((fuel) => fuel.fuelType == e.value)
        .map((element) => element.totalPrice)
        .reduce((pv, cv) => pv + cv, 0);
      const unitPrice = data_g_2.filter((unit) => unit.fuel_type == e.value)[0]
        ?.daily_price;

      return {
        fueltype: e.value,
        totalLiter: calcuLiter,
        totalPrice: calcuPrice,
        pricePerLiter: unitPrice || "0",
        totalAmount: calcuLiter * unitPrice || "0",
        textColor: color[index].textColor,
        bgColor: color[index].bgColor,
        borderColor: color[index].borderColor,
        // totalAmount: `${calcuLiter * unitPrice}`.replace(".", ",") || "0",
      };
    });
    setTotalCalcu(fuelCalcu);
  }, [data_g, fuelData]);

  const head = (
    <Table.Tr className="text-[1rem] text-lg font-semibold text-center ">
      {detailHeader?.map((item, index) => (
        <Table.Td
          key={index}
          className={clsx("bg-[#E4F5FF] w-[120px] text-text")}
          // className="bg-[#E4F5FF] text-text"
        >
          {item}
        </Table.Td>
      ))}
    </Table.Tr>
  );

  //console.log(singleHeader, "this is single row", head);

  const detailRow1 = data_g_2?.map((element) => {
    const matchingEntry = literByNoz.find(
      (entry) => entry.nozzle_no === element.nozzle_no
    );
    const totalLiter = matchingEntry ? matchingEntry.totalLiter : 0;

    // //console.log("............................");
    // //console.log(totalLiter, literByNoz, matchingEntry);
    // //console.log("............................");
    return (
      <Table.Tr key={element._id} className=" duration-150 text-sm text-center">
        <Table.Td>{element.nozzle_no || "-"}</Table.Td>
        <Table.Td>
          {element?.fuel_type == "001-Octane Ron(92)"
            ? "92 RON"
            : element?.fuel_type == "002-Octane Ron(95)"
            ? "95 RON"
            : element?.fuel_type == "004-Diesel"
            ? "HSD"
            : element?.fuel_type == "005-Premium Diesel"
            ? "PHSD"
            : ""}
        </Table.Td>
        <Table.Td>
          {element.daily_price.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          }) || "-"}
        </Table.Td>
        <Table.Td>{totalLiter.toFixed(3) || "-"}</Table.Td>
        <Table.Td>
          {(element.daily_price * totalLiter).toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }) || "-"}
        </Table.Td>
      </Table.Tr>
    );
  });

  //console.log(data_g_4, "this is data_g_4", startDate, endDate);

  return (
    <div className="w-full pt-28">
      <div className="pb-6 mx-auto">
        {/* {size ? (
          <div className="grid grid-rows-10  grid-cols-12 gap-8 w-full ">
            {totalCalcu.map((e, index) => (
              <div
                style={{
                  borderColor: e.borderColor,
                  backgroundColor: e.bgColor,
                }}
                className={` shadow-shadow/10 border-2 gap-4 p-4  shadow-xl  flex items-center justify-center row-span-5 col-span-6 rounded-2xl `}
              >
                <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                  <img
                    src={`../../static/images/gasoline (${index}).png`}
                    className="h-14 2xl:ms-2 mr-2"
                    alt=""
                  />
                  <div className="flex flex-col" style={{ color: e.textColor }}>
                    <div className={`font-semibold `}>{e.fueltype}</div>
                    <div className={` `}>
                      Total - {Number(e?.totalPrice).toFixed(2)} MMK
                    </div>
                    <div className={``}>
                      Total - {Number(e?.totalLiter).toFixed(2)} Liter
                    </div>
                  </div>
                </div>
                <div className="w-[170px] h-full bg-secondary rounded-xl ">
                  <div
                    style={{ color: e.textColor }}
                    className="flex flex-col items-center justify-center h-full"
                  >
                    <div className={` `}>Price</div>
                    <div className={`text-xl font-semibold `}>
                      {Number(e?.pricePerLiter)}
                    </div>
                    <div className={` `}>MMK</div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-[#f8f4dd] shadow-shadow/10 gap-4 p-4 border-2 border-[#e7d477] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl">
              <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                <img
                  src="../../static/images/gasoline (3).png"
                  className="h-14 2xl:ms-2 mr-2"
                  alt=""
                />
                <div className="flex flex-col"
                        style={{ color: e.textColor }}>
                  <div className="font-semibold text-[#d6b438]">
                    002-Octane Ron (92)
                  </div>
                  <div className=" text-[#d6b438]">Total - 100,000 MMK</div>
                  <div className=" text-[#d6b438]">Total - 10 Liter</div>
                </div>
              </div>
              <div className="w-[170px] h-full bg-secondary rounded-xl ">
                {" "}
                <div style={{ color: e.textColor }}
                        className="flex flex-col items-center justify-center h-full">
                  <div className=" text-[#d6b438]">Price</div>
                  <div className=" text-[#eccf40] font-semibold text-xl">
                    2,000
                  </div>
                  <div className=" text-[#eccf40]">MMK</div>
                </div>
              </div>
            </div>
          </div>
        ) : con ? (
          <div className="grid grid-rows-10 h-[300px]  grid-cols-12 gap-8 w-full ">
            {totalCalcu.map((e, index) => (
              <div
                style={{
                  borderColor: e.borderColor,
                  backgroundColor: e.bgColor,
                }}
                className={` shadow-shadow/10 border-2 gap-4 p-4  shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl `}
              >
                <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                  <img
                    src={`../../static/images/gasoline (${index}).png`}
                    className="h-14 2xl:ms-2 mr-2"
                    alt=""
                  />
                  <div className="flex flex-col" style={{ color: e.textColor }}>
                    <div className={`font-semibold `}>{e.fueltype}</div>
                    <div className={` `}>
                      Total - {Number(e?.totalPrice).toFixed(2)} MMK
                    </div>
                    <div className={` `}>
                      Total - {Number(e?.totalLiter).toFixed(2)} Liter
                    </div>
                  </div>
                </div>
                <div className="w-[170px] h-full bg-secondary rounded-xl ">
                  <div
                    style={{ color: e.textColor }}
                    className="flex flex-col items-center justify-center h-full"
                  >
                    <div className={` `}>Price</div>
                    <div className={`text-xl font-semibold `}>
                      {Number(e?.pricePerLiter)}
                    </div>
                    <div className={` `}>MMK</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : ( */}
        <div className="flex  justify-around  w-full ">
          <div className="justify-between manager_bg w-[400px] flex-col p-3  rounded-2xl flex items-center shadow-lg shadow-shadow/20">
            <div className="bg-secondary h-[185px]  2xl:justify-around rounded-xl 2xl:flex-row  flex-col w-full  flex items-center justify-center">
              <div className="flex flex-col leading-10 justify-center items-center">
                <h1 className="text-[1.8rem]  text-detail/80">
                  Today Total Sale
                </h1>
                <h1 className="text-[2.8rem] font-bold text-detail my-2">
                  {totalCalcu
                    .map((e) => Number(e.totalPrice))
                    .reduce((pv, cv) => pv + cv, 0)
                    .toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                </h1>
                <h1 className="text-[1.8rem]  text-detail/80">MMK</h1>
              </div>
            </div>
            <div className="w-full">
              <CustomTable
                cls="w-[375px]"
                head={singleHeader}
                tableRef={tableRef2}
                header={singleHeader}
                rows={singleBody}
              />
            </div>
          </div>
          {/* update */}
          {/* {totalCalcu.map((e, index) => (
              <div
                style={{
                  borderColor: e.borderColor,
                  backgroundColor: e.bgColor,
                }}
                className={` shadow-shadow/10 border-2 gap-4 p-4  shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl `}
              >
                <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                  <img
                    src={`../../static/images/gasoline (${index}).png`}
                    className="h-14 2xl:ms-2 mr-2"
                    alt=""
                  />
                  <div className="flex flex-col" style={{ color: e.textColor }}>
                    <div className={`font-semibold `}>{e.fueltype}</div>
                    <div className={` `}>
                      Total - {Number(e?.totalPrice).toFixed(2)} MMK
                    </div>
                    <div className={` `}>
                      Total - {Number(e?.totalLiter).toFixed(2)} Liter
                    </div>
                  </div>
                </div>
                <div className="w-[170px] h-full bg-secondary rounded-xl ">
                  <div
                    style={{ color: e.textColor }}
                    className="flex flex-col items-center justify-center h-full"
                  >
                    <div className={` `}>Price</div>
                    <div className={`text-xl font-semibold `}>
                      {Number(e?.pricePerLiter)}
                    </div>
                    <div className={` `}>MMK</div>
                  </div>
                </div>
              </div>
            ))} */}
          <CustomTable
            cls="2xl:w-[460px] w-[50vw]"
            head={head}
            tableRef={tableRef2}
            header={detailHeader}
            rows={detailRow}
          />
          {/* w-[200px] 2xl:w-[700px] h-[365px] */}
          <div className=" 2xl:flex flex-col hidden relative h-[365px] w-[31vw] extra:w-[38vw] items-center justify-end  ">
            {dataArr ? (
              <div className="">
                <div className="text-2xl p-3 bg-secondary px-6 shadow-md shadow-shadow/20 rounded-xl text-gray-500 mb-4 extra:hidden">
                  Tank Data Chart
                </div>
                <canvas
                  responsive={false}
                  maintainAspectRatio={false}
                  id="acquisitions"
                  className="bg-secondary p-4 w-[33vw] rounded-xl shadow-md shadow-shadow/20"
                ></canvas>
              </div>
            ) : atgStatus ? (
              <div className="text-4xl  font-semibold  text-gray-300 px-20 py-28 rounded-xl bg-secondary my-auto">
                There is no Today Tank Data
              </div>
            ) : (
              <div className="text-4xl text-center px-20 py-28 rounded-xl bg-secondary my-auto leading-[3rem] font-semibold text-gray-300">
                Tank Data Chart <br /> is only for ATG user
              </div>
            )}
          </div>
        </div>
        {/* )} */}
        <div className=" mt-14 justify-around flex  items-start">
          {/* <div className="w-[850px] h-full p-5 items-center flex justify-center rounded-xl px-6 shadow-lg shadow-shadow/20 bg-secondary">
            {dataArr ? (
              <canvas id="acquisitions" className="my-auto"></canvas>
            ) : atgStatus ? (
              <div className="text-4xl font-semibold text-gray-300">
                There is no Today Tank Data
              </div>
            ) : (
              <div className="text-4xl text-center leading-[3rem] font-semibold text-gray-300">
                Tank Data Chart <br /> is only for ATG user
              </div>
            )}
          </div> */}
          {/* //here */}
          <div className="w-[45vw]">
            <FilterTable
              type="detail"
              tableRef={tableRef2}
              header={detailHeader1}
              rows={detailRow1}
            />
          </div>

          {/* {con ? (
            <div className=" manager_bg flex-col p-10 h-full w-[500px] 2xl:w-[820px] rounded-xl flex items-center justify-center shadow-lg shadow-shadow/20">
              <div className="bg-secondary 2xl:justify-around rounded-2xl 2xl:flex-row pt-2 flex-col w-full h-[100%] flex items-center justify-center">
                <div className="flex flex-col leading-10 justify-center items-center">
                  <h1 className="text-[2.5rem] 2xl:mr-[-30px] text-detail/80">
                    Today Total Sale
                  </h1>
                  <h1 className="text-[3.6rem] font-bold text-detail my-6">
                    {totalCalcu
                      .map((e) => Number(e.totalPrice))
                      .reduce((pv, cv) => pv + cv, 0)
                      .toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                  </h1>
                  <h1 className="text-[3rem]  text-detail/80">MMK</h1>
                </div>
              </div>
              <div className="bg-secondary 2xl:justify-around rounded-2xl 2xl:flex-row  flex-col w-full h-[100%] flex items-center justify-end">
              <div className="flex flex-col leading-10 mb-[-40px] justify-center items-center">
                <h1 className="text-[2rem] 2xl:mr-[-30px] text-detail/80">
                  Today Total Sale
                </h1>
                <h1 className="text-[3rem] font-bold text-detail my-2">
                  100,000
                </h1>
                <h1 className="text-[2.5rem]  text-detail/80">MMK</h1>
              </div>

              <img
                src="../../static/images/Fuel station-pana.png"
                alt=""
                className="w-[60%] 2xl:w-[43%]"
              />
            </div>
            </div>
          ) : ( */}
          <div className="w-[45%]">
            <div className=" 2xl:hidden mb-10 flex-col flex relative w-full extra:w-[38vw] items-center justify-end  ">
              {dataArr ? (
                <canvas
                  responsive={true}
                  maintainAspectRatio={true}
                  id="acquisitions1"
                  className="bg-secondary p-4 rounded-xl shadow-md shadow-shadow/20"
                ></canvas>
              ) : atgStatus ? (
                <div className="text-4xl font-semibold px-20 py-20 rounded-xl bg-secondary my-auto text-gray-300">
                  There is no Today Tank Data
                </div>
              ) : (
                <div className="text-4xl text-center px-20 py-20 rounded-xl bg-secondary my-auto leading-[3rem] font-semibold text-gray-300">
                  Tank Data Chart <br /> is only for ATG user
                </div>
              )}
            </div>
            <div className=" manager_bg flex-col p-10 h-full w-full rounded-xl flex items-center justify-center shadow-lg shadow-shadow/20">
              <div className="bg-secondary 2xl:justify-around rounded-2xl flex-col w-full flex items-center justify-center">
                <img
                  src="../../static/images/Fuel station-pana.png"
                  alt=""
                  className="w-[80%] 2xl:w-[45%]"
                />
              </div>
            </div>
          </div>
          {/* )} */}

          {/* <div className="bg-secondary hidden h-full w-[850px] rounded-xl 2xl:flex items-center justify-center shadow-lg shadow-shadow/20">
            <img
            className="w-[80%]"
            src="../../static/images/Fuel station-rafiki (3).png"
              alt=""
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Manager;

<div className=" manager_bg flex-col p-10 h-full w-[500px] 2xl:w-[820px] rounded-xl flex items-center justify-center shadow-lg shadow-shadow/20">
  <div className="bg-secondary 2xl:justify-around rounded-2xl flex-col w-full flex items-center justify-center">
    <img
      src="../../static/images/Fuel station-pana.png"
      alt=""
      className="w-[80%] 2xl:w-[45%]"
    />
  </div>
</div>;
