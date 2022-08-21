import { appStyle } from "../styles";
import AngleUp from "./ui/AngleUp";

import { useEffect, useMemo, useState, FC } from "react";

import { InputContext } from "../contexts/InputContext";
import {
  RespondProvider,
  useRespondContext,
} from "../contexts/RespondContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { useInfoBoxContext } from "../contexts/InfoBoxContext";
import { CommandContext } from "../contexts/CommandContext";
import { AnyContextType } from "../types";

import TextInput from './TextInput';
import TerminalInput from "./TerminalInput";

import { fileCommands } from "../commands";
import { Theme } from "../utils/theme.class";

import { useStopwatch } from "react-timer-hook";

type InputContextType = {
  inputEnabled: boolean;
  inputValue: string;
}

//export const Input = (): FC<{isInputOpen: boolean}> => {
export const InputManager = ({ isInputOpen }: {isInputOpen: boolean}) => {
  const mainColorContext: AnyContextType = useThemeContext();
  const respondContext: AnyContextType = useRespondContext();
  const infoBoxContext: AnyContextType = useInfoBoxContext();

  const { mainColor } = mainColorContext;
  const { setRespondState } = respondContext;
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
  
  const changeThemeCommand = (arg: string) => {
    let commandRespond = "";
    
    let theme = new Theme(mainColorContext);
    theme.themeName = arg;

    return commandRespond;
  };

  const changeColorCommand = (arg: string) => {
    let commandRespond = "";
    let args = arg.split(' ');
    let type: string = args[0];
    let fgColorCode: string = args[1];
    let bgColorCode: string = args[2];
    
    /*if (fgColorCode[0] !== "#") {
      commandRespond = "Color code must start with # character";
    } else {*/
      let theme = new Theme(mainColorContext);
      if (type === "bg" || type.startsWith('back')) {
        theme.updateColors(bgColorCode, "white");
      } else if (type === "fg" || type.startsWith('fore')) {
        theme.updateColors("black", fgColorCode);
      } else if (type === "both") {
        theme.updateColors(bgColorCode, fgColorCode);
      }
    //}
    return commandRespond;
  }

  const showCommandList = () => {
    /*setTimeout(() => {
      setInfoBox({ infoBoxText: "" });
    }, 5000);*/

    let commandListText: string[] = [];
    
    let commandList = ["/theme (light, dark, cyan, orange, green, pink, faint-orange, neon-blue, ultra-green)", "/timer (start, pause, reset)", "/info (word{s})", "/color (bg, fg) {code}"];

    fileCommands.filter((r) => commandList.push("/" + r.name + (r.args && " (" + r.args + ")")));
    
    const populateArray = async () => {
      commandList.map(async (command) => {
        setTimeout(() => {
          commandListText.push(command + "\n");
          
          setInfoBox({
            infoBoxType: 0,
            infoBoxText: commandListText,
          });
        }, 200);
      });
    };
    populateArray();
  };

  const runTimerCommand = (arg: string) => {
    var commandRespond = "";
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
        default: commandRespond = " INVALID ARGUMENT.";
    }
    return commandRespond;
  }

  const setCustomInfoBox = (arg: string) => {
    let commandRespond = "";

    if (!arg.length) commandRespond = "TEXT NOT GIVEN";
    
    if (arg.includes('timer')) {
      setTimeout(() => {
        setInfoBox({infoBoxText: ''});
      }, 2000);
    }
    arg = arg.replace('timer', '');
    setInfoBox({infoBoxText: arg});

    return commandRespond;
  }

  const runCommand = (cmdString: string) => {
    let splitCmdString = cmdString.split(" ");
    let commandName: any = splitCmdString.shift();
    let args = splitCmdString.join(" ");

    let respondText = "";

    if (commandName.startsWith("/")) {
      commandName = commandName.slice(1);

      const commands = fileCommands.find((command) =>
        command.name.includes(commandName)
      );

      if (commands) {
        respondText = commands.run(args);
        setRespondState({ respondText: " " + respondText.toLocaleUpperCase() });
        return;
      }

      switch (commandName) {
        case "theme":
          respondText = changeThemeCommand(args);
          break;
        case "color":
          respondText = changeColorCommand(args);
          break;
        case "cmds":
          showCommandList();
          break;
        case "timer":
          respondText = runTimerCommand(args);
          break;
        case 'info':
          respondText = setCustomInfoBox(args);
          break;
        default:
          respondText = "COMMAND NOT FOUND.";
      }

      setRespondState({ respondText: " " + respondText.toUpperCase() });
    }
  };

  const commandContextValue = useMemo(() => ({runCommand}), []);

  return (
    <InputContext.Provider value={inputContext}>
      <CommandContext.Provider value={commandContextValue}>
      <RespondProvider>
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
      </RespondProvider>
      </CommandContext.Provider>
    </InputContext.Provider>
  );
};
