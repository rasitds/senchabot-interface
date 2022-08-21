import { AnyContextType } from "../types";
import { Config } from "./config.class";

export class Theme extends Config {
    private _themeName = "default";
    private _data: { [ key: string ]: string } = {};
    private colorsObj: { [ key: string ]: string } = {};
    private setMainColor;
    
    constructor(state: AnyContextType) {
        super();
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

    public updateColors(bg: string, fg: string) {
        this.colorsObj = { background: bg, foreground: fg };
    
        super.setConfig('colors', JSON.stringify(this.colorsObj))
    
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': 
          },
          body: JSON.stringify(this.colorsObj),
        }
    
        fetch('http://127.0.0.1:1010/themes', requestOptions)
          .then(async response => {
            const isJSON = response.headers.get('content-type')?.includes('application/json');
            const data = isJSON && await response.json();
            
            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
    
            console.log(data.message);
          }).catch(error => {
            console.error('There is an error!', error);
          });
        
        this.setMainColor(this.colorsObj);
    }
    
    private refreshTheme() {
        fetch("http://127.0.0.1:1010/themes/" + this.themeName).then(async response => {
            if (!response.ok)
                return Promise.reject(response.status);
            else {
                const responseData = await response.json();

                if (responseData.message) {
                    console.log(responseData.message)
                    this._data = super.getParsedConfig('colors');
                } else this._data = responseData;
                
                this.setMainColor(this._data);
                super.setConfig('colors', JSON.stringify(this._data));
            }
        }).catch(error => error.toString().includes('NetworkError') ? console.log('Network Error') : console.error("refreshTheme error", error)
        );
    }
}