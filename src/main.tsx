import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { initializeDatabase } from "./lib/db-init";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Initialize the database when the app starts
initializeDatabase()
  .then((success) => {
    console.log(
      success
        ? "Database initialized successfully"
        : "Database initialization failed",
    );
  })
  .catch((error) => {
    console.error("Database initialization error:", error);
  });

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
