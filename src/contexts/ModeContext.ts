import React, { createContext } from "react";
import { Mode } from "../enums";

type ModeContextType = {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

const defaultProps = {
  mode: 0,
  setMode: () => {},
};

export const ModeContext = createContext<ModeContextType>(defaultProps);
