import React from "react";
import { Loader } from "@mantine/core";

const LoaderCom = () => {
  return (
    <div className="bg-detail/10 backdrop-blur-sm w-[90%] h-screen absolute flex items-center justify-center">
      <Loader color="#38B59E" size="xl" />
    </div>
  );
};

export default LoaderCom;
