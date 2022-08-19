import { createContext, useMemo, useState, useContext, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';

const sentences = ['WHAT ARE YOUR COMMANDS?', 'WHAT IS YOUR COMMAND?'];
const randomNum: any = Math.random().toFixed(0);
const randomTxt: string = sentences[randomNum];

/*type Props = {
    children: ReactNode;
}*/

interface IRespondContext {
    respondText: string;
}

const defaultValue = {
    respondText: randomTxt,
}

const RespondContext = createContext({});

function RespondProvider(Props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
    const [respondState, setRespondState] = useState<IRespondContext>(defaultValue);

    const respondContext = useMemo(() => ({respondState, setRespondState}), [respondState]);

    return (<RespondContext.Provider value={respondContext}>{Props.children}</RespondContext.Provider>);
}

function useRespondContext() {
    const context = useContext(RespondContext);
    if (context === undefined) {
        throw new Error('useRespondContext must be used within a RespondProvider')
    }
    return context;
}

export { RespondProvider, useRespondContext };

