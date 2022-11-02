import {
  createContext,
  useMemo,
  useState,
  useContext,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

const sentences = ["WHAT ARE YOUR COMMANDS?", "WHAT IS YOUR COMMAND?"];
const randomNum: any = Math.random().toFixed(0);
const randomTxt: string = sentences[randomNum];

/*type Props = {
    children: ReactNode;
}*/

interface IResponseContext {
  lineText: string;
  outputText: string[];
}

const defaultValue = {
  lineText: randomTxt,
  outputText: ["/"],
};

const ResponseContext = createContext({});

function ResponseProvider(Props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  const [responseState, setResponseState] =
    useState<IResponseContext>(defaultValue);

  const responseContext = useMemo(
    () => ({ responseState, setResponseState }),
    [responseState]
  );

  return (
    <ResponseContext.Provider value={responseContext}>
      {Props.children}
    </ResponseContext.Provider>
  );
}

function useResponseContext() {
  const context = useContext(ResponseContext);
  if (context === undefined) {
    throw new Error(
      "useResponseContext must be used within a ResponseProvider"
    );
  }
  return context;
}

export { ResponseProvider, useResponseContext };
