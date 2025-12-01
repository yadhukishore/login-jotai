import { atom } from "jotai";

// Base atom (same as Recoil atom)
export const applicationAtom = atom(
  JSON.parse(localStorage.getItem("selectedApp")) || null
);

// Derived atom (same as Recoil selector)
export const applicationValue = atom((get) => get(applicationAtom));
