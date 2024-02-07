import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Login from "../pages/Login";

const Layout = () => {
  return (
    <>
      <Login />
      {/* <Sidebar />
      <Outlet /> */}
    </>
  );
};

export default Layout;
