import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticatedRoute({ redirectTo = "/dashboard" }) {
  const token = Boolean(localStorage.getItem("token"));

  return !token ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default AuthenticatedRoute;
