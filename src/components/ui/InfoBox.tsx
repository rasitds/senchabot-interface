import { useState, useContext, CSSProperties, FC } from "react";

import { infoBoxStyle } from "../../styles";

import { ThemeContext } from "../../contexts/ThemeContext";
import { InfoBoxContext } from "../../contexts/InfoBoxContext";

import Typewriter from 'typewriter-effect'

import { AnyContextType } from "../../types";

export const InfoBox: FC<{}> = ({}) => {
  const mainColorContext: AnyContextType = useContext(ThemeContext);
  const infoBoxContext: AnyContextType = useContext(InfoBoxContext);

  const { background, foreground } = mainColorContext.mainColor;
  const { infoBox } = infoBoxContext;

  const { infoBoxText, infoBoxType } = infoBox;

  const transparentBackground = infoBoxType === 3 ? false : true;
  const textColor = transparentBackground ? foreground : background;

  return (
    <div
      style={transparentBackground ? ({
        ...infoBoxStyle.container,
        backgroundColor: 'transparent',
        opacity: !infoBoxText ? 0 : 1,
      }) : ({
        ...infoBoxStyle.container,
        backgroundColor: foreground,
        borderTop: `2px solid ${foreground}`,
        borderBottom: `2px solid ${foreground}`,
        opacity: !infoBoxText ? 0 : 1,
      })}
    >
      {infoBoxType === 0 ? (
      <div
        style={{
          ...infoBoxStyle.infoTextStyle,
          color: textColor,
        }}
      >
        <Typewriter options={{
          strings: infoBoxText,
          autoStart: true,
          loop: true,
        }}/>
      </div>
      )
      :
      (
      <div
        style={{
          ...infoBoxStyle.timerTextStyle,
          color: textColor,
        }}
      >
        {infoBoxText}
      </div>
      )}
    </div>
  );
};
