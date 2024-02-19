import React from "react";
import { ImSearch } from "react-icons/im";

const SearchButton = () => {
  return (
    // <button className="w-[300px] 2xl:ml-8 mt-auto 2xl:ms-0 text-secondary  items-center justify-center gap-3 flex mr-auto font-mono text-lg active:scale-95 ms-11 duration-100 bg-detail h-[56px] rounded-md">
    <button className="w-[300px]  mt-auto  text-secondary  items-center justify-center gap-3 flex mr-auto font-mono text-lg active:scale-95 duration-100 bg-[#38b59e] h-[56px] rounded-md">
      <ImSearch className="ms-[-18px] text-secondary" />
      SEARCH
    </button>
  );
};

export default SearchButton;
