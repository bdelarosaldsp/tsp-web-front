// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
   
  production: true,
  version: '0.0.3',
  USERDATA_KEY: 'authf333fc9a5f84',
  USERTOKEN_KEY: 'authtokenf258fc8c4f96',
  AGENCY_KEY: 'agencyf258fc8c4j78',
  EXPIRES_KEY: 'datef649fc9a5f55',

  isMockEnabled: true,
  appThemeName: 'Metronic',

  apiUrl: localStorage.getItem('apiVal')||'http://172.17.3.5:8090/api/',
  netSiteUrl: localStorage.getItem('netVal')||'http://172.17.3.5:8000/',
  phpSiteUrl: localStorage.getItem('phpVal')||'http://172.17.3.5:5000/',

  /*apiUrl: 'http://190.242.58.107:8090/api/',
  netSiteUrl:'http://190.242.58.107:8000/',
  phpSiteUrl:'http://190.242.58.107:5000/',*/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
