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
            return { lineText: "Parameter Error", outputText: [ INVALIDPARAM_MSG ] };
        }

        let colorCode: string = args[1];

        if (colorCode === undefined || colorCode === "") {
            return { lineText: "colorCode Error", outputText: [ INVALIDCOLOR_MSG ] };
        }

        let colorOption = new Option().style;
        colorOption.color = colorCode;

        if (colorOption.color === "") {
            return { lineText: "colorCode Error", outputText: [ INVALIDCOLOR_MSG ] };
        }

        let config = new Config();
        let theme = new Theme(mainColorContext, responseContext);    
        let colors = config.getParsedConfig("themeColors");
        
        if (type === "fg" || type.startsWith('f') || type === "both")
            theme.updateColors(colors?.background, colorCode);
        
        if (type === "both") {
            colorCode = args[2];
            
            if (!colorCode || !colorCode.startsWith("#")) {
                return { lineText: "colorCode2 Error", outputText: [ INVALIDCOLOR_MSG ] };
            }
            
            colorOption = new Option().style;
            colorOption.color = colorCode;

            if (!colorOption.color) {
                return { lineText: "colorCode2 Error", outputText: [ INVALIDCOLOR_MSG ] };
            }
        }
        
        if (type === "bg" || type.startsWith('b') || type === "both")
            theme.updateColors(colorCode, colors?.foreground);
        
        return commandResponse;
    }
}