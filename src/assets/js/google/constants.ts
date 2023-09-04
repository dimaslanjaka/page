export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  //'https://www.googleapis.com/auth/contacts.readonly',
  //'https://www.googleapis.com/auth/plus.login',
];
export const GOOGLE_CONFIG = {
  apiKey: 'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw',
  response_type: 'token',
  access_type: 'offline',
  // auto select account
  auto_select: false,
  prompt: 'select_account',
  // google client id
  client_id: '974269993480-0e6vhfl8j688jal91o6c93eh90cg88o2.apps.googleusercontent.com',
  // handle callback response
  //callback: handleCredentialResponse,
  // cookie origin
  state_cookie_domain: window.location.origin,
  // scope library
  scope: GOOGLE_SCOPES.join(' '),
};

// key to save credential for offline usage
export const KEY_LOCALSTORAGE = 'google_credential';
// last login credential
const g_credential = getLocalCredential();

/**
 * Global token handler
 * @param response
 * @param callback
 * @returns
 */
export async function handleCredentialResponse(response, callback?) {
  if (!response) {
    console.error('token response is null');
    return;
  }
  // handle credential responses
  for (const key in response) {
    g_credential[key] = response[key];
  }
  // determine expires time
  g_credential._expires_in = g_credential.expires_in * 1000 + new Date().getTime();
  // handle google one tap jwt login
  if ('credential' in response && typeof response.credential === 'string') {
    g_credential['credential'] = {} as (typeof g_credential)['credential'];
    // parse jwt token
    const parse = parseJwt(response.credential);
    for (const key in parse) {
      g_credential['credential'][key] = parse[key];
    }
  } else if ('access_token' in response) {
    // fetch user profile
    await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + response.access_token)
      .then(res => res.json())
      .then(response => {
        g_credential['credential'] = {} as (typeof g_credential)['credential'];
        for (const key in response) {
          g_credential['credential'][key] = response[key];
        }
      });
  }

  //console.log('credential', { g_credential }, { response });

  // save credential to local storage
  window.localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(g_credential));

  if (typeof callback === 'function') callback(g_credential);
  return g_credential;
}

export interface LocalCredential {
  [key: string]: any;
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser: string;
  prompt: string;
  _expires_in: number;
  credential: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
}

/**
 * get saved credential in local storage
 * @returns
 */
export function getLocalCredential(): LocalCredential {
  return JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE) || '{}');
}

/**
 * parse JWT response
 * @param token
 * @returns
 */
export function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  return JSON.parse(jsonPayload);
}

/**
 * generate oauth url
 * @param {string} [redirect_uri]
 * @returns
 */
export function generateAuthUrl(redirect_uri) {
  return (
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    'client_id=' +
    GOOGLE_CONFIG.client_id +
    '&redirect_uri=' +
    (redirect_uri || window.location.href) +
    '&response_type=token' +
    '&scope=https://www.googleapis.com/auth/analytics.readonly'
  );
}
