import { useState, useRef, CSSProperties, useEffect } from "react";

import Draggable from "react-draggable";

const terminalStyle: { [key: string]: CSSProperties } = {
  container: {
    position: "absolute",
    bottom: "420px",
    padding: "2px 8px",
    width: "280px",
    height: "140px",
    background: "rgba(200,200,200,0.9)",
    color: "black",
  },
};

const TerminalInput = () => {
  return (
    <Draggable>
      <div style={terminalStyle.container}>test</div>
    </Draggable>
  );
};

export default TerminalInput;
