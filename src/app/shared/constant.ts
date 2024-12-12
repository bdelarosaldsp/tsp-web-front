import { environment } from "src/environments/environment";
import { Endpoint } from "./endpoints";

export class Constant {
  
    public static Endpoints = Endpoint;
    public static PRODUCTION: boolean = environment.production;
    public static VERSION: string = environment.version;
    public static DEBUG = false;
   

    public static AUTH = {
        getToken: () => {
          return localStorage.getItem(`${environment.version}-${environment.USERTOKEN_KEY}`);
        },
        getUser: () => {
            return JSON.parse(localStorage.getItem(`${environment.version}-${environment.USERDATA_KEY}`)!);
          },
          getAgency: () => {
            return JSON.parse(localStorage.getItem(`${environment.version}-${environment.AGENCY_KEY}`)!);
          },
        KEYS: {
            token: `${environment.version}-${environment.USERTOKEN_KEY}`,
            userData: `${environment.version}-${environment.USERDATA_KEY}`,
            agency: `${environment.version}-${environment.AGENCY_KEY}`,
            token_expires:`${environment.version}-${environment.EXPIRES_KEY}`,
            urlBeforExpelling: 'urlBeforExpelling'
          }
    };
    
}