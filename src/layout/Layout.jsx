import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Login from "../pages/Login";
import Nav from "../components/Navbar/Nav";
import { useEffect, useState } from "react";

const Layout = () => {
  // console.log(window.location.pathname);
  const path = window.location.pathname;
  const [state, setState] = useState();
  const dd = useParams();
  // console.log(dd);
  useEffect(() => {
    switch (path) {
      case "/":
        setState("Manager Dashboard");
        break;
      case "/daily_sale":
        setState("Daily Sale Report ");
        break;
      case "/sale_summary":
        setState("Sale Summary");
        break;
      case "/tank_data":
        setState("Tank Data");
        break;
      case "/fuel_balance":
        setState("Fuel Balance");
        break;
      case "/daily_list":
        setState("Daily List");
        break;
      case "/fuel_in":
        setState("Fuel In");
        break;
      case "/price_chg":
        setState("Price Change");
        break;
    }
  }, [path]);

  return (
    <>
      {/* <Login /> */}
      <div className="bg-primary w-full  h-screen">
        <Sidebar />
        <div className=" h-screen p-4 pr-6  w-[93%] 2xl:w-[94%] ms-auto">
          <Nav title={state} />
          <div className="h-[97vh] example overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
