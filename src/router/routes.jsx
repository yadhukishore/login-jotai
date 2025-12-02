import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { PAGE_ROUTES } from "../constants/routeConstants";
import ErrorElement from "../components/ErrorElement";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPasswordPage/forgotPassword";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoutes from "./publicRoutes";
import UnderConstruction from "../components/UnderConstruction";

const AppRoutes = () => {
  const protectedRoutes = [];

  const router = createBrowserRouter(
    [
      {
        path: PAGE_ROUTES.dashboard,
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: protectedRoutes,
        errorElement: <ErrorElement />,
      },
      {
        path: PAGE_ROUTES.login,
        element: (
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: PAGE_ROUTES.forgotPassword,

        element: (
          <PublicRoutes>
            <ForgotPassword />
          </PublicRoutes>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: PAGE_ROUTES.resetPassword,
        element: (
          <PublicRoutes>
            <ResetPasswordPage />
          </PublicRoutes>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "*",
        element: <UnderConstruction />,
        errorElement: <UnderConstruction />,
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      },
    }
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
