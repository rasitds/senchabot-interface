import { appStyle } from "../styles";
import AngleUp from "./ui/AngleUp";

import { useEffect, useMemo, useState, FC } from "react";

import { InputContext } from "../contexts/InputContext";
import {
  ResponseProvider,
  useResponseContext,
} from "../contexts/ResponseContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { useInfoBoxContext } from "../contexts/InfoBoxContext";
import { CommandContext } from "../contexts/CommandContext";
import { AnyContextType } from "../types";

import TextInput from './TextInput';
import TerminalInput from "./TerminalInput";

import { Theme } from "../utils/theme.class";

import { useStopwatch } from "react-timer-hook";
import { CommandRegistry } from "../commands/CommandRegistry";

type InputContextType = {
  inputEnabled: boolean;
  inputValue: string;
}

//export const Input = (): FC<{isInputOpen: boolean}> => {
export const InputManager = ({ isInputOpen }: {isInputOpen: boolean}) => {

  CommandRegistry.registerAllCommands();
  
  const mainColorContext: AnyContextType = useThemeContext();
  const responseContext: AnyContextType = useResponseContext();
  const infoBoxContext: AnyContextType = useInfoBoxContext();

  const { mainColor } = mainColorContext;
  const { setResponseState } = responseContext;
  const { setInfoBox } = infoBoxContext;
  
  // Create state variables for inputEnabled and inputValue
  const [inputState, setInputState] = useState<InputContextType>({inputEnabled: true, inputValue: ''});

  const { seconds, minutes, hours, isRunning: isTimerRunning, start, pause, reset } = useStopwatch({});

  // The setInputState in useEffect is executed by changing the value of the isInputOpen variable that comes as an prop from the App.tsx file with the trigger of the keyboard keys.
  useEffect(() => {
    // The setInputState function assigns the value isInputOpen to the inputEnabled value in the inputState object and sets the inputValue an empty string.
    setInputState({ inputEnabled: isInputOpen, inputValue: '' })
  }, [isInputOpen]);

  // 
  useEffect(() => {
    if (isTimerRunning) {
      setInfoBox({
        infoBoxType: 3, // centered text and different font
        infoBoxText: 
        (hours ? hours.toString() + " hour" + (hours > 1 ? "s" : "") + " "
        : "")
         + 
        (minutes ? minutes.toString() + " minute" + (minutes > 1 ? "s" : "") + " "
        : "")
        +
        seconds.toString() + " seconds" 
      });
    }
  }, [seconds]);
  
  const inputContext = useMemo(
    () => ({
      inputState,
      setInputState,
    }),
    [inputState]
  );

  const { foreground } = mainColor;

  const runTimerCommand = (arg: string) => {
    var commandResponse = "";
    switch (arg) {
      case 'start':
        start();
        break;
      case 'pause':
        pause();
        break;
      case 'reset':
        reset();
        pause();
        // Change infoBoxText value to empty string to make infoBox disappear from screen
        setInfoBox({ infoBoxText: "" });
        break;
        default: commandResponse = " INVALID ARGUMENT.";
    }
    return commandResponse;
  }

  const runCommand = (cmdString: string) => {
    let splitCmdString = cmdString.split(" ");
    let commandName: any = splitCmdString.shift();
    let args = splitCmdString.join(" ");

    let lineText: string = "", outputText: string[] = [];

    if (commandName.startsWith("/")) {
      commandName = commandName.slice(1);

      let command = CommandRegistry.getCommand(commandName);
      if (command) {
        command.execute(args);
        return;
      }

      switch (commandName) {
        case "timer":
          lineText = runTimerCommand(args);
          break;
        default:
          lineText = "COMMAND NOT FOUND.";
      }

      setResponseState({ lineText: " " + lineText.toUpperCase(), outputText: outputText });
    }
  };

  const commandContextValue = useMemo(() => ({runCommand}), []);

  return (
    <InputContext.Provider value={inputContext}>
      <CommandContext.Provider value={commandContextValue}>
      <ResponseProvider>
        <div style={appStyle.body}>
          <div style={{
            position:"absolute",
            bottom: inputState.inputEnabled ? "32px" : "80px",
            transition: "height 0.3s ease-in-out, bottom 0.3s ease-in-out",
            transform: !inputState.inputEnabled ? "rotateX(180deg)" : "",
          }} onClick={() => {
                  setInputState({ inputEnabled: !inputState.inputEnabled, inputValue: '' });
                  
          }}>
            <AngleUp foregroundColor={foreground} />
          </div>
          {true ? (
          <TextInput />
          ) : (
          <TerminalInput />
          )}
        </div>
      </ResponseProvider>
      </CommandContext.Provider>
    </InputContext.Provider>
  );
};
