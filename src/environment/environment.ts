// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    endpoint: 'http://localhost:3000/',
    mapbox: {
      accessToken:'pk.eyJ1Ijoia3J1Y3MiLCJhIjoiY20xaGU4cjl2MGc0cDJycHc3dGlrNm1vYyJ9.ULpV_dd17vXT56zBkbPOJQ'
    }
  };

  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
