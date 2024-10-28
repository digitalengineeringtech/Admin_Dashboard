import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/inputbox/TextInput";
import SelectDrop from "../components/SelectDrop";
import SearchButton from "../components/SearchButton";
import { Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ImCross } from "react-icons/im";
import UseGet from "../api/hooks/UseGet";
import UseGet3 from "../api/hooks/UseGet3";
import UseGet2 from "../api/hooks/UseGet2";
import { RiErrorWarningLine } from "react-icons/ri";
import useTokenStorage from "../utils/useDecrypt";
import { Link, Outlet } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import FilterTable from "../components/table/FilterTable";
// import FilterTable from "../../components/table/FilterTable";

const Admin = () => {
  // const [path, setPath] = useState();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [cusType, setCusType] = useState(); //drop
  const [vechicle, setVehicle] = useState(); //drop
  const [vehicleNo, setVehicleNo] = useState();
  const [debAmount, setDebAmount] = useState();
  const [debLiter, setDebLiter] = useState();
  const [creditType, setCreditType] = useState(); //drop
  const [dueDate, setDueDate] = useState(); //date (next 4months or 5months)
  const [limit, setLimit] = useState();
  const [opened, { open, close }] = useDisclosure(false);
  const [cus, setCus] = useState(false);
  const [token, setToken] = useState();
  const { loadToken } = useTokenStorage();

  const creditRoute = `http://localhost:9000/api/customer-credit`;
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();
  const [{ data_g_3, loading_g_3, error_g_3, pagi_g_3 }, fetchItGet3] =
    UseGet3();
  const [{ data_g_2, loading_g_2, error_g_2, pagi_g_2 }, fetchItGet2] =
    UseGet2();
  const [con, setCon] = useState(false);

  useEffect(() => {
    // fetchItGet(
    //   `detail-sale/pagi/by-date/1?sDate=${start}&eDate=${end}${purposeRoute}${fuelRoute}${nozzleRoute}${casherRoute}${carNo}${cash}`,
    //   token
    // );
    // fetchItGet2(
    //   `detail-sale/without-pagi/by-date?sDate=${start}&eDate=${end}${purposeRoute}${fuelRoute}${nozzleRoute}${casherRoute}${carNo}${cash}`,
    //   token
    // );
    fetchItGet3(creditRoute, token);
    console.log("hello");
  }, [con]);

  const totalSale = data_g_2
    ?.filter((e) => e?.cashType == "Credit Card")
    ?.map((e) => e.saleLiter)
    .reduce((pv, cv) => pv + cv, 0);

  const creditHeader = [
    "No.",
    "Customer Name",
    "Customer ID",
    "Vehicle No.",
    "Phone No.",
    "Address",
    "NRC",
    "Vehicle Type",
    "Credit Type",
    "Debit Amount",
    "Debit Liter",
    "Limited Amount",
    "Registered Date",
    "Due Date",
    "Action",
  ];

  const tableRef = useRef(null);

  console.log({
    name,
    phone,
    cusType: cusType?.value,
    vechicle: vechicle?.value,
    vehicleNo,
    debAmount,
    debLiter,
    creditType: creditType?.value,
    dueDate,
    limit,
  });
  useEffect(() => {
    // if (data_g?.length > 0) {
    //   setIsData(true);
    //   // setRef(tableRef);
    // } else {
    //   setIsData(false);
    // }
    if (data_g_3?.length > 0) {
      setCus(true);
      // setRef(tableRef);
    } else {
      setCus(false);
    }
  }, [data_g, data_g_3, loading_g, error_g, fetchItGet]);

  const tab = (
    <Table.Tr
      //  style={
      //    element.asyncAlready == "2" && {
      //      backgroundColor: "#B8E5FF30",
      //    }
      //  }
      className="hidden duration-150 text-sm text-center"
    >
      <Table.Td>Total Sale</Table.Td>
      <Table.Td>
        {totalSale.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}{" "}
        kyats
      </Table.Td>
    </Table.Tr>
  );

  const creditRow = data_g_3?.map((element, index) => (
    <Table.Tr
      key={index}
      style={
        element.asyncAlready == "2" && {
          backgroundColor: "#B8E5FF30",
        }
      }
      className=" duration-150 text-sm text-center"
    >
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.customer.cusName}</Table.Td>
      <Table.Td>hello</Table.Td>
      <Table.Td>{element.customer.cusCarNo}</Table.Td>
      <Table.Td>{element.customer.cusPhone}</Table.Td>
      <Table.Td>Yangon</Table.Td>
      <Table.Td>12/yapatha(N)140923</Table.Td>
      <Table.Td>{element.customer.cusVehicleType}</Table.Td>
      <Table.Td>{element.creditType}</Table.Td>
      <Table.Td>{element.customer.cusDebAmount}</Table.Td>
      <Table.Td>{element.customer.cusDebLiter}</Table.Td>
      <Table.Td>{element.limitAmount}</Table.Td>
      <Table.Td>{element.createdAt.slice(0, 10)}</Table.Td>
      <Table.Td>{element.creditDueDate.slice(0, 10)}</Table.Td>
      <Table.Td>
        <div
          onClick={() => open()}
          // to={`/customer_list/edit/${element.customer._id}`}

          className="flex items-center active:scale-90 duration-100 justify-center w-10 h-10 rounded-full bg-red-300"
        >
          <TbEdit className="text-xl font-bold" />
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    // setPath(location.pathname);
    // navigate("/");
    // console.log(location.pathname, "this is path name");
    // if ((location.pathname = "/admin")) {
    //   !localStorage.getItem("admin") && navigate("/");
    // }

    if (localStorage.getItem("admin") != "true") navigate("/");
    console.log(
      location.pathname,
      "this is path",
      localStorage.getItem("admin")
    );
  }, []);

  const cusTypeData = [
    {
      label: "Credit",
      value: "Credit Card",
    },
    {
      label: "Credit ",
      value: "Credit Card",
    },
  ];

  const creditTypeData = [
    {
      label: "Limit Amount",
      value: "Limit Amount ",
    },
    {
      label: "Credit ",
      value: "Credit Card",
    },
  ];

  const vehicles = [
    // { label: "All", value: "" },
    { label: "Cycle", value: "Cycle" },
    { label: "Cycle ( 3 Wheels )", value: "Cycle ( 3 Wheels )" },
    { label: "Car", value: "Car" },
    { label: "Bus ( City )", value: "Bus ( City )" },
    { label: "Bus ( High Way )", value: "Bus ( High Way )" },
    { label: "Light Truck ( City )", value: "Light Truck ( City )" },
    { label: "Light Truck ( High way )", value: "Light Truck ( High way )" },
    { label: "Heavy Truck ( City )", value: "Heavy Truck ( City )" },
    { label: "Heavy Truck ( High way )", value: "Heavy Truck ( High way )" },
    { label: "Trailer ( City )", value: "Trailer ( City )" },
    { label: "Trailer ( High way )", value: "Trailer ( High way )" },
    { label: "Htawlargyi", value: "Htawlargyi" },
    { label: "Tractor", value: "Tractor" },
    { label: "Small Tractor", value: "Small Tractor" },
    { label: "Heavy Machinery", value: "Heavy Machinery" },
    { label: "Commercial Vehicle", value: "Commercial Vehicle" },
  ];

  return (
    <div className="mt-28">
      <SearchButton title="Create" onClick={() => open()} />
      <div className="">
        {cus ? (
          <div className="mt-8 mb-2">
            <FilterTable
              tab={tab}
              tableRef={tableRef}
              header={creditHeader}
              rows={creditRow}
              //   totalSale={totalSale}
            />
          </div>
        ) : (
          <div className="w-full h-[250px] gap-5 text-detail/50 flex items-center justify-center border-2 border-detail/40 mt-10 rounded-xl">
            <div className="flex items-center gap-4">
              <RiErrorWarningLine className="text-[6rem]" />
              <div className="font-mono text-[2.5rem]">NO DATA FOUND</div>
            </div>
          </div>
        )}
      </div>
      <Modal
        opened={opened}
        radius={20}
        size={1500}
        centered
        withCloseButton={false}
      >
        <div className="flex border-b mb-4 border-gray-300 pb-3 items-end">
          <div className="text-2xl select-none text-text font-semibold font-sans">
            Nozzle Information
          </div>
          <div
            onClick={() => {
              close();
            }}
            className="w-12 h-12 rounded-full ms-auto  bg-danger text-secondary hover:border-2 border-2 border-danger hover:border-danger duration-100 hover:bg-transparent hover:text-danger flex items-center justify-center"
          >
            <ImCross />
          </div>
        </div>
        <div className="bg-white flex justify-between gap-x-2 flex-wrap gap-y-6 rounded-6 p-8">
          <SelectDrop
            placeholder="Please Select"
            label="Customer Type"
            data={cusTypeData}
            value={cusType}
            setValue={setCusType}
          />
          <SelectDrop
            placeholder="Please Select"
            label="Credit Type"
            data={creditTypeData}
            value={creditType}
            setValue={setCreditType}
          />
          <SelectDrop
            placeholder="Please Select"
            label="Vehicle Type"
            data={vehicles}
            value={vechicle}
            setValue={setVehicle}
          />
          <TextInput
            style="!w-[300px]"
            label="Customer Name"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            style="!w-[300px]"
            label="Phone Number"
            placeholder="Phone Number "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextInput
            style="!w-[300px]"
            label="Vehicle Number"
            placeholder="Vehicle Number"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
          />
          <TextInput
            style="!w-[300px]"
            label="Deb Amount"
            placeholder="Deb Amount"
            value={debAmount}
            onChange={(e) => setDebAmount(Number(e.target.value))}
          />

          <TextInput
            style="!w-[300px]"
            label="Deb Liter"
            placeholder="Deb Liter"
            value={debLiter}
            onChange={(e) => setDebLiter(Number(e.target.value))}
          />
          <TextInput
            style="!w-[300px]"
            label="Limit Amount"
            placeholder="Limit Amount"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
          <TextInput
            style="!w-[300px]"
            label="Due Date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <SearchButton
            title="Create"
            onClick={() => {
              fetchItGet(route, token), fetchItGet2(route2, token);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
