import React, { useEffect, useState } from "react";
import SelectDrop from "../../components/SelectDrop";
import Button from "../../components/installer/Button";
import useTokenStorage from "../../utils/useDecrypt";
import UsePost from "../../api/hooks/UsePost";
import ErrorAlert from "../../components/alert/ErrorAlert";
import TextInput from "../../components/inputbox/TextInput";
import stationData from "../../testBeforeApi/data/station";
import ConAlert from "../../components/alert/ConAlert";
import Swal from "sweetalert2";

const Cashier = () => {
  const [cCode, setCCode] = useState("");
  const [email, setEmail] = useState("");
  const [cardId, setCardId] = useState("");
  const [nrcNo, setNrcNo] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [ComPassword, setComPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);
  const [stationNo, setStationNo] = useState("");
  const [stationId, setStationId] = useState("6464e9d2c45b82216ab1e654");

  const [{ data, loading, error }, fetchIt] = UsePost();

  const { loadToken } = useTokenStorage();

  const handleClick = () => {
    if (
      cCode === "" ||
      email === "" ||
      phone === "" ||
      cardId === "" ||
      nrcNo === "" ||
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
          email: email,
          phone: phone,
          password: password,
          comparePassword: ComPassword,
          stationNo: stationNo,
          stationId: stationId,
          cardId: cardId,
          nrcNo: nrcNo,
        };
        console.log(managerObj);
        fetchIt("user/register", managerObj, token);
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
    console.log(error);
    if (data.con) {
      setCCode("");
      setEmail("");
      setCardId("");
      setNrcNo("");
      setPhone("");
      setPassword("");
      setComPassword("");
      setStationNo("");
      setSuccess(true);
    }
  }, [data, loading, error]);

  success &&
    Swal.fire({
      title: "Created Successfully !",
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
  // : ErrorAlert("Failed to create !");

  return (
    <div className="flex flex-col   items-center">
      <div className="font-mono bg-secondary shadow-shadow/20 shadow-md px-10 rounded-xl  items-center flex gap-6 ms-3 mb-6 font-semibold text-3xl py-6">
        <img
          src="../../../public/static/images/cashier.png"
          alt=""
          className="h-16"
        />
        <div className="text-text">Cashier Setup</div>
      </div>
      <div className="w-[1320px] shadow-shadow/20 shadow-md rounded-2xl p-6 flex flex-col gap-6 gap-y-4 bg-white">
        <div className="flex flex-col gap-y-6 gap-x-16 justify-between">
          <div className="flex gap-x-14 justify-between">
            {/* <SelectDrop
              label="Station Id"
              data={stationData()}
              value={stationId}
              setValue={setStationId}
            /> */}
            <TextInput
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              style="!w-[300px]"
              label="Station Id"
              placeholder="Station Id"
            />
            <TextInput
              value={cCode}
              onChange={(e) => setCCode(e.target.value)}
              style="!w-[300px]"
              label="Cashier Code"
              placeholder="Cashier Code"
            />
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style="!w-[300px]"
              label="Email"
              placeholder="Email"
            />
            <TextInput
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style="!w-[300px]"
              label="Phone"
              placeholder="Phone"
            />
          </div>
          <div className="flex gap-x-14 justify-between">
            <TextInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style="!w-[300px]"
              label="Password"
              placeholder="Password"
            />
            <TextInput
              value={ComPassword}
              onChange={(e) => setComPassword(e.target.value)}
              style="!w-[300px]"
              label="Comfirmation Password"
              placeholder="Comfirmation Password"
            />
            <TextInput
              value={stationNo}
              onChange={(e) => setStationNo(e.target.value)}
              style="!w-[300px]"
              label="Station Number"
              placeholder="Station Number"
            />
            <TextInput
              value={cardId}
              onChange={(e) => setCardId(e.target.value)}
              style="!w-[300px]"
              label="Card Id"
              placeholder="Card Id"
            />
          </div>
          <div className="flex gap-x-14 justify-start">
            <TextInput
              value={nrcNo}
              onChange={(e) => setNrcNo(e.target.value)}
              style="!w-[275px]"
              label="NRC No"
              placeholder="NRC No"
            />
            <Button
              title="SET UP"
              // onClick={Alert("Are you sure ?", () => {
              //   console.log(dis.value, noz.value, fuel.value, brand.value);
              // })}
              onClick={
                cCode !== "" ||
                email !== "" ||
                phone !== "" ||
                cardId !== "" ||
                nrcNo !== "" ||
                password !== "" ||
                stationId !== "none" ||
                stationNo !== "" ||
                ComPassword !== ""
                  ? ConAlert("Are you sure ?", data.con, handleClick)
                  : () => ErrorAlert("Some Fields are Empty")
              }
              style=" bg-detail mt-auto w-[275px] border border-detail text-secondary"
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

export default Cashier;
