import { FC } from 'react';

import { mainStyle } from "../../styles";

interface Props {
  word: string;
}

const Text: FC<Props> = (props) => {
  return <div style={mainStyle.text}>{props.word}</div>;
};

export default Text;
