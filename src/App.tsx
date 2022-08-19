import React, { useEffect, useMemo, useState, createContext } from 'react';

import './App.css';

import { appStyle, buttonStyle } from './styles';


import { ThemeContext } from './contexts/ThemeContext';
import { RunContext } from './contexts/RunContext';
import { RespondProvider/*, useRespondContext*/ } from './contexts/RespondContext';

import BootLine from './components/ui/BootLine';
import Main from './components/Main';
import { InputManager } from './components/InputManager';
import { InfoBox } from './components/ui/InfoBox';
import { InfoBoxContext } from './contexts/InfoBoxContext';
import { ICommandContext } from './commands/ICommand';

interface IMainColor {
  background: string;
  foreground: string;
}

interface IInfoBox {
  infoBoxType: number;
  infoBoxText: string;
}

function App() {
  const localStorageColors = localStorage.getItem('colors') && (JSON.parse(localStorage.getItem('colors') || "")) || { background: 'black', foreground: '#f2f2f2' };
  
  const [isLoading, setIsLoading] = useState(true);
  const [introMode, setIntroMode] = useState(true);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  // Create state variables for background and foreground
  const [mainColor, setMainColor] = useState<IMainColor>(localStorageColors);
  const [infoBox, setInfoBox] = useState<IInfoBox>({infoBoxType: 0, infoBoxText: ''});

  const [isInputOpen, setIsInputOpen] = useState(true);
  const [doubleClick, setDoubleClick] = useState(false);

  const [command, setCommand] = useState('');
  const commandMemo = useMemo(() => ({ command, setCommand }), [command]) as ICommandContext;
  const CommandContext = createContext<ICommandContext>(commandMemo);
  
  const themeContext = useMemo(() => ({mainColor, setMainColor}), [mainColor]);
  const runContext = useMemo(() => ({isRunning, setIsRunning}), [isRunning]);
  const infoBoxContext = useMemo(() => ({infoBox, setInfoBox}), [infoBox]);

  const updateColors = (data: IMainColor) => {
    let colors;

    //const getColorsItem = localStorage.getItem('colors');

    /*if (getColorsItem) {
      colors = JSON.parse(getColorsItem);
      document.body.style.backgroundColor = colors.background;
      document.body.style.color = colors.foreground;
    } else {*/
      document.body.style.backgroundColor = data.background;
      document.body.style.color = data.foreground;
    //}
  }

  if (introMode) {
    setTimeout(() => {
      setIntroMode(false);
    }, 5000);
  }

  useEffect(() => {
    updateColors(mainColor);
    //setRespondState({ respondText: "WHAT ARE YOUR COMMANDS?" });
    
    setTimeout(() => {
      setIsLoading(false);
      setIntroMode(true);
    }, 1500);
  }, [mainColor]);

  const handleKeyDown = (e: any) => {
    console.log('handleKeyDown e.code', e.code);
    if (e.code === "Escape") setIsInputOpen(true);
    if (e.altKey && e.code === "KeyI") setIsInputOpen((prev) => !prev);
  }

  const handleDoubleClick = (e: any) => {
    setDoubleClick(true);
  }

  return (
  <>
    { isLoading ? (
    <div style={appStyle.body}>
      <ThemeContext.Provider value={themeContext}>
        <BootLine/>
      </ThemeContext.Provider>
    </div>
    ) : (
    <ThemeContext.Provider value={themeContext}>
      <RunContext.Provider value={runContext}>
        <RespondProvider>
          <InfoBoxContext.Provider value={infoBoxContext}>
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
              >doubleClick</div>
            </div>)}
            <div style={appStyle.body} onKeyDown={handleKeyDown} onDoubleClick={handleDoubleClick} tabIndex={-1}>
              <InfoBox />
              <Main />
            </div>
            <InputManager isInputOpen={isInputOpen} />
          </InfoBoxContext.Provider>
        </RespondProvider>
      </RunContext.Provider>
    </ThemeContext.Provider>
    ) }
  </>
  );
}

export default App;
