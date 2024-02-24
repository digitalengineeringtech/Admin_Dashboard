import { useContext, useEffect, useState } from "react";
import TextInput from "../components/inputbox/TextInput";
import Button from "../components/inputbox/Button";
import useLogin from "../api/hooks/UseLogin";
import useTokenStorage from "../utils/useDecrypt";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../services/AuthContext";
import useLocalLogin from "../api/hooks/UseLocalLogin";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [inEmail, setInEmail] = useState();
  const [inPswd, setInPswd] = useState();
  const [pswd, setPswd] = useState();
  const [pErrorIn, setPErrorIn] = useState();
  const [eErrorIn, setEErrorIn] = useState();
  const [pError, setPError] = useState();
  const [eError, setEError] = useState();
  const [state, setState] = useState(true);
  const navigate = useNavigate();
  console.log("auth is", isAuth);

  const [{ data, loading, error }, fetchData] = useLogin();
  const [{ L_data, L_loading, L_error }, L_fetchData] = useLocalLogin();
  const { saveToken } = useTokenStorage();

  const chg = {
    open: { y: 0 },
    close: { y: "400px" },
  };
  const re = {
    open: { y: "-360px" },
    close: { y: 35 },
  };

  const handleInstallerSubmit = () => {
    if (email == null || pswd == null) {
      setEErrorIn("email require !");
      setPErrorIn("password require !");
    } else {
      setEErrorIn(null);
      setPErrorIn(null);
      const user = {
        email: inEmail,
        password: inPswd,
      };
      fetchData("user/login", user);
    }
  };
  console.log(email, pswd);
  const handleManagerSubmit = () => {
    if (inEmail == null || inPswd == null) {
      setEError("email require !");
      setPError("password require !");
    } else {
      setEError(null);
      setPError(null);
      const user = new FormData();
      user.append("email", email);
      user.append("password", pswd);
      L_fetchData("user/login", user);
    }
  };

  useEffect(() => {
    if (data.token) {
      console.log(data.token);
      saveToken(data.token);
      navigate("/");
      localStorage.setItem("installed", true);
      setIsAuth((pre) => !pre);
      setEmail("");
      setPswd("");
    }
    if (L_data.token) {
      console.log(L_data.token);
      saveToken(L_data.token);
      navigate("/");
      setIsAuth((pre) => !pre);
      setEmail("");
      setPswd("");
    }
  }, [data, loading, error, L_data, L_loading, L_error, saveToken, navigate]);
  // console.log(L_data);
  return (
    <div className="flex justify-center h-screen items-center login_bg">
      <div className="flex bg-secondary rounded-2xl w-[1000px] pt-6 pb-14 flex-col justify-center items-center">
        <div className=" w-full mb-10  ">
          <div className="border-b-2 mx-auto w-[80%] pb-4 border-detail/20">
            <img
              className="h-14 mx-auto"
              src="../../static/images/det_logo_dark.png"
              alt="dd"
            />
          </div>
        </div>
        <div className="flex  items-center w-full">
          <div className="w-[50%]  h-[400px] overflow-hidden items-center text-center ">
            <motion.div
              animate={state ? "open" : "close"}
              variants={chg}
              className="w-[90%] flex mt-[-350px] bg-secondary flex-col items-center gap-4 mx-auto   "
            >
              <div className="w-[100%] ms-6 mb-9 mx-auto">
                <img src="../../static/images/login_ill.jpg" alt="" />
              </div>
              <h1 className="text-3xl mb-2 text-detail font-semibold">
                LOGIN FORM
              </h1>
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email . . ."
              />
              {eError && (
                <div className="text-red-300 me-auto ms-[80px] mt-[-13px] mb-[-10px]">
                  {eError}
                </div>
              )}

              <TextInput
                value={pswd}
                onChange={(e) => setPswd(e.target.value)}
                type="password"
                placeholder="Enter your Password . . ."
              />
              {pError && (
                <div className="text-red-300 me-auto ms-[80px] mt-[-13px] mb-[-10px]">
                  {pError}
                </div>
              )}
              <Button
                text="LOGIN"
                // onClick={() => navigate("/")}
                onClick={() => handleManagerSubmit()}
                className="w-[315px] text-xl"
              />
              <div className="flex justify-center gap-6 items-center  w-[75%]">
                <hr width="130px" color="#38b59e" />
                <div className="flex text-gray-400"> or</div>
                <hr width="130px" color="#38b59e" size="10" />
              </div>
              <div className="text-gray-500">
                are you installer ?{" "}
                <span
                  onClick={() => setState((pre) => !pre)}
                  className="cursor-pointer text-detail"
                >
                  Installation
                </span>
              </div>
              <p className="text-text text-xs mt-3">
                © 2024 Digital Engineering Tech Ltd. All rights reserved.
              </p>
            </motion.div>
          </div>
          <div className="w-[50%]  h-[400px] overflow-hidden items-center text-center ">
            <motion.div
              animate={!state ? "open" : "close"}
              variants={re}
              className="w-[90%] flex  bg-secondary flex-col items-center gap-4 mx-auto   "
            >
              <div className="w-[100%] ml-[-30px] mb-12 mx-auto">
                <img src="../../static/images/login_ill.jpg" alt="" />
              </div>
              <h1 className="text-3xl mb-2 text-detail font-semibold">
                INSTALLER FORM
              </h1>
              <TextInput
                value={inEmail}
                onChange={(e) => setInEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email . . ."
              />
              {eError && (
                <div className="text-red-300 me-auto ms-[80px] mt-[-13px] mb-[-10px]">
                  {eErrorIn}
                </div>
              )}

              <TextInput
                value={inPswd}
                onChange={(e) => setInPswd(e.target.value)}
                type="password"
                placeholder="Enter your Password . . ."
              />
              {pError && (
                <div className="text-red-300 me-auto ms-[80px] mt-[-13px] mb-[-10px]">
                  {pErrorIn}
                </div>
              )}
              <Button
                text="LOGIN"
                onClick={() => handleInstallerSubmit()}
                className="w-[315px] text-xl"
              />
              <div className="flex justify-center gap-6 items-center  w-[75%]">
                <hr width="130px" color="#38b59e" />
                <div className="flex text-gray-400"> or</div>
                <hr width="130px" color="#38b59e" />
              </div>
              <div className="text-gray-500">
                are you user ?{" "}
                <span
                  onClick={() => setState((pre) => !pre)}
                  className="cursor-pointer text-detail"
                >
                  User Form
                </span>
              </div>
              <p className="text-text text-xs mt-3">
                © 2024 Digital Engineering Tech Ltd. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
