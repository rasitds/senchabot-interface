import { useState, useRef, CSSProperties, useEffect } from "react";

import Draggable from "react-draggable";

const terminalStyle: { [key: string]: CSSProperties } = {
    container: {
        position: 'absolute',
        bottom: '420px',
        padding: '2px 8px',
        width: '280px',
        height: '140px',
        background: 'rgba(200,200,200,0.9)',
        color: 'black'
    }
}

const TerminalInput = () => {
    return (<Draggable><div style={terminalStyle.container}>test</div></Draggable>)
    /*const [clicked, setClicked] = useState(false);
    const [pos, setPos] = useState({ x:0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        }
    }, [pos]);

    const onMouseMove = (e: any) => {
        if (clicked) {
            setPos({
                x: pos.x + e.movementX,
                y: pos.y + e.movementY,
            })
        }
    }

    return (<div ref={ref} style={terminalStyle.container} onMouseMove={onMouseMove} onMouseDown={() => setClicked(true)} onMouseUp={() => setClicked(false)}>test</div>);*/
}

export default TerminalInput;