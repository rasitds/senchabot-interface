import { FC } from "react";

import { mainStyle } from "../../styles";

interface Props {
  textWord: string;
  lineSize: number;
}

const Line: FC<Props> = (props) => {
  mainStyle.line.width = props.lineSize;

  return (
    <div
      className={`${props.textWord ? "" : "lineAnimation"}`}
      style={{
        ...mainStyle.line,
        transitionDuration: props.textWord ? "0.1s" : "200ms",
      }}
    />
  );
};

export default Line;
