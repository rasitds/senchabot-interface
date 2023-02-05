import React, { createContext } from "react";

type ModeContextType = {
  mode: number;
  setMode: React.Dispatch<React.SetStateAction<number>>;
};

const defaultProps = {
  mode: 0,
  setMode: () => {},
};

export const ModeContext = createContext<ModeContextType>(defaultProps);
