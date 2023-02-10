import "./App.css";
import { appStyle, buttonStyle } from "./styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Theme } from "./utils/theme.class";

import { useEffect, useMemo, useState } from "react";

import { RunContext } from "./contexts/RunContext";
import { IInfoBox, InfoBoxContext } from "./contexts/InfoBoxContext";
import { ResponseProvider } from "./contexts/ResponseContext";
import { useResponseContext } from "./contexts/ResponseContext";

import { InfoBox } from "./components/ui/InfoBox";

import { InputManager } from "./components/InputManager";

import BootLine from "./components/ui/scenes/BootLine";
import LineText from "./components/ui/LineText";
import OutputCorner from "./components/ui/OutputCorner";
import { IMainColor } from "./types";
import { ConfigMenu } from "./components/ConfigMenu";
import { ModeContext } from "./contexts/ModeContext";
import { Mode } from "./enums";
import { BootText } from "./components/ui/scenes/BootText";

let muiTheme = createTheme({
  palette: {
    primary: {
      main: "#FFF",
    },
    background: {
      default: "#000",
    },
  },
});

const updateColors = (data: IMainColor) => {
  muiTheme = createTheme({
    palette: {
      primary: {
        main: data.foreground ?? "#FFF",
      },
      background: {
        default: data.background ?? "#000",
      },
    },
  });
};

function App() {
  const theme = new Theme(useResponseContext);
  const themeColors = theme.getColors();

  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<Mode>(Mode.MAIN);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const [infoBox, setInfoBox] = useState<IInfoBox>({
    infoBoxType: 0,
    infoBoxText: "",
  });

  const [isInputOpen, setIsInputOpen] = useState(true);
  const [doubleClick, setDoubleClick] = useState(false);

  const runContext = useMemo(() => ({ isRunning, setIsRunning }), [isRunning]);
  const modeContext = useMemo(() => ({ mode, setMode }), [mode]);
  const infoBoxContext = useMemo(() => ({ infoBox, setInfoBox }), [infoBox]);

  useEffect(() => {
    updateColors(themeColors);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [themeColors]);

  const handleKeyDown = (e: any) => {
    if (e.code === "Escape") setIsInputOpen(true);
    if (e.altKey && e.code === "KeyI") setIsInputOpen((prev) => !prev);
  };

  const handleDoubleClick = (e: any) => {
    setDoubleClick(true);
    setMode(Mode.CONFIG);
  };

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {isLoading ? (
          <div style={appStyle.body}>
            <BootText
              texts={[
                "START MACHINE",
                "LOAD THEME DATA",
                "COLOR THEME: " + theme.themeName,
              ]}
            />
          </div>
        ) : (
          <ModeContext.Provider value={modeContext}>
            <RunContext.Provider value={runContext}>
              <ResponseProvider>
                <InfoBoxContext.Provider value={infoBoxContext}>
                  <OutputCorner />
                  {doubleClick && mode === Mode.CONFIG ? (
                    <ConfigMenu />
                  ) : (
                    <>
                      <div
                        style={appStyle.body}
                        onKeyDown={handleKeyDown}
                        onDoubleClick={handleDoubleClick}
                        tabIndex={-1}
                      >
                        <InfoBox />
                        <LineText />
                      </div>
                      <InputManager isInputOpen={isInputOpen} />
                    </>
                  )}
                </InfoBoxContext.Provider>
              </ResponseProvider>
            </RunContext.Provider>
          </ModeContext.Provider>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
