import { AnyContextType } from "../types";
import { Config } from "./config.class";

export class Theme extends Config {
    private _themeName = "custom";
    private _data: { [ key: string ]: string } = {};
    private colorsObj: { [ key: string ]: string } = {};
    private setMainColor;
    private setResponseState;
    
    constructor(mainColorState: AnyContextType, responseState: AnyContextType) {
        super();
        const { setMainColor } = mainColorState;
        const { setResponseState } = responseState;
        this.setMainColor = setMainColor;
        this.setResponseState = setResponseState;
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

        super.setConfig('themeColors', JSON.stringify(this.colorsObj));
        super.setConfig('colorTheme', JSON.stringify(this.themeName));
    }
    
    private refreshTheme() {
        fetch("http://127.0.0.1:1010/themes/" + this.themeName).then(async response => {
            if (!response.ok)
                return Promise.reject(response.status);
            else {
                const responseData = await response.json();

                if (responseData.message) {
                    this.setResponseState({ lineText: "./", outputText: ["Connecting to the server...", "Status Check: OK", responseData.message]});

                    this._data = super.getParsedConfig('themeColors') || { background: 'black', foreground: 'white' };
                    this._themeName = "custom";
                } else {
                  this._data = responseData;
                  this.setResponseState({ lineText: '', outputText: [ "Theme changed successfully."]});                  
                }
                
                this.setMainColor(this._data);
                
                super.setConfig('colorTheme', JSON.stringify(this._themeName));
                super.setConfig('themeColors', JSON.stringify(this._data));
            }
        }).catch(error => this.setResponseState({ lineText: 'Network Error', outputText: ["Connecting to the server...", "Status Check", error]})
        );
    }
}