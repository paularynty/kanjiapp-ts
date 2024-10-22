import ReactDOM from "react-dom/client";
// import React from "react";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./frontend/LightDarkMode";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <ThemeProvider>
    <App />
      <App />
      </ThemeProvider>
  // </React.StrictMode>
);
