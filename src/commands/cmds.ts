import { fileCommands } from ".";

export default {
    name: 'cmds',
    args: '',
    run(param: string) {
        let commandList = ["/timer <start|pause|reset>"];

        fileCommands.filter((cmd) => commandList.push("/" + cmd.name + " " + cmd.args));

        return { lineText: "#", outputText: commandList };
    }
}