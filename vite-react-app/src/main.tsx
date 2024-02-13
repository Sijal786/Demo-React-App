import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import "./index.css";
import App from "./shared/routes/App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!); // Use createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
