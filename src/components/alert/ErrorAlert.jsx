import React from "react";
import Swal from "sweetalert2";

const ErrorAlert = (title) => {
  return Swal.fire({
    title: title,
    icon: "error",
    buttonsStyling: false,
    color: "#F87171",
    width: "26em",
    background: "#ffffff",
    customClass: {
      title: "text-red-400 !p-0",
      confirmButton:
        "bg-secondary text-detail mb-4 rounded-lg border-2 border-detail hover:text-[#ffffff] duration-150 hover:bg-detail w-[300px] font-mono py-3",
      icon: "!mt-8 !mb-4",
    },
  });
};

export default ErrorAlert;
