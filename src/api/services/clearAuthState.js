import { mutate } from "swr";
import { deleteCookie } from "./cookieUtils";

// Clear both access and refresh tokens
export const clearAuthState = () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
  deleteCookie("resetToken"); // if still used
  mutate(() => true, undefined, { revalidate: false });
};
