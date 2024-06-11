import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../../components/device/Card";
import UseGet from "../../api/hooks/UseGet";
import UseGet2 from "../../api/hooks/UseGet2";
import useTokenStorage from "../../utils/useDecrypt";
import mqtt from "mqtt";
import LoadContext from "../../services/LoadContext";
import LoaderCom from "../../components/LoaderCom";

import { Table } from "@mantine/core";
import FilterTable from "../../components/table/FilterTable";
import { useDownloadExcel } from "react-export-table-to-excel";
import { downloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import Re from "../../services/Re";
import { FaPrint } from "react-icons/fa6";
import ErrorAlert from "../../components/alert/ErrorAlert";
import logo from "../../../public/static/images/ks.png";

const DeviceControl = () => {
  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start = new Date(start);

  let end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end = new Date(end);

  const { loading, setLoading } = useContext(LoadContext);
  const client = mqtt.connect("ws://detpos:asdffdsa@192.168.0.100:9001");
  const { refresh, setRefresh } = useContext(Re);

  const [token, setToken] = useState("none");

  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  useEffect(() => {
    fetchItGet(`/device`, token);
  }, []);

  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const [noMorePermit, setNoMorePermit] = useState(null);
  const [payloadHistory, setPayloadHistory] = useState([]);
  const payloadHistoryRef = useRef(payloadHistory);
  const [allDone, setAllDone] = useState("0");
  const [permitd, setPermitd] = useState(false);
  const [readyDespenserHistory, setReadyDespenserHistory] = useState([]);
  const readyDespenserHistoryRef = useRef(readyDespenserHistory);
  const [liveDespenserHistory, setLiveDespenserHistory] = useState([]);
  const liveDespenserHistoryRef = useRef(liveDespenserHistory);
  const [finalData, setFinalData] = useState(0);
  const [nozzle1PermitRecord, setNozzle1PermitRecord] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [url, setUrl] = useState(localStorage.getItem("img"));

  useEffect(() => {
    setUrl(localStorage.getItem("img"));
  }, []);
  const checkLiveRef = useRef({
    nozzle: "",
  });

  useEffect(() => {
    readyDespenserHistoryRef.current = readyDespenserHistory;
  }, [readyDespenserHistory]);

  const permitRef = useRef({
    nozzle: "",
  });

  const regex = /[A-Z]/g;
  const [liveData, setLiveData] = useState();
  const [liveDispenser, setLiveDispenser] = useState(undefined);

  const nozzle1FuelDetailRef = useRef({ liter: "", price: "" });

  client.on("connect", () => {
    client.subscribe("detpos/#", (err) => {
      err && console.log(err);
    });
  });

  const [permitData, setPermitData] = useState([]);
  const [approveData, setApproveData] = useState([]);

  console.log("====================================");
  console.log("permit req is", permitData, "and approve is ", approveData);
  console.log("====================================");

  const [isData, setIsData] = useState(false);

  const [sDate, setSDate] = useState(start);
  const [eDate, setEDate] = useState(end);
  const [fuelType, setFuelType] = useState();
  const [pData, setPData] = useState();
  const [purposeUse, setPurposeUse] = useState();
  const [noz, setNoz] = useState();

  const { reFresh, setReFresh } = useContext(Re);

  const purposeRoute = purposeUse?.value
    ? `&vehicleType=${purposeUse?.value}`
    : "";
  const fuelRoute = fuelType?.value ? `&fuelType=${fuelType?.value}` : "";
  const nozzleRoute = noz?.value ? `&nozzleNo=${noz?.value}` : "";

  const route = `detail-sale/pagi/by-date/1?sDate=${sDate}&eDate=${eDate}${purposeRoute}${fuelRoute}${nozzleRoute}`;
  const [{ data_g_2, loading_g_2, error_g_2, pagi_g_2 }, fetchItGet2] =
    UseGet2();
  const [con, setCon] = useState(false);

  useEffect(() => {
    setCon(true);
  }, []);

  useEffect(() => {
    fetchItGet2(`detail-sale/pagi/1`, token);
    console.log("hello");
  }, [con, reFresh]);

  // console.log(pData, "dddddddddddddddd");

  useEffect(() => {
    if (data_g_2?.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data_g_2, loading_g_2, error_g_2, fetchItGet2]);

  // console.log(totalPages);

  useEffect(() => {
    if (pData) {
      // thermalPrint();
      infoData ? thermalPrint() : ErrorAlert("Station Info are Empty");
    }
  }, [pData]);

  const componentRef = useRef();
  const thermalPrint = () => {
    if (pData) {
      if (infoData) {
        const content = componentRef.current.innerHTML;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      } else {
        ErrorAlert("Some Station Info are Empty");
      }
    }
  };

  // const thermalPrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const infoData = JSON.parse(localStorage.getItem("data"));

  const tableHeader = [
    "Vocno",
    "Sale Date",
    "Vehicle No",
    "Purpose",
    "Nozzle",
    "Fuel",
    "Sale Gallon",
    "Sale Liter",
    "Sale Price",
    "Total Price",
    "Totallizer liter",
    "Totallizer Amount",
    "Action",
  ];

  // console.log(data_g_2, "....");
  const tableRow = data_g_2?.map((element) => (
    <Table.Tr key={element.no} className=" duration-150 text-sm text-center">
      <Table.Td className="select-none">{element.vocono}</Table.Td>
      <Table.Td className="select-none">
        {element.createAt.slice(0, 10)} {element.createAt.slice(11, 19)}
        {/* {new Date(element.createAt).toLocaleString("en-US", {
          timeZone: "Asia/Yangon",
        })} */}
      </Table.Td>
      <Table.Td className="select-none">{element.carNo}</Table.Td>
      <Table.Td className="select-none">{element.vehicleType}</Table.Td>
      <Table.Td className="select-none">{element.nozzleNo}</Table.Td>
      <Table.Td className="select-none">{element.fuelType}</Table.Td>
      <Table.Td className="select-none">
        {(parseFloat(element?.saleLiter) / 4.16).toFixed(3)}
      </Table.Td>
      <Table.Td className="select-none">{element.saleLiter}</Table.Td>
      <Table.Td className="select-none">
        {element.salePrice.toFixed(2).toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td className="select-none">
        {element.totalPrice.toFixed(2).toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td className="select-none">
        {element.totalizer_liter.toFixed(3)}
      </Table.Td>
      <Table.Td className="select-none">
        {element.totalizer_amount.toFixed(2).toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}
      </Table.Td>
      <Table.Td className="">
        <div
          // onClick={thermalPrint}
          onClick={() => {
            setPData(element);
            thermalPrint();
            // handlePrint();
          }}
          className="bg-detail active:scale-90 duration-75 cursor-pointer flex py-3 rounded justify-center "
        >
          <FaPrint className="text-2xl text-secondary" />
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  // console.log(
  //   "start",
  //   sDate,
  //   "end",
  //   eDate,
  //   "fuel",
  //   fuelType?.name,
  //   "purpose",
  //   purposeUse?.name,
  //   "nozzle",
  //   noz?.value
  // );

  // console.log(data_g_2);
  // console.log(data_g_2?.length > 0);
  // console.log(pagi_g);

  const onPageChange = (event) => {
    console.log(event);
    fetchItGet2(
      `detail-sale/pagi/by-date/${event}?sDate=${sDate}&eDate=${eDate}${purposeRoute}${fuelRoute}${nozzleRoute}`,
      token
    );
  };

  const [down, setDown] = useState(null);
  const [d, setD] = useState(false);
  const tableRef = useRef(null);
  const fun = () => {
    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: "Users table",
      sheet: "Users",
    });
    return onDownload;
  };

  // console.log(tableRef.current != null, "ooooooooooooooooo");
  // console.log(tableRef.current, "..............................");

  const recordsPerPage = 50;
  const totalPages = Math.ceil(pagi_g / recordsPerPage);

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Daily Sale Report",
      sheet: "Daily Sale Report",
      tablePayload: {
        header: tableHeader,
        // accept two different data structures
        body: data_g_2.map((e) => [
          e.vocono,
          e.createAt,
          e.carNo,
          e.vehicleType,
          e.nozzleNo,
          e.fuelType,
          (parseFloat(e?.saleLiter) / 4.16).toFixed(3),
          e.saleLiter,
          e.salePrice.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }),
          e.totalPrice.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }),
          e.totalizer_liter.toFixed(3),
          e.totalizer_amount.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          }),
        ]),
      },
    });
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const utcTimestamp = pData?.createAt;
  let hour = utcTimestamp?.slice(11, 13);
  const min = utcTimestamp?.slice(14, 16);
  const sec = utcTimestamp?.slice(17, 19);
  const year = utcTimestamp?.slice(0, 4);
  const day = utcTimestamp?.slice(5, 7);
  const month = utcTimestamp?.slice(8, 10);

  let amPm = "AM";
  if (hour >= 12) {
    amPm = "PM";
    hour -= 12;
  }
  if (hour === 0) {
    hour = 12;
  }

  client.on("message", (topic, message) => {
    if (topic.startsWith("detpos/device/permit/") && /[1-8]$/.test(topic)) {
      const prefix = message.toString().substring(0, 2); // "01"

      const topicCount = payloadHistoryRef.current.filter(
        (t) => t === parseInt(prefix)
      ).length;
      if (topicCount < 2) {
        setPayloadHistory((prevTopics) => [...prevTopics, parseInt(prefix)]);
      }
      // updatePermitData(prefix);

      setNoMorePermit("hhh");
    }

    if (topic === "detpos/local_server") {
      const prefix = message.toString().substring(0, 2); // "01"
      setAllDone(prefix);
      // setFetchNew((prev)=>!prev)
    }

    //  add new
    if (topic === "detpos/local_server/preset") {
      const prefix = message.toString().substring(0, 2); // "01"
      // setAllDone(prefix);
      setReadyDespenserHistory((prevTopics) => [
        ...prevTopics,
        parseInt(prefix),
      ]);
      console.log("hell");
      // setFetchNew((prev)=>!prev)
    }
    //add new

    if (topic === "detpos/device/price") {
      // setPriceChange(true);
    }

    if (topic === "detpos/local_server/mode") {
      if (message.toString() === "allow") {
        setPermitd(true);
      } else if (message.toString() === "manual") {
        setPermitd(false);
      }
    }

    if (topic === "detpos/local_server/price_change") {
      // setPriceChange(true);
    }

    if (topic.startsWith("detpos/local_server") && /[1-8]$/.test(topic)) {
      const prefix = message.toString().substring(0, 2); // "01"

      const topicCount = readyDespenserHistoryRef.current.filter(
        (t) => t === parseInt(prefix)
      ).length;
      if (topicCount < 1) {
        setReadyDespenserHistory((prevTopics) => [
          ...prevTopics,
          parseInt(prefix),
        ]);
        // setApproveData((prevData) => [...prevData, parseInt(prefix)]);
        // setPermitData((prevData) =>
        //   prevData.filter((item) => item !== parseInt(prefix))
        // );
      }
    }

    // console.log(
    //   approveData,
    //   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    // );

    // console.log(message.toString())

    // console.log(message.toString(), topic);

    if (topic === "detpos/device/whreq") {
      const topicCount = liveDespenserHistoryRef.current.filter(
        (t) => t == message.toString()
      ).length;
      if (topicCount < 2) {
        setLiveDespenserHistory((prevTopics) => [
          ...prevTopics,
          message.toString(),
        ]);
      }
    }

    if (topic === "detpos/device/req") {
      const prefix = message.toString().substring(0, 2); // "01"
      const suffix = message.toString().substring(2); // "cancel"
      setPermitData((prevData) =>
        prevData.filter((item) => item !== parseInt(prefix))
      );
      setApproveData((prevData) =>
        prevData.filter((item) => item !== parseInt(prefix))
      );

      setNoMorePermit(prefix);
    }

    if (topic.startsWith("detpos/device/Final/") && /[1-8]$/.test(topic)) {
      let data = message.toString().split(regex);
      setFinalData(data[0]);
      setReFresh(!reFresh);
      // setApproveData((prevData) =>
      //   prevData.filter((item) => item !== parseInt(prefix))
      // );
      // setPer((prevData) =>
      //   prevData.filter((item) => item !== parseInt(prefix))
      // );
    }

    // if (topic.startsWith("detpos/device/livedata/") && /[1-8]$/.test(topic)) {
    //   let data = message.toString().split(regex);
    //   const updatedNozzle1FuelDetail = {
    //     liter: data[1],
    //     price: data[2],
    //     nozzleNo: data[0],
    //   };

    //   const checkLive = {
    //     nozzleNo: data[0],
    //   };

    //   checkLiveRef.current = {
    //     ...checkLiveRef.current,
    //     ...checkLive,
    //   };

    //   nozzle1FuelDetailRef.current = {
    //     ...nozzle1FuelDetailRef.current,
    //     ...updatedNozzle1FuelDetail,
    //   };
    // }
    // client.end();
  });

  // console.log(data_g_2.map((e) => parseInt(e.nozzle_no)));
  // console.log(permitData, "permit data");
  return (
    <>
      {loading && <LoaderCom />}
      <div className="flex items-start mt-[110px] h-full">
        <div className="w-full flex gap-5 flex-wrap items-center justify-center">
          {data_g?.map((obj, index) => (
            <Card
              disableButton={disableButton}
              setDisableButton={setDisableButton}
              Client={client}
              permitReq={permitData.includes(parseInt(obj.nozzle_no))}
              ///upper is my update
              loading
              setloading
              // setFetchNew={setFetchNew} need
              nozzle1PermitRecord={nozzle1PermitRecord}
              setNozzle1PermitRecord={setNozzle1PermitRecord}
              // selectedCards={selectedCards} no need in card
              // setSelectedCards={setSelectedCards} no need in card
              payloadHistory={payloadHistory}
              setPayloadHistory={setPayloadHistory}
              title={obj.nozzle_no}
              nozzle1FuelDetail={nozzle1FuelDetailRef}
              obj={obj}
              id={index}
              active={payloadHistory.includes(parseInt(obj.nozzle_no))}
              // setVisible={setVisible} no need in card
              key={index}
              finalData={finalData}
              setFinalData={setFinalData}
              onClick={() => open()}
              noMorePermit={noMorePermit}
              permitOfNozzles={permitRef}
              allDone={allDone}
              liveData={liveData == obj.nozzle_no ? liveData : undefined}
              setLiveData={setLiveData}
              setAllDone={setAllDone}
              checkLiveRef={checkLiveRef}
              liveDispenser={liveDispenser}
              approve={readyDespenserHistory.includes(parseInt(obj.nozzle_no))}
              setApprove={setReadyDespenserHistory}
              liveDespenserHistory={liveDespenserHistory.includes(obj.dep_no)}
              dis={obj.dep_no}
              num={obj.nozzle_no}
            />
          ))}
        </div>
        <div className="hidden">
          {/* <PrinterT ref={componentRef} pData={pData} /> */}
          <div
            ref={componentRef}
            style={{
              fontSize: "1rem",
              textAlign: "center",
              height: "400px",
              width: "80mm",
              margin: "1px auto",
            }}
          >
            <div style={{ fontSize: "0.5rem" }}>
              <div className="flex justify-center">
                <img
                  src={url}
                  style={{
                    // width: "25vw",
                    height: "70px",
                    width: "70px",
                    marginBottom: "5px",
                    margin: "1px auto",
                  }}
                />
              </div>

              <table
                style={{
                  fontSize: "0.8rem",
                }}
              >
                {/* <tr>
                <td style={{ fontWeight: "bold" }}>F.S Code</td>
                <td style={{ fontWeight: "bold" }}>F.S Code</td> */}
                {/* <td>: {read ? read?.station : "....."}</td> */}
                {/* </tr> */}
                <tr>
                  <td style={{ fontWeight: "bold" }}>Station</td>
                  <td>: {infoData?.station ? infoData?.station : "..."}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Voucher</td>
                  <td>: {pData?.vocono}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Date</td>
                  <td>
                    : {year}-{month}-{day} {hour}:{min}:{sec} {amPm}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Car No.</td>
                  <td>: {pData?.carNo}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Nozzle</td>
                  <td>: {pData?.nozzleNo}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>F.S Ph</td>
                  <td style={{ fontWeight: "" }}>
                    {infoData?.phone1 ? infoData?.phone1 : "..."}/
                    {infoData?.phone2 ? infoData?.phone2 : "..."}
                  </td>
                  {/* <td>
              : {read ? read?.ph_1 : "....."} / {read ? read?.ph_2 : "....."}
            </td> */}
                </tr>
              </table>
            </div>
            <hr />
            <div style={{ marginTop: "-5px" }}>
              <table
                style={{
                  fontSize: "0.8rem",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <tr style={{ borderBottom: "0.5px dashed black" }}>
                  <td style={{ padding: "10px 0px", fontWeight: "bold" }}>
                    Fuel Type
                  </td>
                  <td colspan="2" style={{ fontWeight: "bold" }}>
                    Price x Liter
                  </td>
                  <td style={{ textAlign: "end", fontWeight: "bold" }}>
                    Amount
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 0px" }}>{pData?.fuelType}</td>
                  <td>
                    {pData?.salePrice?.toFixed(2)} x{" "}
                    {pData?.saleLiter?.toFixed(2)}
                  </td>
                  <td>MMK</td>
                  <td style={{ textAlign: "end" }}>
                    {pData?.totalPrice?.toFixed(2)}
                  </td>
                </tr>
                <tr style={{ borderTop: "0.8px solid black" }}>
                  <td
                    style={{
                      padding: "10px 0px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    colspan="2"
                  >
                    Total (Inclusive Tax)
                  </td>
                  <td>MMK</td>
                  <td style={{ textAlign: "end", fontWeight: "bold" }}>
                    {pData?.totalPrice?.toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                textAlign: "center",
                marginTop: "-5px",
              }}
            >
              <h4>Thank you. Please come again.</h4>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 h-[280px] overflow-scroll w-[92%]">
          <FilterTable
            tableRef={tableRef}
            header={tableHeader}
            rows={tableRow}
          />
        </div>
      </div>
    </>
  );
};

export default DeviceControl;
