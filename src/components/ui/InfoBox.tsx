import { infoBoxStyle } from '../../styles';
import { useInfoBoxContext } from '../../contexts/InfoBoxContext';
import Typewriter from 'typewriter-effect';
import { useTheme } from '@mui/material';

export const InfoBox = () => {
  const theme = useTheme();
  const background = theme.palette.background.default;
  const foreground = theme.palette.primary.main;
  const { infoBox } = useInfoBoxContext();
  const transparentBackground = infoBox.infoBoxType !== 3;
  const textColor = transparentBackground ? foreground : background;
  return (
    <div
      style={
        transparentBackground
          ? {
              ...infoBoxStyle.container,
              backgroundColor: 'transparent',
              opacity: !infoBox.infoBoxText ? 0 : 1,
            }
          : {
              ...infoBoxStyle.container,
              backgroundColor: foreground,
              borderTop: `2px solid ${foreground}`,
              borderBottom: `2px solid ${foreground}`,
              opacity: !infoBox.infoBoxText ? 0 : 1,
            }
      }
    >
      {infoBox.infoBoxType === 0 ? (
        <div
          style={{
            ...infoBoxStyle.infoTextStyle,
            color: textColor,
          }}
        >
          <Typewriter
            options={{
              strings: infoBox.infoBoxText,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            ...infoBoxStyle.timerTextStyle,
            color: textColor,
          }}
        >
          {infoBox.infoBoxText}
        </div>
      )}
    </div>
  );
};
