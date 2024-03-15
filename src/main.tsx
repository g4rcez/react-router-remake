import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Router } from "./router/router";
import { routes } from "./links";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router config={routes}>
      <App />
    </Router>
  </React.StrictMode>
);
