import { createContext, useContext } from "react";

const ThemeContext = createContext({});

function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContext.Provider"
    );
  }

  return context;
}

export { ThemeContext, useThemeContext };
