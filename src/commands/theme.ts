import { AnyContextType } from "../types";
import { Theme } from "../utils/theme.class";

export default {
    name: 'theme',
    args: 'theme-name (light, dark, cyan, orange, green, pink, faint-orange, neon-blue, ultra-green)',
    run(arg: string, mainColorContext: AnyContextType, responseContext: AnyContextType) {
        let theme = new Theme(mainColorContext, responseContext);
        theme.themeName = arg;
        return "";
    }
}