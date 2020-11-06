import React from "react";

import Routes from "./routes/index";
import { AuthProvider } from "./contexts/auth";

import "./assets/styles/global.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
