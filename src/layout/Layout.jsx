import { Outlet, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Login from "../pages/Login";
import Nav from "../components/Navbar/Nav";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../services/AuthContext";

const Layout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState();
  let token = localStorage.getItem("encryptedToken");

  const [isInstalling, setIsInstalling] = useState();
  const { isAuth, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("installed"));
    if (check) {
      setIsInstalling(true);
    } else {
      setIsInstalling(false);
    }
  }, [isAuth]);

  useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);
  // console.log(auth);
  // useEffect(() => {
  //   auth ? navigate("/") : navigate("/login");
  // }, []);
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
      case "/device":
        setState("Device Control");
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
      {/* {!auth ? (
        <Login />
      ) : ( */}
      <div className="bg-primary w-full  h-screen">
        <Sidebar />
        <div className=" h-screen p-4 pr-6 w-[90%] mr-5 xl:mr-0 xl:w-[93%] 2xl:w-[94%] ms-auto">
          {!isInstalling && <Nav title={state} />}
          <div className="h-[97vh] example overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Layout;
