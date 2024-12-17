import React from "react";
import { Loader } from "@mantine/core";

const LoaderCom = () => {
  return (
    <div className="bg-[#33b0f9]/10 z-30 backdrop-blur-sm w-[92%] h-screen absolute flex items-center justify-center">
      <Loader color="#33b0f9" size="xl" />
    </div>
  );
};

export default LoaderCom;
