import { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material";
import { outputCornerStyle } from "../styles";
import { ModeContext } from "../contexts/ModeContext";

const CONFIG_MENU_TITLE = "CONFIGURATION MENU\n\n";

const menuArray = [
  "Switch to Voice Input",
  "Switch to Text Input",
  "Exit Config Menu",
];

export const ConfigMenu = () => {
  const theme = useTheme();
  const background = theme.palette.background.default;

  const { mode, setMode } = useContext(ModeContext);

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
            setTexts("Exit Command Executed\n\n");
            const timeout = setTimeout(() => {
              setMode(0);
              clearTimeout(timeout);
            }, 1000);
            break;
        }
        menuButton = 0;
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
