import React from "react";
import { PAGE_ROUTES } from "../constants/routeConstants";
import useAuthProvider from "@src/customHooks/useAuthProvider/useAuthProvider";
import { Navigate } from "react-router-dom";
const PublicRoutes =({ children })=> {
    const { isAuth } = useAuthProvider();

  if (isAuth) {
    return <Navigate to={PAGE_ROUTES.dashboard} />;
  }
  return children;
}

export default PublicRoutes