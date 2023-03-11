import { useTheme } from '@mui/material';
import { FC } from 'react';

import { textWordStyle } from '../../../styles';
import { ITextWordProps } from '../../../types';

const Text: FC<ITextWordProps> = props => {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;

  return <div style={textWordStyle(primaryMainColor)}>{props.word}</div>;
};

export default Text;
