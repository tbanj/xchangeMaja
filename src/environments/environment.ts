// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  stripeKey: 'pk_test_duafqMHra9sxrzWk1vGgMSsh',
  firebase: {
    apiKey: 'AIzaSyAdySkq3eWcNb-5B1JejOUs7sMPPDjsGUo',
    authDomain: 'xchangemaja.firebaseapp.com',
    databaseURL: 'https://xchangemaja.firebaseio.com',
    projectId: 'xchangemaja',
    storageBucket: 'xchangemaja.appspot.com',
    messagingSenderId: '9208673897'
  }
};
