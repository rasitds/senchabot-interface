import { AnyContextType } from "../types";

export class Theme {
    private _themeName = "default";
    private _data: { [ key: string ]: string } = {};
    private setMainColor;
    
    constructor(state: AnyContextType) {
        const { setMainColor } = state;
        this.setMainColor = setMainColor;
    }

    get themeName(): string {
        return this._themeName;
    }

    set themeName(value: string) {
        this._themeName = value;
        this.refreshTheme();
    }
    
    private async refreshTheme() {
        this._data = await (await fetch("http://127.0.0.1:1010/themes/" + this.themeName)).json();
        this.setMainColor(this._data);
    }
}