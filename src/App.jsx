import React, { useEffect, useState } from "react";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import DailyList from "./pages/manager/DailyList";
import DailySale from "./pages/manager/DailySale";
import FuelBalance from "./pages/manager/FuelBalance";
import FuelIn from "./pages/manager/FuelIn";
import Manager from "./pages/manager/Manager";
import SaleSummary from "./pages/manager/SaleSummary";
import TankData from "./pages/manager/TankData";
import PriceChg from "./pages/manager/PriceChg";
import Report from "./components/nested/Report";
import Stock from "./components/nested/Stock";
import Welcome from "./pages/installer/Welcome";
import Device from "./pages/installer/Device";
import Cashier from "./pages/installer/Cashier";
import Role from "./pages/installer/Role";
import Totallizer from "./pages/installer/Totallizer";
import Login from "./pages/Login";
import InstallerManager from "./pages/installer/InstallerManager";
import AuthContext from "./services/AuthContext";
import Re from "./services/Re";
import DeviceControl from "./pages/manager/DeviceControl";
import LoadContext from "./services/LoadContext";
import DevicesSetup2 from "./pages/installer/DeviceSetup2";
import DeviceNest from "./pages/installer/DeviceNest";
import SaleLedger from "./pages/manager/SaleLedger";
import TotalDif from "./pages/manager/TotalDif";
import HO from "./pages/manager/HO";
import BalanceStatement from "./pages/installer/BalanceStatement";
import Tank from "./pages/installer/Tank";
import CreditSale from "./pages/manager/CreditSale";
import CustomerList from "./pages/manager/CustomerList";
import TestCompo from "./pages/manager/Customers";
import CustomerEdit from "./pages/manager/CustomerEdit";
import Customers from "./pages/manager/Customers";
import CreditSaleList from "./pages/manager/CreditSaleList";
import CreditEdit from "./pages/manager/CreditEdit";
import Admin from "./pages/Admin";

const App = () => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reFresh, setReFresh] = useState(false);

  const [auth, setAuth] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("encryptedToken");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [isAuth]);

  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("installed"));
    if (check) {
      setIsInstalling(true);
    } else {
      setIsInstalling(false);
    }
  }, [isAuth]);

  console.log("install", isInstalling);

  // useEffect(() => {
  //   if (localStorage.getItem("installed") === null) {
  //     localStorage.setItem("installed", false);
  //     setIsInstalling(true);
  //   } else {
  //     setIsInstalling(JSON.parse(localStorage.getItem("installed")));
  //   }
  // }, []);
  const navigate = useNavigate();

  const managerRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: auth ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element: <Manager />,
        },
        {
          path: "/daily_list",
          element: <DailyList />,
          children: [
            {
              index: true,
              element: <Report />,
            },
            {
              path: "/daily_list/stock",
              element: <Stock />,
            },
          ],
        },
        {
          path: "/daily_sale",
          element: <DailySale />,
        },
        {
          path: "/device",
          element: <DeviceControl />,
        },
        {
          path: "/fuel_balance",
          element: <FuelBalance />,
        },
        {
          path: "/fuel_in",
          element: <FuelIn />,
        },
        {
          path: "/sale_summary",
          element: <SaleSummary />,
        },
        {
          path: "/tank_data",
          element: <TankData />,
        },
        // {
        //   path: "/customer_list",
        //   element: <CustomerList />,
        // },
        {
          path: "/customer_list",
          element: <Customers />,
          children: [
            {
              index: true,
              element: <CustomerList />,
            },
            {
              path: "/customer_list/edit/:id",
              element: <CustomerEdit />,
            },
          ],
        },
        {
          path: "/price_chg",
          element: <PriceChg />,
        },
        {
          path: "/credit_sale",
          element: <CreditSale />,
          children: [
            {
              index: true,
              element: <CreditSaleList />,
            },
            {
              path: "/credit_sale/edit/:id",
              element: <CreditEdit />,
            },
          ],
        },
        {
          path: "/total_dif",
          element: <TotalDif />,
        },
        {
          path: "/sale_ledger",
          element: <SaleLedger />,
        },
        {
          path: "/sale_ho",
          element: <HO />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
      ],
    },
  ]);

  const installerRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: auth ? <Layout /> : <navigate to="/login" />,
      children: [
        // {
        //   index: true,
        //   element: <Device />,
        // },
        {
          path: "/",
          element: <Device />,
          children: [
            {
              index: true,
              element: <DeviceNest />,
            },
            {
              path: "/sec-setup",
              element: <DevicesSetup2 />,
            },
          ],
        },
        {
          path: "/cashier",
          element: <Cashier />,
        },
        {
          path: "/tank",
          element: <Tank />,
        },
        //if u wanna use manager ,just comment out the line under below
        // {
        //   path: "/manager",
        //   element: <InstallerManager />,
        // },
        {
          path: "/role",
          element: <Role />,
        },
        {
          path: "/balance_statement",
          element: <BalanceStatement />,
        },
        {
          path: "/totallizer",
          element: <Totallizer />,
        },
      ],
    },
  ]);

  console.log(window.location.pathname, "this is path");

  useEffect(() => {
    if (window.location.pathname == "/admin") {
      localStorage.getItem("admin") != true && Navigate("/");
    }
  });

  // console.log("hellolllllllllllllllllllllllllllllllll", reFresh);
  return (
    <Re.Provider value={{ reFresh, setReFresh }}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <LoadContext.Provider value={{ loading, setLoading }}>
          <RouterProvider
            router={isInstalling ? installerRouter : managerRouter}
          />
        </LoadContext.Provider>
      </AuthContext.Provider>
    </Re.Provider>
  );
};

export default App;
