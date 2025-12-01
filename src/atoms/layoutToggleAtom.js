import { atom } from "jotai";

const getInitial = () => {
  try {
    const s = localStorage.getItem("isSidebarExpanded");
    return s === null ? true : JSON.parse(s);
  } catch {
    return true;
  }
};

export const layoutAtom = atom(getInitial());
export const layoutToggleValue = atom((get) => get(layoutAtom));
