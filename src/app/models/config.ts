export interface Config {
    production: boolean;
    version:string;
    USERDATA_KEY:string;
    USERTOKEN_KEY: string;
    AGENCY_KEY:string;
    EXPIRES_KEY:string;
  
    isMockEnabled:boolean;
    appThemeName:string;
  
    apiUrl:string;
    netSiteUrl:string;
    phpSiteUrl:string;
}