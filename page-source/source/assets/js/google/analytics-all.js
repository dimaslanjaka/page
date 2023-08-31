import AnalyticsQueries from './AnalyticsQueries';
import { GOOGLE_CONFIG, handleCredentialResponse } from './constants';

// key to save credential for offline usage
const KEY_LOCALSTORAGE = 'google_credential';
/**
 * last login credential
 * @type {Parameters<typeof gapi.auth.authorize>[0]}
 */
const g_credential = Object.assign(JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE) || '{}'), GOOGLE_CONFIG, {
  response_type: 'token',
  cookiepolicy: 'single_host_origin',
  authuser: -1,
  prompt: 'consent',
});
var tokenClient;

//const apiKey = 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw';
window.onload = async function () {
  // load gapi
  await new Promise((resolve, reject) => {
    // NOTE: the 'auth2' module is no longer loaded.
    gapi.load('client', { callback: resolve, onerror: reject });
  });

  await gapi.client
    .init({
      // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
    })
    .then(function () {
      //gapi.client.load('analytics', 'v3');
      gapi.client.load('https://analyticsreporting.googleapis.com/$discovery/rest?version=v4');
      //gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
      //gapi.client.load('https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta');
      //gapi.client.load('https://analyticsdata.googleapis.com/$discovery/rest?version=v1alpha');
    })
    .then(
      function (response) {
        console.log('discovery document loaded', response);
      },
      function (reason) {
        console.log('Error: ' + reason.result.error.message);
      },
    );

  // load gsi
  await new Promise((resolve, reject) => {
    try {
      tokenClient = google.accounts.oauth2.initTokenClient({
        ...g_credential,
        prompt: 'consent',
        callback: tokenResponse => {
          handleCredentialResponse(tokenResponse);
          gapi.auth.setToken(tokenResponse);
          startAnalytics();
        },
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  // start analytics when token previously resolved
  if (g_credential.access_token) {
    gapi.auth.setToken(g_credential);
    startAnalytics();
  }

  // force obtain new access token click handler
  document.getElementById('authBtn').addEventListener('click', () => authorize(true));
  // revoke token handler
  document.getElementById('revokeBtn').addEventListener('click', revokeToken);
};

function authorize(force) {
  // force obtain new access token
  if (force) return tokenClient.requestAccessToken();
  // credential undefined
  if ('credential' in g_credential === false) return tokenClient.requestAccessToken();
  // token expired
  const isExpired =
    'exp' in g_credential.credential
      ? Date.now() >= g_credential.credential.exp * 1000
      : Date.now() >= g_credential._expires_in;
  if (isExpired) return tokenClient.requestAccessToken();
}

function startAnalytics() {
  const _accountId = '106238155'; // account id
  const _propertyId = '273759608'; // GA4 auto
  const _viedId = '159996509'; // GA3 integrated
  const viewId = 'ga:159996509';
  gapi.client
    .request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + gapi.client.getToken().access_token,
      },
      body: {
        reportRequests: [AnalyticsQueries.getAllPagePathsWithView({ viewId })],
      },
    })
    .then(displayResults, handleError);
}

function handleError(e) {
  //if (e.status === 403) return redirectLogin();
  displayResults(e);
}

const messages = [];
function displayResults(response) {
  var formattedJson = 'UNAUTHORIZED';
  if ('result' in response) {
    formattedJson = JSON.stringify(response.result, null, 2);

    const tbody = document.getElementById('renderResult');
    const queryResult = response.result.reports[0].data.rows;
    for (let i = 0; i < queryResult.length; i++) {
      const result = queryResult[i];
      tbody.appendChild(createTr(result.dimensions[0], result.metrics[0].values[0]));
    }
  } else {
    formattedJson = JSON.stringify(response, null, 2);
  }

  messages.push(formattedJson);
  document.getElementById('query-output').innerHTML = messages.reverse().join('<hr/>');
}

function createTr(...texts) {
  const td = text => {
    const el = document.createElement('td');
    el.textContent = text;
    return el;
  };
  const tr = document.createElement('tr');
  for (let i = 0; i < texts.length; i++) {
    tr.appendChild(td(texts[i]));
  }
  return tr;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function redirectLogin() {
  window.location.replace('/page/google/login.html?redirect=' + encodeURIComponent(window.location.href));
}

function revokeToken() {
  let cred = gapi.client.getToken();
  if (cred !== null) {
    google.accounts.oauth2.revoke(cred.access_token, () => {
      console.log('Revoked: ' + cred.access_token);
    });
    gapi.client.setToken('');
  }
}
