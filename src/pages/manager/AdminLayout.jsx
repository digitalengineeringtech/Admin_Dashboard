import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="w-full pt-28">
      <div className=" flex items-start ms-4 border-b-gray-300 border-b w-[300px] py-4 pb-5 gap-5">
        <NavLink
          end
          to={"/admin"}
          className="text-gray-500 text-sm hover:text-white font-semibold hover:bg-detail cursor-pointer border-gray-300 border-2 duration-100 p-3 px-6 rounded-lg"
        >
          Customer
        </NavLink>
        <NavLink
          to={"/admin/discount"}
          className="text-gray-500 text-sm hover:text-white font-semibold hover:bg-detail cursor-pointer border-gray-300 border-2 duration-100 p-3 px-6 rounded-lg"
        >
          Discount
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
