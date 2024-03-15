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

const Device = () => {
  const header = [
    "No",
    "Dispenser No",
    "Nozzle No",
    "Fuel Type",
    "Brand Type",
    "Action",
  ];

  const [token, setToken] = useState("none");
  const [dis, setDis] = useState("none");
  const [noz, setNoz] = useState("none");
  const [fuel, setFuel] = useState("none");
  const [brand, setBrand] = useState("none");
  const [okData, setOkData] = useState([]);
  const [valid, setValid] = useState(false);
  const { loadToken } = useTokenStorage();
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const [{ data_d, loading_d, error_d }, deleteIt] = UseDelete();
  const [{ data, loading, error }, fetchIt] = UsePost();

  useEffect(() => {
    if (data.con === true) {
      setDis("none");
      setNoz("none");
      setFuel("none");
      setBrand("none");
      fetchItGet("device", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);

  useEffect(() => {
    if (data_d?.con) {
      setOkData([]);
    }
  }, [data_d, loading_d, error_d]);

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
    fetchItGet("device", token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(okData);

  useEffect(() => {
    // console.log(data_g,error_g)
    if (data_g) {
      setOkData(data_g);
    }
  }, [data_g, loading_g, error_g]);

  // Swal.fire("SweetAlert2 is working!");
  const handleAdd = () => {
    if (
      noz === "none" ||
      dis === "none" ||
      fuel === "none" ||
      brand === "none"
    ) {
      setValid(true);
    } else {
      setValid(false);
      const user = {
        dep_no: dis.value,
        nozzle_no: noz.value,
        fuel_type: fuel.value,
        dep_type: brand.value,
      };
      fetchIt("device", user, token);
      // console.log(user);
    }
  };

  const handleReset = async () => {
    await deleteIt("device", token);
    fetchItGet("device", token);
  };

  const stockRow = okData?.map((element, index) => (
    <Table.Tr key={element._id} className=" duration-150 text-center">
      <Table.Td>{index}</Table.Td>
      <Table.Td>{element.dep_no}</Table.Td>
      <Table.Td>{element.nozzle_no}</Table.Td>
      <Table.Td>{element.fuel_type}</Table.Td>
      <Table.Td>{element.dep_type}</Table.Td>
      <Table.Td
        onClick={() => console.log(element._id)}
        className="bg-detail text-white cursor-pointer duration-75 select-none active:scale-95"
      >
        <div>EDIT</div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="flex flex-col   items-center">
      <div className="font-mono bg-secondary shadow-shadow/20 shadow-md px-10 rounded-xl  items-center flex gap-4 ms-3 mb-6 font-semibold text-3xl py-6">
        <img
          src="../../../public/static/images/gasoline.png"
          alt=""
          className="h-16"
        />
        <div className="">Device Setup</div>
      </div>
      <div className="w-[1320px] shadow-shadow/20 shadow-md rounded-2xl p-6 flex flex-col gap-y-4 gap-6 bg-white">
        <div className="flex justify-between">
          <SelectDrop
            label="Dispenser No"
            data={dispenser}
            value={dis}
            setValue={setDis}
          />
          <SelectDrop
            label="Nozzle No"
            data={nozzle}
            value={noz}
            setValue={setNoz}
          />
          <SelectDrop
            label="Fuel Type"
            data={fuelType}
            value={fuel}
            setValue={setFuel}
          />
          <SelectDrop
            label="Brand Type"
            data={brandType}
            value={brand}
            setValue={setBrand}
          />
        </div>
        <div className="flex justify-between gap-6">
          <Button
            title="RESET"
            onClick={DeleteAlert("Are you sure to Reset ?", handleReset)}
            style="border text-red-500 border-red-400 bg-secondary"
          />
          <Button
            title="SET UP"
            // onClick={Alert("Are you sure ?", () => {
            //   console.log(dis.value, noz.value, fuel.value, brand.value);
            // })}
            onClick={
              noz !== "none" ||
              dis !== "none" ||
              fuel !== "none" ||
              brand !== "none"
                ? Alert("Are you sure ?", handleAdd)
                : () => ErrorAlert("Some Fields are Empty")
            }
            style=" bg-detail border border-detail text-secondary"
          />
        </div>
      </div>
      <div className="w-[1300px] mt-5 mb-10">
        <StockTable header={header} rows={stockRow} />
      </div>
    </div>
  );
};

export default Device;
