import { StyleType } from "../types";

const appStyle: StyleType = {
  body: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1",
  },
  bootLine: {
    position: "fixed",
    height: "100%",
    marginBottom: "16px",
  },
};

export const outputCornerStyle: StyleType = {
  container: {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "flex",
    whiteSpace: "pre-line",
  },
  text: {
    fontFamily: "Source Code Pro",
    fontSize: "16px",
    padding: "2px 4px",
    marginLeft: "8px",
    transition: "background 500ms linear",
  },
};

const buttonStyle: StyleType = {
  container: {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
  },
  buttonBox: {
    fontFamily: "Source Code Pro",
    fontSize: "16px",
    padding: "2px 4px",
    marginLeft: "8px",
    cursor: "default",
    userSelect: "none",
    transition: "background 500ms linear",
  },
};

const infoBoxStyle: StyleType = {
  container: {
    position: "absolute",
    marginBottom: "256px",
    width: "342px",
    maxWidth: "342",
    padding: "5px 15px",
    cursor: "default",
    userSelect: "none",
    whiteSpace: "pre-line",
    transition: "opacity 0.5s ease-in-out",
    transitionDuration: "200ms",
  },
  timerTextStyle: {
    fontSize: "18px",
    fontFamily: "Source Code Pro",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  infoTextStyle: {
    fontSize: "18px",
    fontFamily: "Source Code Pro",
    textAlign: "left",
  },
};

const mainStyle: StyleType = {
  line: {
    marginTop: "2.4em",
    width: "28px",
    transitionProperty: "width",
    transitionTimingFunction: "linear",
    userSelect: "none",
  },
  text: {
    position: "absolute",
    textAlign: "center",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    fontFamily: "reem",
    fontSize: "28px",
    userSelect: "none",
  },
};

export { appStyle, buttonStyle, infoBoxStyle, mainStyle };
