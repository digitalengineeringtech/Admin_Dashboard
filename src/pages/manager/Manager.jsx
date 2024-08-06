import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import fuelData from "../../pages/installer/drop_data/fuel";
import UseGet from "../../api/hooks/UseGet";
import UseGet2 from "../../api/hooks/UseGet2";
import UseGet3 from "../../api/hooks/UseGet3";
import useTokenStorage from "../../utils/useDecrypt";
import color from "../../pages/installer/drop_data/color";

const Manager = () => {
  const [totalCalcu, setTotalCalcu] = useState([]);
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();

  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const [{ data_g_2, loading_g_2, error_g_2 }, fetchItGet2] = UseGet2();
  const [{ data_g_3, loading_g_3, error_g_3 }, fetchItGet3] = UseGet3();

  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start = new Date(start);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end = new Date(end);

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

  // console.log(startDate, endDate, "ggggg");

  const dataArr = data_g_3[
    data_g_3.length == 0 ? data_g_3.length : data_g_3.length - 1
  ]?.data.map((e) => {
    return {
      fuel: e.oilType,
      tank: e.id,
      count: e.volume,
    };
  });

  const [con, setCon] = useState();
  useEffect(() => {
    (async function () {
      const data = dataArr;

      const barColors = ["#95e199", "#40afbf", "#c9a9c5", "#ef7070", "#e6cf63"];

      new Chart(document.getElementById("acquisitions"), {
        type: "bar",
        data: {
          labels: data.map(
            (row) => row.fuel + " " + "( tank" + row.tank + " )"
          ),
          datasets: [
            {
              label: "Acquisitions by tank",
              data: data.map((row) => row.count),
              backgroundColor: barColors,
            },
          ],
        },
      });
    })();
  });

  console.log(data_g_3, "........................");

  useEffect(() => {
    fuelData.length > 4 ? setCon(true) : setCon(false);
    fetchItGet(
      `detail-sale/by-date/?sDate=${startDate}&eDate=${endDate}`,
      token
    );
    fetchItGet2("/device", token);

    // console.log("wkwk");
  }, [startDate, endDate, token]);

  // console.log("==ggggg==================================");
  // console.log(
  //   data_g_3,
  //   start.toLocaleDateString(`fr-CA`),
  //   data_g_3[data_g_3.length == 0 ? data_g_3.length : data_g_3.length - 1]
  //     ?.data,
  //   dataArr
  // );
  // console.log("==ggggg==================================");

  // console.log("====llllll================================");
  // console.log(startDate, endDate);
  // console.log(data_g, data_g_2);
  // console.log("====llllll================================");

  const [size, setSize] = useState();

  useEffect(() => {
    if (window.innerWidth < 1460) {
      setSize(true);
    }
  }, [window.innerWidth]);
  // console.log(size);

  useEffect(() => {
    const fuelCalcu = fuelData.map((e, index) => {
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

  return (
    <div className="w-full pt-28">
      <div className="pb-6">
        {size ? (
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
            {/* 
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
            </div> */}
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
        ) : (
          <div className="grid grid-rows-10 h-[300px]  grid-cols-12 gap-8 w-full ">
            <div className=" manager_bg col-span-4 row-span-10 flex-col p-10 h-full   rounded-xl flex items-center justify-center shadow-lg shadow-shadow/20">
              <div className="bg-secondary 2xl:justify-around rounded-2xl 2xl:flex-row  flex-col w-full h-[100%] flex items-center justify-center">
                <div className="flex flex-col leading-10 justify-center items-center">
                  <h1 className="text-[2rem]  text-detail/80">
                    Today Total Sale
                  </h1>
                  <h1 className="text-[3rem] font-bold text-detail my-3 mb-4">
                    {totalCalcu
                      .map((e) => Number(e.totalPrice))
                      .reduce((pv, cv) => pv + cv, 0)
                      .toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                  </h1>
                  <h1 className="text-[2.5rem]  text-detail/80">MMK</h1>
                </div>
              </div>
            </div>
            {totalCalcu.map((e, index) => (
              // console.log(
              //   `Index: ${index}, textColor: ${e.textColor}, bgColor: ${e.bgColor}, borderColor: ${e.borderColor}`
              // ),
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
                    {/* className=
                        {!e.textColor == ""
                          ? `font-semibold `
                          : `font-semibold text-[#31a55b]`} */}
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
        )}

        <div className=" mt-8 flex gap-6 h-[400px] items-center">
          <div className="w-[850px] h-full p-5 items-center flex justify-center rounded-xl px-6 shadow-lg shadow-shadow/20 bg-secondary">
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
          </div>
          {con ? (
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
              {/* <div className="bg-secondary 2xl:justify-around rounded-2xl 2xl:flex-row  flex-col w-full h-[100%] flex items-center justify-end">
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
            </div> */}
            </div>
          ) : (
            <div className=" manager_bg flex-col p-10 h-full w-[500px] 2xl:w-[820px] rounded-xl flex items-center justify-center shadow-lg shadow-shadow/20">
              <div className="bg-secondary 2xl:justify-around rounded-2xl flex-col w-full flex items-center justify-center">
                <img
                  src="../../static/images/Fuel station-pana.png"
                  alt=""
                  className="w-[80%] 2xl:w-[45%]"
                />
              </div>
            </div>
          )}

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
