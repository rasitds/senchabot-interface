import React, { createContext } from "react";

/*type InputContextType = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const defaultProps = {
    inputValue: "",
    setInputValue: () => {}
}

const InputContext = createContext<InputContextType>(defaultProps);*/

const InputContext = createContext({});

export { InputContext };
