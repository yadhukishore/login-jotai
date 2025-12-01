import React from "react";
import { SWRConfig } from "swr";
import { fetcher } from "@src/utilities/apiMethods";

const SwrGlobal = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource) =>
          fetcher(resource),
      }}
    >
      {children}
    </SWRConfig>
  );
  //   return children;
};

export default SwrGlobal;
