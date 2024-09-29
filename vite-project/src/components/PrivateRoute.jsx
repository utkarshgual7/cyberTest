import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const user1 = useSelector((state) => state.User1.User1);
  const location = useLocation();

  // If there is no current user, redirect to login page and pass the current location
  if (!user1) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
