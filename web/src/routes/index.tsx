import React from "react";
import { BrowserRouter } from "react-router-dom";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { useAuth } from "../contexts/auth";

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();
  if (loading) {
    return <span>Loading...</span>;
  }
  return (
    <BrowserRouter>{signed ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
};

export default Routes;
