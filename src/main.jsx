import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import InteractiveApp from "./interactive/InteractiveApp.jsx";
import "./styles.css";

const params = new URLSearchParams(window.location.search);
const RootApp = params.get("version") === "interactive" ? InteractiveApp : App;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
