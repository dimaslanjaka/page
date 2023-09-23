if (window.location.host === 'cdpn.io') console.clear();

// forward console.log messages to div#debug
const _log = console.log;
console.log = (...args) => {
  const el = document.getElementById('debug');
  for (let i = 0; i < args.length; i++) {
    const val = args[i];
    if (['boolean', 'number', 'string'].includes(typeof val)) {
      const span = document.createElement('span');
      span.textContent = val;
      span.classList.add('border-bottom');
      el.appendChild(span);
    } else if (val) {
      const pre = document.createElement('pre');
      pre.classList.add('border-bottom');
      try {
        pre.textContent = JSON.stringify(val, null, 2);
      } catch {
        // JSON.stringify failed, recall original console.log
        _log(val);
        pre.textContent = 'fail render, forward back to console.log';
      }

      el.appendChild(pre);
    }
  }
};

// declare constants
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UA = 'UA-106238155-1';
// key to save credential for offline usage
const KEY_LOCALSTORAGE = 'google_credential';
// GSI initializer options
const initOpt = {
  apiKey: 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw',
  response_type: 'token',
  // auto select account
  auto_select: false,
  // google client id
  client_id: '974269993480-30i5epi0r6a9uiafq3rkpgsjuooe2t3q.apps.googleusercontent.com',
  // handle callback response
  callback: handleCredentialResponse,
  // cookie origin
  state_cookie_domain: window.location.origin,
  // scope library
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' ')
};
// last login credential
const g_credential = Object.assign(initOpt, JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE) || '{}'));

console.log('saved credential', g_credential);

/**
 * get client
 * @returns {Promise<gapi>}
 */
function getClient() {
  return new Promise(resolve => {
    g_credential.hint = g_credential.email;
    g_credential.callback = tokenResponse => {
      for (let key in tokenResponse) {
        g_credential[key] = tokenResponse[key];
      }
      gapi.client.setToken(tokenResponse);
      gapi.auth.authorize(g_credential, function (gapiTokenResponse) {
        for (let key in gapiTokenResponse) {
          g_credential[key] = gapiTokenResponse[key];
        }
        // save credential to local storage
        window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(g_credential));
        // resolve client
        resolve(gapi);
      });
    };
    g_credential.hint = g_credential.email;
    //console.log(g_credential);
    const client_account = google.accounts.oauth2.initTokenClient(g_credential);

    if (!google.accounts.oauth2.hasGrantedAllScopes(g_credential)) {
      client_account.requestAccessToken();
    } else {
      g_credential.callback(g_credential);
    }
  });
}

// cred: { client_id: string, credential: string }
function handleCredentialResponse(response) {
  // handle credential responses
  for (let key in response) {
    g_credential[key] = response[key];
  }
  // parse jwt token
  const parse = parseJwt(response.credential);
  for (let key in parse) {
    g_credential[key] = parse[key];
  }

  // console.log("credential", g_credential);

  // save credential to local storage
  window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(g_credential));
}

// status: { state: any, nonce: any }
function onSignIn(_status) {
  // handle login button clicked
  _log('login clicked', arguments);
}

// disable auto select account after signout
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onSignout() {
  google.accounts.id.disableAutoSelect();
}

function handleAccounts(response) {
  // Handles the response from the accounts list method.
  if (response.result.items && response.result.items.length) {
    /**
     * @type {{id:string}[]}
     */
    var accounts = response.result.items;
    accounts.forEach(account => {
      console.log(account);
    });

    // Query for properties.
    // queryProperties(firstAccountId);
  } else {
    console.log('No accounts found for this user.');
  }
}

const start = function () {
  // initialize google api
  gapi.client
    .init({
      apiKey: initOpt.apiKey,
      // Your API key will be automatically added to the Discovery Document URLs.
      discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
      // clientId and scope are optional if auth is not required.
      clientId: initOpt.client_id,
      scope: initOpt.scope
    })
    .then(() => {
      // initialize google account
      google.accounts.id.initialize(initOpt);

      // render login button
      google.accounts.id.renderButton(
        /** @type{!HTMLElement} */ document.querySelectorAll('.g_id_signin').item(0),
        /** @type{!GsiButtonConfiguration} */ {
          theme: 'filled_blue',
          size: 'small',
          shape: 'pill',
          click_listener: onSignIn
        }
      );

      getClient().then(gapi => {
        gapi.client.load('analytics', 'v3').then(function () {
          // Get a list of all Google Analytics accounts for this user
          gapi.client.analytics.management.accounts.list().then(handleAccounts);
        });
      });
    });

  // prompt notification banner
  /*
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment() || (notification.isDismissedMoment() && notification.getDismissedReason() != 'credential_returned')) {
            // no sign-in happened, display the button
            google.accounts.id.renderButton(document.getElementById('parent'),{});
        }
  });
  */

  /*google.accounts.id.storeCredential(Credential, function () {
    //
  });*/
};

window.onload = () => {
  gapi.load('client', start);
};

/**
 * parse JWT response
 * @param {string} token
 * @returns
 */
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

/*
@types/google.accounts
# Type definitions for Google Identity Services JavaScript SDK

@types/gapi
# TypeScript definitions for Google API Client

@types/gapi.client
# TypeScript definitions for Google API client

@types/gapi.client.discovery
# TypeScript definitions for API Discovery Service v1

@types/gapi.client.sheets
# TypeScript definitions for Google Sheets API v4

@types/gapi.client.drive
# TypeScript definitions for Drive API v3

@types/gapi.client.bigquery
# TypeScript definitions for BigQuery API v2

@types/gapi.client.storage
# TypeScript definitions for Cloud Storage JSON API v1

@types/gapi.client.youtube
# TypeScript definitions for YouTube Data API v3 v3

@types/gapi.client.androidpublisher
# TypeScript definitions for Google Play Android Developer API v3

@types/gapi.client.oauth2
# TypeScript definitions for Google OAuth2 API v2

@types/gapi.client.calendar
# TypeScript definitions for Calendar API v3

@types/gapi.client.gmail
# TypeScript definitions for Gmail API v1

@types/gapi.client.people
# TypeScript definitions for People API v1

@types/gapi.client.analytics
# TypeScript definitions for Google Analytics API v3

@types/gapi.client.fcm
# TypeScript definitions for Firebase Cloud Messaging API v1

@types/gapi.client.speech
# TypeScript definitions for Cloud Speech-to-Text API v1

@types/gapi.client.language
# TypeScript definitions for Cloud Natural Language API v1

@types/gapi.client.tagmanager
# TypeScript definitions for Tag Manager API v2

@types/gapi.client.analyticsadmin
# TypeScript definitions for Google Analytics Admin API v1alpha

@types/gapi.client.analyticsreporting
# TypeScript definitions for Analytics Reporting API v4

@types/gapi.client.customsearch
# TypeScript definitions for Custom Search API v1

@types/gapi.client.sqladmin
# TypeScript definitions for Cloud SQL Admin API v1

@types/gapi.client.deploymentmanager
# TypeScript definitions for Cloud Deployment Manager V2 API v2

@types/gapi.client.pubsub
# TypeScript definitions for Cloud Pub/Sub API v1

@types/gapi.client.cloudbuild
# TypeScript definitions for Cloud Build API v1

@types/gapi.client.logging
# TypeScript definitions for Cloud Logging API v2

@types/gapi.client.iam
# TypeScript definitions for Identity and Access Management (IAM) API v1

@types/gapi.auth2
# TypeScript definitions for Google Sign-In API

@types/gapi.client.translate
# TypeScript definitions for Cloud Translation API v3

@types/gapi.client.firebase
# TypeScript definitions for Firebase Management API v1beta1

@types/gapi.client.adsense
# TypeScript definitions for AdSense Management API v2

@types/gapi.client.analyticshub
# TypeScript definitions for Analytics Hub API v1beta1

@types/gapi.client.firestore
# TypeScript definitions for Cloud Firestore API v1

@types/gapi.client.firebasestorage
# TypeScript definitions for Cloud Storage for Firebase API v1beta

@types/gapi.client.dialogflow
# TypeScript definitions for Dialogflow API v3
*/
