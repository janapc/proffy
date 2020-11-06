import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from "../pages/Onboarding";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";

const { Navigator, Screen } = createStackNavigator();

function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Onboarding" component={Onboarding} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}

export default AuthRoutes;
