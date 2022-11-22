import "./App.css";
import { appStyle, buttonStyle } from "./styles";
import { useEffect, useMemo, useState } from "react";

import { IMainColor, ThemeContext } from "./contexts/ThemeContext";
import { RunContext } from "./contexts/RunContext";
import { IInfoBox, InfoBoxContext } from "./contexts/InfoBoxContext";
import { ResponseProvider } from "./contexts/ResponseContext";

import { InfoBox } from "./components/ui/InfoBox";
import { Config } from "./utils/config.class";

import { InputManager } from "./components/InputManager";

import BootLine from "./components/ui/BootLine";
import LineText from "./components/ui/LineText";
import OutputCorner from "./components/ui/OutputCorner";

function App() {
  const config = new Config();
  const colors = config.getParsedConfig("themeColors");

  const localStorageColors = {
    background: colors?.background || "#000000",
    foreground: colors?.foreground || "#F2F2F2",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  // Create state variables for background and foreground
  const [mainColor, setMainColor] = useState<IMainColor>(localStorageColors);
  const [infoBox, setInfoBox] = useState<IInfoBox>({
    infoBoxType: 0,
    infoBoxText: "",
  });

  const [isInputOpen, setIsInputOpen] = useState(true);
  const [doubleClick, setDoubleClick] = useState(false);

  const themeContext = useMemo(
    () => ({ mainColor, setMainColor }),
    [mainColor]
  );
  const runContext = useMemo(() => ({ isRunning, setIsRunning }), [isRunning]);
  const infoBoxContext = useMemo(() => ({ infoBox, setInfoBox }), [infoBox]);

  const updateColors = (data: IMainColor) => {
    document.body.style.backgroundColor = data.background;
    document.body.style.color = data.foreground;
  };

  useEffect(() => {
    updateColors(mainColor);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [mainColor]);

  const handleKeyDown = (e: any) => {
    console.log("handleKeyDown e.code", e.code);
    if (e.code === "Escape") setIsInputOpen(true);
    if (e.altKey && e.code === "KeyI") setIsInputOpen((prev) => !prev);
  };

  const handleDoubleClick = (e: any) => {
    setDoubleClick(true);
  };

  return (
    <>
      {isLoading ? (
        <div style={appStyle.body}>
          <ThemeContext.Provider value={themeContext}>
            <BootLine />
          </ThemeContext.Provider>
        </div>
      ) : (
        <ThemeContext.Provider value={themeContext}>
          <RunContext.Provider value={runContext}>
            <ResponseProvider>
              <InfoBoxContext.Provider value={infoBoxContext}>
                <OutputCorner />
                {doubleClick && (
                  <div style={buttonStyle.container}>
                    <div
                      style={{
                        ...buttonStyle.buttonBox,
                        color: mainColor.background,
                        backgroundColor: mainColor.foreground,
                        border: `1px double ${mainColor.foreground}`,
                        borderStyle: "solid",
                        boxShadow: `2px 2px ${mainColor.foreground}`,
                        fontWeight: "bold",
                        fontFamily: "ald",
                      }}
                    >
                      doubleClick
                    </div>
                  </div>
                )}
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
              </InfoBoxContext.Provider>
            </ResponseProvider>
          </RunContext.Provider>
        </ThemeContext.Provider>
      )}
    </>
  );
}

export default App;
