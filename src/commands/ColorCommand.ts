import { ICommand } from "./ICommand";

export class ColorCommand implements ICommand {
    public readonly commandName = "color";

    public execute(params: string[]) {
        
    }
}