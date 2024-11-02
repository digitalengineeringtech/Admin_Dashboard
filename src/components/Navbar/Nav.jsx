import React, { useContext, useEffect, useState } from "react";
import "./nav.css";
import { LanguagePicker } from "./LanguagePicker";
import { IoLinkSharp } from "react-icons/io5";
import { localInstance } from "../../api/axios";
import useTokenStorage from "../../utils/useDecrypt";
import LoadContext from "../../services/LoadContext";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate, useNavigation } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ImCross } from "react-icons/im";
import TextInput from "../../components/inputbox/TextInput";
import useLocalLogin from "../../api/hooks/UseLocalLogin.jsx";


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
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState();
  const [pswd, setPswd] = useState();
  const [{ L_data, L_loading, L_error }, L_fetchData] = useLocalLogin();

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

  useEffect(() => {
    if(L_data.length > 0){
      navigate('admin')
    }
  }, [L_data, L_loading]);
  console.log(L_data, 'this is L_data')

  const handleLoginSubmit = () => {
    if (email == null || pswd == null) {
      // setEError("email require !");
      // setPError("password require !");
    } else {
      // setEError(null);
      // setPError(null);
      const user = new FormData();
      user.append("email", email);
      user.append("password", pswd);
      L_fetchData("user/login", user).catch(function (error) {
        console.log(error);
        // setErrorCommon("Something was wrong");
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
          <div
            onClick={open}
            className="hover:scale-105 flex gap-2 items-center active:scale-95 duration-100 select-none font-mono text-lg font-semibold py-3 bg-detail text-secondary px-4 rounded-lg text"
          >
            <RiAdminFill className="text-2xl" />
            To Admin Panel
          </div>
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
                // onClick={
                //   email !== undefined && pswd !== undefined
                //     ? ConAlert("Are you sure ?", handleClick)
                //     : () => ErrorAlert("Some Fields are Empty")
                // }
                onClick={handleLoginSubmit}
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
