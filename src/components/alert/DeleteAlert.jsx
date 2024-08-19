import React from "react";
import Swal from "sweetalert2";

const DeleteAlert = (title, fun) => {
  const handleSaleOpen = () => {
    Swal.fire({
      title: title,
      icon: "warning",
      iconColor: "#F87171",
      buttonsStyling: false,
      width: "28em",
      color: "#F87171",
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
          title: "Reset Successfully !",
          icon: "success",
          buttonsStyling: false,
          iconColor: "#33b0f9",
          color: "#33b0f9",
          width: "25em",
          background: "#ffffff",
          customClass: {
            title: "text-white",
            confirmButton:
              "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
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

export default DeleteAlert;
