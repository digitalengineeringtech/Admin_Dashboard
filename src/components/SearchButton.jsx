import React from "react";
import { ImSearch } from "react-icons/im";

const SearchButton = ({ onClick, visible = true, title, icon }) => {
  const con = window.innerWidth < 1240;
  // console.log(con);
  return (
    // <button className="w-[300px] 2xl:ml-8 mt-auto 2xl:ms-0 text-secondary  items-center justify-center gap-3 flex mr-auto font-mono text-lg active:scale-95 ms-11 duration-100 bg-detail h-[56px] rounded-md">
    <button
      onClick={onClick}
      className={`w-[300px]  mt-auto  text-secondary  items-center justify-center gap-3 flex font-mono text-lg active:scale-95 duration-100 bg-[#38b59e] h-[56px] rounded-md`}
      // className={`w-[300px]  mt-auto  text-secondary  items-center justify-center gap-3 flex  ${
      //   !con ? "mr-auto" : ""
      // } font-mono text-lg active:scale-95 duration-100 bg-[#38b59e] h-[56px] rounded-md`}
    >
      {visible && icon ? (
        icon
      ) : (
        <ImSearch className="ms-[-18px] text-secondary" />
      )}
      {title ? title : "SEARCH"}
    </button>
  );
};

export default SearchButton;
