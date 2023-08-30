const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/plus.login',
];
const GOOGLE_CONFIG = {
  apiKey: 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw',
  response_type: 'token',
  access_type: 'offline',
  // auto select account
  auto_select: false,
  prompt: 'select_account',
  // google client id
  client_id: '974269993480-30i5epi0r6a9uiafq3rkpgsjuooe2t3q.apps.googleusercontent.com',
  // handle callback response
  //callback: handleCredentialResponse,
  // cookie origin
  state_cookie_domain: window.location.origin,
  // scope library
  scope: GOOGLE_SCOPES.join(' '),
};

// key to save credential for offline usage
const KEY_LOCALSTORAGE = 'google_credential';
// last login credential
let g_credential = getLocalCredential();

/**
 * Global token handler
 * @param {Record<string,any>} response
 * @param {(...arg: any) => any} [callback]
 * @returns
 */
async function handleCredentialResponse(response, callback) {
  if (!response) {
    console.error('token response is null');
    return;
  }
  // handle credential responses
  for (let key in response) {
    g_credential[key] = response[key];
  }
  // determine expires time
  g_credential._expires_in = g_credential.expires_in * 1000 + new Date().getTime();
  // handle google one tap jwt login
  if ('credential' in response) {
    g_credential['credential'] = {};
    // parse jwt token
    const parse = parseJwt(response.credential);
    for (let key in parse) {
      g_credential['credential'][key] = parse[key];
    }
  } else if ('access_token' in response) {
    // fetch user profile
    await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + response.access_token)
      .then(res => res.json())
      .then(response => {
        g_credential['credential'] = {};
        for (let key in response) {
          g_credential['credential'][key] = response[key];
        }
      });
  }

  //console.log('credential', { g_credential }, { response });

  // save credential to local storage
  window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(g_credential));

  if (typeof callback === 'function') callback(g_credential);
}

/**
 * get saved credential in local storage
 * @returns
 */
function getLocalCredential() {
  return JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE) || '{}');
}

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
      .join(''),
  );
  return JSON.parse(jsonPayload);
}

module.exports = {
  GOOGLE_SCOPES,
  GOOGLE_CONFIG,
  handleCredentialResponse,
  parseJwt,
  getLocalCredential,
  KEY_LOCALSTORAGE,
};
