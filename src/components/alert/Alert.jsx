import React from "react";
import Swal from "sweetalert2";

const Alert = (title, fun) => {
  const handleSaleOpen = () => {
    Swal.fire({
      title: title,
      icon: "warning",
      iconColor: "#38b59e",
      buttonsStyling: false,
      width: "25em",
      color: "#38b59e",
      heightAuto: false,
      background: "#ffffff",
      focusConfirm: true,
      rounded: "xl",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      customClass: {
        cancelButton:
          "bg-secondary text-red-400 rounded-lg border-2 border-red-400 hover:border-red-400 hover:text-secondary duration-150 hover:bg-red-400 w-[35%] font-mono py-2",
        confirmButton:
          "bg-transparent text-detail rounded-lg border-2 border-detail w-[35%] font-mono py-2 border-detail hover:text-secondary duration-150 hover:bg-detail",
        actions: " !mt-4 !w-[100%] flex justify-center gap-9",
        icon: "!p-0 !mt-35",
        title: "!mt-0 !pt-0",
      },
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // const res = saleClose(token);

        Swal.fire({
          title: "Created Successfully !",
          icon: "success",
          buttonsStyling: false,
          iconColor: "#38b59e",
          color: "#38b59e",
          width: "25em",
          background: "#ffffff",
          customClass: {
            title: "text-white",
            confirmButton:
              "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#38b59e] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
          },
        });
        // fun();
        console.log("kkkkk");
        // console.log(fun);
        fun();
        console.log("kkkkk");
        // refetch();
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };
  return handleSaleOpen;
};

export default Alert;
