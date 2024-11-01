import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layouts/loading";

function ProtectedRoute({ redirectTo = "/signin" }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return <Loader message="Fetching data, please wait..." />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
