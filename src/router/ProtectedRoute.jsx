import { Navigate } from "react-router-dom";
import { PAGE_ROUTES } from "../constants/routeConstants";
import useAuthProvider from "@src/customHooks/useAuthProvider/useAuthProvider";
const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuthProvider();

  if (!isAuth) {
    return <Navigate to={PAGE_ROUTES.login} />;
  }
  return children;
};

export default ProtectedRoute;
