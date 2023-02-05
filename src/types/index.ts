import { CSSProperties } from "react";

type AnyContextType = {
  [key: string]: any;
};

type InputContextType = {
  inputEnabled: boolean;
  inputValue: string;
};

type StyleType = { [key: string]: CSSProperties };

export interface IMainColor {
  background: string;
  foreground: string;
}

export type { AnyContextType, InputContextType, StyleType };
