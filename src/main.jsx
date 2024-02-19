import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./services/i18n.js";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
