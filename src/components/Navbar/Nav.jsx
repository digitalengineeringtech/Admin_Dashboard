import React, { useContext, useEffect, useState } from "react";
import "./nav.css";
import { LanguagePicker } from "./LanguagePicker";
import { IoLinkSharp } from "react-icons/io5";
import { localInstance } from "../../api/axios";
import useTokenStorage from "../../utils/useDecrypt";
import LoadContext from "../../services/LoadContext";
import UseGet2 from "../../api/hooks/UseGet2";
import UsePost from "../../api/hooks/UsePost";
import Swal from "sweetalert2";
import ErrorAlert from "../alert/ErrorAlert";
import UseGet from "../../api/hooks/UseGet";

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
          <button
            disabled={disabled}
            onClick={() => handleStartBtn(token)}
            // onClickCapture={handleCheckPostData}
            className="disabled:cursor-not-allowed hover:scale-105 flex gap-2 items-center active:scale-95 duration-100 select-none font-mono text-lg font-semibold py-3 bg-detail text-secondary px-4 rounded-lg text"
          >
            <IoLinkSharp className="text-2xl" />
            START
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
