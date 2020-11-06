import React from "react";
import { Route } from "react-router-dom";

import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";

function authRoutes() {
  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
    </>
  );
}

export default authRoutes;
