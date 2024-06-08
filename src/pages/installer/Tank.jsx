import React, { useEffect, useState } from "react";
import SelectDrop from "./SelectDrop";
import dispenser from "./drop_data/dispenser";
import fuelType from "./drop_data/fuel";
import brandType from "./drop_data/brand";
import nozzle from "./drop_data/nozzle";
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

const Tank = () => {
  const header = [
    "No",
    "Nozzle No",
    "Fuel Type",
    "Totalizer Amount",
    "Totalizer Liter",
    "Button",
  ];
  console.log(stationData());

  const [token, setToken] = useState("none");
  const [amount, setAmount] = useState("none");
  const [noz, setNoz] = useState("none");
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
  const [yesterday, setYesterday] = useState();

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
      fetchItGet("/balance-statement?reqDate=2024-06-08", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);

  useEffect(() => {
    console.log(data_g, loading_g, error_g);
    setOkData(data_g);
    // setLoad(loading_g);
  }, [data_g, loading_g, error_g, data]);

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
    fetchItGet("/balance-statement?reqDate=2024-06-08", token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(okData, error, "..................");

  useEffect(() => {
    // console.log(data_g,error_g)
    setOkData(data_g);
    // setLoad(loading_g);
  }, [data_g, loading_g, error_g]);

  // Swal.fire("SweetAlert2 is working!");
  const handleAdd = () => {
    if (fuel === "none" || open === "none" || yesterday == "none") {
      setValid(true);
    } else {
      setValid(false);
      const data = {
        openingBalance: open,
        yesterdayTank: yesterday,
        fuelType: fuel.name,
      };
      console.log("nniniiinniniinnninii");
      fetchIt("/balance-statement", data, token);
      console.log("wkkkkk");
    }
  };

  // console.log(error, token);

  const handleDelete = async (id) => {
    await deleteIt(`detail-sale?_id=${id}`, token);
    fetchItGet("/balance-statement?reqDate=2024-06-08");
  };
  console.log(data_g, "....................");
  
  const stockRow = okData?.map((element, index) => (
    <Table.Tr key={element._id} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.nozzleNo}</Table.Td>
      <Table.Td>{element.fuelType}</Table.Td>
      <Table.Td>{element.totalizer_amount}</Table.Td>
      <Table.Td>{element.totalizer_liter}</Table.Td>
      <Table.Td
        onClick={DeleteAlert("Are you sure to Remove ?", () =>
          handleDelete(element._id)
        )}
        className="bg-red-400 text-white cursor-pointer duration-75 select-none active:scale-95"
      >
        <div>REMOVE</div>
      </Table.Td>
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
        <div className="text-text">Tank Setup</div>
      </div>
      <div className="w-[1320px] shadow-shadow/20 shadow-md rounded-2xl p-6 flex flex-col gap-6 gap-y-4 bg-white">
        <div className="flex gap-x-10 justify-between">
          <SelectDrop
            label="Fuel Type"
            data={fuelType}
            value={fuel}
            setValue={setFuel}
          />
          <TextInput
            onChange={(e) => setOpen(e.target.value)}
            style="!w-[300px]"
            label="Opening Balance"
            placeholder="Amount"
          />
          <TextInput
            onChange={(e) => setYesterday(e.target.value)}
            style="!w-[300px]"
            label="Yesterday Tank"
            placeholder="Amount"
          />
          {/* <TextInput
            onChange={(e) => setLiter(e.target.value)}
            style="!w-[300px]"
            label="Totalizer Liter"
            placeholder="Liter"
          />

          <SelectDrop
            label="Station No"
            // data={stationData()}
            data={listStation}
            value={station}
            setValue={setStation}
          /> */}

          {/* <SelectDrop
            label="Nozzle No"
            data={nozzle}
            value={noz}
            setValue={setNoz}
          /> */}
          <div className="flex mt-auto justify-end gap-6">
            {/* <Button
            title="RESET"
            onClick={DeleteAlert("Are you sure to Reset ?", handleReset)}
            style="border text-red-500 border-red-400 bg-secondary"
          /> */}
            <Button
              title="SET UP"
              // onClick={Alert("Are you sure ?", () => {
              //   console.log(dis.value, noz.value, fuel.value, brand.value);
              // })}
              onClick={
                noz !== "none" ||
                amount !== "none" ||
                fuel !== "none" ||
                station !== "none" ||
                liter !== "none"
                  ? Alert("Are you sure ?", handleAdd)
                  : () => ErrorAlert("Some Fields are Empty")
              }
              style=" bg-detail border w-[220px] border-detail text-secondary"
            />
          </div>
        </div>
      </div>
      <div className="w-[1300px] mt-5 mb-10">
        <StockTable header={header} visible={false} rows={stockRow} />
      </div>
    </div>
  );
};

export default Tank;
