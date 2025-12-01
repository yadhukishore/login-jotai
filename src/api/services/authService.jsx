import toast from "react-hot-toast";
import apiClient from "../config";
import { clearAuthState } from "./clearAuthState";
import { setCookie, getCookie } from "./cookieUtils";

export const loginRequest = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);

    const { success, data } = response.data;

    if (success && data?.access_token) {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token; // backend must return this
      const expiresInDays = data.expiresInDays || 1;

      // Store tokens
      setCookie("access_token", accessToken, expiresInDays);
      if (refreshToken) {
        setCookie("refresh_token", refreshToken, 7); // or backend-defined expiry
      }

      return response.data;
    } else {
      throw new Error("Invalid login response");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutService = async () => {
  // Clear state first
  clearAuthState();

  try {
    const refreshToken = getCookie("refresh_token");
    const response = await apiClient.post("/logout", { refreshToken });

    if (response?.data?.success) {
      toast.success(response?.data?.message || "Logout successful", {
        duration: 5000,
      });
      globalThis.location.reload();
      return { success: true, data: response.data, shouldRedirect: true };
    } else {
      return { success: false, error: "Logout failed on server" };
    }
  } catch (error) {
    console.error("Logout failed:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
