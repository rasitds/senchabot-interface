import { FC, useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import { appStyle } from '../../styles';

type AnyContextType = {
  [key: string]: any;
}

const BootLine: FC<{}> = () => {
  const mainContext: AnyContextType = useContext(ThemeContext);

  const bootLineColor = mainContext.mainColor.background === "black" ? "white" : "black";

  return <div className="bootLineAnimation" style={{...appStyle.bootLine,background: bootLineColor,
    borderLeft: `3px solid ${bootLineColor}`,}} />;
};

export default BootLine;