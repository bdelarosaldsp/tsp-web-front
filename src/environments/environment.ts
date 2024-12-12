// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

import { ConfigService } from "src/app/services/config.service";

// The list of file replacements can be found in `angular.json`.


export const environment= {
  
  production: false,
  version: '0.0.3',
  USERDATA_KEY: 'authf649fc9a5f55',
  USERTOKEN_KEY: 'authtokenf649fc9a5f55',
  AGENCY_KEY: 'agencyf258fc8c5q32',
  EXPIRES_KEY: 'datef649fc9a5f55',

  isMockEnabled: true,
  apiUrl: localStorage.getItem('apiVal')||'http://172.17.3.5:9000/api/',
  netSiteUrl: localStorage.getItem('netVal')||'http://172.17.3.5:8000/',
  phpSiteUrl: localStorage.getItem('phpVal')||'http://172.17.3.5:5000/',
  appThemeName: 'Metronic',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
