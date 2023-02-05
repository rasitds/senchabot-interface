import { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material";
import { outputCornerStyle } from "../styles";
import { RunContext } from "../contexts/RunContext";

const CONFIG_MENU_TITLE = "CONFIGURATION MENU\n\n";

const menuArray = ["Switch to Voice Input", "Switch to Text Input", "Exit"];

export const ConfigMenu = () => {
  const theme = useTheme();
  const background = theme.palette.background.default;

  const { isRunning, setIsRunning } = useContext(RunContext);

  const [texts, setTexts] = useState(CONFIG_MENU_TITLE);
  const [button, setButton] = useState(0);

  useEffect(() => {
    let menuButton = 0;
    document.addEventListener("keydown", (e) => {
      const keyCode = e.code;
      if (keyCode === "ArrowUp" && menuButton > 0) {
        menuButton = --menuButton;
      } else if (keyCode === "ArrowDown" && menuButton < menuArray.length - 1) {
        menuButton = ++menuButton;
      }

      setButton(menuButton);

      if (keyCode === "Enter") {
        switch (menuButton) {
          case 0:
            setTexts("Switching to Voice Input Mode\n\n");
            break;
          case 1:
            setTexts("Switching to Text Input Mode\n\n");
            break;
          case 2:
            setTexts("Exit\n\n");
            setIsRunning(true);
            break;
        }
      }
    });
  }, []);

  useEffect(() => {
    // FIXME: Timeout duration is broken when useEffect dependencies are changed a second time
    const timeout = setTimeout(() => {
      setTexts(CONFIG_MENU_TITLE);
      clearTimeout(timeout);
    }, 4000);
  }, [texts]);

  return (
    <div style={outputCornerStyle.container}>
      <div
        style={{
          ...outputCornerStyle.text,
          color: "white",
        }}
      >
        {texts}
        <div style={{ maxWidth: "800px" }}>
          {menuArray.map((menu, index) => (
            <div
              key={index}
              style={{
                ...outputCornerStyle.button,
                borderStyle: "solid",
                marginBottom: "6px",
                padding: "4px 8px",
                color: "white",
                width: "400px",
                borderColor: background,
                ...(button === index && {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "white",
                }),
              }}
            >
              {menu}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
