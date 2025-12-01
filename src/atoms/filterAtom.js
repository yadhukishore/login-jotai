import { atom } from "jotai";

export const filterAtom = atom(false);

export const filterAtomValue = atom((get) => get(filterAtom));
