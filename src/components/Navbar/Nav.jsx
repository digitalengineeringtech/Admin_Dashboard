import React from "react";
import "./nav.css";
import { LanguagePicker } from "./LanguagePicker";
const Nav = ({ title }) => {
  return (
    <div className="w-[91%] z-40 2xl:w-[92%] mb-6 absolute">
      <div className="w-full nav_bg shadow-xl shadow-shadow/20  items-center flex justify-between px-8 rounded-lg h-20">
        <div className="text-[1.7rem] text-text font-bold font-sans">
          {title}
        </div>
        <div className="">
          <LanguagePicker />
        </div>
      </div>
    </div>
  );
};

export default Nav;
