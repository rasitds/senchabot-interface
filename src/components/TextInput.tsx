import { useContext } from "react";
import { CommandContext } from "../contexts/CommandContext";
import { InputContext } from "../contexts/InputContext";
import { RunContext } from "../contexts/RunContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { AnyContextType } from "../types";

const TextInput = () => {
    const mainColorContext: AnyContextType = useContext(ThemeContext);
    const { setIsRunning } = useContext(RunContext);
    const inputContext: AnyContextType = useContext(InputContext);
    const runCommandContext: AnyContextType = useContext(CommandContext);

    
    const { foreground } = mainColorContext.mainColor;
    const { inputState, setInputState } = inputContext;    
    const { runCommand } = runCommandContext;

    const handleInputChange = (e: any) => {
        setInputState({ inputEnabled: false, inputValue: e.target.value });
    };
    
    const handleKeyDown = (e: any) => {
        if (e.code === "Escape") setInputState({ inputEnabled: true, inputValue: '' });
        if (e.key === "Enter") {
          runCommand(e.target.value);
          setInputState({ inputEnabled: false, inputValue: "" });
          setIsRunning(true);
        }
    };

    return (<input
        type="text"
        className="input"
        style={{
          position: "absolute",
          bottom: "32px",
          width: "240px",
          height: "32px",
          padding: "0 8px",
          background: "transparent",
          outline: "none",
          fontWeight: "320",
          border: `2px solid ${foreground}`,
          caretColor: foreground,
          color: foreground,
        }}
        value={inputState.inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="/"
        autoComplete="off"
        list="autocompleteOff"
        disabled={inputState.inputEnabled}
      />);
}

export default TextInput;