import React from "react";
import ReactDOM from "react-dom/client";  // Import from 'react-dom/client' for React 18
import App from "./App";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));  // Use createRoot for React 18+
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
