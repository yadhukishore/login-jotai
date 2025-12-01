import { atom } from "jotai";
import { getToken } from "@src/utilities/authUtils";
import { PAGE_ROUTES } from "@src/constants/routeConstants";

export const authTokenAtom = atom(getToken() || null);

export const authSignedInState = atom((get) => {
  const authToken = get(authTokenAtom);
  return !!authToken;
});

export const emailValueAtom = atom("");

export const searchValueAtom = atom("");

export const redirectionPathPostLogin = atom(PAGE_ROUTES.dashboard);
