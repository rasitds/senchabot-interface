import React from "react";

export interface ICommand {
    commandName: string;
    execute(params: string[]): void;
}

export interface ICommandContext {
    command: string;
    setCommand: React.Dispatch<React.SetStateAction<string>>;
}