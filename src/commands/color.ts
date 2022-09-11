import { AnyContextType } from "../types";
import { Config } from "../utils/config.class";
import { Theme } from "../utils/theme.class";

var INVALIDPARAM_MSG = "Invalid parameter. Valid parameters are: fg, bg, both";
var INVALIDCOLOR_MSG = "Invalid color code. Please provide a valid color code.";

export default {
    name: 'color',
    args: '<fg|bg|both> <color1> <color2?>',
    params: [ 'fg', 'bg', 'both' ],
    run(param: string, mainColorContext: AnyContextType, responseContext: AnyContextType) {
        let commandResponse: { lineText: string, outputText: string[] } = { lineText: "", outputText: [ "Custom color(s) updated successfully." ] };
        let args: string[] = param.split(' ');
        let type: string = args[0];

        if (!this.params.includes(type)) {
            return { lineText: "ERROR", outputText: [ INVALIDPARAM_MSG ] };
        }

        let colorCode: string = args[1];

        if (!colorCode) {
            return { lineText: "ERROR", outputText: [ INVALIDCOLOR_MSG ] };
        }

        let colorOption = new Option().style;
        colorOption.color = colorCode;

        if (!colorOption.color) {
            return { lineText: "ERROR", outputText: [ INVALIDCOLOR_MSG ] };
        }

        let config = new Config();
        let theme = new Theme(mainColorContext, responseContext);
        
        let colors = config.getParsedConfig("themeColors");
        if (type === "bg" || type.startsWith('back')) {
            theme.updateColors(colorCode, colors?.foreground);
        } else if (type === "fg" || type.startsWith('fore')) {
            theme.updateColors(colors?.background, colorCode);
        } else if (type === "both") {
            let colorCode1: string = args[2];

            if (!colorCode1) {
                return { lineText: "ERROR", outputText: [ INVALIDCOLOR_MSG ] };
            }

            colorOption.color = colorCode1;

            if (!colorOption.color) {
                return { lineText: "ERROR", outputText: [ INVALIDCOLOR_MSG ] };
            }

            theme.updateColors(colorCode, colorCode1);
        }

        return commandResponse;
    }
}