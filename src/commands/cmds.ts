import { fileCommands } from ".";

export default {
    name: 'cmds',
    args: '',
    run(arg: string) {
        let commandList = ["/timer (start, pause, reset)", "/info (word{s})"];

        fileCommands.filter((r) => commandList.push("/" + r.name + (r.args && " (" + r.args + ")")));

        return commandList;
    }
}