import React, { useContext, useEffect, useState } from "react";
import "./nav.css";
import { LanguagePicker } from "./LanguagePicker";
import { IoLinkSharp } from "react-icons/io5";
import { localInstance } from "../../api/axios";
import useTokenStorage from "../../utils/useDecrypt";
import LoadContext from "../../services/LoadContext";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate, useNavigation } from "react-router-dom";

const Nav = ({ title }) => {
  const { loading, setLoading } = useContext(LoadContext);
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = async (token) => {
    console.log(token, "lllllllllllllllllllllllllllll");
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
    console.log(response);
    setLoading(false);
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
          <div
            onClick={() => navigate("/admin")}
            className="hover:scale-105 flex gap-2 items-center active:scale-95 duration-100 select-none font-mono text-lg font-semibold py-3 bg-detail text-secondary px-4 rounded-lg text"
          >
            <RiAdminFill className="text-2xl" />
            To Admin Panel
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
