import { atom } from "jotai";

export const isNoDataWithoutParamsAtom = atom(false);

// Product Create Form State
export const productIdAtom = atom(null);
export const productTypeAtom = atom("without_variants");
export const attributeSetIdAtom = atom(null);
export const websiteIdAtom = atom("global");
export const completedStepsAtom = atom([]);
export const stepDataAtom = atom({});

// Derived atom to reset all product form state
export const resetProductFormAtom = atom(null, (_get, set) => {
  set(productIdAtom, null);
  set(productTypeAtom, "without_variants");
  set(attributeSetIdAtom, null);
  set(websiteIdAtom, "global");
  set(completedStepsAtom, []);
  set(stepDataAtom, {});
});
