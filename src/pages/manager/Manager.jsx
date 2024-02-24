import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import fuelData from "../../pages/installer/drop_data/fuel";
import UseGet from "../../api/hooks/UseGet";
import useTokenStorage from "../../utils/useDecrypt";
const Manager = () => {
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start = new Date(start);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(0);
  end = new Date(end);

  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();

  // eslint-disable-next-line no-unused-vars
  const [endDate, setEndDate] = useState(end);
  // eslint-disable-next-line no-unused-vars
  const [startDate, setStartDate] = useState(start);

  const [con, setCon] = useState();
  useEffect(() => {
    (async function () {
      const data = [
        { tank: "Tank 1", count: 5000 },
        { tank: "Tank 2", count: 9000 },
        { tank: "Tank 3", count: 17000 },
        { tank: "Tank 4", count: 5000 },
        { tank: "Tank 5", count: 10000 },
        { tank: "Tank 6", count: 16000 },
      ];

      const barColors = [
        "#95e199",
        "#95e199",
        "#40afbf",
        "#40afbf",
        "#c9a9c5",
        "#e6cf63",
      ];

      new Chart(document.getElementById("acquisitions"), {
        type: "bar",
        data: {
          labels: data.map((row) => row.tank),
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

  useEffect(() => {
    fuelData.length > 4 ? setCon(true) : setCon(false);
    fetchItGet(
      `detail-sale/by-date/?sDate=${startDate}&eDate=${endDate}`,
      token
    );
  }, [startDate, endDate, token]);

  console.log("====================================");
  console.log(startDate, endDate);
  console.log(data_g);
  console.log("====================================");

  return (
    <div className="w-full pt-28">
      <div className="pb-6">
        {con ? (
          <div className="grid grid-rows-10 h-[300px]  grid-cols-12 gap-8 w-full ">
            {fuelData.map(() => (
              <div className="bg-[#e8f4ee] shadow-shadow/10 border-2 gap-4 p-4 border-[#94d99a] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl ">
                <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                  <img
                    src="../../public/static/images/gasoline.png"
                    className="h-14 2xl:ms-2 mr-2"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-detail">
                      002-Octane Ron (92)
                    </div>
                    <div className=" text-detail">Total - 100,000 MMK</div>
                    <div className=" text-detail">Total - 10 Liter</div>
                  </div>
                </div>
                <div className="w-[170px] h-full bg-secondary rounded-xl ">
                  {" "}
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className=" text-detail">Price</div>
                    <div className=" text-detail font-semibold text-xl">
                      2,000
                    </div>
                    <div className=" text-detail">MMK</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-[#e8f4ee] shadow-shadow/10 border-2 gap-4 p-4 border-[#94d99a] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl ">
              <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                <img
                  src="../../public/static/images/gasoline.png"
                  className="h-14 2xl:ms-2 mr-2"
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-detail">
                    002-Octane Ron (92)
                  </div>
                  <div className=" text-detail">Total - 100,000 MMK</div>
                  <div className=" text-detail">Total - 10 Liter</div>
                </div>
              </div>
              <div className="w-[170px] h-full bg-secondary rounded-xl ">
                {" "}
                <div className="flex flex-col items-center justify-center h-full">
                  <div className=" text-detail">Price</div>
                  <div className=" text-detail font-semibold text-xl">
                    2,000
                  </div>
                  <div className=" text-detail">MMK</div>
                </div>
              </div>
            </div>
            <div className="bg-[#e1f2f4] shadow-shadow/10 border-2 gap-4 p-4 border-[#76b5bd] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl">
              <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                <img
                  src="../../public/static/images/gasoline (1).png"
                  className="h-14 2xl:ms-2 mr-2"
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-[#005b68]">
                    002-Octane Ron (92)
                  </div>
                  <div className=" text-[#005b68]">Total - 100,000 MMK</div>
                  <div className=" text-[#005b68]">Total - 10 Liter</div>
                </div>
              </div>
              <div className="w-[170px] h-full bg-secondary rounded-xl ">
                {" "}
                <div className="flex flex-col items-center justify-center h-full">
                  <div className=" text-[#005b68]">Price</div>
                  <div className=" text-[#005b68] font-semibold text-xl">
                    2,000
                  </div>
                  <div className=" text-[#005b68]">MMK</div>
                </div>
              </div>
            </div>
            {/* <div className="bg-[#ffebfd] shadow-shadow/10 gap-4 p-4 border-2 border-[#e9a2e1] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl ">
              <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                <img
                  src="../../public/static/images/gasoline (2).png"
                  className="h-14 2xl:ms-2 mr-2"
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-[#d05ac4]">
                    002-Octane Ron (92)
                  </div>
                  <div className=" text-[#d05ac4]">Total - 100,000 MMK</div>
                  <div className=" text-[#d05ac4]">Total - 10 Liter</div>
                </div>
              </div>
              <div className="w-[170px] h-full bg-secondary rounded-xl ">
                {" "}
                <div className="flex flex-col items-center justify-center h-full">
                  <div className=" text-[#d05ac4]">Price</div>
                  <div className=" text-[#d05ac4] font-semibold text-xl">
                    2,000
                  </div>
                  <div className=" text-[#d05ac4]">MMK</div>
                </div>
              </div>
            </div>
            <div className="bg-[#d8dcff] shadow-shadow/10 gap-4 p-4 border-2 border-[#838de6] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl">
              <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                <img
                  src="../../public/static/images/gasoline (5).png"
                  className="h-14 2xl:ms-2 mr-2"
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-[#6973d2]">
                    002-Octane Ron (92)
                  </div>
                  <div className=" text-[#6973d2]">Total - 100,000 MMK</div>
                  <div className=" text-[#6973d2]">Total - 10 Liter</div>
                </div>
              </div>
              <div className="w-[170px] h-full bg-secondary rounded-xl ">
                {" "}
                <div className="flex flex-col items-center justify-center h-full">
                  <div className=" text-[#6973d2]">Price</div>
                  <div className=" text-[#6973d2] font-semibold text-xl">
                    2,000
                  </div>
                  <div className=" text-[#6973d2]">MMK</div>
                </div>
              </div>
            </div>
            <div className="bg-[#ffe2e4] shadow-shadow/10 gap-4 p-4 border-2 border-[#f0848d] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl">
              <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                <img
                  src="../../public/static/images/gasoline (4).png"
                  className="h-14 2xl:ms-2 mr-2"
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-[#e25864]">
                    002-Octane Ron (92)
                  </div>
                  <div className=" text-[#e25864]">Total - 100,000 MMK</div>
                  <div className=" text-[#e25864]">Total - 10 Liter</div>
                </div>
              </div>
              <div className="w-[170px] h-full bg-secondary rounded-xl ">
                {" "}
                <div className="flex flex-col items-center justify-center h-full">
                  <div className=" text-[#e25864]">Price</div>
                  <div className=" text-[#e25864] font-semibold text-xl">
                    2,000
                  </div>
                  <div className=" text-[#e25864]">MMK</div>
                </div>
              </div>
            </div>
            <div className="bg-[#f8f4dd] shadow-shadow/10 gap-4 p-4 border-2 border-[#e7d477] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl">
              <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                <img
                  src="../../public/static/images/gasoline (3).png"
                  className="h-14 2xl:ms-2 mr-2"
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-[#d6b438]">
                    002-Octane Ron (92)
                  </div>
                  <div className=" text-[#d6b438]">Total - 100,000 MMK</div>
                  <div className=" text-[#d6b438]">Total - 10 Liter</div>
                </div>
              </div>
              <div className="w-[170px] h-full bg-secondary rounded-xl ">
                {" "}
                <div className="flex flex-col items-center justify-center h-full">
                  <div className=" text-[#d6b438]">Price</div>
                  <div className=" text-[#eccf40] font-semibold text-xl">
                    2,000
                  </div>
                  <div className=" text-[#eccf40]">MMK</div>
                </div>
              </div>
            </div> */}
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
                    100,000
                  </h1>
                  <h1 className="text-[2.5rem]  text-detail/80">MMK</h1>
                </div>
              </div>
            </div>
            {fuelData.map((e, index) => (
              <div
                className={`bg-[${e.bgColor}] shadow-shadow/10 border-2 gap-4 p-4 border-[${e.borderColor}] shadow-xl  flex items-center justify-center row-span-5 col-span-4 rounded-2xl `}
              >
                <div className="w-full h-full 2xl:gap-2 items-center flex ps-3 bg-secondary rounded-xl ">
                  <img
                    src={`../../public/static/images/gasoline (${index}).png`}
                    className="h-14 2xl:ms-2 mr-2"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <div
                      className={
                        e.textColor == ""
                          ? "text-[#45B54B] font-semibold "
                          : `text-[${e.textColor}]`
                      }
                    >
                      {e.name}
                    </div>
                    <div
                      className={
                        e.textColor == ""
                          ? "text-[#45B54B]"
                          : ` text-[${e.textColor}]`
                      }
                    >
                      Total - 100,000 MMK
                    </div>
                    <div
                      className={
                        e.textColor == ""
                          ? "text-[#45B54B]"
                          : ` text-[${e.textColor}]`
                      }
                    >
                      Total - 10 Liter
                    </div>
                  </div>
                </div>
                <div className="w-[170px] h-full bg-secondary rounded-xl ">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div
                      className={
                        e.textColor == ""
                          ? "text-[#45B54B]"
                          : ` text-[${e.textColor}]`
                      }
                    >
                      Price
                    </div>
                    <div
                      className={
                        e.textColor == ""
                          ? "text-[#45B54B] text-xl font-semibold"
                          : ` text-[${e.textColor}]`
                      }
                    >
                      2,000
                    </div>
                    <div
                      className={
                        e.textColor == ""
                          ? "text-[#45B54B]"
                          : ` text-[${e.textColor}]`
                      }
                    >
                      MMK
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className=" mt-8 flex gap-6 h-[400px] items-center">
          <div className="w-[850px] h-full p-5 items-center flex justify-center rounded-xl px-6 shadow-lg shadow-shadow/20 bg-secondary">
            <canvas id="acquisitions" className="my-auto"></canvas>
          </div>
          {con ? (
            <div className=" manager_bg flex-col p-10 h-full w-[500px] 2xl:w-[820px] rounded-xl flex items-center justify-center shadow-lg shadow-shadow/20">
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
                  src="../../public/static/images/Fuel station-pana.png"
                  alt=""
                  className="w-[60%] 2xl:w-[43%]"
                />
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
                src="../../public/static/images/Fuel station-pana.png"
                alt=""
                className="w-[60%] 2xl:w-[43%]"
              />
            </div> */}
            </div>
          ) : (
            <div className=" manager_bg flex-col p-10 h-full w-[500px] 2xl:w-[820px] rounded-xl flex items-center justify-center shadow-lg shadow-shadow/20">
              <div className="bg-secondary 2xl:justify-around rounded-2xl flex-col w-full flex items-center justify-center">
                <img
                  src="../../public/static/images/Fuel station-pana.png"
                  alt=""
                  className="w-[80%] 2xl:w-[45%]"
                />
              </div>
            </div>
          )}

          {/* <div className="bg-secondary hidden h-full w-[850px] rounded-xl 2xl:flex items-center justify-center shadow-lg shadow-shadow/20">
            <img
            className="w-[80%]"
            src="../../public/static/images/Fuel station-rafiki (3).png"
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
      src="../../public/static/images/Fuel station-pana.png"
      alt=""
      className="w-[80%] 2xl:w-[45%]"
    />
  </div>
</div>;
