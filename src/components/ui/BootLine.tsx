import { FC, useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import { appStyle } from '../../styles';
import { calculateColorBrightness } from "../../utils/functions";

type AnyContextType = {
  [key: string]: any;
}

const BootLine: FC<{}> = () => {
  const mainContext: AnyContextType = useContext(ThemeContext);

  let backgroundColor = mainContext.mainColor.background;

  let bootLineColor = calculateColorBrightness(backgroundColor) || "#FFFFFF";

  return <div className="bootLineAnimation" style={{...appStyle.bootLine,background: bootLineColor,
    borderLeft: `3px solid ${bootLineColor}`,}} />;
};

export default BootLine;