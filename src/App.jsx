import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import DailyList from "./pages/DailyList";
import DailySale from "./pages/DailySale";
import FuelBalance from "./pages/FuelBalance";
import FuelIn from "./pages/FuelIn";
import Manager from "./pages/Manager";
import SaleSummary from "./pages/SaleSummary";
import TankData from "./pages/TankData";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/daily_list",
          element: <DailyList />,
        },
        {
          path: "/daily_sale",
          element: <DailySale />,
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
          path: "/manager",
          element: <Manager />,
        },
        {
          path: "/Sale_summary",
          element: <SaleSummary />,
        },
        {
          path: "/tank_Data",
          element: <TankData />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
