import { useEffect, useState } from "react";
import { outputCornerStyle } from "../../../styles";
import { useRecursiveTimeout } from "../../../utils/hooks";

export const BootText = ({ texts }: { texts: string[] }) => {
  const [displayStatus, setDisplayStatus] = useState(true);
  const [outputText, setOutputText] = useState<string[]>([]);
  const [textIndex, setTextIndex] = useState(0);

  useRecursiveTimeout(
    () =>
      new Promise<void>(r => {
        if (textIndex <= texts.length && texts[textIndex]) {
          setOutputText(outputText => [...outputText, texts[textIndex] + "\n"]);
          setTextIndex(textIndex + 1);
        }
        r();
      }),
    Math.floor(Math.random() * 500),
    0,
  );

  useEffect(() => {
    setDisplayStatus(true);
    setTimeout(() => {
      setOutputText([]);
      setTextIndex(0);
      setDisplayStatus(false);
    }, texts.length * 1000);
  }, [texts.length]);

  return displayStatus ? (
    <div style={outputCornerStyle.container}>
      <div style={{ ...outputCornerStyle.text, color: "#fff" }}>
        {outputText}
      </div>
    </div>
  ) : (
    <></>
  );
};
