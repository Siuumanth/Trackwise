// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TaskTimerProvider } from "./context/TaskTimerContext.jsx";
import "./index.css"; // Make sure this exists

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskTimerProvider>
      <App />
    </TaskTimerProvider>
  </React.StrictMode>
);
