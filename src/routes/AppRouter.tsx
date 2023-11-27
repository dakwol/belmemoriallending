import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RouteNames, privateRoutes, publicRoutes } from "./index";
import { useTypeSelector } from "../hooks/useTypedSelector";

const AppRouter = () => {
  const { isAuth } = useTypeSelector((state) => state.authReducer);
  const isAuthenticated = !!localStorage.getItem("user");
  const navigate = useNavigate();

  // useEffect(() => {
  //
  //   if (isAuthenticated) {
  //     navigate(RouteNames.SEARCH);
  //   } else {
  //     navigate(RouteNames.MEMORIAL);
  //   }
  // }, [isAuthenticated, isAuth, navigate]);

  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to="/" />} // Редирект на главную
      />
      {privateRoutes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path} />
      ))}
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
