import { createContext, useContext } from "react";

export interface IInfoBox {
  infoBoxType: number;
  infoBoxText: string;
}

const InfoBoxContext = createContext({});

function useInfoBoxContext() {
  const context = useContext(InfoBoxContext);

  if (context === undefined) {
    throw new Error(
      "useInfoBoxContext must be used within a InfoBoxContext.Provider"
    );
  }

  return context;
}

export { InfoBoxContext, useInfoBoxContext };
