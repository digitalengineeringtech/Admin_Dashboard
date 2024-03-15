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
import UseCloudPost from "../../api/hooks/UseCloudPost";
import ConAlert from "../../components/alert/ConAlert";

const InstallerManager = () => {
  const [cCode, setCCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [ComPassword, setComPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);
  const [stationNo, setStationNo] = useState("");
  const [stationId, setStationId] = useState("none");

  const [{ data, loading, error }, fetchIt] = UsePost();
  const [{ data_c_post, loading_c_post, error_c_post }, postToCloud] =
    UseCloudPost();
  const { loadToken } = useTokenStorage();

  const handleClick = () => {
    if (
      cCode === "" ||
      name === "" ||
      phone === "" ||
      password === "" ||
      stationId === "none" ||
      stationNo === "" ||
      ComPassword === ""
    ) {
      setValid(true);
    } else {
      setValid(false);
      const token = loadToken();
      if (token) {
        const managerObj = {
          name: cCode,
          email: name,
          phone: phone,
          password: password,
          comparePassword: ComPassword,
          stationNo: stationNo,
          stationId: stationId._id,
        };
        console.log(managerObj);
        fetchIt("user/register", managerObj, token);
        postToCloud("temp/new", { email: name, password: password }, token);
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSuccess(false);
    }, 2000); // Update the values every second

    return () => {
      clearInterval(interval);
    };
  }, [success]);

  useEffect(() => {
    setLoad(loading_c_post);
    console.log(error);
    if (data.con && data_c_post.con) {
      setCCode("");
      setName("");
      setPhone("");
      setPassword("");
      setComPassword("");
      setStationNo("");
      setStationId("none");
      setSuccess(true);
    }
  }, [data, loading, error, error_c_post, data_c_post, loading_c_post]);

  return (
    <div className="flex flex-col   items-center">
      <div className="font-mono bg-secondary shadow-shadow/20 shadow-md px-10 rounded-xl  items-center flex gap-6 ms-3 mb-6 font-semibold text-3xl py-6">
        <img
          src="../../../public/static/images/manager.png"
          alt=""
          className="h-16"
        />
        <div className="text-text">Manager Setup</div>
      </div>
      <div className="w-[1320px] shadow-shadow/20 shadow-md rounded-2xl p-6 flex flex-col gap-6 gap-y-4 bg-white">
        <div className="flex flex-col gap-y-6 gap-x-16 justify-between">
          <div className="flex gap-x-14 justify-between">
            <SelectDrop
              label="Station Id"
              data={stationData()}
              value={stationId}
              setValue={setStationId}
            />
            <TextInput
              onChange={(e) => setCCode(e.target.value)}
              style="!w-[300px]"
              label="Cashier Code"
              placeholder="Cashier Code"
            />
            <TextInput
              onChange={(e) => setName(e.target.value)}
              style="!w-[300px]"
              label="Name"
              placeholder="Name"
            />
            <TextInput
              onChange={(e) => setPhone(e.target.value)}
              style="!w-[300px]"
              label="Phone"
              placeholder="Phone"
            />
          </div>
          <div className="flex gap-x-14 justify-between">
            <TextInput
              onChange={(e) => setPassword(e.target.value)}
              style="!w-[300px]"
              label="Password"
              placeholder="Password"
            />
            <TextInput
              onChange={(e) => setComPassword(e.target.value)}
              style="!w-[300px]"
              label="Comfirmation Password"
              placeholder="Comfirmation Password"
            />
            <TextInput
              onChange={(e) => setStationNo(e.target.value)}
              style="!w-[300px]"
              label="Station Number"
              placeholder="Station Number"
            />
            <Button
              title="SET UP"
              // onClick={Alert("Are you sure ?", () => {
              //   console.log(dis.value, noz.value, fuel.value, brand.value);
              // })}
              onClick={
                cCode !== "" ||
                name !== "" ||
                phone !== "" ||
                password !== "" ||
                stationId !== "none" ||
                stationNo !== "" ||
                ComPassword !== ""
                  ? ConAlert("Are you sure ?", success, handleClick)
                  : () => ErrorAlert("Some Fields are Empty")
              }
              style=" bg-detail mt-auto w-[300px] border border-detail text-secondary"
            />
          </div>
        </div>
        <div className="flex justify-end gap-6">
          {/* <Button
            title="RESET"
            onClick={DeleteAlert("Are you sure to Reset ?", handleReset)}
            style="border text-red-500 border-red-400 bg-secondary"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default InstallerManager;
