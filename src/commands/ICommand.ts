export interface ICommand {
    name: string,
    execute(args: string): void,
    help() : void,
    description?: string,
    usage?: string,
    hidden?: boolean,
    admin?: boolean
}