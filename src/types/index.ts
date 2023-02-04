type AnyContextType = {
  [key: string]: any;
};

type InputContextType = {
  inputEnabled: boolean;
  inputValue: string;
};

export interface IMainColor {
  background: string;
  foreground: string;
}

export type { AnyContextType, InputContextType };
