import React from "react";
import { Route } from "react-router-dom";

import TeacherList from "../pages/TeacherList";
import Profile from "../pages/Profile";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/study" component={TeacherList} />
      <Route path="/profile" component={Profile} />
    </>
  );
};

export default AppRoutes;
