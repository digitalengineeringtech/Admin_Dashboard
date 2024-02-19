import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import DailyList from "./pages/DailyList";
import DailySale from "./pages/DailySale";
import FuelBalance from "./pages/FuelBalance";
import FuelIn from "./pages/FuelIn";
import Manager from "./pages/Manager";
import SaleSummary from "./pages/SaleSummary";
import TankData from "./pages/TankData";
import PriceChg from "./pages/PriceChg";
import Report from "./components/nested/Report";
import Stock from "./components/nested/Stock";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
        {
          path: "/price_chg",
          element: <PriceChg />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
