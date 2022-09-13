import { useResponseContext } from "../contexts/ResponseContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { AnyContextType } from "../types";
import { Theme } from "../utils/theme.class";
import { ICommand } from "./ICommand";


export function InitializeThemeCommand() : ICommand {
    const mainColorContext: AnyContextType = useThemeContext();
    const responseContext: AnyContextType = useResponseContext();
    return new ThemeCommand(mainColorContext, responseContext);
}

export class ThemeCommand implements ICommand {
    public name: string = 'theme';
    private mainColorContext: AnyContextType;
    private responseContext: AnyContextType;

    constructor(mainColorContext: AnyContextType, responseContext: AnyContextType) {
        this.mainColorContext = mainColorContext;
        this.responseContext = responseContext;
    }

    public execute(parameters: string) {
        let args: string[] = parameters.split(' ');

        let theme = new Theme(this.mainColorContext, this.responseContext);

        theme.themeName = args[0];
    }

    public help() {

    }

    public usage?: string = "/theme <theme name>";
}