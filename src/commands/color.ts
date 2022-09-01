import { AnyContextType } from "../types";
import { Theme } from "../utils/theme.class";

export default {
    name: 'color',
    args: 'fg, bg, both  & code1 if (both): code2}',
    run(arg: string, mainColorContext: AnyContextType, responseContext: AnyContextType) {
        let commandResponse: string = "";
        let args: string[] = arg.split(' ');
        let type: string = args[0];
        let colorCode0: string = args[1], colorCode1: string = args[2];
    
        if (colorCode0[0] !== "#" || (type === "both" && colorCode1[0] !== "#")) {
            commandResponse = "Color code(s) must start with # character.";
            return commandResponse;
        }

        let theme = new Theme(mainColorContext, responseContext);
        if (type === "bg" || type.startsWith('back')) {
            theme.updateColors(colorCode0, "white");
        } else if (type === "fg" || type.startsWith('fore')) {
            theme.updateColors("black", colorCode0);
        } else if (type === "both") {
            theme.updateColors(colorCode0, colorCode1);
        }

        return commandResponse;
    }
}