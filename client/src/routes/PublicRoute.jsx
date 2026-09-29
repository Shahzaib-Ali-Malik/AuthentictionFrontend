import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { user } = useSelector((store) => store.authReducer);

  if (user) {
    if (user.role === "user") {
      return <Navigate to="/main" />;
    } 
      return <Navigate to="/admin-dashboard" />;   
  }

  return <Outlet/>
};

export default PublicRoute;
