import React, { useEffect, useState } from "react";
import SelectDrop from "./SelectDrop";
import dispenser from "./drop_data/dispenser";
import fuelType from "./drop_data/fuel";
import brandType from "./drop_data/brand";
import nozzle from "./drop_data/nozzle";
import tankData from "./drop_data/tank";
import Button from "../../components/installer/Button";
import StockTable from "../../components/table/StockTable";
import Alert from "../../components/alert/Alert";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet from "../../api/hooks/UseGet";
import UseDelete from "../../api/hooks/UseDelete";
import UsePost from "../../api/hooks/UsePost";
import { Table } from "@mantine/core";
import ErrorAlert from "../../components/alert/ErrorAlert";
import DeleteAlert from "../../components/alert/DeleteAlert";
import TextInput from "../../components/inputbox/TextInput";
import stationData from "../../testBeforeApi/data/station";
import moment from "moment";

const Tank = () => {
  const header = [
    "No",
    "Tank No",
    "Fuel Type",
    "Nozzles",
    "Capacity",
    "Opening",
  ];
  let date = moment().format("YYYY-MM-D");
  const [stationId, setStationId] = useState("");
  const [token, setToken] = useState("none");
  const [amount, setAmount] = useState("none");
  const [tank, setTank] = useState("none");
  const [noz1, setNoz1] = useState("none");
  const [noz2, setNoz2] = useState("none");
  const [noz3, setNoz3] = useState("none");
  const [noz4, setNoz4] = useState("none");
  const [noz5, setNoz5] = useState("none");
  const [noz6, setNoz6] = useState("none");
  const [noz7, setNoz7] = useState("none");
  const [noz8, setNoz8] = useState("none");
  const [noz9, setNoz9] = useState("none");
  const [noz10, setNoz10] = useState("none");
  const [noz, setNoz] = useState([]);
  const [fuel, setFuel] = useState("none");
  const [liter, setLiter] = useState("none");
  const [station, setStation] = useState("none");
  const [okData, setOkData] = useState([]);
  const [valid, setValid] = useState(false);
  const { loadToken } = useTokenStorage();
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const [{ data_d, loading_d, error_d }, deleteIt] = UseDelete();
  const [{ data, loading, error }, fetchIt] = UsePost();

  const [open, setOpen] = useState();
  const [cap, setCap] = useState();
  const [include, setInclude] = useState(false);
  const [cloudFail, setCloudFail] = useState(false);

  const listStation = [
    {
      name: "initial Station",
    },
  ];

  useEffect(() => {
    if (data.con === true) {
      setAmount("none");
      setLiter("none");
      setFuel("none");
      setStation("none");
      setNoz("none");
      fetchItGet(`fuel-balance/all`, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);

  useEffect(() => {
    setOkData(data_g);
    // setLoad(loading_g);
  }, [data_g, loading_g, error_g, data]);

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
    fetchItGet(`fuel-balance/all`, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(okData, error, "..................");

  useEffect(() => {
    // console.log(data_g,error_g)
    setOkData(data_g);
    // setLoad(loading_g);
  }, [data_g, loading_g, error_g]);

  // Swal.fire("SweetAlert2 is working!");
  // const handleAdd = () => {
  //   if (fuel === "none" || open === "none" || yesterday == "none") {
  //     setValid(true);
  //   } else {
  //     setValid(false);
  //     const data = {
  //       openingBalance: open,
  //       yesterdayTank: yesterday,
  //       fuelType: fuel.name,
  //     };
  //     console.log("nniniiinniniinnninii");
  //     fetchIt("/balance-statement", data, token);
  //     setOpen("");
  //     setYesterday("");
  //     console.log("wkkkkk");
  //   }
  // };

  // console.log(error, token);

  const handleDelete = async (id) => {
    await deleteIt(`detail-sale?_id=${id}`, token);
    fetchItGet(`/balance-statement?reqDate=${date}`);
  };

  const handleAdd = () => {
    console.log("wk from handle add");
    if (
      cap === "" ||
      open === "" ||
      tank === "none" ||
      fuelType === "none" ||
      noz1 === "none"
      // accessDb === "none"
    ) {
      setValid(true);
    } else {
      setValid(false);

      if (
        noz.includes(noz1) ||
        noz.includes(noz2) ||
        noz.includes(noz3) ||
        noz.includes(noz4) ||
        noz.includes(noz5) ||
        noz.includes(noz6) ||
        noz.includes(noz7) ||
        noz.includes(noz8) ||
        noz.includes(noz9) ||
        noz.includes(noz10)
      ) {
        // console.log("111111111111111k");
        setInclude(true);
      } else {
        console.log("wkewkwkkwkwkwkwkwkwk");
        setInclude(false);
        const formData = new FormData();
        formData.append("capacity", cap);
        formData.append("opening", open);
        formData.append("tankNo", tank?.value);
        formData.append("fuelType", fuel?.value);
        formData.append("nozzles", noz1?.value);
        formData.append("nozzles", noz2?.value);
        formData.append("stationId", stationId?._id);
        // formData.append("accessDb", accessDb);

        noz3 !== "none" && formData.append("nozzles", noz3?.value);
        noz4 !== "none" && formData.append("nozzles", noz4?.value);
        noz5 !== "none" && formData.append("nozzles", noz5?.value);
        noz6 !== "none" && formData.append("nozzles", noz6?.value);
        noz7 !== "none" && formData.append("nozzles", noz7?.value);
        noz8 !== "none" && formData.append("nozzles", noz8?.value);
        noz9 !== "none" && formData.append("nozzles", noz9?.value);
        noz10 !== "none" && formData.append("nozzles", noz10?.value);
        // /fuel-balance

        // postToCloud(`fuel-balance`, formData, token);
        // cloudInstance
        // .post('fuel-balance', formData, {
        //  headers: {
        // 'Authorization': 'Bearer ' + token,
        // 'Content-Type': 'multipart/form-data'
        // }
        // })
        // .then((res) => {
        //   if (res.data.con) {
        setCloudFail(false);
        fetchIt("fuel-balance", formData, token);
        console.log(formData, ".....this is form data....");
        //   } else {
        //     setCloudFail(true);
        //   }
        // })
        // .catch((e) => {
        //   console.log(e);
        // });
      }
    }
  };

  const stockRow = okData?.map((element, index) => (
    <Table.Tr key={element._id} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.tankNo}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>
        {element.nozzles.map((nozzle) => nozzle.toString()).join(", ")}
      </Table.Td>
      <Table.Td>{element.capacity}</Table.Td>
      <Table.Td>{element.opening}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="flex flex-col   items-center">
      <div className="font-mono bg-secondary shadow-shadow/20 shadow-md px-10 rounded-xl  items-center flex gap-6 ms-3 mb-6 font-semibold text-3xl py-6">
        <img
          src="../../../public/static/images/gasoline.png"
          alt=""
          className="h-16"
        />
        <div className="text-text">ATG Setup</div>
      </div>
      <div className="flex gap-6">
        <div className="w-[530px] shadow-shadow/20 shadow-md rounded-2xl p-6 flex flex-col gap-6 gap-y-4 bg-white">
          <div className="flex flex-wrap gap-y-4 justify-between">
            <SelectDrop
              cls="w-[235px] relative"
              label="Fuel Type"
              data={fuelType}
              value={fuel}
              setValue={setFuel}
            />
            <SelectDrop
              cls="w-[235px] relative"
              label="Station Id"
              data={stationData()}
              value={stationId}
              setValue={setStationId}
            />
            <TextInput
              onChange={(e) => setOpen(e.target.value)}
              style="!w-[150px]"
              label="Opening"
              value={open}
              placeholder="Amount"
            />
            <TextInput
              onChange={(e) => setCap(e.target.value)}
              style="!w-[150px]"
              label="Tank Capacity"
              value={cap}
              placeholder="Amount"
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="Tank No"
              data={tankData}
              value={tank}
              setValue={setTank}
            />
          </div>
          <div className="flex justify-between mt-1">
            <Button
              title="SET UP"
              // onClick={Alert("Are you sure ?", () => {
              //   console.log(dis.value, noz.value, fuel.value, brand.value);
              // })}
              onClick={
                noz1 !== "none" ||
                amount !== "none" ||
                fuel !== "none" ||
                station !== "none" ||
                liter !== "none"
                  ? Alert("Are you sure ?", handleAdd)
                  : () => ErrorAlert("Some Fields are Empty")
              }
              style=" bg-detail border w-[230px] border-detail text-secondary"
            />
            <Button
              title="RESET"
              // onClick={Alert("Are you sure ?", () => {
              //   console.log(dis.value, noz.value, fuel.value, brand.value);
              // })}
              onClick={
                noz1 !== "none" ||
                amount !== "none" ||
                fuel !== "none" ||
                station !== "none" ||
                liter !== "none"
                  ? Alert("Are you sure ?", handleAdd)
                  : () => ErrorAlert("Some Fields are Empty")
              }
              style=" border w-[230px] border-danger text-danger"
            />
          </div>
        </div>
        <div className="w-[870px] shadow-shadow/20 shadow-md rounded-2xl p-6 flex flex-col gap-6 gap-y-4 bg-white">
          <div className="flex flex-wrap gap-y-4 justify-between">
            <SelectDrop
              cls="w-[150px] relative"
              label="No 1"
              data={nozzle}
              value={noz1}
              setValue={setNoz1}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 2"
              data={nozzle}
              value={noz2}
              setValue={setNoz2}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 3"
              data={nozzle}
              value={noz3}
              setValue={setNoz3}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 4"
              data={nozzle}
              value={noz4}
              setValue={setNoz4}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 5"
              data={nozzle}
              value={noz5}
              setValue={setNoz5}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 6"
              data={nozzle}
              value={noz6}
              setValue={setNoz6}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 7"
              data={nozzle}
              value={noz7}
              setValue={setNoz7}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 8"
              data={nozzle}
              value={noz8}
              setValue={setNoz8}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 9"
              data={nozzle}
              value={noz9}
              setValue={setNoz9}
            />
            <SelectDrop
              cls="w-[150px] relative"
              label="No 10"
              data={nozzle}
              value={noz10}
              setValue={setNoz10}
            />
            {valid && (
              <p className=" font-bold text-red-600  uppercase flex items-center  gap-3 text-[3vh] mt-[20px] mb-[20px]">
                Information Needs!
              </p>
            )}
            {include ? (
              <p className=" text-[24px] text-red-500 font-bold my-3">
                One of the nozzles is already connected to the tank!
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="w-[1430px] mt-5 mb-10">
        <StockTable header={header} visible={false} rows={stockRow} />
      </div>
    </div>
  );
};

export default Tank;
