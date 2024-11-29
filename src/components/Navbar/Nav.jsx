import React, { useContext, useEffect, useState } from "react";
import "./nav.css";
import { LanguagePicker } from "./LanguagePicker";
import { IoLinkSharp } from "react-icons/io5";
import { localInstance } from "../../api/axios";
import useTokenStorage from "../../utils/useDecrypt";
import LoadContext from "../../services/LoadContext";
// <<<<<<< HPH
import UseGet2 from "../../api/hooks/UseGet2";
import UsePost from "../../api/hooks/UsePost";
import Swal from "sweetalert2";
import ErrorAlert from "../alert/ErrorAlert";
import UseGet from "../../api/hooks/UseGet";
// =======
import { RiAdminFill } from "react-icons/ri";
import { useNavigate, useNavigation } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ImCross } from "react-icons/im";
import TextInput from "../../components/inputbox/TextInput";
import useLocalLogin from "../../api/hooks/UseLocalLogin.jsx";
// >>>>>>> sixKendra

const Nav = ({ title }) => {
  const { loading, setLoading } = useContext(LoadContext);
  const [{ data_g_2, loading_g_2, error_g_2 }, fetchItGet2] = UseGet2();
  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();
  const [{ data, error }, fetchIt] = UsePost();
  const [disabled, setDisabled] = useState(false);

  let start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  const [sDate, setSDate] = useState(start);
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState();
  const [pswd, setPswd] = useState();
  const [{ L_data, L_loading, L_error }, L_fetchData] = useLocalLogin();

  const navigate = useNavigate();

  const handleClick = async (token) => {
    // console.log(token, "lllllllllllllllllllllllllllll");
    setLoading(true);
    const response = await localInstance.post(
      "/device-connection/whreq",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
// <<<<<<< HPH
    // console.log(response);
    setLoading(false);
  };

  // let createdTime = new Date();
  // createdTime = createdTime.toLocaleDateString("fr-CA");
  // // console.log(createdTime);
  // const dateFilter = data_g?.filter((i) => i.createAt == createdTime);

  // useEffect(() => {
  //   fetchItGet(`/fuel-balance/by-one-date?sDate=${sDate}`, token);
  //   console.log("hhhahahahahh");

  //   // console.log(
  //   //   data_g,
  //   //   dateFilter,
  //   //   "..........gg..............................."
  //   // );
  //   //  if (dateFilter.length !== 0) {
  //   //   setDisabled(true)
  //   // }
  //   console.log(data_g, "This is data_g");
  // }, [token, sDate]);

  // console.log(data_g,dateFilter, "This is data_g and dateFilter");
  // console.log(data, "This is data")

  // useEffect(()=>{
  //   console.log('wkwkwk')
  //   console.log(dateFilter)
  //   dateFilter.length !== 0 && setDisabled(true)
  // },[data_g])

  useEffect(() => {
    fetchItGet2(`/user`, token);
  }, [token]);

  useEffect(() => {
    fetchItGet(`/fuel-balance/by-one-date?sDate=${sDate}`, token);
  }, [token, sDate]);

  console.log(data_g, "This is data_g");

  useEffect(() => {
    if (data.result === "Today fuel balance already calculated") {
      setDisabled(true);
      Swal.fire({
        title: "Today Fuel Balance is already Calculated!",
        icon: "info",
        customClass: {
          confirmButton:
            "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
        },
      });
    }
  }, [data.result]);
  console.log(data, "This is post data");

  const handleStartBtn = (token) => {
    let createdTime = new Date();
    createdTime = createdTime.toLocaleDateString("fr-CA");

    const startObj = {
      stationId: data_g_2[0].stationId,
      createAt: createdTime,
      tankCount: data_g_2[0].tankCount,
    };

    // fetchIt(`/fuelin/check/fuel-balance`, startObj, token);

    const dateFilter = data_g?.filter((i) => i.createAt == createdTime);
    console.log(dateFilter, "This is dateFilter");

    if (dateFilter.length === 0) {
      Swal.fire({
        title: "Are You Sure?",
        icon: "warning",
        iconColor: "#33b0f9",
        buttonsStyling: false,
        width: "25em",
        color: "#33b0f9",
        heightAuto: false,
        background: "#ffffff",
        focusConfirm: true,
        rounded: "xl",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        customClass: {
          cancelButton:
            "bg-secondary text-red-400 rounded-lg border-2 border-red-400 hover:border-red-400 hover:text-secondary duration-150 hover:bg-red-400 w-[35%] font-mono py-2",
          confirmButton:
            "bg-transparent text-detail rounded-lg border-2 border-detail w-[35%] font-mono py-2 border-detail hover:text-secondary duration-150 hover:bg-detail",
          actions: " !mt-4 !w-[100%] flex justify-center gap-9",
          icon: "!p-0 !mt-35",
          title: "!mt-0 !pt-0",
        },
        cancelButtonText: "No",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchIt(`/fuelin/check/fuel-balance`, startObj, token);
          data_g
            ? Swal.fire({
                title: "Today Fuel Balance is Calculated!",
                icon: "success",
                buttonsStyling: false,
                iconColor: "#33b0f9",
                color: "#33b0f9",
                width: "25em",
                background: "#ffffff",
                customClass: {
                  title: "text-white",
                  confirmButton:
                    "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
                },
              })
            : ErrorAlert("Failed to create !");
        } else if (result.isDenied) {
          Swal.close();
        }
      });
    } else {
      setDisabled(true);
      Swal.fire({
        title: "Today Fuel Balance is already Calculated!",
        icon: "info",
        customClass: {
          confirmButton:
            "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
        },
      });
    }
  };
// =======
    console.log(response);
    setLoading(false);
  };

  const handleSubmit = async (token) => {
    console.log(token, "lllllllllllllllllllllllllllll");
    setLoading(true);
    const user = new FormData();
    user.append("email", email);
    user.append("password", pswd);
    const response = await localInstance
      .post("user/login", user, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(typeof response.data.con);
        if (response.data.con == true) {
          navigate("admin");
          close();
        } else {
          alert("Invalid email or password");
        }
      });
    console.log(response, "this is response object");
    setLoading(false);
  };

  // useEffect(() => {
  //   if (L_data.length > 0) {
  //     navigate("admin");
  //   }
  // }, [L_data, L_loading]);
  // console.log(L_data, "this is L_data");
// >>>>>>> sixKendra

  const path = window.location.pathname;

  // console.log(token);

  // .post(url, user, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  return (
    <div className="xl:w-[91%] w-[88%] z-40 2xl:w-[92%] mb-6 absolute">
      <div className="w-full nav_bg shadow-xl shadow-detail/10  items-center flex justify-between px-8 rounded-lg h-20">
        <div className="text-[1.7rem] text-text font-bold font-sans">
          {title}
        </div>
        {/* <div className="">
          <LanguagePicker />
        </div> */}
        {path == "/device" && (
          <div
            onClick={() => handleClick(token)}
            className="hover:scale-105 flex gap-2 items-center active:scale-95 duration-100 select-none font-mono text-lg font-semibold py-3 bg-detail text-secondary px-4 rounded-lg text"
          >
            <IoLinkSharp className="text-2xl" />
            CONNECT
          </div>
        )}
        {path == "/" && (
// <<<<<<< HPH
          <button
            disabled={disabled}
            onClick={() => handleStartBtn(token)}
            // onClickCapture={handleCheckPostData}
            className="disabled:cursor-not-allowed hover:scale-105 flex gap-2 items-center active:scale-95 duration-100 select-none font-mono text-lg font-semibold py-3 bg-detail text-secondary px-4 rounded-lg text"
          >
            <IoLinkSharp className="text-2xl" />
            START
          </button>
// =======
          <div
            // onClick={open}
            onClick={() => navigate("admin")}
            className="hover:scale-105 flex gap-2 items-center active:scale-95 duration-100 select-none font-mono text-lg font-semibold py-3 bg-detail text-secondary px-4 rounded-lg text"
          >
            <RiAdminFill className="text-2xl" />
            To Admin Panel
          </div>
// >>>>>>> sixKendra
        )}
      </div>
      <Modal
        opened={opened}
        radius={20}
        size={700}
        centered
        withCloseButton={false}
      >
        <div className="flex  border-b mb-4 border-gray-300 pb-3 items-end">
          <div className="flex justify-between items-center">
            <div className="text-2xl ms-4 select-none text-text font-semibold font-sans">
              Authorization
            </div>
            {/*{err && (*/}
            {/*    <div className="text-red-500 ms-10">Something was wrong !</div>*/}
            {/*)}*/}
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
        <div className=" px-4">
          <div className="flex justify-between">
            <div className="flex mb-4 justify-between">
              <div className="">
                <TextInput
                  style="!w-[300px]"
                  label="Email "
                  placeholder="Email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <TextInput
                  style="!w-[300px]"
                  label="Password"
                  placeholder="Password"
                  value={pswd}
                  onChange={(e) => setPswd(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-between">
            <button
              onClick={() => {
                // navigate("admin");
                // close();
                handleSubmit(token);
              }}
              // onClick={handleLoginSubmit}
              className={`w-[300px] ml-auto mt-2 text-secondary  items-center justify-center gap-3 flex  font-mono text-xl active:scale-95 duration-100 bg-detail h-[56px] rounded-md`}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Nav;
