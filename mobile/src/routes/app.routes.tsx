import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Study from "./study.tabs.routes";
import Profile from "../pages/Profile";

const { Navigator, Screen } = createStackNavigator();

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Study" component={Study} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}

export default AppRoutes;
