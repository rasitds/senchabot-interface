export class Config {
    public setConfig(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getConfig(key: string): string | null {
        return localStorage.getItem(key);
    }

    public removeConfig(key: string): void {
        localStorage.removeItem(key);
    }
}