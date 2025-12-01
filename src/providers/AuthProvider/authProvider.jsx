import useUserInfo from "@src/customHooks/useUserInfo";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const { isSignedIn, redirectionPath } = useUserInfo();

  if (isSignedIn) {
    return <Navigate to={redirectionPath} replace={true} />;
  }
  return children;
};

export default AuthProvider;
