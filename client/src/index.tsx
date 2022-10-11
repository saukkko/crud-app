import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const docRoot = document.getElementById("root");

const root = ReactDOM.createRoot(docRoot ? docRoot : process.exit(1));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
