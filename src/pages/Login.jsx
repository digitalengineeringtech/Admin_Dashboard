import { useState } from "react";
import TextInput from "../components/inputbox/TextInput";
import Button from "../components/inputbox/Button";

const Login = () => {
  const [email, setEmail] = useState();
  const [pswd, setPswd] = useState();
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
          <div className="w-[50%] items-center text-center ">
            <div className="w-[90%] flex flex-col items-center gap-4 mx-auto   ">
              <h1 className="text-3xl mb-2 text-detail font-semibold">
                LOGIN FORM
              </h1>
              <TextInput
                value={email}
                onChange={(e) => console.log(e.target.value)}
                type="text"
                placeholder="Enter your Email . . ."
              />
              <TextInput
                value={email}
                onChange={(e) => console.log(e.target.value)}
                type="text"
                placeholder="Enter your Password . . ."
              />
              <Button
                text="LOGIN"
                onClick={() => console.log("hello")}
                className="w-[315px] text-xl"
              />
              <p className="text-text text-xs mt-3">
                © 2024 Digital Engineering Tech Ltd. All rights reserved.
              </p>
            </div>
          </div>
          <div className="w-[50%]  text-center ">
            <div className="w-[90%] ml-[-15px] mx-auto">
              <img src="../../static/images/login_ill.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
