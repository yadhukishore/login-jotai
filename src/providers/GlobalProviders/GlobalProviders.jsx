import React from "react";
import { Provider as JotaiProvider } from "jotai";
import SwrGlobal from "../SwrGlobal";
import Toast from "../Toast";

const GlobalProviders = ({ children }) => {
  return (
    <JotaiProvider>
      <SwrGlobal>{children}</SwrGlobal>
      <Toast />
    </JotaiProvider>
  );
};

export default GlobalProviders;
